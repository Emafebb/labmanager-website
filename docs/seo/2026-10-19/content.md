# Contenuti e percorsi di ricerca — audit prepubblicazione

Data: 19 ottobre 2026. Build di produzione Next del commit `3b9bb7c6b86f67500d2e1f0293b03060d13ca3ec`, ricostruita dall’archivio Git in `/tmp/lm-seo-20261019-3b9bb7c`. Target HTTP: `http://127.0.0.1:3049`. I percorsi riportati sotto appartengono a questa anteprima, non al dominio pubblico.

## Esito

Le sette pagine hanno intenti commerciali distinguibili, testi specifici sul lavoro del laboratorio e condizioni Light/Plus coerenti con le fonti commerciali approvate. Non emerge un bug verificato nei contenuti che, da solo, imponga di riscrivere le pagine prima della pubblicazione. La principale opportunità è mostrare il prodotto autentico: gli esempi attuali chiariscono il lavoro, ma restano illustrativi.

Questo è un esame del contenuto e della sua disponibilità nella build. Non sostituisce il collaudo manuale del committente e non prova che tutte le funzioni descritte siano rilasciate nell’app pubblica. Il live non è stato usato come prova della nuova versione.

## Prove e riproduzione

- [Inventario HTML e misure](../../../output/seo-audit-2026-10-19/content/html.json), HTML integrali e testo ripulito per ogni route nella stessa cartella; output locali ignorati da Git.
- [Script di acquisizione](../../../output/seo-audit-2026-10-19/content/measure.mjs): `node output/seo-audit-2026-10-19/content/measure.mjs http://127.0.0.1:3049`. Esegue solo GET sulle sette pagine, asserisce status 200 e H1 singolo, estrae il contenuto con JSDOM.
- [DOM Chrome condiviso](../../../output/seo-audit-2026-10-19/browser/dom.json): 7 pagine a 1440 px, 7 a 390 px e 7 con JavaScript disabilitato; esaminati testo visibile, testo DOM, immagini, dettagli e metadata. [Confronto con HTML](../../../output/seo-audit-2026-10-19/content/dom-comparison.json): status e title coerenti su 21 viste.
- Fonti di prodotto consultate: `src/data/work-areas.ts`, `src/app/sitemap.ts`, pagine e componenti attuali, manifesto commerciale, `.taste-skill/feature-evidence.md`, brief e documento delle aree. La cache SEO luglio/agosto non è stata usata per descrivere questa build.

## Inventario e copertura

| Route locale | Title realmente servito | H1 | Intento coperto e distinzione |
| --- | --- | --- | --- |
| `/` | Gestionale per laboratori alimentari \| LabManager | Dalla ricetta al banco. | Panoramica del gestionale, percorsi Pasticceria/Panificio/Gelateria/Ristorazione, consulenti, catalogo, prova, prezzi e contatti. |
| `/ricette-food-cost` | Ricette e Food Cost \| LabManager | Una ricetta, anche nei conti. | Formula, ricalcolo, bilanciamento, assemblaggi, costo e margine; menu e analisi per i clienti dei consulenti. |
| `/produzione-magazzino` | Produzione e Magazzino \| LabManager | Prepari oggi. Sai cosa resta. | Ricevimento e verifica DDT, preparazioni, giacenze per sede, lotti anche senza produzione, movimenti e tracciabilità PDF. |
| `/ordini` | Gestione ordini e piano di lavoro \| LabManager | Ogni ordine, al suo posto. | Richieste cliente/interne, lavoro per giorno/stato, quantità, avanzamento, peso effettivo, acconti/saldi, consegna. |
| `/etichette-libro-ingredienti` | Etichette e Libro ingredienti \| LabManager | Dal prodotto all’etichetta. | Documenti derivati dalla composizione, assortimenti, stato degli aggiornamenti, controllo umano, distinzione Light/Plus. |
| `/strumenti` | Strumenti e calcolatori \| LabManager | Il calcolo giusto, quando serve. | Catalogo dei sette strumenti con casi d’uso, input e output; dichiara esplicitamente che i calcolatori si usano nella web app. |
| `/pricing` | Prezzi Light e Plus \| LabManager | Un piano per il tuo lavoro. | Confronto commerciale, periodicità, inclusioni, supporto, sessioni, prova, pagamento e cancellazione. |

Title e description sono presenti e distinti su 7/7 pagine; le description riassumono l’area corrispondente. Gli H1 editoriali sono contestualizzati da title, breadcrumb/introduzione e contenuti specifici. Non è motivato sostituirli automaticamente con elenchi di parole chiave. La gerarchia H1/H2/H3 non mostra salti strutturali nel main estratto. Le sezioni finali condivise non rendono equivalenti i contenuti centrali delle cinque aree.

## Contenuto nei dettagli HTML

Home conserva nel markup iniziale tutti e quattro i percorsi e le schede delle funzionalità; il DOM contiene anche il testo dei dettagli chiusi. Strumenti conserva tutti e sette i casi d’uso, input e risultati: un dettaglio è aperto inizialmente e gli altri restano disponibili nel markup senza JavaScript. Il testo visibile iniziale è naturalmente più breve del testo DOM: questa differenza non viene segnalata come contenuto mancante o cloaking. Le FAQ di Home/Prezzi sono presenti nell’HTML e il loro comando di apertura richiede JavaScript; la sola acquisizione no-JS non prova il loro funzionamento interattivo. Il confronto esamina disponibilità del contenuto, senza dedurre che Google abbia indicizzato ogni passaggio.

## Offerte e attendibilità

Verificata la presenza nell’HTML iniziale di home e Prezzi di €16,67/mese Light e €40/mese Plus con pagamento annuale e totali €200/anno e €480/anno. Prezzi esplicita che si tratta dell’equivalente mensile. Le FAQ riportano anche €19,99/mese Light e €44,99/mese Plus. Questo evita di dedurre il costo mensile effettivamente fatturato dal solo importo equivalente.

Le CTA avviano la prova di 14 giorni con funzioni Plus senza carta; il sito chiarisce che registrazione, piano e pagamento avvengono nella web app. Produzione/Magazzino e Ordini sono presentati come Plus, gli strumenti come Light e Plus. Libro ingredienti distingue gestione/consultazione Light dalla generazione/storico PDF Plus: la fonte è la conferma prodotto e il catalogo dell’app documentati in `.taste-skill/feature-evidence.md`, non una capacità presente nel manifesto sito originale.

Etichette/Libro ingredienti descrive le verifiche come supporto al controllo dei dati e richiede di verificare materie prime, allergeni e preparazione effettiva. Non promette conformità legale automatica. I tempi di lievitazione derivano dalle durate impostate; non si promette una previsione automatica indipendente dal processo reale.

## Rilievi prioritari

### C-01 — Opportunità, priorità media: manca una dimostrazione autentica incorporata del prodotto

**URL:** tutte e sette le pagine, soprattutto `/ricette-food-cost`, `/ordini`, `/etichette-libro-ingredienti`.

**Prova:** l’inventario `images` nell’HTML delle pagine mostra foto editoriali di lavorazione; non mostra schermate dell’app nel main. Ordini usa una tabella esplicitamente chiamata «Esempio di piano di lavoro, con dati illustrativi»; Ricette usa quantità illustrative. Quattro pagine espongono la didascalia AI vicino alla foto e il footer spiega l’origine delle immagini di lavorazione. Il registro dello stato dichiara ancora attesi gli screenshot autentici Food Cost, Ordini e Libro ingredienti.

**Impatto:** un acquirente può riconoscere il processo e le funzioni, ma non valutare l’interfaccia e l’output concreto prima di registrarsi. È un limite di prova ed esperienza visibile, non prova di una penalizzazione Google.

**Proposta:** quando il committente consegna screenshot autentici con dati dimostrativi, aggiungere una schermata pertinente nei tre punti già individuati, con didascalia che spieghi cosa si vede e quali dati sono dimostrativi. Per Libro ingredienti può essere utile anche un estratto PDF approvato. Conservare foto editoriali e identità Traccia dove servono alla composizione; non inventare dashboard, clienti, recensioni o risultati.

**Limite:** nessun test con utenti o misura di conversione; non quantificabile il beneficio SEO/conversione prima dell’osservazione.

### C-02 — Opportunità, priorità bassa: rendere la FAQ iniziale coerente con la copertura multisettore

**URL:** `/#faq`.

**Prova:** alla domanda «A chi è rivolto LabManager?» la risposta enumera «in particolare pasticcerie, panifici e gelaterie». Ristorazione e consulenti sono invece presenti nel percorso home Ristorazione e nella pagina Ricette/Food Cost.

**Impatto:** nessuna esclusione esplicita né contraddizione funzionale; tuttavia chi legge solo la risposta riassuntiva può non riconoscere ristorazione e consulenza.

**Proposta:** alla prossima revisione del copy, mantenere il target “laboratori artigianali alimentari” e integrare ristorazione/consulenti nella risposta con una frase concreta sul Food Cost dei menu. Aggiornare contestualmente la risposta JSON-LD derivata dagli stessi dati. Non richiede nuove pagine settoriali.

**Limite:** ipotesi di chiarezza per il lettore; nessuna perdita di ranking o traffico dimostrata.

### C-03 — Ipotesi da misurare dopo la pubblicazione: intento delle ricerche sui calcolatori

**URL:** `/strumenti` e relative ancore.

**Prova:** la pagina è un catalogo commerciale, con input/output dei sette strumenti e accesso alla prova; non esegue i calcoli nel sito. Il testo dichiara correttamente l’uso nella web app.

**Impatto da verificare:** query generiche come “calcolo W farine” o “conversione stampi” potrebbero richiedere uno strumento immediato anziché un catalogo. Non è stato misurato il mix di intenti, quindi non viene attribuito un mismatch SERP alla pagina.

**Proposta:** dopo il deploy autorizzato osservare query, landing page e comportamento; solo se l’evidenza lo giustifica valutare contenuti o una dimostrazione aggiuntiva. Nessun calcolatore gratuito, nuova dipendenza o nuova route è necessario per chiudere questo audit.

## E-E-A-T e contenuto AI

| Dimensione | Evidenza osservabile | Limite / azione utile |
| --- | --- | --- |
| Esperienza | Esempi di ricette, ordini, lotti e menu specifici; distinta origine dei dati illustrativi. | La descrizione del processo non sostituisce la vista del prodotto; vedere C-01. |
| Competenza | Terminologia pertinente, quantità/pesi/porzioni, input/output dei tool, limiti operativi e controllo umano. | Il sito non identifica un revisore tecnico o racconta l’esperienza pratica di chi costruisce il prodotto; farlo solo con informazioni autentiche disponibili. |
| Autorevolezza | Identità di prodotto e società presenti. | Reputazione esterna, citazioni, backlink e testimonianze non misurati: nessun giudizio negativo ricavato dalla loro mancata verifica. |
| Fiducia | Footer con società, P.IVA, REA, sede, email, privacy/cookie e contatti; offerte chiare; AI/editoriale e dati illustrativi dichiarati. | Verifica normativa e correttezza delle funzioni nell’app live non incluse; nessun invio di moduli o pagamento. |

La ripetizione della struttura delle aree è una scelta di navigazione coerente. I contenuti centrali differiscono in compiti, esempi, dati e risultati: non emerge una serie di pagine generiche ottenute cambiando soltanto una parola chiave. Non è possibile dedurre l’autore umano o AI dallo stile; si valuta il valore e la precisione della pagina, non un ipotetico rilevatore AI.

## Leggibilità e quantità di testo

Misure descrittive, senza obiettivi di ranking. Conteggio approssimativo del main esclusi script/style, includendo sezioni chiuse; prosa selezionata da `p`, `dd` e `li` senza duplicare contenitori e paragrafi figli. Gulpease: `89 + (300 × frasi − 10 × lettere) / parole`. È stato usato un indice italiano, non il Flesch inglese; etichette/frammenti UI e punteggiatura rendono questi numeri indicativi.

| Route | Parole main circa | Gulpease prosa | Parole/frase prosa circa |
| --- | ---: | ---: | ---: |
| `/` | 1197 | 69,8 | 8,5 |
| `/ricette-food-cost` | 489 | 67,7 | 9,3 |
| `/produzione-magazzino` | 451 | 66,9 | 9,9 |
| `/ordini` | 423 | 62,7 | 11,0 |
| `/etichette-libro-ingredienti` | 474 | 61,7 | 10,6 |
| `/strumenti` | 637 | 64,9 | 10,8 |
| `/pricing` | 514 | 84,9 | 6,3 |

Google non dichiara un conteggio preferito: il controllo utile è che l’acquirente trovi cosa fa l’area, quando serve, quale piano la include, i limiti e come provarla. Queste domande sono coperte; C-01 riguarda la prova, non la lunghezza. PAC/POD e overrun sono termini specifici del pubblico: una breve espansione alla prima occorrenza può aiutare i lettori meno esperti, senza ripetizioni forzate.

## Riutilizzabilità delle risposte e SXO

Le frasi su piani, prova, input/output, lotti e controllo documenti sono estratti comprensibili e verificabili; elenco dei tool e confronto prezzi forniscono strutture facilmente consultabili. Le sezioni Light/Plus e le FAQ rispondono direttamente a domande reali. L’aggiunta di numeri inventati o FAQ ripetitive non migliorerebbe la citabilità.

La disponibilità del testo e la struttura non misurano la probabilità di citazione da parte di ChatGPT, AI Overviews o altri sistemi. Non sono stati misurati né visibilità AI né ranking; nessun punteggio predittivo viene assegnato. Senza un campione SERP localizzato e tracciabile, questo report tratta l’allineamento ai compiti dei lettori, senza dichiarare consenso SERP, volumi o posizioni.

## Fonti ufficiali consultate

- [Google: contenuti utili e affidabili](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), consultata 19/10/2026, pagina aggiornata 05/10/2026: nessun conteggio preferito, qualità/precisione e scopo per il lettore; E-E-A-T non è un singolo fattore di ranking. La disponibilità di un autore nominato va valutata dove il lettore se lo aspetta, non imposta a ogni landing commerciale.
- [Google: contenuti generati con AI](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content), consultata 19/10/2026, pagina aggiornata 01/10/2026: verifica umana dell’accuratezza prima della pubblicazione, anche per metadata, schema e alt; valore del contenuto e contesto della sua produzione. L’audit tecnico/editoriale ora è compatibile con una successiva accettazione umana prima del deploy.

Le percentuali, soglie di densità e generalizzazioni sugli aggiornamenti riportate nei materiali delle skill non sono state trattate come requisiti ufficiali. Non si chiedono più parole o date visibili artificiali per simulare freschezza.

## Cosa resta aperto

Accettazione manuale del committente, prova dell’app pubblica e screenshot autentici; verifica dopo deploy di HTML/edge live, indicizzazione e prestazioni sul campo; eventuale ricerca SERP e dati Search Console/analytics. Nessuna modifica ai contenuti del prodotto, commit, push, deploy, invio reale o modifica esterna eseguiti per questo report.
