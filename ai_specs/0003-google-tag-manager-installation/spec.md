---
type: Spec
title: Installazione di Google Tag Manager nel sito LabManager
---

## Problem

Il sito LabManager non include ancora il container Google Tag Manager `GTM-TCZR8HQP`. Il sito usa già il banner cookie LegalBlink, mentre la pagina `/instagram` è intenzionalmente priva di banner e strumenti esterni. [L1] [L2]

## Proposed Outcome

Google Tag Manager è disponibile nelle pagine del sito coperte dal banner cookie. Il banner viene caricato prima di Tag Manager, così le scelte del visitatore restano prioritarie. La pagina `/instagram` continua a non caricare né il banner né Tag Manager. [L1] [L2]

## Requirements

1. Installare il container `GTM-TCZR8HQP` nelle pagine del sito, esclusa `/instagram`. [L1] [L2]
2. Caricare LegalBlink prima di Google Tag Manager.
3. Includere le due parti richieste da Google: il caricamento principale e la parte di supporto per i browser senza JavaScript.
4. Consentire nelle regole di sicurezza del sito solo i collegamenti Google necessari al funzionamento di Tag Manager.
5. Non modificare il contenuto del container dal repository.
6. Non pubblicare il sito: la modifica deve fermarsi a implementazione e verifica locale.

## Technical Decisions

1. Riutilizzare il componente che gestisce gli script esterni, perché contiene già l'esclusione di `/instagram` e il banner LegalBlink.
2. Non aggiungere un nuovo pacchetto: l'integrazione è piccola e deve seguire il codice ufficiale fornito da Google.
3. Mantenere l'identificativo del container in una sola costante per evitare differenze tra le due parti dell'installazione.
4. Estendere la configurazione di sicurezza centralizzata in `next.config.ts` invece di aggiungere regole in altri file.

## Testing Strategy

1. Aggiungere un controllo automatico che verifichi l'identificativo del container, entrambe le parti dell'installazione, l'ordine dopo LegalBlink e l'esclusione di `/instagram`.
2. Verificare che le regole di sicurezza permettano il caricamento di Tag Manager.
3. Eseguire test, controllo del codice e build locale.
4. Dopo una futura pubblicazione, usare il test offerto da Google Tag Manager sul dominio `https://labmanagergestionale.com`.

## Out of Scope

- Configurazione di Google Analytics, pubblicità, conversioni o altri tag nel pannello Google Tag Manager.
- Modifiche al comportamento del banner cookie o alla pagina `/instagram`.
- Pubblicazione del container Google Tag Manager o deploy del sito.

