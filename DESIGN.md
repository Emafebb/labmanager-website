---
name: LabManager
description: Il gestionale per laboratori artigianali alimentari — un indaco profondo su superfici chiare, senza un secondo colore.
colors:
  primary: "#4403af"
  primary-light: "#5a1ec9"
  primary-dark: "#3a0390"
  primary-muted: "rgba(68, 3, 175, 0.1)"
  primary-subtle: "rgba(68, 3, 175, 0.05)"
  foreground: "#333333"
  text-secondary: "rgba(51, 51, 51, 0.7)"
  text-tertiary: "rgba(51, 51, 51, 0.5)"
  background: "#ffffff"
  surface: "#F8F9FA"
  canvas-cool: "#FAFBFE"
  card-border: "#E5E7EB"
  border-light: "rgba(0, 0, 0, 0.06)"
  focus-ring: "#6B7280"
  success: "#107C10"
  warning: "#E6A700"
  error: "#E81123"
  whatsapp: "#25D366"
typography:
  display:
    fontFamily: "DM Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "DM Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "DM Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "DM Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "DM Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
  eyebrow:
    fontFamily: "DM Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  3xl: "24px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  gutter: "24px"
  grid-gap: "24px"
  card: "32px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.xl}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
    textColor: "#ffffff"
  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "#374151"
    typography: "{typography.label}"
    rounded: "{rounded.xl}"
    padding: "14px 28px"
  button-nav:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "#4B5563"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
  nav-link-hover:
    backgroundColor: "{colors.primary-subtle}"
    textColor: "{colors.primary}"
  input-field:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
  card-surface:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "32px"
  card-feature:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.2xl}"
    padding: "32px"
  pill-eyebrow:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  icon-tile:
    backgroundColor: "{colors.primary-subtle}"
    textColor: "{colors.primary}"
    rounded: "{rounded.xl}"
    height: "44px"
    width: "44px"
---

# Design System: LabManager

## Overview

**Creative North Star: "La Catena Continua"**

Dalla ricetta all'ordine senza interruzioni. Il sistema visivo non presenta funzioni
affiancate: presenta un flusso che si aggancia sezione dopo sezione. Ogni superficie
eredita qualcosa dalla precedente — lo stesso indaco, la stessa scala di raggi, lo stesso
respiro di 96px — così che scorrere la pagina somigli a percorrere il laboratorio da monte
a valle. La continuità è la firma: non un effetto, ma il rifiuto sistematico di far
sembrare separate cose che nel prodotto sono collegate.

Il tono è **solido, non startup**. Questo sistema deve somigliare a un fornitore di
attrezzature che sta in piedi da vent'anni, non a un lancio. L'anti-riferimento è preciso e
vincolante: l'estetica SaaS generica — gradienti viola-blu, illustrazioni astratte di
persone senza volto, glassmorphism, promesse vaghe al posto dei numeri. Il prodotto è la
prova, quindi il sistema mostra schermate vere su superfici quiete e lascia parlare i dati.

La materia è **stratificazione leggera**: le superfici si distinguono davvero per livello,
ma con ombre che non superano l'8% di nero. Nessun bordo urlato, nessuna profondità
teatrale. Un solo colore forte in un ambiente chiaro, e quel colore compare solo dove c'è
un'azione o un'affermazione da fare.

**Key Characteristics:**

- Un solo accento cromatico: indaco profondo su bianco e grigi freddissimi
- DM Sans in quattro pesi, nessuna seconda famiglia
- Ombre tenui e reali, mai decorative: massimo 8% di nero
- Scala di raggi che cresce con la superficie: 8 → 12 → 16 → 24 px
- Respiro fisso di 96px tra le sezioni, contenitore a 1280px
- Griglie che non superano due colonne su desktop
- Movimento breve e monodirezionale: 200ms, verso l'alto, mai di rimbalzo
- Focus grigio neutro, distinto per costruzione dall'hover viola

## Colors

Una tavolozza a voce sola: un indaco molto saturo su una scala di neutri freddi, con i
colori semantici confinati al loro unico compito.

### Primary

- **Indaco Profondo** (`#4403af`): l'identità. Compare sulle CTA primarie, sugli occhielli
  di sezione, sulle icone dei pilastri e sulle parole che il lettore deve trattenere. È
  l'unico colore che ha il permesso di dominare un elemento.
- **Indaco Chiaro** (`#5a1ec9`): variante di supporto per superfici viola più ampie dove
  il tono pieno risulterebbe pesante. Raro per costruzione.
- **Indaco Cupo** (`#3a0390`): esclusivamente lo stato hover e active delle superfici
  primarie. Non è un colore di riposo.
- **Velo Indaco** (`rgba(68,3,175,0.1)` e `rgba(68,3,175,0.05)`): i due unici modi ammessi
  di tingere una superficie di viola — sfondo delle piastrelle icona, hover dei link di
  navigazione, selezione del testo.

### Neutral

- **Bianco Puro** (`#ffffff`): lo sfondo di riposo del sito e di tutte le card.
- **Grigio Nebbia** (`#F8F9FA`): la superficie che segnala "qui cambia sezione". Usata a
  fasce piene, mai su un singolo elemento.
- **Bianco Freddo** (`#FAFBFE`): la variante appena più fredda del Grigio Nebbia, riservata
  alle sezioni di apertura. La differenza è quasi impercettibile ed è intenzionale: separa
  senza tagliare.
- **Inchiostro** (`#333333`): tutto il testo primario. Non nero: un grigio profondo che
  riduce l'affaticamento su schermo piccolo a fine giornata.
- **Inchiostro 70% / 50%** (`rgba(51,51,51,0.7)` / `rgba(51,51,51,0.5)`): testo secondario
  e terziario, ottenuti per trasparenza dall'inchiostro e non da grigi indipendenti.
- **Grigio Bordo** (`#E5E7EB`): il tratto standard di card, input e divisori.
- **Grigio Focus** (`#6B7280`): riservato esclusivamente all'anello di focus. Il
  tono è scelto per reggere il rapporto 3:1 richiesto agli indicatori non testuali:
  un grigio più chiaro sparirebbe su bianco.

### Semantic

- **Verde Conferma** (`#107C10`): esito positivo. Mai come colore decorativo o di crescita.
- **Ambra Attenzione** (`#E6A700`): avviso. Mai come accento promozionale.
- **Rosso Errore** (`#E81123`): errore di validazione o di invio.
- **Verde WhatsApp** (`#25D366`): colore di marca di terze parti, ammesso solo sul pulsante
  WhatsApp, dove l'aderenza al marchio esterno è il punto.

### Named Rules

**The One Violet Rule.** Il sistema ha un accento e uno solo. Verde, ambra e rosso sono
segnali di stato: dicono cosa è successo, non attirano attenzione. Se un elemento ha
bisogno di risaltare e non è un'azione o uno stato, la risposta è spazio o peso
tipografico, non un secondo colore.

**The Dead Gradient Rule.** L'utility `.gradient-text` interpola da `--primary` a
`--icon-color`, e `--icon-color` **è** `--primary`: il gradiente è piatto, e i titoli che
lo usano rendono indaco pieno. È un residuo, non una scelta. I titoli restano a tinta
unita — non "sistemare" il gradiente rendendolo reale.

**The Tint-Only Rule.** Il viola tinge una superficie solo al 5% o al 10%. Non esistono
sfondi viola a piena saturazione fuori dalle CTA e dalle superfici di navigazione attive.

## Typography

**Display Font:** DM Sans (fallback: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif)
**Body Font:** DM Sans (stessa famiglia)
**Label/Mono Font:** nessuna. Il sito non usa monospaziati.

**Character:** una sola famiglia per tutto. DM Sans è geometrica ma con terminali morbidi:
tecnica senza freddezza, esattamente il registro di chi parla di grammi e margini a un
artigiano. La gerarchia si costruisce per peso e dimensione, mai per contrasto di famiglia.
Il corpo pagina è in `tabular-nums`: i prezzi e le quantità restano allineati in colonna
quando cambiano.

### Hierarchy

- **Display** (700, da 2.5rem a 3.5rem, interlinea 1.08, `tracking-tight`): solo l'h1 di
  ogni pagina. Interlinea molto stretta: il titolo deve leggersi come un blocco compatto,
  non come tre righe separate.
- **Headline** (700, da 1.875rem a 2.25rem, interlinea ~1.2): i titoli di sezione (h2).
- **Title** (600–700, 1rem–1.25rem): i titoli di card e di gruppo (h3).
- **Body** (400, 1rem, interlinea 1.625): il testo corrente, in Inchiostro 70%. I paragrafi
  introduttivi salgono a 1.125–1.25rem e restano entro `max-w-2xl` (circa 65 caratteri).
- **Label** (600, 0.875rem): etichette di form, voci di navigazione, testo dei pulsanti.
- **Eyebrow** (600, 0.875rem, `uppercase`, `letter-spacing: 0.1em`, in Indaco Profondo):
  l'occhiello che apre ogni sezione sopra l'h2.

### Named Rules

**The Four Weights Rule.** DM Sans è caricato **solo** ai pesi 400, 500, 600 e 700. Non
esistono 800 né 900: se il codice li chiede, il browser sintetizza un grassetto finto che
si nota. Il peso massimo del sistema è 700. `font-extrabold` e `font-black` sono vietati
finché il font non viene caricato con quei pesi.

**The Eyebrow Rule.** L'occhiello apre una sezione e non compare mai altrove. Non è un
badge, non è un tag, non è un'etichetta di card. Una sezione, un occhiello.

**The One Family Rule.** Nessuna seconda famiglia tipografica entra nel sistema. Se una
superficie sembra aver bisogno di un display serif o di un monospaziato, il problema è la
gerarchia, non il font.

## Layout

Il contenitore standard è **1280px** (`max-w-7xl`) centrato, con gutter di **24px** su
mobile che sale a 32px oltre 1024px. I contenuti di lettura si stringono: 1024px per moduli
e listini, 896px per i confronti, 672px (`max-w-2xl`) per i paragrafi introduttivi, che è
il limite oltre il quale la riga diventa faticosa.

**Il ritmo verticale è fisso a 96px** (`py-24`) tra le sezioni, con 64px tra l'intestazione
di sezione e il suo contenuto. Questa costanza è la spina dorsale della Catena Continua:
sezioni diverse respirano allo stesso modo, quindi il passaggio da una all'altra si legge
come continuazione e non come rottura.

Le griglie sono a una o due colonne, con `gap` di 24px. La navigazione è fissa in alto e
`scroll-padding-top: 80px` impedisce che gli ancoraggi finiscano sotto di essa. I punti di
rottura sono quelli di Tailwind (640 / 768 / 1024 / 1280px); l'unica decisione strutturale
propria è il passaggio a 640px tra l'artwork telefono e quello desktop nell'apertura, che
determina quale immagine è l'LCP.

**Mobile è il caso reale, non la riduzione.** Il layout parte da una colonna centrata e si
apre a due su desktop; i testi passano da `text-center` ad allineamento a sinistra alla
stessa soglia.

### Named Rules

**The 96 Rule.** Novantasei pixel tra le sezioni. Sempre. Una sezione che ha bisogno di
staccarsi di più cambia superficie (Bianco Puro ↔ Grigio Nebbia), non spaziatura.

**The Two-Column Ceiling Rule.** Nessuna griglia di contenuto supera due colonne su
desktop. Tre o quattro colonne trasformano il flusso in un catalogo, che è esattamente ciò
che questo sistema rifiuta.

## Elevation & Depth

Stratificazione leggera. Le ombre esistono e distinguono davvero i livelli — la
navigazione sopra il contenuto, la card sopra la sezione — ma vivono tutte in una banda
strettissima di nero, dal 4% all'8%. Non c'è ombra colorata a riposo, non c'è profondità
drammatica, non c'è glassmorphism. La percezione del livello si ottiene per somma di tre
segnali deboli: un'ombra tenue, un bordo di 1px in Grigio Bordo, e un cambio di superficie.

### Shadow Vocabulary

- **Appoggio** (`box-shadow: 0 1px 3px rgba(0,0,0,0.04)`): lo stato di riposo di card,
  input, pillole e barra di navigazione dopo lo scroll. Quasi invisibile per progetto.
- **Sollevamento** (`box-shadow: 0 4px 12px rgba(0,0,0,0.06)`): la risposta all'hover di
  una card. È il gradino immediatamente successivo ad Appoggio, mai un salto.
- **Distacco** (`box-shadow: 0 8px 24px rgba(0,0,0,0.08)`): il livello massimo del sistema,
  per superfici che si staccano davvero dal flusso.
- **Alone Primario** (`box-shadow: 0 10px 15px -3px rgba(68,3,175,0.2)`): unica ombra
  colorata ammessa, e solo sull'hover della CTA primaria. Non esiste a riposo.

### Named Rules

**The Eight Percent Rule.** Nessuna ombra del sistema supera l'8% di nero. Un elemento che
sembra aver bisogno di più profondità ha in realtà un problema di contrasto o di
spaziatura.

**The Two-Pixel Lift Rule.** L'unica risposta al passaggio del mouse su una superficie è
salire di 2px e passare al gradino d'ombra successivo. Niente scala, niente rotazione,
niente cambio di colore della card.

## Shapes

Rettangoli a spigoli addolciti, senza eccezioni di forma. Non ci sono cerchi decorativi,
blob, tagli diagonali o silhouette organiche: la geometria è quella di un modulo, di una
scheda tecnica, di un'etichetta.

Il raggio **cresce con la superficie**: 8px per i controlli (link di navigazione, campi,
pulsanti compatti), 12px per i pulsanti principali e i contenitori standard, 16px per le
card di contenuto, 24px per le superfici più grandi come le card del listino. Il raggio
pieno è riservato agli elementi che devono leggersi come pastiglie: occhielli in
evidenza, badge di stato, pastiglie icona circolari.

I bordi sono sempre di 1px, in Grigio Bordo (`#E5E7EB`) o nella sua variante quasi
trasparente. Non esistono bordi spessi, tratteggiati o colorati.

### Named Rules

**The Radius Ladder Rule.** 8 → 12 → 16 → 24. Il raggio non è una preferenza estetica per
elemento: è una funzione della dimensione della superficie. Una card grande con raggio da
controllo, o un input con raggio da card, rompono la scala.

## Components

Il carattere di tutti i componenti è **misurato e discreto**: presenza contenuta, bordi
tenui, transizioni brevi. Il componente non chiede attenzione, la restituisce quando lo
tocchi. Il peso tipografico e il colore fanno il lavoro che altrove farebbero l'ombra e la
dimensione.

### Buttons

- **Shape:** angoli addolciti da 12px (`rounded-xl`) per le azioni principali, 8px
  (`rounded-lg`) per quelle compatte nella navigazione.
- **Primary:** fondo Indaco Profondo (`#4403af`), testo bianco, peso 600, spaziatura interna
  di 14px verticali e 28px orizzontali. Freccia opzionale a destra che scorre di 2px
  all'hover.
- **Hover / Focus:** il fondo passa a Indaco Cupo (`#3a0390`), il pulsante sale di 2px e
  guadagna l'Alone Primario. Transizione di 200ms `ease-out` su tutte le proprietà.
- **Secondary:** fondo bianco, testo grigio scuro (`#374151`), bordo di 1px in Grigio Bordo.
  All'hover il bordo scurisce e compare l'ombra di Sollevamento — senza mai prendere colore.
- **Ghost (navigazione):** solo testo in grigio medio; all'hover il testo diventa Indaco
  Profondo su Velo Indaco al 5%.

### Cards / Containers

- **Corner Style:** 12px per i contenitori di modulo, 16px per le card di contenuto, 24px
  per le superfici principali.
- **Background:** Bianco Puro, sempre. Le card non cambiano colore per gerarchia.
- **Shadow Strategy:** Appoggio a riposo, Sollevamento all'hover (vedi Elevation & Depth).
- **Border:** 1px in Grigio Bordo o nella variante al 90% di opacità.
- **Internal Padding:** 24px sulle card compatte, 32px sui contenitori di modulo, fino a
  40px sui moduli ampi oltre 640px.

### Inputs / Fields

- **Style:** fondo bianco, bordo di 1px in Grigio Bordo, raggio 8px, spaziatura interna di
  12px verticali e 16px orizzontali, testo a 1rem — mai sotto, per non innescare lo zoom
  automatico su iOS.
- **Focus:** il bordo scurisce e compare un anello di 4px in grigio chiaro. Deliberatamente
  neutro: il focus non è un evento di marca.
- **Label:** sopra il campo, peso 600, 0.875rem, con icona da 15px in Indaco Profondo.
- **Error:** bordo e messaggio in Rosso Errore, con il messaggio sotto il campo.

### Navigation

- **Style:** barra fissa, trasparente in cima alla pagina, che al primo scroll (20px)
  diventa bianca con bordo inferiore e ombra di Appoggio, riducendo l'altezza da 20 a 12px
  di padding verticale. La transizione è di 200ms.
- **Typography:** voci a 0.875rem, peso 600, in grigio medio; all'hover Indaco Profondo su
  Velo Indaco.
- **Mobile:** sotto 1024px le voci collassano in un pannello che si apre in altezza
  (200ms), chiudibile con Esc; il pulsante hamburger rispetta l'area di tocco da 44px.

### Signature: la Piastrella Icona

Il modulo ricorrente che tiene insieme le sezioni: un quadrato da 44px con raggio 12px,
fondo Velo Indaco al 5–10% (oppure bianco con bordo e ombra di Appoggio nelle card dei
pilastri), con dentro un'icona a tratto Lucide da 18–28px in Indaco Profondo. Precede
sempre un titolo o una voce di elenco, mai da sola. È il segnale visivo che due sezioni
diverse appartengono alla stessa catena.

### Named Rules

**The Neutral Focus Rule.** L'anello di focus è grigio (`#D1D5DB`, 2px, offset 3px), mai
viola. Il viola significa "azione disponibile"; il grigio significa "sei qui". Confonderli
rende la navigazione da tastiera indistinguibile dall'hover.

**The 44 Rule.** Ogni elemento interattivo raggiunge almeno 44×44px reali. L'utility
`.touch-target` esiste per questo e va applicata, non riscoperta caso per caso.

**The 200ms Rule.** Le transizioni di stato durano 200ms con `ease-out`. Le animazioni di
ingresso durano da 400 a 600ms. Non esistono durate intermedie negoziate elemento per
elemento, e ogni animazione è annullata sotto `prefers-reduced-motion`.

## Do's and Don'ts

### Do:

- **Do** costruire la gerarchia con peso tipografico, spazio e superficie. Il colore è
  l'ultima leva, non la prima.
- **Do** rispettare la scala dei raggi 8 → 12 → 16 → 24 in funzione della dimensione della
  superficie.
- **Do** mantenere 96px tra le sezioni e cambiare superficie (Bianco Puro ↔ Grigio Nebbia
  ↔ Bianco Freddo) quando serve uno stacco più netto.
- **Do** usare icone a tratto Lucide, dimensioni da 15 a 28px, sempre con
  `aria-hidden="true"` quando il testo accanto già comunica il significato.
- **Do** mostrare schermate reali del prodotto. La prova è il software che lavora, e le
  immagini vanno servite in AVIF/WebP responsive come già fa `src/data/responsive-images.ts`.
- **Do** dichiarare ogni nuova animazione dentro il blocco `prefers-reduced-motion` di
  `globals.css`.
- **Do** rendere ogni superficie leggibile prima su telefono, a fine giornata, con luce
  variabile.

### Don't:

- **Don't** introdurre un secondo accento cromatico. **L'ambra (`#FBBF24` / `amber-400`) e
  il prugna scuro (`#1d0640`) sono deriva, non sistema**, e non vanno promossi in
  `globals.css`. Il listino (`src/app/pricing/`) e `src/components/TrialCallout.tsx` sono
  già stati riportati all'indaco. Restano da ricondurre, quando quelle superfici verranno
  toccate: `src/components/Features.tsx` (gradiente `amber-50`/`orange-50` sulla seconda
  card della home) e `src/components/DownloadClient.tsx`. L'ambra in
  `src/app/billing/cancel/page.tsx` è invece uso semantico di avviso ed è legittima, ma
  dovrebbe passare per il token `--warning` anziché per la scala Tailwind.
- **Don't** usare `font-extrabold` (800) o `font-black` (900): DM Sans è caricato solo a
  400/500/600/700 e il browser sintetizzerebbe un grassetto finto. Presente anch'esso nel
  listino prezzi, da rientrare.
- **Don't** aggiungere gradienti — di testo, di sfondo, di bordo. Il gradiente in
  `.gradient-text` è un no-op che rende piatto e va lasciato tale o rimosso, non reso reale.
- **Don't** superare l'8% di nero nelle ombre, né usare ombre colorate a riposo.
- **Don't** colorare l'anello di focus di viola.
- **Don't** portare le griglie di contenuto oltre due colonne su desktop.
- **Don't** introdurre una seconda famiglia tipografica.
- **Don't** usare illustrazioni astratte, mockup 3D o immagini stock di persone: il
  registro è quello di uno strumento professionale, e l'anti-riferimento dichiarato è
  l'estetica SaaS generica.
- **Don't** far competere visivamente più di una azione primaria per schermata.
