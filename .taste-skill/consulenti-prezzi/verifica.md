# Consulenti ed equivalente mensile dell’annuale — 19 ottobre 2026

Applicata la proposta approvata «Sei un consulente?» nel percorso Ristorazione, con il relativo testo su analisi Food Cost, prezzi e grammature dei menu dei clienti ed esportazione PDF. Il link conserva `/ricette-food-cost#recipe-menu-heading`; nell’approfondimento è presente il paragrafo «Per i consulenti».

La sezione piani della home mostra €16,67/mese Light e €40/mese Plus, calcolati dalle offerte annuali del manifesto con lo stesso arrotondamento usato nella pagina Prezzi. Sotto ogni prezzo: «Con pagamento annuale» e «Fatturati €200/anno» oppure «Fatturati €480/anno». La nota comune indica ora la disponibilità del pagamento mensile. Importi contrattuali, manifesto, FAQ e pagina Prezzi non modificati.

Verifiche nuove: 134 test Vitest e 3 controlli commerciali passati, ESLint mirato, diff-check e build produzione completati. Due test osservati fallire prima del cambiamento. Chrome a 1440/768/390/320: importi, totale annuale, dichiarazione del pagamento, allineamento dei prezzi e delle schede, selezione Ristorazione e contenuto collegato; nessun overflow o errore runtime registrato. Script e dati in `verify.mjs` e `report.json`. Screenshot mirati e nove immagini dell’inspector aperti e rivisti.

Taste home: 0 FAIL / 2 WARN a 1440/768/390. Restano gli avvisi già motivati su assenza di footage e varietà dimensionale del tablet. Avorio consentito perché previsto da Traccia. Nessuna nuova estrazione, immagine o modifica del movimento.

ROUND 3

Seen in one second: piani allineati, equivalente mensile ben visibile e pagamento annuale esplicitato sotto.

Idea (one sentence): il percorso editoriale del lavoro si apre anche a chi prepara un’analisi per altri laboratori.

Live thing: scelta Ristorazione e accesso all’approfondimento per consulenti.

Layout words by section: percorsi=selettore e quattro passaggi / piani=due schede allineate e azione.

Scores: design 7.8 · usability 7.8 · creativity 7 · content 7.5 → overall 7.6 per la home.

Caps applied: nessun nuovo tetto per questa modifica; i limiti del precedente audit sulle altre pagine restano distinti.

Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Prova del prodotto ancora fotografica: `inspect/desktop-page-01.jpg`; integrare gli screenshot autentici già concordati.
2. Comandi fissi possono passare sui testi durante lo scorrimento: `inspect/mobile-page-01.jpg`; comportamento corrente conservato, nessuna riprogettazione dei comandi in questa modifica.
3. A 320 px i piani sono impilati: `prezzi-320.jpg`; ordine intenzionale per mantenere leggibili gli importi, nessuna correzione aggiuntiva proposta.

Anteprima aggiornata su porta 3038. Non verificati Safari o pagamenti reali. Nessun commit, push o deploy.
