import type { Metadata } from "next";
import Link from "next/link";
import { XCircle } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Operazione annullata",
  description:
    "Il checkout è stato interrotto prima del completamento. Nessuna modifica è stata confermata al tuo abbonamento.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BillingCancelPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col pt-28">
        <div className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-lg w-full text-center animate-fade-in-up">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center">
                <XCircle
                  size={44}
                  className="text-amber-600"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </div>
            </div>

            <div
              className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-amber-200 animate-fade-in-up"
              style={{ animationDelay: "0.05s" }}
            >
              <span>Checkout interrotto</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Operazione annullata
            </h1>

            <p
              className="text-lg text-gray-700 leading-relaxed mb-4 animate-fade-in-up"
              style={{ animationDelay: "0.15s" }}
            >
              Hai interrotto il checkout prima del completamento. Nessuna
              modifica è stata confermata al tuo abbonamento.
            </p>

            <p
              className="text-base text-gray-500 leading-relaxed mb-10 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Puoi tornare in LabManager e riprovare quando vuoi. I tuoi dati
              restano invariati.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in-up"
              style={{ animationDelay: "0.25s" }}
            >
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-dark transition-colors duration-200 shadow-sm"
              >
                Torna al sito
              </Link>

              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold px-8 py-3.5 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
              >
                Vedi i prezzi
              </Link>
            </div>

            <p
              className="text-sm text-gray-400 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
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
