import Link from "next/link";
import WorkAreaPage, {
  workAreaMetadata,
  WorkAreaSteps,
} from "@/components/WorkAreaPage";
import { WORK_AREAS } from "@/data/work-areas";

const area = WORK_AREAS[4];
export const metadata = workAreaMetadata(area);

const tools = [
  {
    id: "w-farine",
    title: "W delle farine",
    when: "Vuoi miscelare due farine per ottenere un W obiettivo.",
    input: "Quantità totale, W delle due farine e W desiderato.",
    result:
      "Grammi e percentuali delle farine da pesare, con il W della miscela.",
  },
  {
    id: "bagne",
    title: "Bilanciamento delle bagne",
    when: "Devi preparare una bagna alcolica o analcolica.",
    input:
      "Quantità e parametri della bagna, con le opzioni per alcool, sciroppo e zuccheri.",
    result: "La composizione in grammi da usare nella preparazione.",
  },
  {
    id: "rinfresco-lievito",
    title: "Rinfresco del lievito",
    when: "Devi organizzare uno o più rinfreschi di lievito madre solido o Li.Co.Li.",
    input:
      "Tipo di lievito, quantità e rapporto di rinfresco, preimpostato o personalizzato.",
    result:
      "Le quantità da pesare per il rinfresco o la sequenza di rinfreschi.",
  },
  {
    id: "parametri-impasto",
    title: "Parametri dell’impasto",
    when: "Stai preparando un impasto diretto oppure con biga o poolish.",
    input:
      "Metodo, quantità e percentuali dell’impasto, con le opzioni pertinenti alla lavorazione.",
    result:
      "I grammi degli ingredienti da pesare, con i parametri del metodo scelto.",
  },
  {
    id: "tempistiche-lievitazione",
    title: "Tempistiche di lievitazione",
    when: "Devi disporre le fasi a partire dall’inizio del ciclo o dall’ora in cui vuoi il prodotto pronto.",
    input: "Metodo, orario di riferimento e durata delle fasi.",
    result:
      "Una sequenza temporale delle lavorazioni, costruita con i tempi che hai impostato.",
  },
  {
    id: "conversione-stampi",
    title: "Conversione degli stampi",
    when: "La stessa preparazione deve entrare in uno stampo diverso.",
    input:
      "Forma e misure dello stampo originale e del nuovo, più gli ingredienti scritti o presi da una ricetta salvata.",
    result:
      "Le quantità convertite, il nuovo peso totale e il fattore di conversione.",
  },
  {
    id: "overrun",
    title: "Overrun del gelato",
    when: "Vuoi valutare l’aria incorporata in un gelato o in un sorbetto.",
    input:
      "I volumi prima e dopo la mantecazione, oppure i pesi di miscela e gelato nello stesso contenitore.",
    result:
      "La percentuale di overrun. Puoi anche lavorare sul peso della vaschetta rispetto a un overrun obiettivo.",
  },
];

const steps = [
  {
    title: "Scegli il calcolo",
    text: "Parti dal problema concreto: una miscela di farine, un rinfresco, una misura dello stampo o un orario di lavorazione.",
  },
  {
    title: "Inserisci i tuoi dati",
    text: "Usa quantità, misure e parametri della preparazione. Per la lievitazione imposti le durate delle fasi in base al tuo processo.",
  },
  {
    title: "Leggi il risultato",
    text: "Usa i pesi, le proporzioni o la sequenza temporale restituiti dal calcolatore e verifica che siano adatti alla lavorazione effettiva.",
  },
];

export default function ToolsPage() {
  return (
    <WorkAreaPage
      area={area}
      heading={
        <>
          Il calcolo giusto,
          <br />
          quando serve.
        </>
      }
      intro="Per chi deve adattare una quantità, una miscela o una lavorazione. Sette strumenti di laboratorio per passare dai parametri ai pesi, alle proporzioni e ai tempi da usare."
      image={{
        src: "/images/editorial/pane.webp",
        alt: "Preparazione di pane artigianale su un banco di lavoro",
      }}
      capabilities={["tools_laboratorio"]}
    >
      <WorkAreaSteps
        title="Dal problema al risultato."
        intro="I calcolatori si usano nella web app. Qui trovi quando servono, da quali dati partono e che cosa restituiscono."
        steps={steps}
      />
      <section
        className="area-tools section-space"
        aria-labelledby="tools-heading"
      >
        <div className="section-intro">
          <h2 id="tools-heading">Scegli da cosa partire.</h2>
          <p>
            Farine, lieviti, stampi o gelato: ogni strumento ha un compito
            preciso.
          </p>
        </div>
        <nav className="area-tools__index" aria-label="Vai allo strumento">
          {tools.map((tool) => (
            <a href={`#${tool.id}`} key={tool.id}>
              {tool.title}
            </a>
          ))}
        </nav>
        {tools.map((tool, index) => (
          <details key={tool.id} className="area-tool" open={index === 0}>
            <summary>
              <h3>{tool.title}</h3>
              <span aria-hidden="true">+</span>
            </summary>
            <div id={tool.id} className="area-tool__body">
              <p>{tool.when}</p>
              <dl>
                <div>
                  <dt>Inserisci</dt>
                  <dd>{tool.input}</dd>
                </div>
                <div>
                  <dt>Ottieni</dt>
                  <dd>{tool.result}</dd>
                </div>
              </dl>
            </div>
          </details>
        ))}
      </section>
      <section
        className="area-notes section-space"
        aria-labelledby="tools-recipe-heading"
      >
        <h2 id="tools-recipe-heading">
          Dal calcolo
          <br />
          alla tua ricetta.
        </h2>
        <div>
          <p>
            Gli strumenti ti aiutano su un passaggio specifico. Per
            formulazione, bilanciamento della composizione, assemblaggi e
            valutazione economica, prosegui con{" "}
            <Link href="/ricette-food-cost">Ricette e Food Cost</Link>.
          </p>
          <p>
            Quando devi organizzare preparazioni e richieste, passa a{" "}
            <Link href="/ordini">Ordini e Piano di lavoro</Link>. I tempi
            impostati nei calcolatori restano da valutare rispetto alle
            condizioni reali del laboratorio.
          </p>
        </div>
      </section>
    </WorkAreaPage>
  );
}
