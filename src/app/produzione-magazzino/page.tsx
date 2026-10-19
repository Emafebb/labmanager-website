import Link from "next/link";
import WorkAreaPage, {
  workAreaMetadata,
  WorkAreaSteps,
} from "@/components/WorkAreaPage";
import {
  MAGAZZINO_CANONICAL_COPY,
  MAGAZZINO_CLAIM_ID_ATTRIBUTE,
} from "@/data/magazzino-capability-matrix";
import { WORK_AREAS } from "@/data/work-areas";

const area = WORK_AREAS[1];
export const metadata = workAreaMetadata(area);

const steps = [
  {
    title: "Ricevi e controlla",
    text: "Registra il ricevimento delle merci e consulta le giacenze per sede. Se parti da un DDT, l’importazione assistita ti permette di verificare le righe prima della conferma.",
  },
  {
    title: "Registra le preparazioni",
    text: "Tieni il registro delle produzioni e collega le preparazioni alle righe d’ordine quando il lavoro nasce da una richiesta. Quantità e pesi restano riferiti al prodotto.",
  },
  {
    title: "Segui lotti e scadenze",
    text: "Consulta la disponibilità, i lotti e gli alert scadenze. Puoi inserire lotti di ricette e assemblaggi anche senza registrare prima una produzione.",
  },
  {
    title: "Leggi i movimenti",
    text: "Gestisci prelievi, scarti, rettifiche e trasferimenti tra sedi. Consulta lo storico dei movimenti e la scheda di tracciabilità PDF del lotto.",
  },
];

export default function ProductionPage() {
  return (
    <WorkAreaPage
      area={area}
      heading={
        <>
          Prepari oggi.
          <br />
          Sai cosa resta.
        </>
      }
      intro="Per chi deve seguire ciò che entra, ciò che prepara e ciò che ha a disposizione. Produzione e magazzino raccolgono quantità, sedi, lotti e scadenze del lavoro quotidiano."
      image={{
        src: "/images/editorial/preparazioni.webp",
        alt: "Preparazione di pasta ripiena su un banco di laboratorio",
      }}
      capabilities={["registro_produzione", "magazzino_ddt", "vendite"]}
    >
      <WorkAreaSteps
        title="Dall’arrivo alla disponibilità."
        intro="La richiesta si organizza nel piano di lavoro. Qui segui le preparazioni e le disponibilità del laboratorio."
        steps={steps}
      />
      <section
        className="area-example section-space"
        aria-labelledby="production-example-heading"
      >
        <div>
          <h2 id="production-example-heading">
            Un lotto pronto,
            <br />
            nella sede giusta.
          </h2>
          <p className="small-note">Esempio dimostrativo di lavoro.</p>
        </div>
        <div>
          <p>
            Una preparazione è già disponibile, ma non hai registrato una
            produzione. Puoi inserire il lotto della ricetta o
            dell’assemblaggio, indicando i dati necessari e la sede.
          </p>
          <p>
            Se una parte viene spostata, prelevata o scartata, registri il
            movimento e ne conservi lo storico. Per la vendita puoi attribuire i
            lotti disponibili.
          </p>
          <p>
            Il lotto identifica il prodotto; la sede ti aiuta a capire dove si
            trova la disponibilità.
          </p>
        </div>
      </section>
      <section
        className="area-notes section-space"
        aria-labelledby="warehouse-heading"
      >
        <h2 id="warehouse-heading">
          Il magazzino,
          <br />
          nel dettaglio.
        </h2>
        <div>
          <p data-magazzino-claim-ids={MAGAZZINO_CLAIM_ID_ATTRIBUTE}>
            {MAGAZZINO_CANONICAL_COPY}
          </p>
          <h3>Prima e dopo la preparazione</h3>
          <p>
            Per definire cosa fare e per quando, vai a{" "}
            <Link href="/ordini#flusso-ordine">Ordini e Piano di lavoro</Link>.
            Per le informazioni da accompagnare al prodotto, prosegui con{" "}
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
