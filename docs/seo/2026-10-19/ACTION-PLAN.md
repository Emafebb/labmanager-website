# Piano di azione SEO — stato del 19 ottobre 2026

## Ultimo aggiornamento — sitemap riletta e quattro richieste accettate

Ricontrollo programmato confermato dal committente, senza verifica diretta della configurazione; non creare attività duplicate. Prossimo passo operativo: inviare la bozza tecnica a LegalBlink e ottenere misure indipendenti.

Su richiesta di procedere con la correzione, reinviata la sitemap: controllo finale circa 18:18, Google la riporta inviata/letta il **19 ottobre**, **Riuscita**, **7 URL rilevati**. Accettate singolarmente le richieste di indicizzazione per le quattro nuove pagine, dopo verifica preliminare Google. Controllati anche recupero HTTP, canonical e assenza di meta noindex; nessuna modifica al codice necessaria. [Rapporto aggiornato](SEARCH-CONSOLE-REVIEW.md).

Resta da verificare l'indicizzazione effettiva e la scansione successiva al rilascio: nessun nuovo invio ripetuto. PV-01 aperto; bozza LegalBlink non inviata. Nessun commit/push/deploy, modifica GTM o alle dipendenze concorrenti.

## Aggiornamento precedente — Search Console verificata e bozza LegalBlink

Accesso GSC risolto nel profilo Chrome nativo Labmanager, account `labmanager.info@gmail.com`, proprietà `sc-domain:labmanagergestionale.com`. [Rapporto](SEARCH-CONSOLE-REVIEW.md): Home, Prezzi e Ordini indicizzate con canonical coerenti; quattro nuove pagine sconosciute a Google. Test live Ricette positivo, sitemap pubblica con sette URL ma GSC ancora alla lettura del 16 ottobre con tre. Baseline canonico Web 20 settembre–17 ottobre: 7 clic, 197 impressioni, CTR 3,6%, posizione media 27,5; nessun risultato postrilascio o dato CWV sufficiente.

[Bozza LegalBlink](LEGALBLINK-SUPPORT-DRAFT.md) pronta, non inviata. Prossime azioni da valutare: reinvio sitemap e richieste mirate alle quattro nuove pagine, ricontrollo dopo scansione postrilascio, confronto query con la baseline; PV-01 resta aperto per ottimizzazione ufficiale CMP e misura indipendente. Nessun invio, richiesta di indicizzazione, commit/push/deploy o modifica applicativa/configurazione effettuati in questa verifica.

## Aggiornamento precedente — rilascio CMP

**Ultimo aggiornamento:** fix CMP pubblicato con `62038af`, pipeline `fdc1d3d7-1e8d-4c49-9864-c24d33fc0150` riuscita e versione `20f2bcc3-ace2-4adb-adcb-b43bfc6fe233` al 100%. Verificati HTTP e percorsi CMP pubblici Home/Prezzi in contesti nuovi desktop/mobile. [Esiti e limiti](CMP-RELEASE-VERIFICATION.md). Le note introduttive e di chiusura precedenti conservate sotto sono storiche; nessun nuovo miglioramento prestazionale attestato.

Aggiornamento postpubblicazione: collaudo manuale confermato dal committente senza problemi. **Licenza LegalBlink corretta dal committente e pubblicata in GTM: versione 8 verificata nel bundle pubblico**, tag 7 con la licenza reale; gli altri campi del tag sono invariati. **Caricamento diretto rimosso e verificato localmente**, mantenendo GTM: fix e documenti nel commit locale `0fa9e6e`, senza push o deploy. **Build con il lock versionato ora verificata:** Next 16.2.10/Turbopack, OpenNext completo, dry-run e smoke HTTP workerd passano; il fallimento precedente Next 16.4.2/Webpack non si riproduce. [Rapporto](LOCKED-BUILD-VERIFICATION.md) e [diagnosi CMP/console](CMP-CONSOLE-DIAGNOSIS.md) conservano prove e limiti. PV-01 e meccanismo d'inserimento GUID restano aperti. Le sezioni successive descrivono il piano e le fasi precedenti.

## Stato operativo corrente

| Voce | Stato | Passo residuo / dipendenza |
| --- | --- | --- |
| PV-02: varianti foto/logo e priorità hero | Implementato, verificato e pubblicato con `471db08` | Nessun intervento aperto su questi asset |
| SG-01: semplificazione JSON-LD | Implementato, verificato e pubblicato | Nessun intervento aperto su questo campo |
| C-02: pubblico multisettore nei riepiloghi | Implementato, verificato e pubblicato | Nessun intervento aperto su questi testi |
| Rilascio e smoke test pubblico | Completati | Prove in `output/release-2026-10-19/`; non ripetere l'audit completo automaticamente |
| Collaudo manuale | Confermato dal committente senza problemi | Nessun nuovo collaudo integrale richiesto; verificare le superfici dei futuri cambiamenti |
| Licenza CMP in GTM | Corretta e pubblicata dal committente; bundle pubblico verificato, versione 8 | Tag 7 con licenza reale e altri campi invariati. Pannello visibile nelle schermate di anteprima; controlli manuali confermati dal committente. Non ripetuta una nuova sessione browser pubblica completa in questo passaggio |
| CMP: installazione unica tramite GTM | Pubblicata con `62038af`, verificata sul dominio pubblico | Un loader e un banner a 1440/390 px; prima visita, reload, navigazione client e riapertura preferenze da clic/tastiera conclusi. Dettagli nel rapporto di rilascio; misure prestazionali ancora aperte |
| PV-01: CMP e prestazioni mobile | Aperto | Ripetere misure comparabili su Home/Prezzi dopo la correzione del duplicato. Consent Mode e TCF mantenuti nella configurazione GTM pubblicata; GVL ancora caricata. Nessun nuovo risultato prestazionale attestato |
| C-01 / SG-03: screenshot autentici | In attesa dei materiali | Food Cost, Ordini, Libro ingredienti con dati dimostrativi; integrazione responsive e allineamento del grafo |
| Verifica Google dopo il rilascio | Sitemap riletta con sette URL; quattro richieste di indicizzazione accettate | Inviata/letta il 19 ottobre, Riuscita; conferme di coda prioritaria per tutte le nuove pagine. Verificare indicizzazione effettiva e scansioni postrilascio, senza reiterare gli invii. Baseline query precedente al rilascio; CWV insufficienti. [Rapporto](SEARCH-CONSOLE-REVIEW.md) |
| Richieste GUID e console | Provenienza del codice attribuita a componenti locali Kaspersky; diagnosi runtime parziale | 351/351 righe selezionate dello script identiche nelle due librerie locali; non tracciato il processo d'inserimento né spiegati i 404. Nessuna protezione modificata; dettagli e limiti nella diagnosi |
| C-03, breadcrumb e pulizia sitemap facoltativa | Backlog | C-03 solo dopo dati sulle query; altre voci a bassa priorità |

La correzione circoscritta della licenza GTM è pubblicata; il precedente accesso all'account Laura era già autorizzato. Il committente ha poi richiesto la rimozione del doppio caricamento e ora il commit locale di fix e documentazione, indicando push e tentativo deploy come passo successivo. Questa chiusura si ferma al commit; nuovi cambiamenti a TCF o ai tag rimangono fuori ambito. Le modifiche alle dipendenze sono lavoro concorrente, preservato ed escluso dal commit.

Nella prima ripresa del 19 ottobre il bundle GTM era ancora alla versione 7 con `license-id` e la sessione Laura non mostrava contenitori. Il blocco è stato poi superato dal committente, che ha operato in GTM e confermato la procedura; il controllo pubblico successivo attesta la versione 8 con licenza corretta. PV-01 e screenshot autentici restano aperti; non ripetuti audit completo, misure mobile o collaudo integrale. Nessuna pubblicazione del sito eseguita.

Per il contesto di ripresa: [handoff](../../HANDOFF_2026-10-19.md). Le istruzioni e gli stati qui sotto conservano il piano originario e le fasi prepubblicazione.

## Riferimento storico: piano iniziale e criteri di accettazione

Base: [audit completo](FULL-AUDIT-REPORT.md), commit `3b9bb7c6b86f67500d2e1f0293b03060d13ca3ec`. Questo è un piano proposto: **nessuna modifica al prodotto, commit, push o deploy eseguito per l'audit**. Il collaudo manuale resta aperto.

## 1. Prima priorità: verificare e ridurre il ritardo mobile

**PV-01, approfondimento alto.** Target `/pricing` e Home. Riprodurre su workerd con configurazione di build pertinente al rilascio, mantenendo banner e widget. Misurare visite nuove e preferenze già espresse usando i controlli reali; conservare le due serie separatamente. I tre campioni Prezzi mobile identificano il paragrafo CMP come LCP e danno circa 7,8 s; la prova artificiale senza CMP non è una soluzione.

Per l'intervento presentare prima il diff/approccio circoscritto: percorso di caricamento, configurazione e rendering CMP se gestibile localmente; contenuto prioritario e asset della Home. Cambiamenti al servizio di consenso richiedono autorizzazione specifica. Non eliminare script/consensi, ritardare gli adempimenti o falsare le misure per ottenere un voto.

**Accettazione:** almeno tre misure comparabili prima/dopo sulle stesse due route, elenco di risorse e nodo LCP, nessuna regressione di consenso, layout, CLS, tastiera e CTA. Riduzione ripetibile rispetto alla baseline; obiettivo diagnostico LCP ≤2,5 s nelle prove concordate, senza chiamarlo superamento CWV reale.

## 2. Correzioni locali circoscritte proposte

| Intervento | File/superfici da raggiungere | Verifica prevista |
| --- | --- | --- |
| PV-02: varianti statiche delle foto e logo più adatto alla dimensione, hint hero verificabili | `public/images`, Hero, WorkflowExplorer/galleria, WorkAreaPage, Ordini e BrandLogo solo dove necessario; eventuali contratti di asset | Stesso Traccia; srcset/sizes effettivi e download corretti a 390/1440, zero immagini rotte; ripetere Lighthouse delle route interessate |
| SG-01: togliere campo software ridondante | `src/app/layout.tsx`, aspettative `metadata-contracts.test.ts` e altri contratti che lo referenziano | JSON-LD servito e DOM coerenti, controllo vocabolario, test mirati schema/metadata; build senza errori |
| C-02: completare esempi del pubblico nei riepiloghi | Dati condivisi FAQ home/JSON-LD, `public/llms.txt` se approvato | Stessi testi nelle FAQ e nel markup; laboratori alimentari come target generale, ristorazione/consulenti come esempi pertinenti |

Non abilitare l'ottimizzazione remota Cloudflare Images, cambiare prezzi/condizioni, riscrivere H1 editoriali o aggiungere nuove pagine per questo audit. Non è necessario adottare nuove dipendenze.

## 3. Dimostrazione autentica del prodotto

**C-01 / SG-03.** Integrare, quando forniti e approvati, gli screenshot Food Cost, Ordini e Libro ingredienti con dati dimostrativi. Collocarli nei punti già concordati e aggiornare le schermate opzionali nel grafo software; rimuovere quelle storiche se non più appropriate. Conservare la distinzione fra foto editoriali AI, mockup illustrativi e schermate autentiche.

**Accettazione:** dati non personali, funzione riconoscibile e coerente con la pagina/piano, didascalia e alt pertinenti, layout responsive; immagine disponibile nel candidato e nessuna regressione di caricamento. Nessun testimonial o risultato commerciale inventato. Il beneficio di conversione rimane da misurare.

## 4. Gate prima del rilascio

1. Raccogliere l'esito del collaudo manuale del committente e risolvere i difetti accettati.
2. Registrare commit e diff finali: un intervento successivo può rendere parzialmente storico questo audit. Ripetere i controlli toccati, i test richiesti, lint, build e contratti commerciali pertinenti.
3. Eseguire build OpenNext e preview **workerd locale**, matrice status/metadata/sitemap/ritiri, check responsive e consensi; dry-run secondo [runbook](../../CLOUDFLARE_RUNBOOK.md). Non attribuire al Node start la copertura del wrapper HTTPS del Worker.
4. Presentare risultati, rischi residui e candidato concreto per la decisione di pubblicazione. Push su `master` può attivare Workers Builds: richiede autorizzazione esplicita come il deploy.

Non risultano blocchi locali di indicizzabilità, ma questo non chiude i gate sopra e non equivale ad accettazione dell'intero sito.

## 5. Dopo un deploy esplicitamente autorizzato

Registrare deployment/versione/commit e orario, poi verificare i sette URL pubblici, esclusioni, 404, metadata e schema realmente serviti, asset e social. Controllare HTTP→HTTPS, www e dominio storico preservando percorsi/query dove appropriato, header/cache/WAF e accesso bot. Nessun invio form reale senza autorizzazione specifica.

Con gli accessi del proprietario, leggere Search Console per sitemap, copertura, canonical scelti e query; osservare prestazioni sul campo quando esiste un campione della nuova versione, mantenendo distinta la finestra precedente al deploy. CrUX richiede una pagina pubblica e un campione sufficiente; non certifica istantaneamente la candidata appena pubblicata: verificare il periodo effettivamente incluso nella fonte usata ([metodologia ufficiale](https://developer.chrome.com/docs/crux/methodology)). INP richiede una fonte appropriata, non si deriva dal TBT. Non usare Indexing API per questo sito SaaS né avviare richieste di indicizzazione da questa consegna.

**C-03**, solo dopo dati sufficienti: valutare l'intento delle query sugli strumenti prima di proporre calcolatori pubblici o nuove route. BreadcrumbList e pulizia sitemap restano backlog facoltativo basso.

## Esecuzione successiva autorizzata — 19 ottobre 2026

Il committente ha chiesto di ripartire da questo piano. [Resoconto di esecuzione](FOLLOW-UP-REPORT.md): PV-02, SG-01 e C-02 implementati e verificati localmente; PV-01 riprodotto su workerd e ancora aperto per il caricamento CMP alla prima visita. Candidata finale sulla porta 8788, distinta dalla precedente anteprima e dal dominio pubblico. Test, build OpenNext, browser e dry-run completati; collaudo manuale e screenshot autentici ancora attesi. Nessun commit, push, deploy o cambiamento dei servizi esterni. Le sezioni precedenti descrivono la proposta originaria e i gate che restano applicabili.
