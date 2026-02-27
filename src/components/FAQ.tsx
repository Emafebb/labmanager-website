"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

const LINK_CLASS = "text-primary underline hover:text-primary-dark";

const faqs = [
  {
    question: "Qual è il miglior software gestionale per pasticceria?",
    answer:
      "LabManager è un software gestionale completo progettato specificamente per pasticcerie e laboratori artigianali. Permette di gestire ricette e assemblaggi, calcolare costi e margini, creare etichette alimentari con allergeni, calcolare tabelle nutrizionali e bilanciare la composizione delle preparazioni. Disponibile gratuitamente su Android e Windows, funziona anche offline.",
  },
  {
    question: "Quale app usare per gestire una pasticceria?",
    answer:
      `LabManager è l'app per la gestione completa del laboratorio di pasticceria. Disponibile su Android e Windows, consente di: creare e organizzare ricette con ingredienti e procedimenti, calcolare automaticamente costi e margini di ogni preparazione, generare etichette alimentari e tabelle nutrizionali, monitorare produzione e vendite. Funziona completamente offline con sincronizzazione cloud automatica. <a href='#funzionalita' class='${LINK_CLASS}'>Scopri tutte le funzionalità</a>.`,
  },
  {
    question: "Esistono software gratuiti per gestire una pasticceria?",
    answer:
      "Sì, LabManager è attualmente gratuito durante la fase di lancio. È un gestionale completo per pasticceria che include gestione ricette, calcolo costi, etichette con allergeni, tabelle nutrizionali e bilanciamento composizione. Non richiede abbonamento e funziona su Android e Windows, anche senza connessione internet.",
  },
  {
    question: "Come calcolare il food cost in pasticceria?",
    answer:
      "LabManager calcola automaticamente il food cost di ogni ricetta sommando il costo degli ingredienti per le quantità effettive utilizzate, considerando gli scarti. Il sistema aggiorna i costi in tempo reale alla variazione dei prezzi di acquisto. Puoi analizzare margini di guadagno, confrontare versioni diverse della stessa ricetta e monitorare l'andamento dei costi nel tempo.",
  },
  {
    question: "Come creare etichette alimentari per prodotti di pasticceria?",
    answer:
      "Con LabManager puoi generare automaticamente etichette alimentari. Il software calcola la lista ingredienti in ordine decrescente, evidenzia gli allergeni in grassetto e genera la tabella nutrizionale completa. Le etichette sono pronte per la stampa direttamente dall'app, su Android o Windows.",
  },
  {
    question: "Come posso provare l'app?",
    answer:
      `Contattaci tramite il <a href='#contatti' class='${LINK_CLASS}'>modulo contatti</a> per richiedere accesso al nostro gestionale per pasticceria. L'app è attualmente in fase di lancio e stiamo selezionando i primi utenti.`,
  },
  {
    question: "Quanto costa LabManager?",
    answer:
      "LabManager è attualmente gratuito durante la fase di lancio. In futuro saranno disponibili piani a pagamento con funzionalità avanzate.",
  },
  {
    question: "Funziona senza internet?",
    answer:
      `Sì, LabManager è progettato per funzionare offline: ricette, ingredienti, costi, etichette e tutti gli strumenti sono sempre disponibili anche senza connessione. Scopri tutte le <a href='#funzionalita' class='${LINK_CLASS}'>funzionalità disponibili</a>. La connessione è richiesta solo per la registrazione, il login e la sincronizzazione dei dati tra dispositivi. Quando torni online, tutto si aggiorna automaticamente.`,
  },
  {
    question: "Su quanti dispositivi posso usarlo?",
    answer:
      "Di base puoi usare LabManager contemporaneamente su 2 dispositivi. I dati si sincronizzano in tempo reale tra i dispositivi. Se hai bisogno di più postazioni, contattaci e troveremo la soluzione adatta a te.",
  },
  {
    question: "Posso esportare ricette e documenti?",
    answer:
      `Sì, puoi esportare ricette in PDF ed Excel, incluse tabelle nutrizionali, etichette e report. Vedi la sezione <a href='#funzionalita' class='${LINK_CLASS}'>Funzionalità</a> per maggiori dettagli. I documenti sono pronti per la stampa.`,
  },
  {
    question: "L'app genera etichette alimentari?",
    answer:
      "Sì, LabManager genera etichette alimentari con lista ingredienti, allergeni evidenziati e tabella nutrizionale. Le etichette sono pensate come supporto al tuo lavoro: verifica sempre la correttezza dei dati prima dell'utilizzo, in quanto non ci assumiamo responsabilità per eventuali errori.",
  },
  {
    question: "Posso usarlo con il mio team?",
    answer:
      "Sì, puoi aggiungere i tuoi dipendenti con accesso tramite PIN e ruoli diversi (pasticcere, banconista, ecc.). Le ricette e gli assemblaggi possono essere condivisi tra gli utenti del team.",
  },
  {
    question: "Sarà disponibile per iPhone/iPad?",
    answer:
      `Attualmente LabManager è disponibile per Android e Windows. <a href='#contatti' class='${LINK_CLASS}'>Contattaci</a> per richiedere l'accesso. Il supporto iOS è in fase di valutazione per il futuro.`,
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
      "Con LabManager puoi già gestire tutti gli ingredienti del tuo laboratorio: registra prezzi di acquisto, quantità, valori nutrizionali e allergeni per ogni materia prima. Puoi creare semilavorati e ricette che utilizzano questi ingredienti, con aggiornamento automatico dei costi. La funzionalità di inventario ingredienti avanzato con gestione scorte, soglie di riordino e storico acquisti è attualmente in fase di sviluppo.",
  },
  {
    question: "Posso tracciare i lotti di produzione?",
    answer:
      "Sì, LabManager consente di gestire i lotti di produzione associando ogni lavorazione agli ingredienti utilizzati con numero di lotto e data di scadenza. Questo garantisce piena tracciabilità della produzione per la sicurezza alimentare e il rispetto delle normative.",
  },
  
];

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

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
        text: stripHtmlTags(faq.answer),
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
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? "max-h-[600px]" : "max-h-0"
                  }`}
                >
                  <div
                    className="px-6 pb-6 text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
