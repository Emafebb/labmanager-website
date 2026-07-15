---
type: Work Item
title: Allineare il manuale delle risposte WhatsApp
parent: ../spec.md
---

## What to build

Aggiornare `/Users/emanuele/Documents/github/Labmanager/docs/assistenza-clienti/whatsapp-risposte-rapide.md` dopo il riposizionamento del sito. Separare in modo esplicito i messaggi commerciali e di onboarding della web app dall'assistenza riservata ai clienti legacy; riallineare copy, collegamenti e istruzioni di sostituzione nello screenshot.

## Required context

- Questo Work Item è archiviato nella spec del sito perché ne estende il posizionamento commerciale, ma modifica soltanto il manuale operativo nel repository Labmanager.
- Le risposte commerciali devono rispettare la matrice CTA: WhatsApp è assistenza/conversazione, non un invito alla prova o un canale broadcast.
- Le istruzioni tecniche legacy possono restare solo come supporto per clienti esistenti, senza essere presentate come proposta per nuovi contatti.
- Non modificare la configurazione di WhatsApp Business, il sito, la web app o il comportamento delle installazioni legacy.

## Acceptance criteria

- [x] Il manuale distingue chiaramente **Commerciale e onboarding web app** e **Assistenza clienti legacy**.
- [x] I messaggi commerciali presentano LabManager per pasticcerie, panifici e gelaterie attraverso ricette e Food Cost, produzione ed etichette, magazzino, ordini e piano di lavoro.
- [x] I messaggi commerciali non promuovono Android, Windows, offline, sincronizzazione, download, ristorazione, demo, DDT o capacità non approvate dalla spec del sito.
- [x] I messaggi che rinviano a una risorsa usano soltanto la web app, `/pricing` o `/newsletter` nel contesto appropriato e non invitano più a richiedere un link per il download.
- [x] Prezzo e prova riportano soltanto le condizioni pubbliche approvate; WhatsApp non è proposto come canale per avviare la prova.
- [x] `offline`, `dispositivi`, `sync`, `stampa` e `dettagli` restano disponibili e identificati come supporto legacy per clienti esistenti; `dettagli` non richiede la versione Android o Windows.
- [x] Il messaggio Newsletter non promette disponibilità di versioni native né un invio automatico per ogni release.
- [x] Il blocco di sostituzione delle risposte nello screenshot riporta testi commerciali aggiornati e non propone `offline` come risposta commerciale.
- [x] Una revisione testuale conferma l'assenza dei claim vietati dalla sezione commerciale, gli URL corretti e la separazione delle risposte legacy.

## Covers

- Requirements: 1-3, 11, 19, 21
- Testing Strategy: 2, 4
- Interview Ledger: L1-L3, L6, L9-L11

## Blocked by

None - ready to start
