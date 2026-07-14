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
  featureList?: string[];
};

describe("orders SEO plumbing", () => {
  it("limits the global graph to shared entities without route-specific data", () => {
    expect(structuredDataGraph["@graph"].map((node) => node["@type"])).toEqual([
      "WebSite",
      "Organization",
      "SoftwareApplication",
    ]);

    const serializedGraph = JSON.stringify(structuredDataGraph);
    expect(serializedGraph).not.toMatch(/HowTo|BreadcrumbList|"Offer"/);
    expect(serializedGraph).not.toMatch(/"offers"|"downloadUrl"/);
  });

  it("adds the orders page to the sitemap", () => {
    const entries = sitemap();
    const ordersEntry = entries.find(
      (entry) => entry.url === "https://labmanagergestionale.com/ordini",
    );

    expect(ordersEntry).toMatchObject({
      url: "https://labmanagergestionale.com/ordini",
      changeFrequency: "monthly",
      priority: 0.85,
    });
  });

  it("keeps orders data page-scoped instead of publishing release details globally", () => {
    const softwareApplication = structuredDataGraph["@graph"].find(
      (node): node is JsonLdNode => node["@type"] === "SoftwareApplication",
    );

    expect(softwareApplication).toMatchObject({
      "@id": "https://labmanagergestionale.com/#softwareapplication",
    });
    expect(softwareApplication?.featureList).toContain(
      "Ordini e Piano di Lavoro: ordini cliente e interni, produzione collegata, ritiro e consegna, acconti e report operativi.",
    );
    expect(softwareApplication).not.toHaveProperty("releaseNotes");
    expect(softwareApplication).not.toHaveProperty("softwareVersion");
    expect(softwareApplication).not.toHaveProperty("dateModified");
  });

  it("documents the orders page in llms.txt", () => {
    const llms = readFileSync(join(process.cwd(), "public", "llms.txt"), "utf8");

    expect(llms).toContain(
      "[Ordini](https://labmanagergestionale.com/ordini)",
    );
    expect(llms).toContain("Ordini e Piano di Lavoro");
    expect(llms).toContain(
      "Il modulo ordini gestisce ordini cliente e interni",
    );
  });
});
