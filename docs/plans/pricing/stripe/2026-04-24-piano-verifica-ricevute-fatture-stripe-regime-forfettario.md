# Piano implementazione ricevute e fatture Stripe per abbonamenti

> Data: 2026-04-24
> Ambito: nuovi abbonamenti, rinnovi, receipt email Stripe, paid invoice PDF Stripe, fattura elettronica italiana per regime forfettario.
> Stato: piano implementativo, non consulenza fiscale. Le decisioni fiscali vanno validate con commercialista o provider di fatturazione elettronica.

---

> Nota organizzativa: tutti i casi di test, registri di esecuzione, evidenze sandbox e prova live controllata sono centralizzati in `docs/piani/pricing/stripe/2026-04-23-piano-test-reale-stripe-billing-server-driven.md`, sezione 12.3.
> Questo file resta dedicato a implementazione, vincoli, scelte operative e runbook.

## 1. Obiettivo

Definire il processo operativo completo dopo l'introduzione di Stripe Billing server-driven:

- nuovo abbonamento da Checkout Session
- rinnovo automatico della subscription
- generazione invoice Stripe per ogni periodo
- invio email receipt / paid invoice da Stripe
- disponibilita PDF invoice e invoice receipt
- tracciamento operativo su Stripe Dashboard
- flusso separato per fattura elettronica italiana via SdI, richiesto dal regime forfettario

Il punto centrale e distinguere due livelli:

- **Comunicazione di pagamento Stripe**: ricevuta email, paid invoice PDF, hosted invoice page, Customer Portal.
- **Documento fiscale italiano**: fattura elettronica XML trasmessa a SdI, con dati e diciture del regime forfettario.

La receipt / paid invoice Stripe e utile per il cliente e per riconciliare il pagamento, ma non va considerata automaticamente sostitutiva della fattura elettronica SdI.

---

## 2. Stato attuale dal piano gia eseguito

Documenti collegati:

- `docs/piani/pricing/stripe/2026-04-22-stripe-billing-architecture-design.md`
- `docs/piani/pricing/stripe/2026-04-23-piano-test-reale-stripe-billing-server-driven.md`
- `docs/piani/pricing/stripe/2026-04-22-stripe-billing-server-driven-manual-checklist.md`

Risulta gia confermato:

- architettura server-driven con Billing APIs, Checkout Session `mode=subscription` e Customer Portal
- webhook applicativo basato su `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted`
- `invoice.paid` verificato su rinnovo simulato Windows
- `Customer emails > Successful payments` verificato `ON` in Stripe test mode
- reminder subscription, pagamenti falliti, carte in scadenza e link gestione abbonamento configurati in Stripe test mode
- Customer Portal Windows verificato
- stato dei casi runtime mantenuto solo nel piano test unico

Attivita residue di implementazione:

- decisione esplicita sul processo SdI
- raccolta dei dati fiscali necessari per fattura elettronica italiana
- definizione del responsabile e della tempistica di emissione e-fattura
- registro operativo per riconciliare invoice/email/SdI su ogni evento pagato
- eventuale fallback email custom da webhook `invoice.paid` se il processo Stripe non basta in produzione

---

## 3. Vincoli ufficiali da rispettare

### 3.1 Stripe Billing

Per abbonamenti ricorrenti, mantenere Billing APIs piu Checkout Sessions. Non costruire loop manuali di rinnovo con PaymentIntents grezzi.

Con una subscription Stripe genera invoice per ogni periodo di billing. La prima invoice pagata rende la subscription attiva, e le invoice successive rappresentano i rinnovi.

Per receipt e paid invoice:

- l'email automatica richiede `Successful payments` attivo nelle Customer emails settings
- le receipt partono solo per pagamenti riusciti
- per le subscription, Stripe genera invoice automaticamente
- quando Stripe invia email invoice, include PDF invoice; se sono attive le email per pagamenti riusciti e la invoice e `charge_automatically`, la receipt email include PDF della invoice originale e della invoice receipt
- in sandbox Stripe non invia automaticamente tutte le email a qualsiasi destinatario: per testare davvero servono indirizzi del dominio email verificato o team member attivi

### 3.2 Regime forfettario italiano

Dalla guida Stripe allegata:

- dal 1 gennaio 2024 la fatturazione elettronica e obbligatoria per tutti i forfettari
- la fattura elettronica deve essere creata in formato XML e inviata tramite Sistema di Interscambio
- la data di emissione coincide con la trasmissione al SdI
- per regime forfettario il regime fiscale e `RF19`
- per beni/servizi non soggetti a IVA in forfettario va gestito il codice natura IVA `N2.2`
- sopra EUR 77,47 va gestita imposta di bollo virtuale da EUR 2
- servono diciture obbligatorie sul non assoggettamento IVA e sulla non applicazione della ritenuta d'acconto
- le fatture elettroniche vanno conservate digitalmente secondo normativa
- Stripe indica che Stripe Invoicing puo essere usato con fatturazione elettronica tramite partner terzi

### 3.3 Dati cliente

Checkout gia raccoglie indirizzo e tax ID, ma questo non basta da solo a garantire tutti i dati richiesti da una e-fattura italiana.

Da verificare esplicitamente:

- email cliente
- nome / ragione sociale
- indirizzo completo
- partita IVA o codice fiscale
- codice destinatario SdI o PEC
- distinzione B2B / B2C

Nota importante: Stripe supporta Tax ID italiani come `eu_vat` e `it_cf` sul Customer, ma Checkout tax ID collection per l'Italia espone `eu_vat`. Quindi il codice fiscale di un privato e il codice destinatario/PEC potrebbero richiedere raccolta separata fuori da Checkout.

---

## 4. Strategia consigliata

### Fase A - Chiudere il perimetro operativo Stripe

Usare Stripe per:

- creare e pagare la subscription
- generare invoice Stripe automatiche
- inviare receipt / paid invoice email
- fornire PDF e hosted invoice page
- gestire reminder e failed payment emails
- rendere disponibili log email sul Customer

Questa fase non modifica l'architettura applicativa, perche il flusso esistente e gia corretto.

### Fase B - Definire il processo fiscale SdI

Scegliere una delle tre opzioni:

| Opzione | Descrizione | Quando usarla | Valutazione |
| --- | --- | --- | --- |
| A | Stripe per ricevute e paid invoice, fattura elettronica emessa fuori Stripe con Agenzia Entrate, commercialista o gestionale | Subito, minimo rischio tecnico | Raccomandata per go-live iniziale |
| B | Stripe Invoicing piu partner terzo per e-invoicing | Dopo scelta provider ufficiale e test dedicato | Buona evoluzione |
| C | Integrazione custom XML/SdI | Solo con requisiti contabili forti e budget compliance | Da evitare ora |

Raccomandazione: partire con **Opzione A** per non bloccare il go-live tecnico, ma non andare live senza un processo amministrativo scritto che dica chi emette la e-fattura, entro quando, con quali dati e dove si conserva.

---

## 5. Checklist preflight

### Stripe Dashboard

- [ ] `Settings > Business > Customer emails > Successful payments` e `ON`
- [ ] branding configurato: logo, colori, nome commerciale, dati pubblici
- [ ] dati pubblici includono email/website/supporto corretti
- [ ] invoice template verificato
- [ ] PDF attachment non disabilitato nelle invoice settings
- [ ] `Billing > Subscriptions and emails` contiene:
  - [ ] renewal reminders
  - [ ] failed payment emails
  - [ ] expiring card emails
  - [ ] payment confirmation emails se necessario
  - [ ] manage subscription link verso Customer Portal
- [ ] Customer Portal attivo anche in live
- [ ] prezzi live mensile e annuale creati separatamente dai test price
- [ ] webhook live configurato con gli stessi eventi del test
  - [ ] creare il webhook da Stripe in modalita live, non riusare quello test
  - [ ] usare endpoint `https://ndlsifytatricfutjsvu.supabase.co/functions/v1/stripe-webhook`
  - [ ] copiare gli stessi eventi del webhook test gia verificato
  - [ ] salvare il nuovo signing secret live `whsec_...` in `STRIPE_WEBHOOK_SECRET_LIVE`

### Supabase / Edge Functions

- [ ] commit `485a9af0` presente nell'ambiente da deployare
- [ ] secrets test senza suffisso lasciati invariati
- [ ] `STRIPE_BILLING_ENV=live` impostato solo quando si vuole usare il live
- [ ] `STRIPE_SECRET_KEY_LIVE`, `STRIPE_PRICE_ID_MONTHLY_LIVE`, `STRIPE_PRICE_ID_ANNUAL_LIVE` e `STRIPE_WEBHOOK_SECRET_LIVE` inseriti nei secrets Supabase
- [ ] `STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID_LIVE` inserito solo se il Customer Portal live usa una configurazione dedicata
- [ ] `WEBHOOK_SECRET` non usato per Stripe live
- [ ] `create-checkout-session`, `create-customer-portal-session` e `stripe-webhook` redeployate dopo il cambio secrets
- [ ] dopo un test live non definitivo, `STRIPE_BILLING_ENV` riportato a `test` oppure rimosso e funzioni redeployate

Nota futura:

- non creare ora un altro documento
- se la configurazione Dashboard dovesse diventare ripetibile o delegabile, creare una micro-guida Stripe Dashboard specifica per ricevute/fatture
- la micro-guida dovra contenere percorsi esatti nella Dashboard, campi da controllare, screenshot/evidenze da salvare e criteri `PASS | FAIL | BLOCCATO`

### Checkout / Customer

- [ ] `billing_address_collection=required`
- [ ] `tax_id_collection.enabled=true`
- [ ] `customer_update.address=auto`
- [ ] `customer_update.name=auto`
- [ ] customer creato con email
- [ ] customer creato con `metadata.user_id`
- [ ] valutare `preferred_locales=['it']` sul Customer o nella sessione se serve localizzare email/PDF
- [ ] verificare se servono campi app separati per codice fiscale, PEC o codice destinatario

### Fattura elettronica

- [ ] commercialista conferma processo per vendite B2B/B2C via subscription Stripe
- [ ] definito strumento SdI: Agenzia Entrate, commercialista, gestionale, partner Stripe, altro provider
- [ ] definita numerazione progressiva fatture
- [ ] definita causale/descrizione servizio
- [ ] definita dicitura regime forfettario
- [ ] definito codice natura IVA `N2.2`
- [ ] definita gestione bollo EUR 2 sopra EUR 77,47
- [ ] definito processo conservazione digitale

---

## 6. Implementazione applicativa possibile

Non serve cambiare subito il billing server-driven, ma potrebbero servire piccoli task dopo la decisione fiscale:

- aggiungere raccolta dati fiscali cliente in app o in un form post-checkout
- salvare consenso/dati fiscali in una tabella dedicata, separata da `user_subscriptions`
- esporre in Settings una sezione "Dati di fatturazione" se Stripe Checkout non raccoglie tutto
- aggiungere `preferred_locales` per localizzare email/PDF Stripe
- aggiungere metadata su subscription/invoice per riconciliazione amministrativa
- esportare un report `invoice.paid` per il commercialista/provider
- integrare un provider e-fattura solo dopo scelta ufficiale e test separato

Questi task vanno aperti solo dopo aver deciso il processo fiscale, per evitare di costruire campi o integrazioni non allineati al commercialista.

---

## 7. Fonti ufficiali consultate

- Stripe skill `stripe-best-practices`, sezione Billing: Billing APIs piu Checkout Sessions per subscription, Customer Portal per self-service, evitare renewal loop manuali con PaymentIntents.
- Stripe, Email receipts: `https://docs.stripe.com/payments/advanced/receipts`
- Stripe, Send customer emails: `https://docs.stripe.com/invoicing/send-email`
- Stripe, Automate customer emails: `https://docs.stripe.com/billing/revenue-recovery/customer-emails`
- Stripe, Subscription invoices: `https://docs.stripe.com/billing/invoices/subscription`
- Stripe, Customer tax IDs: `https://docs.stripe.com/billing/customer/tax-ids`
- Stripe, Collect customer tax IDs with Checkout: `https://docs.stripe.com/tax/checkout/tax-ids`
- Stripe, Fattura elettronica per regime forfettario in Italia: `https://stripe.com/it/resources/more/e-invoicing-for-flat-rate-tax-regime-italy`

---

## 8. Runbook implementazione live Stripe/Supabase

> Le prove live controllate, i coupon di test e le evidenze di pagamento sono nel piano test unico, sezione 12.3. Qui restano solo i passi di configurazione e deploy.

> Aggiornamento operativo del 2026-04-24.
> Stato locale verificato: repo su `master` commit `70d25cc4`, con `485a9af0` incluso nella history. Supabase project ref operativo: `ndlsifytatricfutjsvu`.
> Stato Supabase aggiornato: secrets test e live presenti; `STRIPE_BILLING_ENV=live` impostato; `STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID_LIVE` presente.
> Deploy aggiornato: `create-checkout-session` v16, `create-customer-portal-session` v20, `stripe-webhook` v26.
> Modifica live checkout: `create-checkout-session` include `allow_promotion_codes: true`, quindi Stripe Checkout mostra il campo codice promozionale.

### 8.1 Regola di sicurezza

Non sovrascrivere i secrets test senza suffisso. Il live si aggiunge usando solo variabili dedicate:

- `STRIPE_BILLING_ENV=live`
- `STRIPE_SECRET_KEY_LIVE=sk_live_...`
- `STRIPE_PRICE_ID_MONTHLY_LIVE=price_...`
- `STRIPE_PRICE_ID_ANNUAL_LIVE=price_...`
- `STRIPE_WEBHOOK_SECRET_LIVE=whsec_...`
- `STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID_LIVE=bpc_...` solo se in live si usa una configurazione Customer Portal specifica

Il codice delle funzioni legge questi nomi quando `STRIPE_BILLING_ENV=live`. Il webhook live non usa `WEBHOOK_SECRET` e non deve riusare il signing secret test.

### 8.2 Preparazione manuale in Stripe live

1. Aprire Stripe Dashboard e disattivare la modalita test.
2. Verificare `Settings > Business > Customer emails`.
3. Tenere `Successful payments` attivo, per ricevere la ricevuta automatica sui pagamenti riusciti.
4. Verificare branding e dati pubblici in live: nome commerciale, email supporto, sito, logo.
5. Creare o verificare i prodotti/prezzi live:
   - prezzo mensile live, salvare `price_...`
   - prezzo annuale live, salvare `price_...`
6. Aprire Customer Portal in live e verificare che sia attivo.
7. Se Stripe mostra un configuration id dedicato del portale, salvare `bpc_...`; altrimenti lasciare vuoto `STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID_LIVE`.

### 8.3 Webhook live in Stripe

1. In Stripe live aprire `Developers > Webhooks`.
2. Creare un nuovo endpoint live.
3. Endpoint URL:

```text
https://ndlsifytatricfutjsvu.supabase.co/functions/v1/stripe-webhook
```

4. Aggiungere gli stessi eventi del webhook test verificato:
   - `checkout.session.completed`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Salvare l'endpoint.
6. Aprire il signing secret e copiare il valore `whsec_...`.
7. Salvare quel valore come `STRIPE_WEBHOOK_SECRET_LIVE`, non come `WEBHOOK_SECRET`.

### 8.4 Impostazione secrets live in Supabase

Metodo Dashboard:

1. Aprire Supabase project `ndlsifytatricfutjsvu`.
2. Andare su `Edge Functions > Secrets`.
3. Aggiungere i secrets live della sezione 8.1.
4. Salvare.
5. Non eliminare e non modificare `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID_MONTHLY`, `STRIPE_PRICE_ID_ANNUAL`, `STRIPE_WEBHOOK_SECRET` e `WEBHOOK_SECRET`.

Metodo CLI, da usare solo quando i valori live sono gia copiati:

```powershell
supabase secrets set --project-ref ndlsifytatricfutjsvu `
  STRIPE_BILLING_ENV=live `
  STRIPE_SECRET_KEY_LIVE=sk_live_xxx `
  STRIPE_PRICE_ID_MONTHLY_LIVE=price_xxx `
  STRIPE_PRICE_ID_ANNUAL_LIVE=price_xxx `
  STRIPE_WEBHOOK_SECRET_LIVE=whsec_xxx
```

Se serve configurazione portale live dedicata:

```powershell
supabase secrets set --project-ref ndlsifytatricfutjsvu STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID_LIVE=bpc_xxx
```

Verifica nomi secrets, senza leggere i valori:

```powershell
supabase secrets list --project-ref ndlsifytatricfutjsvu
```

### 8.5 Redeploy funzioni billing

Supabase rende i secrets disponibili alle funzioni, ma per questo rilascio si redeployano comunque le tre funzioni billing per eliminare ogni dubbio operativo su versioni/caching:

```powershell
supabase functions deploy create-checkout-session --project-ref ndlsifytatricfutjsvu
supabase functions deploy create-customer-portal-session --project-ref ndlsifytatricfutjsvu
supabase functions deploy stripe-webhook --project-ref ndlsifytatricfutjsvu
```

Il file `supabase/config.toml` ha gia `verify_jwt = false` per queste funzioni, quindi non serve aggiungere `--no-verify-jwt` se si deploya da questo repo.

Verifica deploy:

```powershell
supabase functions list --project-ref ndlsifytatricfutjsvu
```

### 8.6 Rollback da live a test

Da usare se serve tornare dall'ambiente live all'ambiente test dopo una finestra operativa:

```powershell
supabase secrets set --project-ref ndlsifytatricfutjsvu STRIPE_BILLING_ENV=test
supabase functions deploy create-checkout-session --project-ref ndlsifytatricfutjsvu
supabase functions deploy create-customer-portal-session --project-ref ndlsifytatricfutjsvu
supabase functions deploy stripe-webhook --project-ref ndlsifytatricfutjsvu
```

Verificare poi che un nuovo checkout torni a usare i prezzi test.

### 8.7 Fonti operative confermate

- Stripe receipts: `https://docs.stripe.com/receipts`
- Stripe advanced receipts: `https://docs.stripe.com/payments/advanced/receipts`
- Stripe go-live checklist: `https://docs.stripe.com/get-started/checklist/go-live`
- Supabase Edge Functions secrets: `https://supabase.com/docs/guides/functions/secrets`
- Supabase Edge Functions deploy: `https://supabase.com/docs/guides/functions/deploy`
