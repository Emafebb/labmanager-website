import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import CloudflareWebAnalytics from "@/components/CloudflareWebAnalytics";
import SiteScripts from "@/components/SiteScripts";
import {
  MAGAZZINO_CANONICAL_COPY,
  MAGAZZINO_CAPABILITIES,
} from "@/data/magazzino-capability-matrix";
import "./globals.css";

const BASE_URL = "https://labmanagergestionale.com";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "LabManager: Gestionale Pasticceria | Android & Windows",
    template: "%s | LabManager",
  },
  description:
    "Gestionale per pasticceria, panificio, gelateria e ristorante: ricette, costi, etichette allergeni e magazzino. Offline su Android e Windows. Prova 14 giorni.",
  keywords: [
    "gestionale pasticceria",
    "pasticceria",
    "software pasticceria",
    "app pasticceria",
    "gestione ricette",
    "costi ricette",
    "etichette alimentari",
    "software gestionale pasticceria",
    "calcolo costi ricette",
    "gestione ingredienti",
    "app ricette pasticceria",
    "gestione laboratorio",
    "produzione dolci",
    "tracciabilità ingredienti",
    "valori nutrizionali ricette",
    "app pasticceria android",
    "software offline pasticceria",
    "gestionale panificio",
    "gestionale ristorante",
    "gestionale gelateria",
    "software gelateria",
    "software laboratorio alimentare",
    "gestionale cucina professionale",
    "software ristorazione",
    "calcolo food cost ristorante",
    "gestione magazzino pasticceria",
    "magazzino multi-sede",
    "scarico FIFO ingredienti",
    "alert scadenze ingredienti",
    "tracciabilità lotti",
    "ricevimento merci laboratorio",
    "giacenze materie prime",
  ],
  authors: [{ name: "LabManager" }],
  creator: "LabManager",
  openGraph: {
    title: "Gestionale Pasticceria, Gelateria e Ristorante: Ricette, Costi, Allergeni | LabManager",
    description:
      "App gestionale per pasticcerie, panifici, gelaterie e ristoranti: gestisci ricette, calcola costi e margini, genera etichette con allergeni. Funziona offline su Android e Windows.",
    url: BASE_URL,
    siteName: "LabManager",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/images/og-image.png`,
        secureUrl: `${BASE_URL}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "LabManager - Software gestionale per pasticceria con ricette, costi ed etichette",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gestionale Pasticceria su Android & Windows | LabManager",
    description:
      "Gestisci la tua pasticceria, gelateria o ristorante con il gestionale completo: ricette, calcolo costi, etichette alimentari con allergeni. Funziona offline.",
    images: [`${BASE_URL}/images/og-image.png`],
  },
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
      description:
        "Software gestionale per pasticceria, panificio, gelateria e ristorante: gestisci ricette, ingredienti, costi, etichette alimentari, produzione e vendite.",
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
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Gestionale Pasticceria e Ristorazione",
      operatingSystem: ["Android", "Windows"],
      description:
        "Software gestionale per pasticceria, panificio, gelateria e ristorante: gestisci ricette, ingredienti, costi, etichette alimentari, produzione e vendite. Funziona offline su Android e Windows. Trial gratuito di 14 giorni.",
      fileSize: ["98468661", "19433664"],
      releaseNotes:
        "Nuovo modulo Ordini e Piano di Lavoro con ordini cliente, ordini interni tra sedi, produzione collegata, acconti, residui, report ordini, export e notifiche operative.",
      datePublished: "2025-10-01",
      dateModified: "2026-06-04",
      softwareVersion: "0.0.9",
      featureList: [
        "Gestione ricette digitali con ingredienti e procedimenti",
        "Calcolo automatico costi ricette e margini",
        "Bilanciamento composizione ricette (zuccheri, grassi, proteine)",
        MAGAZZINO_CANONICAL_COPY,
        "Creazione assemblaggi multi-ricetta",
        "Calcolo tabelle nutrizionali automatiche",
        "Generazione etichette alimentari con allergeni",
        "Dashboard produzione e vendite",
        "Funzionamento offline con sincronizzazione cloud",
        "Esportazione PDF e stampa documenti",
        "Tools professionali per laboratorio",
        "Gestione team con ruoli e permessi",
        "Gestione ordini cliente con ritiro, consegna, acconti e saldo",
        "Ordini interni tra sedi e piano di lavoro del laboratorio",
        "Produzione collegata a ricette, assemblaggi e lotti",
        "Report Ordini con export Excel e PDF",
        "Notifiche ordini su Android e Windows",
      ],
      additionalProperty: MAGAZZINO_CAPABILITIES.map((capability) => ({
        "@type": "PropertyValue",
        propertyID: capability.id,
        name: capability.publicCopy,
        value: "available-and-marketable",
      })),
      screenshot: [
        {
          "@type": "ImageObject",
          contentUrl: `${BASE_URL}/images/software-gestionale-pasticceria-desktop.png`,
          description:
            "Screenshot desktop di LabManager con gestione ricette e calcolo costi",
          name: "LabManager Desktop Interface",
        },
        {
          "@type": "ImageObject",
          contentUrl: `${BASE_URL}/images/app-gestionale-pasticceria-android.jpg`,
          description: "Screenshot mobile di LabManager per Android",
          name: "LabManager Mobile App",
        },
      ],
      softwareRequirements: "Android 5.0+ o Windows 10+",
      inLanguage: "it-IT",
      availableOnDevice: ["Desktop", "Mobile", "Tablet"],
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
    <html lang="it" className={dmSans.variable}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredDataGraph),
          }}
        />
        {children}
        <SiteScripts />
        <CloudflareWebAnalytics />
      </body>
    </html>
  );
}
