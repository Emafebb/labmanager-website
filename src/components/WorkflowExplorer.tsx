"use client";

import EditorialImage from "@/components/EditorialImage";
import { Check } from "lucide-react";

export const LAB_WORKFLOWS = [
  {
    id: "pasticceria",
    name: "Pasticceria",
    product: "Una torta, dall’idea al ritiro",
    steps: [
      {
        title: "Componi",
        text: "Unisci basi e farciture in un assemblaggio. Adatta pesi e porzioni alla richiesta.",
        href: "#ricette",
      },
      {
        title: "Calcola",
        text: "Considera ingredienti, lavoro e altri costi. Definisci il prezzo con il Food Cost.",
        href: "#food-cost",
      },
      {
        title: "Organizza",
        text: "Porta l’ordine nel piano di lavoro. Segui preparazione, acconto e ritiro.",
        href: "#ordini",
      },
      {
        title: "Consegna",
        text: "Prepara le informazioni sul prodotto e registra vendita e saldo.",
        href: "#etichette",
      },
    ],
  },
  {
    id: "panificio",
    name: "Panificio",
    product: "Il pane di domani parte oggi",
    steps: [
      {
        title: "Formula",
        text: "Ricalcola gli impasti e consulta i tool per farine, lievito e lievitazione.",
        href: "#bilanciamento",
      },
      {
        title: "Pianifica",
        text: "Riunisci gli ordini dei clienti e le preparazioni interne nel piano di lavoro.",
        href: "#ordini",
      },
      {
        title: "Produci",
        text: "Registra le preparazioni e segui le quantità attraverso i lotti.",
        href: "#produzione",
      },
      {
        title: "Controlla",
        text: "Leggi consumi, giacenze e vendite per preparare il lavoro successivo.",
        href: "#magazzino",
      },
    ],
  },
  {
    id: "gelateria",
    name: "Gelateria",
    product: "Ogni gusto ha i suoi numeri",
    steps: [
      {
        title: "Bilancia",
        text: "Lavora su zuccheri, grassi, solidi e parametri PAC e POD della ricetta.",
        href: "#bilanciamento",
      },
      {
        title: "Valuta",
        text: "Calcola il costo al kg e il prezzo. Usa il tool dedicato all’overrun.",
        href: "#food-cost",
      },
      {
        title: "Prepara",
        text: "Registra la produzione e tieni sotto controllo ingredienti e scadenze.",
        href: "#magazzino",
      },
      {
        title: "Informa",
        text: "Prepara ingredienti, allergeni e valori nutrizionali dai dati delle ricette.",
        href: "#etichette",
      },
    ],
  },
  {
    id: "ristorazione",
    name: "Ristorazione",
    product: "Dal costo del piatto al menu",
    steps: [
      {
        title: "Definisci il piatto",
        text: "Riunisci preparazioni e ingredienti in ricette e assemblaggi. Imposta pesi e porzioni.",
        href: "#ricette",
      },
      {
        title: "Calcola il Food Cost",
        text: "Leggi il costo per porzione, includendo ingredienti, lavoro e altri costi. Valuta prezzo e margine.",
        href: "#food-cost",
      },
      {
        title: "Crea il menu",
        text: "Combina i piatti in un menu e calcola il costo per persona. Simula prezzi e grammature della proposta.",
        href: "#food-cost",
      },
      {
        title: "Sei un consulente?",
        text: "Analizza Food Cost, prezzi e grammature dei menu dei tuoi clienti. Prepara un’analisi dei costi da condividere con loro, anche in PDF.",
        href: "/ricette-food-cost#recipe-menu-heading",
      },
    ],
  },
] as const;

export default function WorkflowExplorer() {
  return (
    <section
      className="workflow section-space"
      aria-labelledby="workflow-heading"
    >
      <div className="section-intro" data-reveal>
        <h2 id="workflow-heading">
          Il tuo lavoro, <br />
          qui dentro.
        </h2>
        <p>
          Un gestionale prende senso quando riconosci la tua giornata. Scegli un
          laboratorio e segui un esempio.
        </p>
      </div>
      <fieldset className="workflow__selector" data-reveal>
        <legend>Scegli il tuo laboratorio</legend>
        <div className="workflow__choices">
          {LAB_WORKFLOWS.map((workflow) => (
            <label key={workflow.id} className="workflow__choice">
              <input
                type="radio"
                name="laboratorio"
                value={workflow.id}
                defaultChecked={workflow.id === "pasticceria"}
                aria-controls={`workflow-${workflow.id}`}
                className="sr-only"
              />
              {workflow.name}
              <Check size={20} aria-hidden="true" />
            </label>
          ))}
        </div>
      </fieldset>
      <div className="workflow__results">
        {LAB_WORKFLOWS.map((workflow) => (
          <article
            key={workflow.id}
            id={`workflow-${workflow.id}`}
            className="workflow__story"
            aria-labelledby={`workflow-title-${workflow.id}`}
          >
            <h3 className="workflow__title" id={`workflow-title-${workflow.id}`}>
              {workflow.product}
            </h3>
            <ol className="workflow__steps">
              {workflow.steps.map((step) => (
                <li key={step.title}>
                  <h4>
                    <a
                      href={step.href}
                      className="text-link"
                      onClick={() => {
                        const target = document.getElementById(
                          step.href.slice(1),
                        );
                        if (target instanceof HTMLDetailsElement)
                          target.open = true;
                      }}
                    >
                      {step.title}
                    </a>
                  </h4>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
      <p className="small-note">
        Percorsi esemplificativi. Le funzioni disponibili dipendono dal piano
        scelto.
      </p>
      <div className="craft-gallery">
        <figure data-reveal>
          <EditorialImage
            src="/images/editorial/pane.webp"
            alt="Lavorazione artigianale del pane"
            width={1536}
            height={1024}
            sizes="(max-width: 700px) calc(100vw - 40px), 31vw"
          />
          <figcaption>Il pane di ogni giorno.</figcaption>
        </figure>
        <figure data-reveal>
          <EditorialImage
            src="/images/editorial/gelato.webp"
            alt="Gelato al pistacchio lavorato con una spatola"
            width={1536}
            height={1024}
            sizes="(max-width: 700px) calc((100vw - 52px) / 2), 31vw"
          />
          <figcaption>Il gusto messo a punto.</figcaption>
        </figure>
        <figure data-reveal>
          <EditorialImage
            src="/images/editorial/preparazioni.webp"
            alt="Preparazione manuale di pasta ripiena in laboratorio"
            width={1536}
            height={1024}
            sizes="(max-width: 700px) calc((100vw - 52px) / 2), 31vw"
          />
          <figcaption>La cura di ogni preparazione.</figcaption>
        </figure>
      </div>
    </section>
  );
}
