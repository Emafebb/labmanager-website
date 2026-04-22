import type { Metadata } from "next";
import { CheckCircle } from "lucide-react";
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
      <main className="min-h-screen flex flex-col pt-28">
        <div className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-lg w-full text-center animate-fade-in-up">
            {/* Icona stato */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                <CheckCircle
                  size={44}
                  className="text-green-600"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-green-200 animate-fade-in-up"
              style={{ animationDelay: "0.05s" }}
            >
              <span>Pagamento completato</span>
            </div>

            {/* Titolo */}
            <h1
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Pagamento ricevuto correttamente
            </h1>

            {/* Testo principale */}
            <p
              className="text-lg text-gray-700 leading-relaxed mb-4 animate-fade-in-up"
              style={{ animationDelay: "0.15s" }}
            >
              Grazie. Il pagamento è stato completato e LabManager sta
              aggiornando il tuo abbonamento.
            </p>

            {/* Testo secondario */}
            <p
              className="text-base text-gray-500 leading-relaxed mb-10 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Nella maggior parte dei casi l&apos;accesso si riallinea
              automaticamente entro pochi istanti. Se non vedi subito
              l&apos;aggiornamento, attendi qualche secondo e riapri l&apos;app.
            </p>

            <p
              className="text-base font-semibold text-primary mb-8 animate-fade-in-up"
              style={{ animationDelay: "0.25s" }}
            >
              Goditi LabManager.
            </p>

            {/* Nota supporto */}
            <p
              className="text-sm text-gray-400 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              Se dopo qualche minuto l&apos;accesso non risulta ancora
              aggiornato, scrivici a{" "}
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
