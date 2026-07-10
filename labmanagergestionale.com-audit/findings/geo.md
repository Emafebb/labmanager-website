# AI Search Readiness (GEO) — 92/100

## Strengths
- Detailed llms.txt (summary, features, differentiation, audience, contacts)
- robots.txt whitelists GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, Applebot-Extended, cohere-ai, Bingbot
- FAQPage + HowTo + clear entity definition → highly citable

## Findings
- **[Low] llms.txt/robots.txt lack `charset=utf-8`.** Bytes are valid UTF-8 (verified) but strict Latin-1 clients show mojibake (`è`→`Ã¨`). Set `charset=utf-8`.
