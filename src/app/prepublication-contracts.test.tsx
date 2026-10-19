import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { structuredDataGraph } from "@/app/layout";
import Home, { metadata as homeMetadata } from "@/app/page";
import NewsletterPage, {
  metadata as newsletterMetadata,
  newsletterPageStructuredData,
} from "@/app/newsletter/page";
import OrdersPage, {
  metadata as ordersMetadata,
  ordersPageStructuredData,
} from "@/app/ordini/page";
import PricingPage, {
  metadata as pricingMetadata,
  pricingPageStructuredData,
} from "@/app/pricing/page";
import sitemap from "@/app/sitemap";
import {
  MAGAZZINO_CANONICAL_COPY,
  MAGAZZINO_CLAIM_IDS,
} from "@/data/magazzino-capability-matrix";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { src?: string }) =>
    createElement("img", { alt, src, ...props }),
}));

vi.mock("@/components/NewsletterPopup", () => ({
  default: () => null,
}));

const FORBIDDEN_PUBLIC_CLAIMS =
  /android|windows|offline|\bpwa\b|sincronizz|compatibilit[aà] per dispositivo/i;

function renderPublicPageText(Page: React.ComponentType) {
  const view = render(<Page />);
  const text = view.container.textContent ?? "";
  view.unmount();
  return text;
}

function serializePublicData(value: unknown) {
  return JSON.stringify(value, (_key, nestedValue: unknown) => {
    if (
      typeof nestedValue === "string" &&
      /(?:https:\/\/labmanagergestionale\.com)?\/images\//.test(nestedValue)
    ) {
      return "[technical image asset]";
    }
    return nestedValue;
  });
}

describe("prepublication cross-surface contracts", () => {
  it("keeps prohibited claims out of governed public marketing artifacts", () => {
    const llms = readFileSync(join(process.cwd(), "public", "llms.txt"), "utf8");
    const publicSurfaces = {
      "Home marketing DOM": renderPublicPageText(Home),
      "Orders marketing DOM": renderPublicPageText(OrdersPage),
      "Pricing marketing DOM": renderPublicPageText(PricingPage),
      "Newsletter editorial DOM": renderPublicPageText(NewsletterPage),
      "route metadata": serializePublicData([
        homeMetadata,
        ordersMetadata,
        pricingMetadata,
        newsletterMetadata,
      ]),
      "JSON-LD": serializePublicData([
        structuredDataGraph,
        ordersPageStructuredData,
        pricingPageStructuredData,
        newsletterPageStructuredData,
      ]),
      "llms.txt": llms,
      sitemap: serializePublicData(sitemap()),
    };

    for (const [surface, value] of Object.entries(publicSurfaces)) {
      expect(value, surface).not.toMatch(FORBIDDEN_PUBLIC_CLAIMS);
    }
  });

  it("documents Home, the five work areas and Prezzi in llms.txt", () => {
    const llms = readFileSync(join(process.cwd(), "public", "llms.txt"), "utf8");
    const seoPageLinks = Array.from(
      llms.matchAll(
        /^- \[([^\]]+)]\((https:\/\/labmanagergestionale\.com[^)]*)\):/gm,
      ),
      ([, label, url]) => ({ label, url }),
    );

    expect(seoPageLinks).toEqual([
      { label: "Home", url: "https://labmanagergestionale.com" },
      { label: "Ricette e Food Cost", url: "https://labmanagergestionale.com/ricette-food-cost" },
      { label: "Produzione e Magazzino", url: "https://labmanagergestionale.com/produzione-magazzino" },
      {
        label: "Ordini",
        url: "https://labmanagergestionale.com/ordini",
      },
      {
        label: "Etichette e Libro ingredienti",
        url: "https://labmanagergestionale.com/etichette-libro-ingredienti",
      },
      { label: "Strumenti e calcolatori", url: "https://labmanagergestionale.com/strumenti" },
      {
        label: "Prezzi",
        url: "https://labmanagergestionale.com/pricing",
      },
    ]);
    expect(llms).toContain(
      "gestionale per laboratori artigianali alimentari, come pasticcerie, panifici e gelaterie",
    );
    expect(llms).toContain("ristorazione");
    expect(llms).toContain("I consulenti possono usarlo per analizzare ricette, Food Cost e menu dei propri clienti.");
    for (const pillar of [
      "### Ricette e Food Cost",
      "### Produzione e Magazzino",
      "### Ordini e Piano di Lavoro",
      "### Etichette e Libro ingredienti",
      "### Strumenti e calcolatori",
    ]) {
      expect(llms).toContain(pillar);
    }
    expect(llms).toContain(MAGAZZINO_CANONICAL_COPY);
    for (const claimId of MAGAZZINO_CLAIM_IDS) {
      expect(llms).toContain(claimId);
    }
    expect(seoPageLinks.map(({ url }) => url).join(" ")).not.toMatch(/newsletter|aggiornamenti|download|billing/i);
  });
});
