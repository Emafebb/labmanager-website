# Verifica della rimozione — 19 ottobre 2026

## Risultato

Rimosse `/aggiornamenti` e `/download`, componenti Download/DownloadClient, dati del changelog e CSS dedicato. Aggiornati contratti di supporto/crawl, matrice Magazzino e relativi test. La 404 Traccia esistente risponde ai vecchi URL; il Worker lascia renderizzare la risposta a OpenNext. Politica HTTPS e blocco dei metodi HTTP non sicuri conservati.

Ricerca finale nei sorgenti runtime: nessun riferimento a `/download`, `/aggiornamenti`, `labmanager-downloads`, DownloadClient o agli stili rimossi. Le stringhe nei test verificano il ritiro. Nessun intervento su manifesto commerciale, moduli, email, asset del brandkit, navigazione o contenuti delle pagine rimaste.

## Controlli eseguiti

- Nuovi contratti osservati fallire prima della rimozione: file ancora presenti, superficie changelog ancora obbligatoria, risposta vuota del Worker. Dopo la modifica: suite completa **114 Vitest + 3 Node commerciali**, tutti passati. Ripetizione finale mirata: 37 test passati. Avvisi dell'ambiente Node/jsdom su localStorage e navigazione simulata, senza test falliti.
- ESLint sui sei sorgenti/test TypeScript modificati, `git diff --check`, lint Taste sui due sorgenti runtime TS: passati. Il lint Taste TS non è un audit completo del CSS preesistente.
- Build Next/Turbopack e TypeScript completati; elenco delle route privo delle due pagine. Build ripetuta in copia temporanea isolata con lo stesso compilatore. Un tentativo con Webpack nella copia ha rilevato gli export aggiuntivi preesistenti di pagina, non accettati dal suo validatore: non sono stati modificati né sono stati disabilitati i controlli. Il compilatore predefinito del progetto completa la build.
- Chrome, build produzione isolata su `http://127.0.0.1:3004`: **42 controlli** (12 pagine attive e due URL ritirati × 1440 × 900, 768 × 1024, 390 × 844). Nessun overflow orizzontale; un H1, font Manrope/Fraunces, sfondo Traccia e immagini caricate; nessun link alle pagine o ai pacchetti ritirati.
- Per i due URL: HTTP 404, noindex, nessun canonical ereditato, azione di ritorno alla home. Verificati anche query string, sottopercorsi, varianti percent-encoded e HEAD. Menu aperti e chiusi con Escape alle tre larghezze; ritorno alla homepage tramite il comando effettivo.
- Screenshot delle due 404 e della home, apertura/fondo e menu, rivisti nei tre fogli `browser/review-1440.jpg`, `review-768.jpg`, `review-390.jpg`. Popup newsletter e banner cookie chiusi con i rispettivi pulsanti, senza nasconderli tramite CSS. La prima acquisizione aveva fotografato il popup comparso in ritardo: corretto solo lo script e ripetuta l'intera verifica.

Script ripetibile: `verify.mjs`; misure in `browser/report.json`. Non verificati invii reali, pacchetti/installazioni, pagamenti, client autenticati, dispositivi fisici o Safari. Nessuna attestazione di comportamento Cloudflare remoto.

## Inspector e critica visiva

Conservata la direzione Dressed as something else, seed 1228958381, con priorità al brandkit Traccia; nessuna estrazione o redraw. Rimangono l'idea dei collegamenti fra ricetta, preparazione e vendita e il selettore per mestiere della home. La 404 mantiene la sua azione di ritorno al sito. Nessun asset fotografico nuovo o reperito online, nessun contenuto dimostrativo aggiunto, nessun nuovo obbligo di credito; fotografie editoriali e dichiarazioni esistenti conservate.

Inspector finale, `final-404/report.json`: **5 FAIL / 3 WARN**, con la sola eccezione `palette-cream` per il colore avorio esplicitamente approvato. Tutte le sei immagini elencate dall'inspector sono state aperte e riviste. Non si dichiara superato il gate a zero FAIL.

Rilievi: corpo prevalente a 14 px per i testi di footer, assenza di quattro fotografie, scala del punto focale, margini rilevati dal misuratore e assenza del budget di movimento promozionale. Avvisi su video, titolo e margini mobile. Main e riquadro 404 risultano centrati nelle acquisizioni senza overlay; il campionamento dell'inspector include il footer e il banner CMP iniziale. Non aggiunti fotografie, video o animazioni a una pagina di errore per soddisfare requisiti di una landing, né ridisegnata la 404 o il footer nell'ambito di questa rimozione. Questo limite è distinto dai controlli funzionali e responsive passati.

ROUND 1

Seen in one second: “Pagina non trovata” e ritorno alla homepage.

Idea (one sentence): la continuità di Traccia conserva l'orientamento quando un vecchio indirizzo non è più disponibile.

Live thing: ritorno alla home e menu verso le cinque aree, funzionanti anche sul telefono.

Layout words by section: navigation=bar / status=panel / footer=columns.

Scores: design 6.5 · usability 8 · creativity 5 · content 8 → overall 6.0.

Caps applied: limite 6.0 per i FAIL dell'inspector; la fotografia non è richiesta dal contenuto di una 404. Il punteggio riguarda questa pagina di servizio, non il sito intero.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. Il banner cookie copre parte del testo nella prima apertura desktop (`final-404/desktop-fold.jpg`). Acquisite anche le viste dopo chiusura reale (`browser/download-1440-top.jpg`); comportamento CMP conservato.
2. Le informazioni legali del footer hanno un peso tipografico minore del contenuto principale (`final-404/mobile-page-01.jpg`). Conservata la gerarchia esistente: non è stato richiesto un nuovo intervento sul footer.
3. La pagina di servizio è volutamente breve e priva di racconto fotografico/movimento (`browser/aggiornamenti-768-top.jpg`). Conservata la 404 approvata; nessun contenuto ornamentale aggiunto.

## Workspace e limiti

Il checkout era già modificato. Baseline dei 19 file coinvolti in `/tmp/labmanager-retired-pages-baseline`. Durante il lavoro sono cambiate anche le regole del footer e il relativo componente da altra sessione: conservate integralmente. Un server Next già avviato ha poi servito HTML e asset di build diverse, producendo falsi overflow sulle immagini della home. La verifica finale usa una copia coerente in `/tmp/labmanager-retired-pages-preview`, senza scrivere nuovamente la build condivisa. `snapshot-check.json` conferma la corrispondenza dei file coinvolti e del footer al momento del controllo.

Nella sola copia temporanea, `turbopack.root` è impostato a `/` per risolvere il collegamento al `node_modules` esistente; configurazione del repository invariata. La porta 3003 avviata in questo intervento è stata fermata; la preview isolata resta sulla 3004. I server precedenti delle altre sessioni sono stati lasciati intatti.

Raccomandazione operativa e dipendenze dell'updater trovate in sola lettura: [../../docs/RETIRED_PAGES.md](../../docs/RETIRED_PAGES.md). Worker, bucket e repository dell'app non modificati. Nessun commit, push o deploy.
