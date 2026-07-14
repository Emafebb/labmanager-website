import { render } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { src?: string }) =>
    createElement("img", { alt, src, ...props }),
}));

type PageStructuredData = {
  "@context": "https://schema.org";
  "@type": "WebPage";
  "@id": string;
  url: string;
  name: string;
  description: string;
  inLanguage: "it-IT";
  isPartOf: { "@id": string };
  about: { "@id": string };
};

type RouteModule = {
  default: React.ComponentType;
  metadata: {
    title?: string | { absolute: string };
    description?: string;
    alternates?: { canonical?: string };
    openGraph?: { url?: string };
  };
  pricingPageStructuredData?: PageStructuredData;
  newsletterPageStructuredData?: PageStructuredData;
};

function resolveMetadataTitle(title: RouteModule["metadata"]["title"]) {
  return typeof title === "string" ? title : title?.absolute;
}

function expectPageScopedGraph(
  structuredData: PageStructuredData | undefined,
  metadata: RouteModule["metadata"],
  expectedUrl: string,
) {
  expect(structuredData).toMatchObject({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${expectedUrl}#webpage`,
    url: expectedUrl,
    name: resolveMetadataTitle(metadata.title),
    description: metadata.description,
    inLanguage: "it-IT",
    isPartOf: { "@id": "https://labmanagergestionale.com/#website" },
    about: {
      "@id": "https://labmanagergestionale.com/#softwareapplication",
    },
  });
  expect(metadata.alternates?.canonical).toBe(expectedUrl);
  expect(metadata.openGraph?.url).toBe(expectedUrl);
  expect(JSON.stringify(structuredData)).not.toMatch(/"Offer"|"offers"/);
}

function expectRenderedGraph(
  Page: React.ComponentType,
  structuredData: PageStructuredData | undefined,
) {
  const { container, unmount } = render(<Page />);
  const renderedData = JSON.parse(
    container.querySelector('script[type="application/ld+json"]')
      ?.textContent ?? "null",
  );
  expect(renderedData).toEqual(structuredData);
  unmount();
}

describe("route-scoped structured data", () => {
  it("emits an accurate WebPage on pricing without offers", async () => {
    const pricing = (await import("@/app/pricing/page")) as RouteModule;

    expectPageScopedGraph(
      pricing.pricingPageStructuredData,
      pricing.metadata,
      "https://labmanagergestionale.com/pricing",
    );
    expectRenderedGraph(pricing.default, pricing.pricingPageStructuredData);
  });

  it("emits an accurate WebPage on newsletter without offers", async () => {
    const newsletter = (await import("@/app/newsletter/page")) as RouteModule;

    expectPageScopedGraph(
      newsletter.newsletterPageStructuredData,
      newsletter.metadata,
      "https://labmanagergestionale.com/newsletter",
    );
    expectRenderedGraph(
      newsletter.default,
      newsletter.newsletterPageStructuredData,
    );
  });
});
