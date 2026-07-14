import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import PricingPage, {
  metadata,
  pricingPageStructuredData,
} from "@/app/pricing/page";
import {
  MAGAZZINO_CANONICAL_COPY,
  MAGAZZINO_CLAIM_ID_ATTRIBUTE,
} from "@/data/magazzino-capability-matrix";

const PAGE_URL = "https://labmanagergestionale.com/pricing";
const PAGE_TITLE = "Prezzi e prova gratuita | LabManager";
const PAGE_DESCRIPTION =
  "Scopri il piano LabManager con prova gratuita di 14 giorni senza carta.";

describe("pricing page", () => {
  it("exports stable page-specific metadata without offer details", () => {
    expect(metadata.title).toEqual({ absolute: PAGE_TITLE });
    expect(metadata.description).toBe(PAGE_DESCRIPTION);
    expect(metadata.alternates?.canonical).toBe(PAGE_URL);
    expect(metadata.openGraph?.url).toBe(PAGE_URL);
    expect(metadata.openGraph?.description).toBe(PAGE_DESCRIPTION);
    expect(metadata.twitter?.description).toBe(PAGE_DESCRIPTION);

    const publicDescriptions = JSON.stringify({
      description: metadata.description,
      openGraph: metadata.openGraph?.description,
      twitter: metadata.twitter?.description,
    });
    expect(publicDescriptions).not.toMatch(
      /€|44[,.]99|480|mensil|annual|sessioni private|supporto prioritario|un solo piano/i,
    );
  });

  it("renders one complete plan with both payment modes and the card-free trial", () => {
    const { container } = render(<PricingPage />);
    const main = within(screen.getByRole("main"));
    const plans = container.querySelectorAll("[data-pricing-plan]");

    expect(plans).toHaveLength(1);
    expect(main.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Prezzi e prova gratuita",
    );
    expect(plans[0]).toHaveTextContent("Piano completo");
    expect(plans[0]).toHaveTextContent("€44,99/mese");
    expect(plans[0]).toHaveTextContent("€480/anno");
    expect(plans[0]).toHaveTextContent("14 giorni di prova gratuita");
    expect(plans[0]).toHaveTextContent("senza carta");
    expect(main.queryByText(/Piano Light/i)).not.toBeInTheDocument();
  });

  it("keeps annual benefits, simultaneous sessions, CTA, and FAQ wording exact", async () => {
    const user = userEvent.setup();
    const { container } = render(<PricingPage />);
    const mainElement = screen.getByRole("main");
    const main = within(mainElement);
    const annualMode = container.querySelector("[data-payment-mode='annual']");

    expect(annualMode).not.toBeNull();
    if (!annualMode) return;

    expect(annualMode).toHaveTextContent("2 sessioni private 1:1");
    expect(annualMode).toHaveTextContent("Supporto prioritario");
    expect(annualMode).not.toHaveTextContent(/onboarding|team/i);

    expect(
      main.getByRole("link", { name: "Registrati per una prova gratuita" }),
    )
      .toHaveAttribute("href", "https://app.labmanagergestionale.com");
    expect(
      main.getByRole("link", { name: "Registrati per una prova gratuita" }),
    ).not.toHaveAttribute("target");

    expect(
      mainElement.textContent?.match(/2 sessioni attive simultanee/g),
    ).toHaveLength(2);
    expect(mainElement).not.toHaveTextContent(/2 dispositivi/i);

    const sessionsQuestion = main.getByRole("button", {
      name: "Quante sessioni posso usare contemporaneamente?",
    });
    await user.click(sessionsQuestion);
    expect(sessionsQuestion).toHaveAttribute("aria-expanded", "true");
    expect(
      main.getByText("Il piano include 2 sessioni attive simultanee."),
    ).toBeVisible();
  });

  it("keeps public content and WebPage data within approved product boundaries", () => {
    const { container } = render(<PricingPage />);
    const main = screen.getByRole("main");
    const renderedStructuredData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')
        ?.textContent ?? "null",
    );

    expect(main).toHaveTextContent(MAGAZZINO_CANONICAL_COPY);
    expect(
      container.querySelector("[data-magazzino-claim-ids]"),
    ).toHaveAttribute(
      "data-magazzino-claim-ids",
      MAGAZZINO_CLAIM_ID_ATTRIBUTE,
    );
    expect(main).not.toHaveTextContent(
      /Piano Light|download|installazione|android|windows|offline|sincronizz|\bteam\b|dispositiv/i,
    );

    expect(renderedStructuredData).toEqual(pricingPageStructuredData);
    expect(pricingPageStructuredData).toMatchObject({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Prezzi e prova gratuita",
      description: PAGE_DESCRIPTION,
    });
    expect(JSON.stringify(pricingPageStructuredData)).not.toMatch(
      /Piano Light|"Offer"|"offers"|€|44[,.]99|480|annual|sessioni private|supporto prioritario/i,
    );
  });
});
