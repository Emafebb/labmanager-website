# Newsletter Popup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a modal popup that appears 4 seconds after page load, collects subscriber info (name, email, business type), saves to Supabase + Resend Audience, and sends a welcome email.

**Architecture:** Client-side modal component with localStorage-based display logic → calls server-side API route → API route writes to Supabase (service_role) and Resend (contacts + welcome email). No new client-side dependencies needed.

**Tech Stack:** Next.js 16 App Router, Tailwind 4, TypeScript, @supabase/supabase-js (server-only), Resend SDK, lucide-react

**Spec:** `docs/superpowers/specs/2026-03-19-newsletter-popup-design.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/lib/supabase-server.ts` | **Create** | Server-only Supabase client (service_role key) |
| `src/app/api/newsletter/route.ts` | **Create** | API route: validate, upsert Supabase, add to Resend Audience, send welcome email |
| `src/components/NewsletterPopup.tsx` | **Create** | Client component: modal UI, form, localStorage logic, timer |
| `src/app/page.tsx` | **Modify** | Import and render `<NewsletterPopup />` |
| `.env.local` | **Modify** | Add `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_AUDIENCE_ID` |

---

## Pre-requisites (manual)

- [x] **Supabase:** Tabella `newsletter_subscribers` creata via migration (con RLS service_role, index email, campi: id, name, email, business_type, subscribed_at, created_at, updated_at)
- [x] **`.env.local`:** Variabili `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` configurate
- [x] **Resend:** Audience "LabManager Newsletter" creata, `RESEND_AUDIENCE_ID` configurato in `.env.local`
- [x] **Vercel:** Env vars aggiunte in Vercel Dashboard (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_AUDIENCE_ID)

---

## Task 1: Supabase Server Client

**Files:**
- Create: `src/lib/supabase-server.ts`

- [x] **Step 1: Install @supabase/supabase-js** — Completato
- [x] **Step 2: Create server-only Supabase client** — `src/lib/supabase-server.ts` creato
- [x] **Step 3: Commit** — Completato

---

## Task 2: Newsletter API Route

**Files:**
- Create: `src/app/api/newsletter/route.ts`
- Reference: `src/app/api/contact/route.ts` (same pattern for escapeHtml, Resend init, error handling)

- [x] **Step 1: Create the API route** — `src/app/api/newsletter/route.ts` creato (validazione, escapeHtml, upsert Supabase, Resend Audience, welcome email HTML)
- [x] **Step 2: Verify route starts without errors** — Build produzione passato
- [x] **Step 3: Commit** — Completato

---

## Task 3: Newsletter Popup Component

**Files:**
- Create: `src/components/NewsletterPopup.tsx`
- Reference: `src/components/ContactForm.tsx` (same form pattern, styling, status states)

- [x] **Step 1: Create the popup component** — `src/components/NewsletterPopup.tsx` creato (form, localStorage, animazioni, accessibilità)
- [x] **Step 2: Commit** — Completato

---

## Task 4: Integrate Popup in Page

**Files:**
- Modify: `src/app/page.tsx`

- [x] **Step 1: Add NewsletterPopup to page.tsx** — Import e `<NewsletterPopup />` aggiunti
- [x] **Step 2: Verify end-to-end locally** — Completato

Test checklist:
- [x] Popup appare dopo 4 secondi
- [x] Form valida campi required
- [x] Design esteticamente ok (verificato da screenshot)
- [x] Submit con dati validi → stato successo
- [x] Verifica record su Supabase
- [x] Verifica email di benvenuto ricevuta
- [x] X chiude il popup
- [x] Click fuori chiude il popup
- [x] Escape chiude il popup
- [x] Dopo chiusura, reload → popup NON appare (entro 7 giorni)
- [x] Clear localStorage → popup riappare
- [x] Dopo successo, reload → popup non appare mai più
- [x] Responsive mobile (375px)

- [x] **Step 3: Commit** — Completato

---

## Task 5: Build & Deploy Verification

- [x] **Step 1: Run production build** — Passato senza errori (fix: env var `SUPABASE_service_role` → `SUPABASE_SERVICE_ROLE_KEY`)
- [x] **Step 2: Run linter** — 0 errori nuovi (5 errori pre-esistenti in altri file)
- [x] **Step 3: Supabase migration** — Tabella `newsletter_subscribers` creata via MCP (RLS service_role, index email)
- [x] **Step 4: Final commit** — Completato (merge in master)
- [x] **Step 5: Deploy Vercel** — Push su master effettuato (2026-03-19), deploy automatico Vercel
- [x] **Step 6: Welcome email redesign** — Template riscritto con 6 feature, sezione "Da Emanuele", CTA videocall, teaser. Rimossi EU 1169/2011 e link unsubscribe. Vedi piano dedicato: `docs/superpowers/plans/2026-03-19-welcome-email.md`
