"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "Posso cambiare da mensile ad annuale?",
    answer:
      "Sì, in qualsiasi momento. Se parti dal mensile puoi passare all'annuale quando vuoi, e la differenza viene calcolata sul periodo già pagato.",
  },
  {
    question: "È adatto anche a ristoranti e pizzerie?",
    answer:
      "Sì. Se lavori con ricette, ingredienti e costi, LabManager ti aiuta a tenere tutto sotto controllo anche in cucina, non solo in laboratorio.",
  },
  {
    question: "Posso usarlo senza connessione internet?",
    answer:
      "Sì. Puoi continuare a lavorare anche senza connessione e i dati si sincronizzano automaticamente appena torni online.",
  },
  {
    question: "Quanti utenti posso aggiungere?",
    answer:
      "Puoi far accedere il tuo team e assegnare a ogni persona il profilo più adatto, così ognuno vede solo quello che gli serve e quello che tu vuoi.",
  },
  {
    question: "Quanti dispositivi sono inclusi nell'abbonamento?",
    answer:
      "Il piano include 2 dispositivi utilizzabili contemporaneamente. Non è un limite ai dispositivi che puoi usare nel tempo, ma agli accessi attivi nello stesso momento. Se te ne servono di più, scrivici e troviamo la soluzione giusta.",
  },
];

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-6 py-20 bg-surface">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Domande prima di iniziare?
        </h2>

        <p
          className="text-center text-gray-600 leading-relaxed mb-14 animate-fade-in-up"
          style={{ animationDelay: "0.12s" }}
        >
          Qui trovi le risposte rapide ai dubbi più comuni su prova, abbonamento
          e utilizzo quotidiano.
        </p>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="bg-white rounded-xl border border-card-border/25 shadow-sm animate-fade-in-up"
                style={{ animationDelay: `${0.15 + index * 0.03}s` }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-gray-50 rounded-xl transition-colors duration-200"
                >
                  <h3 className="font-semibold text-gray-900 text-base">
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
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? "max-h-[300px]" : "max-h-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-gray-600 leading-relaxed">
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
