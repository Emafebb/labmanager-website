# Design Spec: Pagina Link-in-Bio `/links`

**Data:** 2026-05-11
**Stato:** Approvato

## Obiettivo

Creare una pagina `pastrylabmanager.com/links` da inserire nel profilo Instagram di LabManager. Sostituisce servizi terzi come Linktree ospitando i link direttamente sul dominio del brand.

## URL e File

- **Route:** `/links`
- **File:** `src/app/links/page.tsx`
- **Tipo:** Pagina statica Next.js App Router, nessun `"use client"`

## Layout

Pagina autonoma senza Navbar e Footer del sito principale. Occupa tutta l'altezza dello schermo (`min-h-dvh`). Centrata sia verticalmente che orizzontalmente. Larghezza massima 400px con padding laterale 24px.

## Stile Visivo

- **Sfondo:** gradient verticale viola — `from-[#4403af] to-[#3a0390]`
- **Bottoni:** `bg-white/15`, bordo `border border-white/30`, testo bianco — hover `bg-white/25`
- **Forma bottoni:** `rounded-2xl`, `py-4`, full-width, transizione hover `duration-200`
- **Font:** DM Sans (ereditato dal layout radice)

## Sezioni

### Header
- Logo: `<Image src="/images/logo.png">` 48×48px su sfondo viola arrotondato
- Nome: "LabManager" — testo bianco, bold, text-2xl
- Tagline: "Il gestionale completo per pasticceria, panificio e ristorante" — bianco, opacità 80%, text-sm, centrato

### Link (in ordine)

| # | Etichetta | Destinazione |
|---|-----------|-------------|
| 1 | 🌐 Scopri LabManager | `https://pastrylabmanager.com` |
| 2 | 💬 Scrivici su WhatsApp | `https://wa.me/393500424228?text=Ciao!%20Vorrei%20informazioni%20su%20LabManager` |
| 3 | 💰 Prezzi e piani | `https://pastrylabmanager.com/pricing` |
| 4 | 📧 Newsletter | `https://pastrylabmanager.com/newsletter` |

Tutti i link aprono in `target="_blank" rel="noopener noreferrer"`.

### Footer
Riga `© 2026 LabManager` — testo bianco, opacità 40%, text-xs, centrato.

## Metadata

```ts
export const metadata: Metadata = {
  title: "LabManager | Links",
  description: "Tutti i link di LabManager — il gestionale completo per pasticceria, panificio e ristorante.",
  robots: { index: false }, // pagina utilitaria, non indicizzare
};
```

## Cosa NON include

- Navbar e Footer del sito principale
- Sezione download
- Privacy policy
- Form o raccolta dati
- Analytics specifici (Vercel Analytics già attivo globalmente)

## Guida Instagram (post-implementazione)

1. Aprire il profilo Instagram di LabManager
2. Toccare **Modifica profilo**
3. Nel campo **Sito web** inserire: `https://pastrylabmanager.com/links`
4. Salvare
