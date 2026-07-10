# Technical SEO — 90/100

## Strengths
- HTTPS with valid self-referential canonical
- HSTS: `max-age=31536000; includeSubDomains`
- Security headers: CSP, X-Content-Type-Options nosniff, X-Frame-Options SAMEORIGIN, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy, X-XSS-Protection
- Cloudflare edge + OpenNext prerender (`x-nextjs-prerender: 1`), zstd, HTTP/3 (`alt-svc h3`), `Cache-Control: s-maxage=31536000`
- robots.txt: Allow all + explicit AI-bot whitelist; Sitemap declared
- Canonicalization: `www`→non-www 301; `/ordini/`→`/ordini` 308; missing pages return true 404

## Findings
- **[Medium] HTTP not redirected to HTTPS.** `curl -I http://…/` → `200` with full body, no 301. HSTS on an HTTP response is ignored by browsers. Fix: Cloudflare *Always Use HTTPS* / port-80 301.
- **[Low] CSP `'unsafe-inline' 'unsafe-eval'` in script-src.** Typical Next.js; consider nonce/hash CSP.
- **[Low] Sitemap homepage `<loc>` is bare domain** while server serves `/`. Consistent (canonical matches); keep aligned.
