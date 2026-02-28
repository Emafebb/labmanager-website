# Changelog Page Design — `/aggiornamenti`

> **Stato:** Approvato | **Data:** 2026-02-28

---

## Obiettivo

Creare la pagina pubblica `pastrylabmanager.com/aggiornamenti` con la lista delle versioni rilasciate di LabManager, accessibile tramite link diretto (non indicizzata dai motori di ricerca).

---

## Decisioni prese

| Decisione | Scelta |
|-----------|--------|
| Fonte dati | Hard-coded in `src/data/changelog.ts` in questo repo |
| Layout Android/Windows | Pagina unica con badge per piattaforma |
| Stile lista versioni | Timeline verticale |
| Indicizzazione SEO | `robots: index: false, follow: false` |

---

## Struttura dati

File: `src/data/changelog.ts`

```ts
export type Platform = "android" | "windows";

export interface ChangelogSection {
  title: string;
  items: string[];
}

export interface ChangelogEntry {
  version: string;
  date: string; // ISO format: "YYYY-MM-DD"
  platforms: Platform[];
  sections: ChangelogSection[];
}

export const changelog: ChangelogEntry[] = [
  // versioni in ordine cronologico inverso (più recente prima)
];
```

Per aggiungere una nuova release: aggiungere un oggetto in cima all'array e fare deploy.

---

## Struttura pagina

### File creati

- `src/data/changelog.ts` — dati delle versioni
- `src/app/aggiornamenti/page.tsx` — pagina principale

### Layout

Identico a `src/app/download/page.tsx`:
- Navbar fissa in alto: logo LabManager + link "Torna al sito" (ArrowLeft)
- `<main className="pt-20">` per il contenuto

### Sezioni della pagina

**Header**
- Titolo: "Aggiornamenti"
- Sottotitolo: "Tutte le versioni rilasciate di LabManager"

**Timeline verticale**
- Linea verticale color `--primary` a sinistra
- Per ogni versione:
  - Cerchio `--primary` sulla linea (nodo)
  - Numero versione grande (`v0.0.4`) + data in grigio
  - Badge piattaforme: verde Android, blu Windows (piccoli, inline)
  - Sezioni con titolo bold (es. "Novità", "Correzioni") e bullet list

### Badge piattaforme

- Android: sfondo verde chiaro, testo verde scuro
- Windows: sfondo blu chiaro, testo blu scuro
- Bordo arrotondato, testo piccolo (`text-xs`)

---

## Metadata

```ts
export const metadata: Metadata = {
  title: "Aggiornamenti - LabManager",
  description: "Cronologia degli aggiornamenti di LabManager.",
  robots: {
    index: false,
    follow: false,
  },
};
```

---

## Note implementative

- Componente Server (no `"use client"`) — dati statici, nessuna interattività
- Stile coerente con il resto del sito: font DM Sans, colori da `globals.css`, `rounded-3xl`, `shadow-xl`
- Mobile-first con responsive Tailwind (`sm:`, `lg:`)
