export const PRODUCT_FEATURES = [
  {
    id: "ricette",
    title: "Ricette e semilavorati",
    description:
      "Il tuo sapere, organizzato. Una base comune per pesi, costi e produzione.",
    items: [
      "Composizione e archivio ricette, ingredienti e semilavorati",
      "Ricalcolo di pesi e percentuali, resa del prodotto finito",
      "Confronto di ricette, assemblaggi e schede PDF",
    ],
  },
  {
    id: "bilanciamento",
    title: "Bilanciamento e strumenti",
    description:
      "Metti a punto la formula, con i parametri e i calcoli del tuo mestiere.",
    items: [
      "Bilanciamento di zuccheri, grassi, acqua e solidi, con parametri PAC e POD",
      "Calcolo W farine, bagne, rinfresco del lievito e parametri impasto",
      "Tempistiche di lievitazione, conversione stampi e calcolo overrun",
    ],
  },
  {
    id: "food-cost",
    title: "Food Cost e menu",
    description:
      "Dal costo della singola porzione alla proposta completa per il cliente.",
    items: [
      "Costo per kg, unità o porzione, con ingredienti, lavoro e altri costi",
      "Prezzo di vendita manuale o calcolato a partire dal margine obiettivo",
      "Menu con costo per persona e simulazioni di prezzo e grammatura",
      "PDF della proposta commerciale e dell’analisi interna",
    ],
  },
  {
    id: "ordini",
    title: "Ordini e piano di lavoro",
    description:
      "La richiesta del cliente arriva in laboratorio con tutte le informazioni utili.",
    items: [
      "Ordini cliente e interni, con viste giorno, settimana, mese e stato",
      "Filtri per cliente e sede, ritiro o consegna, produzione collegata",
      "Acconti, saldi, vendita a peso effettivo e report operativi",
    ],
  },
  {
    id: "produzione",
    title: "Produzione e vendite",
    description:
      "Segui ciò che prepari e ciò che vendi, senza perdere il riferimento al prodotto.",
    items: [
      "Registro delle produzioni e collegamento con le righe d’ordine",
      "Registrazione delle vendite e attribuzione dei lotti",
      "Quantità, pesi effettivi, incassi e storico delle operazioni",
    ],
  },
  {
    id: "magazzino",
    title: "Magazzino e lotti",
    description: "Sai cosa hai, dove si trova e cosa usare prima.",
    items: [
      "Ricevimento merci, giacenze per sede e soglie configurabili",
      "Scarico FIFO, alert scadenze e trasferimenti tra sedi",
      "Lotti di ricette e assemblaggi anche senza registrare prima una produzione",
      "Prelievi, scarti, rettifiche, storico movimenti e scheda tracciabilità PDF",
    ],
  },
  {
    id: "etichette",
    title: "Etichette e nutrizione",
    description:
      "Le informazioni del prodotto partono dai dati della tua ricetta.",
    items: [
      "Ingredienti, allergeni e percentuali nella composizione",
      "Valori nutrizionali per 100 g, porzione e totale",
      "Configurazione etichette, generazione PDF e storico",
      "Etichette collegate ai lotti di magazzino",
    ],
  },
  {
    id: "libro-ingredienti",
    title: "Libro ingredienti",
    description:
      "Organizza i prodotti in assortimenti e prepara il documento da consultare.",
    items: [
      "Assortimenti ricercabili e gestione delle singole voci",
      "Generazione con verifiche su ingredienti e allergeni",
      "Impostazioni per conservazione, prezzo e valori nutrizionali",
      "Storico PDF e controllo degli aggiornamenti del Libro",
    ],
  },
  {
    id: "documenti",
    title: "Documenti e AI",
    description:
      "Meno trascrizioni: parti da foto e documenti, poi controlli tu.",
    items: [
      "Importazione di ricette da foto, file e PDF",
      "Lettura di DDT con verifica delle righe prima del ricevimento",
      "Lettura di fatture per precompilare le voci dello scadenzario",
      "Dati sempre verificabili e modificabili prima della conferma",
    ],
  },
  {
    id: "economia",
    title: "Controllo economico",
    description:
      "Guarda come sta andando il laboratorio, oltre il costo della ricetta.",
    items: [
      "Fatturato, costo del venduto, margini e confronto tra periodi",
      "Costi fissi e del personale, risultato mensile e punto di pareggio",
      "Movimenti di cassa, spese, storico e scadenzario",
      "Analisi dei prodotti e del loro contributo ai risultati",
    ],
  },
  {
    id: "team",
    title: "Persone e organizzazione",
    description:
      "Dai a chi lavora con te gli strumenti e gli accessi che servono.",
    items: [
      "Anagrafiche clienti, fornitori e personale",
      "Operatore attivo con PIN, ruoli e permessi",
      "Gestione delle sedi e dei costi del personale",
      "Impostazioni dell’attività e gestione dell’abbonamento",
    ],
  },
] as const;
