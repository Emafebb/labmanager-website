# Header sempre visibile — 19 ottobre 2026

## Decisione e perimetro

Il committente ha scelto «Sempre visibile durante lo scorrimento» dopo il confronto
fra barra persistente, comparsa risalendo e comportamento attuale. La scelta supera
il comportamento nel flusso introdotto nel rifacimento. Nel diff precedente Navbar
aveva perso il posizionamento fisso; brief, guida e brandkit non ne motivavano
esplicitamente la scomparsa. Non attribuire questa scelta precedente al committente.

Conservati Traccia, direzione Dressed as something else / seed 1228958381, font,
logo, contenuti, CTA e URL. Nessun draw/redraw, fotografia, video o contenuto nuovo.
La modifica riguarda la navigazione condivisa: non richiede un ridisegno delle pagine.

## Implementazione

Solo CSS runtime, senza nuovi listener o dipendenze:

- `.site-nav`: sticky in alto, fondo avorio opaco; 80 px oltre 700 px e 76 px fino
  a 700 px, tramite `--site-nav-height`. Il telefono conserva l’altezza precedente;
  desktop e tablet passano da 92 a 80 px.
- Ancore e salto al contenuto: scroll-padding pari all’altezza barra più 24 px;
  restano gli scroll-margin già previsti dai singoli elementi.
- Menu desktop e mobile: altezza massima entro il viewport, scorrimento interno e
  contenimento dell’overscroll. Conservati chiusura, Escape e ritorno del focus.
- Confronto prezzi: intestazioni Light/Plus sotto la barra. Catalogo della home:
  introduzione sticky sotto la barra con altri 36 px di distanza.
- Tutti i consumatori di Navbar ricevono la modifica, incluse le 404. Instagram
  rimane una pagina autonoma senza navbar. Nessuna modifica alle API o a dati remoti.

Riferimenti della piattaforma consultati: [posizionamento sticky](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position)
e [spazio per lo scorrimento alle ancore](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-padding-top).

## Evidenze e limiti

Baseline riprodotta a 1440/768/390: dopo 600 px di scorrimento la navbar era a
`top: -600px`. Script ripetibile `verify.mjs`, misure iniziali `baseline/report.json`.

Suite: **114 Vitest + 3 Node commerciali passati** (`tests.txt`). Build Next.js,
TypeScript e generazione statica passati (`build.txt`, `build-isolated.txt`). ESLint
Navbar e `git diff --check` passati. Nessun test unitario che replichi il CSS: la
regressione viene controllata nel browser tramite posizione e dimensioni effettive.

Chrome sulla build finale: **52 controlli route/larghezza** (13 indirizzi ×
1440/768/390/320), **16 ancore**, **52 aperture/chiusure dei menu**, due verifiche
sull’introduzione sticky e sei finestre basse a 360 px di altezza, con larghezze
1440/900/701/700/390/320. Nessun overflow; navbar a top 0 anche a fondo pagina;
confronto prezzi sotto la barra. Link mobile verso Strumenti, chiusura del menu,
salto al contenuto e assenza della navbar su Instagram verificati. Complessivamente
77 controlli aggiuntivi rispetto alle 52 misure delle route. Screenshot desktop,
tablet e telefono aperti e confrontati. Misure finali in `browser/report.json`.
Preview di produzione isolata su `http://127.0.0.1:3027`, sorgenti copiati in
`/tmp/labmanager-header-preview`. Nella sola copia temporanea `turbopack.root: "/"`
consente il riuso del node_modules locale. Configurazione del repository invariata.
Il vecchio server dev aveva CSS aggiornato ma menu non interattivi; sulla build
coerente i menu rispondono. Nessuna modifica runtime per aggirare il controllo.

Il controllo attende la conclusione di smooth scroll e reveal prima di misurare:
le prime prove dello script avevano misurato menu non idratati sul vecchio server,
ancore ancora in movimento e una traslazione residua di circa 1 px nel reveal.
Corretto il solo harness e ripetuti i controlli sulla build isolata.

## Taste e critica

Inspector Prezzi: **4 FAIL / 4 WARN prima e dopo**, stessi identificatori; non si
attesta il gate a zero FAIL. Report `before/report.json` e `final/report.json`.
FAIL preesistenti: dicitura di consiglio del piano rilevata come eyebrow, assenza
fotografie, scala focale e budget movimento. WARN: avorio del brandkit, assenza
video, margini e composizione della chiusura. Nessuna nuova soppressione aggiunta.
La pagina prezzi non è stata ridisegnata per farla corrispondere a una landing
fotografica: il committente ha richiesto di conservare le altre decisioni approvate.

Lint CSS: gli stessi 5 rilievi prima/dopo (due ombre di overlay e tre bordi già
presenti negli strumenti), `lint-before.txt` e `lint-after.txt`. Nessun nuovo pattern
segnalato nel diff dell’header. Tutte le sette acquisizioni dell’inspector finale e
quelle iniziali sono state aperte; la prima apertura desktop include il CMP.
Le viste funzionali nel browser chiudono il CMP dal suo comando reale.

ROUND 1

Seen in one second: i piani Light e Plus restano leggibili, con la navigazione Traccia disponibile anche scorrendo.

Idea (one sentence): il sommario di LabManager resta raggiungibile mentre si passa dalla ricetta al lavoro quotidiano.

Live thing: menu Funzionalità e collegamenti alle cinque aree, disponibili anche a fondo pagina.

Layout words by section: navigation=bar / plans=columns / comparison=table / faq=list / close=text / footer=columns.

Scores: design 7 · usability 8 · creativity 6 · content 8 → overall 6.0.

Caps applied: limite 6.0 per i FAIL preesistenti dell’inspector; giudizio sulla pagina Prezzi nel suo insieme, non un punteggio dell’intervento CSS.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. Navigazione assente durante la lettura (`baseline/pricing-1440-scroll.jpg` e `pricing-390-scroll.jpg`): risolta con barra persistente e compatta (`browser/pricing-1440-scroll.jpg`, `pricing-390-scroll.jpg`).
2. Due superfici persistenti possono occupare lo stesso spazio: intestazioni Light/Plus e introduzione Funzionalità ora usano l’altezza condivisa (`browser/pricing-1440-comparison.jpg`, `home-1440-features.jpg`).
3. Il banner cookie occupa una parte consistente della prima apertura desktop (`final/desktop-fold.jpg`): comportamento CMP preservato; acquisizioni aggiuntive senza banner ottenute chiudendolo realmente, senza nasconderlo via CSS.

## Continuità e lavoro escluso

Aggiornati `DESIGN.md`, `.impeccable/design.json`, `.taste-skill/brief.md` e
`.taste-skill/pagine-aree-di-lavoro.md`. Baseline dei file in
`/tmp/labmanager-header-baseline`. Il working tree era già modificato e altre
modifiche al footer sono comparse durante il lavoro: conservate, non attribuite
all’intervento sull’header. La copia di verifica fotografa lo stato al momento della
preparazione; non attesta modifiche successive di altre sessioni.

Nessun commit, staging, push o deploy. Nessun invio di moduli, email, pagamento o
modifica di abbonamento. Non verificati Safari, dispositivi fisici o ambiente remoto.
