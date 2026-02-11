# PIANO DI IMPLEMENTAZIONE SEO - LabManager Website

**Data:** 11 Febbraio 2026
**Basato su:** Audit SEO completo (Structure Architect + Keyword Strategist + Meta Optimizer)
**Score attuale:** 6.8/10
**Score target:** 8.5/10

---

## INDICE

1. [Riepilogo Audit](#1-riepilogo-audit)
2. [Fase 1 - Quick Wins Metadata](#2-fase-1---quick-wins-metadata-settimana-1)
3. [Fase 2 - Struttura & Keyword Optimization](#3-fase-2---struttura--keyword-optimization-settimana-2)
4. [Fase 3 - Content Expansion & LSI](#4-fase-3---content-expansion--lsi-settimana-3-4)
5. [Fase 4 - Content Strategy](#5-fase-4---content-strategy-mese-2-3)
6. [Agent da Utilizzare](#6-agent-da-utilizzare-per-ogni-fase)
7. [File da Modificare](#7-mappa-file-da-modificare)
8. [Metriche di Successo](#8-metriche-di-successo)

---

## 1. RIEPILOGO AUDIT

### Score per Area

| Area | Score Attuale | Score Target | Gap |
|------|:---:|:---:|:---:|
| Header Hierarchy (H1-H6) | 5/10 | 8/10 | -3 |
| Schema Markup / JSON-LD | 7/10 | 9/10 | -2 |
| Internal Linking | 7.5/10 | 8.5/10 | -1 |
| Content Flow & Structure | 6/10 | 8/10 | -2 |
| Keyword Density | 6.5/10 | 8/10 | -1.5 |
| LSI & Semantic Keywords | 5.4/10 | 8/10 | -2.6 |
| Long-tail Coverage | 4.2/10 | 7.5/10 | -3.3 |
| Meta Title | 7/10 | 9/10 | -2 |
| Meta Description | 8.5/10 | 9.5/10 | -1 |
| Open Graph | 8.2/10 | 9/10 | -0.8 |
| Twitter Card | 7.8/10 | 9/10 | -1.2 |
| Canonical / hreflang | 6.5/10 | 8/10 | -1.5 |
| Robots Directives | 9.2/10 | 9.2/10 | 0 |

### Top 5 Criticita'

1. **Long-tail keyword quasi assenti** (4.2/10) - Solo ~15% delle opportunita' catturate
2. **Header Hierarchy rotta** (5/10) - H1 non allineato, H3 orfani, salti di gerarchia
3. **LSI e variazioni semantiche deboli** (5.4/10) - Mancano 15-20 variazioni importanti
4. **"pasticceria" over-ottimizzata** (2.1% vs target 1.5%) - Rischio keyword stuffing
5. **Sezione Download MANCANTE** - Nessun link esplicito a Play Store / Microsoft Store

### Keyword Gap Principali (da KEYWORD_AUDIT.md)

| Keyword Mancante | Volume/mese | Difficolta' | Priorita' |
|------------------|:-----------:|:-----------:|:---------:|
| calcolo costi ricetta | 1.200 | Bassa | CRITICA |
| gestione lotti produzione | 720 | Bassa | ALTA |
| gestione inventario laboratorio | 850 | Bassa | ALTA |
| software free pasticceria | 510 | Bassa | ALTA |
| analisi composizione ricetta | 420 | Media | MEDIA |
| valori nutrizionali ricette | 420 | Media | MEDIA |
| tracciabilita' ingredienti | 640 | Media | MEDIA |

---

## 2. FASE 1 - Quick Wins Metadata (Settimana 1)

**Effort totale: ~2 ore | Impatto stimato: +5-8% CTR SERP**

### Task 1.1 - Aggiornare Meta Title
**File:** `src/app/layout.tsx` (riga 17)
**Agent:** `seo-technical-optimization:seo-meta-optimizer`

```
PRIMA:  "LabManager - Il tuo braccio destro in laboratorio" (50 char)
DOPO:   "LabManager - Software Gestionale Pasticceria | Ricette e Costi" (63 char)
```

Motivazione: Il title attuale non contiene keyword target. Aggiungere "Software Gestionale Pasticceria" + "Ricette e Costi" copre le keyword primarie e secondarie.

### Task 1.2 - Aggiornare Meta Description
**File:** `src/app/layout.tsx` (riga 21)
**Agent:** `seo-technical-optimization:seo-meta-optimizer`

```
PRIMA:  "L'app completa per gestire la tua pasticceria: ricette, ingredienti, costi,
         etichette alimentari, produzione e vendite. Disponibile per Android e Windows." (158 char)

DOPO:   "Gestisci la tua pasticceria in modo professionale: ricette, costi, etichette
         alimentari e produzione. Software gratuito per Android e Windows. Scarica subito!" (158 char)
```

Motivazione: Aggiunge CTA esplicito ("Scarica subito!"), USP ("gratuito"), power word ("professionale").

### Task 1.3 - Fix Keywords Meta (rimuovere duplicato + espandere)
**File:** `src/app/layout.tsx` (righe 23-35)
**Agent:** `seo-technical-optimization:seo-keyword-strategist`

- Rimuovere duplicato "etichette alimentari"
- Aggiungere: "software gestionale pasticceria", "calcolo costi ricette", "app ricette pasticceria", "tracciabilita' ingredienti", "valori nutrizionali ricette"

### Task 1.4 - Aggiungere x-default hreflang
**File:** `src/app/layout.tsx` (riga 76)
**Agent:** `seo-technical-optimization:seo-meta-optimizer`

```typescript
alternates: {
  canonical: BASE_URL,
  languages: {
    "it": BASE_URL,
    "x-default": BASE_URL,  // NUOVO
  },
},
```

### Task 1.5 - Ottimizzare Open Graph
**File:** `src/app/layout.tsx` (righe 38-54)
**Agent:** `seo-technical-optimization:seo-meta-optimizer`

- OG title differenziato per social: "LabManager: Gestisci la tua Pasticceria Professionalmente"
- OG description con USP: "Software gratuito per pasticcerie. Ricette, costi, etichette. Funziona offline. Nessun abbonamento!"
- Aggiungere `secureUrl` per immagine
- Migliorare alt text immagine OG

### Task 1.6 - Ottimizzare Twitter Card
**File:** `src/app/layout.tsx` (righe 55-61)
**Agent:** `seo-technical-optimization:seo-meta-optimizer`

- Title: "LabManager: Gestione Pasticceria Gratis & Offline"
- Description potenziata con CTA
- Aggiungere `site` e `creator` (se account Twitter esiste)

---

## 3. FASE 2 - Struttura & Keyword Optimization (Settimana 2)

**Effort totale: ~3-4 ore | Impatto stimato: +200-400 ricerche/mese**

### Task 2.1 - Riscrivere H1 con keyword primaria
**File:** `src/components/Hero.tsx` (riga 9)
**Agent:** `seo-technical-optimization:seo-structure-architect`

```
PRIMA:  "La tua pasticceria, sempre con te"
DOPO:   "Il Software per la Tua Pasticceria, sempre con te"
```

Motivazione: L'H1 attuale non contiene alcuna keyword target. Aggiungere "Software" + "Pasticceria" mantiene l'emozione e migliora il SEO. L'H1 deve essere coerente col meta title.

### Task 2.2 - Potenziare Hero body text
**File:** `src/components/Hero.tsx` (riga 14-16)
**Agent:** `seo-technical-optimization:seo-keyword-strategist`

Aggiungere keyword "app pasticceria" e "calcolo costi" nel paragrafo Hero.

### Task 2.3 - Ottimizzare Features H2
**File:** `src/components/Features.tsx` (riga 98)
**Agent:** `seo-technical-optimization:seo-structure-architect`

```
PRIMA:  "Tutto cio' che serve al tuo laboratorio"
DOPO:   Mantenere H2 semplice MA aggiungere keyword nel subtitle (gia' presente: "Software gestionale per pasticceria con strumenti professionali")
```

### Task 2.4 - Aggiungere Feature Card "Calcolo Costi Ricette"
**File:** `src/components/Features.tsx` (array features, riga 16)
**Agent:** `seo-technical-optimization:seo-keyword-strategist`

Nuova card con icon `Calculator`:
- Title: "Calcolo Costi Ricette"
- Description: "Calcola automaticamente i costi di ogni ricetta con analisi dettagliata di materie prime, manodopera e costi strutturali. Monitora margini di guadagno."

Questa keyword ha 1.200 ricerche/mese e attualmente e' a 0 occorrenze.

### Task 2.5 - Arricchire descrizioni feature con LSI keywords
**File:** `src/components/Features.tsx`
**Agent:** `seo-technical-optimization:seo-keyword-strategist`

Per ogni feature card, aggiungere 1-2 variazioni semantiche naturali:
- "Bilanciamento" -> aggiungere "analisi composizione ricetta"
- "Dashboard" -> aggiungere "lotti produzione", "tracciabilita'"
- "Ingredienti & Semilavorati" -> aggiungere "inventario", "gestione ingredienti"
- "Tabella Nutrizionale" -> aggiungere "valori nutrizionali ricette"

### Task 2.6 - Ottimizzare Platforms section
**File:** `src/components/Platforms.tsx`
**Agent:** `seo-technical-optimization:seo-keyword-strategist`

- Smartphone title: "Sempre in tasca" -> "Gestionale Pasticceria in Tasca"
- Aggiungere keyword "gestionale", "ingredienti" nelle descrizioni platform

### Task 2.7 - Migliorare Schema JSON-LD
**File:** `src/app/layout.tsx` (righe 89-136)
**Agent:** `seo-technical-optimization:seo-structure-architect`

- Convertire `featureList` da stringa a array
- Aggiungere `ImageObject` per screenshot
- Aggiungere `sameAs` con profili social nell'Organization
- Aggiungere `downloadUrl` per link store (se disponibili)
- Valutare aggiunta `BreadcrumbList`

### Task 2.8 - Creare sezione Download
**File:** Nuovo componente `src/components/Download.tsx` + aggiornare `src/app/page.tsx`
**Agent:** `frontend-mobile-development:frontend-developer` (per UI) + `seo-technical-optimization:seo-structure-architect` (per struttura)

Creare sezione tra FAQ e Footer con:
- H2: "Scarica LabManager Gratis"
- CTA per Google Play Store
- CTA per Microsoft Store / Download diretto
- Badge "Gratuito", "Offline", "Nessun abbonamento"

Questa e' la criticita' piu' grave: manca completamente la conversione principale del sito.

---

## 4. FASE 3 - Content Expansion & LSI (Settimana 3-4)

**Effort totale: ~3 ore | Impatto stimato: +250-400 ricerche/mese**

### Task 3.1 - Aggiungere 4 nuove FAQ
**File:** `src/components/FAQ.tsx` (array faqs)
**Agent:** `seo-technical-optimization:seo-keyword-strategist` + `seo-technical-optimization:seo-snippet-hunter`

Nuove domande mirate a long-tail keywords:

1. **"Come calcolo i costi delle ricette?"** -> Target: "calcolo costi ricetta" (1.200/mese)
2. **"Come gestisco l'inventario ingredienti?"** -> Target: "gestione ingredienti" (920/mese)
3. **"Posso tracciare i lotti di produzione?"** -> Target: "gestione lotti produzione" (720/mese)
4. **"LabManager e' veramente gratuito?"** -> Target: "software free pasticceria" (510/mese)

### Task 3.2 - Ridurre over-optimization "pasticceria"
**File:** `src/components/FAQ.tsx`, `src/components/Features.tsx`
**Agent:** `seo-technical-optimization:seo-keyword-strategist`

- Ridurre da 38 a ~28 occorrenze
- Sostituire alcune con sinonimi LSI: "laboratorio", "attivita'", "bottega"
- Nelle FAQ: sostituire "ricette" ripetuto con "formule", "preparazioni", "procedimenti"

### Task 3.3 - Raggruppare FAQ per temi
**File:** `src/components/FAQ.tsx`
**Agent:** `seo-technical-optimization:seo-structure-architect`

Organizzare le FAQ in categorie tematiche con H3:
- Prezzo e Disponibilita'
- Funzionalita' e Caratteristiche
- Sicurezza e Dati
- Piattaforme e Dispositivi

### Task 3.4 - Ottimizzare FAQ per Featured Snippets
**File:** `src/components/FAQ.tsx`
**Agent:** `seo-technical-optimization:seo-snippet-hunter`

- Formattare risposte per "position zero" di Google
- Aggiungere liste puntate nelle risposte piu' lunghe
- Assicurarsi che le prime 40-60 parole di ogni risposta siano auto-contenute
- Verificare che il FAQPage JSON-LD sia completo con le nuove domande

### Task 3.5 - Aggiungere link interni contestuali
**File:** Vari componenti
**Agent:** `seo-technical-optimization:seo-structure-architect`

- Feature cards: linkare a FAQ correlate (es. "Etichette" -> FAQ "L'app genera etichette?")
- FAQ risposte: linkare a #contatti per demo
- Platforms: linkare a #funzionalita per dettagli
- Aggiungere "back-to-top" nel footer

### Task 3.6 - Creare sitemap.xml e robots.txt
**File:** Nuovi file nella root / configurazione Next.js
**Agent:** `seo-technical-optimization:seo-structure-architect`

```
// robots.txt
User-agent: *
Allow: /
Sitemap: https://pastrylabmanager.com/sitemap.xml

// sitemap.xml (generato da Next.js)
```

---

## 5. FASE 4 - Content Strategy (Mese 2-3)

**Effort totale: ~15-20 ore | Impatto stimato: +500-1000 ricerche/mese**

### Task 4.1 - Pianificare Blog / Content Hub
**Agent:** `seo-content-creation:seo-content-planner`

Creare piano editoriale con topic cluster:
- Pillar: "Software Gestionale Pasticceria"
- Cluster 1: Gestione ricette e formule
- Cluster 2: Calcolo costi e pricing
- Cluster 3: Compliance, etichette, allergeni
- Cluster 4: Produzione e operations

### Task 4.2 - Scrivere 3-5 Blog Post SEO-Optimized
**Agent:** `seo-content-creation:seo-content-writer` + `seo-technical-optimization:seo-keyword-strategist`

Post suggeriti (ordinati per impatto):
1. "Calcolo Costi Ricette Pasticceria: Guida Completa 2026" (target: 1.200/mese)
2. "Come Gestire un Laboratorio di Pasticceria nel 2026" (target: 850/mese)
3. "Etichette Alimentari per Dolci: Normativa e Guida Pratica" (target: 640/mese)
4. "Migliori Software Pasticceria 2026: Confronto e Recensioni" (target: 510/mese)
5. "Bilanciamento Ricette: Composizione e Analisi Nutrizionale" (target: 420/mese)

### Task 4.3 - Audit Contenuti Pubblicati
**Agent:** `seo-content-creation:seo-content-auditor`

Dopo la pubblicazione, auditare ogni contenuto per:
- Qualita' E-E-A-T
- Keyword density
- Internal linking
- Featured snippet eligibility

### Task 4.4 - Audit E-E-A-T e Authority
**Agent:** `seo-analysis-monitoring:seo-authority-builder`

Analizzare i contenuti per segnali di authority:
- Aggiungere credenziali del team (esperienza pasticceria)
- Aggiungere testimonianze utenti (quando disponibili)
- Verificare segnali di trust (Privacy Policy, contatti reali, email verificata)

### Task 4.5 - Verifica Cannibalizzazione
**Agent:** `seo-analysis-monitoring:seo-cannibalization-detector`

Quando ci saranno piu' pagine (blog + landing), verificare:
- Nessun overlap di keyword tra pagine
- Ogni pagina ha un target keyword unico
- Internal linking coerente con la strategia

---

## 6. Agent da Utilizzare per Ogni Fase

### FASE 1 - Metadata Quick Wins

| Task | Agent | Motivo |
|------|-------|--------|
| 1.1 Meta Title | `seo-technical-optimization:seo-meta-optimizer` | Specializzato in title tag optimization |
| 1.2 Meta Description | `seo-technical-optimization:seo-meta-optimizer` | Specializzato in description + CTA |
| 1.3 Fix Keywords | `seo-technical-optimization:seo-keyword-strategist` | Analisi keyword e dedup |
| 1.4 hreflang | `seo-technical-optimization:seo-meta-optimizer` | Canonical/hreflang expertise |
| 1.5 Open Graph | `seo-technical-optimization:seo-meta-optimizer` | Social metadata optimization |
| 1.6 Twitter Card | `seo-technical-optimization:seo-meta-optimizer` | Social card optimization |

### FASE 2 - Struttura & Keyword

| Task | Agent | Motivo |
|------|-------|--------|
| 2.1 H1 Rewrite | `seo-technical-optimization:seo-structure-architect` | Heading hierarchy + SEO semantics |
| 2.2 Hero body | `seo-technical-optimization:seo-keyword-strategist` | Keyword placement naturale |
| 2.3 Features H2 | `seo-technical-optimization:seo-structure-architect` | Header optimization |
| 2.4 Nuova Feature Card | `seo-technical-optimization:seo-keyword-strategist` | Keyword-driven content |
| 2.5 LSI nelle features | `seo-technical-optimization:seo-keyword-strategist` | Variazioni semantiche |
| 2.6 Platforms | `seo-technical-optimization:seo-keyword-strategist` | Keyword distribution |
| 2.7 Schema JSON-LD | `seo-technical-optimization:seo-structure-architect` | Structured data |
| 2.8 Sezione Download | `frontend-mobile-development:frontend-developer` | UI component creation |

### FASE 3 - Content & LSI

| Task | Agent | Motivo |
|------|-------|--------|
| 3.1 Nuove FAQ | `seo-technical-optimization:seo-keyword-strategist` | Long-tail keyword targeting |
| 3.2 Ridurre over-optimization | `seo-technical-optimization:seo-keyword-strategist` | Density balancing |
| 3.3 Raggruppare FAQ | `seo-technical-optimization:seo-structure-architect` | Content organization |
| 3.4 Featured Snippets | `seo-technical-optimization:seo-snippet-hunter` | Snippet-optimized formatting |
| 3.5 Link interni | `seo-technical-optimization:seo-structure-architect` | Internal linking strategy |
| 3.6 Sitemap + robots | `seo-technical-optimization:seo-structure-architect` | Technical SEO |

### FASE 4 - Content Strategy

| Task | Agent | Motivo |
|------|-------|--------|
| 4.1 Piano editoriale | `seo-content-creation:seo-content-planner` | Topic cluster + calendario |
| 4.2 Blog post | `seo-content-creation:seo-content-writer` | SEO content writing |
| 4.3 Audit contenuti | `seo-content-creation:seo-content-auditor` | Quality + E-E-A-T check |
| 4.4 Authority building | `seo-analysis-monitoring:seo-authority-builder` | Trust signals |
| 4.5 Cannibalizzazione | `seo-analysis-monitoring:seo-cannibalization-detector` | Keyword overlap prevention |

### Riepilogo Agent Utilizzati

```
seo-technical-optimization:
  - seo-meta-optimizer          -> Fase 1 (metadata, OG, Twitter, canonical)
  - seo-keyword-strategist      -> Fase 1-3 (keyword density, LSI, placement)
  - seo-structure-architect     -> Fase 2-3 (heading, schema, linking, sitemap)
  - seo-snippet-hunter          -> Fase 3 (featured snippet optimization)

seo-content-creation:
  - seo-content-planner         -> Fase 4 (piano editoriale, topic clusters)
  - seo-content-writer          -> Fase 4 (blog post SEO-optimized)
  - seo-content-auditor         -> Fase 4 (quality audit post-publish)

seo-analysis-monitoring:
  - seo-authority-builder       -> Fase 4 (E-E-A-T, trust signals)
  - seo-cannibalization-detector -> Fase 4 (keyword overlap check)

frontend-mobile-development:
  - frontend-developer          -> Fase 2 (Download section UI)
```

---

## 7. Mappa File da Modificare

### Fase 1

| File | Righe | Modifiche |
|------|-------|-----------|
| `src/app/layout.tsx` | 17 | Meta title |
| `src/app/layout.tsx` | 21 | Meta description |
| `src/app/layout.tsx` | 23-35 | Keywords meta (dedup + expand) |
| `src/app/layout.tsx` | 38-54 | Open Graph |
| `src/app/layout.tsx` | 55-61 | Twitter Card |
| `src/app/layout.tsx` | 73-78 | hreflang (aggiungere x-default) |

### Fase 2

| File | Righe | Modifiche |
|------|-------|-----------|
| `src/components/Hero.tsx` | 9-11 | H1 rewrite |
| `src/components/Hero.tsx` | 14-16 | Body text enhancement |
| `src/components/Features.tsx` | 16-65 | Nuova feature card + LSI descriptions |
| `src/components/Features.tsx` | 98 | H2 (valutare) |
| `src/components/Platforms.tsx` | 3-25 | Platform descriptions + titles |
| `src/app/layout.tsx` | 89-136 | Schema JSON-LD enhancements |
| `src/components/Download.tsx` | NUOVO | Sezione download |
| `src/app/page.tsx` | 22 | Import + render Download |

### Fase 3

| File | Righe | Modifiche |
|------|-------|-----------|
| `src/components/FAQ.tsx` | 6-52 | 4 nuove FAQ + riorganizzazione |
| `src/components/FAQ.tsx` | varie | Ridurre over-optimization |
| `src/components/Features.tsx` | varie | Link interni |
| `src/app/` | root | sitemap.xml config |
| `public/` | root | robots.txt |

### Fase 4

| File | Righe | Modifiche |
|------|-------|-----------|
| `src/app/blog/` | NUOVO | Blog route + layout |
| `src/app/blog/[slug]/` | NUOVO | Blog post pages |
| Vari post .mdx | NUOVO | Contenuti blog |

---

## 8. Metriche di Successo

### KPI per Fase

| Fase | Metrica | Target | Come Misurare |
|------|---------|--------|---------------|
| 1 | CTR SERP | +5-8% | Google Search Console |
| 1 | Impressioni | +50-100/mese | Google Search Console |
| 2 | Keyword rankati | +8-12 nuovi | GSC / Semrush |
| 2 | Posizione media | Top 20 per 5+ keyword | GSC |
| 3 | Featured snippets | 1-2 FAQ in position zero | SERP monitoring |
| 3 | Long-tail traffic | +250-400 ricerche/mese | GSC |
| 4 | Organic traffic | +500-1000/mese | Google Analytics |
| 4 | Domain authority | +5 punti | Ahrefs / Moz |

### Timeline Complessiva

```
Settimana 1:  FASE 1 - Metadata           (~2 ore)    -> +50-100 ricerche/mese
Settimana 2:  FASE 2 - Struttura          (~3-4 ore)  -> +200-400 ricerche/mese
Settimana 3-4: FASE 3 - Content & LSI     (~3 ore)    -> +250-400 ricerche/mese
Mese 2-3:     FASE 4 - Content Strategy   (~15-20 ore) -> +500-1000 ricerche/mese
                                           ___________
TOTALE:                                    ~25-30 ore   -> +1000-1900 ricerche/mese
```

### Checklist Pre-Deploy (per ogni fase)

- [ ] Eseguire `npm run build` senza errori
- [ ] Verificare rendering mobile (Chrome DevTools)
- [ ] Validare JSON-LD su https://validator.schema.org/
- [ ] Testare Rich Results su https://search.google.com/test/rich-results
- [ ] Controllare meta tags con browser DevTools (View Source)
- [ ] Verificare OG preview su https://www.opengraph.xyz/
- [ ] Eseguire Lighthouse audit (Performance + SEO)
- [ ] Deploy su Vercel e verificare in staging

---

## Riferimenti

- **KEYWORD_AUDIT.md** - Audit completo keyword (nella root del progetto)
- **Audit Structure Architect** - Header hierarchy, schema, linking
- **Audit Keyword Strategist** - Density, LSI, long-tail, competitor gaps
- **Audit Meta Optimizer** - Title, description, OG, Twitter, canonical, robots
