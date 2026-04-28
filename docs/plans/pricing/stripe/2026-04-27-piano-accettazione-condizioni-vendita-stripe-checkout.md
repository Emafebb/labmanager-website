# Piano accettazione condizioni di vendita in Stripe Checkout

> Data: 2026-04-27
> Ambito: abbonamenti LabManager tramite Stripe Checkout hosted.
> Stato: implementazione tecnica deployata; in attesa test manuale Stripe sandbox e verifica live controllata.
> Obiettivo: usare il consenso nativo di Stripe Checkout e ridurre al minimo codice applicativo.
>
> This is a template for informational purposes. Consult with a qualified attorney for legal advice specific to your situation.

---

## 1. Decisione

Usare Stripe Checkout come punto principale di accettazione delle condizioni di vendita.

Per la v1 sono disponibili due documenti LegalBlink separati:

- condizioni applicabili ai consumatori / B2C:
  `https://app.legalblink.it/api/documents/69e89f282420950024cb1a58/termini-di-vendita-per-servizi-it`
- condizioni applicabili ad aziende, professionisti e titolari P.IVA / B2B:
  `https://app.legalblink.it/api/documents/69e89f282420950024cb1a58/termini-di-vendita-per-servizi-b2b-it`

Poiche Stripe Dashboard espone un solo campo "Terms of Service URL", la v1 usa il checkbox Stripe con testo custom che linka entrambi i documenti LegalBlink e chiarisce che si applica il documento corretto in base alla qualifica dell'acquirente.

Configurazione prudenziale per Stripe Dashboard:

- Terms of Service URL: documento B2C LegalBlink, come default per utenti non chiaramente qualificati come azienda/professionista
- Checkbox Checkout: link esplicito a entrambi i documenti B2C e B2B

Raccomandazione futura:

- pubblicare una pagina unica stabile su dominio LabManager, ad esempio `https://pastrylabmanager.com/condizioni-vendita`
- la pagina deve contenere la regola di applicabilita e i link/documenti B2C e B2B
- quando disponibile, usare questa pagina unica sia nel campo Stripe Dashboard "Terms of Service URL" sia nel testo del checkbox Checkout

Motivo:

- Stripe Checkout gestisce nativamente un consenso ToS per sessione
- non serve chiedere all'utente una scelta B2C/B2B prima del checkout
- non serve duplicare logica legale nel paywall Flutter
- si mantiene il flusso server-driven gia adottato
- si riduce il rischio di classificare male l'utente in app prima del pagamento
- la pagina unica futura ridurra l'asimmetria tra il singolo URL richiesto da Stripe Dashboard e i due documenti LegalBlink separati

Regola prudenziale:

- se l'utente non dichiara chiaramente di acquistare come azienda/professionista, trattare il testo come B2C per le informazioni obbligatorie e le tutele consumer
- la presenza o assenza del Tax ID in Stripe non deve essere usata da sola come unica prova contrattuale B2B/B2C nella v1

Il paywall Flutter non deve diventare la fonte legale primaria del consenso. Il paywall mostra i piani e apre Checkout; il consenso vincolante deve essere raccolto nella pagina Stripe, immediatamente prima del pagamento, tramite:

- `consent_collection.terms_of_service = required`
- `custom_text.terms_of_service_acceptance.message` con link alle condizioni di vendita B2C e B2B
- URL condizioni di vendita configurato anche nei dettagli pubblici Stripe, usando il B2C in v1 e la pagina unica quando disponibile

Questa scelta mantiene il flusso coerente con l'architettura server-driven gia adottata:

- il client non gestisce prezzi, URL Stripe o logica legale di pagamento
- Stripe mostra e blocca il checkout finche il checkbox non viene accettato
- Stripe espone l'esito del consenso nella Checkout Session
- non serve introdurre nuove tabelle Supabase nella v1

---

## 2. Link disponibili e pagina unica futura

URL pubblici HTTPS disponibili per la v1:

```text
APP_TERMS_OF_SALE_URL_B2C=https://app.legalblink.it/api/documents/69e89f282420950024cb1a58/termini-di-vendita-per-servizi-it
APP_TERMS_OF_SALE_URL_B2B=https://app.legalblink.it/api/documents/69e89f282420950024cb1a58/termini-di-vendita-per-servizi-b2b-it
APP_TERMS_OF_SALE_URL_B2C_LIVE=https://app.legalblink.it/api/documents/69e89f282420950024cb1a58/termini-di-vendita-per-servizi-it
APP_TERMS_OF_SALE_URL_B2B_LIVE=https://app.legalblink.it/api/documents/69e89f282420950024cb1a58/termini-di-vendita-per-servizi-b2b-it
```

I secrets senza suffisso sono usati quando `STRIPE_BILLING_ENV` e vuoto o `test`.
I secrets con suffisso `_LIVE` sono usati quando `STRIPE_BILLING_ENV=live`.
In v1 i valori test e live coincidono perche i documenti LegalBlink pubblici sono gli stessi, ma si mantiene la separazione operativa gia usata per chiavi e price ID Stripe.

Pagina unica futura consigliata:

```text
FUTURE_TERMS_OF_SALE_HUB_URL=https://pastrylabmanager.com/condizioni-vendita
```

Requisiti pratici della pagina unica:

- pagina raggiungibile senza login
- URL stabile, preferibilmente su `https://pastrylabmanager.com/...`
- testo versionato o almeno data di ultimo aggiornamento visibile
- contenuto coerente con abbonamento SaaS LabManager, prezzo ricorrente, rinnovo, disdetta, assistenza e fatturazione
- sezione B2C con informazioni precontrattuali consumer, diritto di recesso ove applicabile, durata, rinnovo, disdetta e assistenza
- sezione B2B con condizioni per aziende/professionisti, eventuali limitazioni di responsabilita, fatturazione, foro/legge applicabile e clausole specifiche da validare legalmente

Nota: la pagina unica non e bloccante per la v1 se il legale approva il checkbox con entrambi i link LegalBlink. Resta pero la soluzione piu pulita per allineare il singolo campo Stripe Dashboard con la doppia struttura B2C/B2B.

---

## 3. Dove configurare Stripe

### 3.1 Stripe Dashboard

In Stripe Dashboard configurare i dettagli pubblici del business e le policy usate da Checkout:

- Terms of Service URL v1: URL LegalBlink B2C
- Terms of Service URL futuro: pagina unica `https://pastrylabmanager.com/condizioni-vendita`
- Privacy Policy URL: URL privacy policy gia in uso per LabManager
- support email: email supporto LabManager
- business website: sito pubblico LabManager

Motivo: Stripe richiede un URL valido dei termini nei dettagli pubblici quando si abilita il consenso TOS obbligatorio in Checkout. Stripe Dashboard non gestisce due URL ToS distinti; il secondo URL viene quindi mostrato nel testo custom del checkbox Checkout.

### 3.2 Checkout Session

File target:

- `supabase/functions/create-checkout-session/config.js`
- `supabase/functions/create-checkout-session/handler.js`
- `supabase/functions/create-checkout-session/handler.test.mjs`

Modifica minima prevista:

```js
const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  customer: stripeCustomerId,
  line_items: [{ price: selectedPriceId, quantity: 1 }],
  allow_promotion_codes: true,
  billing_address_collection: 'required',
  tax_id_collection: {
    enabled: true,
  },
  customer_update: {
    name: 'auto',
    address: 'auto',
  },
  consent_collection: {
    terms_of_service: 'required',
  },
  custom_fields: [
    // campi fiscali gia presenti
  ],
  custom_text: {
    terms_of_service_acceptance: {
      message:
        'Accetto le [Condizioni di vendita B2C di LabManager](TODO_CONDIZIONI_VENDITA_URL_B2C) e le [Condizioni di vendita B2B di LabManager](TODO_CONDIZIONI_VENDITA_URL_B2B), applicabili in base alla mia qualifica di consumatore o azienda/professionista.',
    },
    submit: {
      message:
        'Se non hai un codice SDI o una PEC puoi lasciare il campo vuoto: per la fattura elettronica puo essere usato il codice destinatario 0000000 quando applicabile.',
    },
  },
  locale: 'it',
  success_url: successUrl,
  cancel_url: cancelUrl,
  client_reference_id: user.id,
});
```

Implementazione concreta consigliata:

- aggiungere `APP_TERMS_OF_SALE_URL_B2C` e `APP_TERMS_OF_SALE_URL_B2B` agli env test della function
- aggiungere `APP_TERMS_OF_SALE_URL_B2C_LIVE` e `APP_TERMS_OF_SALE_URL_B2B_LIVE` agli env live della function
- caricarli in `loadCreateCheckoutSessionConfig`
- selezionare la coppia test/live in base a `STRIPE_BILLING_ENV`, come gia avviene per secret key e price ID Stripe
- validare entrambi come URL HTTPS
- usare i valori env nel messaggio Markdown del checkbox
- mantenere `locale: 'it'`
- non nascondere il testo Stripe sul riuso del metodo di pagamento
- non sostituire il Customer Portal con UI custom

---

## 4. Variante non consigliata v1: scelta esplicita B2C/B2B prima del checkout

I due documenti separati sono gestiti in v1 mostrando entrambi i link nel checkbox Stripe. La variante non consigliata e chiedere all'utente di scegliere prima del checkout quale documento usare.

Servirebbe aggiungere nel paywall una scelta esplicita:

- "Acquisto come consumatore"
- "Acquisto come azienda/professionista"

Poi il client dovrebbe inviare alla function:

```json
{
  "plan": "monthly",
  "platform": "windows",
  "customerType": "b2c"
}
```

La function dovrebbe:

- validare `customerType` come `b2c | b2b`
- risolvere un solo documento tra `APP_TERMS_OF_SALE_URL_B2C` e `APP_TERMS_OF_SALE_URL_B2B`
- personalizzare `custom_text.terms_of_service_acceptance.message` in base alla scelta
- salvare almeno in `metadata` della Checkout Session il profilo scelto, per audit Stripe:

```js
metadata: {
  terms_profile: customerType,
  terms_url: selectedTermsUrl,
}
```

Questa variante aumenta codice, test e rischio UX. Va adottata solo se il legale richiede due accettazioni materialmente separate o una classificazione contrattuale esplicita prima del pagamento.

Da non fare:

- non inferire B2B/B2C dalla checkbox business o dal Tax ID nativo di Stripe, perche quei campi vengono compilati dentro Checkout quando la sessione e gia stata creata
- non usare due Payment Links separati
- non creare un PaymentIntent custom solo per distinguere B2B/B2C

---

## 5. Cosa non fare nella v1

Per ridurre codice e rischio, non fare nella v1:

- non aggiungere un checkbox obbligatorio custom in `lib/pages/paywall_page.dart`
- non aggiungere una scelta B2B/B2C obbligatoria prima del checkout, salvo richiesta legale esplicita
- non salvare un nuovo consenso vendite in Supabase
- non creare una tabella `billing_consents`
- non duplicare in app il testo completo delle condizioni di vendita
- non intercettare manualmente il pagamento con PaymentIntent custom
- non usare Payment Links come workaround

Il consenso di vendita vive in Stripe Checkout. L'app continua a leggere solo `public.user_subscriptions` per lo stato di accesso.

---

## 6. Ruolo del paywall Flutter

`lib/pages/paywall_page.dart` resta una schermata commerciale e operativa.

Modifica opzionale, non bloccante:

- aggiungere un link testuale "Condizioni di vendita" nel footer o sotto le CTA dei piani
- aggiungere una nota breve tipo: "Il pagamento e gestito da Stripe. Prima di pagare ti verra richiesta l'accettazione delle condizioni di vendita."
- non chiedere nella v1 se l'utente e B2C o B2B

La modifica al paywall e P1, non P0. La P0 e il checkbox obbligatorio dentro Stripe Checkout.

---

## 7. Verifica tecnica

### 7.1 Test automatici

Aggiornare `supabase/functions/create-checkout-session/handler.test.mjs` per verificare che gli argomenti Stripe includano:

```js
consent_collection: {
  terms_of_service: 'required',
},
custom_text: {
  terms_of_service_acceptance: {
    message:
      'Accetto le [Condizioni di vendita B2C di LabManager](...) e le [Condizioni di vendita B2B di LabManager](...), applicabili in base alla mia qualifica di consumatore o azienda/professionista.',
  },
  submit: {
    message: '...',
  },
},
```

Comando:

```bash
node --test supabase/functions/create-checkout-session/config.test.mjs supabase/functions/create-checkout-session/handler.test.mjs
```

### 7.2 Test manuale Stripe sandbox

Checklist:

- aprire paywall da utente `expired`
- scegliere piano mensile o annuale
- verificare apertura Stripe Checkout
- verificare presenza checkbox condizioni di vendita
- verificare che il pagamento non proceda senza checkbox selezionato
- aprire entrambi i link delle condizioni dal checkbox
- verificare che i documenti LegalBlink B2C e B2B siano raggiungibili e coerenti
- completare pagamento test
- verificare `checkout.session.completed`
- verificare nella Checkout Session `consent.terms_of_service = accepted`
- verificare che webhook e `user_subscriptions` restino invariati nel comportamento

Esito test manuale sandbox 2026-04-28: `PASS`.

Evidenze raccolte:

- `STRIPE_BILLING_ENV` verificato in Supabase come `test` tramite digest CLI del secret.
- Checkout aperto dal paywall in ambiente sandbox con Session ID `cs_test_b1sDT5MdjDvGqoRXNbM2SdC7cOnQ2R3V8FsFHuQoR6ccUbxJ5LbMjoFwwG`.
- Screenshot manuale: checkbox condizioni vendita visibile in Checkout, non selezionato, con entrambi i link B2C/B2B LegalBlink.
- Screenshot manuale: tentativo di pagamento senza checkbox bloccato da Stripe con errore `Accetta i termini di LUCANIA EMANUELE per completare la transazione.`
- Stripe CLI: Checkout Session `status = complete`, `payment_status = paid`, `livemode = false`.
- Stripe CLI: `consent_collection.terms_of_service = required`.
- Stripe CLI: `consent.terms_of_service = accepted`.
- Stripe CLI: `custom_text.terms_of_service_acceptance.message` contiene:
  - `https://app.legalblink.it/api/documents/69e89f282420950024cb1a58/termini-di-vendita-per-servizi-it`
  - `https://app.legalblink.it/api/documents/69e89f282420950024cb1a58/termini-di-vendita-per-servizi-b2b-it`
- Stripe CLI: subscription `sub_1TR79PQ5sgTMZ0uDQvwYsAnD` creata in test mode, `status = active`, piano mensile `price_1TOvj2Q5sgTMZ0uDUEb2QL3z`, importo EUR `44,99`.
- Stripe CLI: invoice `in_1TR79MQ5sgTMZ0uDTkdAhthG` `status = paid`, `amount_paid = 4499`, periodo `2026-04-28 08:37:48+00` -> `2026-05-28 08:37:48+00`.
- Stripe CLI events: `checkout.session.completed` `evt_1TR79RQ5sgTMZ0uD2TPo8sTb`, `pending_webhooks = 0`.
- Supabase Edge logs: `stripe-webhook` versione 30 ha ricevuto due `POST | 200` alle `2026-04-28 08:37:56 UTC`.
- Supabase SQL: `public.user_subscriptions` per `user_id = 344678dd-585e-41eb-a5d6-a8e8805002b0` aggiornata a `active/monthly`, con `stripe_customer_id = cus_UPwwjvRLY0NHxN`, `stripe_subscription_id = sub_1TR79PQ5sgTMZ0uDQvwYsAnD`, periodo `2026-04-28 08:37:48+00` -> `2026-05-28 08:37:48+00`.

---

## 8. Deploy

Stato operativo al 2026-04-28:

- [x] URL LegalBlink condizioni di vendita B2C/B2B verificati come HTTPS pubblici.
- [x] Stripe Dashboard dettagli pubblici aggiornata con Terms of Service URL B2C e Privacy Policy URL.
- [x] Secrets Supabase test creati:
  - `APP_TERMS_OF_SALE_URL_B2C`
  - `APP_TERMS_OF_SALE_URL_B2B`
- [x] Secrets Supabase live creati:
  - `APP_TERMS_OF_SALE_URL_B2C_LIVE`
  - `APP_TERMS_OF_SALE_URL_B2B_LIVE`
- [x] `create-checkout-session` aggiornata per:
  - selezione URL test/live tramite `STRIPE_BILLING_ENV`
  - validazione HTTPS dei due URL
  - checkbox Stripe obbligatorio
  - testo custom con entrambi i link B2C/B2B
- [x] Test Node eseguiti:

```bash
node --test supabase/functions/create-checkout-session/config.test.mjs supabase/functions/create-checkout-session/handler.test.mjs
```

Risultato: 33 passati, 0 falliti.

- [x] Function deployata:

```bash
supabase functions deploy create-checkout-session --project-ref ndlsifytatricfutjsvu
```

Stato Supabase: `create-checkout-session` ACTIVE, versione 23, aggiornata il 2026-04-28 08:06:25 UTC.

Ordine operativo storico:

1. Verificare URL LegalBlink condizioni di vendita B2C/B2B.
2. Configurare Terms of Service URL e Privacy Policy URL nei dettagli pubblici Stripe.
3. Aggiungere secrets Supabase test `APP_TERMS_OF_SALE_URL_B2C` e `APP_TERMS_OF_SALE_URL_B2B`.
4. Aggiungere secrets Supabase live `APP_TERMS_OF_SALE_URL_B2C_LIVE` e `APP_TERMS_OF_SALE_URL_B2B_LIVE`.
5. Aggiornare `create-checkout-session`.
6. Aggiornare test Node della function.
7. Eseguire test Node.
8. Deployare la function:

```bash
supabase functions deploy create-checkout-session --project-ref ndlsifytatricfutjsvu
```

9. Eseguire test manuale sandbox.
10. Ripetere verifica in live mode con importo controllato/codice promo, come da piano test reale.

Step completati nel test sandbox:

1. [x] Eseguire test manuale sandbox dal paywall con `STRIPE_BILLING_ENV=test`.
2. [x] Verificare che Stripe Checkout mostri il checkbox obbligatorio con entrambi i link B2C/B2B.
3. [x] Verificare che il checkout non proceda senza checkbox selezionato.
4. [x] Completare un pagamento test.
5. [x] Verificare in Stripe la Checkout Session completata con `consent.terms_of_service = accepted`.
6. [x] Verificare che il webhook mantenga invariato il comportamento su `public.user_subscriptions`.

Switch live 2026-04-28:

- `STRIPE_BILLING_ENV` impostato a `live` su Supabase project `ndlsifytatricfutjsvu`.
- Verifica CLI: digest del secret `STRIPE_BILLING_ENV` = `247610f4dedd4ab7247d07dbda19c81ca9817f85820742cad49d407ffae9e4ed`, corrispondente a SHA-256 di `live`.
- Dopo aggiornamento secrets, Supabase risulta con `create-checkout-session` ACTIVE versione 24 e `stripe-webhook` ACTIVE versione 31.
- Preflight DB live: `labmanager.info@gmail.com` e `expired`, senza `stripe_customer_id` e senza `stripe_subscription_id`, quindi resta l'utente consigliato per un checkout live pulito.

Step residui prima del go-live:

1. [x] Prima del go-live, impostare `STRIPE_BILLING_ENV=live` solo quando si vuole usare chiavi, price ID e URL live.
2. [ ] Eseguire verifica live con importo controllato o codice promo, come da piano test reale.

---

## 9. Success criteria

La modifica e completata quando:

- Stripe Checkout mostra un checkbox obbligatorio per le condizioni di vendita
- il checkbox contiene link HTTPS alle condizioni B2C e B2B corrette
- i documenti linkati sono chiaramente distinguibili
- Checkout non consente pagamento senza accettazione
- la Checkout Session completata espone `consent.terms_of_service = accepted`
- non sono state aggiunte tabelle o logiche custom di consenso in Supabase
- `PaywallPage` continua solo ad avviare Checkout server-driven
- il webhook subscription continua a sincronizzare soltanto lo stato abbonamento
- la pagina unica pubblica e tracciata come raccomandazione futura, non come blocco v1

---

## 10. Riferimenti

- Stripe Checkout Session API: `https://docs.stripe.com/api/checkout/sessions/create`
- Stripe Checkout text and policies: `https://docs.stripe.com/payments/checkout/customization/policies`
- Consumer Rights Directive, Commissione europea: `https://commission.europa.eu/law/law-topic/consumer-protection-law/consumer-contract-law/consumer-rights-directive_en`
- Unfair Contract Terms Directive, Commissione europea: `https://commission.europa.eu/law/law-topic/consumer-protection-law/consumer-contract-law/unfair-contract-terms-directive_en`
- Design billing LabManager: `docs/piani/pricing/stripe/2026-04-22-stripe-billing-architecture-design.md`
- Piano dati fatturazione Checkout: `docs/piani/pricing/stripe/2026-04-25-piano-checkout-stripe-dati-fatturazione-elettronica.md`
