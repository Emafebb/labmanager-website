# Stripe Billing Architecture Design

**Date:** 2026-04-22

**Status**

Documento canonico allineato al piano operativo:
`docs/superpowers/plans/2026-04-22-stripe-billing-server-driven-implementation.md`

**Goal**

Sostituire l'attuale flusso basato su `Payment Links` client-side con un'architettura Stripe Billing server-driven, stabile e sicura, che usi `Checkout Session`, `Customer Portal`, `public.user_subscriptions` come projection business unica letta dall'app, e un webhook Stripe che sincronizzi lo stato applicativo senza introdurre tabelle raw Stripe o schema mirror aggiuntivi.

**Documenti Operativi Collegati**

- piano operativo: `docs/superpowers/plans/2026-04-22-stripe-billing-server-driven-implementation.md`
- checklist manuale: `docs/piani/pricing/stripe/2026-04-22-stripe-billing-server-driven-manual-checklist.md`
- runbook Stripe/Supabase: `docs/piani/pricing/stripe/2026-04-22-stripe-dashboard-runbook.md`
- piano test reale: `docs/piani/pricing/stripe/2026-04-23-piano-test-reale-stripe.md`
- piano Checkout dati fatturazione elettronica: `docs/piani/pricing/stripe/2026-04-25-piano-checkout-stripe-dati-fatturazione-elettronica.md`

Il design v1 separa esplicitamente lo stato applicativo dell'abbonamento dai dati fiscali raccolti in Checkout: `public.user_subscriptions` resta la projection applicativa, mentre Stripe resta la fonte operativa per indirizzo, Tax ID, codice fiscale e SDI/PEC raccolti durante il pagamento.

---

## 1. Decisioni Confermate

- Non installare Stripe Sync Engine.
- Non usare `Payment Links` come architettura finale.
- Non hardcodare URL `buy.stripe.com/...` nel client come soluzione definitiva.
- Non creare una tabella separata `stripe_customers`.
- Non introdurre tabelle raw Stripe o mirror di dominio aggiuntivi.
- Usare `public.user_subscriptions` come tabella business unica per l'app.
- Salvare in `public.user_subscriptions` anche `stripe_customer_id` e `stripe_subscription_id`.
- Irrobustire `public.user_subscriptions` con indici univoci parziali su `stripe_customer_id` e `stripe_subscription_id`.
- Creare checkout e portal solo tramite Edge Functions Stripe dedicate.
- Chiamare le Edge Functions dall'app tramite `SubscriptionBillingRepository`, esposto via `subscriptionBillingRepositoryProvider`.
- Lasciare `verify_jwt = false` nelle functions Supabase, ma validare sempre manualmente `Authorization: Bearer <token>` tramite Supabase Auth.
- Usare un client Supabase anon per validare la sessione utente dentro le functions.
- Usare un client Supabase service-role per leggere e aggiornare `public.user_subscriptions` dentro le functions.
- Lasciare a Stripe la UI nativa del portal; l'app deve solo richiedere una sessione e aprire la URL ritornata.
- Derivare piano e periodo billing da subscription e invoice Stripe, non da `session.payment_link`.
- Usare `invoice.paid` al posto di `invoice.payment_succeeded`.
- Mantenere la cancellazione dal Customer Portal a fine periodo, senza revoca immediata dell'accesso.
- Lasciare nel client solo catalogo UI, copy commerciale e supporto; prezzi Stripe e URL di ritorno restano server-side.
- Raccogliere in Checkout indirizzo di fatturazione obbligatorio, Tax ID Stripe nativo, nome e indirizzo Customer aggiornati automaticamente.
- Abilitare in Checkout `locale=it`, `allow_promotion_codes=true` e i custom fields opzionali `codicefiscale` e `sdipec`.
- Non rendere obbligatori i custom fields fiscali nella v1: il pagamento non deve essere bloccato quando codice fiscale o SDI/PEC mancano.
- Non creare `public.billing_profiles` e non duplicare in Supabase codice fiscale, SDI/PEC, Tax ID, indirizzo o altri dati fiscali raccolti in Stripe.
- Non estendere `stripe-webhook` per persistere profili fiscali applicativi nella v1.
- Non trattare receipt o paid invoice Stripe come sostituti della fattura elettronica trasmessa a SdI.

---

## 2. Problema Dell'Architettura Precedente

L'architettura V1 funzionava come primo test operativo, ma aveva limiti strutturali:

- il client costruiva URL Stripe a build-time
- il client conosceva dettagli operativi Stripe che devono restare server-side
- il `Customer Portal` non era integrato nel contratto applicativo
- cambiare prezzi, link o return URL obbligava a toccare l'app
- il webhook derivava il piano da `session.payment_link`, legando troppo la logica business a un dettaglio di implementazione Stripe

La separazione definitiva deve quindi essere questa:

- il client sceglie solo il piano e la piattaforma runtime
- il repository Flutter invoca functions autenticate e valida la risposta
- il server decide `price_id`, customer e URL di ritorno
- Stripe gestisce UI e lifecycle di billing
- `public.user_subscriptions` resta il contratto semplice e stabile letto dall'app

---

## 3. Architettura Finale

### 3.1 Componenti

I componenti applicativi del flusso finale sono:

- `SubscriptionGuard`, che blocca l'accesso per gli utenti `expired`
- `PaywallPage`, che mostra i piani e avvia il checkout server-driven
- `SubscriptionBillingRepository`, che invoca `create-checkout-session` e `create-customer-portal-session`
- `subscriptionBillingRepositoryProvider`, che espone il repository via Riverpod
- `AccountSubscriptionManagementCard` in `SettingsPage`, che apre il portal per utenti gia collegati a Stripe
- `create-checkout-session`, che crea sessioni Stripe `mode=subscription`
- `create-customer-portal-session`, che crea sessioni ephemeral del Customer Portal
- `stripe-webhook`, che sincronizza lo stato business in `public.user_subscriptions`
- PowerSync, che riallinea il record lato app

### 3.2 Flusso Subscribe

1. L'utente arriva al paywall tramite `SubscriptionGuard`.
2. `PaywallPage` chiede al `SubscriptionBillingRepository` di creare una checkout session per `monthly` oppure `annual`.
3. Il repository invia una richiesta autenticata alla function `create-checkout-session` con payload:

```json
{
  "plan": "monthly",
  "platform": "windows"
}
```

4. La function:
   - valida `Authorization: Bearer <token>`
   - valida la sessione utente con Supabase Auth
   - carica `public.user_subscriptions` tramite client service-role
   - riusa `stripe_customer_id` se gia presente
   - se manca, crea un customer Stripe e persiste `stripe_customer_id`
   - risolve il `price_id` corretto dai secrets
   - risolve `success_url` e `cancel_url` dai secrets in base alla piattaforma
   - crea una `Checkout Session` con `mode=subscription`
   - imposta `client_reference_id = <user_id>`
   - restituisce una `url` HTTPS
5. Il client apre la URL esterna tramite browser/app esterna.
6. Stripe completa il checkout e invia i webhook.
7. Il webhook aggiorna `public.user_subscriptions`.
8. PowerSync sincronizza il record e l'app vede `active`.

### 3.3 Flusso Manage Subscription

1. L'utente apre `Impostazioni`.
2. `SettingsPage` mostra `AccountSubscriptionManagementCard` solo se `stripe_customer_id` e valorizzato.
3. Il repository invia una richiesta autenticata a `create-customer-portal-session` con payload:

```json
{
  "platform": "windows"
}
```

4. La function:
   - valida token e sessione utente
   - legge `stripe_customer_id` da `public.user_subscriptions`
   - rifiuta la richiesta se il legame Stripe non esiste
   - risolve `return_url` per piattaforma
   - crea una `billing portal session`
   - restituisce una `url` HTTPS
5. Il client apre la URL esterna del portal.
6. Stripe gestisce nativamente fatture, metodo di pagamento, cancellazione e variazioni supportate.
7. Gli eventi async del portal vengono riflessi da `stripe-webhook` su `public.user_subscriptions`.

### 3.4 Flusso Gating App

L'app continua a leggere solo `public.user_subscriptions` tramite `subscriptionProvider`.

`effectiveStatus` resta calcolato cosi:

- `active` se `subscription_end_date` e futura
- `trial` se `trial_end_date` e futura e non c'e una subscription attiva
- `expired` negli altri casi

Il comportamento finale del guard e:

- `loading` -> splash screen
- `error` -> schermata bloccante con retry
- record mancante -> schermata bloccante con retry
- `expired` -> `PaywallPage`
- `trial` o `active` -> accesso completo

Questo evita che l'app debba conoscere dettagli Stripe grezzi.

---

## 4. Modello Dati

### 4.1 Tabella Da Mantenere

La tabella `public.user_subscriptions` resta la projection business principale.

Campi da mantenere:

- `user_id`
- `status`
- `trial_start_date`
- `trial_end_date`
- `subscription_plan`
- `subscription_start_date`
- `subscription_end_date`
- `stripe_customer_id`
- `stripe_subscription_id`
- `created_at`
- `updated_at`

Non fanno parte di `public.user_subscriptions`:

- codice fiscale
- codice SDI o PEC
- Tax ID Stripe / P.IVA
- indirizzo di fatturazione
- ragione sociale o business name
- dati fiscali dei custom fields Checkout

### 4.2 Hardening Database Richiesto

Per rendere la tabella sicura come ponte con Stripe, il piano adotta:

- migration `supabase/sql/subscription_billing_server_driven_v1.sql`
- query di verifica `supabase/sql/test_subscription_billing_server_driven_v1.sql`
- indice univoco parziale `user_subscriptions_stripe_customer_id_key`
- indice univoco parziale `user_subscriptions_stripe_subscription_id_key`

Motivazione:

- impedire collisioni tra utenti diversi sul medesimo oggetto Stripe
- permettere lookup sicuri nel webhook e nel portal flow

Non introdurre una nuova tabella `stripe_customers` finche il dominio resta:

- `1 utente = 1 accesso app`
- `1 record subscription per user_id`

Se in futuro il prodotto evolvera verso account multi-seat o multi-subscription per utente, la scelta andra rivalutata. Oggi sarebbe complessita inutile.

### 4.3 Dati Fiscali Fuori Dal Modello Applicativo

La v1 non introduce una tabella applicativa per i dati fiscali.

Decisione:

- non creare `public.billing_profiles`
- non modificare `stripe-webhook` per salvare codice fiscale, SDI/PEC, Tax ID o indirizzi in Supabase
- usare Stripe Dashboard, Customer, Tax ID e Checkout Session come fonte operativa dei dati raccolti
- mantenere `public.user_subscriptions` come unico dato billing sincronizzato verso l'app

Motivazione:

- ridurre superficie privacy, RLS, migrazioni e rischi di coerenza
- evitare di duplicare dati che Stripe conserva gia sul Customer o sulla Checkout Session
- mantenere distinto lo sblocco applicativo dall'operativita amministrativa e-fattura

Se in futuro servira automazione fiscale reale, per esempio export amministrativo, portale dati fatturazione o integrazione provider e-fattura, andra progettato un modello dedicato separato dalla projection subscription.

---

## 5. Edge Functions E Contratti Server

### 5.1 Pattern Comune

Le due functions billing adottano un contratto uniforme:

- espongono `OPTIONS` per CORS e `POST` per il flusso reale
- non si fidano di `verify_jwt = false`, ma validano sempre il bearer token manualmente
- usano `SUPABASE_ANON_KEY` per verificare la sessione utente
- usano `SUPABASE_SERVICE_ROLE_KEY` per leggere e aggiornare `public.user_subscriptions`
- non accettano dal client `price_id`, return URL o altri dettagli Stripe sensibili
- ritornano solo `{ "url": "https://..." }`
- rispondono con codici errore macchina nel campo `error`

### 5.2 `create-checkout-session`

**Responsabilita**

- creare checkout Stripe subscription on-demand
- proteggere `price_id` e return URLs dal client
- creare o riusare il customer Stripe

**Input atteso**

```json
{
  "plan": "monthly",
  "platform": "windows"
}
```

`plan` supporta solo `monthly | annual`.

`platform` supporta solo `windows | android`.

**Output atteso**

```json
{
  "url": "https://checkout.stripe.com/..."
}
```

**Env richiesti**

- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_ID_MONTHLY`
- `STRIPE_PRICE_ID_ANNUAL`
- `APP_BILLING_SUCCESS_URL_WINDOWS`
- `APP_BILLING_CANCEL_URL_WINDOWS`
- `APP_BILLING_SUCCESS_URL_ANDROID`
- `APP_BILLING_CANCEL_URL_ANDROID`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**Comportamento finale**

- rifiuta `plan` non valido
- rifiuta `platform` non valida
- rifiuta token mancante o bearer malformato
- rifiuta sessione utente non valida
- rifiuta se manca il record `user_subscriptions`
- non accetta `price_id` o URL dal client
- crea il customer Stripe con almeno:
  - `email`
  - `metadata.user_id = <user_id>`
- persiste `stripe_customer_id` quando il customer viene creato per la prima volta
- crea la checkout session con:
  - `mode=subscription`
  - `customer=<stripe_customer_id>`
  - `line_items=[{ price, quantity: 1 }]`
  - `allow_promotion_codes=true`
  - `success_url`
  - `cancel_url`
  - `client_reference_id=<user_id>`
  - `billing_address_collection=required`
  - `tax_id_collection.enabled=true`
  - `customer_update.address=auto`
  - `customer_update.name=auto`
  - `custom_fields.codicefiscale` opzionale, label "Codice fiscale", testo di 16 caratteri
  - `custom_fields.sdipec` opzionale, label "Codice SDI o PEC"
  - `custom_text.submit` con nota operativa sul codice destinatario `0000000` quando applicabile
  - `locale=it`

Nota fatturazione:

- le subscription Stripe generano invoice a ogni periodo di billing
- `Customer emails > Successful payments` puo inviare automaticamente receipt / paid invoice email al customer
- la raccolta indirizzo e Tax ID in Checkout serve a migliorare Customer e invoice PDF Stripe
- `tax_id_collection.required` resta non impostato per non forzare il percorso business a tutti i clienti
- `codicefiscale` e `sdipec` restano opzionali per non bloccare privati, aziende senza SDI/PEC al momento del pagamento o clienti esteri
- i dati fiscali custom restano consultabili in Stripe Dashboard / Checkout Session, non in Supabase
- per il regime forfettario italiano, la paid invoice/receipt Stripe non sostituisce da sola la fattura elettronica trasmessa a SdI

**Errori principali attesi**

- `missing_authorization`
- `invalid_authorization`
- `invalid_session`
- `invalid_plan`
- `invalid_platform`
- `subscription_not_found`
- `stripe_customer_creation_failed`
- `stripe_customer_persistence_failed`
- `checkout_session_missing_url`
- `server_misconfigured`
- `internal_error`

### 5.3 `create-customer-portal-session`

**Responsabilita**

- creare sessioni ephemeral del Customer Portal Stripe
- lasciare a Stripe la gestione UI del billing

**Input atteso**

```json
{
  "platform": "windows"
}
```

**Output atteso**

```json
{
  "url": "https://billing.stripe.com/..."
}
```

**Env richiesti**

- `STRIPE_SECRET_KEY`
- `APP_BILLING_RETURN_URL_WINDOWS`
- `APP_BILLING_RETURN_URL_ANDROID`
- opzionale `STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**Vincoli e validazioni**

- rifiuta `platform` non valida
- rifiuta sessione utente non valida
- rifiuta se manca il record `user_subscriptions`
- rifiuta se `stripe_customer_id` non e presente nel record utente
- Windows richiede `APP_BILLING_RETURN_URL_WINDOWS` HTTPS valida
- Android ammette `APP_BILLING_RETURN_URL_ANDROID` sia `https://...` sia `labmanager://...`
- la `url` ritornata da Stripe deve comunque essere HTTPS valida

**Errori principali attesi**

- `missing_authorization`
- `invalid_authorization`
- `invalid_session`
- `invalid_platform`
- `subscription_not_found`
- `stripe_customer_not_linked`
- `stripe_customer_not_found`
- `invalid_return_url`
- `invalid_portal_configuration`
- `portal_not_configured`
- `invalid_stripe_api_key`
- `portal_session_creation_failed`
- `portal_session_missing_url`
- `server_misconfigured`
- `internal_error`

Il client deve mappare questi errori in messaggi utente, senza esporre dettagli grezzi Stripe.

---

## 6. Webhook Stripe

### 6.1 Ruolo

`stripe-webhook` resta l'unico punto che aggiorna in modo asincrono lo stato billing business dentro `public.user_subscriptions`.

Il webhook non e responsabile della conservazione applicativa dei dati fiscali raccolti in Checkout. In v1 non deve creare o aggiornare profili fiscali Supabase da `custom_fields`, Tax ID, indirizzo o business name: questi dati restano fonte operativa Stripe.

### 6.2 Eventi Target

L'implementazione finale deve gestire almeno:

- `checkout.session.completed`
- `invoice.paid`
- `invoice.payment_failed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

### 6.3 Regole Di Lookup E Derivazione

Il webhook finale adotta queste regole:

- `checkout.session.completed` fa lookup per `user_id` tramite `client_reference_id`
- gli eventi ricorrenti fanno lookup prima per `stripe_subscription_id`, poi in fallback per `stripe_customer_id`
- `subscription_plan` viene derivato dall'intervallo ricorrente Stripe:
  - `month -> monthly`
  - `year -> annual`
- il periodo subscription viene derivato dagli item della subscription:
  - `subscription_start_date = max(current_period_start)`
  - `subscription_end_date = min(current_period_end)`
- il periodo invoice viene derivato dalle linee invoice, con fallback al periodo subscription se necessario

### 6.4 Comportamento Atteso Per Evento

#### `checkout.session.completed`

Usare:

- `client_reference_id` per trovare l'utente
- `customer` per `stripe_customer_id`
- `subscription` per `stripe_subscription_id`
- la subscription Stripe recuperata via API per derivare piano e periodo

Effetto:

- imposta `status = active`
- salva customer e subscription IDs
- salva piano e date del periodo corrente

#### `invoice.paid`

Effetto:

- mantiene `status = active`
- aggiorna `subscription_plan`
- aggiorna `subscription_start_date`
- estende `subscription_end_date`

Nota:

`invoice.paid` e l'evento primario di successo invoice nella nuova architettura.

#### `invoice.payment_failed`

Effetto:

- forza `status = expired`
- mantiene coerenti customer, subscription e piano se disponibili
- porta `subscription_end_date` alla data evento, con fallback al periodo invoice se necessario

Questo revoca l'accesso lato app senza attendere altri passaggi.

#### `customer.subscription.updated`

Questo evento e critico con il Customer Portal.

Regola finale:

- se Stripe mantiene `status` in `active` o `trialing`, il record resta `active`
- se Stripe passa a uno stato non attivo, il record va `expired`
- `cancel_at_period_end = true` non revoca accesso subito, perche la subscription resta attiva fino a fine periodo

Effetto:

- aggiorna `subscription_plan`
- aggiorna `subscription_start_date`
- aggiorna `subscription_end_date` al periodo corrente noto quando lo stato resta attivo
- revoca accesso solo quando lo stato Stripe non e piu attivo

#### `customer.subscription.deleted`

Effetto:

- imposta `status = expired`
- salva `subscription_end_date` finale nota, usando `ended_at` se presente oppure il periodo disponibile
- mantiene i riferimenti Stripe per audit, recovery e coerenza applicativa

### 6.5 Idempotenza E Ordine Eventi

Il webhook mantiene la guardia `stale event` gia introdotta nel repo.

Obiettivo:

- ignorare eventi vecchi arrivati fuori ordine
- evitare rollback di stato gia piu aggiornato
- usare `event.created` confrontato con `updated_at` del record locale prima di applicare la patch

---

## 7. Client Flutter

### 7.1 Billing Layer

Il client finale introduce un layer esplicito di billing:

- `lib/utils/billing_client_platform.dart` risolve `windows | android`
- le piattaforme fuori scope lanciano `UnsupportedError`
- `lib/repository/subscription_billing_repository.dart` incapsula invocazione functions, bearer auth header e parsing risposta
- `lib/providers/subscription_billing_provider.dart` espone il repository via Riverpod

Il repository deve:

- allegare sempre `platform` al payload
- allegare sempre il bearer token della sessione corrente
- tradurre gli errori function in `SubscriptionBillingException`
- accettare solo una risposta con URL HTTPS valida

### 7.2 Paywall

Il paywall non costruisce piu URL Stripe locali.

Deve invece:

- mantenere il catalogo visivo dei piani
- chiamare `create-checkout-session`
- aprire la URL restituita tramite `LaunchMode.externalApplication`
- mostrare loading e fallback errori
- offrire sempre una CTA supporto email

`lib/config/paywall_config.dart` deve restare solo catalogo UI:

- label dei piani
- copy commerciale
- support email

### 7.3 Gestione Abbonamento

Va aggiunta una CTA dedicata:

- `Gestisci abbonamento`

Comportamento:

- disponibile solo per utenti con `stripe_customer_id` valorizzato
- resa tramite `AccountSubscriptionManagementCard`
- richiama `create-customer-portal-session`
- apre la URL del portal
- mappa gli errori noti in messaggi utente chiari da `SettingsPage`

### 7.4 Legacy Da Rimuovere

Questa architettura considera legacy e non piu accettabili:

- `STRIPE_PAYMENT_LINK_MONTHLY`
- `STRIPE_PAYMENT_LINK_ANNUAL`
- dipendenza applicativa da `session.payment_link`
- test e documentazione che trattano i `Payment Links` come soluzione finale

Eventuali riferimenti residui devono restare solo come note storiche di migrazione.

---

## 8. Ritorno Da Stripe

### Android

Gli URL confermati nel piano operativo sono:

- checkout success: `labmanager://billing/success`
- checkout cancel: `labmanager://billing/cancel`
- portal return: `labmanager://billing/portal-return`

Comportamento desiderato:

- Stripe o il browser ritornano all'app
- l'app puo mostrare uno stato intermedio di sincronizzazione
- il vero sblocco avviene solo quando `public.user_subscriptions` si aggiorna

### Windows

Windows usa pagine web HTTPS di conferma e ritorno.

Vincoli confermati:

- dominio web disponibile: `https://pastrylabmanager.com`
- niente deep link desktop aggressivi nella prima versione
- l'utente puo tornare all'app manualmente dopo la pagina di conferma

Il redirect desktop non sblocca da solo l'app: lo sblocco resta guidato da `public.user_subscriptions`.

---

## 9. Testing Strategy

### 9.1 Unit / Logic

- test Node per config e handler di `create-checkout-session`
- test Node di `create-checkout-session` per:
  - `billing_address_collection=required`
  - `tax_id_collection.enabled=true`
  - `customer_update.name=auto`
  - `customer_update.address=auto`
  - `allow_promotion_codes=true`
  - `locale=it`
  - custom field opzionale `codicefiscale` con lunghezza 16
  - custom field opzionale `sdipec`
- test Node per config e handler di `create-customer-portal-session`
- test logic webhook per:
  - plan resolution da subscription interval
  - derivazione periodo billing
  - gestione `invoice.paid`
  - gestione `invoice.payment_failed`
  - gestione `customer.subscription.updated`
  - gestione `customer.subscription.deleted`
  - guardia stale events

### 9.2 Flutter

- unit test di `billing_client_platform`
- unit test di `subscription_billing_repository`
- widget test del paywall aggiornato
- test del wiring `SubscriptionGuard -> SubscriptionBillingRepository`
- test di fallback errori
- test della CTA portal in settings

### 9.3 End-To-End

Happy path:

- utente `expired`
- paywall
- checkout mensile o annuale
- webhook
- `active`
- app sbloccata

Portal path:

- utente `active`
- apertura portal
- cancellazione a fine periodo
- `customer.subscription.updated`
- accesso ancora valido fino a `subscription_end_date`
- `customer.subscription.deleted` a fine periodo
- ritorno a `expired`

Failure path:

- pagamento fallito
- nessuno sblocco improprio

Checkout dati fatturazione:

- scenario privato con indirizzo obbligatorio e custom fields lasciati vuoti o parziali
- scenario privato con `codicefiscale` compilato
- scenario azienda con spunta business, ragione sociale, Tax ID `eu_vat` e `sdipec`
- verifica che pagamento e webhook subscription restino indipendenti dalla completezza dei dati e-fattura
- verifica che Customer, Tax ID, indirizzo e custom fields siano recuperabili in Stripe Dashboard / Checkout Session
- verifica che nessun dato fiscale venga duplicato in Supabase

Per l'operativita manuale valgono i documenti collegati in apertura.

---

## 10. Migrazione Dal Setup Legacy

Ordine consigliato, coerente con il piano operativo:

1. introdurre l'hardening DB su `public.user_subscriptions`
2. creare `create-checkout-session`
3. creare `create-customer-portal-session`
4. introdurre `SubscriptionBillingRepository` e provider Flutter
5. riallineare `stripe-webhook` a `Checkout Session + Customer Portal lifecycle`
6. aggiornare il paywall per usare il checkout server-side
7. aggiungere la CTA `Gestisci abbonamento` in settings
8. validare Checkout dati fatturazione in sandbox, inclusi `codicefiscale`, `sdipec`, Tax ID e indirizzo
9. pulire config, test e documentazione legacy sui `Payment Links`
10. eseguire E2E completo in Stripe test mode

Durante la migrazione possono restare note storiche sui `Payment Links`, ma il traguardo finale e rimuovere ogni dipendenza runtime da:

- `session.payment_link`
- `STRIPE_PAYMENT_LINK_ID_*`
- URL Stripe statiche build-time nel client

---

## 11. Success Criteria

L'implementazione e corretta quando tutte queste condizioni sono vere:

- l'app non contiene piu URL Stripe di pagamento hardcodate
- il client non sceglie piu `price_id` o return URLs
- checkout e portal si aprono solo tramite sessioni create server-side
- Checkout raccoglie indirizzo obbligatorio, Tax ID nativo Stripe, custom fields opzionali `codicefiscale` e `sdipec`, e usa lingua italiana
- `SubscriptionBillingRepository` e il solo punto client di accesso al billing remoto
- Stripe gestisce nativamente il portal
- `public.user_subscriptions` resta l'unica tabella letta dall'app
- nessuna tabella Supabase duplica i dati fiscali raccolti da Stripe
- il webhook non dipende piu da `session.payment_link`
- il webhook non persiste dati fiscali custom nella v1
- il webhook copre subscribe, renewal, failure, portal update e cancellation end-of-period
- la cancellazione a fine periodo non revoca accesso subito
- cambiare prezzi o portal config non richiede modifiche al client
- runbook, checklist e test manuali descrivono solo il flusso server-driven
- receipt e paid invoice Stripe restano distinti dalla fattura elettronica SdI
