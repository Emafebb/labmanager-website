---
type: Work Item
title: Allineare navigazione, footer e matrice CTA
parent: ../spec.md
---

## What to build
Rendere Navbar desktop/mobile, footer e inventario CTA conformi alla matrice commerciale approvata. La Home deve offrire la prova e il salto alle funzionalità, Prezzi deve offrire la prova, Ordini deve condurre a `/pricing` e la navbar deve esporre un solo ingresso globale “Accedi” verso la web app nella stessa scheda.

## Required context
- `src/data/trial-access-cta-inventory.ts` deve diventare la sorgente tipizzata di verifica per tutte le azioni della matrice, inclusa “Accedi”.
- Registrazione, autenticazione, durata della prova ed entitlement appartengono alla web app e non devono essere modificati.
- Questo Work Item prepara e verifica modifiche locali; non autorizza deploy o pubblicazione.

## Acceptance criteria
- [ ] Navbar desktop e mobile contengono, nello stesso ordine, soltanto “Funzionalità”, “Ordini”, “Prezzi” e “Accedi”.
- [ ] “Accedi” punta direttamente a `https://app.labmanagergestionale.com` senza `target="_blank"`, pagine ponte o duplicazioni locali.
- [ ] La Home espone “Inizia la prova gratuita” verso la web app e “Scopri le funzionalità” verso la sezione Funzionalità.
- [ ] Prezzi espone “Inizia la prova gratuita” verso la web app e Ordini espone “Scopri i prezzi” verso `/pricing`.
- [ ] Nessuna CTA di Ordini, FAQ, Newsletter, Download, WhatsApp o footer promette una prova o un accesso alla web app fuori dalla matrice approvata.
- [ ] L'inventario CTA tipizzato contiene esattamente le azioni approvate con route, intento, label, destinazione e comportamento di apertura verificabili.
- [ ] Il footer contiene Prodotto (Funzionalità, Ordini, Prezzi), Supporto (Contatti, Newsletter, WhatsApp) e i contenuti Legale esistenti; Piattaforme, FAQ e Aggiornamenti sono assenti.
- [ ] Test di rendering verificano la struttura desktop/mobile, l'ordine delle voci, le destinazioni, l'assenza di `target="_blank"` sulle azioni web app e il ruolo di assistenza di WhatsApp.
- [ ] `npx vitest run`, `npm run lint`, `npm run build` e `npx opennextjs-cloudflare build` passano.
- [ ] Dopo build o preview, i title HTML di Home, Ordini e Prezzi corrispondono esattamente alla Spec, senza doppio suffisso `| LabManager`.

## Covers
- User Stories: 2-4
- Requirements: 9-13, 20, 28
- Testing Strategy: 2, 7
- Interview Ledger: L5-L7, L9-L10

## Blocked by
None - ready to start
