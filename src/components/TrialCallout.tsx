import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getCommercialCta } from "@/data/trial-access-cta-inventory";

const homeTrialCta = getCommercialCta("home-trial");

const trialBenefits = [
  "14 giorni di prova",
  "Senza carta",
  "Accesso completo",
] as const;

export default function TrialCallout() {
  return (
    <section
      className="bg-white px-6 py-24"
      aria-labelledby="home-trial-heading"
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#1d0640] px-6 py-10 text-white shadow-xl shadow-primary/15 sm:px-10 sm:py-12 lg:px-14">
        <div
          className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-primary-light/30 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative grid items-center gap-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-amber-300">
              Provalo nel tuo laboratorio
            </p>
            <h2
              id="home-trial-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Porta ordine nel lavoro di ogni giorno
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
              Verifica con il tuo lavoro reale quanto è più semplice tenere
              insieme ricette, costi, produzione, magazzino e ordini.
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/85">
              {trialBenefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <CheckCircle2
                    size={17}
                    className="text-amber-300"
                    aria-hidden="true"
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:min-w-72">
            <a
              href={homeTrialCta.destination}
              className="touch-target group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-7 py-4 text-center text-base font-bold text-[#1d0640] transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-lg"
            >
              {homeTrialCta.label}
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <p className="mt-3 text-center text-sm text-white/60">
              La prova inizia al primo accesso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
