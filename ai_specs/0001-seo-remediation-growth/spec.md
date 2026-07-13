---
type: Spec
title: Rimedio SEO e coerenza commerciale di labmanagergestionale.com — fase pronta all'esecuzione
---

## Problem

L'audit SEO datato 11 luglio 2026 evidenzia interventi immediatamente eseguibili ma non ancora rilasciati: il dominio HTTP risponde con contenuto anziché reindirizzare a HTTPS, le promesse sul modulo Magazzino sono contraddittorie, il JSON-LD globale contiene markup non pertinente alle singole pagine e le CTA che promettono prova o accesso non conducono ancora in modo coerente al punto di ingresso della web app. [L1] [L2] [L3] [L4] [L6] [L10]

Il sito usa immagini non ottimizzate da Next, precarica più asset hero e carica script di consenso/accessibilità di terze parti. Le correzioni tecniche ripetibili possono iniziare senza modificare consenso o strumenti obbligatori; una misurazione di campo o un cambiamento del loro timing richiedono invece un protocollo e un owner esterni. [L5] [L7] [L9]

Il programma originario includeva inoltre fiducia pubblicabile, esperimento CTA, checkout/entitlement Stripe, crescita editoriale, osservabilità e restyling Flutter. Il committente ha autorizzato una scissione formale: questa Spec conserva soltanto il sottoinsieme con comportamento e criteri di verifica già determinati; gli altri stream sono differiti esplicitamente, senza trasformare decisioni mancanti in assunzioni. [L13]

## Proposed Outcome

LabManager rilascia un sito marketing in cui ogni navigazione HTTP `GET` o `HEAD` raggiunge l'equivalente HTTPS con un solo `308`, le richieste HTTP con altri metodi sono respinte a edge, le promesse Magazzino sono allineate a una matrice approvata e il markup globale contiene soltanto entità realmente condivise e verificabili. [L2] [L3] [L4] [L6]

La fase corregge il caricamento degli asset hero/newsletter con varianti statiche responsive, non precarica asset non candidati a LCP e garantisce touch target mobili di almeno 44 × 44 px. Non cambia il timing, il consenso o la disponibilità di LegalBlink, del widget di accessibilità o di analytics. [L5] [L7]

Le CTA che promettono prova o accesso portano direttamente a `https://app.labmanagergestionale.com`, senza pagina filtro, WhatsApp, contatto o download come destinazione primaria. Il sito resta il perimetro commerciale: non modifica registrazione, verifica email, durata della prova, checkout, Stripe o entitlement della web app. [L10] [L11] [L13]

## User Stories

1. Come visitatore che apre un URL HTTP, voglio arrivare in un solo passaggio alla stessa risorsa HTTPS, inclusi path e query, per non ricevere una navigazione iniziale in HTTP. [L2]

2. Come potenziale cliente, voglio leggere una descrizione affidabile del modulo Magazzino su ogni superficie pubblica e nel markup semantico, così posso valutare LabManager senza promesse contraddittorie. [L3] [L4]

3. Come utente mobile, voglio ricevere soltanto l'asset hero utile al mio breakpoint e usare i controlli principali con un'area adeguata, senza introdurre regressioni nel consenso o nell'accessibilità. [L5] [L7]

4. Come crawler o motore AI, voglio ricevere canonical, robots, sitemap, JSON-LD e contenuti coerenti con la pagina effettiva, così posso interpretare correttamente il sito. [L6]

5. Come potenziale cliente, voglio che una CTA etichettata come prova o accesso mi porti direttamente alla web app, così posso iniziare il percorso già approvato senza richiedere un link manuale. [L10]

## Requirements

### Fondazioni critiche

1. Configurare a edge/origin un redirect HTTP → HTTPS `308` in un solo hop per ogni navigazione `GET` o `HEAD` a `labmanagergestionale.com`, preservando esattamente path e query string. La homepage HTTP non deve mai restituire `200`. [L2]

2. Verificare il redirect live `GET`/`HEAD` su homepage, URL del form/API, URL inesistente e URL con query, controllando status iniziale `308`, `Location` esatto e un solo hop senza seguire il redirect. Ogni richiesta HTTP non-`GET`/`HEAD`, inclusi gli endpoint che ricevono body, deve essere rifiutata a edge con `400` e non inoltrata. Un redirect non certifica la riservatezza di un body già trasmesso su HTTP; HSTS da solo non protegge una prima visita HTTP. [L2]

3. Creare `src/data/magazzino-capability-matrix.ts` come matrice Magazzino v1 versionata e leggibile dai test. Ogni claim deve avere ID stabile, copy consentito, approvatore, data di approvazione e superfici obbligatorie. La matrice registra che ricevimento merci, giacenze per sede, soglie configurabili, scarico FIFO, alert scadenze e trasferimenti tra sedi sono disponibili e pubblicizzabili. Il copy canonico condiviso è: “Gestione magazzino con ricevimento merci, giacenze per sede, soglie configurabili, scarico FIFO, alert scadenze e trasferimenti tra sedi.” Ogni claim Magazzino pubblico deve corrispondere a un ID della matrice; un claim non incluso — inclusi fornitori, barcode/ricevimento, collocazioni, prelievi o altre voci del changelog — deve essere rimosso dalle superfici pubbliche oppure aggiunto soltanto con una nuova voce approvata, mai ricondotto implicitamente a una delle sei capacità. [L3] [L4]

4. Riconciliare Warehouse, Hero, FAQ e relativa FAQPage, SoftwareApplication/metadata globale, `public/llms.txt`, pricing e changelog/note di rilascio contro la matrice. I claim condivisi devono derivare dalla formulazione canonica o essere verificati esplicitamente per ID; nessuna superficie visibile o strutturata può contraddirla. [L3] [L4]

### Prestazioni, accessibilità e UX mobile

5. Usare come default varianti statiche responsive AVIF/WebP, generate e versionate nel repository, per asset hero e newsletter. La hero usa un elemento `<picture>` con `source media` per selezionare una sola variante al viewport; `sizes` completa ma non sostituisce tale selezione. Questa fase non introduce un provider/CDN immagini esterno; una scelta diversa richiede una Spec successiva. [L5]

6. Sulla hero, a viewport fino a 639 px, la variante Android è l'unico candidato LCP e l'unico asset hero precaricato; da 640 px in su il candidato e l'unico asset hero precaricato è la variante desktop. La variante tablet resta decorativa e non viene precaricata. Il Work Item verifica la selezione tramite rete browser a entrambi i viewport, non soltanto con il rendering JSDOM. [L5]

7. Inventariare nel Work Item il costo e la strategia di caricamento attuale di LegalBlink, widget di accessibilità, analytics e altri script terzi. Non rinviare, rimuovere o condizionare tali strumenti a consenso o interazione in questa fase; il cambiamento è ammesso soltanto nello stream differito con approvazione legale, funzionale e di accessibilità. [L5] [L7] [L13]

8. I controlli touch principali del sito mobile devono offrire un'area interattiva di almeno 44 × 44 px attraverso una classe/utility condivisa e verificabile, applicata almeno a menu mobile, CTA, pulsanti FAQ e controlli di consenso già presenti. Il comportamento del banner cookie negli stati iniziale, aperto e chiuso resta invariato fino all'approvazione del protocollo dedicato. [L5] [L13]

### Semantica, crawl e metadati

9. Rimuovere dal layout globale HowTo, BreadcrumbList, `Offer`/`offers` e `downloadUrl`. Conservare globalmente soltanto WebSite, Organization e SoftwareApplication con dati condivisi e verificabili; una route non deve ereditare markup che non rappresenta il suo contenuto visibile. [L6] [L10]

10. Aggiungere WebPage page-scoped corretto a `/pricing` e `/newsletter`. Aggiungere BreadcrumbList soltanto dopo avere reso visibile il breadcrumb equivalente. In questa fase rimuovere il BreadcrumbList già emesso da `/ordini`, senza introdurre una breadcrumb visibile. Non emettere Offer in questa fase: un eventuale Offer page-scoped per `/pricing` appartiene allo stream Stripe differito e deve corrispondere a piano, prezzo e condizioni verificati. [L6] [L11] [L13]

11. Conservare FAQPage dove la FAQ è visibile e coerente come supporto semantico/AI, senza promettere rich result FAQ di Google. Le risposte visibili e i valori JSON-LD devono derivare dalla stessa sorgente; le risposte che descrivono Magazzino devono usare la matrice v1. [L3] [L4] [L6]

12. Introdurre una pagina 404 esplicita e testabile che mantenga status HTTP 404, non emetta alcun tag canonical ed emetta nel documento finale una sola direttiva robots `noindex`, senza ereditare `index, follow` o una direttiva Googlebot indicizzabile dal metadata globale. [L6]

13. Non aggiungere alla sitemap URL noindex, billing o download. `/aggiornamenti` resta intenzionalmente `noindex, nofollow` ed esclusa dalla sitemap nella presente fase; nessuna modifica a canonical o indicizzazione è ammessa senza la successiva decisione editoriale. Riesaminare `priority` e `changefreq` solo come metadati opzionali del team; aggiornare `lastmod` soltanto in caso di reale modifica del contenuto. [L6] [L8] [L13]

14. Le risposte live di `llms.txt` e `robots.txt` devono dichiarare `Content-Type: text/plain; charset=utf-8`. Il Work Item assegna il requisito a un unico layer responsabile (Next/OpenNext oppure Cloudflare) e lo verifica in preview/worker e sulla risposta live, non nella sola configurazione in repository. [L6]

### Percorso di prova già approvato

15. Ogni link o azione pubblica il cui label, `aria-label` o contesto promette prova o accesso deve puntare direttamente a `https://app.labmanagergestionale.com`, senza pagina filtro. Creare `src/data/trial-access-cta-inventory.ts` come fixture di test con route, label/contesto, intento ed href atteso; deve includere almeno gli attuali inviti “Richiedi una prova gratuita”, “Inizia la prova gratis” e la risposta FAQ “Come posso provare l'app?”. WhatsApp, contatto e download possono restare percorsi di assistenza, ma non la destinazione di una CTA che promette prova o accesso. Non cambiare in questa fase gerarchia, copy, posizionamento o segmentazione delle CTA oltre quanto necessario a correggere la destinazione. [L7] [L10] [L13]

16. Il sito può descrivere il journey già approvato — registrazione nella web app, verifica email, prova di 14 giorni senza carta e avvio della prova al primo login riuscito — ma non modifica credenziali, token, durata della prova, prezzi, checkout, rinnovo o entitlement. [L10] [L11] [L13]

## Technical Decisions

1. La Spec usa esclusivamente `labmanagergestionale.com-audit/2026-07-11/` come baseline di audit. Il vecchio audit non datato non va fuso nella valutazione perché contiene priorità e misure non equivalenti. [L1]

2. Il redirect HTTP → HTTPS è una dipendenza di Cloudflare/edge/origin: il repository non contiene middleware, `redirects()`, regola di redirect o route di infrastruttura che possa da sola soddisfare il requisito. Il committente possiede l'accesso Cloudflare; la policy approvata è `308` per `GET`/`HEAD` e rifiuto `400` senza inoltro per ogni altro metodo HTTP. [L2]

3. La matrice Magazzino v1 approvata dal committente il 13 luglio 2026 è la sorgente di verità per tutte le promesse pubbliche. Il modulo dati versionato conserva ID, copy e superfici; un claim non mappato non è pubblicabile finché non riceve una voce approvata. Il changelog può essere evidenza, non autorità sullo stato di prodotto. [L3] [L4]

4. Il JSON-LD globale rimane limitato a entità condivise e verificate. HowTo, breadcrumb, WebPage, FAQPage e Offer sono emessi soltanto dalla route che rende il relativo contenuto; un BreadcrumbList richiede il breadcrumb visibile corrispondente. In questa fase `/ordini` non emette BreadcrumbList perché non rende tale navigazione visibile. [L6]

5. Con `images.unoptimized: true`, il fallback tecnico approvato è servire asset responsive statici già generati e versionati nel repository. `sizes` da solo non sostituisce asset appropriati o il controllo del preload. [L5]

6. Il sito marketing e la web app sono confini distinti: il sito corregge esclusivamente i collegamenti CTA verso `https://app.labmanagergestionale.com`; la web app possiede registrazione, verifica email, orologio della prova e stato dell'abbonamento. Il ritorno del browser dal checkout non è prova di entitlement. [L10] [L11]

7. La presente Spec è la fase pronta all'esecuzione del programma: fiducia pubblicabile, esperimento CTA, Stripe live/entitlement, architettura contenuti, protocollo mobile e budget Lighthouse, measurement readiness e restyling auth Flutter sono stream distinti e differiti. Le loro decisioni già registrate restano vincoli per le Spec successive. [L5] [L7] [L8] [L9] [L11] [L12] [L13]

## Testing Strategy

1. Estendere i test Vitest/Testing Library esistenti usando `orders-seo`, `ordini/page` e billing come seam: importare metadata e grafi JSON-LD esportati, verificare l'assenza di HowTo, BreadcrumbList, `Offer`/`offers` e `downloadUrl` dal grafo globale, l'assenza di BreadcrumbList da `/ordini`, e l'assenza di `Offer`/`offers` anche da `/pricing` e da ogni altra route in questa fase. Verificare inoltre WebPage/robots/sitemap/contenuto `llms.txt` per route. [L6]

2. Testare `src/data/magazzino-capability-matrix.ts` come fixture di verità e verificare la coerenza fra Warehouse, Hero, FAQ/FAQPage, SoftwareApplication, pricing, changelog e `llms.txt`; ogni claim Magazzino pubblico deve riferire un ID della matrice. La stessa suite deve controllare che FAQ visibile e FAQPage derivino dalla stessa sorgente. [L3] [L4] [L6]

3. Aggiungere una pagina 404 esplicita con un test di metadata/documento e un controllo preview/live che verifichi status 404, assenza completa di tag canonical, una sola direttiva `noindex`, e assenza di `index, follow` e di direttive Googlebot indicizzabili. [L6]

4. Aggiungere test di rendering/accessibilità che verifichino: l'uso di `<picture>` e delle sue sorgenti statiche responsive; la fixture CTA `trial-access-cta-inventory`; e l'applicazione della utility touch condivisa ai controlli previsti. Eseguire inoltre un controllo browser/network a 390 px e 640 px che provi rispettivamente il solo preload Android e il solo preload desktop, e un controllo browser delle aree interattive minime. Nessuna CTA inventariata di prova/accesso può puntare a WhatsApp, contatto o download. [L5] [L10]

5. Eseguire `npx vitest run`, `npm run lint` e `npm run build` per ogni Work Item che modifica codice o contenuti renderizzati. Per configurazione OpenNext/Cloudflare, route runtime o header, eseguire anche `npx opennextjs-cloudflare build`. [L1] [L6]

6. Documentare nel Work Item l'evidenza manuale di preview/worker e live: comandi, data/ambiente, URL, metodo, status iniziale e `Location` per redirect HTTP; risultato `400` e assenza di inoltro per metodi non `GET`/`HEAD`; status/robots/canonical della 404; e content type effettivo di `llms.txt` e `robots.txt`. [L2] [L6]

## Out of Scope

- Esperimento che renda la prova la CTA primaria: provider, varianti, segmenti, consenso, eventi, baseline, metrica, finestra e rollback. [L7] [L9] [L13]
- Configurazione Stripe live, Price ID, dati di fatturazione, bollo, checkout, webhook, entitlement e relativi test di integrazione. [L11] [L13]
- Restyling di login, registrazione, recupero password e verifica email/token nel repository Flutter. [L12] [L13]
- Pubblicazione di identità, `sameAs`, team/revisori, testimonianze, case study, fonti normative o `aggregateRating`; non pubblicare comunque claim, recensioni o rating non reali e non autorizzati. [L7] [L13]
- Nuove pagine del cluster, modifica dei title dopo ricerca SERP, mappa intent/URL, o una modifica editoriale/indexabile di `/aggiornamenti`. [L8] [L13]
- Modifica del comportamento del cookie banner o del timing/caricamento di LegalBlink, widget di accessibilità e analytics; protocollo mobile completo, budget Lighthouse e dichiarazioni CWV di campo. [L5] [L7] [L9] [L13]
- Measurement readiness, accessi Search Console/CrUX/PageSpeed/GA4/Moz o Bing Webmaster, hardening CSP, monitoraggio legacy e IndexNow. [L9] [L13]
- Nuove funzionalità Magazzino, qualunque modifica del comportamento auth/billing della web app, URL noindex/billing/download nella sitemap, o un futuro piano Light non approvato. [L3] [L11]

## Follow-Ups

1. Approvare asset di identità, profili verificati, team/revisori, casi cliente e recensioni prima di uno stream fiducia. [L7]

2. Definire il contratto dell'esperimento CTA: provider, assegnazione, eventi/parametri consent-safe, baseline, finestra, metrica e rollback. [L5] [L7] [L9]

3. Completare il contratto Stripe: Price ID mensile/annuale, dati di fatturazione, bollo, ambiente di test, webhook/stato backend e seam controllato per prova, checkout ed entitlement. [L11]

4. Decidere se `/aggiornamenti` resta noindex oppure diventa un archivio auto-canonical e indicizzabile. [L8]

5. Approvare la mappa intent/URL e le fonti/revisori del cluster prima di creare o ampliare risorse editoriali. [L8]

6. Definire protocollo mobile per stati consenso iniziale/aperto/chiuso, viewport/rete/cache/run, criterio CTA e budget Lighthouse. [L5]

7. Nominare l'owner della measurement readiness, approvare gli eventi consent-safe e conservare baseline/report prima di dichiarare risultati esterni. [L7] [L9]

8. Selezionare la direzione visiva auth e poi creare una Spec Flutter separata, con fake di servizi/navigazione e test widget/golden o integrati. [L12]

## Notes

- Fonti di requisito: `labmanagergestionale.com-audit/2026-07-11/ACTION-PLAN.md` e `labmanagergestionale.com-audit/2026-07-11/FULL-AUDIT-REPORT.md`.
- Contesto implementativo: Next.js App Router, Cloudflare Workers/OpenNext, `images.unoptimized: true`, Vitest/Testing Library e JSON-LD per-route già presente in `/ordini`.
- Baseline verificata durante il refinement: `npx vitest run` (23 test), `npm run lint` e `npm run build` passano.
- Il codice della web app resta nel repository distinto `/Users/emanuele/Documents/github/Labmanager`; non è oggetto di modifiche in questa fase.
