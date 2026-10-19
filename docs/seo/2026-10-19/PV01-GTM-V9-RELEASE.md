# PV-01 — pubblicazione GTM versione 9, 19 ottobre 2026

**Pubblicata e verificata la versione 9 «CMP: Consent Mode senza TCF».** Il committente ha confermato esplicitamente la pubblicazione della singola modifica. TCF disattivato nel tag LegalBlink 7, Google Consent Mode mantenuto. La GVL non viene più richiesta; il trasferimento CMP diminuisce del **36,1%**, ma **il LCP Prezzi resta alto e PV-01 rimane aperto**.

## Rilascio e controllo della configurazione

- Contenitore **GTM-TCZR8HQP**, versione **9**, pubblicazione **19 ottobre 2026, 17:46:49 Europe/Rome**, dal Default Workspace 9 del profilo Chrome **Labmanager**. Un tag modificato, nessuno aggiunto/eliminato. UI GTM: «La versione 9 è disponibile online»; scheda versione con nome e descrizione verificata e acquisita.
- Dopo il clic autorizzato su Pubblica, letto il bundle [GTM pubblico](https://www.googletagmanager.com/gtm.js?id=GTM-TCZR8HQP): versione 9, `vtp_tcf_enabled: false`, `vtp_consent_mode: true`. Confrontato **l'intero oggetto resource** con la copia v8: sole differenze il numero versione e il flag TCF del tag 7. Licenza, default, Meta, trigger, macro e regole identici. SHA-256 acquisita: `7325601ae3bfb7ee266690eaf994d8f9bee3b570061ca5bf12ed9c0269757ddd`.
- BUILD_ID del sito `_ydy_dmUjew6BEDreHjAX`, invariato anche prima/dopo le misure. Nessun commit, push, build o deploy del sito: è una pubblicazione GTM. Sorgenti applicativi e dipendenze concorrenti preservati.
- [Preparazione, confronto della bozza e anteprima](PV01-CMP-OPTIONS.md) conservano le prove precedenti. L'accesso era nel profilo Chrome Labmanager; gli elenchi vuoti dell'altro profilo esposto dall'estensione non erano una prova di assenza di permessi.

## Smoke sul sito pubblico, senza anteprima

Debug Tag Assistant già arrestato, sito aperto con URL normali nel Chrome proprietario. Il profilo conserva la preferenza pubblicitaria negata nella verifica precedente:

- Prezzi: preferenze riapribili, sole categorie tecniche/pubblicitarie, pubblicità off; nessun tab Vendor o switch TCF.
- Reload: banner non riaperto automaticamente, preferenze riapribili e pubblicità ancora off. Alla chiusura il focus torna al link del footer; **Return** riapre correttamente il pannello.
- Navigazione tramite collegamento reale Prezzi→Ricette e Food Cost: pannello riapribile dopo cambio pagina, pubblicità off e TCF assente.
- Conservati screenshot e AX; chiusa soltanto la scheda del sito creata per lo smoke e lasciata la pagina della versione 9 in GTM. Nessun nuovo consenso marketing espresso, form, iscrizione o pagamento eseguito. Il test UI pubblico non intercetta SDK o log e non certifica la consegna delle conversioni o l'arresto del vero SDK dopo revoca.

Le quattro prove isolate di accettazione/revoca desktop/mobile e l'anteprima con preferenza già salvata sono evidenze precedenti distinte, descritte nel rapporto della candidata. Lo smoke pubblico non equivale a un nuovo collaudo completo su tutti i dispositivi.

## Sei nuove misure mobile di prima visita

Eseguite **tre misure per pagina**, includendo tutti i campioni. Un Chrome nuovo con profilo temporaneo per ciascuna misura, nessuna scelta preventiva e nessun override, anteprima o blocco degli script. Lighthouse **13.4.0**, Chrome **155**, impostazioni verificate identiche alla serie v8: 412×823, DPR 1,75, RTT simulato 150 ms, throughput 1638,4 Kbps, CPU ×4, `disableStorageReset: true` su profili nuovi. Nessuna misura Lighthouse concorrente; smoke UI eseguito dopo la serie.

Serie fra **17:48:35 e 17:49:29 Europe/Rome**, build invariata. Confronto limitato alle **prime visite** della [serie v8 precedente](PV01-POST-RELEASE-MEASUREMENTS.md); i ritorni con cache conservata non sono stati rimisurati.

| Pagina | Tre LCP v9 (s) | Mediana v9 / v8 | CLS massimo v9 | TBT massimo v9 |
| --- | --- | --- | --- | --- |
| Home | 2,78 / **8,08** / 2,75 | **2,78 / 2,70 s** | 0,01137 | 17,5 ms |
| Prezzi | 9,18 / 7,87 / 8,83 | **8,83 / 9,10 s** | 0,01033 | 49 ms |

Prezzi: elemento LCP sempre il paragrafo del banner; Home: sempre la fotografia hero. Nessun errore runtime o warning Lighthouse nei sei report. Ventiquattro risposte CMP raccolte, tutte 200; **quattro risorse per misura**, un loader e nessuna GVL. Bundle banner invariato, **751.312 B decodificati**.

Mediana del trasferimento delle sole risorse LegalBlink alla prima visita: **396.108 B nella v8 → 253.177 B nella v9**, riduzione **36,1%**. Sono byte CMP, non il peso totale della pagina. La rimozione della GVL è direttamente verificata; il caricamento iniziale mantiene l'intero bundle banner.

**Nessun miglioramento LCP affidabile:** mediana Prezzi circa il 3% più bassa, Home sostanzialmente uguale e un campione Home a 8,08 s, conservato e non scartato. Le serie sono separate nel tempo; in tutte le sei misure v9 compaiono le richieste GUID già diagnosticate (**18 richieste, 12 risposte 404**). La variabilità e le interferenze locali non consentono di attribuire un piccolo scostamento al solo flag TCF. Non dichiarare una regressione certa dalla singola Home lenta né il superamento dei Core Web Vitals: nessuna nuova misura indipendente, CrUX o INP ottenuta.

## Stato e passo successivo

**Pubblicazione richiesta conclusa; ottimizzazione PV-01 ancora aperta.** Mantenere separati il risultato funzionale (modalità senza TCF, consensi e comandi verificati), la riduzione dei byte CMP e il LCP ancora problematico. Il prossimo approfondimento resta bundle/percorso iniziale della CMP con il fornitore e conferma da ambiente indipendente senza interferenze GUID. Nessuna ulteriore modifica ai tag, al sito o al servizio è stata eseguita per inseguire il punteggio.

Test/build applicativi non ripetuti perché non è cambiato codice del sito. Non riprovata l'API PageSpeed dopo il precedente limite di quota giornaliera. Restano screenshot autentici e accesso Search Console come dipendenze distinte.

## Prove

Locali e ignorate da Git, da rigenerare in un clone nuovo:

- `output/playwright/pv01-external-2026-10-19/`: `gtm-version9-published.png` / `.txt`, `gtm-public-v9.js`, `gtm-resource-v9.json`, `public-after-publication.json`, insieme alle prove della bozza e dell'anteprima.
- `output/playwright/pv01-gtm-v9-2026-10-19/`: `release-verification.json`, `measure-fresh.mjs`, log, sei JSON Lighthouse, trace/DevTools e schermate del primo campione per pagina, `summary.json`, `validated-summary.json`, BUILD_ID iniziale/finale, screenshot e AX dello smoke pubblico.

Lo script verifica numero di campioni, assenza di errori runtime, impostazioni identiche alla baseline, loader unico, assenza GVL, quattro risorse CMP con status 200 e build stabile. Le verifiche successive dei JSON confermano mediane, dimensioni del bundle, conteggi GUID e tutti i campioni conservati. Nessun invio al fornitore e nessuna nuova pubblicazione oltre alla v9 autorizzata.
