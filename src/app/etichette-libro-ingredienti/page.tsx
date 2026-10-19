import Link from "next/link";
import WorkAreaPage, {
  workAreaMetadata,
  WorkAreaSteps,
} from "@/components/WorkAreaPage";
import { WORK_AREAS } from "@/data/work-areas";

const area = WORK_AREAS[3];
export const metadata = workAreaMetadata(area);

const steps = [
  {
    title: "Parti dalla composizione",
    text: "Usa i dati della ricetta per lavorare su ingredienti, allergeni e percentuali. La qualità delle informazioni inserite resta il punto di partenza del documento.",
  },
  {
    title: "Prepara l’etichetta",
    text: "Configura l’etichetta, genera il PDF e consulta lo storico. Le informazioni nutrizionali possono essere lette per 100 g, per porzione e sul totale.",
  },
  {
    title: "Organizza l’assortimento",
    text: "Raccogli i prodotti nel Libro ingredienti e gestisci le singole voci. Le impostazioni comprendono conservazione, prezzo e valori nutrizionali.",
  },
  {
    title: "Genera e controlla il Libro",
    text: "Con Plus, genera il documento con le verifiche su ingredienti e allergeni e consulta lo storico PDF. Controlla lo stato degli aggiornamenti del Libro quando cambiano i dati del prodotto.",
  },
];

export default function LabelsPage() {
  return (
    <WorkAreaPage
      area={area}
      heading="Dal prodotto all’etichetta."
      intro="Per chi deve presentare ciò che produce, sul banco o in un assortimento. Dalla composizione della ricetta alle etichette e al Libro ingredienti, con dati da controllare prima di usarli."
      image={{
        src: "/images/editorial/gelato.webp",
        alt: "Lavorazione di gelato artigianale in laboratorio",
      }}
      capabilities={["tabelle_nutrizionali", "etichette_storico"]}
    >
      <WorkAreaSteps
        title="Dalla ricetta al documento."
        intro="Etichette e Libro ingredienti rispondono a esigenze diverse: la singola preparazione e l’insieme dei prodotti che proponi."
        steps={steps}
      />
      <section
        className="area-example section-space"
        aria-labelledby="labels-example-heading"
      >
        <div>
          <h2 id="labels-example-heading">Cambia la ricetta.</h2>
          <p className="small-note">Esempio dimostrativo di lavoro.</p>
        </div>
        <div>
          <p>
            Sostituisci un ingrediente della crema usata in più prodotti.
            Controlli la composizione delle preparazioni interessate, poi rivedi
            le informazioni nelle etichette e nelle voci dell’assortimento.
          </p>
          <p>
            Nel Libro ingredienti consulti lo stato degli aggiornamenti; con
            Plus puoi generare il nuovo PDF e ritrovare i documenti nello
            storico.
          </p>
          <p>
            Prima di usare i documenti devi verificare ingredienti, allergeni e
            informazioni del prodotto rispetto alle materie prime e alla
            preparazione effettiva.
          </p>
        </div>
      </section>
      <section
        className="area-notes section-space"
        aria-labelledby="book-heading"
      >
        <h2 id="book-heading">Il tuo Libro ingredienti.</h2>
        <div>
          <h3>Libro ingredienti: Light e Plus</h3>
          <p>
            Light include assortimenti e consultazione. Plus aggiunge
            generazione e storico PDF.
          </p>
          <h3>Le informazioni restano da verificare</h3>
          <p>
            Le verifiche del software supportano il controllo dei dati inseriti.
            La correttezza del documento dipende anche da composizioni,
            fornitori e lavorazioni effettive.
          </p>
          <p>
            Per mettere a punto la composizione, torna a{" "}
            <Link href="/ricette-food-cost">Ricette e Food Cost</Link>. Per le
            etichette collegate ai lotti, il lavoro prosegue con le
            disponibilità in{" "}
            <Link href="/produzione-magazzino">Produzione e Magazzino</Link>.
          </p>
        </div>
      </section>
    </WorkAreaPage>
  );
}
