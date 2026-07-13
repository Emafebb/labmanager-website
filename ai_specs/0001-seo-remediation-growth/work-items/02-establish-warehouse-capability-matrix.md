---
type: Work Item
title: Introdurre la matrice Magazzino e riconciliare i claim
parent: ../spec.md
---

## What to build
Creare `src/data/magazzino-capability-matrix.ts` come sorgente di verità Magazzino v1 tipizzata, versionata e leggibile dai test. Allineare Warehouse, Hero, FAQ, pricing, changelog, `public/llms.txt` e i dati condivisi alla matrice, rimuovendo i claim non approvati o associando esplicitamente ogni claim pubblico a una voce approvata.

## Required context
- La matrice v1 è stata approvata dal committente il 13 luglio 2026.
- Il copy canonico è: “Gestione magazzino con ricevimento merci, giacenze per sede, soglie configurabili, scarico FIFO, alert scadenze e trasferimenti tra sedi.”
- Changelog e note di rilascio possono fornire evidenza, ma non autorizzano da soli un claim pubblico.

## Acceptance criteria
- [x] `src/data/magazzino-capability-matrix.ts` definisce ID stabili, copy consentito, approvatore, data di approvazione e superfici obbligatorie per ogni claim.
- [x] La matrice registra come disponibili e pubblicizzabili soltanto ricevimento merci, giacenze per sede, soglie configurabili, scarico FIFO, alert scadenze e trasferimenti tra sedi.
- [x] Il modulo esporta il copy canonico condiviso e strutture sufficientemente tipizzate da essere importate direttamente dai test e dalle superfici applicative.
- [x] Warehouse, Hero, FAQ visibile, pricing, changelog/note di rilascio, `public/llms.txt` e i dati SoftwareApplication condivisi sono riconciliati contro la matrice.
- [x] Ogni claim Magazzino pubblico è tracciabile a un ID della matrice; claim non inclusi, compresi fornitori, barcode/ricevimento, collocazioni e prelievi, sono rimossi invece di essere ricondotti implicitamente alle sei capacità.
- [x] FAQ visibile e dati destinati a FAQPage derivano dalla stessa sorgente, e ogni risposta relativa al Magazzino usa la matrice v1.
- [x] I test coprono struttura e contenuto della matrice, superfici obbligatorie, coerenza cross-surface e rifiuto di claim Magazzino non mappati.
- [x] `npx vitest run`, `npm run lint` e `npm run build` passano.

## Covers
- User Stories: 2, 4
- Requirements: 3-4, 11
- Testing Strategy: 2, 5
- Interview Ledger: L1, L3, L4, L6, L13

## Blocked by
None - ready to start

## Implementation evidence

- Sorgente di verità: `src/data/magazzino-capability-matrix.ts`, con i sei ID `magazzino.*`, governance, superfici obbligatorie e copy canonico condiviso.
- Superfici riconciliate: Warehouse, Hero, FAQ/FAQPage, pricing, changelog, `public/llms.txt` e grafo SoftwareApplication. `/aggiornamenti` espone anche l'insieme completo tramite `data-magazzino-claim-ids`.
- Verifica live del 13 luglio 2026, 14:10 CEST: il copy canonico compare su homepage, pricing e `llms.txt`; `/aggiornamenti` espone esattamente i sei ID approvati; `llms.txt` contiene gli stessi sei ID.
- Test dedicati: `src/data/magazzino-capability-matrix.test.tsx`, inclusi allowlist delle capacità, superfici obbligatorie e rifiuto dei claim non mappati.
- Verifica finale: `npx vitest run` (`53` test passati), `npm run lint` e `npm run build` passati il 13 luglio 2026.
