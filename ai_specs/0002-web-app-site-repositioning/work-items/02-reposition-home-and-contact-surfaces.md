---
type: Work Item
title: Riposizionare la Home e le superfici di contatto
parent: ../spec.md
---

## What to build
Riallineare la Home al pubblico dei laboratori artigianali alimentari e ai quattro pilastri approvati. Aggiornare Hero, Funzionalità, anteprima Ordini, Magazzino, FAQ e contatti; rimuovere dalla composizione le sezioni Piattaforme e Perché LabManager e conservare il contratto responsive dell'immagine hero con semantica pubblica neutra.

## Required context
- La Hero cita il Magazzino soltanto nel testo generale e non ripete il copy canonico. La sezione dedicata e la FAQ continuano a derivare da `src/data/magazzino-capability-matrix.ts`; i sei ID non cambiano e `hero` non è più una superficie obbligatoria.
- I nomi tecnici degli asset possono conservare “android”; test e revisione devono osservare DOM, alt text e semantica pubblica, non i filename interni.
- Il Piano Light e una landing Food Cost sono fuori scope.
- Questo Work Item prepara e verifica modifiche locali; non autorizza deploy o pubblicazione.

## Acceptance criteria
- [x] La Hero rende l'H1, il testo e le due CTA esatti del requisito 6, senza badge, pillole o copy legacy su piattaforme, offline, cloud o compatibilità.
- [x] La Hero non rende il blocco, il copy canonico o gli attributi dei claim Magazzino, che restano disponibili nella sezione dedicata e nella FAQ.
- [x] L'immagine hero telefono + desktop e il suo contratto responsive/preload restano funzionanti; alt text, commenti pubblicamente osservabili e dati semantici non nominano sistemi operativi né promettono compatibilità.
- [x] La Home presenta chiaramente Ricette e Food Cost, Produzione ed Etichette, Magazzino, Ordini e Piano di Lavoro usando soltanto capacità approvate.
- [x] Le sezioni Piattaforme e Perché LabManager non sono più renderizzate e non vengono sostituite con confronti o promesse non verificabili.
- [x] L'anteprima Ordini può restare e conduce alla landing Ordini senza introdurre cassa, fatturazione o contabilità come prodotto.
- [x] La Home contiene esattamente le sei FAQ del requisito 18; FAQ visibile e FAQPage derivano dalla stessa sorgente.
- [x] La FAQ Magazzino usa il copy canonico e i sei claim; “2 sessioni attive simultanee” e le FAQ legacy proibite sono assenti dalla Home.
- [x] La risposta su prezzo e disdetta usa soltanto la formulazione approvata e non promette rimborsi, prorata o condizioni non decise.
- [x] Il blocco contatti usa “Hai domande? Parla con noi”, conserva form, privacy, consenso Newsletter facoltativo e WhatsApp e rimuove demo, risposta entro 24 ore e “team disponibile”.
- [x] Test di rendering coprono H1, copy hero, assenza del dettaglio Magazzino nella Hero, quattro pilastri, matrice Magazzino sulle superfici rimanenti, rimozione delle sezioni legacy, CTA, FAQ/FAQPage e immagine responsive con alt neutro.
- [x] Il DOM marketing della Home non contiene Android, Windows, offline, PWA, ristoranti o altri claim vietati, escluse soltanto le occorrenze tecniche non renderizzate ammesse dalla Spec.
- [x] `npx vitest run`, `npm run lint`, `npm run build` e `npx opennextjs-cloudflare build` passano.
- [x] Dopo build o preview, i title HTML di Home, Ordini e Prezzi corrispondono esattamente alla Spec, senza doppio suffisso `| LabManager`.

## Covers
- User Stories: 1-2
- Requirements: 1-8, 18-19
- Testing Strategy: 1, 6-7
- Interview Ledger: L1-L4, L6-L9, L15, L17

## Blocked by
01-align-navigation-footer-cta-matrix.md
