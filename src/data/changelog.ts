export type Platform = "android" | "windows";

export interface ChangelogSection {
  title: string;
  items: string[];
}

export interface ChangelogEntry {
  version: string;
  date: string; // ISO: "YYYY-MM-DD"
  platforms: Platform[];
  sections: ChangelogSection[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "0.0.4",
    date: "2026-02-28",
    platforms: ["android", "windows"],
    sections: [
      {
        title: "Novità",
        items: [
          "LabManager è ora disponibile su Android: gestisci ricette, costi e produzione dal telefono o tablet",
          "Aggiornamenti automatici in-app: quando c'è una nuova versione, puoi aggiornare con un tocco",
          "Bilancia gli ingredienti direttamente dal telefono, anche senza connessione",
        ],
      },
      {
        title: "Analisi Costi",
        items: [
          "Scheda costi dedicata con materie prime, ore lavorate e costi fissi",
          "Imposta il margine desiderato e ottieni il prezzo da applicare",
        ],
      },
      {
        title: "Esportazioni",
        items: [
          "Tabelle di produzione in Excel",
          "Registro vendite in PDF o CSV",
          "Etichette pronte da stampare",
          "Quattro viste diverse per il registro vendite",
        ],
      },
      {
        title: "Strumenti Pasticceria",
        items: [
          "Conversione stampi: cambia le misure e le quantità si ricalcolano in automatico",
          "Confronta ricette: affianca due o più ricette per ingredienti, costi e valori nutrizionali",
          "Overrun gelato: inserisci i pesi e ottieni il risultato",
        ],
      },
      {
        title: "Miglioramenti",
        items: [
          "Allergeni nel PDF sempre corretti; avvertenza polioli aggiunta automaticamente quando serve",
          "I filtri restano dove li hai lasciati anche cambiando pagina",
          "Duplica ricette e assemblaggi con un clic",
          "Avviso immediato se un nome è già in uso",
          "Supporto accesso simultaneo su 2 dispositivi",
        ],
      },
    ],
  },
  {
    version: "0.0.3",
    date: "2026-02-10",
    platforms: ["windows"],
    sections: [
      {
        title: "Inventario",
        items: [
          "Traccia i lotti di produzione con codice lotto automatico",
          "Imposta la data di scadenza dei prodotti",
          "Elimina lotti con avviso di sicurezza",
          "Visualizzazione raggruppata dei lotti con righe espandibili",
        ],
      },
      {
        title: "Registro Vendite",
        items: [
          "Registra le vendite con calcolo automatico del margine",
          "Collega vendite e produzioni",
        ],
      },
      {
        title: "Etichette Prodotto",
        items: [
          "Esportazione in Excel delle etichette",
          "Sezione HACCP configurabile",
          "Avvertenza automatica per i polioli nelle etichette",
          "Miglioramenti nella generazione PDF",
        ],
      },
      {
        title: "Gestione Accessi",
        items: [
          "Badge operatore attivo visibile nella navigazione",
          "Cambio operatore rapido dalle impostazioni",
          "Sistema permessi per controllare l'accesso alle funzioni",
          "Dialog PIN per operazioni protette",
        ],
      },
    ],
  },
  {
    version: "0.0.2",
    date: "2026-01-25",
    platforms: ["windows"],
    sections: [
      {
        title: "Dashboard Produzione",
        items: [
          "Panoramica completa delle produzioni con statistiche",
          "Filtra per periodo, ricetta o categoria",
          "Visualizza i dettagli di ogni produzione",
        ],
      },
      {
        title: "Analisi Costi Ricette",
        items: [
          "Calcola il costo completo di ogni ricetta",
          "Imposta il prezzo partendo dal margine desiderato",
          "Considera scarti, calo peso e resa effettiva",
        ],
      },
      {
        title: "Strumenti Pasticceria",
        items: [
          "Parametri Impasto: calcola idratazione, W e temperature",
          "Calcolo Miscele Farine: combina farine per ottenere il W desiderato",
          "Rinfresco Lievito: calcola le quantità per il rinfresco",
          "Tempistiche Lievitazione: pianifica i tempi con più fasi",
          "Conversione Stampi: ricalcola le quantità per stampi diversi",
          "Confronta Ricette: confronta ricette affiancate",
          "Calcolo Overrun Gelato: calcola l'overrun per il gelato",
        ],
      },
      {
        title: "Gestione Costi",
        items: [
          "Inserisci i costi mensili (elettricità, gas, affitto...)",
          "Aggiungi dipendenti con ruolo e costo orario",
          "I costi vengono inclusi automaticamente nel calcolo ricette",
        ],
      },
      {
        title: "Archivio Ricette",
        items: [
          "Visualizzazione a tabella con filtri per categoria e allergeni",
          "Duplica o elimina ricette rapidamente",
          "Controllo automatico per evitare nomi duplicati",
        ],
      },
    ],
  },
  {
    version: "0.0.1",
    date: "2025-10-01",
    platforms: ["windows"],
    sections: [
      {
        title: "Prima versione",
        items: [
          "Gestione ricette con ingredienti e pesi",
          "Archivio ingredienti con valori nutrizionali",
          "Calcolo nutrizionale automatico",
          "Gestione categorie per ricette e ingredienti",
          "Gestione allergeni",
          "Assemblaggi multi-ricetta",
          "Stampa etichette prodotto",
        ],
      },
    ],
  },
];
