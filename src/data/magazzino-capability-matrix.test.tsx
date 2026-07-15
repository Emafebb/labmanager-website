import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { structuredDataGraph } from "@/app/layout";
import AggiornamentiPage from "@/app/aggiornamenti/page";
import PricingPage, {
  pricingMagazzinoFeature,
} from "@/app/pricing/page";
import FAQ from "@/components/FAQ";
import Warehouse from "@/components/Warehouse";
import { changelog } from "@/data/changelog";
import {
  MAGAZZINO_CANONICAL_COPY,
  MAGAZZINO_CAPABILITIES,
  MAGAZZINO_CLAIM_IDS,
  MAGAZZINO_REQUIRED_SURFACES,
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

const EXPECTED_IDS = [
  "magazzino.ricevimento-merci",
  "magazzino.giacenze-per-sede",
  "magazzino.soglie-configurabili",
  "magazzino.scarico-fifo",
  "magazzino.alert-scadenze",
  "magazzino.trasferimenti-tra-sedi",
] as const;

const claimIdAttribute = EXPECTED_IDS.join(" ");

describe("Magazzino capability matrix v1", () => {
  it("contains only the six approved, public capabilities with stable governance fields", () => {
    expect(MAGAZZINO_CAPABILITIES.map(({ id }) => id)).toEqual(EXPECTED_IDS);
    expect(MAGAZZINO_CLAIM_IDS).toEqual(EXPECTED_IDS);
    expect(MAGAZZINO_REQUIRED_SURFACES).toEqual([
      "warehouse",
      "faq",
      "pricing",
      "changelog",
      "llms",
      "software-application",
    ]);

    for (const capability of MAGAZZINO_CAPABILITIES) {
      expect(capability).toMatchObject({
        approvedBy: "Committente",
        approvedOn: "2026-07-13",
        available: true,
        marketable: true,
        requiredSurfaces: MAGAZZINO_REQUIRED_SURFACES,
      });
      expect(capability.publicCopy.length).toBeGreaterThan(0);
    }
  });

  it("exports the exact approved canonical copy", () => {
    expect(MAGAZZINO_CANONICAL_COPY).toBe(
      "Gestione magazzino con ricevimento merci, giacenze per sede, soglie configurabili, scarico FIFO, alert scadenze e trasferimenti tra sedi.",
    );
  });

  it("maps visible Warehouse, FAQ and pricing claims to every matrix ID", async () => {
    const user = userEvent.setup();

    const warehouse = render(<Warehouse />);
    expect(warehouse.container).toHaveTextContent(MAGAZZINO_CANONICAL_COPY);
    expect(
      warehouse.container.querySelector("[data-magazzino-claim-ids]"),
    ).toHaveAttribute("data-magazzino-claim-ids", claimIdAttribute);
    warehouse.unmount();

    const faq = render(<FAQ />);
    const warehouseQuestion = screen.getByRole("button", {
      name: "Come gestisce il magazzino LabManager?",
    });
    await user.click(warehouseQuestion);
    expect(screen.getByText(MAGAZZINO_CANONICAL_COPY)).toBeVisible();
    expect(warehouseQuestion).toHaveAttribute(
      "data-magazzino-claim-ids",
      claimIdAttribute,
    );
    faq.unmount();

    expect(pricingMagazzinoFeature.summary).toBe(MAGAZZINO_CANONICAL_COPY);
    expect(pricingMagazzinoFeature.claimIds).toEqual(EXPECTED_IDS);
    const pricing = render(<PricingPage />);
    expect(
      pricing.container.querySelector("[data-magazzino-claim-ids]"),
    ).toHaveAttribute("data-magazzino-claim-ids", claimIdAttribute);
  });

  it("uses the same FAQ source for visible answers and FAQPage JSON-LD", () => {
    const { container } = render(<FAQ />);
    const jsonLd = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')?.textContent ??
        "null",
    ) as {
      mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>;
    };

    expect(jsonLd.mainEntity).toContainEqual(
      expect.objectContaining({
        name: "Come gestisce il magazzino LabManager?",
        acceptedAnswer: expect.objectContaining({
          text: MAGAZZINO_CANONICAL_COPY,
        }),
      }),
    );
  });

  it("maps changelog, llms.txt and SoftwareApplication data to the matrix", () => {
    const mappedReleaseNotes = changelog.flatMap((entry) =>
      entry.sections.filter((section) => section.magazzinoClaimIds),
    );
    expect(mappedReleaseNotes).toHaveLength(1);
    expect(mappedReleaseNotes[0]).toMatchObject({
      items: [MAGAZZINO_CANONICAL_COPY],
      magazzinoClaimIds: EXPECTED_IDS,
    });
    const releaseNotes = render(<AggiornamentiPage />);
    expect(
      releaseNotes.container.querySelector("[data-magazzino-claim-ids]"),
    ).toHaveAttribute("data-magazzino-claim-ids", claimIdAttribute);
    releaseNotes.unmount();

    const llms = readFileSync(join(process.cwd(), "public", "llms.txt"), "utf8");
    expect(llms).toContain(MAGAZZINO_CANONICAL_COPY);
    for (const id of EXPECTED_IDS) expect(llms).toContain(id);

    const softwareApplication = structuredDataGraph["@graph"].find(
      (node) => node["@type"] === "SoftwareApplication",
    ) as {
      featureList?: string[];
      additionalProperty?: Array<{ propertyID: string }>;
    };
    expect(softwareApplication.featureList).toContain(MAGAZZINO_CANONICAL_COPY);
    expect(
      softwareApplication.additionalProperty?.map(({ propertyID }) => propertyID),
    ).toEqual(EXPECTED_IDS);
  });

  it("removes unapproved Magazzino claims instead of implicitly remapping them", () => {
    const warehouse = render(<Warehouse />);
    const warehouseText = warehouse.container.textContent?.toLowerCase() ?? "";
    for (const forbidden of ["fornitor", "barcode", "collocaz", "preliev"]) {
      expect(warehouseText).not.toContain(forbidden);
    }
    warehouse.unmount();

    expect(JSON.stringify(pricingMagazzinoFeature).toLowerCase()).not.toMatch(
      /fornitor|barcode|collocaz|preliev/,
    );
  });
});
