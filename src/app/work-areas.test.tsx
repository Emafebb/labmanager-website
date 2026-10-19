import { readFileSync } from "node:fs";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import RecipesPage, {
  metadata as recipesMetadata,
} from "@/app/ricette-food-cost/page";
import ProductionPage, {
  metadata as productionMetadata,
} from "@/app/produzione-magazzino/page";
import LabelsPage, {
  metadata as labelsMetadata,
} from "@/app/etichette-libro-ingredienti/page";
import ToolsPage, { metadata as toolsMetadata } from "@/app/strumenti/page";
import OrdersPage from "@/app/ordini/page";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import { TRIAL_ACCESS_APP_HREF } from "@/data/trial-access-cta-inventory";
import sitemap from "@/app/sitemap";

const pages = [
  {
    Page: RecipesPage,
    metadata: recipesMetadata,
    href: "/ricette-food-cost",
    title: "Ricette e Food Cost",
  },
  {
    Page: ProductionPage,
    metadata: productionMetadata,
    href: "/produzione-magazzino",
    title: "Produzione e Magazzino",
  },
  {
    Page: LabelsPage,
    metadata: labelsMetadata,
    href: "/etichette-libro-ingredienti",
    title: "Etichette e Libro ingredienti",
  },
  {
    Page: ToolsPage,
    metadata: toolsMetadata,
    href: "/strumenti",
    title: "Strumenti e calcolatori",
  },
];

describe("work area pages", () => {
  it.each(pages)(
    "publishes an autonomous, linked and indexable $href page",
    ({ Page, metadata, href, title }) => {
      const { container } = render(<Page />);
      const main = within(screen.getByRole("main"));
      expect(main.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(metadata.title).toEqual({ absolute: `${title} | LabManager` });
      const url = `https://labmanagergestionale.com${href}`;
      expect(metadata.alternates?.canonical).toBe(url);
      expect(metadata.openGraph?.url).toBe(url);
      expect(metadata.robots).toBeUndefined();
      const jsonLd = JSON.parse(
        container.querySelector('main script[type="application/ld+json"]')!
          .textContent!,
      );
      expect(jsonLd).toMatchObject({
        "@type": "WebPage",
        url,
        name: title,
        description: metadata.description,
      });
      expect(JSON.stringify(jsonLd)).not.toMatch(/"Offer"|"offers"/);
      for (const link of main.getAllByRole("link", {
        name: "Prova gratis 14 giorni",
      })) {
        expect(link).toHaveAttribute("href", TRIAL_ACCESS_APP_HREF);
        expect(link).not.toHaveAttribute("target");
      }
      expect(
        main.getByRole("link", { name: "Confronta Light e Plus" }),
      ).toHaveAttribute("href", "/pricing");
      const related = main.getByRole("navigation", {
        name: "Altre aree di lavoro",
      });
      expect(within(related).getAllByRole("link")).toHaveLength(4);
      expect(related.querySelector(`a[href="${href}"]`)).toBeNull();
      expect(sitemap().map(({ url }) => url)).toContain(url);
      expect(readFileSync("public/llms.txt", "utf8")).toContain(`](${url}):`);
      expect(
        main.getByRole("heading", {
          name: "Scegli il piano per questo lavoro.",
        }),
      ).toBeInTheDocument();
      expect(screen.getByRole("main")).not.toHaveTextContent(
        /conformità garantita|tutto offline|QR pubblico/,
      );
    },
  );

  it("distinguishes the two Libro ingredienti entitlements and human verification", () => {
    render(<LabelsPage />);
    const main = screen.getByRole("main");
    expect(main).toHaveTextContent(
      "Light include assortimenti e consultazione. Plus aggiunge generazione e storico PDF.",
    );
    expect(main).toHaveTextContent(/verificare.*ingredienti.*allergeni/i);
  });

  it("describes all seven calculators in expandable entries without presenting a simulated app", async () => {
    const user = userEvent.setup();
    render(<ToolsPage />);
    const main = within(screen.getByRole("main"));
    for (const name of [
      "W delle farine",
      "Bilanciamento delle bagne",
      "Rinfresco del lievito",
      "Parametri dell’impasto",
      "Tempistiche di lievitazione",
      "Conversione degli stampi",
      "Overrun del gelato",
    ]) {
      expect(main.getByRole("heading", { name })).toBeInTheDocument();
    }
    expect(main.queryByRole("spinbutton")).toBeNull();
    expect(
      main.getByText(/I calcolatori si usano nella web app/),
    ).toBeInTheDocument();
    const conversion = main.getByRole("heading", { name: "Conversione degli stampi" });
    expect(conversion.closest("details")).not.toHaveAttribute("open");
    await user.click(conversion);
    expect(conversion.closest("details")).toHaveAttribute("open");
    expect(main.getByText(/Le quantità convertite, il nuovo peso totale/)).toBeVisible();
  });

  it("keeps the historic orders anchor and connects Orders to the same family", () => {
    const { container } = render(<OrdersPage />);
    expect(container.querySelector("#flusso-ordine")).not.toBeNull();
    const main = within(screen.getByRole("main"));
    expect(
      main.getByRole("navigation", { name: "Altre aree di lavoro" }),
    ).toBeInTheDocument();
    expect(
      main.getAllByRole("link", { name: "Prova gratis 14 giorni" }).length,
    ).toBeGreaterThan(0);
  });

  it("opens the feature menu from the keyboard, closes it with Escape and restores focus", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const button = screen.getByRole("button", { name: "Funzionalità" });
    button.focus();
    await user.keyboard("{Enter}");
    expect(button).toHaveAttribute("aria-expanded", "true");
    const nav = within(
      screen.getByRole("list", { name: "Navigazione desktop" }),
    );
    for (const { href, title } of pages)
      expect(nav.getByRole("link", { name: title })).toHaveAttribute(
        "href",
        href,
      );
    await user.keyboard("{Escape}");
    expect(button).toHaveFocus();
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(
      nav.queryByRole("link", { name: "Strumenti e calcolatori" }),
    ).toBeNull();
  });

  it("closes the feature menu on outside click, focus leaving and link activation", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const button = screen.getByRole("button", { name: "Funzionalità" });
    await user.click(button);
    await user.click(screen.getByRole("link", { name: "Accedi" }));
    expect(button).toHaveAttribute("aria-expanded", "false");
    await user.click(button);
    await user.click(
      screen.getByRole("link", { name: "Strumenti e calcolatori" }),
    );
    expect(button).toHaveAttribute("aria-expanded", "false");
    await user.click(button);
    await user.tab({ shift: true });
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("links all five areas from the home catalog and footer", () => {
    const features = render(<Features />);
    for (const href of [...pages.map(({ href }) => href), "/ordini"]) {
      expect(
        features.container.querySelector(`a[href="${href}"]`),
      ).not.toBeNull();
    }
    features.unmount();
    render(<Footer />);
    const nav = within(screen.getByRole("navigation", { name: "Prodotto" }));
    for (const { title, href } of pages)
      expect(nav.getByRole("link", { name: title })).toHaveAttribute(
        "href",
        href,
      );
  });
});
