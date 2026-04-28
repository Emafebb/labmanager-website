# Newsletter Popup — Design Spec

**Data:** 2026-03-19
**Progetto:** pastrylabmanager.com (labmanager-website)
**Stack:** Next.js 16 + Tailwind 4 + TypeScript + Resend + Supabase + Vercel

---

## Obiettivo

Creare un modal popup che appare all'apertura del sito per raccogliere contatti (lead generation) e iscrivere gli utenti a una newsletter per ricevere aggiornamenti sulle novità di LabManager. I contatti vengono salvati sia su Supabase (database proprio) sia sull'Audience Resend (per invio broadcast).

## Componenti

### 1. Modal Popup (`NewsletterPopup.tsx`)

Componente client-side (`"use client"`) con gestione SSR-safe di `localStorage` e `setTimeout`.

**Trigger:** appare dopo **4 secondi** dal caricamento della pagina (via `useEffect` + `setTimeout`).

**Layout:** modal overlay centrato con sfondo `rgba(0,0,0,0.5)` con fade-in per il backdrop e scale-in per la card.

**Contenuto:**
- Pulsante X chiusura (alto a destra)
- Icona decorativa (lucide-react `Bell` o `Sparkles`)
- Titolo: "Resta aggiornato su LabManager"
- Sottotitolo: "Ricevi in anteprima novità, aggiornamenti e nuove funzionalità per il tuo laboratorio."
- Form con 3 campi:
  - **Nome** (text, required)
  - **Email** (email, required)
  - **Tipo di attività** (select, opzionale): Pasticceria, Panificio, Ristorante, Altro
- Checkbox privacy policy (link LegalBlink `https://app.legalblink.it/api/documents/69e89f282420950024cb1a58/privacy-policy-per-siti-web-o-e-commerce-it`, stessa del ContactForm)
- Bottone "Iscriviti" in colore `primary`
- Stato successo: messaggio di conferma con icona check verde

**Stile:** coerente con il design system esistente — card bianca, `border-card-border/25`, `shadow-lg`, font DM Sans, colori `primary`/`icon`. Responsive: su mobile la card occupa quasi tutta la larghezza con padding ridotto.

**Accessibilità:**
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` sul titolo
- Focus trap all'interno del modal
- Chiusura con tasto Escape

**Comportamento chiusura:**
- Click su X
- Click fuori dal modal (backdrop)
- Tasto Escape

**Logica localStorage (SSR-safe — accesso solo in `useEffect`):**
- `newsletter_subscribed: "true"` → popup **non appare mai più**
- `newsletter_dismissed: "<timestamp>"` → popup **riappare dopo 7 giorni** dall'ultima chiusura
- Se nessun valore → popup appare normalmente dopo 4 secondi

### 2. API Route (`POST /api/newsletter/route.ts`)

Route server-side Next.js (nessun `"use client"`, le credenziali restano sul server).

**Input:**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "businessType": "string | null (optional)",
  "privacyAccepted": "boolean (required, must be true)"
}
```

**Flusso:**
1. Validazione input (name, email required, privacyAccepted must be true)
2. Validazione formato email (regex base)
3. Sanitizzazione HTML (funzione `escapeHtml` come in `/api/contact/route.ts`)
4. Upsert in tabella Supabase `newsletter_subscribers` (`onConflict: "email"` — se esiste già, aggiorna nome/business_type, successo silenzioso)
5. Aggiunta contatto all'Audience Resend via `resend.contacts.create({ audienceId, email, firstName, unsubscribed: false })`
6. Invio email di benvenuto via `resend.emails.send()` — se fallisce, logga l'errore ma ritorna comunque successo (il contatto è salvato)
7. Risposta `{ success: true }`

**Gestione errori:**
- Validazione fallita → `400 { error: "..." }`
- Errore Supabase/Resend → `500 { error: "Errore durante l'iscrizione" }` + `console.error` lato server
- Email di benvenuto fallita → NON blocca il flusso (log + successo)

**Rate limiting:** protezione tramite Vercel middleware o header check per prevenire abuso da bot sul form pubblico.

### 3. Tabella Supabase `newsletter_subscribers`

```sql
CREATE TABLE newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  business_type text,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- RLS: solo service_role può fare tutto
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Nessuna policy pubblica — l'insert avviene tramite service_role dalla API route server-side
```

L'accesso alla tabella avviene esclusivamente dalla API route server-side usando `SUPABASE_SERVICE_ROLE_KEY`. Nessun accesso diretto dal client.

### 4. Resend Audience

- Creare un'Audience nella dashboard Resend (es. "LabManager Newsletter")
- Ogni iscritto viene aggiunto all'audience tramite `resend.contacts.create()`
- L'audience è pronta per broadcast futuri direttamente da Resend
- La disiscrizione è gestita automaticamente da Resend tramite `{{unsubscribe_url}}`

### 5. Email di Benvenuto

**From:** indirizzo configurato in `RESEND_FROM_EMAIL`
**Subject:** "Benvenuto in LabManager!"

**Stile:** editoriale (Playfair Display + DM Sans, palette verde/crema). Riferimento: `landing_pages/email_aggiornamento_android.html`. Spec dedicata: `docs/superpowers/specs/2026-03-19-welcome-email-design.md`.

**Contenuto HTML (redesign completato 2026-03-19):**
- Hero con badge BENVENUTO, saluto personalizzato, sottotitolo
- 6 feature blocks: Etichette, Costi/Margini, Archivio ricette, Dashboard produzione, Offline/sync, Bilanciamento
- CTA stacked: pulsante SCARICA LABMANAGER (con VML fallback MSO) + link videocall Cal.com
- Sezione "Da Emanuele" — messaggio personale del fondatore
- Teaser "Prossimamente" per future email
- Footer: Privacy Policy, copyright, nota iscrizione (nessun link unsubscribe — email transazionale one-time)
- MSO/Outlook: conditional wrapper, VML button, font fallback Georgia
- Responsive: media query 600px con mobile-padding

**Note:** Nessun riferimento normativo (EU 1169/2011). Nessun link "Cancella iscrizione" (email transazionale, non broadcast). Il link unsubscribe sarà presente nelle future broadcast via Resend Audience.

**Consenso:** single opt-in con checkbox esplicita non pre-selezionata. Sufficiente per il contesto (target ristretto, non marketing di massa).

## Variabili d'ambiente

**Esistenti (riutilizzate):**
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `NEXT_PUBLIC_SUPABASE_URL` (se presente)

**Nuove:**
- `SUPABASE_SERVICE_ROLE_KEY` — per insert lato server (mai esposto al client)
- `RESEND_AUDIENCE_ID` — ID dell'audience Resend per la newsletter

## Integrazione nella pagina

Il componente `NewsletterPopup` viene aggiunto in `page.tsx` (home page) come componente client-side. Essendo `"use client"`, può essere importato direttamente in un Server Component.

## File da creare/modificare

| File | Azione |
|------|--------|
| `src/components/NewsletterPopup.tsx` | **Nuovo** — componente modal popup |
| `src/app/api/newsletter/route.ts` | **Nuovo** — API route server-side |
| `src/app/page.tsx` | **Modifica** — aggiunta `<NewsletterPopup />` |
| `.env.local` | **Modifica** — aggiunta `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_AUDIENCE_ID` |

## Azioni manuali — Stato

| Azione | Dove | Stato |
|--------|------|-------|
| Creare tabella `newsletter_subscribers` | Supabase (migration MCP) | **Completato** — con RLS service_role, index email, campi aggiuntivi (created_at, updated_at) |
| Aggiungere `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | `.env.local` | **Completato** |
| Creare Audience "LabManager Newsletter" | Resend Dashboard → Audiences | **Completato** |
| Copiare `audienceId` in `.env.local` come `RESEND_AUDIENCE_ID` | `.env.local` | **Completato** |
| Aggiungere env vars su Vercel | Vercel Dashboard → Settings → Environment Variables | **Completato** (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_AUDIENCE_ID) |

## Note implementazione

- La tabella Supabase ha schema leggermente diverso dalla spec originale: aggiunto `created_at`, `updated_at`, rimosso `is_active` (non necessario — la disiscrizione è gestita da Resend)
- L'env var in `.env.local` era stata salvata come `SUPABASE_service_role` (minuscolo) — corretta in `SUPABASE_SERVICE_ROLE_KEY`
- Il `RESEND_AUDIENCE_ID` non è ancora configurato — l'aggiunta Audience Resend fallirà silenziosamente (non-blocking), ma il contatto viene salvato su Supabase
