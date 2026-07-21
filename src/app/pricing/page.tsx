import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import PricingFAQ from "./pricing-faq";
import PricingSelector from "./pricing-selector";
export { pricingMagazzinoFeature } from "./pricing-selector";

const BASE_URL = "https://labmanagergestionale.com";
const PAGE_URL = `${BASE_URL}/pricing`;
const PAGE_TITLE = "Prezzi Light e Plus";
const PAGE_METADATA_TITLE = `${PAGE_TITLE} | LabManager`;
const PAGE_DESCRIPTION =
  "Confronta LabManager Light e Plus, prezzi mensili e annuali, funzionalità, supporto e prova gratuita di 14 giorni senza carta.";

export const metadata: Metadata = {
  title: { absolute: PAGE_METADATA_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
    languages: { it: PAGE_URL },
  },
  openGraph: {
    title: PAGE_METADATA_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "LabManager",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/images/pricing-og-image.png`,
        secureUrl: `${BASE_URL}/images/pricing-og-image.png`,
        width: 1200,
        height: 630,
        alt: "LabManager - Prezzi Light e Plus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_METADATA_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${BASE_URL}/images/pricing-og-image.png`],
  },
};

export const pricingPageStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  inLanguage: "it-IT",
  isPartOf: { "@id": `${BASE_URL}/#website` },
  about: { "@id": `${BASE_URL}/#softwareapplication` },
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pb-24 pt-28">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pricingPageStructuredData),
          }}
        />

        <section className="mb-14 px-6 text-center">
          <div className="mx-auto max-w-3xl animate-fade-in-up">
            <p className="mb-6 inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-primary">
              Prezzi
            </p>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
              Scegli tra Light e Plus
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
              Un&apos;unica prova completa, due livelli pensati per esigenze
              diverse e la libertà di scegliere la periodicità mensile o
              annuale.
            </p>
          </div>
        </section>

        <PricingSelector />
        <PricingFAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
