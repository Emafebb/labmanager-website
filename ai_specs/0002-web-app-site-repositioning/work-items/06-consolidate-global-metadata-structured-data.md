---
type: Work Item
title: Consolidare metadata globali e dati strutturati
parent: ../spec.md
---

## What to build
Applicare il posizionamento SEO approvato della Home a metadata, Open Graph, Twitter, WebSite e SoftwareApplication. Limitare il grafo globale a proprietà condivise, neutrali e verificabili, mantenere i claim Magazzino governati dalla matrice e impedire che il template Next duplichi il brand nei title delle tre route indicizzabili.

## Required context
- `src/app/layout.tsx` ospita oggi metadata e grafo condiviso; la Home mantiene il canonical page-scoped per non contaminarne l'ereditarietà sulla 404.
- Il SoftwareApplication globale può descrivere soltanto elementi comuni e visibili; dati di release, requisiti nativi, file size e compatibilità non sono più appropriati.
- Nessun `Offer` deve essere introdotto.
- Questo Work Item prepara e verifica modifiche locali; non autorizza deploy o pubblicazione.

## Acceptance criteria
- [ ] Il title Home è esattamente “Gestionale per pasticcerie, panifici e gelaterie | LabManager” e la meta description è esattamente quella del requisito 25.
- [ ] Open Graph e Twitter della Home usano lo stesso posizionamento approvato, canonical e URL corretti e immagini con descrizioni neutrali.
- [ ] Il template metadata Next non aggiunge un secondo suffisso `| LabManager` a Home, Ordini o Prezzi.
- [ ] WebSite e SoftwareApplication presentano il pubblico e i quattro pilastri approvati senza Android, Windows, offline, PWA, ristoranti o claim non verificati.
- [ ] SoftwareApplication non contiene requisiti software nativi, file size/download, versioni o release native, compatibilità per dispositivo o proprietà route-specific.
- [ ] Screenshot desktop/mobile eventualmente conservati hanno nomi e descrizioni neutrali e non promettono supporto di piattaforma.
- [ ] I soli claim Magazzino presenti nel grafo derivano dalla matrice e restano tracciabili ai sei ID approvati.
- [ ] Il grafo globale contiene soltanto WebSite, Organization e SoftwareApplication; markup page-scoped resta sulle route che rendono il contenuto equivalente.
- [ ] Metadata e JSON-LD di Home, Ordini, Prezzi e Newsletter hanno canonical, URL Open Graph, description e direttive robots coerenti con il ruolo della route.
- [ ] Test serializzano metadata e grafi per verificare allowlist, divieti lessicali, assenza di `Offer` e coerenza cross-route.
- [ ] `npx vitest run`, `npm run lint`, `npm run build` e `npx opennextjs-cloudflare build` passano.
- [ ] Dopo build o preview, i title HTML di Home, Ordini e Prezzi corrispondono esattamente alla Spec, senza doppio suffisso `| LabManager`.

## Covers
- User Stories: 5
- Requirements: 25, 28-29, 34
- Testing Strategy: 4, 6-7
- Interview Ledger: L1-L4, L8, L12-L13

## Blocked by
02-reposition-home-and-contact-surfaces.md, 03-realign-orders-landing.md, 04-realign-pricing-page.md, 05-neutralize-support-noindex-surfaces.md
