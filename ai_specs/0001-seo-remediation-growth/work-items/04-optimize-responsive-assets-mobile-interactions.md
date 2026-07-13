---
type: Work Item
title: Ottimizzare asset responsive e interazioni mobili
parent: ../spec.md
---

## What to build
Generare e versionare varianti statiche AVIF/WebP per hero e newsletter, implementare la selezione responsive e il preload esclusivo della hero per breakpoint, inventariare senza alterare gli script terzi e applicare una utility condivisa che garantisca touch target mobili di almeno 44 × 44 px.

## Required context
- `next.config.ts` usa `images.unoptimized: true`; questa fase non introduce provider o CDN immagini esterni.
- LegalBlink, widget di accessibilità, Cloudflare Web Analytics e altri script terzi devono essere misurati e inventariati, ma non rimossi, ritardati o subordinati a consenso/interazione in questa fase.
- Il comportamento del banner cookie negli stati iniziale, aperto e chiuso deve restare invariato.

## Acceptance criteria
- [x] Asset hero e newsletter hanno varianti statiche responsive AVIF/WebP generate, versionate nel repository e usate come default dal markup.
- [x] La hero usa `<picture>` con `source media`; `sizes` è corretto ma non è usato come sostituto della selezione per breakpoint.
- [x] Fino a 639 px l'immagine Android è l'unico candidato LCP e l'unico asset hero precaricato.
- [x] Da 640 px in su l'immagine desktop è l'unico candidato LCP e l'unico asset hero precaricato.
- [x] La variante tablet resta decorativa e non viene precaricata.
- [x] Un controllo browser/network a 390 px e 640 px dimostra, con cache controllata, che viene richiesto e precaricato soltanto l'asset hero previsto per ciascun viewport.
- [x] Il costo e la strategia di caricamento correnti di LegalBlink, widget di accessibilità, analytics e altri script terzi sono inventariati con ambiente/data, URL o sorgente, fase di caricamento e costo osservato.
- [x] Nessuno strumento di consenso, accessibilità o analytics cambia timing, disponibilità o condizioni di caricamento; il comportamento del cookie banner resta invariato nei suoi stati esistenti.
- [x] Una classe o utility condivisa e verificabile garantisce un'area interattiva minima di 44 × 44 px ed è applicata almeno a menu mobile, CTA, pulsanti FAQ e controlli di consenso presenti.
- [x] Test di rendering/accessibilità coprono `<picture>`, sorgenti responsive e utility touch; un controllo browser misura le aree interattive previste.
- [x] `npx vitest run`, `npm run lint` e `npm run build` passano.

## Covers
- User Stories: 3
- Requirements: 5-8
- Testing Strategy: 4-5
- Interview Ledger: L5, L7, L9, L13

## Blocked by
None - ready to start

## Implementation evidence

### Asset e browser

- Sono versionate 16 derivate AVIF/WebP: Android `360/720`, desktop `720/1440`, tablet `240/480` e newsletter `640/1280`.
- Controllo produzione del 13 luglio 2026, 14:10 CEST, sessioni browser nuove e query di cache-bust:

| Viewport | Candidato LCP richiesto | Preload che soddisfa la media query | Altre richieste hero |
| --- | --- | --- | --- |
| `390 × 844` | `hero-android-360.avif` (`6.441` byte) | solo `(max-width: 639px)` | nessuna |
| `640 × 900` | `hero-desktop-720.avif` (`5.436` byte) | solo `(min-width: 640px)` | `hero-tablet-240.avif` decorativa, iniziata da `img`, non da preload |

Non sono stati rilevati errori console o overlay. A 390 px il menu misura `44 × 44`, le CTA almeno `342 × 52`, i controlli consenso almeno `215 × 46` e i pulsanti FAQ almeno `340 × 72` px.

### Inventario script terzi

Misura del 13 luglio 2026 in produzione. Le durate provengono da Resource Timing; i byte sono un probe `curl --compressed` perché le risorse cross-origin non espongono la dimensione al browser.

| Strumento / sorgente | Strategia invariata | Costo osservato |
| --- | --- | --- |
| LegalBlink `https://app.legalblink.it/api/scripts/cmp/loader.js` | `afterInteractive` | `63 ms`, `3.466` byte |
| LegalBlink `.../cmp/v1.0.2/banner.js` | avviato dal loader | `120 ms`, `238.453` byte |
| LegalBlink config + soluzione API | fetch del loader | `25/28 ms`, `39/2.811` byte |
| TabNav `https://widget.tabnav.com/limited-widget.min.js.gz` | `lazyOnload` | `74 ms`, `18.162` byte |
| Cloudflare `https://static.cloudflareinsights.com/beacon.min.js` | condizionale al token, `defer` | non emesso nell'ambiente live corrente; probe `11.364` byte |
| Tema touch per widget esterni | inline `afterInteractive` | nessuna richiesta di rete |

Le strategie e le condizioni dei tre fornitori non sono state modificate. Il banner LegalBlink è stato verificato negli stati iniziale, impostazioni aperte e chiuso: controlli presenti, pannello impostazioni funzionante e rettangolo `0 × 0` dopo la chiusura, come previsto.

I test `src/components/responsive-mobile-contracts.test.tsx` coprono file versionati, `<picture>`, media query, preload, newsletter e utility touch. Verifica finale: `npx vitest run` (`53` test), `npm run lint` e `npm run build` passati.
