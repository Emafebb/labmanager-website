import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { structuredDataGraph } from "@/app/layout";
import sitemap from "@/app/sitemap";

vi.mock("next/font/google", () => ({
  DM_Sans: () => ({
    variable: "font-dm-sans",
  }),
}));

type JsonLdNode = {
  "@id"?: string;
  "@type"?: string;
  dateModified?: string;
  featureList?: string[];
  releaseNotes?: string;
  softwareVersion?: string;
};

describe("orders SEO plumbing", () => {
  it("adds the orders page to the sitemap", () => {
    const entries = sitemap();
    const ordersEntry = entries.find(
      (entry) => entry.url === "https://pastrylabmanager.com/ordini",
    );

    expect(ordersEntry).toMatchObject({
      url: "https://pastrylabmanager.com/ordini",
      changeFrequency: "monthly",
      priority: 0.85,
    });
  });

  it("updates global SoftwareApplication structured data for version 0.0.9", () => {
    const softwareApplication = structuredDataGraph["@graph"].find(
      (node): node is JsonLdNode => node["@type"] === "SoftwareApplication",
    );

    expect(softwareApplication).toMatchObject({
      "@id": "https://pastrylabmanager.com/#softwareapplication",
      softwareVersion: "0.0.9",
      dateModified: "2026-06-04",
    });
    expect(softwareApplication?.releaseNotes).toContain(
      "Ordini e Piano di Lavoro",
    );
    expect(softwareApplication?.featureList).toEqual(
      expect.arrayContaining([
        "Gestione ordini cliente con ritiro, consegna, acconti e saldo",
        "Ordini interni tra sedi e piano di lavoro del laboratorio",
        "Produzione collegata a ricette, assemblaggi e lotti",
        "Report Ordini con export Excel e PDF",
        "Notifiche ordini su Android e Windows",
      ]),
    );
  });

  it("documents the orders page in llms.txt", () => {
    const llms = readFileSync(join(process.cwd(), "public", "llms.txt"), "utf8");

    expect(llms).toContain("[Ordini](https://pastrylabmanager.com/ordini)");
    expect(llms).toContain("Ordini e Piano di Lavoro");
    expect(llms).toContain(
      "Il modulo ordini gestisce ordini cliente e interni",
    );
  });
});
