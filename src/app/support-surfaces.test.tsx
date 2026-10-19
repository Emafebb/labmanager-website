import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import InstagramPage, {
  metadata as instagramMetadata,
} from "@/app/instagram/page";
import NewsletterPage, {
  metadata as newsletterMetadata,
} from "@/app/newsletter/page";
import sitemap from "@/app/sitemap";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NewsletterForm from "@/components/NewsletterForm";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { src?: string }) =>
    createElement("img", { alt, src, ...props }),
}));

afterEach(() => {
  vi.unstubAllGlobals();
});

function serializedMetadata(metadata: object) {
  return JSON.stringify(metadata).toLowerCase();
}

function expectNeutralSocialMetadata(
  metadata: Metadata,
  expectedUrl: string,
) {
  expect(metadata.keywords).toBeNull();
  expect(metadata.openGraph).toMatchObject({
    description: metadata.description,
    url: expectedUrl,
  });
  expect(metadata.twitter).toMatchObject({
    description: metadata.description,
  });
  expect(serializedMetadata(metadata)).not.toMatch(
    /android|windows|offline|ristorant/,
  );
}

function renderedHrefs(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLAnchorElement>("a[href]")).map(
    ({ href }) => href,
  );
}

describe("support surface roles and discovery", () => {
  it("keeps Newsletter editorial, noindex and discoverable only from the footer", () => {
    expect(newsletterMetadata.robots).toMatchObject({ index: false });
    expectNeutralSocialMetadata(
      newsletterMetadata,
      "https://labmanagergestionale.com/newsletter",
    );

    const newsletter = render(<NewsletterPage />);
    const main = within(screen.getByRole("main"));
    expect(
      main.getByRole("heading", { name: /Novità dal laboratorio/i }),
    ).toBeInTheDocument();
    expect(main.getByText(/nuove funzionalità/i)).toBeInTheDocument();
    expect(main.getAllByText(/consigli pratici/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("main")).not.toHaveTextContent(
      /android|windows|offline|ristorant/i,
    );
    newsletter.unmount();

    const footer = render(<Footer />);
    expect(screen.getByRole("link", { name: "Newsletter" })).toHaveAttribute(
      "href",
      "/newsletter",
    );
    footer.unmount();

    const navbar = render(<Navbar />);
    expect(screen.queryByRole("link", { name: "Newsletter" })).toBeNull();
    navbar.unmount();
  });

  it("keeps Instagram noindex with exactly the four approved destinations", () => {
    expect(instagramMetadata.robots).toMatchObject({ index: false });
    expect(instagramMetadata.title).toBe("Links");
    expectNeutralSocialMetadata(
      instagramMetadata,
      "https://labmanagergestionale.com/instagram",
    );

    const { container } = render(<InstagramPage />);
    expect(container).toHaveTextContent("Laboratori artigianali alimentari");
    expect(container).not.toHaveTextContent(/ristorant|android|windows/i);
    expect(renderedHrefs(container).sort()).toEqual(
      [
        "https://labmanagergestionale.com/",
        "https://labmanagergestionale.com/newsletter",
        "https://labmanagergestionale.com/pricing",
        "https://wa.me/393500424228?text=Ciao!%20Vorrei%20informazioni%20su%20LabManager",
      ].sort(),
    );
  });

  it("removes retired pages and their dedicated components and data", () => {
    for (const file of [
      "src/app/aggiornamenti/page.tsx",
      "src/app/download/page.tsx",
      "src/components/Download.tsx",
      "src/components/DownloadClient.tsx",
      "src/data/changelog.ts",
    ]) {
      expect(existsSync(join(process.cwd(), file)), file).toBe(false);
    }
  });

  it("excludes support routes from commercial navigation and organic discovery", () => {
    const footer = render(<Footer />);
    const footerHrefs = renderedHrefs(footer.container);
    expect(footerHrefs).toContain("http://localhost:3000/newsletter");
    expect(footerHrefs).not.toContain("http://localhost:3000/aggiornamenti");
    expect(footerHrefs).not.toContain("http://localhost:3000/download");
    footer.unmount();

    const navbar = render(<Navbar />);
    const navbarHrefs = renderedHrefs(navbar.container);
    expect(navbarHrefs.join(" ")).not.toMatch(
      /newsletter|aggiornamenti|download/,
    );
    navbar.unmount();

    expect(sitemap().map(({ url }) => url)).toEqual([
      "https://labmanagergestionale.com",
      "https://labmanagergestionale.com/ricette-food-cost",
      "https://labmanagergestionale.com/produzione-magazzino",
      "https://labmanagergestionale.com/ordini",
      "https://labmanagergestionale.com/etichette-libro-ingredienti",
      "https://labmanagergestionale.com/strumenti",
      "https://labmanagergestionale.com/pricing",
    ]);

    const robots = readFileSync(
      join(process.cwd(), "public", "robots.txt"),
      "utf8",
    );
    expect(robots).not.toMatch(
      /Disallow:\s*\/(newsletter|aggiornamenti|instagram|download)/,
    );
  });
});

describe("existing newsletter mechanics", () => {
  it("submits the Newsletter form to the existing endpoint with explicit consent", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.type(screen.getByLabelText("Nome"), "Ada Rossi");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.click(screen.getByRole("checkbox"));
    await user.click(
      screen.getByRole("button", { name: "Iscriviti alla newsletter" }),
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const [url, request] = fetchMock.mock.calls[0] as [
      string,
      { method: string; body: string },
    ];
    expect(url).toBe("/api/newsletter");
    expect(request.method).toBe("POST");
    expect(JSON.parse(request.body)).toMatchObject({
      name: "Ada Rossi",
      email: "ada@example.com",
      privacyAccepted: true,
    });
  });

  it("keeps the contact form Newsletter opt-in optional and forwards it when selected", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Nome completo"), "Ada Rossi");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Messaggio"), "Vorrei informazioni");
    await user.click(screen.getByLabelText(/Ho letto e accetto/i));
    await user.click(screen.getByLabelText(/Acconsento a ricevere/i));
    await user.click(screen.getByRole("button", { name: "Invia Messaggio" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const [, request] = fetchMock.mock.calls[0] as [
      string,
      { body: string },
    ];
    expect(JSON.parse(request.body)).toMatchObject({
      newsletterAccepted: true,
      privacyAccepted: true,
    });
  });
});
