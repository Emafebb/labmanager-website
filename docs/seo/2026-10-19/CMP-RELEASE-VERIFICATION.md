# Rilascio CMP e verifica pubblica — 19 ottobre 2026

**Fix del doppio caricamento pubblicato e verificato su Home e Prezzi**, desktop 1440×1000 e mobile 390×844. Un loader e un banner; nessuna nuova installazione CMP durante la navigazione client. PV-01 resta aperto per le misure prestazionali.

## Provenienza del rilascio

Alla ripresa il remoto conteneva già `62038af2ee525bb5bd9bcff5ef8ac53be5bdafd1` e Workers Builds era in esecuzione. Non eseguito un altro push o deploy manuale. `git fetch origin master` conferma il checkout allineato; il commit documentale `62038af` non cambia gli input del prodotto rispetto al fix `0fa9e6e` già verificato con il lock versionato.

| Dato | Valore verificato |
| --- | --- |
| Worker | `labmanager-website`, tag `522c5e4fa8854c89aa0de72dccd400e8` |
| Workers Builds | `fdc1d3d7-1e8d-4c49-9864-c24d33fc0150`, success |
| Commit remoto | `62038af2ee525bb5bd9bcff5ef8ac53be5bdafd1`, master |
| Versione Worker | `20f2bcc3-ace2-4adb-adcb-b43bfc6fe233` |
| Deployment | `cd49c01b-c2ed-44dd-a3d8-03c6e7ab90b8`, 100% |
| Pubblicazione | 19 ottobre 2026, 15:28:58 Europe/Rome |
| BUILD_ID pubblico | `_ydy_dmUjew6BEDreHjAX` |
| Pipeline | Node 24.21.0, npm 10.9.2, Next 16.2.10/Turbopack, OpenNext 1.20.1, Wrangler 4.110.0 |

Build Next, TypeScript, controllo del manifesto, OpenNext e deploy riusciti nella pipeline; gzip 1272,98 KiB. I 133 test e 3 controlli commerciali sono prove della precedente verifica isolata dello stesso codice, non una suite rieseguita in questa fase. `wrangler whoami` conferma l'account LabManager; la CLI installata nel checkout è ora 4.151.2 ed è stata usata soltanto per interrogazioni remote in sola lettura. Nessun aggiornamento dipendenze effettuato.

## Controlli pubblici conclusi

- HTTP: sette pagine canoniche 200, title, canonical, un H1 e JSON-LD analizzabili; loader diretto assente. Robots, llms.txt e sitemap 200, sette URL nella sitemap; `/download` e `/aggiornamenti` 404 previste; HTTP→HTTPS 308 con percorso e query conservati. BUILD_ID ricontrollato a fine smoke.
- Browser: contesti nuovi senza storage condiviso per entrambe le larghezze. Home prima visita e reload senza scelta; chiusura tramite il controllo reale, reload con scelta ricordata, riapertura dal footer tramite clic e Return. Navigazione client Home→Prezzi senza nuova richiesta Document o loader, preferenze riapribili dopo rimontaggio del footer e dopo reload di Prezzi. Verificata inoltre Prezzi come prima pagina in altri contesti nuovi, con reload prima della scelta.
- In tutti gli stati controllati: un loader, un banner, tema presente, nessun overflow orizzontale. Loader, banner, configurazione, autoblocker e GVL rispondono 200; la registrazione automatica della chiusura risponde 201. Nessun errore `pageerror` nei percorsi Home→Prezzi. Ispezionate le schermate desktop/mobile, comprese le preferenze a transizione conclusa.
- Osservabilità, intervallo interrogato 13:29:00–13:32:33 UTC: nessun 5xx o outcome di eccezione restituito. Presenti anche richieste annullate e status 0, non attribuiti ulteriormente. I 404 aggregati riguardano i due URL ritirati e percorsi GUID `/…/init`, `/…/main.js`, `/…/shutdown/pagehide`; il problema GUID resta distinto dal fix CMP.

## Tentativi intermedi e limiti

Il primo percorso browser si ferma quando lo scorrimento al footer apre il dialog newsletter e questo intercetta il clic sul pannello CMP. Ripetuto chiudendo il popup con il suo pulsante reale, senza modificare DOM o storage a mano. Questo controllo verifica il recupero tramite chiusura del popup, non certifica ogni combinazione di sovrapposizione fra dialog. Il secondo tentativo termina per un'aspettativa troppo stretta del verificatore: il normale 201 del log consenso era confrontato con 200; corretta l'accettazione degli status 2xx. Il percorso finale passa su entrambe le larghezze. Anche il primo verificatore HTTP attendeva la Home canonica senza slash; corretto il solo verificatore, poi smoke completo riuscito. Nessuna modifica al prodotto per questi tentativi.

Le prime schermate delle preferenze catturavano la transizione; quelle `pricing-preferences-settled-*` sono state ripetute dopo 500 ms e ispezionate. Nessun form, iscrizione, pagamento o messaggio inviato; i clic di chiusura CMP producono le normali registrazioni del servizio. Nessuna modifica GTM, TCF, protezione locale o servizio Cloudflare diverso dal sito.

Non ripetuti audit completo, Lighthouse, tre campioni prestazionali comparabili, CWV di campo, Search Console, Safari o dispositivi fisici. Non attestato un miglioramento LCP. Screenshot autentici ancora attesi. Il collaudo integrale già confermato dal committente resta valido come prova distinta.

## Prove e stato locale

Acquisizioni ignorate da Git: `output/playwright/cmp-release-2026-10-19/`, inclusi `pipeline.log`, `build.json`, `deployments.json`, `version.json`, `BUILD_ID`, `http-smoke.json`, `browser.json`, `pricing-fresh.json`, aggregazioni di osservabilità, log dei tentativi e schermate. Sessione browser dedicata chiusa a fine verifica.

`package.json` e `package-lock.json` concorrenti preservati: hash SHA-256 rispettivamente `9a1a397b7215cc0c299fd348f9b026a3fded3e47e2f7ca948ff67176e64fa4d2` e `3e89573b5c9ccf93e58bab04a6bba9d83e126318ff180a82f828ad4186e4fe90`, identici alla precedente verifica. Rapporto e riferimenti di continuità raccolti nel commit locale richiesto dal committente; hash nella cronologia Git. Nessun ulteriore push o deploy per questa chiusura documentale.
