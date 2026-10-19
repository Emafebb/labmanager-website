import Link from "next/link";
import WorkAreaPage, {
  workAreaMetadata,
  WorkAreaSteps,
} from "@/components/WorkAreaPage";
import { WORK_AREAS } from "@/data/work-areas";

const area = WORK_AREAS[0];
export const metadata = workAreaMetadata(area);

const steps = [
  {
    title: "Scrivi la formula",
    text: "Organizza ingredienti e semilavorati nell’archivio ricette. Lavora con pesi e percentuali e ricalcola la composizione per la quantità che devi preparare.",
  },
  {
    title: "Metti a punto il prodotto",
    text: "Confronta le ricette e controlla zuccheri, grassi, acqua e solidi. Il bilanciamento comprende anche parametri come PAC e POD, quando pertinenti alla preparazione.",
  },
  {
    title: "Componi con gli assemblaggi",
    text: "Riunisci ricette e semilavorati nel prodotto finito. Una base, una farcitura e una finitura possono così entrare nello stesso assemblaggio.",
  },
  {
    title: "Valuta costo e prezzo",
    text: "Leggi il costo per kg, unità o porzione, includendo ingredienti, lavoro e altri costi. Imposta il prezzo di vendita oppure calcolalo a partire dal margine obiettivo.",
  },
];

export default function RecipesPage() {
  return (
    <WorkAreaPage
      area={area}
      heading={
        <>
          Una ricetta,
          <br />
          anche nei conti.
        </>
      }
      intro="Per chi formula un prodotto e deve decidere come venderlo. Tieni insieme composizione, quantità, costo e margine, dalla prima prova alla porzione che arriva al banco."
      image={{
        src: "/images/editorial/hero-laboratorio.webp",
        alt: "Lavorazione artigianale di un prodotto da forno in laboratorio",
      }}
      capabilities={[
        "ricette_archivio",
        "confronto_ricette",
        "bilanciamento",
        "assemblaggi",
        "food_cost_ricetta",
      ]}
    >
      <WorkAreaSteps
        title="Dalla formula al prezzo."
        intro="Il lavoro tecnico e la valutazione economica partono dallo stesso prodotto. Ogni passaggio risponde a una decisione diversa."
        steps={steps}
      />
      <section
        className="area-example section-space"
        aria-labelledby="recipe-example-heading"
      >
        <div>
          <h2 id="recipe-example-heading">
            La stessa torta,
            <br />
            un’altra quantità.
          </h2>
          <dl className="area-quantities" aria-label="Quantità dell’esempio">
            <div>
              <dt>Ricetta iniziale</dt>
              <dd>2 <span>kg</span></dd>
            </div>
            <div>
              <dt>Da preparare</dt>
              <dd>6 <span>kg</span></dd>
            </div>
          </dl>
          <p className="small-note">
            Esempio dimostrativo di lavoro, con quantità illustrative.
          </p>
        </div>
        <div>
          <p>
            Ricalcoli i pesi mantenendo le proporzioni, poi controlli il costo per kg e per
            porzione.
          </p>
          <p>
            Se il prodotto comprende una base e una crema già archiviate, le
            riusi nell’assemblaggio. Il Food Cost ti aiuta a valutare il prezzo
            tenendo conto anche del lavoro e degli altri costi inseriti.
          </p>
          <p>
            Per forme e misure diverse puoi usare la{" "}
            <Link href="/strumenti#conversione-stampi">
              conversione degli stampi
            </Link>
            .
          </p>
        </div>
      </section>
      <section
        className="area-notes section-space"
        aria-labelledby="recipe-menu-heading"
      >
        <h2 id="recipe-menu-heading">
          Dal prodotto
          <br />
          alla proposta.
        </h2>
        <div>
          <h3>Food Cost e menu</h3>
          <p>
            Quando la proposta comprende più preparazioni, il menu permette di
            lavorare sul costo per persona e simulare prezzo e grammatura. Puoi
            preparare il PDF della proposta commerciale e quello dell’analisi
            interna.
          </p>
          <h3>Per i consulenti</h3>
          <p>
            Se lavori come consulente, puoi analizzare costi, prezzi e
            grammature dei menu dei tuoi clienti e condividere l’analisi in PDF.
          </p>
          <h3>Il passo successivo</h3>
          <p>
            Quando passi alla preparazione, approfondisci{" "}
            <Link href="/produzione-magazzino">Produzione e Magazzino</Link>.
            Per composizione, allergeni e documenti, prosegui con{" "}
            <Link href="/etichette-libro-ingredienti">
              Etichette e Libro ingredienti
            </Link>
            .
          </p>
        </div>
      </section>
    </WorkAreaPage>
  );
}
