# Verifica di tutte le pagine LabManager

19 ottobre 2026. Verifica della build di produzione locale su `http://127.0.0.1:3001`, riferita al working tree del redesign e del riallineamento Traccia. Nessuna modifica ai file dell’app in questo passaggio: sono stati prodotti handoff, script, misurazioni e acquisizioni.

## Esito

Il sito mantiene un sistema visivo coerente con il brandkit, i contratti commerciali e i percorsi principali funzionano. Non sono emersi blocchi P0 o problemi maggiori P1 nelle prove effettuate. Restano **4 rilievi P2 e 1 P3**, descritti sotto. I risultati non costituiscono una certificazione WCAG né un collaudo del sito pubblicato.

Integrità dell’implementazione: **superata con rilievi documentali**. Palette Bosco/Avorio/Salvia/Ambra, font locali Manrope/Fraunces, immagini dichiarate editoriali AI, CTA tratte dall’inventario e prezzi dal manifesto sono coerenti. Il rilevatore conserva 13 avvisi consultivi sulle dimensioni tipografiche confrontate con il vecchio `DESIGN.md`; non sono stati trattati come regressioni del brandkit né soppressi in blocco.

| Dimensione | Valutazione interna | Evidenza e limite |
| --- | --- | --- |
| Accessibilità | 3/4 | Etichette e riferimenti ARIA verificati, tastiera e dialogo nativo provati, campionamento contrasto senza errori; alcuni target sotto il nostro obiettivo di 44 px. Nessun collaudo con screen reader reale. |
| Prestazioni | 3/4 | Asset locali e layout stabili nelle prove; immagine LCP della newsletter ancora lazy. CWV sul dominio reale e rete lenta non misurati. |
| Responsive | 3/4 | 48 configurazioni iniziali senza overflow; conferma del modulo contatti con 4 px di overflow a 320 px e sovrapposizione WhatsApp nel footer mobile. |
| Tema | 3/4 | Brandkit applicato coerentemente; i documenti normativi del design devono ancora recepirlo. Il tema scuro non è un requisito di questo sito. |
| Integrità | 3/4 | Contratti, link e flussi passano; documentazione precedente incoerente con il brand confermato. |
| **Totale** | **15/20** | **Buono, con correzioni mirate. Valutazione interna e locale.** |

## Copertura delle pagine

Ogni superficie è stata aperta a **1440 × 900, 768 × 1024, 390 × 844 e 320 × 568**. Acquisite e riviste apertura, metà pagina e fondo a 1440 e 390. Si tratta di campioni visivi lungo la pagina, non di una lettura fotografica di ogni riga del changelog.

| Pagina | HTTP | Risultato |
| --- | --- | --- |
| `/` | 200 | Contenuti e interazioni verificati. Rilievi comuni alla testata, footer con WhatsApp e conferma del modulo contatti. |
| `/pricing` | 200 | Prezzi mensili/annuali, confronto, link e metadati coerenti. |
| `/ordini` | 200 | Flusso, dettagli, link e ancora storica presenti. |
| `/newsletter` | 200 | Modulo, consenso, errore/nuovo tentativo/conferma simulati; noindex presente. Immagine LCP lazy da ottimizzare. |
| `/download` | 200 | Link ai pacchetti presenti, guida interattiva funzionante, noindex presente. Nessun pacchetto scaricato o installato. |
| `/instagram` | 200 | Link principali e versione mobile coerenti; pagina autonoma noindex. Le destinazioni canoniche interne sono state confrontate con le corrispondenti pagine locali. |
| `/aggiornamenti` | 200 | Cronologia leggibile, struttura e fondo controllati, noindex. Nessuna nuova attestazione delle date o dei rilasci storici. |
| `/billing/success` | 200 | Presentazione e link verificati; noindex. Nessun pagamento eseguito. |
| `/billing/cancel` | 200 | Presentazione, ritorno al sito/prezzi e link verificati; noindex. |
| `/account/billing` | 200 | Presentazione e contatti verificati; noindex. Nessuna modifica a un abbonamento. |
| URL inesistente | 404 | Pagina di errore corretta, ritorno alla homepage, noindex. |
| `/api/unsubscribe` senza token | 400 | Errore di link non valido, stile e ritorno al sito verificati. Nessuna disiscrizione effettuata. |

Per gli stati iniziali: nessun overflow rilevato, nessuna immagine rotta, nessun controllo senza etichetta, nessun ID duplicato o riferimento ARIA mancante. Il campionamento automatico del contrasto non ha rilevato errori. La conferma del modulo contatti è stata provata separatamente e presenta l’eccezione indicata nel rilievo 1.

## Rilievi verificati

### 1. P2 Conferma del modulo contatti troppo larga a 320 px

- **Posizione:** `src/app/globals.css:695`, `.form-success`; `src/components/ContactForm.tsx:75`.
- **Categoria:** Responsive.
- **Riproduzione:** nella homepage, compilare il modulo con dati dimostrativi e consenso, quindi simulare una risposta 200 dell’API. Alla larghezza richiesta di 320 px il documento ha `clientWidth=320` e `scrollWidth=324`; il pannello di conferma termina a x=323,94. Alle altre tre larghezze provate la conferma rientra.
- **Impatto:** lieve scorrimento orizzontale dopo il successo; il caso non emerge controllando soltanto il modulo vuoto.
- **Correzione proposta:** ridurre il minimo intrinseco del pannello e verificare insieme titolo, padding e pulsante “Invia un altro messaggio”. Non mascherare il difetto con overflow nascosto sull’intera pagina.
- **Evidenza:** `verification/all-pages-forms.json`, `all-pages/contact-form-success-320.jpg`.
- **Comando suggerito:** `$impeccable adapt`.

### 2. P2 WhatsApp copre parte della nota finale del footer

- **Posizione:** `src/app/globals.css:705`, `.site-footer`; `src/app/globals.css:1748`, `.whatsapp-float`.
- **Categoria:** Responsive / Accessibilità.
- **Riproduzione:** homepage a 390 × 844, popup chiuso con il suo pulsante reale, scorrimento fino alla fine del documento. WhatsApp occupa y=780–828; la prima riga della nota sulle immagini AI occupa y=770,88–789,88 e interseca il pulsante. `atDocumentEnd=true`: non c’è altro spazio di scorrimento per liberare quella riga.
- **Impatto:** parte della nota di provenienza delle immagini resta coperta. In altre posizioni il pulsante può anche sovrapporsi ai link del footer.
- **Correzione proposta:** riservare sufficiente spazio finale nella homepage per il pulsante fisso, mantenendo la distanza dal comando di accessibilità. Conservare etichetta e posizione scelte dall’utente.
- **Evidenza:** `verification/all-pages-extra.json`, `all-pages/home-mobile-review.jpg`.
- **Comando suggerito:** `$impeccable adapt`.

### 3. P2 Aree cliccabili della testata sotto l’obiettivo interno

- **Posizione:** `src/app/globals.css:241`, `.wordmark`; `:273`, `.site-nav__access`; `:281`, `.site-nav__toggle`.
- **Categoria:** Accessibilità / Responsive.
- **Misure:** a 390 px il link del marchio è alto 30 px e “Accedi” 41 px. A 320 px il pulsante menu si restringe a circa 42 × 44 px. Il comportamento si ripete sulle pagine che usano `Navbar`.
- **Impatto:** bersagli meno comodi da toccare e piccola compressione del menu nella testata stretta.
- **Standard:** scostamento dall’obiettivo interno 44 × 44 px; queste misure, da sole, non dimostrano una violazione WCAG AA, il cui criterio applicabile dipende anche da versione ed eccezioni.
- **Correzione proposta:** minimi di tocco espliciti, impedire la compressione del menu e riequilibrare i gap/padding a 320 px senza introdurre overflow.
- **Evidenza:** `verification/all-pages-browser.json`, `viewports[].smallTargets`.
- **Comando suggerito:** `$impeccable adapt`.

### 4. P2 Documentazione del design ancora riferita al sistema precedente

- **Posizione:** `DESIGN.md`, sezione tipografica iniziale e palette; parti di `CLAUDE.md` e `.impeccable/surfaces/`.
- **Categoria:** Integrità dell’implementazione / Tema.
- **Evidenza:** documenti con indaco `#4403af` e DM Sans, mentre l’utente ha confermato Traccia, Manrope e Fraunces. Il rilevatore produce 13 avvisi consultivi sulle dimensioni tipografiche rispetto alla vecchia scala.
- **Impatto:** una sessione successiva può reintrodurre il vecchio design o interpretare il brandkit corretto come deriva. Non è una regressione visiva scoperta in questo audit.
- **Correzione proposta:** riconciliare i documenti con il brandkit e il sito implementato, senza modificare prezzi, terminologia del prodotto o altre indicazioni non coinvolte.
- **Comando suggerito:** `$impeccable document`.

### 5. P3 Immagine principale della newsletter caricata come lazy

- **Posizione:** `src/app/newsletter/page.tsx:85` circa, immagine `pane.webp`.
- **Categoria:** Prestazioni.
- **Evidenza:** il browser individua quell’`IMG` come elemento LCP a 1440 × 900 e ne riporta `loading="lazy"`.
- **Impatto:** possibile ritardo evitabile dell’immagine principale su rete lenta. La misura locale non dimostra un problema CWV in produzione e non viene usata come benchmark pubblico.
- **Correzione proposta:** dare priorità di caricamento all’immagine effettivamente visibile nell’apertura, senza attivare Cloudflare Images o introdurre un servizio di ottimizzazione.
- **Comando suggerito:** `$impeccable optimize`.

## Controlli funzionali riusciti

- Link interni e frammenti confrontati con le dodici superfici: nessuna destinazione interna mancante.
- Menu mobile e chiusura Esc; quattro percorsi per mestiere; apertura FAQ; cambio prezzi a mensile; apertura della guida di installazione.
- Moduli contatto e newsletter: consenso inizialmente disabilitante, validazione nativa dei campi richiesti, caricamento, errore, nuovo tentativo e conferma. Le risposte sono simulate nel browser **prima della trasmissione**: nessun POST reale alle API, nessuna email o iscrizione creata. Il consenso newsletter facoltativo del modulo contatti resta falso quando non selezionato.
- Popup newsletter e WhatsApp mantengono le evidenze specifiche `verification/popup-*`: focus, sfondo inerte, Esc, cooldown, esclusione iscritti, reduced motion e distanza fra i comandi flottanti.
- Canonical di homepage, prezzi e ordini corretti; superfici di supporto noindex come previsto dai test.
- Nuova esecuzione di 103 test Vitest e 3 controlli Node commerciali, TypeScript e lint del sito con esclusione delle copie storiche `worktrees/**`: passati.
- La build di produzione verificata nel passaggio precedente resta applicabile: nessun sorgente runtime risulta più recente di `.next/BUILD_ID`. In questo audit non è stata eseguita un’altra build, perché non sono stati modificati sorgenti runtime.

Il sito usa componenti e token condivisi, offre un’alternativa accessibile con controlli nativi, distingue esempi e immagini editoriali dal prodotto e mantiene i dati commerciali centralizzati. Sono aspetti da preservare nelle nuove pagine.

## Priorità del prossimo intervento

1. `$impeccable adapt`: correggere insieme i tre rilievi responsive/tocco, riproducendo i casi esatti indicati.
2. `$impeccable document`: riallineare la documentazione del design.
3. `$impeccable optimize`: priorità dell’immagine newsletter.
4. `$impeccable polish`: sola verifica finale delle correzioni, senza un nuovo redesign.

## Limiti e materiali

Non verificati: invii reali e recapito delle email, disiscrizione valida, checkout e portale Stripe, download/installazione dei pacchetti, account autenticati, CMP sul dominio reale, cache social, CWV sul campo, browser o dispositivi fisici diversi dal Chrome usato. L’audit non attesta nuovi rilasci dell’app né la conformità normativa delle sue etichette.

Dati e script: `verification/all-pages-*`. Acquisizioni: `all-pages/`; tutti i 24 fogli di revisione desktop/mobile e le sei acquisizioni degli stati dei moduli sono stati aperti. I fogli mostrano tre posizioni della stessa pagina: il contenuto ripetuto fra pannelli non rappresenta duplicati nel DOM.

Alcuni conteggi grezzi dei titoli includono i rettangoli dei `span` o testo riservato agli screen reader. Questi sono falsi positivi controllati sulle immagini, non titoli della homepage a quattro righe: la hero visibile resta su due righe.

Handoff della famiglia di pagine separato: `handoff-pagine-aree-di-lavoro.md`. Nessun commit, push o deploy effettuato.
