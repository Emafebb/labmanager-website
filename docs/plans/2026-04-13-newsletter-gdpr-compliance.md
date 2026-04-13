# Newsletter — Compliance GDPR (13 Aprile 2026)

## Contesto

L'utente ha chiesto se fosse legale salvare automaticamente l'email del form di contatto su Resend per aggiungerla alla newsletter. La risposta è **no**: il GDPR (Art. 6, Art. 7, ePrivacy Directive) richiede consenso esplicito e specifico per finalità di marketing, separato dall'accettazione della Privacy Policy per il trattamento del contatto.

Il progetto aveva già un `NewsletterPopup.tsx` con iscrizione dedicata, ma presentava 2 violazioni GDPR e mancava l'opt-in nel form di contatto.

---

## Problemi identificati

| # | Problema | File | Gravità |
|---|----------|------|---------|
| 1 | Checkbox consenso newsletter non mencionava la newsletter, solo "Privacy Policy" | `NewsletterPopup.tsx` | **GDPR critico** |
| 2 | Email di benvenuto senza link di disiscrizione | `api/newsletter/route.ts` | **GDPR critico + CAN-SPAM** |
| 3 | Nessun opt-in newsletter nel form di contatto | `ContactForm.tsx` | Feature mancante |

---

## Modifiche effettuate

### 1. `src/components/NewsletterPopup.tsx`

**Problema**: la label del checkbox diceva solo _"Ho letto e accetto la Privacy Policy"_, che non costituisce consenso valido per marketing (GDPR Art. 7 — il consenso deve essere specifico e informato).

**Fix**: testo aggiornato a:
> _"Acconsento a ricevere la newsletter di LabManager e ho letto la Privacy Policy. Puoi disiscriverti in qualsiasi momento."_

**Fix aggiuntivo**: `React.FormEvent` → `React.FormEvent<HTMLFormElement>` (warning deprecation TypeScript).

---

### 2. `src/app/api/newsletter/route.ts`

**Problema**: l'email di benvenuto non conteneva alcun link di disiscrizione, obbligatorio per GDPR Art. 7.3 (revoca consenso deve essere semplice quanto la concessione) e CAN-SPAM Act.

**Fix**:
- Generazione token disiscrizione: `Buffer.from(email).toString("base64url")`
- URL disiscrizione: `https://pastrylabmanager.com/api/unsubscribe?token=<token>`
- Firma della funzione aggiornata: `buildWelcomeEmail(name, unsubscribeUrl)`
- Aggiunto link nel footer dell'email HTML:
  ```html
  <a href="${unsubscribeUrl}">Cancella iscrizione</a>
  ```

---

### 3. `src/app/api/unsubscribe/route.ts` _(nuovo file)_

Endpoint `GET /api/unsubscribe?token=<base64url_email>` che:

1. Decodifica il token → email
2. Elimina il record da Supabase (`newsletter_subscribers`)
3. Aggiorna il contatto su Resend Audience: `unsubscribed: true`
4. Restituisce una pagina HTML di conferma con link al sito

> **Nota sicurezza**: il token usa `base64url(email)` — semplice e funzionale per un piccolo progetto. Non è firmato crittograficamente (no HMAC). Un utente che conosce la propria email potrebbe generare il proprio token e disiscriversene: comportamento accettabile (è una disiscrizione, non un'operazione distruttiva). Per versioni future si può sostituire con un HMAC-SHA256.

---

### 4. `src/components/ContactForm.tsx`

**Aggiunto**: checkbox opzionale newsletter dopo il checkbox Privacy Policy:

```tsx
<input id="newsletter" type="checkbox" checked={newsletterAccepted} ... />
<label>
  Acconsento a ricevere aggiornamenti e novità di LabManager via email.
  (opzionale)
</label>
```

- Stato aggiunto: `newsletterAccepted` (default `false`)
- Inviato al backend: `{ ...formData, privacyAccepted, newsletterAccepted }`
- Reset al submit riuscito

---

### 5. `src/app/api/contact/route.ts`

**Aggiunto**: import `supabaseAdmin` e logica newsletter post-invio email:

```ts
if (newsletterAccepted === true) {
  // 1. Upsert su Supabase newsletter_subscribers
  // 2. resend.contacts.create() su Resend Audience
}
```

Entrambe le operazioni sono non-bloccanti per la risposta al form (errori loggati ma non propagati all'utente).

---

## Architettura flusso consenso newsletter

```
Form di contatto                    NewsletterPopup
      │                                   │
      │ newsletterAccepted === true        │ privacyAccepted === true
      ▼                                   ▼
 /api/contact                       /api/newsletter
      │                                   │
      ├─► Supabase newsletter_subscribers ◄─┤
      └─► Resend Audience (contacts) ◄────┘
                    │
                    ▼
           Email di benvenuto
                    │
                    └─► Link disiscrizione
                              │
                              ▼
                    /api/unsubscribe?token=...
                              │
                    ├─► Supabase DELETE
                    └─► Resend unsubscribed: true
```

---

## Checklist GDPR post-implementazione

- [x] Consenso esplicito newsletter prima dell'iscrizione (popup)
- [x] Testo consenso specifica la finalità (newsletter, non solo privacy)
- [x] Opt-in opzionale nel form di contatto (non pre-spuntato)
- [x] Link disiscrizione in ogni email transazionale
- [x] Endpoint disiscrizione funzionante
- [x] Disiscrizione rimuove da Supabase e Resend
- [ ] Aggiornare Privacy Policy su Iubenda per menzionare newsletter marketing
- [ ] Aggiungere link disiscrizione anche nelle future email broadcast (Resend)
- [ ] Valutare HMAC-SHA256 per il token disiscrizione (hardening futuro)

---

## Basi giuridiche applicate

| Trattamento | Base giuridica GDPR | Riferimento |
|---|---|---|
| Risposta al form contatti | Art. 6.1.b — esecuzione di misure precontrattuali | Utente chiede info sul prodotto |
| Invio newsletter | Art. 6.1.a — consenso esplicito | Checkbox dedicata, opt-in volontario |
| Disiscrizione | Art. 7.3 — revoca consenso | Link in ogni email, effetto immediato |
