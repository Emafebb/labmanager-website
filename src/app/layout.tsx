import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const BASE_URL = "https://pastrylabmanager.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "LabManager - Software Gestionale Pasticceria | Ricette e Costi",
    template: "%s | LabManager",
  },
  description:
    "Gestisci la tua pasticceria in modo professionale: ricette, costi, etichette alimentari e produzione. Software gratuito per Android e Windows. Scarica subito!",
  keywords: [
    "pasticceria",
    "gestione pasticceria",
    "gestione ricette",
    "labmanager",
    "app pasticceria",
    "costi ricette",
    "etichette alimentari",
    "software pasticceria",
    "gestione ingredienti",
    "produzione dolci",
    "gestione laboratorio",
    "software gestionale pasticceria",
    "calcolo costi ricette",
    "app ricette pasticceria",
    "tracciabilità ingredienti",
    "valori nutrizionali ricette",
  ],
  authors: [{ name: "LabManager" }],
  creator: "LabManager",
  openGraph: {
    title: "LabManager: Gestisci la tua Pasticceria Professionalmente",
    description:
      "Software gratuito per pasticcerie. Ricette, costi, etichette. Funziona offline. Nessun abbonamento!",
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
        alt: "LabManager - Software gestionale gratuito per pasticceria con ricette, costi ed etichette",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LabManager: Gestione Pasticceria Gratis & Offline",
    description:
      "Software gratuito per pasticcerie: ricette, costi, etichette alimentari e produzione. Scarica ora per Android e Windows!",
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
      "x-default": BASE_URL,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${BASE_URL}/#website`,
                  name: "LabManager",
                  url: BASE_URL,
                  inLanguage: "it-IT",
                  description:
                    "Software gestionale per pasticceria: gestisci ricette, ingredienti, costi, etichette alimentari, produzione e vendite.",
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
                  applicationSubCategory: "Gestionale Pasticceria",
                  operatingSystem: ["Android", "Windows"],
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "EUR",
                    availability: "https://schema.org/InStock",
                  },
                  description:
                    "Software gestionale per pasticceria: gestisci ricette, ingredienti, costi, etichette alimentari, produzione e vendite. Funziona offline, nessun abbonamento richiesto.",
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
                  ],
                  screenshot: [
                    {
                      "@type": "ImageObject",
                      contentUrl: `${BASE_URL}/images/Screenshot%20DESKTOP.png`,
                      description:
                        "Screenshot desktop di LabManager con gestione ricette e calcolo costi",
                      name: "LabManager Desktop Interface",
                    },
                    {
                      "@type": "ImageObject",
                      contentUrl: `${BASE_URL}/images/screen%20smartphone.jpg`,
                      description:
                        "Screenshot mobile di LabManager per Android",
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
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: BASE_URL,
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "Funzionalità",
                      item: `${BASE_URL}/#funzionalita`,
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: "Piattaforme",
                      item: `${BASE_URL}/#piattaforme`,
                    },
                    {
                      "@type": "ListItem",
                      position: 4,
                      name: "FAQ",
                      item: `${BASE_URL}/#faq`,
                    },
                  ],
                },
              ],
            }),
          }}
        />
        {children}
        <Script
          src="https://embeds.iubenda.com/widgets/468f18b9-c49c-4c8a-8a3f-bc63040f7939.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
