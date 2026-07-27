/*
 * THESIS: questa pagina possiede il tabellone del sabato — il piano di lavoro diviso
 * per come l'ordine deve finire (ritiro, consegna, ordine interno), con lo stato di
 * produzione scritto sulla riga. Rifiuta l'impaginato che questa pagina spediva prima:
 * hero + occhiello + tre card icona-titolo-testo + metriche 12/7/5 + FAQ a card.
 * OWN-WORLD: sistema LabManager invariato — indaco #4403af come unico accento, DM Sans
 * 400/600/700, superfici bianco / #F8F9FA / #FAFBFE, ombre ≤8%, scala raggi 8→12→16→24,
 * tratti 1px #E5E7EB. Il tabellone è la nuova famiglia: corsie identiche, celle ordine
 * identiche su fondo grigio senza bordo né ombra, verde solo su "Pronto".
 * STORY: il titolare riconosce il proprio sabato dentro il primo schermo; il capo
 * laboratorio vede che la riga porta lo stato di produzione, non solo un nome. Azione:
 * Scopri i prezzi.
 * FIRST VIEWPORT: occhiello, h1, riga d'offerta, le due CTA; subito sotto il tabellone a
 * larghezza piena del contenitore, tre corsie orizzontali che si aprono in sequenza.
 * FORM: struttura 5 della lista per risonanza (il tabellone per destinazione), staging
 * piano — l'artefatto guida a scala reale, nessuna rivelazione allo scroll.
 * Seed: 5e156d8e (surface / persuade).
 */
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeftRight,
  ArrowRight,
  BarChart3,
  CalendarDays,
  PackageCheck,
  Store,
  Truck,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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

/* Stato di produzione della riga d'ordine. L'indaco marca l'unica corsa attiva; il verde
   è uso semantico di esito positivo, l'unico ammesso fuori dall'accento. */
type OrderState = "da-preparare" | "in-produzione" | "pronto";

const orderStates: Record<OrderState, { label: string; className: string }> = {
  "da-preparare": {
    label: "Da preparare",
    className: "bg-white text-gray-600 ring-1 ring-inset ring-card-border",
  },
  "in-produzione": {
    label: "In produzione",
    className: "bg-primary/10 text-primary",
  },
  pronto: {
    label: "Pronto",
    className: "bg-success/10 text-success",
  },
};

type BoardOrder = {
  time: string;
  item: string;
  party: string;
  state: OrderState;
  note?: string;
};

type BoardLane = {
  id: string;
  icon: LucideIcon;
  name: string;
  count: string;
  orders: readonly BoardOrder[];
};

const boardLanes: readonly BoardLane[] = [
  {
    id: "ritiro",
    icon: Store,
    name: "Ritiro al banco",
    count: "3 ordini cliente",
    orders: [
      {
        time: "08:30",
        item: "Vassoio mignon 1,2 kg",
        party: "Cliente Bianchi",
        state: "pronto",
      },
      {
        time: "10:00",
        item: "Torta 24 porzioni",
        party: "Cliente Ferrari",
        state: "in-produzione",
        note: "Acconto registrato, saldo al ritiro",
      },
      {
        time: "11:30",
        item: "Crostate di frutta ×6",
        party: "Cliente Neri",
        state: "da-preparare",
      },
    ],
  },
  {
    id: "consegna",
    icon: Truck,
    name: "Consegna",
    count: "3 consegne",
    orders: [
      {
        time: "07:00",
        item: "Brioche ×80",
        party: "Bar Centrale",
        state: "pronto",
      },
      {
        time: "09:00",
        item: "Semifreddi ×12",
        party: "Hotel Aurora",
        state: "in-produzione",
        note: "Saldo alla consegna",
      },
      {
        time: "15:00",
        item: "Pasticceria mignon 3 kg",
        party: "Bottega Verdi",
        state: "da-preparare",
      },
    ],
  },
  {
    id: "interno",
    icon: ArrowLeftRight,
    name: "Ordine interno",
    count: "3 ordini interni",
    orders: [
      {
        time: "05:30",
        item: "Basi e semilavorati",
        party: "Per la produzione del giorno",
        state: "in-produzione",
      },
      {
        time: "06:30",
        item: "Pan di Spagna ×8",
        party: "Sede via Roma",
        state: "da-preparare",
      },
      {
        time: "14:00",
        item: "Frolla 6 kg",
        party: "Scorta per lunedì",
        state: "da-preparare",
      },
    ],
  },
];

const workSteps = [
  {
    title: "Registra l'ordine",
    text: "Inserisci un ordine cliente o interno e indica subito se prevede ritiro o consegna.",
  },
  {
    title: "Collega la produzione",
    text: "L'ordine diventa lavoro da preparare: la produzione collegata entra nel piano del laboratorio.",
  },
  {
    title: "Segui la chiusura",
    text: "Organizza il ritiro o la consegna e aggiorna acconti e saldi sulla riga dell'ordine.",
  },
  {
    title: "Controlla il lavoro fatto",
    text: "I report operativi mostrano cosa è stato completato e cosa resta ancora da organizzare.",
  },
];

const orderAnatomy = [
  { label: "Cliente", value: "Ferrari, ordine cliente" },
  { label: "Produzione collegata", value: "In produzione — impasto e farcitura" },
  { label: "Chiusura", value: "Ritiro al banco, sabato alle 10:00" },
  { label: "Acconti e saldi", value: "Acconto registrato, saldo al ritiro" },
];

const capabilities = [
  {
    icon: CalendarDays,
    title: "Ordini cliente e interni",
    text: "Un solo piano di lavoro per le richieste del banco e per quello che il laboratorio deve preparare per sé.",
  },
  {
    icon: PackageCheck,
    title: "Produzione collegata",
    text: "L'ordine diventa lavoro: il laboratorio vede cosa preparare e a che punto è arrivato.",
  },
  {
    icon: Truck,
    title: "Ritiro e consegna",
    text: "Ogni ordine dichiara come deve chiudersi, e il piano di lavoro lo organizza di conseguenza.",
  },
  {
    icon: Wallet,
    title: "Acconti e saldi",
    text: "Acconto e saldo restano attaccati all'ordine come informazione operativa, non su un foglio a parte.",
  },
  {
    icon: BarChart3,
    title: "Report operativi",
    text: "A fine giornata sai cosa è stato completato e cosa resta ancora da organizzare.",
  },
];

const closingChain = [
  "Ordine",
  "Produzione collegata",
  "Ritiro o consegna",
  "Report operativi",
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

function OrderStateChip({ state }: { state: OrderState }) {
  const { label, className } = orderStates[state];

  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}
    >
      {label}
    </span>
  );
}

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
          className="bg-[#FAFBFE] px-6 pb-24"
          aria-labelledby="orders-heading"
        >
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
              Ordini e Piano di Lavoro
            </p>

            <h1
              id="orders-heading"
              className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-gray-900 text-pretty sm:text-5xl lg:text-[3.5rem]"
            >
              Gestione ordini e piano di lavoro
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
              {PAGE_DESCRIPTION}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={ordersPricingCta.destination}
                className="touch-target group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-white transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_10px_15px_-3px_rgba(68,3,175,0.2)]"
              >
                {ordersPricingCta.label}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="#flusso-ordine"
                className="touch-target inline-flex items-center justify-center rounded-xl border border-card-border bg-white px-7 py-3.5 text-base font-semibold text-gray-700 transition-[border-color,box-shadow] duration-200 hover:border-gray-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
              >
                Vedi come funziona
              </Link>
            </div>

            <div className="mt-16">
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-pretty sm:text-3xl">
                  Il tabellone di un sabato mattina
                </h2>
                <p className="text-sm text-gray-500">
                  Esempio di piano di lavoro
                </p>
              </div>

              <div className="overflow-hidden rounded-3xl border border-card-border bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                {boardLanes.map((lane, laneIndex) => (
                  <div
                    key={lane.id}
                    className="animate-fade-in-up border-t border-card-border p-5 first:border-t-0 sm:p-7 lg:p-8"
                    style={{
                      animationDelay: `${laneIndex * 90}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <div className="grid gap-5 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:gap-10">
                      <div className="flex items-center gap-3 lg:block">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary lg:mb-3">
                          <lane.icon size={20} aria-hidden="true" />
                        </div>
                        <div>
                          <h3
                            id={`lane-${lane.id}`}
                            className="text-base font-bold text-gray-900"
                          >
                            {lane.name}
                          </h3>
                          <p className="text-sm text-gray-500">{lane.count}</p>
                        </div>
                      </div>

                      <ul
                        aria-labelledby={`lane-${lane.id}`}
                        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                      >
                        {lane.orders.map((order) => (
                          <li
                            key={`${lane.id}-${order.time}`}
                            className="rounded-xl bg-surface p-4"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-sm font-bold text-primary">
                                {order.time}
                              </span>
                              <OrderStateChip state={order.state} />
                            </div>
                            <p className="mt-2.5 text-sm font-bold leading-snug text-gray-900">
                              {order.item}
                            </p>
                            <p className="mt-1 text-sm leading-snug text-gray-600">
                              {order.party}
                            </p>
                            {order.note ? (
                              <p className="mt-2.5 border-t border-card-border pt-2.5 text-xs leading-snug text-gray-500">
                                {order.note}
                              </p>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="flusso-ordine"
          className="scroll-mt-28 bg-white px-6 py-24"
          aria-labelledby="orders-flow-heading"
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
                Flusso operativo
              </p>
              <h2
                id="orders-flow-heading"
                className="text-3xl font-bold tracking-tight text-gray-900 text-pretty sm:text-4xl"
              >
                Come funziona la gestione ordini in LabManager?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                L&apos;ordine non resta isolato: accompagna il lavoro dal banco al
                laboratorio, fino al ritiro o alla consegna.
              </p>
            </div>

            <ol>
              {workSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="relative flex gap-5 pb-9 last:pb-0"
                >
                  {index < workSteps.length - 1 ? (
                    <span
                      className="absolute bottom-0 left-5 top-10 w-px -translate-x-1/2 bg-card-border"
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-lg font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 max-w-xl leading-relaxed text-gray-600">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="bg-surface px-6 py-24"
          aria-labelledby="orders-capabilities-heading"
        >
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
              Che cosa porta con sé un ordine
            </p>
            <h2
              id="orders-capabilities-heading"
              className="max-w-3xl text-3xl font-bold tracking-tight text-gray-900 text-pretty sm:text-4xl"
            >
              Una riga d&apos;ordine tiene insieme il lavoro che genera
            </h2>

            <div className="mt-12 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="rounded-3xl border border-card-border bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-primary">10:00</span>
                  <OrderStateChip state="in-produzione" />
                </div>
                <p className="mt-3 text-2xl font-bold tracking-tight text-gray-900">
                  Torta 24 porzioni
                </p>

                <dl className="mt-6">
                  {orderAnatomy.map((row) => (
                    <div
                      key={row.label}
                      className="border-t border-card-border py-3.5 sm:flex sm:items-baseline sm:gap-6"
                    >
                      <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500 sm:w-48 sm:shrink-0">
                        {row.label}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-gray-900 sm:mt-0">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <ul>
                {capabilities.map((capability) => (
                  <li
                    key={capability.title}
                    className="flex gap-5 border-t border-card-border py-6 first:border-t-0 first:pt-0"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-card-border bg-white text-primary shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                      <capability.icon size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        {capability.title}
                      </h3>
                      <p className="mt-1.5 leading-relaxed text-gray-600">
                        {capability.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          className="bg-white px-6 py-24"
          aria-labelledby="orders-faq-heading"
        >
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
              Domande frequenti
            </p>
            <h2
              id="orders-faq-heading"
              className="text-3xl font-bold tracking-tight text-gray-900 text-pretty sm:text-4xl"
            >
              Domande sul modulo ordini
            </h2>

            <div className="mt-10">
              {faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="border-t border-card-border py-7 sm:grid sm:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] sm:gap-10"
                >
                  <h3 className="text-lg font-bold text-gray-900 text-pretty">
                    {faq.question}
                  </h3>
                  <p className="mt-2 leading-relaxed text-gray-600 sm:mt-0">
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="border-t border-card-border bg-[#FAFBFE] px-6 py-24"
          aria-labelledby="orders-close-heading"
        >
          <div className="mx-auto max-w-7xl">
            <h2
              id="orders-close-heading"
              className="max-w-3xl text-3xl font-bold tracking-tight text-gray-900 text-pretty sm:text-4xl"
            >
              L&apos;ordine non finisce al banco
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
              Dalla richiesta del cliente al lavoro del laboratorio, fino alla
              chiusura: una sola catena, un solo piano di lavoro.
            </p>

            <ol className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
              {closingChain.map((stage, index) => (
                <li key={stage} className="flex items-center gap-4">
                  {index > 0 ? (
                    <ArrowRight
                      size={20}
                      className="shrink-0 text-primary"
                      aria-hidden="true"
                    />
                  ) : null}
                  {stage}
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
