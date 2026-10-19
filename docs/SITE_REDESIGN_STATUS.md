# Stato del sito LabManager — 19 ottobre 2026

## Stato corrente dopo il rilascio e il collaudo

**Sito pubblicato:** commit `471db081f694cd179c401907b38427b3a59901ab`, BUILD_ID pubblico `G8WscefcZhsVAJ3IWQo9N`. Il committente ha confermato **«Collaudo completato senza problemi»**. Le sezioni successive conservano le fasi storiche prepubblicazione.

**Licenza CMP pubblicata:** il committente ha corretto il tag LegalBlink 7 in `GTM-TCZR8HQP`. Bundle pubblico verificato alla versione 8, licenza `69e89f282420950024cb1a5e`; unico campo cambiato nel tag. Il precedente blocco di accesso è superato per questa correzione.

**Fix del doppio caricamento:** rimosso il caricamento LegalBlink diretto dal sito, mantenendo GTM come unica installazione. Su Home/Prezzi locali: un loader/un banner, API CMP 200 su reload e preferenze riapribili dopo navigazione client e da tastiera. Passano 133 test Vitest, 3 controlli commerciali, lint mirato e TypeScript del checkout. Questo aggiornamento documentale accompagna il commit locale richiesto del fix; **nessun push o deploy eseguito**, quindi il sito pubblico mantiene ancora il duplicato. Dettagli nella [diagnosi CMP](seo/2026-10-19/CMP-CONSOLE-DIAGNOSIS.md).

**Build con lock committato verificata:** per `0fa9e6e`, nuova esportazione isolata e `npm ci` con Next **16.2.10**, OpenNext **1.20.1**, Wrangler **4.110.0**. Passano 133 test + 3 controlli commerciali, lint, build Next/Turbopack, build OpenNext completa e dry-run (gzip 1272,06 KiB). Preview workerd: sette pagine canoniche 200, sitemap, 404 e redirect HTTPS coerenti. Il precedente fallimento Next 16.4.2/Webpack non si riproduce nel contesto versionato. [Rapporto e limiti](seo/2026-10-19/LOCKED-BUILD-VERIFICATION.md). Documentazione raccolta nel successivo commit richiesto; nessun push o deploy.

**Residui:** prestazioni mobile non rimisurate; screenshot autentici ancora attesi; Search Console nell'account corrente senza proprietà disponibili. Codice GUID attribuito ai componenti locali Kaspersky per corrispondenza testuale di 351/351 righe selezionate; processo d'inserimento e 404 non spiegati. Nessuna protezione modificata. [Piano aggiornato](seo/2026-10-19/ACTION-PLAN.md) e [handoff](HANDOFF_2026-10-19.md) riportano i prossimi passi.

Evidenze del rilascio conservate in `output/release-2026-10-19/SUMMARY.json`: build `c4cfb9a2-f495-4f37-8f95-a2342d1cc533` riuscita, deployment `5c42c490-d61c-4cf5-889d-e1e86168ceba`, versione `20cbc833-af6a-4977-b909-48b6308a2906` al 100%, pubblicata il 19 ottobre alle 13:31:31 Europe/Rome. Controlli pubblici: sette pagine canoniche, 495 collegamenti senza destinazioni mancanti, immagini e redirect verificati; restano i limiti CMP/console descritti nella diagnosi. Sono prove del rilascio, non una nuova interrogazione dei servizi a ogni lettura del documento. Il campo `manualAcceptance: false` nel JSON è storico: la conferma manuale è arrivata dopo.

Il commit richiesto comprende fix CMP, test, istruzioni del progetto e aggiornamenti documentali; l'hash si ricava dalla cronologia Git. Le modifiche concorrenti a `package.json` e `package-lock.json` sono preservate ed escluse: nessuna validazione complessiva dell'upgrade delle dipendenze è attestata da questa attività. Push e tentativo di deploy sono il passo successivo indicato dal committente, non eseguito in questa chiusura.

## Chiusura locale precedente alla pubblicazione

Il rifacimento del sito e i fix richiesti sono implementati nel checkout locale. Il committente eseguirà il collaudo manuale dell’intero sito: **accettazione manuale ancora da raccogliere**. Questa chiusura comprende documentazione e commit locale; non autorizza push, deploy o operazioni sui servizi esterni.

## Decisioni correnti

- Identità Traccia: [DESIGN.md](../DESIGN.md), [brandkit originale](../design/brandkit/preview.html) e [token](../design/brandkit/brand.css). Bosco/avorio/salvia/ambra/bianco, Manrope e Fraunces locali, logo e geometria originali conservati.
- Pubblico: laboratori artigianali alimentari. La home propone Pasticceria, Panificio, Gelateria e Ristorazione; quest’ultima comprende Food Cost, menu e uso da parte dei consulenti. Il contenuto collegato in Ricette e Food Cost esplicita l’analisi per i clienti.
- Cinque aree autonome, definite in [work-areas.ts](../src/data/work-areas.ts): `/ricette-food-cost`, `/produzione-magazzino`, `/ordini`, `/etichette-libro-ingredienti`, `/strumenti`. Home e Prezzi completano le sette pagine della sitemap.
- Header sempre visibile, fotografie della galleria e piani home allineati, titoli Etichette accorciati, strumenti in dettagli HTML nativi e confronto prezzi con composizione mobile dedicata. Conservata l’ancora storica `/ordini#flusso-ordine`.
- Home: equivalente mensile dell’abbonamento annuale, Light €16,67/mese e Plus €40/mese; pagamento annuale e totali €200/€480 dichiarati sotto i prezzi. Manifesto commerciale e condizioni effettive invariati; la pagina Prezzi conserva il confronto mensile/annuale.
- Contatti, newsletter, popup e widget mantengono i contratti esistenti. WhatsApp condiviso fra le pagine previste, con nome accessibile completo e comportamento di visibilità già documentato in DESIGN.md. Nessun invio reale svolto durante QA.
- `/download` e `/aggiornamenti` ritirate: usare la 404 Traccia. La decisione non disattiva il servizio Cloudflare separato; riferimento [RETIRED_PAGES.md](RETIRED_PAGES.md).
- Immagini editoriali AI dichiarate; non sono schermate del software o testimonianze. Restano da ricevere gli screenshot autentici Food Cost, Ordini e Libro ingredienti con dati dimostrativi.

## Evidenze da consultare

| Ambito | Riferimento durevole |
| --- | --- |
| Brief e decisioni successive | [.taste-skill/brief.md](../.taste-skill/brief.md) |
| Cinque aree, fonti e limiti delle affermazioni | [pagine-aree-di-lavoro.md](../.taste-skill/pagine-aree-di-lavoro.md), [feature-evidence.md](../.taste-skill/feature-evidence.md) |
| Asset e provenienza | [asset-report.md](../.taste-skill/asset-report.md) |
| Analisi visiva iniziale | [review.md](../.taste-skill/visual-audit-2026-10-19/review.md) |
| Fix responsive e loro verifica | [visual-fixes/verification.md](../.taste-skill/visual-fixes/verification.md) |
| Consulenti e prezzi annuali in home | [consulenti-prezzi/verifica.md](../.taste-skill/consulenti-prezzi/verifica.md) |
| Header persistente | [header-review/verification.md](../.taste-skill/header-review/verification.md) |
| Pubblicazione e runtime Workers | [CLOUDFLARE_RUNBOOK.md](CLOUDFLARE_RUNBOOK.md) |

Brief e report testuali sono versionati. Screenshot, acquisizioni browser, dati QA e output generati restano locali in `.taste-skill/` e `output/`; un clone nuovo deve rigenerarli. Le indicazioni «nessun commit» nei report precedenti descrivono la rispettiva fase storica.

Ultima verifica del codice: **134 test Vitest + 3 controlli Node commerciali**, ESLint sui sorgenti coinvolti, TypeScript e build Next completati. Il lavoro responsive è stato verificato in Chrome su sette pagine a 1822/1440/768/390/320; dopo l’ultima modifica testuale e dei prezzi, ricontrollate le superfici interessate a 1440/768/390/320. Home Taste: 0 FAIL / 2 WARN; i limiti delle altre pagine sono nei rispettivi report.

Queste prove non attestano Safari, dispositivi fisici, invii reali, pagamenti, runtime workerd di questa versione, Core Web Vitals sul campo, indicizzazione o accettazione del sito pubblicato. L’anteprima Node osservata è sulla porta 3038; verificarne disponibilità e build prima di riutilizzarla.

## Prossima verifica SEO

Obiettivo: verificare la nuova versione prima della pubblicazione e distinguere i risultati da quelli del dominio live, che può servire ancora il sito precedente. Iniziare in sola lettura: una proposta di ottimizzazione non autorizza a riscrivere il sito o pubblicarlo.

Skill di ingresso: `seo-audit`; `seo-technical` per controlli mirati sulla build locale. Approfondimenti disponibili: `seo-content`, `seo-schema`, `seo-performance` e, se gli accessi esistono, `seo-google`. Rileggere le rispettive SKILL.md nella sessione che eseguirà l’analisi. Per i requisiti correnti dei motori usare fonti ufficiali aggiornate.

Controllare le sette pagine indicizzabili, le esclusioni intenzionali delle pagine di servizio, i due URL ritirati, HTML iniziale/renderizzato, title/description/H1, canonical, robots, sitemap, collegamenti e ancore, JSON-LD e coerenza delle offerte. Fonti di partenza: `src/app/layout.tsx`, metadata delle route, `src/app/sitemap.ts`, `public/robots.txt`, `public/llms.txt`, [manifesto commerciale](../config/commerciale/manifesto-commerciale.v1.json) e test dei contratti SEO in `src/app/`.

Il dominio canonico è `https://labmanagergestionale.com`; quello storico non deve diventare un secondo sito indicizzabile. Valutare intento e differenziazione delle cinque aree senza restringere tutto alle sole pasticcerie. Verificare il comportamento dei contenuti nei dettagli HTML. Separare validità schema da idoneità ai rich result, misure di laboratorio da dati CrUX e controlli locali da indicizzazione reale.

Consegnare rilievi riproducibili con URL, evidenza, priorità e intervento proposto. Non inventare ranking, volumi, traffico, CWV o accessi Search Console. Non usare il punteggio SEO o Taste come prova di rilascio.

## Audit SEO prepubblicazione — 19 ottobre 2026

Completato l'[audit in sola lettura del prodotto](seo/2026-10-19/FULL-AUDIT-REPORT.md), con [piano di azione proposto](seo/2026-10-19/ACTION-PLAN.md). Target: build isolata dal commit `3b9bb7c6b86f67500d2e1f0293b03060d13ca3ec`, BUILD_ID `X48ne7fzxtjRhr0basNNh`, anteprima Node `http://127.0.0.1:3049`; 296 file tracciati confrontati con Git senza differenze. La precedente anteprima 3038 non è stata modificata.

Sette pagine commerciali, esclusioni, ritiri, sitemap, metadata, link/ancore, HTML/DOM, contenuti e JSON-LD verificati. Nessun blocco locale di crawl/indicizzabilità trovato. Rischio da approfondire: LCP mobile simulato Prezzi circa 7,8 s con il banner CMP come elemento misurato; Home mediana 3,64 s su tre campioni variabili. Opportunità di varianti statiche delle immagini e screenshot autentici; discrepanza semantica a bassa priorità di `SoftwareApplication.additionalProperty`. Nessuna correzione al prodotto applicata.

Build Next e TypeScript eseguiti nuovamente per la candidata; i 134 test Vitest e 3 controlli Node sopra restano prove della chiusura precedente, non rieseguite per il solo audit. Screenshot/JSON/script correnti sono locali e ignorati in `output/seo-audit-2026-10-19/`. Non verificati workerd, live, ranking, indicizzazione, INP/CWV reali o cache social. Nessuna credenziale Google configurata rilevata dalle skill. Collaudo manuale ancora aperto; nessun commit, push, deploy, invio moduli o richiesta di indicizzazione eseguito in questa verifica.

## Esecuzione del piano SEO — 19 ottobre 2026

Su richiesta del committente, implementati PV-02 (varianti statiche delle foto e logo, priorità hero), SG-01 (semplificazione JSON-LD) e C-02 (ristorazione/consulenti nei riepiloghi). [Esiti, provenienza e limiti](seo/2026-10-19/FOLLOW-UP-REPORT.md). Base `3c4b573`, modifiche locali non committate; candidata finale workerd `http://127.0.0.1:8788`, BUILD_ID `rmNB8dIy3FZe65-cws2Pu`. Verificati 146 input contro la candidata; 134 test Vitest + 3 controlli commerciali, lint senza errori con un warning preesistente, build OpenNext, dry-run, matrice HTTP e 21 configurazioni browser. Taste Home dopo chiusura dei dialoghi con i comandi reali: 0 FAIL/2 WARN.

PV-01 resta aperto sul CMP: Prezzi prima visita LCP lab mediano 7,42 s, ritorno 0,91 s; nessuna modifica al consenso. Home finale 2,72 s contro baseline workerd 3,17 s, con variabilità esplicitata nel report. Il peso dei file immagine selezionati cala del 71,6% nel profilo mobile Lighthouse. Nessun risultato di campo o del dominio live. Collaudo manuale e screenshot autentici ancora attesi; nessun commit, push o deploy eseguito per questo intervento. Usare la porta 8788 per il candidato proposto, ricontrollandone disponibilità e build.

## Rilascio richiesto — aggiornamento successivo del 19 ottobre 2026

Il committente ha autorizzato esplicitamente commit di tutto il lavoro e pubblicazione. Il rilascio usa il trigger Workers Builds di produzione già verificato per `master` e il solo Worker `labmanager-website`. Le nove varianti immagine sono incluse: la regola concomitante che le ignorava non è più presente. Test e lint nuovamente verificati prima del commit; gli input del prodotto coincidono con la candidata workerd già collaudata automaticamente. Esiti di commit, pipeline e smoke test pubblici saranno registrati nell’handoff finale richiesto; questa autorizzazione non sostituisce il collaudo manuale né chiude il rischio CMP e gli screenshot ancora attesi.
