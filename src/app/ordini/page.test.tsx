import { render, screen, within } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import OrdersPage, {
  metadata,
  ordersPageStructuredData,
} from "@/app/ordini/page";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { src?: string }) =>
    createElement("img", { alt, src, ...props }),
}));

describe("orders page", () => {
  it("exports indexable SEO metadata for the orders page", () => {
    expect(metadata.title).toEqual({
      absolute: "Gestione ordini e piano di lavoro | LabManager",
    });
    expect(metadata.description).toBe(
      "Organizza ordini, ritiri, consegne, acconti e produzione collegata, senza separare il banco dal laboratorio.",
    );
    expect(metadata.alternates?.canonical).toBe(
      "https://labmanagergestionale.com/ordini",
    );
    expect(metadata.openGraph?.url).toBe(
      "https://labmanagergestionale.com/ordini",
    );
    expect(metadata.openGraph?.description).toBe(metadata.description);
    expect(metadata.twitter?.description).toBe(metadata.description);
    expect(metadata.robots).toBeUndefined();
  });

  it("renders only the approved product story and commercial CTA", () => {
    render(<OrdersPage />);

    const mainElement = screen.getByRole("main");
    const main = within(mainElement);

    expect(
      main.getByRole("heading", {
        level: 1,
        name: "Gestione ordini e piano di lavoro",
      }),
    ).toBeInTheDocument();
    for (const approvedCapability of [
      /ordini cliente/i,
      /ordini interni/i,
      /produzione collegata/i,
      /ritiro/i,
      /consegna/i,
      /acconti/i,
      /report operativi/i,
    ]) {
      expect(main.getAllByText(approvedCapability).length).toBeGreaterThan(0);
    }
    expect(
      main.getByRole("link", { name: "Scopri i prezzi" }),
    ).toHaveAttribute("href", "/pricing");
    expect(
      main.queryByRole("link", { name: /prova gratuita/i }),
    ).not.toBeInTheDocument();
    expect(
      main.queryByRole("link", { name: "Scarica LabManager" }),
    ).not.toBeInTheDocument();
    expect(main.getByRole("link", { name: "Vedi come funziona" })).toHaveAttribute(
      "href",
      "#flusso-ordine",
    );
    expect(mainElement).not.toHaveTextContent(
      /android|windows|offline|\bpwa\b|notifich|cassa|contabil|fattur|prima nota|export|excel|pdf/i,
    );
  });

  it("exports visible webpage and FAQ data without prohibited commercial schema", () => {
    const { container } = render(<OrdersPage />);
    expect(ordersPageStructuredData["@context"]).toBe("https://schema.org");
    const graph = ordersPageStructuredData["@graph"];
    type FaqNode = {
      "@type": "FAQPage";
      mainEntity: Array<{
        name: string;
        acceptedAnswer: {
          text: string;
        };
      }>;
    };
    const faqPage = graph.find(
      (node): node is FaqNode => node["@type"] === "FAQPage",
    );

    expect(graph.map((node) => node["@type"])).toEqual([
      "WebPage",
      "FAQPage",
    ]);
    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "@type": "WebPage",
          "@id": "https://labmanagergestionale.com/ordini#webpage",
          name: "Gestione ordini e piano di lavoro",
        }),
        expect.objectContaining({
          "@type": "FAQPage",
        }),
      ]),
    );
    expect(JSON.stringify(graph)).not.toMatch(
      /BreadcrumbList|"Offer"|"offers"|android|windows|offline|notific|cassa|contabil|fattur|prima nota|export|excel|pdf/i,
    );

    const faqSection = container.querySelector(
      'section[aria-labelledby="orders-faq-heading"]',
    );
    const visibleFaqs = Array.from(
      faqSection?.querySelectorAll("article") ?? [],
    ).map((article) => ({
      name: article.querySelector("h3")?.textContent,
      acceptedAnswer: {
        "@type": "Answer",
        text: article.querySelector("p")?.textContent,
      },
      "@type": "Question",
    }));
    expect(faqPage?.mainEntity).toEqual(visibleFaqs);
  });
});
