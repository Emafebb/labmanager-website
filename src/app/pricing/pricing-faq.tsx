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
      className="pricing-faq faq-section section-space"
      aria-labelledby="pricing-faq-heading"
    >
      <div className="section-intro">
        <h2 id="pricing-faq-heading">Tutto chiaro?</h2>
        <p>
          Prova, pagamento, accessi e assistenza. Le risposte prima di
          scegliere.
        </p>
      </div>
      <div className="faq-list">
        {PRICING_FAQS.map((faq, index) => (
          <article key={faq.question} className="faq-item">
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={openIndexes.includes(index)}
              aria-controls={`pricing-faq-answer-${index}`}
            >
              <span>{faq.question}</span>
              <ChevronDown size={20} aria-hidden="true" />
            </button>
            <div
              id={`pricing-faq-answer-${index}`}
              hidden={!openIndexes.includes(index)}
            >
              <p>{faq.answer}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
