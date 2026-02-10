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
    default: "LabManager - Gestione Pasticceria Moderna",
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
    title: "LabManager - Gestione Pasticceria Moderna",
    description:
      "L'app completa per gestire la tua pasticceria: ricette, ingredienti, costi, etichette e produzione. Scarica gratis per Android e Windows.",
    url: BASE_URL,
    siteName: "LabManager",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LabManager - Gestione Pasticceria Moderna",
    description:
      "L'app completa per gestire la tua pasticceria. Scarica gratis per Android e Windows.",
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
        {children}
      </body>
    </html>
  );
}
