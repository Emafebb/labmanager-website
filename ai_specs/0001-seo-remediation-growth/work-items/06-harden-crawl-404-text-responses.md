---
type: Work Item
title: Correggere 404, confini di crawl e content type
parent: ../spec.md
---

## What to build
Introdurre una pagina 404 esplicita con contratto metadata corretto, preservare i confini intenzionali di sitemap e indicizzazione e assegnare a un unico layer la responsabilità del content type testuale di `robots.txt` e `llms.txt`. Verificare i contratti sia nei test sia su preview/worker e live.

## Required context
- `/aggiornamenti` resta intenzionalmente `noindex, nofollow` e fuori sitemap; la scelta editoriale futura è differita.
- URL noindex, billing e download non devono entrare nella sitemap.
- Il layer responsabile di `Content-Type` può essere Next/OpenNext oppure Cloudflare, ma non deve essere duplicato ambiguamente.

## Acceptance criteria
- [x] Esiste una pagina 404 esplicita e testabile che mantiene status HTTP `404` nel documento finale.
- [x] La 404 non emette alcun canonical ed emette una sola direttiva robots `noindex`.
- [x] La 404 non eredita `index, follow` né direttive Googlebot indicizzabili dal metadata globale.
- [x] Test di metadata/documento e controlli preview/live verificano congiuntamente status, assenza completa di canonical e direttiva robots finale della 404.
- [x] La sitemap esclude URL noindex, billing e download; `/aggiornamenti` resta `noindex, nofollow` ed esclusa.
- [x] `priority` e `changefreq`, se conservati, sono trattati come hint opzionali; `lastmod` cambia soltanto per contenuto realmente modificato.
- [x] Un unico layer documentato è responsabile di `Content-Type: text/plain; charset=utf-8` per le risposte effettive di `llms.txt` e `robots.txt`.
- [x] Test/configurazione di repository, preview/worker e risposta live confermano il content type esatto di entrambi gli URL.
- [x] L'evidenza manuale registra comandi, data/ambiente, URL e risultati per 404, canonical/robots e content type.
- [x] I test coprono WebPage/robots/sitemap e il contenuto di `llms.txt` usando i seam esistenti.
- [x] `npx vitest run`, `npm run lint`, `npm run build` e `npx opennextjs-cloudflare build` passano.

## Covers
- User Stories: 4
- Requirements: 12-14
- Testing Strategy: 1, 3, 5-6
- Interview Ledger: L6, L8, L13

## Blocked by
None - ready to start

## Implementation evidence

- Data e ambienti: 13 luglio 2026; preview Wrangler locale e produzione Cloudflare, verifica live alle 14:10 CEST.
- Comando 404: `curl --http1.1 -D /tmp/labmanager-live-404.headers -o /tmp/labmanager-live-404.html 'https://labmanagergestionale.com/percorso-inesistente-verifica?probe=20260713'`.
- Risultato 404 live: status `404`, `Content-Type: text/html; charset=utf-8`, canonical `0`, meta robots `1` con valore `noindex`, meta Googlebot `0`.
- Comandi testo: `curl --http1.1 -D <headers> -o <body> https://labmanagergestionale.com/llms.txt` e analogo per `/robots.txt`. Entrambi restituiscono esattamente `Content-Type: text/plain; charset=utf-8`.
- Responsabilità content type: unico layer statico Cloudflare Assets tramite `public/_headers`; la route dinamica `src/app/robots.ts` è stata rimossa e il contenuto è versionato in `public/robots.txt`.
- Sitemap live: contiene solo homepage, `/ordini`, `/pricing` e `/newsletter`; nessun URL noindex, billing, download o `/aggiornamenti`. `lastmod` è stato aggiornato al 13 luglio 2026 soltanto sulle tre pagine modificate; `/ordini` resta al 15 giugno 2026.
- Contratti automatizzati: `src/app/crawl-contracts.test.tsx`. Verifica finale passata: `53` test Vitest, ESLint, build Next.js e build OpenNext/Cloudflare.
