# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Italian marketing/landing site for **LabManager**, a management platform for artisanal food labs (pasticcerie, panifici, gelaterie). Built with Next.js App Router, deployed to **Cloudflare Workers** via `@opennextjs/cloudflare` (not Vercel, despite the `.vercel/` metadata directory present from an earlier setup).

Canonical domain: `https://labmanagergestionale.com`. A historical domain (`pastrylabmanager.com`) permanently redirects here and must never appear as a separate site in search results.

For continuity of the 19 October 2026 website work, read `.taste-skill/brief.md` and `.taste-skill/pagine-aree-di-lavoro.md` before changing shared surfaces. For release status, manual acceptance, or the next SEO review, start from `docs/SITE_REDESIGN_STATUS.md`; confirm which build is being inspected. The earlier footer handoff is historical.


## Deployment Architecture

- `wrangler.jsonc` — Worker config. `name` **must** stay `labmanager-website`. Never pass `--name` to point at other resources.
- `worker.ts` — the actual Worker entrypoint. It wraps the OpenNext-generated worker (`.open-next/worker.js`, produced by `npm run build`/`preview`/`deploy`, not committed) with `enforceHttpTransportPolicy` (`src/lib/edge-http-policy.ts`), which forces HTTPS and blocks unsafe HTTP methods on the production hostname before forwarding to OpenNext.
- Out of scope for this repo: the `labmanager` and `labmanager-downloads` Workers and the `labmanager-web` Pages project are separate resources — do not modify them from here.
- Images use `images.unoptimized` in `next.config.ts` intentionally (first-deploy simplification); do not "fix" this without checking with the user, since enabling Cloudflare Images has cost/zone implications.
- Security headers (CSP, HSTS, X-Frame-Options, etc.) are centralized in `next.config.ts` `headers()`. Third-party origins allowed there are LegalBlink (cookie consent) and TabNav (accessibility widget) — extend this list rather than duplicating headers elsewhere.

## Architecture

### Route structure (`src/app`)
The five work-area pages are `ricette-food-cost`, `produzione-magazzino`, `ordini`, `etichette-libro-ingredienti` and `strumenti`. Their shared inventory is `src/data/work-areas.ts`, used by navigation, footer, home catalog, related links and sitemap. The four new routes use `WorkAreaPage`; Ordini retains its own page and historic `#flusso-ordine` anchor. Home, these five areas and `pricing` are the seven sitemap entries.

Other routes: `newsletter`, `instagram` (standalone landing, opts out of `SiteScripts`), `account/billing`, and `billing/success` / `billing/cancel`. They retain their route-specific noindex contracts. Each route exports its own `metadata`.

Decision of 19 October 2026: `/download` and `/aggiornamenti` are retired. Their pages, dedicated download components, changelog data and styles have been removed. Let Next/OpenNext return the existing branded 404, including through `worker.ts`; do not restore a blank edge response, a homepage redirect, release-note maintenance or package links. This supersedes earlier instructions to retain these legacy support pages. Newsletter product news and in-app document update status are unrelated and remain. See `docs/RETIRED_PAGES.md` for the decision and separate Cloudflare download-service guidance; no remote retirement has been performed.

### Home page composition
`src/app/page.tsx` composes independent section components. The current narrative and craft selector are implemented in `Hero` and `WorkflowExplorer`; `Features` contains the expanded catalog, followed by the trial, FAQ and contact sections. `Navbar` and `Footer` provide shared navigation. `NewsletterPopup` is mounted on the home; `WhatsAppButton` is mounted once in the root layout and covers public pages and all three billing routes. It excludes Instagram and unknown/retired routes, and observes the footer contact again after client navigation. Keep section concerns in their existing components.

### Structured data / SEO contracts
`src/app/layout.tsx` emits a global `@graph` JSON-LD (WebSite, Organization, SoftwareApplication) that several tests assert against directly (`metadata-contracts.test.ts`, `route-structured-data.test.tsx`, `crawl-contracts.test.tsx`, `orders-seo.test.ts`). When changing metadata, canonical URLs, or structured data, expect and update the corresponding contract test — these are treated as a source of truth for SEO correctness, not incidental snapshots.

### Design system
- The approved visual authority is **Traccia**: `design/brandkit/brand.css`, `design/brandkit/preview.html` and the implemented tokens in `src/app/globals.css`. Bosco `#223d32`, avorio `#f5f1e8`, salvia `#b8c7b6`, ambra `#f7b52b`, white. Primary controls use bosco/white; ambra is decorative.
- Local **Manrope 400/600/700** for body, controls and data; **Fraunces 400** for short headings. Assets and font licences are distributed in `public/brandkit/`. The original logo and Traccia pattern are preserved.
- `PageMotion` and the existing CSS govern reveals and reduced motion. Work-area flows use three columns for three steps above 1000px; four-step flows use two columns above 700px. Read the shared CSS for the narrower layouts.
- For visual changes, read `DESIGN.md`: it records the approved Traccia decisions; `.impeccable/design.json` is its derived sidecar. Use `design-taste-frontend` for the design and verification workflow within that identity. Older surface briefs may still describe indigo/DM Sans: treat conflicting instructions as historical. Keep `.impeccable/config.json`'s targeted brandkit exceptions and the original seed in `.taste-skill/direction.json`. Update the guide and sidecar together when an approved visual decision changes.
- Editorial AI photographs are distinct from product screenshots. Their visible disclosures remain in place. Food Cost, Ordini and Libro ingredienti screenshots are still awaited from the user with demonstration data; the discussion about disclosure is recorded in `.taste-skill/pagine-aree-di-lavoro.md`.

### Contact form and newsletter flows
Both follow the same client/API split, escaping HTML server-side before embedding user input in emails:
- **Contact** (`ContactForm.tsx` → `api/contact/route.ts`): validates required fields, sends HTML email via Resend.
- **Newsletter** (`NewsletterPopup`/`NewsletterForm` → `api/newsletter/route.ts`): validates email format + privacy consent, upserts the subscriber into Supabase (`newsletter_subscribers` table, keyed on email), best-effort adds them to a Resend Audience, sends a welcome email, and notifies the admin address — each of the Resend/Audience/notification steps is intentionally non-blocking (logged, not thrown) so a Supabase write always succeeds independently.
- **Unsubscribe** (`api/unsubscribe/route.ts`): base64url-encoded email token, deletes from Supabase and marks unsubscribed in the Resend Audience; renders a small standalone HTML page rather than JSON.

### External integrations
- **Resend** (`src/lib/resend-server.ts`): lazily-constructed singleton client, throws if `RESEND_API_KEY` is missing.
- **Supabase** (`src/lib/supabase-server.ts`): admin client behind a `Proxy` that lazily initializes on first property access and throws if `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` are missing — don't add eager initialization at module scope, since that would break in edge environments without these vars set.
- **Cloudflare Web Analytics** (`src/components/CloudflareWebAnalytics.tsx`): gated on `NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` being set at build time; renders nothing otherwise.
- **LegalBlink (cookie consent) + TabNav (accessibility widget)** (`src/components/SiteScripts.tsx`): third-party scripts injected globally except on `STANDALONE_ROUTES` (currently `/instagram`). Includes hand-rolled shadow-DOM CSS patching to keep both widgets on-brand — if you touch this, keep the `MutationObserver` + timed-retry pattern, since both widgets render asynchronously into shadow roots.
