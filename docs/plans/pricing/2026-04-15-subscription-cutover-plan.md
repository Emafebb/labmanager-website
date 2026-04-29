> Data: 2026-04-29  
> Documento operativo per il passaggio da "fase gratuita" a "trial + abbonamento", coerente con `docs/plans/pricing/pricing-strategy.md`.
> Stato: chiuso lato repo/sito; completamento app, billing e test E2E confermati operativamente il 2026-04-29.

## 1) Obiettivo

Quando attiveremo gli abbonamenti vogliamo:

1. allineare tutto il copy del sito al pricing ufficiale;
2. eliminare claim incoerenti tipo "gratis" o "nessun abbonamento";
3. rendere obbligatoria in app l'accettazione di Termini e Privacy prima dell'uso;
4. gestire la scelta del piano e il pagamento solo dentro l'app.

## 1.1) Stato attuale

Aggiornato al 2026-04-29:

- il sito e gia stato riallineato in repo a pricing informativo + trial;
- il checkout Stripe del sito e stato archiviato come test interno;
- `public/llms.txt` e stato riallineato al modello trial + abbonamento;
- `/pricing` e stato aggiunto alla sitemap del sito;
- Termini e Privacy app sono pronti e pubblicati tramite LegalBlink;
- il versionamento legale app e definito con `legalblink_terms_2026_04_27` e `legalblink_privacy_2026_04_27`;
- in Supabase esiste gia `public.user_subscriptions`;
- consenso in app, trial/paywall backend, edge functions, webhook e test end-to-end Stripe/app sono stati confermati come completati.

## 2) Vincoli di business

- Piano: unico, tutto incluso.
- Prezzi: EUR 44,99/mese e EUR 480/anno.
- Trial: 14 giorni.
- Accesso trial: contatto diretto, invio link, registrazione autonoma.
- Attivazione abbonamento: scelta piano e pagamento solo in app.
- Dispositivi inclusi nel base: 2 connessioni simultanee.
- Prodotto installabile: Windows + Android.

## 3) Trigger "quando e il momento"

Eseguire il cutover solo quando questi punti sono verdi:

- [x] Testo finale di Termini e Condizioni pronto e pubblicato.
- [x] Privacy Policy app pronta e pubblicata.
- [x] Versionamento documenti legali definito.
- [x] Flusso in app "accetta prima di usare" implementato e testato.
- [x] Trial/paywall backend pronto (`trial | active | expired`).
- [x] Messaggi di supporto pronti.

## 4) Mappa cambi sito

### 4.1 Copy da riallineare

- `src/app/layout.tsx`
  - togliere claim incoerenti tipo "Provalo gratis"
  - aggiornare JSON-LD `offers`

- `src/components/Hero.tsx`
  - mantenere CTA orientata al trial

- `src/components/Features.tsx`
  - eliminare riferimenti a "nessun abbonamento"

- `src/components/WhyLabManager.tsx`
  - sostituire messaggi "gratis e senza abbonamento" con pricing coerente

- `src/components/DownloadClient.tsx`
  - copy neutro o orientato al trial

- `src/components/FAQ.tsx`
  - prezzo reale
  - trial 14 giorni
  - nessun claim "attualmente gratuito"

### 4.2 Structured data

In `src/app/layout.tsx`:

- non usare più `price: "0"`
- usare una struttura coerente con due prezzi reali
- aggiornare meta description e JSON-LD ancora fermi a claim gratuiti

## 5) Pagina pricing e coerenza narrativa

Azioni:

- [x] Verificare coerenza copy tra home, pricing page, FAQ e CTA contatto.
- [x] Aggiungere `/pricing` alla sitemap quando entra nel funnel ufficiale.

### 5.1 Esclusioni confermate per il sito

Non sono precondizioni del cutover sito:

- pubblicare Termini e Condizioni come pagina del sito, se i documenti vengono fruiti e accettati dentro il software;
- trasformare le CTA del sito in acquisto self-serve.

Nota operativa:

- il sito resta informativo e contact-led anche quando Stripe è pronto;
- la pricing page mostra prezzi e condizioni, ma la scelta del piano avviene nel paywall dell'app;
- il checkout Stripe del sito non fa parte del funnel pubblico.

## 6) Termini e Privacy in app

Requisito confermato: utente registrato legge in app Termini e Privacy e, se accetta, procede all'uso.

### 6.1 Flusso applicativo

1. Registrazione/login completato.
2. Check accettazioni richieste (`terms`, `privacy`).
3. Se mancano, mostrare schermata bloccante con checkbox separati.
4. Salvare accettazione con timestamp e versione documento.
5. Solo dopo, accesso al prodotto.

### 6.2 Dati minimi da tracciare

- `terms_accepted_at`
- `terms_version`
- `privacy_accepted_at`
- `privacy_version`

Consigliato anche:

- `accepted_platform`
- `accepted_app_version`

## 7) Coordinamento trial e consenso legale

Raccomandazione operativa:

- far partire il trial dopo l'accettazione legale, così evitiamo consumo giorni prima dell'accesso reale.

## 8) Sequenza operativa consigliata

### Fase A - Preparazione

- [x] Chiudere testi legali finali.
- [x] Implementare e testare consenso in app.
- [x] Preparare patch copy sito.
- [x] Preparare patch SEO/meta.
- [x] Preparare QA checklist.

### Fase B - Cutover

- [x] Pubblicare pagine legali definitive.
- [x] App con consenso bloccante attivo e flusso E2E confermato.
- [x] Sito pronto con copy aggiornato, pricing coerente e CTA non di acquisto.
- [x] Verificare schema JSON-LD senza price zero.
- [x] Meta aggiornati senza claim gratuiti incoerenti.

### Fase C - Stabilizzazione

- [ ] Monitorare richieste supporto su trial/prezzi.
- [ ] Verificare conversioni da contatto a trial.
- [ ] Raccogliere FAQ reali e aggiornare copy.

## 9) QA di coerenza pre-go-live

- [x] Nessuna occorrenza residua di "gratis/gratuito" non intenzionale.
- [x] Nessuna occorrenza residua di "nessun abbonamento" incoerente.
- [x] Prezzi coerenti in tutte le superfici.
- [x] Link legali funzionanti su sito e in app.
- [x] Metadata e JSON-LD coerenti con il pricing live.

## 10) Deliverable finali attesi

- Sito coerente con pricing ufficiale.
- App bloccata fino ad accettazione Termini + Privacy.
- Scelta del piano e pagamento gestiti solo dentro l'app.
- Tracciamento versionato dei consensi.
- Percorso trial e abbonamento senza contraddizioni di copy.
