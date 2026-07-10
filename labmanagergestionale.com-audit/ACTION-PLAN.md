# Action Plan — labmanagergestionale.com

Ordered by priority. Health score today: **86/100**.

## Critical
_None._ No indexing blockers or penalties detected.

## High / Quick wins (Week 1)
- [ ] **Redirect HTTP→HTTPS.** Enable Cloudflare *SSL/TLS → Edge Certificates → Always Use HTTPS* (or a port-80 301 rule). Verify `curl -I http://labmanagergestionale.com/` returns `301`.
- [ ] **Add `charset=utf-8`** to the `Content-Type` of `/llms.txt` and `/robots.txt`.
- [ ] **Fix homepage H1 separator:** `Gestionale Pasticceria, Panificio, Gelateria e Ristorante`.
- [ ] **Alt text:** add descriptive alt to the 2 images currently using `alt=''` (if they carry meaning).

## Medium (Weeks 2–3)
- [ ] **Reviews → `aggregateRating`.** Collect genuine customer reviews and add a valid `aggregateRating` to the `SoftwareApplication` node (never fabricate).
- [ ] **E-E-A-T Trust:** add a *Chi siamo* / About with company identity (P.IVA, address) and real testimonials.
- [ ] **Measure CWV:** configure a Google API key (PageSpeed/CrUX) and re-run for real LCP/INP/CLS; fix whatever the field data flags.

## Content & Authority (Month 2)
- [ ] **Guide/blog cluster (6–10 articles):** e.g. *calcolo food cost in pasticceria*, *etichette allergeni obbligatorie*, *bilanciamento gelato/ricette*, *gestione magazzino laboratorio*. Each links to `/ordini` and `/pricing`.
- [ ] **Internal linking:** connect new articles to feature/pricing pages to build topical depth.
- [ ] **Sitemap:** add new URLs with accurate `lastmod`; re-verify `/newsletter` warrants inclusion.

## Ongoing (Monitoring)
- [ ] Verify indexation & performance in Google Search Console + Bing Webmaster Tools.
- [ ] Track AI/LLM citations (ChatGPT, Perplexity) for target queries.
- [ ] Keep `sitemap.xml` `lastmod` and `llms.txt` in sync with content changes.
- [ ] (Optional) HSTS preload submission once HTTP redirects cleanly.
