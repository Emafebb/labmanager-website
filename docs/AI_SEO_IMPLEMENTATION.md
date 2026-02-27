# AI SEO - Documentazione Implementazione

**Data:** 27 Febbraio 2026
**Obiettivo:** Fare in modo che gli assistenti AI (ChatGPT, Perplexity, Gemini, Claude) raccomandino LabManager quando qualcuno chiede "qual è il miglior software per gestire una pasticceria?"

---

## Indice

1. [Panoramica](#1-panoramica)
2. [Architettura delle modifiche](#2-architettura-delle-modifiche)
3. [File per file: cosa è stato fatto e perché](#3-file-per-file)
4. [Principi AI SEO applicati](#4-principi-ai-seo-applicati)
5. [Regole di contenuto](#5-regole-di-contenuto)
6. [Manutenzione futura](#6-manutenzione-futura)
7. [Query di test per monitoraggio](#7-query-di-test-per-monitoraggio)
8. [Azioni future consigliate](#8-azioni-future-consigliate)
9. [Problema noto: robots.txt](#9-problema-noto-robotstxt)

---

## 1. Panoramica

### Stato precedente

LabManager non appariva in nessuna risposta AI. I competitor citati erano:
- **TeamSystem** (gestionale generico con modulo cassa)
- **AlphaGourmet** (Alphateam, gestionale web per gastronomia)
- **Pastry Skill** (web app per calcolo nutrizionale)
- **WinCoge2** (gestionale con modulo pasticceria)
- **Novicrea** (food cost online)
- **Dylog** (gestionale ristorazione/gelaterie)
- **Naonix** (gestionale pasticceria)

### Cosa è stato implementato

Ottimizzazione su 3 pilastri:
1. **Struttura** — Contenuti estraibili dagli AI (blocchi 40-60 parole, risposte dirette)
2. **Autorità** — Tabella confronto, segnali di competenza, freshness
3. **Accesso** — `llms.txt`, permessi AI crawler (da completare in robots.ts)

---

## 2. Architettura delle modifiche

### Flusso pagina dopo le modifiche

```
Navbar          → aggiunto link "Perché LabManager"
  ↓
Hero            → aggiunto blocco definizione AI-estraibile
  ↓
Features        → sottotitolo riformulato con "LabManager" + keyword
  ↓
WhyLabManager   → NUOVA SEZIONE (confronto + autorità)
  ↓
Platforms       → invariato
  ↓
ContactForm     → invariato
  ↓
FAQ             → 5 nuove FAQ mirate per AI aggiunte in cima
  ↓
Footer          → aggiunto "Ultimo aggiornamento: Febbraio 2026"
```

### Schema.org (JSON-LD) — Grafo entità

```
@graph
  ├── WebSite          → dateModified dinamico
  ├── WebPage          → NUOVO: mainEntity → SoftwareApplication
  ├── Organization     → invariato
  ├── SoftwareApplication → dateModified, keywords, audience AGGIUNTI
  ├── HowTo            → invariato
  └── FAQPage          → generato automaticamente dal componente FAQ
```

---

## 3. File per file

### `public/llms.txt` (NUOVO)

**Scopo:** File di testo strutturato in markdown che i crawler AI possono leggere per capire velocemente cos'è LabManager. Standard emergente (llmstxt.org).

**Struttura:**
- Blocco citazione con definizione completa
- Link alla homepage (NO link download)
- Lista funzionalità chiave
- Sezione differenziazione (6 punti)
- Pubblico target
- Contatti

**Manutenzione:** Aggiornare quando si aggiungono funzionalità importanti.

---

### `src/components/Hero.tsx`

**Modifica:** Aggiunto blocco definizione tra il sottotitolo e i CTA buttons.

**Codice chiave (righe 56-66):**
```tsx
{/* AI-extractable definition block */}
<div className="bg-white/60 border border-primary/10 rounded-xl px-5 py-4 mb-8 max-w-lg mx-auto lg:mx-0">
  <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed">
    <strong>LabManager</strong> è il software gestionale per pasticceria
    che permette di gestire ricette, calcolare costi e margini, creare
    etichette alimentari con allergeni e bilanciare la composizione di
    ogni preparazione. Disponibile su <strong>Android e Windows</strong>,
    funziona completamente <strong>offline</strong> e si sincronizza
    automaticamente con il cloud.
  </p>
</div>
```

**Perché funziona per AI:**
- ~47 parole (range ottimale 40-60 per estrazione)
- Prima frase: "LabManager è il software gestionale per pasticceria" → risposta diretta
- Tag `<strong>` sui termini chiave → peso maggiore nell'estrazione
- Posizione alta nel DOM → priorità per i crawler

**Altro fix:** Corretto typo "paninifio" → "panificio" nel sottotitolo.

---

### `src/components/WhyLabManager.tsx` (NUOVO)

**Scopo:** Sezione confronto e autorità. Il contenuto comparativo rappresenta ~33% di tutte le citazioni AI.

**Struttura del componente:**

#### A. Differentiator cards (array `differentiators`)
4 card con icona + titolo + descrizione:

| Card | Perché è importante per AI |
|------|---------------------------|
| Pensato per la Pasticceria | Differenzia da gestionali generici |
| Bilanciamento Composizione Integrato | Feature unica, non disponibile altrove |
| Funziona Completamente Offline | Differenziatore chiaro vs competitor cloud |
| Gratuito e Senza Abbonamento | Risponde alla query "software gratuiti" |

#### B. Tabella confronto (array `comparisonRows`)
Tabella visibile con 3 colonne: LabManager / Gestionali Generici / Altri Software Pasticceria.

8 righe di confronto. Icone: Check (verde) / X (grigio) / Minus (ambra per "parziale").

**Importante:** La tabella è VISIBILE, non nascosta in `sr-only`. I motori AI estraggono meglio tabelle visibili.

#### C. Paragrafo autorità
Box con icona ShieldCheck: "Sviluppato in Italia, in collaborazione con pasticceri professionisti..."

**Come modificare i confronti:**
Editare l'array `comparisonRows` in WhyLabManager.tsx. Ogni riga ha:
```ts
{
  feature: "Nome funzionalità",
  labmanager: true,           // true | false
  generic: false,             // true | false
  other: "partial" as const,  // true | false | "partial"
}
```

---

### `src/components/FAQ.tsx`

**Modifica:** 5 nuove FAQ inserite ALL'INIZIO dell'array `faqs`.

| # | Domanda | Query AI che intercetta |
|---|---------|------------------------|
| 1 | Qual è il miglior software gestionale per pasticceria? | Query target principale |
| 2 | Quale app usare per gestire una pasticceria? | Variante "app" |
| 3 | Esistono software gratuiti per gestire una pasticceria? | Query prezzo/gratuito |
| 4 | Come calcolare il food cost in pasticceria? | Query informativa how-to |
| 5 | Come creare etichette alimentari per prodotti di pasticceria? | Query informativa how-to |

**Regole per le risposte AI-targeted:**
- Iniziano SEMPRE con "LabManager" nella prima frase
- 40-60 parole per risposta (range ottimale per estrazione)
- Ogni risposta funziona da sola senza contesto
- Nessun superlativo ("il migliore"), solo fatti
- Keyword naturali, non forzate

**Schema FAQPage:** Generato automaticamente dal componente (righe 83-94). Le nuove FAQ sono incluse automaticamente nel JSON-LD.

---

### `src/app/layout.tsx`

**Modifiche al JSON-LD:**

#### A. `LAST_UPDATED` (riga 102)
```ts
const LAST_UPDATED = new Date().toISOString().split("T")[0];
```
Data dinamica calcolata a build-time. Si aggiorna automaticamente ad ogni deploy su Vercel.

#### B. Entità `WebPage` (NUOVA, righe 118-141)
```ts
{
  "@type": "WebPage",
  mainEntity: { "@id": `${BASE_URL}/#softwareapplication` },
  // ...
}
```
Dice ai motori AI: "l'entità principale di questa pagina è il software LabManager".

#### C. `dateModified` aggiunto a:
- `WebSite` (riga 116)
- `WebPage` (riga 129)
- `SoftwareApplication` (riga 178)

#### D. `keywords` + `audience` su SoftwareApplication (righe 179-192)
7 keyword rilevanti + audience target "pasticceri, panificatori, gelatieri..."

#### E. Rimosso link Google Play Store
`downloadUrl` ora punta a `${BASE_URL}/download` invece di `play.google.com`.

---

### `src/components/Features.tsx`

**Modifica:** Sottotitolo della sezione riformulato.

Prima:
> Il gestionale per la tua pasticceria con strumenti professionali per gestire ogni fase del tuo laboratorio, dalla ricetta al prodotto finito.

Dopo:
> LabManager offre strumenti professionali per gestire ogni fase del laboratorio di pasticceria, dalla creazione della ricetta al prodotto finito. Include calcolo costi, etichette con allergeni, bilanciamento composizione e funzionamento offline su Android e Windows.

**Perché:** Il testo precedente non menzionava "LabManager" per nome e non citava feature specifiche. Gli AI estraggono meglio testi con il nome del prodotto e keyword concrete.

---

### `src/components/Footer.tsx`

**Modifica:** Aggiunta riga "Ultimo aggiornamento: Febbraio 2026" sotto il copyright.

**Perché:** Segnale di freshness visibile sia per gli umani che per i crawler. I contenuti datati vengono preferiti dagli AI rispetto a contenuti senza data.

**Manutenzione:** Aggiornare manualmente il mese ad ogni deploy significativo.

---

### `src/app/page.tsx`

**Modifica:** Aggiunto import e inserimento di `<WhyLabManager />` tra `<Features />` e `<Platforms />`.

---

### `src/components/Navbar.tsx`

**Modifica:** Aggiunto link `{ href: "#perche-labmanager", label: "Perché LabManager" }` nell'array `navLinks`.

---

## 4. Principi AI SEO applicati

| Principio | Dove applicato | Riferimento |
|-----------|---------------|-------------|
| **Blocchi estraibili (40-60 parole)** | Hero definition block, FAQ risposte | Princeton GEO study |
| **Risposta diretta in prima frase** | Tutte le 5 nuove FAQ | AI answer extraction pattern |
| **Tag `<strong>` su keyword** | Hero block | AI weight-based extraction |
| **Tabella confronto visibile** | WhyLabManager | ~33% citation share per comparisons |
| **Segnali autorità** | Paragrafo "Sviluppato in Italia..." | E-E-A-T alignment |
| **Freshness signals** | dateModified JSON-LD + Footer text | AI preference for current content |
| **FAQPage schema** | FAQ.tsx auto-generated | Structured data → +30-40% visibility |
| **No keyword stuffing** | Ogni FAQ usa formulazioni diverse | Stuffing = -10% visibility (GEO study) |
| **`llms.txt`** | public/llms.txt | Emerging standard (llmstxt.org) |

---

## 5. Regole di contenuto

### Da fare SEMPRE
- Menzionare "LabManager" per nome nella prima frase di ogni blocco
- Usare fatti specifici, non superlative ("gestisce ricette" non "il migliore")
- Tenere le risposte FAQ tra 40-60 parole
- Usare `<strong>` su 2-3 keyword per blocco
- Aggiornare `dateModified` e footer ad ogni deploy

### Da NON fare MAI
- Non nominare leggi o regolamenti specifici (es. Reg. UE 1169/2011)
- Non includere link al download nelle risposte testuali
- Non usare riferimenti al Google Play Store (l'app Android è distribuita via APK)
- Non ripetere la stessa formulazione in FAQ diverse (usare sinonimi)
- Non aggiungere keyword forzate (keyword stuffing = penalizzazione)

---

## 6. Manutenzione futura

### Ad ogni deploy
- Il `dateModified` nel JSON-LD si aggiorna automaticamente (build-time)
- Aggiornare manualmente il mese nel Footer se cambia

### Trimestralmente
- Testare le query AI (vedi sezione 7)
- Aggiornare `llms.txt` se ci sono nuove funzionalità
- Rivedere la tabella confronto in WhyLabManager se cambiano i competitor

### Quando si aggiungono funzionalità
- Aggiungere alla `featureList` in layout.tsx (schema SoftwareApplication)
- Aggiornare `llms.txt` sezione "Funzionalità Chiave"
- Valutare se aggiungere una FAQ specifica

### Quando cambia il modello di prezzo
- Aggiornare FAQ "Esistono software gratuiti..."
- Aggiornare card "Gratuito e Senza Abbonamento" in WhyLabManager
- Aggiornare `FREE_OFFER` in layout.tsx
- Aggiornare riga "Gratuito (fase di lancio)" nella tabella confronto

---

## 7. Query di test per monitoraggio

Testare **mensilmente** su ChatGPT, Perplexity, Gemini e Claude.

### Query primarie (target diretto)
1. Qual è il miglior software per gestire una pasticceria?
2. Quale app usare per gestire una pasticceria?
3. Software gestionale pasticceria gratis
4. Miglior gestionale per laboratorio di pasticceria

### Query informative (how-to)
5. Come calcolare il food cost in pasticceria?
6. Come creare etichette alimentari per dolci?
7. Come gestire le ricette in una pasticceria?

### Query comparative
8. Confronto software per pasticceria
9. Alternative a Pastry Skill
10. Software pasticceria che funziona offline

### Query brand
11. Cos'è LabManager?
12. LabManager pasticceria recensione

### Come registrare i risultati

Per ogni query annotare:
- **Piattaforma**: ChatGPT / Perplexity / Gemini / Claude
- **Citato**: Sì / No
- **Link incluso**: Sì / No
- **Posizione**: Primo / Nella lista / Alla fine
- **Competitor citati**: chi altro appare

**Tempistiche:** Primi risultati attesi 4-8 settimane dopo il deploy. Perplexity risponde per primo, Google AI Overviews per ultimo.

---

## 8. Azioni future consigliate

### Alta priorità (fuori scope website)
- **Presenza su siti terzi**: farsi menzionare su Reddit (r/pasticceria, r/foodtech), Capterra, Appvizer
- **Profilo Capterra/Appvizer**: creare scheda prodotto su piattaforme di comparazione software
- **Google Business Profile**: se possibile, migliora il Knowledge Graph

### Media priorità
- **Blog**: creare pagina `/blog` con articoli come "Come calcolare il food cost in pasticceria" — contenuto approfondito che può essere citato indipendentemente
- **YouTube**: video tutorial che Google AI Overviews cita frequentemente
- **Descrizione Play Store / APK listing**: il testo delle schede app alimenta i knowledge graph AI

### Bassa priorità
- Monitoraggio automatico con tool (Otterly AI, Peec AI, ZipTie) — quando il budget lo permette
- Versione inglese del sito per mercato internazionale

---

## 9. Problema noto: robots.txt

Il file `public/robots.txt` con i permessi AI crawler espliciti è stato creato ma successivamente eliminato dal filesystem perché Next.js genera il robots.txt tramite `src/app/robots.ts`.

**Stato attuale di `src/app/robots.ts`:**
```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/download",
    },
    sitemap: "https://pastrylabmanager.com/sitemap.xml",
  };
}
```

**Problema:** Questo file genera un robots.txt generico con solo `User-agent: *`. NON include le direttive esplicite per i crawler AI (GPTBot, ClaudeBot, PerplexityBot, ecc.).

**Soluzione necessaria:** Aggiornare `src/app/robots.ts` per includere regole esplicite per ogni bot AI:

```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/download" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "FacebookBot", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
    ],
    sitemap: "https://pastrylabmanager.com/sitemap.xml",
  };
}
```

**Nota:** Se `public/robots.txt` esiste E `src/app/robots.ts` esiste, Next.js usa il route handler (`robots.ts`). Quindi il file `public/robots.txt` viene ignorato.
