import { ArrowDown, ArrowRight, Check } from "lucide-react";
import LabFlowMap from "@/components/LabFlowMap";
import { getCommercialCta } from "@/data/trial-access-cta-inventory";

const homeTrialCta = getCommercialCta("home-trial");
const homeFeaturesCta = getCommercialCta("home-features");

export default function Hero() {
  return (
    <section
      className="home-hero relative overflow-hidden bg-[#FAFBFE]"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-7xl px-6 pb-14 pt-28 sm:pb-16 lg:px-8 lg:pt-36">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
          <div className="animate-fade-in-up max-w-xl">
            <p className="mb-6 flex items-center gap-3 text-sm font-semibold text-primary">
              <span
                className="h-3 w-3 rounded-full border-[3px] border-primary bg-white"
                aria-hidden="true"
              />
              Il gestionale per laboratori alimentari
            </p>

            <h1
              id="hero-heading"
              className="mb-6 text-[clamp(2.6rem,4.6vw,4.25rem)] font-bold leading-[1] tracking-[-0.035em] text-foreground"
            >
              Dalla ricetta all&apos;ordine, tutto il laboratorio sotto controllo
            </h1>

            <p className="mb-8 max-w-[34rem] text-lg font-normal leading-relaxed text-gray-600 sm:text-xl">
              Calcola food cost e margini, organizza produzione, etichette,
              magazzino e ordini in un unico flusso di lavoro.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={homeTrialCta.destination}
                className="touch-target group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_10px_15px_-3px_rgba(68,3,175,0.2)]"
              >
                {homeTrialCta.label}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={homeFeaturesCta.destination}
                className="touch-target inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-7 py-3.5 text-base font-semibold text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
              >
                {homeFeaturesCta.label}
                <ArrowDown size={17} aria-hidden="true" />
              </a>
            </div>

            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-gray-600">
              {[
                "14 giorni",
                "Tutte le funzionalità Plus",
                "Senza carta",
              ].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <Check size={15} className="text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-in lg:pt-8">
            <LabFlowMap />
          </div>
        </div>
      </div>
    </section>
  );
}
