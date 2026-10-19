# Rimozione di Aggiornamenti e Download — 19 ottobre 2026

## Decisione corrente

Il committente non vuole più le pagine `/aggiornamenti` e `/download`. Questa decisione sostituisce le precedenti istruzioni che le conservavano come supporto legacy accessibile con link diretto, incluse le eccezioni nei vecchi piani di indicizzazione. Quei piani e i report che riportano HTTP 200 per queste pagine sono storici.

Sono rimossi le due route, `Download`, `DownloadClient`, i dati del changelog non più usati, i relativi stili e l'obbligo della matrice Magazzino di pubblicare le affermazioni nel changelog. Le altre superfici della matrice e il testo canonico restano invariati. Le note di rilascio precedenti restano recuperabili dalla cronologia Git; non richiedono più manutenzione nel sito.

I vecchi URL restituiscono HTTP 404 con `src/app/not-found.tsx`, inclusi navigazione, footer e ritorno alla homepage. Nessun reindirizzamento a una pagina dal contenuto diverso. Rimosso il blocco anticipato di `/download` da `edge-http-policy.ts`, che avrebbe restituito un corpo vuoto e saltato la 404 Traccia di OpenNext. La politica HTTPS e di blocco dei metodi HTTP non sicuri resta attiva.

Navbar, footer, home, aree di lavoro, prezzi, sitemap, `llms.txt`, newsletter e mail di benvenuto già non puntavano alle pagine ritirate. Mantenerli senza questi link. Nessun nuovo `Disallow` per impedire ai crawler di leggere il 404. Restano le notizie della newsletter e lo stato degli aggiornamenti del Libro ingredienti: sono contenuti distinti dalla pagina Aggiornamenti.

Traccia, palette, Manrope/Fraunces, logo, pattern, foto e diciture AI, conversione alla web app, condizioni commerciali, moduli, consensi e billing conservano le decisioni approvate. Nessuna nuova estrazione creativa, immagine o funzione.

## Come comportarsi con i download Cloudflare

Il sito usava questi endpoint nel Worker separato `labmanager-downloads`:

- `https://labmanager-downloads.labmanager-info.workers.dev/android`
- `https://labmanager-downloads.labmanager-info.workers.dev/windows`

Rimuovere la pagina del sito non spegne gli endpoint, non cancella APK/EXE e non modifica gli aggiornamenti delle app già installate. Non è stata ispezionata né modificata la configurazione remota di quel Worker, delle sue route o dell'eventuale storage. Le istruzioni seguenti sono una proposta operativa successiva, non operazioni già eseguite.

**Dipendenza trovata in sola lettura nell'app:** `../Labmanager/scripts/release-android.ps1` e `release-windows.ps1` usano come default bucket `labmanager-downloads` e URL base del Worker sopra indicato. Caricano sia un pacchetto `latest` sia uno versionato e scrivono gli URL versionati nei manifesti GitHub (`download_url` Android, `windows_download_url` Windows). Entrambi impostano anche `description` a `https://labmanagergestionale.com/aggiornamenti` e chiedono di pubblicare il changelog. La copia locale di `app_releases/version.json` contiene entrambi i riferimenti per Windows; `lib/features/app_update/widgets/app_update_dialog.dart` apre le descrizioni URL nel browser. Questa è prova del collegamento nel codice locale, non dell'uso dei client attualmente installati o dello stato del manifesto remoto.

**Raccomandazione attuale: conservare Worker e bucket.** Prima della pubblicazione del sito, concordare nel repository dell'app la nuova destinazione delle note di rilascio e aggiornare procedure/manifesti pertinenti: lasciando quel link, chi lo apre riceverà la 404. Non sostituirlo con la homepage come se contenesse le note. Queste modifiche dell'app non sono state eseguite in questa consegna.

1. Per questa modifica del sito, lasciare il servizio com'è. Prima di ritirarlo, verificare nel progetto che lo gestisce i consumer: updater, manifesti di versione, link nelle app, email o guide già distribuite, download diretti e binding allo storage. Controllare anche il traffico recente; assenza di traffico da sola non prova che nessun client ne abbia bisogno.
2. Se APK/EXE servono ancora per assistenza o aggiornamenti, mantenere il servizio indipendente dal sito. Non occorre ricreare una pagina Download o spostare i pacchetti in `public/`. Per file grandi, R2 è il prodotto adatto se già usato o se occorre uno storage; non introdurre una migrazione per la sola rimozione delle pagine.
3. Se i pacchetti non servono più a nessun client, pianificare il ritiro nel progetto del Worker download: salvare sorgente/configurazione e copia dei file necessari; disabilitare il dominio `workers.dev` da Workers & Pages → `labmanager-downloads` → Settings → Domains & Routes. Allineare anche la sua configurazione (`workers_dev: false`) per evitare che un successivo deploy lo riattivi. Non cambiare `wrangler.jsonc` di questo sito e non usare `--name` da questo repository.
4. Verificare separatamente URL di versione/preview, eventuali route e domini personalizzati: disabilitare `workers.dev` non garantisce che tutti gli altri accessi siano chiusi. Se esiste un bucket R2 pubblico, controllare sia `r2.dev` sia ciascun dominio collegato; disattivare uno non chiude gli altri. Un bucket privato può comunque essere servito dal Worker tramite binding. Conservare inizialmente i file; cancellazione di Worker/bucket/oggetti solo dopo verifica delle dipendenze e decisione separata.
5. Dopo un futuro ritiro autorizzato, verificare tutti i vecchi endpoint e i client interessati. La verifica locale del sito non può attestare questa chiusura remota.

Fonti ufficiali Cloudflare consultate il 19 ottobre 2026:

- [Disattivare workers.dev e mantenere allineata la configurazione](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/#disabling-workersdev).
- [Gestire gli URL di versione](https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/).
- [Accesso pubblico R2, r2.dev e domini personalizzati](https://developers.cloudflare.com/r2/buckets/public-buckets/).

## Verifica locale e rilascio

Le verifiche di questo intervento e la critica visiva sono nel [report locale](../.taste-skill/retired-pages/verification.md): 114 Vitest e 3 controlli commerciali, build/TypeScript, lint e 42 controlli responsive passati. L'inspector della 404 esistente mantiene 5 FAIL / 3 WARN stilistici, spiegati nel report; non è dichiarato un gate a zero FAIL. Le evidenze storiche delle pagine rimosse restano distinte dalle verifiche della versione finale. Nessun invio reale di moduli o download/installazione di pacchetti.

Lavoro sul checkout già modificato, baseline dei file coinvolti in `/tmp/labmanager-retired-pages-baseline`. Nessun reset, staging, commit, push, deploy o cambiamento Cloudflare remoto. La pubblicazione del sito e l'eventuale ritiro del servizio download restano operazioni separate.
