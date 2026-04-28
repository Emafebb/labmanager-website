# Piano: Compliance Legale (GDPR, Cookie, Privacy)

## Stato attuale

La landing page LabManager raccoglie dati personali tramite form contatti e iscrizione newsletter. La compliance legale e' gestita con **LegalBlink**:

- Privacy Policy pubblica
- Cookie Policy pubblica
- CMP/cookie banner con blocco automatico e consent mode
- Checkbox privacy obbligatoria nei form dove necessario
- Link per aggiornare le preferenze cookie dal footer

## Documenti LegalBlink

- Privacy Policy: `https://app.legalblink.it/api/documents/69e89f282420950024cb1a58/privacy-policy-per-siti-web-o-e-commerce-it`
- Cookie Policy: `https://app.legalblink.it/api/documents/69e89f282420950024cb1a58/cookie-policy-it`

## Integrazione CMP

Lo script CMP e' inserito in `src/app/layout.tsx` con `next/script`:

```tsx
<Script
  id="legalblink-cmp"
  type="text/javascript"
  src="https://app.legalblink.it/api/scripts/cmp/loader.js"
  strategy="afterInteractive"
  data-license-id="69e89f282420950024cb1a5e"
  data-blocking-mode="auto"
  data-consent-mode="true"
/>
```

## File coinvolti

### `src/app/layout.tsx`

- Carica il CMP LegalBlink dopo l'idratazione.
- E' l'unica integrazione CMP prevista dal sito.
- Deve restare prima degli script terzi principali, cosi' il consenso viene inizializzato in anticipo.

### `next.config.ts`

La Content Security Policy deve consentire LegalBlink:

- `script-src`: `https://app.legalblink.it`
- `style-src`: `https://app.legalblink.it`
- `connect-src`: `https://app.legalblink.it`
- `frame-src`: `https://app.legalblink.it`

### `src/components/Footer.tsx`

La sezione "Legale" contiene:

- `Privacy Policy` -> documento LegalBlink
- `Cookie Policy` -> documento LegalBlink
- `Aggiorna preferenze cookie` -> link con `data-lb="c-settings"`

### `src/components/ContactForm.tsx`

- Checkbox privacy obbligatoria.
- Submit disabilitato se `privacyAccepted` e' falso.
- Link Privacy Policy puntato al documento LegalBlink.

### `src/components/NewsletterPopup.tsx`

- Checkbox privacy/newsletter obbligatoria per l'iscrizione.
- Link Privacy Policy puntato al documento LegalBlink.

### API

- `src/app/api/contact/route.ts` valida `privacyAccepted`.
- `src/app/api/newsletter/route.ts` valida `privacyAccepted`.

## Verifica

1. Il banner cookie LegalBlink appare alla prima visita in sessione pulita.
2. Il link "Aggiorna preferenze cookie" riapre le preferenze CMP.
3. Privacy Policy e Cookie Policy aprono documenti LegalBlink pubblici.
4. I form non sono inviabili senza consenso privacy dove richiesto.
5. `npm run build` completa senza errori.
6. Nessun riferimento a provider CMP precedenti resta in `src` o `next.config.ts`.

## Note operative

- Non sono necessarie variabili `NEXT_PUBLIC_*` per LegalBlink nell'implementazione attuale.
- Se gli URL LegalBlink cambiano, aggiornare le costanti nei componenti e ripetere la verifica con `curl -I -L`.
- Se il CMP richiede nuovi domini, aggiornare anche la CSP in `next.config.ts`.
