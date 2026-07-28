"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  MAGAZZINO_CANONICAL_COPY,
  MAGAZZINO_CLAIM_ID_ATTRIBUTE,
} from "@/data/magazzino-capability-matrix";
import {
  TRIAL_EXPLANATION,
  commercialPriceSummary,
} from "@/lib/pricing";

const faqs = [
  {
    question: "A chi è rivolto LabManager?",
    answer:
      "LabManager è pensato per laboratori artigianali alimentari, in particolare pasticcerie, panifici e gelaterie.",
  },
  {
    question: "Qual è la differenza tra Light e Plus?",
    answer:
      "Light include gli strumenti tecnici come ricette, food cost della ricetta, bilanciamento, etichette e team. Plus aggiunge produzione, ordini, vendite, Costi aziendali e magazzino con DDT.",
  },
  {
    question: "Come funziona la prova gratuita?",
    answer:
      `${TRIAL_EXPLANATION} Non serve una carta: registrati nella web app e accedi per iniziare.`,
  },
  {
    question: "Quanto costa LabManager e come funziona la disdetta?",
    answer:
      `${commercialPriceSummary()} Puoi disdire quando vuoi; in caso di cancellazione a fine periodo, l'accesso resta attivo fino alla scadenza prevista.`,
  },
  {
    question: "Come gestisce il magazzino LabManager?",
    answer: MAGAZZINO_CANONICAL_COPY,
  },
  {
    question: "Come posso contattare LabManager?",
    answer:
      "Puoi usare il form nella sezione Contatti oppure scriverci su WhatsApp.",
  },
] as const;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      className="home-faq bg-white px-6 py-14 sm:py-16"
      aria-labelledby="faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div>
          <p className="mb-5 flex items-center gap-3 text-sm font-semibold text-primary">
            <span className="h-px w-10 bg-primary" aria-hidden="true" />
            Prima di partire
          </p>
          <h2
            id="faq-heading"
            className="text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-gray-900 sm:text-5xl"
          >
            Domande frequenti
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600">
            Trova risposta alle domande più comuni su LabManager.
          </p>
        </div>

        <div className="border-t border-gray-300">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="border-b border-gray-300"
              >
                <button
                  id={`faq-question-${index}`}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  data-magazzino-claim-ids={
                    faq.question === "Come gestisce il magazzino LabManager?"
                      ? MAGAZZINO_CLAIM_ID_ATTRIBUTE
                      : undefined
                  }
                  className="touch-target flex w-full items-center justify-between gap-6 rounded-lg px-0 py-6 text-left transition-colors duration-200 hover:text-primary"
                >
                  <span
                    className="home-faq__question"
                    data-question-index={`Q${String(index + 1).padStart(2, "0")}`}
                  >
                    <span className="text-base font-semibold text-gray-900">
                      {faq.question}
                    </span>
                  </span>
                  <ChevronDown
                    size={20}
                    aria-hidden="true"
                    className={`shrink-0 text-primary transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? "max-h-[600px]" : "max-h-0"
                  }`}
                >
                  <p className="max-w-2xl pb-6 pl-12 pr-8 leading-relaxed text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
