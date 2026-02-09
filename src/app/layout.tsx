import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LabManager - Gestione Pasticceria Moderna",
  description:
    "L'app completa per gestire la tua pasticceria: ricette, ingredienti, costi, etichette EU 1169/2011, produzione e vendite. Disponibile per Android e Windows.",
  keywords: [
    "pasticceria",
    "gestione ricette",
    "labmanager",
    "app pasticceria",
    "costi ricette",
    "etichette alimentari",
  ],
  openGraph: {
    title: "LabManager - Gestione Pasticceria Moderna",
    description:
      "L'app completa per gestire la tua pasticceria. Scarica gratis per Android.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
