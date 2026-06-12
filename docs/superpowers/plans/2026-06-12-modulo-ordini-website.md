# Modulo Ordini Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dedicated `/ordini` page, a compact homepage preview, navigation links, and SEO/AI-SEO updates for the LabManager Ordini e Piano di Lavoro module.

**Architecture:** Keep the homepage lightweight by adding one focused preview component that links to a full static App Router page. The `/ordini` page owns its page-specific metadata, JSON-LD, FAQ content, and product storytelling, while global discovery assets live in `sitemap.ts`, `layout.tsx`, and `public/llms.txt`.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind utilities, `lucide-react`, Vitest, Testing Library.

---

## Source Requirements

Use the approved design spec:

- `docs/superpowers/specs/2026-06-12-modulo-ordini-homepage-design.md`

The user updated the SEO title requirement to:

```ts
title: "Gestione ordini dei tuoi clienti - LabManager"
```

Post-implementation alignment decisions:

- Do not include a "Scarica LabManager" CTA or `/download` link anywhere on `/ordini`.
- Do not reuse the generic multi-device homepage screenshot in the `/ordini` hero.
- The hero must describe the Piano di Lavoro explicitly with an orders/work-plan summary panel.
- Reuse the existing shared `Footer` component exactly as the rest of the site does; do not add a custom pre-footer CTA band.

Preserve the existing unrelated dirty change in `CLAUDE.md`. Do not revert it and do not include it in feature commits.

## File Structure

- Create `src/app/ordini/page.tsx`
  - Static App Router route for the full orders landing page.
  - Exports `metadata` and `ordersPageStructuredData`.
  - Renders `Navbar`, page content, `Footer`, and `WhatsAppButton`.
- Create `src/app/ordini/page.test.tsx`
  - Contract tests for page metadata, above-the-fold copy, extractable FAQ content, and JSON-LD.
- Create `src/components/OrdersPreview.tsx`
  - Compact homepage section that links to `/ordini`.
- Create `src/components/orders-preview-navigation.test.tsx`
  - Contract tests for `OrdersPreview`, `Navbar`, and `Footer` links.
- Modify `src/app/page.tsx`
  - Insert `OrdersPreview` after `Features` and before `Warehouse`.
- Modify `src/components/Navbar.tsx`
  - Add `Ordini` after `Funzionalità` and before `Prezzi`.
- Modify `src/components/Footer.tsx`
  - Add `Ordini` to the `Prodotto` column.
- Modify `src/app/sitemap.ts`
  - Add `/ordini` with `changeFrequency: "monthly"` and `priority: 0.85`.
- Modify `src/app/layout.tsx`
  - Export `structuredDataGraph`.
  - Update `SoftwareApplication` to version `0.0.9`, date `2026-06-04`, release notes, and feature list.
- Create `src/app/orders-seo.test.ts`
  - Contract tests for sitemap and global software structured data.
- Modify `public/llms.txt`
  - Add `/ordini` and the module summary for AI systems.

---

### Task 1: Write Page Contract Tests

**Files:**
- Create: `src/app/ordini/page.test.tsx`

- [x] **Step 1: Create the failing page contract test**

Create `src/app/ordini/page.test.tsx`:

```tsx
import { render, screen, within } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import OrdersPage, {
  metadata,
  ordersPageStructuredData,
} from "@/app/ordini/page";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { src?: string }) =>
    createElement("img", { alt, src, ...props }),
}));

describe("orders page", () => {
  it("exports indexable SEO metadata for the orders page", () => {
    expect(metadata.title).toBe("Gestione ordini dei tuoi clienti - LabManager");
    expect(metadata.description).toBe(
      "Gestisci ordini cliente, ritiri, consegne, acconti, produzione collegata, piano di lavoro e report con LabManager per pasticceria, panificio e laboratorio.",
    );
    expect(metadata.alternates?.canonical).toBe(
      "https://pastrylabmanager.com/ordini",
    );
    expect(metadata.openGraph?.url).toBe(
      "https://pastrylabmanager.com/ordini",
    );
    expect(metadata.robots).toBeUndefined();
  });

  it("renders the core product story and CTAs", () => {
    render(<OrdersPage />);

    const main = within(screen.getByRole("main"));

    expect(
      main.getByRole("heading", {
        level: 1,
        name: "Gestione ordini e piano di lavoro per pasticceria, panificio e laboratorio",
      }),
    ).toBeInTheDocument();
    expect(
      main.getByText(/LabManager include un modulo Ordini e Piano di Lavoro/i),
    ).toBeInTheDocument();
    expect(
      main.getByRole("link", { name: "Richiedi una prova gratuita" }),
    ).toHaveAttribute("href", "/#contatti");
    expect(
      main.getByRole("link", { name: "Vedi come funziona" }),
    ).toHaveAttribute("href", "#flusso-ordine");
    expect(
      main.queryByRole("link", { name: "Scarica LabManager" }),
    ).not.toBeInTheDocument();
  });

  it("renders extractable sections for orders, production, payments, notifications, and reports", () => {
    render(<OrdersPage />);

    expect(
      screen.getByRole("heading", {
        name: "Come funziona la gestione ordini in LabManager?",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/ORD-DD\.MM\.YYYY-001/)).toBeInTheDocument();
    expect(screen.getByText(/cliente anagrafica o rapido/i)).toBeInTheDocument();
    expect(screen.getByText(/ordini interni tra sedi/i)).toBeInTheDocument();
    expect(screen.getByText(/ricette o assemblaggi/i)).toBeInTheDocument();
    expect(screen.getByText(/totale ordini, incassato netto, residuo/i)).toBeInTheDocument();
    expect(screen.getByText(/badge in navigazione, chip NEW/i)).toBeInTheDocument();
    expect(screen.getByText(/export Excel o PDF/i)).toBeInTheDocument();
  });

  it("renders FAQ answers that are safe for AI extraction", () => {
    render(<OrdersPage />);

    expect(
      screen.getByRole("heading", {
        name: "LabManager gestisce ordini con acconto e saldo?",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Gli ordini possono essere collegati alle ricette?",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "La gestione pagamenti cliente è un modulo contabile?",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/non è un modulo contabile fiscale/i),
    ).toBeInTheDocument();
  });

  it("exports webpage, breadcrumb, and FAQ structured data", () => {
    expect(ordersPageStructuredData["@context"]).toBe("https://schema.org");
    const graph = ordersPageStructuredData["@graph"];

    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "@type": "WebPage",
          "@id": "https://pastrylabmanager.com/ordini#webpage",
          name: "Gestione ordini dei tuoi clienti - LabManager",
        }),
        expect.objectContaining({
          "@type": "BreadcrumbList",
        }),
        expect.objectContaining({
          "@type": "FAQPage",
        }),
      ]),
    );
  });
});
```

- [x] **Step 2: Run the test and verify it fails**

Run:

```powershell
npx vitest run src/app/ordini/page.test.tsx
```

Expected: FAIL because `src/app/ordini/page.tsx` does not exist yet.

- [x] **Step 3: Commit the failing test**

```powershell
git add -- src/app/ordini/page.test.tsx
git commit -m "test: define orders page contract"
```

Expected: commit succeeds and does not include `CLAUDE.md`.

---

### Task 2: Implement `/ordini` Page

**Files:**
- Create: `src/app/ordini/page.tsx`
- Test: `src/app/ordini/page.test.tsx`

- [x] **Step 1: Create the orders page**

Create `src/app/ordini/page.tsx` with this structure:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileSpreadsheet,
  ListChecks,
  PackageCheck,
  ReceiptText,
  Wallet,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";

const BASE_URL = "https://pastrylabmanager.com";
const PAGE_URL = `${BASE_URL}/ordini`;
const PAGE_TITLE = "Gestione ordini dei tuoi clienti - LabManager";
const PAGE_DESCRIPTION =
  "Gestisci ordini cliente, ritiri, consegne, acconti, produzione collegata, piano di lavoro e report con LabManager per pasticceria, panificio e laboratorio.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      it: PAGE_URL,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "LabManager",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/images/og-image.png`,
        secureUrl: `${BASE_URL}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "LabManager - Gestione ordini cliente, produzione e report",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${BASE_URL}/images/og-image.png`],
  },
};

const flowItems = [
  "Cliente anagrafica o rapido, telefono, sede, data evasione e fascia oraria.",
  "Ritiro o consegna, con numero ordine progressivo.",
  "Più righe nello stesso ordine, ognuna con note prodotto, note laboratorio, allergie dichiarate, dedica, colori, decorazioni e candele.",
  "Ordini cliente e ordini interni tra sedi, letti per giorno, settimana, mese o stato.",
];

const capabilityCards = [
  {
    icon: CalendarDays,
    title: "Ordini e agenda di lavoro",
    text: "Ogni ordine porta con sé cliente, data evasione, ritiro o consegna, sede e righe operative. Il laboratorio vede cosa va preparato oggi e cosa sta arrivando nei giorni successivi.",
  },
  {
    icon: PackageCheck,
    title: "Produzione collegata",
    text: "Le righe ordine possono essere collegate a ricette o assemblaggi. Quando la produzione viene registrata, il lotto resta collegato alla richiesta cliente.",
  },
  {
    icon: Wallet,
    title: "Acconti, saldo e residuo",
    text: "L'ordine può partire non pagato, con acconto o saldato. La vista cliente mostra totale ordini, incassato netto, residuo e giorni aperto.",
  },
  {
    icon: BellRing,
    title: "Notifiche operative",
    text: "Su Android arrivano notifiche push. Su Windows sono disponibili badge in navigazione, chip NEW sulle righe ordine e un suono leggero.",
  },
  {
    icon: FileSpreadsheet,
    title: "Report ed export",
    text: "Il Report Ordini include tab Prodotti, Clienti e Sedi, KPI operativi, riepiloghi cliente ed export Excel o PDF.",
  },
  {
    icon: ReceiptText,
    title: "Cassa collegata all'ordine",
    text: "La vendita generata dall'ordine conserva numero ordine, cliente e sede. La dashboard cassa legge gli incassi reali, non solo il totale ordine.",
  },
];

const workSteps = [
  {
    title: "Inserisci la richiesta",
    text: "Registra cliente, sede, data evasione, orario, ritiro o consegna e tutte le righe prodotto richieste.",
  },
  {
    title: "Prepara il laboratorio",
    text: "Collega le righe a ricette o assemblaggi, pianifica il lavoro settimanale e mantieni note e allergie visibili.",
  },
  {
    title: "Chiudi consegna e incasso",
    text: "Alla consegna puoi incassare il saldo, lasciare un residuo aperto o generare la vendita collegata all'ordine.",
  },
];

const planStats = [
  { label: "Da preparare", value: "12", detail: "righe ordine" },
  { label: "In produzione", value: "7", detail: "attivit\u00e0" },
  { label: "Da consegnare", value: "5", detail: "ritiri e consegne" },
];

const workPlanPreview = [
  {
    time: "08:00",
    title: "Basi e preparazioni",
    text: "Le righe ordine collegate a ricette diventano attivit\u00e0 per il laboratorio.",
  },
  {
    time: "11:30",
    title: "Ordini cliente",
    text: "Priorit\u00e0, fascia oraria, note prodotto e allergie restano visibili mentre lavori.",
  },
  {
    time: "15:00",
    title: "Ritiro, consegna o sede",
    text: "Il piano separa ordini da ritirare, consegne e ordini interni tra sedi.",
  },
];

const faqs = [
  {
    question: "LabManager gestisce ordini con acconto e saldo?",
    answer:
      "Sì. Un ordine può essere non pagato, con acconto o saldato. Il dettaglio mostra acconto, residuo e stato pagamento, così sai subito cosa resta da incassare.",
  },
  {
    question: "Gli ordini possono essere collegati alle ricette?",
    answer:
      "Sì. Le righe ordine possono essere collegate a ricette o assemblaggi già presenti in LabManager, riducendo la riscrittura tra richiesta cliente e produzione.",
  },
  {
    question: "Posso vedere gli ordini da preparare oggi?",
    answer:
      "Sì. Le viste per giorno, settimana, mese e stato aiutano a distinguere cosa va preparato oggi, cosa è pronto, cosa è in ritardo e cosa deve essere ritirato o consegnato.",
  },
  {
    question: "Il report ordini esporta Excel o PDF?",
    answer:
      "Sì. Il Report Ordini permette export Excel o PDF con clienti, prodotti, sedi, righe ordine, note operative, acconti e residui quando disponibili.",
  },
  {
    question: "La gestione pagamenti cliente è un modulo contabile?",
    answer:
      "No. È una vista operativa sugli incassi degli ordini: mostra totale ordini, incassato netto, residuo e giorni aperto. Non è un modulo contabile fiscale, non crea fatture, prima nota o credito cliente.",
  },
];

export const ordersPageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: "it-IT",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#softwareapplication` },
    },
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
          name: "Ordini",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function OrdersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ordersPageStructuredData),
          }}
        />

        <section className="px-6 pb-20 bg-[#FAFBFE]" aria-labelledby="orders-heading">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_520px] gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-full text-sm font-bold mb-6 border border-gray-200 shadow-sm">
                <ClipboardList size={16} aria-hidden="true" />
                <span>Ordini e Piano di Lavoro</span>
              </div>

              <h1
                id="orders-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
              >
                Gestione ordini e piano di lavoro per pasticceria, panificio e laboratorio
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mb-6">
                LabManager include un modulo Ordini e Piano di Lavoro per trasformare una richiesta cliente in attività di laboratorio, produzione collegata, consegna o ritiro e incasso.
              </p>

              <p className="text-base text-gray-600 leading-relaxed max-w-2xl mb-8">
                È pensato per chi gestisce ordini clienti, ordini interni tra sedi, acconti, saldi, note operative, allergie dichiarate e report giornalieri senza separare banco, laboratorio e amministrazione.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/#contatti"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
                >
                  Richiedi una prova gratuita
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link
                  href="#flusso-ordine"
                  className="inline-flex items-center justify-center border border-gray-200 bg-white text-gray-700 px-6 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 hover:border-gray-300 hover:shadow-md"
                >
                  Vedi come funziona
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
                      Piano di lavoro
                    </p>
                    <h2 className="text-2xl font-bold text-gray-900 text-pretty">
                      Cosa va preparato, quando e per chi
                    </h2>
                  </div>
                  <div className="shrink-0 rounded-2xl bg-primary/10 p-3 text-primary">
                    <ListChecks size={26} aria-hidden="true" />
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  Il piano di lavoro traduce ogni ordine in attivit&agrave; operative:
                  priorit&agrave;, fascia oraria, sede, stato di produzione, note
                  laboratorio e collegamento alla richiesta cliente o interna.
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {planStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-gray-100 bg-surface px-3 py-4 text-center">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="mt-1 break-words text-xs font-semibold text-gray-600">{stat.label}</p>
                      <p className="mt-1 hidden text-xs text-gray-500 sm:block">{stat.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  {workPlanPreview.map((item) => (
                    <article key={item.time} className="flex gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                      <div className="flex min-w-14 items-center gap-1 text-sm font-bold text-primary">
                        <Clock3 size={15} aria-hidden="true" />
                        <span>{item.time}</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.text}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="flusso-ordine" className="px-6 py-20 bg-white" aria-labelledby="orders-flow-heading">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                Flusso operativo
              </p>
              <h2 id="orders-flow-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Come funziona la gestione ordini in LabManager?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                L'ordine non resta isolato: accompagna il lavoro dal banco al laboratorio, fino alla consegna e al controllo degli incassi.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-12">
              {workSteps.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-gray-100 bg-surface p-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Cosa puoi gestire con il modulo ordini
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {flowItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                    <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 bg-surface" aria-labelledby="orders-capabilities-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                Produzione, cassa e report
              </p>
              <h2 id="orders-capabilities-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Dal numero ordine al report di giornata
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Il gestionale ordini pasticceria di LabManager collega richieste cliente, lavorazioni, incassi e riepiloghi senza duplicare dati.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilityCards.map((card) => (
                <div key={card.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="bg-primary/10 rounded-xl p-3 w-fit mb-4">
                    <card.icon size={22} className="text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 bg-white" aria-labelledby="orders-faq-heading">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                Domande frequenti
              </p>
              <h2 id="orders-faq-heading" className="text-3xl sm:text-4xl font-bold text-gray-900">
                Domande sul modulo ordini
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <article key={faq.question} className="rounded-2xl border border-gray-100 bg-surface p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
```

- [x] **Step 2: Run the page test**

Run:

```powershell
npx vitest run src/app/ordini/page.test.tsx
```

Expected: PASS.

- [x] **Step 3: Commit the page implementation**

```powershell
git add -- src/app/ordini/page.tsx src/app/ordini/page.test.tsx
git commit -m "feat: add orders landing page"
```

Expected: commit succeeds.

---

### Task 3: Add Homepage Preview and Navigation Links

**Files:**
- Create: `src/components/OrdersPreview.tsx`
- Create: `src/components/orders-preview-navigation.test.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Footer.tsx`

- [x] **Step 1: Create the failing preview and navigation tests**

Create `src/components/orders-preview-navigation.test.tsx`:

```tsx
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import OrdersPreview from "@/components/OrdersPreview";

describe("orders preview and navigation", () => {
  it("renders the homepage orders preview with a link to the dedicated page", () => {
    render(<OrdersPreview />);

    expect(screen.getByText("Nuovo modulo")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Ordini e piano di lavoro collegati a produzione, cassa e laboratorio",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/cliente anagrafica o rapido/i)).toBeInTheDocument();
    expect(screen.getByText(/residuo cliente e report/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Scopri il modulo ordini" }),
    ).toHaveAttribute("href", "/ordini");
  });

  it("adds Ordini to the main navigation", () => {
    render(<Navbar />);

    const desktopOrdersLink = screen
      .getAllByRole("link", { name: "Ordini" })
      .find((link) => link.getAttribute("href") === "/ordini");

    expect(desktopOrdersLink).toBeDefined();
  });

  it("adds Ordini to the footer product links", () => {
    render(<Footer />);

    const footer = within(
      screen.getByRole("contentinfo", { name: "Informazioni LabManager" }),
    );

    expect(footer.getByRole("link", { name: "Ordini" })).toHaveAttribute(
      "href",
      "/ordini",
    );
  });
});
```

- [x] **Step 2: Run the test and verify it fails**

Run:

```powershell
npx vitest run src/components/orders-preview-navigation.test.tsx
```

Expected: FAIL because `OrdersPreview` does not exist and navigation links are missing.

- [x] **Step 3: Implement `OrdersPreview`**

Create `src/components/OrdersPreview.tsx`:

```tsx
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  PackageCheck,
  Wallet,
} from "lucide-react";

const highlights = [
  {
    icon: CalendarDays,
    title: "Ordini chiari",
    text: "Cliente anagrafica o rapido, sede, data evasione, ritiro o consegna.",
  },
  {
    icon: PackageCheck,
    title: "Produzione collegata",
    text: "Ricette, assemblaggi, lotti e piano di lavoro restano nello stesso flusso.",
  },
  {
    icon: Wallet,
    title: "Incassi sotto controllo",
    text: "Acconti, saldo, residuo cliente e report per seguire consegne e pagamenti.",
  },
];

export default function OrdersPreview() {
  return (
    <section id="ordini" className="py-20 bg-[#FAFBFE]" aria-labelledby="orders-preview-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-sm font-medium text-gray-600">Nuovo modulo</span>
            </div>

            <h2 id="orders-preview-heading" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ordini e piano di lavoro collegati a produzione, cassa e laboratorio
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-7">
              Gestisci ordini cliente, ritiri, consegne, acconti e report senza separare il lavoro del banco da quello del laboratorio.
            </p>

            <Link
              href="/ordini"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
            >
              Scopri il modulo ordini
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {highlights.map((item) => (
              <article key={item.title} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-xl p-3 shrink-0">
                    <item.icon className="text-primary" size={21} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [x] **Step 4: Insert `OrdersPreview` in the homepage**

Modify `src/app/page.tsx`:

```tsx
import OrdersPreview from "@/components/OrdersPreview";
```

Render it after `Features` and before `Warehouse`:

```tsx
        <Hero />
        <Features />
        <OrdersPreview />
        <Warehouse />
```

- [x] **Step 5: Add `Ordini` to `Navbar`**

Modify the `navLinks` array in `src/components/Navbar.tsx`:

```tsx
const navLinks = [
  { href: "/#funzionalita", label: "Funzionalità" },
  { href: "/ordini", label: "Ordini" },
  { href: "/pricing", label: "Prezzi" },
  { href: "/#perche-labmanager", label: "Perché LabManager" },
  { href: "/#piattaforme", label: "Piattaforme" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contatti", label: "Contatti" },
];
```

- [x] **Step 6: Add `Ordini` to `Footer`**

Modify the `Prodotto` links in `src/components/Footer.tsx`:

```tsx
  {
    title: "Prodotto",
    links: [
      { label: "Funzionalità", href: "/#funzionalita" },
      { label: "Ordini", href: "/ordini" },
      { label: "Piattaforme", href: "/#piattaforme" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
```

- [x] **Step 7: Run the preview/navigation test**

Run:

```powershell
npx vitest run src/components/orders-preview-navigation.test.tsx
```

Expected: PASS.

- [x] **Step 8: Commit homepage and navigation changes**

```powershell
git add -- src/components/OrdersPreview.tsx src/components/orders-preview-navigation.test.tsx src/app/page.tsx src/components/Navbar.tsx src/components/Footer.tsx
git commit -m "feat: promote orders module on homepage"
```

Expected: commit succeeds.

---

### Task 4: Implement SEO Plumbing

**Files:**
- Create: `src/app/orders-seo.test.ts`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/layout.tsx`
- Modify: `public/llms.txt`

- [x] **Step 1: Create SEO contract tests**

Create `src/app/orders-seo.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { structuredDataGraph } from "@/app/layout";
import sitemap from "@/app/sitemap";

type JsonLdNode = {
  "@id"?: string;
  "@type"?: string;
  dateModified?: string;
  featureList?: string[];
  releaseNotes?: string;
  softwareVersion?: string;
};

describe("orders SEO plumbing", () => {
  it("adds the orders page to the sitemap", () => {
    const entries = sitemap();
    const ordersEntry = entries.find(
      (entry) => entry.url === "https://pastrylabmanager.com/ordini",
    );

    expect(ordersEntry).toMatchObject({
      url: "https://pastrylabmanager.com/ordini",
      changeFrequency: "monthly",
      priority: 0.85,
    });
  });

  it("updates global SoftwareApplication structured data for version 0.0.9", () => {
    const softwareApplication = structuredDataGraph["@graph"].find(
      (node): node is JsonLdNode => node["@type"] === "SoftwareApplication",
    );

    expect(softwareApplication).toMatchObject({
      "@id": "https://pastrylabmanager.com/#softwareapplication",
      softwareVersion: "0.0.9",
      dateModified: "2026-06-04",
    });
    expect(softwareApplication?.releaseNotes).toContain(
      "Ordini e Piano di Lavoro",
    );
    expect(softwareApplication?.featureList).toEqual(
      expect.arrayContaining([
        "Gestione ordini cliente con ritiro, consegna, acconti e saldo",
        "Ordini interni tra sedi e piano di lavoro del laboratorio",
        "Produzione collegata a ricette, assemblaggi e lotti",
        "Report Ordini con export Excel e PDF",
        "Notifiche ordini su Android e Windows",
      ]),
    );
  });

  it("documents the orders page in llms.txt", () => {
    const llms = readFileSync(join(process.cwd(), "public", "llms.txt"), "utf8");

    expect(llms).toContain(
      "[Ordini](https://pastrylabmanager.com/ordini)",
    );
    expect(llms).toContain("Ordini e Piano di Lavoro");
    expect(llms).toContain(
      "Il modulo ordini gestisce ordini cliente e interni",
    );
  });
});
```

- [x] **Step 2: Run the SEO test and verify it fails**

Run:

```powershell
npx vitest run src/app/orders-seo.test.ts
```

Expected: FAIL because sitemap, structured data export, and `llms.txt` have not been updated.

- [x] **Step 3: Update sitemap**

Modify `src/app/sitemap.ts` and add this object after the home entry:

```ts
    {
      url: `${BASE_URL}/ordini`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
```

- [x] **Step 4: Export and update global structured data**

In `src/app/layout.tsx`, change:

```ts
const structuredDataGraph = {
```

to:

```ts
export const structuredDataGraph = {
```

Then update the `SoftwareApplication` object:

```ts
      releaseNotes:
        "Nuovo modulo Ordini e Piano di Lavoro con ordini cliente, ordini interni tra sedi, produzione collegata, acconti, residui, report ordini, export e notifiche operative.",
      dateModified: "2026-06-04",
      softwareVersion: "0.0.9",
```

Add these exact entries to `featureList`:

```ts
        "Gestione ordini cliente con ritiro, consegna, acconti e saldo",
        "Ordini interni tra sedi e piano di lavoro del laboratorio",
        "Produzione collegata a ricette, assemblaggi e lotti",
        "Report Ordini con export Excel e PDF",
        "Notifiche ordini su Android e Windows",
```

- [x] **Step 5: Update `llms.txt`**

Modify `public/llms.txt`:

Under `## Informazioni Principali`, add:

```markdown
- [Ordini](https://pastrylabmanager.com/ordini): Pagina dedicata al modulo Ordini e Piano di Lavoro per ordini cliente, ordini interni, produzione collegata, acconti, residui, report ed export.
```

In `## Funzionalità Chiave`, update the paragraph to include:

```markdown
Ordini e Piano di Lavoro
```

Add this sentence after the feature paragraph:

```markdown
Il modulo ordini gestisce ordini cliente e interni, data evasione, ritiro/consegna, righe prodotto, produzione collegata, acconti, residui, report ed export.
```

- [x] **Step 6: Run SEO tests**

Run:

```powershell
npx vitest run src/app/orders-seo.test.ts
```

Expected: PASS.

- [x] **Step 7: Commit SEO plumbing**

```powershell
git add -- src/app/orders-seo.test.ts src/app/sitemap.ts src/app/layout.tsx public/llms.txt
git commit -m "feat: add orders page SEO plumbing"
```

Expected: commit succeeds.

---

### Task 5: Full Verification

**Files:**
- Verify all changed files.

- [ ] **Step 1: Run all targeted Vitest tests**

Run:

```powershell
npx vitest run src/app/ordini/page.test.tsx src/components/orders-preview-navigation.test.tsx src/app/orders-seo.test.ts src/app/billing/status-pages.test.tsx
```

Expected: all tests PASS.

- [ ] **Step 2: Run lint**

Run:

```powershell
npm run lint
```

Expected: no ESLint errors.

- [ ] **Step 3: Run production build**

Run:

```powershell
npm run build
```

Expected: build completes successfully and includes `/ordini` in the route output.

- [ ] **Step 4: Start the dev server**

Run:

```powershell
npm run dev
```

Expected: Next.js starts on `http://localhost:3000`. If port 3000 is already in use, use the port printed by Next.js.

- [ ] **Step 5: Browser verify homepage**

Open `http://localhost:3000` in Browser and verify:

- The homepage renders without runtime errors.
- The new compact "Nuovo modulo" orders section appears after Funzionalità and before Magazzino.
- The "Scopri il modulo ordini" link navigates to `/ordini`.
- Desktop and mobile widths show no overlapping text.

- [ ] **Step 6: Browser verify orders page**

Open `http://localhost:3000/ordini` in Browser and verify:

- H1 is visible above the fold.
- CTA links work: `/#contatti`, `#flusso-ordine`.
- No "Scarica LabManager" CTA or `/download` link is present on `/ordini`.
- Sections are readable on desktop and mobile.
- FAQ content is visible.
- No text overlaps, no generic multi-device screenshot is visible, and the page has no console runtime error.

- [ ] **Step 7: Commit final verification note if any docs changed**

If verification reveals a needed documentation correction, update the relevant doc and commit it:

```powershell
git add -- docs/superpowers/plans/2026-06-12-modulo-ordini-website.md docs/superpowers/specs/2026-06-12-modulo-ordini-homepage-design.md
git commit -m "docs: align orders implementation notes"
```

Expected: run only when a documentation correction was made during verification.

---

## Self-Review

- Spec coverage: the plan covers `/ordini`, homepage preview, navbar/footer links, page metadata, sitemap, JSON-LD, `llms.txt`, FAQ extractability, and verification.
- Scope: one website feature across page, navigation, and SEO assets. No separate subsystem split is needed.
- Dirty worktree handling: `CLAUDE.md` is explicitly excluded from feature commits.
- Test coverage: page rendering, metadata, JSON-LD, sitemap, `llms.txt`, preview, navigation, and existing billing navigation smoke tests.
- Risk: the orders page uses a static work-plan summary panel instead of an order-specific product screenshot. The page copy must not imply fiscal accounting features.
