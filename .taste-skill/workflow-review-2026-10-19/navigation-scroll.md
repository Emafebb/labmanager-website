# Header — arrivo all'inizio pagina

Build locale finale `EzKKQKyfAnxmAkGpm2PSK`, anteprima http://127.0.0.1:3052.
Solo modifica locale: nessun commit, push o deploy.

## Difetto riprodotto e causa

`node output/playwright/navigation-scroll/repro.mjs` ha riprodotto il difetto sulla
build precedente: nei cambi Home/Prezzi da 120/800/2200 px lo scroll risultava
16/696/2096 px; cliccando la voce della pagina già aperta restava 120/800/2200 px.
Evidenza precedente: `output/playwright/navigation-scroll/before.json`.

La gestione automatica di `next/link` non impone un arrivo assoluto a zero:
la documentazione della versione installata descrive il mantenimento della posizione
quando la pagina è ancora visibile. Il layout router installato salta anche il lavoro
di scrolling in alcune navigazioni alla stessa destinazione. La prova su URL identico
ha confermato il mancato reset. Il confronto browser con un'ancora nativa ha invece
portato sempre a zero e conservato la posizione con Indietro, anche con query nell'URL.

## Soluzione finale

I collegamenti di `Navbar` usano `<a>` nativi. Home e logo puntano a
`/#main-content`, Prezzi a `/pricing#main-content`, le cinque aree al proprio
`#main-content`, già presente nel markup. Panoramica e Contatti conservano
`#funzionalita` e `#contatti`. Percorsi HTTP e canonical invariati.

Sono conservati `usePathname` per lo stato corrente, chiusura dei menu e focus/Escape.
Nessun listener globale, timer, modifica di `scrollRestoration`, reset su cambio route
o nuovo componente. La gestione speciale provvisoria dei clic ripetuti è stata rimossa.
Guida e sidecar Traccia aggiornati insieme.

Scelta tecnica: fra pagine diverse l'header carica un nuovo documento, usando la
navigazione standard del browser; il routing client del resto del sito resta quello
esistente. Il vantaggio verificato è la gestione coerente di frammenti e cronologia.
Prestazioni delle transizioni non rimisurate. Eccezione ESLint locale alla sola
`Navbar`, per la regola `@next/next/no-html-link-for-pages`, con motivo in linea:
le ancore native sono intenzionali per questo comportamento. Nessuna esclusione globale.

## Verifica

- Matrice finale `after.json`: 24 casi su 1440 e 390 px, scorrimenti iniziali
  120/800/2200 sul desktop e 800 sul telefono. Cambi Home/Prezzi, ritorno alla pagina
  corrente e URL già contenente `#main-content`: tutti con `scrollY = 0`.
- `anchors-history.json`: le cinque aree a entrambe le larghezze arrivano a zero;
  Panoramica e Contatti raggiungono le sezioni sotto la barra fissa; Indietro torna
  a 800 px e Avanti a Prezzi a zero.
- `final-checks.json`: sei ulteriori casi di clic ripetuto e query nell'URL, tutti a
  zero. Indietro dalla pagina senza query ripristina query originale e 800 px.
- Script di regressione eseguiti sulla build finale:
  `output/playwright/navigation-scroll/repro.mjs`, `anchors-history.mjs`,
  `final-checks.mjs`. Nessuna modifica al DOM o al router per far passare le prove finali.
- Screenshot finali Prezzi a 1440 e 390 px aperti e rivisti: inizio pagina visibile.
  I banner presenti nelle acquisizioni non sono stati nascosti con CSS.
- Suite completa: 136 Vitest su 21 file e 3 Node commerciali passati. Aggiornati
  i contratti href della navbar nei test navigazione, aree e billing; le CTA del corpo
  delle pagine billing conservano le destinazioni precedenti. Avvisi noti del runner:
  localStorage sperimentale Node e navigazione Document non implementata in jsdom.
- Build Next 16.4.2 con TypeScript, ESLint mirato e diff-check passati.

Nessuna dipendenza, API, dato commerciale, consenso o asset modificato. Lavoro
concorrente preservato. Non verificati Safari, dispositivi fisici, lettori di schermo,
workerd o sito pubblicato. Le prove misurano lo scroll effettivo in Chrome e non
costituiscono una garanzia per browser non provati.
