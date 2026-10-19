# Verifica build con lock committato — 19 ottobre 2026

**Esito: build Next, build OpenNext e dry-run riusciti per il commit `0fa9e6e1282b48518950039c98f49d515a426f85`.** Il fallimento osservato con Next 16.4.2/Webpack non si riproduce nella build prevista dal progetto con Next 16.2.10/Turbopack. Nessuna modifica alle route necessaria per questo controllo. Il successivo commit richiesto raccoglie soltanto la documentazione di verifica; nessun push o deploy.

## Origine e isolamento

Esportati con `git archive` i **315 file** del commit in una nuova cartella temporanea. `node_modules` installato autonomamente con `npm ci --no-audit --no-fund`, senza symlink alle dipendenze concorrenti del checkout. Nessun file `.env`, `.env.local` o `.dev.vars` copiato. Dopo i controlli tutti i 315 file esportati, manifest e lock compresi, mantengono gli hash iniziali.

| Strumento | Versione effettiva |
| --- | --- |
| Node.js / npm locali | 26.5.0 / 12.0.2 |
| Next.js | 16.2.10 |
| OpenNext Cloudflare | 1.20.1 |
| OpenNext AWS | 4.0.2 |
| Wrangler | 4.110.0 |

BUILD_ID della candidata OpenNext: **`Xn_gsmGvvA3jr3dQWaglu`**. Worker configurato: esclusivamente `labmanager-website`, entry point `worker.ts`, binding `ASSETS`, `compatibility_date` 2026-07-10. Le modifiche concorrenti a `package.json` e `package-lock.json` nel checkout originale sono rimaste identiche e non sono incluse nella candidata.

## Controlli conclusi

| Controllo | Esito |
| --- | --- |
| `npm ci --no-audit --no-fund` | Riuscito; manifest e lock invariati |
| `npm test` | 133/133 Vitest e 3/3 controlli commerciali |
| `npm run lint` | Nessun errore o warning |
| `npm run build` | Riuscito con Turbopack, controllo TypeScript e 19 pagine statiche generate |
| `opennextjs-cloudflare build` | Riuscito; rigenera Next con output standalone e produce `.open-next/worker.js` |
| `wrangler deploy --dry-run --outdir .verification-worker-bundle` | Riuscito; 6030,49 KiB, gzip 1272,06 KiB; nessun upload |
| Preview `opennextjs-cloudflare preview --port 8791` | workerd locale avviato, soltanto `ASSETS`; poi arrestato |

HTTP sulla preview workerd: sette pagine canoniche **200**, title e canonical attesi; loader CMP diretto assente nell'HTML servito. Sitemap **200** con sette URL, `/download` e `/aggiornamenti` **404**. Richiesta HTTP con hostname canonico al wrapper: **308** verso HTTPS con percorso/query conservati. Sono 11 controlli locali conclusi; non una verifica del DNS/TLS o del sito pubblico.

## Tentativi intermedi e limiti

- Il tentativo `opennextjs-cloudflare build --skipNextBuild` sulla precedente build Next standard fallisce per mancanza dell'output standalone. Il successivo comando **completo** previsto dalla pipeline lo genera e conclude correttamente, senza cambiare configurazione o sorgenti. La [CLI OpenNext](https://opennext.js.org/cloudflare/cli) documenta che il comando build esegue prima la build Next e poi l'adattamento Cloudflare.
- Il primo verificatore HTTP confrontava il nome dell'header `Location` distinguendo maiuscole/minuscole; corretto il solo verificatore con `getheader`, poi tutti i controlli passano. Il redirect del Worker era già corretto.
- npm segnala sette script di installazione bloccati dalla propria allowlist; nessuna allowlist modificata, installazione e comandi richiesti riusciti. Nei test restano warning Node sperimentali/deprecazioni e messaggi jsdom di navigazione non implementata, senza test falliti. La sonda iniziale `wrangler --version` non poteva scrivere il log globale nel sandbox; i comandi successivi usano `WRANGLER_LOG_PATH` locale.
- Preview dedicata interrotta volontariamente dopo i controlli; il wrapper restituisce un errore di comando interrotto. Nessun errore runtime osservato nelle richieste concluse.
- Non ripetuto un percorso browser sulla candidata workerd con questo lock: i precedenti controlli CMP su Home/Prezzi rimangono prove separate dell'anteprima Next dev. Nessuna nuova misura Lighthouse/CWV, verifica Search Console o accettazione del dominio pubblico.
- Nessun secret runtime o file ambiente copiato, variabile Analytics opzionale omessa; invii form, newsletter e pagamenti non eseguiti. Versioni Node/npm della futura pipeline non verificate in questo passaggio.

## Prove e stato Git

Prove locali ignorate: `output/locked-build-2026-10-19/SUMMARY.json`, `source-manifest.json`, `next-build.log`, `opennext-build.log` (tentativo saltando Next), `opennext-build-full.log`, `worker-dry-run.log` e `http-smoke.json`. La directory temporanea e le build non sono garantite in un clone nuovo.

**Il precedente dubbio sulla build con il lock versionato è chiuso.** Questo rapporto e i riferimenti correnti sono raccolti nel commit documentale richiesto dopo la verifica di `0fa9e6e`, senza ulteriori modifiche al codice o pubblicazioni. Il sito pubblico mantiene ancora il doppio caricamento fino al rilascio del fix.
