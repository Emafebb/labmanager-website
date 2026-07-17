---
type: Work Item
title: Installare Google Tag Manager rispettando il consenso
parent: ../spec.md
---

# Google Tag Manager Installation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Installare il container `GTM-TCZR8HQP` nelle pagine coperte da LegalBlink, mantenendo `/instagram` esclusa.

**Architecture:** Estendere `SiteScripts` perché carichi il codice ufficiale di Google Tag Manager soltanto quando il banner LegalBlink è pronto. Rendere anche la parte `noscript`, mantenere l'esclusione già esistente di `/instagram` e autorizzare in modo mirato i domini Google nella configurazione di sicurezza centralizzata.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, `next/script`, Vitest, Testing Library.

## Global Constraints

- Usare esclusivamente il container `GTM-TCZR8HQP`.
- Non caricare Google Tag Manager su `/instagram`.
- Caricare LegalBlink prima di Google Tag Manager.
- Non aggiungere dipendenze.
- Non configurare Google Analytics, pubblicità, conversioni o altri tag.
- Non pubblicare il sito o il container.

---

## What to build

Integrare entrambe le parti del codice Google Tag Manager nel componente che gestisce gli strumenti esterni. Il caricamento principale deve iniziare solo dopo LegalBlink; la parte per i browser senza JavaScript deve usare lo stesso identificativo. Aggiornare le regole di sicurezza necessarie e proteggere il comportamento con test automatici.

## Required context

- `src/components/SiteScripts.tsx` gestisce già LegalBlink, TabNav e l'esclusione di `/instagram`.
- `src/app/layout.tsx` rende `SiteScripts` per tutto il sito.
- `next.config.ts` contiene l'unica configurazione delle regole di sicurezza.
- Google richiede `www.googletagmanager.com` per script, immagini, connessioni e iframe; `img-src` consente già tutte le immagini HTTPS.

## Acceptance criteria

- [x] Le pagine normali includono il container `GTM-TCZR8HQP`.
- [x] Il caricamento principale parte solo dopo che LegalBlink è pronto.
- [x] La parte `noscript` usa `https://www.googletagmanager.com/ns.html?id=GTM-TCZR8HQP`.
- [x] `/instagram` non rende alcuna parte di Google Tag Manager.
- [x] La configurazione di sicurezza consente gli endpoint minimi richiesti.
- [x] Test, lint, build Next e build OpenNext terminano correttamente.
- [x] Nessun deploy e nessuna modifica nel pannello Google vengono eseguiti.

## Covers

- Requirements: 1-6
- Testing Strategy: 1-4
- Interview Ledger: L1-L2

## Blocked by

None - ready to start

---

### Task 1: Installazione del container e contratti automatici

**Files:**
- Create: `src/components/SiteScripts.test.tsx`
- Modify: `src/components/SiteScripts.tsx:3-109`
- Modify: `src/app/layout.tsx:131-140`
- Modify: `next.config.ts:18-31`

**Interfaces:**
- Consumes: `usePathname(): string` per mantenere l'esclusione di `/instagram`; callback `onReady` di `next/script` per attendere LegalBlink.
- Produces: script con `id="google-tag-manager"`, iframe `title="Google Tag Manager"` e regole CSP per `https://www.googletagmanager.com`.

- [x] **Step 1: Scrivere i test che descrivono l'installazione**

Creare `src/components/SiteScripts.test.tsx`:

```tsx
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SiteScripts from "./SiteScripts";

const route = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => route.pathname,
}));

vi.mock("next/script", () => ({
  default: ({
    children,
    onReady,
    strategy,
    ...props
  }: React.ScriptHTMLAttributes<HTMLScriptElement> & {
    onReady?: () => void;
    strategy?: string;
  }) => (
    <script {...props} data-strategy={strategy} onLoad={onReady}>
      {children}
    </script>
  ),
}));

describe("SiteScripts Google Tag Manager", () => {
  beforeEach(() => {
    route.pathname = "/";
  });

  it("loads GTM only after LegalBlink is ready and renders the noscript fallback", async () => {
    const { container } = render(<SiteScripts />);
    const legalBlink = container.querySelector("#legalblink-cmp");

    expect(legalBlink).not.toBeNull();
    expect(container.querySelector("#google-tag-manager")).toBeNull();
    expect(container.innerHTML).toContain(
      "https://www.googletagmanager.com/ns.html?id=GTM-TCZR8HQP",
    );

    fireEvent.load(legalBlink as HTMLScriptElement);

    await waitFor(() => {
      expect(container.querySelector("#google-tag-manager")).not.toBeNull();
    });

    const tagManager = container.querySelector("#google-tag-manager");
    expect(tagManager?.textContent).toContain("GTM-TCZR8HQP");
    expect(tagManager?.textContent).toContain(
      "https://www.googletagmanager.com/gtm.js",
    );
  });

  it("keeps the standalone Instagram route free of GTM", () => {
    route.pathname = "/instagram";

    const { container } = render(<SiteScripts />);

    expect(container).toBeEmptyDOMElement();
  });

  it("allows the minimum GTM endpoints in the site security policy", () => {
    const config = readFileSync(join(process.cwd(), "next.config.ts"), "utf8");

    expect(config).toMatch(
      /script-src[^\n]*https:\/\/www\.googletagmanager\.com/,
    );
    expect(config).toMatch(
      /connect-src[^\n]*https:\/\/www\.googletagmanager\.com[^\n]*https:\/\/www\.google\.com/,
    );
    expect(config).toMatch(
      /frame-src[^\n]*https:\/\/www\.googletagmanager\.com/,
    );
  });
});
```

- [x] **Step 2: Eseguire il test e verificare che fallisca per la funzione mancante**

Run:

```bash
npx vitest run src/components/SiteScripts.test.tsx
```

Expected: FAIL nei controlli sul container e sulla configurazione di sicurezza perché GTM non è ancora presente; il controllo di `/instagram` passa.

- [x] **Step 3: Aggiungere il caricamento Google Tag Manager dopo LegalBlink**

In `src/components/SiteScripts.tsx`, importare lo stato React, definire una sola costante per l'ID e aggiungere il codice ufficiale:

```tsx
import { useState } from "react";

const GOOGLE_TAG_MANAGER_ID = "GTM-TCZR8HQP";

const GOOGLE_TAG_MANAGER_SCRIPT = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GOOGLE_TAG_MANAGER_ID}');
`;
```

All'inizio di `SiteScripts`, creare lo stato prima dell'esclusione della route:

```tsx
const pathname = usePathname();
const [canLoadTagManager, setCanLoadTagManager] = useState(false);
if (STANDALONE_ROUTES.includes(pathname)) return null;
```

Sul componente LegalBlink aggiungere:

```tsx
onReady={() => setCanLoadTagManager(true)}
```

Subito dopo LegalBlink rendere il caricamento principale e la parte `noscript`:

```tsx
{canLoadTagManager && (
  <Script id="google-tag-manager" strategy="afterInteractive">
    {GOOGLE_TAG_MANAGER_SCRIPT}
  </Script>
)}
<noscript>
  <iframe
    src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_ID}`}
    height="0"
    width="0"
    style={{ display: "none", visibility: "hidden" }}
    title="Google Tag Manager"
  />
</noscript>
```

- [x] **Step 4: Posizionare gli script del sito all'inizio del body**

In `src/app/layout.tsx`, spostare `SiteScripts` prima dei dati strutturati e dei contenuti:

```tsx
<body className="font-sans antialiased">
  <SiteScripts />
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(structuredDataGraph),
    }}
  />
  {children}
  <CloudflareWebAnalytics />
</body>
```

- [x] **Step 5: Consentire gli endpoint minimi nella configurazione di sicurezza**

In `next.config.ts`, aggiornare soltanto queste direttive:

```ts
"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.legalblink.it https://static.cloudflareinsights.com https://widget.tabnav.com https://www.googletagmanager.com",
"connect-src 'self' https://cloudflareinsights.com https://app.legalblink.it https://tabnav.com https://*.tabnav.com https://www.googletagmanager.com https://www.google.com",
"frame-src 'self' https://app.legalblink.it https://tabnav.com https://*.tabnav.com https://www.googletagmanager.com",
```

- [x] **Step 6: Eseguire il test mirato e verificare che passi**

Run:

```bash
npx vitest run src/components/SiteScripts.test.tsx
```

Expected: 3 test passed.

- [x] **Step 7: Eseguire tutti i controlli locali**

Run:

```bash
npx vitest run
npm run lint
npm run build
npx opennextjs-cloudflare build
```

Expected: tutti i comandi terminano con exit code 0, senza test falliti o errori di compilazione.

- [x] **Step 8: Controllare la modifica e creare il commit**

Run:

```bash
git diff --check
git status --short
git diff -- src/components/SiteScripts.tsx src/components/SiteScripts.test.tsx src/app/layout.tsx next.config.ts
git add src/components/SiteScripts.tsx src/components/SiteScripts.test.tsx src/app/layout.tsx next.config.ts ai_specs/0003-google-tag-manager-installation/work-items/01-installare-google-tag-manager.md
git commit -m "feat: install Google Tag Manager"
```

Expected: il diff contiene soltanto l'installazione GTM, i relativi test e il Work Item; il commit termina correttamente.
