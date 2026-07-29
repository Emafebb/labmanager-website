import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import PricingPage, {
  metadata,
  pricingPageStructuredData,
} from "@/app/pricing/page";
import {
  DEVICE_CONTACT_COPY,
  DEVICE_CONTACT_PROMPT,
  TRIAL_EXPLANATION,
} from "@/lib/pricing";

const PAGE_URL = "https://labmanagergestionale.com/pricing";
const PAGE_TITLE = "Prezzi Light e Plus | LabManager";
const PAGE_DESCRIPTION =
  "Confronta LabManager Light e Plus, prezzi mensili e annuali, funzionalità, supporto e prova gratuita di 14 giorni senza carta.";
const REGISTRATION_URL = "https://app.labmanagergestionale.com";

describe("pricing page", () => {
  it("exports Light/Plus metadata and aligned WebPage structured data", () => {
    expect(metadata).toMatchObject({
      title: { absolute: PAGE_TITLE },
      description: PAGE_DESCRIPTION,
      alternates: { canonical: PAGE_URL },
      openGraph: { url: PAGE_URL, description: PAGE_DESCRIPTION },
      twitter: { description: PAGE_DESCRIPTION },
    });
    expect(pricingPageStructuredData).toMatchObject({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Prezzi Light e Plus",
      description: PAGE_DESCRIPTION,
    });
  });

  it("renders the annual desktop offer with two adjacent cards and one trial badge", () => {
    const { container } = render(<PricingPage />);
    const main = within(screen.getByRole("main"));
    const cards = container.querySelector("[data-pricing-cards]");
    const plans = container.querySelectorAll("[data-pricing-plan]");

    expect(main.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Scegli tra Light e Plus",
    );
    expect(cards).toHaveClass("grid", "lg:grid-cols-2");
    expect(plans).toHaveLength(2);
    expect(plans[0]).toHaveAttribute("data-pricing-plan", "light");
    expect(plans[0]).toHaveAttribute("data-periodicita", "annuale");
    expect(plans[0]).toHaveTextContent("€16,67/mese");
    expect(plans[0]).toHaveTextContent("€200/anno");
    expect(plans[1]).toHaveAttribute("data-pricing-plan", "plus");
    expect(plans[1]).toHaveTextContent("€40/mese");
    expect(plans[1]).toHaveTextContent("€480/anno");
    // Spec 0009 req. 46: badge "Consigliato" sulla card Plus. Il claim di
    // prova sociale ("dai laboratori") non è sostanziabile e resta fuori.
    expect(main.getAllByText("Consigliato")).toHaveLength(1);
    expect(main.queryByText(/Consigliato dai laboratori/)).toBeNull();
    expect(main.getAllByText(TRIAL_EXPLANATION)).toHaveLength(2);

    const trialLinks = main.getAllByRole("link", {
      name: "Prova gratis 14 giorni",
    });
    expect(trialLinks).toHaveLength(3);
    for (const link of trialLinks) {
      expect(link).toHaveAttribute("href", REGISTRATION_URL);
      expect(link).not.toHaveAttribute("target");
    }
  });

  it("switches both cards, prices and support to the monthly offer without persisting a plan", async () => {
    const user = userEvent.setup();
    const { container } = render(<PricingPage />);
    const annualToggle = screen.getByRole("button", { name: "annuale" });
    const monthlyToggle = screen.getByRole("button", { name: "mensile" });

    expect(annualToggle).toHaveAttribute("aria-pressed", "true");
    expect(monthlyToggle).toHaveAttribute("aria-pressed", "false");
    await user.click(monthlyToggle);

    expect(monthlyToggle).toHaveAttribute("aria-pressed", "true");
    expect(annualToggle).toHaveAttribute("aria-pressed", "false");
    const light = container.querySelector("[data-pricing-plan='light']");
    const plus = container.querySelector("[data-pricing-plan='plus']");
    expect(light).toHaveAttribute("data-periodicita", "mensile");
    expect(light).toHaveTextContent("€19,99/mese");
    expect(light).toHaveTextContent("Supporto email standard");
    expect(plus).toHaveTextContent("€44,99/mese");
    expect(plus).toHaveTextContent("Supporto prioritario");
    for (const link of screen.getAllByRole("link", {
      name: "Prova gratis 14 giorni",
    })) {
      expect(link).toHaveAttribute("href", REGISTRATION_URL);
      expect(link.getAttribute("href")).not.toMatch(/light|plus|annual/i);
    }
  });

  it("renders the complete responsive comparison and keeps Food Cost separate from Costi aziendali", () => {
    const { container } = render(<PricingPage />);
    const table = container.querySelector("[data-pricing-comparison]");
    expect(table).not.toBeNull();
    if (!table) return;

    const comparison = within(table as HTMLElement);
    const foodCostRow = comparison.getByRole("row", {
      name: /Food cost della ricetta/i,
    });
    const businessCostsRow = comparison.getByRole("row", {
      name: /Dashboard Costi aziendali/i,
    });
    expect(foodCostRow).toHaveTextContent("Incluso");
    expect(businessCostsRow).toHaveTextContent("Non incluso");
    expect(businessCostsRow).toHaveTextContent("Incluso");

    for (const expectedRow of [
      /Importazioni AI ricette al giorno/,
      /Importazioni AI DDT al giorno/,
      /Sessioni attive simultanee/,
      /Supporto mensile/,
      /Supporto annuale/,
      /Esportazioni dei moduli inclusi/,
    ]) {
      expect(
        comparison.getByRole("row", { name: expectedRow }),
      ).toBeInTheDocument();
    }
    // Il glossario vieta "dispositivi" per descrivere il limite di accessi.
    expect(comparison.queryByRole("row", { name: /Dispositivi/ })).toBeNull();
    expect(table.closest("div")).toHaveClass("overflow-x-auto");
    expect(table).toHaveClass(
      "block",
      "min-w-0",
      "sm:table",
      "sm:min-w-[560px]",
    );
    expect(foodCostRow).toHaveClass("grid", "grid-cols-2", "sm:table-row");
    // Spec 0009 req. 36: sotto il confronto il testo visibile deve
    // corrispondere esattamente, link incluso.
    const comparisonSection = container.querySelector(
      'section[aria-labelledby="pricing-comparison-heading"]',
    );
    expect(comparisonSection).not.toBeNull();
    expect(
      within(comparisonSection as HTMLElement).getByText(
        DEVICE_CONTACT_PROMPT,
        { exact: false },
      ),
    ).toHaveTextContent(DEVICE_CONTACT_COPY);
  });

  it("keeps the mobile toggle and actions touch-friendly", () => {
    const { container } = render(<PricingPage />);
    const toggle = container.querySelector("[data-pricing-toggle]");
    expect(toggle).toHaveClass("flex", "w-fit");
    for (const button of screen.getAllByRole("button", {
      name: /mensile|annuale/,
    })) {
      expect(button).toHaveClass("touch-target");
    }
    for (const link of screen.getAllByRole("link", {
      name: "Prova gratis 14 giorni",
    })) {
      expect(link).toHaveClass("touch-target");
    }
    // Solo le CTA dentro le card occupano l'intera colonna; quella di chiusura
    // è centrata e non deve stirarsi per tutta la larghezza della sezione.
    for (const cardCta of container.querySelectorAll(
      "[data-pricing-plan] [data-registration-cta]",
    )) {
      expect(cardCta).toHaveClass("w-full");
    }
  });
});
