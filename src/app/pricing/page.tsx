import type { Metadata } from "next";
import {
  CheckCircle2,
  ChefHat,
  ClipboardList,
  FileCheck,
  Warehouse,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PRICING } from "@/lib/pricing";
import {
  MAGAZZINO_CANONICAL_COPY,
  MAGAZZINO_CAPABILITIES,
  MAGAZZINO_CLAIM_IDS,
} from "@/data/magazzino-capability-matrix";
import { getCommercialCta } from "@/data/trial-access-cta-inventory";
import PricingFAQ from "./pricing-faq";

const BASE_URL = "https://labmanagergestionale.com";
const PAGE_URL = `${BASE_URL}/pricing`;
const PAGE_TITLE = "Prezzi e prova gratuita";
const PAGE_METADATA_TITLE = `${PAGE_TITLE} | LabManager`;
const PAGE_DESCRIPTION =
  "Scopri il piano LabManager con prova gratuita di 14 giorni senza carta.";

export const metadata: Metadata = {
  title: { absolute: PAGE_METADATA_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      it: PAGE_URL,
    },
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
        alt: "LabManager - Prezzi e prova gratuita",
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

const pricingTrialCta = getCommercialCta("pricing-trial");

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

export const pricingMagazzinoFeature = {
  icon: Warehouse,
  title: "Magazzino",
  summary: MAGAZZINO_CANONICAL_COPY,
  items: MAGAZZINO_CAPABILITIES.map(({ publicCopy }) => publicCopy),
  claimIds: MAGAZZINO_CLAIM_IDS,
};

const FEATURES = [
  {
    icon: ChefHat,
    title: "Ricette e Food Cost",
    summary:
      "Organizza ricette e ingredienti, calcola costi e margini delle preparazioni.",
    items: [
      "Ricette con costi aggiornati",
      "Food Cost per ogni preparazione",
      "Quantità e produzione organizzate",
    ],
  },
  {
    icon: FileCheck,
    title: "Produzione ed Etichette",
    summary:
      "Organizza la produzione e prepara etichette con allergeni e documenti PDF.",
    items: [
      "Produzione giornaliera pianificata",
      "Etichette con allergeni",
      "Documenti PDF pronti per il lavoro",
    ],
  },
  pricingMagazzinoFeature,
  {
    icon: ClipboardList,
    title: "Ordini e Piano di Lavoro",
    summary:
      "Organizza ordini cliente e interni, produzione collegata, ritiro e consegna, acconti e report operativi.",
    items: [
      "Ordini cliente e interni",
      "Produzione collegata",
      "Ritiri, consegne, acconti e report operativi",
    ],
  },
];

const monthlyPrice = PRICING.monthly.price.toFixed(2).replace(".", ",");

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

        <section className="mb-16 px-6 text-center">
          <div className="mx-auto max-w-3xl animate-fade-in-up">
            <p className="mb-6 inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-primary">
              Prezzi
            </p>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
              Prezzi e prova gratuita
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
              Un piano completo per organizzare il lavoro del laboratorio, con
              modalità mensile o annuale e 14 giorni per provarlo senza carta.
            </p>
          </div>
        </section>

        <section
          className="mb-20 px-6"
          aria-labelledby="pricing-plan-heading"
        >
          <article
            data-pricing-plan="complete"
            className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl"
          >
            <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">
                  Piano LabManager
                </p>
                <h2
                  id="pricing-plan-heading"
                  className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl"
                >
                  Piano completo
                </h2>
                <p className="mb-7 leading-relaxed text-gray-600">
                  Tutte le funzionalità dell&apos;offerta corrente, senza moduli
                  aggiuntivi.
                </p>

                <div className="mb-7 rounded-2xl bg-primary/5 p-5">
                  <p className="text-lg font-bold text-primary">
                    {PRICING.trialDays} giorni di prova gratuita
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Accesso completo, senza carta e senza costi di attivazione.
                  </p>
                </div>

                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">
                  Sempre incluso
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {[
                    "Ricette, Food Cost, produzione ed etichette",
                    "Magazzino, ordini e piano di lavoro",
                    "2 sessioni attive simultanee",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col">
                <div className="grid gap-4 sm:grid-cols-2">
                  <section
                    data-payment-mode="monthly"
                    aria-labelledby="monthly-mode-heading"
                    className="rounded-2xl border border-gray-200 p-6"
                  >
                    <h3
                      id="monthly-mode-heading"
                      className="text-sm font-bold uppercase tracking-wider text-gray-500"
                    >
                      Modalità mensile
                    </h3>
                    <p className="mt-4 text-3xl font-bold text-gray-900">
                      €{monthlyPrice}/mese
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      Puoi disdire quando vuoi.
                    </p>
                  </section>

                  <section
                    data-payment-mode="annual"
                    aria-labelledby="annual-mode-heading"
                    className="rounded-2xl border-2 border-primary bg-primary/5 p-6"
                  >
                    <h3
                      id="annual-mode-heading"
                      className="text-sm font-bold uppercase tracking-wider text-primary"
                    >
                      Modalità annuale
                    </h3>
                    <p className="mt-4 text-3xl font-bold text-primary">
                      €{PRICING.yearly.price}/anno
                    </p>
                    <p className="mt-2 text-sm font-semibold text-primary">
                      Risparmi €{PRICING.yearly.saving} in un anno
                    </p>
                    <ul className="mt-5 space-y-3 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span>
                          <strong>2 sessioni private 1:1</strong> dedicate al
                          tuo utilizzo di LabManager
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <strong>Supporto prioritario</strong>
                      </li>
                    </ul>
                  </section>
                </div>

                <a
                  href={pricingTrialCta.destination}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-4 text-center text-base font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
                >
                  {pricingTrialCta.label}
                </a>
                <p className="mt-3 text-center text-sm text-gray-500">
                  La modalità di pagamento si sceglie al termine della prova.
                </p>
              </div>
            </div>
          </article>
        </section>

        <section
          className="bg-surface px-6 py-20"
          aria-labelledby="pricing-features-heading"
        >
          <div className="mx-auto max-w-5xl">
            <h2
              id="pricing-features-heading"
              className="mb-14 text-center text-3xl font-bold text-gray-900 sm:text-4xl"
            >
              Tutto quello che serve al laboratorio
            </h2>

            <div className="grid gap-8 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
                  data-magazzino-claim-ids={
                    "claimIds" in feature
                      ? feature.claimIds.join(" ")
                      : undefined
                  }
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon
                      size={24}
                      className="text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">
                    {feature.summary}
                  </p>
                  <ul className="space-y-2.5">
                    {feature.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-600"
                      >
                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PricingFAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
