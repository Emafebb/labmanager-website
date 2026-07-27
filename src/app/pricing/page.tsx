import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, ShieldCheck, Timer } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getCommercialCta } from "@/data/trial-access-cta-inventory";
import { TRIAL_DAYS, getCommercialOffer } from "@/lib/pricing";
import PricingFAQ from "./pricing-faq";
import PricingSelector from "./pricing-selector";
export { pricingMagazzinoFeature } from "./pricing-selector";

const closingTrialCta = getCommercialCta("pricing-trial");

const PLUS_ANNUAL_SESSIONS = getCommercialOffer("Plus", "annuale").supporto
  .sessioniIndividuali;

const TRIAL_REASSURANCE = [
  { label: `${TRIAL_DAYS} giorni di prova`, Icon: Timer },
  { label: "Senza carta di credito", Icon: ShieldCheck },
  { label: "Disdici quando vuoi", Icon: BadgeCheck },
] as const;

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
      <main id="main-content" className="pt-28">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pricingPageStructuredData),
          }}
        />

        <section className="mb-14 px-6">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <p className="mb-6 inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-widest text-primary">
                Prezzi
              </p>
              <h1 className="mb-6 text-[2.5rem] font-bold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl">
                Scegli tra Light e Plus
              </h1>
              <p className="text-lg leading-relaxed text-gray-600 sm:text-xl">
                Un&apos;unica prova completa, due livelli pensati per esigenze
                diverse e la libertà di scegliere la periodicità mensile o
                annuale.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-gray-600">
                {TRIAL_REASSURANCE.map(({ label, Icon }) => (
                  <li key={label} className="flex items-center gap-1.5">
                    <Icon
                      size={16}
                      className="text-primary"
                      aria-hidden="true"
                    />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <PricingSelector />
        <PricingFAQ />

        {/* Chi arriva in fondo alla FAQ è il lettore più convinto della pagina:
            senza questo blocco l'unica azione disponibile sarebbe il footer. */}
        <section
          className="bg-surface px-6 py-24"
          aria-labelledby="pricing-close-heading"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="pricing-close-heading"
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Provalo sul lavoro di questa settimana
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              {TRIAL_DAYS} giorni con tutte le funzionalità Plus. Alla fine
              scegli Light o Plus nell&apos;app, oppure non fai nulla e la prova
              si chiude da sola.
            </p>

            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-gray-600">
              {TRIAL_REASSURANCE.map(({ label, Icon }) => (
                <li key={label} className="flex items-center gap-1.5">
                  <Icon size={16} className="text-primary" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>

            <a
              href={closingTrialCta.destination}
              data-registration-cta
              className="group touch-target mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
            >
              {closingTrialCta.label}
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            {PLUS_ANNUAL_SESSIONS.length > 0 ? (
              <p className="mt-6 leading-relaxed text-gray-600">
                Il timore più comune è il tempo per partire. Con Plus annuale
                non parti da solo: sono incluse{" "}
                <span className="font-semibold text-gray-900">
                  {PLUS_ANNUAL_SESSIONS.length} sessioni individuali (
                  {PLUS_ANNUAL_SESSIONS.join(" e ")})
                </span>
                .
              </p>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
