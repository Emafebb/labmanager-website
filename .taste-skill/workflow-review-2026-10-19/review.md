# Analisi visiva del selettore laboratorio — 19 ottobre 2026

Perimetro: analisi della sezione «Il tuo lavoro, qui dentro», senza modifiche applicative. Confrontati i due screenshot del committente, brief, pagine per aree, DESIGN.md, brandkit e WorkflowExplorer/CSS. Anteprima dev locale del checkout HEAD c13f887 su http://127.0.0.1:3052, distinta dal sito pubblico e dalla sua build. Dipendenze e documenti concorrenti preservati.

## ROUND 1

Seen in one second: un titolo editoriale seguito da piccoli selettori pallidi e un grande pannello pallido.

Idea (one sentence): i collegamenti tra ricetta, costo, preparazione e vendita diventano un esempio di giornata scelto dal visitatore.

Live thing: scelta del laboratorio, filtro del percorso e collegamenti alle funzioni reali; già presente, ma poco riconoscibile prima del clic.

Layout words by section: hero=split / workflow=selettori e accordion / gallery=tre fotografie / features=split e accordion. La somiglianza tra workflow e successivo catalogo indebolisce la distinzione fra esempio e inventario funzioni.

Scores: design 6 · usability 6 · creativity 5.5 · content 8 → overall 6.1.

Punteggio qualitativo della sola sezione, non dell'intero sito o di una prova con utenti. Caps applied: nessun cap di pagina applicato alla sezione; originalità moderata perché il dispositivo è comune ai gestionali.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. **Comandi indistinguibili dal materiale informativo.** Screenshot utente desktop/mobile e `output/playwright/workflow-review-2026-10-19/1440-initial.jpg`. Pulsanti e pannelli usano lo stesso token `--surface`: salvia al 25% su bianco, circa #edf1ed. Quattro `aria-pressed=false` all'ingresso, mentre Pasticceria è aperta. È lo stato «tutti» previsto dal codice, ma non è spiegato visivamente. Mostrare una scelta iniziale coerente con il racconto, un segno di selezione oltre al colore, e una dicitura operativa vicina ai comandi. L'hover attuale trasla di 3 px; non aiuta a scoprire il controllo su touch.
2. **Due sistemi per scegliere gli stessi quattro esempi.** Screenshot desktop utente e `1440-initial.jpg`: selettori per mestiere sopra, accordion con titoli narrativi sotto, senza esplicitare Panificio/Gelateria/Ristorazione nelle righe chiuse. Dopo il clic spariscono gli altri pannelli e compare «Mostra tutti»: comprensibile dopo aver provato, poco prima. Preferire un solo percorso in primo piano controllato dai quattro selettori; tutti i contenuti restano leggibili senza JS. È una proposta di comportamento, non un fix già applicato.
3. **Troppa superficie uniforme nel percorso aperto.** Screenshot utente mobile, `390-selected.jpg` e fogli mobile dell'ispettore. I quattro passaggi ripetono titolo sottolineato e testo nello stesso blocco. Il racconto perde ritmo e le fotografie arrivano dopo l'intero gruppo. Separare testata del caso e corpo; usare spazio e titoli per distinguere i passaggi; ridurre il vuoto fra introduzione e scelta. A 768 px l'allineamento inferiore della `.section-intro` lascia il titolo più in basso del paragrafo: allinearli in alto nella sola sezione.

## Direzione consigliata

Conservare Traccia, Manrope/Fraunces, i quattro mestieri e i contenuti reali. Non serve un nuovo draw: è una singola sezione con direzione già approvata, «Dressed as something else», seed 1228958381, riallineata al brandkit.

- Campo avorio per raccogliere la sezione; salvia più presente nel gruppo di selezione, evitando il tono quasi bianco corrente.
- Scelta attiva bosco/bianco con segno di conferma e stato iniziale coerente; testo «Scegli il tuo laboratorio» vicino al gruppo. Inattivi distinguibili e feedback focus/pressione conservati.
- Un solo caso in primo piano: testata bosco/bianco e corpo bianco, quattro passaggi leggibili. Su telefono mantenere la griglia 2 × 2 dei selettori e i passaggi in colonna.
- Ambra limitata a un dettaglio decorativo; il kit assegna le azioni a bosco/bianco. Nessun colore per mestiere, ombra o gradiente necessario.

Ordine degli interventi: chiarezza della scelta; gerarchia testata/corpo e peso delle superfici; spaziatura e ritmo mobile. Un cambio di colore isolato non risolve l'ambiguità del modello di interazione.

## Verifica e limiti

- Lint Taste su WorkflowExplorer: 0 FAIL / 0 WARN.
- Inspector originale: 1 FAIL / 4 WARN, con popup newsletter aperto durante lo scorrimento e testo sottostante coperto.
- Ripetizione con `output/playwright/footer-fix/inspect.mjs`, già presente nel progetto: chiusura popup dai pulsanti reali, senza nasconderli o disattivare consensi; 0 FAIL / 3 WARN a 1440/768/390. Avvisi: avorio del brand, assenza di video già documentata, numero di misure tipografiche sul tablet (generale, fuori da questa sezione). Aperte tutte le nove immagini del rapporto `dismissed/`.
- Script locale `output/playwright/workflow-review-2026-10-19/review.mjs`: ingresso, selezione Pasticceria tramite Invio, cambio Gelateria e «Mostra tutti», con assert su stato e visibilità a tre larghezze. Font caricati; nessun overflow orizzontale. Pulsanti alti almeno 52 px; colonne passaggi 4/2/1. Acquisizioni iniziali/selezionate riviste.
- Nessun sorgente prodotto, dipendenza, guida approvata o asset modificato; soltanto evidenze e rapporto locali. Nessun commit/push/deploy, invio moduli o iscrizione. Non rieseguiti suite, build di produzione, Safari o dispositivi fisici. Il comportamento senza JavaScript è ricavato dal markup e non ricollaudato in questa review.
- Nessuna prova con utenti: la difficoltà di scoperta è una valutazione visiva supportata da stati e immagini, non una misura del tasso di clic.
