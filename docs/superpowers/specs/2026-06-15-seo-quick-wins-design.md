# Design Spec: SEO Quick Wins

Data: 2026-06-15
Stato: approvato (in attesa di revisione spec)

## Obiettivo

Applicare cinque interventi SEO puntuali emersi dall'audit del 2026-06-12, ciascuno in un commit separato. Sono fix meccanici a basso rischio su metadata, testi visibili e file di configurazione SEO. Non introducono nuove pagine né nuove funzionalità.

## Contesto

- Sito: landing page Next.js (App Router) di LabManager, deploy su Vercel, dominio `https://labmanagergestionale.com`.
- Il modulo `/ordini` è in lavorazione su `master` (commit non ancora pushati + modifiche non committate). Il Fix 1 tocca il title di `/ordini`: va applicato prima del push del modulo, così il title sbagliato non raggiunge mai la produzione.
- Decisioni dell'utente recepite in questa spec:
  - Title `/ordini`: settore-neutro ("Gestione Ordini"), per non escludere attività diverse dalla pasticceria.
  - "Gelateria": da aggiungere sia nei metadata sia nei testi visibili.
  - Esecuzione: ogni fix in un commit separato.
  - Sitemap: `lastModified` con date statiche per pagina (non `new Date()`).

## Fuori ambito

- Nuove pagine funzionalità (`/etichette-alimentari`, `/food-cost`, `/magazzino`).
- Guide/blog informazionali e pagine comparative.
- Indicizzazione di `/aggiornamenti`.
- Aggiunta di `aggregateRating` allo structured data.
- Deploy del modulo ordini in sé (separato da questo lavoro; questa spec si limita al title).

Ognuno di questi avrà, se realizzato, una spec dedicata.

---

## Fix 1 — Title pagina `/ordini`

**File:** `src/app/ordini/page.tsx`, `src/app/ordini/page.test.tsx`

Il template del layout (`src/app/layout.tsx`) applica `title.template = "%s | LabManager"`. La costante attuale `PAGE_TITLE = "Gestione ordini dei tuoi clienti - LabManager"` produce quindi un doppio brand renderizzato: *"Gestione ordini dei tuoi clienti - LabManager | LabManager"*.

**Modifica:**
- `PAGE_TITLE` diventa `"Gestione Ordini"`. Title renderizzato finale: *"Gestione Ordini | LabManager"*.

La costante `PAGE_TITLE` alimenta anche `openGraph.title`, `twitter.title` e il nodo `WebPage` dello structured data (`name`), quindi la modifica si propaga automaticamente a tutti questi punti.

**Test da aggiornare** (`src/app/ordini/page.test.tsx`):
- Asserzione su `metadata.title` (attualmente `"Gestione ordini dei tuoi clienti - LabManager"`).
- Asserzione su `name` del nodo `WebPage` (`"https://labmanagergestionale.com/ordini#webpage"`), attualmente `"Gestione ordini dei tuoi clienti - LabManager"`.

Entrambe le asserzioni diventano `"Gestione Ordini"`.

---

## Fix 2 — "Gelateria" nei metadata e nei testi visibili

**Principio:** ovunque oggi compare l'elenco settori "pasticceria, panificio e ristorante" (o varianti "…e laboratorio"), diventa "pasticceria, panificio, gelateria e ristorante" (mantenendo "laboratorio" dove già presente). L'elenco resta leggibile e grammaticalmente corretto.

**Touchpoint testi visibili:**
- `src/components/Hero.tsx`
  - Paragrafo hero: "…del tuo laboratorio di pasticceria, panificio o ristorante." → "…di pasticceria, panificio, gelateria o ristorante."
  - Blocco AI-extractable: "…è il gestionale di pasticceria, panificio e ristorante…" → "…di pasticceria, panificio, gelateria e ristorante…".
  - H1 (seconda riga): "Panificio e Ristorante" → "Panificio, Gelateria e Ristorante".
- `src/components/Footer.tsx`: "Il gestionale completo per pasticceria, panificio e ristorante…" → "…pasticceria, panificio, gelateria e ristorante…".
- `src/components/Warehouse.tsx`: H2 "Gestione magazzino per pasticceria, panificio e ristorante" → "…pasticceria, panificio, gelateria e ristorante".
- `src/components/DownloadClient.tsx`: "Il gestionale per pasticceria, panificio e ristorante: scegli Android…" → "…pasticceria, panificio, gelateria e ristorante…".
- `src/components/FAQ.tsx`: domanda "Esistono gestionali gratuiti per pasticceria, panificio o ristorante?" → "…pasticceria, panificio, gelateria o ristorante?" (si propaga al JSON-LD `FAQPage`).

**Touchpoint metadata / structured data (`src/app/layout.tsx`):**
- `description` homepage: riformulata includendo "gelateria", restando entro ~160 caratteri. Esempio target:
  *"Gestionale per pasticceria, panificio, gelateria e ristorante: ricette, costi, etichette allergeni e magazzino. Offline su Android e Windows. Prova 14 giorni."*
- `keywords`: aggiungere `"gestionale gelateria"` e `"software gelateria"`.
- `openGraph.title` / `openGraph.description` / `twitter.description`: includere "gelateria" nell'elenco settori dove presente.
- Nodi `WebSite.description` e `SoftwareApplication.description` del `structuredDataGraph`: includere "gelateria" nell'elenco settori.

**Touchpoint `/ordini` (`src/app/ordini/page.tsx`):**
- `PAGE_DESCRIPTION`: "…per pasticceria, panificio e laboratorio." → "…per pasticceria, panificio, gelateria e laboratorio."
- H1 della pagina ("Gestione ordini e piano di lavoro per pasticceria, panificio e laboratorio"): aggiungere "gelateria".
- Test associati in `src/app/ordini/page.test.tsx` che asseriscono `metadata.description` e il `name` del nodo `WebPage`/structured data sull'elenco settori vanno aggiornati di conseguenza.

**Touchpoint `public/llms.txt`:**
- Riga descrittiva iniziale (blockquote `>`): includere "gelateria" nell'elenco settori. (Il "Pubblico Target" cita già i gelatieri.)

**Nota di coerenza:** non tutte le occorrenze usano la stessa congiunzione ("e" vs "o"); preservare quella esistente in ciascun punto.

---

## Fix 3 — Accenti mancanti in `/newsletter`

**File:** `src/app/newsletter/page.tsx`

Le stringhe contengono "funzionalita" e "disponibilita" senza accento, in tre punti (`description`, `openGraph.description`, `twitter.description`).

**Modifica:** "funzionalita" → "funzionalità", "disponibilita" → "disponibilità" in tutte le occorrenze del file.

---

## Fix 4 — Sitemap con date statiche

**File:** `src/app/sitemap.ts`

Attualmente ogni voce usa `lastModified: new Date()`, che cambia ad ogni build e rende il segnale `lastmod` inaffidabile per Google.

**Modifica:** sostituire `new Date()` con date ISO letterali per pagina, riflettendo l'ultima modifica reale del contenuto di quella pagina. Aggiungere un commento nel file: la data va aggiornata a mano quando cambia il contenuto della pagina.

Valori iniziali (le pagine toccate da questo changeset assumono la data odierna):

| URL | lastModified |
|-----|--------------|
| `/` (homepage) | `2026-06-15` (modificata dal Fix 2) |
| `/ordini` | `2026-06-15` (modificata dai Fix 1 e 2) |
| `/pricing` | `2026-06-04` (non toccata da questo changeset) |
| `/newsletter` | `2026-06-15` (modificata dal Fix 3) |

Le date vanno passate come stringhe ISO (`"2026-06-15"`) o `new Date("2026-06-15")`, coerentemente con la firma `MetadataRoute.Sitemap`.

---

## Fix 5 — Robots: rimozione `Disallow: /download`

**File:** `src/app/robots.ts`

La regola `{ userAgent: "*", allow: "/", disallow: "/download" }` blocca il crawl di `/download`. La pagina ha già `robots: { index: false, follow: false }` nei suoi metadata, ma Google può leggere il `noindex` solo se il crawl della pagina non è bloccato da robots.txt. Con il `Disallow` attuale la pagina rischia di restare indicizzata come URL "cieco".

**Modifica:** rimuovere `disallow: "/download"`, lasciando `{ userAgent: "*", allow: "/" }`. Il `noindex` nei metadata della pagina basta a tenerla fuori dall'indice.

---

## Verifica

- Suite di test verde: `npm test` (Vitest). I test toccati sono quelli in `src/app/ordini/page.test.tsx` (Fix 1 e parte del Fix 2) e i test SEO esistenti (`src/app/orders-seo.test.ts`) devono continuare a passare.
- Build Next.js senza errori di tipo.
- Controllo manuale: il title renderizzato di `/ordini` non contiene più il doppio "LabManager".

## Checklist post-deploy (manuale, fuori da questo changeset)

Da eseguire in Google Search Console dopo che le modifiche sono in produzione:
- Richiesta di reindicizzazione della homepage (per superare lo snippet "gratuito durante la fase di lancio" obsoleto in cache).
- Richiesta di indicizzazione di `/ordini` (una volta deployato il modulo) e `/newsletter`.
- Re-submit della sitemap.
