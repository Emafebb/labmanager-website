# Welcome Email Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current welcome email template with a new design: 6 feature blocks, CTA download + videocall, personal message from founder, teaser section, and updated footer without unsubscribe link.

**Architecture:** Single file modification — replace the `buildWelcomeEmail()` function in the newsletter API route. The function receives a sanitized `name` string and returns an HTML string. The HTML follows the editorial email style (Playfair Display + DM Sans, verde/crema palette) with MSO/Outlook conditionals and responsive mobile styles.

**Tech Stack:** Next.js 16 App Router, TypeScript, Resend SDK, HTML email (inline styles, table layout)

**Spec:** `docs/superpowers/specs/2026-03-19-welcome-email-design.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/app/api/newsletter/route.ts` | **Modify** (lines 104-249) | Replace `buildWelcomeEmail()` function with new template |

---

## Task 1: Replace Welcome Email Template

**Files:**
- Modify: `src/app/api/newsletter/route.ts:104-249`
- Reference: `C:\Users\emanu\Desktop\GitProjects\Labmanager\landing_pages\email_aggiornamento_android.html` (MSO blocks, hero, footer, "Da Emanuele" pattern)

- [ ] **Step 1: Replace `buildWelcomeEmail()` function**

Replace lines 104-249 in `src/app/api/newsletter/route.ts` with the new template. The function signature stays the same: `function buildWelcomeEmail(name: string): string`.

The new HTML template must include, in order:

**`<head>` section:**
- `<meta charset="UTF-8">`, `<meta name="viewport">`, `<meta name="color-scheme" content="light">`
- `<meta name="x-apple-disable-message-reformatting">`
- `<meta http-equiv="X-UA-Compatible" content="IE=edge">`
- `<link>` Google Fonts: Playfair Display (400, 500) + DM Sans (300, 400, 500, 600)
- MSO conditional `<style>` block (font fallback to Georgia)
- Responsive `<style>`: `@media (max-width: 600px)` with `.mobile-padding { padding-left: 28px !important; padding-right: 28px !important; }` and `.hero-title { font-size: 30px !important; }`

**`<html>` tag attributes:**
- `lang="it"`, `xmlns:v="urn:schemas-microsoft-com:vml"`, `xmlns:o="urn:schemas-microsoft-com:office:office"`

**`<body>` section:**

All content wrapped in outer table (`background: #ede9e1`, `width="100%"`) → inner table (`width="620"`, `max-width: 620px`). The inner table needs an MSO conditional wrapper — copy the exact pattern from the reference email (lines 58-62 and 339-343):
```html
<!--[if mso]>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="620" align="center">
<tr><td>
<![endif]-->
<!-- ... inner table ... -->
<!--[if mso]>
</td></tr></table>
<![endif]-->
```

1. **Preheader** (hidden div): `Grazie per esserti iscritto! Ecco cosa puoi fare con LabManager.`

2. **Top rule**: double-rule editoriale (3px `#1e1b18` + 1px gap `#ede9e1` + 1px `#1e1b18`)

3. **Hero** (`background: #12201a`, padding 52px, class `mobile-padding`):
   - Badge table: `BENVENUTO` — border `1px solid #2a5c3a`, color `#6ee7a0`, DM Sans 10px uppercase
   - `<h1>`: `Ciao ${name}!` — `'Playfair Display', Georgia, serif`, 36px, white
   - `<p>`: `Grazie per esserti iscritto. Da oggi riceverai in anteprima aggiornamenti, nuove funzionalit&agrave; e novit&agrave; pensate per chi lavora in laboratorio.` — DM Sans 15px, `#6a8c78`

4. **Features section** (`background: #faf7f2`, padding 52px, class `mobile-padding`):
   - Section header: eyebrow `COSA PUOI FARE` (DM Sans 9px, `#2d6a44`, uppercase) + title `Tutto in un&rsquo;unica app` (Playfair Display 26px) — with `border-bottom: 1px solid #ddd8cf`
   - 6 feature blocks, each with:
     - Title: `'Playfair Display', Georgia, serif`, 16px, `#1e1b18`
     - Description: DM Sans 13px, `#6a6258`, font-weight 300
     - `border-bottom: 1px solid #e8e3db` + spacer `<td height="20px">` (except last block — no border)
   - Feature content (exact copy from spec):
     1. **Etichette pronte per la stampa** — `Genera etichette con allergeni evidenziati, tabella nutrizionale, barcode, lotto e scadenza. Scegli il formato e stampa in PDF.`
     2. **Calcolo costi e margini** — `Sai esattamente quanto costa ogni ricetta e quanto margine hai su ogni prodotto venduto.`
     3. **Archivio ricette** — `Tutte le tue preparazioni organizzate per categoria. Cerca, filtra e scala le quantit&agrave; in automatico.`
     4. **Dashboard produzione** — `Registra produzioni con codice lotto, monitora vendite per canale e tieni sotto controllo le scadenze.`
     5. **Offline e sincronizzato** — `Funziona senza connessione. Modifichi una ricetta in ufficio, in laboratorio la ricevono aggiornata in tempo reale.`
     6. **Bilanciamento ricette** — `Confronta zuccheri, grassi, acqua, PAC e POD con i valori di riferimento. Feedback visivo immediato per ogni categoria.`

5. **CTA section** (same `<td>` as features, `margin-top: 40px`). Layout: **due blocchi verticali** (non inline), ciascuno con testo + sotto-testo:

   **Blocco 1 — Pulsante primario:**
   - `<a>` button: `SCARICA LABMANAGER` — `background: #1e1b18`, white text, DM Sans 12px uppercase, `padding: 16px 32px`, no border-radius, link to `https://pastrylabmanager.com/download`
   - MSO VML `<v:roundrect>` fallback con `arcsize="0%"` (copiare pattern da reference email lines 233-237)
   - Sotto: `<p>` `Disponibile per Android e Windows` — DM Sans 11px, `#b0a898`, `margin: 14px 0 0 0`

   **Blocco 2 — Link secondario** (`margin-top: 24px`):
   - `<a>`: `SCOPRIAMOLO INSIEME &rarr;` — DM Sans 12px, `#2d6a44`, uppercase, `text-decoration: none`, link to `https://cal.com/labmanager-software-gestionale/scoprire-labmanager`
   - Sotto: `<p>` `Prenota una videocall gratuita &mdash; ti mostro LabManager dal vivo` — DM Sans 11px, `#b0a898`, `margin: 6px 0 0 0`

6. **"Da Emanuele" section** (`background: #faf7f2`, padding `40px 52px`, class `mobile-padding`):
   - Top divider: `1px solid #e8e3db`, full width
   - Eyebrow: `DA EMANUELE` — DM Sans 9px, `#2d6a44`, uppercase
   - Title: `LabManager nasce in laboratorio.` — Playfair Display 20px, `#1e1b18`
   - Text: `L&rsquo;ho creato partendo dai problemi che incontravo ogni giorno: ricette sparse, costi stimati a occhio, etichette fatte a mano. Se hai domande o vuoi raccontarmi come lavori nel tuo laboratorio, rispondimi a questa email. Mi fa piacere.` — DM Sans 14px, `#8a8278`, max-width 460px

7. **Teaser "Prossimamente"** (`background: #eae6de`, padding `36px 52px`, class `mobile-padding`):
   - Eyebrow: `PROSSIMAMENTE` — DM Sans 9px, `#2d6a44`, uppercase
   - Text: `Nelle prossime email: nuove funzionalit&agrave; in arrivo, consigli pratici per il laboratorio e aggiornamenti riservati agli iscritti.` — Playfair Display 17px, `#3a3530`

8. **Footer** (line `1px #1e1b18` sopra, `background: #f3efe8`, padding `40px 52px`, text-align center, class `mobile-padding`):
   - Logo: `LabManager` — Playfair Display 20px
   - Tagline: `Il gestionale per pasticceri professionisti` — DM Sans 10px, `#a09880`, uppercase
   - Links row 1: Sito Web · Download · Contatti (DM Sans 11px, `#6a6258`, dot separator `#c8c0b4`)
   - Links row 2: Privacy Policy only (no unsubscribe link)
   - Copyright: `&copy; 2026 LabManager. Tutti i diritti riservati.` — DM Sans 10px, `#a09880`
   - Note: `Hai ricevuto questa email perch&eacute; ti sei iscritto alla newsletter di LabManager.` — DM Sans 10px, `#b8b0a4`

9. **Bottom rule**: 3px `#1e1b18`

**IMPORTANTE:** La nuova email NON deve contenere riferimenti normativi. Verificare che `EU 1169/2011` e `a norma di legge` non siano presenti nel template.

- [ ] **Step 2: Verify build passes**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Verify linter passes**

Run: `npm run lint`
Expected: No new lint errors (pre-existing errors in other files are OK).

- [ ] **Step 4: Manual visual test**

**Prerequisiti:** dev server running (`npm run dev`), variabili `.env.local` configurate (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`).

Open `http://localhost:3000` in browser. Steps:
1. Clear localStorage (`localStorage.clear()`)
2. Reload page
3. Wait 4 seconds for popup
4. Fill form with test data and submit
5. Check inbox for welcome email
6. Verify: hero, 6 features, CTA buttons (stacked), "Da Emanuele", teaser, footer
7. Verify: nessun riferimento a EU 1169/2011 o "a norma di legge"
8. Verify: nessun link "Cancella iscrizione" nel footer

- [ ] **Step 5: Commit**

```bash
git add src/app/api/newsletter/route.ts
git commit -m "feat: redesign welcome email with 6 features, founder message, and videocall CTA"
```
