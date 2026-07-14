---
type: Interview Ledger
parent: spec.md
---

## Records

### L1

Status: current

Question: Quale offerta deve guidare il sito pubblico durante il lancio?

Answer: La web app è l'offerta da promuovere. Windows sarà dismesso per i nuovi utenti; Android è ancora da decidere e non deve ricevere promesse commerciali o download pubblici nel frattempo.

Decision: Il sito marketing presenta LabManager come prodotto accessibile tramite la web app. Windows e Android non compaiono nella navigazione, nei contenuti di acquisizione, nelle CTA, nei metadati o nel percorso commerciale. Le istruzioni native possono sopravvivere soltanto nella pagina Download non indicizzata e non pubblicizzata.

Negative Requirements:
- Non presentare Windows come offerta per nuovi clienti.
- Non anticipare una decisione sul mantenimento di Android.

Source: Intervista utente, 14 luglio 2026.

### L2

Status: current

Question: Come deve essere comunicato l'accesso al prodotto nei browser e sui dispositivi?

Answer: L'accesso da browser è normale e non va trasformato in un proclama su PWA, browser o compatibilità per dispositivo.

Decision: Il sito evita claim commerciali su PWA, installazione o supporto di browser/piattaforme. Il linguaggio pubblico parla del prodotto e del lavoro del laboratorio; il link alla web app resta il punto di ingresso operativo.

Source: Intervista utente, 14 luglio 2026.

### L3

Status: current

Question: Quale pubblico e quale terminologia devono definire LabManager?

Answer: Il pubblico principale è costituito da laboratori artigianali alimentari, in particolare pasticcerie, panifici e gelaterie. I ristoranti non devono più essere una categoria target generica.

Decision: Usare “laboratori artigianali alimentari” come perimetro generale e “pasticcerie, panifici e gelaterie” come esempi concreti. Rimuovere “ristoranti”, “ristorazione” e formulazioni equivalenti dalle superfici di acquisizione e dai segnali SEO.

Source: Intervista utente, 14 luglio 2026.

### L4

Status: current

Question: Quali capacità di prodotto possono essere presentate pubblicamente?

Answer: I quattro pilastri sono: “Ricette e Food Cost”, “Produzione ed Etichette”, “Magazzino” e “Ordini e Piano di Lavoro”. Per il Magazzino sono approvate esclusivamente ricevimento merci, giacenze per sede, soglie configurabili, scarico FIFO, alert scadenze e trasferimenti tra sedi. Gli Ordini possono descrivere ordini cliente/interni, produzione collegata, ritiro/consegna, acconti e report operativi, ma non fatture o contabilità.

Decision: Il copy pubblico e i dati strutturati si limitano ai quattro pilastri e ai claim approvati. Restano esclusi claim su offline, sincronizzazione, piattaforme native, team, contabilità/fatturazione o capacità Magazzino non approvate.

Source: Intervista utente, 14 luglio 2026; matrice Magazzino v1 esistente.

### L5

Status: current

Question: Come devono entrare nel prodotto gli utenti esistenti?

Answer: L'unica CTA globale per chi ha già un account è “Accedi”, nella navbar, e apre direttamente `https://app.labmanagergestionale.com` nella stessa scheda. Non deve essere chiamata “Area riservata” né ripetuta nelle pagine.

Decision: Navbar desktop e mobile hanno un solo ingresso globale “Accedi” diretto alla web app, senza `target="_blank"`, pagine ponte o inviti “Area riservata” distribuiti nel sito.

Source: Intervista utente, 14 luglio 2026.

### L6

Status: current

Question: Come devono funzionare CTA e percorso della prova per i nuovi utenti?

Answer: “Inizia la prova gratuita” appare soltanto in Home e Prezzi. Il click porta direttamente alla web app; registrazione, verifica email e primo login avviano la prova completa di 14 giorni senza carta. La pagina Ordini usa invece “Scopri i prezzi” verso il sito.

Decision: Il sito non modifica registrazione, verifica, timer della prova, piani o entitlement della web app. Le CTA di prova dirette alla web app sono limitate a Home e Prezzi; Ordini conduce internamente a `/pricing`.

Source: Intervista utente, 14 luglio 2026.

### L7

Status: current

Question: Quali elementi di navigazione e quale esperienza Home sono approvati?

Answer: La navbar contiene, nell'ordine, “Funzionalità”, “Ordini”, “Prezzi” e “Accedi”; non contiene CTA prova, FAQ, Contatti o Piattaforme. La hero usa l'H1 “Il gestionale per laboratori artigianali alimentari”, il testo “Ricette, food cost, produzione, etichette, magazzino e ordini: tutto ciò che serve per organizzare il lavoro del laboratorio.” e le CTA “Inizia la prova gratuita” e “Scopri le funzionalità”.

Decision: Rimuovere la navigazione e i pulsanti legacy. Conservare l'immagine hero telefono + desktop perché comunica versatilità, ma rendere copy, alt e segnali semantici neutrali rispetto a Android e Windows.

Source: Intervista utente, 14 luglio 2026.

### L8

Status: current

Question: Quali informazioni commerciali devono comparire nella pagina Prezzi?

Answer: Esiste un solo piano completo, acquistabile a €44,99/mese o €480/anno, con prova gratuita di 14 giorni senza carta. L'annuale include due sessioni private 1:1 e supporto prioritario. Il limite è “2 sessioni attive simultanee”, non due dispositivi. Un futuro Piano Light deve essere previsto come estensione futura ma non mostrato ora.

Answer History:
- Inizialmente le due sessioni 1:1 e il supporto prioritario erano da rimuovere finché non confermati.
- Risposta finale: sono confermati e restano nel piano annuale.

Decision: La pagina Prezzi mostra l'offerta corrente e i due ritmi di pagamento, conserva i benefici annuali confermati e cita le due sessioni attive simultanee soltanto nella pagina Prezzi e nella relativa FAQ. Non introduce carte, copy, prezzi o CTA del Piano Light.

Source: Intervista utente, 14 luglio 2026.

### L9

Status: current

Question: Come devono essere organizzati supporto, FAQ e footer?

Answer: Il footer contiene Prodotto (Funzionalità, Ordini, Prezzi), Supporto (Contatti, Newsletter, WhatsApp) e Legale invariato. FAQ e Contatti restano in basso nella Home; le FAQ diventano sei domande su pubblico, piano, prova, prezzo/disdetta, due sessioni attive e contatto. Il contatto usa “Hai domande? Parla con noi”, mantiene form, privacy, consenso newsletter opzionale e WhatsApp, ma non promette risposta entro 24 ore o “team disponibile”.

Decision: Rimuovere dal footer e dalla navbar Piattaforme, FAQ e Aggiornamenti. WhatsApp è un canale di assistenza/conversazione, mai una CTA prova né un canale broadcast.

Source: Intervista utente, 14 luglio 2026.

### L10

Status: current

Question: Come devono comportarsi Newsletter, Aggiornamenti e pagina Instagram?

Answer: Newsletter resta pubblica, senza voce in navbar, per aggiornamenti, nuove funzionalità e consigli scelti manualmente; non deve inviare automaticamente una campagna per ogni release. Aggiornamenti resta un changelog `noindex`, fuori navbar, footer e sitemap, che verrà collegato dalla web app in futuro. Instagram mantiene i link Home, Prezzi, WhatsApp e Newsletter con la nuova descrizione del pubblico. WhatsApp non è broadcast.

Decision: La Newsletter non è una landing organica. Il changelog conserva il proprio ruolo per gli utenti esistenti, senza badge o promozione piattaforme native; la futura voce/badge “Novità” nella web app è uno stream separato e fuori dal presente rilascio.

Source: Intervista utente, 14 luglio 2026.

### L11

Status: current

Question: Quale deve essere il comportamento della pagina Download?

Answer: Download deve essere accessibile soltanto a chi dispone dell'URL diretto; non richiede autenticazione, ma non è collegato né promosso dal sito.

Decision: `/download` resta pubblica ma non in navbar, footer o sitemap e conserva `noindex`. Può servire assistenza legacy a chi conosce il link, senza diventare un percorso di acquisizione o una promessa di piattaforme.

Source: Intervista utente, 14 luglio 2026.

### L12

Status: current

Question: Come deve essere trovato e presentato LabManager su Google?

Recommended Answer:
- Titolo Home: “Gestionale per pasticcerie, panifici e gelaterie | LabManager”.
- Descrizione Home: “Il gestionale per laboratori artigianali alimentari: ricette, food cost, produzione, etichette, magazzino e ordini. Prova gratuita di 14 giorni.”

Answer: ok

Decision: La Home adotta il posizionamento SEO approvato. `/ordini` usa “Gestione ordini e piano di lavoro | LabManager” e “Organizza ordini, ritiri, consegne, acconti e produzione collegata, senza separare il banco dal laboratorio.” `/pricing` usa “Prezzi e prova gratuita | LabManager” e “Scopri il piano LabManager con prova gratuita di 14 giorni senza carta.” La descrizione SEO di Prezzi non contiene importi o numero di piani, così non resta obsoleta quando l'offerta cambia.

Source: Intervista utente, 14 luglio 2026.

### L13

Status: current

Question: Quali URL devono essere trovati attivamente con la ricerca organica?

Answer: Solo Home, Ordini e Prezzi devono essere pagine SEO principali. Newsletter resta pubblica e raggiungibile dal footer, ma non indicizzata.

Decision: Sitemap e metadati robots includono come indexable solo `/`, `/ordini` e `/pricing`. Newsletter, Download, Aggiornamenti e pagine billing restano fuori sitemap e non indicizzabili secondo il rispettivo ruolo.

Source: Intervista utente, 14 luglio 2026.

### L14

Status: current

Question: Come deve essere trattato il risultato storico `pastrylabmanager.com` visibile su Google?

Answer: `pastrylabmanager.com` è il dominio storico controllato dal team; l'utente ha accesso a Google Search Console per entrambi i domini.

Decision: Conservare redirect server-side 301 da tutte le varianti e dai path/query del dominio storico agli equivalenti su `labmanagergestionale.com`; riscrivere i segnali legacy nel dominio canonico; dopo il rilascio eseguire Change of Address, invio sitemap/richiesta di nuova indicizzazione e monitoraggio del consolidamento senza promettere un aggiornamento SERP immediato.

Source: Verifica live e intervista utente, 14 luglio 2026.

### L15

Status: current

Question: Qual è il perimetro editoriale del rilascio?

Answer: Ottimizzare e consolidare le pagine esistenti, senza creare ora articoli SEO o una pagina dedicata Food Cost. Un modulo/pagina Food Cost più approfondito e un Piano Light restano fasi future.

Decision: Il rilascio non crea nuove landing SEO, risorse editoriali, automazioni newsletter, stream “Novità” in app o nuovi piani pubblici.

Source: Intervista utente, 14 luglio 2026.

### L16

Status: current

Question: Quale approvazione deve precedere la pubblicazione del riposizionamento?

Answer: Prima di pubblicare il sito con queste modifiche, il committente deve esaminare il risultato verificato e fornire un'approvazione esplicita.

Decision: Implementazione, test, build e preview possono essere completati senza pubblicare. Nessun deploy, rilascio pubblico o avvio delle attività Search Console post-deploy può avvenire finché il committente non approva esplicitamente la versione candidata sulla base delle evidenze pre-pubblicazione.

Source: Approvazione della decomposizione, 14 luglio 2026.
