/*
THESIS: La ricetta è l'origine visibile di tutto il lavoro; la homepage rifiuta il classico hero SaaS con screenshot e griglia di feature.
OWN-WORLD: Una linea indaco continua, nodi tecnici, fondo porcellana e regole sottili organizzano ogni contenuto senza simulare l'app.
STORY: Il visitatore riconosce il proprio flusso, verifica la profondità tecnica e avvia la prova gratuita.
FIRST VIEWPORT: Promessa e CTA a sinistra; una mappa operativa interattiva occupa il lato destro e continua oltre la piega.
FORM: “Binario continuo”, prima composizione approvata; direzione La Mappa del Laboratorio, seed 33e7ee4d.
*/
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import OrdersPreview from "@/components/OrdersPreview";
import Warehouse from "@/components/Warehouse";
import TrialCallout from "@/components/TrialCallout";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import NewsletterPopup from "@/components/NewsletterPopup";
import WhatsAppButton from "@/components/WhatsAppButton";

const BASE_URL = "https://labmanagergestionale.com";
const HOME_TITLE = "Gestionale per laboratori alimentari | LabManager";
const HOME_DESCRIPTION =
  "Gestionale Light e Plus per pasticcerie, panifici, gelaterie, gastronomie, ristoranti e chef: ricette, food cost, produzione, magazzino e ordini.";

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

      <Navbar featuresHref="#funzionalita" />
      <main id="main-content">
        <Hero />
        <Features />
        <Warehouse />
        <OrdersPreview />
        <TrialCallout />
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
