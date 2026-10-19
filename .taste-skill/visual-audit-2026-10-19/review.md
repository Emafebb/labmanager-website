# Analisi visiva — LabManager, 19 ottobre 2026

L’identità Traccia è riconoscibile e coerente. La home racconta bene il mondo del laboratorio; la famiglia di approfondimenti deve ancora rendere visibile il software e variare il ritmo delle sezioni. La priorità è completare questa dimostrazione mantenendo palette, font e impostazione approvati.

Analisi in sola lettura dei sorgenti runtime. Sono stati aggiunti esclusivamente script, misure, screenshot e questo report nella cartella dell’audit. Nessun commit, push o deploy.

## Base e metodo

- Letti `CLAUDE.md`, `DESIGN.md`, `.taste-skill/brief.md`, `.taste-skill/pagine-aree-di-lavoro.md`, l’handoff footer e i file del brandkit. Le decisioni più recenti prevalgono sulle descrizioni storiche.
- Direzione esistente: **Dressed as something else**, seed **1228958381**, riallineata a Traccia. Nessuna nuova estrazione o modifica degli asset.
- Browser Chrome sulla build locale servita da `http://127.0.0.1:3010`. Il CSS restituito dal server coincide byte per byte con quello della build `.next` corrente. Non è una verifica del sito pubblico.
- Home, Ricette/Food Cost, Produzione/Magazzino, Ordini, Etichette/Libro ingredienti, Strumenti e Prezzi a **1440 × 900, 768 × 1024, 390 × 844**: 21 configurazioni. Apertura, scorrimento, fondo pagina, immagini e font, acquisizioni complete e fogli di confronto.
- Banner cookie chiuso con il suo pulsante reale; popup newsletter incontrato e chiuso con il suo pulsante. Nessun consenso accettato artificialmente, nessun elemento nascosto via CSS, nessun invio di moduli. Le azioni sono registrate in `observed/measurements.json`.
- `inspect.mjs` eseguito a tutte e tre le larghezze su Home, Strumenti, Prezzi ed Etichette; lint Taste su `src`. Gli screenshot elencati dai quattro inspector sono stati aperti. Le altre tre pagine sono state osservate e misurate dallo script di acquisizione, senza un ulteriore inspector dedicato.
- I fogli `observed/*-sheet-*.jpg` derivano dalle acquisizioni complete. I numeri indicano porzioni consecutive della stessa immagine, non passi o numerazioni presenti sul sito. Le fasce grigie sono spazio inutilizzato del foglio di confronto.

## Cosa funziona

- **Palette e tipografia.** Bosco e avorio reggono lettura e azioni; salvia separa i contenuti. Fraunces dà calore ai titoli, Manrope tiene leggibili spiegazioni e dati. Le eccezioni approvate del brandkit non sono difetti da eliminare per soddisfare un controllo automatico.
- **Hero della home.** «Dalla ricetta al banco» resta in due righe, con pubblico e azione spiegati subito. Misure dell’inspector: 88 px desktop, 48 px tablet, circa 43 px telefono. Il telefono ha un ordine di lettura proprio e una CTA nel primo schermo.
- **Percorsi per mestiere.** Il selettore lega l’argomento a operazioni concrete e sostiene l’idea editoriale. È il dispositivo che distingue maggiormente la home da una semplice lista di funzioni.
- **Navigazione e CTA.** Header compatto, coerente e persistente; azioni bosco/bianco riconoscibili. Le pagine appartengono chiaramente alla stessa famiglia.
- **Footer desktop.** Firma, dati societari e due gruppi di navigazione hanno una gerarchia chiara. La firma è proporzionata; non serve tornare a un wordmark enorme a tutta larghezza.
- **Adattamento di base.** Nessun overflow orizzontale e nessuna eccezione JavaScript registrata nelle 21 acquisizioni. Non equivale a una certificazione di accessibilità o a un collaudo completo delle interazioni.

## Rilievi, in ordine di impatto

| Priorità | Evidenza osservata | Implicazione e intervento proposto |
| --- | --- | --- |
| Alta | Tutte e cinque le aree hanno una sola fotografia nel contenuto principale. Ricette riprende l’immagine della home; Produzione e Ordini condividono la scena delle preparazioni. Dopo l’apertura prevale il testo. | Si riconosce il lavoro artigiano, ma si vede poco il gestionale. Inserire le schermate autentiche già concordate: Food Cost, piano Ordini, Libro ingredienti. Affiancare il risultato specifico descritto; conservare le fotografie come contesto. Nessuna schermata inventata. |
| Alta | Etichette: H1 su **3 righe** a 1440, 768 e 390 px. A 768 px «Cambia una crema. Rivedi le informazioni.» arriva a **4 righe**; «Un assortimento, un documento da seguire.» arriva a 3 su tablet e telefono. | I titoli diventano paragrafi grandi e rompono la regola dei titoli brevi del kit e di Taste. Accorciare prima le parole, poi rivedere la misura. Esempi da valutare: «Dal prodotto all’etichetta», «Cambia la ricetta», «Il tuo Libro ingredienti». Non ridurre tutti i font per risolvere un singolo testo. |
| Media | Le quattro pagine `WorkAreaPage` ripetono apertura divisa, flusso, esempio scuro, note, piano, correlati e CTA. Strumenti ripete sette volte titolo/spiegazione e «Inserisci/Ottieni»; misura **8.556 px** sul telefono, circa dieci viewport intere. | La coerenza diventa prevedibilità. Variare il blocco che dimostra la funzione: costo e margine per Ricette, disponibilità/lotti per Produzione, documento per Etichette. Per Strumenti usare esempi di input e risultato leggibili, sintetizzando il testo ripetuto senza eliminare informazioni. Non occorre implementare calcolatori sul sito. |
| Media | Prezzi mobile: il confronto conserva tre colonne; celle come Libro ingredienti e supporto annuale vanno a capo molte volte. Il widget di accessibilità può sovrapporsi alle celle durante lo scorrimento. | L’assenza di overflow non basta: confrontare diventa faticoso. Dare più respiro alle differenze e valutare una presentazione mobile dedicata, preservando tutte le condizioni e i valori. La distinzione Light bianco / Plus bosco, i prezzi e la chiarezza della fatturazione annuale funzionano. |
| Media | Footer a 390 px: margine sinistro **20 px**, destro **84 px**, contenuto largo **286 px**. La corsia di 64 px protegge il widget, ma stringe l’intero footer e aumenta gli a capo. | La soluzione è funzionale e già documentata, ma visivamente sbilancia il telefono. Rivedere l’ingombro del widget e la zona di rispetto, mantenendo accessibile il comando. Non ripristinare testo sotto al controllo. |
| Media | I CTA finali delle aree occupano la parte sinistra della pagina lasciando molta superficie libera a destra. L’inspector segnala circa **753 px** liberi sulla chiusura di Strumenti ed Etichette. | Il finale perde forza dopo pagine lunghe. Comporre una fascia più compatta con messaggio e azione bilanciati nella larghezza disponibile. Non aggiungere decorazioni per riempire. |
| Minore | Divider da 1 px nei blocchi Strumenti, nei piani delle aree e nei correlati. L’inspector ne rileva 12 su Strumenti e 6 su Etichette. | È una divergenza dalle regole Taste applicate al sito. Usare spazio o cambi di superficie dopo aver risolto gerarchia e dimostrazione del prodotto. Le righe delle tabelle e i bordi funzionali dei campi restano legittimi. |

Riferimenti visivi principali: `observed/ricette-food-cost-1440-sheet-1.jpg`, `observed/etichette-libro-ingredienti-768-sheet-1.jpg`, `observed/strumenti-390-sheet-1.jpg`, `pricing/mobile-page-01.jpg`, `observed/home-390-footer.jpg`.

## Footer: cosa è stato rivalidato

Il vecchio rilievo «WhatsApp copre la nota AI al fondo della home» **non si riproduce nello stato corrente**: il pulsante flottante risulta nascosto quando il footer è visibile in tutte e tre le larghezze; la nota è leggibile. Il collegamento WhatsApp rimane nel gruppo contatti.

Le colonne desktop sono equilibrate; sul telefono l’ordine firma → navigazione → società → legale è comprensibile. Il punto da rivedere è la larghezza sottratta per l’intera altezza del footer. Non propongo di togliere dati, collegamenti legali o disclosure delle immagini.

## Risultati automatici e interpretazione

| Inspector | FAIL raggruppati | WARN raggruppati | Lettura corretta |
| --- | --- | --- | --- |
| Home | 1 | 4 | `covered-text` rileva contenuto dietro ai dialoghi aperti. Le acquisizioni successive distinguono la lettura dopo la loro chiusura. `long-pin` include il titolo del popup: non dimostra un problema di sezione sticky. |
| Strumenti | 2 | 4 | Divider e singola fotografia sono confermati. Chiusura sbilanciata e ripetizione sono osservabili. |
| Prezzi | 4 | 4 | `eyebrow` classifica la raccomandazione del piano sopra al prezzo; assenza di fotografie e animazioni riflette anche il carattere della pagina di confronto. Non suggerisco di aggiungere quattro immagini decorative o animazioni per superare il contatore. |
| Etichette | 6 | 3 | Titoli su troppe righe confermati visivamente e con una misura indipendente; presenti anche divider, una sola fotografia e poco movimento. |

L’avorio `#f5f1e8` segnalato come `palette-cream` è approvato dal brandkit: **da conservare**. Anche l’assenza di footage reale è un limite già riconosciuto: le schermate del software hanno precedenza su un video generico.

Il lint sorgente segnala 10 occorrenze FAIL e 7 WARN, includendo menu/dialoghi, focus, email e componenti non montati nella home corrente. Non sono dieci difetti visivi dimostrati. I divider nelle aree sono invece confermati dal browser. Output grezzo in `lint.txt`.

La stima iniziale delle righe dall’altezza degli elementi sovrastimava un H2 di Ordini perché il box era esteso dalla griglia. È stata sostituita con i rettangoli del testo effettivo; **nessun rilievo sui titoli di Ordini**. Il titolo accessibile «Piani Light e Plus» è nascosto visivamente e non rientra nei problemi tipografici osservati.

## Critica nel formato Taste

ROUND 1

Seen in one second: titoli Fraunces bosco e mani al lavoro; il laboratorio è evidente, il software molto meno.

Idea (one sentence): i collegamenti fra ricetta, preparazione e vendita diventano un sommario editoriale del lavoro quotidiano.

Live thing: scelta del mestiere e lettura del percorso sulla home; nei quattro approfondimenti condivisi la dimostrazione resta soprattutto testuale.

Layout words by section: home hero=split / percorsi=selettore e flusso / immagini=trittico / funzioni=indice e accordion / prova=piani / FAQ=accordion / contatti=split / footer=colonne; aree hero=split / flusso=griglia / esempio=split scuro / note=split / inclusioni=split / correlati=griglia / chiusura=colonna sinistra.

Scores: design 6.5 · usability 7 · creativity 6.5 · content 7.5 → overall **6.0 dopo il tetto Taste** (media ponderata 6.75).

Caps applied: tetto complessivo 6.0 per FAIL ancora presenti; le aree hanno meno di quattro immagini e alcuni titoli superano due righe. Il punteggio valuta la famiglia nel complesso e non attribuisce alla home tutti i difetti delle pagine interne. Non è un voto di affidabilità tecnica o conversione.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. Il prodotto resta invisibile dopo l’apertura: `observed/ricette-food-cost-1440-sheet-1.jpg`. Inserire una schermata reale con un risultato concreto nel blocco che oggi lo racconta soltanto.
2. Titoli Etichette troppo lunghi: `observed/etichette-libro-ingredienti-768-sheet-1.jpg`. Accorciare H1 e titoli interni, mantenendo Fraunces e la scala del kit.
3. Ritmo uniforme e lettura lunga: `observed/strumenti-390-sheet-1.jpg`. Sostituire parte della spiegazione ripetuta con esempi di input/risultato e dare un ruolo diverso ai blocchi di dimostrazione.

Un solo giro di critica, senza correzioni: la richiesta è di analisi. Nessun after prodotto e nessuna dichiarazione di gate superato.

## Limiti

Nessun controllo Safari, dispositivo fisico, viewport 320 px, invio reale, pagamento, revisione SEO, prestazioni sul campo o nuova build. Non rieseguiti i test applicativi perché nessun sorgente runtime è cambiato. Newsletter, Instagram, pagine billing e 404 non rientrano nelle sette pagine di questo audit.

Non sono state prodotte nuove immagini, riprese, testimonianze o dati commerciali. Le foto esistenti sono illustrazioni editoriali AI dichiarate; restano da ricevere le schermate autentiche già concordate con dati dimostrativi.
