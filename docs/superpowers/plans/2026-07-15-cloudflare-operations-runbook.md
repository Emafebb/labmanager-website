# Cloudflare Operations Runbook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Creare un runbook operativo Cloudflare completo per LabManager, collegarlo dal README e verificare separatamente il riallineamento del Browser visuale.

**Architecture:** `docs/CLOUDFLARE_RUNBOOK.md` sarà la sorgente dettagliata per sviluppo, preview, deploy, osservabilità e rollback; `README.md` conserverà soltanto l'avvio rapido e un link al runbook. La diagnosi Browser rimarrà una verifica dell'ambiente Codex/ChatGPT e non introdurrà modifiche nel repository o workaround sulla cache del plugin.

**Tech Stack:** Next.js 16.2.10, `@opennextjs/cloudflare` 1.20.1, Wrangler 4.110.0, Cloudflare Workers, Markdown e shell POSIX/zsh.

## Global Constraints

- L'unico Worker gestito da questo repository è `labmanager-website`.
- I Worker `labmanager` e `labmanager-downloads` e il progetto Pages `labmanager-web` sono fuori scope e non devono essere modificati.
- Non eseguire `npm run deploy`, `opennextjs-cloudflare deploy`, `wrangler deploy`, `wrangler rollback`, `wrangler secret put/delete` o altre mutazioni remote durante l'implementazione del runbook.
- Non leggere, stampare, committare o copiare i valori presenti in `.env.local`, `.dev.vars` o nei secrets remoti.
- Il deploy resta subordinato all'approvazione esplicita del committente quando richiesta dalla Spec attiva.
- Il rollback ripristina una versione del Worker, ma non annulla modifiche a Supabase, Resend, DNS, KV, R2, D1 o altri dati/servizi esterni.
- I comandi Wrangler devono essere verificati contro la versione locale e le fonti ufficiali correnti prima di essere documentati.
- Non modificare manualmente il client Browser, la cache dei plugin, gli hash attendibili o `~/.codex/config.toml` per aggirare il problema visuale.

---

### Task 1: Creare il runbook operativo Cloudflare

**Files:**
- Create: `docs/CLOUDFLARE_RUNBOOK.md`
- Reference: `package.json`
- Reference: `wrangler.jsonc`
- Reference: `open-next.config.ts`
- Reference: `ai_specs/0002-web-app-site-repositioning/spec.md`

**Interfaces:**
- Consumes: script npm esistenti `dev`, `build`, `preview`, `deploy`, `lint`; configurazione del Worker `labmanager-website`; variabili già elencate nel README.
- Produces: runbook autonomo con sezioni e comandi stabili che il README collegherà nella Task 2.

- [ ] **Step 1: Verificare in sola lettura le CLI installate**

Run:

```bash
npx wrangler --version
npx wrangler deploy --help
npx wrangler versions --help
npx wrangler rollback --help
npx wrangler tail --help
npx opennextjs-cloudflare --help
```

Expected:

- Wrangler stampa `4.110.0` o una versione successiva compatibile.
- L'help espone `deploy --dry-run`, `versions list`, `rollback` e `tail`.
- OpenNext espone almeno `build`, `preview`, `deploy` e `upload`.
- Nessun comando contatta o modifica il Worker remoto.

- [ ] **Step 2: Creare la struttura completa della guida**

Create `docs/CLOUDFLARE_RUNBOOK.md` con questi heading esatti:

```markdown
# Runbook Cloudflare — LabManager Website

## Scopo e risorse gestite
## Comandi rapidi
## Prerequisiti e autenticazione
## Variabili d'ambiente e secrets
## Sviluppo locale
## Preview nel runtime Cloudflare
## Checklist pre-deploy
## Deploy manuale
## Workers Builds
## Smoke test post-deploy
## Log e osservabilità
## Versioni e rollback
## Manutenzione periodica
## Troubleshooting
## Riferimenti ufficiali
```

La sezione “Scopo e risorse gestite” deve riportare:

```text
Worker gestito: labmanager-website
Dominio canonico: https://labmanagergestionale.com
Fuori scope: Worker labmanager, Worker labmanager-downloads, progetto Pages labmanager-web
```

- [ ] **Step 3: Documentare i flussi locali e le variabili senza valori sensibili**

Inserire nella guida i comandi esatti:

```bash
npm install
npm run dev
npm run preview
npm run lint
npx vitest run
npm run build
npx opennextjs-cloudflare build
npx wrangler deploy --dry-run --outdir /tmp/labmanager-worker-bundle
```

Spiegare che:

- `npm run dev` esegue Next.js in Node su `http://localhost:3000`.
- `npm run preview` ricostruisce e serve il Worker con workerd su `http://localhost:8787`.
- `.env.local` serve allo sviluppo/build Next locale; `.dev.vars` serve alla preview Workers locale; entrambi sono ignorati da Git.
- `NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` è build-time e pubblico per definizione.
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_AUDIENCE_ID`, `CONTACT_EMAIL`, `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` sono configurazioni runtime; le chiavi segrete non devono essere inserite in `wrangler.jsonc`.

Inserire soltanto i nomi, mai valori reali.

- [ ] **Step 4: Documentare il gate pre-deploy e il controllo visuale**

La checklist deve richiedere, nell'ordine:

```text
1. Worktree pulito o diff intenzionale revisionato.
2. npx vitest run.
3. npm run lint.
4. npm run build.
5. npx opennextjs-cloudflare build.
6. Verifica title HTML di /, /ordini e /pricing.
7. Preview workerd.
8. Controllo visuale desktop 1440×1000.
9. Controllo visuale mobile 390×844, menu incluso.
10. Verifica CTA, immagini, focus tastiera, overlay ed errori console.
11. Approvazione esplicita del committente quando prevista dalla Spec.
```

Il controllo visuale deve poter essere eseguito con il Browser integrato oppure manualmente; non deve dipendere dall'installazione della CLI opzionale `agent-browser`.

- [ ] **Step 5: Documentare deploy e Workers Builds con avvertenze esplicite**

Mostrare il deploy manuale come operazione di produzione:

```bash
npx wrangler whoami
npm run deploy
```

Anteporre un avviso evidente: `npm run deploy` esegue build OpenNext, inizializza la cache remota necessaria e pubblica immediatamente la nuova versione al 100% del traffico.

Per Workers Builds documentare:

```text
Production branch: master
Build command: npx @opennextjs/cloudflare build
Deploy command: npx @opennextjs/cloudflare deploy
```

Spiegare che `opennextjs-cloudflare upload` crea una versione senza servirla immediatamente ed è destinato a un flusso di promozione/rollout esplicito, non al deploy ordinario corrente.

- [ ] **Step 6: Documentare smoke test, log e rollback**

Lo smoke test deve includere richieste read-only a:

```text
https://labmanagergestionale.com/
https://labmanagergestionale.com/ordini
https://labmanagergestionale.com/pricing
https://labmanagergestionale.com/robots.txt
https://labmanagergestionale.com/llms.txt
https://labmanagergestionale.com/sitemap.xml
```

Per osservabilità e versioni inserire:

```bash
npx wrangler tail labmanager-website --status error
npx wrangler tail labmanager-website --format json
npx wrangler versions list
npx wrangler deployments list
```

Per il rollback documentare la sequenza operativa, non eseguirla:

```bash
npx wrangler versions list
npx wrangler rollback
```

La guida deve richiedere di verificare la versione stabile, annotare il motivo, ottenere l'autorizzazione, eseguire il rollback interattivo e ripetere integralmente lo smoke test. Deve inoltre avvertire che risorse e dati esterni non vengono ripristinati.

- [ ] **Step 7: Documentare manutenzione, limiti e troubleshooting**

Includere:

- revisione trimestrale della `compatibility_date` con build e preview dedicate;
- aggiornamenti dipendenze in una modifica separata dal deploy di contenuto;
- controllo del bundle compresso, con limite attuale di 3 MiB sul piano Workers Free e 10 MiB sul piano Paid, collegato alla documentazione ufficiale;
- verifica periodica di secrets, dominio, route, osservabilità e Worker corretto;
- troubleshooting per autenticazione Wrangler, secret mancante, bundle troppo grande, preview diversa da Next dev, form non funzionanti e rollback non disponibile.

Inserire i riferimenti ufficiali:

```text
https://opennext.js.org/cloudflare/howtos/dev-deploy
https://developers.cloudflare.com/workers/versions-and-deployments/
https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/
https://developers.cloudflare.com/workers/platform/limits/
```

- [ ] **Step 8: Verificare completezza e assenza di segreti**

Run:

```bash
test -f docs/CLOUDFLARE_RUNBOOK.md
rg -n '^## ' docs/CLOUDFLARE_RUNBOOK.md
rg -n 'labmanager-website|npm run preview|npm run deploy|wrangler tail|wrangler rollback|Smoke test' docs/CLOUDFLARE_RUNBOOK.md
git diff --check
git diff -- docs/CLOUDFLARE_RUNBOOK.md
```

Expected:

- Tutti i 15 heading previsti sono presenti una sola volta.
- Worker corretto, preview, deploy, log, rollback e smoke test sono documentati.
- Il diff non contiene valori provenienti da `.env.local` o `.dev.vars`.
- `git diff --check` termina con exit code 0.

- [ ] **Step 9: Commit del runbook**

```bash
git add docs/CLOUDFLARE_RUNBOOK.md
git commit -m "docs(cloudflare): add operations runbook"
```

---

### Task 2: Collegare il runbook dal README

**Files:**
- Modify: `README.md`
- Reference: `docs/CLOUDFLARE_RUNBOOK.md`

**Interfaces:**
- Consumes: il runbook creato nella Task 1.
- Produces: un README breve con percorso evidente verso la procedura completa.

- [ ] **Step 1: Verificare che il link non esista ancora**

Run:

```bash
rg -n '\[Runbook operativo Cloudflare\]\(docs/CLOUDFLARE_RUNBOOK\.md\)' README.md
```

Expected: exit code 1, perché il link non è ancora presente.

- [ ] **Step 2: Aggiungere il collegamento senza duplicare il runbook**

Subito dopo il paragrafo introduttivo del README inserire:

```markdown
Per preview nel runtime Workers, deploy, secrets, smoke test, log e rollback consulta il [Runbook operativo Cloudflare](docs/CLOUDFLARE_RUNBOOK.md).
```

Conservare i comandi rapidi già presenti. Ridurre soltanto eventuali spiegazioni che duplicano parola per parola il nuovo runbook; non rimuovere l'elenco delle variabili d'ambiente né le avvertenze sulle risorse Cloudflare fuori scope.

- [ ] **Step 3: Verificare il collegamento**

Run:

```bash
rg -n '\[Runbook operativo Cloudflare\]\(docs/CLOUDFLARE_RUNBOOK\.md\)' README.md
test -f docs/CLOUDFLARE_RUNBOOK.md
git diff --check
git diff -- README.md
```

Expected:

- Il link appare una sola volta.
- Il file destinazione esiste.
- Il diff del README contiene solo il collegamento e l'eventuale deduplicazione approvata.

- [ ] **Step 4: Commit del collegamento**

```bash
git add README.md
git commit -m "docs(readme): link Cloudflare runbook"
```

---

### Task 3: Verificare documentazione e ambiente Browser

**Files:**
- Verify: `docs/CLOUDFLARE_RUNBOOK.md`
- Verify: `README.md`
- Verify: `~/.codex/config.toml` in sola lettura
- Verify: plugin Browser installato in sola lettura

**Interfaces:**
- Consumes: runbook e README completati; plugin Browser riallineato dall'app.
- Produces: evidenza finale dei controlli documentali e stato verificato del Browser visuale.

- [ ] **Step 1: Eseguire i controlli repository**

Run:

```bash
git diff --check
npx vitest run
npm run lint
git status --short
```

Expected:

- 17 file di test e 88 test passano, salvo incrementi legittimi successivi.
- ESLint termina con exit code 0.
- Non sono presenti `.env.local`, `.dev.vars`, `.open-next` o `.wrangler` tra i file versionati.

- [ ] **Step 2: Riallineare il plugin Browser tramite l'app**

Azione manuale dell'utente:

```text
Debug Menu > Plugins > Reload bundled plugins
```

Chiudere completamente e riaprire la sessione. Non copiare file dalla directory dell'app e non modificare cache, hash o config manualmente.

- [ ] **Step 3: Verificare la versione Browser risolta**

Run:

```bash
/Applications/ChatGPT.app/Contents/Resources/codex plugin list
rg -n 'BROWSER_USE_CODEX_APP_VERSION|NODE_REPL_TRUSTED_BROWSER_CLIENT_SHA256S' ~/.codex/config.toml
```

Expected:

- `browser@openai-bundled` non risolve più la versione obsoleta `26.707.62119` se l'app installata resta `26.707.72221`.
- Versione selezionata, cache e allowlist risultano generate dallo stesso aggiornamento dell'app.
- Se permane `26.707.62119`, fermarsi e segnalare un problema di packaging/sincronizzazione; non applicare workaround manuali.

- [ ] **Step 4: Verificare il Browser visuale sulla preview locale**

Start:

```bash
npm run preview
```

Con il Browser integrato aprire `http://localhost:8787`, attendere il caricamento completo e verificare:

```text
- contenuto Home non vuoto;
- nessun overlay Next/OpenNext;
- nessun errore console applicativo;
- navbar e CTA presenti;
- viewport desktop 1440×1000;
- viewport mobile 390×844 con apertura/chiusura del menu;
- screenshot di entrambe le viewport.
```

Expected: bootstrap Browser riuscito e pagina verificabile visivamente. Se il bootstrap fallisce ancora prima della discovery, raccogliere versione plugin ed errore e segnalarli come problema dell'ambiente, non del sito.

- [ ] **Step 5: Verifica finale e stato Git**

Run:

```bash
git status --short
git log --oneline -4
```

Expected:

- Worktree pulito.
- Sono presenti i commit del runbook e del collegamento README.
- Nessun deploy o rollback è stato eseguito.
