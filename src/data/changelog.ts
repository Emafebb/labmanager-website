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
    version: "0.0.9",
    date: "2026-06-04",
    platforms: ["android", "windows"],
    sections: [
      {
        title: "Ordini e piano di lavoro",
        items: [
          "Nuova area per gestire ordini clienti, ordini interni tra sedi e lavori di laboratorio pianificati",
          "Inserimento rapido con cliente, telefono, sede, data, orario, ritiro o consegna",
          "Più righe nello stesso ordine con note diverse, allergie dichiarate, dedica, colori, decorazioni, candele e note laboratorio",
          "Viste per giorno, settimana, mese o stato, con filtri più comodi su desktop e mobile",
          "Copia rapida del numero ordine quando serve comunicarlo o cercarlo",
          "La vista aiuta a capire cosa va preparato oggi, cosa è già pronto, cosa è in ritardo e cosa deve essere consegnato o ritirato",
        ],
      },
      {
        title: "Produzione collegata agli ordini",
        items: [
          "Le righe ordine possono essere collegate a ricette o assemblaggi già presenti in LabManager",
          "Collegamento tra richiesta cliente, prodotto preparato e lotto per evitare di riscrivere le stesse informazioni",
          "Produzione programmata nel piano settimanale e lavori ricorrenti con titolo più chiaro",
          "Lotto produzione mostrato nei dettagli dell'ordine quando disponibile",
          "Annullamento della produzione collegata con conferma esplicita",
          "Blocco della vendita manuale da una produzione già nata da ordine, per evitare doppioni",
        ],
      },
      {
        title: "Cassa, acconti e chiusura ordini",
        items: [
          "Il flusso ordini distingue meglio acconti, saldi, vendite e cassa",
          "Un ordine può partire come non pagato, con acconto o saldato",
          "Il dettaglio mostra acconto, residuo e stato pagamento",
          "Alla consegna puoi scegliere se incassare il saldo o lasciarlo aperto",
          "La vendita generata dall'ordine conserva numero ordine, cliente e sede",
          "La Dashboard Cassa legge gli incassi reali e non solo il totale dell'ordine",
          "Gli annulli di ordini incassati possono essere gestiti con storno o rimborso",
          "Le vendite collegate a un ordine non si eliminano dal Registro Vendite, ma si gestiscono dall'ordine",
        ],
      },
      {
        title: "Report ordini ed export",
        items: [
          "Report Ordini più utile per controllo giornaliero, riepiloghi cliente e lavoro amministrativo",
          "Lettura più chiara di numero ordini, stati, clienti serviti, prodotti, righe ordine, sedi, totali, acconti, residui e note operative",
          "Filtri dedicati con esportazione in Excel o PDF",
          "Utile per riepiloghi di giornata, controllo consegne e ritiri, passaggio informazioni al laboratorio e tracciamento ordini cliente",
        ],
      },
      {
        title: "Notifiche ordini",
        items: [
          "Notifiche sugli ordini più visibili e più adatte al lavoro su più postazioni",
          "Avvisi quando arrivano o cambiano ordini importanti, quando un ordine viene completato in laboratorio e quando viene consegnato o ritirato",
          "Su Android arrivano notifiche push",
          "Su Windows sono stati aggiunti badge nella navigazione, indicatori NEW sulle righe ordine e un suono leggero",
          "La postazione che ha appena eseguito l'azione non viene disturbata dalla propria notifica",
        ],
      },
      {
        title: "Storico etichette e ristampa",
        items: [
          "Le etichette definitive salvate sui lotti possono essere ritrovate nello Storico Etichette",
          "Ristampa, salvataggio PDF, stampa o export senza ricostruire tutto da capo",
          "Ricerca delle etichette partendo dai lotti usati",
          "Dettagli salvati apribili in sola lettura per evitare modifiche accidentali ai dati correnti",
          "Supporto anche per etichette salvate in formato più vecchio quando i dati sono sufficienti",
          "Messaggi più comprensibili quando i dati salvati non bastano",
        ],
      },
      {
        title: "Etichette, imballaggi e contenuto",
        items: [
          "Etichettatura ambientale rafforzata con componente reale dell'imballaggio, codice materiale e istruzione di raccolta",
          "Suggerimenti per compilare i dati di riciclo, mantenendo il campo libero per descrivere l'imballaggio realmente usato",
          "Controlli di attenzione su additivi funzionali, origine o provenienza indicata, cacao, cioccolato e diciture delicate",
          "Dati opzionali presi dalla scheda tecnica del fornitore",
          "Controlli su leggibilità, contrasto e dimensioni del testo",
          "Allergeni più evidenti e lotti e date più chiari nei PDF",
          "Gli avvisi aiutano a fermarsi sui punti giusti prima di stampare, esportare o consegnare un'etichetta",
        ],
      },
      {
        title: "Stampa Bluetooth etichette",
        items: [
          "Su Android è disponibile la stampa diretta verso stampanti termiche Bluetooth compatibili",
          "Dal flusso etichette puoi scegliere tra stampa PDF classica e stampante etichette Bluetooth",
          "La configurazione della stampante viene salvata sul dispositivo",
          "Puoi scegliere il numero di copie prima della stampa",
          "La stampa PDF tradizionale resta disponibile",
        ],
      },
      {
        title: "Ricette, mobile e uso quotidiano",
        items: [
          "Pagina ricette più adattabile a schermi grandi e piccoli",
          "Barra azioni ricetta più compatta su mobile",
          "Righe ingredienti più gestibili quando lo spazio è stretto",
          "Salvataggio export mobile nella cartella Download",
          "Dettagli vendita più larghi e leggibili",
          "Formattazione quantità vendita più corretta",
          "Schermate e sezioni meno soggette a campi tagliati",
        ],
      },
      {
        title: "Vendite, tracciabilità e magazzino",
        items: [
          "Le vendite generate dagli ordini sono più riconoscibili nel Registro Vendite e nella tracciabilità",
          "Ricerca vendita anche per numero ordine o cliente",
          "Se una vendita nasce da un ordine, LabManager evita l'eliminazione diretta dal Registro Vendite e rimanda alla gestione dell'ordine",
          "Tracciabilità lotto più chiara quando un lotto è stato distribuito tramite un ordine collegato a ricetta o assemblaggio",
          "Più facile ricostruire il percorso del prodotto quando serve capire a quale cliente o documento è collegato",
        ],
      },
      {
        title: "Dopo l'aggiornamento",
        items: [
          "Crea un ordine di prova con acconto e residuo",
          "Collega almeno una riga ordine a una ricetta o a un assemblaggio",
          "Chiudi un ordine e controlla vendita, cassa e stato pagamento",
          "Verifica il Report Ordini con un filtro giorno o settimana",
          "Prova le notifiche sulle postazioni che usano ordini",
          "Apri lo Storico Etichette e ristampa una vecchia etichetta",
          "Se usi una stampante termica, configura la stampante Bluetooth su Android",
          "Ricontrolla componenti imballaggio, allergeni e dati da scheda tecnica prima delle prime stampe reali",
        ],
      },
    ],
  },
  {
    version: "0.0.8",
    date: "2026-05-14",
    platforms: ["android", "windows"],
    sections: [
      {
        title: "Dashboard Costi",
        items: [
          "Nuova area dedicata al controllo dei costi con vista unificata su vendite, produzioni, costi fissi, personale, spese e margini",
          "Sezione Economico: fatturato, costo del venduto, costi fissi, personale, altre spese e risultato stimato del mese",
          "Sezione Cassa: entrate e uscite effettive separate, inclusi ricevimenti merce e spese pagate",
          "Sezione Prodotti: margini e risultati di ricette, assemblaggi e prodotti venduti",
          "Sezione Spese: inserimento manuale di costi come manutenzioni, consulenze, materiali e servizi",
          "Sezione Storico: confronto dei mesi e andamento annuale",
        ],
      },
      {
        title: "Vendita Prodotti Commerciali",
        items: [
          "Il Registro Vendite gestisce ora anche prodotti commerciali acquistati da terzi e rivenduti, senza doverli trasformare in ricette",
          "Registrazione guidata con sede, prodotto, lotto consigliato, quantità, prezzo, IVA, cliente e documento",
          "Scarico automatico del magazzino dal lotto corretto con costo d'acquisto e margine calcolati sulla vendita",
          "Visibilità nella Dashboard Costi e nella tracciabilità lotto",
        ],
      },
      {
        title: "Registro Lotti Più Ordinato",
        items: [
          "I lotti interni generati dall'app hanno ora un registro dedicato per una tracciabilità più chiara",
          "Le etichette definitive registrano il lotto solo alla stampa, PDF o export reale; la sola anteprima non crea lotti inutili",
          "Puoi partire da una produzione già registrata e riusare il lotto corretto nelle etichette",
          "Ricerca per lotto e data più comoda nei flussi collegati alle etichette",
        ],
      },
      {
        title: "Etichette Più Sicure Prima della Stampa",
        items: [
          "I preset verificano i dati minimi richiesti prima di generare un output definitivo: lotto, scadenza, quantità, conservazione, allergeni e valori nutrizionali",
          "Distinzione migliorata tra operatore responsabile e stabilimento di produzione o confezionamento",
          "Etichette interne di laboratorio con indicazione esplicita dell'uso interno e dell'operatore quando previsto",
          "Allergeni e valori nutrizionali possono essere marcati come verificati; l'app avvisa prima dell'output se non lo sono",
        ],
      },
      {
        title: "Resa e Calo Peso nelle Ricette",
        items: [
          "Nelle ricette puoi indicare la resa: nessun calo, calo in percentuale, calo in grammi o peso finito misurato",
          "Con resa verificata, etichette e valori nutrizionali usano il peso del prodotto finito come base di calcolo",
          "L'app avvisa prima di generare un'etichetta definitiva se la resa di una ricetta non è ancora verificata",
          "Utile per prodotti da forno, cotture, creme e ricette dove la lavorazione modifica il peso finale",
        ],
      },
      {
        title: "Valori Nutrizionali Più Coerenti",
        items: [
          "Valori nutrizionali e energia coerenti tra anteprima, PDF, stampa ed export",
          "Il valore energetico in kJ già presente viene mantenuto come riferimento invece di ricalcolarlo dalle kcal",
          "Con resa verificata, la normalizzazione dei valori nutrizionali usa il peso del prodotto finito",
        ],
      },
      {
        title: "Sede Operativa sul Dispositivo",
        items: [
          "Ogni dispositivo può avere una sede operativa predefinita, utile per tablet fissi in laboratorio o punto vendita",
          "Preseleziona automaticamente la sede corretta in ricevimento merci, prelievi, produzione, inventario, vendite e storico movimenti",
          "Non modifica la sede legale o quella usata come riferimento per le etichette ufficiali",
        ],
      },
      {
        title: "Magazzino e Uso Mobile",
        items: [
          "Inventario lotti più compatto su mobile con filtri migliorati per tipo prodotto e sede",
          "Disponibilità magazzino e storico movimenti già orientati sulla sede operativa del dispositivo",
          "Dialog di modifica movimento adattato a schermi stretti; colonne, badge e tabelle sistemati per evitare tagli",
          "Lotti commerciali inclusi nelle viste di inventario e vendita",
        ],
      },
    ],
  },
  {
    version: "0.0.7",
    date: "2026-04-27",
    platforms: ["android", "windows"],
    sections: [
      {
        title: "Importazione ricette da foto",
        items: [
          "Su Android puoi importare ricette partendo da una foto, una scheda stampata o un appunto scritto a mano",
          "LabManager prova a riconoscere titolo, ingredienti, quantità e procedimento, poi abbina gli ingredienti al database",
          "Prima del salvataggio puoi verificare e correggere nome, quantità, ingredienti mancanti e procedimento",
        ],
      },
      {
        title: "Etichette più leggibili su tablet",
        items: [
          "La configurazione delle etichette è stata riorganizzata per funzionare meglio su tablet Android",
          "Chi lavora vicino al banco o prepara le stampe trova controlli più grandi, sezioni più leggibili e meno campi compressi",
          "La configurazione segue meglio formato, denominazione di vendita, scadenza, lotto, conservazione, peso, e-mark, contaminazioni, prezzo, codice a barre, riciclo e sezioni visibili in etichetta",
        ],
      },
    ],
  },
  {
    version: "0.0.6",
    date: "2026-04-13",
    platforms: ["android", "windows"],
    sections: [
      {
        title: "Tracciabilità Completa Lotti e Clienti",
        items: [
          "Traccia i lotti dall'acquisto alla produzione fino alla vendita",
          "Supporto completo per clienti B2B (grossisti, catering, e-commerce)",
        ],
      },
      {
        title: "Export PDF per Tracciabilità",
        items: [
          "Esporta la storia completa di un lotto (origine, produzione, vendita)",
          "Genera report per controlli interni e verifiche qualità",
          "Include informazioni del fornitore e date chiave",
          "Formato PDF pronto per stampa e conservazione",
        ],
      },
    ],
  },
  {
    version: "0.0.5",
    date: "2026-04-08",
    platforms: ["android", "windows"],
    sections: [
      {
        title: "Storico DDT",
        items: [
          "Archivio completo dei documenti di trasporto ricevuti, consultabile con filtri per sede, fornitore e data",
          "Dettaglio di ogni riga: prodotto, quantità, lotto, scadenza e prezzo",
        ],
      },
      {
        title: "Scanner DDT più preciso",
        items: [
          "Ricostruzione delle righe basata sulla posizione nel documento, anche quando i testi sono disallineati",
          "Lettura dei codici a barre GS1 Code-128 per identificare i prodotti",
          "I PDF generati dallo scanner includono il nome della tua attività nell'intestazione",
        ],
      },
      {
        title: "Validazione in tempo reale",
        items: [
          "Quando salvi un ricevimento o un prelievo, l'app evidenzia in rosso ogni campo mancante riga per riga",
          "Per i dati facoltativi come lotto e scadenza, ti chiede se vuoi procedere lo stesso senza bloccarti",
        ],
      },
      {
        title: "Miglioramenti magazzino",
        items: [
          "Nuova card Scaduti nella dashboard: vedi subito i prodotti oltre la data di scadenza, separati da quelli in scadenza",
          "Le sedi ora includono il campo nazione, pre-compilato dall'indirizzo del profilo azienda",
          "Gli avvisi di scadenza escludono i lotti con giacenza zero",
          "Il calcolo Sotto soglia considera tutti i movimenti di magazzino, non solo i carichi",
        ],
      },
    ],
  },
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
        title: "Ingredienti",
        items: [
          "Oltre 650 ingredienti in database con valori nutrizionali e costi già compilati, pronti all'uso o personalizzabili",
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
