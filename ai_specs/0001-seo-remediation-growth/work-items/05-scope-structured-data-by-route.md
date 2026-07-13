---
type: Work Item
title: Rendere JSON-LD e semantica page-scoped
parent: ../spec.md
---

## What to build
Limitare il grafo JSON-LD globale alle entità condivise WebSite, Organization e SoftwareApplication con dati verificabili. Spostare la semantica specifica nel corretto contesto di route, aggiungendo WebPage a pricing/newsletter, rimuovendo il BreadcrumbList da ordini e mantenendo FAQ visibile e FAQPage dalla stessa sorgente.

## Required context
- Un BreadcrumbList è ammesso soltanto se la route rende visibile il breadcrumb equivalente; questa fase non aggiunge breadcrumb visibili.
- Nessun Offer deve essere emesso finché lo stream Stripe differito non dispone di piano, prezzo e condizioni verificati.
- Il Work Item 02 fornisce la matrice Magazzino e la sorgente FAQ condivisa da rispettare.

## Acceptance criteria
- [x] Il layout globale emette soltanto WebSite, Organization e SoftwareApplication con dati realmente condivisi e verificabili.
- [x] HowTo, BreadcrumbList, `Offer`, `offers` e `downloadUrl` sono assenti dal grafo globale.
- [x] `Offer` e `offers` non sono emessi da `/pricing` né da qualsiasi altra route in questa fase.
- [x] `/pricing` e `/newsletter` emettono ciascuna un WebPage page-scoped accurato e coerente con canonical e contenuto visibile.
- [x] `/ordini` non emette BreadcrumbList e non introduce un breadcrumb visibile.
- [x] FAQPage è conservato soltanto dove la FAQ equivalente è visibile; domande e risposte visibili e JSON-LD derivano dalla stessa sorgente.
- [x] Ogni contenuto FAQPage o SoftwareApplication relativo al Magazzino deriva dalla matrice v1 del Work Item 02.
- [x] I test importano metadata e grafi esportati usando i seam esistenti di `orders-seo`, `ordini/page` e billing e verificano tipi ammessi, tipi rimossi e coerenza per route.
- [x] I test non promettono un rich result FAQ di Google e verificano soltanto correttezza semantica e coerenza dei dati.
- [x] `npx vitest run`, `npm run lint` e `npm run build` passano.

## Covers
- User Stories: 2, 4
- Requirements: 9-11
- Testing Strategy: 1-2, 5
- Interview Ledger: L3, L4, L6, L10, L11, L13

## Blocked by
02-establish-warehouse-capability-matrix.md

## Implementation evidence

- Grafo globale limitato a WebSite, Organization e SoftwareApplication; rimossi HowTo, BreadcrumbList, `Offer`/`offers` e `downloadUrl`.
- Grafi route-scoped esportati e renderizzati da `/pricing` e `/newsletter`, con URL, nome e descrizione coerenti con metadata e canonical.
- `/ordini` conserva WebPage e FAQPage dalla stessa sorgente visibile, senza BreadcrumbList o breadcrumb visibile.
- I contratti esistenti di Magazzino/FAQPage e billing restano verdi; i nuovi controlli sono in `src/app/orders-seo.test.ts`, `src/app/ordini/page.test.tsx` e `src/app/route-structured-data.test.tsx`.
- Verifica finale del 13 luglio 2026: `npx vitest run` (`60` test passati), `npm run lint` e `npm run build` passati.
