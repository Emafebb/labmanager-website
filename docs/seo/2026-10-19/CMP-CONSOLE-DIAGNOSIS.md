# Diagnosi CMP e console dopo la pubblicazione

**Stato aggiornato:** licenza pubblicata in GTM e verificata nel bundle pubblico, versione 8; tag LegalBlink 7 con `69e89f282420950024cb1a5e`. La rimozione del caricamento diretto dal sito è nel commit locale `0fa9e6e`: un loader e un banner, preferenze funzionanti su Home/Prezzi nell'anteprima già verificata. **Successiva build con lock committato riuscita**, inclusi OpenNext, dry-run e HTTP workerd; [rapporto](LOCKED-BUILD-VERIFICATION.md). Il fallimento Next 16.4.2/Webpack descritto sotto non si riproduce con Next 16.2.10/Turbopack. Documentazione di verifica raccolta nel successivo commit richiesto, senza push/deploy. Il sito pubblico mantiene ancora il duplicato; PV-01 resta aperto. Le sezioni seguenti conservano la diagnosi e i blocchi precedenti.

19 ottobre 2026, acquisizioni iniziali circa 13:47–13:53 Europe/Rome. Individuata e verificata sperimentalmente la causa delle richieste LegalBlink con licenza segnaposto; in quella fase nessuna correzione era pubblicata. Il committente aveva confermato: «Collaudo completato senza problemi». Il collaudo manuale è raccolto; il difetto intermittente CMP era un rilievo distinto.

## Target e metodo

Dominio pubblico `https://labmanagergestionale.com`, Home e Prezzi. L'HTML HTTP acquisito contiene BUILD_ID `G8WscefcZhsVAJ3IWQo9N`, coincidente con il rilascio nell'handoff. Checkout `master`, commit `471db081f694cd179c401907b38427b3a59901ab`.

Chrome 155.0.8059.80, sessioni Playwright dedicate. Prima visita in un nuovo browser, reload senza esprimere preferenze, attivazione del link reale «Aggiorna preferenze cookie». CDP registra richieste, status, initiator e sorgenti eseguiti. Prova successiva su Prezzi con sostituzione della sola licenza nella risposta GTM ricevuta dal browser: questo override non modifica GTM o il sito pubblicati e non è uno smoke test della produzione corretta.

Nessun invio form, consenso accettato, pagamento, modifica di servizi, commit, push o deploy. Preservate le modifiche concorrenti a `package.json` e `package-lock.json`.

## Causa delle risposte 400

Il [contenitore GTM pubblico](https://www.googletagmanager.com/gtm.js?id=GTM-TCZR8HQP), risorsa con `version: "7"`, contiene il tag LegalBlink `tag_id: 7`, template `__cvt_258582000_6`, eseguito su `gtm.init_consent`:

```json
{
  "vtp_license_id": "license-id",
  "vtp_consent_mode": true,
  "vtp_tcf_enabled": true,
  "vtp_blocking_mode": "auto"
}
```

Il template scrive `window.__legalblink.config`, sovrascrivendone i campi con quelli del tag, e inietta il loader CMP. Il [loader pubblico LegalBlink](https://app.legalblink.it/api/scripts/cmp/loader.js) privilegia `window.__legalblink.config.licenseId` rispetto a `data-license-id`. Anche il componente banner legge la configurazione globale.

`src/components/SiteScripts.tsx` carica già lo stesso loader con la licenza reale `69e89f282420950024cb1a5e`. Il DOM acquisito contiene due script loader e due script banner; CDP osserva due esecuzioni del loader per documento. Il segnaposto arriva dal contenitore GTM pubblico; la licenza nel componente del sito è corretta.

## Riproduzione ed esperimento

| Condizione | Risultato osservato |
| --- | --- |
| Home, prima visita nel nuovo browser | Le due API iniziali usano la licenza reale e rispondono 200; GTM carica successivamente. Il banner contiene testi e controlli. |
| Home, reload nello stesso browser | Configurazione globale con `license-id`; API configurazione e autoblocker 400, con un retry ciascuna. Shadow DOM del banner con il solo stile del sito; nessun testo/controllo CMP nello snapshot. |
| Link preferenze dopo quel reload | La configurazione resta `license-id`; nessun contenuto CMP ripristinato nell'acquisizione successiva. |
| Prezzi, sola licenza corretta nella risposta diagnostica | Navigazione completa e reload: tutte le risposte LegalBlink registrate sono 200, configurazione globale con licenza reale e pulsanti CMP visibili in entrambe le acquisizioni. |

L'esperimento cambia **un solo campo**, lasciando TCF e doppio caricamento invariati. Il controllo verifica una sostituzione per risposta e due sostituzioni complessive. Sequenza e precedenza del loader spiegano la dipendenza dall'ordine di caricamento; non è misurata la frequenza del difetto fra tutti gli utenti.

## Intervento concreto proposto, ancora da applicare

Nel contenitore **GTM-TCZR8HQP**, tag LegalBlink identificato nel bundle da **tag_id 7**, sostituire il campo licenza `license-id` con `69e89f282420950024cb1a5e`. Conservare gli altri campi nella correzione circoscritta. Verificare prima in anteprima GTM prima visita, reload, navigazione client, chiusura e riapertura delle preferenze; pubblicare il contenitore soltanto con autorizzazione specifica. Non richiede un deploy Next/Cloudflare.

**La prova è un override browser; il servizio pubblico resta invariato. La correzione della licenza non risolve il doppio caricamento e non chiude PV-01.** Il tag GTM abilita TCF, mentre il contratto locale `SiteScripts.test.tsx` prevede Consent Mode senza abilitazione esplicita TCF. L'esperimento conserva il banner con 1229 partner e la richiesta GVL. Scegliere un'unica sede di configurazione CMP e decidere TCF richiede un intervento distinto, verificando flussi di consenso e tag dipendenti. Non disabilitare l'intero contenitore GTM come espediente.

## Tentativo di applicazione autorizzato

Dopo la diagnosi il committente ha richiesto «correggi?», autorizzando la correzione circoscritta della licenza GTM. La console GTM aperta nel browser collegato mostra zero contenitori con l'account corrente. Il committente ha poi autorizzato esplicitamente la verifica dell'altro account già connesso, Laura: anche questo mostra zero contenitori. Il contenitore `GTM-TCZR8HQP` non è quindi accessibile dalle due sessioni verificate. Nessun tag modificato, nessuna versione GTM creata o pubblicata, nessun deploy del sito. Il bundle pubblico prima del tentativo è conservato in `gtm-before-correction.js`. Scheda lasciata aperta per l'accesso del committente con l'account proprietario; la correzione resta da applicare.

## Richieste GUID

Acquisita l'esecuzione di `/<86AAF7CD-…>/main.js`, inizialmente 200 con MIME `application/x-javascript`. Il sorgente (155.451 caratteri) dichiara `AvNs`, `SIGNATURE`, `INJECT_ID` e `RESOURCE_ID`; avvia le richieste GUID `/init` e altri percorsi di sessione. Gli initiator CDP collegano quelle chiamate al sorgente. Alcune rispondono inizialmente 200, poi compaiono 404; al reload `main.js` risponde 404 con errore MIME.

L'initiator dello script è il parser del documento visto dal browser. L'HTML letto separatamente via HTTP non contiene quei GUID. È disponibile l'origine immediata delle chiamate, ma **non è identificato il componente che inserisce lo script**. Il solo nome `AvNs` non basta per attribuirlo a un prodotto, un'estensione o un antivirus. Nessun intervento su browser, protezioni locali o sito per questi URL.

## Ripresa del piano — verifica successiva del 19 ottobre

- **GTM:** nuova acquisizione del bundle pubblico, ancora `version: "7"`, tag LegalBlink 7 con `vtp_license_id: "license-id"`, TCF attivo e gli altri campi invariati. Prova locale `gtm-resume.js`, SHA-256 `98bcd0b60570e84c91fe47a00663f2c5aa59839e685f0f5b37d2dd1407f15245`. La sessione Laura nella scheda GTM collegata mostra ancora zero contenitori. Richiesto al committente di aprire l'account proprietario; nessun tag modificato o pubblicato. Non ripetuta la verifica dell'altro account, già documentata sopra.
- **Search Console:** l'account corrente apre `/search-console/welcome`, senza proprietà disponibili. Nessuna proprietà creata, sitemap inviata o indicizzazione richiesta. Configurazione API locale `~/.config/codex-seo/google-api.json` assente; lo script della skill è presente nella cartella `seo/scripts`, ma non eseguibile con il Python disponibile per assenza di `requests`. Nessuna dipendenza installata. Non attestate copertura, canonical Google, query o CWV.
- **GUID, nuova prova di provenienza:** confronto in sola lettura fra `guid-0.js` già acquisito e le librerie locali `/Library/Application Support/Kaspersky Lab/KAV/Binaries/libbi_facade.dylib` e `libplugins_facade.dylib`. Tutte le **351 righe univoche di almeno 60 byte**, esclusa la riga iniziale con identificativi runtime, sono presenti identiche in almeno una delle due librerie. Il controllo ripetibile `verify-guid-provenance.py` termina con successo; hash e metodo in `guid-local-provenance.json`. Questa corrispondenza attribuisce il codice acquisito ai componenti locali Kaspersky con evidenza forte, superando il solo indizio `AvNs` della prima diagnosi.
- **Limite dell'attribuzione:** il confronto testuale non traccia il processo che ha inserito lo script in quella risposta né spiega il passaggio 200→404. `codesign --verify` sulla prima libreria restituisce firma non valida per arm64: non attestata una firma valida o l'integrità dell'installazione; nessuna conclusione ulteriore su tale errore. Non disattivate protezioni, estensioni o impostazioni e non applicato alcun rimedio al sito per i GUID. Il fornitore [documenta l'iniezione di JavaScript nelle pagine](https://www.kaspersky.com/blog/tracking-ids-bug/27979/); questa fonte descrive il meccanismo generale, non certifica questa installazione.

Nessuna nuova misura prestazionale: prima serve correggere la licenza e decidere separatamente doppio caricamento/TCF. Nessun nuovo audit completo, codice applicativo, commit, push o deploy; documenti locali aggiornati preservando le modifiche concorrenti alle dipendenze. Test/build del sito non ripetuti per questa ripresa diagnostica.

## Prove e limiti

Acquisizioni locali ignorate da Git: `output/playwright/cmp-2026-10-19/`.

- `fresh-reload.json`: sequenza completa, initiator, sorgenti pertinenti e DOM.
- `gtm-public.js`, `http-home.html`: contenitore pubblico e HTML HTTP di confronto.
- `runtime-original.log`, `reopen-original.log`, `snapshot-after-reload.log`: configurazione errata e verifica funzionale.
- `license-experiment.json`: override della sola licenza, risposte e pulsanti visibili.
- `guid-0.js`: sorgente GUID eseguito; URL di sessione conservati solo nelle prove locali.
- `capture.js`, `check-license.js`, `guid-source.js`: script diagnostici; log CLI e snapshot in `cli/`.

Una prima acquisizione non ha restituito il JSON al chiamante; un successivo tentativo è terminato per timeout dello screenshot. Non sono usati come prove complete: il report si basa sulla nuova sessione con risultato JSON e sull'esperimento concluso. Il rettangolo dell'host del custom element non misura la visibilità del contenuto shadow: per l'esperimento sono usati i rettangoli dei pulsanti; per il difetto, snapshot e assenza di contenuto.

Nessuna nuova misura prestazionale, CWV, ranking, indicizzazione o prova Safari/dispositivi fisici. Test e build applicativi non rieseguiti: nessun sorgente applicativo modificato. Accettazione manuale riferita dal committente senza dettaglio di dispositivi o pagine. Screenshot autentici Food Cost, Ordini e Libro ingredienti ancora attesi. PV-01 e la correzione GTM restano aperti.

## Correzione pubblicata dal committente — aggiornamento successivo

Il committente ha seguito la procedura GTM e inviato schermate dell'anteprima: contenitore `GTM-TCZR8HQP`, tag LegalBlink CMP attivato una volta e pannello preferenze con testi, interruttori e pulsanti visibili. Dopo le istruzioni di chiusura, reload, riapertura e pubblicazione, ha confermato «ok fatto». Le schermate mostrano la resa del pannello; la conferma del reload resta riferita dal committente.

Nuova lettura diretta del bundle GTM pubblico: **risorsa versione 8**, tag 7 con `vtp_license_id: "69e89f282420950024cb1a5e"`. Confronto automatico con il tag della versione 7: unica differenza nel tag LegalBlink è la licenza, da `license-id` al valore corretto; Consent Mode, TCF, blocking mode e altri campi invariati. Controllo concluso con successo. Prove locali: `gtm-after-user-fix.js` e `gtm-after-user-fix.json`; SHA-256 del bundle `ff7e7d402a564dca68473c0c32edea2347bb7cc8fa0cc3668f8283d74ab8e97f`.

**La correzione della licenza è ora pubblicata e verificata nella configurazione pubblica.** Non ripetuta in questo passaggio una sessione browser pubblica pulita su prima visita, reload e navigazione client; nessuna nuova misura mobile. Doppio caricamento, scelta finale della configurazione unica CMP e PV-01 restano aperti. La [guida LegalBlink](https://legalblink.it/post/nuovo-banner-cookie-inserimento-in-tag-manager-versione-beta.html), indicata dal committente, richiede il template ufficiale con Consent Initialization – All Pages e segnala i conflitti fra installazione GTM e diretta nel sito. Non applicate modifiche al codice del sito; nessun commit, push o deploy del sito eseguito.

## Installazione unica tramite GTM — fix locale successivo

Il committente ha chiesto di procedere con la rimozione del doppio caricamento mantenendo GTM, dopo aver indicato la guida LegalBlink. Rimosso soltanto lo `<Script id="legalblink-cmp">` diretto da `src/components/SiteScripts.tsx`. Rimangono il bootstrap GTM, il trigger persistente `data-lb="c-settings"` prima del bootstrap, il collegamento del footer e il tema Traccia con observer e retry. Configurazione CMP affidata al tag GTM già pubblicato: Consent Mode e TCF restano attivi come nella versione 8, senza nuove modifiche remote. Aggiornata la relativa indicazione in `CLAUDE.md`.

Test di regressione: l'aspettativa di assenza del loader diretto fallisce prima della modifica; dopo la rimozione la suite passa con **133 test Vitest e 3 controlli commerciali**. Il precedente controllo di ordine fra i due loader è stato rimosso perché non esistono più due loader; il trigger rimane verificato prima di GTM. ESLint sui due file coinvolti e `tsc --noEmit --incremental false` nel checkout completati senza errori. La suite emette anche messaggi jsdom di navigazione non implementata e warning sperimentali Node su localStorage; nessun test fallito.

Verifica Chrome sull'anteprima Next dev isolata `http://127.0.0.1:3057`, senza copiare file ambiente né toccare le anteprime altrui. Profilo Chrome collegato condiviso, **non un nuovo browser pulito**. File di componente e test confrontati con il checkout tramite hash:

- Apertura Home: nel DOM un solo loader CMP, un solo bundle banner e un solo `lb-cookie-banner`, con testi e controlli.
- Reload Home e reload Prezzi: cinque risposte LegalBlink per documento (loader, banner, autoblocker, configurazione e GVL), tutte **200**, licenza reale nelle API.
- Chiusura tramite il pulsante reale e riapertura dal footer riuscite; popup newsletter chiuso con il suo pulsante reale, senza iscrizione o alterazioni dello storage a mano.
- Navigazione client Home→Prezzi: nessuna richiesta Document e nessuna nuova richiesta del loader CMP; nel DOM restano un loader e un banner. Riapertura preferenze dopo il rimontaggio del footer riuscita.
- Su Prezzi dopo reload, riapertura da tastiera tramite Return sul link accessibile riuscita; tema `labmanager-legalblink-theme` presente. Primo tentativo tramite comando locator non aveva attivato il link, ripetuto con focus e comando nativo. Resa del pannello ispezionata nello screenshot del browser.

**Limite della build:** con le dipendenze attualmente installate (Next 16.4.2), la build Next con Webpack nella copia isolata compila ma fallisce nel controllo dei tipi delle route per esportazioni non ammesse: `structuredDataGraph` nel layout, `newsletterPageStructuredData`, `ordersPageStructuredData` e `pricingMagazzinoFeature`. Riprodotto su una build pulita con `SiteScripts.tsx` originale da HEAD: stesso blocco, quindi non introdotto dalla rimozione del loader. Nessuna modifica a tali route o alle dipendenze concorrenti. Il primo tentativo di build nel sandbox era fallito sull'apertura del proxy locale Cloudflare; il controllo con porta autorizzata ha raggiunto e mostrato gli errori sopra. Build Webpack scelta per la copia isolata che condivide `node_modules` tramite symlink. Non attestata una build OpenNext/workerd della modifica.

Prove locali ignorate in questa cartella: `gtm-only-local-verification.json`, `gtm-only-baseline-build.log` e `gtm-only-candidate-build.log`. L'anteprima dedicata è stata arrestata dopo i controlli; le porte delle altre sessioni sono preservate. Nessun invio form o accettazione marketing. **Fix locale verificato nel browser, non pubblicato.** Prestazioni mobile e CWV non rimisurati; la GVL continua a essere caricata.

## Chiusura documentale e commit richiesto

Il committente ha richiesto l'aggiornamento dei documenti e il commit, indicando push e tentativo deploy come passo successivo. Il commit associato a questo aggiornamento include soltanto fix CMP, test, CLAUDE e documenti di continuità; hash e file effettivi sono verificabili con Git. `package.json` e `package-lock.json` concorrenti restano esclusi e preservati.

**Distinzione necessaria per il prossimo rilascio:** i controlli locali sopra usano le dipendenze installate con Next **16.4.2**; la build è stata eseguita con **Webpack** nella copia isolata. Il manifest/lock versionato del commit conserva Next **16.2.10** e non è stato nuovamente installato o collaudato in questa chiusura. Il confronto baseline/candidata dimostra che la rimozione del loader non introduce quegli errori nel contesto locale provato; non certifica l'esito della futura build con il lock versionato. Prima della pubblicazione verificare tale contesto e OpenNext/workerd, poi seguire la pipeline del solo Worker `labmanager-website`. Nessun push o deploy del sito eseguito in questa chiusura.

## Verifica successiva del lock committato

La verifica richiesta dopo il commit `0fa9e6e` è conclusa: installazione autonoma dal lock, 133 test Vitest + 3 controlli commerciali, lint, build Next/Turbopack e OpenNext completa, dry-run e 11 controlli HTTP workerd tutti riusciti. Le esportazioni di route restano intatte; il precedente errore Next 16.4.2/Webpack non si riproduce nella build con Next 16.2.10. [Provenienza, comandi, tentativi intermedi e limiti](LOCKED-BUILD-VERIFICATION.md). Rapporto e riferimenti aggiornati sono raccolti nel successivo commit documentale richiesto, senza push o deploy. La prova browser CMP precedente e lo smoke HTTP workerd corrente sono distinti; nessuna nuova misura mobile o prova pubblica.
