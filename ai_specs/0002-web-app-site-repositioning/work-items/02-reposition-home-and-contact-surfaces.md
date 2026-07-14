---
type: Work Item
title: Riposizionare la Home e le superfici di contatto
parent: ../spec.md
---

## What to build
Riallineare la Home al pubblico dei laboratori artigianali alimentari e ai quattro pilastri approvati. Aggiornare Hero, Funzionalità, anteprima Ordini, Magazzino, FAQ e contatti; rimuovere dalla composizione le sezioni Piattaforme e Perché LabManager e conservare il contratto responsive dell'immagine hero con semantica pubblica neutra.

## Required context
- Il copy Magazzino della Hero e della FAQ deve continuare a derivare da `src/data/magazzino-capability-matrix.ts`; i sei ID e `requiredSurfaces` non cambiano.
- I nomi tecnici degli asset possono conservare “android”; test e revisione devono osservare DOM, alt text e semantica pubblica, non i filename interni.
- Il Piano Light e una landing Food Cost sono fuori scope.
- Questo Work Item prepara e verifica modifiche locali; non autorizza deploy o pubblicazione.

## Acceptance criteria
- [ ] La Hero rende l'H1, il testo e le due CTA esatti del requisito 6, senza badge, pillole o copy legacy su piattaforme, offline, cloud o compatibilità.
- [ ] Il blocco Magazzino della Hero usa il copy canonico e tutti i sei ID della matrice senza aggiungere claim non approvati.
- [ ] L'immagine hero telefono + desktop e il suo contratto responsive/preload restano funzionanti; alt text, commenti pubblicamente osservabili e dati semantici non nominano sistemi operativi né promettono compatibilità.
- [ ] La Home presenta chiaramente Ricette e Food Cost, Produzione ed Etichette, Magazzino, Ordini e Piano di Lavoro usando soltanto capacità approvate.
- [ ] Le sezioni Piattaforme e Perché LabManager non sono più renderizzate e non vengono sostituite con confronti o promesse non verificabili.
- [ ] L'anteprima Ordini può restare e conduce alla landing Ordini senza introdurre cassa, fatturazione o contabilità come prodotto.
- [ ] La Home contiene esattamente le sei FAQ del requisito 18; FAQ visibile e FAQPage derivano dalla stessa sorgente.
- [ ] La FAQ Magazzino usa il copy canonico e i sei claim; “2 sessioni attive simultanee” e le FAQ legacy proibite sono assenti dalla Home.
- [ ] La risposta su prezzo e disdetta usa soltanto la formulazione approvata e non promette rimborsi, prorata o condizioni non decise.
- [ ] Il blocco contatti usa “Hai domande? Parla con noi”, conserva form, privacy, consenso Newsletter facoltativo e WhatsApp e rimuove demo, risposta entro 24 ore e “team disponibile”.
- [ ] Test di rendering coprono H1, copy hero, quattro pilastri, matrice Magazzino, rimozione delle sezioni legacy, CTA, FAQ/FAQPage e immagine responsive con alt neutro.
- [ ] Il DOM marketing della Home non contiene Android, Windows, offline, PWA, ristoranti o altri claim vietati, escluse soltanto le occorrenze tecniche non renderizzate ammesse dalla Spec.
- [ ] `npx vitest run`, `npm run lint`, `npm run build` e `npx opennextjs-cloudflare build` passano.
- [ ] Dopo build o preview, i title HTML di Home, Ordini e Prezzi corrispondono esattamente alla Spec, senza doppio suffisso `| LabManager`.

## Covers
- User Stories: 1-2
- Requirements: 1-8, 18-19
- Testing Strategy: 1, 6-7
- Interview Ledger: L1-L4, L6-L9, L15

## Blocked by
01-align-navigation-footer-cta-matrix.md
