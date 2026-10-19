# PV-01 — misure dopo il rilascio CMP, 19 ottobre 2026

**Follow-up:** [GTM v9 pubblicata e sei nuove prime visite mobile](PV01-GTM-V9-RELEASE.md). La serie qui sotto rimane la baseline pubblica v8, precedente al cambio TCF. Le nuove misure confermano meno byte CMP, senza un miglioramento LCP affidabile; non sovrascrivere i campioni storici.

**Completata la serie pubblica di dodici misure mobile; PV-01 resta aperto.** La prima visita Prezzi ha LCP mediano **9,10 s**, con il testo del banner CMP come elemento LCP in tutti e tre i campioni. Home ha mediana **2,70 s**, con la fotografia hero come elemento LCP. Il caricamento CMP unico è confermato; la sua correzione funzionale non dimostra un miglioramento delle prestazioni.

## Target e metodo

- Target pubblico: `https://labmanagergestionale.com/` e `/pricing`, build `_ydy_dmUjew6BEDreHjAX` verificata prima e dopo la serie, rispettivamente alle **15:38:40** e **15:40:48 Europe/Rome**. [Provenienza del rilascio](CMP-RELEASE-VERIFICATION.md): codice `62038af`, versione Worker `20f2bcc3-ace2-4adb-adcb-b43bfc6fe233`. Non interrogata nuovamente la pipeline Cloudflare in questo passaggio. Checkout locale `1b2ae89`, successivo commit documentale; dipendenze concorrenti preservate.
- Lighthouse **13.4.0**, Chrome headless **155.0.0.0**, Node **26.5.0**, stesse versioni e impostazioni della precedente serie locale. Mobile **412×823**, DPR **1,75**, rete simulata RTT **150 ms**, throughput **1638,4 Kbps**, CPU **×4**. Nessuna esecuzione Lighthouse concorrente.
- Tre cicli, ciascuno nell'ordine Prezzi nuova/ritorno, Home nuova/ritorno. **Un processo Chrome con profilo nuovo per ciascuna misura**: dodici profili indipendenti. Tutti gli script e widget restano attivi; nessun override delle risposte, blocco delle risorse o modifica a DOM/storage per nascondere il consenso.
- Nuova visita: nessuna scelta preventiva. Ritorno: apertura della stessa pagina a 1440×1000, click reale su **Chiudi**, attesa del controllo nascosto, quindi misura mobile con preferenza e cache conservate (`disableStorageReset: true`). Questo riprende il protocollo precedente: il confronto nuova/ritorno **include l'effetto della cache** e non isola il solo consenso.
- Lighthouse chiude il tab misurato. Un reload separato, successivo alla misura e non cronometrato, verifica loader/host unici e pulsante Chiudi visibile solo nei profili senza scelta. I dati di questo controllo sono etichettati `postAuditReload`; le schermate `*-lighthouse.jpg` provengono invece dalla misura mobile. Il collaudo completo di reload, navigazione client e preferenze da tastiera resta quello del [rilascio verificato](CMP-RELEASE-VERIFICATION.md), senza ripeterlo integralmente.

## Risultati

Tutti i dodici campioni sono inclusi. Secondi per LCP/FCP, millisecondi per TBT. Le soglie di riferimento sono LCP ≤2,5 s e CLS ≤0,1; queste misure di laboratorio non attestano i Core Web Vitals degli utenti reali, che richiedono dati sul campo e il 75° percentile. Lighthouse non misura INP in questo percorso. [Definizioni e distinzione laboratorio/campo](https://web.dev/articles/vitals).

| Pagina / visita | Tre LCP (s) | LCP mediano (intervallo) | FCP mediano | CLS massimo | TBT massimo | Performance |
| --- | --- | --- | --- | --- | --- | --- |
| Home, nuova | 3,95 / 2,65 / 2,70 | **2,70 s** (2,65–3,95) | 2,20 s | 0,01950 | 7 ms | 86–94 |
| Home, ritorno | 1,27 / 0,88 / 0,91 | **0,91 s** (0,88–1,27) | 0,84 s | 0,00198 | 24 ms | 100 |
| Prezzi, nuova | 8,99 / 9,10 / 9,56 | **9,10 s** (8,99–9,56) | 2,08 s | 0,01802 | 21 ms | 73–75 |
| Prezzi, ritorno | 0,80 / 0,84 / 0,86 | **0,84 s** (0,80–0,86) | 0,80 s | 0,00049 | 0 ms | 100 |

La Home nuova resta sopra il riferimento LCP in tutti e tre i campioni. Su Prezzi nuova il nodo misurato è sempre il paragrafo «Noi e i nostri 1229 partner…» nel banner; al ritorno è il riepilogo dei piani. Sulla Home è sempre la fotografia hero. Stabilità visiva e TBT risultano contenuti nei campioni raccolti; il punteggio Performance è una sintesi di laboratorio, non una prova SEO o di ranking. [Scoring e variabilità Lighthouse](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring).

### Rete e controlli CMP

Nei dodici campioni Lighthouse: **cinque risorse LegalBlink per misura, tutte con status 200**, senza la licenza segnaposto o i retry 400 della diagnosi precedente. Nei dodici reload di controllo: un loader, un host banner, nessun overflow orizzontale; Chiudi visibile nei profili nuovi e nascosto dopo la scelta reale.

Nel primo campione Prezzi nuovo, la catena osservata è GTM → loader CMP → bundle banner → configurazione/autoblocker → GVL. Trasferimento LegalBlink complessivo **396.264 B**; bundle banner **244.158 B** trasferiti / **751.312 B** decodificati, GVL **143.103 B** / **1.102.807 B**. GTM trasferisce altri **125.094 B**. Sono dati di un campione, non una stima di risparmio ottenibile eliminando tali risorse. I tempi di rete raccolti e il LCP simulato non vanno sommati direttamente.

## Limiti del confronto

- **Ambiente con richieste GUID:** dieci misure su dodici contengono richieste con i prefissi GUID già descritti nella [diagnosi](CMP-CONSOLE-DIAGNOSIS.md), con almeno un 404 in ciascuna delle dieci. Complessivamente venti richieste GUID, quindici 404; nessun altro status ≥400 nella rete raccolta dei dodici report. L'attribuzione del codice ai componenti locali Kaspersky è una prova precedente; questa serie non ripete il confronto con le librerie e non risolve l'inserimento. Nessuna protezione disattivata. Non quantificato l'effetto di queste richieste sulle metriche: il campione non certifica un ambiente privo di interferenze locali.
- **Nessun prima/dopo controllato del fix CMP:** i precedenti 2,72 s Home e 7,42 s Prezzi erano misure su workerd locale con configurazione CMP storica, inclusa la licenza errata in alcune richieste. La serie attuale usa il dominio pubblico, GTM corretto e rete esterna. Versione dello strumento e impostazioni uguali rendono ripetibile il protocollo, ma non rendono identici i due target. Non dichiarare né miglioramento né regressione causati dal fix sulla base di questo confronto.
- Nessun errore `runtimeError` o warning Lighthouse nei dodici report. Ciò non certifica l'assenza di errori JavaScript/console: i 404 GUID restano presenti. Ispezionate le quattro schermate finali Lighthouse del primo ciclo; non ripetuto un audit visivo completo.
- Nessun dato CrUX/Search Console, INP, dispositivo fisico o Safari. Nessun nuovo invio di form, iscrizione, pagamento o messaggio. Nessuna modifica al prodotto, alle impostazioni GTM/TCF o ai servizi Cloudflare; nessun commit, push o deploy in questa attività. Test/build applicativi non ripetuti: sono cambiati soltanto i documenti e gli strumenti QA locali.

## Passo successivo

**La raccolta postrilascio è conclusa; l'ottimizzazione PV-01 resta aperta.** Prima di attribuire guadagni a un nuovo intervento, ripetere questo protocollo da un ambiente indipendente senza le iniezioni GUID osservate, conservando attivi consenso e widget. Non serve disattivare le protezioni di questo computer.

Il candidato di intervento da discutere con il responsabile CMP/fornitore è la catena iniziale e il peso di bundle/GVL: verificare se il servizio consente di ridurre le dipendenze seriali e il payload, preservando consenso e tag dipendenti. La traccia individua questa priorità, ma non dimostra quanti millisecondi siano recuperabili. Prima di cambiare GTM o TCF, definire un diff circoscritto e i relativi controlli di consenso; nessun cambiamento di configurazione è stato applicato né inviata una richiesta al fornitore.

Screenshot autentici C-01/SG-03 e accesso Search Console restano dipendenze distinte, come nel [piano](ACTION-PLAN.md).

## Prove ripetibili

Cartella locale ignorata da Git: `output/playwright/pv01-post-cmp-2026-10-19/`. Contiene `measure.mjs`, `series.log`, manifest iniziale del checkout e copie dei documenti prima dell'aggiornamento. In `series/`: dodici JSON Lighthouse completi, `summary.json`, `validated-summary.json`, prove BUILD_ID iniziale/finale, quattro trace/DevTools log e schermate del primo ciclo.

```sh
node output/playwright/pv01-post-cmp-2026-10-19/measure.mjs https://labmanagergestionale.com output/playwright/pv01-post-cmp-2026-10-19/nuova-serie
```

Lo script riusa i pacchetti Lighthouse/Chrome launcher/Playwright già presenti nella cache npm locale; non installa dipendenze. In un clone nuovo occorre ricreare strumenti e prove. Controlli assert: dodici misure, nessun errore runtime Lighthouse, loader presente, singolo loader/host e stato della scelta nei reload; BUILD_ID uguale prima/dopo. Verifica successiva dei JSON: tre campioni per cella, impostazioni coerenti, sessanta risposte CMP 200, tutti i reload conformi e classificazione delle richieste GUID.

Il primo tentativo conserva un JSON Prezzi ma si ferma prima di accettarlo: il verificatore presumeva erroneamente che Lighthouse lasciasse aperto il tab. Corretto il solo verificatore usando un reload successivo; **la serie valida contiene dodici nuove misure**, senza includere o sostituire campioni col primo tentativo. Nessuna modifica al prodotto per il tentativo intermedio.
