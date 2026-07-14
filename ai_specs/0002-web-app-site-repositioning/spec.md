---
type: Spec
title: Riposizionamento del sito LabManager per la web app e la ricerca organica
---

## Problem

Il sito marketing attuale racconta LabManager come app Android e Windows, offline e adatta anche alla ristorazione. Quei segnali sono ripetuti nella Home, nelle pagine prodotto, nella navigazione, nelle FAQ, nel footer, nei metadati, nel JSON-LD e in llms.txt. Sono in conflitto con l'offerta che il team vuole portare al lancio: la web app è l'unico percorso pubblico, il pubblico sono i laboratori artigianali alimentari e non devono essere fatte promesse su piattaforme native, PWA o supporto browser. [L1] [L2] [L3] [L4]

L'incoerenza è già visibile nella ricerca: Google mostra ancora il dominio storico pastrylabmanager.com con il titolo “Android & Windows”. Il dominio storico reindirizza correttamente al dominio canonico, ma la pagina destinazione mantiene gli stessi testi legacy; cambiare soltanto il title non basta a consolidare correttamente il messaggio e la migrazione nell'indice. [L12] [L14]

Il sito contiene inoltre CTA e percorsi ridondanti: prova, contatto, download e piattaforme sono distribuiti senza distinguere chi vuole iniziare una prova da chi possiede già un account. La pagina Prezzi, la pagina Ordini, la Newsletter e le superfici noindex devono assumere ruoli chiari senza alterare il comportamento della web app o delle installazioni native legacy. [L5] [L6] [L8] [L10] [L11]

## Proposed Outcome

LabManager rilascia un sito marketing coerente, concentrato su ricette, Food Cost, produzione, etichette, magazzino e ordini per pasticcerie, panifici e gelaterie. La Home presenta il prodotto e la prova gratuita; Prezzi rende valutabile l'offerta attuale; Ordini approfondisce il modulo e conduce a Prezzi; “Accedi” rimane l'unico ingresso globale per gli utenti esistenti. [L3] [L4] [L5] [L6] [L7] [L8]

La ricerca organica viene consolidata su tre sole pagine indicizzabili del dominio canonico: Home, Ordini e Prezzi. Titoli, descrizioni, Open Graph, Twitter, schema, sitemap e llms.txt raccontano la stessa realtà, senza Android, Windows, offline, PWA o ristoranti. La migrazione del dominio storico resta protetta da redirect 301 e da una procedura Search Console dopo il deploy. [L12] [L13] [L14]

## User Stories

1. Come titolare di una pasticceria, panificio o gelateria, voglio capire dalla Home in pochi secondi se LabManager organizza il mio laboratorio e quali attività copre, senza ricevere messaggi obsoleti sulle piattaforme. [L3] [L4] [L7]

2. Come potenziale cliente, voglio iniziare una prova gratuita soltanto da una CTA chiara e arrivare direttamente alla web app, così so dove registrarmi senza passaggi intermedi. [L6]

3. Come cliente esistente, voglio trovare “Accedi” nella navigazione principale e aprire la mia web app nella stessa scheda, senza dover cercare una pagina “Area riservata”. [L5]

4. Come visitatore interessato agli ordini, voglio approfondire il piano di lavoro e poi vedere i prezzi, senza essere reindirizzato a una prova o a promesse native non pertinenti. [L4] [L6] [L12]

5. Come visitatore che cerca LabManager su Google, voglio ricevere una pagina e uno snippet coerenti con il prodotto attuale e con il dominio labmanagergestionale.com. [L12] [L13] [L14]

6. Come utente legacy che possiede già il link Download, voglio poterlo ancora usare per assistenza, senza che il download diventi un percorso commerciale per nuovi clienti. [L1] [L11]

## Requirements

### Posizionamento e confini del prodotto

1. Tutte le superfici pubbliche di acquisizione devono presentare LabManager come il gestionale per laboratori artigianali alimentari, citando in modo concreto pasticcerie, panifici e gelaterie. “Ristorante”, “ristorazione” e categorie equivalenti non devono più descrivere il pubblico target. [L3]

2. Il sito non deve promuovere Windows o Android per nuovi utenti, mostrare download nativi nel percorso commerciale, né fare claim su offline, sincronizzazione, PWA, installazione, browser o compatibilità per dispositivo. L'accesso alla web app rimane un comportamento normale, non un messaggio promozionale. [L1] [L2]

3. Le sole aree di valore pubbliche sono:

   - Ricette e Food Cost: ricette, ingredienti, costi e margini.
   - Produzione ed Etichette: organizzazione della produzione, etichette, allergeni e PDF.
   - Magazzino: ricevimento merci, giacenze per sede, soglie configurabili, scarico FIFO, alert scadenze e trasferimenti tra sedi.
   - Ordini e Piano di Lavoro: ordini cliente e interni, produzione collegata, ritiro/consegna, acconti e report operativi.

   Il testo pubblico non deve trasformare acconti e report in fatture, contabilità o altri prodotti amministrativi. [L4]

4. La matrice Magazzino v1 già presente rimane l'autorità dei sei claim approvati. Ogni superficie che descrive Magazzino deve usare esclusivamente il suo copy canonico o claim mappati; nessun claim su fornitori, barcode, collocazioni, prelievi, team, sincronizzazione o altre funzioni non approvate può essere reintrodotto implicitamente. [L4]

   L'elenco `requiredSurfaces` della matrice rimane invariato: la Home continua quindi a esporre il copy canonico Magazzino sia nella Hero sia nella relativa FAQ, oltre alle altre superfici già governate dalla matrice. Il riallineamento del copy non modifica i sei ID, il testo canonico o la governance della matrice.

5. “Food Cost” resta un pilastro già comunicabile, ma non viene trasformato in una nuova pagina o in un nuovo modulo commerciale durante questo rilascio. [L4] [L15]

### Home, navigazione e CTA

6. La hero della Home deve rendere:

   - H1: “Il gestionale per laboratori artigianali alimentari”.
   - Testo: “Ricette, food cost, produzione, etichette, magazzino e ordini: tutto ciò che serve per organizzare il lavoro del laboratorio.”
   - CTA primaria: “Inizia la prova gratuita”, diretta a https://app.labmanagergestionale.com nella stessa scheda.
   - CTA secondaria: “Scopri le funzionalità”, diretta alla sezione funzionalità della Home.

   Il blocco di supporto della Hero che descrive Magazzino deve continuare a derivare dalla matrice e usare il suo copy canonico, senza aggiungere claim di piattaforma o compatibilità. Rimuovere badge, pillole e testi che promuovono Android, Windows, offline, cloud o prova con formulazioni legacy. [L4] [L6] [L7]

7. L'immagine hero con telefono e desktop deve rimanere. I file tecnici e il contratto responsive/preload possono restare, ma alt text, commenti visibili e dati semantici devono descrivere un'anteprima di LabManager su mobile e desktop senza nominare sistemi operativi o fare promesse di compatibilità. [L2] [L7]

8. La Home deve esporre i quattro pilastri del requisito 3 e può conservare un'anteprima che porta alla pagina Ordini. Rimuovere la sezione commerciale Piattaforme e rimuovere, anziché mantenere invariata, la sezione Perché LabManager se contiene confronto, offline, team, Android, Windows o ristoranti. Non sostituire quelle affermazioni con confronti non verificabili. [L1] [L2] [L4] [L7]

9. Navbar desktop e mobile devono contenere, nell'ordine, “Funzionalità”, “Ordini”, “Prezzi” e “Accedi”. Non devono contenere Piattaforme, Perché LabManager, FAQ, Contatti, Richiedi Info o CTA prova. La stessa struttura si applica ai menu responsivi. [L5] [L7]

10. “Accedi” è l'unico invito globale per chi possiede già un account. Deve puntare direttamente a https://app.labmanagergestionale.com nella stessa scheda; non deve comparire come “Area riservata”, né essere ripetuto in CTA locali, FAQ o footer. [L5]

11. “Inizia la prova gratuita” è consentita solo in Home e Prezzi e deve puntare direttamente alla web app nella stessa scheda. Nessuna CTA di Ordini, Newsletter, Download, WhatsApp, footer o altra pagina può usare una promessa di prova. [L6]

12. La matrice di navigazione commerciale deve essere:

| Superficie | Azione | Destinazione |
| --- | --- | --- |
| Home | Inizia la prova gratuita | https://app.labmanagergestionale.com, stessa scheda |
| Home | Scopri le funzionalità | sezione Funzionalità della Home |
| Prezzi | Inizia la prova gratuita | https://app.labmanagergestionale.com, stessa scheda |
| Ordini | Scopri i prezzi | /pricing |
| Navbar desktop/mobile | Accedi | https://app.labmanagergestionale.com, stessa scheda |

   L'inventario CTA tipizzato esistente deve diventare la sorgente di verifica di questa matrice, includendo l'azione globale “Accedi” e rimuovendo le vecchie CTA prova/accesso di Ordini e FAQ. [L5] [L6]

13. Il sito può spiegare che la prova è di 14 giorni e senza carta. Registrazione, verifica email, inizio della prova al primo login riuscito, scelta del piano e stato dell'entitlement appartengono alla web app e non devono essere modificati in questo repository. [L6]

### Pagine commerciali e di supporto

14. La pagina /ordini resta una delle tre landing SEO. Deve:

   - usare il posizionamento metadata approvato nel requisito 24;
   - descrivere solo ordini cliente/interni, produzione collegata, ritiro/consegna, acconti e report operativi;
   - usare “Scopri i prezzi” verso /pricing come CTA commerciale;
   - rimuovere notifiche Android/Windows, claim di cassa/contabilità e altre promesse non incluse nel requisito 3.

   Non deve introdurre un download, una prova gratuita o una promessa di fatturazione. [L4] [L6] [L12]

15. La pagina /pricing deve presentare un unico piano completo con le modalità attuali €44,99/mese e €480/anno, prova gratuita di 14 giorni senza carta, due sessioni private 1:1 e supporto prioritario per l'annuale. Deve rimuovere onboarding/download nativi, offline, team e riferimenti a dispositivi. [L1] [L8]

16. La dicitura “2 sessioni attive simultanee” può comparire soltanto nella pagina Prezzi e nella FAQ della pagina Prezzi. Non deve comparire nelle FAQ della Home, essere riscritta come “2 dispositivi”, né essere estesa ad altre pagine, metadati o schema. [L8]

17. Il Piano Light è una futura estensione di prodotto. La struttura del codice può restare predisposta per aggiungerlo in seguito, ma questo rilascio non espone card, prezzo, funzionalità, confronto o CTA del Piano Light. [L8] [L15]

18. Le FAQ della Home diventano solo sei e il contenuto visibile deve rimanere la sorgente del relativo FAQPage:

   1. a chi è rivolto LabManager;
   2. cosa include il piano;
   3. come funziona la prova;
   4. prezzo e disdetta;
   5. come gestisce il Magazzino, usando il copy canonico e i sei claim approvati dalla matrice;
   6. come contattarci.

   La FAQ su prezzo e disdetta può promettere soltanto: “Puoi disdire quando vuoi; in caso di cancellazione a fine periodo, l'accesso resta attivo fino alla scadenza prevista.” Non deve introdurre promesse su rimborsi, prorata o condizioni differenti tra mensile e annuale senza una successiva decisione approvata.

   Rimuovere FAQ su Android, Windows, iPhone/iPad, offline, sincronizzazione, piattaforme, team, ristorante e download. La decisione di raffinamento del 14 luglio 2026 sostituisce esclusivamente la precedente assegnazione delle “2 sessioni attive simultanee” alla Home: la dicitura resta confinata a Prezzi e alla sua FAQ. [L1] [L2] [L4] [L8] [L9]

19. Il blocco contatto della Home e il footer mantengono form, privacy, consenso Newsletter facoltativo e WhatsApp. Titolo e funzione sono “Hai domande? Parla con noi”; rimuovere demo, piattaforme, promessa di risposta entro 24 ore e “team disponibile”. WhatsApp resta assistenza/conversazione, non destinazione della prova o canale broadcast. [L9]

20. Il footer deve contenere:

   - Prodotto: Funzionalità, Ordini, Prezzi.
   - Supporto: Contatti, Newsletter, WhatsApp.
   - Legale: contenuti legali esistenti.

   Non deve contenere Piattaforme, FAQ o Aggiornamenti. [L9] [L10]

21. /newsletter resta raggiungibile dal footer, con copy su aggiornamenti LabManager, nuove funzionalità e consigli scelti editorialmente. Non deve promettere un invio automatico per ogni release, disponibilità native o altri claim di piattaforma. La meccanica attuale di iscrizione e l'opt-in del form contatti restano invariati. [L10]

22. /aggiornamenti resta un archivio noindex per gli utenti esistenti, fuori da navbar, footer e sitemap. Neutralizzare titolo introduttivo, badge di piattaforma e qualsiasi copy che presenti Android o Windows come offerta corrente. Le singole note di release possono conservare menzioni storiche fattuali ad Android o Windows quando sono necessarie a descrivere ciò che una versione legacy ha effettivamente cambiato; tali menzioni non devono diventare metadata, CTA, navigazione o copy introduttivo. Non creare ora una voce, badge, feed o notifica “Novità” nella web app. [L1] [L10]

23. /instagram resta noindex e conserva i link Home, Prezzi, WhatsApp e Newsletter. La tagline deve usare il nuovo pubblico “laboratori artigianali alimentari” senza settore ristorativo o piattaforme native. [L3] [L10]

24. /download resta noindex, non collegata dalla navbar, dal footer o dalla sitemap e disponibile senza autenticazione solo a chi possiede il link diretto. Può mantenere istruzioni e nomi tecnici necessari al supporto legacy, ma non CTA prova, copy di acquisizione o percorso che promuova Android/Windows ai nuovi visitatori. [L1] [L11]

### SEO, metadata, schema e indicizzazione

25. Il risultato desiderato per la Home deve esporre:

   - title: “Gestionale per pasticcerie, panifici e gelaterie | LabManager”;
   - meta description: “Il gestionale per laboratori artigianali alimentari: ricette, food cost, produzione, etichette, magazzino e ordini. Prova gratuita di 14 giorni.”;
   - H1 del requisito 6.

   Open Graph, Twitter, WebSite, SoftwareApplication e llms.txt devono veicolare lo stesso posizionamento, senza introdurre dettagli più ampi o contrari. [L7] [L12]

26. Il risultato desiderato per /ordini deve esporre:

   - title: “Gestione ordini e piano di lavoro | LabManager”;
   - meta description: “Organizza ordini, ritiri, consegne, acconti e produzione collegata, senza separare il banco dal laboratorio.” [L12]

27. Il risultato desiderato per /pricing deve esporre:

   - title: “Prezzi e prova gratuita | LabManager”;
   - meta description: “Scopri il piano LabManager con prova gratuita di 14 giorni senza carta.”

   La descrizione sopra, incluso Open Graph e Twitter se usano la stessa sintesi, non deve includere prezzi, numero di piani o benefici annuali per evitare snippet obsoleti quando l'offerta cambia. I prezzi restano visibili nella pagina. [L8] [L12]

28. Assicurare che l'output HTML finale dei title sia esattamente quello dei requisiti 25-27: il template metadata di Next non deve produrre un secondo suffisso “| LabManager”. Ogni route indicizzabile deve avere canonical self-referencing, URL Open Graph corretto e description specifica della pagina. [L12] [L13]

   La verifica deve osservare il tag `<title>` nell'HTML generato da Next dopo build/preview, non limitarsi a confrontare gli oggetti `metadata` esportati dalle route.

29. Il metadata e il JSON-LD globali devono rimuovere Android, Windows, offline, ristoranti, requisiti software nativi, file size/download nativi, release/versioni native e feature non approvate. Il SoftwareApplication globale può mantenere soltanto proprietà condivise, neutrali e verificabili; eventuali screenshot desktop/mobile devono avere descrizioni neutre. Il markup page-scoped rimane soltanto quando rappresenta contenuto visibile della route e non introduce Offer o dati di piano non verificabili. [L1] [L2] [L3] [L4] [L8]

30. Riscrivere llms.txt con il nuovo pubblico, i quattro pilastri, i sei claim Magazzino e soltanto Home, Ordini e Prezzi come pagine SEO principali. Rimuovere claim legacy e non trattare Newsletter come landing organica. Conservare robots.txt e gli header text/plain esistenti; non bloccare in robots.txt URL noindex, perché il crawler deve poter leggere il loro noindex. [L4] [L10] [L13]

31. La sitemap contiene soltanto https://labmanagergestionale.com, /ordini e /pricing. Newsletter, Download, Aggiornamenti e billing non devono apparire nella sitemap; Newsletter deve emettere noindex pur rimanendo raggiungibile dal footer. Aggiornare lastModified solo delle route il cui contenuto viene realmente cambiato. [L10] [L11] [L13]

32. Il dominio canonico è labmanagergestionale.com. Tutte le varianti HTTP/HTTPS/www e ogni path/query di pastrylabmanager.com devono continuare a restituire un solo redirect server-side 301 all'URL equivalente canonico, senza catene. Il dominio storico non deve essere bloccato da robots.txt in modo da impedire a Google di vedere il redirect. [L14]

33. Dopo il deploy, il team usa l'accesso già disponibile a Search Console per:

   1. verificare con lo stesso account owner le proprietà a livello di dominio del dominio storico e del dominio canonico, incluse le varianti storiche `www` e non-`www` richieste dal tool, e confermare i redirect prima di avviare la migrazione;
   2. eseguire Change of Address da ogni variante applicabile di pastrylabmanager.com a labmanagergestionale.com secondo i prerequisiti correnti del tool;
   3. inviare `https://labmanagergestionale.com/sitemap.xml`, che deve contenere esattamente Home, Ordini e Prezzi, e richiedere nuova indicizzazione delle tre pagine;
   4. monitorare canonical selezionato, copertura e progressiva scomparsa del risultato storico.

   Conservare i redirect per almeno 180 giorni e più a lungo se il dominio storico riceve ancora traffico dalla ricerca. La Spec non promette una data o un testo esatto dello snippet: Google può scegliere title e snippet e deve ricrawlare le nuove fonti. [L12] [L13] [L14]

### Compatibilità con il programma esistente

34. Questa Spec sostituisce le decisioni di copy, pubblico, CTA, metadata, sitemap e scoperta organica incompatibili con ai_specs/0001-seo-remediation-growth. Non annulla i suoi requisiti tecnici ancora validi, inclusi HTTP → HTTPS, matrix Magazzino, canonical/404, header robots/llms e verifiche Cloudflare. In caso di conflitto, questa Spec prevale per il comportamento e il linguaggio del sito visibili al cliente. [L1] [L4] [L5] [L12] [L13]

35. Prima di pubblicare il riposizionamento, presentare al committente la versione candidata e le evidenze di test, build, preview e verifica browser. Implementazione e verifiche locali possono essere completate senza ulteriore autorizzazione, ma nessun deploy, rilascio pubblico o attività Search Console post-deploy può iniziare prima dell'approvazione esplicita del committente. [L16]

## Technical Decisions

1. La migrazione è realizzata nel repository Next.js App Router del sito. Non modifica il repository Flutter della web app, i suoi meccanismi di autenticazione, abbonamento, PWA, aggiornamento o piattaforma.

2. Riutilizzare e riallineare le sorgenti di verità esistenti invece di duplicare copy:

   - src/data/magazzino-capability-matrix.ts per i sei claim Magazzino;
   - src/data/trial-access-cta-inventory.ts per la matrice CTA approvata;
   - array FAQ condiviso tra DOM visibile e FAQPage;
   - metadata esportati dalle route e grafi JSON-LD testabili.

3. Il contratto responsive delle immagini hero resta invariato nella sua funzione: una sola famiglia immagine/preload utile per breakpoint. Nomi tecnici degli asset, incluso “android” nei filename interni, non sono copy pubblico e non richiedono una rinomina rischiosa; il rendering accessibile e semantico deve però essere neutro.

4. La pagina Newsletter deve essere crawlable per consentire a Google di leggere noindex, ma non viene inserita in sitemap. Download e Aggiornamenti seguono lo stesso principio per i rispettivi meta robots già intenzionali.

5. Il redirect del dominio storico è una configurazione Cloudflare/DNS esterna: worker.ts gestisce soltanto la policy HTTP → HTTPS del dominio corrente. Il Work Item deve documentare l'owner e l'evidenza live, senza simulare un redirect esterno in Vitest come se fosse controllato dal repository.

6. Non aggiungere un nuovo framework test end-to-end per questo rilascio. Vitest, Testing Library, build Next e build OpenNext/Cloudflare sono i contratti automatizzati esistenti; i redirect cross-domain e Search Console richiedono evidenza manuale di ambiente live.

7. L'approvazione alla decomposizione o all'implementazione non equivale all'approvazione alla pubblicazione. Il gate umano del requisito 35 deve rimanere esplicito e non può essere sostituito dal solo superamento dei test o automatizzato dal workflow.

## Testing Strategy

1. Aggiornare o aggiungere test di rendering Home per verificare H1, testo hero, quattro pilastri, copy canonico Magazzino nella Hero, assenza della sezione Piattaforme/Perché legacy, CTA e immagine telefono + desktop con alt neutro. Il test deve controllare il DOM pubblico, non filename interni degli asset. [L4] [L7]

2. Estendere i test di Navbar, footer e inventario CTA per verificare esattamente le quattro voci di navigazione, “Accedi” diretto alla web app nella stessa scheda, prova solo su Home/Prezzi, Ordini → /pricing e assenza di Piattaforme/FAQ/Aggiornamenti dalle aree proibite. Includere WhatsApp come percorso di assistenza, non di prova. [L5] [L6] [L9]

3. Aggiornare i test di Ordini e aggiungere un test dedicato Prezzi. Verificare title/description approvati, CTA, confini degli ordini, prezzi visibili, prova senza carta, benefici annuali, Piano Light assente e dicitura esatta “2 sessioni attive simultanee”. [L4] [L6] [L8] [L12]

4. Estendere i test di metadata e JSON-LD a Home, Ordini, Prezzi e Newsletter. Verificare canonical e Open Graph coerenti, noindex Newsletter, output title senza doppio brand suffix e assenza di Android, Windows, offline e ristoranti negli artefatti pubblici interessati: metadata, grafi JSON-LD, llms.txt, sitemap e DOM marketing. Non applicare il controllo ai nomi tecnici degli asset, alle istruzioni legacy non pubblicizzate di Download o alle menzioni storiche fattuali consentite nelle singole note di release di Aggiornamenti. Il badge, il copy introduttivo e i metadata di Aggiornamenti restano invece soggetti al divieto. [L1] [L2] [L3] [L10] [L11] [L12] [L13]

5. Aggiornare crawl-contracts e sitemap per verificare che solo Home, Ordini e Prezzi siano indexable e inclusi nella sitemap; Newsletter, Download, Aggiornamenti e billing restano esclusi e con i robots concordati. Conservare il test che assicura content type text/plain per robots.txt e llms.txt. [L10] [L11] [L13]

6. Aggiornare i test della matrice Magazzino e delle FAQ affinché continuino a proteggere i sei claim approvati nella Hero, nella FAQ Magazzino della Home e nelle altre superfici obbligatorie già dichiarate dalla matrice. Verificare che “2 sessioni attive simultanee” sia assente dalla Home e presente soltanto in Prezzi e nella sua FAQ. Il JSON-LD FAQ della Home deve derivare dalla stessa sorgente del testo visibile e la risposta su prezzo e disdetta deve usare soltanto la formulazione approvata nel requisito 18. [L4] [L8] [L9]

7. Per ogni Work Item che modifica il sito, eseguire npx vitest run, npm run lint, npm run build e npx opennextjs-cloudflare build. Dopo la build o in preview, verificare nell'HTML finale i title esatti di Home, Ordini e Prezzi. Eseguire inoltre una verifica browser manuale della Home e della navbar a viewport mobile e desktop, compresi focus, menu mobile e CTA.

8. Documentare verifica manuale live per tutte le varianti di pastrylabmanager.com su almeno /, /ordini e un URL con query: status iniziale 301, Location path/query-preserving, singolo hop e canonical finale labmanagergestionale.com. Dopo il deploy, archiviare data, proprietà Search Console usata, invio sitemap, richiesta indicizzazione e stato osservato; non dichiarare il risultato SEO completato prima che Search Console lo confermi. [L14]

9. Prima del deploy, raccogliere in un riepilogo pre-pubblicazione gli esiti dei test automatizzati, delle build Next/OpenNext, dei title HTML e della verifica browser mobile/desktop. Presentare il riepilogo al committente e attendere la sua approvazione esplicita prima di procedere con qualsiasi pubblicazione. [L16]

## Out of Scope

- Decisione tecnica o commerciale definitiva sul mantenimento di Android, dismissione effettiva di Windows, installazione PWA o matrice browser/dispositivo. [L1] [L2]
- Nuove funzionalità della web app, registrazione, verifica email, prova, Stripe, rinnovo, entitlement, billing o il repository Flutter. [L6]
- Nuova pagina o nuovo modulo commerciale Food Cost, Piano Light, pagine SEO aggiuntive, articoli, risorse editoriali o cluster di keyword. [L8] [L15]
- Nuove automazioni newsletter, campagne per ogni release, broadcast WhatsApp o una voce/badge “Novità” nella web app. [L10] [L15]
- Rendere pubblico Download, Aggiornamenti o una nuova pagina “Piattaforme”; rimuovere l'accesso legacy diretto a Download. [L10] [L11]
- Modifiche alla policy HTTP → HTTPS, alla matrice Magazzino approvata, al comportamento 404 o al consenso/analytics al di fuori dei necessari riallineamenti dei test e del copy. [L4] [L14]

## Follow-Ups

1. Quando la decisione Android sarà presa, creare una Spec separata per definire supporto, comunicazione, download e migrazione degli utenti esistenti.

2. Quando Food Cost sarà pronto come modulo/pagina dedicata, definire la sua landing, il perimetro funzionale, i claim approvati, la SEO page-specific e i collegamenti interni.

3. Quando Piano Light sarà definito, approvare prezzo, funzionalità, regole di eligibilità, confronto e CTA prima di esporlo pubblicamente.

4. Dopo il consolidamento della migrazione, valutare una fase separata di contenuti SEO, senza rimettere in discussione il focus della Home.

5. Quando la web app avrà un canale “Novità”, definire in una Spec separata il collegamento alla cronologia Aggiornamenti e le sue regole di notifica.

## Notes

- Vocabolario canonico: GLOSSARY.md.
- Superfici principali: src/app/page.tsx, src/app/layout.tsx, src/app/ordini/page.tsx, src/app/pricing/page.tsx, src/app/newsletter/page.tsx, Navbar, Footer, Hero, FAQ, ContactForm, llms.txt e sitemap.ts.
- Il risultato legacy osservato è un URL storico, non una seconda pagina attiva: la correzione richiede sia copy canonico sia consolidamento del redirect/indice. [L12] [L14]
