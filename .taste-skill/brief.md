# LabManager — rifacimento, 19 ottobre 2026

## Chiusura locale di questa sessione

Il committente ha richiesto il commit locale degli interventi su selettore laboratorio,
centratura, voce Home e scorrimento dell'header, con test e documentazione collegati.
Dipendenze e documenti SEO concorrenti sono esclusi. Nessun push o deploy richiesto.
Le indicazioni «nessun commit» nelle fasi seguenti descrivono lo stato precedente
a questa chiusura; il commit si identifica nella cronologia Git.

## Header — ritorno all'inizio delle pagine

Riprodotto il difetto segnalato: da 800 px, Home/Prezzi potevano fermarsi a 696 px;
clic sulla pagina già aperta lasciava la posizione invariata. I link dell'header
usano ora navigazione HTML nativa e destinazioni `#main-content` per Home, logo,
Prezzi e singole aree. Panoramica e Contatti conservano le rispettive sezioni.
Indietro/Avanti conserva il ripristino del browser. Nessun reset globale dello scroll.

Verifica: 24 casi Home/Prezzi desktop/mobile, cinque aree, ancore, cronologia e URL
con query; 136 test Vitest + 3 Node, lint mirato e build passati.
Build locale `EzKKQKyfAnxmAkGpm2PSK`, anteprima 3052; nessun commit/push/deploy.
[Causa, scelta tecnica e limiti](workflow-review-2026-10-19/navigation-scroll.md).

## Header — voce Home

Su approvazione del committente, Home è la prima voce su desktop e nel menu mobile.
La pagina corrente usa peso 700 e `aria-current="page"`; nelle aree anche il comando
Funzionalità è evidenziato. Conservati logo, accesso, ancore e comportamento dei menu.
Verifica: 136 test Vitest + 3 Node, lint, build e browser a 1440/901/900/390/320;
ritorno a Home, chiusura menu mobile e cambio pagina attiva verificati.
Build locale `8XJ-zm2-jTBrAIGJHujz4`, anteprima 3052. Nessun commit/push/deploy.
Dettagli in [navbar-home.md](workflow-review-2026-10-19/navbar-home.md).

## Selettore laboratorio — aggiornamento successivo

Su approvazione della review visiva, «Il tuo lavoro, qui dentro» usa campo avorio,
selettori bianchi raccolti su salvia e scelta attiva bosco/bianco con spunta.
Su richiesta successiva, gruppo e dicitura sono centrati, entro 800 px.
Pasticceria è selezionata all'ingresso; un solo percorso con testata bosco e corpo
bianco sostituisce la combinazione filtro/accordion. Radio nativi e CSS mantengono
la scelta funzionante anche senza JavaScript. Testi e destinazioni conservati;
nessun nuovo asset o dipendenza. Guida Traccia e sidecar aggiornati insieme.

Verifica nuova: 133 test Vitest + 3 controlli commerciali, lint, TypeScript,
build produzione e browser 1440/768/390/320; tastiera, 16 collegamenti per viewport,
selezione senza JavaScript e reduced motion a 1440/390. Taste finale 0 FAIL / 3 WARN,
invariati rispetto alla baseline con popup chiusi. [Evidenze e limiti](workflow-review-2026-10-19/verification.md).
Build locale dopo centratura `XHES7vKuh15rK0N24Gx_Z`, anteprima porta 3052.
Centratura verificata nel browser a 1440/768/390/320, senza overflow.
Nessun commit, push o deploy.
Le sezioni successive conservano la cronologia precedente.

## Chiusura documentale e prossima verifica SEO

Il committente ha richiesto il commit locale di tutto il lavoro sul sito e svolgerà personalmente il collaudo manuale completo. L’accettazione manuale resta da raccogliere. Stato durevole in [../docs/SITE_REDESIGN_STATUS.md](../docs/SITE_REDESIGN_STATUS.md); brief e report testuali sono ora versionati, mentre screenshot e dati QA restano locali. Prossima sessione: verifica SEO della nuova build, distinta dal dominio live. Handoff portabile nella cartella temporanea del sistema; nessuna autorizzazione a push o deploy.

## Consulenti e prezzi annuali — ultimo aggiornamento

Approvato e applicato «Sei un consulente?» nel percorso Ristorazione, con paragrafo coerente in Ricette e Food Cost. La home mostra l’equivalente mensile dell’abbonamento annuale: Light €16,67/mese, Plus €40/mese, con pagamento annuale e totali €200/€480 esplicitati sotto le schede. La nota comune ricorda la disponibilità del mensile. Manifesto e importi contrattuali invariati. Verifica: 134 test Vitest + 3 Node, lint mirato, build, browser 1440/768/390/320 e Taste home 0 FAIL / 2 WARN. Evidenze in [consulenti-prezzi/verifica.md](consulenti-prezzi/verifica.md). Anteprima porta 3038, nessun commit/push/deploy.

## Fix visivi e Ristorazione — ultimo aggiornamento

Implementati i fix approvati dopo l’analisi: Ristorazione al posto di Gastronomia con focus su Food Cost/menu; fotografie e piani home allineati; titoli Etichette brevi; sette strumenti espandibili anche senza JavaScript; confronto prezzi mobile con nome sopra a Light/Plus; chiusure bilanciate, divider rimossi e footer con margini esterni simmetrici e protezione locale dei testi lunghi. Conservato il comportamento WhatsApp corrente del checkout.

Verifica finale: 133 test Vitest + 3 Node commerciali, ESLint mirato, diff-check e build passati; Chrome su sette pagine a 1822/1440/768/390/320 (35 configurazioni), ancore native senza JavaScript e reduced motion. Dettagli, screenshot e limiti Taste in [visual-fixes/verification.md](visual-fixes/verification.md). Anteprima locale porta 3038; nessun commit/push/deploy. Restano da ricevere le schermate autentiche del prodotto. Questo aggiornamento supera i rilievi iniziali di allineamento e titoli; i report precedenti restano evidenze storiche.

## Stato corrente e prossima conversazione

Decisione successiva del 19 ottobre: **header sempre visibile durante lo scorrimento**,
approvato dal committente dopo il confronto con il comportamento precedente.
Barra Traccia opaca e compatta, 80 px desktop/tablet e 76 px telefono, menu scorrevoli,
ancore libere e intestazioni Prezzi sotto la barra. Supera il comportamento nel flusso
introdotto nel rifacimento; non risultava una sua approvazione esplicita nei documenti.
Valido per tutte le pagine con Navbar; Instagram conserva il formato autonomo.
Dettagli e verifiche in [header-review/verification.md](header-review/verification.md).

Decisione precedente confermata: **rimuovere le pagine `/aggiornamenti` e `/download`**. Supera le precedenti indicazioni di conservarle come supporto legacy; non riguarda le notizie della newsletter né lo stato degli aggiornamenti del Libro ingredienti. Dettagli, verifica e indicazioni per il servizio Cloudflare separato in [../docs/RETIRED_PAGES.md](../docs/RETIRED_PAGES.md). Traccia e le altre decisioni approvate restano valide. I report precedenti che descrivono queste due pagine con stato 200 sono evidenze storiche.

Le cinque pagine autonome per aree di lavoro sono implementate localmente e collegate sotto Funzionalità: Ricette e Food Cost, Produzione e Magazzino, Ordini e Piano di lavoro, Etichette e Libro ingredienti, Strumenti e calcolatori. Dettagli ed evidenze in [pagine-aree-di-lavoro.md](pagine-aree-di-lavoro.md). L’handoff iniziale delle aree è storico e il suo lavoro è stato completato.

La prossima chat richiesta dal committente riguarda **l’analisi del footer**. Partire da [handoff-footer.md](handoff-footer.md). La preparazione di questi documenti non avvia quell’analisi né autorizza modifiche al footer. La precedente indicazione “pagina Prezzi” è stata corretta dal committente.

Stato di rilascio: lavoro locale sul working tree esistente, nessun commit/push/deploy. La più recente verifica del layout è descritta sotto e nel report delle aree; i conteggi precedenti in questo registro restano evidenze delle rispettive fasi.

## Allineamento della guida visiva — 19 ottobre 2026

`DESIGN.md` è stato aggiornato a Traccia e conserva le decisioni visive del sito;
`design-taste-frontend` resta il metodo di lavoro e verifica. Anche il sidecar
`.impeccable/design.json` e il rimando in `CLAUDE.md` sono allineati. Le successive
menzioni del vecchio DESIGN.md in questo registro descrivono le fasi precedenti.
I vecchi brief Impeccable di superficie restano storici nei punti in conflitto.
Intervento documentale, senza modifiche all'interfaccia o nuova verifica nel browser.

## Intento e perimetro
Rifare da zero il linguaggio visivo del sito pubblico e raccontare le funzionalità effettivamente implementate nell'app. Pubblico: laboratori artigianali alimentari. Conversione: prova Plus di 14 giorni nella web app. Il committente affida le scelte creative; non si richiedono approvazioni intermedie del design. Lavoro locale, pubblicazione esclusa da questa consegna.

Restano autorevoli manifesto commerciale, URL, consensi, API, documenti legali e comportamento degli abbonamenti. Il codice dell'app si consulta in sola lettura. Nessuna prova sociale inventata. Le funzioni presenti sul branch di integrazione non costituiscono prova di rilascio.

## Inventario del soggetto
- LabManager collega formulazione tecnica e gestione quotidiana di un laboratorio alimentare.
- Ricette espresse in pesi e percentuali, ricalcolate per la quantità da produrre.
- Assemblaggi riusano ricette e semilavorati.
- Bilanciamento confronta zuccheri, grassi, acqua, solidi e altri parametri.
- Food Cost parte dagli ingredienti e dal loro costo.
- Ordini cliente e interni confluiscono nel piano di lavoro.
- Lotti e scadenze attraversano produzione, giacenze e vendite.
- Etichette e tabelle nutrizionali usano i dati del prodotto.
- Libro ingredienti include assortimenti e storico dei documenti; rilascio confermato dal committente.
- Menu, costi aziendali, movimenti di cassa e scadenzario ampliano la gestione economica.
- Il prodotto è italiano e nasce a Carpi, all'interno di PastryLab.
- Due livelli commerciali, Light e Plus, con una prova completa iniziale.

## Argomento e prova
Hero: il lavoro dal progetto al banco è collegato → lavorazione artigiana e promessa concreta del gestionale.
Esempio interattivo: ogni mestiere segue operazioni diverse con gli stessi strumenti → percorsi pasticceria/panificio/gelateria/gastronomia basati sulle funzioni reali.
Funzionalità: il prodotto copre più delle quattro aree del vecchio sito → catalogo consultabile con dettagli e provenienza nel codice.
Prezzi: si può iniziare dal proprio bisogno → Light/Plus e cifre derivate dal manifesto.
FAQ: prova, acquisto e assistenza hanno condizioni leggibili → termini commerciali esistenti.
Contatto: chi ha un dubbio può descrivere il proprio lavoro → modulo funzionante e WhatsApp.
Footer: identità e responsabilità → soggetto legale, privacy, cookie, newsletter.

## Direzione
Draw originario: Dressed as something else, seed 1228958381. Il 19 ottobre il committente ha richiesto il riallineamento a `design/brandkit`: palette Bosco/Avorio/Salvia/Ambra, Manrope 400/600/700 per testi, comandi e dati, Fraunces 400 per titoli brevi, pattern Traccia originale. Nessuna nuova estrazione creativa. La narrazione editoriale resta, con il brandkit come vincolo prioritario.

Su questa pagina, i collegamenti di LabManager fra ricetta, preparazione e vendita diventano il sommario interattivo di una rivista di laboratorio.

Live thing: scegliere il proprio laboratorio e leggere una giornata operativa, con esempi dichiarati e collegamenti alle funzioni corrispondenti. Tutti i percorsi restano nel documento anche senza JavaScript.

Hero riallineata: Fraunces in due righe, testo e azione a sinistra, fotografia a destra; sul telefono testo e azione precedono la fotografia. Traccia ai margini dell’immagine, senza sovrapporre il motivo alle aree di lettura. Font locali del kit, logo originale invariato. Fotografie generate come illustrazioni editoriali, mai come clienti o schermate.

## Copy deck
Hero: Dalla ricetta / al banco.
Supporto: Il gestionale per laboratori artigianali alimentari: ricette, costi, produzione e ordini, collegati al lavoro di ogni giorno.
Azione: Prova gratis 14 giorni.
Nota: Tutte le funzioni Plus. Senza carta di credito.
Percorsi: Il tuo lavoro, qui dentro.
Funzioni: Ogni dettaglio conta.
Piani: Comincia dal tuo laboratorio.
FAQ: Prima di cominciare.
Contatto: Parliamo del tuo lavoro.
Footer: Il prossimo impasto / parte da qui.

## Verifica prevista
Catalogo contro sorgenti app; manifesto commerciale invariato; test funzioni e contratti, TypeScript, lint, build; browser 1440/768/390, interazioni tastiera, assenza overflow, reduced motion; lint/inspect taste, massimo tre cicli di critica visiva. Nessun invio reale di moduli durante QA.

## Audit iniziale
Lint: ombre, righe sottili, micro-label e gradienti. Inspector: titoli fino a quattro righe, contrasto insufficiente sul CTA WhatsApp, nessuna immagine di prodotto effettiva, numerazione ornamentale e testo coperto dal menu fisso. Questi rilievi sono una baseline tecnica; il sito precedente non è stato usato come riferimento creativo.

## Decisioni del committente durante il lavoro
- Libro ingredienti già disponibile agli utenti: rimosso “In arrivo”.
- Schermate reali scelte insieme: Food Cost, Ordini e Libro ingredienti. Nessuna immagine aggiornata è stata ancora fornita. Il sito attuale usa immagini editoriali originali e un esempio di piano di lavoro dichiarato illustrativo; non presenta mockup come screenshot.
- Inserimento previsto: Food Cost mostra costo e margine; Ordini mostra il piano di lavoro; Libro ingredienti mostra assortimento/documento. Le tre schermate devono essere catturate con dati dimostrativi privi di informazioni personali.


## Consegna verificata
- Consegna precedente: Dressed as something else, seed 1228958381. Colori e font originari sono stati sostituiti dal brandkit Traccia nel riallineamento riportato sotto.
- Idea: i collegamenti tra ricetta, costo e lavoro diventano un sommario navigabile per mestiere. Interazione: selezionare un laboratorio e aprire il dettaglio delle funzioni relative.
- Critica finale: design 7,8; usabilità 8; creatività 7; contenuto 7,8; totale 7,7/10. Il principale limite resta la prova visiva del software, in attesa dei tre screenshot concordati. Vedi `critique.md`.
- Quattro fotografie editoriali generate con image_gen e due cover social coordinate. Nessuna fotografia trovata online, nessun filmato di terzi; nessuna licenza/attribuzione esterna da applicare. Didascalia di provenienza AI nel footer. Prompt, dimensioni e sorgenti in `asset-report.md`.
- Il piano ordini è un esempio dichiarato con dati illustrativi (pane, mignon, torta, gelato); non mostra dati reali di clienti. Nessuna statistica commerciale o testimonianza inventata.
- Test: 97 Vitest + 3 controlli Node del manifesto. ESLint e build Next.js completati. La build riporta un avviso di Next sulle metriche del font di fallback Big Shoulders; il caricamento effettivo del font è stato verificato nel browser.
- Browser: dieci route a 390/768/1440, controlli supplementari a 320/701/900/901, prezzi mensili, menu/escape/resize, scelta e riselezione mestiere, reduced-motion, ancora ordini e intestazioni accessibili della tabella mobile. Nessun overflow e nessun invio reale di moduli.
- Inspector: nessun FAIL su 1440/768/390; ultima revisione mobile 0 FAIL / 0 WARN. L’avviso desktop sull’assenza di video è accettato: non ci sono riprese reali del prodotto/cliente e sono prioritari i tre screenshot scelti. Il movimento fotografico è presente.
- Canonical, URL delle route, API e consensi, condizioni commerciali, sito principale e servizi Cloudflare non sono stati cambiati. Nessun commit, push o deploy.

Screenshot da ricevere: Food Cost con costo/prezzo/margine, Ordini nella vista settimana o piano di lavoro, Libro ingredienti con assortimento e documento. Dati dimostrativi, leggibili a risoluzione originale. Nessun placeholder vuoto inserito nel sito.


## Riallineamento al brandkit — 19 ottobre 2026

Richiesta esplicita: “riallinea”. Il brandkit prevale sulle scelte della prima estrazione. Rimangono la narrazione per mestiere, i contenuti e le interazioni esistenti.

- Token del kit in `globals.css`, Manrope/Fraunces caricati da `public/brandkit/fonts/` con licenze OFL; originali conservati identici. Traccia originale usata come maschera ai margini della hero. Logo originale invariato.
- Hero su due colonne ricalibrata per Fraunces; titoli brevi 400/1,08, testo e comandi Manrope, prezzi Manrope con cifre tabulari. Azioni bosco/bianco; azione inversa su Plus scuro. Focus visibile sui due sfondi.
- Pagine pubbliche e supporto, widget esterni e pagina di disiscrizione riallineati. Per quest’ultima verificata soltanto la presentazione del link privo di token: nessuna cancellazione di iscrizioni.
- Copertine social 1200 × 630 ricomposte in HTML/CSS con i font, il logo e Traccia originali. Sorgente in `brandkit/social-cover.html`. Le quattro immagini editoriali non sono state rigenerate.
- Verifiche nuove: 97 test Vitest e 3 Node commerciali, TypeScript, build produzione, lint del sito con esclusione `worktrees/**`, diff-check. Il lint generale include erroneamente build e dipendenze delle copie storiche annidate; non sono state modificate.
- Browser sulla build di produzione: dieci pagine a 390/768/1440, home anche 320/360/700/701/900/901; menu, Escape, selezione/riselezione mestiere, reduced-motion, prezzi, ancora Ordini e intestazioni AX. Font realmente caricati, colori dei pulsanti e maschera verificati. Nessun overflow rilevato.
- Inspector finale in `brandkit-final/`: 0 FAIL a 1440/768/390. Avvisi motivati: avorio imposto dal kit, assenza di footage reale già accettata. Tutte le nove immagini del rapporto finale sono state aperte; cinque pagine secondarie riviste in `brandkit-routes/`.
- Evidenze nuove: `verification/brandkit-*`. Le evidenze senza questo prefisso documentano la versione precedente. Gli script di QA sono salvati accanto ai risultati.
- Nessun commit, push o deploy. Nessun modulo inviato. Comportamento CMP sul dominio reale e cache social ancora da verificare. Restano da ricevere Food Cost, Ordini e Libro ingredienti.


## Popup newsletter e WhatsApp — 19 ottobre 2026

Il committente ha chiesto di reinserire il popup e ha scelto il pulsante WhatsApp fisso con etichetta in basso a destra.

- `NewsletterPopup` e `WhatsAppButton` nuovamente presenti sulla homepage. Popup in Traccia, con il `NewsletterForm` condiviso e il contratto API/consenso esistente.
- Dialogo HTML nativo: sfondo inerte, chiusura Esc/pulsante, ripristino del focus e del precedente overflow. Contenuto scorrevole entro la viewport; a 320 × 568 il pulsante di invio è raggiungibile.
- Regole mantenute: 50% scroll, pausa di 7 giorni dopo la chiusura, esclusione degli iscritti. Storage bloccato non impedisce di aprire/chiudere durante la visita.
- WhatsApp: icona e testo “Scrivici su WhatsApp”, bosco/bianco, destinazione canonica invariata, nuova scheda con noopener/noreferrer. Confermata la distanza dal comando di accessibilità nelle quattro viewport provate. Il dialogo nativo passa sopra entrambi.
- Verifica finale: 103 test Vitest + 3 Node commerciali; aggiunti 6 test su trigger, esclusioni, cooldown, Esc, storage bloccato, consenso e invio con errore/nuovo tentativo/successo simulati. Nessuna email inviata.
- Build di produzione riuscita. Browser QA a 1440 × 900, 768 × 1024, 390 × 844 e 320 × 568: soglia 49/51%, focus, sfondo inerte, Esc, chiusura, scroll interno, pausa al reload, iscritti e reduced motion. Evidenze `verification/popup-*`; acquisizioni aperte e riviste in `newsletter-whatsapp/`.
- Il server dev durante la verifica non eseguiva l’idratazione (anche menu inattivo); la verifica funzionale finale è stata svolta sul server di produzione riavviato. Nessuna modifica ai consensi o ai widget per aggirare il problema.
- DESIGN.md resta precedente al riallineamento: il rilevatore segnala divergenze tipografiche/cromatiche consultive, non problemi del brandkit confermato. Nessun nuovo audit esteso né modifica di quel documento.
- Nessun commit, push o deploy; nessun invio reale di moduli né apertura della chat WhatsApp con invio di messaggi.


## Verifica completa e handoff aree — 19 ottobre 2026

Richiesta: lasciare un handoff per costruire la famiglia di pagine per aree in un’altra sessione, continuando qui con la verifica del sito attuale. Handoff in `handoff-pagine-aree-di-lavoro.md`; nessuna nuova pagina implementata.

Report di verifica: `verifica-tutte-le-pagine.md`. Dodici superfici incluse 404 e disiscrizione senza token, quattro viewport (48 controlli), link e ancore, semantica, contrasto campionato, interazioni e moduli con risposte simulate. 103 test Vitest + 3 Node, TypeScript e lint del sito passati. Nessun sorgente runtime modificato in questo passaggio.

Rilievi non ancora corretti: 4 px di overflow nella conferma del modulo contatti a 320 px; WhatsApp sopra la nota AI a fine footer mobile; target testata sotto 44 px; documentazione del design precedente al brandkit; immagine LCP newsletter ancora lazy. Nessun P0/P1 nelle prove, quattro P2 e un P3; valutazione tecnica interna 15/20, non certificazione.

Nessun modulo inviato realmente, pagamento eseguito, iscritto modificato, messaggio inviato o pacchetto scaricato. Nessun commit/push/deploy. Le prove degli stati dei moduli chiudono realmente il popup prima di fotografare il form, senza nasconderlo via CSS o disattivare i consensi.

## Testi billing semplificati — 19 ottobre 2026

Richiesta del committente: allineare le tre pagine billing al tono del brief dopo il confronto sui testi ridondanti. Eliminati i sottotitoli duplicati “Pagamento completato”, “Checkout interrotto” e “Portale abbonamento”; rimossi “Goditi LabManager” e il riquadro “Riepilogo” che ripeteva l’esito. Un messaggio operativo sotto ciascun titolo, con spiegazione dell’aggiornamento o della possibilità di riprovare. Invariati URL, titoli principali, noindex, contatto di assistenza e azioni concordate: successo e gestione senza CTA nel contenuto; annullamento con ritorno al sito e prezzi. Invariata la condizione di accesso fino a scadenza per cancellazione a fine periodo.

Verifiche: 22 test mirati (billing, metadata e crawl), ESLint sui file interessati, build produzione e diff-check passati. Browser: tre pagine a 1440/768/390/320, testi e link verificati, nessun overflow; sei acquisizioni desktop/mobile aperte. Rilevatore sui tre sorgenti: nessuna segnalazione. Evidenze `verification/billing-copy-*`, immagini `billing-copy/`. La build locale su porta 3001 è stata riavviata. Nessun pagamento, modifica di abbonamento, commit, push o deploy. I rilievi responsive/documentali del report generale non sono stati modificati da questo intervento testuale.

## Famiglia di pagine e correzione del layout — 19 ottobre 2026

Quattro nuove route (`/ricette-food-cost`, `/produzione-magazzino`, `/etichette-libro-ingredienti`, `/strumenti`) e integrazione di `/ordini`, con la sua ancora `#flusso-ordine` conservata. Menu Funzionalità, catalogo home e footer collegano le cinque aree; collegamenti fra pagine, CTA inventariate, metadata e WebPage JSON-LD, sitemap e `llms.txt` aggiornati. Prezzi e manifesto commerciale invariati. Libro ingredienti disponibile: Light assortimenti/consultazione, Plus generazione/storico PDF.

Verifica della famiglia: 113 test Vitest + 3 Node commerciali, build con TypeScript, lint mirato e 20 configurazioni browser sulle cinque aree a 1440/768/390/320. Script e acquisizioni in `output/playwright/work-areas/`. La verifica era funzionale e responsive; non aveva identificato lo squilibrio compositivo dei tre passaggi di Strumenti su due colonne, poi segnalato dal committente.

Correzione successiva: tre passaggi su tre colonne oltre 1000 px e una colonna a larghezze inferiori; quattro passaggi in 2 × 2 oltre 700 px e impilati sotto. Titolo e introduzione allineati in alto; padding verticale dei flussi a 80/64 px. Nuova build con TypeScript, lint, 17 test mirati e 24 controlli di layout a 1440/1024/1000/768/390/320 sulle quattro pagine che usano `WorkAreaSteps`. Evidenze in `output/playwright/work-areas/layout-fix/`; Chrome, Safari non ricollaudato. Attese le animazioni prima delle acquisizioni finali.

Dicitura di provenienza AI mantenuta vicino alle immagini delle quattro nuove pagine e nel footer. La richiesta di chiarimento normativo non è stata trattata come autorizzazione a rimuoverla. Contesto, fonti consultate e limiti sono nel report delle aree; nessuna classificazione legale definitiva di ogni immagine.

Le istruzioni di continuità in `CLAUDE.md` ora indicano Traccia e le cinque route. `DESIGN.md`, il sidecar Impeccable e i brief più vecchi restano da riconciliare integralmente: non sono la fonte di palette e font correnti. I rilievi dell’audit generale su conferma contatti a 320 px, WhatsApp nel footer mobile e LCP newsletter restano da rivalidare nei rispettivi contesti; la nuova verifica delle aree non li chiude.

Nessun nuovo audit della pagina Prezzi o del footer, nessun invio reale di moduli, nessun commit/push/deploy. Prossimo lavoro: analisi del footer in una chat pulita, dal relativo handoff.

## Correzioni pagina prezzi — 19 ottobre 2026

Richiesta: applicare i sei punti della review sugli screenshot desktop forniti dall’utente.

- Apertura accorciata con titolo senza interruzione forzata e contenuto centrato entro 1200 px. Nomi e importi dei piani precedono le descrizioni; il primo prezzo rientra nel primo schermo anche a 320 × 568.
- Schede su righe condivise con CSS subgrid: titoli, prezzi e CTA allineati quando ci sono due colonne; una colonna su telefono. Rimosso lo sfalsamento di 64 px di Plus, mantenuta la distinzione bosco/bianco.
- Annuale: “Equivalente mensile, con pagamento annuale” vicino all’importo e totale fatturato in evidenza. Calcolo e importi immutati, così come supporto e limiti.
- Una sola nota comune sulla prova sotto le schede, associata alle CTA anche tramite aria-describedby. Le CTA continuano ad avviare la stessa prova Plus senza preselezionare un piano. FAQ e chiusura mantengono le condizioni di pagamento, cancellazione e fine prova.
- Confronto più compatto, intestazioni Light/Plus sticky durante lo scorrimento; Libro ingredienti spostato nel gruppo Progettazione e ricette. Gruppi resi con tbody distinti; tutte le 28 righe e le distinzioni Light/Plus preservate.
- Ridotto il vuoto fra confronto e FAQ; chiusura “Comincia dal tuo laboratorio.”; tolta dalla chiusura la ripetizione sulle sessioni individuali Plus annuali, ancora presenti nelle schede/confronto/FAQ.
- File coinvolti: `src/app/pricing/page.tsx`, `pricing-selector.tsx`, `pricing-faq.tsx`, `page.test.tsx` e le classi pricing in `src/app/globals.css`. Le nuove pagine per aree, navbar e footer presenti nel checkout sono state preservate.

Verifica: 113 test Vitest dell’attuale checkout e 3 controlli commerciali, lint mirato e build produzione passati. Test aggiornati per nota condivisa, chiarezza annuale e gruppo di Libro ingredienti, osservati fallire prima della correzione. Chrome sulla build produzione a 1822/1440/768/390/320: entrambe le periodicità, importi e link, righe allineate sulle due colonne, importo del primo piano nel primo schermo, 28 righe, intestazioni sticky, FAQ e focus. Nessun overflow o errore di contrasto rilevato dal campionamento. Acquisizioni finali raccolte e aperte nei cinque fogli `pricing-review/*-review.jpg`; chiusura del banner cookie con il suo controllo reale, senza disattivare consensi o nascondere elementi.

Evidenze: `verification/pricing-review-*`; 14 avvisi consultivi del rilevatore sulle dimensioni rispetto al vecchio DESIGN.md restano documentali, senza nuove soppressioni. Server locale su porta 3001 aggiornato. Nessun test di pagamento reale, commit, push o deploy. Safari non è stato collaudato in questo passaggio.

## WhatsApp condiviso e billing — 19 ottobre 2026

Dopo aver segnalato l’assenza del pulsante fisso su Prezzi, il committente ha chiesto di procedere con il miglioramento e ha confermato esplicitamente l’utilità del contatto nelle pagine billing.

`WhatsAppButton` è ora montato una sola volta in `RootLayout`, rimosso dalla composizione locale della home. Copre home, prezzi, newsletter, le cinque aree dall’inventario condiviso e tutte e tre le route billing. Instagram conserva il collegamento principale senza duplicato fisso; pagine non trovate e route ritirate restano escluse. Il componente riaggancia l’osservazione al cambio di percorso client.

La visibilità segue il collegamento WhatsApp del footer, così il pulsante non sparisce all’ingresso del footer prima che il contatto sia raggiungibile. Quando il collegamento entra in vista il duplicato si nasconde e ricompare uscendo dalla vista. Su telefono l’etichetta visibile è “WhatsApp” con icona; il nome accessibile resta “Scrivici su WhatsApp”. Questa forma compatta evita la sovrapposizione al pulsante principale della pagina billing annullata a 320 px. Desktop conserva l’etichetta completa. Destinazione, messaggio precompilato e apertura in nuova scheda invariati.

Aggiornati CLAUDE.md, DESIGN.md e sidecar con queste decisioni. Verifiche finali: 132 test Vitest + 3 Node commerciali, lint mirato, build e diff-check passati. Browser produzione: undici route a 1440/390/320 (33 combinazioni), istanza unica, destinazione, comparsa iniziale, passaggio al contatto nel footer e ripristino, navigazione client senza reload da Prezzi a Ricette con osservatore riagganciato, quattro esclusioni e controllo del pulsante billing a 320 px. Test di regressione osservati fallire prima della correzione. Evidenze `verification/whatsapp-shared-*`, acquisizioni `whatsapp-shared/`.

Anteprima locale 3001 aggiornata. Nessuna chat aperta, messaggio inviato, operazione Stripe, commit, push o deploy. Safari non collaudato in questo passaggio.
