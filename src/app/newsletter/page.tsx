import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bell, CheckCircle2, MailCheck, ShieldCheck } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NewsletterForm from "@/components/NewsletterForm";
import WhatsAppButton from "@/components/WhatsAppButton";

const BASE_URL = "https://pastrylabmanager.com";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Iscriviti alla newsletter di LabManager per ricevere aggiornamenti sull'app, nuove funzionalita e disponibilita delle versioni Android e Windows.",
  alternates: {
    canonical: `${BASE_URL}/newsletter`,
    languages: {
      it: `${BASE_URL}/newsletter`,
    },
  },
  openGraph: {
    title: "Newsletter | LabManager",
    description:
      "Ricevi aggiornamenti su LabManager, nuove funzionalita e disponibilita delle versioni Android e Windows.",
    url: `${BASE_URL}/newsletter`,
    images: [
      {
        url: `${BASE_URL}/images/og-image.png`,
        secureUrl: `${BASE_URL}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "LabManager - Newsletter aggiornamenti app",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Newsletter | LabManager",
    description:
      "Ricevi aggiornamenti su LabManager, nuove funzionalita e disponibilita delle versioni Android e Windows.",
    images: [`${BASE_URL}/images/og-image.png`],
  },
};

const UPDATE_ITEMS = [
  "Aggiornamenti sulle nuove versioni dell'app",
  "Novita su funzioni per ricette, costi, etichette e magazzino",
  "Comunicazioni utili su Android, Windows e disponibilita future",
] as const;

export default function NewsletterPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28">
        <section className="px-6 pb-20" aria-labelledby="newsletter-page-title">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_440px] gap-10 lg:gap-14 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-icon/10 text-icon px-4 py-2 rounded-full text-sm font-bold mb-6 border border-icon/20">
                <Bell size={16} aria-hidden="true" />
                <span>Newsletter LabManager</span>
              </div>

              <h1
                id="newsletter-page-title"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
              >
                Resta aggiornato su{" "}
                <span className="gradient-text">LabManager</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mb-8">
                Iscriviti per ricevere aggiornamenti sull&apos;app, nuove
                funzionalita e comunicazioni utili per il tuo laboratorio.
              </p>

              <ul className="space-y-4 mb-8">
                {UPDATE_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 size={15} aria-hidden="true" />
                    </span>
                    <span className="text-base text-gray-700 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="grid sm:grid-cols-2 gap-4 mb-8 max-w-2xl">
                <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <MailCheck
                    size={20}
                    className="text-icon flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Ricevi solo comunicazioni legate a LabManager.
                  </p>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <ShieldCheck
                    size={20}
                    className="text-icon flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Puoi disiscriverti in qualsiasi momento.
                  </p>
                </div>
              </div>

              <div className="relative h-48 sm:h-64 max-w-2xl overflow-hidden rounded-2xl border border-card-border/25 bg-surface shadow-sm">
                <Image
                  src="/images/labmanager-homepage-screenshot.png"
                  alt="Schermata di LabManager con dashboard e gestione ricette"
                  fill
                  className="object-cover object-left-top"
                  sizes="(min-width: 1024px) 640px, 100vw"
                  priority
                />
              </div>
            </div>

            <aside
              className="bg-white rounded-2xl border border-card-border/25 shadow-lg shadow-primary/5 p-6 sm:p-8 animate-fade-in-up"
              style={{ animationDelay: "0.08s" }}
              aria-labelledby="newsletter-form-title"
            >
              <h2
                id="newsletter-form-title"
                className="text-2xl font-bold text-gray-900 mb-2"
              >
                Iscriviti agli aggiornamenti
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Inserisci i tuoi dati e conferma il consenso per ricevere la
                newsletter.
              </p>

              <NewsletterForm />
            </aside>
          </div>
        </section>

        <section className="px-6 py-12 bg-surface">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Vuoi anche parlare con noi?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Per domande sull&apos;app o sulla prova gratuita puoi usare il
                form contatti del sito.
              </p>
            </div>
            <Link
              href="/#contatti"
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-gray-700"
            >
              Vai ai contatti
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
