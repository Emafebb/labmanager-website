import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  ListChecks,
  PackageCheck,
  Truck,
  Wallet,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getCommercialCta } from "@/data/trial-access-cta-inventory";

const BASE_URL = "https://labmanagergestionale.com";
const PAGE_URL = `${BASE_URL}/ordini`;
const PAGE_TITLE = "Gestione ordini e piano di lavoro";
const PAGE_METADATA_TITLE = "Gestione ordini e piano di lavoro | LabManager";
const PAGE_DESCRIPTION =
  "Organizza ordini, ritiri, consegne, acconti e produzione collegata, senza separare il banco dal laboratorio.";

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
        url: `${BASE_URL}/images/og-image.png`,
        secureUrl: `${BASE_URL}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "LabManager - Gestione ordini e piano di lavoro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_METADATA_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${BASE_URL}/images/og-image.png`],
  },
};

const ordersPricingCta = getCommercialCta("orders-pricing");

const flowItems = [
  "Ordini cliente organizzati nel piano di lavoro.",
  "Ordini interni collegati al lavoro del laboratorio.",
  "Ritiro o consegna associati a ogni ordine.",
  "Acconti, saldi e report operativi per seguire il lavoro.",
];

const capabilityCards = [
  {
    icon: CalendarDays,
    title: "Ordini cliente e interni",
    text: "Riunisci ordini cliente e ordini interni in un piano di lavoro condiviso con il laboratorio.",
  },
  {
    icon: PackageCheck,
    title: "Produzione collegata",
    text: "Collega gli ordini alla produzione per sapere cosa preparare e seguire l'avanzamento del lavoro.",
  },
  {
    icon: Truck,
    title: "Ritiro e consegna",
    text: "Indica per ogni ordine se è previsto il ritiro oppure la consegna e organizzalo nel piano di lavoro.",
  },
  {
    icon: Wallet,
    title: "Acconti e saldi",
    text: "Registra acconti e saldi come informazioni operative collegate all'ordine.",
  },
  {
    icon: BarChart3,
    title: "Report operativi",
    text: "Consulta report operativi sugli ordini per controllare il lavoro completato e quello ancora da organizzare.",
  },
];

const workSteps = [
  {
    title: "Registra l'ordine",
    text: "Inserisci un ordine cliente o interno e indica se prevede ritiro o consegna.",
  },
  {
    title: "Collega la produzione",
    text: "Trasforma l'ordine in lavoro da preparare e segui la produzione collegata.",
  },
  {
    title: "Segui la chiusura",
    text: "Organizza ritiro o consegna e aggiorna acconti e saldi dell'ordine.",
  },
];

const planStats = [
  { label: "Da preparare", value: "12", detail: "righe ordine" },
  { label: "In produzione", value: "7", detail: "attivit\u00e0" },
  { label: "Da consegnare", value: "5", detail: "ritiri e consegne" },
];

const workPlanPreview = [
  {
    time: "08:00",
    title: "Basi e preparazioni",
    text: "Gli ordini collegati alla produzione diventano attività per il laboratorio.",
  },
  {
    time: "11:30",
    title: "Ordini cliente",
    text: "Il piano di lavoro mostra quali ordini cliente devono essere preparati.",
  },
  {
    time: "15:00",
    title: "Ritiro, consegna o sede",
    text: "Il piano separa ordini da ritirare, consegne e ordini interni tra sedi.",
  },
];

const faqs = [
  {
    question: "Posso gestire ordini cliente e ordini interni?",
    answer:
      "Sì. LabManager organizza sia gli ordini cliente sia gli ordini interni e li inserisce nel piano di lavoro del laboratorio.",
  },
  {
    question: "Come si collega la produzione agli ordini?",
    answer:
      "Gli ordini possono essere collegati alla produzione, così il laboratorio vede cosa preparare e può seguirne l'avanzamento.",
  },
  {
    question: "Posso organizzare ritiro e consegna?",
    answer:
      "Sì. Ogni ordine può indicare ritiro o consegna, in modo che il piano di lavoro rifletta come deve essere completato.",
  },
  {
    question: "Come vengono gestiti acconti e report?",
    answer:
      "Acconti e saldi restano informazioni operative dell'ordine. I report operativi aiutano a controllare il lavoro completato e quello ancora da organizzare.",
  },
];

export const ordersPageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: "it-IT",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#softwareapplication` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function OrdersPage() {
  return (
    <>

      <Navbar />
      <main id="main-content" className="pt-28">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ordersPageStructuredData),
          }}
        />

        <section
          className="bg-[#FAFBFE] px-6 pb-20"
          aria-labelledby="orders-heading"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_480px] lg:gap-16">
            <div className="animate-fade-in-up">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-primary shadow-sm">
                <ClipboardList size={16} aria-hidden="true" />
                <span>Ordini e Piano di Lavoro</span>
              </div>

              <h1
                id="orders-heading"
                className="mb-6 text-4xl font-bold tracking-tight text-gray-900 text-pretty sm:text-5xl lg:text-6xl"
              >
                Gestione ordini e piano di lavoro
              </h1>

              <p className="mb-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
                {PAGE_DESCRIPTION}
              </p>

              <p className="mb-8 max-w-2xl text-base leading-relaxed text-gray-600">
                Riunisci ordini cliente e interni, produzione collegata, ritiro
                e consegna, acconti, saldi e report operativi in un solo flusso.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={ordersPricingCta.destination}
                  className="inline-flex touch-manipulation items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white transition-[background-color,box-shadow] duration-200 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
                >
                  {ordersPricingCta.label}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link
                  href="#flusso-ordine"
                  className="inline-flex touch-manipulation items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-base font-semibold text-gray-700 transition-[border-color,box-shadow] duration-200 hover:border-gray-300 hover:shadow-md"
                >
                  Vedi come funziona
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
                      Piano di lavoro
                    </p>
                    <h2 className="text-2xl font-bold text-gray-900 text-pretty">
                      Cosa va preparato, quando e per chi
                    </h2>
                  </div>
                  <div className="shrink-0 rounded-2xl bg-primary/10 p-3 text-primary">
                    <ListChecks size={26} aria-hidden="true" />
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  Il piano di lavoro traduce ogni ordine in attivit&agrave;
                  operative e mantiene collegati ordine cliente o interno,
                  produzione, ritiro o consegna.
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {planStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-gray-100 bg-surface px-3 py-4 text-center"
                    >
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="mt-1 break-words text-xs font-semibold text-gray-600">
                        {stat.label}
                      </p>
                      <p className="mt-1 hidden text-xs text-gray-500 sm:block">
                        {stat.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  {workPlanPreview.map((item) => (
                    <article
                      key={item.time}
                      className="flex gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                    >
                      <div className="flex min-w-14 items-center gap-1 text-sm font-bold text-primary">
                        <Clock3 size={15} aria-hidden="true" />
                        <span>{item.time}</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-gray-600">
                          {item.text}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="flusso-ordine"
          className="scroll-mt-28 bg-white px-6 py-20"
          aria-labelledby="orders-flow-heading"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                Flusso operativo
              </p>
              <h2
                id="orders-flow-heading"
                className="mb-4 text-3xl font-bold text-gray-900 text-pretty sm:text-4xl"
              >
                Come funziona la gestione ordini in LabManager?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                L&apos;ordine non resta isolato: accompagna il lavoro dal banco al
                laboratorio, fino al ritiro o alla consegna.
              </p>
            </div>

            <div className="mb-12 grid gap-6 lg:grid-cols-3">
              {workSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-2xl border border-gray-100 bg-surface p-6"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Cosa puoi gestire con il modulo ordini
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {flowItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-gray-600"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          className="bg-surface px-6 py-20"
          aria-labelledby="orders-capabilities-heading"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                Ordini e operatività
              </p>
              <h2
                id="orders-capabilities-heading"
                className="mb-4 text-3xl font-bold text-gray-900 text-pretty sm:text-4xl"
              >
                Tutto il flusso ordini in un solo piano di lavoro
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                LabManager collega ordini cliente e interni, produzione,
                ritiro o consegna, acconti e report operativi.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {capabilityCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 w-fit rounded-xl bg-primary/10 p-3">
                    <card.icon
                      size={22}
                      className="text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {card.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="bg-white px-6 py-20"
          aria-labelledby="orders-faq-heading"
        >
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                Domande frequenti
              </p>
              <h2
                id="orders-faq-heading"
                className="text-3xl font-bold text-gray-900 text-pretty sm:text-4xl"
              >
                Domande sul modulo ordini
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-2xl border border-gray-100 bg-surface p-6"
                >
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {faq.question}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
