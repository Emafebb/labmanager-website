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

vi.mock("next/font/google", () => ({
  DM_Sans: () => ({ variable: "font-dm-sans" }),
}));

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
  /android|windows|offline|\bpwa\b|ristorant|sincronizz|compatibilit[aà] per dispositivo/i;

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

  it("documents only the three approved SEO pages and all governed positioning in llms.txt", () => {
    const llms = readFileSync(join(process.cwd(), "public", "llms.txt"), "utf8");
    const seoPageLinks = Array.from(
      llms.matchAll(
        /^- \[([^\]]+)]\((https:\/\/labmanagergestionale\.com[^)]*)\):/gm,
      ),
      ([, label, url]) => ({ label, url }),
    );

    expect(seoPageLinks).toEqual([
      { label: "Home", url: "https://labmanagergestionale.com" },
      {
        label: "Ordini",
        url: "https://labmanagergestionale.com/ordini",
      },
      {
        label: "Prezzi",
        url: "https://labmanagergestionale.com/pricing",
      },
    ]);
    expect(llms).toContain(
      "gestionale per laboratori artigianali alimentari, pensato per pasticcerie, panifici e gelaterie",
    );
    for (const pillar of [
      "### Ricette e Food Cost",
      "### Produzione ed Etichette",
      "### Magazzino",
      "### Ordini e Piano di Lavoro",
    ]) {
      expect(llms).toContain(pillar);
    }
    expect(llms).toContain(MAGAZZINO_CANONICAL_COPY);
    for (const claimId of MAGAZZINO_CLAIM_IDS) {
      expect(llms).toContain(claimId);
    }
    expect(llms).not.toMatch(/newsletter|aggiornamenti|download|billing/i);
  });
});
