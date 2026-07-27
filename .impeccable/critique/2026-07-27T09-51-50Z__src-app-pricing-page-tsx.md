---
target: pricing
total_score: 19
max_score: 36
na_heuristics: 9
p0_count: 2
p1_count: 2
timestamp: 2026-07-27T09-51-50Z
slug: src-app-pricing-page-tsx
---
Method: dual-agent (A: a48553a5e301f00d5 · B: ae61f1d280259f328)
Browser visualization: SKIPPED — nessun tool di automazione browser esposto in sessione. Nessun overlay visibile all'utente.

## Design Health Score

| # | Euristica | Punteggio | Problema chiave |
|---|-----------|-----------|-----------------|
| 1 | Visibility of System Status | 3 | Toggle chiaro (`aria-pressed` + riempimento), ma i prezzi cambiano senza `aria-live`: chi usa uno screen reader preme "annuale" e non sente cambiare nulla, su un controllo il cui unico scopo è cambiare numeri. |
| 2 | Match System / Real World | 2 | "dispositivi simultanei" ×3 contro il GLOSSARY normativo ("sessioni attive simultanee", _Avoid_: due dispositivi); `Supporto ({periodicita})` fa trapelare una variabile di stato in un'etichetta di tabella; l'icona `Factory` contraddice *artigianale*. |
| 3 | User Control and Freedom | 3 | Toggle e accordion reversibili, ma la FAQ è a singola apertura: leggere "Posso disdire?" chiude "Posso acquistare dal sito?" — le due domande che un compratore tiene insieme. |
| 4 | Consistency and Standards | 1 | Secondo sistema d'accento (ambra + #1d0640), grigi fuori token, `font-extrabold` su un font caricato max 700, ombra colorata al 25% a riposo, ritmo 56/80px contro la regola dei 96, ombre Tailwind di default invece di Appoggio/Sollevamento/Distacco. |
| 5 | Error Prevention | 1 | Tre trappole: la CTA della card Light avvia una prova **Plus** senza dirlo; l'unico bottone pieno in navbar è "Accedi" verso lo stesso host (un nuovo visitatore finisce su un login); l'annuale è preselezionato e il numero grande è l'equivalente mensile (€16,67), con i €200 realmente addebitati in grigio piccolo. |
| 6 | Recognition Rather Than Recall | 2 | Il toggle sta ~2 viewport sopra la riga "Supporto (annuale)" che governa; "Tutto di Light, più" obbliga a ricordare sei voci; la colonna delle etichette della tabella non è sticky, quindi in scroll orizzontale si leggono spunte anonime. |
| 7 | Flexibility and Efficiency | 2 | Su una pagina di decisione lunga ~4 schermate non c'è ancora al confronto, né CTA sticky, né deep-link per il "Scopri i prezzi" di /ordini. Non è tooling da power user: è wayfinding di base. |
| 8 | Aesthetic and Minimalist Design | 2 | La colonna Plus è 17 spunte identiche consecutive (informazione zero); la rassicurazione sulla prova è ripetuta sei volte; due bottoni primari pieni in contemporanea violano "mai più di una azione primaria per schermata". |
| 9 | Error Recovery | n/a | La superficie non ha form, validazione né stati di errore: gli unici input sono un toggle a due stati e sei disclosure. Genuinamente inapplicabile. |
| 10 | Help and Documentation | 3 | La FAQ **è** il livello di documentazione ed è generata dal manifesto, ma tutte e sei partono chiuse: le due risposte a più alta ansia (carta, disdetta) sono invisibili, e "Posso acquistare dal sito?" risponde "**No.**" dove servirebbe rassicurazione. |
| **Totale** | | **19/36** | **Acceptable (52,8%)** — trascinato in basso da consistency ed error prevention. |

Euristiche segnate n/a: 9. Massimo applicabile: 36.

## Design Specificity Verdict

**Valutazione LLM (non ancorata al detector).** Questa pagina potrebbe cambiare contenuto e diventare quella di qualunque altro SaaS B2B senza che nessuno se ne accorga. La composizione è il template canonico nell'ordine canonico: pillola occhiello → h1 → tre bullet di rassicurazione → toggle mensile/annuale con badge sconto → due card, quella di destra scura con nastro "consigliato" → blocco "non sai quale scegliere?" → matrice completa → accordion FAQ. Non c'è una sola decisione strutturale che venga dal prodotto.

Ciò che è specifico è il *copy* — ma il copy non è scritto, è renderizzato. Ogni nome di capacità, prezzo, numero di sessioni e stringa di supporto esce da `manifesto-commerciale.v1.json` via `src/lib/pricing.ts`. Ottima ingegneria, ma significa che "bilanciamento", "semilavorati", "DDT" arrivano come *dati iniettati in una cornice generica*, non come design. Sostituisci il manifesto con il listino di Stripe e la pagina rende identica.

I due punti in cui la pagina cerca carattere sbagliano entrambi:

- **Le icone.** `ChefHat` per Light, `Factory` per Plus. La metafora di upgrade, su una pagina che vende a *laboratori artigianali*, è una **fabbrica** — puntata esattamente contro il posizionamento che il prodotto rivendica. E `ChefHat` è iconografia da chef/ristorante, che vota silenziosamente sul perimetro di pubblico *ancora aperto*. Nessuna delle due dice pasticceria, panificio o gelateria — e non lo dice nemmeno una parola di copy.
- **La card Plus ambra-su-prugna.** È la scelta più intercambiabile disponibile: il tier scuro evidenziato con CTA calda è il pattern di pricing più copiato degli ultimi otto anni. Il DESIGN.md non si limita a sconsigliarlo, lo nomina per file. L'unico tentativo di personalità visiva della pagina è il debito dichiarato del sistema.

**Coerenza col resto del sito: debole e misurabile.** La North Star è "La Catena Continua" — respiro fisso a 96px, rifiuto di far sembrare separate cose collegate. Questa pagina usa 56/80/80/80px e mai 96. I colori di testo sono fuori token ovunque: `text-gray-900` dove il sistema prescrive Inchiostro #333333 e lo giustifica *proprio* sul contesto di lettura di questa pagina; `text-green-700`/`green-100` per i risparmi dove il token semantico è `--success` e dove il DESIGN.md dice che il verde è "esito positivo. Mai come colore decorativo o di crescita" — e "Risparmi €39,88" è crescita decorativa per definizione.

**Sameness strutturale.** Hero allineato a sinistra → toggle centrato → card centrate → "Non sai quale scegliere?" a sinistra → intestazione confronto a sinistra → intestazione FAQ centrata. Cinque cambi d'asse senza una regola che li governi: legge come assemblato, non composto.

**Occasioni mancate di carattere di prodotto:** zero screenshot del prodotto sulla superficie dove si decide la spesa e dove il capo laboratorio esercita il veto; la catena non è disegnata (Light arriva fino all'etichetta, Plus prosegue fino all'ordine — è letteralmente lì che la catena si taglia); il meccanismo incopiabile, il bilanciamento, è una riga di tabella con lo stesso peso di "Impostazioni e gestione abbonamento".

**Scansione deterministica.** `detect.mjs` su `src/app/pricing`: **5 findings, 1 regola distinta**, tutte `design-system-font-size` (advisory), tutte in `pricing-selector.tsx`, tutte veri positivi — corpi 15px (righe 179, 244, 383, 391) e 11px (riga 353) fuori dalla scala tipografica documentata. Il più grave è l'11px: tre pixel sotto il gradino minimo, per giunta `uppercase` + `font-extrabold`. `page.tsx` e `pricing-faq.tsx`: zero findings. Navbar e Footer: zero findings. Nessun falso positivo.

Il detector ha però **mancato** tutto ciò che pesa davvero — il secondo sistema d'accento, i pesi non caricati, il contrasto, l'assenza di CTA finale — mentre i controlli meccanici indipendenti hanno confermato: 7 occorrenze di `font-extrabold` (peso 800 non caricato: il browser sintetizza un finto grassetto), 11 valori colore fuori token, "Contattaci" senza area di tocco, `aria-label` su un `<p>` (riga 593, bloccato da un contract test in `page.test.tsx:125`), e "fino a −17%" come unico numero commerciale non derivato dal manifesto (reale: 16,62% su Light, 11,09% su Plus).

**Un fatto emerso dal detector e non dalla review:** la deriva ambra/prugna **è già uscita da pricing**. `src/components/TrialCallout.tsx:18,26,45,57` porta la stessa coppia sulla home. Il DESIGN.md è stato corretto di conseguenza.

## Overall Impression

Il motore è migliore della carrozzeria. La pipeline manifesto→render rende questa pagina strutturalmente incapace di mentire sui prezzi — un asset reale per un prodotto la cui credibilità, in totale assenza di prova sociale, poggia sui numeri veri del listino. Poi quella solidità viene spesa su un layout preso in prestito, con un nastro che dichiara una prova sociale che non esiste, e la pagina finisce senza un bottone.

La singola opportunità più grande: **la pagina chiede una scelta che non esiste.** Non si compra da qui, e la prova è sempre Plus. Se accettasse questo fatto invece di nasconderlo, la maggior parte dei problemi qui sotto si dissolverebbe — nastro, doppia CTA, FAQ #5, forse anche il toggle.

## What's Working

**1. La pipeline manifesto→render è un asset di design, non solo codice pulito.** Ogni prezzo, nome di capacità, quota AI, limite di sessioni e descrizione di supporto deriva da `manifesto-commerciale.v1.json`, incluse le risposte FAQ via `commercialPriceSummary()` e `describeOfferSupport()`. La tabella non può divergere dagli entitlement dell'app e la FAQ non può contraddire le card sopra. Per un prodotto senza prova sociale, una superficie d'offerta incapace di mentire è vantaggio competitivo vero.

**2. La triade di rassicurazione dell'hero.** 14 giorni · senza carta · disdici quando vuoi: tre obiezioni — durata, rischio di pagamento, lock-in — risolte in nove parole, con icone a 16px, **prima** del primo simbolo di euro. Segue la sequenza d'ansia del titolare invece di quella di vendita del venditore.

**3. "Non sai quale scegliere?" è l'unica scrittura situazionale della pagina.** "Siete in 1–2 sul gestionale", "Ricevi DDT e vuoi importarli con l'AI": sono affermazioni di auto-identificazione, non feature. Fanno più lavoro decisionale di tabella, toggle e card messe insieme — e stanno 80px sotto la decisione che risolvono.

## Priority Issues

### [P0] "Consigliato dai laboratori" è prova sociale fabbricata, ed è l'elemento più forte della pagina
**Cos'è:** `pricing-selector.tsx:148` — nastro ambra sulla card Plus, `font-bold uppercase` con icona `Sparkles`, a `-top-3.5` sopra il bordo: il pixel a più alta croma e più alto contrasto della superficie.
**Perché conta:** PRODUCT.md è esplicito — non esistono testimonianze, recensioni, case study o metriche pubblicabili, e il lavoro futuro non deve fabbricare prova sociale. Il nastro afferma che una popolazione plurale di laboratori raccomanda quel piano. Oltre al problema di verità, costa conversioni: è l'apice visivo di una pagina il cui apice dovrebbe essere il prezzo o la CTA, e un'affermazione non verificabile erode esattamente la fiducia che serve. Risolve anche in silenzio la questione aperta del perimetro di pubblico, implicando una base installata.
**Fix:** sostituire con un'affermazione vera che lavora di più: **"La prova gratuita è Plus"**. È verificabile dal manifesto, spiega perché entrambe le CTA portano allo stesso posto, e converte un finto endorsement in una ragione reale per scegliere Plus. Togliere `Sparkles`, riportare il nastro a `bg-primary`/`text-white`.
**Comando:** `/impeccable clarify`

### [P0] La pagina finisce senza un modo per agire
**Cos'è:** l'ordine finale è `PricingFAQ` (sei accordion chiusi) → `Footer` (scuro, 9 link, P.IVA) → bolla WhatsApp flottante. L'ultima CTA di prova è dentro le card, circa due viewport sopra. `/pricing` non ha l'equivalente del `TrialCallout` della home.
**Perché conta:** il sito ha una sola azione di successo. Chi apre e legge tutte e sei le risposte FAQ è per definizione la persona più convinta della pagina — e la pagina lo ricompensa con testo legale. Per la peak-end rule è il momento che resta in memoria, e su mobile "risali due schermate per trovare il bottone" è abbandono reale. Gli unici sbocchi nell'ultima viewport sono i percorsi che PRODUCT.md designa come di ripiego.
**Fix:** blocco di chiusura dopo `PricingFAQ` con la CTA `pricing-trial`, la triade di rassicurazione ripetuta e una riga onesta sulle sessioni di onboarding annuali. Su `<lg`, barra sticky in basso con CTA e periodicità selezionata — che ripara anche il fallimento di memoria di lavoro.
**Comando:** `/impeccable layout`

### [P1] La scelta che la pagina chiede non esiste, e il bottone più visibile porta a un login
**Cos'è:** tre difetti collegati. (a) Entrambe le CTA delle card risolvono allo stesso item `pricing-trial` → stessa URL → stessa prova, che include **tutte le funzionalità Plus**. Chi ha appena scelto Light clicca e riceve una prova Plus; niente sulla card lo dice. (b) Non esiste alcun percorso d'acquisto, e l'unico posto in cui è dichiarato è la FAQ #5 — chiusa — dove si legge "**No.**". (c) L'unico bottone pieno della navbar è **"Accedi"**, verso lo stesso host, nello stesso indaco della CTA Light: chi visita per la prima volta lo legge come "inizia" e finisce su una schermata di login.
**Perché conta:** è il funnel diretto. La pagina spende quattro schermate per far scegliere un titolare, poi butta via la scelta; e mette in cima a ogni viewport un bottone sosia che porta i nuovi in un vicolo cieco. Il "No." della FAQ #5 è la peggior formulazione possibile di quella che è in realtà una buona notizia.
**Fix:** una sola azione primaria per card, con microcopy "La prova è sempre Plus per 14 giorni: alla fine scegli Light o Plus nell'app". Riscrivere la FAQ #5 come rassicurazione: "Non serve. Registri la prova senza carta e scegli il piano nell'app quando hai deciso." Distinguere "Accedi" visivamente: trattamento secondario/ghost, non l'unico bottone pieno sopra la piega.
**Comando:** `/impeccable clarify`

### [P1] La pagina fa girare un secondo sistema d'accento, ed è il motivo per cui legge come SaaS generico
**Cos'è:** `#FBBF24` + `#1d0640` come palette parallela completa (nastro, icona, spunte, pillola "Tutto di Light, più", risparmi, CTA, badge del toggle); `font-extrabold` in 7 punti su un font caricato max 700; `shadow-xl shadow-primary/25`, ombra colorata a riposo al 25% contro un tetto documentato dell'8%; `text-gray-900`/`600`/`500` e `text-green-700` al posto della scala Inchiostro e di `--success`; ritmo di sezione 56/80px invece di 96; `max-w-4xl` per il listino dove il sistema riserva 1024px; FAQ a raggio 12px dove le card di contenuto sono 16px. Cinque font-size fuori scala confermati dal detector (15px ×4, 11px ×1).
**Perché conta:** oltre alla conformità, **è proprio il trattamento ambra/prugna a rendere la pagina intercambiabile con ogni altra pagina prezzi SaaS**. Due dei difetti sono funzionali, non stilistici: il peso 800 sintetico degrada visibilmente le cifre del prezzo a `text-5xl`, e `text-gray-900` scavalca l'unico token che il sistema giustifica specificamente per "schermo piccolo a fine giornata".
**Fix:** tornare all'indaco. Plus si differenzia per *superficie e peso*, non per una seconda tinta: card Bianco Puro su fascia `--surface`, bordo 1px, ombra Distacco, piastrella icona indaco, CTA indaco; Light un gradino sotto. Tetto dei pesi a 700. Grigi hardcoded → scala token. Spaziature a 96px. Cifre di risparmio in grassetto, non in verde.
**Comando:** `/impeccable polish`

### [P2] La tabella di confronto è inusabile sul dispositivo reale, e metà non porta informazione
**Cos'è:** `min-w-[560px]` dentro `overflow-x-auto` senza affordance di scroll e senza colonna etichette sticky; "non incluso" è un `<Minus>` in `text-gray-300` (~1,48:1 su bianco, sotto la soglia WCAG per contrasto non testuale); nessun `<caption>`; la colonna Plus rende 17 spunte identiche e 17 annunci `sr-only` "Incluso" senza meccanismo di salto; `Supporto ({periodicita})` fa dipendere un'etichetta da un controllo fuori schermo; la bolla WhatsApp si sovrappone al bordo destro.
**Perché conta:** PRODUCT.md: mobile è il caso reale, lettura prevalentemente da telefono a fine giornata. L'unico glifo che codifica l'intera differenza tra i due piani è quello che il lettore target non vede, e la colonna che dovrebbe vendere il piano costoso non comunica nulla.
**Fix:** invertire la tabella. Plus include tutto, quindi le sole righe informative sono le cinque che Light **non** ha: aprire con un blocco "Cosa aggiunge Plus" e mettere la matrice completa dietro un `<details>`. Esclusioni con token etichettato a ≥3:1, `<caption>`, prima colonna sticky, e due righe distinte "Supporto mensile"/"Supporto annuale" per togliere la dipendenza dallo stato fuori schermo.
**Comando:** `/impeccable adapt`

## Persona Red Flags

**Jordan (primo contatto):** le due CTA puntano allo stesso posto ma promettono cose diverse — sceglie Light, clicca, ottiene Plus. "Consigliato dai laboratori" lo porta a cercare recensioni che non esistono: la credibilità si inverte. La FAQ #5 risponde "No." dietro un accordion chiuso, quindi non costruisce mai il modello di "come lo ottengo". `Supporto (annuale)` sembra una stringa incompleta. "3 dispositivi simultanei" gli fa credere di essere limitato a tre dispositivi — la verità è tre *sessioni contemporanee, indipendentemente dal dispositivo* (GLOSSARY normativo).

**Casey (mobile, distratta):** con le colonne collassate vede prima Light per intero, e deve superarne CTA e due paragrafi prima che appaia Plus; il sollevamento `lg:-my-4` che segnala Plus non si applica su mobile. Il nastro `absolute -top-3.5` galleggia nel gap di 24px sotto la card Light e a larghezze piccole si sovrappone. La tabella è uno scroller orizzontale dentro uno verticale, senza indizio che scorra. Il numero che ricorderà è sbagliato: trattiene "€16,67/mese", mentre i €200 sono in grigio piccolo due righe sotto e il €19,99 barrato è a ~2,54:1. Arriva in fondo e non c'è un bottone: l'azione più disponibile è la bolla WhatsApp.

**Riley (stress tester):** togglando rapidamente non viene annunciato nulla — nessun `aria-live`, e il badge "fino a −17%" è `aria-hidden`, quindi la ragione stessa di scegliere l'annuale non viene mai letta. L'anello di focus globale (`#D1D5DB` su bianco, ~1,48:1) è invisibile su una pagina che è fatta quasi solo di bottoni. `prefers-reduced-motion` non annulla `transition-all` della CTA, la freccia in hover, né la rotazione del chevron. L'aritmetica non chiude: 16,67 × 12 = 200,04 ≠ 200, e il badge "fino a −17%" (vero per Light, 16,62%) sta sopra una card Plus il cui risparmio reale è 11,09% — il badge sovravende proprio il piano raccomandato. Il badge cambia colore con la selezione (ambra quando attivo, verde quando no): un fatto statico reso in due colori legge come bug di stato. `aria-label` su un `<p>` (riga 593), bloccato da un contract test.

**Il Titolare (decide e paga, da telefono, fuori orario):** la sua paura documentata come dominante — il cambiamento e il tempo di migrazione — non trova risposta: la pagina non dice nulla su come si migra da Excel, su come si importano le ricette esistenti, su quanto dura il setup. L'unico asset che risponderebbe (Plus annuale: "supporto prioritario + 2 sessioni individuali, iniziale e revisione") compare come coda di una voce di elenco grigia che va a capo tre volte in `text-white/60`, e come cella di tabella. Non è mai chiamato aiuto, mai inquadrato come "partiamo insieme". Non può fare il conto dell'annuale sulla card che sta guardando. Non può comprare, e lo scopre solo da un rifiuto dentro un accordion chiuso.

**Il Capo Laboratorio (verdetto tecnico, potere di veto):** non gli viene dato nulla da valutare. Nemmeno uno screenshot. Il bilanciamento — il meccanismo che PRODUCT.md indica come incopiabile — è una riga con una spunta, visivamente identica a "Impostazioni e gestione abbonamento": niente su zuccheri, grassi, proteine, lattosio, range target. Allergeni, tracciabilità, lotti e scadenze — la superficie di conformità di cui risponde personalmente — non sono mai nominati: `MAGAZZINO_CANONICAL_COPY` è importato nel bundle ed esportato per i test, ma **mai renderizzato a un essere umano**. E la pagina argomenta strutturalmente contro il piano che raccomanda, per lui: tutto ciò che gli interessa è `tierMinimo: Light`, mentre Plus è giustificato solo dalle preoccupazioni del titolare. Il suo upgrade ha per icona una **fabbrica**. Netto: il Principio 2 di PRODUCT.md — "una superficie che soddisfa uno solo dei due non converte" — fallisce qui. Questa è una pagina solo per il titolare.

## Minor Observations

- Ping-pong di allineamento: cinque cambi d'asse senza regola.
- Wrapper morto: `max-w-2xl` dentro `max-w-4xl` dentro `px-6`; il contenitore esterno serve solo a spostare l'h1 fuori dal centro ottico rispetto alle card centrate sotto.
- Larghezze invertite: il listino sta a 896px dove il sistema riserva 1024px ai listini e 896px ai confronti — è per questo che le righe lunghe di Plus vanno a capo.
- `text-icon` sul chevron FAQ contro `text-primary` ovunque: due nomi per un token invitano alla deriva.
- `animate-fade-in-up` sull'h1 ritarda l'elemento LCP di 400ms senza beneficio persuasivo.
- Nessun JSON-LD `FAQPage` malgrado `PRICING_FAQS` sia una costante stabile, e nessun `Offer`/`AggregateOffer` malgrado un listino interamente verificabile: una pagina la cui credibilità è "numeri veri" non li pubblica in forma leggibile dalle macchine.
- `MAGAZZINO_CANONICAL_COPY` importato, incapsulato ed esportato ma mai reso visibile.
- L'h1 rende a `text-4xl` (36px) su mobile, sotto il minimo display documentato di 40px.
- "Contattaci" è un link inline senza area di tocco: violazione della regola dei 44px di progetto (WCAG esenta i link inline).
- L'unico `h2` che copre le card è `sr-only`: le card non stanno sotto alcun titolo di sezione visibile.
- Ombre Tailwind di default invece dei valori nominati del sistema.
- Il sollevamento `lg:-my-4` di Plus è solo desktop: sul dispositivo primario il piano raccomandato si distingue solo per colore.

## Questions to Consider

1. **Se non si può comprare da questa pagina, perché costringe a scegliere un piano?** A cosa serve `/pricing` — listino, o permesso per una prova che è comunque Plus? Se è il secondo, l'intero apparato a due card è teatro, e la pagina onesta sarebbe: un listino, un bottone di prova, e la rassicurazione che la scelta viene dopo.
2. **E se la pagina aprisse con la schermata del bilanciamento invece che con un numero?** Il prodotto è la prova e gli screenshot reali sono già su disco.
3. **Che aspetto ha "La Catena Continua" come pagina prezzi?** Light corre ricetta → costo → composizione → etichetta; Plus prosegue → produzione → giacenza → ordine. I piani sono due lunghezze della stessa catena: si potrebbero disegnare come **il punto in cui la catena si taglia**, sostituendo 22 righe di spunte con un diagramma che insegna anche il prodotto.
4. **Se la colonna Plus è sempre una spunta, perché c'è una tabella?** Cinque righe portano il 100% dell'informazione nel 23% dello spazio. Cosa compra il restante 77%?
5. **La pagina convince il titolare e ignora il capo laboratorio, che ha il veto. Servono due porte?**
6. **Qual è il badge onesto?** "La prova gratuita è Plus" è vero, verificabile, e spiega perché entrambi i bottoni portano allo stesso posto. Esiste una versione di "Consigliato dai laboratori" che sopravvive alla domanda "quali laboratori?"
7. **Togliere il toggle renderebbe la pagina più credibile, non meno?** Qui non si acquista nulla. Entrambi i prezzi potrebbero stare su ogni card, eliminando lo stato nascosto nella tabella, il gioco dell'equivalente mensile, la discrepanza −17%/−11% e un intero componente interattivo.
8. **L'asset anti-rischio più forte dell'offerta è "2 sessioni individuali". Perché è una cella di tabella?** Se la paura dominante è il tempo di migrazione, "ti aiutiamo a partire, e ti richiamiamo dopo" è un livello di supporto — o è il titolo del piano annuale?
