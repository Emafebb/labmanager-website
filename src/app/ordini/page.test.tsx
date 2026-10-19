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

  it("explains orders, actual weights and payments without inventing live customer data", () => {
    render(<OrdersPage />);
    const mainElement = screen.getByRole("main");
    const main = within(mainElement);
    expect(main.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Ogni ordine, al suo posto.",
    );
    expect(main.getByRole("table")).toHaveAccessibleName(
      "Esempio di piano di lavoro, con dati illustrativi",
    );
    expect(mainElement).toHaveTextContent("Il peso effettivo");
    expect(mainElement).toHaveTextContent("Acconti e saldi");
    for (const link of main.getAllByRole("link", { name: "Scopri i prezzi" }))
      expect(link).toHaveAttribute("href", "/pricing");
    expect(main.getAllByRole("link", { name: "Prova gratis 14 giorni" })).toHaveLength(2);
    expect(main.queryByRole("link", { name: /scarica|accedi/i })).not.toBeInTheDocument();
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
    const faqPage = graph.find((node) => node["@type"] === "FAQPage") as
      FaqNode | undefined;

    expect(graph.map((node) => node["@type"])).toEqual(["WebPage", "FAQPage"]);
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
      'section[aria-labelledby="orders-faq"]',
    );
    const visibleFaqs = Array.from(
      faqSection?.querySelectorAll("details") ?? [],
    ).map((article) => ({
      name: article.querySelector("summary")?.textContent?.replace(/\+$/, ""),
      acceptedAnswer: {
        "@type": "Answer",
        text: article.querySelector("p")?.textContent,
      },
      "@type": "Question",
    }));
    expect(faqPage?.mainEntity).toEqual(visibleFaqs);
  });
});
