---
type: Work Item
title: Normalizzare le CTA di prova e accesso
parent: ../spec.md
---

## What to build
Creare un inventario testabile di tutte le CTA pubbliche che promettono prova o accesso e collegarle direttamente a `https://app.labmanagergestionale.com`. Correggere anche la risposta FAQ interessata, conservando gerarchia, copy, posizionamento, segmentazione e percorsi di assistenza non coinvolti.

## Required context
- Il sito marketing è la superficie commerciale; registrazione, verifica email, primo login, durata della prova, checkout ed entitlement appartengono alla web app separata.
- Il journey approvato prevede registrazione nella web app, verifica email, prova completa di 14 giorni senza carta e avvio della prova al primo login riuscito.
- Questo Work Item non introduce un esperimento CTA e non rende automaticamente la prova la CTA primaria.

## Acceptance criteria
- [x] `src/data/trial-access-cta-inventory.ts` esporta una fixture tipizzata con route, label o contesto, intento e href atteso per ogni CTA di prova/accesso.
- [x] L'inventario include almeno “Richiedi una prova gratuita”, “Inizia la prova gratis” e la risposta FAQ “Come posso provare l'app?”.
- [x] Ogni link o azione pubblica il cui label, `aria-label` o contesto promette prova o accesso punta direttamente a `https://app.labmanagergestionale.com` senza pagina filtro.
- [x] Nessuna CTA inventariata usa WhatsApp, contatto o download come destinazione; tali percorsi restano disponibili soltanto come assistenza quando non promettono prova/accesso.
- [x] La FAQ spiega il percorso approvato e conduce direttamente alla web app usando la stessa sorgente visibile/FAQPage predisposta dal Work Item 02.
- [x] Non vengono modificati gerarchia, copy, posizione o segmentazione delle CTA oltre quanto necessario a correggerne la destinazione.
- [x] Non vengono modificati auth, token, durata della prova, prezzi, checkout, rinnovo o entitlement della web app.
- [x] Test di rendering e fixture coprono tutte le CTA inventariate e impediscono regressioni verso WhatsApp, contatto o download.
- [x] `npx vitest run`, `npm run lint` e `npm run build` passano.

## Covers
- User Stories: 5
- Requirements: 15-16
- Testing Strategy: 4-5
- Interview Ledger: L7, L10, L11, L13

## Blocked by
02-establish-warehouse-capability-matrix.md

## Implementation evidence

- Inventario tipizzato: `src/data/trial-access-cta-inventory.ts`, con quattro azioni pubbliche su homepage, pricing e ordini e destinazione unica `https://app.labmanagergestionale.com`.
- Destinazioni corrette senza modificare gerarchia o posizionamento: CTA ordini e pricing; FAQ prova e accesso iOS dalla sorgente condivisa visibile/FAQPage.
- Journey FAQ verificato: registrazione nella web app, verifica email, prova completa di 14 giorni senza carta e avvio al primo login riuscito.
- Test dedicati: `src/data/trial-access-cta-inventory.test.tsx` e aggiornamento del contratto CTA in `src/app/ordini/page.test.tsx`.
- Verifica finale del 13 luglio 2026: `npx vitest run` (`60` test passati), `npm run lint` e `npm run build` passati.
