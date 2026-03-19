# Newsletter Drip Sequence — Spec Tecnica

**Data:** 2026-03-19
**Progetto:** pastrylabmanager.com (labmanager-website)
**Stack:** Next.js + Vercel + Supabase + Resend
**Dipende da:** `2026-03-19-newsletter-popup-design.md`

---

## Obiettivo

Implementare una sequenza automatica di 4 email di onboarding per i nuovi iscritti alla newsletter, attivata dall'iscrizione tramite popup e distribuita su 14 giorni.

| # | Oggetto | Timing | Feature spotlight |
|---|---------|--------|-------------------|
| 1 | "Benvenuto in LabManager!" | Giorno 0 (subito) | Panoramica — **già implementata** |
| 2 | "Stai ancora usando Excel per le ricette?" | Giorno 3 | Archivio Ricette + Ingredienti |
| 3 | "Le tue etichette allergeni sono corrette?" | Giorno 7 | Generatore Etichette |
| 4 | "Sai quanto guadagni davvero per ogni prodotto?" | Giorno 14 | Costi + Dashboard Produzione |

---

## Scelta dell'architettura

### Opzione A — Vercel Cron + Resend ✅ RACCOMANDATA

**Come funziona:** una route API protetta (`/api/newsletter/cron`) gira ogni mattina alle 8:00 via Vercel Cron. Interroga Supabase, trova chi deve ricevere quale email in base a `created_at` e `sequence_step`, invia via Resend, aggiorna il record.

**Pro:**
- Zero nuove dipendenze — usa Resend e Supabase già configurati
- Email in HTML identico alla welcome email (stesso stile verde/crema)
- Controllo totale sul copy, timing e logica di exit
- Nessun costo aggiuntivo (Vercel Hobby: 1 cron incluso; Pro: illimitati)

**Contro:**
- Richiede scrivere il codice del cron (stimato: 2-3 ore)
- Nessun visual builder — la logica vive nel codice

---

### Opzione B — OneSignal Journeys

**Come funziona:** OneSignal è una piattaforma di marketing automation con un builder visuale. Gestisce la sequenza email tramite Journey, sincronizzando i contatti da Supabase via API o webhook.

**Pro:**
- Visual journey builder — nessun codice per la logica della sequenza
- Gestisce automaticamente unsubscribe, bounce, A/B test
- Può aggiungere push notification web/mobile in futuro (utile per l'app Flutter)
- Free tier: fino a 10.000 email/mese

**Contro:**
- Richiede configurare un dominio di invio separato in OneSignal (oltre a Resend)
- Il design email deve essere ricreato nell'editor OneSignal
- Aggiunge una dipendenza esterna (un altro account da gestire)
- La sincronizzazione contatti Supabase → OneSignal richiede un webhook nella API route

**Quando ha senso usarlo:** se in futuro vuoi aggiungere push notification in-app per l'app Flutter LabManager — OneSignal è la scelta naturale per quello scenario, e potresti spostare anche le email lì in quel momento.

**Raccomandazione:** parti con **Opzione A** (Vercel Cron). Integra OneSignal solo quando aggiungi le push notification all'app mobile.

---

## Implementazione — Opzione A (Vercel Cron + Resend)

### Step 1 — Migration Supabase

Aggiungere colonna `sequence_step` alla tabella esistente:

```sql
ALTER TABLE newsletter_subscribers
  ADD COLUMN sequence_step integer NOT NULL DEFAULT 1,
  ADD COLUMN converted_at timestamptz DEFAULT NULL;

COMMENT ON COLUMN newsletter_subscribers.sequence_step IS
  '1=welcome inviata, 2=email2 inviata, 3=email3 inviata, 4=sequenza completata';
COMMENT ON COLUMN newsletter_subscribers.converted_at IS
  'Timestamp quando utente ha scaricato app / creato account. NULL = non ancora convertito.';
```

---

### Step 2 — Variabile d'ambiente

Aggiungere in `.env.local` e su Vercel Dashboard:

```
CRON_SECRET=<stringa-casuale-sicura>   # es. openssl rand -hex 32
```

---

### Step 3 — Route API `/api/newsletter/cron/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
const resend = new Resend(process.env.RESEND_API_KEY!)

export async function GET(request: NextRequest) {
  // Protezione: solo Vercel Cron o chiamate con secret possono eseguire
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const results = { sent: 0, errors: 0 }

  // --- EMAIL 2 (giorno 3+, step=1, non ancora convertiti) ---
  const day3 = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
  const { data: step1 } = await supabase
    .from('newsletter_subscribers')
    .select('id, name, email')
    .eq('sequence_step', 1)
    .is('converted_at', null)
    .lte('created_at', day3.toISOString())

  for (const sub of step1 ?? []) {
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: sub.email,
        subject: 'Stai ancora usando Excel per le ricette?',
        html: buildEmail2(sub.name),
      })
      await supabase
        .from('newsletter_subscribers')
        .update({ sequence_step: 2 })
        .eq('id', sub.id)
      results.sent++
    } catch (e) {
      console.error(`Email 2 failed for ${sub.email}:`, e)
      results.errors++
    }
  }

  // --- EMAIL 3 (giorno 7+, step=2) ---
  const day7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const { data: step2 } = await supabase
    .from('newsletter_subscribers')
    .select('id, name, email')
    .eq('sequence_step', 2)
    .is('converted_at', null)
    .lte('created_at', day7.toISOString())

  for (const sub of step2 ?? []) {
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: sub.email,
        subject: 'Le tue etichette allergeni sono davvero corrette?',
        html: buildEmail3(sub.name),
      })
      await supabase
        .from('newsletter_subscribers')
        .update({ sequence_step: 3 })
        .eq('id', sub.id)
      results.sent++
    } catch (e) {
      console.error(`Email 3 failed for ${sub.email}:`, e)
      results.errors++
    }
  }

  // --- EMAIL 4 (giorno 14+, step=3) ---
  const day14 = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
  const { data: step3 } = await supabase
    .from('newsletter_subscribers')
    .select('id, name, email')
    .eq('sequence_step', 3)
    .is('converted_at', null)
    .lte('created_at', day14.toISOString())

  for (const sub of step3 ?? []) {
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: sub.email,
        subject: 'Sai quanto guadagni davvero per ogni prodotto?',
        html: buildEmail4(sub.name),
      })
      await supabase
        .from('newsletter_subscribers')
        .update({ sequence_step: 4 })
        .eq('id', sub.id)
      results.sent++
    } catch (e) {
      console.error(`Email 4 failed for ${sub.email}:`, e)
      results.errors++
    }
  }

  return NextResponse.json({ ok: true, ...results })
}

// I template HTML delle 3 email vengono definiti qui
// (vedi spec email 2-3-4 per il markup completo — stesso stile welcome email)
function buildEmail2(name: string): string { /* ... */ return '' }
function buildEmail3(name: string): string { /* ... */ return '' }
function buildEmail4(name: string): string { /* ... */ return '' }
```

---

### Step 4 — `vercel.json` (Vercel Cron)

Creare o aggiornare `vercel.json` nella root del progetto:

```json
{
  "crons": [
    {
      "path": "/api/newsletter/cron",
      "schedule": "0 7 * * *"
    }
  ]
}
```

Il cron gira ogni giorno alle **07:00 UTC** (09:00 ora italiana in estate, 08:00 in inverno).

> **Nota Vercel:** il cron su piano Hobby è limitato a 1 job e cadenza minima giornaliera. Il piano Pro permette cadenze più frequenti. Per questa sequenza la cadenza giornaliera è più che sufficiente — al massimo 1 giorno di ritardo rispetto al timing esatto.

> **Autenticazione Vercel Cron:** Vercel invia automaticamente l'header `Authorization: Bearer <CRON_SECRET>` se `CRON_SECRET` è configurato come env var su Vercel. La route deve verificarlo come mostrato nel codice sopra.

---

### Step 5 — Logica di exit (conversione)

Quando un utente scarica l'app o crea un account, marcare il record come convertito per escluderlo dalle email successive:

```typescript
// In qualsiasi punto del codice dove avviene la "conversione"
await supabase
  .from('newsletter_subscribers')
  .update({ converted_at: new Date().toISOString() })
  .eq('email', userEmail)
```

Se non hai ancora un sistema di tracking delle conversioni, puoi farlo manualmente dalla dashboard Supabase per ora.

---

### Step 6 — Stile email (consistenza con welcome email)

Le email 2, 3 e 4 devono usare **lo stesso stile** della welcome email (`email_aggiornamento_android.html`):
- Sfondo hero: `#12201a`
- Palette testo: `#1e1b18`, `#6a6258`
- Font: Playfair Display (titoli), DM Sans (body)
- Sfondo body: `#faf7f2`
- Accenti verde: `#2d6a44`, `#6ee7a0`
- Larghezza: 600px, responsive mobile con media query a 600px
- MSO/Outlook: conditional wrapper + VML button + font fallback Georgia

---

## Flusso completo

```
[Iscrizione popup]
        |
        v
/api/newsletter POST
  → Salva in Supabase (sequence_step = 1)
  → Aggiunge ad Audience Resend
  → Invia Email 1 (welcome) subito
        |
        v
[Vercel Cron — ogni giorno 07:00 UTC]
        |
   ┌────┴────┐
   │         │
step=1     step=2     step=3
+3gg        +7gg       +14gg
   │         │          │
Email 2   Email 3    Email 4
   │         │          │
step→2    step→3     step→4
                        │
                   [Sequenza completata]
                   → Entra in newsletter mensile
                     (broadcast manuale da Resend)

Se converted_at IS NOT NULL → skip in qualsiasi step
```

---

## Checklist di deploy

- [ ] Eseguire migration SQL (aggiunta `sequence_step`, `converted_at`)
- [ ] Aggiungere `CRON_SECRET` in `.env.local` e su Vercel Dashboard
- [ ] Creare file `src/app/api/newsletter/cron/route.ts`
- [ ] Implementare `buildEmail2()`, `buildEmail3()`, `buildEmail4()` con HTML completo
- [ ] Creare/aggiornare `vercel.json` con configurazione cron
- [ ] Deploy su Vercel e verificare che il cron appaia in Vercel Dashboard → Settings → Cron Jobs
- [ ] Test manuale: chiamare `/api/newsletter/cron` con header Authorization corretto
- [ ] Verificare ricezione email di test
- [ ] Monitorare i log Vercel dopo il primo run automatico

---

## Note future — OneSignal

Quando verrà sviluppata la funzionalità di **push notification** per l'app Flutter LabManager, valutare l'integrazione con OneSignal come piattaforma unificata per:
- Push notification in-app (iOS + Android)
- Push notification web (PWA)
- Email marketing con journey builder visuale

In quel momento si potrà valutare se migrare anche la sequenza email da Vercel Cron a OneSignal Journeys, sfruttando il builder no-code per future modifiche al funnel.
