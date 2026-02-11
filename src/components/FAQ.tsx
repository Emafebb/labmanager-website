"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Come posso provare l'app?",
    answer:
      "Contattaci tramite il form per richiedere accesso al nostro gestionale per pasticceria. L'app è attualmente in fase di lancio e stiamo selezionando i primi utenti.",
  },
  {
    question: "Quanto costa LabManager?",
    answer:
      "LabManager è attualmente gratuito durante la fase di lancio. In futuro saranno disponibili piani a pagamento con funzionalità avanzate.",
  },
  {
    question: "Funziona senza internet?",
    answer:
      "Sì, LabManager è progettato per funzionare offline: ricette, ingredienti, costi, etichette e tutti gli strumenti sono sempre disponibili anche senza connessione. La connessione è richiesta solo per la registrazione, il login e la sincronizzazione dei dati tra dispositivi. Quando torni online, tutto si aggiorna automaticamente.",
  },
  {
    question: "Su quanti dispositivi posso usarlo?",
    answer:
      "Di base puoi usare LabManager contemporaneamente su 2 dispositivi. I dati si sincronizzano in tempo reale tra i dispositivi. Se hai bisogno di più postazioni, contattaci e troveremo la soluzione adatta a te.",
  },
  {
    question: "Posso esportare ricette e documenti?",
    answer:
      "Sì, puoi esportare ricette in PDF ed Excel, incluse tabelle nutrizionali, etichette e report. I documenti sono pronti per la stampa.",
  },
  {
    question: "L'app genera etichette alimentari?",
    answer:
      "Sì, LabManager genera etichette alimentari con lista ingredienti, allergeni evidenziati e tabella nutrizionale. Le etichette sono pensate come supporto al tuo lavoro: verifica sempre la correttezza dei dati prima dell'utilizzo, in quanto non ci assumiamo responsabilità per eventuali errori.",
  },
  {
    question: "Posso usarlo con il mio team?",
    answer:
      "Sì, puoi aggiungere i tuoi dipendenti con accesso tramite PIN e ruoli diversi (pasticcere, commessa, ecc.). Le ricette e gli assemblaggi possono essere condivisi tra gli utenti del team.",
  },
  {
    question: "Sarà disponibile per iPhone/iPad?",
    answer:
      "Attualmente LabManager è disponibile per Android e Windows. Il supporto iOS è in fase di valutazione per il futuro.",
  },
  {
    question: "I miei dati sono al sicuro?",
    answer:
      "Assolutamente sì. I tuoi dati sono protetti con crittografia e salvati su server cloud sicuri. Ogni account è isolato: nessun altro utente può vedere le tue ricette o i tuoi dati. Anche senza connessione internet, tutto resta salvato sul tuo dispositivo e si sincronizza automaticamente appena torni online.",
  },
  {
    question: "Come funziona il calcolo costi ricetta in LabManager?",
    answer:
      "LabManager calcola automaticamente il costo di ogni ricetta sommando il prezzo degli ingredienti utilizzati, tenendo conto delle quantità esatte e degli scarti. Il sistema aggiorna i costi in tempo reale quando modifichi i prezzi di acquisto. Puoi monitorare i margini di guadagno e analizzare lo storico delle variazioni.",
  },
  {
    question: "Come gestisco l'inventario ingredienti del laboratorio?",
    answer:
      "LabManager offre un sistema completo di gestione ingredienti: traccia le scorte disponibili, registra carichi e scarichi automatici durante la produzione e ti avvisa quando le quantità scendono sotto la soglia minima impostata. Ogni ingrediente include costo al kg, valori nutrizionali e allergeni.",
  },
  {
    question: "Posso tracciare i lotti di produzione?",
    answer:
      "Sì, LabManager consente di gestire i lotti di produzione associando ogni lavorazione agli ingredienti utilizzati con numero di lotto e data di scadenza. Questo garantisce piena tracciabilità degli ingredienti per la sicurezza alimentare e il rispetto delle normative.",
  },
  {
    question: "LabManager è veramente gratuito?",
    answer:
      "Sì, LabManager è un software gratuito per la gestione del tuo laboratorio. Puoi utilizzare tutte le funzionalità senza limiti di tempo e senza abbonamento. Non ci sono costi nascosti: scaricalo su Android o Windows e inizia subito.",
  },
];

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
    <section id="faq" className="px-6 py-24 bg-white" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-icon/10 text-icon px-4 py-2 rounded-full text-sm font-bold mb-6 border border-icon/20">
            <HelpCircle size={16} aria-hidden="true" />
            <span>FAQ</span>
          </div>

          <h2 id="faq-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5">
            Domande Frequenti
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Trova risposta alle domande più comuni su LabManager.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="bg-white rounded-xl border border-card-border/25 shadow-sm"
              >
                <button
                  id={`faq-question-${index}`}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-gray-50 rounded-xl transition-colors duration-200"
                >
                  <span className="font-semibold text-gray-900">
                    {faq.question}
                  </span>
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
