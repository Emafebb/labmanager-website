import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageMotion from "@/components/PageMotion";
import { getCommercialCta } from "@/data/trial-access-cta-inventory";
import { TRIAL_DAYS } from "@/lib/pricing";
import PricingFAQ from "./pricing-faq";
import PricingSelector from "./pricing-selector";
export { pricingMagazzinoFeature } from "./pricing-selector";

const closingTrialCta = getCommercialCta("pricing-trial");

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
      <PageMotion />
      <Navbar />
      <main id="main-content" className="pricing-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pricingPageStructuredData),
          }}
        />
        <section className="page-lead">
          <h1>Un piano per il tuo lavoro.</h1>
          <p>
            Light per ricette e Food Cost. Plus per produzione, ordini e
            gestione dell’attività.
          </p>
          <p className="small-note">
            {TRIAL_DAYS} giorni di prova, senza carta di credito.
          </p>
        </section>
        <PricingSelector />
        <PricingFAQ />
        <section
          className="pricing-close section-space"
          aria-labelledby="pricing-close-heading"
        >
          <h2 id="pricing-close-heading">Comincia dal tuo laboratorio.</h2>
          <p>
            {TRIAL_DAYS} giorni con tutte le funzionalità Plus. Alla fine scegli
            Light o Plus nell’app, oppure non fai nulla e la prova si chiude da
            sola.
          </p>
          <a
            href={closingTrialCta.destination}
            data-registration-cta
            className="button"
          >
            {closingTrialCta.label}
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
