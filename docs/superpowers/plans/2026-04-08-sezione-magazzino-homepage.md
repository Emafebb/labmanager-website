# Sezione Magazzino Homepage — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aggiungere una sezione "Gestione Magazzino" nella homepage di pastrylabmanager.com, posizionata dopo `<Features />`, che presenti tutte le funzionalità del nuovo modulo magazzino.

**Architecture:** Nuovo componente statico `Warehouse.tsx` modellato sullo stesso pattern di `Features.tsx` — dati dichiarati come array di oggetti, due livelli di card (2 hero card + 6 feature card), sfondo `bg-surface` per differenziarsi visivamente dalla sezione Features (`bg-white`). Il componente viene importato e inserito in `page.tsx`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, lucide-react

---

## File Structure

| File | Azione | Responsabilità |
|------|--------|----------------|
| `src/components/Warehouse.tsx` | **Crea** | Componente sezione magazzino — dati + layout |
| `src/app/page.tsx` | **Modifica** | Import + inserimento `<Warehouse />` dopo `<Features />` |

---

### Task 1: Creare il componente `Warehouse.tsx`

**Files:**
- Create: `src/components/Warehouse.tsx`

- [ ] **Step 1: Creare il file `src/components/Warehouse.tsx` con il seguente contenuto completo**

```tsx
import {
  PackagePlus,
  LayoutDashboard,
  PackageMinus,
  ArrowDownUp,
  BellRing,
  Building2,
  ArrowLeftRight,
  MapPin,
} from "lucide-react";

const heroFeatures = [
  {
    icon: PackagePlus,
    title: "Ricevimento Merci",
    description:
      "Registra ogni carico con fornitore, lotto, data di scadenza e sede di destinazione. Ogni ricevimento aggiorna automaticamente la disponibilità.",
  },
  {
    icon: LayoutDashboard,
    title: "Disponibilità in tempo reale",
    description:
      "Monitora le giacenze di materie prime, prodotti finiti e commerciali in ogni sede. Soglie di riordino configurabili per non restare mai a secco.",
  },
];

const features = [
  {
    icon: PackageMinus,
    title: "Prelievo",
    description:
      "Scarica ingredienti dal magazzino per la produzione, manualmente o tramite bridge automatico dalla ricetta.",
  },
  {
    icon: ArrowDownUp,
    title: "Scarico FIFO automatico",
    description:
      "I lotti più vecchi vengono consumati per primi. Nessuna gestione manuale, nessun spreco nascosto.",
  },
  {
    icon: BellRing,
    title: "Alert scadenze",
    description:
      "Notifiche configurabili per i prodotti in scadenza. Intervieni prima che il problema diventi perdita.",
  },
  {
    icon: Building2,
    title: "Anagrafica Fornitori",
    description:
      "Gestisci fornitori con dati completi: IBAN, condizioni di pagamento, categorie merceologiche e scontistica.",
  },
  {
    icon: ArrowLeftRight,
    title: "Trasferimenti tra sedi",
    description:
      "Sposta merce da un magazzino all'altro con tracciabilità completa del movimento.",
  },
  {
    icon: MapPin,
    title: "Gestione multi-sede",
    description:
      "Ogni sede ha il suo magazzino con collocazioni indipendenti. Visione consolidata o per singola sede.",
  },
];

export default function Warehouse() {
  return (
    <section id="magazzino" className="py-24 bg-surface" aria-labelledby="warehouse-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/10 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-sm font-medium text-gray-600">
                Nuovo modulo
              </span>
            </div>
          </div>

          <h2
            id="warehouse-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            Il magazzino adesso lavora con te
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Carichi, prelevi, correggi, trasferisci. Ogni movimento è tracciato.
            Ogni scadenza è sotto controllo.
          </p>
        </div>

        {/* Hero features — 2 grandi card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {heroFeatures.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-white border border-gray-100 rounded-3xl p-8 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-60 pointer-events-none" />
              <div className="relative">
                <div className="bg-primary/10 rounded-xl p-3 w-fit mb-5">
                  <feature.icon className="text-primary" size={32} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature cards — grid 3x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-white border border-gray-100 rounded-2xl p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="bg-primary/10 rounded-xl p-3 w-fit mb-4">
                <feature.icon className="text-primary" size={22} aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificare che il file sia stato creato correttamente**

```bash
ls src/components/Warehouse.tsx
```

Expected: il file esiste.

- [ ] **Step 3: Commit**

```bash
git add src/components/Warehouse.tsx
git commit -m "feat: add Warehouse section component"
```

---

### Task 2: Integrare `Warehouse` in `page.tsx`

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Aprire `src/app/page.tsx` e aggiungere l'import di `Warehouse` dopo l'import di `Features`**

Prima (righe 1-8 di `src/app/page.tsx`):

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WhyLabManager from "@/components/WhyLabManager";
import Platforms from "@/components/Platforms";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import NewsletterPopup from "@/components/NewsletterPopup";
```

Dopo:

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Warehouse from "@/components/Warehouse";
import WhyLabManager from "@/components/WhyLabManager";
import Platforms from "@/components/Platforms";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import NewsletterPopup from "@/components/NewsletterPopup";
```

- [ ] **Step 2: Aggiungere `<Warehouse />` nel JSX, tra `<Features />` e `<WhyLabManager />`**

Prima:

```tsx
        <Features />
        <WhyLabManager />
```

Dopo:

```tsx
        <Features />
        <Warehouse />
        <WhyLabManager />
```

- [ ] **Step 3: Buildare per verificare che non ci siano errori TypeScript**

```bash
npm run build
```

Expected output (ultima riga): `✓ Compiled successfully` oppure lista route senza errori. Se ci sono errori TypeScript, correggerli prima di procedere.

- [ ] **Step 4: Avviare il dev server e verificare visivamente**

```bash
npm run dev
```

Aprire `http://localhost:3000` nel browser e verificare:
- La sezione "Il magazzino adesso lavora con te" appare tra Features e WhyLabManager
- Il badge con punto verde animato è visibile
- Le 2 hero card grandi sono affiancate su desktop
- Le 6 card piccole sono in grid 3 colonne su desktop, 2 su tablet, 1 su mobile
- Lo sfondo della sezione è grigio chiaro (diverso dal bianco di Features)

- [ ] **Step 5: Commit finale**

```bash
git add src/app/page.tsx
git commit -m "feat: integrate Warehouse section into homepage"
```

---

## Self-Review

**Spec coverage:**
- [x] Posizione dopo Features → Task 2 Step 2
- [x] Badge "Nuovo modulo" + punto verde animato → Task 1 (header section)
- [x] Titolo "Il magazzino adesso lavora con te" → Task 1
- [x] 2 hero card (Ricevimento Merci, Disponibilità) → Task 1 `heroFeatures`
- [x] 6 feature card (Prelievo, FIFO, Alert, Fornitori, Trasferimenti, Multi-sede) → Task 1 `features`
- [x] Sfondo `bg-surface` → Task 1 section className
- [x] Stile coerente con Features.tsx → pattern identico (hover, border, rounded, shadow)
- [x] Nessuna nuova dipendenza → solo lucide-react già presente

**Placeholder scan:** nessun TBD, nessun "implement later", tutto il codice è completo.

**Type consistency:** nessun tipo custom — tutto JSX/TSX standard. Nomi array `heroFeatures` e `features` usati coerentemente in tutto il componente.
