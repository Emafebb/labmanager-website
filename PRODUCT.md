# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Il sito si rivolge a **laboratori artigianali alimentari italiani**, in particolare
pasticcerie, panifici e gelaterie.

La valutazione avviene a **due voci**, ed entrambe devono trovare risposta sulla stessa pagina:

- **Il titolare** decide e paga. Valuta costo, rischio, tempo di adozione e ritorno.
  Spesso arriva da telefono, fuori dall'orario di laboratorio.
- **Il capo laboratorio / chi lavora in produzione** dà il giudizio tecnico: le ricette,
  il bilanciamento, le etichette e gli allergeni devono reggere l'uso reale. Il suo veto
  blocca l'acquisto anche quando il titolare è convinto.

Un pubblico secondario (gastronomie, ristoranti, chef) compare oggi in alcuni metadati:
vedi *Perimetro del pubblico* tra le decisioni aperte.

## Product Purpose

LabManager è il gestionale che copre l'intero flusso del laboratorio: dalla ricetta
e dal food cost fino alla produzione, alle etichette, al magazzino e agli ordini.

Il **sito** (`labmanagergestionale.com`) è la superficie di acquisizione. Il suo successo
si misura su una sola azione: **la registrazione alla prova gratuita di 14 giorni** su
`app.labmanagergestionale.com`. Contatto WhatsApp, form contatti e newsletter esistono e
restano disponibili, ma sono percorsi di ripiego per chi non è ancora pronto a registrarsi —
non obiettivi paritari. Scelta del piano e pagamento avvengono nell'app autenticata,
mai sul sito.

## Positioning

Non un gestionale generico adattato al cibo, ma un software costruito sul flusso reale
del laboratorio artigianale: la ricetta è l'unità di partenza, e da lì discendono costo,
margine, composizione, etichetta, produzione, giacenza e ordine.

Il meccanismo che un prodotto vicino non potrebbe copiare senza rifarne l'impianto:
**il bilanciamento della composizione** (zuccheri, grassi, proteine, lattosio, solidi,
acqua, con range target per tipo di preparazione) collegato allo stesso archivio ricette
che genera food cost, tabelle nutrizionali ed etichette con allergeni. Un gestionale
generico calcola i costi; un software di settore fa una parte del percorso. LabManager
tiene insieme la catena tecnica e quella economica sullo stesso dato.

## Operating Context

- **Il laboratorio è un ambiente ostile al software**: mani occupate, superfici bagnate,
  turni che iniziano di notte. Il WiFi spesso non arriva dove si lavora davvero.
- **La valutazione non avviene in laboratorio.** Il sito viene letto la sera, da telefono,
  o al gestionale in ufficio — non tra un'infornata e l'altra.
- **Documenti e adempimenti reali** fanno parte del lavoro: etichette alimentari con
  allergeni, tabelle nutrizionali, DDT, lotti e tracciabilità, scadenze.
- **Punto di partenza tipico**: fogli Excel, quaderni, schede ricetta cartacee. Il
  confronto competitivo pesa meno della paura del cambiamento e del tempo di migrazione.
- **Mercato**: Italia, lingua italiana, prezzi in EUR.

## Capabilities and Constraints

### Offerta commerciale

Fonte di verità unica: `config/commerciale/manifesto-commerciale.v1.json`, esposta al codice
tramite `src/lib/pricing.ts`. Nessuna superficie deve scrivere prezzi o contenuti dei piani
a mano.

| | Light | Plus |
|---|---|---|
| Mensile | €19,99 | €44,99 |
| Annuale | €200 | €480 |
| Sessioni attive simultanee | 2 | 3 |
| Quote AI giornaliere (ricette / DDT) | 5 / 0 | 15 / 15 |
| Supporto | Email standard | Prioritario (annuale: + sessione iniziale e di revisione) |

- **Light** include: ricette e archivio, confronto ricette, food cost della ricetta,
  bilanciamento, ingredienti e semilavorati, assemblaggi, tabelle nutrizionali, etichette e
  storico, tools di laboratorio, team e dipendenti, PIN/ruoli/permessi, impostazioni e
  gestione abbonamento.
- **Plus** aggiunge: registro produzione, ordini e piano di lavoro, vendite, dashboard costi
  aziendali, magazzino e DDT.
- Esportazioni illimitate su entrambi i piani, senza watermark e senza contatore.
- Costo di attivazione: zero.
- **Prova gratuita: 14 giorni con tutte le funzionalità Plus, senza carta.** Al termine si
  sceglie il piano nell'app. Disdetta libera; in caso di cancellazione l'accesso resta
  attivo fino alla scadenza del periodo pagato.

### I quattro pilastri (contenuto)

Ricette e Food Cost · Produzione ed Etichette · Magazzino · Ordini e Piano di Lavoro.

### Claim approvati sul Magazzino

Copy canonico in `src/data/magazzino-capability-matrix.ts`, da non riformulare:
ricevimento merci, giacenze per sede, soglie configurabili, scarico FIFO, alert scadenze,
trasferimenti tra sedi.

### Vincoli tecnici

- Next.js App Router su **Cloudflare Workers** (`@opennextjs/cloudflare`), Worker
  `labmanager-website`. Bundle compresso entro 3 MiB (piano Workers Free).
- `images.unoptimized` è una scelta deliberata: tutte le immagini sono locali e statiche.
  Abilitare Cloudflare Images ha implicazioni di costo e di zona — non modificare senza
  conferma esplicita.
- Header di sicurezza e CSP centralizzati in `next.config.ts`. Le origini di terze parti
  ammesse sono LegalBlink (cookie consent), TabNav (accessibilità) e Meta Pixel.
- I contratti SEO sono verificati da test (`metadata-contracts.test.ts`,
  `route-structured-data.test.tsx`, `crawl-contracts.test.tsx`, `orders-seo.test.ts`):
  metadata, canonical e JSON-LD sono trattati come fonte di verità, non come snapshot.
- Le CTA verso trial e accesso sono inventariate in
  `src/data/trial-access-cta-inventory.ts` — le nuove superfici attingono da lì.
- `pastrylabmanager.com` è il **dominio storico**: reindirizza in modo permanente a
  `labmanagergestionale.com` e non deve mai comparire come sito separato nei risultati.

### Superfici esistenti

Home, `/pricing`, `/ordini`, `/newsletter`, `/aggiornamenti` (changelog noindex, per utenti
esistenti), `/instagram` (landing autonoma, esclusa da `SiteScripts`), `/account/billing`,
`/billing/success`, `/billing/cancel`.

### Decisioni aperte (da non dare per risolte)

- **Perimetro del pubblico — non deciso.** `GLOSSARY.md` prescrive di evitare "ristoranti"
  come categoria target e di tenere Android, Windows e PWA fuori dai contenuti di
  acquisizione. La meta description della home cita però "gastronomie, ristoranti e chef",
  e i componenti `WhyLabManager.tsx` e `Platforms.tsx` (oggi **non importati** in
  `src/app/page.tsx`) parlano di app Android e desktop Windows e includono i ristoranti tra
  i destinatari. Finché la questione non è risolta, il lavoro futuro non deve né allargare
  né restringere il perimetro di propria iniziativa.
- **Piano Light**: il nome è riservato e distinto dal piano completo; sul sito è già
  presentato come piano vendibile insieme a Plus.

## Brand Commitments

- **Nome**: LabManager. Dominio canonico `labmanagergestionale.com`.
- **Lingua**: italiano, sempre. Nessuna superficie multilingua.
- **Terminologia vincolante**: `GLOSSARY.md` è normativo. In particolare — "web app" (non
  "app web" né "portale di registrazione"); "accesso via browser" (non "PWA" quando si
  descrive solo il modo di accedere); "Accedi" come CTA per chi ha già un account (non
  "Area riservata"); "laboratori artigianali alimentari" come definizione del pubblico;
  "Food Cost" come nome del pilastro; "Aggiornamenti" per il changelog, distinto dalla
  newsletter; "sessioni attive simultanee" (non "due dispositivi").
- **Voce**: concreta e tecnica, mai gergo da startup. Il lettore riconosce il proprio
  mestiere nelle parole usate (bilanciamento, semilavorati, DDT, scarico FIFO, allergeni).
- **Asset esistenti**: logo (`public/images/logo.png`, `src/components/BrandLogo.tsx`),
  screenshot di prodotto reali su telefono, tablet e desktop, immagini OG per home e pricing.
- **Contatti pubblici**: `labmanager.info@gmail.com`, WhatsApp `+39 350 042 4228`, Instagram.

## Evidence on Hand

**Reale e utilizzabile:**

- Screenshot autentici del prodotto in `public/images/` (Android, tablet in produzione,
  desktop, bilanciamento ricette, dashboard newsletter), serviti in AVIF/WebP responsive
  tramite `src/data/responsive-images.ts`.
- Il listino completo e verificabile del manifesto commerciale.
- Il changelog di prodotto in `src/data/changelog.ts`.

**Assente — non inventare.** Ad oggi non esistono testimonianze, recensioni citabili,
case study, loghi di clienti, né metriche pubblicabili (numero di laboratori, ricette
gestite, anni di attività). La dimostrazione disponibile è **il prodotto stesso**: il lavoro
futuro costruisce la fiducia mostrando il software che lavora su dati reali, non
fabbricando prova sociale. Numeri, citazioni e loghi vanno introdotti solo quando l'utente
fornisce materiale vero.

## Product Principles

1. **La ricetta è il centro di gravità.** Ogni funzione si spiega meglio partendo dalla
   ricetta e mostrando cosa ne discende: costo, margine, composizione, etichetta,
   produzione, giacenza, ordine. Elenchi di feature scollegati dal flusso tradiscono il
   prodotto.
2. **Convincere due lettori nello stesso spazio.** Il titolare cerca costo, rischio e
   tempo di adozione; il capo laboratorio cerca profondità tecnica. Una superficie che
   soddisfa uno solo dei due non converte.
3. **Il prodotto è la prova.** In assenza di prova sociale, la credibilità si guadagna
   mostrando schermate vere e numeri veri del listino — mai claim generici o metriche
   inventate.
4. **Una sola azione di successo.** Ogni superficie di acquisizione porta alla prova
   gratuita di 14 giorni. Contatto e newsletter restano disponibili senza competere
   visivamente con la CTA primaria.
5. **Il lessico del mestiere non si semplifica.** La terminologia del glossario è parte
   della credibilità: parlare come chi lavora in laboratorio vale più di parlare come
   un software.

## Accessibility & Inclusion

**WCAG 2.1 AA come soglia minima interna** (obiettivo dichiarato, non obbligo normativo
formalizzato). Il sito integra già il widget di accessibilità TabNav e una utility
`.touch-target` per le aree di tocco.

Requisiti di contesto reale: lettura prevalentemente da telefono, spesso a fine giornata e
in condizioni di luce variabile; utenti non tecnici, di età eterogenea. Dimensioni di tocco
generose, contrasto reale sui testi secondari e leggibilità su schermo piccolo non sono
rifiniture opzionali su questo prodotto.
