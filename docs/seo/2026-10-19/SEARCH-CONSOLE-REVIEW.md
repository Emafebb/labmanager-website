# Search Console — prima verifica nel profilo corretto, 19 ottobre 2026

## Aggiornamento operativo — sitemap riletta e quattro richieste accettate

**Ricontrollo programmato:** il committente ha confermato che le attività sono impostate. Nessuna nuova attività creata dall'agente e nessuna verifica diretta della configurazione o dei suoi identificativi. Evitare duplicati; attendere il controllo previsto per verificare l'indicizzazione effettiva.

Su successiva richiesta del committente **«procediamo con correggere?»**, eseguiti reinvio della sitemap e richieste mirate per le quattro nuove pagine nel medesimo account/proprietà. **Controllo finale intorno alle 18:18 Europe/Rome:** sitemap inviata e letta il **19 ottobre 2026**, stato **Riuscita**, **7 pagine rilevate**, zero video. Il precedente conteggio di tre URL è superato; nessuna modifica al file sitemap o al sito necessaria.

| URL richiesto | Esito della richiesta |
| --- | --- |
| `/ricette-food-cost` | Indicizzazione richiesta, aggiunto alla coda di scansione prioritaria |
| `/produzione-magazzino` | Indicizzazione richiesta, aggiunto alla coda di scansione prioritaria |
| `/etichette-libro-ingredienti` | Indicizzazione richiesta, aggiunto alla coda di scansione prioritaria |
| `/strumenti` | Indicizzazione richiesta, aggiunto alla coda di scansione prioritaria |

Per ciascun URL Google ha eseguito la verifica preliminare di indicizzabilità del percorso «Richiesta di indicizzazione», seguita dalla conferma esplicita. Conferme lette una per una; nessun reinvio ripetuto degli URL già accettati. Etichette e Strumenti, prima della rispettiva richiesta, erano già passate da sconosciute a **«Rilevata, ma attualmente non indicizzata»**, con la sitemap indicata anche come referral. Questo è un aggiornamento dello stato di scoperta, non prova di indicizzazione completata.

Controllo HTTP separato delle quattro pagine: recupero riuscito, un solo canonical corrispondente all'URL richiesto, nessun `noindex` nei meta robots/googlebot. La sitemap pubblica è stata riletta e verificata con sette URL univoci prima dell'invio. Il test live completo Ricette delle 18:07 resta distinto dai controlli preliminari automatici delle richieste.

**Operazione autorizzata conclusa; indicizzazione effettiva ancora da verificare.** Google conferma l'inserimento in coda, senza garantire tempi o pubblicazione nell'indice. Prossimo controllo: stato dei quattro URL e scansioni successive al rilascio, senza reiterare le richieste. Non riaperti il collaudo del sito o le esclusioni intenzionali di varianti, newsletter e favicon. PV-01 resta aperto e la bozza LegalBlink resta **non inviata**.

Prove locali aggiunte in `output/seo-gsc-2026-10-19/`: `submissions.json` (trascrizione delle conferme UI), `sitemap-before-submit.xml`, quattro HTML `*-before-index.html` e `public-page-checks.json`. Nessuna modifica applicativa o GTM, commit, push o deploy; dipendenze concorrenti preservate. Le sezioni sotto descrivono la lettura iniziale precedente a queste azioni.

## Verifica iniziale — prima del reinvio e delle richieste

**Accesso risolto e sette URL controllati.** Account Google `labmanager.info@gmail.com`, finestra Chrome nativa **Labmanager**, proprietà di dominio `sc-domain:labmanagergestionale.com`. Raccolta conclusa intorno alle **18:08 Europe/Rome**. Non sono stati creati account o proprietà, modificati permessi, reinviate sitemap o richieste indicizzazioni.

**Home, Prezzi e Ordini risultano indicizzate; le quattro nuove pagine risultano sconosciute a Google.** La sitemap pubblica contiene correttamente sette URL, mentre Search Console riporta ancora la lettura del 16 ottobre con tre URL. Il test live Ricette e Food Cost passa. Il rendimento disponibile precede il rilascio del 19 ottobre: è una baseline, non una misura dei risultati del nuovo sito.

## Sitemap e copertura

[Report Sitemap](https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Alabmanagergestionale.com): `https://labmanagergestionale.com/sitemap.xml`, inviata il **14 luglio 2026**, ultima lettura **16 ottobre 2026**, stato **Riuscita**, **3 pagine rilevate**, nessun video. Lettura HTTP separata della [sitemap pubblica](https://labmanagergestionale.com/sitemap.xml): **7 URL univoci**, tutti sul dominio HTTPS canonico, `lastmod` 19 ottobre. Nessuna reinoltrazione eseguita.

[Report Indicizzazione](https://search.google.com/search-console/index?resource_id=sc-domain%3Alabmanagergestionale.com), ultimo aggiornamento **12 ottobre 2026**: **5 indicizzate, 9 non indicizzate**. La proprietà di dominio include sottodomini; questi conteggi non corrispondono alle sole sette pagine del sito pubblico.

Le cinque indicizzate elencate nel report aggregato sono Home, Prezzi, Ordini, `https://app.labmanagergestionale.com/` e `https://promo.labmanagergestionale.com/`. Le ultime scansioni dell'elenco aggregato sono precedenti ad alcune scansioni mostrate dalle ispezioni individuali sotto. Nessun intervento su app o promo.

| Esclusione | URL / ultima scansione mostrata | Lettura operativa |
| --- | --- | --- |
| Reindirizzamento, 5 URL | `http://labmanagergestionale.com/` e `https://www.labmanagergestionale.com/` (4 ottobre); `http://www.labmanagergestionale.com/` (30 settembre); HTTP Ordini (28 luglio) e Prezzi (26 luglio) | Varianti non canoniche; l'esclusione non è da correggere per ottenere un conteggio verde. Catene di redirect non rimisurate in questa verifica |
| Altro errore 4xx, 1 URL | `https://links.labmanagergestionale.com/` (21 luglio) | Sottodominio distinto; non è una delle sette pagine. Stato HTTP attuale e finalità da verificare separatamente se ancora in uso |
| Noindex, 1 URL | `https://labmanagergestionale.com/newsletter` (24 settembre) | Coerente con il contratto noindex documentato del progetto; non rimuovere il noindex per questo report |
| Scansionata, attualmente non indicizzata, 2 URL | `http://labmanagergestionale.com/favicon.ico` (15 luglio); stesso percorso con `?favicon.0pxy4ftjmt-k8.ico` (14 luglio) | Sono favicon, non pagine commerciali mancanti |

## Ispezione dei sette URL della sitemap

Ispezioni dell'indice eseguite una per una. Date e orari di scansione sono trascritti dalla UI; non sono tempi di deploy.

| Percorso HTTPS canonico | Esito nell'indice Google | Ultima scansione individuale | Canonical dichiarato / Google |
| --- | --- | --- | --- |
| `/` | URL su Google, pagina indicizzata | 17 ottobre, 13:02:28 | Home / URL controllato |
| `/pricing` | URL su Google, pagina indicizzata | 16 ottobre, 07:21:27 | Prezzi / URL controllato |
| `/ordini` | URL su Google, pagina indicizzata | 3 ottobre, 03:45:28 | Ordini / URL controllato |
| `/ricette-food-cost` | URL sconosciuto a Google | N/D | N/D / N/D |
| `/produzione-magazzino` | URL sconosciuto a Google | N/D | N/D / N/D |
| `/etichette-libro-ingredienti` | URL sconosciuto a Google | N/D | N/D / N/D |
| `/strumenti` | URL sconosciuto a Google | N/D | N/D / N/D |

Per i tre URL indicizzati: Googlebot smartphone, scansione consentita, recupero positivo e indicizzazione consentita. Home: nessuna sitemap di referral rilevata; Prezzi e Ordini: il campo Sitemap mostra **«Errore temporaneo di elaborazione»**. Questa voce va ricontrollata, ma non equivale a sitemap attualmente irraggiungibile: il report Sitemap è riuscito e il file pubblico è stato letto separatamente. Tutte e tre le scansioni individuali precedono il rilascio.

**Un test live a campione:** Ricette e Food Cost, **19 ottobre, 18:07:06**. Esito **«L'URL è disponibile per Google»**, pagina indicizzabile, strumento di ispezione smartphone, scansione consentita, recupero positivo, indicizzazione consentita, canonical dichiarato `https://labmanagergestionale.com/ricette-food-cost`. Canonical Google da stabilire dopo l'indicizzazione. Non avviati test live sugli altri sei URL.

L'ispezione ordinaria descrive la versione nota a Google; il test live verifica l'accessibilità attuale senza attestare l'avvenuta indicizzazione. [Guida ufficiale Controllo URL](https://support.google.com/webmasters/answer/9012289?hl=en).

## Rendimento: baseline prima del rilascio

Prima lettura senza filtri: proprietà intera, Web, **18 luglio–17 ottobre 2026**, **73 clic**, **772 impressioni**, **CTR 9,5%**, **posizione media 33,3**. Include i sottodomini e non va usata come totale del solo sito pubblico.

[Lettura filtrata sul sito canonico](https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Alabmanagergestionale.com&num_of_days=28&page=*https%3A%2F%2Flabmanagergestionale.com%2F): Web, **20 settembre–17 ottobre 2026**, 28 giorni, filtro Pagina **contiene `https://labmanagergestionale.com/`**, nessun filtro per paese o dispositivo. UI: ultimo aggiornamento 4,5 ore fa.

| Clic | Impressioni | CTR | Posizione media |
| --- | --- | --- | --- |
| **7** | **197** | **3,6%** | **27,5** |

| Pagina | Clic | Impressioni |
| --- | --- | --- |
| Home | 7 | 190 |
| Ordini | 0 | 6 |
| Prezzi | 0 | 1 |

Le 18 query visibili sono state lette nelle due pagine della tabella:

| Query | Clic | Impressioni |
| --- | --- | --- |
| labmanager | 2 | 19 |
| lab manager | 0 | 26 |
| software gestione laboratori | 0 | 16 |
| software gestione ordini prove di laboratorio | 0 | 13 |
| gestionale alimentari | 0 | 11 |
| gestionale per gestione laboratori e ricerca scientifica | 0 | 10 |
| gestionale pasticceria | 0 | 6 |
| gestione laboratorio di pasticceria | 0 | 5 |
| gestionale per pasticcerie | 0 | 4 |
| gestione laboratorio | 0 | 3 |
| software gestione pasticceria | 0 | 2 |
| lab management | 0 | 2 |
| software gestione formulazione | 0 | 1 |
| software gestionale per pasticceria | 0 | 1 |
| laboratorio alimentare | 0 | 1 |
| software gelateria | 0 | 1 |
| food management software | 0 | 1 |
| software gestionale per aziende alimentari | 0 | 1 |

La UI avverte che totali e tabelle possono essere parziali con filtri. Le query visibili non esauriscono i totali del grafico: non attribuire i cinque clic non presenti nelle righe a query inventate. La posizione media è aggregata, non il ranking di una parola specifica.

**Interpretazione circoscritta:** compaiono ricerche pertinenti ai laboratori alimentari e ricerche sui laboratori scientifici, da distinguere nel monitoraggio. Non emerge dalle 18 righe una domanda misurata per calcolatori pubblici: campione piccolo e precedente al rilascio, insufficiente per decidere C-03 o cambiare testi/architettura. Nessun effetto SEO del nuovo sito ancora misurabile in questa finestra.

## Core Web Vitals e limiti della raccolta

[Report Core Web Vitals](https://search.google.com/search-console/core-web-vitals?resource_id=sc-domain%3Alabmanagergestionale.com), aggiornato al **17 ottobre**, sorgente Chrome UX Report: **dati di utilizzo insufficienti negli ultimi 90 giorni**, sia mobile sia computer, report non apribili. Nessun LCP/INP/CLS sul campo disponibile in questa lettura e nessuna conferma indipendente delle misure CMP precedenti.

Lettura via UI autenticata, non export API. Configurazione `~/.config/codex-seo/google-api.json` assente; lo script di controllo della skill non parte per mancanza di `requests`. Nessuna dipendenza o credenziale creata. Cache precedente riferita alla build locale prepubblicazione: non usata come dato corrente. Prove locali: `output/seo-gsc-2026-10-19/sitemap.xml` e `observations.json` (trascrizione strutturata, non risposta Google).

## Passi successivi

1. **Scoperta delle quattro nuove pagine:** valutare il reinvio della sitemap già esistente e richieste mirate di indicizzazione, tenendoli distinti da questa verifica in lettura. Poi ricontrollare ultima lettura e stato dei quattro URL. Nessuna garanzia sui tempi o sull'esito.
2. **Canonical e Sitemap:** ricontrollare Home, Prezzi e Ordini dopo una scansione successiva al rilascio, inclusi i messaggi temporanei del campo Sitemap.
3. **Rendimento:** conservare questa baseline e confrontare una finestra successiva al rilascio con durata e filtri dichiarati. Separare query brand, alimentari e scientifiche; non introdurre nuove pagine sulla sola base di questo campione.
4. **PV-01:** usare la [bozza LegalBlink](LEGALBLINK-SUPPORT-DRAFT.md) e ottenere misure indipendenti. Search Console oggi non fornisce il campione CWV necessario.

Nessuna modifica applicativa, nuova configurazione GTM, invio al fornitore, commit, push o deploy. Dipendenze concorrenti preservate. Non ripetuti audit completo, Lighthouse o collaudo integrale.
