import { existsSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import OrdersPage from "@/app/ordini/page";
import PricingPage from "@/app/pricing/page";
import FAQ from "@/components/FAQ";
import {
  TRIAL_ACCESS_CTA_INVENTORY,
  type TrialAccessCtaInventoryItem,
} from "@/data/trial-access-cta-inventory";

function getInventoryItem(
  id: (typeof TRIAL_ACCESS_CTA_INVENTORY)[number]["id"],
): TrialAccessCtaInventoryItem {
  const item = TRIAL_ACCESS_CTA_INVENTORY.find((cta) => cta.id === id);
  if (!item) throw new Error(`Missing CTA inventory item: ${id}`);
  return item;
}

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { src?: string }) =>
    createElement("img", { alt, src, ...props }),
}));

describe("trial and access CTA inventory", () => {
  it("provides the required typed fixture module", () => {
    expect(
      existsSync(
        join(process.cwd(), "src", "data", "trial-access-cta-inventory.ts"),
      ),
    ).toBe(true);
  });

  it("enumerates every public trial or access action with its direct app destination", async () => {
    const inventoryModule = (await import(
      "@/data/trial-access-cta-inventory"
    )) as {
      TRIAL_ACCESS_APP_HREF?: string;
      TRIAL_ACCESS_CTA_INVENTORY?: Array<{
        id: string;
        route: string;
        label: string;
        context?: string;
        intent: string;
        expectedHref: string;
      }>;
    };

    expect(inventoryModule.TRIAL_ACCESS_APP_HREF).toBe(
      "https://app.labmanagergestionale.com",
    );
    expect(inventoryModule.TRIAL_ACCESS_CTA_INVENTORY).toEqual([
      {
        id: "ordini-trial",
        route: "/ordini",
        label: "Richiedi una prova gratuita",
        intent: "start-trial",
        expectedHref: "https://app.labmanagergestionale.com",
      },
      {
        id: "pricing-trial",
        route: "/pricing",
        label: "Inizia la prova gratis",
        intent: "start-trial",
        expectedHref: "https://app.labmanagergestionale.com",
      },
      {
        id: "homepage-trial-faq",
        route: "/",
        label: "Registrati nella web app",
        context: "Come posso provare l'app?",
        intent: "start-trial",
        expectedHref: "https://app.labmanagergestionale.com",
      },
      {
        id: "homepage-ios-access-faq",
        route: "/",
        label: "Accedi alla web app",
        context: "Sarà disponibile per iPhone/iPad?",
        intent: "access-app",
        expectedHref: "https://app.labmanagergestionale.com",
      },
    ]);

    for (const cta of inventoryModule.TRIAL_ACCESS_CTA_INVENTORY ?? []) {
      expect(cta.expectedHref).not.toMatch(
        /wa\.me|whatsapp|#contatti|\/download/i,
      );
    }
  });

  it("renders the inventory destinations directly on orders and pricing", () => {
    const ordersCta = getInventoryItem("ordini-trial");
    const orders = render(<OrdersPage />);
    expect(
      screen.getByRole("link", { name: ordersCta.label }),
    ).toHaveAttribute("href", ordersCta.expectedHref);
    orders.unmount();

    const pricingCta = getInventoryItem("pricing-trial");
    render(<PricingPage />);
    expect(
      screen.getByRole("link", { name: pricingCta.label }),
    ).toHaveAttribute("href", pricingCta.expectedHref);
  });

  it("uses the approved self-service journey in the visible FAQ and FAQPage data", async () => {
    const user = userEvent.setup();
    const trialFaqCta = getInventoryItem("homepage-trial-faq");
    const accessFaqCta = getInventoryItem("homepage-ios-access-faq");
    const { container } = render(<FAQ />);

    await user.click(
      screen.getByRole("button", { name: trialFaqCta.context }),
    );
    const trialAnswer = screen.getByRole("region", {
      name: trialFaqCta.context,
    });
    expect(
      screen.getByRole("link", { name: trialFaqCta.label }),
    ).toHaveAttribute("href", trialFaqCta.expectedHref);
    expect(trialAnswer).toHaveTextContent(
      "Registrati nella web app, verifica il tuo indirizzo email e accedi: la prova completa di 14 giorni, senza carta, inizia al primo login riuscito.",
    );

    await user.click(
      screen.getByRole("button", { name: accessFaqCta.context }),
    );
    expect(
      screen.getByRole("link", { name: accessFaqCta.label }),
    ).toHaveAttribute("href", accessFaqCta.expectedHref);

    const faqJsonLd = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')
        ?.textContent ?? "null",
    ) as {
      mainEntity: Array<{
        name: string;
        acceptedAnswer: { text: string };
      }>;
    };
    const structuredTrialAnswer = faqJsonLd.mainEntity.find(
      ({ name }) => name === trialFaqCta.context,
    )?.acceptedAnswer.text;

    expect(structuredTrialAnswer).toBe(trialAnswer.textContent);
  });
});
