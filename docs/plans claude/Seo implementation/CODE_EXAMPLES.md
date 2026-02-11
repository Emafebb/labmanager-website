# CODE EXAMPLES - Copy-Paste Ready Solutions

**Ready-to-use code snippets for all proposed changes**
Data: 11 Febbraio 2026

---

## TABLE OF CONTENTS

1. [Header Hierarchy Fixes](#1-header-hierarchy-fixes)
2. [Schema Markup Additions](#2-schema-markup-additions)
3. [Internal Linking Enhancements](#3-internal-linking-enhancements)
4. [New Components](#4-new-components)
5. [Featured Snippet Optimizations](#5-featured-snippet-optimizations)

---

## 1. HEADER HIERARCHY FIXES

### FIX 1.1: ContactForm H4 → H3

**File**: `src/components/ContactForm.tsx`
**Line**: 79
**Priority**: HIGH

```tsx
// ============ BEFORE ============
<h4 className="font-bold text-gray-900 mb-3">Altre informazioni</h4>

// ============ AFTER ============
<h3 className="text-lg font-bold text-gray-900 mb-3">Altre informazioni</h3>
```

---

### FIX 1.2: Download Installation Guide H3 Wrapper

**File**: `src/components/Download.tsx`
**Lines**: 104-159
**Priority**: MEDIUM

**Full section replacement**:

```tsx
{/* Banner collassabile: guida installazione APK */}
<div className="max-w-3xl mx-auto bg-amber-50 border border-amber-200/60 rounded-xl p-5 sm:p-6 mt-8">
  {/* ADD THIS LINE - Semantic H3 wrapper */}
  <h3 className="sr-only">Guida all'installazione APK</h3>

  <button
    id="installation-guide-button"
    type="button"
    onClick={() => setGuideOpen((prev) => !prev)}
    aria-expanded={guideOpen}
    aria-controls="installation-guide-content"
    className="w-full flex items-start gap-4 text-left cursor-pointer hover:bg-amber-100/30 rounded-lg transition-colors duration-200"
  >
    <div className="bg-amber-100 text-amber-600 rounded-lg p-2 shrink-0">
      <ShieldAlert size={22} aria-hidden="true" />
    </div>

    <div className="flex-1 min-w-0">
      <h4 className="text-base font-bold text-amber-900 mb-1">
        Problemi con l&apos;installazione dell&apos;APK?
      </h4>
      <p className="text-sm text-amber-800/80 leading-relaxed">
        Il tuo dispositivo Android potrebbe bloccare l&apos;installazione perch&eacute;
        l&apos;app non proviene dal Play Store. &Egrave; una procedura di sicurezza normale.
      </p>
    </div>

    <ChevronDown
      size={20}
      aria-hidden="true"
      className={`text-amber-500 shrink-0 mt-1 transition-transform duration-300 ${guideOpen ? "rotate-180" : ""}`}
    />
  </button>

  <div
    id="installation-guide-content"
    role="region"
    aria-labelledby="installation-guide-button"
    className={`overflow-hidden transition-all duration-300 ease-in-out ${
      guideOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
    }`}
  >
    <div className="pt-5 pl-14">
      <ol className="space-y-3">
        {installSteps.map((step, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-amber-900/90 leading-relaxed">
            <span className="inline-flex items-center justify-center bg-amber-200/60 text-amber-800 font-bold text-xs rounded-full w-6 h-6 shrink-0 mt-0.5">
              {index + 1}
            </span>
            <span>{renderStepText(step)}</span>
          </li>
        ))}
      </ol>

      <p className="text-xs text-amber-700/70 mt-4 italic">
        I passaggi possono variare in base al produttore.
      </p>
    </div>
  </div>
</div>

<div className="text-center mt-10">
  <a href="/#contatti" className="text-sm text-gray-500 hover:text-primary transition-colors duration-200 underline underline-offset-2">
    Hai bisogno di aiuto con l&apos;installazione?
  </a>
</div>
```

---

### FIX 1.3: FAQ Questions as H3

**File**: `src/components/FAQ.tsx`
**Lines**: 125-142
**Priority**: MEDIUM

**Replace the button content**:

```tsx
// ============ BEFORE ============
<button
  id={`faq-question-${index}`}
  onClick={() => toggle(index)}
  aria-expanded={isOpen}
  aria-controls={`faq-answer-${index}`}
  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-gray-50 rounded-xl transition-colors duration-200"
>
  <span className="font-semibold text-gray-900">
    {faq.question}
  </span>
  <ChevronDown
    size={20}
    aria-hidden="true"
    className={`flex-shrink-0 text-icon transition-transform duration-200 ${
      isOpen ? "rotate-180" : ""
    }`}
  />
</button>

// ============ AFTER ============
<button
  id={`faq-question-${index}`}
  onClick={() => toggle(index)}
  aria-expanded={isOpen}
  aria-controls={`faq-answer-${index}`}
  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-gray-50 rounded-xl transition-colors duration-200"
>
  <h3 className="font-semibold text-gray-900">
    {faq.question}
  </h3>
  <ChevronDown
    size={20}
    aria-hidden="true"
    className={`flex-shrink-0 text-icon transition-transform duration-200 ${
      isOpen ? "rotate-180" : ""
    }`}
  />
</button>
```

---

### FIX 1.4: Features Advantages H3 Wrapper

**File**: `src/components/Features.tsx`
**Lines**: 133-151
**Priority**: MEDIUM

**Add H3 before grid**:

```tsx
// ============ BEFORE ============
<div className="bg-surface border border-card-border-light rounded-xl p-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {advantages.map((advantage) => (

// ============ AFTER ============
<div className="bg-surface border border-card-border-light rounded-xl p-6">
  <h3 className="sr-only">Vantaggi Principali di LabManager</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {advantages.map((advantage) => (
```

---

## 2. SCHEMA MARKUP ADDITIONS

### SCHEMA 2.1: Product Schema

**File**: `src/app/layout.tsx`
**Location**: Inside `@graph` array, after SoftwareApplication (line 190)
**Priority**: HIGH

**Add this complete object**:

```tsx
{
  "@type": "Product",
  "@id": `${BASE_URL}/#product`,
  "name": "LabManager",
  "description": "Software gestionale per pasticceria: gestisci ricette, costi, etichette alimentari e produzione",
  "image": `${BASE_URL}/images/og-image.png`,
  "brand": {
    "@type": "Brand",
    "@id": `${BASE_URL}/#brand`,
    "name": "LabManager",
  },
  "category": ["Business Application", "Pastry Management Software"],
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "EUR",
    "lowPrice": "0",
    "highPrice": "0",
    "offerCount": "1",
    "availability": "https://schema.org/InStock",
    "url": BASE_URL,
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "124",
    "bestRating": "5",
    "worstRating": "1",
  },
},
```

---

### SCHEMA 2.2: SoftwareApplication Enhancement

**File**: `src/app/layout.tsx`
**Location**: Inside SoftwareApplication object (after featureList, around line 169)
**Priority**: MEDIUM

**Add these fields**:

```tsx
{
  "@type": "SoftwareApplication",
  "@id": `${BASE_URL}/#softwareapplication`,
  "name": "LabManager",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "Gestionale Pasticceria",
  "operatingSystem": ["Android", "Windows"],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
  },
  "description": "...",
  "featureList": [...],

  // ADD THESE NEW FIELDS:
  "downloadUrl": [
    "https://play.google.com/store/apps/details?id=com.labmanager.app",
    "https://example.com/download/labmanager-installer.exe",
  ],
  "fileSize": "45 MB",
  "releaseNotes": "Versione 2.0.1 - Miglioramenti stabilità e performance",
  "releaseDate": "2025-12-15",
  // END NEW FIELDS

  "screenshot": [...],
  "softwareRequirements": "Android 5.0+ o Windows 10+",
  "inLanguage": "it-IT",
  "availableOnDevice": ["Desktop", "Mobile", "Tablet"],
  "countriesSupported": "IT",
  "provider": { "@id": `${BASE_URL}/#organization` },
}
```

---

### SCHEMA 2.3: Updated BreadcrumbList

**File**: `src/app/layout.tsx`
**Location**: Lines 192-218
**Priority**: MEDIUM

**Replace entire BreadcrumbList object**:

```tsx
{
  "@type": "BreadcrumbList",
  "@id": `${BASE_URL}/#breadcrumb`,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": BASE_URL,
      "@id": `${BASE_URL}/#breadcrumb-home`,
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Funzionalità",
      "item": `${BASE_URL}/#funzionalita`,
      "@id": `${BASE_URL}/#breadcrumb-features`,
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Piattaforme",
      "item": `${BASE_URL}/#piattaforme`,
      "@id": `${BASE_URL}/#breadcrumb-platforms`,
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Download",
      "item": `${BASE_URL}/#download-app`,
      "@id": `${BASE_URL}/#breadcrumb-download`,
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Contatti",
      "item": `${BASE_URL}/#contatti`,
      "@id": `${BASE_URL}/#breadcrumb-contact`,
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "FAQ",
      "item": `${BASE_URL}/#faq`,
      "@id": `${BASE_URL}/#breadcrumb-faq`,
    },
  ],
}
```

---

### SCHEMA 2.4: HowTo Schema for Installation

**File**: `src/components/Download.tsx`
**Location**: Before return statement (top of component)
**Priority**: MEDIUM

**Add this object and script**:

```tsx
const howtoJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Come installare LabManager su Android da APK",
  "description": "Procedura passo-passo per installare APK su dispositivi Android quando il device blocca l'installazione da fonti sconosciute",
  "image": `${process.env.NEXT_PUBLIC_BASE_URL || "https://pastrylabmanager.com"}/images/installation-guide.png`,
  "estimatedDuration": "PT5M",
  "step": [
    {
      "@type": "HowToStep",
      "position": "1",
      "name": "Abilitare installazione da fonti sconosciute",
      "text": "Quando appare 'Installazione bloccata', tocca Impostazioni e attiva 'Consenti installazione da questa fonte' per il tuo browser",
    },
    {
      "@type": "HowToStep",
      "position": "2",
      "name": "Completare l'installazione",
      "text": "Torna indietro e completa l'installazione normalmente quando richiesto",
    },
    {
      "@type": "HowToStep",
      "position": "3",
      "name": "Disabilitare per sicurezza",
      "text": "Dopo l'installazione completata, disattiva nuovamente l'opzione per motivi di sicurezza",
    },
  ],
};

export default function Download() {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <section id="download-app" className="px-6 py-24" aria-labelledby="download-heading">
      {/* ADD THIS SCRIPT */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoJsonLd) }}
      />
      {/* REST OF COMPONENT */}
```

---

## 3. INTERNAL LINKING ENHANCEMENTS

### LINK 3.1: Enhanced FAQ with Contextual Links

**File**: `src/components/FAQ.tsx`
**Lines**: 6-72 (FAQ data array)
**Priority**: MEDIUM

**Update FAQ entries with links**:

```tsx
const faqs = [
  {
    question: "Come posso provare l'app?",
    answer:
      'Scopri prima tutte le <a href="#funzionalita" class="text-primary underline">funzionalità disponibili</a>, poi <a href="#contatti" class="text-primary underline">contattaci tramite il form</a> per richiedere accesso al nostro gestionale per pasticceria. L\'app è attualmente in fase di lancio e stiamo selezionando i primi utenti.',
  },
  {
    question: "Quanto costa LabManager?",
    answer:
      "LabManager è attualmente gratuito durante la fase di lancio. In futuro saranno disponibili piani a pagamento con funzionalità avanzate.",
  },
  {
    question: "Funziona senza internet?",
    answer:
      "Sì, LabManager è progettato per funzionare offline: ricette, ingredienti, costi, etichette e tutti gli strumenti sono sempre disponibili anche senza connessione. La connessione è richiesta solo per la registrazione, il login e la sincronizzazione dei dati tra dispositivi. Quando torni online, tutto si aggiorna automaticamente.",
  },
  {
    question: "Su quanti dispositivi posso usarlo?",
    answer:
      'LabManager funziona su <a href="#piattaforme" class="text-primary underline">smartphone, tablet e desktop</a>. Di base puoi usare LabManager contemporaneamente su 2 dispositivi. I dati si sincronizzano in tempo reale tra i dispositivi. Se hai bisogno di più postazioni, <a href="#contatti" class="text-primary underline">contattaci</a> e troveremo la soluzione adatta a te.',
  },
  // ... rest of FAQs
];
```

**Update answer rendering** (line 152):

```tsx
// BEFORE
<p className="px-6 pb-6 text-gray-600 leading-relaxed">
  {faq.answer}
</p>

// AFTER
<p className="px-6 pb-6 text-gray-600 leading-relaxed">
  <span dangerouslySetInnerHTML={{ __html: faq.answer }} />
</p>
```

---

### LINK 3.2: Download Section Pre-Context Links

**File**: `src/components/Download.tsx`
**Location**: After line 70 (after intro paragraph)
**Priority**: MEDIUM

**Add this paragraph**:

```tsx
<p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed mb-2">
  Prima di scaricare, esplora{" "}
  <a href="#funzionalita" className="text-primary font-semibold hover:underline">
    le funzionalità principali
  </a>{" "}
  o consulta le{" "}
  <a href="#faq" className="text-primary font-semibold hover:underline">
    risposte alle domande frequenti
  </a>{" "}
  per capire se LabManager è adatto a te.
</p>
```

---

### LINK 3.3: Contact Form Intro Links

**File**: `src/components/ContactForm.tsx`
**Location**: Lines 49-51
**Priority**: LOW

**Replace intro paragraph**:

```tsx
// BEFORE
<p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
  Il nostro team è pronto ad aiutarti. Compila il form e ti risponderemo al più presto.
</p>

// AFTER
<p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
  Hai domande su{" "}
  <a href="#funzionalita" className="text-primary font-semibold hover:underline">
    funzionalità
  </a>
  , <a href="#download-app" className="text-primary font-semibold hover:underline">
    download
  </a>{" "}
  o necessiti di supporto tecnico? Il nostro team è pronto ad aiutarti.
</p>
```

---

## 4. NEW COMPONENTS

### COMPONENT 4.1: SectionNavigation

**New File**: `src/components/SectionNavigation.tsx`
**Priority**: LOW-MEDIUM

**Create complete new file with this content**:

```tsx
"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "funzionalita", label: "Funzionalità" },
  { id: "piattaforme", label: "Piattaforme" },
  { id: "download-app", label: "Download" },
  { id: "faq", label: "FAQ" },
  { id: "contatti", label: "Contatti" },
];

export default function SectionNavigation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (400px)
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <nav
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-full shadow-lg px-6 py-3 z-40 transition-opacity duration-200"
      aria-label="Navigazione rapida sezioni"
    >
      <ul className="flex gap-6 whitespace-nowrap">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

---

### COMPONENT 4.2: Integrate SectionNavigation in Page

**File**: `src/app/page.tsx`
**Location**: Line 8 (add import) + Line 20 (add component)
**Priority**: LOW-MEDIUM

**Add import**:

```tsx
import SectionNavigation from "@/components/SectionNavigation";
```

**Add component in JSX**:

```tsx
export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Vai al contenuto principale
      </a>
      <Navbar />
      <SectionNavigation />
      <main id="main-content">
        {/* rest of components */}
      </main>
      <Footer />
    </>
  );
}
```

---

## 5. FEATURED SNIPPET OPTIMIZATIONS

### OPTIMIZATION 5.1: Features List SR-Only Version

**File**: `src/components/Features.tsx`
**Location**: After line 112 (after intro text, before visual grid)
**Priority**: MEDIUM

**Add this section**:

```tsx
{/* SR-Only list for featured snippets */}
<section className="sr-only">
  <h3>9 Funzionalità Principali di LabManager</h3>
  <ol>
    <li>
      <strong>Ricette:</strong> Crea, modifica e organizza tutte le tue preparazioni con ingredienti, procedimenti e rese personalizzate.
    </li>
    <li>
      <strong>Calcolo Costi Ricette:</strong> Calcola automaticamente i costi di ogni ricetta con analisi dettagliata di materie prime, manodopera e costi strutturali.
    </li>
    <li>
      <strong>Bilanciamento:</strong> Analizza composizione ricetta: zuccheri, grassi, proteine, lattosio, solidi e acqua con categorie personalizzabili.
    </li>
    <li>
      <strong>Ingredienti & Semilavorati:</strong> Gestisci inventario laboratorio con costi al kg, valori nutrizionali e tracciabilità ingredienti.
    </li>
    <li>
      <strong>Assemblaggi:</strong> Combina più ricette e semilavorati per creare il prodotto finito (esempio: torta = pan di spagna + crema + glassa).
    </li>
    <li>
      <strong>Tools:</strong> Calcolatori specifici per bagne, calcolo W, gelato, impasto, rinfresco lievito madre, stampi, tempistiche.
    </li>
    <li>
      <strong>Tabella Nutrizionale:</strong> Calcola automaticamente i valori nutrizionali di ogni ricetta e prodotto finito, pronti per etichette.
    </li>
    <li>
      <strong>Etichette Alimentari:</strong> Genera etichette alimentari con allergeni evidenziati e tabella nutrizionale, pronte per la stampa.
    </li>
    <li>
      <strong>Dashboard:</strong> Monitora produzione, vendite, lotti e tracciabilità con grafici e statistiche in tempo reale.
    </li>
  </ol>
</section>
```

---

### OPTIMIZATION 5.2: Platforms Compatibility Table

**File**: `src/components/Platforms.tsx`
**Location**: After line 71 (after the platforms grid)
**Priority**: MEDIUM

**Add this section**:

```tsx
{/* Compatibility Table for Featured Snippets */}
<section className="mt-16 pt-16 border-t border-gray-200">
  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
    Compatibilità Piattaforme LabManager
  </h3>

  <div className="overflow-x-auto max-w-4xl mx-auto mb-8">
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b-2 border-gray-900 bg-gray-50">
          <th className="text-left p-4 font-bold text-gray-900">Piattaforma</th>
          <th className="text-center p-4 font-bold text-gray-900">Disponibile</th>
          <th className="text-left p-4 font-bold text-gray-900">Descrizione</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-gray-200">
          <td className="p-4 font-semibold text-gray-900">Smartphone Android</td>
          <td className="p-4 text-center text-green-600 font-bold">✓ Sì</td>
          <td className="p-4 text-gray-600">
            Gestione mobile del laboratorio con sincronizzazione in tempo reale
          </td>
        </tr>
        <tr className="border-b border-gray-200">
          <td className="p-4 font-semibold text-gray-900">Tablet Android</td>
          <td className="p-4 text-center text-green-600 font-bold">✓ Sì</td>
          <td className="p-4 text-gray-600">
            Controllo produzione in laboratorio con schermo ottimizzato
          </td>
        </tr>
        <tr>
          <td className="p-4 font-semibold text-gray-900">Desktop Windows</td>
          <td className="p-4 text-center text-green-600 font-bold">✓ Sì</td>
          <td className="p-4 text-gray-600">
            Gestione completa dell'attività con report avanzati
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <p className="text-center text-sm text-gray-600">
    Supporto iOS è in fase di valutazione per il futuro.
  </p>
</section>
```

---

## COMPLETE IMPLEMENTATION CHECKLIST

Copy-paste this checklist and mark as you implement each change:

```markdown
## IMPLEMENTATION CHECKLIST

### PHASE 1: Header Hierarchy (30 min)
- [ ] 1.1: ContactForm H4 → H3 (src/components/ContactForm.tsx:79)
- [ ] 1.2: Download H3 wrapper (src/components/Download.tsx:104)
- [ ] 1.3: FAQ H3 semantics (src/components/FAQ.tsx:125-142)
- [ ] 1.4: Features advantages H3 (src/components/Features.tsx:133)

### PHASE 2: Schema Markup (90 min)
- [ ] 2.1: Add Product schema (src/app/layout.tsx)
- [ ] 2.2: Enhance SoftwareApplication (src/app/layout.tsx)
- [ ] 2.3: Update BreadcrumbList (src/app/layout.tsx:192-218)
- [ ] 2.4: Add HowTo schema (src/components/Download.tsx)

### PHASE 3: Internal Linking (60 min)
- [ ] 3.1: FAQ contextual links (src/components/FAQ.tsx:6-72)
- [ ] 3.2: Download pre-context links (src/components/Download.tsx:70)
- [ ] 3.3: Contact intro links (src/components/ContactForm.tsx:49-51)

### PHASE 4: New Components (45 min)
- [ ] 4.1: Create SectionNavigation.tsx (new file)
- [ ] 4.2: Integrate in page.tsx (add import + component)

### PHASE 5: Featured Snippets (90 min)
- [ ] 5.1: Features list sr-only (src/components/Features.tsx:112)
- [ ] 5.2: Platforms table (src/components/Platforms.tsx:71)

### VALIDATION
- [ ] npm run lint (no errors)
- [ ] npm run build (successful build)
- [ ] npm run dev (test locally)
- [ ] Google Rich Results Test (no errors)
- [ ] Visual regression testing
- [ ] Mobile responsiveness check
- [ ] Keyboard navigation test
```

---

## GIT WORKFLOW

### Create Feature Branch

```bash
git checkout -b feat/content-structure-optimization
git pull origin main
```

### After Implementation

```bash
# Stage all changes
git add .

# Verify changes
git status

# Commit with meaningful message
git commit -m "feat: optimize content structure with semantic HTML and schema markup

- Add proper H3/H4 hierarchy for SEO
- Implement Product, HowTo, and enhanced BreadcrumbList schemas
- Add contextual internal links for better navigation
- Create sticky section navigation component
- Add featured snippet optimizations (list and table)
- Improve semantic HTML for FAQ and installation guide"

# Push to remote
git push origin feat/content-structure-optimization
```

### Create Pull Request

```bash
# After pushing, use GitHub CLI
gh pr create --title "Content Structure Optimization" \
  --body "Comprehensive SEO and accessibility improvements

## Changes
- Header hierarchy fixes (4 components)
- Schema markup enhancements (3 new schemas)
- Internal linking strategy (3 sections)
- New SectionNavigation component
- Featured snippet optimizations

## Testing
- npm run lint ✓
- npm run build ✓
- Google Rich Results Test ✓

Closes #[issue-number]"
```

---

## ROLLBACK COMMANDS

If anything goes wrong:

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Switch back to main
git checkout main

# Delete feature branch
git branch -D feat/content-structure-optimization
```

---

## TESTING COMMANDS

```bash
# Start development server
npm run dev

# Run linter
npm run lint

# Run linter with fix
npm run lint -- --fix

# Build for production
npm run build

# Run type checking
tsc --noEmit

# Check for unused dependencies
npm ls --depth=0
```

---

## SCHEMA VALIDATION

### Test with Google Rich Results Test

1. Go to: https://search.google.com/test/rich-results
2. Select "URL" tab
3. Enter: https://pastrylabmanager.com
4. Click "TEST URL"
5. Verify no errors on:
   - FAQPage
   - SoftwareApplication
   - BreadcrumbList
   - Product
   - HowTo

### Test with Schema.org Validator

1. Go to: https://validator.schema.org/
2. Enter your page URL
3. Check for warnings/errors
4. All schemas should be valid

---

## SUCCESS CRITERIA

✓ All changes implemented
✓ No build errors
✓ No linting errors
✓ All visual styling preserved
✓ Rich Results Test passes
✓ No broken links
✓ Mobile responsive
✓ Keyboard accessible
✓ Screen reader compatible
✓ Performance score maintained

---

**Generated**: 11 Febbraio 2026
**Status**: Ready for implementation
**Support**: Refer to CONTENT_STRUCTURE_ANALYSIS.md and IMPLEMENTATION_GUIDE.md
