---
type: Work Item
title: Riallineare la pagina Prezzi
parent: ../spec.md
---

## What to build
Rendere `/pricing` la valutazione completa dell'offerta corrente: un solo piano, €44,99/mese o €480/anno, prova di 14 giorni senza carta e benefici annuali confermati. Eliminare onboarding/download nativi, offline, team e riferimenti ai dispositivi; confinare “2 sessioni attive simultanee” alla pagina e alla sua FAQ.

## Required context
- Le due sessioni private 1:1 e il supporto prioritario sono benefici confermati della modalità annuale.
- La struttura può restare estendibile, ma nessun contenuto del futuro Piano Light può essere renderizzato o serializzato.
- Il copy Magazzino continua a derivare dalla matrice esistente.
- Questo Work Item prepara e verifica modifiche locali; non autorizza deploy o pubblicazione.

## Acceptance criteria
- [x] La pagina mostra un solo piano completo con €44,99/mese e €480/anno e una prova gratuita di 14 giorni senza carta.
- [x] La modalità annuale mostra due sessioni private 1:1 e supporto prioritario senza trasformarli in claim di team o onboarding nativo.
- [x] “2 sessioni attive simultanee” compare soltanto nel contenuto Prezzi e nella sua FAQ, con la dicitura esatta e mai come “2 dispositivi”.
- [x] Piano Light, confronti tra piani, CTA o dati strutturati relativi a un secondo piano sono assenti.
- [x] Download, installazione, Android, Windows, offline, sincronizzazione, team e compatibilità per dispositivo sono assenti dalle superfici pubbliche della route.
- [x] “Registrati per una prova gratuita” punta direttamente alla web app nella stessa scheda.
- [x] Il title è esattamente “Prezzi e prova gratuita | LabManager” e la description è esattamente quella del requisito 27.
- [x] Description, Open Graph e Twitter non includono prezzi, numero di piani o benefici annuali; canonical e Open Graph URL identificano `/pricing`.
- [x] Il WebPage page-scoped rappresenta il contenuto visibile, non emette `Offer` e conserva i claim Magazzino approvati.
- [x] Un test dedicato verifica prezzi, prova senza carta, benefici annuali, CTA, sessioni simultanee, FAQ, assenza del Piano Light e metadata.
- [x] `npx vitest run`, `npm run lint`, `npm run build` e `npx opennextjs-cloudflare build` passano.
- [x] Dopo build o preview, i title HTML di Home, Ordini e Prezzi corrispondono esattamente alla Spec, senza doppio suffisso `| LabManager`.

## Covers
- User Stories: 2
- Requirements: 15-17, 27-29
- Testing Strategy: 3-4, 6-7
- Interview Ledger: L1, L4, L6, L8, L12, L15

## Blocked by
01-align-navigation-footer-cta-matrix.md
