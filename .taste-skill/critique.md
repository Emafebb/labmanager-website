ROUND 1
Seen in one second: il titolo tipografico enorme e le mani che lavorano la sfoglia.
Idea (one sentence): le operazioni collegate di LabManager diventano il sommario di una rivista di laboratorio.
Live thing: il selettore per mestiere apre un esempio concreto e porta ai dettagli delle funzioni.
Layout words by section: hero=manifesto / workflow=indice e tavola / gallery=trittico asimmetrico / features=indice su campo scuro / pricing=piani sfalsati / faq=fasce / contact=modulo / footer=wordmark.
Scores: design 7.5 · usability 6.5 · creativity 7 · content 8 → overall 7.15, capped 6.0
Caps applied: inspector FAIL, headline mobile a tre righe.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. mobile-fold.jpg: Dalla ricetta si spezza e porta il titolo a tre righe. Ridurre la scala solo sul telefono, mantenendo entrambe le righe composte.
2. tablet-page-01.jpg: Ogni dettaglio conta si spezza in tre righe. Allargare la colonna e calibrare il titolo nel breakpoint tablet.
3. desktop-fold.jpg: banner cookie locale copre il prodotto e conserva il tema precedente. Allineare soltanto il tema dei widget; per misurare il sito, chiudere il banner attraverso il suo pulsante reale. Nessuna esclusione di regole nel misuratore.

Controlli aggiuntivi: esplicitare display:none sui contenuti dei details chiusi, per focus/layout coerenti; usare animationstart CSS per registrare gli ingressi reali. Le immagini sono generate, nessuna fotografia reperita esternamente. Non è stato trovato o usato footage reale; il movimento fotografico è affidato all’ingresso dell’immagine principale.

ROUND 2
Seen in one second: titolo-manifesto, sfoglia centrale, azzurro pieno.
Idea (one sentence): il sommario di una rivista artigiana rende navigabili le operazioni collegate del gestionale.
Live thing: scelta del mestiere e passaggio al dettaglio delle funzioni.
Layout words by section: hero=manifesto / workflow=indice / gallery=trittico / features=indice scuro / pricing=piani sfalsati / faq=fasce / contact=modulo / footer=wordmark.
Scores: design 7.8 · usability 7.8 · creativity 7 · content 7.8 → overall 7.64
Caps applied: creativity capped at 7, il dispositivo editoriale resta applicabile anche a un concorrente.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. mobile-page-01.jpg: link ripetuti sotto ogni fase sono letti dal misuratore come occhielli della fase seguente. Spostata l’azione sul titolo della fase, migliorando anche la lettura.
2. mobile-page-01.jpg: troppe variazioni minime di corpo (18/19/20 e 40/43/44). Ricondotte ai ruoli 14/16/20/44px; il wordmark conserva la propria scala.
3. tablet/desktop: il banner cookie in ambiente locale può ricomparire dopo la chiusura. Gli screenshot successivi chiudono il controllo reale a ogni schermata, senza nascondere elementi o modificare i criteri del misuratore. Il dominio locale non costituisce collaudo della configurazione remota del CMP.

ROUND 3
Seen in one second: Dalla ricetta al banco, con il lavoro manuale al centro.
Idea (one sentence): il software viene presentato con il linguaggio visivo di una rivista di laboratorio, facendo leggere il lavoro prima dei moduli.
Live thing: quattro percorsi per mestiere, navigabili anche come dettagli nativi senza script.
Layout words by section: hero=manifesto / workflow=indice / gallery=trittico / features=indice scuro / pricing=piani sfalsati / faq=fasce / contact=modulo / footer=wordmark.
Scores: design 7.8 · usability 8 · creativity 7 · content 7.8 → overall 7.7
Caps applied: creativity capped at 7 per trasferibilità del concept editoriale.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Prova visiva del software ancora incompleta: Food Cost, Ordini e Libro ingredienti sono stati scelti con il committente, ma gli screenshot aggiornati devono ancora essere forniti. Nessun mockup presentato come schermata reale.
2. mobile-page-01.jpg: testo dei piani molto stretto. Accorciati i riepiloghi; il confronto completo resta nella pagina prezzi. A 320px i piani passano su una colonna, dopo aver riprodotto un overflow di 2px.
3. Nessun footage: le immagini generate e il movimento fotografico della hero sono sufficienti a questa versione. Nessun video reale del cliente/prodotto disponibile nel repository; restano prioritari gli screenshot concordati.

Esito misuratore: homepage 1440/768/390 senza FAIL; ultima ispezione mobile 0 FAIL/0 WARN. Desktop mantiene l’avviso sull’assenza di video. 36–37 elementi osservati in movimento, con fallback reduced-motion. QA browser su dieci route a tre larghezze, più bordi 320/701/900/901, senza overflow dopo la correzione. Nessun invio reale di form.


RIALLINEAMENTO TRACCIA — ROUND 1, nuova richiesta del committente
Seen in one second: titolo Fraunces verde bosco e lavorazione dell’impasto su avorio.
Idea (one sentence): i percorsi operativi restano il sommario del laboratorio, ora dentro l’identità Traccia.
Live thing: scegliere il mestiere e aprire la funzione collegata.
Layout words by section: hero=apertura a due colonne / workflow=indice / gallery=trittico / features=indice bosco / pricing=piani / faq=fasce / contact=modulo / footer=firma.
Scores: design 8 · usability 8 · creativity 7 · content 7.8 → overall 7.78
Caps applied: creativity capped at 7 per trasferibilità del dispositivo editoriale; valutazione interna, non recensione esterna.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Primo schermo con il serif richiedeva una composizione diversa dal manifesto condensato: hero a due colonne, titolo in due righe a 88/48/42,9px, CTA nel primo schermo mobile. Vedi brandkit-final/*-fold.jpg.
2. Piani mobili con colonne strette: prezzi in Manrope tabulare e dimensione autonoma, /mese su riga separata; sotto 360px resta una colonna. Il confronto completo rimane in /pricing. Vedi mobile-page-01.jpg e brandkit-routes/pricing-review.jpg.
3. Mancano ancora le tre schermate concordate del prodotto: mantenuta la provenienza AI delle quattro immagini editoriali e nessun mockup aggiunto. Rimane una dipendenza dal committente.

Misurazione finale: 0 FAIL, 2 WARN. Avorio richiesto esplicitamente dal brandkit, quindi conservato. Video assente: nessun footage reale del prodotto/cliente fornito e scelta già accettata nella consegna precedente. Nove acquisizioni finali della home e cinque coppie desktop/mobile delle route secondarie aperte e riviste; nessun contenuto nascosto per far passare i controlli. Font e asset del kit verificati identici, logo invariato. Nessun nuovo asset generato con AI.
