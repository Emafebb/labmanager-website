# Link-in-Bio Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Creare `src/app/links/page.tsx` — pagina link-in-bio per Instagram su sfondo gradient viola con logo, tagline e 4 bottoni link.

**Architecture:** Pagina Next.js statica (App Router), nessun `"use client"`. Non eredita Navbar né Footer (come in `page.tsx`, questi sono importati esplicitamente, qui non si importano). Un solo file da creare.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS 4, `next/image`

---

### Task 1: Creare la pagina `/links`

**Files:**
- Create: `src/app/instagram/page.tsx`

- [ ] **Step 1: Creare il file `src/app/links/page.tsx`** con il seguente contenuto:

```tsx
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "LabManager | Links",
  description:
    "Tutti i link di LabManager — il gestionale completo per pasticceria, panificio e ristorante.",
  robots: { index: false },
};

const LINKS = [
  {
    label: "Scopri LabManager",
    emoji: "🌐",
    href: "https://labmanagergestionale.com",
  },
  {
    label: "Scrivici su WhatsApp",
    emoji: "💬",
    href: "https://wa.me/393500424228?text=Ciao!%20Vorrei%20informazioni%20su%20LabManager",
  },
  {
    label: "Prezzi e piani",
    emoji: "💰",
    href: "https://labmanagergestionale.com/pricing",
  },
  {
    label: "Newsletter",
    emoji: "📧",
    href: "https://labmanagergestionale.com/newsletter",
  },
];

export default function LinksPage() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-[#4403af] to-[#3a0390]">
      <div className="w-full max-w-[400px] flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="LabManager logo"
              width={40}
              height={40}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">LabManager</h1>
            <p className="text-sm text-white/80 mt-1">
              Il gestionale completo per pasticceria, panificio e ristorante
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-white/15 border border-white/30 text-white font-semibold text-base hover:bg-white/25 transition-colors duration-200"
            >
              <span aria-hidden="true">{link.emoji}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        <p className="text-xs text-white/40">© 2026 LabManager</p>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Avviare il dev server e verificare la pagina**

```bash
npm run dev
```

Aprire `http://localhost:3000/instagram` e verificare:
- Sfondo gradient viola visibile a schermo intero
- Logo + nome "LabManager" + tagline centrati in cima
- 4 bottoni visibili, ben spaziati, testo bianco
- Hover sui bottoni: sfondo leggermente più chiaro
- Nessuna Navbar né Footer del sito principale
- Layout corretto su viewport mobile (simula con DevTools, 390px larghezza)

- [ ] **Step 3: Commit**

```bash
git add src/app/instagram/page.tsx
git commit -m "feat(instagram): add link-in-bio page for Instagram"
```

---

### Task 2: Push e guida Instagram

- [ ] **Step 1: Push su GitHub (triggera deploy Vercel)**

```bash
git push origin master
```

Attendere che Vercel completi il deploy (1-2 minuti). Verificare che `https://labmanagergestionale.com/links` sia raggiungibile.

- [ ] **Step 2: Inserire il link su Instagram**

1. Aprire il profilo Instagram di LabManager
2. Toccare **Modifica profilo**
3. Nel campo **Sito web** inserire: `https://labmanagergestionale.com/instagram`
4. Toccare **Fine** / **Salva**

Il link sarà visibile nel profilo come "labmanagergestionale.com/links" e porterà alla pagina appena creata.
