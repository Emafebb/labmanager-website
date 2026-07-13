# Piano d'azione SEO — 11 luglio 2026

## 0. Criterio di priorità

- **Critica:** sicurezza, perdita di dati o rischio concreto di duplicazione/indexazione.
- **Alta:** impatta in modo rilevante visibilità, fiducia o conversione.
- **Media:** miglioramento rilevante da completare entro un mese.
- **Bassa:** ottimizzazione o monitoraggio.

## Critica — subito

- [ ] **Forzare HTTP → HTTPS per ogni URL.** In Cloudflare/edge o origin creare un 301/308 in un solo hop da http a https, preservando path e query. Verificare homepage, form/API, URL inesistente e URL con query.

  Verifica attesa: una richiesta HEAD a http://labmanagergestionale.com/ restituisce 301/308 con Location HTTPS, mai 200.

- [ ] **Riconciliare le promesse del modulo Magazzino.** Decidere quali funzionalità sono live oggi e correggere in modo coerente Warehouse, Hero, FAQ, FAQ JSON-LD, llms.txt, pricing e note di rilascio. Non lasciare che una pagina prometta soglie/FIFO/multi-sede mentre una FAQ dichiara le stesse funzioni in sviluppo.

## Alta — prima settimana

- [ ] **Portare LCP mobile sotto controllo.** Mantenere priority soltanto sull'asset LCP al breakpoint corrente; rimuoverlo dalle immagini tablet/telefono nascoste su mobile. Generare asset responsive AVIF/WebP e usare sizes/srcset o Next/Image correttamente configurato.

- [ ] **Ridurre script non essenziali.** Misurare LegalBlink, accessibilità e script terzi; rinviare il caricamento dopo consenso/interazione soltanto se conforme ai requisiti legali e di accessibilità.

- [ ] **Correggere lo schema globale.** Rimuovere HowTo dal layout globale. Rimuovere il breadcrumb Home-only dalle pagine interne; creare WebPage e breadcrumb page-scoped corretti per prezzi e newsletter. Mantenere FAQPage solo per semantica/AI, non per ottenere rich result Google.

- [ ] **Aggiungere fiducia verificabile.** Esporre identità aziendale appropriata, profili sameAs verificati, team/revisori, testimonianze e casi cliente reali. Usare aggregateRating solo dopo aver raccolto recensioni autentiche e verificabili.

- [ ] **Rendere il trial più visibile.** Testare come CTA principale Prova gratis 14 giorni, con CTA secondaria verso Ordini o Prezzi. Aggiungere percorsi per proprietario, responsabile produzione/ordini, valutatore prezzo e responsabile compliance.

## Media — entro un mese

- [ ] **Ottimizzare i title per l'intento.** Validare in SERP e, se non cannibalizzano altre pagine, provare:
  - /pricing: Prezzi gestionale per pasticceria | LabManager
  - /ordini: Gestione ordini per pasticceria | LabManager

- [ ] **Rendere la 404 semanticamente coerente.** Conservare lo status HTTP 404 ma far emettere un singolo robots noindex, senza il meta index, follow ereditato.

- [ ] **Correggere immagini newsletter e hero.** Convertire/comprimere la schermata da 289 KB, aggiungere aspect-ratio e rendere le immagini responsive.

- [ ] **Ridurre l'attrito mobile iniziale.** Verificare che il banner cookie non copra la CTA hero dopo la prima interazione; alzare i touch target mobile a almeno 44 × 44 px.

- [ ] **Costruire prova e contenuti citabili.** Pubblicare blocchi attribuiti e aggiornati, case study e materiale con fonti su food cost, allergeni/etichette, lotti/scadenze, produzione e bilanciamento.

- [ ] **Costruire un cluster senza cannibalizzazione.** Tenere la homepage per gestionale pasticceria e creare, dopo ricerca di sovrapposizione SERP:
  - feature/use case: gestione ordini pasticceria, magazzino pasticceria, etichette allergeni;
  - risorse: food cost, normativa allergeni, tracciabilità lotti/scadenze, pianificazione produzione, bilanciamento ricette.

  Per ogni nuova risorsa: contenuto sostanzialmente unico, almeno tre link interni in ingresso e collegamenti contestuali verso feature, prova e prezzi.

- [ ] **Decidere il ruolo di /aggiornamenti.** Se le release note sono utili alla ricerca, renderle una pagina con canonical proprio, struttura editoriale e sitemap. Altrimenti mantenere la scelta noindex in modo intenzionale.

## Bassa — monitoraggio

- [ ] Impostare Content-Type text/plain; charset=utf-8 sulle risposte live di llms.txt e robots.txt.
- [ ] Verificare se mantenere priority/changefreq nella sitemap; non hanno effetto su Google.
- [ ] Valutare CSP nonce/hash per rimuovere unsafe-inline e unsafe-eval senza rompere Next.js o gli script necessari.
- [ ] Monitorare il risultato legacy pastrylabmanager.com: oggi redirige correttamente, quindi serve normalizzazione dell'indice, non una correzione di duplicate content live.
- [ ] Valutare IndexNow come integrazione facoltativa, dopo avere completato le priorità superiori.

## Misurazione post-rilascio

- [ ] Collegare Search Console: copertura, canonical selezionato da Google, query e CTR delle pagine home/ordini/prezzi.
- [ ] Collegare CrUX/PageSpeed: LCP e INP mobili di campo, non solo Lighthouse.
- [ ] Collegare GA4: CTA, trial, contatti e drop-off mobile.
- [ ] Collegare Moz o Bing Webmaster: domini referenti, anchor text, qualità e trend backlink.
