# Schema e accessibilità AI — verifica SEO prepubblicazione

Data: 19 ottobre 2026. Target: build Next.js Node isolata di `3b9bb7c6b86f67500d2e1f0293b03060d13ca3ec`, servita da `http://127.0.0.1:3049`. Gli URL canonici citati sotto identificano le pagine candidate; non sono prove raccolte sul dominio pubblico. Verifica in sola lettura del prodotto; nessun push, deploy, invio moduli, richiesta di indicizzazione o modifica dei servizi esterni.

## Metodo e prove riproducibili

Letti AGENTS.md, CLAUDE.md, `docs/SITE_REDESIGN_STATUS.md`, skill `seo-schema` e `seo-geo`, codice dei blocchi JSON-LD, manifesto commerciale e file pubblici. La cache SEO di luglio 2026 è storica: non è stata usata come prova della build attuale. Le prescrizioni non dimostrate delle skill GEO (punteggi arbitrari, numero ideale di parole, benefici garantiti del file llms.txt) non diventano requisiti del sito.

Prove locali ignorate da Git in `output/seo-audit-2026-10-19/schema-geo/`:

- `collect.py`: acquisisce tramite soli GET le 14 route sotto, salva HTML, testo, JSON-LD, hash SHA-256, status e header. Il comando riproducibile, con anteprima già avviata, è `python3 output/seo-audit-2026-10-19/schema-geo/collect.py http://127.0.0.1:3049`.
- `summary.json`: esiti sintassi JSON, proprietà/tipi noti, domini delle proprietà con ereditarietà, URL assoluti, Microdata/RDFa e robots meta. Il controllo locale ha tre assert di autocontrollo; non sostituisce il Rich Results Test o il validatore Schema.org.
- `schemaorg-current-https.jsonld`: vocabolario pubblico scaricato da [Schema.org](https://schema.org/version/latest/schemaorg-current-https.jsonld) il giorno dell'audit; usato per verificare tipi/proprietà e domini ammessi.
- `*.html`, `*.jsonld.json`, `*.text.txt`, `robots.txt`, `llms.txt`: risposte osservate della build; i JSON si possono ispezionare indipendentemente dal sorgente TSX.

Confrontato inoltre `../browser/dom.json` nelle prove locali condivise: sulle sette pagine indicizzabili a 1440 e 390 px i 14 array JSON-LD dopo idratazione sono identici a quelli dell'HTML acquisito; i quattro contatori itemscope/itemprop/typeof/vocab restano a zero. Il confronto è salvato in `dom-comparison.json`. Le sette prove senza JS sono documentate nel rapporto browser condiviso. Non sono stati inviati i contenuti della build a validatori esterni.

## Rilevazione

Tutte le route contengono già nell'HTML iniziale il grafo condiviso `WebSite`, `Organization`, `SoftwareApplication`. Nessun Microdata (`itemscope`, `itemprop`, `itemtype`) né RDFa dichiarato con `typeof`/`vocab` è stato trovato. I meta Open Graph `property` non sono scambiati per RDFa.

| Route candidata | HTTP locale | Schema aggiuntivo al grafo comune | Robots osservato |
| --- | --- | --- | --- |
| `/` | 200 | `FAQPage` con 6 domande | Nessun noindex |
| `/ricette-food-cost` | 200 | `WebPage` | Nessun noindex |
| `/produzione-magazzino` | 200 | `WebPage` | Nessun noindex |
| `/ordini` | 200 | `WebPage`, `FAQPage` con 4 domande | Nessun noindex |
| `/etichette-libro-ingredienti` | 200 | `WebPage` | Nessun noindex |
| `/strumenti` | 200 | `WebPage` | Nessun noindex |
| `/pricing` | 200 | `WebPage` | Nessun noindex |
| `/newsletter` | 200 | `WebPage` | `noindex, follow` |
| `/instagram` | 200 | Nessuno | `noindex` |
| `/account/billing` | 200 | Nessuno | `noindex, nofollow` |
| `/billing/success` | 200 | Nessuno | `noindex, nofollow` |
| `/billing/cancel` | 200 | Nessuno | `noindex, nofollow` |
| `/download`, `/aggiornamenti` | 404 | `WebPage` della pagina non trovata | `noindex` |

I due URL ritirati non restituiscono una falsa offerta né un finto prodotto diverso: lo schema della 404 descrive la pagina non trovata. La presenza del grafo comune nelle pagine noindex non annulla il noindex e non giustifica un intervento autonomo.

## Validazione per blocco

| Blocco | Sintassi e proprietà | Idoneità Google e note |
| --- | --- | --- |
| `WebSite` globale | PASS dei controlli locali: tipo noto, `@id`/URL canonici assoluti, lingua, publisher risolvibile nel grafo | Identificazione del sito; nessuna promessa su come Google mostrerà il nome |
| `Organization` globale | PASS: nome, URL, logo `ImageObject`, contatto e Paese coerenti per tipo | Non dimostra Knowledge Panel, verifica dell'azienda o reputazione |
| `SoftwareApplication` globale | WARN verificato: `additionalProperty` non è previsto su questo tipo; altri tipi/proprietà controllati presenti e corretti | NON soddisfa i requisiti Google del rich result app: mancano `offers.price` e una review/rating autentica; `operatingSystem` è inoltre raccomandato, assente |
| `WebPage` delle sei pagine interne indicizzabili e newsletter | PASS: `@id`, URL, nome, descrizione, lingua, `isPartOf` e `about` coerenti | `WebPage` generico non ha una propria scheda rich result garantita |
| `FAQPage` Home e Ordini | PASS sintattico/strutturale e corrispondenza testuale: tutte le 10 domande e risposte sono nel testo dell'HTML iniziale, anche quando chiuse | INFO: nessun rich result FAQ Google attuale; nessun beneficio AI quantificabile dimostrato |
| `WebPage` della 404 | PASS dei controlli locali; nome/descrizione pertinenti alla pagina non trovata | Risposta 404/noindex: non è candidata ai rich result |

Tutti i contesti JSON-LD radice sono `https://schema.org`; nessun tipo sconosciuto/deprecato, URL relativo, testo segnaposto o errore JSON trovato nei blocchi acquisiti. Non ci sono date nel markup: il formato ISO 8601 non è applicabile. Non sono presenti `HowTo`, `SpecialAnnouncement`, `CourseInfo`, `EstimatedSalary`, `LearningVideo`, `Review`, `AggregateRating`, `Offer` o `Product`. I riferimenti tramite `@id` sono correttamente collegati alla stessa organizzazione, sito e applicazione.

**Regole attuali verificate.** La guida Google per [SoftwareApplication](https://developers.google.com/search/docs/appearance/structured-data/software-app) richiede nome, prezzo dell'offerta e review o rating per quella specifica funzionalità. Questi requisiti non sono requisiti universali di validità Schema.org. Non bisogna aggiungere una review inventata né chiamare gratuita l'app perché esiste una prova di 14 giorni. Il [changelog ufficiale Google](https://developers.google.com/search/updates) dell'8 maggio 2026 annuncia la fine del rich result FAQ dal 7 maggio; il 15 giugno documenta la rimozione della guida. La precedente restrizione ai siti salute/governo è quindi una descrizione storica ormai insufficiente.

## Rilievi prioritari

### SG-01 — Proprietà aggiuntive non previste sul tipo software

- **Categoria:** discrepanza semantica verificata / proprietà non prevista su quel tipo; **priorità bassa**, non blocco tecnico di indicizzazione.
- **URL:** tutte le sette pagine indicizzabili, ripetuto anche nelle pagine escluse/404 per il layout comune. Esempio `https://labmanagergestionale.com/` → prova `home.jsonld.json`, `$[0].@graph[2].additionalProperty`.
- **Evidenza:** la build associa sette `PropertyValue` a `SoftwareApplication.additionalProperty` (livelli commerciali e sei claim Magazzino). Il [dominio ufficiale di additionalProperty](https://schema.org/additionalProperty) comprende Product/Offer/Place e altri tipi, ma non SoftwareApplication o CreativeWork, da cui l'app eredita. Il controllo con vocabolario ufficiale riproduce un solo mismatch per pagina. Schema.org [`domainIncludes`](https://schema.org/domainIncludes) suggerisce l'applicabilità della proprietà e, secondo il suo [modello di conformità flessibile](https://schema.org/docs/datamodel.html#conformance), non definisce un vincolo chiuso di validazione JSON-LD: è una discrepanza semantica rispetto all'applicabilità documentata, non un errore di parsing JSON-LD, un'invalidazione dell'intero grafo o una penalità ranking dimostrata.
- **Impatto:** il comportamento dei singoli consumatori non è stato misurato; non è dimostrato un rifiuto o un blocco del grafo. Il controllo locale segnala l'applicabilità non documentata di quel campo. I contratti test attuali confermano l'implementazione, ma non l'appropriatezza semantica della proprietà su SoftwareApplication.
- **Correzione minima proposta:** rimuovere `additionalProperty` dal nodo software, mantenendo descrizione e `featureList`, che contengono già le funzionalità pubbliche. Conservare la governance del manifesto nei contratti dell'app e aggiornare le aspettative in `metadata-contracts.test.ts`. Evitare un doppio tipo Product solo per rendere accettabile questo campo.
- **JSON-LD proposto:** `output/seo-audit-2026-10-19/schema-geo/proposed-softwareapplication.json`, copia del nodo esistente con sola rimozione del campo. Non applicato al prodotto.

### SG-02 — Rich result SoftwareApplication non raggiungibile con le prove disponibili

- **Categoria:** limite verificato / opportunità condizionata; **informativo**.
- **URL:** grafo globale, esempio `https://labmanagergestionale.com/pricing` → `pricing.jsonld.json`.
- **Evidenza:** non esistono offerte nel JSON-LD né review/rating visibili verificabili. L'assenza di prezzo nel markup evita una contraddizione fra equivalente mensile e incasso annuale, ma non soddisfa i requisiti della scheda app Google.
- **Proposta:** mantenere per ora il nodo descrittivo. Non è necessario eliminare SoftwareApplication o inventare prezzi/review per ottenere un controllo verde. Un futuro Offer, se approvato, dovrà derivare dal manifesto, vivere sulle superfici pertinenti e descrivere importo effettivo e periodicità; da solo non risolve la review mancante.

### SG-03 — Screenshot storici nel grafo comune

- **Categoria:** opportunità di manutenzione; **priorità bassa**.
- **URL:** grafo globale di tutte le route → `home.jsonld.json`, `screenshot`.
- **Evidenza:** sono dichiarati due asset storici; il desktop è esplicitamente descritto come schermata di una versione precedente. Nessuno dei due è esposto come immagine nel contenuto della nuova Home. Le immagini editoriali AI dei nuovi contenuti non sono invece marcate come screenshot del software.
- **Proposta:** quando arrivano gli screenshot autentici già richiesti al committente, valutare l'aggiornamento del nodo e la corrispondenza con schermate realmente visibili. Prima di allora si può rimuovere il campo opzionale. Non trasformare fotografie AI o il mockup Ordini in screenshot reali; nessuna prova di penalità per gli asset storici è stata raccolta.

## Offerte e coerenza con il contenuto

Nessun prezzo o durata dell'abbonamento è serializzato come Offer: non è presente nel markup una falsa offerta a €16,67 fatturati ogni mese. Home e FAQ dichiarano il confronto corretto: Light €19,99 mensili o €200 annuali, Plus €44,99 mensili o €480 annuali; i prezzi equivalenti mensili degli annuali restano presentazione dell'offerta annuale. Il JSON-LD FAQ deriva dagli stessi testi visibili. Non è stata esercitata la scelta del piano, la registrazione o il pagamento nell'app autenticata.

`llms.txt` elenca le sette pagine correnti con URL assoluti e nessuno dei due URL ritirati. La prova Plus, la distinzione Light/Plus e il Libro ingredienti (consultazione Light, generazione con verifiche/storico PDF Plus) sono coerenti con i contenuti delle pagine e il manifesto esaminato. Il testo pubblico mantiene il laboratorio artigianale alimentare come destinatario; ristorazione e consulenti possono essere esplicitati anche nei riepiloghi macchina come opportunità editoriale, senza fingere che l'elenco di esempi attuale sia una restrizione esclusiva.

## Accessibilità ai crawler AI e llms.txt

`/robots.txt` e `/llms.txt` rispondono 200 sulla build Node. Il wildcard `User-agent: * / Allow: /` consente anche agenti non elencati singolarmente. Nessuna regola robots locale blocca le sette pagine, OAI-SearchBot, PerplexityBot, Claude-SearchBot o Claude-User. L'HTML iniziale contiene contenuto testuale e schema: l'accesso alle informazioni di base non dipende dall'esecuzione JS. Questa è accessibilità locale di contenuto, non prova che i crawler pubblici abbiano visitato il sito.

| Token | Funzione documentata | Stato nel robots della build |
| --- | --- | --- |
| OAI-SearchBot | Ricerca ChatGPT | Allow esplicito |
| ChatGPT-User | Recupero su richiesta utente; non decide l'inclusione in Search | Allow esplicito |
| GPTBot | Raccolta per training | Allow esplicito |
| PerplexityBot | Ricerca Perplexity | Allow esplicito |
| Perplexity-User | Recupero su richiesta utente | Consentito dal wildcard |
| Claude-SearchBot / Claude-User | Ricerca / recupero su richiesta | Consentiti dal wildcard |
| ClaudeBot | Raccolta per training | Allow esplicito |
| Googlebot | Google Search e funzioni AI di Search | Consentito dal wildcard |
| Google-Extended | Training Gemini e grounding in altri prodotti; non ranking Search | Allow esplicito |

Fonti: [crawler OpenAI](https://developers.openai.com/api/docs/bots), [Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers), [Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), [Google-Extended](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended). Non è necessario consentire il training per consentire la ricerca; il file attuale consente entrambi. Cambiare questa preferenza è una scelta del proprietario, non una correzione SEO obbligatoria.

Google [dichiara](https://developers.google.com/search/docs/appearance/ai-features) che le funzioni AI Search non richiedono nuovi file macchina o schema speciale; il [changelog del 15 giugno 2026](https://developers.google.com/search/updates) precisa che llms.txt non produce un effetto positivo o negativo sulla visibilità/ranking Google. Il file esistente può restare come riepilogo per i sistemi che lo usano. Non c'è motivo di moltiplicare pagine, inventare un punteggio GEO o imporre passaggi da 134–167 parole. Le citazioni nelle risposte AI non sono state misurate.

## Opportunità di schema mancanti

Le cinque pagine di lavoro hanno un percorso visibile ma nessun `BreadcrumbList`. È un'aggiunta facoltativa di bassa priorità per rappresentare Home → area corrente; nessun guadagno ranking/rich result è garantito. Esempio già generato, senza modificare il prodotto: `output/seo-audit-2026-10-19/schema-geo/optional-breadcrumb-ricette.json`. Prima di applicarlo alle cinque aree, collegarlo a `WebPage.breadcrumb` e usare gli URL canonici reali. La documentazione Google [Breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb), verificata nell'audit, richiede almeno due ListItem; l'esempio contiene posizione, nome e URL di ciascuno. La funzionalità è documentata per desktop: non promettere breadcrumb nelle SERP mobile. Non aggiungerlo globalmente alla Home o alle 404.

Non sono raccomandati nuovi FAQPage per ottenere risultati Google, Product/Review/AggregateRating senza contenuto autentico, LocalBusiness senza sede commerciale verificata, Person/byline inventati o nuovi tipi/pagine per inseguire la visibilità AI.

## Limiti e criteri per il passaggio successivo

Questo controllo è eseguibile prima del collaudo manuale e prima del live: individua dati strutturati errati nella candidata senza pubblicarla. Non costituisce accettazione del prodotto o autorizzazione alla pubblicazione. Nessun rilievo qui documentato è presentato come impedimento assoluto al crawl.

Non verificati: Rich Results Test/Schema.org Validator esterni, indicizzazione, Search Console, GA4, citazioni AI reali, ranking, log bot, regole Cloudflare WAF/Bot Management o runtime workerd della candidata. Il test locale con User-Agent, anche se eseguito, non dimostrerebbe che i veri bot passano il WAF pubblico. Non sono stati stimati benefici di FAQPage/llms.txt o implementati nuovi schema/offerte. Dopo deploy esplicitamente autorizzato serviranno prove nuove su HTML pubblico, robots, asset, crawler e strumenti Google; il collaudo manuale resta un requisito separato della decisione di rilascio.
