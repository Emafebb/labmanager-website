# Fix visivi — 19 ottobre 2026

Implementati i fix di impaginazione approvati dopo l’audit e le due richieste aggiuntive: Ristorazione al posto di Gastronomia e allineamento delle fotografie e dei piani mostrati negli screenshot. Conservati Traccia e la direzione esistente Dressed as something else, seed 1228958381; nessuna estrazione creativa, nuova immagine o dipendenza.

## Cambiamenti

- Ristorazione segue piatto, costo per porzione, prezzo/margine, creazione del menu e proposta PDF. Mantiene i collegamenti alle funzioni esistenti. Testata anche la selezione, l’apertura del dettaglio Food Cost e il ritorno a Mostra tutti.
- Galleria home: tre colonne uguali, stesso rapporto 3:2 e nessuno sfalsamento della seconda fotografia. Sul telefono rimangono l’immagine principale e la coppia sottostante allineata.
- Piani home: eliminato il margine superiore di Plus. Subgrid per condividere titolo, descrizione e prezzo; anche il blocco CTA occupa le tre righe per non dilatare la prima. Sotto 361 px i piani sono impilati.
- Titoli Etichette brevi, senza interruzioni forzate: «Dal prodotto all’etichetta», «Cambia la ricetta», «Il tuo Libro ingredienti». Tutti gli H1/H2 della pagina entro due righe nelle cinque larghezze provate.
- Strumenti: sette dettagli HTML nativi, primo aperto, con tutti i contenuti originali. Le ancore puntano al contenuto interno e aprono il dettaglio anche senza JavaScript. Un offset di 72 px lascia visibile il titolo sotto la navbar.
- Prezzi fino a 700 px: nome della funzione a tutta larghezza, valori Light/Plus su due colonne con etichetta. Conservati ruoli della tabella e intestazioni accessibili. Nessuna modifica a prezzi, inclusioni, fatturazione o destinazioni CTA.
- Chiusure delle pagine: testo e azione bilanciati su due colonne; impilati sul telefono. Eliminati i divider nelle aree e nei correlati; ripresi i reveal esistenti nelle sezioni condivise.
- Footer fino a 900 px: margini esterni simmetrici. Solo frase, dati societari e nota AI mantengono la zona di rispetto di 64 px; spazio finale di 112 px. Conservati dati, link, disclosure e comportamento WhatsApp già presente nel checkout.
- Ricette: reso visibile in un piccolo riepilogo l’esempio già esistente da 2 kg a 6 kg, dichiarato dimostrativo. Non è una schermata del software.
- Allineati `DESIGN.md` e `.impeccable/design.json`.

## Misure prima/dopo

| Controllo | Prima | Dopo |
| --- | --- | --- |
| Seconda foto home desktop | 65 px di sfalsamento; colonne diverse | stesse coordinate superiori e altezze, colonne uguali |
| Plus home desktop | 45 px sotto Light | stessa posizione, altezza e linea del prezzo |
| H1 Etichette a 1440/768/390 | 3 righe | 2 righe |
| Titolo esempio Etichette a 768 | 4 righe | 1 riga |
| Strumenti a 390 | 8.556 px | 6.653 px, circa −22% |
| Strumenti a 1440 | 6.289 px | 5.197 px, circa −17% |
| Footer a 390 | margini 20/84 px sull’intera superficie | margini esterni 20/20 px; protezione locale per testi lunghi |
| Confronto prezzi mobile | tre colonne strette | nome sopra, Light/Plus affiancati sotto |
| Ancora nel dettaglio Strumenti durante sviluppo | titolo a y=56 sotto navbar alta 76 px | titolo interamente sotto la navbar, verificato con e senza JavaScript |

I valori iniziali provengono dall’audit `.taste-skill/visual-audit-2026-10-19/` e dal CSS salvato prima di questo intervento in `/tmp/labmanager-visual-fixes-baseline`. L’altezza di Strumenti confronta lo stato iniziale di lettura: primo dettaglio aperto dopo il fix; gli altri contenuti restano espandibili.

## Verifiche

- **133 test Vitest + 3 controlli Node commerciali**, tutti passati; test nuovi/estesi osservati fallire prima dei rispettivi fix.
- ESLint sui dieci sorgenti/test coinvolti e `git diff --check` passati. Build produzione Next, TypeScript e generazione delle route completati.
- Chrome sulla build finale locale **porta 3038**: sette pagine × cinque larghezze **1822/1440/768/390/320**, **35 configurazioni senza errori di verifica o eccezioni JavaScript registrate**. Script e misure in `verify.mjs` e `browser/report.json`.
- Controllati caricamento immagini, overflow, allineamento immagini e piani, titoli Etichette, sette strumenti, ancore, margini footer, 24 righe dati + 4 gruppi nel confronto prezzi, cambio periodicità e presenza della tabella/intestazioni nell’albero accessibile Chrome.
- Prove aggiuntive: home con reduced motion; apertura dell’ancora Conversione degli stampi con JavaScript disabilitato. Nessun invio reale di moduli o pagamento.
- Review indipendente mirata: corretta l’espansione della prima riga dei piani dovuta al CTA e verificata/corretta la posizione del titolo nelle ancore native.
- Screenshot finali esaminati: i fogli e le aperture desktop/tablet/mobile dei quattro inspector, più acquisizioni mirate di piani, fotografie, Ristorazione, footer e strumenti espansi/senza JavaScript.
- Il primo script browser contava erroneamente 28 righe di dati: sono 24 più quattro intestazioni di gruppo. Corretto il solo controllo, senza cambiare righe o dati del prodotto.

## Taste: risultati e limiti

La home ha **0 FAIL / 2 WARN** (assenza di footage e varietà dimensionale sul tablet). Etichette e Strumenti hanno **1 FAIL ciascuna**, relativo alla quantità di immagini: una sola fotografia nel contenuto, in attesa della dimostrazione autentica del software. Non sono stati aggiunti screenshot inventati o fotografie decorative per superare il contatore.

Prezzi mantiene quattro segnalazioni stilistiche: raccomandazione Plus classificata come eyebrow sopra il prezzo, assenza di immagini, predominanza visiva del primo schermo e pagina statica. La raccomandazione è un contratto già presente nei test; titolo e densità iniziale erano approvati. Non è stato trasformato il confronto in una pagina di immagini e animazioni. Il layout mobile richiesto è stato corretto e verificato. Non si dichiara il superamento del gate Taste dell’intero sito.

Il lint Taste sui file coinvolti conserva soltanto due ombre: menu realmente flottante e anello di focus WhatsApp. Non sono ombre decorative a riposo. Il controllo dell’avorio è consentito esplicitamente con `--allow palette-cream`, perché imposto dal brandkit.

L’inspector originale è richiamato da `inspect.mjs`: prima delle fotografie il wrapper chiude banner cookie e popup con i rispettivi comandi reali. Non nasconde elementi via CSS e non modifica i contatori del rilevatore. I risultati non vanno confusi con il primo audit che lasciava entrambi i dialoghi aperti.

ROUND 2

Seen in one second: identità Traccia e lavorazione artigiana; galleria e piani ora composti sulla stessa griglia.

Idea (one sentence): i collegamenti fra ricetta, costo, preparazione e vendita diventano un sommario editoriale del lavoro.

Live thing: selezione del mestiere, ora anche Ristorazione; dettagli nativi degli strumenti e selettore dei prezzi.

Layout words by section: home=split / percorsi=selettore / immagini=trittico allineato / funzioni=indice / prova=piani allineati; aree=split / flusso / esempio / note / inclusioni / correlati / chiusura su due colonne; strumenti=indice e dettagli; prezzi=confronto con disposizione mobile dedicata.

Scores: design 6.5 · usability 7.7 · creativity 6.8 · content 7.5 → overall **6.0 dopo il tetto Taste** (media 7.02). Per la sola home: design 7.8 · usability 7.8 · creativity 7 · content 7.5 → overall **7.6**.

Caps applied: il sito completo mantiene FAIL per disponibilità delle immagini e segnalazioni stilistiche di Prezzi. Il punteggio non misura il numero di regressioni risolte né la correttezza commerciale.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. La prova del software resta debole: `inspect-etichette/desktop-page-01.jpg`. Integrare gli screenshot autentici Food Cost, Ordini e Libro ingredienti già concordati.
2. Gli approfondimenti restano prevalentemente testuali dopo la hero: `inspect-etichette/tablet-page-01.jpg`. Usare quelle schermate per variare la composizione senza aggiungere contenuti di riempimento.
3. I comandi fissi possono passare su testo durante lo scorrimento: `inspect-pricing/mobile-page-01.jpg`. Footer e ancore sono protetti nei casi verificati; un’eventuale revisione generale dei comandi rimane distinta dal comportamento WhatsApp già scelto dal committente.

Non verificate Safari e dispositivi fisici. Le tre schermate autentiche restano da ricevere. Nessun commit, push o deploy; anteprima locale su `http://127.0.0.1:3038`. Fermati soltanto i server intermedi 3035, 3036 e 3037 creati in questo intervento.
