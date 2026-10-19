# Handoff per le pagine LabManager per aree di lavoro

19 ottobre 2026. Continuare in italiano nel repository `/Users/emanuele/Documents/github/labmanager-website`.

> **Handoff storico, lavoro completato.** Dopo questo documento il committente ha aggiunto Strumenti e calcolatori e approvato cinque pagine autonome. Implementazione e successive correzioni sono registrate in [pagine-aree-di-lavoro.md](pagine-aree-di-lavoro.md). La prossima conversazione riguarda il footer: [handoff-footer.md](handoff-footer.md). Il testo seguente conserva il contesto iniziale e non descrive lo stato corrente.

## Obiettivo della sessione separata

Costruire una famiglia coerente di pagine di approfondimento per aree di lavoro. La homepage presenta la visione complessiva; ogni pagina spiega un problema operativo, il flusso nel prodotto e le funzioni che lo sostengono. Evitare una pagina per ogni singola funzione e le pagine che ripetono soltanto il catalogo della home.

L’utente ha richiesto questo handoff dopo aver discusso lo squilibrio di una pagina dedicata soltanto a Ordini. La sessione originaria continua con la verifica del sito attuale: coordinarsi prima di modificare file condivisi e non sovrascrivere le correzioni che potrebbero arrivare nel frattempo. Questo handoff non avvia qui la costruzione delle nuove pagine.

## Famiglia proposta come base del lavoro

| Area | Contenuto |
| --- | --- |
| Ricette e Food Cost | Formulazione, bilanciamento, assemblaggi, costi e margini. Prima nuova pagina suggerita: rende chiaro da dove nasce il valore del prodotto. |
| Produzione e Magazzino | Preparazioni, lotti, giacenze, scadenze e collegamenti fra produzione e disponibilità. |
| Ordini e Piano di lavoro | Richieste, organizzazione, preparazione, ritiro e consegna. Conservare la pagina e l’URL `/ordini`, rivedendoli come parte della famiglia. |
| Etichette e Libro ingredienti | Composizione, allergeni, informazioni nutrizionali, assortimenti e documenti. |

I raggruppamenti sono la proposta discussa, non una nuova tassonomia normativa dell’app. Risolvere l’eventuale sovrapposizione fra le aree prima di scrivere le pagine. Gli URL delle nuove pagine e il dettaglio della navigazione non sono ancora definiti. L’idea di navigazione è raccogliere le quattro aree sotto “Funzionalità”, con pari visibilità, evitando che Ordini resti l’unico approfondimento in testata.

## Identità e contenuti da conservare

- Leggere `AGENTS.md` e `CLAUDE.md`. La richiesta più recente di identità prevale sui riferimenti vecchi: usare `design/brandkit/brand.css` e `design/brandkit/preview.html`, direzione **Traccia**.
- Bosco `#223d32`, avorio `#f5f1e8`, salvia `#b8c7b6`, ambra `#f7b52b`, bianco. Comandi bosco con testo bianco; ambra come accento decorativo.
- Manrope locale 400/600/700 per testo, comandi e dati; Fraunces locale 400 per titoli brevi. Asset distribuiti in `public/brandkit/`, licenze incluse. Logo originale invariato. Pattern originale ai margini, senza coprire dati o testi.
- La narrazione editoriale e il selettore per mestiere sono già implementati: non ripartire da un nuovo redesign. `.taste-skill/direction.json` conserva seed originario 1228958381 e l’override del brandkit; nessuna nuova estrazione di palette/font.
- Pubblico: laboratori artigianali alimentari. Pasticcerie, panifici e gelaterie sono esempi, non il perimetro esclusivo. Non inventare clienti, testimonianze, numeri commerciali o garanzie normative.
- La ricetta collega il lavoro tecnico a costo, produzione, informazioni del prodotto e ordini. Spiegare questi passaggi con parole del mestiere, senza inventare automatismi o collegamenti non verificati.

`DESIGN.md`, parti di `CLAUDE.md` e i precedenti brief in `.impeccable/surfaces/` descrivono ancora l’identità indaco/DM Sans e una composizione precedente: non ripristinarle. La loro riconciliazione non è stata ancora svolta. `.impeccable/config.json` contiene eccezioni mirate per il brandkit confermato; non disattivare i controlli in blocco.

## Fonti del prodotto e screenshot

Partire da `.taste-skill/feature-evidence.md` e `src/data/product-features.ts`. I sorgenti dell’app in `/Users/emanuele/Documents/github/Labmanager/lib` sono consultabili in sola lettura; la presenza del codice su un branch non prova il rilascio. Non modificare quel repository.

L’utente ha confermato che **Libro ingredienti è già disponibile**. Distinzione già riportata sul sito: Light include assortimenti e consultazione; Plus aggiunge generazione e storico PDF. La voce dell’app è più recente del manifesto commerciale versionato del sito: conservare il manifesto e la nota di evidenza, senza aggiornarne arbitrariamente i dati.

Schermate reali scelte dall’utente: **Food Cost, Ordini, Libro ingredienti**. Non sono ancora state fornite. Chiederle con dati dimostrativi quando servono; possono arrivare una alla volta. Non fabbricare UI e non catturare account autenticati senza un target chiaro. Non presentare le quattro immagini editoriali AI come screenshot del prodotto. Provenienza e cover social in `.taste-skill/asset-report.md`.

## Struttura minima di ciascuna pagina

1. Un’apertura che dica per chi è utile l’area e quale lavoro aiuta a svolgere, con un’azione chiara verso la prova.
2. Un flusso concreto di pochi passaggi, sostenuto dalle funzioni reali. Gli esempi dimostrativi vanno riconoscibili come tali.
3. Prove visive fedeli al prodotto quando disponibili; in loro assenza non simulare una schermata autentica e non lasciare sezioni vuote.
4. Condizioni Light/Plus e limiti pertinenti, desunti dalle fonti commerciali o dalle eccezioni di rilascio verificate.
5. Collegamenti alle altre aree quando il lavoro prosegue altrove, al confronto prezzi e alla prova.

Definire l’argomento specifico di ogni pagina prima di implementarla. Nessuna nuova promessa commerciale per riempire sezioni. Le FAQ devono rispondere a domande reali e non duplicare automaticamente quelle della homepage.

## Punti di integrazione

- Homepage e composizione: `src/app/page.tsx`; sezioni autonome in `src/components/`.
- Navigazione: `src/components/Navbar.tsx`, `Footer.tsx`; mantenere il funzionamento di `/#funzionalita`, `/#contatti` e `/ordini#flusso-ordine`.
- Stile condiviso: `src/app/globals.css`. Lavorare sui componenti e sui token già presenti, senza duplicare un secondo sistema visivo.
- CTA e prezzi: `src/data/trial-access-cta-inventory.ts`, `src/lib/pricing.ts`, `config/commerciale/manifesto-commerciale.v1.json`. Prova Plus 14 giorni; registrazione nell’app, pagamento e gestione del piano nell’app. Non modificare prezzi o condizioni.
- SEO: metadata per route, canonical e dati strutturati in `src/app/layout.tsx`, `src/app/sitemap.ts`, `public/llms.txt` e test di contratto. Le nuove pagine richiedono contenuto autonomo e collegamenti interni coerenti; nessuna pubblicazione è implicita nell’implementazione.
- Homepage: popup newsletter ripristinato al 50% scroll, pausa 7 giorni e esclusione iscritti; dialogo nativo e modulo condiviso. WhatsApp fisso con etichetta in basso a destra, scelto dall’utente; non sovrapporlo al comando di accessibilità.
- API, consensi, trasporto HTTPS e risorse Cloudflare esistenti rimangono vincoli: non occorre modificarli per creare pagine editoriali.

## Stato del workspace e verifiche

Il redesign e il riallineamento sono locali, su un working tree con molte modifiche. Non risultano commit, push o deploy eseguiti per questo lavoro. Verificare branch, HEAD e stato prima di intervenire. Non fare reset, clean, staging esteso o commit di file di altre sessioni. Preferire isolamento se il lavoro procede in parallelo.

Evidenze più recenti al momento dell’handoff: 103 test Vitest e 3 controlli Node commerciali passati; build, TypeScript e lint mirato passati. `verification/popup-*` documenta anche il popup e WhatsApp a 1440/768/390/320, inclusa viewport 320 × 568. `verification/brandkit-*` e `brandkit-final/` documentano il riallineamento. `.taste-skill/brief.md` è il registro di continuità; il report `.taste-skill/verifica-tutte-le-pagine.md` va letto prima di modificare le stesse superfici. Contiene rilievi responsive e documentali ancora da correggere, oltre alla copertura della verifica delle dodici superfici.

Non assumere che processi o server locali siano ancora attivi. Il collaudo finale del popup è stato svolto sulla build di produzione locale; il server dev osservato non idratava i componenti e non costituiva accettazione funzionale. Nessun modulo è stato inviato realmente; nessuna iscrizione, pagamento o messaggio WhatsApp è stato eseguito. CMP sul dominio reale, recapito email e cache social non sono stati collaudati dal redesign.

Per ogni nuova pagina verificare layout desktop/tablet/mobile, tastiera, gerarchia dei titoli, link, prezzi, CTA e contratti SEO. Riportare separatamente implementato, verificato, committato e pubblicato. Commit e pubblicazione richiedono istruzioni esplicite.
