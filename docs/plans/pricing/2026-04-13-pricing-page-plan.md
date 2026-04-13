# Pagina Pricing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Creare la pagina `/pricing` informativa con blocco prezzo (due card mensile/annuale), feature list, blocco ROI, FAQ dedicate, e aggiungere il link "Prezzi" alla Navbar.

**Architecture:** Pagina separata `src/app/pricing/page.tsx` come Server Component. Prezzi definiti come costanti in un oggetto di configurazione in cima al file. La Navbar viene aggiornata con un link `/pricing`. Le FAQ pricing usano lo stesso pattern accordion del componente FAQ esistente, implementato inline nella pagina.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4, lucide-react

**Spec:** `docs/plans/pricing/2026-04-13-pricing-page-design.md`

---

### Task 1: Aggiornare la Navbar con il link "Prezzi"

**Files:**
- Modify: `src/components/Navbar.tsx:7-13`

- [ ] **Step 1: Aggiungere "Prezzi" all'array `navLinks`**

In `src/components/Navbar.tsx`, modificare l'array `navLinks` inserendo il link Prezzi dopo Funzionalità:

```typescript
const navLinks = [
  { href: "#funzionalita", label: "Funzionalità" },
  { href: "/pricing", label: "Prezzi" },
  { href: "#perche-labmanager", label: "Perché LabManager" },
  { href: "#piattaforme", label: "Piattaforme" },
  { href: "#faq", label: "FAQ" },
  { href: "#contatti", label: "Contatti" },
];
```

- [ ] **Step 2: Verificare nel browser**

Run: `npm run dev`

Aprire http://localhost:3000 e verificare:
- Il link "Prezzi" appare nella Navbar tra "Funzionalità" e "Perché LabManager"
- Cliccando "Prezzi" naviga a `/pricing` (404 per ora, è corretto)
- Il menu mobile mostra "Prezzi" nella stessa posizione
- Gli altri link funzionano ancora (sono anchor nella home)

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat(pricing): add Prezzi link to Navbar after Funzionalità"
```

---

### Task 2: Creare la pagina pricing con configurazione prezzi e hero

**Files:**
- Create: `src/app/pricing/page.tsx`

- [ ] **Step 1: Creare il file con metadata, config prezzi e hero section**

Creare `src/app/pricing/page.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prezzi",
  description:
    "Un solo piano, tutto incluso. LabManager: ricette, costi, magazzino, etichette e tracciabilità lotti. A partire da €33/mese.",
  openGraph: {
    title: "Prezzi | LabManager",
    description:
      "Un solo piano, tutto incluso. Gestionale completo per pasticceria, panificio e ristorante.",
  },
};

/*
 * Prezzi provvisori — modifica solo questo oggetto per aggiornare
 * tutti i valori nella pagina.
 */
const PRICING = {
  monthly: {
    net: 45,
    vat: 9.9,
    gross: 54.9,
  },
  yearly: {
    net: 400,
    vat: 88,
    gross: 488,
    monthlyEquivalent: 33,
    saving: 145,
  },
  trialDays: 21,
  dailyCost: 1.1,
  vatRate: 22,
};

export default function PricingPage() {
  return (
    <main className="pt-28 pb-24">
      {/* Hero */}
      <section className="px-6 text-center mb-20">
        <div className="max-w-3xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-icon/10 text-icon px-4 py-2 rounded-full text-sm font-bold mb-6 border border-icon/20">
            <span>Prezzi</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Un solo piano. Tutto incluso.{" "}
            <span className="gradient-text">Nessuna sorpresa.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            LabManager ti dà accesso completo a tutte le funzionalità — ricette,
            costi, magazzino, etichette, tracciabilità lotti — senza scegliere
            tra versioni ridotte o pagare extra per ciò che ti serve davvero.
          </p>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verificare nel browser**

Run: `npm run dev`

Aprire http://localhost:3000/pricing e verificare:
- La pagina si carica senza errori
- L'hero mostra badge, headline con gradient e sottotitolo
- Il layout è centrato e responsive (testare resize)
- Il link "Prezzi" nella Navbar porta a questa pagina

- [ ] **Step 3: Commit**

```bash
git add src/app/pricing/page.tsx
git commit -m "feat(pricing): create pricing page with hero section and price config"
```

---

### Task 3: Aggiungere il blocco prezzo con due card affiancate

**Files:**
- Modify: `src/app/pricing/page.tsx`

- [ ] **Step 1: Aggiungere la sezione prezzi dopo l'hero**

In `src/app/pricing/page.tsx`, aggiungere dopo la chiusura del `</section>` hero (prima del `</main>`):

```tsx
      {/* Pricing Cards */}
      <section className="px-6 mb-20">
        <div className="max-w-3xl mx-auto">
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center items-stretch animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            {/* Mensile */}
            <div className="flex-1 max-w-sm bg-white rounded-2xl border border-gray-200 p-8 text-center">
              <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                Mensile
              </div>
              <div className="text-5xl font-bold text-gray-900">
                €{PRICING.monthly.net}
                <span className="text-lg font-normal text-gray-500">
                  /mese
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                IVA {PRICING.vatRate}% esclusa — €{PRICING.monthly.gross} al
                mese
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 text-sm text-gray-600">
                Nessun vincolo contrattuale
              </div>
            </div>

            {/* Annuale */}
            <div className="flex-1 max-w-sm bg-white rounded-2xl border-2 border-primary p-8 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                Più scelto
              </div>
              <div className="text-sm font-bold text-primary uppercase tracking-wider mb-4">
                Annuale
              </div>
              <div className="text-5xl font-bold text-primary">
                €{PRICING.yearly.net}
                <span className="text-lg font-normal text-gray-500">
                  /anno
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                IVA {PRICING.vatRate}% esclusa — €{PRICING.yearly.gross} totali
              </div>
              <div className="text-sm font-semibold text-primary mt-3">
                €{PRICING.yearly.monthlyEquivalent}/mese — risparmi €
                {PRICING.yearly.saving}
              </div>
              <div className="mt-6 pt-6 border-t border-primary/10 text-sm text-gray-600">
                Pagamento unico anticipato
              </div>
            </div>
          </div>

          {/* Trial + nessun costo attivazione */}
          <p
            className="text-center text-sm text-gray-500 mt-8 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Prova gratuita di {PRICING.trialDays} giorni · Nessun costo di
            attivazione
          </p>
        </div>
      </section>
```

- [ ] **Step 2: Verificare nel browser**

Aprire http://localhost:3000/pricing e verificare:
- Due card affiancate su desktop, impilate su mobile
- La card annuale ha bordo viola, badge "Più scelto" e prezzo in viola
- La card mensile ha bordo grigio e prezzo in nero
- I prezzi corrispondono all'oggetto PRICING
- La riga trial appare centrata sotto le card
- L'animazione fade-in-up funziona

- [ ] **Step 3: Commit**

```bash
git add src/app/pricing/page.tsx
git commit -m "feat(pricing): add side-by-side monthly/yearly price cards"
```

---

### Task 4: Aggiungere la struttura recensioni (nascosta)

**Files:**
- Modify: `src/app/pricing/page.tsx`

- [ ] **Step 1: Aggiungere la sezione recensioni commentata dopo il blocco prezzo**

In `src/app/pricing/page.tsx`, aggiungere dopo la riga trial (dopo il `</section>` del blocco prezzo):

```tsx
      {/* Recensioni — sezione nascosta, attivare quando disponibili contenuti reali */}
      {/* 
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { quote: "Recensione...", name: "Nome", role: "Ruolo / Attività" },
              { quote: "Recensione...", name: "Nome", role: "Ruolo / Attività" },
              { quote: "Recensione...", name: "Nome", role: "Ruolo / Attività" },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-card-border/25 p-8 shadow-sm"
              >
                <p className="text-gray-600 leading-relaxed mb-6 italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/pricing/page.tsx
git commit -m "feat(pricing): add hidden reviews section placeholder for future use"
```

---

### Task 5: Aggiungere la sezione "Cosa è incluso"

**Files:**
- Modify: `src/app/pricing/page.tsx`

- [ ] **Step 1: Aggiungere gli import delle icone**

In cima a `src/app/pricing/page.tsx`, aggiungere sotto l'import di Metadata:

```tsx
import {
  ChefHat,
  Warehouse,
  FileCheck,
  Users,
} from "lucide-react";
```

- [ ] **Step 2: Aggiungere i dati delle feature e la sezione dopo il blocco prezzo**

Aggiungere l'array dei dati feature subito dopo l'oggetto `PRICING` (prima della funzione `PricingPage`):

```tsx
const FEATURES = [
  {
    icon: ChefHat,
    title: "Ricette e Produzione",
    items: [
      "Ricette illimitate con costi aggiornati in automatico",
      "Calcolo food cost preciso al grammo",
      "Analisi nutrizionale e bilanciamento degli impasti",
      "Calcolatori specializzati per gelato, pasticceria, pane e lievito madre",
      "Pianificazione della produzione giornaliera",
    ],
  },
  {
    icon: Warehouse,
    title: "Magazzino e Tracciabilità",
    items: [
      "Magazzino multi-sede con alert scadenze",
      "Tracciabilità lotti e scarico FIFO",
      "Scanner barcode per entrata merce e DDT",
      "Storico movimenti sempre disponibile",
    ],
  },
  {
    icon: FileCheck,
    title: "Etichette e Conformità",
    items: [
      "Etichette alimentari conformi alla normativa",
      "Allergeni in evidenza automatica",
      "Export PDF per DDT, distinte di produzione, report",
    ],
  },
  {
    icon: Users,
    title: "Team e Dispositivi",
    items: [
      "Accesso da Android e Windows",
      "Funziona offline — sincronizzazione automatica",
      "Gestione utenti con ruoli e permessi",
      "I tuoi dati sempre al sicuro nel cloud",
    ],
  },
];
```

Aggiungere la sezione nel JSX dopo la chiusura del `</section>` del blocco prezzo:

```tsx
      {/* Cosa è incluso */}
      <section className="px-6 py-20 bg-surface">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-14 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Tutto quello che ti serve, dal primo giorno
          </h2>

          <div className="grid sm:grid-cols-2 gap-8">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl border border-card-border/25 p-8 shadow-sm animate-fade-in-up"
                style={{ animationDelay: `${0.15 + index * 0.05}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                  <feature.icon
                    size={24}
                    className="text-primary"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <ul className="space-y-2.5">
                  {feature.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed"
                    >
                      <span
                        className="text-primary mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
```

- [ ] **Step 3: Verificare nel browser**

Aprire http://localhost:3000/pricing e verificare:
- Titolo "Tutto quello che ti serve, dal primo giorno" centrato
- 4 card in griglia 2x2 su desktop, impilate su mobile
- Ogni card ha icona viola, titolo e lista con checkmark
- Sfondo grigio chiaro (`bg-surface`) per differenziare dalla sezione precedente

- [ ] **Step 4: Commit**

```bash
git add src/app/pricing/page.tsx
git commit -m "feat(pricing): add features included section with 4-block grid"
```

---

### Task 6: Aggiungere il blocco ROI

**Files:**
- Modify: `src/app/pricing/page.tsx`

- [ ] **Step 1: Aggiungere la sezione ROI dopo "Cosa è incluso"**

In `src/app/pricing/page.tsx`, aggiungere dopo la chiusura del `</section>` di "Cosa è incluso":

```tsx
      {/* ROI */}
      <section className="px-6 py-20">
        <div
          className="max-w-3xl mx-auto bg-primary/5 border border-primary/10 rounded-3xl p-10 sm:p-14 text-center animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">
            €{PRICING.dailyCost.toFixed(2).replace(".", ",")} al giorno.
          </p>
          <p className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6">
            Meno di un caffè al bar.
          </p>
          <p className="text-gray-600 leading-relaxed max-w-xl mx-auto">
            Se una ricetta sbagliata ti fa sprecare anche solo €50 al mese di
            materie prime, LabManager si ripaga in tre giorni.
          </p>
        </div>
      </section>
```

- [ ] **Step 2: Verificare nel browser**

Aprire http://localhost:3000/pricing e verificare:
- Card centrata con sfondo viola chiaro e bordo viola tenue
- "€1,10 al giorno." in grande, viola, bold
- "Meno di un caffè al bar." come sottotitolo
- Testo esplicativo sotto
- Il valore €1,10 deriva da `PRICING.dailyCost`

- [ ] **Step 3: Commit**

```bash
git add src/app/pricing/page.tsx
git commit -m "feat(pricing): add ROI block with daily cost highlight"
```

---

### Task 7: Aggiungere le FAQ pricing con accordion

**Files:**
- Modify: `src/app/pricing/page.tsx`

- [ ] **Step 1: Creare il componente FAQ inline e i dati**

Dato che le FAQ pricing richiedono stato client per l'accordion, creare un componente client separato. Creare `src/app/pricing/pricing-faq.tsx`:

```tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "Posso cambiare da mensile ad annuale?",
    answer:
      "Sì, in qualsiasi momento. La differenza viene scalata dal periodo già pagato.",
  },
  {
    question: "Cosa succede se smetto di pagare?",
    answer:
      "I tuoi dati rimangono archiviati per 12 mesi. Se torni, ritrovi tutto esattamente com'era.",
  },
  {
    question: "È adatto anche a ristoranti e pizzerie?",
    answer:
      "Sì. Le funzionalità di food cost, ricette e gestione ingredienti funzionano per qualsiasi tipo di laboratorio alimentare.",
  },
  {
    question: "Posso usarlo senza connessione internet?",
    answer:
      "Sì. LabManager funziona completamente offline su Android e Windows. I dati si sincronizzano in automatico quando torni online.",
  },
  {
    question: "Quanti utenti posso aggiungere?",
    answer:
      "Il piano include accesso per il tuo team. Puoi configurare ruoli e permessi per ogni membro.",
  },
  {
    question: "C'è un contratto da firmare?",
    answer:
      "No. Il piano mensile non ha vincoli — lo attivi e lo disdici quando vuoi. Il piano annuale è un pagamento unico anticipato.",
  },
];

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-6 py-20 bg-surface">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-14 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Domande sul pricing
        </h2>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="bg-white rounded-xl border border-card-border/25 shadow-sm animate-fade-in-up"
                style={{ animationDelay: `${0.15 + index * 0.03}s` }}
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-gray-50 rounded-xl transition-colors duration-200"
                >
                  <h3 className="font-semibold text-gray-900 text-base">
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

                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? "max-h-[300px]" : "max-h-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Importare e usare il componente nella pagina**

In `src/app/pricing/page.tsx`, aggiungere l'import in cima (sotto gli import delle icone):

```tsx
import PricingFAQ from "./pricing-faq";
```

Aggiungere il componente nel JSX, dopo la chiusura del `</section>` del blocco ROI:

```tsx
      {/* FAQ */}
      <PricingFAQ />
```

- [ ] **Step 3: Verificare nel browser**

Aprire http://localhost:3000/pricing e verificare:
- Titolo "Domande sul pricing" centrato
- 6 domande in accordion
- Cliccando una domanda si apre la risposta, cliccando di nuovo si chiude
- Solo una domanda aperta alla volta
- Lo stile è identico alla FAQ della home (bordo, rounded, chevron che ruota)

- [ ] **Step 4: Commit**

```bash
git add src/app/pricing/pricing-faq.tsx src/app/pricing/page.tsx
git commit -m "feat(pricing): add pricing FAQ accordion with 6 dedicated questions"
```

---

### Task 8: Aggiungere Navbar e Footer alla pagina pricing

**Files:**
- Modify: `src/app/pricing/page.tsx`

- [ ] **Step 1: Aggiungere Navbar, Footer e WhatsAppButton**

In `src/app/pricing/page.tsx`, aggiungere gli import in cima:

```tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
```

Modificare il return della funzione `PricingPage` per wrappare il `<main>` con Navbar e Footer:

```tsx
export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24">
        {/* ... tutte le sezioni esistenti ... */}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
```

- [ ] **Step 2: Verificare nel browser**

Aprire http://localhost:3000/pricing e verificare:
- La Navbar appare in cima con "Prezzi" evidenziato (o almeno visibile)
- Il Footer appare in fondo
- Il pulsante WhatsApp flottante è visibile
- I link della Navbar che puntano alla home (es. #funzionalita) funzionano — portano a `/#funzionalita`
- Il padding-top del main (pt-28) evita che il contenuto si sovrapponga alla Navbar fixed

- [ ] **Step 3: Verificare i link Navbar dalla home**

Aprire http://localhost:3000 e verificare:
- Il link "Prezzi" nella Navbar porta correttamente a `/pricing`
- Gli altri link anchor (#funzionalita, #faq, ecc.) funzionano ancora sulla home

- [ ] **Step 4: Commit**

```bash
git add src/app/pricing/page.tsx
git commit -m "feat(pricing): add Navbar, Footer and WhatsApp button to pricing page"
```

---

### Task 9: Fix dei link Navbar per funzionare cross-page

**Files:**
- Modify: `src/components/Navbar.tsx:7-13`

- [ ] **Step 1: Aggiornare i link anchor per funzionare da qualsiasi pagina**

I link come `#funzionalita` funzionano solo sulla home. Dalla pagina `/pricing`, devono puntare a `/#funzionalita`. Modificare l'array `navLinks` in `src/components/Navbar.tsx`:

```typescript
const navLinks = [
  { href: "/#funzionalita", label: "Funzionalità" },
  { href: "/pricing", label: "Prezzi" },
  { href: "/#perche-labmanager", label: "Perché LabManager" },
  { href: "/#piattaforme", label: "Piattaforme" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contatti", label: "Contatti" },
];
```

Aggiornare anche il CTA "Richiedi Info" (sia desktop che mobile) da `href="#contatti"` a `href="/#contatti"`.

- [ ] **Step 2: Verificare nel browser**

Da http://localhost:3000/pricing, cliccare:
- "Funzionalità" → porta a `/#funzionalita` sulla home
- "FAQ" → porta a `/#faq` sulla home
- "Richiedi Info" → porta a `/#contatti` sulla home

Da http://localhost:3000 (home), cliccare:
- "Funzionalità" → scrolla alla sezione (anchor con `/` prefix funziona sulla stessa pagina)
- "Prezzi" → porta a `/pricing`

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "fix(nav): use absolute paths for anchor links to work cross-page"
```

---

### Task 10: Build di produzione e verifica finale

**Files:**
- Nessun file modificato — solo verifica

- [ ] **Step 1: Eseguire il build di produzione**

Run: `npm run build`

Expected: build completo senza errori. La pagina `/pricing` viene generata come route statica.

- [ ] **Step 2: Eseguire il linter**

Run: `npm run lint`

Expected: nessun errore.

- [ ] **Step 3: Verifica responsive completa**

Run: `npm run dev`

Aprire http://localhost:3000/pricing e verificare a 3 breakpoint:
- **Mobile (375px):** card impilate, testo leggibile, nessun overflow orizzontale
- **Tablet (768px):** card affiancate, griglia feature 2x2
- **Desktop (1280px):** layout centrato con max-width, ampio spazio

- [ ] **Step 4: Commit finale (se ci sono fix)**

Solo se i passi precedenti hanno richiesto correzioni:

```bash
git add -A
git commit -m "fix(pricing): address build/lint/responsive issues"
```
