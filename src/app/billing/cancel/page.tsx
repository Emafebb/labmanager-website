import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail, X } from "lucide-react";
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
      <main className="flex min-h-screen items-center bg-[#FAFBFE] pt-24 sm:pt-28">
        <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:py-16 lg:px-8 lg:py-24">
          <section
            aria-labelledby="billing-cancel-title"
            className="mx-auto grid max-w-5xl animate-fade-in-up overflow-hidden rounded-3xl border border-card-border bg-white shadow-[var(--shadow-lg)] lg:grid-cols-[minmax(0,1.15fr)_minmax(19rem,0.85fr)]"
          >
            <div className="p-7 sm:p-10 lg:p-14">
              <div
                className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--warning)_10%,white)]"
                style={{
                  color:
                    "color-mix(in srgb, var(--warning) 72%, black)",
                }}
              >
                <X size={34} strokeWidth={2} aria-hidden="true" />
              </div>

              <p
                className="mb-4 text-sm font-semibold"
                style={{
                  color:
                    "color-mix(in srgb, var(--warning) 72%, black)",
                }}
              >
                Checkout interrotto
              </p>

              <h1
                id="billing-cancel-title"
                className="max-w-xl text-3xl leading-[1.08] font-bold tracking-[-0.03em] text-gray-900 text-balance sm:text-5xl"
              >
                Operazione annullata
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-700">
                Hai interrotto il checkout prima del completamento. Nessuna
                modifica è stata confermata al tuo abbonamento.
              </p>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600">
                Puoi tornare in LabManager e riprovare quando vuoi. I tuoi dati
                restano invariati.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="touch-target inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-semibold text-white transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_10px_15px_-3px_rgba(68,3,175,0.2)] active:translate-y-0"
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                  Torna al sito
                </Link>

                <Link
                  href="/pricing"
                  className="touch-target inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 font-semibold text-gray-700 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-[var(--shadow-md)] active:translate-y-0"
                >
                  Vedi i prezzi
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <aside
              aria-label="Riepilogo dell'operazione"
              className="flex flex-col border-t border-gray-200 bg-surface p-7 sm:p-10 lg:border-t-0 lg:border-l lg:p-12"
            >
              <h2 className="text-xl font-bold text-gray-900">Riepilogo</h2>

              <dl className="mt-7 divide-y divide-gray-200 border-y border-gray-200">
                <div className="py-5">
                  <dt className="text-sm font-medium text-gray-500">Esito</dt>
                  <dd className="mt-1 flex items-center gap-2 font-semibold text-gray-900">
                    <X
                      size={18}
                      strokeWidth={2.25}
                      style={{
                        color:
                          "color-mix(in srgb, var(--warning) 72%, black)",
                      }}
                      aria-hidden="true"
                    />
                    Checkout non completato
                  </dd>
                </div>
                <div className="py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    Abbonamento
                  </dt>
                  <dd className="mt-1 font-semibold text-gray-900">
                    Nessuna modifica confermata
                  </dd>
                </div>
                <div className="py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    Dati salvati
                  </dt>
                  <dd className="mt-1 font-semibold text-gray-900">
                    Restano invariati
                  </dd>
                </div>
              </dl>

              <div className="mt-10 border-t border-gray-200 pt-6 lg:mt-auto">
                <div className="flex items-center gap-3">
                  <Mail
                    size={18}
                    className="text-primary"
                    aria-hidden="true"
                  />
                  <h3 className="text-sm font-semibold text-gray-900">
                    Serve aiuto?
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  Se hai bisogno di aiuto, scrivici.
                </p>
                <a
                  href="mailto:labmanager.info@gmail.com"
                  className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-gray-700 underline decoration-gray-300 underline-offset-4 transition-colors duration-200 ease-out hover:text-gray-900"
                >
                  labmanager.info@gmail.com
                </a>
              </div>
            </aside>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
