---
type: Work Item
title: Neutralizzare le superfici pubbliche di supporto
parent: ../spec.md
---

## What to build
Riallineare Newsletter, Aggiornamenti, Instagram e Download ai rispettivi ruoli. Eliminare copy di acquisizione e segnali nativi legacy senza modificare la meccanica Newsletter, l'accesso diretto legacy a Download o le menzioni storiche fattuali consentite nelle singole note di rilascio.

## Required context
- Le route noindex devono restare crawlable affinché i crawler possano leggere la direttiva; non aggiungere blocchi in `robots.txt`.
- Le istruzioni tecniche native strettamente necessarie al supporto possono restare in `/download`, ma non nei suoi metadata o nel percorso commerciale.
- Il changelog può conservare menzioni native storiche nelle singole release; badge, introduzione, metadata e navigazione non possono presentarle come offerta corrente.
- Questo Work Item prepara e verifica modifiche locali; non autorizza deploy o pubblicazione.

## Acceptance criteria
- [ ] `/newsletter` parla di aggiornamenti LabManager, nuove funzionalità e consigli scelti editorialmente senza promettere campagne automatiche o disponibilità native.
- [ ] Iscrizione Newsletter e opt-in facoltativo del form contatti mantengono il comportamento esistente.
- [ ] `/newsletter` emette `noindex`, resta raggiungibile dal footer ed è esclusa dalla sitemap.
- [ ] `/aggiornamenti` resta noindex, fuori da navbar, footer e sitemap e usa introduzione, badge e metadata neutrali rispetto ad Android e Windows.
- [ ] Le menzioni storiche native nelle singole release sono conservate soltanto quando descrivono fatti legacy e non diventano CTA, badge o copy introduttivo.
- [ ] `/instagram` resta noindex, conserva esclusivamente i link Home, Prezzi, WhatsApp e Newsletter e usa “laboratori artigianali alimentari” senza ristorazione o piattaforme native.
- [ ] `/download` resta noindex, accessibile senza autenticazione via URL diretto e non collegata da navbar, footer o sitemap.
- [ ] Metadata e copy di acquisizione di Download non promuovono Android/Windows, download o prova ai nuovi visitatori; le sole istruzioni native rimaste sono chiaramente di supporto legacy.
- [ ] Nessuna superficie crea automazioni Newsletter, broadcast WhatsApp o una voce/badge “Novità” nella web app.
- [ ] Test di rendering e metadata verificano ruoli, link, direttive noindex, eccezioni legacy consentite e assenza dei claim proibiti.
- [ ] `npx vitest run`, `npm run lint`, `npm run build` e `npx opennextjs-cloudflare build` passano.
- [ ] Dopo build o preview, i title HTML di Home, Ordini e Prezzi corrispondono esattamente alla Spec, senza doppio suffisso `| LabManager`.

## Covers
- User Stories: 6
- Requirements: 21-24, 29, 31
- Testing Strategy: 4-5, 7
- Interview Ledger: L1-L3, L10-L11, L13, L15

## Blocked by
None - ready to start
