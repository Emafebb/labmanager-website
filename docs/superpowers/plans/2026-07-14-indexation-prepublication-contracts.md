# Indexation and Prepublication Contracts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate the approved indexation and prepublication contracts for the LabManager website without deploying the candidate.

**Architecture:** Keep static crawler policy in `public/`, Next sitemap generation in `src/app/sitemap.ts`, and route metadata in each App Router page. Add one cross-surface regression that evaluates marketing DOM, metadata, JSON-LD, `llms.txt`, and sitemap together, while strengthening crawl tests for every intentionally noindex route and the Cloudflare plain-text headers.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Vitest, Testing Library, OpenNext for Cloudflare.

## Global Constraints

- Work directly in the current checkout; do not create a branch, worktree, or temporary checkout.
- The only indexable sitemap URLs are `https://labmanagergestionale.com`, `/ordini`, and `/pricing`.
- Noindex routes remain crawlable through `robots.txt`; Newsletter remains `noindex, follow` and outside the sitemap.
- Public acquisition surfaces must not contain Android, Windows, offline, PWA, restaurants, synchronization, or device-compatibility claims.
- Technical asset filenames, Download legacy support instructions, and factual historical release notes are excluded from the lexical prohibition.
- Preserve `text/plain; charset=utf-8` for `/robots.txt` and `/llms.txt` through `public/_headers`.
- Keep the existing `lastModified` values because Home, Ordini, and Prezzi were genuinely changed by the immediately preceding work items; this work item does not modify their route content.
- Do not run `npm run deploy`, publish a release, or perform Search Console changes.

---

### Task 1: Cross-surface indexation regression

**Files:**
- Create: `src/app/prepublication-contracts.test.tsx`
- Modify: `src/app/crawl-contracts.test.tsx`

**Interfaces:**
- Consumes: route components and exported metadata/JSON-LD, `sitemap()`, `public/llms.txt`, `public/robots.txt`, and `public/_headers`.
- Produces: a regression boundary that checks prohibited terms across public marketing artifacts and exact crawl/indexation behavior across all governed routes.

- [ ] **Step 1: Add the failing cross-surface test**

Create a test that renders Home, Ordini, Prezzi, and Newsletter one at a time; serializes the approved route metadata and JSON-LD; reads `llms.txt`; and serializes the sitemap. Replace technical image URLs with a neutral marker before applying this prohibition:

```ts
const FORBIDDEN_PUBLIC_CLAIMS =
  /android|windows|offline|\bpwa\b|ristorant|sincronizz|compatibilit[aà] per dispositivo/i;

for (const [surface, value] of Object.entries(publicSurfaces)) {
  expect(value, surface).not.toMatch(FORBIDDEN_PUBLIC_CLAIMS);
}
```

The same file must assert that `llms.txt` exposes exactly the Home, Ordini, and Prezzi Markdown links, includes the approved audience, four pillar headings, warehouse canonical copy, and every stable warehouse claim ID.

- [ ] **Step 2: Strengthen the crawl policy test**

Import Newsletter, Aggiornamenti, Instagram, Download, account billing, billing success, and billing cancel metadata. Assert their exact current `robots` values, exact sitemap URLs/dates, absence of every governed route from `Disallow`, canonical sitemap ownership, and both plain-text header rules.

- [ ] **Step 3: Run the focused tests and verify RED**

Run:

```bash
npx vitest run src/app/prepublication-contracts.test.tsx src/app/crawl-contracts.test.tsx src/data/magazzino-capability-matrix.test.tsx
```

Expected result: the new `llms.txt` positioning assertions fail because the current file still promotes Android, Windows, offline use, restaurants, synchronization, and other excluded capabilities. Existing sitemap, noindex, robots, freshness, and header assertions remain green.

### Task 2: Approved `llms.txt` contract

**Files:**
- Modify: `public/llms.txt`

**Interfaces:**
- Consumes: approved requirements 3, 25, and 30 plus `MAGAZZINO_CANONICAL_COPY` and `MAGAZZINO_CLAIM_IDS`.
- Produces: a plain-text AI discovery document aligned with the same public positioning as Home, Ordini, and Prezzi.

- [ ] **Step 1: Replace the legacy positioning**

Write `llms.txt` with these sections and no additional landing links:

```text
# LabManager

> LabManager è il gestionale per laboratori artigianali alimentari, pensato per pasticcerie, panifici e gelaterie. Riunisce ricette e food cost, produzione ed etichette, magazzino, ordini e piano di lavoro.

## Pagine SEO principali

- [Home](https://labmanagergestionale.com): Presentazione di LabManager e prova gratuita di 14 giorni.
- [Ordini](https://labmanagergestionale.com/ordini): Gestione di ordini cliente e interni, produzione collegata, ritiro e consegna, acconti e report operativi.
- [Prezzi](https://labmanagergestionale.com/pricing): Piano LabManager e prova gratuita di 14 giorni senza carta.
```

Then document exactly the four approved pillars, the canonical warehouse sentence, all six stable claim IDs, and neutral contact details. Do not mention Newsletter as a landing or any excluded platform/capability claim.

- [ ] **Step 2: Run the focused tests and verify GREEN**

Run the same focused Vitest command from Task 1. Expected result: all selected files and tests pass with no warnings.

- [ ] **Step 3: Review the production diff**

Run `git diff -- public/llms.txt src/app/prepublication-contracts.test.tsx src/app/crawl-contracts.test.tsx src/app/sitemap.ts public/robots.txt public/_headers` and confirm the only production-file change is the intended `llms.txt` rewrite; sitemap, robots, headers, and route content remain unchanged.

### Task 3: Candidate verification and approval gate

**Files:**
- Create: `ai_specs/0002-web-app-site-repositioning/prepublication-summary.md`
- Modify: `ai_specs/0002-web-app-site-repositioning/work-items/07-consolidate-indexation-prepublication-contracts.md`
- Write ignored cache: `.seo-cache/pages/homepage/page-analysis.json`, `.seo-cache/pages/ordini/page-analysis.json`, `.seo-cache/pages/pricing/page-analysis.json`

**Interfaces:**
- Consumes: the candidate commit, command exit codes, built HTML, browser observations, and fresh local SEO evidence.
- Produces: a reviewable prepublication record and an explicit publication gate that remains closed.

- [ ] **Step 1: Run all required automated gates**

Run each command independently and retain its exit code and concise result:

```bash
npx vitest run
npm run lint
npm run build
npx opennextjs-cloudflare build
```

Expected result: every command exits `0`.

- [ ] **Step 2: Verify final HTML and browser behavior**

Serve the built candidate locally. Read the actual `<title>` from `/`, `/ordini`, and `/pricing` and compare it byte-for-byte with requirements 25–27. At desktop and mobile viewports, verify Home rendering, keyboard focus, desktop/mobile navbar, mobile menu open/close, CTA destinations, and absence of relevant console errors.

- [ ] **Step 3: Apply the single-page SEO checks to all three indexable pages**

Inspect title, description, H1/headings, canonical, robots, Open Graph/Twitter, schema, images, content, internal links, and likely Core Web Vitals risks from the built HTML. Write concise ignored cache summaries with current timestamps and tool limitations; prefer fresh evidence over the 2026-07-11 cache where they conflict.

- [ ] **Step 4: Commit the candidate implementation**

Stage only the plan, tests, and `public/llms.txt`, then commit with:

```bash
git commit -m "feat(seo): consolidate indexation contracts"
```

- [ ] **Step 5: Record and commit the prepublication evidence**

Write the candidate commit hash, command results, exact HTML titles, browser matrix, SEO scorecards, limitations, and `Publication approval: PENDING — no deploy authorized` in the summary. Check every acceptance criterion in Work Item 07, stage only the summary and work-item file, and commit with:

```bash
git commit -m "docs(seo): record prepublication candidate"
```

- [ ] **Step 6: Confirm scope and gate**

Run `git status --short --branch` and `git log -2 --oneline`. Confirm the worktree is clean, only intended commits were added, and no deploy, release, Search Console action, or remote push occurred.
