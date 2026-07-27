"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DEVICE_CONTACT_COPY,
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
    question: "Quanti accessi contemporanei sono inclusi?",
    answer: `Light include ${getCommercialLevel("Light").sessioniSimultanee} sessioni attive simultanee e Plus ${getCommercialLevel("Plus").sessioniSimultanee}, indipendentemente dal dispositivo usato. Non c'è invece alcun limite ai dispositivi diversi usati nel tempo. ${DEVICE_CONTACT_COPY}.`,
  },
  {
    question: "Come si passa dalla prova al piano?",
    answer:
      "Non serve fare nulla su questo sito: la registrazione della prova non chiede la carta. Scelta del piano e pagamento si gestiscono nell'app autenticata, quando hai deciso.",
  },
  {
    question: "Posso disdire quando voglio?",
    answer:
      "Sì. In caso di cancellazione a fine periodo, l'accesso resta attivo fino alla scadenza prevista.",
  },
] as const;

export default function PricingFAQ() {
  // Chi valuta tiene aperte più risposte insieme: prova, disdetta e pagamento
  // si leggono in parallelo, non una alla volta.
  const [openIndexes, setOpenIndexes] = useState<readonly number[]>([]);

  function toggle(index: number) {
    setOpenIndexes((current) =>
      current.includes(index)
        ? current.filter((value) => value !== index)
        : [...current, index],
    );
  }

  return (
    <section
      className="bg-white px-6 py-24"
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
            const isOpen = openIndexes.includes(index);
            const answerId = `pricing-faq-answer-${index}`;

            return (
              <article
                key={faq.question}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="touch-target flex w-full items-center justify-between gap-4 rounded-2xl p-6 text-left transition-colors duration-200 hover:bg-gray-50"
                >
                  <span className="text-base font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    aria-hidden="true"
                    className={`shrink-0 text-primary transition-transform duration-200 ${
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
