import type { Metadata } from "next";
import CloudflareWebAnalytics from "@/components/CloudflareWebAnalytics";
import SiteScripts from "@/components/SiteScripts";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  MAGAZZINO_CANONICAL_COPY,
  MAGAZZINO_CAPABILITIES,
} from "@/data/magazzino-capability-matrix";
import { COMMERCIAL_MANIFEST } from "@/lib/pricing";
import "./globals.css";

const BASE_URL = "https://labmanagergestionale.com";
const PRODUCT_AUDIENCE = {
  "@type": "Audience",
  audienceType:
    "Laboratori artigianali alimentari: pasticcerie, panifici e gelaterie",
} as const;
const PRODUCT_POSITIONING_DESCRIPTION =
  "LabManager è il gestionale Light e Plus per laboratori artigianali alimentari, in particolare pasticcerie, panifici e gelaterie, dedicato a Ricette e Food Cost, Produzione ed Etichette, Magazzino, Ordini e Piano di Lavoro.";
const PRODUCT_FEATURES = [
  "Ricette e Food Cost: ricette, ingredienti, costi e margini.",
  "Produzione ed Etichette: organizzazione della produzione, etichette, allergeni e PDF.",
  MAGAZZINO_CANONICAL_COPY,
  "Ordini e Piano di Lavoro: ordini cliente e interni, produzione collegata, ritiro e consegna, acconti e report operativi.",
  "Bilanciamento, assemblaggi e strumenti di calcolo per il laboratorio.",
  "Menu: costo per persona, simulazioni di prezzo e grammatura, proposte PDF.",
  "Controllo economico: margini, costi aziendali, cassa e scadenzario.",
  "Importazione assistita di ricette, DDT e fatture, con verifica dei dati.",
  "Libro ingredienti: assortimenti, generazione con verifiche e storico PDF.",
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "LabManager",
    template: "%s | LabManager",
  },
  authors: [{ name: "LabManager" }],
  creator: "LabManager",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const structuredDataGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      name: "LabManager",
      url: BASE_URL,
      inLanguage: "it-IT",
      description: PRODUCT_POSITIONING_DESCRIPTION,
      audience: PRODUCT_AUDIENCE,
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "LabManager",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.png`,
        contentUrl: `${BASE_URL}/images/logo.png`,
        caption: "LabManager Logo",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "labmanager.info@gmail.com",
        availableLanguage: ["Italian", "it"],
        areaServed: "IT",
      },
      areaServed: {
        "@type": "Country",
        name: "Italia",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${BASE_URL}/#softwareapplication`,
      name: "LabManager",
      url: BASE_URL,
      applicationCategory: "BusinessApplication",
      applicationSubCategory:
        "Gestionale per laboratori artigianali alimentari",
      description: PRODUCT_POSITIONING_DESCRIPTION,
      audience: PRODUCT_AUDIENCE,
      featureList: PRODUCT_FEATURES,
      additionalProperty: [
        {
          "@type": "PropertyValue",
          propertyID: "livelli-commerciali",
          name: "Livelli commerciali",
          value: COMMERCIAL_MANIFEST.tier.join(", "),
        },
        ...MAGAZZINO_CAPABILITIES.map((capability) => ({
          "@type": "PropertyValue",
          propertyID: capability.id,
          name: capability.publicCopy,
          value: "available-and-marketable",
        })),
      ],
      screenshot: [
        {
          "@type": "ImageObject",
          contentUrl: `${BASE_URL}/images/software-gestionale-pasticceria-desktop.png`,
          description:
            "Schermata di una versione precedente del menu principale di LabManager.",
          name: "LabManager: menu principale",
        },
        {
          "@type": "ImageObject",
          contentUrl: `${BASE_URL}/images/app-gestionale-pasticceria-android.jpg`,
          description:
            "Schermata di LabManager con una vista compatta delle attività del laboratorio.",
          name: "LabManager: vista compatta del lavoro",
        },
      ],
      inLanguage: "it-IT",
      countriesSupported: "IT",
      provider: { "@id": `${BASE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredDataGraph),
          }}
        />
        {children}
        <WhatsAppButton />
        <SiteScripts />
        <CloudflareWebAnalytics />
      </body>
    </html>
  );
}
