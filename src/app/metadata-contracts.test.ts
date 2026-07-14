import { describe, expect, it, vi } from "vitest";
import {
  metadata as rootMetadata,
  structuredDataGraph,
} from "@/app/layout";
import { metadata as homeMetadata } from "@/app/page";
import {
  metadata as ordersMetadata,
  ordersPageStructuredData,
} from "@/app/ordini/page";
import {
  metadata as pricingMetadata,
  pricingPageStructuredData,
} from "@/app/pricing/page";
import {
  metadata as newsletterMetadata,
  newsletterPageStructuredData,
} from "@/app/newsletter/page";
import {
  MAGAZZINO_CANONICAL_COPY,
  MAGAZZINO_CAPABILITIES,
  MAGAZZINO_CLAIM_IDS,
} from "@/data/magazzino-capability-matrix";

vi.mock("next/font/google", () => ({
  DM_Sans: () => ({ variable: "font-dm-sans" }),
}));

const BASE_URL = "https://labmanagergestionale.com";
const HOME_TITLE =
  "Gestionale per pasticcerie, panifici e gelaterie | LabManager";
const HOME_DESCRIPTION =
  "Il gestionale per laboratori artigianali alimentari: ricette, food cost, produzione, etichette, magazzino e ordini. Prova gratuita di 14 giorni.";

const FORBIDDEN_PUBLIC_CLAIMS =
  /android|windows|offline|\bpwa\b|ristorant|sincronizz|compatibilit[aà] per dispositivo/i;

function serializePublicData(value: unknown) {
  return JSON.stringify(value, (_key, nestedValue: unknown) => {
    if (
      typeof nestedValue === "string" &&
      nestedValue.includes(`${BASE_URL}/images/`)
    ) {
      return "[technical image asset]";
    }
    return nestedValue;
  });
}

function absoluteTitle(metadata: typeof homeMetadata) {
  return typeof metadata.title === "object" && metadata.title !== null
    ? metadata.title.absolute
    : undefined;
}

describe("route metadata contracts", () => {
  it("keeps the approved Home positioning page-scoped across metadata and social cards", () => {
    expect(homeMetadata).toMatchObject({
      title: { absolute: HOME_TITLE },
      description: HOME_DESCRIPTION,
      alternates: { canonical: BASE_URL },
      openGraph: {
        title: HOME_TITLE,
        description: HOME_DESCRIPTION,
        url: BASE_URL,
      },
      twitter: {
        title: HOME_TITLE,
        description: HOME_DESCRIPTION,
      },
    });

    const image = Array.isArray(homeMetadata.openGraph?.images)
      ? homeMetadata.openGraph.images[0]
      : undefined;
    expect(image).toMatchObject({
      url: `${BASE_URL}/images/og-image.png`,
      alt: "LabManager per ricette, produzione, magazzino e ordini",
    });
    const twitterImage = Array.isArray(homeMetadata.twitter?.images)
      ? homeMetadata.twitter.images[0]
      : undefined;
    expect(twitterImage).toMatchObject({
      url: `${BASE_URL}/images/og-image.png`,
      alt: "LabManager per ricette, produzione, magazzino e ordini",
    });
    expect(serializePublicData(homeMetadata)).not.toMatch(
      FORBIDDEN_PUBLIC_CLAIMS,
    );
  });

  it("uses absolute titles for every indexable route without duplicating the brand suffix", () => {
    const indexableRoutes = [
      {
        metadata: homeMetadata,
        title: HOME_TITLE,
        canonical: BASE_URL,
      },
      {
        metadata: ordersMetadata,
        title: "Gestione ordini e piano di lavoro | LabManager",
        canonical: `${BASE_URL}/ordini`,
      },
      {
        metadata: pricingMetadata,
        title: "Prezzi e prova gratuita | LabManager",
        canonical: `${BASE_URL}/pricing`,
      },
    ];

    expect(rootMetadata.title).toEqual({
      default: "LabManager",
      template: "%s | LabManager",
    });

    for (const route of indexableRoutes) {
      expect(absoluteTitle(route.metadata)).toBe(route.title);
      expect(route.title.match(/\| LabManager/g)).toHaveLength(1);
      expect(route.metadata.alternates?.canonical).toBe(route.canonical);
      expect(route.metadata.openGraph?.url).toBe(route.canonical);
      expect(route.metadata.openGraph?.title).toBe(route.title);
      expect(route.metadata.openGraph?.description).toBe(
        route.metadata.description,
      );
      expect(route.metadata.twitter?.title).toBe(route.title);
      expect(route.metadata.twitter?.description).toBe(
        route.metadata.description,
      );
      expect(route.metadata.robots).toBeUndefined();
    }
  });

  it("keeps shared metadata neutral and Newsletter coherent with its noindex role", () => {
    expect(rootMetadata.description).toBeUndefined();
    expect(rootMetadata.alternates?.canonical).toBeUndefined();
    expect(rootMetadata.openGraph).toBeUndefined();
    expect(rootMetadata.twitter).toBeUndefined();

    expect(newsletterMetadata).toMatchObject({
      title: "Newsletter",
      description:
        "Aggiornamenti su LabManager, nuove funzionalità e consigli scelti editorialmente per il lavoro in laboratorio.",
      robots: { index: false, follow: true },
      alternates: { canonical: `${BASE_URL}/newsletter` },
      openGraph: { url: `${BASE_URL}/newsletter` },
    });
    expect(newsletterMetadata.openGraph?.description).toBe(
      newsletterMetadata.description,
    );
    expect(newsletterMetadata.twitter?.description).toBe(
      newsletterMetadata.description,
    );

    const serializedRouteMetadata = serializePublicData([
      homeMetadata,
      ordersMetadata,
      pricingMetadata,
      newsletterMetadata,
    ]);
    expect(serializedRouteMetadata).not.toMatch(FORBIDDEN_PUBLIC_CLAIMS);
    expect(serializedRouteMetadata).not.toMatch(/"Offer"|"offers"/);
  });
});

describe("structured data contracts", () => {
  it("limits the global graph to a neutral allowlist of shared entities and properties", () => {
    expect(structuredDataGraph["@graph"].map((node) => node["@type"])).toEqual(
      ["WebSite", "Organization", "SoftwareApplication"],
    );

    const softwareApplication = structuredDataGraph["@graph"].find(
      (node) => node["@type"] === "SoftwareApplication",
    );
    expect(Object.keys(softwareApplication ?? {}).sort()).toEqual(
      [
        "@id",
        "@type",
        "additionalProperty",
        "applicationCategory",
        "applicationSubCategory",
        "audience",
        "countriesSupported",
        "description",
        "featureList",
        "inLanguage",
        "name",
        "provider",
        "screenshot",
        "url",
      ].sort(),
    );

    expect(softwareApplication).not.toHaveProperty("operatingSystem");
    expect(softwareApplication).not.toHaveProperty("softwareRequirements");
    expect(softwareApplication).not.toHaveProperty("availableOnDevice");
    expect(softwareApplication).not.toHaveProperty("fileSize");
    expect(softwareApplication).not.toHaveProperty("releaseNotes");
    expect(softwareApplication).not.toHaveProperty("softwareVersion");
    expect(softwareApplication).not.toHaveProperty("datePublished");
    expect(softwareApplication).not.toHaveProperty("dateModified");
  });

  it("presents the approved audience and four pillars with governed Magazzino claims", () => {
    const website = structuredDataGraph["@graph"].find(
      (node) => node["@type"] === "WebSite",
    );
    const softwareApplication = structuredDataGraph["@graph"].find(
      (node) => node["@type"] === "SoftwareApplication",
    ) as
      | {
          audience?: { audienceType?: string };
          description?: string;
          featureList?: string[];
          additionalProperty?: Array<{
            propertyID?: string;
            name?: string;
          }>;
        }
      | undefined;

    for (const node of [website, softwareApplication]) {
      expect(node).toMatchObject({
        audience: {
          audienceType:
            "Laboratori artigianali alimentari: pasticcerie, panifici e gelaterie",
        },
      });
      expect(node?.description).toMatch(/Ricette e Food Cost/);
      expect(node?.description).toMatch(/Produzione ed Etichette/);
      expect(node?.description).toMatch(/Magazzino/);
      expect(node?.description).toMatch(/Ordini e Piano di Lavoro/);
    }

    expect(softwareApplication?.featureList).toHaveLength(4);
    expect(softwareApplication?.featureList).toContain(
      MAGAZZINO_CANONICAL_COPY,
    );
    expect(
      softwareApplication?.additionalProperty?.map(({ propertyID }) =>
        propertyID,
      ),
    ).toEqual(MAGAZZINO_CLAIM_IDS);
    expect(
      softwareApplication?.additionalProperty?.map(({ name }) => name),
    ).toEqual(MAGAZZINO_CAPABILITIES.map(({ publicCopy }) => publicCopy));
  });

  it("serializes global and page-scoped graphs without offers or prohibited claims", () => {
    const graphs = [
      structuredDataGraph,
      ordersPageStructuredData,
      pricingPageStructuredData,
      newsletterPageStructuredData,
    ];
    const serializedGraphs = serializePublicData(graphs);

    expect(serializedGraphs).not.toMatch(/"Offer"|"offers"/);
    expect(serializedGraphs).not.toMatch(FORBIDDEN_PUBLIC_CLAIMS);
    expect(serializedGraphs).not.toMatch(
      /softwareRequirements|fileSize|releaseNotes|softwareVersion|availableOnDevice|downloadUrl/,
    );
  });

  it("keeps page-scoped graph URLs and descriptions aligned with route metadata", () => {
    const ordersWebPage = ordersPageStructuredData["@graph"].find(
      (node) => node["@type"] === "WebPage",
    );
    const pageScopedRoutes = [
      {
        metadata: ordersMetadata,
        graph: ordersWebPage,
        canonical: `${BASE_URL}/ordini`,
      },
      {
        metadata: pricingMetadata,
        graph: pricingPageStructuredData,
        canonical: `${BASE_URL}/pricing`,
      },
      {
        metadata: newsletterMetadata,
        graph: newsletterPageStructuredData,
        canonical: `${BASE_URL}/newsletter`,
      },
    ];

    for (const route of pageScopedRoutes) {
      expect(route.graph).toMatchObject({
        url: route.canonical,
        description: route.metadata.description,
        isPartOf: { "@id": `${BASE_URL}/#website` },
      });
      expect(route.metadata.alternates?.canonical).toBe(route.canonical);
      expect(route.metadata.openGraph?.url).toBe(route.canonical);
    }
  });

  it("keeps retained screenshots neutral without making platform promises", () => {
    const softwareApplication = structuredDataGraph["@graph"].find(
      (node) => node["@type"] === "SoftwareApplication",
    ) as
      | {
          screenshot?: Array<{ name?: string; description?: string }>;
        }
      | undefined;

    expect(softwareApplication?.screenshot).toEqual([
      expect.objectContaining({
        name: "LabManager: vista ricette e Food Cost",
        description:
          "Schermata di LabManager con ricette, ingredienti, costi e margini.",
      }),
      expect.objectContaining({
        name: "LabManager: vista compatta del lavoro",
        description:
          "Schermata di LabManager con una vista compatta delle attività del laboratorio.",
      }),
    ]);
    expect(
      JSON.stringify(
        softwareApplication?.screenshot?.map(({ name, description }) => ({
          name,
          description,
        })),
      ),
    ).not.toMatch(/android|windows|offline|\bpwa\b|compatibil|support/i);
  });
});
