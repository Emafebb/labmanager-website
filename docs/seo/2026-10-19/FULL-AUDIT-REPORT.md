# LabManager — audit SEO della candidata locale

19 ottobre 2026. **Esito: struttura tecnica locale coerente; un rischio di prestazione mobile da approfondire e una discrepanza semantica JSON-LD a bassa priorità.** Questo audit è concluso nel perimetro prepubblicazione descritto; il rilascio non è stato validato o autorizzato. Collaudo manuale del committente ancora da raccogliere.

## Versione analizzata

| Elemento | Prova |
| --- | --- |
| Repository e branch di partenza | `labmanager-website`, `master`, working tree inizialmente pulito |
| Commit candidato | `3b9bb7c6b86f67500d2e1f0293b03060d13ca3ec` — `feat(site): rebuild website with Traccia` |
| Ricostruzione | `git archive HEAD` in `/tmp/lm-seo-20261019-3b9bb7c`, dipendenze locali copiate, `npm run build` completato con TypeScript |
| Identità build | `X48ne7fzxtjRhr0basNNh`, Next 16.2.10, Node v26.5.0 |
| Origine HTTP realmente analizzata | `http://127.0.0.1:3049`, anteprima Node di produzione |
| Provenienza | 296/296 file tracciati identici byte per byte fra blob Git, checkout e candidato; zero mismatch |
| Dominio canonico dichiarato | `https://labmanagergestionale.com`; non usato come prova del nuovo sito |

Prove integrali in `output/seo-audit-2026-10-19/`, ignorate da Git. Le note di questa cartella `docs/seo/2026-10-19/` sono invece documenti durevoli. In un nuovo clone gli output vanno rigenerati. La cache SEO di luglio era riferita alla versione precedente ed è stata esclusa dalle conclusioni; i nuovi riepiloghi cache specificano il target locale.

L'anteprima originale sulla porta 3038 è stata lasciata attiva e invariata. Non sono stati letti o copiati valori `.env`; il beacon opzionale Cloudflare Web Analytics è assente nella candidata isolata. Non è stato eseguito il runtime workerd o uno smoke test del dominio pubblico. Non sono stati eseguiti commit, push, deploy, invii form, pagamenti, operazioni di disiscrizione o richieste di indicizzazione.

## Perché l'audit può precedere il collaudo e il live

HTTP, contenuti, collegamenti, metadata, rendering e JSON-LD si possono verificare sulla candidata prima di pubblicarla. L'accettazione manuale conferma invece che il prodotto e i percorsi soddisfano il committente. I risultati di quel collaudo, se comportano modifiche, richiedono la ripetizione dei controlli interessati sulla nuova build.

Il deploy e la verifica dopo pubblicazione sono passaggi distinti. Nessuna prova locale dimostra che Google abbia acquisito questi URL, scelto i canonical, aggiornato le anteprime social o misurato questa versione presso utenti reali. L'assenza di tali dati non impedisce l'audit locale; limita ciò che si può concludere.

### Riprodurre la candidata in un nuovo checkout

Con dipendenze del progetto già installate e una porta libera, su macOS:

```bash
mkdir -p /tmp/lm-seo-rerun-3b9bb7c
git archive 3b9bb7c6b86f67500d2e1f0293b03060d13ca3ec | tar -x -C /tmp/lm-seo-rerun-3b9bb7c
cp -cR node_modules /tmp/lm-seo-rerun-3b9bb7c/node_modules
cd /tmp/lm-seo-rerun-3b9bb7c
NEXT_TELEMETRY_DISABLED=1 npm run build
npm run start -- --hostname 127.0.0.1 --port 3050
```

Usare un percorso nuovo per ogni ricostruzione, senza sovrascrivere candidate o processi altrui. Non copiare `.env` o secrets. Il nuovo BUILD_ID può differire; registrarlo insieme al commit e ai contenuti serviti. Le prove di questo report sono state invece eseguite sulla porta **3049**. In un altro terminale, con Lighthouse 13.4.0 disponibile, una misura equivalente è:

```bash
lighthouse http://127.0.0.1:3050/pricing --chrome-flags='--headless=new' --only-categories=performance,seo --output=json --output-path=/tmp/lm-pricing-mobile.json --no-enable-error-reporting
```

Per la matrice HTML richiedere i sette percorsi e i servizi/ritiri indicati nel [report tecnico](technical.md); per il browser ripetere le due viewport e la prova senza JS. I report JSON locali contengono gli esatti strumenti e parametri osservati; gli script in `output/` sono un aiuto locale, non una dipendenza del sito versionato.

## Copertura e risultati

Inventario corrente: Home, Ricette/Food Cost, Produzione/Magazzino, Ordini, Etichette/Libro ingredienti, Strumenti e Prezzi. Target italiano multisettore, laboratori artigianali alimentari; ristorazione e consulenti inclusi. Traccia e condizioni commerciali conservati.

| Ambito | Risultato verificato | Dettaglio |
| --- | --- | --- |
| Status e indicizzabilità locale | 7/7 pagine 200, nessun noindex inatteso | [Tecnica](technical.md) |
| Metadata e canonical | Title/description distinti, H1 singolo, canonical corretto e senza UTM | [Tecnica](technical.md) |
| Esclusioni e ritiri | Cinque servizi noindex; `/download`, `/aggiornamenti` e URL sconosciuto 404 con noindex, senza canonical | [Tecnica](technical.md) |
| Robots e sitemap | Accessibili, XML valido, esattamente sette URL canonici | [Tecnica](technical.md) |
| Link e ancore | 495 occorrenze interne / 131 frammenti senza destinazioni mancanti | [Tecnica](technical.md) |
| HTML e rendering | 14 confronti DOM JS e 7 senza JS coerenti con HTML; dettagli nativi disponibili | [Tecnica](technical.md), [Browser](performance-visual.md) |
| Contenuti e offerte | Intenzioni commerciali distinguibili, piani e annuale/equivalente mensile coerenti | [Contenuti](content.md) |
| Schema | JSON valido, HTML/DOM coerenti; proprietà software da semplificare | [Schema/GEO](schema-geo.md) |
| Mobile e immagini | Sette pagine × desktop/telefono senza overflow o immagini rotte; varianti responsive assenti | [Browser/immagini](performance-visual.md) |
| Prestazioni | Misure Lighthouse locali; Prezzi mobile LCP mediano 7,82 s; Home 3,64 s | [Prestazioni](performance-visual.md) |
| Social | Due immagini dichiarate 200, 1200 × 630, identità Traccia, nessun prezzo obsoleto | [Browser/immagini](performance-visual.md) |
| Accesso AI | Robots locale consente i crawler, contenuti e llms disponibili; citazioni reali non misurate | [Schema/GEO](schema-geo.md) |

Le 134 prove Vitest e i 3 controlli commerciali citati nel precedente handoff restano evidenza storica, non sono stati rieseguiti per il solo audit. È stata invece ricostruita ora la candidata. Questo controllo non certifica accessibilità completa, Safari, dispositivi fisici o tutte le interazioni del sito.

## Rilievi e priorità

| ID | Tipo e priorità | Target | Evidenza / proposta |
| --- | --- | --- | --- |
| PV-01 | Rischio lab, **alta per approfondimento** | `/pricing`, `/` | Prezzi 3 run mobile 7,76–7,85 s, LCP nel banner CMP; Home 2,98–7,93 s, mediana 3,64 s. Analizzare prima vista e CMP, immagini e runtime mantenendo i consensi. Non è un calo di ranking verificato. |
| PV-02 | Opportunità tecnica verificata, **media** | Home, cinque aree, logo condiviso | Originali unici anche su telefono, nessun srcset. Proporre varianti statiche e priorità hero senza attivare Cloudflare Images. |
| C-01 / SG-03 | Opportunità di prova prodotto, **media** per contenuti, bassa per markup | Food Cost, Ordini, Libro ingredienti; grafo comune | Screenshot autentici ancora attesi; esempi attuali illustrativi. Inserirli nei punti concordati e allineare screenshot dichiarati nel grafo. |
| SG-01 | Discrepanza semantica verificata, **bassa** | Grafo globale | `SoftwareApplication.additionalProperty` fuori dai tipi per cui il vocabolario la prevede. Rimuovere il campo ridondante e aggiornare i test contrattuali pertinenti. Non invalida il parsing JSON-LD o l'indicizzabilità. |
| C-02 | Opportunità editoriale, **bassa** | FAQ home e riepilogo llms | Ristorazione/consulenti già coperti nelle pagine: esplicitarli anche nei riepiloghi, senza nuove route settoriali. |
| C-03 | Ipotesi da misurare | `/strumenti` | Possibile differenza fra query per tool immediato e catalogo commerciale; servono dati prima di proporre nuovi strumenti o pagine. |

Nessun blocco locale verificato di crawl/indicizzabilità. Non si trasforma l'assenza di recensioni o offerte nel markup in un bug del prodotto: il nodo software può restare descrittivo. Non si aggiungono prezzi, rating o testimonial inventati. BreadcrumbList è facoltativo a bassa priorità; `priority/changefreq` della sitemap non richiedono un fix di rilascio.

**Nessun punteggio globale fittizio.** Il controllo automatico SEO Lighthouse è 100/100 sui sette URL, ma non misura l'intero audit; i punteggi di prestazione sono nel report dedicato. Un voto unico senza dati di campo, di indicizzazione e senza una rubrica esaustiva riproducibile darebbe una precisione non sostenuta dalle prove.

## Piano e decisione successiva

Il [piano di azione](ACTION-PLAN.md) distingue approfondimenti, correzioni proposte, collaudo, verifica workerd e futuro post-deploy. Nessuna correzione al prodotto è stata applicata. La prima priorità consigliata è risolvere l'incertezza sulle prestazioni mobile di Prezzi e Home; in parallelo si può preparare il piccolo intervento semantico sul grafo. Screenshot e copy multisettore seguono disponibilità e approvazione dei contenuti autentici.

Il collaudo manuale può continuare ora sull'anteprima scelta dal committente. Prima del rilascio occorre raccoglierne l'esito, integrare eventuali modifiche, ricontrollare il candidato risultante e completare il gate Cloudflare del runbook. Solo un'autorizzazione nuova ed esplicita permette push/deploy; l'audit non la sostituisce.

## Fonti e limiti

Le fonti primarie aggiornate e i passi di riproduzione sono citati accanto ai relativi rilievi nei quattro report. Le indicazioni datate delle skill sono state verificate: per esempio, il [changelog Google](https://developers.google.com/search/updates) documenta la dismissione del rich result FAQ dal 7 maggio 2026 e precisa che llms.txt non modifica la visibilità/ranking Google. Non si promettono risultati sulla base dei vecchi requisiti o di file aggiuntivi.

Non verificati: versione live del dominio, redirect HTTP/HTTPS/www/dominio storico, WAF/cache/TLS, runtime workerd della candidata, indicizzazione effettiva, ranking/volumi/traffico/backlink, citazioni AI, cache social, INP/CWV reali. Il controllo locale degli accessi non rileva credenziali GSC/GA4/CrUX/PSI configurate per le skill; non si sono avviati login o provisioning. Nessuna integrazione opzionale a pagamento necessaria all'esito locale.
