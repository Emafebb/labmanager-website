# Piano di Verifica e Correzione SEO - pastrylabmanager.com

**Data**: 2026-02-14
**Fonte report**: Seobility SEO Check
**URL analizzato**: https://pastrylabmanager.com/

---

## 1. ERRORE CRITICO: Redirect www vs non-www

### Problema
Il sito risponde sia su `www.pastrylabmanager.com` che su `pastrylabmanager.com` senza un redirect 301 tra le due versioni. Questo causa:
- **Contenuto duplicato**: Google indicizza entrambe le versioni come pagine separate
- **Diluizione del link juice**: i backlink si dividono tra due URL
- **Confusione per i crawler**: non sanno quale sia la versione canonica

### Stato attuale
- `layout.tsx` ha il tag `canonical` impostato su `https://pastrylabmanager.com` (senza www) - CORRETTO
- `metadataBase` punta a `https://pastrylabmanager.com` - CORRETTO
- **MANCANTE**: Nessun redirect 301 da www a non-www

### Azioni correttive

#### A. Vercel Dashboard (PRIORITA MASSIMA)
1. Vai su **Vercel Dashboard > Settings > Domains**
2. Verifica che `pastrylabmanager.com` sia il dominio principale
3. Verifica che `www.pastrylabmanager.com` sia configurato come **redirect** (non alias)
4. Se `www` e' configurato come alias, rimuoverlo e riconfigurarlo come redirect

#### B. Creare `vercel.json` con redirect esplicito (OPZIONALE, backup)
```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": "www.pastrylabmanager.com" }],
      "destination": "https://pastrylabmanager.com/$1",
      "permanent": true
    }
  ]
}
```

#### C. Verifica post-fix
- [ ] Visitare `https://www.pastrylabmanager.com` e verificare il redirect 301 a `https://pastrylabmanager.com`
- [ ] Usare `curl -I https://www.pastrylabmanager.com` per confermare status 301
- [ ] Verificare che l'header `Location` punti a `https://pastrylabmanager.com`
- [ ] Ri-eseguire il check su Seobility per confermare la risoluzione

---

## 2. ANALISI COMPLETA SEO ON-PAGE (basata su audit del codice)

### 2.1 Meta Information - STATO: OK
| Check | Stato | Dettaglio |
|-------|-------|-----------|
| Title tag | OK | "LabManager: Gestionale Pasticceria \| Android & Windows" (56 chars, buona lunghezza) |
| Meta description | OK | 120 chars, contiene keywords principali |
| Canonical URL | OK | Impostato su `https://pastrylabmanager.com` |
| Open Graph | OK | Title, description, image (1200x630), locale it_IT |
| Twitter Card | OK | summary_large_image con immagine |
| Robots meta | OK | index, follow con direttive googleBot |
| hreflang | OK | `it` e `x-default` configurati |
| Favicon | OK | favicon.ico + apple-touch-icon.png presenti |
| Web Manifest | OK | site.webmanifest configurato |

### 2.2 Heading Hierarchy - STATO: OK
| Heading | Contenuto | File |
|---------|-----------|------|
| h1 | "Il gestionale per la tua pasticceria" | Hero.tsx |
| h2 | Sezioni: Features, Platforms, Contact, FAQ | Vari componenti |
| h3 | Sotto-sezioni e card | Vari componenti |

- Solo 1 x `<h1>` sulla pagina - CORRETTO
- Gerarchia h1 > h2 > h3 > h4 rispettata - CORRETTO

### 2.3 Immagini - STATO: OK
| Immagine | next/image | Alt text | Note |
|----------|------------|----------|------|
| Logo (Navbar) | Si | "LabManager" | OK |
| Logo (Footer) | Si | "LabManager" | OK |
| Screenshot Desktop | Si | Descrittivo con keywords | OK |
| Screenshot Tablet | Si | Descrittivo con keywords | OK |
| Screenshot Phone | Si | Descrittivo con keywords | OK |

**Nota**: I nomi file immagini contengono spazi (`Screen Bilanciamento.png`, `screen smartphone.jpg`). Sebbene funzionino con URL encoding, e' best practice rinominarli con trattini.

### 2.4 Structured Data (Schema.org) - STATO: OK
Schema markup presenti:
- `WebSite` con publisher
- `Organization` con logo e contactPoint
- `SoftwareApplication` con features, screenshots, offers
- `Product` con brand e offers
- `HowTo` per installazione APK
- `FAQPage` (generato in FAQ.tsx)

### 2.5 Semantic HTML - STATO: ECCELLENTE
- `<nav>` con aria-label
- `<main>` con id
- `<section>` con aria-labelledby per ogni sezione
- `<footer>` con aria-label
- `<form>` con labels e htmlFor
- Skip-to-content link presente
- ARIA attributes su elementi interattivi (accordion, mobile menu)

### 2.6 Link Analysis - STATO: OK con nota
- Link interni: tutti con hash fragments corretti
- Link esterni: `rel="noopener noreferrer"` su privacy/cookie links
- **Nota**: Verificare che i link download esterni abbiano `rel="noopener noreferrer"`

### 2.7 Robots.txt - STATO: OK
- Allow: /
- Disallow: /download
- Sitemap dichiarata

### 2.8 Sitemap - STATO: OK
- Sitemap dinamica via Next.js
- changeFrequency: weekly, priority: 1

---

## 3. PROBLEMI DA VERIFICARE SUL REPORT SEOBILITY COMPLETO

Poiche' il report completo di Seobility non e' accessibile via scraping (richiede rendering JavaScript), i seguenti aspetti dovrebbero essere verificati manualmente sul sito Seobility:

### 3.1 Page Speed / Performance
- [ ] Verificare Core Web Vitals (LCP, FID, CLS)
- [ ] Controllare tempo di caricamento pagina
- [ ] Verificare compressione GZIP/Brotli (Vercel lo fa di default)
- [ ] Controllare caching headers

### 3.2 Mobile Friendliness
- [ ] Verificare viewport meta tag (Next.js lo aggiunge automaticamente)
- [ ] Verificare touch targets sufficientemente grandi
- [ ] Verificare testo leggibile senza zoom

### 3.3 Server Configuration
- [ ] Verificare HTTPS corretto (certificato valido)
- [ ] Verificare HTTP/2 attivo (Vercel lo abilita di default)
- [ ] Verificare headers di sicurezza (X-Frame-Options, CSP, etc.)

### 3.4 External Factors
- [ ] Verificare presenza su Google Search Console
- [ ] Controllare backlink profile
- [ ] Verificare indicizzazione Google (`site:pastrylabmanager.com`)

---

## 4. CHECKLIST AZIONI PRIORITIZZATE

### Priorita ALTA (da fare subito)
- [ ] **Fix redirect www -> non-www** su Vercel Dashboard
- [ ] Creare `vercel.json` con redirect 301 come backup
- [ ] Verificare il redirect con `curl -I`

### Priorita ALTA (contenuto)
- [ ] **Fix H1 words not in page content**: Le parole dell'H1 ("Il gestionale per la tua pasticceria") non vengono ripetute nel body della pagina. Assicurarsi che termini chiave come "gestionale" e "pasticceria" appaiano anche nel testo dei paragrafi, nelle descrizioni delle features, o in altre sezioni della pagina. Questo migliora la coerenza semantica tra heading e contenuto (Seobility Content check: 8/9).

### Priorita MEDIA (miglioramenti consigliati)
- [ ] Rinominare file immagini rimuovendo spazi (usare trattini)
- [ ] Aggiungere `rel="noopener noreferrer"` ai link download esterni in Download.tsx
- [ ] Verificare performance con Google PageSpeed Insights
- [ ] Registrare il sito su Google Search Console (se non fatto)

### Priorita BASSA (ottimizzazioni)
- [ ] Aggiungere headers di sicurezza in `next.config.ts` (CSP, X-Frame-Options)
- [ ] Considerare aggiunta di `BreadcrumbList` schema per navigazione
- [ ] Ottimizzare immagini con formato WebP/AVIF (next/image lo fa automaticamente)
- [ ] Monitorare Core Web Vitals tramite Vercel Analytics

---

## 5. COME VERIFICARE LA RISOLUZIONE

1. **Ri-eseguire Seobility check**: https://www.seobility.net/en/seocheck/
2. **Google PageSpeed Insights**: https://pagespeed.web.dev/
3. **Google Rich Results Test**: https://search.google.com/test/rich-results (per structured data)
4. **Google Search Console**: Monitorare copertura e errori
5. **Redirect checker**: Verificare con `curl -I https://www.pastrylabmanager.com`

---

## 6. RIEPILOGO

| Area | Punteggio | Note |
|------|-----------|------|
| Meta Information | 9/10 | Tutto ok, canonical presente |
| Heading Structure | 8/10 | Gerarchia ok, ma parole H1 non ripetute nel body |
| Immagini | 9/10 | Alt text ok, nomi file con spazi |
| Structured Data | 10/10 | Schema completo e ricco |
| Semantic HTML | 10/10 | Eccellente uso di landmark e ARIA |
| Link Structure | 8/10 | Manca rel su download links |
| Server/Redirect | 5/10 | **CRITICO: manca redirect www** |
| Robots/Sitemap | 10/10 | Configurazione corretta |

**Punteggio complessivo stimato: 8.5/10** - L'unico problema critico e' il redirect www/non-www.
