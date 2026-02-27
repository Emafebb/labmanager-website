# GUIDA IMPLEMENTAZIONE - LabManager Website Structure Optimization

**Quick Reference Guide for Developers**
Data: 11 Febbraio 2026

---

## TABLE OF CONTENTS

1. [Visual Architecture Diagrams](#1-visual-architecture-diagrams)
2. [Step-by-Step Implementation](#2-step-by-step-implementation)
3. [Code Diffs & Examples](#3-code-diffs--examples)
4. [Validation Checklist](#4-validation-checklist)
5. [Timeline & Effort Estimates](#5-timeline--effort-estimates)

---

## 1. VISUAL ARCHITECTURE DIAGRAMS

### 1.1 Current Information Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      HOME PAGE (index)                       │
└─────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            │                 │                 │
      ┌─────▼─────┐    ┌──────▼──────┐   ┌────▼─────┐
      │   NAVBAR  │    │ SKIP LINK   │   │  FOOTER  │
      │ (Fixed)   │    │ (sr-only)   │   │ (Bottom) │
      └───────────┘    └─────────────┘   └──────────┘
            │
            │ Internal Navigation
            │
    ┌───────┴──────────┬──────────────┬──────────────┐
    │                  │              │              │
    │                  │              │              │
┌───▼────┐  ┌────────▼──────┐  ┌────▼──────┐  ┌───▼─────┐
│  HERO   │  │  FEATURES     │  │PLATFORMS  │  │DOWNLOAD │
│(H1)     │  │  (H2 + 9 H3)  │  │(H2 + 3H3) │  │(H2+2H3) │
└────┬────┘  └────────────────┘  └───────────┘  └─────────┘
     │
     │ CTA Links: #funzionalita, #contatti
     │
    ┌┴──────────────────┬──────────────────┐
    │                   │                  │
┌───▼────────┐   ┌─────▼──────┐   ┌──────▼───┐
│   CONTACT   │   │    FAQ     │   │ INSTALL  │
│  FORM       │   │  (H2)      │   │  GUIDE   │
│ (H2 + 2H3) │   │  (12 H3)   │   │  (H4)    │
└─────────────┘   └────────────┘   └──────────┘
```

### 1.2 Optimized Information Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      HOME PAGE (index)                       │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
    ┌───▼────┐         ┌──────▼──────┐       ┌────▼─────┐
    │ NAVBAR  │         │ SKIP LINK   │       │  FOOTER  │
    │ (Fixed) │         │ (sr-only)   │       │ (Bottom) │
    └────┬────┘         └─────────────┘       └──────────┘
         │
         │ Navigation with Semantic Links
         │
    ┌────▼────────────────────────────────────────────┐
    │   STICKY SECTION NAVIGATION (After Hero)        │
    │   Funz. | Platform | Download | FAQ | Contatti │
    └────────────────────────────────────────────────┘
         │
    ┌────┴──────────┬──────────────┬──────────────┐
    │               │              │              │
┌───▼────┐  ┌──────▼──────┐  ┌────▼──────┐  ┌───▼─────┐
│  HERO   │  │  FEATURES   │  │PLATFORMS  │  │DOWNLOAD │
│ (H1)    │  │ (H2+9H3)    │  │(H2+3H3)   │  │(H2+2H3) │
│         │  │ [List SR]   │  │ [Table]   │  │[HowTo]  │
│ Links:  │  │ [Links: →]  │  │[Links: →] │  │[Links]  │
│ #func   │  │ #platforms  │  │#download  │  │#faq     │
│ #contatti│  │ #download   │  │#contact   │  │#contact │
└────┬────┘  └────────────────┘  └───────────┘  └─────────┘
     │
     │ Contextual & Strategic Links
     │
    ┌┴──────────────────┬──────────────────┐
    │                   │                  │
┌───▼────────┐   ┌─────▼──────┐   ┌──────▼───┐
│   CONTACT   │   │    FAQ     │   │ INSTALL  │
│  FORM       │   │  (H2)      │   │  GUIDE   │
│ (H2+2H3)   │   │  (12H3)    │   │  (H3+H4) │
│ [Links: ↑] │   │ [Links: ↑] │   │[Links:↑] │
└─────────────┘   │ [Semantics]│   │ [Schema] │
                  └────────────┘   └──────────┘
```

### 1.3 Schema Markup Architecture

```
BASE SCHEMA GRAPH
═════════════════════════════════════════

pastrylabmanager.com/
├── #website (WebSite)
│   └── publisher: #organization
│
├── #organization (Organization)
│   ├── logo: ImageObject
│   ├── contactPoint: ContactPoint
│   └── areaServed: Italy
│
├── #softwareapplication (SoftwareApplication) ← MAIN
│   ├── featureList: [12 features]
│   ├── screenshot: [2 images]
│   ├── offers: Offer (FREE)
│   └── provider: #organization
│
├── #product (Product) ← NEW
│   ├── offers: AggregateOffer
│   ├── aggregateRating: AggregateRating
│   └── review: [Reviews]
│
├── #breadcrumb (BreadcrumbList) ← UPDATED
│   └── itemListElement: [6 items]
│
├── #faq (FAQPage) ← EXISTING GOOD
│   └── mainEntity: [12 Questions]
│
└── #howto (HowTo) ← NEW (Installation)
    └── step: [3-4 steps]
```

### 1.4 Content Hierarchy (Post-Optimization)

```
SEMANTIC HEADING OUTLINE
═════════════════════════════════════════════════

⬛ H1: Il Software per la Tua Pasticceria, sempre con te
│
├─ ⬜ H2: Tutto ciò che serve al tuo laboratorio
│  │
│  ├─ 🔹 H3: Ricette
│  ├─ 🔹 H3: Calcolo Costi Ricette
│  ├─ 🔹 H3: Bilanciamento
│  ├─ 🔹 H3: Ingredienti & Semilavorati
│  ├─ 🔹 H3: Assemblaggi
│  ├─ 🔹 H3: Tools
│  ├─ 🔹 H3: Tabella Nutrizionale
│  ├─ 🔹 H3: Etichette alimentari
│  ├─ 🔹 H3: Dashboard
│  │
│  └─ 🔹 H3: Vantaggi Principali (sr-only)
│     ├─ H4: Funziona Offline
│     ├─ H4: Gratuito
│     ├─ H4: Stampa & Esporta PDF
│     └─ H4: Aggiornamenti Costanti
│
├─ ⬜ H2: Un'app, tutte le piattaforme
│  ├─ 🔹 H3: Smartphone
│  ├─ 🔹 H3: Tablet
│  └─ 🔹 H3: Desktop Windows
│
├─ ⬜ H2: Scarica Gratis l'App per Pasticceria
│  ├─ 🔹 H3: Android
│  ├─ 🔹 H3: Windows
│  │
│  └─ 🔹 H3: Guida all'installazione APK (sr-only)
│     ├─ H4: Passo 1
│     ├─ H4: Passo 2
│     ├─ H4: Passo 3
│     └─ H4: Passo 4
│
├─ ⬜ H2: Hai domande? Scrivici
│  ├─ 🔹 H3: Perché contattarci?
│  └─ 🔹 H3: Altre informazioni
│
└─ ⬜ H2: Domande Frequenti
   ├─ 🔹 H3: Come posso provare l'app?
   ├─ 🔹 H3: Quanto costa LabManager?
   ├─ 🔹 H3: Funziona senza internet?
   ├─ 🔹 H3: Su quanti dispositivi posso usarlo?
   ├─ 🔹 H3: Posso esportare ricette e documenti?
   ├─ 🔹 H3: L'app genera etichette alimentari?
   ├─ 🔹 H3: Posso usarlo con il mio team?
   ├─ 🔹 H3: Sarà disponibile per iPhone/iPad?
   ├─ 🔹 H3: I miei dati sono al sicuro?
   ├─ 🔹 H3: Come funziona il calcolo costi ricetta?
   ├─ 🔹 H3: Come gestisco l'inventario ingredienti?
   └─ 🔹 H3: LabManager è veramente gratuito?
```

---

## 2. STEP-BY-STEP IMPLEMENTATION

### STEP 1: Header Hierarchy Fixes (30 minutes)

#### 1.1 Fix ContactForm H4 → H3

**File**: `src/components/ContactForm.tsx` (Line 79)

**Before**:
```tsx
<h4 className="font-bold text-gray-900 mb-3">Altre informazioni</h4>
```

**After**:
```tsx
<h3 className="text-lg font-bold text-gray-900 mb-3">Altre informazioni</h3>
```

**Verification**: Check that visual styling remains consistent (already using `font-bold` + appropriate spacing)

---

#### 1.2 Fix Download Installation Guide Section

**File**: `src/components/Download.tsx` (Lines 104-159)

**Before**:
```tsx
<div className="max-w-3xl mx-auto bg-amber-50...">
  <button id="installation-guide-button" ...>
    <h4 className="text-base font-bold...">Problemi con l'installazione dell'APK?</h4>
    ...
  </button>
  <div id="installation-guide-content" ...>
    <ol className="space-y-3">
      {installSteps.map(...)}
    </ol>
  </div>
</div>
```

**After**:
```tsx
<div className="max-w-3xl mx-auto bg-amber-50...">
  {/* Add semantic H3 */}
  <h3 className="sr-only">Guida all'installazione APK</h3>

  <button id="installation-guide-button" ...>
    <h4 className="text-base font-bold...">Problemi con l'installazione dell'APK?</h4>
    ...
  </button>
  <div id="installation-guide-content" ...>
    <ol className="space-y-3">
      {installSteps.map(...)}
    </ol>
  </div>
</div>
```

**Why**: Adds semantic H3 wrapper without altering visual design

---

#### 1.3 Fix FAQ Question Semantics

**File**: `src/components/FAQ.tsx` (Lines 125-142)

**Before**:
```tsx
<button
  id={`faq-question-${index}`}
  onClick={() => toggle(index)}
  className="w-full flex items-center justify-between gap-4 p-6 text-left..."
>
  <span className="font-semibold text-gray-900">
    {faq.question}
  </span>
  <ChevronDown ... />
</button>
```

**After**:
```tsx
<button
  id={`faq-question-${index}`}
  onClick={() => toggle(index)}
  className="w-full flex items-center justify-between gap-4 p-6 text-left..."
>
  <h3 className="font-semibold text-gray-900">
    {faq.question}
  </h3>
  <ChevronDown ... />
</button>
```

**Why**: Converts semantic span to H3, improving heading hierarchy without altering visuals

---

#### 1.4 Add Advantages Subsection Wrapper

**File**: `src/components/Features.tsx` (Lines 133-151)

**Before**:
```tsx
<div className="bg-surface border border-card-border-light rounded-xl p-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {advantages.map((advantage) => (
      <div key={advantage.title} className="flex items-start gap-4">
        <h4 className="text-sm font-semibold text-foreground mb-1">
          {advantage.title}
        </h4>
        ...
```

**After**:
```tsx
<div className="bg-surface border border-card-border-light rounded-xl p-6">
  <h3 className="sr-only">Vantaggi Principali di LabManager</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {advantages.map((advantage) => (
      <div key={advantage.title} className="flex items-start gap-4">
        <h4 className="text-sm font-semibold text-foreground mb-1">
          {advantage.title}
        </h4>
        ...
```

**Why**: Adds semantic H3 wrapper (sr-only preserves visual design)

---

### STEP 2: Schema Markup Enhancement (1-1.5 hours)

#### 2.1 Add Product Schema

**File**: `src/app/layout.tsx` (After line 190)

**Location**: Inside the `@graph` array, add after SoftwareApplication object:

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

**Notes**:
- Keep `aggregateRating` as placeholder until real data available
- Can remove `aggregateRating` if no user reviews exist yet
- This improves product rich snippets in SERP

---

#### 2.2 Update SoftwareApplication with Download URLs

**File**: `src/app/layout.tsx` (Lines 140-190)

**Add after `featureList`**:

```tsx
// Around line 169, after featureList
downloadUrl: [
  "https://play.google.com/store/apps/details?id=com.labmanager.app",
  "https://example.com/download/labmanager-installer.exe",
],
fileSize: "45 MB",
releaseNotes: "Versione 2.0.1 - Miglioramenti stabilità e performance",
releaseDate: "2025-12-15",
```

**Notes**:
- Update actual play store and installer URLs
- Update fileSize based on actual app size
- Update releaseNotes with latest version info

---

#### 2.3 Update BreadcrumbList

**File**: `src/app/layout.tsx` (Lines 192-218)

**Before**:
```tsx
{
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Funzionalità",
      item: `${BASE_URL}/#funzionalita`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Piattaforme",
      item: `${BASE_URL}/#piattaforme`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "FAQ",
      item: `${BASE_URL}/#faq`,
    },
  ],
}
```

**After**:
```tsx
{
  "@type": "BreadcrumbList",
  "@id": `${BASE_URL}/#breadcrumb`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE_URL,
      "@id": `${BASE_URL}/#breadcrumb-home`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Funzionalità",
      item: `${BASE_URL}/#funzionalita`,
      "@id": `${BASE_URL}/#breadcrumb-features`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Piattaforme",
      item: `${BASE_URL}/#piattaforme`,
      "@id": `${BASE_URL}/#breadcrumb-platforms`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Download",
      item: `${BASE_URL}/#download-app`,
      "@id": `${BASE_URL}/#breadcrumb-download`,
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Contatti",
      item: `${BASE_URL}/#contatti`,
      "@id": `${BASE_URL}/#breadcrumb-contact`,
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "FAQ",
      item: `${BASE_URL}/#faq`,
      "@id": `${BASE_URL}/#breadcrumb-faq`,
    },
  ],
}
```

**Why**: More complete breadcrumb representation of site structure

---

#### 2.4 Add HowTo Schema to Installation Guide

**File**: `src/components/Download.tsx` (Inside component, before return)

**Add near top of component**:

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
      "text": "Quando appare 'Installazione bloccata', tocca Impostazioni e attiva 'Consenti installazione da questa fonte' per il tuo browser"
    },
    {
      "@type": "HowToStep",
      "position": "2",
      "name": "Completare l'installazione",
      "text": "Torna indietro e completa l'installazione normalmente quando richiesto"
    },
    {
      "@type": "HowToStep",
      "position": "3",
      "name": "Disabilitare per sicurezza",
      "text": "Dopo l'installazione completata, disattiva nuovamente l'opzione per motivi di sicurezza"
    },
  ],
};

// Inside JSX (in return statement), add after Download section:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoJsonLd) }}
/>
```

---

### STEP 3: Internal Linking Strategy (1-2 hours)

#### 3.1 Add Contextual Links in FAQ

**File**: `src/components/FAQ.tsx`

**Modify FAQ data array** (lines 6-72):

For "Come posso provare l'app?" (lines 8-11):
```tsx
{
  question: "Come posso provare l'app?",
  answer: 'Scopri prima tutte le <a href="#funzionalita" class="text-primary underline">funzionalità disponibili</a>, poi <a href="#contatti" class="text-primary underline">contattaci tramite il form</a> per richiedere accesso al nostro gestionale per pasticceria. L\'app è attualmente in fase di lancio e stiamo selezionando i primi utenti.',
}
```

For "Su quanti dispositivi posso usarlo?" (lines 23-26):
```tsx
{
  question: "Su quanti dispositivi posso usarlo?",
  answer: 'LabManager funziona su <a href="#piattaforme" class="text-primary underline">smartphone, tablet e desktop</a>. Di base puoi usare LabManager contemporaneamente su 2 dispositivi. I dati si sincronizzano in tempo reale tra i dispositivi. Se hai bisogno di più postazioni, <a href="#contatti" class="text-primary underline">contattaci</a> e troveremo la soluzione adatta a te.',
}
```

**Then update rendering**:

Change answer rendering to support HTML:

```tsx
<p className="px-6 pb-6 text-gray-600 leading-relaxed">
  <span dangerouslySetInnerHTML={{ __html: faq.answer }} />
</p>
```

**Note**: Ensure HTML in answer strings is safe (you control the data)

---

#### 3.2 Add Links in Download Section

**File**: `src/components/Download.tsx` (After line 70)

**Before description paragraph** (insert after line 70):

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

#### 3.3 Add Links in Contact Form Intro

**File**: `src/components/ContactForm.tsx` (Lines 49-51)

**Before**:
```tsx
<p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
  Il nostro team è pronto ad aiutarti. Compila il form e ti risponderemo al più presto.
</p>
```

**After**:
```tsx
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

### STEP 4: Create Sticky Section Navigation (45 minutes)

#### 4.1 Create New Component

**New File**: `src/components/SectionNavigation.tsx`

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

#### 4.2 Integrate in Page

**File**: `src/app/page.tsx` (Line 8)

**Add import**:
```tsx
import SectionNavigation from "@/components/SectionNavigation";
```

**Add in JSX** (after line 20, after `<Navbar />`):
```tsx
<Navbar />
<SectionNavigation />
<main id="main-content">
```

---

### STEP 5: Featured Snippet Optimization (1-2 hours)

#### 5.1 Add Features List SR-Only Version

**File**: `src/components/Features.tsx` (Add before visual grid)

**Add after line 112** (after intro text):

```tsx
{/* SR-Only list for featured snippets */}
<section className="sr-only">
  <h3>9 Funzionalità Principali di LabManager</h3>
  <ol>
    <li><strong>Ricette:</strong> Crea, modifica e organizza tutte le tue preparazioni con ingredienti, procedimenti e rese personalizzate.</li>
    <li><strong>Calcolo Costi Ricette:</strong> Calcola automaticamente i costi di ogni ricetta con analisi dettagliata di materie prime, manodopera e costi strutturali.</li>
    <li><strong>Bilanciamento:</strong> Analizza composizione ricetta: zuccheri, grassi, proteine, lattosio, solidi e acqua con categorie personalizzabili.</li>
    <li><strong>Ingredienti & Semilavorati:</strong> Gestisci inventario laboratorio con costi al kg, valori nutrizionali e tracciabilità ingredienti.</li>
    <li><strong>Assemblaggi:</strong> Combina più ricette e semilavorati per creare il prodotto finito (esempio: torta = pan di spagna + crema + glassa).</li>
    <li><strong>Tools:</strong> Calcolatori specifici per bagne, calcolo W, gelato, impasto, rinfresco lievito madre, stampi, tempistiche.</li>
    <li><strong>Tabella Nutrizionale:</strong> Calcola automaticamente i valori nutrizionali di ogni ricetta e prodotto finito, pronti per etichette.</li>
    <li><strong>Etichette Alimentari:</strong> Genera etichette alimentari con allergeni evidenziati e tabella nutrizionale, pronte per la stampa.</li>
    <li><strong>Dashboard:</strong> Monitora produzione, vendite, lotti e tracciabilità con grafici e statistiche in tempo reale.</li>
  </ol>
</section>
```

---

#### 5.2 Add Platforms Compatibility Table

**File**: `src/components/Platforms.tsx` (Add after line 71)

**Add after platforms grid**:

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
          <td className="p-4 text-gray-600">Gestione mobile del laboratorio con sincronizzazione in tempo reale</td>
        </tr>
        <tr className="border-b border-gray-200">
          <td className="p-4 font-semibold text-gray-900">Tablet Android</td>
          <td className="p-4 text-center text-green-600 font-bold">✓ Sì</td>
          <td className="p-4 text-gray-600">Controllo produzione in laboratorio con schermo ottimizzato</td>
        </tr>
        <tr>
          <td className="p-4 font-semibold text-gray-900">Desktop Windows</td>
          <td className="p-4 text-center text-green-600 font-bold">✓ Sì</td>
          <td className="p-4 text-gray-600">Gestione completa dell'attività con report avanzati</td>
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

## 3. CODE DIFFS & EXAMPLES

### Complete Diff Summary

```diff
## src/components/ContactForm.tsx
- <h4 className="font-bold text-gray-900 mb-3">Altre informazioni</h4>
+ <h3 className="text-lg font-bold text-gray-900 mb-3">Altre informazioni</h3>

## src/components/Download.tsx
+ <h3 className="sr-only">Guida all'installazione APK</h3>
  <button id="installation-guide-button"...>
    <h4 className="text-base font-bold...">Problemi con l'installazione dell'APK?</h4>

## src/components/FAQ.tsx
  <button id={`faq-question-${index}`}...>
-   <span className="font-semibold text-gray-900">{faq.question}</span>
+   <h3 className="font-semibold text-gray-900">{faq.question}</h3>

## src/components/Features.tsx
+ <h3 className="sr-only">Vantaggi Principali di LabManager</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

## src/app/layout.tsx
  // Add Product schema after SoftwareApplication
+ {
+   "@type": "Product",
+   "@id": `${BASE_URL}/#product`,
+   ...
+ }

## src/app/page.tsx
  <Navbar />
+ <SectionNavigation />
  <main id="main-content">
```

---

## 4. VALIDATION CHECKLIST

### Pre-Implementation

- [ ] Review all proposed changes
- [ ] Create feature branch: `git checkout -b feat/structure-optimization`
- [ ] Run ESLint: `npm run lint`
- [ ] Check current build: `npm run build`

### During Implementation

- [ ] Implement header hierarchy fixes (Step 1)
- [ ] Verify no visual regressions
- [ ] Run `npm run lint` after changes
- [ ] Implement schema markup (Step 2)
- [ ] Test schema with Google Rich Results Test
- [ ] Implement internal linking (Step 3)
- [ ] Test all anchor links work
- [ ] Create SectionNavigation component (Step 4)
- [ ] Test sticky navigation visibility
- [ ] Add featured snippet optimizations (Step 5)

### Post-Implementation

- [ ] Run full test: `npm run build`
- [ ] No build errors
- [ ] Local testing: `npm run dev` on http://localhost:3000
- [ ] Visual regression testing (screenshot comparison)
- [ ] Lighthouse audit: all metrics >85
- [ ] Google Rich Results Test: no errors
- [ ] Schema.org validator: no errors
- [ ] W3C HTML validator: no errors
- [ ] Check mobile responsiveness
- [ ] Keyboard navigation test
- [ ] Screen reader test (NVDA/JAWS)

### Schema Validation

#### Test URLs

1. **Google Rich Results Test**
   ```
   https://search.google.com/test/rich-results
   ```
   - Paste full page HTML
   - Check for FAQPage
   - Check for SoftwareApplication
   - Check for breadcrumbs

2. **Schema.org Validator**
   ```
   https://validator.schema.org/
   ```
   - Paste full page HTML
   - Verify all schema types
   - Check for warnings

3. **Yandex Validator**
   ```
   https://webmaster.yandex.com/tools/microtest/
   ```
   - Additional validation

### Featured Snippet Testing

```
Search queries to test:
- "funzionalità app pasticceria"
- "gestionale pasticceria gratis"
- "labmanager"
- "app ricette pasticceria"
- "etichette alimentari software"
- "calcolo costi ricette"
- "come installare labmanager android"
```

---

## 5. TIMELINE & EFFORT ESTIMATES

### Project Timeline

```
SETTIMANA 1 (4-5 ore)
├── Monday: Header Hierarchy Fixes (30 min)
├── Tuesday: Schema Markup Enhancement (90 min)
├── Wednesday: Internal Linking (60 min)
└── Thursday: Testing & Validation (60 min)

SETTIMANA 2 (2-3 ore)
├── Monday: SectionNavigation Component (45 min)
├── Tuesday: Featured Snippet Optimization (90 min)
└── Wednesday: Final Testing & Deployment (30 min)

TOTAL TIME: 6-8 hours
```

### Effort Breakdown

| Task | Duration | Difficulty | Impact |
|------|----------|-----------|--------|
| Header Hierarchy | 30 min | Easy | Medium |
| Schema Markup | 90 min | Medium | High |
| Internal Linking | 60 min | Easy | Medium |
| Section Navigation | 45 min | Easy | Low-Medium |
| Featured Snippets | 90 min | Medium | High |
| Testing & Validation | 60 min | Medium | Critical |
| **TOTAL** | **375 min (6.25h)** | **Easy-Medium** | **High** |

### Dependencies

1. No external libraries needed
2. All changes use existing Next.js + React patterns
3. Compatible with current styling system (Tailwind CSS)
4. No database or API changes needed

### Rollback Plan

If issues occur:
```bash
git reset --hard HEAD~1  # Go back to previous commit
git checkout main        # Switch to main branch
```

All changes are additive - no breaking changes to existing functionality.

---

## QUICK REFERENCE

### Files to Modify

```
src/app/
├── layout.tsx (Schema markup)
└── page.tsx (Add SectionNavigation)

src/components/
├── ContactForm.tsx (H4 → H3)
├── Download.tsx (Add H3 + HowTo schema + links)
├── FAQ.tsx (span → H3)
├── Features.tsx (Add H3 + sr-only list)
├── Platforms.tsx (Add table)
└── SectionNavigation.tsx (NEW)
```

### Key Changes Summary

**Header Hierarchy**: 4 changes
**Schema Markup**: 3 additions (Product, HowTo, BreadcrumbList update)
**Internal Linking**: 4 sections enhanced
**New Component**: 1 SectionNavigation
**Featured Snippets**: 2 optimizations (list + table)

---

## SUPPORT RESOURCES

- Next.js Docs: https://nextjs.org/docs
- React Docs: https://react.dev
- Schema.org: https://schema.org
- Google Search Central: https://developers.google.com/search
- Tailwind CSS: https://tailwindcss.com

---

**Status**: Ready for Implementation
**Last Updated**: 11 Febbraio 2026
**Next Steps**: Begin with Step 1 (Header Hierarchy Fixes)
