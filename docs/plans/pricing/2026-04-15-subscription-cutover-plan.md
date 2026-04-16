

> Data: 2026-04-15  
> Documento operativo per il passaggio da "fase gratuita" a "trial + abbonamento", coerente con `docs/plans/pricing/pricing-strategy.md`.

## 1) Obiettivo

Quando decideremo di attivare gli abbonamenti, vogliamo:

1. allineare tutto il copy del sito al pricing ufficiale;
2. eliminare claim incoerenti tipo "gratis" o "nessun abbonamento";
3. rendere obbligatoria in app l'accettazione di Termini e Privacy prima dell'uso.

## 2) Vincoli di business (fonte: pricing-strategy.md)

- Piano: unico, tutto incluso.
- Prezzi: EUR 45/mese e EUR 400/anno.
- Trial: 21 giorni.
- Accesso trial: contatto diretto, invio link, registrazione autonoma.
- Dispositivi inclusi nel base: 2 connessioni simultanee.
- Prodotto installabile: Windows + Android.

## 3) Trigger "quando e il momento"

Eseguire il cutover solo quando questi punti sono verdi:

- [ ] Testo finale di Termini e Condizioni pronto e pubblicato.
- [ ] Privacy Policy app pronta e pubblicata.
- [ ] Versionamento documenti legali definito (es. `terms_v1`, `privacy_v1`).
- [ ] Flusso in app "accetta prima di usare" implementato e testato.
- [ ] Trial/paywall backend pronto (`trial | active | expired`).
- [ ] Messaggi di supporto (trial, upgrade, scadenza) pronti.

## 4) Mappa cambi sito (file per file)

### 4.1 Copy "gratis" da rimuovere o riscrivere

- `src/app/layout.tsx`
  - `metadata.description`: togliere "Provalo gratis!".
  - JSON-LD `SoftwareApplication.description`: togliere "nessun abbonamento richiesto".
  - JSON-LD `offers`: sostituire `FREE_OFFER` con offerta coerente al pricing (vedi 4.2).

- `src/components/Hero.tsx`
  - "Richiedi una prova gratuita" -> copy trial coerente (es. "Inizia prova 21 giorni").

- `src/components/Features.tsx`
  - "Prova Gratuita" e "nessun abbonamento" -> value message coerente con trial e piano unico.

- `src/components/WhyLabManager.tsx`
  - Rimuovere blocco "Gratuito e Senza Abbonamento".
  - Sostituire con messaggio pricing-strategy (es. "Un solo piano. Tutto incluso. Nessuna sorpresa.").

- `src/components/DownloadClient.tsx`
  - "100% Gratuito" e "DOWNLOAD GRATUITO" -> copy neutro o orientato a trial.

- `src/components/FAQ.tsx`
  - Aggiornare FAQ su prezzo/trial:
    - eliminare claim "attualmente gratuito";
    - inserire risposta chiara su EUR 45/mese e EUR 400/anno;
    - mantenere trial 21 giorni (se confermato al go-live).
  - FAQ con claim "gratuito" da aggiornare (con posizione nell'array, 0-based):
    - [2] "Esistono software gratuiti per gestire una pasticceria?" — risposta intera da riscrivere.
    - [6] "Quanto costa LabManager?" — risposta intera da riscrivere con pricing reale.
    - [18] "Esistono gestionali gratuiti per pasticceria, panificio o ristorante?" — aggiunta 2026-04-16, risposta da riscrivere.
  - FAQ con claim indiretto da verificare:
    - [1] "Quale app usare per gestire una pasticceria?" — nessun claim esplicito su prezzo, verificare.
    - [5] "Come posso provare l'app?" — aggiornare con riferimento al trial 21 giorni.
    - [19] "Come scegliere il software gestionale giusto per il mio laboratorio?" — menziona "senza costi mensili durante la fase di lancio", da aggiornare.

### 4.2 Structured data (SEO/schema)

In `src/app/layout.tsx`, per `SoftwareApplication.offers`:

- non usare piu `price: "0"`;
- usare una struttura coerente con due piani (es. `AggregateOffer` con low/high price, oppure due `Offer` distinti);
- allineare sempre valuta e importi ai prezzi reali pubblicati.

## 5) Pagina pricing e coerenza narrativa

Riferimenti gia presenti:

- `docs/plans/pricing/2026-04-13-pricing-page-design.md`
- `docs/plans/pricing/2026-04-13-pricing-page-plan.md`

Azioni:

- [ ] Rendere disponibile `/pricing` al momento del cutover (se non gia online).
- [ ] Aggiornare Navbar con link "Prezzi" se manca.
- [ ] Verificare coerenza copy tra home, pricing page, FAQ, CTA contatto.

## 6) Termini e Privacy in app (obbligatori prima dell'uso)

Requisito confermato: utente registrato legge in app Termini e Privacy e, se accetta, procede all'uso.

### 6.1 Flusso applicativo

1. Registrazione/login completato.
2. Check accettazioni richieste (`terms`, `privacy`).
3. Se mancano, mostrare schermata bloccante con:
   - link ai documenti completi;
   - checkbox separati;
   - pulsante continua disabilitato finche non accetta entrambi.
4. Salvataggio accettazione con timestamp e versione documento.
5. Solo dopo, accesso al prodotto.

### 6.2 Dati minimi da tracciare

Per ogni utente, conservare almeno:

- `terms_accepted_at`
- `terms_version`
- `privacy_accepted_at`
- `privacy_version`

Consigliato anche:

- `accepted_platform` (`android` / `windows`)
- `accepted_app_version`

### 6.3 Regola di re-consenso

Se cambia la versione dei Termini o della Privacy:

- forzare nuova accettazione al primo accesso utile;
- bloccare l'uso finche il nuovo consenso non e registrato.

## 7) Coordinamento trial e consenso legale

Decisione da fissare prima del go-live:

- il trial parte alla creazione account, o parte dopo la prima accettazione legale?

Raccomandazione operativa:

- far partire il trial dopo l'accettazione legale, cosi evitiamo consumo giorni prima dell'accesso reale.

## 8) Sequenza operativa consigliata

### Fase A - Preparazione (T-14 / T-7)

- [ ] Chiudere testi legali finali (Termini + Privacy).
- [ ] Implementare e testare consenso in app.
- [ ] Preparare patch copy sito (senza pubblicarla).
- [ ] Preparare QA checklist.

### Fase B - Cutover (T-0)

- [ ] Pubblicare pagine legali definitive.
- [ ] Deploy app con consenso bloccante attivo.
- [ ] Deploy sito con copy aggiornato e pricing coerente.
- [ ] Verificare schema JSON-LD senza price zero.

### Fase C - Stabilizzazione (T+1 / T+7)

- [ ] Monitorare richieste supporto su trial/prezzi.
- [ ] Verificare conversioni da contatto a trial.
- [ ] Raccogliere FAQ reali e aggiornare copy.

## 9) QA di coerenza pre-go-live

Eseguire una scansione full-text prima del rilascio:

- [ ] Nessuna occorrenza residua di "gratis/gratuito" non intenzionale.
- [ ] Nessuna occorrenza residua di "nessun abbonamento" incoerente.
- [ ] Prezzi coerenti in tutte le superfici.
- [ ] Link legali funzionanti su sito e in app.

## 10) Deliverable finali attesi

- Sito coerente con pricing ufficiale.
- App bloccata fino ad accettazione Termini + Privacy.
- Tracciamento versionato dei consensi.
- Percorso trial e abbonamento senza contraddizioni di copy.

---

This is a template for informational purposes. Consult with a qualified attorney for legal advice specific to your situation.
