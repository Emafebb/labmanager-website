# Pagine per aree di lavoro — 19 ottobre 2026

Aggiornamento successivo: titoli Etichette accorciati, Strumenti in dettagli HTML nativi con ancore funzionanti senza JavaScript, chiusure bilanciate e divider rimossi. Ristorazione sostituisce Gastronomia nel percorso home. Fonte aggiornata delle verifiche: [visual-fixes/verification.md](visual-fixes/verification.md). Le verifiche precedenti restano storiche; nessun commit/push/deploy.

## Richiesta e struttura

Aggiornamento successivo del committente, 19 ottobre: `/aggiornamenti` e `/download` sono rimosse; i vecchi URL usano la 404 Traccia esistente. Le cinque aree e i loro collegamenti restano invariati. La precedente conservazione delle due pagine di supporto è superata; vedere [../docs/RETIRED_PAGES.md](../docs/RETIRED_PAGES.md).

Famiglia approvata in conversazione: quattro approfondimenti per il lavoro del laboratorio, più una pagina autonoma sugli strumenti. Homepage come panoramica, cinque pagine autonome sotto Funzionalità, stile Traccia esistente. Implementazione locale; nessuna autorizzazione a commit, push o pubblicazione.

| Pagina | URL | Argomento |
| --- | --- | --- |
| Ricette e Food Cost | `/ricette-food-cost` | Formulazione, bilanciamento, assemblaggi, costo e margine; menu come sviluppo della proposta. |
| Produzione e Magazzino | `/produzione-magazzino` | Preparazioni, disponibilità per sede, lotti, scadenze e movimenti. |
| Ordini e Piano di lavoro | `/ordini` | Richieste, pianificazione, preparazione, ritiro/consegna e chiusura. URL e `#flusso-ordine` conservati. |
| Etichette e Libro ingredienti | `/etichette-libro-ingredienti` | Informazioni del prodotto, documenti e assortimenti, con controllo umano dei dati. |
| Strumenti e calcolatori | `/strumenti` | Quando usare i sette calcolatori, quali dati inserire e quali risultati leggere nella web app. |

## Implementazione

Aggiornamento approvato il 19 ottobre: Navbar sempre visibile anche scorrendo le cinque
aree. Barra opaca Traccia, 80 px desktop/tablet e 76 px telefono; menu contenuti nel
viewport e ancore compensate. Nessuna modifica a tassonomia, testi, CTA, immagini o
collegamenti fra aree. Decisione comune in `DESIGN.md`; verifica in
[header-review/verification.md](header-review/verification.md).

- Quattro nuove route e integrazione di Ordini nella famiglia, con prova e confronto prezzi. Navigazione desktop a espansione; sul telefono tutte le aree sono disponibili nel menu scorrevole. Chiusura con Esc, uscita del focus e click esterno per il menu desktop.
- Elenco condiviso in `src/data/work-areas.ts`, usato da navigazione, footer, catalogo homepage, collegamenti fra aree e sitemap. `WorkAreaPage` riusa Navbar, Footer, PageMotion e i token di `globals.css`; `WorkAreaLinks` collega le altre quattro aree anche su Ordini.
- Nuova azione `work-area-trial` nell’inventario CTA. Prova Plus di 14 giorni e accesso alla web app, nella stessa scheda. Inclusioni lette dal manifesto tramite `getCommercialCapability`; prezzi e manifesto invariati.
- Metadata e WebPage JSON-LD per ogni nuova route; sitemap e `llms.txt` estesi a Home, cinque aree e Prezzi. Supporto e pagine di servizio conservano le esclusioni precedenti. Il grafo globale esistente non è stato riscritto.
- Foto editoriali già presenti, con provenienza AI esplicita. Esempi di lavoro dichiarati dimostrativi. Nessuna schermata del prodotto inventata e nessun calcolatore implementato sul sito.

## Fonti e limiti delle affermazioni

Base: `.taste-skill/feature-evidence.md`, `src/data/product-features.ts`, manifesto commerciale e conferma del committente sul Libro ingredienti. Light include assortimenti e consultazione; Plus aggiunge generazione e storico PDF, come già documentato sul sito.

Gli strumenti sono stati confrontati in sola lettura con `lib/models/tools/tool_type.dart`, `lib/pages/tools_page.dart` e i widget di `lib/widgets/tools/` nell’app. Verificati: W farine, bagne, rinfresco lievito, impasti diretti/biga/poolish, tempistiche da durate impostate, conversione stampi, overrun a volume/peso. Il codice non costituisce una nuova attestazione di rilascio remoto. Nessun file dell’app è stato modificato.

Traccia, Manrope/Fraunces e asset originali conservati. `DESIGN.md`, `.impeccable/design.json` e i vecchi brief Impeccable rimangono precedenti al brandkit: il rilevatore segnala soltanto avvisi consultivi sulla scala tipografica già presenti nel CSS. La sezione visiva e le istruzioni di continuità di `CLAUDE.md` sono state aggiornate nella chiusura documentale. Nessuna soppressione generale; la riconciliazione completa degli altri documenti visivi resta aperta.

## Verifica

- `npm test`: 113 test Vitest e 3 controlli Node commerciali passati.
- `npm run build`: compilazione, TypeScript e generazione statica completate per tutte le route. ESLint sui sorgenti e test coinvolti e `git diff --check` passati.
- Browser Chrome sulla build di produzione locale, porta 3002: cinque aree a 1440 × 900, 768 × 1024, 390 × 844, 320 × 568. Acquisizioni apertura/metà/fondo su desktop e telefono, più sezioni comuni e menu.
- Verificati canonical, singolo H1, CTA, immagini, riferimenti ARIA, ID, font locali e collegamenti fra aree. Controlli di tastiera, menu mobile/tablet, ancore degli strumenti e ancora storica di Ordini; contenuto Ricette disponibile anche senza JavaScript.
- Script e misure in `output/playwright/work-areas/verify.mjs` e `report.json`. Le acquisizioni sono locali; non attestano CWV sul campo o certificazione di accessibilità.
- Il banner cookie è stato chiuso usando il suo comando reale, senza nascondere il widget via CSS. Il primo controllo di Invio è stato corretto nel solo script CDP, aggiungendo il carattere di attivazione nativo; nessuna modifica runtime per aggirare la prova.

## Continuità del workspace

Partenza: `master`, HEAD `56f361e`, working tree già ampiamente modificato dalla sessione precedente. Copia dei file condivisi prima dell’intervento in `/tmp/labmanager-work-areas-baseline`; nessun reset, clean o staging. I rilievi dell’audit precedente sui moduli, WhatsApp e newsletter rimangono distinti da questa consegna.

Nessun invio reale di moduli, iscrizione, pagamento, messaggio o modifica di abbonamenti. Nessun commit, push o deploy. Restano da ricevere gli screenshot reali Food Cost, Ordini e Libro ingredienti con dati dimostrativi.

## Correzione dell’impaginazione su segnalazione del committente

Lo screenshot del committente ha evidenziato il limite del controllo precedente: assenza di overflow e componenti funzionanti non escludevano lo squilibrio dei tre passaggi disposti su due colonne.

- Il flusso di Strumenti usa tre colonne oltre 1000 px e una colonna a larghezze inferiori. I flussi di quattro passaggi restano su due colonne oltre 700 px e una colonna sui telefoni.
- Titolo e introduzione del flusso allineati in alto. Spazio sopra e sotto ridotto a 80 px su desktop/tablet e 64 px sul telefono; distanza fra introduzione e passaggi di 40 px.
- Correzione condivisa in `WorkAreaSteps` e CSS circoscritto ad `.area-flow`. Dicitura AI mantenuta: il messaggio incompleto non conteneva ulteriori modifiche, come chiarito dal committente.
- Riproduzione prima della modifica: lo script rilevava due colonne anziché tre su `/strumenti` a 1440 px. Dopo la modifica: 24 controlli sulle quattro pagine, a 1440/1024/1000/768/390/320, senza overflow o errori runtime; verificati numero di colonne, allineamento e spaziature effettive. Cinque acquisizioni desktop/tablet/mobile aperte e riviste.
- Evidenze: `output/playwright/work-areas/verify-layout.mjs` e `layout-fix/report.json`. Build con TypeScript, ESLint, diff-check e 17 test mirati passati. Nessun commit, push o deploy.

## Dicitura sulle immagini AI

Il committente ha chiesto se la dichiarazione fosse obbligatoria. Nella ricerca del 19 ottobre è stata distinta l’assenza di un obbligo indistinto per qualsiasi immagine AI dagli obblighi relativi ai contenuti qualificabili come deepfake ai sensi dell’articolo 50 dell’AI Act. È stata raccomandata prudenzialmente una dicitura vicino alle scene fotorealistiche del sito, senza qualificare definitivamente ogni immagine né dichiarare sufficiente il solo footer.

Fonti consultate: [FAQ della Commissione europea sull’articolo 50](https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act) e [testo dell’articolo 50 nel servizio della Commissione](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-50). Sono riferimenti della ricerca svolta, da verificare nuovamente se si assume una nuova decisione normativa.

La formula breve “Immagine generata con IA” è stata proposta, ma non applicata. Il testo effettivo resta “Illustrazione editoriale generata con AI.” nelle quattro nuove pagine e la nota collettiva già presente nel footer. La successiva richiesta del committente ha autorizzato le correzioni di impaginazione; la domanda di completamento ha confermato che non c’erano altre modifiche. Nessuna autorizzazione alla rimozione delle diciture.

## Prossimo lavoro

Il committente ha chiesto di aggiornare la documentazione e analizzare **il footer** in una chat pulita. La precedente menzione della pagina Prezzi è stata corretta. Handoff in [handoff-footer.md](handoff-footer.md); questa chiusura documentale non avvia l’analisi del footer.
