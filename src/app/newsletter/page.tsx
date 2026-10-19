import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NewsletterForm from "@/components/NewsletterForm";

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

export default function NewsletterPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(newsletterPageStructuredData),
          }}
        />
        <section className="newsletter-page section-space">
          <div>
            <h1>
              Novità dal <br />
              laboratorio.
            </h1>
            <p>
              La newsletter di LabManager: aggiornamenti sul prodotto, nuove
              funzionalità e consigli pratici per il lavoro in laboratorio.
            </p>
            <Image
              src="/images/editorial/pane.webp"
              alt="Pane lavorato a mano su un banco di laboratorio"
              width={1536}
              height={1024}
              sizes="(max-width: 700px) 100vw, 50vw"
            />
            <p>
              Solo comunicazioni relative al prodotto. Puoi disiscriverti in
              qualsiasi momento.
            </p>
          </div>
          <aside
            className="contact-form"
            aria-labelledby="newsletter-form-title"
          >
            <h2 id="newsletter-form-title">Restiamo in contatto.</h2>
            <p>
              Inserisci i tuoi dati e conferma il consenso per ricevere la
              newsletter.
            </p>
            <NewsletterForm />
          </aside>
        </section>
        <section className="newsletter-contact">
          <h2>Vuoi parlarne?</h2>
          <p>Per domande sul prodotto e sul tuo laboratorio, ci trovi qui.</p>
          <Link href="/#contatti" className="text-link">
            Vai ai contatti
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
