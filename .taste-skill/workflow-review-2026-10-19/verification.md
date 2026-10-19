# Selettore laboratorio — implementazione e verifica

Aggiornamento successivo: su richiesta del committente, gruppo dei selettori e dicitura
centrati entro 800 px. Nuova build `XHES7vKuh15rK0N24Gx_Z` completata e anteprima
3052 aggiornata. Browser a 1440/768/390/320: centri del gruppo e della dicitura
coincidenti con metà viewport (720/384/195/160 px), nessun overflow.
Screenshot desktop/mobile aperti; misure in `after/centered.json` sotto la cartella
di output Playwright. Diff-check passato. Suite non ripetuta per il solo allineamento CSS.
Le prove seguenti descrivono l'implementazione precedente, invariata nel comportamento.

Implementazione autorizzata dal committente con «procedi» dopo la [review](review.md).
Build di produzione locale `Bd6G40SDFEmFGSxxLWjaW`, http://127.0.0.1:3052,
checkout basato su `c13f887`. Non è il sito pubblicato.

## Risultato

- Pasticceria selezionata all'ingresso, spunta oltre al cambio di colore.
- Campo avorio, gruppo salvia, scelte bianche, scelta attiva bosco/bianco.
- Un solo articolo per volta; testata bosco e corpo bianco, senza accordion o reset duplicati.
- Radio HTML nativi: selezione, tastiera e filtro CSS funzionanti anche senza JavaScript.
- Introduzione allineata in alto; comandi 2 × 2 sul telefono, area di tocco di 56 px,
  testo di 16 px anche a 320 px. Passaggi su 4/2/1 colonne secondo le soglie esistenti.
- Tutti i testi e i 16 collegamenti originali conservati. Manrope/Fraunces e asset esistenti;
  nessuna nuova fotografia, licenza, contenuto dimostrativo, dipendenza o estrazione Taste.
- Direzione conservata: Traccia, con draw storico «Dressed as something else», seed 1228958381.

File applicativi: `src/components/WorkflowExplorer.tsx`, classi workflow di
`src/app/globals.css`, test collegati in `src/app/home-page.test.tsx`.
Decisione riportata anche in `DESIGN.md`, `.impeccable/design.json` e brief.
Documenti SEO, package e lock già modificati da altro lavoro preservati.

## Controlli

| Controllo | Prima | Dopo |
| --- | --- | --- |
| Scelta iniziale | Nessun selettore attivo, Pasticceria aperta nella vista tutti | Pasticceria selezionata e un solo articolo |
| Sistemi di scelta | Filtro più quattro accordion | Quattro scelte e un solo percorso |
| Superficie dei comandi | Stessa tinta pallida dei pannelli | Bianco su gruppo salvia; attivo bosco con spunta |
| Funzionamento senza JS | Contenuti in details; filtro inattivo | Scelta nativa e un solo percorso selezionato |
| Taste a 1440/768/390, popup chiusi dai comandi reali | 0 FAIL / 3 WARN | 0 FAIL / 3 WARN |
| Overflow orizzontale a 1440/768/390/320 | Baseline della review sulle prime tre larghezze | Nessuno; nessun testo dei selettori debordante |

Verifica test-first: i due test dei percorsi sono stati aggiornati prima del componente
e osservati fallire per assenza del gruppo/radio previsti. Dopo l'implementazione:
6/6 nel file mirato; suite completa 133/133 Vitest su 21 file e 3/3 Node commerciali.
Avvisi del runner: localStorage sperimentale di Node e navigazione Document non implementata
in jsdom, senza test falliti. ESLint mirato, TypeScript, diff-check e build Next 16.4.2 passati.
Le dipendenze correnti del checkout sono state usate, senza cambiarle o attribuirne l'upgrade
a questo intervento. Prima esecuzione build limitata dal sandbox su apertura porta interna;
build completata con escalation locale autorizzata dal sistema.

Browser sulla build finale, `output/playwright/workflow-review-2026-10-19/verify-after.mjs`:

- 1440, 768, 390 e 320 px: stato iniziale, tutti i quattro percorsi, ritorno a Pasticceria,
  unica storia visibile, spunta, font caricati, testo e pagina senza overflow, target di 56 px.
- Freccia destra: selezione e focus su Panificio, indicatore focus visibile.
- Quindici collegamenti ai dettagli home effettivamente aperti e link consulenti alla pagina
  Ricette con destinazione `#recipe-menu-heading`, a ciascuna delle quattro larghezze.
- A 1440 e 390 px con JS disattivato e reduced motion: tutti i percorsi selezionabili,
  un solo articolo visibile, transizioni a 0 s.
- Nessuna eccezione runtime raccolta nelle quattro prove con JS. Dieci acquisizioni della
  sezione aperte e riviste, incluse Pasticceria/Ristorazione a 320 e le due prove senza JS.

Il primo controllo a 320 ha riprodotto il testo Ristorazione debordante accanto alla spunta:
corretto solo fino a 360 px, diminuendo padding/spazio e spunta, senza ridurre font o target.
La prima prova seriale dei collegamenti cliccava prima della stabilizzazione dello scroll:
lo stato acquisito mostrava ancora Pasticceria al tentativo di aprire Panificio. Il solo script
ora attende lo scroll e verifica il bersaglio con hit testing; tutti i clic finali passano.
Nessuna modifica al prodotto per aggirare questa interferenza di automazione.

Taste finale: `after/report.json`; tutte le nove immagini elencate dall'ispettore sono state
aperte. Avvisi generali invariati: avorio del brand approvato, assenza di footage reale già
accettata, numero di misure tipografiche sul tablet. Nessuna nuova soppressione delle regole.

## ROUND 2

Seen in one second: una scelta evidente con spunta, seguita da una testata scura e un percorso leggibile.

Idea (one sentence): i collegamenti fra ricetta, costo, produzione e vendita diventano il caso scelto dal laboratorio.

Live thing: scegliere uno dei quattro mestieri cambia il percorso, anche senza JavaScript.

Layout words by section: hero=split / workflow=scelte e singolo racconto / gallery=fotografie / features=split e accordion.

Scores: design 7.5 · usability 8 · creativity 6.5 · content 8 → overall 7.5.

Caps applied: nessun cap di pagina applicato alla sola sezione; dispositivo funzionale consueto,
senza attribuirgli originalità da sito premiato. Valutazione interna, non test con utenti.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. `320-ristorazione.jpg`: spazio fra nome e spunta ristretto ma completo. La correzione mirata
   è verificata; non ridurre ulteriormente target o testo per guadagnare compattezza.
2. `390-ristorazione.jpg`: il percorso resta lungo perché contiene quattro descrizioni complete.
   La gerarchia migliora la scansione; mantenuta la sostanza richiesta, senza un altro accordion.
3. Fogli mobile/tablet: i widget fissi preesistenti possono passare davanti al testo corrente
   durante lo scroll; nessuna modifica ai widget in questo intervento circoscritto.

Nessun blocco residuo nella sezione rispetto al design approvato. Nessun nuovo asset, sample o credito.

## Limiti e stato

Solo implementazione locale: nessun commit, push o deploy, nessun invio di form, messaggio o pagamento.
Non verificati Safari, dispositivi fisici, lettore di schermo reale o runtime Cloudflare workerd.
La selezione CSS richiede `:has()`; un browser che non lo supporta conserva tutti i percorsi leggibili.
La prova senza JS copre scelta e contenuti; non attribuisce ai dettagli del catalogo il loro handler React.
Il rapporto non costituisce un nuovo audit completo o una misura di conversione.
