import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Gestione abbonamento",
  description:
    "LabManager applicherà automaticamente le modifiche salvate nel portale abbonamento.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccountBillingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="status-page">
        <section>
          <h1>Abbonamento aggiornato</h1>
          <p>
            LabManager applicherà automaticamente le modifiche salvate nel
            portale abbonamento.
          </p>
          <p>
            Se hai richiesto una cancellazione a fine periodo, l&apos;accesso
            resterà attivo fino alla scadenza prevista.
          </p>
          <p>
            Se hai bisogno di aiuto, scrivici a{" "}
            <a href="mailto:labmanager.info@gmail.com" className="text-link">
              labmanager.info@gmail.com
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
