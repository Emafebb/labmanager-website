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
    expect(metadata.title).toBe("Gestione ordini dei tuoi clienti - LabManager");
    expect(metadata.description).toBe(
      "Gestisci ordini cliente, ritiri, consegne, acconti, produzione collegata, piano di lavoro e report con LabManager per pasticceria, panificio e laboratorio.",
    );
    expect(metadata.alternates?.canonical).toBe(
      "https://pastrylabmanager.com/ordini",
    );
    expect(metadata.openGraph?.url).toBe(
      "https://pastrylabmanager.com/ordini",
    );
    expect(metadata.robots).toBeUndefined();
  });

  it("renders the core product story and CTAs", () => {
    render(<OrdersPage />);

    const main = within(screen.getByRole("main"));

    expect(
      main.getByRole("heading", {
        level: 1,
        name: "Gestione ordini e piano di lavoro per pasticceria, panificio e laboratorio",
      }),
    ).toBeInTheDocument();
    expect(
      main.getByText(/LabManager include un modulo Ordini e Piano di Lavoro/i),
    ).toBeInTheDocument();
    expect(
      main
        .getAllByRole("link", { name: "Richiedi una prova gratuita" })
        .map((link) => link.getAttribute("href")),
    ).toContain("/#contatti");
    expect(
      main.getByRole("link", { name: "Vedi come funziona" }),
    ).toHaveAttribute("href", "#flusso-ordine");
    expect(
      main.queryByRole("link", { name: "Scarica LabManager" }),
    ).not.toBeInTheDocument();
  });

  it("renders extractable sections for orders, production, payments, notifications, and reports", () => {
    render(<OrdersPage />);

    expect(
      screen.getByRole("heading", {
        name: "Come funziona la gestione ordini in LabManager?",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/ORD-DD\.MM\.YYYY-001/)).toBeInTheDocument();
    expect(screen.getByText(/cliente anagrafica o rapido/i)).toBeInTheDocument();
    expect(screen.getAllByText(/ordini interni tra sedi/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/ricette o assemblaggi/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/totale ordini, incassato netto, residuo/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/badge in navigazione, chip NEW/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/export Excel o PDF/i).length).toBeGreaterThan(0);
  });

  it("renders FAQ answers that are safe for AI extraction", () => {
    render(<OrdersPage />);

    expect(
      screen.getByRole("heading", {
        name: "LabManager gestisce ordini con acconto e saldo?",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Gli ordini possono essere collegati alle ricette?",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Posso vedere gli ordini da preparare oggi?",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Il report ordini esporta Excel o PDF?",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "La gestione pagamenti cliente è un modulo contabile?",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/non è un modulo contabile fiscale/i),
    ).toBeInTheDocument();
  });

  it("exports webpage, breadcrumb, and FAQ structured data", () => {
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

    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "@type": "WebPage",
          "@id": "https://pastrylabmanager.com/ordini#webpage",
          name: "Gestione ordini dei tuoi clienti - LabManager",
        }),
        expect.objectContaining({
          "@type": "BreadcrumbList",
        }),
        expect.objectContaining({
          "@type": "FAQPage",
        }),
      ]),
    );
    expect(faqPage?.mainEntity).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "LabManager gestisce ordini con acconto e saldo?",
          acceptedAnswer: expect.objectContaining({
            text: expect.stringMatching(/acconto, residuo e stato pagamento/i),
          }),
        }),
        expect.objectContaining({
          name: "Gli ordini possono essere collegati alle ricette?",
        }),
        expect.objectContaining({
          name: "Posso vedere gli ordini da preparare oggi?",
        }),
        expect.objectContaining({
          name: "Il report ordini esporta Excel o PDF?",
        }),
        expect.objectContaining({
          name: "La gestione pagamenti cliente è un modulo contabile?",
          acceptedAnswer: expect.objectContaining({
            text: expect.stringMatching(/non è un modulo contabile fiscale/i),
          }),
        }),
      ]),
    );
  });
});
