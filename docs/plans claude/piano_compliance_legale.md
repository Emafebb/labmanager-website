# Piano: Compliance Legale (GDPR, Cookie, Privacy)

## Contesto
La landing page LabManager raccoglie dati personali tramite il form contatti (nome, email, messaggio) ma non ha **nessuna infrastruttura legale**: niente Privacy Policy, Cookie Policy, cookie banner, né consenso privacy nel form. Questo viola il GDPR (Reg. UE 2016/679) e la normativa italiana. L'utente è un privato (no P.IVA) e vuole usare **Iubenda** per generare le policy e il cookie banner.

---

## Prerequisito: Setup Iubenda (azione utente)

Prima dell'implementazione, l'utente deve:
1. Creare account su [iubenda.com/it](https://www.iubenda.com/it)
2. Generare Privacy Policy + Cookie Policy (lingua: italiano)
3. Attivare Cookie Solution (banner semplice, solo cookies tecnici)
4. Personalizzare colore banner: background `#4403af`, testo bianco
5. Ottenere: **Site ID**, **Cookie Policy ID**, **Privacy Policy ID**, **snippet JS**

---

## File da modificare (4 file)

### 1. `.env.local` — Variabili Iubenda
Aggiungere:
```env
NEXT_PUBLIC_IUBENDA_SITE_ID=TUO_SITE_ID
NEXT_PUBLIC_IUBENDA_COOKIE_POLICY_ID=TUO_COOKIE_POLICY_ID
NEXT_PUBLIC_IUBENDA_PRIVACY_POLICY_ID=TUO_PRIVACY_POLICY_ID
```

### 2. `src/app/layout.tsx` — Script Iubenda (cookie banner)
- Importare `Script` da `next/script`
- Aggiungere 3 script Iubenda prima di `</body>`:
  1. Script inline con configurazione `_iub.csConfiguration` (siteId, cookiePolicyId, lang: "it", banner con acceptButton)
  2. Script autoblocking: `https://cs.iubenda.com/autoblocking/{SITE_ID}.js`
  3. Script CS: `https://cdn.iubenda.com/cs/iubenda_cs.js`
- Strategy: `afterInteractive` per non bloccare il rendering

### 3. `src/components/ContactForm.tsx` — Checkbox consenso privacy
- Aggiungere stato `privacyAccepted` (useState boolean, default false)
- Inserire checkbox obbligatoria **prima del bottone submit**:
  - Testo: "Ho letto e accetto la **Privacy Policy**" (con link a Iubenda)
  - Stile: `bg-gray-50 rounded-lg border border-gray-200` (coerente col form)
  - Checkbox: `text-primary focus:ring-icon/10`
  - Link: `text-primary font-semibold hover:text-primary-dark underline`, target `_blank`
- Disabilitare submit se `!privacyAccepted`
- Reset checkbox dopo invio riuscito

### 4. `src/components/Footer.tsx` — Link legali
- Aggiungere sezione "Legale" a `footerLinks`:
  - "Privacy Policy" → link Iubenda (target _blank)
  - "Cookie Policy" → link Iubenda (target _blank)
- Aggiornare tipo link per supportare `external?: boolean`
- Aggiungere `target="_blank" rel="noopener noreferrer"` ai link esterni

---

## Agent, Skill e Plugin consigliati

### Per l'implementazione

| Step | Attività | Agent/Skill | Motivazione |
|------|----------|-------------|-------------|
| 1 | Variabili `.env.local` | **Bash** (diretto) | Operazione triviale, nessun agent necessario |
| 2 | Script Iubenda in `layout.tsx` | **`application-performance:frontend-developer`** | Integrazione script Next.js con `next/script`, strategy `afterInteractive`, gestione SSR/CSR |
| 3 | Checkbox consenso in `ContactForm.tsx` | **`application-performance:frontend-developer`** | Componente React con stato, validazione form, styling Tailwind coerente |
| 4 | Link legali in `Footer.tsx` | **`application-performance:frontend-developer`** | Modifica componente UI, aggiunta tipo link esterno, responsive layout |

### Per la revisione e qualità

| Fase | Agent/Skill | Motivazione |
|------|-------------|-------------|
| Post-implementazione | **`code-simplifier:code-simplifier`** | Semplifica e pulisce il codice scritto, mantiene consistenza col codebase |
| Code review | **`feature-dev:code-reviewer`** | Verifica bug, sicurezza (XSS nei link, HTML injection), aderenza alle convenzioni del progetto |
| Review sicurezza | **`backend-api-security:backend-security-coder`** | Verifica che il consenso privacy sia validato anche lato server (`api/contact/route.ts`), non solo client-side |
| Build & verifica | **Bash** (diretto) | `npm run build` e `npm run dev` per test manuali |

### Per deploy

| Fase | Skill | Motivazione |
|------|-------|-------------|
| Deploy su Vercel | **`vercel:deploy`** | Deploy automatico con variabili d'ambiente configurate |
| Setup env vars Vercel | **`vercel:setup`** | Configurazione variabili `NEXT_PUBLIC_IUBENDA_*` nel progetto Vercel |

### Flusso di esecuzione con agent

```
1. Bash                                    → .env.local (variabili Iubenda)
2. frontend-developer (3 task paralleli)   → layout.tsx + ContactForm.tsx + Footer.tsx
3. code-simplifier                         → pulizia codice modificato
4. code-reviewer                           → review qualità e convenzioni
5. backend-security-coder                  → validazione consenso lato server
6. Bash                                    → npm run build (verifica)
7. vercel:setup + vercel:deploy            → deploy produzione
```

> **Nota**: Gli step 2a/2b/2c (layout, ContactForm, Footer) possono essere eseguiti in **parallelo** con 3 istanze di `frontend-developer`, poiché i file sono indipendenti tra loro.

---

## Ordine di esecuzione

```
1. .env.local          → variabili Iubenda
2. layout.tsx          → script cookie banner
3. ContactForm.tsx     → checkbox consenso privacy
4. Footer.tsx          → link legali nel footer
5. Verifica            → npm run dev + npm run build
```

---

## Verifica

1. **Cookie banner**: appare alla prima visita, in italiano, bottone "Accetta", non riappare dopo accettazione
2. **Form contatti**: checkbox obbligatoria, form non inviabile senza spunta, link Privacy Policy funzionante
3. **Footer**: sezione "Legale" visibile, link aprono in nuova tab
4. **Build**: `npm run build` senza errori
5. **Mobile**: layout responsive del checkbox e footer su mobile
