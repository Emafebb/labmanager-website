# Riepilogo pre-pubblicazione — Work Item 07

## Versione candidata

- Data verifica: 2026-07-14
- Commit candidato del sito: `3020ecb61446a459569f9081b781086f96179400`
- Commit documentazione candidata: `99bbd7261f1d76a4cb38717b1fe68fe19f1706c4`
- Next.js: `16.2.10`
- OpenNext for Cloudflare: `1.20.1`
- Stato approvazione pubblicazione: **APPROVATO DAL COMMITTENTE**
- Push e deploy di produzione: **COMPLETATI**
- Attività Search Console eseguite: **nessuna**

Il candidato riscrive `public/llms.txt`, neutralizza il copy legacy residuo nel footer e aggiunge regressioni cross-surface. `src/app/sitemap.ts`, `public/robots.txt`, `public/_headers` e i contenuti delle tre route indicizzabili non sono stati modificati da questo Work Item.

## Approvazione alla pubblicazione

- Approvata da: committente
- Data approvazione: 2026-07-14
- Versione approvata: candidato applicativo `3020ecb`, documentato in `99bbd72`
- Autorizzazione esplicita: push di `master` e deploy in produzione
- Attività successive: il committente procederà separatamente con il Work Item 08 dopo la notifica di deploy completato

## Evidenza deploy di produzione

- Commit pubblicato e presente su `origin/master`: `365aa2e6937a98c63234a86b04fa177fdca68b4f`
- Comando: `npm run deploy`
- Worker Cloudflare: `labmanager-website`
- Versione Cloudflare attiva al 100%: `afee073a-b42d-4f7e-8f79-0d54d3051cfe`
- Creazione versione: `2026-07-14T15:05:23.216Z`
- Attività Work Item 08 o Search Console eseguite durante il deploy: **nessuna**

Smoke test sul dominio canonico dopo il deploy:

| Risorsa | Verifica live | Esito |
| --- | --- | --- |
| `/` | HTTP 200, title Home esatto, footer aggiornato | PASS |
| `/ordini` | HTTP 200, title Ordini esatto, footer aggiornato | PASS |
| `/pricing` | HTTP 200, title Prezzi esatto, footer aggiornato | PASS |
| `/llms.txt` | HTTP 200, `text/plain; charset=utf-8`, pubblico aggiornato, termini proibiti assenti | PASS |
| `/robots.txt` | HTTP 200, `text/plain; charset=utf-8`, sitemap canonica, nessun `Disallow` | PASS |
| `/sitemap.xml` | HTTP 200, esattamente Home, Ordini e Prezzi | PASS |

## Contratti di indicizzazione

- Sitemap: esattamente `https://labmanagergestionale.com`, `/ordini` e `/pricing`.
- `lastModified`: invariati al `2026-07-14`, data delle modifiche reali eseguite dai Work Item precedenti su Home, Ordini e Prezzi.
- Newsletter: `noindex, follow`, raggiungibile dal footer e assente dalla sitemap.
- Aggiornamenti, Download e billing: contratti `noindex` invariati e assenti dalla sitemap.
- Instagram: contratto `noindex` invariato e assente dalla sitemap.
- `robots.txt`: nessun `Disallow`; le route noindex restano crawlable; sitemap canonica sul dominio corrente.
- `robots.txt` e `llms.txt`: `Content-Type: text/plain; charset=utf-8` conservato in `public/_headers`.
- `llms.txt`: solo Home, Ordini e Prezzi come pagine SEO principali; pubblico, quattro pilastri e sei claim Magazzino allineati alla Spec.

## Esiti automatizzati

Tutti i comandi sono stati rieseguiti dopo la correzione finale del footer.

| Comando | Esito | Evidenza sintetica |
| --- | --- | --- |
| `npx vitest run` | PASS — exit 0 | 17 file, 88 test passati |
| `npm run lint` | PASS — exit 0 | ESLint senza errori o warning applicativi |
| `npm run build` | PASS — exit 0 | Compilazione, TypeScript e 17 pagine statiche completati |
| `npx opennextjs-cloudflare build` | PASS — exit 0 | Bundle Cloudflare generato in `.open-next/worker.js`; nessun deploy |

Vitest/Next riportano avvisi ambientali già presenti relativi a `module.register()`, jsdom navigation e localStorage. Non producono errori, test falliti o failure di build.

## Title osservati nell'HTML servito

I title sono stati letti dalle risposte HTML del server di produzione locale dopo la build, non dagli oggetti `metadata` esportati.

| Route | HTTP | `<title>` effettivo | Esito |
| --- | ---: | --- | --- |
| `/` | 200 | `Gestionale per pasticcerie, panifici e gelaterie \| LabManager` | PASS |
| `/ordini` | 200 | `Gestione ordini e piano di lavoro \| LabManager` | PASS |
| `/pricing` | 200 | `Prezzi e prova gratuita \| LabManager` | PASS |

Ogni title contiene un solo suffisso `| LabManager`.

## Verifica browser locale

Strumento: Chromium headless tramite `agent-browser`, contro la build di produzione locale.

| Scenario | Verifica | Esito |
| --- | --- | --- |
| Desktop `1440×1000` | Home non vuota, H1, hero, quattro pilastri, footer neutralizzato, immagine hero caricata | PASS |
| Navbar desktop | Funzionalità, Ordini, Prezzi, Accedi nell'ordine previsto; destinazioni e stessa scheda corrette | PASS |
| Tastiera/focus | Tab raggiunge logo e Funzionalità; outline/ring visibile da 2 px; Enter naviga a `/#funzionalita` | PASS |
| CTA desktop | Home → Funzionalità; Ordini → Prezzi; CTA prova verso `https://app.labmanagergestionale.com` senza `target` | PASS |
| Mobile `390×844` | H1 e hero responsive visibili; immagine mobile caricata con alt neutro | PASS |
| Menu mobile | Apri/Chiudi, `aria-expanded`, quattro link esatti, chiusura con Escape e dopo la navigazione | PASS |
| Navigazione mobile | Ordini → `/ordini`; “Scopri i prezzi” → `/pricing`; title delle destinazioni corretti | PASS |
| Errori browser | Nessun page error e nessun overlay Next.js | PASS |

I widget terzi emettono messaggi ripetuti di livello `log` con testo `silent error`; `agent-browser errors` non rileva page error e non compare alcun overlay applicativo.

Screenshot locali, esclusi da Git:

- `.seo-cache/pages/homepage/screenshots/prepublication-desktop-1440x1000.png`
- `.seo-cache/pages/homepage/screenshots/prepublication-mobile-menu-390x844.png`

## Analisi SEO delle tre pagine indicizzabili

La cache del 2026-07-11 è stata usata soltanto come baseline. Punteggi e risultati seguenti derivano dall'HTML di produzione e dal DOM browser del candidato corrente.

### Home — 91/100

```text
On-Page SEO:     91/100  █████████░
Content Quality: 86/100  ████████░░
Technical:       98/100  ██████████
Schema:          96/100  ██████████
Images:          95/100  ██████████
```

- 589 parole nel `main`, un H1 e gerarchia H2/H3 coerente.
- Canonical self-referencing, index/follow implicito, Open Graph/Twitter coerenti.
- WebSite, Organization, SoftwareApplication e FAQPage presenti; nessun Offer o HowTo.
- Hero responsive AVIF/WebP con dimensioni, alt neutro e caricamento completato.
- Il title approvato è lungo 61 caratteri, uno oltre la soglia generica di 60; la stringa esatta della Spec prevale.
- Segnale E-E-A-T residuo: mancano case study o prove cliente attribuite e verificabili.

### Ordini — 90/100

```text
On-Page SEO:     86/100  █████████░
Content Quality: 84/100  ████████░░
Technical:       98/100  ██████████
Schema:          95/100  ██████████
Images:          98/100  ██████████
```

- 624 parole nel `main`, sopra il gate landing di 600; un H1 e gerarchia coerente.
- Canonical, index/follow, Open Graph/Twitter e WebPage/FAQPage coerenti con il contenuto visibile.
- Due destinazioni contestuali: `/pricing` e `#flusso-ordine`.
- La description approvata è lunga 108 caratteri, sotto il gate generico di 120; la stringa esatta della Spec prevale.
- Segnale E-E-A-T residuo: nessun esempio operativo attribuito o prova cliente.

### Prezzi — 80/100

```text
On-Page SEO:     82/100  ████████░░
Content Quality: 68/100  ███████░░░
Technical:       98/100  ██████████
Schema:          90/100  █████████░
Images:          60/100  ██████░░░░
```

- Title, canonical, index/follow, Open Graph/Twitter e WebPage rispettano la Spec.
- 367 parole nel `main`, sotto il gate prodotto di 400 parole.
- La description approvata è lunga 71 caratteri, sotto il gate generico di 120; non viene modificata perché il requisito 27 ne impone il testo esatto.
- Nessun link contestuale interno nel `main`.
- `public/images/pricing-og-image.png` pesa 783.211 byte, oltre la soglia critica di 500 KB. È un costo per i crawler social e non l'immagine LCP della pagina.

I test lab locali mobile hanno riportato CLS `0`, FCP `40–52 ms` e LCP `72–84 ms`; sono misure locali direzionali, non Core Web Vitals di campo. INP non era disponibile.

### Priorità SEO successive

1. Ricomprimere l'immagine social Prezzi sotto 200 KB mantenendo il contratto visuale corrente.
2. Approvare separatamente un'espansione utile del contenuto Prezzi oltre 400 parole, senza introdurre Offer o claim non verificati.
3. Valutare link contestuali da Prezzi verso Ordini e la sezione funzionalità della Home.
4. Pianificare case study o prove cliente attribuite per rafforzare E-E-A-T.

Non viene suggerito nuovo schema per questo rilascio: conservare WebPage e il grafo condiviso; non aggiungere Offer, HowTo o FAQPage alla pagina Prezzi.

## Limitazioni

- Nessun dato Search Console, GA4, CrUX o Core Web Vitals di campo è stato consultato.
- La verifica pre-pubblicazione locale è affiancata da uno smoke test live; non sostituisce la verifica completa della migrazione storica prevista dal Work Item 08.
- Le attività sul dominio storico e Search Console appartengono al Work Item 08 e non vengono eseguite durante questo deploy.

## Gate di pubblicazione

**DEPLOYED — approvato e pubblicato in produzione il 2026-07-14.**

Il committente ha approvato esplicitamente il candidato applicativo `3020ecb`, documentato in `99bbd72`, e ha autorizzato push e deploy. Il deploy è stato completato con la versione Cloudflare `afee073a-b42d-4f7e-8f79-0d54d3051cfe`. Le attività Search Console e le verifiche della migrazione storica restano nel Work Item 08.
