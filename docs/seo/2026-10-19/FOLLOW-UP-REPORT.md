# Esecuzione locale del piano SEO — 19 ottobre 2026

**Implementati PV-02, SG-01 e C-02; PV-01 approfondito ma ancora aperto sul CMP.** Nessun commit, push, deploy o intervento sui servizi esterni. Il collaudo manuale del committente resta aperto. Questo aggiornamento prosegue il [piano approvato](ACTION-PLAN.md), senza ripetere l’audit o attribuire al dominio pubblico le prove locali.

## Candidata e provenienza

Base Git ricontrollata: `master`, `3c4b573b3941c76b240a8d89b843944d16e2c604` (`docs(seo): record prepublication audit`); contiene lo stesso prodotto del precedente `3b9bb7c`, più l’audit. Le modifiche di questa esecuzione sono nel working tree, non committate.

| Target | Directory isolata | Origine | BUILD_ID |
| --- | --- | --- | --- |
| Baseline OpenNext | `/tmp/lm-seo-followup-20261019-base` | `http://127.0.0.1:8787` | `zIcnfXl2og2I50YfayljU` |
| Candidata finale OpenNext | `/tmp/lm-seo-followup-20261019-candidate` | `http://127.0.0.1:8788` | `rmNB8dIy3FZe65-cws2Pu` |

Entrambe eseguono **workerd locale**, con il wrapper `worker.ts` e il solo binding locale `ASSETS`. Nessuna copia di `.env`/`.dev.vars`; beacon Analytics opzionale assente. CMP, GTM e TabNav restano attivi. Le anteprime preesistenti 3038/3049 non sono state fermate o ricostruite.

Prove ignorate da Git: `output/seo-followup-2026-10-19/`. `source-manifest.json` confronta SHA-256 di **146 input** fra checkout e candidata finale: nessuna differenza. Include identità delle build, configurazione e stato non committato. I processi e i file in `/tmp` sono transitori, da ricontrollare prima del riuso.

Al termine la baseline 8787 è stata arrestata; la candidata 8788 è lasciata disponibile per il collaudo. Durante la chiusura è comparsa una modifica concomitante a `.gitignore` che esclude `/public/images/`: è stata preservata, senza staging. Le nove nuove immagini sono quindi **presenti e verificate localmente ma ignorate da Git**. Un futuro commit del codice dovrà includerle esplicitamente, insieme a `EditorialImage.tsx`, per evitare asset mancanti nel clone/build remoto. Elenco esatto in `variants.json` e nella sezione asset sopra; nessun commit parziale del codice è stato creato.

## Modifiche applicate

- **PV-02:** otto varianti WebP degli asset editoriali attuali, larghezze 400/800 px, senza ritaglio; originali conservati come variante maggiore. `EditorialImage` condivide `srcset`, dimensioni intrinseche, `sizes`, caricamento lazy per la galleria ed eager/high per le immagini principali. Raggiunge Hero, galleria, quattro pagine tramite WorkAreaPage e Ordini. React emette il preload responsive della hero con priorità alta. Logo header in WebP lossless ridimensionato a 80 px; originale conservato per gli altri usi.
- **SG-01:** rimosso soltanto `SoftwareApplication.additionalProperty` e i relativi import inutilizzati. Restano descrizione, `featureList`, entità e collegamenti del grafo. Aggiornati i contratti metadata e Magazzino; i controlli della matrice, di `llms.txt` e del manifesto commerciale restano. È una semplificazione dell’applicabilità semantica documentata da [Schema.org](https://schema.org/additionalProperty), non la correzione di JSON malformato o un beneficio di ranking dimostrato.
- **C-02:** ristorazione e consulenti esplicitati nella FAQ del pubblico e in `llms.txt`, coerentemente con le pagine già approvate. FAQ visibile e JSON-LD usano la stessa fonte. Nessun cambiamento a prezzi, condizioni, H1 o inventario delle route.
- **Verifica:** aggiunte alle esclusioni ESLint le cartelle `output/` e `worktrees/`: il comando globale includeva artefatti QA e checkout duplicati. Non sono state cambiate le regole applicate al prodotto.

`images.unoptimized` resta attivo; nessuna nuova dipendenza, configurazione Cloudflare Images, modifica CMP o nuova immagine AI. Il generatore locale `generate-variants.cjs` usa sharp già installato e verifica dimensioni, rapporto, alpha del logo e riduzione dei byte; dati in `variants.json`.

### Peso e selezione delle immagini

Somma dei corpi dei cinque file selezionati nella Home dopo scorrimento completo, non trasferimento di una visita con cache calda:

| Viewport / densità | Prima | Dopo | Riduzione |
| --- | ---: | ---: | ---: |
| 1440 px / DPR 1 | 786.399 B | 290.722 B | 63,0% |
| 390 px / DPR 1 | 786.399 B | 111.728 B | 85,8% |
| Lighthouse mobile / DPR 1,75 | 786.399 B | 223.266 B | 71,6% |

A 390/DPR 1 sono scaricate le varianti 400; a 1440/DPR 1 le 800. A 390/DPR 2 la hero usa la 800. Nessun originale editoriale richiesto nelle tre viewport DPR 1, nessun doppio download rilevato nelle 21 configurazioni browser. Hero 400: 34.470 B contro 152.892 B; logo: 11.802 B contro 82.037 B. La fotografia mantiene soggetto e resa; immagini, proporzioni e ritagli sono stati confrontati visivamente con la baseline.

I metadati dei file confermano hero 1086×1448 e le altre tre foto 1536×1024: questi sono i valori intrinseci usati per le varianti, anche dove la precedente tabella dell’audit riportava dimensioni differenti.

## PV-01 — risultati prestazionali e limite aperto

Chrome headless 155, Lighthouse 13.4.0, Node 26.5.0; impostazioni mobile identiche fra serie: 412×823, DPR 1,75, simulazione RTT 150 ms, throughput 1638,4 Kbps, CPU ×4. Un browser nuovo per campione. Per il ritorno: preparazione a 1440 px, click reale su **Chiudi**, attesa della chiusura, poi misura mobile con preferenza e cache conservate (`disableStorageReset: true` anche nei profili nuovi). Il ritorno non isola quindi il solo consenso dalla cache.

Tre campioni per ciascuna cella; mediane e intervalli LCP di laboratorio:

| Percorso / visita | Baseline workerd | Candidata finale workerd |
| --- | --- | --- |
| Home, nuova | **3,17 s** (3,03–3,47) | **2,72 s** (2,57–2,88) |
| Home, ritorno | 1,06 s (0,99–1,06) | 0,99 s (0,99–0,99) |
| Prezzi, nuova | **7,26 s** (6,97–7,60) | **7,42 s** (6,65–7,67) |
| Prezzi, ritorno | 0,91 s (0,91–0,91) | 0,91 s (0,75–0,91) |

CLS finale massimo Home 0,00190, Prezzi 0,00067. Nessun errore runtime o warning Lighthouse nei dodici campioni finali. Performance Home nuova 95–97; i punteggi non sono un voto SEO globale. Nessun INP o dato CWV sul campo.

**Variabilità conservata nelle conclusioni:** una candidata intermedia, prima della sola esplicitazione dell’alt e dei commenti, aveva Home 2,72/4,07/6,36 s. Il ricontrollo alternato baseline/candidata ha dato rispettivamente 4,30/3,63, 3,93/2,72 e 3,03/3,18 s. Tutti i JSON restano nelle cartelle `after/` e `paired-*`; non sono stati scartati per sostenere un miglioramento certo. La serie finale ha una mediana inferiore di circa il 14%, ma l’effetto sul LCP non è stabile in tutte le serie. La riduzione dei byte e la correzione della priorità sono invece direttamente verificate. L’obiettivo diagnostico ≤2,5 s non è raggiunto in modo ripetibile.

Su Prezzi il nodo LCP della prima visita è sempre il paragrafo del banner CMP; al ritorno è il contenuto della pagina. La rete osservata mostra loader → banner → configurazione/testi → lista partner. Un campione baseline trasferisce circa 244 kB per il bundle banner (751 kB decodificati) e 143 kB per la lista partner (1,10 MB decodificati). Questi valori variano con il servizio e non sono una misura della configurazione futura di produzione.

**Esito PV-01:** riproduzione su workerd completata, rischio CMP confermato; nessuna correzione del servizio applicata. Il confronto ritorno/prima visita, insieme al precedente esperimento diagnostico separato dell’audit, sostiene il coinvolgimento della catena CMP ma non attribuisce ogni millisecondo al solo banner. Passo concreto da valutare con il responsabile del servizio: chiedere al fornitore riduzione del bundle iniziale e delle dipendenze seriali, preservando il comportamento del consenso. Qualsiasi modifica al servizio o alla sua configurazione richiede una decisione specifica. Non sono stati bloccati script o nascosti consensi per le misure di accettazione. Riferimento tecnico: [ottimizzazione LCP](https://web.dev/articles/optimize-lcp).

## Verifica finale

- `npm test`: **134/134 Vitest e 3/3 controlli Node commerciali**, inclusi i contratti aggiornati. Le aspettative immagini e metadata sono state osservate fallire prima del relativo fix.
- `npm run lint`: **0 errori**, un warning preesistente su import inutilizzato in `.taste-skill/verification/all-pages-browser.mjs`; nessun warning nei sorgenti modificati. Taste lint: 0 FAIL/0 WARN.
- `npm run preview -- --port 8788`: build Next con TypeScript, adattamento OpenNext e avvio workerd completati. Dry-run finale: 6030,45 KiB, gzip 1272,07 KiB; nessun upload.
- Matrice HTTP: 18 risposte, sette URL sitemap canonici, esclusioni e 404 coerenti, **495 collegamenti senza destinazioni/ancore mancanti**. GET con hostname canonico instradato forzatamente alla porta locale: wrapper 308 verso HTTPS, percorso e query conservati; non è una prova del DNS/TLS pubblico.
- JSON-LD: 14 route senza rilievi nei controlli locali di vocabolario/domini/sintassi/URL; 21 confronti HTML/DOM identici sulle sette pagine nelle tre viewport. Nessun invio a validatori esterni.
- Browser: **21 configurazioni** a 1440/768/390, nessun overflow, immagine rotta o errore JavaScript rilevato; selezione degli asset, CTA, menu/Esc/focus, primo Tab sul salto al contenuto e riapertura/chiusura preferenze cookie verificati. Schermate e fogli di contatto esaminati, incluso confronto della hero con la baseline. Invio form saltato — non autorizzato.
- Taste inspector Home: primo run non presidiato **1 FAIL/3 WARN**, con popup newsletter lasciato aperto sopra i contenuti; non è stato presentato come pass. Ripetizione controllata, tramite una copia locale dello stesso inspector che clicca i pulsanti reali «Chiudi»/«Chiudi newsletter», senza cambiare scoring, CSS o preferenze a mano: **0 FAIL/2 WARN**. Restano assenza di video e varietà dimensionale tablet, già motivate per Traccia. Banner di prima visita verificato separatamente; scorrimento, reduced motion e schermate dell’inspector conservati. Resa visiva coerente con la baseline; gli screenshot autentici del prodotto restano necessari e i comandi fissi conservano il comportamento approvato.

## Restano aperti

1. PV-01: prestazioni CMP alla prima visita; nessuna promessa di rientro sotto 2,5 s o di superamento CWV reale.
2. C-01/SG-03: screenshot autentici Food Cost, Ordini e Libro ingredienti ancora da fornire; gli screenshot storici opzionali nel grafo non sono stati sostituiti con fotografie editoriali.
3. Collaudo manuale del committente, Safari/dispositivi fisici, invii reali, pagamenti, prova dei servizi con configurazione di produzione, approvazione del candidato e futura pubblicazione.
4. Dopo un rilascio autorizzato: verifiche pubbliche di DNS/TLS, redirect alternativi, cache/WAF, bot, indicizzazione e dati di campo. Nessuna di queste è attestata dalla preview locale.

L’esito è **implementato e verificato localmente**, non committato, pubblicato o accettato manualmente. La build proposta per il collaudo è la candidata sulla porta **8788**, non la vecchia anteprima 3038 né il dominio pubblico.

## Autorizzazione al rilascio — aggiornamento successivo

Il 19 ottobre il committente ha richiesto esplicitamente «fai committ di tutto e andiamo live», seguito da un handoff per continuare in una chat pulita. Sono quindi autorizzati commit, push e pubblicazione di questa candidata; il risultato della pubblicazione va verificato separatamente. L’autorizzazione non costituisce un esito di collaudo manuale e non chiude PV-01 o la richiesta degli screenshot autentici.

Prima del commit ricontrollati gli input della candidata (146 corrispondenze), 134 test Vitest e 3 controlli commerciali passati, lint senza errori con il solo warning preesistente. La modifica concomitante che ignorava le immagini non è più presente: le nove varianti sono normalmente includibili in Git e fanno parte del rilascio richiesto. Nessuna modifica locale a quella regola è stata necessaria.

Verificato sul servizio Cloudflare il trigger di produzione esistente: repository `Emafebb/labmanager-website`, branch `master`, build `npx opennextjs-cloudflare build`, deploy `npx opennextjs-cloudflare deploy`, Worker `labmanager-website`. Per il rilascio si usa questa pipeline, senza cambiare configurazioni o avviare un secondo deploy parallelo. Le dichiarazioni di mancata pubblicazione nelle sezioni precedenti descrivono la fase locale; l’handoff finale deve riportare commit, build/deployment e prove live effettivamente osservati.
