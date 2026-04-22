import type { Metadata } from "next";
import { CreditCard } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Gestione abbonamento",
  description:
    "Le modifiche effettuate nel portale Stripe sono state registrate correttamente e LabManager si riallineerà automaticamente.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccountBillingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col pt-28">
        <div className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-lg w-full text-center animate-fade-in-up">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <CreditCard
                  size={44}
                  className="text-primary"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </div>
            </div>

            <div
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6 border border-primary/15 animate-fade-in-up"
              style={{ animationDelay: "0.05s" }}
            >
              <span>Portale abbonamento</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Gestione abbonamento aggiornata
            </h1>

            <p
              className="text-lg text-gray-700 leading-relaxed mb-4 animate-fade-in-up"
              style={{ animationDelay: "0.15s" }}
            >
              Le modifiche effettuate nel portale Stripe sono state registrate
              correttamente.
            </p>

            <p
              className="text-base text-gray-500 leading-relaxed mb-10 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              LabManager si riallineerà automaticamente alle modifiche del tuo
              abbonamento. Se hai richiesto una cancellazione a fine periodo,
              l&apos;accesso resterà attivo fino alla scadenza prevista.
            </p>

            <p
              className="text-sm text-gray-400 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.25s" }}
            >
              Se hai bisogno di aiuto, scrivici a{" "}
              <a
                href="mailto:labmanager.info@gmail.com"
                className="text-gray-600 underline underline-offset-2 hover:text-gray-900 transition-colors duration-200"
              >
                labmanager.info@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
