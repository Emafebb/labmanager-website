import { ArrowRight, Check } from "lucide-react";
import { getCommercialCta } from "@/data/trial-access-cta-inventory";

const homeTrialCta = getCommercialCta("home-trial");

const trialBenefits = [
  "14 giorni di prova",
  "Tutte le funzionalità Plus",
  "Senza carta",
] as const;

export default function TrialCallout() {
  return (
    <section
      className="home-trial border-y border-gray-200 bg-[#FAFBFE] px-6 pb-14 pt-20 text-foreground sm:pb-16 sm:pt-24"
      aria-labelledby="home-trial-heading"
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold text-primary">
            Fine della mappa. Inizio della prova.
          </p>
          <h2
            id="home-trial-heading"
            className="text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl"
          >
            Porta ordine nel lavoro di ogni giorno
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
            Verifica con il tuo lavoro reale quanto è più semplice tenere
            insieme ricette, costi, produzione, magazzino e ordini.
          </p>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-gray-700">
            {trialBenefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <Check size={16} aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:min-w-80">
          <a
            href={homeTrialCta.destination}
            className="touch-target group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-center text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_10px_15px_-3px_rgba(68,3,175,0.2)]"
          >
            {homeTrialCta.label}
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
          <p className="mt-3 text-center text-sm text-gray-500">
            La prova inizia al primo accesso.
          </p>
        </div>
      </div>
    </section>
  );
}
