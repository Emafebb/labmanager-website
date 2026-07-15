# Cloudflare Runbook Quick Start Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rendere l'apertura del runbook immediatamente utilizzabile con un percorso guidato dall'installazione al deploy, lasciando i dettagli tecnici nelle sezioni successive.

**Architecture:** La sezione esistente `## Comandi rapidi` diventa una procedura numerata con nove passaggi e spiegazioni brevi. Tutte le altre sezioni del runbook restano invariate e continuano a fornire gli approfondimenti tecnici.

**Tech Stack:** Markdown, npm, Vitest, ESLint, Next.js, OpenNext Cloudflare e Wrangler.

## Global Constraints

- Modificare esclusivamente `docs/CLOUDFLARE_RUNBOOK.md`.
- Non eseguire `npm run deploy`, `wrangler deploy`, rollback, comandi sui secrets o altre mutazioni remote.
- Non leggere o riportare valori da `.env.local`, `.dev.vars` o secrets remoti.
- Il Worker gestito rimane esclusivamente `labmanager-website`.
- Conservare tutte le sezioni tecniche successive senza ridurne il contenuto.
- Separare visivamente il deploy di produzione dai comandi locali e dichiarare che pubblica immediatamente il sito.

---

### Task 1: Trasformare i comandi rapidi in un percorso dall'installazione al deploy

**Files:**
- Modify: `docs/CLOUDFLARE_RUNBOOK.md`

**Interfaces:**
- Consumes: gli script npm esistenti `dev`, `build`, `preview`, `deploy` e `lint`; Wrangler configurato per `labmanager-website`.
- Produces: una sezione iniziale autonoma che guida l'operatore fino al deploy e rimanda implicitamente alle sezioni tecniche sottostanti.

- [ ] **Step 1: Sostituire soltanto la sezione `## Comandi rapidi`**

Sostituire il titolo e il testo della sezione, fino a `## Prerequisiti e autenticazione`, con:

````markdown
## Comandi rapidi: dall'installazione al deploy

Questa è la procedura essenziale da seguire in ordine. Esegui ogni comando dalla cartella principale del progetto. I dettagli e la risoluzione dei problemi sono spiegati nelle sezioni successive.

### 1. Installa il progetto

Da eseguire la prima volta o quando cambiano le dipendenze:

```bash
npm install
```

### 2. Avvia il sito per lavorare

```bash
npm run dev
```

Apri http://localhost:3000. Quando hai terminato, interrompi il server con `Ctrl-C`.

### 3. Esegui i test

```bash
npx vitest run
```

Continua soltanto se tutti i test passano.

### 4. Controlla il codice

```bash
npm run lint
```

Continua soltanto se il controllo termina senza errori.

### 5. Crea la build

```bash
npm run build
```

Questo verifica che il sito possa essere compilato per la produzione.

### 6. Controlla la versione Cloudflare in locale

```bash
npm run preview
```

Apri http://localhost:8787 e controlla il sito. Quando hai terminato, interrompi la preview con `Ctrl-C`.

### 7. Simula il deploy senza pubblicare

```bash
npx wrangler deploy --dry-run --outdir /tmp/labmanager-worker-bundle
```

Questo controllo prepara il bundle ma non modifica il sito online.

### 8. Controlla l'account Cloudflare

```bash
npx wrangler whoami
```

Verifica di essere nell'account corretto e che il Worker sia `labmanager-website`.

### 9. Pubblica il sito

> **ATTENZIONE — PRODUZIONE:** il comando seguente pubblica immediatamente la nuova versione del sito. Eseguilo soltanto dopo tutti i controlli precedenti e dopo l'approvazione richiesta.

```bash
npm run deploy
```

Dopo la pubblicazione, esegui lo smoke test descritto più avanti in questa guida.
````

Non trasformare i nove passaggi in un unico blocco copiabile: `npm run dev` e `npm run preview` sono processi interattivi, mentre il deploy deve richiedere un'azione consapevole.

- [ ] **Step 2: Verificare la progressione e l'assenza di modifiche tecniche**

Run:

```bash
rg -n '^## Comandi rapidi: dall.installazione al deploy$|^### [1-9]\.' docs/CLOUDFLARE_RUNBOOK.md
rg -n 'npm install|npm run dev|npx vitest run|npm run lint|npm run build|npm run preview|wrangler deploy --dry-run|wrangler whoami|npm run deploy' docs/CLOUDFLARE_RUNBOOK.md
git diff --check
git diff -- docs/CLOUDFLARE_RUNBOOK.md
```

Expected:

- Sono presenti esattamente nove passaggi numerati, nell'ordine approvato.
- Il deploy è separato visivamente e marcato come operazione di produzione.
- Il diff modifica soltanto la sezione iniziale dei comandi rapidi.
- Le sezioni da `## Prerequisiti e autenticazione` in poi non cambiano.
- `git diff --check` termina con exit code 0.

- [ ] **Step 3: Commit della revisione**

```bash
git add docs/CLOUDFLARE_RUNBOOK.md
git commit -m "docs(cloudflare): simplify runbook quick start"
```
