import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileSpreadsheet,
  ListChecks,
  PackageCheck,
  ReceiptText,
  Wallet,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";

const BASE_URL = "https://pastrylabmanager.com";
const PAGE_URL = `${BASE_URL}/ordini`;
const PAGE_TITLE = "Gestione ordini dei tuoi clienti - LabManager";
const PAGE_DESCRIPTION =
  "Gestisci ordini cliente, ritiri, consegne, acconti, produzione collegata, piano di lavoro e report con LabManager per pasticceria, panificio e laboratorio.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      it: PAGE_URL,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
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
        alt: "LabManager - Gestione ordini cliente, produzione e report",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${BASE_URL}/images/og-image.png`],
  },
};

const flowItems = [
  "Cliente anagrafica o rapido, telefono, sede, data evasione e fascia oraria.",
  "Ritiro o consegna, con numero ordine progressivo nel formato operativo ORD-DD.MM.YYYY-001.",
  "Pi\u00f9 righe nello stesso ordine, ognuna con note prodotto, note laboratorio, allergie dichiarate, dedica, colori, decorazioni e candele.",
  "Ordini cliente e ordini interni tra sedi, letti per giorno, settimana, mese o stato.",
];

const capabilityCards = [
  {
    icon: CalendarDays,
    title: "Ordini e agenda di lavoro",
    text: "Ogni ordine porta con s\u00e9 cliente, data evasione, ritiro o consegna, sede e righe operative. Il laboratorio vede cosa va preparato oggi e cosa sta arrivando nei giorni successivi.",
  },
  {
    icon: PackageCheck,
    title: "Produzione collegata",
    text: "Le righe ordine possono essere collegate a ricette o assemblaggi. Quando la produzione viene registrata, il lotto resta collegato alla richiesta cliente.",
  },
  {
    icon: Wallet,
    title: "Acconti, saldo e residuo",
    text: "L'ordine pu\u00f2 partire non pagato, con acconto o saldato. La vista cliente mostra totale ordini, incassato netto, residuo e giorni aperto.",
  },
  {
    icon: BellRing,
    title: "Notifiche operative",
    text: "Su Android arrivano notifiche push. Su Windows sono disponibili badge in navigazione, chip NEW sulle righe ordine e un suono leggero.",
  },
  {
    icon: FileSpreadsheet,
    title: "Report ed export",
    text: "Il Report Ordini include tab Prodotti, Clienti e Sedi, KPI operativi, riepiloghi cliente ed export Excel o PDF.",
  },
  {
    icon: ReceiptText,
    title: "Cassa collegata all'ordine",
    text: "La vendita generata dall'ordine conserva numero ordine, cliente e sede. La dashboard cassa legge gli incassi reali, non solo il totale ordine.",
  },
];

const workSteps = [
  {
    title: "Inserisci la richiesta",
    text: "Registra cliente, sede, data evasione, orario, ritiro o consegna e tutte le righe prodotto richieste.",
  },
  {
    title: "Prepara il laboratorio",
    text: "Collega le righe a ricette o assemblaggi, pianifica il lavoro settimanale e mantieni note e allergie visibili.",
  },
  {
    title: "Chiudi consegna e incasso",
    text: "Alla consegna puoi incassare il saldo, lasciare un residuo aperto o generare la vendita collegata all'ordine.",
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
    text: "Le righe ordine collegate a ricette diventano attivit\u00e0 per il laboratorio.",
  },
  {
    time: "11:30",
    title: "Ordini cliente",
    text: "Priorit\u00e0, fascia oraria, note prodotto e allergie restano visibili mentre lavori.",
  },
  {
    time: "15:00",
    title: "Ritiro, consegna o sede",
    text: "Il piano separa ordini da ritirare, consegne e ordini interni tra sedi.",
  },
];

const faqs = [
  {
    question: "LabManager gestisce ordini con acconto e saldo?",
    answer:
      "S\u00ec. Un ordine pu\u00f2 essere non pagato, con acconto o saldato. Il dettaglio mostra acconto, residuo e stato pagamento, cos\u00ec sai subito cosa resta da incassare.",
  },
  {
    question: "Gli ordini possono essere collegati alle ricette?",
    answer:
      "S\u00ec. Le righe ordine possono essere collegate a ricette o assemblaggi gi\u00e0 presenti in LabManager, riducendo la riscrittura tra richiesta cliente e produzione.",
  },
  {
    question: "Posso vedere gli ordini da preparare oggi?",
    answer:
      "S\u00ec. Le viste per giorno, settimana, mese e stato aiutano a distinguere cosa va preparato oggi, cosa \u00e8 pronto, cosa \u00e8 in ritardo e cosa deve essere ritirato o consegnato.",
  },
  {
    question: "Il report ordini esporta Excel o PDF?",
    answer:
      "S\u00ec. Il Report Ordini permette export Excel o PDF con clienti, prodotti, sedi, righe ordine, note operative, acconti e residui quando disponibili.",
  },
  {
    question: "La gestione pagamenti cliente \u00e8 un modulo contabile?",
    answer:
      "No. \u00c8 una vista operativa sugli incassi degli ordini: mostra totale ordini, incassato netto, residuo e giorni aperto. Non \u00e8 un modulo contabile fiscale, non crea fatture, prima nota o credito cliente.",
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
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Ordini",
          item: PAGE_URL,
        },
      ],
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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-gray-900 focus:shadow-lg"
      >
        Vai al contenuto principale
      </a>
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
                Gestione ordini e piano di lavoro per pasticceria, panificio e
                laboratorio
              </h1>

              <p className="mb-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
                LabManager include un modulo Ordini e Piano di Lavoro per
                trasformare una richiesta cliente in attivit&agrave; di
                laboratorio, produzione collegata, consegna o ritiro e incasso.
              </p>

              <p className="mb-8 max-w-2xl text-base leading-relaxed text-gray-600">
                &Egrave; pensato per chi gestisce ordini clienti, ordini interni
                tra sedi, acconti, saldi, note operative, allergie dichiarate e
                report giornalieri senza separare banco, laboratorio e
                amministrazione.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/#contatti"
                  className="inline-flex touch-manipulation items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white transition-[background-color,box-shadow] duration-200 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
                >
                  Richiedi una prova gratuita
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
                  operative: priorit&agrave;, fascia oraria, sede, stato di
                  produzione, note laboratorio e collegamento alla richiesta
                  cliente o interna.
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
                laboratorio, fino alla consegna e al controllo degli incassi.
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
                Produzione, cassa e report
              </p>
              <h2
                id="orders-capabilities-heading"
                className="mb-4 text-3xl font-bold text-gray-900 text-pretty sm:text-4xl"
              >
                Dal numero ordine al report di giornata
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Il gestionale ordini pasticceria di LabManager collega richieste
                cliente, lavorazioni, incassi e riepiloghi senza duplicare dati.
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
