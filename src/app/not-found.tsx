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
      <main id="main-content" className="status-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(notFoundPageStructuredData),
          }}
        />
        <section>
          <h1>Pagina non trovata</h1>
          <p>
            Errore 404. L’indirizzo potrebbe essere errato oppure la pagina
            potrebbe essere stata rimossa.
          </p>
          <Link href="/" className="button">
            Torna alla homepage
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
