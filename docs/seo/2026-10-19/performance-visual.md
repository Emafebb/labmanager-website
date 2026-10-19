# Prestazioni, immagini e browser — 19 ottobre 2026

## Target e metodo

Build di produzione Next.js Node dal commit `3b9bb7c6b86f67500d2e1f0293b03060d13ca3ec`, origine `http://127.0.0.1:3049`, BUILD_ID `X48ne7fzxtjRhr0basNNh`. Provenienza byte per byte dei 296 file tracciati in `output/seo-audit-2026-10-19/technical/provenance.json`. Non sono state copiate configurazioni `.env`: il beacon opzionale Cloudflare Web Analytics non è incluso. CMP LegalBlink, GTM e TabNav sono invece realmente caricati dal codice pubblico. Questo può differire dalla futura configurazione di produzione.

Chrome headless 155, Lighthouse 13.4.0, Node v26.5.0. Misure Lighthouse seriali, profilo mobile predefinito: viewport 412 × 823, DPR 1,75, simulazione rete 150 ms RTT / 1638,4 Kbps e CPU ×4. Sette pagine mobile; Home e Prezzi ripetute tre volte per verificare lentezza/variabilità; un campione desktop su ciascuna delle due, con preset desktop. Nessuna modifica al prodotto. Il browser visuale usa separatamente 1440 × 1000 e 390 × 844; la seconda è una viewport stretta, non la certificazione di un telefono fisico.

Prove locali, ignorate da Git:

- `output/seo-audit-2026-10-19/lighthouse/`: report JSON integrali, log, `run.sh`, `repeat.sh`, `summary.json`.
- `output/seo-audit-2026-10-19/browser/`: DOM, immagini, acquisizioni con banner aperto e dopo chiusura tramite il comando reale «Chiudi», confronto senza JS e fogli di contatto effettivamente esaminati.
- `browser-capture.js`, `browser-content.js` e `browser-config.json` nella cartella dell'audit: procedure di acquisizione con Playwright CLI già disponibile, senza nuove dipendenze nel progetto.

La build originale sulla porta 3038 non è stata interrotta o ricostruita. I due tentativi iniziali della build isolata hanno incontrato restrizioni del listener locale e del symlink esterno a Turbopack: la misura definitiva usa dipendenze copiate e `npm run build` ordinario completato, non un server dev o un compilatore alternativo.

## Risultati di laboratorio

Valori mediani per Home e Prezzi; una misura per ciascuna altra pagina. Arrotondamenti solo in tabella; numeri integrali nei JSON. Nessun warning Lighthouse o errore runtime nei 14 report complessivi, incluso l'esperimento diagnostico separato.

| Percorso locale | Run mobile | Performance Lighthouse /100 | LCP simulato | CLS lab | TBT lab |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/` | 3 | 88, intervallo 69–95 | 3,64 s, intervallo 2,98–7,93 | 0,0019 | 1 ms |
| `/ricette-food-cost` | 1 | 97 | 2,54 s | 0 | 1,5 ms |
| `/produzione-magazzino` | 1 | 90 | 3,41 s | 0,0125 | 0,5 ms |
| `/ordini` | 1 | 94 | 3,11 s | 0 | 1,5 ms |
| `/etichette-libro-ingredienti` | 1 | 97 | 2,53 s | 0 | 1 ms |
| `/strumenti` | 1 | 97 | 2,53 s | 0 | 2 ms |
| `/pricing` | 3 | 74 | 7,82 s, intervallo 7,76–7,85 | 0,0007 | 2 ms |

Desktop: Home 100/100, LCP 0,71 s; Prezzi 94/100, LCP 1,66 s. Questi due campioni non rappresentano le prestazioni desktop delle altre cinque pagine.

Il controllo automatico SEO di Lighthouse restituisce 100/100 sulle sette pagine e nelle ripetizioni che includono tale categoria. È un insieme limitato di controlli automatici, non il punteggio SEO complessivo del sito, né una previsione di ranking. Il punteggio Performance è distinto.

**Nessun INP o CWV sul campo misurato.** Il TBT non viene trasformato in INP. Le soglie CWV «buone» LCP ≤2,5 s, INP ≤200 ms, CLS ≤0,1 si applicano al 75° percentile delle visite reali, segmentate: questi campioni simulati non attestano un superamento/fallimento CWV reale. Le pagine a circa 2,53 s non vengono trattate come regressioni gravi per pochi centesimi in una singola misura. Fonti: [Web Vitals](https://web.dev/articles/vitals), [differenze laboratorio/campo](https://web.dev/articles/lab-and-field-data-differences), [punteggio Lighthouse](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring).

## PV-01 — LCP mobile lento, particolarmente ripetibile su Prezzi

- **Tipo:** rischio di prestazione verificato in laboratorio. **Priorità alta per l'approfondimento prima del rilascio**; non prova di blocco indicizzazione o calo di ranking.
- **URL/target:** `http://127.0.0.1:3049/pricing` e `/`, build identificata sopra.
- **Evidenza:** tre run Prezzi 7,82 / 7,85 / 7,76 s. Il nodo LCP è il primo paragrafo del banner CMP, nel suo shadow DOM (`lcp-breakdown-insight`). Home 7,93 / 3,64 / 2,98 s, nodo LCP fotografia `.hero__image > img`; il primo valore non è presentato da solo come prestazione tipica. CLS e TBT di questi campioni non spiegano da soli la lentezza LCP.
- **Riproduzione:** `bash output/seo-audit-2026-10-19/lighthouse/run.sh`, poi `repeat.sh`, con anteprima attiva. Conservare freddo il profilo di ciascuna invocazione e registrare strumenti, impostazioni, network log e nodo LCP, non soltanto il punteggio.
- **Esperimento diagnostico separato:** un solo run di Prezzi, con `--blocked-url-patterns='https://app.legalblink.it/*'`, dà LCP 3,28 s e Performance 91; il nodo diventa il paragrafo introduttivo della pagina. Conferma un'incidenza del percorso CMP in quel campione, ma non isola ogni dipendenza e non dimostra che sia l'unica causa. Non è la versione normale del sito, non sostituisce i tre run completi, non è una proposta di rimozione/differimento del consenso e non dimostra una soluzione sotto 2,5 s. File `pricing-mobile-diagnostic-no-cmp.json`.
- **Proposta:** prima misurare sul runtime workerd una visita nuova e una visita con preferenza già espressa tramite il controllo reale, separando la disponibilità del contenuto dal banner. Esaminare rete/inizializzazione CMP e configurazione della prima vista con il responsabile dei consensi; ottimizzare mantenendo il comportamento approvato. Per Home esaminare priorità e dimensione dell'immagine come PV-02. Non eliminare widget, dichiarazioni o consensi per migliorare il punteggio. Nessuna modifica remota o al prodotto eseguita.
- **Limiti:** localhost Node non riproduce TLS/CDN/cache/WAF di produzione; i servizi terzi restano reali e variabili. Nessun dato di utenti reali, nessuna equivalenza fra questo rischio e una penalità SEO dimostrata. [Guida Google sull'esperienza pagina](https://developers.google.com/search/docs/appearance/page-experience).

## PV-02 — Immagini originali scaricate anche sul telefono

- **Tipo:** opportunità tecnica verificata. **Priorità media**; l'effetto finale va misurato.
- **URL:** Home e cinque aree; logo comune anche su Prezzi. Prove `browser/images.json`, `browser/dom.json` e audit `image-delivery-insight`.
- **Evidenza:** 16 occorrenze `img` sulle sette pagine a ciascuna viewport, tutte caricate, con alt e dimensioni dichiarate. Nessun `srcset` sulle immagini renderizzate; telefono e desktop usano gli stessi file. Il logo decorativo ha correttamente `alt=""` e `aria-hidden`; non è un alt mancante.

| Asset | Byte del file | Dimensioni naturali | Osservazione |
| --- | ---: | --- | --- |
| `hero-laboratorio.webp` | 152.892 | 1086 × 1448 | Home mobile renderizzata circa 350 px di larghezza |
| `pane.webp` | 246.290 | 1536 × 1024 | Galleria home e Strumenti, originale unico |
| `gelato.webp` | 142.714 | 768 × 1024 | Galleria home ed Etichette |
| `preparazioni.webp` | 162.466 | 768 × 1024 | Galleria home, Produzione e Ordini |
| `logo.png` | 82.037 | 256 × 256 | Header circa 28 px mobile |

Il run Home iniziale stima 592 KiB risparmiabili sulle immagini complessivamente analizzate: è una stima Lighthouse, non un risparmio implementato, né una riduzione LCP garantita. L'hero è già nell'HTML iniziale e non è lazy; il controllo Lighthouse segnala invece assenza di priorità `high` nel preload. `sizes` nel sorgente non genera varianti quando la resa effettiva resta non ottimizzata e senza `srcset`.

- **Proposta minima:** mantenere `images.unoptimized` e Traccia; predisporre varianti statiche dei soli asset correnti, con `picture/srcset/sizes` corrispondenti al layout. Il pattern nativo è già presente nel repository, ma gli asset storici di `responsive-images.ts` rappresentano schermate precedenti e non vanno rimessi nell'hero editoriale. Verificare gli hint di priorità realmente emessi per l'hero senza duplicare i download. Nessuna necessità di abilitare Cloudflare Images o cambiare servizio a pagamento.
- **Conferma richiesta al futuro fix:** stesso contenuto/rapporto visivo, byte inferiori alle viewport provate, un solo download appropriato per immagine, nessun aumento di CLS e nuove misure LCP. [Google immagini](https://developers.google.com/search/docs/appearance/google-images), [Next Image](https://nextjs.org/docs/app/api-reference/components/image), [ottimizzazione LCP](https://web.dev/articles/optimize-lcp).

## Browser, contenuti nativi e social

Le 14 configurazioni JS 7 pagine × 1440/390 non hanno mostrato overflow orizzontale, immagini rotte o eccezioni JavaScript. Title/canonical/robots/description/H1 e testo principale senza script coincidono con l'HTML iniziale; le sette prove senza JS mantengono titolo/H1 e testo dei dettagli. Non si equipara `textContent` a testo tutto contemporaneamente visibile: i dettagli chiusi restano espandibili.

La prima acquisizione conserva il banner di prima visita e mostra l'ingombro del CMP. La seconda serie chiude il banner mediante il suo pulsante reale «Chiudi», senza accettare tutti, nascondere elementi via CSS o modificare servizi esterni. I 14 screenshot successivi mostrano H1 e CTA leggibili; la presenza della CTA nel primo viewport dipende dalla composizione della pagina e non viene imposta come requisito SEO universale. I fogli `contact-*` e `content-contact-*` sono stati aperti e confrontati. Non è un nuovo audit completo di accessibilità o di tutte le interazioni.

In Strumenti, ingresso diretto con JavaScript disabilitato in `/strumenti#conversione-stampi`: dettaglio nativo aperto, summary a y≈104 px e contenuto a y≈172 px dopo stabilizzazione, sotto la testata. Prova `browser/content.json` e screenshot `strumenti-nojs-anchor.jpg`. Un probe iniziale dello script usava per errore `#strumento-stampi`; quel controllo non è una prova del prodotto ed è stato sostituito dalla verifica dell'ID effettivamente linkato. La misurazione immediata prima dello scroll asincrono del browser non viene usata per segnalare un difetto.

Open Graph/Twitter: tutte le sette pagine dichiarano URL, titolo e immagine; Home/aree usano `og-image.png`, Prezzi `pricing-og-image.png`. I due file sono presenti, serviti localmente 200 `image/png`, 1200 × 630, 484.524 byte ciascuno; sono la stessa copertina Traccia con marchio e titolo editoriale, senza prezzi obsoleti. Entrambe le immagini sono state aperte. Condividere la copertina non è un bug né obbliga a produrre sette asset. Le cache Facebook/WhatsApp e l'aspetto delle condivisioni del dominio pubblico non sono stati verificati o invalidati.

## Limiti

Non verificati Safari, dispositivi fisici, prestazioni workerd, rete pubblica della candidata, campagna conversioni, form reali, pagamenti, consenso legale, Search Console/GA4/CrUX. Il controllo credenziali locale `google_auth.py --check --json`, eseguito con il virtualenv della skill, non rileva accessi configurati; non afferma che il proprietario non disponga di account altrove. I test applicativi storici non sono stati rieseguiti per il solo audit; la build isolata con TypeScript è stata eseguita e completata. Il collaudo manuale del committente rimane aperto.
