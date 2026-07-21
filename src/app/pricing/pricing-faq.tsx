"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  TRIAL_EXPLANATION,
  commercialPriceSummary,
  describeOfferSupport,
  getCommercialLevel,
  getCommercialOffer,
} from "@/lib/pricing";

export const PRICING_FAQS = [
  {
    question: "Come funziona la prova gratuita?",
    answer: `${TRIAL_EXPLANATION} Non serve inserire una carta.`,
  },
  {
    question: "Quanto costano Light e Plus?",
    answer: `${commercialPriceSummary()} La scelta e il pagamento avvengono nell'app, non su questo sito.`,
  },
  {
    question: "Come cambia il supporto?",
    answer: `Light include sempre ${describeOfferSupport(getCommercialOffer("Light", "mensile")).toLowerCase()}. Plus mensile include ${describeOfferSupport(getCommercialOffer("Plus", "mensile")).toLowerCase()}; Plus annuale include ${describeOfferSupport(getCommercialOffer("Plus", "annuale")).toLowerCase()}.`,
  },
  {
    question: "Quanti dispositivi posso usare contemporaneamente?",
    answer: `Light include ${getCommercialLevel("Light").sessioniSimultanee} dispositivi simultanei e Plus ${getCommercialLevel("Plus").sessioniSimultanee}. Hai bisogno di più dispositivi? Contattaci.`,
  },
  {
    question: "Posso acquistare dal sito?",
    answer:
      "No. Il sito presenta l'offerta e conduce alla registrazione della prova senza carta. La scelta e il pagamento si gestiscono nell'app autenticata.",
  },
  {
    question: "Posso disdire quando voglio?",
    answer:
      "Sì. In caso di cancellazione a fine periodo, l'accesso resta attivo fino alla scadenza prevista.",
  },
] as const;

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="bg-white px-6 py-20"
      aria-labelledby="pricing-faq-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="pricing-faq-heading"
          className="mb-4 text-center text-3xl font-bold text-gray-900 sm:text-4xl"
        >
          Domande prima di iniziare?
        </h2>

        <p className="mb-14 text-center leading-relaxed text-gray-600">
          Le risposte essenziali su prova, pagamento e utilizzo del piano.
        </p>

        <div className="space-y-3">
          {PRICING_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `pricing-faq-answer-${index}`;

            return (
              <article
                key={faq.question}
                className="rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="touch-target flex w-full items-center justify-between gap-4 rounded-xl p-6 text-left transition-colors duration-200 hover:bg-gray-50"
                >
                  <span className="text-base font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    aria-hidden="true"
                    className={`shrink-0 text-icon transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div id={answerId} hidden={!isOpen}>
                  <p className="px-6 pb-6 leading-relaxed text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
