import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const BASE_URL = "https://pastrylabmanager.com";

const TABNAV_WIDGET_CONFIG = {
  language: "it",
  color: "#405ec3",
  buttonColor: "#3254c3",
  buttonSize: "large",
  widgetSize: "small",
  widgetLocation: "right",
  buttonLocation: "bottom",
} as const;

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
    "Gestionale per pasticceria, panificio e ristorante: ricette, costi, etichette con allergeni e magazzino. Funziona offline su Android e Windows. Provalo gratis!",
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
    "software laboratorio alimentare",
    "gestionale cucina professionale",
    "software ristorazione",
    "calcolo food cost ristorante",
    "gestione magazzino pasticceria",
    "magazzino multi-sede",
    "gestione fornitori pasticceria",
    "scarico FIFO ingredienti",
    "alert scadenze ingredienti",
    "tracciabilità lotti",
    "ricevimento merci laboratorio",
    "giacenze materie prime",
  ],
  authors: [{ name: "LabManager" }],
  creator: "LabManager",
  openGraph: {
    title: "Gestionale Pasticceria e Ristorante: Ricette, Costi, Allergeni | LabManager",
    description:
      "App gestionale per pasticcerie, panifici e ristoranti: gestisci ricette, calcola costi e margini, genera etichette con allergeni. Funziona offline su Android e Windows.",
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
      "Gestisci la tua pasticceria o ristorante con il gestionale completo: ricette, calcolo costi, etichette alimentari con allergeni. Funziona offline.",
    images: [`${BASE_URL}/images/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "it": BASE_URL,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

const FREE_OFFER = {
  "@type": "Offer",
  price: "0",
  priceCurrency: "EUR",
  availability: "https://schema.org/InStock",
} as const;

const structuredDataGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      name: "LabManager",
      url: BASE_URL,
      inLanguage: "it-IT",
      description:
        "Software gestionale per pasticceria, panificio e ristorante: gestisci ricette, ingredienti, costi, etichette alimentari, produzione e vendite.",
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
      offers: FREE_OFFER,
      description:
        "Software gestionale per pasticceria, panificio e ristorante: gestisci ricette, ingredienti, costi, etichette alimentari, produzione e vendite. Funziona offline, nessun abbonamento richiesto (in fase di sviluppo).",
      downloadUrl: [
        "https://play.google.com/store/apps/details?id=com.labmanager",
        "https://ndlsifytatricfutjsvu.supabase.co/storage/v1/object/public/releases/LabManager-Setup.exe",
      ],
      fileSize: "47185920",
      releaseNotes:
        "Nuovo modulo magazzino: gestione giacenze multi-sede, ricevimento merci con tracciabilità lotti, scarico FIFO automatico, alert scadenze, anagrafica fornitori e trasferimenti tra sedi.",
      datePublished: "2024-01-15",
      dateModified: "2026-04-16",
      softwareVersion: "2.2.0",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "14",
        bestRating: "5",
        worstRating: "1",
      },
      featureList: [
        "Gestione ricette digitali con ingredienti e procedimenti",
        "Calcolo automatico costi ricette e margini",
        "Bilanciamento composizione ricette (zuccheri, grassi, proteine)",
        "Gestione inventario ingredienti e semilavorati",
        "Creazione assemblaggi multi-ricetta",
        "Calcolo tabelle nutrizionali automatiche",
        "Generazione etichette alimentari con allergeni",
        "Dashboard produzione e vendite",
        "Funzionamento offline con sincronizzazione cloud",
        "Esportazione PDF e stampa documenti",
        "Tools professionali per laboratorio",
        "Gestione team con ruoli e permessi",
        "Gestione magazzino multi-sede con disponibilità in tempo reale",
        "Ricevimento merci con tracciabilità lotti e date di scadenza",
        "Scarico FIFO automatico degli ingredienti",
        "Alert configurabili per prodotti in scadenza",
        "Anagrafica fornitori con condizioni di pagamento e scontistica",
        "Trasferimenti merce tra sedi con tracciabilità completa",
      ],
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
    
    {
      "@type": "HowTo",
      "@id": `${BASE_URL}/#howto-install-apk`,
      name: "Come installare LabManager APK su Android",
      description: "Guida completa per installare l'app LabManager da file APK su dispositivi Android",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Scarica il file APK",
          text: "Scarica il file APK di LabManager dal link fornito",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Abilita origini sconosciute",
          text: "Vai in Impostazioni > Sicurezza e abilita 'Origini sconosciute' o 'Installa app sconosciute'",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Installa l'APK",
          text: "Apri il file APK scaricato e segui le istruzioni per completare l'installazione",
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_URL,
        },
      ],
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
        <Analytics />
        <SpeedInsights />
        <Script
          id="tabnav-accessibility-widget"
          src="https://widget.tabnav.com/limited-widget.min.js.gz"
          strategy="lazyOnload"
          tnv-data-config={JSON.stringify(TABNAV_WIDGET_CONFIG)}
        />
        <noscript>
          JavaScript is required for our{" "}
          <a href="https://tabnav.com/accessibility-widget">
            accessibility widget
          </a>{" "}
          to work properly.
        </noscript>
      </body>
    </html>
  );
}
