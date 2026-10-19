# Piano di azione SEO — candidata del 19 ottobre 2026

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
