# Cloudflare operations runbook — design

## Obiettivo

Creare una guida operativa unica e consultabile per sviluppare, verificare, pubblicare e ripristinare il sito LabManager su Cloudflare Workers tramite `@opennextjs/cloudflare`. La guida deve descrivere il comportamento reale di questo repository senza duplicare la documentazione generale di Cloudflare.

## Deliverable

- Nuovo file `docs/CLOUDFLARE_RUNBOOK.md` in italiano.
- Collegamento evidente dal `README.md`, lasciando nel README soltanto l'avvio rapido.
- Nessuna modifica ai comandi di build, alla configurazione Wrangler, alle variabili d'ambiente o al Worker remoto.

## Struttura del runbook

1. Percorso essenziale iniziale: una procedura numerata dall'installazione al deploy, con una spiegazione breve per ogni comando e un avviso evidente prima della pubblicazione in produzione.
2. Architettura e risorse in scope: Next.js, OpenNext, Worker `labmanager-website`, dominio canonico e risorse Cloudflare da non modificare.
3. Prerequisiti locali e autenticazione: Node.js, dipendenze, Wrangler e verifica dell'account.
4. Variabili e secrets: distinzione tra build-time, runtime e sviluppo locale, senza includere valori reali.
5. Sviluppo e preview: differenza tra `npm run dev`, build Next e preview nel runtime Workers.
6. Checklist pre-deploy: stato Git, test, lint, build Next/OpenNext, title HTML e verifica visuale mobile/desktop.
7. Deploy manuale e Workers Builds: procedura ordinaria, gate umano previsto dalla Spec e distinzione tra `deploy` e `upload`.
8. Smoke test post-deploy: route principali, metadata, file testuali, sitemap, form e controllo degli errori.
9. Osservabilità: log live con Wrangler, Dashboard e informazioni minime da raccogliere durante un incidente.
10. Versioni e rollback: identificazione della versione attiva, scelta della versione stabile, rollback e verifica successiva.
11. Manutenzione periodica: compatibility date, dipendenze, limiti del Worker, secrets e controllo delle risorse collegate.
12. Troubleshooting sintetico e riferimenti ufficiali.

### Percorso essenziale iniziale

La sezione iniziale deve essere comprensibile anche senza conoscere Wrangler o OpenNext e deve guidare l'operatore, in ordine, attraverso:

1. installazione con `npm install`;
2. sviluppo con `npm run dev`, spiegando che il server resta attivo fino a `Ctrl-C`;
3. test con `npx vitest run`;
4. controllo del codice con `npm run lint`;
5. build con `npm run build`;
6. preview Cloudflare con `npm run preview`, anch'essa da interrompere con `Ctrl-C`;
7. controllo finale senza pubblicazione con `npx wrangler deploy --dry-run --outdir /tmp/labmanager-worker-bundle`;
8. verifica dell'account con `npx wrangler whoami`;
9. deploy con `npm run deploy`, separato visivamente dagli altri comandi e marcato come pubblicazione immediata in produzione.

Questa apertura è una guida rapida, non un unico blocco da copiare: i server interattivi impedirebbero ai comandi successivi di partire e il deploy non deve essere eseguito accidentalmente. Le spiegazioni tecniche, le variabili, i log, il rollback e il troubleshooting restano nelle sezioni successive.

## Regole di sicurezza operativa

- I comandi che modificano produzione devono essere marcati chiaramente e separati dai controlli read-only.
- Il runbook non deve suggerire di committare `.env.local`, `.dev.vars`, token o chiavi.
- Il deploy resta subordinato all'approvazione esplicita del committente quando la Spec attiva prevede un gate umano.
- Il rollback deve avvertire che ripristina codice e configurazione del Worker, ma non annulla modifiche a servizi esterni o dati persistenti.
- Worker e progetti Cloudflare estranei a questo repository devono essere nominati esplicitamente come fuori scope.

## Browser e verifica visuale

La checklist deve richiedere un controllo visuale della Home su viewport desktop e mobile, inclusi navbar, menu mobile, CTA, immagini e assenza di overlay/errori. La guida non deve dipendere esclusivamente dalla CLI opzionale `agent-browser`: il controllo può essere svolto con il Browser integrato disponibile nell'ambiente o manualmente con un browser locale.

Il problema rilevato nella sessione corrente è ambientale e non appartiene al codice del sito: la configurazione Codex sta risolvendo il plugin Browser `26.707.62119`, mentre l'app installata contiene `26.707.72221`. Il client precedente fallisce durante il bootstrap tentando di ridefinire `globalThis.process`; il client incluso nell'app aggiornata non contiene più quelle assegnazioni. La risoluzione supportata prioritaria è `Debug Menu > Plugins > Reload bundled plugins`, seguita dalla riapertura della sessione e dalla verifica della versione risolta. Se il disallineamento persiste, aggiornare o riavviare completamente l'app. Non copiare il client più recente né modificare manualmente cache, hash attendibili o configurazione: questi elementi devono essere riallineati insieme dall'app.

## Criteri di accettazione

- Ogni comando documentato esiste nelle versioni installate di Wrangler e OpenNext oppure è collegato alla documentazione ufficiale corrente.
- La procedura distingue chiaramente controlli locali, operazioni remote read-only e mutazioni di produzione.
- La guida copre il ciclo completo: preparazione, preview, approvazione, deploy, verifica, log e rollback.
- L'apertura guida un operatore dall'installazione al deploy senza richiedere la lettura preventiva delle sezioni tecniche.
- Il README collega il runbook senza duplicarne le sezioni operative.
- Link, comandi e riferimenti ai file del repository vengono verificati prima del commit.

## Fonti autorevoli

- Configurazione e script del repository: `package.json`, `wrangler.jsonc`, `open-next.config.ts`, `README.md` e Spec attive.
- OpenNext Cloudflare: <https://opennext.js.org/cloudflare/howtos/dev-deploy>
- Cloudflare Workers versions and deployments: <https://developers.cloudflare.com/workers/versions-and-deployments/>
- Cloudflare rollback: <https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/>
- Cloudflare Workers limits: <https://developers.cloudflare.com/workers/platform/limits/>
