---
target: homepage del mio sito
total_score: 26
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 3
timestamp: 2026-07-27T22-23-51Z
slug: src-app-page-tsx
---
Method: dual-agent (A: `/root/critique_design_a` · B: `/root/critique_evidence_b`)

## Design Health Score

| # | Euristica | Punteggio | Problema chiave |
|---|---|---:|---|
| 1 | Visibilità dello stato | 3 | Mappa, accordion e form danno feedback; il motivo del submit disabilitato non è esplicito. |
| 2 | Corrispondenza col mondo reale | 4 | Lessico e sequenza operativa sono autentici per un laboratorio alimentare. |
| 3 | Controllo e libertà | 3 | Percorsi chiari e reversibili; la CTA di prova scompare per gran parte della pagina. |
| 4 | Coerenza e standard | 3 | Sistema visivo forte, ma la grammatica passa da 01–06 a 01–02, 05, 6A–6C e C1–C3. |
| 5 | Prevenzione errori | 3 | Campi, email e consenso obbligatorio sono gestiti bene; manca una spiegazione accanto al bottone inattivo. |
| 6 | Riconoscimento vs memoria | 2 | L'interazione delle stazioni va dedotta e su mobile il dettaglio aggiornato resta lontano dal punto toccato. |
| 7 | Flessibilità ed efficienza | n/a | Acceleratori e workflow esperti non sono pertinenti a una landing Persuade. |
| 8 | Estetica e minimalismo | 3 | Pulita e disciplinata, ma binari duplicati e grandi vuoti rallentano la lettura. |
| 9 | Riconoscimento e recupero errori | 2 | Il form conserva i dati e mostra l'errore, ma suggerisce l'email senza offrire un link diretto. |
| 10 | Aiuto e documentazione | 3 | FAQ, contatto e WhatsApp coprono bene il bisogno di supporto. |
| **Totale** |  | **26/36** | **Buono, con correzioni importanti di ritmo e prova** |

## Verdetto di specificità

**Valutazione visiva:** circa **8/10 per specificità**. La linea indaco traduce davvero il modello Ricetta → Food Cost → Produzione → Etichette → Magazzino → Ordini; non sembra una landing SaaS intercambiabile. La scelta di non usare schermate reali funziona. Nella seconda metà, però, il progetto torna progressivamente a form, FAQ e footer più convenzionali, mentre la mappa descrive la conseguenza senza ancora dimostrarla.

**Scansione deterministica:** `detect.mjs --json src/app/page.tsx` ha restituito `[]`: 0 findings, 0 rule ID, 0 file segnalati, nessun falso positivo. È un esito pulito ma stretto, perché `page.tsx` è solo il guscio di composizione e il detector non attraversa gli import. La verifica manuale ha individuato nei componenti/CSS microtesti da `0.65rem–0.7rem` con `--text-tertiary`; sul fondo della hero il contrasto stimato è circa `2.82:1`.

**Overlay visuali:** non disponibili. Il runtime browser non era esposto; l'analisi usa come fallback i sette screenshot forniti.

## Impressione complessiva

La direzione è forte e va preservata. Hero e primo “aha” sono la parte migliore; la perdita di qualità arriva nel ritmo successivo, dove il binario sembra spezzarsi, i padding si sommano e la narrazione si dilata. L'opportunità maggiore è rendere il percorso più continuo e più dimostrativo, non aggiungere altre sezioni.

## Cosa funziona

- **Una tesi unica governa la pagina.** “Fine della mappa. Inizio della prova.” lega bene concetto grafico e conversione.
- **Il prodotto è raccontato nella lingua del mestiere.** Semilavorati, rese, bilanciamento, FIFO, allergeni e piano di lavoro danno credibilità senza screenshot dell'app.
- **Gerarchia e rassicurazioni sono solide.** Titoli, regole, CTA, 14 giorni, funzioni Plus e “senza carta” sono leggibili e coerenti.

## Problemi prioritari

### [P1] Il binario si spezza e si raddoppia tra hero e contenuto

**Perché conta:** negli screenshot `.18` e `.26` una linea termina a destra con un nodo, mentre sotto ne parte un'altra da sinistra con una grande curva. Dovrebbe comunicare continuità, ma sembra un motivo grafico ripetuto o un raccordo montato male.

**Fix:** usare un solo raccordo geometrico tra hero e Features; allineare punto di uscita, curva e spessori. Abbassare il peso del binario secondario a 2–3 px e riservare i 4 px ai nodi attivi.

**Comando suggerito:** `$impeccable polish`

### [P1] Il ritmo verticale crea vallate vuote

**Perché conta:** i `py-24` adiacenti sommano circa 192 px CSS tra sezioni. Negli screenshot `.31` e `.42` il vuoto Produzione → Magazzino e Contatti → FAQ sembra contenuto mancante e rende la pagina più lunga del necessario. Anche Ordini ha molto spazio sopra e sotto rispetto alla sua densità.

**Fix:** collassare gli spazi tra sezioni collegate a 112–128 px totali, conservando un solo respiro ampio prima della prova. Ridurre leggermente il top padding della hero e usare la linea, non il vuoto, come separatore.

**Comando suggerito:** `$impeccable layout`

### [P1] La mappa spiega il legame, ma non lo prova ancora

**Perché conta:** senza screenshot reali, il diagramma deve portare il peso della dimostrazione. Oggi ogni stazione cambia una frase; un titolare capisce la promessa ma non vede una conseguenza concreta. Nel frattempo WhatsApp resta l'unica azione persistente e può diventare più prominente della prova gratuita.

**Fix:** far propagare un micro-esempio non riconducibile a una schermata reale: “farina +8%” → food cost/margine aggiornato → composizione/etichetta coerente → fabbisogno e scorta → ordine/piano. Aggiungere una CTA di prova compatta nella navbar dopo lo scroll o subito dopo FAQ, e ritardare/ridurre la prominenza di WhatsApp.

**Comando suggerito:** `$impeccable clarify`

### [P2] La grammatica delle stazioni è troppo codificata e alcuni microtesti sono deboli

**Perché conta:** 01–06, 01–02, 03–04, “Stazione 05”, 6A–6C e C1–C3 sembrano tassonomia interna più che orientamento per l'utente. Gli indici della mappa e del magazzino sono piccoli e chiari; per un utente anziano o ipovedente diventano faticosi.

**Fix:** scegliere una sola numerazione 01–06 per le stazioni principali e usare titoli descrittivi, non ulteriori codici, per i sottoelementi. Portare etichette interattive e indici ad almeno 14 px e a un colore con contrasto AA quando veicolano informazione.

**Comando suggerito:** `$impeccable typeset`

## Red flag per persona

**Titolare alla prima visita:** capisce subito cosa fa LabManager, ma non trova velocemente costo, tempo di adozione e modalità di importazione delle ricette. Quando è convinto a metà pagina, l'azione fissa più evidente è WhatsApp invece della prova.

**Operatore di laboratorio:** riconosce il lessico tecnico, ma vede soprattutto nomi di capacità. Manca un esempio verificabile che colleghi una modifica di ricetta a costi, allergeni, scorte e produzione; i molti codici possono sembrare processo imposto.

**Utente anziano/ipovedente:** indici da 10–12 px, grigi terziari e widget fissi ai due angoli aumentano lo sforzo. Il submit lilla comunica indisponibilità ma non dice vicino al bottone “accetta la privacy per continuare”. Touch target, focus e reduced motion sono invece sopra la media.

## Osservazioni minori

- Il cerchio nero “N” è il dev indicator di Next.js su localhost: non è un problema di produzione.
- I titoli parzialmente coperti in `.38` e `.44` non dimostrano un bug di anchor: `scroll-padding-top: 80px` esiste già e potrebbe essere solo la posizione dello screenshot.
- Logo caldo e giocoso e mappa tecnica austera hanno una lieve dissonanza; un piccolo richiamo cromatico caldo potrebbe unirli senza perdere disciplina.
- “Una ricetta, due letture” è più memorabile di “due catene”: meglio scegliere una sola formula.
- Il footer è coerente ma alto; i widget fissi vanno testati su mobile, non giudicati dai soli desktop.
- Tutti e sette gli screenshot sono desktop: reflow, focus, stati errore/successo e sovrapposizioni mobile restano non verificati.

## Domande da decidere

1. Il binario deve restare il protagonista grafico, oppure diventare un'infrastruttura più sottile dopo la hero?
2. La prossima iterazione deve privilegiare **A) continuità + ritmo (consigliato)**, **B) micro-prova con dati**, oppure **C) gerarchia CTA/WhatsApp**?
3. Vuoi che il visitatore ricordi alla fine il supporto amministrativo o la certezza che iniziare la prova sia semplice e senza rischio?
