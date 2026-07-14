---
type: Work Item
title: Riallineare la landing Ordini
parent: ../spec.md
---

## What to build
Riposizionare `/ordini` come landing SEO dedicata a ordini cliente e interni, produzione collegata, ritiro e consegna, acconti e report operativi. Rimuovere promesse native o amministrative, usare “Scopri i prezzi” verso `/pricing` e aggiornare metadata, dati strutturati e test della route.

## Required context
- Acconti, saldi e report sono strumenti operativi; non devono diventare fatture, contabilità, prima nota o un prodotto cassa.
- Il markup page-scoped può rappresentare soltanto contenuto visibile della route e non deve introdurre `Offer` o dati commerciali non verificabili.
- Questo Work Item prepara e verifica modifiche locali; non autorizza deploy o pubblicazione.

## Acceptance criteria
- [ ] La pagina descrive soltanto ordini cliente/interni, produzione collegata, ritiro/consegna, acconti e report operativi entro i confini del requisito 14.
- [ ] Notifiche Android/Windows, claim di cassa o contabilità, fatturazione e altre promesse escluse non compaiono nel DOM, nelle FAQ o nei dati strutturati.
- [ ] L'unica CTA commerciale della route è “Scopri i prezzi” e punta a `/pricing`; la pagina non offre prova, download o accesso nativo.
- [ ] Il title è esattamente “Gestione ordini e piano di lavoro | LabManager” e la description è esattamente quella del requisito 26.
- [ ] Canonical, Open Graph URL, Open Graph description e Twitter sono coerenti con `/ordini` e con il copy approvato.
- [ ] WebPage e l'eventuale FAQPage derivano da contenuto visibile e non contengono BreadcrumbList invisibili, `Offer` o dettagli più ampi della pagina.
- [ ] Test dedicati verificano metadata, CTA, confini funzionali, assenza dei claim proibiti e coerenza tra contenuto visibile e JSON-LD.
- [ ] `npx vitest run`, `npm run lint`, `npm run build` e `npx opennextjs-cloudflare build` passano.
- [ ] Dopo build o preview, i title HTML di Home, Ordini e Prezzi corrispondono esattamente alla Spec, senza doppio suffisso `| LabManager`.

## Covers
- User Stories: 4
- Requirements: 14, 26, 28-29
- Testing Strategy: 3-4, 7
- Interview Ledger: L4, L6, L12, L15

## Blocked by
01-align-navigation-footer-cta-matrix.md
