import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Pagamento ricevuto",
  description:
    "Il pagamento è stato ricevuto. LabManager aggiornerà automaticamente il tuo abbonamento.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BillingSuccessPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="status-page">
        <section>
          <h1>Pagamento ricevuto</h1>
          <p>LabManager sta aggiornando il tuo abbonamento.</p>
          <p>
            Se non vedi subito l’aggiornamento, attendi qualche secondo e riapri
            l’app.
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
