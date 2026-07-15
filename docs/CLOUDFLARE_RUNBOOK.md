# Runbook Cloudflare — LabManager Website

## Scopo e risorse gestite

Questa guida descrive sviluppo, verifica, pubblicazione, osservabilità e rollback del sito Next.js LabManager distribuito con OpenNext su Cloudflare Workers.

Worker gestito: labmanager-website
Dominio canonico: https://labmanagergestionale.com
Fuori scope: Worker labmanager, Worker labmanager-downloads, progetto Pages labmanager-web

Tutti i comandi Wrangler eseguiti dalla radice del repository usano `wrangler.jsonc`, il cui campo `name` deve restare `labmanager-website`. Prima di qualsiasi operazione remota, ricontrollare questo nome. Non aggiungere `--name` per puntare ad altre risorse e non modificare i componenti fuori scope.

## Comandi rapidi

Eseguire i comandi dalla radice del repository. I server `dev` e `preview` sono processi interattivi da avviare separatamente; gli altri comandi compongono il gate locale.

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

Il `dry-run` compila e controlla il bundle senza caricarlo su Cloudflare. Non sostituisce test, lint, build OpenNext o preview workerd.

## Prerequisiti e autenticazione

- Checkout del repository e dipendenze installate con `npm install`.
- Accesso all'account Cloudflare; per questa procedura è in scope esclusivamente il Worker `labmanager-website`.
- Wrangler locale compatibile con il progetto (`npx wrangler --version`; il progetto usa Wrangler 4.x).
- Configurazione verificata in `wrangler.jsonc`: `name` uguale a `labmanager-website`, entry point `worker.ts`, asset OpenNext e osservabilità attiva.
- Autorizzazione esplicita del committente prima di deploy, rollout o rollback. Test, build, dry-run e preview locali non pubblicano nulla.

Prima di un'operazione remota, verificare l'identità con `npx wrangler whoami` e controllare account e membership. Se la sessione locale non è valida, autenticarsi con `npx wrangler login`; in CI usare soltanto il token gestito da Workers Builds. Non copiare token in terminali condivisi, file versionati, report o log.

## Variabili d'ambiente e secrets

Non inserire valori reali nella documentazione o nel repository. I soli nomi previsti sono:

| Fase | Nomi | Collocazione |
| --- | --- | --- |
| Build-time, pubblico | `NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` | `.env.local` in locale; Build variables and secrets in Workers Builds |
| Runtime | `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_AUDIENCE_ID`, `CONTACT_EMAIL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | `.env.local` per Next locale, `.dev.vars` per preview Workers, Variables & Secrets del Worker in produzione |

`NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` viene incorporato durante la build ed è pubblico per definizione. Le configurazioni runtime vengono invece lette durante l'esecuzione; `RESEND_API_KEY` e `SUPABASE_SERVICE_ROLE_KEY` devono essere trattate come secrets.

`.env.local` serve allo sviluppo e alla build Next locali. `.dev.vars` serve alla preview Workers locale. Entrambi sono ignorati da Git: non aggiungerli forzatamente, non stamparli e non copiarne il contenuto nei ticket o nei log.

Le chiavi segrete non devono essere inserite in `wrangler.jsonc`. Per Workers Builds, distinguere le variabili necessarie alla build dalle variabili runtime configurate in **Worker > Settings > Variables & Secrets**; verificare sempre di essere nel Worker `labmanager-website`.

## Sviluppo locale

Installare le dipendenze e avviare Next.js:

```bash
npm install
npm run dev
```

`npm run dev` esegue Next.js in Node su http://localhost:3000 e offre il ciclo di sviluppo più rapido. In questa modalità le variabili locali vengono lette da `.env.local`.

Prima di passare alla preview Workers, eseguire almeno:

```bash
npx vitest run
npm run lint
npm run build
```

## Preview nel runtime Cloudflare

Avviare la preview dalla radice del repository:

```bash
npm run preview
```

Lo script ricostruisce l'applicazione con OpenNext, inizializza la cache locale e serve il Worker con workerd tramite Wrangler su http://localhost:8787. La preview usa `.dev.vars` per le configurazioni runtime locali ed è il riferimento per individuare differenze tra Node.js e Cloudflare Workers.

In un secondo terminale, controllare i title dell'HTML generato, non soltanto gli oggetti `metadata` del codice:

```bash
curl -fsS http://localhost:8787/ | rg -o '<title>[^<]+</title>'
curl -fsS http://localhost:8787/ordini | rg -o '<title>[^<]+</title>'
curl -fsS http://localhost:8787/pricing | rg -o '<title>[^<]+</title>'
```

I risultati attesi sono, rispettivamente:

- `Gestionale per pasticcerie, panifici e gelaterie | LabManager`
- `Gestione ordini e piano di lavoro | LabManager`
- `Prezzi e prova gratuita | LabManager`

Interrompere la preview con `Ctrl-C` al termine.

## Checklist pre-deploy

Completare e registrare il gate nell'ordine seguente:

1. Worktree pulito o diff intenzionale revisionato.
2. `npx vitest run`.
3. `npm run lint`.
4. `npm run build`.
5. `npx opennextjs-cloudflare build`.
6. Verifica title HTML di `/`, `/ordini` e `/pricing`.
7. Preview workerd.
8. Controllo visuale desktop 1440×1000.
9. Controllo visuale mobile 390×844, menu incluso.
10. Verifica CTA, immagini, focus tastiera, overlay ed errori console.
11. Approvazione esplicita del committente quando prevista dalla Spec.

Il controllo visuale può essere eseguito con il Browser integrato oppure manualmente in un browser con DevTools. L'installazione standalone della CLI opzionale `agent-browser` non è un prerequisito.

Su entrambe le viewport verificare Home, `/ordini` e `/pricing`; aprire e chiudere il menu mobile, percorrere gli elementi interattivi con `Tab` e `Shift+Tab`, attivare le CTA previste, controllare caricamento e proporzioni delle immagini, assenza di overlay bloccanti e assenza di errori nella console. Non pubblicare se uno dei punti non è verificato o se manca l'approvazione richiesta.

Come controllo conclusivo del bundle locale:

```bash
npx wrangler deploy --dry-run --outdir /tmp/labmanager-worker-bundle
```

## Deploy manuale

> **ATTENZIONE — PRODUZIONE:** `npm run deploy` esegue build OpenNext, inizializza la cache remota necessaria e pubblica immediatamente la nuova versione al 100% del traffico.

Eseguire il deploy soltanto dopo il completamento documentato della checklist, l'approvazione prevista dalla Spec e la conferma che `wrangler.jsonc` punti a `labmanager-website`.

```bash
npx wrangler whoami
npm run deploy
```

Prima di confermare, annotare commit, operatore, orario, motivo e versione candidata. Dopo il comando, non considerare conclusa la pubblicazione finché smoke test e log non sono stati verificati.

## Workers Builds

Configurare il repository collegato al Worker con questi valori esatti:

```text
Production branch: master
Build command: npx @opennextjs/cloudflare build
Deploy command: npx @opennextjs/cloudflare deploy
```

La build di produzione parte dai push su `master`: proteggere quindi il branch e applicare lo stesso gate pre-deploy prima del merge. Configurare `NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` tra le Build variables and secrets e le configurazioni runtime in **Variables & Secrets** del Worker; non inserirle nel repository.

`opennextjs-cloudflare upload` inizializza la cache remota e crea una versione senza servirla immediatamente. È destinato a un flusso esplicito di promozione o rollout graduale; non è il deploy ordinario corrente e non va usato senza una procedura di rollout approvata.

## Smoke test post-deploy

Eseguire richieste read-only a tutti gli URL canonici:

```text
https://labmanagergestionale.com/
https://labmanagergestionale.com/ordini
https://labmanagergestionale.com/pricing
https://labmanagergestionale.com/robots.txt
https://labmanagergestionale.com/llms.txt
https://labmanagergestionale.com/sitemap.xml
```

Un controllo sintetico degli status può essere eseguito così:

```bash
for url in \
  https://labmanagergestionale.com/ \
  https://labmanagergestionale.com/ordini \
  https://labmanagergestionale.com/pricing \
  https://labmanagergestionale.com/robots.txt \
  https://labmanagergestionale.com/llms.txt \
  https://labmanagergestionale.com/sitemap.xml
do
  curl -fsS -o /dev/null -w '%{http_code} %{url_effective}\n' "$url"
done
```

Richiedere HTTP 200, poi verificare i tre title e canonical, contenuto e `Content-Type` di `robots.txt` e `llms.txt`, e validità della sitemap. Ripetere il controllo visuale essenziale a desktop e mobile, verificare CTA e console, quindi annotare esiti e timestamp. Non inviare form di produzione come parte dello smoke test senza un'autorizzazione specifica.

## Log e osservabilità

`wrangler.jsonc` abilita l'osservabilità del Worker. Per una sessione filtrata sugli errori:

```bash
npx wrangler tail labmanager-website --status error
```

Per ottenere eventi strutturati:

```bash
npx wrangler tail labmanager-website --format json
```

I comandi rimangono in ascolto finché non vengono interrotti con `Ctrl-C`. Non riportare nei log payload di form, email, token o valori dei secrets. Durante lo smoke test controllare eccezioni, status inattesi e richieste fallite; per lo storico usare **Worker > Observability** nel dashboard.

## Versioni e rollback

Per ispezionare lo stato senza modificarlo:

```bash
npx wrangler versions list
npx wrangler deployments list
```

Un rollback sostituisce immediatamente il deployment corrente con la versione selezionata al 100% del traffico. La sequenza operativa è:

1. Fermare nuovi deploy e confermare che il Worker sia `labmanager-website`.
2. Eseguire `npx wrangler versions list` e identificare una versione già osservata come stabile.
3. Annotare incidente, sintomi, versione corrente, versione obiettivo e motivo del rollback.
4. Ottenere l'autorizzazione esplicita al rollback.
5. Eseguire interattivamente `npx wrangler rollback`, verificando con attenzione la versione proposta prima della conferma.
6. Eseguire di nuovo `npx wrangler versions list` e `npx wrangler deployments list`.
7. Ripetere integralmente lo smoke test post-deploy e controllare i log.

Comandi della procedura, da non eseguire senza autorizzazione:

```bash
npx wrangler versions list
npx wrangler rollback
```

Il rollback ripristina il codice e la configurazione versionata del Worker, ma non ripristina risorse o dati esterni. Modifiche a database, KV, R2, servizi terzi o struttura dei dati possono rendere una vecchia versione incompatibile o non ripristinabile.

## Manutenzione periodica

- Trimestralmente, rivedere la `compatibility_date` in una modifica dedicata; leggere il changelog Cloudflare, aggiornare la data, poi eseguire test, lint, build Next, build OpenNext, dry-run e preview workerd prima di proporla.
- Aggiornare le dipendenze in una modifica separata dal deploy di contenuto, con evidenze di test e bundle confrontabili.
- Controllare nel `dry-run` la dimensione compressa del bundle. Il limite attuale è **3 MiB sul piano Workers Free** e **10 MiB sul piano Workers Paid**; verificare sempre il valore corrente nella [documentazione dei limiti](https://developers.cloudflare.com/workers/platform/limits/).
- Verificare periodicamente che secrets e variabili richiesti esistano negli ambienti corretti senza leggerne o registrarne i valori.
- Controllare dominio canonico, route, certificato, osservabilità, build collegate e nome Worker. Qualsiasi controllo deve confermare `labmanager-website`; le altre risorse restano fuori scope.
- Rimuovere in modo sicuro gli artefatti temporanei in `/tmp/labmanager-worker-bundle` quando non servono più; non versionarli.

## Troubleshooting

### Autenticazione Wrangler

Eseguire `npx wrangler whoami`. Se la sessione locale è scaduta, usare `npx wrangler login` e ricontrollare account e membership. In Workers Builds verificare il token associato alla build senza stamparlo o sostituirlo nel repository. Non proseguire se l'account o il Worker non sono quelli previsti.

### Secret o variabile mancante

Individuare dal messaggio d'errore soltanto il **nome** mancante. Per Next dev/build verificare `.env.local`; per preview workerd verificare `.dev.vars`; per Workers Builds distinguere Build variables and secrets da **Worker > Settings > Variables & Secrets**. Correggere soltanto `labmanager-website`, con autorizzazione, senza mostrare il valore e senza aggiungerlo a `wrangler.jsonc`.

### Bundle troppo grande

Eseguire `npx wrangler deploy --dry-run --outdir /tmp/labmanager-worker-bundle` e leggere `gzip` nell'output. Se supera il limite del piano, non pubblicare: individuare dipendenze o asset incorporati non necessari, spostare gli asset verso il meccanismo Cloudflare appropriato e ripetere l'intero gate.

### Preview diversa da Next dev

Ricostruire con `npm run preview` dopo aver fermato processi precedenti. Controllare che `.env.local` alimenti la build Next e `.dev.vars` il runtime Workers, quindi cercare API Node non supportate, differenze di cache e binding mancanti. Il comportamento della preview workerd prevale come verifica del runtime di produzione.

### Form non funzionanti

Verificare la presenza, mai il valore, di `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_AUDIENCE_ID`, `CONTACT_EMAIL`, `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` nell'ambiente corretto. Riprodurre prima in locale, controllare status e risposta dell'API senza registrare dati personali, quindi usare `npx wrangler tail labmanager-website --status error` per gli errori live. Non inviare form reali o modificare secrets in produzione senza autorizzazione.

### Rollback non disponibile

Controllare `npx wrangler versions list`: la versione può non essere più disponibile oppure può dipendere da binding o risorse esterne modificati o rimossi. Non forzare il rollback. Congelare i deploy, documentare il blocco e preparare, previa autorizzazione, un deploy da un commit noto come stabile; anche questa alternativa richiede gate e smoke test completi.

## Riferimenti ufficiali

- [OpenNext — Develop and deploy](https://opennext.js.org/cloudflare/howtos/dev-deploy)
- [OpenNext — CLI](https://opennext.js.org/cloudflare/cli)
- [OpenNext — Environment variables](https://opennext.js.org/cloudflare/howtos/env-vars)
- [Cloudflare Workers — Versions and deployments](https://developers.cloudflare.com/workers/versions-and-deployments/)
- [Cloudflare Workers — Rollbacks](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/)
- [Cloudflare Workers — Platform limits](https://developers.cloudflare.com/workers/platform/limits/)
- [Cloudflare Workers — Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)
- [Cloudflare Workers — Build branches](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/)
- [Cloudflare Workers — Wrangler commands](https://developers.cloudflare.com/workers/wrangler/commands/)
- [Cloudflare Workers — Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/)
