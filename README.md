# LabManager Website

Landing page italiana di LabManager, realizzata con Next.js App Router e distribuita su Cloudflare Workers tramite `@opennextjs/cloudflare`.

Per preview nel runtime Workers, deploy, secrets, smoke test, log e rollback consulta il [Runbook operativo Cloudflare](docs/CLOUDFLARE_RUNBOOK.md).

## Sviluppo locale

Richiede Node.js 22 o successivo.

```bash
npm install
npm run dev
```

Il server Next.js è disponibile su [http://localhost:3000](http://localhost:3000).

## Preview Cloudflare Workers

La preview esegue prima il build OpenNext e poi serve il risultato nel runtime workerd locale:

```bash
npm run preview
```

Il Worker locale è disponibile su [http://localhost:8787](http://localhost:8787). Il nome del Worker di produzione è `labmanager-website`; i Worker `labmanager` e `labmanager-downloads` e il progetto Pages `labmanager-web` sono risorse distinte e non devono essere modificati da questo repository.

## Variabili d'ambiente

Configurare queste variabili/secrets nel Worker e, per la preview locale, in un file `.dev.vars` non versionato:

```dotenv
RESEND_API_KEY=
RESEND_FROM_EMAIL=LabManager <noreply@labmanagergestionale.com>
RESEND_AUDIENCE_ID=
CONTACT_EMAIL=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

Cloudflare Web Analytics richiede inoltre questa variabile pubblica durante il build:

```dotenv
NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN=
```

Il token viene copiato dallo snippet generato in Cloudflare Web Analytics. Se non è configurato, il beacon non viene renderizzato.

## Build e deploy

```bash
npm run build
npm run deploy
```

Per Workers Builds, collegare questo repository, usare `master` come branch di produzione e `npm run deploy` come comando di deploy. Il file `wrangler.jsonc` configura il Worker, la compatibility date, `nodejs_compat` e gli asset statici.

Le immagini sono tutte locali e statiche. Per il primo deploy `next/image` usa intenzionalmente `images.unoptimized`; l'abilitazione futura del binding Cloudflare Images potrà sostituire questo fallback dopo la verifica della zona e dei relativi costi.

## Verifica

```bash
npm run lint
npx vitest run
npm run build
npx opennextjs-cloudflare build
```

Per misurare il bundle senza effettuare un deploy:

```bash
npx wrangler deploy --dry-run --outdir /tmp/labmanager-worker-bundle
```

Il bundle compresso deve restare entro il limite di 3 MiB del piano Workers Free.
