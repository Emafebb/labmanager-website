import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { metadata as rootMetadata } from "@/app/layout";
import Home, { metadata as homeMetadata } from "@/app/page";
import NotFound, {
  metadata as notFoundMetadata,
  notFoundPageStructuredData,
} from "@/app/not-found";
import { metadata as updatesMetadata } from "@/app/aggiornamenti/page";
import { metadata as accountBillingMetadata } from "@/app/account/billing/page";
import { metadata as cancelMetadata } from "@/app/billing/cancel/page";
import { metadata as successMetadata } from "@/app/billing/success/page";
import { metadata as downloadMetadata } from "@/app/download/page";
import { metadata as instagramMetadata } from "@/app/instagram/page";
import { metadata as newsletterMetadata } from "@/app/newsletter/page";
import { metadata as ordersMetadata } from "@/app/ordini/page";
import { metadata as pricingMetadata } from "@/app/pricing/page";
import sitemap from "@/app/sitemap";

vi.mock("next/font/google", () => ({
  DM_Sans: () => ({ variable: "font-dm-sans" }),
  Playfair_Display: () => ({ variable: "font-playfair" }),
}));

describe("404 metadata and document contract", () => {
  it("keeps the homepage canonical page-scoped so the 404 cannot inherit it", () => {
    expect(rootMetadata.alternates?.canonical).toBeUndefined();
    expect(homeMetadata.alternates?.canonical).toBe(
      "https://labmanagergestionale.com",
    );
  });

  it("leaves the 404 robots directive to Next's single automatic noindex", () => {
    expect(notFoundMetadata.alternates?.canonical).toBeUndefined();
    expect(rootMetadata.robots).toBeUndefined();
    expect(notFoundMetadata.robots).toBeUndefined();
  });

  it("renders an explicit 404 page with page-scoped WebPage data", () => {
    const { container } = render(<NotFound />);

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Pagina non trovata" }),
    ).toBeInTheDocument();
    expect(notFoundPageStructuredData).toMatchObject({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://labmanagergestionale.com/404#webpage",
    });
    expect(
      JSON.parse(
        container.querySelector('script[type="application/ld+json"]')
          ?.textContent ?? "null",
      ),
    ).toEqual(notFoundPageStructuredData);
  });

  it("continues to render the homepage after its metadata becomes page-scoped", () => {
    expect(Home).toBeTypeOf("function");
  });
});

describe("crawl boundaries and text response ownership", () => {
  it("limits indexable routes and the sitemap to Home, Ordini and Prezzi", () => {
    const entries = sitemap();
    const urls = entries.map(({ url }) => url);

    expect(urls).toEqual([
      "https://labmanagergestionale.com",
      "https://labmanagergestionale.com/ordini",
      "https://labmanagergestionale.com/pricing",
    ]);
    expect(urls.join(" ")).not.toMatch(
      /newsletter|aggiornamenti|billing|download/,
    );
    for (const metadata of [homeMetadata, ordersMetadata, pricingMetadata]) {
      expect(metadata.robots).toBeUndefined();
    }
  });

  it("preserves every agreed noindex contract outside the sitemap", () => {
    expect(newsletterMetadata.robots).toEqual({ index: false, follow: true });
    expect(updatesMetadata.robots).toEqual({ index: false, follow: false });
    expect(instagramMetadata.robots).toEqual({ index: false });
    for (const metadata of [
      downloadMetadata,
      accountBillingMetadata,
      successMetadata,
      cancelMetadata,
    ]) {
      expect(metadata.robots).toEqual({ index: false, follow: false });
    }
  });

  it("changes lastModified only on routes whose content changed in this slice", () => {
    const byUrl = Object.fromEntries(
      sitemap().map(({ url, lastModified }) => [url, lastModified]),
    );

    expect(byUrl).toEqual({
      "https://labmanagergestionale.com": "2026-07-14",
      "https://labmanagergestionale.com/ordini": "2026-07-14",
      "https://labmanagergestionale.com/pricing": "2026-07-14",
    });
  });

  it("serves robots and llms as static text owned only by Cloudflare Static Assets", () => {
    const robots = readFileSync(
      join(process.cwd(), "public", "robots.txt"),
      "utf8",
    );
    const llms = readFileSync(join(process.cwd(), "public", "llms.txt"), "utf8");
    const headers = readFileSync(join(process.cwd(), "public", "_headers"), "utf8");

    expect(robots).toContain("User-agent: *");
    expect(robots).toContain(
      "Sitemap: https://labmanagergestionale.com/sitemap.xml",
    );
    expect(robots).not.toMatch(/^Disallow:/m);
    expect(robots).not.toMatch(/pastrylabmanager\.com|www\.labmanagergestionale\.com/i);
    expect(llms).toContain("# LabManager");
    expect(headers).toMatch(
      /\/llms\.txt\s+Content-Type: text\/plain; charset=utf-8/,
    );
    expect(headers).toMatch(
      /\/robots\.txt\s+Content-Type: text\/plain; charset=utf-8/,
    );
  });
});
