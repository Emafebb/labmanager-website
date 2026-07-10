# Full SEO Audit — labmanagergestionale.com

**Date:** 2026-07-10
**Business type:** SaaS / software product (`SoftwareApplication`) — gestionale for Italian food labs (pasticceria, panificio, gelateria, ristorante)
**Stack:** Next.js via OpenNext on Cloudflare (edge-prerendered)
**Pages in sitemap:** 4 (`/`, `/ordini`, `/pricing`, `/newsletter`)

## Executive Summary

**SEO Health Score: 86 / 100** — a genuinely well-built, technically strong small product site. The fundamentals (HTTPS, security headers, structured data, on-page metadata, AI-crawler readiness) are excellent. The ceiling is set by two things: a handful of small technical/config fixes, and the absence of an editorial content layer to build topical authority in a competitive niche.

### Top 5 issues
1. **HTTP serves 200 with no redirect to HTTPS** (Medium) — insecure/duplicate URL exposed to crawlers; HSTS over HTTP is ignored by browsers.
2. **No `aggregateRating` on SoftwareApplication schema** (Medium) — misses star-rating rich results.
3. **No blog/editorial content** (Medium) — limited topical authority and long-tail capture.
4. **`llms.txt` served without `charset=utf-8`** (Low) — mojibake risk on accented text in strict clients.
5. **Limited E-E-A-T Trust signals** (Medium) — only a Gmail contact; no company identity or customer proof.

### Top 5 quick wins
1. Cloudflare **Always Use HTTPS** → http 301s to https.
2. Add `charset=utf-8` to `/llms.txt` and `/robots.txt`.
3. Fix H1 separator: `Gestionale Pasticceria, Panificio…`.
4. Add descriptive alt to the 2 empty-alt images.
5. Add real reviews → valid `aggregateRating`.

---

## Technical SEO — 90/100

**Working well:** HTTPS + valid canonical; HSTS (1y, includeSubDomains); full security header set (CSP, X-Content-Type-Options, X-Frame-Options SAMEORIGIN, Referrer-Policy, Permissions-Policy, X-XSS-Protection); Cloudflare edge with OpenNext prerender, zstd, HTTP/3, long `s-maxage`; robots.txt allows all + whitelists AI crawlers; sitemap declared; `www`→non-www 301; trailing-slash→canonical 308; real 404s.

| Finding | Severity |
|---|---|
| HTTP (port 80) returns 200 with full content, no 301 to HTTPS. HSTS header on an HTTP response is ignored by browsers, so crawlers/first visits can load the insecure URL. Canonical→HTTPS limits ranking risk. **Fix:** Cloudflare *Always Use HTTPS* or a port-80 301 rule. | Medium |
| CSP allows `'unsafe-inline' 'unsafe-eval'` in `script-src` (typical Next.js; weakens XSS defence). Move to nonce/hash CSP where feasible. | Low |
| Sitemap homepage `<loc>` is the bare domain while server serves `/`; both 200 and canonical matches bare form — consistent, keep aligned. | Low |

## Content Quality — 78/100

**Working well:** ~2,276-word homepage with real feature depth; unique content on every subpage; strong differentiation section (offline-first, composition balancing, made in Italy); 21-question FAQ.

| Finding | Severity |
|---|---|
| **No blog/editorial layer.** A 4-page product site captures little informational/long-tail intent for the competitive term "gestionale pasticceria". Add a focused guide cluster (food cost, allergen labelling, gelato balancing) linking to feature/pricing pages. | Medium |
| **Limited Trust signals.** Single Gmail contact; no company/legal identity (P.IVA, address), no About, no visible reviews/testimonials. Add Chi siamo + real customer proof. | Medium |

## On-Page SEO — 88/100

**Working well:** homepage title ~52 chars, 157-char description, both keyword-led; every page has unique title/description, single H1, self-referential canonical; logical heading hierarchy; complete OG + Twitter tags with og-image.

| Finding | Severity |
|---|---|
| H1 missing separator: renders `Gestionale PasticceriaPanificio…` — add comma/space. | Low |
| Deprecated `meta keywords` present — harmless, optional removal. | Low |

## Schema / Structured Data — 90/100

**Working well:** rich `@graph` — WebSite, Organization (logo, contactPoint, areaServed IT), SoftwareApplication (offers €44.99/mo, €480/yr), HowTo (APK install), BreadcrumbList; separate FAQPage (21 Q&A); subpages carry their own JSON-LD.

| Finding | Severity |
|---|---|
| **SoftwareApplication has no `aggregateRating`.** Star ratings are the main rich-result driver here. Add a *genuine* aggregateRating once real reviews exist (never fabricate). | Medium |
| FAQ rich results are deprecated for non-gov/health sites since 2023 — keep FAQPage for GEO value, but don't expect FAQ snippets in Google. | Info |

## Performance (Core Web Vitals) — 80/100 *(estimated)*

PageSpeed Insights returned HTTP 429 (shared-key daily quota) and no Google API credentials are configured, so LCP/INP/CLS were **not measured** this run. Architecture strongly favours good CWV: edge-prerendered HTML, zstd, HTTP/3, self-hosted woff2, next/image. **Action:** add a Google API key (PageSpeed/CrUX) and re-run, or check PageSpeed Insights manually.

## AI Search Readiness (GEO) — 92/100

**Working well:** detailed `llms.txt` (summary, features, differentiation, audience, contacts); robots.txt explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, Applebot-Extended, cohere-ai, Bingbot; FAQPage + HowTo + clear entity definition make the brand highly citable.

| Finding | Severity |
|---|---|
| `/llms.txt` (and `/robots.txt`) served as `text/plain` with no charset. Bytes are valid UTF-8 (verified) but strict Latin-1-defaulting clients show mojibake (`è`→`Ã¨`). Set `charset=utf-8`. | Low |

## Images — 85/100

**Working well:** every `<img>` has an alt attribute (0 missing); descriptive keyword-relevant filenames; og-image present.

| Finding | Severity |
|---|---|
| 2 of 5 images use empty `alt=''` — fine if decorative, a loss if they are meaningful screenshots. Confirm intent and add alt where content-bearing. | Low |

---

*Measurement notes: analysis based on live fetches of the homepage (224KB), `/ordini`, `/pricing`, `/newsletter`, `robots.txt`, `sitemap.xml`, `llms.txt`, and redirect/HTTP-header probes. Field CWV and backlink/GSC data were unavailable (no API credentials; PageSpeed shared quota exhausted).*
