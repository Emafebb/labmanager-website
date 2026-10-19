import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMotion from "@/components/PageMotion";
import WorkAreaLinks from "@/components/WorkAreaLinks";
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

const orders = [
  {
    time: "07:00",
    product: "Pane ai cereali",
    quantity: "24 kg",
    destination: "Consegna",
    state: "Pronto",
  },
  {
    time: "08:30",
    product: "Vassoio mignon",
    quantity: "1,2 kg",
    destination: "Ritiro",
    state: "Pronto",
  },
  {
    time: "10:00",
    product: "Torta di compleanno",
    quantity: "24 porzioni",
    destination: "Ritiro",
    state: "In produzione",
  },
  {
    time: "11:00",
    product: "Gelato al pistacchio",
    quantity: "8 kg",
    destination: "Interno",
    state: "Da preparare",
  },
];
const details = [
  [
    "Una vista sul lavoro",
    "Giorno, settimana, mese o stato: scegli come leggere gli ordini e filtra per cliente e sede.",
  ],
  [
    "Dentro la produzione",
    "Collega le righe d’ordine alle preparazioni e segui l’avanzamento del lavoro.",
  ],
  [
    "Ritiro e consegna",
    "Conserva le informazioni necessarie per completare ogni ordine, anche quando è interno al laboratorio.",
  ],
  [
    "Il peso effettivo",
    "Gestisci la vendita a peso e conferma quanto viene effettivamente consegnato prima della chiusura.",
  ],
  [
    "Acconti e saldi",
    "Segui i pagamenti dell’ordine e la registrazione degli incassi in cassa.",
  ],
  [
    "Lotti e report",
    "Collega la vendita ai lotti disponibili e consulta i report delle attività.",
  ],
];

export default function OrdersPage() {
  const pricing = getCommercialCta("orders-pricing");
  const trial = getCommercialCta("work-area-trial");
  return (
    <>
      <PageMotion />
      <Navbar />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ordersPageStructuredData),
          }}
        />
        <nav className="area-breadcrumb" aria-label="Percorso">
          <Link href="/">Home</Link>
          <Link href="/#funzionalita">Funzionalità</Link>
          <span aria-current="page">Ordini e Piano di lavoro</span>
        </nav>
        <section className="page-lead orders-lead">
          <div>
            <h1>
              Ogni ordine, <br />
              al suo posto.
            </h1>
            <p>
              Dal primo acconto all’ultima consegna. Il piano di lavoro collega
              il banco, il laboratorio e chi aspetta il prodotto.
            </p>
            <a href={trial.destination} className="button">
              {trial.label}
            </a>
            <p className="small-note">
              Ordini e piano di lavoro sono inclusi in Plus. Prova tutte le
              funzioni per 14 giorni, senza carta di credito.
            </p>
          </div>
          <Image
            src="/images/editorial/preparazioni.webp"
            alt="Preparazione di pasta ripiena per il lavoro del laboratorio"
            width={1536}
            height={1024}
            preload
            sizes="(max-width: 700px) 100vw, 40vw"
          />
        </section>
        <section
          id="flusso-ordine"
          className="orders-board section-space"
          aria-labelledby="orders-board-heading"
        >
          <div className="section-intro" data-reveal>
            <h2 id="orders-board-heading">
              Sai cosa <br />
              preparare.
            </h2>
            <p>
              Ordini cliente e preparazioni interne nello stesso piano. Ogni
              riga porta con sé quantità, destinazione e avanzamento.
            </p>
          </div>
          <div data-ui className="work-board">
            <table>
              <caption>
                Esempio di piano di lavoro, con dati illustrativi
              </caption>
              <thead>
                <tr>
                  <th scope="col">Orario</th>
                  <th scope="col">Preparazione</th>
                  <th scope="col">Quantità</th>
                  <th scope="col">Destinazione</th>
                  <th scope="col">Stato</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.product}>
                    <td>{order.time}</td>
                    <th scope="row">{order.product}</th>
                    <td>{order.quantity}</td>
                    <td>{order.destination}</td>
                    <td>
                      <span
                        className={`order-status${order.state === "Pronto" ? " order-status--ready" : ""}`}
                      >
                        {order.state}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="orders-details section-space">
          <h2 data-reveal>
            Fino alla <br />
            consegna.
          </h2>
          <dl>
            {details.map(([title, text]) => (
              <div key={title} data-reveal>
                <dt>{title}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section
          className="faq-section section-space"
          aria-labelledby="orders-faq"
        >
          <div className="section-intro">
            <h2 id="orders-faq">Ordini, in pratica.</h2>
            <p>Le risposte alle domande sul lavoro quotidiano.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details className="faq-item" key={faq.question}>
                <summary>
                  {faq.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <WorkAreaLinks currentHref="/ordini" />
        <section className="pricing-close section-space">
          <h2>
            Metti in ordine <br />
            il prossimo lavoro.
          </h2>
          <p>
            Scopri Plus e prova il flusso completo con gli ordini del tuo
            laboratorio.
          </p>
          <a href={trial.destination} className="button">
            {trial.label}
          </a>
          <Link href={pricing.destination} className="text-link">
            {pricing.label}
          </Link>
          <p className="small-note">
            Registrazione, scelta del piano e pagamento avvengono nella web app.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
