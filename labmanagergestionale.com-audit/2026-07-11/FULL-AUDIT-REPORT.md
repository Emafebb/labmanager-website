# Audit SEO completo — labmanagergestionale.com

**Data:** 11 luglio 2026 · **Sito analizzato:** https://labmanagergestionale.com/ · **Tipo di business:** SaaS B2B per la gestione di pasticcerie, panifici, gelaterie, ristoranti e laboratori alimentari italiani.

## Sintesi

## SEO Health Score: 74/100

Il sito ha una base solida: HTML server-rendered accessibile ai crawler, sitemap pulita, canonical coerenti sulle pagine indicizzabili, header HTTPS robusti, immagini con testi alternativi utili e un buon file llms.txt. Il punteggio scende per un problema di sicurezza/canonicalizzazione su HTTP, LCP mobile insufficiente, una contraddizione nelle promesse sul magazzino, schema non contestuale e una presenza editoriale/di prova sociale ancora troppo limitata.

| Categoria | Peso | Punteggio |
|---|---:|---:|
| SEO tecnico | 22% | 76 |
| Qualità contenuti | 23% | 67 |
| On-page SEO | 20% | 80 |
| Dati strutturati | 10% | 68 |
| Performance | 10% | 78 |
| AI search / GEO | 10% | 70 |
| Immagini | 5% | 76 |

### Le 5 priorità

1. **Critica — forzare HTTP → HTTPS.** Il dominio HTTP restituisce ancora una pagina completa con status 200, senza redirect. Questo espone anche eventuali invii del form su una prima visita HTTP.
2. **Alta — migliorare LCP su mobile.** Tre run Lighthouse a freddo hanno misurato LCP tra 4,8 e 5,7 s su mobile.
3. **Alta — rendere coerenti le affermazioni sul magazzino.** La homepage vende soglie di riordino, FIFO, scadenze e multi-sede come disponibili; una FAQ dice che inventario avanzato, scorte e soglie sono ancora in sviluppo.
4. **Alta — correggere la semantica dello schema.** Un HowTo deprecato e non visibile è emesso globalmente, anche su pagine non pertinenti.
5. **Alta — aggiungere prove di fiducia e profondità tematica.** Mancano identità aziendale verificabile, casi cliente, testimonianze/review reali e contenuti di approfondimento indicizzabili.

## Ambito e limiti

- Crawl live dei quattro URL della sitemap: homepage, ordini, prezzi e newsletter; controllati anche i percorsi pubblici/noindex e una pagina 404.
- Verificati robots.txt, sitemap.xml, llms.txt, redirect, canonical, JSON-LD, immagini e rendering desktop/mobile.
- Lighthouse eseguito in laboratorio: i risultati CWV non sono dati di campo.
- Nessun accesso a Google Search Console, GA4, CrUX, PageSpeed API, Moz, Bing Webmaster o DataForSEO. Common Crawl non trova ancora il dominio nel proprio grafo trimestrale, quindi non è possibile attribuire un punteggio backlink affidabile.

## SEO tecnico e crawlabilità — 76/100

### Cosa funziona

- robots.txt permette il crawl e autorizza esplicitamente Googlebot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended e altri bot AI.
- sitemap.xml è valida, referenziata da robots.txt e contiene quattro URL HTTPS, tutti 200, indicizzabili e auto-canonical.
- www reindirizza in un hop all'apex HTTPS; le varianti con trailing slash usano 308 verso la forma canonica.
- Il rendering è server-side: richieste normali e Googlebot ricevono HTML completo e sostanzialmente identico.
- Sull'HTTPS sono presenti HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy e Permissions-Policy.

### Problemi

| Severità | Evidenza | Azione |
|---|---|---|
| **Critica** | http://labmanagergestionale.com/ restituisce 200 e zero redirect. HSTS non protegge una prima visita HTTP. | Configurare sul CDN/origin un redirect 301 o 308 in un solo hop, con path e query preservati, verso l'equivalente HTTPS. |
| Media | Una URL inesistente restituisce correttamente HTTP 404, ma nel markup emette sia noindex sia index, follow. | Far emettere alla pagina 404 un solo robots noindex; verificare la composizione metadata di Next.js. |
| Media | CSP contiene unsafe-inline e unsafe-eval. | Passare a nonce/hash dove compatibile; è un hardening di sicurezza, non un blocco SEO. |
| Bassa | priority e changefreq sono presenti nella sitemap ma Google li ignora. | Mantenerli solo se utili al team; aggiornare lastmod soltanto quando cambia davvero il contenuto. |

## Performance e UX — 78/100

### Dati misurati

| Misura Lighthouse lab | Mobile | Desktop |
|---|---:|---:|
| Performance score | 78–79 | 93 |
| LCP | 4,8–5,7 s | 1,7 s |
| TBT | 0 ms | — |
| CLS | 0,000 | 0,000 |

LCP mobile è l'ostacolo principale. I valori non sostituiscono CrUX/INP di campo, che non erano disponibili.

### Cause e rimedi

- Tutte e tre le immagini-device dell'hero sono precaricate; tablet e telefono restano nascosti sotto il breakpoint sm ma vengono comunque caricati. Mantenere priority solo sull'immagine LCP visibile al breakpoint corrente.
- Lighthouse stima 181 KiB di risparmio sulle immagini. Servire derivati responsive AVIF/WebP e impostare correttamente sizes/srcset o l'ottimizzazione Next/Image.
- Sono stimati 145 KiB di JavaScript inutilizzato, in particolare LegalBlink (119 KiB) e un chunk Next.js (29 KiB). Rinviare o condizionare gli script non essenziali, dove legalmente e funzionalmente possibile.
- La schermata newsletter pesa 289 KB, non ha srcset e va compressa/convertita; aggiungere anche un aspect-ratio esplicito.
- Il layout a 390 px non genera overflow orizzontale e l'headline è leggibile. Tuttavia il banner cookie, alla prima visita, copre la parte bassa dell'hero e la CTA primaria finché non viene chiuso.

## Contenuti, fiducia e conversione — 67/100

### Punti forti

- Homepage commerciale ben strutturata, con circa 2.193 parole visibili, una sola H1 chiara, screenshot originali, feature dettagliate e FAQ.
- /ordini descrive un flusso operativo credibile; /pricing mostra prezzo e trial.
- La tipologia della homepage è coerente con il campione SERP: per la query principale prevalgono landing page di software, non articoli generici.

### Problemi prioritari

| Severità | Problema | Raccomandazione |
|---|---|---|
| **Alta** | La sezione Magazzino dichiara disponibili giacenze, soglie, ricevimento merci, FIFO, scadenze e multi-sede; una FAQ dichiara ancora in sviluppo scorte, soglie e storico acquisti. | Stabilire qual è la verità di prodotto e allineare homepage, FAQ, JSON-LD, llms.txt, prezzi e note di rilascio. |
| Alta | Poche prove E-E-A-T: nessun autore/revisore nominato, credenziali, case study, recensione indipendente o prova cliente visibile. | Pubblicare identità aziendale, team/revisori competenti, testimonianze reali, casi d'uso e fonti per le affermazioni normative. |
| Media | Solo quattro URL indicizzabili; manca un hub risorse o un cluster informativo. | Mantenere la homepage per l'intento commerciale e sviluppare pagine distinte su food cost, allergeni/etichette, lotti/scadenze, ordini/produzione e bilanciamento ricette. |
| Media | Le CTA principali sono Scopri Funzionalità e Contattaci, mentre trial/prezzo/prova sono meno immediati. | Portare Prova gratis 14 giorni sopra la piega e offrire una seconda CTA contestuale verso Ordini o Prezzi. |
| Media | I title di /pricing e /ordini sono troppo generici per il loro intento. | Valutare Prezzi gestionale per pasticceria | LabManager e Gestione ordini per pasticceria | LabManager, dopo verifica SERP. |

La pagina /aggiornamenti contiene circa 2.233 parole di prova di prodotto originale ma è volutamente noindex, nofollow e canonicalizzata alla home. Non è un errore: decidere consapevolmente se trasformarla in un archivio release note indicizzabile e auto-canonical oppure mantenerla esclusa.

## On-page e architettura

- Title, meta description, H1, canonical e Open Graph delle quattro pagine della sitemap sono in generale corretti e univoci.
- /pricing ha contenuto transazionale utile ma il title Prezzi | LabManager non comunica la categoria/query.
- /ordini ha contenuto specifico e FAQ ma il title Gestione Ordini | LabManager non include il verticale pasticceria.
- Per le future pagine, separare intenti commerciali e informativi e usare link contestuali reciproci: ogni risorsa dovrebbe ricevere almeno tre link interni rilevanti.

## Schema e dati strutturati — 68/100

Il JSON-LD è sintatticamente valido sulle quattro URL analizzate e include WebSite, Organization, SoftwareApplication, FAQPage e BreadcrumbList. Le criticità sono di pertinenza, non di parsing.

| Severità | Problema | Azione |
|---|---|---|
| Alta | HowTo di installazione APK è emesso nel layout globale, non è contenuto visibile sulle pagine e appare anche su prezzi/ordini/newsletter. HowTo non è più un obiettivo valido per rich result Google. | Rimuoverlo dal layout globale. Usarlo soltanto, se necessario, su una guida di installazione visibile e dedicata. |
| Media | Un breadcrumb globale con la sola Home compare su pagine diverse; /ordini genera inoltre un secondo breadcrumb corretto. | Eliminare il breadcrumb globale dai non-home e generare WebPage/BreadcrumbList accurati e page-scoped. |
| Media | /pricing e /newsletter non hanno WebPage/BreadcrumbList specifici. | Aggiungerli solo se rispecchiano contenuto e navigazione visibili; valutare Offer page-scoped per i prezzi. |
| Info | FAQPage è valido ma i rich result FAQ Google sono limitati a siti governativi/sanitari. | Tenerlo per semantica e AI search, senza aspettative di snippet FAQ Google. |

## Immagini e visual — 76/100

- Nessuna immagine significativa senza alt text; otto immagini decorative usano correttamente alt vuoto e aria-hidden.
- I nomi file delle immagini di prodotto sono descrittivi e le tre immagini contenutistiche della home hanno dimensioni dichiarate.
- Tutte le immagini audit hanno PNG/JPEG e nessun srcset live: priorità a screenshot newsletter e hero.
- Il banner cookie è un tema UX mobile; anche il menu/link mobile da 40 × 40 px dovrebbe arrivare a 44 × 44 px.

## AI search / GEO — 70/100

### Buone basi

- robots.txt è permissivo verso i crawler AI.
- llms.txt è presente e descrive prodotto, pubblico, differenziatori, URL e contatto.
- Il contenuto è già server-rendered e facilmente estraibile.

### Opportunità

- Lo schema Organization include logo e contatto ma non sameAs verificati, ragione sociale/identificativo, indirizzo pubblico, P.IVA, data di fondazione o altri segnali forti per disambiguare il brand LabManager.
- La maggior parte del materiale citabile è costituita da FAQ e micro-copy. Servono blocchi autosufficienti e attribuiti, case study, dati originali e fonti normative quando si parla di allergeni, tracciabilità o conformità.
- Il motore di ricerca ha ancora mostrato un risultato storico su pastrylabmanager.com. Il dominio ora reindirizza correttamente al dominio auditato: monitorare la normalizzazione dell'indice, senza trattarlo come un duplicato live.
- Il server live invia text/plain senza charset per llms.txt e robots.txt, nonostante la configurazione di repository tenti di dichiarare UTF-8 per llms.txt. Allineare la configurazione Cloudflare/OpenNext in modo che la risposta pubblica usi text/plain; charset=utf-8.

## Sitemap — 96/100

La sitemap contiene esattamente le quattro URL HTTPS desiderate; tutte rispondono 200, sono auto-canonical e indicizzabili. Non sono emerse pagine chiave mancanti nel perimetro pubblico/repository attuale. Non aggiungere URL noindex, di billing o di download.

## Piano di misurazione successivo

1. Dopo il redirect HTTPS, verificare ogni variante HTTP, www e legacy con curl e Search Console.
2. Collegare Search Console e CrUX/PageSpeed per controllare LCP e INP reali dopo il rilascio delle ottimizzazioni.
3. Collegare GA4 per misurare il percorso CTA → trial → contatto.
4. Configurare Moz o Bing Webmaster per avere dominio, backlink, anchor text e trend verificabili.

## Evidenze conservate

Le cache ignorate dal repository contengono dati tecnici, contenuti, schema, performance, GEO e sitemap. Sono incluse anche le schermate desktop e mobile iniziali della homepage.
