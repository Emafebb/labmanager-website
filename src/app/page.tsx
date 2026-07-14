import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import OrdersPreview from "@/components/OrdersPreview";
import Warehouse from "@/components/Warehouse";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import NewsletterPopup from "@/components/NewsletterPopup";
import WhatsAppButton from "@/components/WhatsAppButton";

const BASE_URL = "https://labmanagergestionale.com";
const HOME_TITLE =
  "Gestionale per pasticcerie, panifici e gelaterie | LabManager";
const HOME_DESCRIPTION =
  "Il gestionale per laboratori artigianali alimentari: ricette, food cost, produzione, etichette, magazzino e ordini. Prova gratuita di 14 giorni.";

export const metadata: Metadata = {
  title: {
    absolute: HOME_TITLE,
  },
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: BASE_URL,
    languages: {
      it: BASE_URL,
    },
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
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
        alt: "LabManager per ricette, produzione, magazzino e ordini",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: `${BASE_URL}/images/og-image.png`,
        alt: "LabManager per ricette, produzione, magazzino e ordini",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <NewsletterPopup />

      <Navbar />
      <main id="main-content">
        <Hero />
        <Features />
        <OrdersPreview />
        <Warehouse />
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
