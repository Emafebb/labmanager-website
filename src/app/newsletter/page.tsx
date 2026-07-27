/*
THESIS: una superficie di servizio per restare informati, non un blog né un archivio di uscite.
OWN-WORLD: indaco profondo, bianco freddo, righe operative e superfici nette del sistema LabManager.
STORY: il visitatore capisce cosa può ricevere e completa l’iscrizione senza deviazioni.
FIRST VIEWPORT: titolo e tre righe informative guidano al form, ancorato a destra come unica azione primaria.
FORM: “Registro essenziale”, posizione 7; staging con contenuto lineare e form laterale, seed 4748ffa6.
*/

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  ClipboardCheck,
  ListChecks,
  MailCheck,
  PanelsTopLeft,
  ShieldCheck,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NewsletterForm from "@/components/NewsletterForm";
import WhatsAppButton from "@/components/WhatsAppButton";

const BASE_URL = "https://labmanagergestionale.com";
const PAGE_URL = `${BASE_URL}/newsletter`;
const PAGE_TITLE = "Newsletter";
const PAGE_DESCRIPTION =
  "La newsletter di LabManager raccoglie aggiornamenti sul prodotto, nuove funzionalità e consigli pratici per il lavoro in laboratorio.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: null,
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: PAGE_URL,
    languages: {
      it: PAGE_URL,
    },
  },
  openGraph: {
    title: "Newsletter | LabManager",
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
        alt: "Newsletter LabManager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Newsletter | LabManager",
    description: PAGE_DESCRIPTION,
    images: [`${BASE_URL}/images/og-image.png`],
  },
};

export const newsletterPageStructuredData = {
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

const UPDATE_ITEMS = [
  {
    title: "Aggiornamenti selezionati",
    description: "Una selezione delle modifiche più utili.",
    icon: ListChecks,
  },
  {
    title: "Funzionalità, nel loro contesto",
    description: "Approfondimenti sulle funzionalità già disponibili.",
    icon: PanelsTopLeft,
  },
  {
    title: "Consigli pratici",
    description:
      "Ricette, Food Cost, produzione e organizzazione del laboratorio.",
    icon: ClipboardCheck,
  },
] as const;

export default function NewsletterPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(newsletterPageStructuredData),
          }}
        />
        <section
          className="bg-[#FAFBFE] px-6 pb-20 pt-10 sm:pt-14 lg:pt-16"
          aria-labelledby="newsletter-page-title"
        >
          <div className="mx-auto grid max-w-6xl items-start gap-12 min-[900px]:grid-cols-[minmax(0,1fr)_380px] min-[900px]:gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12">
            <div className="min-w-0 animate-fade-in-up">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary shadow-[var(--shadow-sm)]">
                  <Bell size={20} aria-hidden="true" />
                </span>
                <p className="text-sm font-semibold text-primary">
                  Newsletter
                </p>
              </div>

              <h1
                id="newsletter-page-title"
                className="max-w-3xl text-balance text-4xl font-bold leading-[1.08] tracking-[-0.025em] text-gray-900 sm:text-5xl lg:text-[3.5rem]"
              >
                Resta aggiornato su{" "}
                <span className="text-primary">LabManager</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
                Può includere novità sul prodotto, nuove funzionalità e consigli
                pratici per il lavoro in laboratorio.
              </p>

              <ul className="mt-10 border-y border-gray-200">
                {UPDATE_ITEMS.map(({ title, description, icon: Icon }) => (
                  <li
                    key={title}
                    className="grid gap-3 border-b border-gray-200 py-5 last:border-b-0 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-center sm:gap-8"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgba(68,3,175,0.05)] text-primary">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <h2 className="font-semibold text-gray-900">{title}</h2>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                      {description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <aside
              className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-[var(--shadow-lg)] sm:p-8"
              style={{ animationDelay: "0.08s" }}
              aria-labelledby="newsletter-form-title"
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(68,3,175,0.05)] text-primary">
                <MailCheck size={21} aria-hidden="true" />
              </div>
              <h2
                id="newsletter-form-title"
                className="text-2xl font-bold tracking-[-0.02em] text-gray-900"
              >
                Iscriviti agli aggiornamenti
              </h2>
              <p className="mb-6 mt-2 text-sm leading-relaxed text-gray-600">
                Inserisci i tuoi dati e conferma il consenso per ricevere la
                newsletter.
              </p>

              <NewsletterForm />

              <div className="mt-6 space-y-3 border-t border-gray-200 pt-5">
                <p className="flex items-start gap-3 text-sm leading-relaxed text-gray-600">
                  <MailCheck
                    size={17}
                    className="mt-0.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>Solo comunicazioni relative al prodotto.</span>
                </p>
                <p className="flex items-start gap-3 text-sm leading-relaxed text-gray-600">
                  <ShieldCheck
                    size={17}
                    className="mt-0.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>Puoi disiscriverti in qualsiasi momento.</span>
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-white px-6 py-16">
          <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-gray-900">
                Vuoi anche parlare con noi?
              </h2>
              <p className="mt-2 leading-relaxed text-gray-600">
                Per qualsiasi domanda puoi usare il form contatti del sito.
              </p>
            </div>
            <Link
              href="/#contatti"
              className="touch-target inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-[var(--shadow-md)]"
            >
              <span>Vai ai contatti</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
