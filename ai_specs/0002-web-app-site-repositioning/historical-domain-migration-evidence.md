# Evidenza migrazione dominio storico — Work Item 08

## Stato

- Data verifica operativa: 2026-07-14
- Ambiente: produzione
- Dominio storico: `pastrylabmanager.com`
- Dominio canonico: `labmanagergestionale.com`
- Owner operativo: committente/team LabManager
- Configurazione redirect: Cloudflare/DNS esterna al repository
- Attivita operative del Work Item 08: **COMPLETATE**
- Consolidamento SEO in Google: **IN MONITORAGGIO**

Il consolidamento SEO non viene dichiarato concluso. Google deve ancora ricrawlare e consolidare progressivamente i segnali; title, snippet e tempi di aggiornamento della SERP restano sotto il controllo di Google.

## Gate di pubblicazione

Il gate richiesto dal requisito 35 era risolto prima del deploy del 2026-07-14 e delle nuove attivita Search Console eseguite in questa sessione. Il [riepilogo pre-pubblicazione](./prepublication-summary.md) registra:

- approvazione esplicita del committente il 2026-07-14;
- candidato applicativo approvato `3020ecb` e documentazione candidata `99bbd72`;
- autorizzazione esplicita al push e al deploy;
- deploy Cloudflare completato prima delle attivita Search Console del Work Item 08.

La proprieta `pastrylabmanager.com` mostrava gia uno spostamento in corso con data iniziale 2026-07-10. Questo e uno stato esterno preesistente osservato e documentato dal Work Item 08, non un'azione avviata durante la sessione post-approvazione. La convalida/conferma della variante `www`, l'invio sitemap e le richieste di indicizzazione sono invece stati completati il 2026-07-14 dopo il gate.

## Owner e ambiente del redirect storico

Il dominio storico e controllato dal team LabManager. La configurazione che governa i redirect e esterna al repository del sito e risponde dall'ambiente Cloudflare di produzione. Le risposte live espongono `server: cloudflare`; nessun comportamento cross-domain e stato simulato in Vitest.

## Verifica live dei redirect

Metodo: richieste GET con `curl`, prima con `--max-redirs 0` per osservare status e `Location`, poi con `-L` per contare gli hop e osservare URL/status finali. Verifica eseguita il 2026-07-14, circa 17:09 CEST.

| Sorgente | Percorso | Status iniziale | `Location` | Path/query conservati | Hop | Status finale | Canonical HTML finale |
| --- | --- | ---: | --- | --- | ---: | ---: | --- |
| `http://pastrylabmanager.com` | `/` | 301 | `https://labmanagergestionale.com/` | si | 1 | 200 | `https://labmanagergestionale.com` |
| `http://pastrylabmanager.com` | `/ordini` | 301 | `https://labmanagergestionale.com/ordini` | si | 1 | 200 | `https://labmanagergestionale.com/ordini` |
| `http://pastrylabmanager.com` | `/pricing?utm_source=domain-migration&probe=20260714` | 301 | `https://labmanagergestionale.com/pricing?utm_source=domain-migration&probe=20260714` | si | 1 | 200 | `https://labmanagergestionale.com/pricing` |
| `https://pastrylabmanager.com` | `/` | 301 | `https://labmanagergestionale.com/` | si | 1 | 200 | `https://labmanagergestionale.com` |
| `https://pastrylabmanager.com` | `/ordini` | 301 | `https://labmanagergestionale.com/ordini` | si | 1 | 200 | `https://labmanagergestionale.com/ordini` |
| `https://pastrylabmanager.com` | `/pricing?utm_source=domain-migration&probe=20260714` | 301 | `https://labmanagergestionale.com/pricing?utm_source=domain-migration&probe=20260714` | si | 1 | 200 | `https://labmanagergestionale.com/pricing` |
| `http://www.pastrylabmanager.com` | `/` | 301 | `https://labmanagergestionale.com/` | si | 1 | 200 | `https://labmanagergestionale.com` |
| `http://www.pastrylabmanager.com` | `/ordini` | 301 | `https://labmanagergestionale.com/ordini` | si | 1 | 200 | `https://labmanagergestionale.com/ordini` |
| `http://www.pastrylabmanager.com` | `/pricing?utm_source=domain-migration&probe=20260714` | 301 | `https://labmanagergestionale.com/pricing?utm_source=domain-migration&probe=20260714` | si | 1 | 200 | `https://labmanagergestionale.com/pricing` |
| `https://www.pastrylabmanager.com` | `/` | 301 | `https://labmanagergestionale.com/` | si | 1 | 200 | `https://labmanagergestionale.com` |
| `https://www.pastrylabmanager.com` | `/ordini` | 301 | `https://labmanagergestionale.com/ordini` | si | 1 | 200 | `https://labmanagergestionale.com/ordini` |
| `https://www.pastrylabmanager.com` | `/pricing?utm_source=domain-migration&probe=20260714` | 301 | `https://labmanagergestionale.com/pricing?utm_source=domain-migration&probe=20260714` | si | 1 | 200 | `https://labmanagergestionale.com/pricing` |

Il redirect conserva anche la query nell'URL di destinazione. Il canonical HTML della pagina finale rimuove correttamente la query di tracciamento e indica `/pricing`.

## Robots del dominio storico

`https://pastrylabmanager.com/robots.txt` ha risposto HTTP 200 come `text/plain; charset=utf-8`. La policy Cloudflare osservata contiene:

```text
User-agent: *
Content-Signal: search=yes,ai-train=no,use=reference
Allow: /
```

Google Search non e bloccato dall'osservazione dei redirect. Il `Disallow` separato per `Google-Extended` riguarda l'uso esteso dei contenuti e non Googlebot Search.

## Search Console e Change of Address

Le operazioni sono state eseguite con lo stesso account owner. Il prerequisito dello strumento **Verifica di entrambi i siti** e il controllo del redirect 301 della home hanno superato la convalida.

| Proprieta sorgente | Proprieta destinazione | Stato osservato | Data |
| --- | --- | --- | --- |
| `pastrylabmanager.com` | `labmanagergestionale.com` | Spostamento in corso | avviato il 2026-07-10 |
| `www.pastrylabmanager.com` | `labmanagergestionale.com` | Convalida superata e spostamento confermato | 2026-07-14 |

Lo strumento gestisce insieme i protocolli della proprieta sorgente; non e stata aperta una richiesta distinta per il solo passaggio HTTP -> HTTPS.

## Sitemap e richieste di indicizzazione

Search Console ha accettato il 2026-07-14 l'invio di `https://labmanagergestionale.com/sitemap.xml`. La risposta XML live e stata verificata e contiene esattamente:

1. `https://labmanagergestionale.com`
2. `https://labmanagergestionale.com/ordini`
3. `https://labmanagergestionale.com/pricing`

Subito dopo l'invio, il dettaglio URL della Home mostrava temporaneamente `Errore temporaneo di elaborazione` come sorgente Sitemap. La pagina risultava comunque indicizzata, crawlable e recuperata con esito positivo. Questo stato transitorio appartiene al monitoraggio e non richiede invii ripetuti della sitemap.

Le tre richieste di nuova indicizzazione sono state accettate nella sessione Search Console del 2026-07-14.

| URL | Copertura osservata | Canonical dichiarato | Canonical scelto da Google | Richiesta indicizzazione |
| --- | --- | --- | --- | --- |
| `https://labmanagergestionale.com/` | URL su Google; pagina indicizzata; scansione e indicizzazione consentite; recupero positivo | `https://labmanagergestionale.com/` | URL controllato | accettata |
| `https://labmanagergestionale.com/ordini` | URL su Google; pagina indicizzata; HTTPS; 2 elementi Breadcrumb validi | `https://labmanagergestionale.com/ordini` | URL controllato | accettata |
| `https://labmanagergestionale.com/pricing` | URL su Google; pagina indicizzata; HTTPS | `https://labmanagergestionale.com/pricing` | URL controllato | accettata |

Per la Home, l'ultima scansione osservata era `2026-07-14 03:28:45`, eseguita da Googlebot per smartphone.

## Monitoraggio successivo

Le attivita operative richieste sono completate, ma il risultato SEO resta aperto fino a quando Search Console e la SERP confermeranno il consolidamento:

- monitorare copertura, canonical scelto e progressiva scomparsa del risultato storico;
- verificare l'elaborazione definitiva della sitemap senza reinvii ripetuti;
- controllare eventuale traffico organico residuo sul dominio storico;
- mantenere tutti i redirect almeno fino al 2027-01-10, cioe 180 giorni dalla variante applicabile avviata piu tardi, e piu a lungo se il dominio storico riceve ancora traffico organico;
- non promettere una data di aggiornamento ne un title/snippet SERP esatto.
