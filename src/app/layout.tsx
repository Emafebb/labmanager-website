import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
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
    default: "LabManager - Il tuo braccio destro in laboratorio",
    template: "%s | LabManager",
  },
  description:
    "L'app completa per gestire la tua pasticceria: ricette, ingredienti, costi, etichette EU 1169/2011, produzione e vendite. Disponibile per Android e Windows.",
  keywords: [
    "pasticceria",
    "gestione pasticceria",
    "gestione ricette",
    "labmanager",
    "app pasticceria",
    "costi ricette",
    "etichette alimentari",
    "EU 1169/2011",
    "software pasticceria",
    "gestione ingredienti",
    "produzione dolci",
    "gestione laboratorio",
  ],
  authors: [{ name: "LabManager" }],
  creator: "LabManager",
  openGraph: {
    title: "LabManager - Il tuo braccio destro in laboratorio",
    description:
      "L'app completa per gestire la tua pasticceria: ricette, ingredienti, costi, etichette e produzione. Scarica gratis per Android e Windows.",
    url: BASE_URL,
    siteName: "LabManager",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "LabManager - La tua pasticceria, sempre con te",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LabManager - Il tuo braccio destro in laboratorio",
    description:
      "L'app completa per gestire la tua pasticceria. Scarica gratis per Android e Windows.",
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
                  name: "LabManager",
                  url: BASE_URL,
                  inLanguage: "it",
                },
                {
                  "@type": "Organization",
                  name: "LabManager",
                  url: BASE_URL,
                  logo: `${BASE_URL}/images/logo.png`,
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    email: "labmanager.info@gmail.com",
                    availableLanguage: "Italian",
                  },
                  areaServed: {
                    "@type": "Country",
                    name: "Italia",
                  },
                },
                {
                  "@type": "SoftwareApplication",
                  name: "LabManager",
                  applicationCategory: "BusinessApplication",
                  applicationSubCategory: "Gestionale Pasticceria",
                  operatingSystem: "Android, Windows",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "EUR",
                  },
                  description:
                    "Software gestionale per pasticceria: gestisci ricette, ingredienti, costi, etichette alimentari EU 1169/2011, produzione e vendite.",
                  featureList:
                    "Gestione ricette, Bilanciamento, Calcolo costi, Etichette alimentari, Tabella nutrizionale, Dashboard produzione, Funzionamento offline",
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
