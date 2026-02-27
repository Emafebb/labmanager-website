# Piano Implementazione Fix SEO - pastrylabmanager.com

## Contesto

Dall'audit SEO completato il 27/02/2026 sono emersi diversi problemi tecnici e on-page. Questo piano implementa tutti i fix identificati, organizzati per priorita' e raggruppati in step logici.

---

## Step 1: Fix Critici (blockers)

### 1a. Correggere typo Hero
**File:** `src/components/Hero.tsx:51`
- Cambiare `"pasticceria,paninifio o ristorante"` → `"pasticceria, panificio o ristorante"`
- Fix: typo "paninifio" → "panificio" + aggiungere spazio dopo virgola

### 1b. Eliminare robots.txt statico duplicato
**File:** `public/robots.txt` → ELIMINARE
- Conflitto con `src/app/robots.ts` che genera lo stesso file in build
- Next.js usa `robots.ts` per generare `robots.txt` automaticamente
- Il file statico in `public/` puo' sovrascrivere quello generato

---

## Step 2: Fix Alto Impatto

### 2a. Aggiungere HSTS header
**File:** `next.config.ts`
- Aggiungere nell'array headers:
  ```
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }
  ```

### 2b. Espandere FAQ inventario (risposta troppo breve)
**File:** `src/components/FAQ.tsx`
- La FAQ "Come gestisco l'inventario ingredienti del laboratorio?" ha risposta: "LabManager offrira' presto anche questa opzione."
- Espandere con cosa e' gia' disponibile (gestione ingredienti con costi, valori nutrizionali, semilavorati) e menzionare che inventario avanzato e' in sviluppo
- Mantiene la keyword "inventario ingredienti" e offre valore reale

### 2c. Rinominare file immagini con keyword SEO-friendly
**File:** `public/images/` + tutti i riferimenti nei componenti
- `screen-smartphone.jpg` → `app-gestionale-pasticceria-android.jpg`
- `screenshot-desktop.png` → `software-gestionale-pasticceria-desktop.png`
- `screenshot-tablet.jpg` → `gestionale-pasticceria-tablet-produzione.jpg`
- `screen-bilanciamento.png` → `bilanciamento-ricette-pasticceria.png`
- `Screenshot_sitoweb.png` → `labmanager-homepage-screenshot.png`

File da aggiornare con i nuovi nomi:
- `src/components/Hero.tsx` (3 immagini: desktop, tablet, smartphone)
- `src/app/layout.tsx` (riferimenti screenshot nello schema SoftwareApplication)

### 2d. Aggiungere keyword "panificio" e "ristorante" nei meta
**File:** `src/app/layout.tsx`
- Aggiungere alla lista keywords: `"gestionale panificio"`, `"gestionale ristorante"`, `"software laboratorio alimentare"`
- Aggiornare description per includere panificio/ristorante se lo spazio lo consente

---

## Step 3: Quick Wins

### 3a. Espandere meta description con CTA
**File:** `src/app/layout.tsx:23`
- Da: `"Gestionale pasticceria: gestisci ricette, calcola costi e margini, crea etichette con allergeni. Funziona offline su Android e Windows."`
- A: `"Gestionale pasticceria: gestisci ricette, calcola costi e margini, crea etichette con allergeni. Funziona offline su Android e Windows. Provalo gratis!"` (~155 char)

### 3b. Aggiungere keyword nell'H2 contatti
**File:** `src/components/ContactForm.tsx:45`
- Da: `"Hai domande? Scrivici"`
- A: `"Hai domande sul gestionale? Scrivici"` (aggiunge keyword senza forzare)

### 3c. Rimuovere hreflang x-default
**File:** `src/app/layout.tsx:86`
- Rimuovere la riga `"x-default": BASE_URL` dall'oggetto `alternates.languages`
- Mantenere solo `"it": BASE_URL`

---

## Step 4: Miglioramenti Strutturali (opzionali, post-fix)

### 4a. Aggiungere BreadcrumbList schema
**File:** `src/app/layout.tsx`
- Aggiungere al `@graph` dello structured data:
  ```json
  {
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://pastrylabmanager.com"
    }]
  }
  ```

---

## File Coinvolti (riepilogo)

| File | Modifiche |
|------|-----------|
| `src/components/Hero.tsx` | Fix typo + aggiornare nomi immagini |
| `public/robots.txt` | ELIMINARE |
| `next.config.ts` | Aggiungere HSTS |
| `src/components/FAQ.tsx` | Espandere FAQ inventario |
| `public/images/*` | Rinominare 5 file |
| `src/app/layout.tsx` | Meta description, keywords, hreflang, BreadcrumbList, nomi immagini schema |
| `src/components/ContactForm.tsx` | H2 con keyword |

---

## Verifica

1. `npm run build` — deve completare senza errori
2. `npm run lint` — nessun errore ESLint
3. `npm run dev` — verificare visivamente che:
   - Le immagini si caricano correttamente con i nuovi nomi
   - Il typo nel Hero e' corretto
   - La FAQ inventario ha contenuto espanso
4. Controllare il sorgente HTML renderizzato per verificare:
   - Meta description aggiornata
   - Keywords aggiornate
   - hreflang x-default rimosso
   - HSTS header presente
   - BreadcrumbList schema presente
5. Validare schema su https://search.google.com/test/rich-results
