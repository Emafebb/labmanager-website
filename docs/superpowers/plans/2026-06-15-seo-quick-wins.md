# SEO Quick Wins Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply five mechanical SEO fixes from the 2026-06-12 audit, each as a separate commit.

**Architecture:** Next.js App Router site. SEO surfaces live in `src/app/layout.tsx` (global metadata + JSON-LD), per-page `metadata` exports, shared section components under `src/components/`, plus `src/app/sitemap.ts`, `src/app/robots.ts`, and `public/llms.txt`. Changes are string/config edits; two existing Vitest suites guard the orders metadata and the SEO plumbing.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind, Vitest + Testing Library.

**Reference spec:** `docs/superpowers/specs/2026-06-15-seo-quick-wins-design.md`

**Test command:** `npm test` (Vitest, run once). A single file: `npx vitest run src/app/ordini/page.test.tsx`.

---

## File map

| File | Touched by | Responsibility |
|------|-----------|----------------|
| `src/app/ordini/page.tsx` | Task 1, Task 2 | Orders page metadata constants + H1 |
| `src/app/ordini/page.test.tsx` | Task 1, Task 2 | Asserts orders title, description, H1, WebPage name |
| `src/app/layout.tsx` | Task 2 | Global metadata + structured data graph |
| `src/components/Hero.tsx` | Task 2 | Homepage hero H1, paragraph, AI-extractable block |
| `src/components/Footer.tsx` | Task 2 | Footer site description |
| `src/components/Warehouse.tsx` | Task 2 | Warehouse section H2 |
| `src/components/DownloadClient.tsx` | Task 2 | Download section description |
| `src/components/FAQ.tsx` | Task 2 | FAQ question (propagates to FAQPage JSON-LD) |
| `public/llms.txt` | Task 2 | AI-crawler summary |
| `src/app/newsletter/page.tsx` | Task 3 | Newsletter metadata strings |
| `src/app/sitemap.ts` | Task 4 | Sitemap with per-page lastModified |
| `src/app/robots.ts` | Task 5 | robots.txt rules |

---

## Task 1: Orders page title — remove double brand

**Files:**
- Modify: `src/app/ordini/page.tsx` (constant `PAGE_TITLE`, ~line 22)
- Test: `src/app/ordini/page.test.tsx` (assertions at ~line 20 and ~line 131)

The layout applies `title.template = "%s | LabManager"`. `PAGE_TITLE` currently ends with `- LabManager`, producing a rendered double brand. `PAGE_TITLE` also feeds `openGraph.title`, `twitter.title`, and the `WebPage` JSON-LD `name`, so changing the constant propagates everywhere.

- [ ] **Step 1: Update the test assertions to the new expected title (they will fail)**

In `src/app/ordini/page.test.tsx`, change both occurrences of the title string.

Line ~20 — from:
```ts
    expect(metadata.title).toBe("Gestione ordini dei tuoi clienti - LabManager");
```
to:
```ts
    expect(metadata.title).toBe("Gestione Ordini");
```

Line ~131 (inside the structured-data `WebPage` assertion) — from:
```ts
          name: "Gestione ordini dei tuoi clienti - LabManager",
```
to:
```ts
          name: "Gestione Ordini",
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npx vitest run src/app/ordini/page.test.tsx`
Expected: FAIL — received `"Gestione ordini dei tuoi clienti - LabManager"`, expected `"Gestione Ordini"`.

- [ ] **Step 3: Update `PAGE_TITLE` in the page**

In `src/app/ordini/page.tsx`, ~line 22 — from:
```ts
const PAGE_TITLE = "Gestione ordini dei tuoi clienti - LabManager";
```
to:
```ts
const PAGE_TITLE = "Gestione Ordini";
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `npx vitest run src/app/ordini/page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/ordini/page.tsx src/app/ordini/page.test.tsx
git commit -m "fix: remove double brand from orders page title"
```

---

## Task 2: Add "gelateria" across metadata and visible copy

**Files:**
- Modify: `src/app/layout.tsx`, `src/app/ordini/page.tsx`, `src/components/Hero.tsx`, `src/components/Footer.tsx`, `src/components/Warehouse.tsx`, `src/components/DownloadClient.tsx`, `src/components/FAQ.tsx`, `public/llms.txt`
- Test: `src/app/ordini/page.test.tsx`

Rule: wherever the sector list "pasticceria, panificio e ristorante" (or "…e laboratorio") appears, insert "gelateria" before the final sector, preserving the existing conjunction ("e" vs "o") and singular/plural form.

- [ ] **Step 1: Update orders test assertions for the sector list (they will fail)**

In `src/app/ordini/page.test.tsx`:

Line ~22 (description) — from:
```ts
      "Gestisci ordini cliente, ritiri, consegne, acconti, produzione collegata, piano di lavoro e report con LabManager per pasticceria, panificio e laboratorio.",
```
to:
```ts
      "Gestisci ordini cliente, ritiri, consegne, acconti, produzione collegata, piano di lavoro e report con LabManager per pasticceria, panificio, gelateria e laboratorio.",
```

Line ~41 (H1 accessible name) — from:
```ts
        name: "Gestione ordini e piano di lavoro per pasticceria, panificio e laboratorio",
```
to:
```ts
        name: "Gestione ordini e piano di lavoro per pasticceria, panificio, gelateria e laboratorio",
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npx vitest run src/app/ordini/page.test.tsx`
Expected: FAIL on the description and/or H1 assertions.

- [ ] **Step 3: Update the orders page (`src/app/ordini/page.tsx`)**

`PAGE_DESCRIPTION` (~line 24) — from:
```ts
  "Gestisci ordini cliente, ritiri, consegne, acconti, produzione collegata, piano di lavoro e report con LabManager per pasticceria, panificio e laboratorio.";
```
to:
```ts
  "Gestisci ordini cliente, ritiri, consegne, acconti, produzione collegata, piano di lavoro e report con LabManager per pasticceria, panificio, gelateria e laboratorio.";
```

H1 (~lines 239-240) — from:
```tsx
                Gestione ordini e piano di lavoro per pasticceria, panificio e
                laboratorio
```
to:
```tsx
                Gestione ordini e piano di lavoro per pasticceria, panificio,
                gelateria e laboratorio
```

- [ ] **Step 4: Update homepage hero (`src/components/Hero.tsx`)**

H1 second span (~line 46) — from:
```tsx
                Panificio e Ristorante
```
to:
```tsx
                Panificio, Gelateria e Ristorante
```

Hero paragraph (~line 51) — from:
```tsx
              Gestisci ricette, costi, etichette alimentari e produzione del tuo laboratorio di pasticceria, panificio o ristorante.
```
to:
```tsx
              Gestisci ricette, costi, etichette alimentari e produzione del tuo laboratorio di pasticceria, panificio, gelateria o ristorante.
```

AI-extractable block (~line 59) — from:
```tsx
                <strong>LabManager</strong> è il gestionale di pasticceria, panificio e ristorante che permette di gestire ricette, calcolare
```
to:
```tsx
                <strong>LabManager</strong> è il gestionale di pasticceria, panificio, gelateria e ristorante che permette di gestire ricette, calcolare
```

- [ ] **Step 5: Update Footer, Warehouse, DownloadClient, FAQ**

`src/components/Footer.tsx` (~line 99) — from:
```tsx
                Il gestionale completo per pasticceria, panificio e ristorante: gestisci ricette, calcola costi, genera etichette alimentari e monitora la produzione.
```
to:
```tsx
                Il gestionale completo per pasticceria, panificio, gelateria e ristorante: gestisci ricette, calcola costi, genera etichette alimentari e monitora la produzione.
```

`src/components/Warehouse.tsx` (H2, ~line 96) — from:
```tsx
            Gestione magazzino per pasticceria, panificio e ristorante
```
to:
```tsx
            Gestione magazzino per pasticceria, panificio, gelateria e ristorante
```

`src/components/DownloadClient.tsx` (~line 82) — from:
```tsx
            Il gestionale per pasticceria, panificio e ristorante: scegli Android o Windows, funziona offline con sincronizzazione cloud.
```
to:
```tsx
            Il gestionale per pasticceria, panificio, gelateria e ristorante: scegli Android o Windows, funziona offline con sincronizzazione cloud.
```

`src/components/FAQ.tsx` (question, ~line 100) — from:
```ts
    question: "Esistono gestionali gratuiti per pasticceria, panificio o ristorante?",
```
to:
```ts
    question: "Esistono gestionali gratuiti per pasticceria, panificio, gelateria o ristorante?",
```

- [ ] **Step 6: Update global metadata + structured data (`src/app/layout.tsx`)**

`description` (~line 24) — from:
```ts
    "Gestionale per pasticceria, panificio e ristorante: ricette, costi, etichette con allergeni e magazzino. Funziona offline su Android e Windows. Trial gratuito 14 giorni.",
```
to (158 chars, includes gelateria, stays under the ~160 limit):
```ts
    "Gestionale per pasticceria, panificio, gelateria e ristorante: ricette, costi, etichette allergeni e magazzino. Offline su Android e Windows. Prova 14 giorni.",
```

`keywords` — add two entries right after `"gestionale ristorante",` (~line 44):
```ts
    "gestionale ristorante",
    "gestionale gelateria",
    "software gelateria",
```

`openGraph.title` (~line 61) — from:
```ts
    title: "Gestionale Pasticceria e Ristorante: Ricette, Costi, Allergeni | LabManager",
```
to:
```ts
    title: "Gestionale Pasticceria, Gelateria e Ristorante: Ricette, Costi, Allergeni | LabManager",
```

`openGraph.description` (~lines 62-63) — from:
```ts
      "App gestionale per pasticcerie, panifici e ristoranti: gestisci ricette, calcola costi e margini, genera etichette con allergeni. Funziona offline su Android e Windows.",
```
to:
```ts
      "App gestionale per pasticcerie, panifici, gelaterie e ristoranti: gestisci ricette, calcola costi e margini, genera etichette con allergeni. Funziona offline su Android e Windows.",
```

`twitter.description` (~lines 81-82) — from:
```ts
      "Gestisci la tua pasticceria o ristorante con il gestionale completo: ricette, calcolo costi, etichette alimentari con allergeni. Funziona offline.",
```
to:
```ts
      "Gestisci la tua pasticceria, gelateria o ristorante con il gestionale completo: ricette, calcolo costi, etichette alimentari con allergeni. Funziona offline.",
```

`WebSite.description` (~lines 135-136) — from:
```ts
        "Software gestionale per pasticceria, panificio e ristorante: gestisci ricette, ingredienti, costi, etichette alimentari, produzione e vendite.",
```
to:
```ts
        "Software gestionale per pasticceria, panificio, gelateria e ristorante: gestisci ricette, ingredienti, costi, etichette alimentari, produzione e vendite.",
```

`SoftwareApplication.description` (~lines 170-171) — from:
```ts
        "Software gestionale per pasticceria, panificio e ristorante: gestisci ricette, ingredienti, costi, etichette alimentari, produzione e vendite. Funziona offline su Android e Windows. Trial gratuito di 14 giorni.",
```
to:
```ts
        "Software gestionale per pasticceria, panificio, gelateria e ristorante: gestisci ricette, ingredienti, costi, etichette alimentari, produzione e vendite. Funziona offline su Android e Windows. Trial gratuito di 14 giorni.",
```

- [ ] **Step 7: Update `public/llms.txt`**

Opening blockquote (~line 3) — from:
```
> LabManager è il software gestionale per pasticceria disponibile su Android e Windows.
```
to:
```
> LabManager è il software gestionale per pasticceria, panificio, gelateria e ristorante disponibile su Android e Windows.
```
(Edit only the sector phrase; leave the remainder of the line unchanged.)

- [ ] **Step 8: Run the full suite and confirm green**

Run: `npm test`
Expected: PASS — orders suite reflects the new strings; `orders-seo` suite still passes (it does not assert the sector list).

- [ ] **Step 9: Manual sanity check**

Run: search for any remaining bare `panificio e ristorante` / `panificio e laboratorio` in `src/` to confirm intended coverage.
Run: `git grep -n "panificio e ristorante" src public; git grep -n "panificio e laboratorio" src`
Expected: no matches in the files listed in this task (matches elsewhere, if any, are out of scope and should be left).

- [ ] **Step 10: Commit**

```bash
git add src/app/layout.tsx src/app/ordini/page.tsx src/app/ordini/page.test.tsx src/components/Hero.tsx src/components/Footer.tsx src/components/Warehouse.tsx src/components/DownloadClient.tsx src/components/FAQ.tsx public/llms.txt
git commit -m "feat: include gelateria across SEO copy and metadata"
```

---

## Task 3: Fix missing accents in newsletter metadata

**Files:**
- Modify: `src/app/newsletter/page.tsx` (3 string occurrences)

No new test: this is a pure orthographic fix on metadata strings, covered by the build and the existing suite. (Italian correctness is a project requirement; "funzionalita"/"disponibilita" are missing their accents.)

- [ ] **Step 1: Replace the unaccented words**

In `src/app/newsletter/page.tsx`, replace every `funzionalita` with `funzionalità` and every `disponibilita` with `disponibilità`. The three affected strings:

`description` (~line 15) — from:
```ts
    "Iscriviti alla newsletter di LabManager per ricevere aggiornamenti sull'app, nuove funzionalita e disponibilita delle versioni Android e Windows.",
```
to:
```ts
    "Iscriviti alla newsletter di LabManager per ricevere aggiornamenti sull'app, nuove funzionalità e disponibilità delle versioni Android e Windows.",
```

`openGraph.description` (~line 25) and `twitter.description` (~line 41) — both currently:
```ts
      "Ricevi aggiornamenti su LabManager, nuove funzionalita e disponibilita delle versioni Android e Windows.",
```
to:
```ts
      "Ricevi aggiornamenti su LabManager, nuove funzionalità e disponibilità delle versioni Android e Windows.",
```

- [ ] **Step 2: Verify no unaccented forms remain**

Run: `git grep -n "funzionalita\|disponibilita" src/app/newsletter/page.tsx`
Expected: no matches.

- [ ] **Step 3: Run the full suite**

Run: `npm test`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/newsletter/page.tsx
git commit -m "fix: add missing accents in newsletter metadata"
```

---

## Task 4: Sitemap with static per-page lastModified

**Files:**
- Modify: `src/app/sitemap.ts`

Replace `new Date()` (changes every build → unreliable `lastmod`) with literal ISO dates per page, updated by hand when a page's content changes.

- [ ] **Step 1: Rewrite the sitemap entries**

Replace the body of `src/app/sitemap.ts` from:
```ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/ordini`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/newsletter`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
```
to:
```ts
// lastModified is a static per-page date. Update it by hand when the page's
// content changes, so Google receives a reliable freshness signal.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: "2026-06-15",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/ordini`,
      lastModified: "2026-06-15",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: "2026-06-04",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/newsletter`,
      lastModified: "2026-06-15",
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
```

- [ ] **Step 2: Run the full suite**

Run: `npm test`
Expected: PASS — `orders-seo` sitemap test uses `toMatchObject` on url/changeFrequency/priority and is unaffected by the lastModified change.

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "fix: use static lastModified dates in sitemap"
```

---

## Task 5: Robots — stop blocking the crawl of /download

**Files:**
- Modify: `src/app/robots.ts`

`/download` already sets `robots: { index: false, follow: false }` in its page metadata. Google can only read that `noindex` if the page is crawlable, so the robots.txt `Disallow: /download` is counterproductive. Remove it.

- [ ] **Step 1: Remove the disallow**

In `src/app/robots.ts`, ~line 6 — from:
```ts
      { userAgent: "*", allow: "/", disallow: "/download" },
```
to:
```ts
      { userAgent: "*", allow: "/" },
```

- [ ] **Step 2: Run the full suite**

Run: `npm test`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/app/robots.ts
git commit -m "fix: allow crawl of /download so its noindex is honored"
```

---

## Post-implementation verification

- [ ] `npm test` is green.
- [ ] `npm run build` completes without type errors.
- [ ] `git log --oneline -5` shows the five separate commits.

## Out of scope (do not implement here)

New feature pages, guides, comparison pages, `/aggiornamenti` indexing, `aggregateRating`, and the actual deploy of the orders module. The Search Console post-deploy checklist in the spec is manual and outside this plan.
