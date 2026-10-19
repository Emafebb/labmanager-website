---
name: LabManager — Traccia
description: Sito per laboratori artigianali alimentari, con identità Traccia e narrazione editoriale del lavoro.
colors:
  primary: "#223d32"
  background: "#f5f1e8"
  sage: "#b8c7b6"
  accent: "#f7b52b"
  paper: "#ffffff"
  surface: "color-mix(in srgb, #b8c7b6 25%, #ffffff)"
  success: "#14633c"
  warning: "#815300"
  error: "#a42222"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(48px, 6.2vw, 88px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2rem, 1.5rem + 2.3vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  lead:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1rem + 1vw, 1.625rem)"
    fontWeight: 400
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
  small:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
rounded:
  control: "8px"
  media: "12px"
spacing:
  gutter: "clamp(20px, 2.2vw, 40px)"
  section: "120px"
  section-mobile: "76px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "16px 24px"
    height: "56px"
  button-inverse:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.primary}"
    rounded: "{rounded.control}"
    padding: "16px 24px"
    height: "56px"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "14px"
---

# Design System: LabManager — Traccia

## Overview

**Creative North Star: "Traccia"**

Il sito racconta i collegamenti fra ricetta, costo, produzione e vendita attraverso una
narrazione editoriale del laboratorio. La scelta del mestiere apre esempi di lavoro
concreti; le pagine per area approfondiscono le funzioni effettive del prodotto.
Il pubblico comprende i laboratori artigianali alimentari: pasticcerie, panifici,
gelaterie e ristorazione sono esempi, non un confine del prodotto.

**Key Characteristics:**

- Bosco, avorio, salvia, ambra e bianco del brandkit approvato.
- Manrope per lettura, comandi e dati; Fraunces per titoli brevi.
- Logo e geometria originale del pattern Traccia conservati.
- Fotografie editoriali dichiarate e schermate autentiche come prova del software.
- Composizioni responsive, superfici piene e interazioni leggibili anche senza movimento.

Questo documento conserva le decisioni visive del sito. `design-taste-frontend` definisce
il metodo di progettazione e verifica; applicarlo alla direzione approvata, senza una
nuova estrazione creativa quando si sta soltanto allineando il sito.

Fonti e manutenzione:

- [Brandkit](design/brandkit/brand.css) e [tavola approvata](design/brandkit/preview.html): identità originale.
- [globals.css](src/app/globals.css): token e varianti responsive implementate. I valori del frontmatter ne sono un riepilogo, non un secondo foglio di stile.
- [Brief](.taste-skill/brief.md) e [pagine per aree di lavoro](.taste-skill/pagine-aree-di-lavoro.md): decisioni, eccezioni e stato della consegna.
- [Sidecar Impeccable](.impeccable/design.json): metadati e anteprime derivati da questo documento e dal CSS; aggiornarlo insieme a DESIGN.md.

Una nuova decisione esplicita del committente aggiorna i riferimenti coinvolti. Nei
conflitti con i vecchi brief di superficie prevalgono Traccia e le decisioni successive
registrate. I report storici descrivono la versione verificata nella rispettiva fase.

## Colors

Bosco è testo e azione primaria; avorio è il fondo del sito; bianco ospita dati e
contenuti; salvia separa superfici e stati. Ambra è un accento decorativo, non il fondo
predefinito dei pulsanti. Sulle superfici bosco le azioni possono essere inverse,
bianco su bosco. WhatsApp usa anch'esso bosco/bianco.

Usare i token di `globals.css`, comprese le superfici derivate con `color-mix`.
Successo, avviso ed errore hanno ruoli semantici e messaggi testuali associati.
La palette avorio del brandkit è un vincolo approvato anche quando Taste segnala la
famiglia cromatica fra le proprie preferenze da evitare.

## Typography

Font locali e licenze in `public/brandkit/`: Manrope 400/600/700 e Fraunces 400.
Fraunces è destinato ai titoli brevi; sottotitoli, comandi, prezzi e dati usano Manrope.
I prezzi mantengono cifre tabulari. Riutilizzare i pesi effettivamente caricati.

Il frontmatter riporta la hero desktop e la scala di base: non impone la stessa misura
su ogni pagina. A 700 px e meno, la scala condivisa passa a 32 px per i titoli e 20 px
per le introduzioni; hero, Prezzi e pagine di supporto hanno varianti dedicate nel CSS.
Le note possono usare 14 px; il testo corrente e i campi usano 16 px.

Per i nuovi titoli seguire Taste: due righe al massimo nelle viewport verificate,
accorciando prima il testo. Un H1 identifica la pagina; ogni sezione ha un titolo.
L'enfasi nasce dalle parole e dalla gerarchia, mantenendo un solo trattamento nel titolo.

## Layout

Riutilizzare la coppia di margini `--gutter` e le composizioni esistenti.
`.section-space` usa 120 px verticali, ridotti a 76 px fino a 700 px; le varianti di
pagina e di sezione rimangono nel CSS. Non esiste una distanza universale di 96 px.
La griglia interna può essere asimmetrica purché i margini esterni restino equilibrati
e lo spazio sia occupato da contenuto significativo.

La hero dispone testo e azione a sinistra e fotografia a destra; sul telefono il testo
precede l'immagine. La navigazione mobile è usata fino a 900 px. Le pagine per area
riusano `WorkAreaPage`; il flusso a tre passaggi usa tre colonne oltre 1000 px, mentre
quello a quattro passaggi usa due colonne oltre 700 px. Sotto le rispettive soglie,
i passaggi si dispongono in una colonna. Non esiste un limite generale di due colonne.

Le cinque aree, condivise da menu, footer, home e collegamenti correlati, sono definite
in `src/data/work-areas.ts`. Conservare le ancore e le destinazioni esistenti quando
si cambia una composizione. Controllare overflow, ordine di lettura e accesso ai comandi
su desktop, tablet e telefono; la sola assenza di overflow non prova un buon equilibrio.

## Elevation & Depth

La separazione ordinaria avviene con spazio e cambi di superficie. Le ombre sono
riservate a elementi che si staccano dal flusso, come il menu a espansione e il dialogo.
Riutilizzare gli stati implementati; niente nuova profondità decorativa, gradienti o vetro.

## Shapes

I controlli condivisi usano raggio 8 px; fotografie e menu usano anche 12 px.
Conservare queste scelte del sito, senza introdurre una scala di raggi per dimensione.
Sono eccezioni di progetto alle preferenze generali di Taste per pulsanti squadrati
o completamente tondi. I bordi funzionali dei campi restano visibili.

Il pattern Traccia usa gli SVG originali, anche come maschera colorata ai margini delle
immagini. La geometria rimane invariata e il motivo lascia libere le aree di lettura.
Il logo originale si riusa come asset, senza ricostruirlo in testo.

## Components

Riutilizzare classi e componenti condivisi prima di creare nuove varianti.

- **Pulsanti:** bosco/bianco, almeno 56 px nella variante `.button`, padding 16 × 24 px,
  Manrope 700. La variante inversa serve le superfici scure. Hover e pressione usano
  piccoli spostamenti; il focus è distinto e visibile anche sul fondo scuro.
- **Campi:** etichetta persistente, testo da 16 px, fondo di superficie, bordo salvia,
  raggio 8 px. Conservare consenso, validazione, errore, caricamento ed esito.
- **Navigazione:** barra semplice sempre visibile durante lo scorrimento, approvata il
  19 ottobre 2026. `position: sticky; top: 0`, fondo avorio opaco, senza ombre,
  trasparenze o scomparsa automatica. Altezza condivisa `--site-nav-height`: 80 px
  oltre 700 px, 76 px fino a 700 px. Logo, collegamenti, Funzionalità e Accedi
  conservati; menu espandibili scorrevoli entro lo spazio disponibile sotto la barra.
  Ancore e salto al contenuto riservano altezza barra più 24 px; le intestazioni
  del confronto prezzi si fermano sotto la navbar; l’introduzione sticky al catalogo
  Funzionalità conserva altri 36 px di distanza dalla barra. Conservare Esc e ritorno del focus.
  Applicare a tutte le pagine con `Navbar`, incluse le 404; Instagram resta autonomo.
  Ordine desktop: Home, Funzionalità, Prezzi, Contatti; Home è anche la prima voce
  del menu mobile. La pagina corrente usa `aria-current="page"` e peso 700;
  sulle pagine per area anche il comando Funzionalità usa peso 700.
  I collegamenti dell'header usano la navigazione HTML nativa. Home, logo, Prezzi
  e pagine per area puntano a `#main-content` per raggiungere l'inizio anche al
  clic ripetuto; Panoramica e Contatti conservano le ancore delle rispettive sezioni.
  Indietro/Avanti mantiene il ripristino del browser, senza reset globali dello scroll.
- **Selettore del laboratorio:** `WorkflowExplorer` collega il mestiere a esempi dichiarati.
  Campo avorio, gruppo salvia e scelte bianche; la scelta attiva usa bosco/bianco
  con segno di conferma. Gruppo e dicitura «Scegli il tuo laboratorio» sono centrati;
  larghezza massima 800 px, piena larghezza sui telefoni. Pasticceria
  è selezionata all'ingresso. I quattro controlli radio nativi mostrano un solo
  percorso, con testata bosco e corpo bianco; sostituiscono filtro e accordion
  duplicati. Scelta e contenuti funzionano anche senza JavaScript. Su telefono
  i comandi formano una griglia 2 × 2 e i passaggi seguono una colonna.
  Ristorazione sostituisce Gastronomia e segue piatto, Food Cost, menu e proposta PDF.
  Le tre fotografie hanno colonne uguali e bordi allineati; i piani Light/Plus della home
  condividono le righe di titolo, descrizione e prezzo, senza sfalsamenti decorativi.
  La home mostra l’equivalente mensile dell’annuale, con pagamento e totale annuale
  espliciti sotto ciascun importo. Il percorso Ristorazione include l’uso per consulenti.
- **Newsletter e WhatsApp:** riusare il form e il dialogo nativo esistenti e il pulsante
  fisso con etichetta sulle pagine pubbliche e sulle tre pagine billing. Montarlo una sola
  volta nel layout condiviso; Instagram e pagine non trovate restano escluse. Verificare
  la convivenza con i widget esterni su telefono. Fino a 700 px l’etichetta visibile
  è “WhatsApp”, con icona e nome accessibile completo “Scrivici su WhatsApp”.
- **Footer:** contenuto entro 1280 px; firma editoriale in Fraunces fino a 64 px,
  frase e dati societari nella colonna sinistra, navigazione nelle due colonne a destra.
  Privacy, cookie e nota AI formano una fascia comune sottostante, con 240 px liberi
  a destra per i comandi fissi. Fino a 900 px i margini esterni sono simmetrici:
  soltanto frase, dati societari e nota AI riservano 64 px a destra; il fondo riserva
  112 px ai comandi fissi. Fino a 700 px: firma, navigazione e dati in
  sequenza, prodotto a tutta larghezza e contatti su due colonne. Quando il collegamento WhatsApp del footer
  è visibile, il duplicato flottante si nasconde; ricompare quando quel collegamento
  esce dalla vista, anche dopo la navigazione fra pagine. La firma mantiene un focus visibile e non si sottolinea in hover.

Gli strumenti usano dettagli HTML espandibili: il primo è aperto; le ancore aprono
il contenuto selezionato anche senza JavaScript. Il confronto prezzi fino a 700 px
mostra il nome della funzione a tutta larghezza e Light/Plus su due colonne con
le rispettive etichette; la tabella conserva ruoli e intestazioni accessibili.
Le chiusure dispongono testo e azione su due colonne, impilate sul telefono.

Il focus condiviso usa un contorno di 3 px in `currentColor`, con offset di 5 px;
le varianti inverse già presenti garantiscono leggibilità sulle superfici scure.
L'obiettivo dei bersagli interattivi è almeno 44 × 44 px: verificarlo sul componente
reale, senza considerarlo già soddisfatto da questa documentazione.

Il movimento si appoggia a `PageMotion`, agli attributi `data-reveal` e al CSS esistente.
Il contenuto resta disponibile senza script e con `prefers-reduced-motion`.
Per ogni modifica visiva applicare lint, inspector e confronto delle acquisizioni previsti
da Taste, registrando le eccezioni approvate senza disabilitare i controlli in blocco.

## Do's and Don'ts

### Do:

- **Do** mantenere Traccia e i font locali nelle nuove superfici.
- **Do** riutilizzare token, componenti e inventari condivisi del sito.
- **Do** distinguere le immagini editoriali AI dalle schermate autentiche del prodotto.
- **Do** conservare le diciture AI presenti; la discussione e gli screenshot attesi sono nel report delle aree di lavoro.
- **Do** ricavare prezzi, inclusioni e CTA dalle fonti commerciali esistenti.
- **Do** aggiornare questa guida e il sidecar quando cambia una decisione visiva approvata.

### Don't:

- **Don't** presentare esempi o immagini generate come clienti, risultati o schermate reali.
- **Don't** inventare testimonianze, dati commerciali o promesse normative.
- **Don't** ripristinare indaco, DM Sans o regole dei vecchi brief in conflitto con Traccia.
- **Don't** aggiungere ornamentazione, griglie di card identiche o nuove dipendenze per un semplice riallineamento.
