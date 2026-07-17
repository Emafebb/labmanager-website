---
type: Work Item
title: Installare Google Tag Manager con esclusione di /instagram
parent: ../spec.md
---

## What to build
Integrare il container Google Tag Manager `GTM-TCZR8HQP` nel componente che gestisce gli script esterni, includendo sia il caricamento principale sia il fallback per i browser senza JavaScript. LegalBlink deve precedere Tag Manager e `/instagram` deve continuare a escludere entrambi. Estendere la Content Security Policy centralizzata con i soli collegamenti Google necessari e coprire il comportamento con verifiche automatiche e locali.

## Required context
- `src/components/SiteScripts.tsx` contiene già LegalBlink, l'esclusione delle route standalone e gli altri widget esterni; riutilizzare questa struttura senza modificare il comportamento del banner o di `/instagram`.
- Conservare l'identificativo del container in una sola costante condivisa dalle due parti dell'installazione e seguire il codice ufficiale Google senza aggiungere pacchetti.
- Le regole di sicurezza restano centralizzate in `next.config.ts`; non duplicarle altrove e non autorizzare domini Google estranei al funzionamento del container.
- La configurazione o pubblicazione dei tag nel pannello Google, il deploy del sito e la verifica post-pubblicazione sul dominio di produzione restano fuori scope.

## Acceptance criteria
- [x] Il container `GTM-TCZR8HQP` è definito in una sola costante e usato sia dal caricamento principale sia dal fallback `noscript`.
- [x] Tutte le route coperte da `SiteScripts` includono le due parti ufficiali dell'installazione Google Tag Manager.
- [x] LegalBlink compare prima del caricamento principale di Google Tag Manager e le sue impostazioni esistenti restano invariate.
- [x] `/instagram` non renderizza LegalBlink, Google Tag Manager o gli altri strumenti esterni già esclusi dal componente.
- [x] La Content Security Policy centralizzata consente `https://www.googletagmanager.com` soltanto nelle direttive necessarie al caricamento principale e al fallback, senza wildcard o altri domini Google.
- [x] I test automatici verificano l'identificativo e gli URL del container in entrambe le parti, l'ordine rispetto a LegalBlink, l'esclusione di `/instagram` e le direttive CSP richieste.
- [x] Non vengono aggiunti pacchetti né modificati il contenuto del container, il comportamento del banner cookie o il contenuto della pagina `/instagram`.
- [x] `npx vitest run`, `npm run lint` e `npm run build` passano localmente.
- [x] Non viene eseguito alcun deploy o pubblicazione del sito o del container.

## Covers
- Requirements: 1-6
- Technical Decisions: 1-4
- Testing Strategy: 1-3
- Interview Ledger: L1-L2

## Blocked by
None - ready to start
