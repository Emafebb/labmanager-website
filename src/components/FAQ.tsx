"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  MAGAZZINO_CANONICAL_COPY,
  MAGAZZINO_CLAIM_ID_ATTRIBUTE,
} from "@/data/magazzino-capability-matrix";
import { TRIAL_EXPLANATION, commercialPriceSummary } from "@/lib/pricing";

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
    answer: `${TRIAL_EXPLANATION} Non serve una carta: registrati nella web app e accedi per iniziare.`,
  },
  {
    question: "Quanto costa LabManager e come funziona la disdetta?",
    answer: `${commercialPriceSummary()} Puoi disdire quando vuoi; in caso di cancellazione a fine periodo, l'accesso resta attivo fino alla scadenza prevista.`,
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
      className="faq-section section-space"
      aria-labelledby="faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="section-intro" data-reveal>
        <h2 id="faq-heading">
          Prima di <br />
          cominciare.
        </h2>
        <p>
          Come funziona la prova, cosa comprende il piano e dove trovare una
          mano.
        </p>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={faq.question} data-reveal>
            <button
              type="button"
              id={`faq-question-${index}`}
              onClick={() => toggle(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              data-magazzino-claim-ids={
                faq.question === "Come gestisce il magazzino LabManager?"
                  ? MAGAZZINO_CLAIM_ID_ATTRIBUTE
                  : undefined
              }
            >
              <span>{faq.question}</span>
              <ChevronDown size={20} aria-hidden="true" />
            </button>
            <div
              id={`faq-answer-${index}`}
              hidden={openIndex !== index}
              role="region"
              aria-labelledby={`faq-question-${index}`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
