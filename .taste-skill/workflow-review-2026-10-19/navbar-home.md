# Header — Home come prima voce

Aggiornamento successivo: il [fix dello scorrimento](navigation-scroll.md) cambia
i link dell'header in ancore HTML native; Home, Prezzi e aree raggiungono
`#main-content`. Il rapporto seguente conserva le verifiche dell'aggiunta iniziale.

Richiesta approvata: Home prima di Funzionalità, Prezzi e Contatti, anche nel menu
mobile; pagina corrente riconoscibile. Implementazione locale, nessuna pubblicazione.

`Navbar` usa `usePathname` già presente nel progetto per marcare con `aria-current="page"`
il collegamento corrente. CSS a peso 700 per quel collegamento; sulle pagine delle
aree anche il comando Funzionalità è evidenziato. Home mobile chiude il menu al clic.
Logo e altre destinazioni conservati. DESIGN.md e sidecar aggiornati insieme.

Verifica test-first: tre nuovi casi osservati fallire prima dell'implementazione
(Home mancante, Prezzi e Ricette privi di stato corrente). Dopo la modifica, suite
completa: 136 Vitest su 21 file e 3 Node commerciali passati. Avvisi noti del runner:
localStorage sperimentale Node e navigazione Document non implementata da jsdom.
ESLint mirato, TypeScript nella build, diff-check e lint Taste del componente passati.

Build di produzione `8XJ-zm2-jTBrAIGJHujz4`, anteprima http://127.0.0.1:3052.
Chrome a 1440, 901, 900, 390 e 320 px: prima voce Home, destinazione `/`, stato
corrente e peso 700; passaggio a Prezzi e Ricette con aggiornamento dello stato;
ritorno a Home; chiusura del menu mobile su navigazione. Nessun overflow o eccezione
runtime raccolta. Verificata la soglia fra menu desktop a 901 e mobile a 900 px.
Cinque screenshot aperti e rivisti. Script e risultati in
`output/playwright/navbar-home/verify.mjs` e `report.json`.

Non ripetuto l'audit Taste dell'intera pagina per l'aggiunta del singolo collegamento.
Non verificati Safari, dispositivi fisici, lettori di schermo reali o workerd.
Nessun invio reale, commit, push o deploy; lavoro concorrente preservato.
