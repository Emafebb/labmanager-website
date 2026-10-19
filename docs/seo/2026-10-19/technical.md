# Audit SEO tecnico prepubblicazione — 19 ottobre 2026

## Target e metodo

Target: commit `3b9bb7c6b86f67500d2e1f0293b03060d13ca3ec`, build di produzione Next.js isolata tramite archivio Git. La verifica riguarda il candidato locale, non il dominio pubblico né il runtime Cloudflare workerd. Collaudo manuale del committente ancora da raccogliere. Nessun modulo inviato, nessun endpoint API interrogato, nessuna modifica al prodotto o ai servizi esterni.

Inventario atteso da `src/data/work-areas.ts` e `src/app/sitemap.ts`: Home, Ricette/Food Cost, Produzione/Magazzino, Ordini, Etichette/Libro ingredienti, Strumenti, Prezzi. Controlli aggiuntivi: cinque route di servizio noindex, due pagine ritirate, un URL inesistente, robots.txt, llms.txt, sitemap.xml, link e ancore interne.

Script riproducibile: `node output/seo-audit-2026-10-19/technical/capture.cjs <origine-locale>`. Lo script accetta solo localhost/127.0.0.1 ed esclude `/api/`; conserva risposte HTML, header, hash, parser XML e riepilogo JSON. Prove locali ignorate da Git, da rigenerare in un nuovo clone. Non è stato usato il precedente cache SEO di luglio.

## Provenienza verificata

Confrontati byte per byte tutti i **296 file tracciati** fra blob Git HEAD, checkout e archivio candidato `/tmp/lm-seo-20261019-3b9bb7c`: **zero differenze**, nessun file escluso. Nomi dei file controllati prima della lettura: nessun percorso tracciato relativo a env o credenziali. File generati/non tracciati non fanno parte del confronto sorgente.

Build ID locale `X48ne7fzxtjRhr0basNNh`, Node `v26.5.0`, Next installato e dichiarato `16.2.10`. Evidenza con SHA-256 per ogni file: `output/seo-audit-2026-10-19/technical/provenance.json`; comando riproducibile: `python3 output/seo-audit-2026-10-19/technical/provenance.py`. Questa prova identifica i sorgenti del candidato; non attesta ambiente e secrets della futura pubblicazione.

## Esito tecnico locale

**Nessun bug SEO tecnico verificato nel perimetro HTTP/HTML esaminato.** Non è un via libera al deploy: runtime workerd, rete pubblica e accettazione manuale restano livelli separati di verifica.

Origine misurata: `http://127.0.0.1:3049`, `next start` di una build di produzione dal commit dichiarato, 19 ottobre 2026. Prove: `output/seo-audit-2026-10-19/technical/results.json`, `summary.json`, `capture.log` e corpi HTML/testuali nella stessa cartella. `results.json` contiene timestamp UTC, header, SHA-256 dei corpi e dettaglio di ogni collegamento verificato.

| Categoria | Esito | Evidenza locale |
| --- | --- | --- |
| Crawlability | PASS locale | robots.txt 200 `text/plain`, nessun Disallow; sitemap referenziata; tutte le sei pagine di approfondimento raggiunte da link HTML diretti della home |
| Indexability | PASS locale | 7/7 HTTP 200, canonical assoluto singolo coerente, nessuna direttiva noindex inattesa nell'HTML o negli header |
| Sicurezza | PARZIALE | CSP, HSTS, X-Frame-Options, nosniff e Referrer-Policy presenti sulle sette risposte; TLS/HTTPS pubblico e wrapper Worker non provati |
| URL e redirect | PASS locale | URL descrittivi; quattro prove slash terminano in un solo 308 al percorso senza slash; query UTM conserva canonical pulito |
| Mobile | PARZIALE | `lang=it` e viewport `width=device-width` presenti; sola analisi sorgente, verifica visuale negli altri report |
| CWV | NON MISURATI qui | Nessun dato sul campo derivato da questa analisi |
| Dati strutturati | RINVIO | JSON-LD presente nell'HTML iniziale; interpretazione semantica nel report schema |
| Rendering JS | PASS locale HTML/DOM/noJS | Metadati e contenuto coerenti fra HTML iniziale e 14 DOM JS desktop/mobile; titolo/H1/testo principale invariati anche in 7 acquisizioni noJS |
| IndexNow | NON BLOCCANTE | Nessuna implementazione trovata nei sorgenti esaminati; non richiesto per l'indicizzabilità |

### Pagine commerciali indicizzabili

Per ciascuna: HTTP 200, un title, una description, un canonical, un H1, nessun ID duplicato e nessun noindex. Title e description sono distinti tra le sette pagine. I canonical puntano intenzionalmente al dominio di produzione; l'anteprima locale non deve diventare un nuovo sito indicizzabile.

| Percorso verificato su 127.0.0.1:3049 | Canonical nell'HTML iniziale | H1 |
| --- | --- | --- |
| `/` | `https://labmanagergestionale.com/` | Dalla ricetta al banco. |
| `/ricette-food-cost` | `https://labmanagergestionale.com/ricette-food-cost` | Una ricetta, / anche nei conti. |
| `/produzione-magazzino` | `https://labmanagergestionale.com/produzione-magazzino` | Prepari oggi. / Sai cosa resta. |
| `/ordini` | `https://labmanagergestionale.com/ordini` | Ogni ordine, al suo posto. |
| `/etichette-libro-ingredienti` | `https://labmanagergestionale.com/etichette-libro-ingredienti` | Dal prodotto all’etichetta. |
| `/strumenti` | `https://labmanagergestionale.com/strumenti` | Il calcolo giusto, / quando serve. |
| `/pricing` | `https://labmanagergestionale.com/pricing` | Un piano per il tuo lavoro. |

Le barre nei tre H1 rappresentano gli a capo `<br>`; la concatenazione nel `textContent` del parser non è stata classificata come errore di contenuto.

### Confini di indicizzazione e pagine ritirate

| URL locale | Status | Robots nell'HTML | Canonical |
| --- | --- | --- | --- |
| `/newsletter` | 200 | `noindex, follow` | Proprio URL di produzione |
| `/instagram` | 200 | `noindex` | Assente, previsto per questa route esclusa |
| `/account/billing` | 200 | `noindex, nofollow` | Assente |
| `/billing/success` | 200 | `noindex, nofollow` | Assente |
| `/billing/cancel` | 200 | `noindex, nofollow` | Assente |
| `/download` | 404 | Un solo `noindex` | Assente |
| `/aggiornamenti` | 404 | Un solo `noindex` | Assente |
| `/seo-audit-missing-20261019` | 404 | Un solo `noindex` | Assente |

Le tre 404 contengono l'H1 «Pagina non trovata» e la pagina Traccia completa. Nessuna redirezione alla home e nessun link alle due pagine ritirate dalle sette pagine indicizzabili. robots.txt non impedisce ai crawler di leggere i 404 o i noindex.

### Sitemap, link, ancore e dettagli HTML

- `/sitemap.xml`: HTTP 200, `application/xml`, XML parsato senza errori; esattamente i sette URL attesi, assoluti HTTPS sul dominio canonico. Ciascun percorso restituisce 200 nella build locale e non ha noindex o redirect. Le pagine di servizio e ritirate non compaiono.
- `lastmod=2026-10-19` coincide con il rifacimento documentato delle sette pagine: date identiche non costituiscono, da sole, un errore. Nei prossimi aggiornamenti mantenere le date aderenti a modifiche significative del contenuto.
- 495 occorrenze di link interni esaminate sulle quindici pagine HTML; 131 occorrenze con frammento, nessun frammento mancante e nessun collegamento verso una pagina inesistente. Le ancore locali della pagina 404 hanno un target presente e non sono falsamente classificate come link rotti.
- `/ordini#flusso-ordine` conserva l'ID di destinazione. I link `/#funzionalita`, `/#contatti`, skip-link e link fra le aree hanno target presenti.
- Tutto il testo dei 15 `details` in home, 4 in Ordini e 7 in Strumenti è già nell'HTML iniziale. I sette strumenti non dipendono da una chiamata JavaScript per consegnare il loro contenuto ai crawler. Il testo rimane nel DOM anche con JavaScript disabilitato; l'interazione dell'ancora diretta su Strumenti è documentata nel report principale.
- `/pricing/` → 308 `/pricing` → 200; `/ordini/` → 308 `/ordini` → 200; i corrispondenti slash di `/download/` e `/aggiornamenti/` terminano in 404 dopo un 308. `/ricette-food-cost?utm_source=seo-audit` risponde 200 con canonical senza parametri.

### Incrocio HTML iniziale, DOM e JavaScript disabilitato

Usato `output/seo-audit-2026-10-19/browser/dom.json`, acquisito dal coordinatore sulla stessa origine: sette pagine a 1440 px e sette a 390 px con JS, più sette acquisizioni con JS disabilitato. Confronto riproducibile: `node output/seo-audit-2026-10-19/technical/compare-dom.cjs`; risultati in `dom-comparison.json`.

**21 confronti, zero differenze inattese.** Nelle 14 acquisizioni JS corrispondono status, title, description, canonical, robots, H1 e testo principale rispetto all'HTML iniziale. Nelle sette noJS corrispondono status, title, H1 e testo principale. Il testo è confrontato con `textContent`, senza script/stili e con spazi normalizzati: include il corpo dei dettagli chiusi, che rimane nel documento anche quando l'utente deve espanderlo.

Limite preciso: le acquisizioni noJS non registrano description/canonical/robots; per questi campi il confronto completo riguarda HTML iniziale e DOM JS.

## Priorità e raccomandazioni

**Critical/High/Medium: nessun difetto tecnico accertato in questa prova locale.** Nessuna correzione al prodotto è stata applicata.

**Bassa, facoltativa:** `priority` e `changefreq` sono presenti nella sitemap ma ignorati da Google. Rimuoverli semplificherebbe il file; non apporta un beneficio dimostrato di ranking e non giustifica una modifica prima del rilascio.

**Da verificare nel runtime/alla pubblicazione, non classificati come bug:** ripetere la matrice HTTP/HTML su workerd e successivamente sul dominio del deploy autorizzato; verificare redirect HTTP→HTTPS, varianti www e dominio storico, header finali e eventuali regole CDN. Solo allora confrontare i dati Search Console e i canonical scelti dal motore. Non inviare richieste di indicizzazione come parte di questo audit.

## Fonti primarie correnti

Consultate il 19 ottobre 2026:

- [Google — costruzione e invio sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap): URL canonici assoluti, lastmod significativo, `priority` e `changefreq` ignorati da Google. Una sitemap è un segnale e non garantisce indicizzazione.
- [Google — direttive robots meta e HTTP](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag): il crawler deve poter leggere la pagina per recepire noindex.
- [Google — SEO JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics): contenuto, link, canonical e direttive verificati anche nell'HTML iniziale; rendering e canonical effettivo scelto dal motore restano un altro livello di prova.
- [Google — status HTTP](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes): pagine rimosse e URL inesistenti devono essere valutati sullo status, non solo sull'aspetto della pagina di errore.

## Limiti e controlli di rilascio

Le verifiche locali non attestano raggiungibilità Googlebot, TLS, DNS, cache/CDN, redirect fra HTTP/HTTPS e domini alternativi, canonical scelti da Google o indicizzazione effettiva. Questi controlli richiedono la futura build pubblicata e un deploy esplicitamente autorizzato. Il wrapper HTTPS `worker.ts` è presente nel sorgente ma non eseguito da `next start`.

Le misure di prestazione, la revisione semantica/strutturata e la verifica mobile visuale sono negli altri report dell'audit; non si derivano CWV da questa ispezione HTML. Non è assegnato un punteggio numerico privo di una metrica riproducibile. IndexNow non è richiesto per rendere il sito indicizzabile; l'eventuale adozione è un'attività distinta e non un blocco di pubblicazione.
