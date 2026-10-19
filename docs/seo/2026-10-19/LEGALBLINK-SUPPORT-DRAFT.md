# Bozza per il supporto LegalBlink — 19 ottobre 2026

**Stato: bozza locale, non inviata.** Destinazione prevista: supporto tecnico CMP LegalBlink; indirizzo o ticket da scegliere al momento dell'invio. Le misure citate sono quelle già raccolte il 19 ottobre, non una nuova serie indipendente.

## Testo proposto

**Oggetto: CMP su labmanagergestionale.com — caricamento iniziale mobile e peso del banner**

Buongiorno,

vorremmo un vostro riscontro tecnico sul caricamento iniziale della CMP su queste pagine:

- https://labmanagergestionale.com/
- https://labmanagergestionale.com/pricing

Il sito pubblico è realizzato in Next.js e pubblicato su Cloudflare Workers. La CMP viene caricata una sola volta, tramite il vostro template ufficiale in Google Tag Manager, contenitore `GTM-TCZR8HQP`. Nella versione 9, pubblicata il 19 ottobre 2026, abbiamo disattivato TCF mantenendo Google Consent Mode attivo. Il ritardo configurato del banner è zero.

Nelle tre misure Lighthouse mobile di prima visita per pagina, successive alla pubblicazione, abbiamo osservato:

| Pagina | LCP dei tre campioni | Mediana | Elemento LCP |
| --- | --- | --- | --- |
| Home | 2,78 / 8,08 / 2,75 s | 2,78 s | Fotografia hero |
| Prezzi | 9,18 / 7,87 / 8,83 s | 8,83 s | Paragrafo del banner CMP |

I sei campioni usano Lighthouse 13.4.0, Chrome 155, viewport 412×823, DPR 1,75, rete simulata con RTT 150 ms e throughput 1638,4 Kbps, CPU ×4. Ogni campione parte da un profilo temporaneo nuovo, senza preferenze già espresse, senza bloccare o modificare gli script.

Tutte le 24 risposte delle risorse LegalBlink raccolte hanno stato 200, con un loader e quattro risorse CMP per campione. TCF disattivato elimina la richiesta GVL e riduce il trasferimento CMP mediano da 396.108 a 253.177 byte rispetto alla serie precedente. Il bundle `https://app.legalblink.it/api/scripts/cmp/v1.0.5/banner.js` resta di 751.312 byte decodificati. La riduzione del trasferimento non ha prodotto un miglioramento LCP affidabile.

Le misure provengono da un computer con richieste GUID aggiuntive attribuite a componenti locali Kaspersky; alcune restituiscono 404. Stiamo quindi cercando una conferma da un ambiente indipendente: questi risultati indicano un punto da approfondire, ma non dimostrano che il ritardo sia interamente causato dalla CMP. Non abbiamo ancora dati Core Web Vitals sul campo per questa versione.

Potreste verificare il percorso iniziale sul dominio e indicarci:

1. Se, nella modalità senza TCF e con Consent Mode attivo, sia previsto scaricare l'intero bundle banner e quali dipendenze debbano completarsi prima della sua visualizzazione.
2. Se esistano una versione o una configurazione ufficialmente supportate per ridurre JavaScript e tempi di comparsa su mobile, preservando consenso, registrazione delle scelte e riapertura delle preferenze.
3. Se possiate ripetere una prima visita mobile da un vostro ambiente e condividere risorse, tempi e configurazione consigliata.

Possiamo fornire i report Lighthouse e le trace pertinenti dopo averne verificato il contenuto. Restiamo disponibili a confrontare una vostra proposta con la configurazione attuale.

Grazie.

## Riferimenti interni, da non includere nel messaggio

I tre rapporti sotto sono documenti locali preesistenti, esclusi dal commit circoscritto alla verifica Search Console e a questa bozza.

- [Rilascio v9 e sei misure](PV01-GTM-V9-RELEASE.md): risultati, metodo e interferenze locali.
- [Serie v8 precedente](PV01-POST-RELEASE-MEASUREMENTS.md): distinzione prima visita/ritorno e cache.
- [Diagnosi e opzioni CMP](PV01-CMP-OPTIONS.md): bundle, ritardo configurato e percorso GVL.
- Prove locali ignorate da Git: `output/playwright/pv01-gtm-v9-2026-10-19/` e `output/playwright/pv01-external-2026-10-19/`.

Nessun allegato preparato o caricato e nessun invio effettuato. L'eventuale risposta del fornitore va valutata prima di applicare nuove configurazioni o pubblicazioni.
