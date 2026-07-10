# Performance (CWV) — 80/100 (estimated)

CWV **not measured**: PageSpeed API returned 429 (shared-key daily quota) and no Google API credentials configured.

## Positive architecture signals
- Edge-prerendered static HTML (Cloudflare + OpenNext)
- zstd compression, HTTP/3, long s-maxage
- Self-hosted woff2 fonts, next/image

## Action
Configure Google API key (PageSpeed/CrUX) and re-run for real LCP/INP/CLS, or check PageSpeed Insights manually.
