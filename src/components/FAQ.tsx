"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import {
  MAGAZZINO_CANONICAL_COPY,
  MAGAZZINO_CLAIM_ID_ATTRIBUTE,
} from "@/data/magazzino-capability-matrix";

const faqs = [
  {
    question: "A chi è rivolto LabManager?",
    answer:
      "LabManager è pensato per laboratori artigianali alimentari, in particolare pasticcerie, panifici e gelaterie.",
  },
  {
    question: "Cosa include il piano LabManager?",
    answer:
      "Il piano include Ricette e Food Cost, Produzione ed Etichette, Magazzino, Ordini e Piano di Lavoro.",
  },
  {
    question: "Come funziona la prova gratuita?",
    answer:
      "La prova dura 14 giorni e non richiede una carta. Registrati nella web app e accedi: la prova inizia al primo login riuscito.",
  },
  {
    question: "Quanto costa LabManager e come funziona la disdetta?",
    answer:
      "Il piano costa €44,99 al mese oppure €480 all'anno. Puoi disdire quando vuoi; in caso di cancellazione a fine periodo, l'accesso resta attivo fino alla scadenza prevista.",
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
    <section id="faq" className="bg-white px-6 py-24" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <div className="mb-14 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-primary">
            <HelpCircle size={16} aria-hidden="true" />
            <span>FAQ</span>
          </div>

          <h2 id="faq-heading" className="mb-5 text-4xl font-bold text-gray-900 sm:text-5xl">
            Domande frequenti
          </h2>

          <p className="text-lg leading-relaxed text-gray-600">
            Trova risposta alle domande più comuni su LabManager.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="rounded-xl border border-gray-200 bg-white shadow-sm"
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
                  className="touch-target flex w-full items-center justify-between gap-4 rounded-xl p-6 text-left transition-colors duration-200 hover:bg-gray-50"
                >
                  <h3 className="text-base font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={20}
                    aria-hidden="true"
                    className={`flex-shrink-0 text-icon transition-transform duration-200 ${
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
                  <p className="px-6 pb-6 leading-relaxed text-gray-600">
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
