import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Pagina non trovata",
  description: "La pagina richiesta non esiste o non è più disponibile.",
};

export const notFoundPageStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://labmanagergestionale.com/404#webpage",
  name: "Pagina non trovata",
  description: "La pagina richiesta non esiste o non è più disponibile.",
  isPartOf: {
    "@id": "https://labmanagergestionale.com/#website",
  },
} as const;

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] px-6 pb-24 pt-36">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(notFoundPageStructuredData),
          }}
        />
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Errore 404
          </p>
          <h1 className="mb-5 text-4xl font-bold text-gray-900 sm:text-5xl">
            Pagina non trovata
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-gray-600">
            L&apos;indirizzo potrebbe essere errato oppure la pagina potrebbe
            essere stata rimossa.
          </p>
          <Link
            href="/"
            className="touch-target inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-primary-dark"
          >
            Torna alla homepage
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
