# Design Spec: Pagina Modulo Ordini `/ordini` e richiamo in homepage

**Data:** 2026-06-12
**Stato:** Approvato

## Obiettivo

Comunicare sul sito LabManager che l'app include il nuovo modulo ordini, senza allungare eccessivamente la homepage. La soluzione prevede una pagina dedicata `/ordini`, pensata per spiegare il valore del modulo in modo commerciale e operativo, e un richiamo compatto nella home con CTA verso la pagina.

La pagina deve parlare a pasticcerie, panifici, ristoranti e laboratori artigianali che gestiscono prenotazioni, ordini cliente, ordini interni, consegne, ritiri, acconti e passaggi di lavoro tra banco, laboratorio e amministrazione.

## Fonti contenuto

Fonti lette per orientare i contenuti:

- `README.md` della documentazione Ordini nel progetto app LabManager
- `panoramica-tecnica-funzionale.md`
- `situazione-pagamenti-cliente.md`

Il changelog `v0.0.9` in `src/data/changelog.ts` resta la fonte secondaria per sintesi e wording gia pubblicato.

La pagina non deve inventare funzionalita non presenti nei documenti prodotto o nel changelog esistente.

Messaggi da rispettare:

- il nome funzionale completo e "Ordini e Piano di Lavoro";
- il modulo copre ordini cliente, ordini interni, piano lavoro, produzione collegata, report, export, notifiche e incassi ordine;
- la Situazione pagamenti cliente e una vista operativa sugli incassi degli ordini, non un modulo contabile fiscale;
- non promettere fatture, prima nota, scadenziario fiscale, credito cliente, solleciti automatici o riconciliazione bancaria.

## URL e file

- **Route dedicata:** `/ordini`
- **Pagina:** `src/app/ordini/page.tsx`
- **Richiamo homepage:** nuovo componente `src/components/OrdersPreview.tsx`
- **Composizione home:** inserire `OrdersPreview` in `src/app/page.tsx` dopo `Features` e prima di `Warehouse`
- **Navigazione principale:** aggiungere il link "Ordini" in `Navbar.tsx`, dopo "Funzionalita" e prima di "Prezzi"
- **Footer:** aggiungere il link "Ordini" nella sezione "Prodotto" di `Footer.tsx`

La pagina `/ordini` deve essere una pagina statica Next.js App Router, senza stato client se non necessario.

## Richiamo in homepage

La homepage deve ricevere una sezione breve, non una nuova landing dentro la landing.

Contenuto previsto:

- badge "Nuovo modulo"
- headline: "Ordini e piano di lavoro collegati a produzione, cassa e laboratorio"
- testo breve orientato al beneficio: ordini cliente, ritiri/consegne, acconti, produzione collegata e report
- tre punti forti:
  - ordini con cliente anagrafica o rapido, sede, data evasione, ritiro o consegna
  - collegamento a ricette, assemblaggi, lotti e piano di lavoro
  - acconti, saldo, residuo cliente e report
- CTA primaria: "Scopri il modulo ordini" verso `/ordini`

Il richiamo deve essere visibile ma compatto: una sezione full-width coerente con le altre sezioni, evitando un blocco troppo lungo.

## Pagina `/ordini`

### Hero

Il primo viewport deve comunicare subito che LabManager gestisce gli ordini.

Contenuti:

- H1: "Gestione ordini e piano di lavoro per pasticceria, panificio e laboratorio"
- sottotitolo: spiegare che gli ordini passano da richiesta cliente a lavoro di laboratorio, produzione, consegna/ritiro e incasso
- CTA primaria: "Richiedi una prova gratuita" verso `/#contatti`
- CTA secondaria: "Vedi come funziona" verso la sezione interna `#flusso-ordine`

### Flusso ordine

Sezione dedicata all'inserimento e alla lettura dell'ordine:

- cliente, telefono, sede, data e orario
- ritiro o consegna
- numero ordine progressivo leggibile, basato sulla data di evasione, nel formato operativo `ORD-DD.MM.YYYY-001`
- cliente da anagrafica oppure cliente rapido
- ordini cliente e ordini interni tra sedi
- piu righe nello stesso ordine
- note diverse per ogni riga
- allergie dichiarate, dedica, colori, decorazioni, candele e note laboratorio
- viste per giorno, settimana, mese o stato

Questa sezione deve far capire che il modulo non e solo una lista ordini, ma uno strumento operativo per organizzare il lavoro.

### Produzione collegata

Sezione dedicata al collegamento tra ordine e laboratorio:

- righe ordine collegate a ricette o assemblaggi
- produzione programmata nel piano settimanale
- piano lavoro manuale, lavori di laboratorio e produzione per scorta quando serve
- lotto produzione visibile quando disponibile
- riduzione della riscrittura manuale tra richiesta cliente e prodotto preparato
- protezioni contro doppioni o vendite manuali scollegate quando la produzione nasce da ordine

### Cassa e chiusura ordine

Sezione dedicata alla parte economica:

- ordine non pagato, con acconto o saldato
- dettaglio con acconto, residuo e stato pagamento
- scelta alla consegna tra incassare saldo o lasciare aperto
- vendita generata dall'ordine con numero ordine, cliente e sede
- dashboard cassa basata sugli incassi reali
- gestione di annulli con storno o rimborso quando l'ordine e gia incassato
- Situazione pagamenti cliente dal Report Ordini, con totale ordini, incassato netto, residuo e giorni aperto numerici
- registrazione manuale di un pagamento su un ordine con residuo, senza creare credito cliente o funzioni contabili fiscali

### Controllo operativo e notifiche

Sezione dedicata al lavoro quotidiano su piu postazioni:

- capire cosa va preparato oggi
- distinguere pronto, in ritardo, da consegnare o da ritirare
- notifiche quando arrivano o cambiano ordini importanti
- notifiche quando un ordine viene completato in laboratorio o consegnato/ritirato
- push Android e indicatori desktop Windows dove supportati
- su Windows: badge in navigazione, chip `NEW` sulle righe e suono leggero
- su Android: push OneSignal per nuovo ordine, modifica ordine, ordine completato e ordine consegnato

### Report ed export

Sezione dedicata al controllo e all'amministrazione:

- report ordini per giornata o settimana
- riepiloghi cliente
- tab Prodotti, Clienti e Sedi
- KPI operativi come ordini totali, clienti attivi, prodotti distinti e ordini completati
- controllo consegne e ritiri
- passaggio informazioni al laboratorio
- export Excel o PDF
- dati rilevanti: numero ordini, stati, clienti, prodotti, righe, sedi, totali, acconti, residui e note operative
- export con dati cliente, contatti, indirizzi, righe prodotto, note operative, acconto e residuo quando disponibili
- evitare di presentare il report come prima nota o contabilita fiscale

### CTA finale

Chiudere con una CTA chiara:

- CTA primaria "Richiedi una prova gratuita" verso `/#contatti`
- CTA secondaria "Scarica LabManager" verso `/download`

La CTA deve mantenere il tono pratico del sito: non marketing generico, ma invito a vedere come il modulo si inserisce nel lavoro reale.

## Metadata e SEO

La pagina `/ordini` deve essere una pagina indicizzabile e ottimizzata sia per motori tradizionali sia per risposte AI/LLM.

### Metadata pagina `/ordini`

La pagina deve avere metadata dedicati:

- `title`: "Gestione ordini per pasticceria e laboratorio - LabManager"
- `description`: "Gestisci ordini cliente, ritiri, consegne, acconti, produzione collegata, piano di lavoro e report con LabManager per pasticceria, panificio e laboratorio."
- `alternates.canonical`: `https://pastrylabmanager.com/ordini`
- Open Graph e Twitter card dedicati, riusando un'immagine esistente se non viene fornito un asset specifico

### Sitemap

Aggiornare `src/app/sitemap.ts` aggiungendo:

- `https://pastrylabmanager.com/ordini`
- `changeFrequency: "monthly"`
- `priority: 0.85`

La pagina `/ordini` deve avere priorita superiore a newsletter e inferiore alla home. Non aggiungere `/download`, perche e disallow in `robots.ts`.

### Structured data

Aggiungere structured data JSON-LD per rendere la pagina piu leggibile da Google e sistemi AI:

- `WebPage` con nome, descrizione, URL, lingua `it-IT`, collegamento all'organizzazione esistente
- `BreadcrumbList` con Home > Ordini
- `FAQPage` se nella pagina vengono inserite FAQ specifiche sugli ordini

Aggiornare anche lo structured data globale `SoftwareApplication` in `src/app/layout.tsx`:

- `softwareVersion`: allineare alla versione corrente del changelog, `0.0.9`
- `dateModified`: allineare a `2026-06-04`
- `releaseNotes`: citare il modulo Ordini e Piano di Lavoro invece della vecchia nota su `0.0.7`
- `featureList`: aggiungere voci su ordini cliente, ordini interni, piano di lavoro, produzione collegata, report ordini, acconti/residui e notifiche ordini

### AI SEO e contenuto estraibile

La pagina deve includere blocchi leggibili anche fuori contesto:

- un paragrafo definizione entro le prime 150 parole: "LabManager include un modulo Ordini e Piano di Lavoro..."
- sezioni con H2 formulati come query naturali, ad esempio "Come funziona la gestione ordini in LabManager?"
- almeno una lista sintetica "Cosa puoi gestire con il modulo ordini"
- FAQ finale con domande concrete:
  - "LabManager gestisce ordini con acconto e saldo?"
  - "Gli ordini possono essere collegati alle ricette?"
  - "Posso vedere gli ordini da preparare oggi?"
  - "Il report ordini esporta Excel o PDF?"
  - "La gestione pagamenti cliente e un modulo contabile?"

Le risposte FAQ devono essere brevi, autosufficienti e precise. La risposta sulla gestione pagamenti deve chiarire che e una vista operativa sugli incassi ordine, non contabilita fiscale.

### `llms.txt`

Aggiornare `public/llms.txt`:

- aggiungere il link alla pagina `/ordini` nella sezione "Informazioni Principali"
- aggiungere "Ordini e Piano di Lavoro" tra le funzionalita chiave
- includere una frase sintetica: "Il modulo ordini gestisce ordini cliente e interni, data evasione, ritiro/consegna, righe prodotto, produzione collegata, acconti, residui, report ed export."

### Robots

`src/app/robots.ts` gia consente i principali crawler AI e non richiede modifiche per questa attivita. Verificare solo che `/ordini` non sia disallow.

Keyword naturali da coprire nei testi:

- gestionale ordini pasticceria
- software gestione ordini pasticceria
- gestione ordini laboratorio
- ordini clienti pasticceria
- ordini con acconti, consegne e ritiri
- software ordini laboratorio alimentare
- piano di lavoro laboratorio pasticceria

Le keyword devono essere integrate in frasi naturali, senza ripetizioni forzate.

## Stile visivo

Seguire il sistema esistente:

- Tailwind utility classes
- colori da `src/app/globals.css`
- icone `lucide-react`
- card e sezioni coerenti con `Features`, `Warehouse` e `WhyLabManager`
- layout mobile-first

La pagina deve essere piu informativa della home, ma non deve diventare una lista changelog. Il tono deve essere commerciale, concreto e orientato ai flussi di lavoro.

## Accessibilita e responsive

- H1 unico nella pagina
- heading gerarchici ordinati
- link e CTA con testo comprensibile
- icone decorative con `aria-hidden="true"`
- card leggibili su mobile senza tabelle strette
- nessun testo sovrapposto o troppo compresso su schermi piccoli

## Test e verifica

Verifiche previste dopo implementazione:

- `npm run lint`, se disponibile nel progetto
- `npm run build`, se il tempo di build e accettabile
- controllo manuale di `http://localhost:3000`
- controllo manuale di `http://localhost:3000/ordini`
- verifica responsive desktop e mobile tramite browser

## Fuori ambito

- Non modificare il changelog `v0.0.9` salvo richiesta esplicita
- Non creare form dedicati agli ordini
- Non aggiungere immagini nuove se l'utente non fornisce screenshot o asset del modulo
- Non modificare pricing, billing o download
- Non cambiare il posizionamento generale del sito oltre al nuovo richiamo in home
