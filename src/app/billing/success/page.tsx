import type { Metadata } from "next";
import { Check, Mail } from "lucide-react";
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
      <main className="flex min-h-screen items-center bg-[#FAFBFE] pt-24 sm:pt-28">
        <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:py-16 lg:px-8 lg:py-24">
          <section
            aria-labelledby="billing-success-title"
            className="mx-auto grid max-w-5xl animate-fade-in-up overflow-hidden rounded-3xl border border-card-border bg-white shadow-[var(--shadow-lg)] lg:grid-cols-[minmax(0,1.15fr)_minmax(19rem,0.85fr)]"
          >
            <div className="p-7 sm:p-10 lg:p-14">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--success)_8%,white)] text-[var(--success)]">
                <Check
                  size={34}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>

              <p className="mb-4 text-sm font-semibold text-[var(--success)]">
                Pagamento completato
              </p>

              <h1
                id="billing-success-title"
                className="max-w-xl text-3xl leading-[1.08] font-bold tracking-[-0.03em] text-gray-900 text-balance sm:text-5xl"
              >
                Pagamento ricevuto correttamente
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-700">
                Grazie. Il pagamento è stato completato e LabManager sta
                aggiornando il tuo abbonamento.
              </p>

              <p className="mt-10 border-t border-gray-200 pt-6 text-base font-semibold text-gray-900">
                Goditi LabManager.
              </p>
            </div>

            <aside
              aria-label="Riepilogo del pagamento"
              className="flex flex-col border-t border-gray-200 bg-surface p-7 sm:p-10 lg:border-t-0 lg:border-l lg:p-12"
            >
              <h2 className="text-xl font-bold text-gray-900">Riepilogo</h2>

              <dl className="mt-7 divide-y divide-gray-200 border-y border-gray-200">
                <div className="py-5">
                  <dt className="text-sm font-medium text-gray-500">Esito</dt>
                  <dd className="mt-1 flex items-center gap-2 font-semibold text-gray-900">
                    <Check
                      size={18}
                      strokeWidth={2.25}
                      className="text-[var(--success)]"
                      aria-hidden="true"
                    />
                    Pagamento acquisito
                  </dd>
                </div>
                <div className="py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    Abbonamento
                  </dt>
                  <dd className="mt-1 font-semibold text-gray-900">
                    Aggiornamento automatico
                  </dd>
                </div>
              </dl>

              <p className="mt-6 text-sm leading-relaxed text-gray-600">
                Nella maggior parte dei casi l&apos;accesso si riallinea
                automaticamente entro pochi istanti. Se non vedi subito
                l&apos;aggiornamento, attendi qualche secondo e riapri
                l&apos;app.
              </p>

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
                  Se dopo qualche minuto l&apos;accesso non risulta ancora
                  aggiornato, scrivici.
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
