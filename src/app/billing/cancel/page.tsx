import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Operazione annullata",
  description:
    "Il pagamento non è stato completato. Nessuna modifica è stata confermata al tuo abbonamento.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BillingCancelPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="status-page">
        <section>
          <h1>Operazione annullata</h1>
          <p>
            Il pagamento non è stato completato. Nessuna modifica è stata
            confermata al tuo abbonamento.
          </p>
          <p>
            Puoi tornare in LabManager e riprovare quando vuoi. I tuoi dati
            restano invariati.
          </p>
          <div className="status-actions">
            <Link href="/" className="button">
              Torna al sito
            </Link>
            <a href="/pricing" className="text-link">
              Vedi i prezzi
            </a>
          </div>
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
