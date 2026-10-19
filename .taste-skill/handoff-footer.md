# Handoff — analisi del footer LabManager

19 ottobre 2026. Repository: `/Users/emanuele/Documents/github/labmanager-website`. Continuare in italiano.

## Richiesta da riprendere

Il committente vuole **analizzare il footer in una chat pulita** dopo l’aggiornamento della documentazione. La prima indicazione “pagina Prezzi” era un errore, corretto esplicitamente. L’analisi del footer non è ancora stata svolta in questa consegna: partire da osservazione e proposta, concordando in quella conversazione gli eventuali interventi.

## Contesto da leggere

1. `AGENTS.md` e `CLAUDE.md` per le istruzioni del repository e la precedenza del brand corrente.
2. `.taste-skill/brief.md`, sezione iniziale di stato corrente, e `.taste-skill/pagine-aree-di-lavoro.md` per implementazione, decisioni e verifiche più recenti.
3. `src/components/Footer.tsx`, le regole `.site-footer*` in `src/app/globals.css` e `src/data/work-areas.ts` per la superficie attuale.
4. `.taste-skill/verifica-tutte-le-pagine.md` per i rilievi precedenti da riprodurre; `output/playwright/work-areas/` per le acquisizioni successive alla nuova famiglia di pagine.

## Stato da conservare

- Ultima decisione, 19 ottobre: pagine `/aggiornamenti` e `/download` rimosse, 404 Traccia per i vecchi URL. Non aggiungerle al footer o alla navigazione. Il servizio Cloudflare `labmanager-downloads` resta separato e invariato; guida in `docs/RETIRED_PAGES.md`.
- Cinque approfondimenti autonomi sotto Funzionalità: `/ricette-food-cost`, `/produzione-magazzino`, `/ordini`, `/etichette-libro-ingredienti`, `/strumenti`. Il footer li legge dall’inventario condiviso; Home resta la panoramica. Ancore esistenti da preservare: `/#funzionalita`, `/#contatti`, `/ordini#flusso-ordine`.
- Traccia è la direzione approvata: `design/brandkit/brand.css` e `preview.html`, token correnti in `globals.css`, asset locali in `public/brandkit/`. Bosco/Avorio/Salvia/Ambra/bianco, Manrope 400/600/700 e Fraunces 400. Logo originale invariato. `.taste-skill/direction.json` mantiene il seed originario e l’override del brandkit.
- `DESIGN.md`, `.impeccable/design.json` e i vecchi brief di superficie riportano ancora indaco/DM Sans e altre regole superate. Le istruzioni correnti di `CLAUDE.md` e il brandkit prevalgono sui conflitti. Una loro riconciliazione integrale non è stata eseguita in questa chiusura documentale.
- Pubblico: laboratori artigianali alimentari; pasticcerie, panifici e gelaterie sono esempi. Mantenere i dati societari e le destinazioni di contatto presenti nei sorgenti.
- Il footer attuale comprende navigazione di prodotto e supporto, collegamento alla home attraverso il nome LabManager, privacy/cookie/preferenze, dati societari e nota sulle immagini AI. Questa è una descrizione dello stato, non una valutazione della sua qualità.
- Il comando “Aggiorna preferenze cookie” usa `CookieSettingsLink` e il trigger LegalBlink persistente: conservare il comportamento anche dopo una navigazione client. Riferimenti di test: `src/components/orders-preview-navigation.test.tsx` e `src/app/work-areas.test.tsx`.
- WhatsApp fisso con etichetta in basso a destra è una scelta del committente, presente sulla homepage. Il comando di accessibilità è un widget distinto. Moduli e consensi mantengono i contratti esistenti.
- Dicitura AI mantenuta: nota nel footer e didascalie nelle quattro nuove pagine. La proposta di abbreviazione non è stata applicata; non è stata autorizzata la rimozione. La discussione normativa e le fonti sono nel report delle aree. Distinguere scelta editoriale, possibile obbligo e valutazione del caso concreto.

## Evidenze disponibili e limiti

- Famiglia di pagine: 113 test Vitest e 3 Node commerciali; build, TypeScript e lint mirato passati. Browser Chrome su build locale: cinque aree a 1440/768/390/320, con menu, link, ancore, CTA, metadati e assenza di overflow nelle prove. `output/playwright/work-areas/report.json`.
- Dopo lo screenshot del committente sono stati corretti i flussi: tre passaggi su tre colonne oltre 1000 px, una sotto; quattro passaggi in 2 × 2 oltre 700 px. Titolo/introduzione allineati in alto e padding 80/64 px. Nuova build, 17 test mirati e 24 controlli sulle quattro pagine a 1440/1024/1000/768/390/320. `output/playwright/work-areas/layout-fix/report.json`. Safari non ricollaudato.
- Nell’audit precedente WhatsApp copriva la nota AI a fine footer sulla homepage a 390 × 844. Evidenze: `.taste-skill/verification/all-pages-extra.json` e `.taste-skill/all-pages/home-mobile-review.jpg`. Il footer è stato poi esteso con le cinque aree: riprodurre il caso corrente prima di considerarlo ancora aperto o risolto. Le verifiche delle nuove pagine senza WhatsApp non chiudono questo rilievo della home.
- L’audit precedente segnala anche conferma contatti a 320 px, target testata e immagine LCP newsletter. Sono rilievi distinti; evitare di trasformare automaticamente l’analisi del footer in una revisione dell’intero sito.
- Restano da ricevere screenshot reali di Food Cost, Ordini e Libro ingredienti con dati dimostrativi. Le fotografie esistenti sono editoriali AI, non schermate del software.

## Primo passo nella nuova chat

Rileggere lo stato Git e verificare quali processi locali siano attivi. Aprire il footer corrente su desktop/tablet/telefono e alla fine effettiva della homepage, chiudendo il popup tramite il suo pulsante. Valutare gerarchia, quantità dei collegamenti, dimensione del nome, leggibilità dei dati e ingombro dei comandi fissi. Riportare osservazioni e proposta in chat, distinguendo nuove evidenze dai rilievi storici.

Per il collaudo funzionale usare una build di produzione locale: in una fase precedente il server dev mostrava contenuti ma non idratava i componenti. Non assumere che le porte 3001/3002 siano ancora attive o servano la stessa build. Le acquisizioni devono attendere la fine delle animazioni.

## Workspace e rilascio

Ultimo stato osservato: `master`, HEAD `56f361e`, molte modifiche locali di più sessioni. L’intero lavoro delle pagine e del brandkit è locale: nessun commit, push o deploy eseguito in questa sessione. Preservare le modifiche condivise e usare interventi circoscritti. Il repository dell’app è consultabile in sola lettura; servizi Cloudflare separati, API e condizioni commerciali non fanno parte dell’analisi del footer.

Nessun modulo inviato realmente, nessuna iscrizione, pagamento o modifica di abbonamento, nessun messaggio WhatsApp inviato. CMP sul dominio reale, recapito email, cache social e prestazioni sul campo non sono attestati da queste verifiche locali.
