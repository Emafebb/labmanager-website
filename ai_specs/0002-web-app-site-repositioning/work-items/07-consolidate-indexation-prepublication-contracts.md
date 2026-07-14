---
type: Work Item
title: Consolidare indicizzazione e contratti pre-pubblicazione
parent: ../spec.md
---

## What to build
Riscrivere `llms.txt`, limitare la sitemap alle tre landing approvate, verificare i contratti noindex/crawl e osservare i title nell'HTML finale. Completare la regressione automatizzata e browser, raccogliere un riepilogo pre-pubblicazione e presentarlo al committente senza eseguire alcun deploy.

## Required context
- `public/robots.txt` e `public/llms.txt` devono conservare gli header `text/plain` già governati da `public/_headers`.
- Le route noindex non devono essere bloccate in robots e Newsletter non è una landing organica.
- L'approvazione alla decomposizione o all'implementazione non equivale all'approvazione alla pubblicazione; il requisito 35 richiede un gate separato.

## Acceptance criteria
- [ ] `public/llms.txt` descrive il nuovo pubblico, i quattro pilastri e i sei claim Magazzino e presenta soltanto Home, Ordini e Prezzi come pagine SEO principali.
- [ ] `llms.txt` non contiene Android, Windows, offline, PWA, ristoranti, Newsletter come landing o altre capacità escluse.
- [ ] La sitemap contiene esattamente `https://labmanagergestionale.com`, `/ordini` e `/pricing`.
- [ ] Newsletter, Download, Aggiornamenti e billing sono escluse dalla sitemap e mantengono i rispettivi contratti noindex concordati.
- [ ] `lastModified` cambia soltanto sulle route il cui contenuto è stato realmente modificato.
- [ ] `robots.txt` continua a consentire il crawl delle route noindex e del dominio corrente e continua a riferire la sitemap canonica.
- [ ] `robots.txt` e `llms.txt` continuano a rispondere come `text/plain; charset=utf-8` nel contratto OpenNext/Cloudflare.
- [ ] Test cross-surface verificano l'assenza dei termini proibiti in DOM marketing, metadata, JSON-LD, `llms.txt` e sitemap rispettando le eccezioni tecniche e storiche della Spec.
- [ ] `npx vitest run`, `npm run lint`, `npm run build` e `npx opennextjs-cloudflare build` passano sulla versione candidata.
- [ ] Dopo build o preview, il tag `<title>` effettivo di Home, Ordini e Prezzi corrisponde esattamente ai requisiti 25-27 senza doppio suffisso.
- [ ] Una verifica browser manuale copre Home e navbar a viewport mobile e desktop, focus, menu mobile, CTA e assenza di errori console rilevanti.
- [ ] Un riepilogo pre-pubblicazione registra commit/versione candidata, esiti dei comandi, title HTML e verifica browser ed è presentato al committente per approvazione.
- [ ] Nessun deploy o rilascio pubblico viene eseguito da questo Work Item; l'eventuale pubblicazione resta bloccata fino all'approvazione esplicita del committente.

## Covers
- User Stories: 5
- Requirements: 28, 30-31, 34-35
- Testing Strategy: 4-7, 9
- Interview Ledger: L4, L10-L13, L15-L16

## Blocked by
02-reposition-home-and-contact-surfaces.md, 03-realign-orders-landing.md, 04-realign-pricing-page.md, 05-neutralize-support-noindex-surfaces.md, 06-consolidate-global-metadata-structured-data.md
