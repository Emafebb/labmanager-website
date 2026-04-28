# Roadmap Operativa - Abbonamento Solo In App

> Data: 2026-04-21
> Scopo: avere una checklist unica, cronologica e pratica per portare LabManager da "trial su sito + app" a "trial e abbonamento gestiti correttamente dentro l'app".

> Aggiornamento architetturale: dal 2026-04-22 questo documento va letto come roadmap V1 / storico di implementazione.
> Restano validi il modello business, `public.user_subscriptions`, trial, consenso legale, paywall e base webhook.
> Le parti V1 client-side sono superate dalla nuova architettura server-driven documentata in:
> - `docs/piani/pricing/stripe/2026-04-22-stripe-billing-architecture-design.md`
> - `docs/superpowers/plans/2026-04-22-stripe-billing-server-driven-implementation.md`

---

## 1) Obiettivo finale

Questo file va letto come archivio operativo V1 e contesto storico.
Per la procedura attiva di setup e test usa il runbook:

- `docs/piani/pricing/2026-04-22-stripe-dashboard-runbook.md`

Arrivare a questo flusso completo:

```text
utente crea account
-> accetta termini e privacy
-> parte trial di 14 giorni
-> usa l'app normalmente
-> trial scade
-> paywall in app
-> utente sceglie mensile o annuale
-> Checkout Session Stripe creata server-side
-> webhook Stripe aggiorna Supabase
-> app vede stato active e si sblocca
```

---

## 2) Stato attuale

Gia completato in repo app:

- [x] pricing del sito riallineato a funnel informativo
- [x] checkout Stripe del sito archiviato come test tecnico interno
- [x] trial deciso a 14 giorni
- [x] tabella `public.user_subscriptions` creata in Supabase con RLS
- [x] prodotto e prezzi Stripe creati in test mode
- [x] connessione app -> `user_subscriptions`
- [x] trial automatico post-consenso legale
- [x] `SubscriptionGuard` con blocco accesso per stato `expired`
- [x] formato versioni legali deciso lato app: `terms_v1` e `privacy_v1`
- [x] gate legale client-side aggiornato per controllare Termini + Privacy
- [x] supporto Privacy Policy in-app predisposto con fallback web
- [x] migration `supabase/sql/account_security_legal_acceptance_v2.sql` applicata in Supabase
- [x] RPC `has_accepted_legal_documents` e `accept_legal_documents` applicate
- [x] smoke test SQL eseguito su utente reale con compatibilita legacy verificata
- [x] `PaywallPage` in-app con CTA Stripe, loading e contesto utente runtime
- [x] banner trial in home dashboard con giorni rimanenti
- [x] edge function `stripe-webhook` implementata in repo con firma Stripe, update stato business e guardia eventi stale

Non ancora completato operativamente:

- [ ] finalizzare contenuto definitivo di Termini e Privacy dell'app
- [ ] configurazione server-side completa per Checkout Session e Customer Portal
- [ ] test end-to-end completo

Nota pratica:

- la Fase 1 tecnica e chiusa lato app + database
- resta solo l'eventuale finalizzazione del contenuto legale definitivo

---

## 3) Regole bloccate

Queste decisioni non vanno piu rimesse in discussione mentre implementi:

- il sito non vende
- il piano si sceglie solo in app
- il trial dura 14 giorni
- il trial parte dopo il consenso legale
- `public.user_subscriptions` e la fonte di verita business
- Stripe Sync Engine non sostituisce la tua logica applicativa

Aggiornamento 2026-04-22:

- la decisione V1 di usare un flusso client-side statico per partire veloce e superata
- la direzione corrente e `Checkout Session + Customer Portal` server-side
- il client non deve piu dipendere da URL Stripe statici build-time come soluzione finale

---

## 4) Ordine cronologico di esecuzione

### Fase 0 - Tenere fermo il lato sito

**Obiettivo**
Non riaprire il fronte web mentre implementi l'app.

**Da fare**

- [x] lasciare il sito solo informativo
- [x] lasciare i prezzi pubblici sul sito
- [x] lasciare il trial come CTA di ingresso
- [x] evitare nuovi flussi di checkout sul sito

**Output atteso**

- nessun lavoro tecnico aperto nel sito per gli abbonamenti

---

### Fase 1 - Chiudere il blocco legale in app

**Obiettivo**
Fare in modo che l'utente non inizi il trial prima di aver accettato i documenti corretti.

**Da fare**

- [ ] finalizzare contenuto definitivo di Termini e Privacy dell'app
- [x] decidere il formato di versione documento:
  - `terms_v1`
  - `privacy_v1`
- [x] mostrare schermata bloccante se le accettazioni mancano
- [x] predisporre apertura Privacy Policy in-app con fallback web
- [x] applicare migration SQL per tracciare:
  - `terms_accepted_at`
  - `terms_version`
  - `privacy_accepted_at`
  - `privacy_version`
- [x] applicare RPC nuove:
  - `has_accepted_legal_documents`
  - `accept_legal_documents`
- [x] eseguire pre-check e post-check su `account_security`

**Implementazione corrente**

- `lib/config/terms_config.dart` usa `terms_v1` e `privacy_v1`
- `lib/widgets/auth_guard_wrapper.dart` controlla Termini + Privacy e blocca il trial finche il gate non e valido
- `lib/pages/terms_conditions_page.dart` richiede accettazione Termini, clausole specifiche e Privacy
- `lib/pages/privacy_policy_page.dart` apre il markdown in-app se presente, altrimenti fa fallback al web
- `supabase/sql/account_security_legal_acceptance_v2.sql` e pronto e gia corretto per:
  - PK su `email`
  - `user_id` non univoco
  - soft delete (`is_deleted`, `deleted_at`)
  - race condition sul ramo `INSERT`
- `supabase/sql/test_account_security_legal_acceptance_v2.sql` e pronto per:
  - pre-check duplicati attivi su `user_id`
  - post-check su colonne, `SECURITY DEFINER`, `search_path` e grant RPC
  - smoke test transazionale con `ROLLBACK` su un utente reale
- deploy SQL e verifica eseguiti su Supabase con utente:
  - `user_id = 7c426106-dd64-4cec-9818-3def4777fe97`
  - `email = labmanager.info@gmail.com`
- compatibilita wrapper legacy verificata con output atteso:
  - `accepted = true`
  - `version = terms_v1`
  - `privacy_accepted = true`
  - `privacy_version = privacy_v1`

**Output atteso**

- l'utente entra nel prodotto solo dopo il consenso legale

**Dipendenza**

- nessuna

---

### Fase 2 - Collegare l'app al record subscription

**Obiettivo**
Rendere `user_subscriptions` leggibile in modo reattivo dall'app.

**Da fare**

- [x] aggiungere `user_subscriptions` allo schema PowerSync
- [x] creare model `UserSubscription`
- [x] creare `SubscriptionRepository`
- [x] creare `subscriptionProvider`
- [x] creare `subscriptionStatusProvider`
- [x] creare `trialDaysRemainingProvider`

**File attesi nel repo app**

- `lib/models/user_subscription_model.dart`
- `lib/repository/subscription_repository.dart`
- `lib/providers/subscription_provider.dart`
- `powersync_service.dart`

**Output atteso**

- l'app sa leggere in tempo reale `trial`, `active`, `expired`

**Dipendenza**

- Fase 1 non blocca questa fase, ma idealmente va sviluppata in parallelo

---

### Fase 3 - Avviare il trial al primo login

**Obiettivo**
Creare automaticamente il record trial per chi entra per la prima volta.

**Da fare**

- [x] intercettare il primo login riuscito utile post-consenso legale
- [x] controllare se esiste gia un record in `user_subscriptions`
- [x] se non esiste:
  - creare record con `status = trial`
  - impostare `trial_start_date = now`
  - impostare `trial_end_date = now + 14 giorni`

**Nota**

Questa creazione deve avvenire solo dopo il consenso legale completato.

**Implementazione corrente**

- bootstrap instradato dal ramo `valid terms` di `auth_guard_wrapper`
- creazione trial delegata a `SubscriptionRepository.ensureTrialSubscriptionExists(...)`
- inserimento idempotente con `INSERT ... SELECT ... WHERE NOT EXISTS (...)`

**Output atteso**

- ogni utente autenticato ha un record subscription unico

**Dipendenza**

- Fase 1
- Fase 2

---

### Fase 4 - Bloccare l'accesso in base allo stato

**Obiettivo**
Fare in modo che l'app si comporti correttamente in tutti gli stati.

**Da fare**

- [x] creare `SubscriptionGuard`
- [x] avvolgere il contenuto principale dell'app
- [x] definire il comportamento:
  - `trial` -> accesso completo
  - `active` -> accesso completo
  - `expired` -> blocco accesso con placeholder minimo finche la Fase 5 non introduce il paywall reale

**File attesi nel repo app**

- `lib/widgets/common/subscription_guard.dart`
- router principale o `main.dart`

**Output atteso**

- nessun utente `expired` puo continuare a usare l'app

**Dipendenza**

- Fase 2
- Fase 3

---

### Fase 5 - Costruire il paywall

**Obiettivo**
Mostrare una schermata chiara quando il trial scade.

**Da fare**

- [x] creare `PaywallPage`
- [x] mostrare:
  - stato trial scaduto
  - piano mensile
  - piano annuale
  - CTA `Abbonati`
  - CTA `Contattaci`
- [x] aggiungere copy chiaro:
  - i dati non vengono cancellati
  - l'accesso si riattiva appena il pagamento va a buon fine
- [x] prevedere attivazione della `create-checkout-session` server-side dal bottone piano

**Implementazione corrente**

- `lib/pages/paywall_page.dart` mostra stato scaduto, piani mensile/annuale, CTA `Abbonati` e `Contattaci`
- il paywall invoca `create-checkout-session` e gestisce fallback se la checkout session non e disponibile o la function risponde con errore
- il copy conferma che i dati restano disponibili e che l'accesso si riattiva al pagamento

**File atteso nel repo app**

- `lib/pages/paywall_page.dart`

**Output atteso**

- il cliente capisce subito cosa fare per continuare

**Dipendenza**

- Fase 4

---

### Fase 6 - Aggiungere il banner trial

**Obiettivo**
Ricordare con discrezione che il trial sta per scadere.

**Da fare**

- [x] creare un banner visibile solo in stato `trial`
- [x] mostrare i giorni rimanenti
- [x] scegliere dove renderlo:
  - home dashboard
  - header
  - area notifiche interna

**Implementazione corrente**

- `lib/widgets/common/banner_periodo_prova.dart` mostra i giorni rimanenti e gestisce correttamente l'ultimo giorno
- il banner e renderizzato in `lib/pages/home_content_page.dart` nella home dashboard

**Output atteso**

- l'utente non arriva a scadenza senza preavviso

**Dipendenza**

- Fase 2

---

### Fase 7 - Preparare la configurazione Stripe server-driven

**Obiettivo**
Preparare il runtime server-side che risolve piano Stripe e URL di ritorno in base alla piattaforma.

**Da fare**

- [x] creare i prezzi mensile e annuale in Stripe Dashboard
- [x] salvare gli ID prezzo come secrets runtime della function `create-checkout-session`:
  - `STRIPE_PRICE_ID_MONTHLY`
  - `STRIPE_PRICE_ID_ANNUAL`
- [x] definire gli URL di ritorno per piattaforma come secrets runtime delle function:
  - `APP_BILLING_SUCCESS_URL_WINDOWS`
  - `APP_BILLING_CANCEL_URL_WINDOWS`
  - `APP_BILLING_SUCCESS_URL_ANDROID`
  - `APP_BILLING_CANCEL_URL_ANDROID`
  - `APP_BILLING_RETURN_URL_WINDOWS`
  - `APP_BILLING_RETURN_URL_ANDROID`
- [x] predisporre l'accesso al Customer Portal tramite `create-customer-portal-session`

**Implementazione corrente nel repo**

- `lib/pages/paywall_page.dart` invoca `create-checkout-session` con il piano selezionato
- `lib/repository/subscription_billing_repository.dart` aggiunge richiesta autenticata e `platform` alla chiamata della function
- `create-checkout-session` risolve lato server sia il prezzo Stripe corretto sia gli URL `success` e `cancel`
- `create-customer-portal-session` risolve lato server il `return_url`
- restano da fare fuori repo:
  - verificare i prezzi reali in Stripe
  - configurare le due edge function `create-checkout-session` e `create-customer-portal-session`
  - valorizzare gli URL di ritorno della piattaforma

**Env richiesti**

- function `create-checkout-session`:
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
- function `create-customer-portal-session`:
  - `STRIPE_SECRET_KEY`
  - `APP_BILLING_RETURN_URL_WINDOWS`
  - `APP_BILLING_RETURN_URL_ANDROID`
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - opzionale `STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID`

**Output atteso**

- dal paywall l'app apre la Checkout Session corretta senza dipendere da configurazione billing locale

**Dipendenza**

- Fase 5

---

### Fase 8 - Collegare il paywall alla Checkout Session

**Obiettivo**
Far partire davvero Stripe quando l'utente tocca il piano.

**Da fare**

- [x] collegare i bottoni del paywall a `create-checkout-session`
- [x] gestire loading
- [x] passare alla function il piano scelto e lasciare alla function la risoluzione server-side del resto
- [x] aprire il browser esterno / webview secondo il flusso deciso

**Implementazione corrente**

- `lib/pages/paywall_page.dart` invia il piano scelto alla Edge Function
- `lib/repository/subscription_billing_repository.dart` invia richieste autenticate con payload:
  - `create-checkout-session` -> `{ plan, platform }`
  - `create-customer-portal-session` -> `{ platform }`
- i CTA del paywall mostrano loading e bloccano doppi tap durante l'apertura del browser esterno
- il flusso deciso lato app usa `LaunchMode.externalApplication`
- `create-customer-portal-session` copre modifica abbonamento, cancellazione e gestione account dal cliente

**Test coperti**

- i test di billing ora vivono sul repository e sulle function; il test dedicato di `paywall_config` non esiste piu

**Output atteso**

- dal paywall si entra davvero nella Checkout Session del piano selezionato

**Dipendenza**

- Fase 5
- Fase 7

---

### Fase 9 - Implementare il webhook Stripe

**Obiettivo**
Aggiornare Supabase in modo automatico quando Stripe cambia stato.

**Da fare**

- [x] creare edge function `stripe-webhook`
- [x] impostare `verify_jwt = false`
- [x] verificare la firma con `STRIPE_WEBHOOK_SECRET`
- [x] gestire almeno questi eventi:
  - `checkout.session.completed`
  - `invoice.paid`
  - `invoice.payment_failed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
- [x] aggiornare `public.user_subscriptions`:
  - `active` su pagamento riuscito
  - `expired` su fallimento o cancellazione
- [x] leggere `client_reference_id` dal checkout per associare il pagamento al `user_id`
- [x] derivare il piano dal prezzo Stripe selezionato dalla function server-side
- [x] salvare:
  - `stripe_customer_id`
  - `stripe_subscription_id`
  - `subscription_plan`
  - `subscription_start_date`
  - `subscription_end_date`

**File atteso**

- `supabase/functions/stripe-webhook/index.ts`

**Implementazione corrente**

- `supabase/functions/stripe-webhook/index.ts` riceve solo `POST`, valida `stripe-signature` e usa `STRIPE_WEBHOOK_SECRET`
- il webhook aggiorna `public.user_subscriptions` solo se trova un match univoco sul record business
- `checkout.session.completed` usa:
  - `client_reference_id` -> `user_id`
  - il prezzo Stripe della sessione -> `monthly | annual`
- `invoice.paid` rinnova `status = active` e aggiorna le date del periodo corrente
- `invoice.payment_failed` forza `status = expired` e tronca `subscription_end_date` alla data evento per evitare accesso ancora attivo lato app
- `customer.subscription.updated` mantiene l'accesso valido mentre la subscription Stripe resta corrente, incluso `cancel_at_period_end`
- `customer.subscription.deleted` forza `status = expired` e salva anche metadati Stripe e date disponibili
- il webhook ignora eventi Stripe stale confrontando `event.created` con `updated_at` del record locale
- payload incompleti o lookup ambigui/non trovati non vengono confermati con `200` silenzioso:
  - `422` per payload inutilizzabile
  - `404` per record subscription mancante
  - `409` per lookup ambiguo o mismatch update

**Env richiesti**

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

**Test coperti in repo**

- `supabase/functions/stripe-webhook/logic.test.mjs` copre:
  - mapping prezzo Stripe -> piano business
  - derivazione periodo billing
  - patch `checkout.session.completed`
  - patch `invoice.paid`
  - patch `invoice.payment_failed` con revoca immediata accesso
  - patch `customer.subscription.updated`
  - patch `customer.subscription.deleted`
  - guardia `isWebhookEventStale(...)`

**Nota operativa**

- la logica core del webhook e testata localmente via Node
- non e ancora coperto in repo un test handler-level completo di `index.ts`
- la verifica runtime con `deno` / Supabase CLI resta da fare in Fase 10 / Fase 11

**Output atteso**

- Stripe aggiorna automaticamente lo stato business dell'utente

**Dipendenza**

- Fase 7

---

### Fase 10 - Configurare Stripe Dashboard

**Obiettivo**
Far puntare Stripe alle function e al Customer Portal corretti.

**Da fare**

- [x] verificare che prodotto e prezzi test esistano davvero
- [x] configurare endpoint webhook verso Supabase
- [x] copiare `whsec_...`
- [x] salvare `STRIPE_WEBHOOK_SECRET` nelle function
- [x] verificare che gli env delle function siano completi
- [x] configurare il Customer Portal

**Implementazione corrente nel repo**

- `supabase/functions/stripe-webhook/config.js` centralizza il load della config runtime della function
- il loader ora fallisce subito se mancano env critici di Fase 10:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
- il loader valida anche il caso operativo piu facile da sbagliare:
  - `STRIPE_WEBHOOK_SECRET` deve avere prefisso `whsec_`
- `supabase/functions/stripe-webhook/config.test.mjs` copre questi guardrail lato repo
- `docs/piani/pricing/2026-04-22-stripe-dashboard-runbook.md` documenta il setup manuale Stripe/Supabase ancora da eseguire fuori repo
- il runbook Fase 10 include anche preflight test, raccolta valori, sequenza happy path/failure e verifiche Stripe Workbench + Supabase

**Nota pratica**

- la configurazione manuale Dashboard-first risulta avviata:
  - prezzi mensile e annuale creati in Stripe test mode
  - endpoint Stripe configurato verso `https://ndlsifytatricfutjsvu.supabase.co/functions/v1/stripe-webhook`
  - parte dei secrets runtime billing risulta gia salvata in Supabase Dashboard
- la parte ancora aperta dopo Fase 10 non e scrivere altra logica applicativa, ma fare il test runtime finale di Fase 11 con app reale, eventi Stripe Workbench e verifica `user_subscriptions`
- l'app usa `create-checkout-session` e `create-customer-portal-session`
- per l'esecuzione pratica usa il runbook come checklist operativa

**Output atteso**

- Stripe e Supabase comunicano davvero

**Dipendenza**

- Fase 7
- Fase 9

---

### Fase 11 - Test end-to-end completo

**Obiettivo**
Verificare tutto il flusso reale senza interventi manuali.

**Scenario da testare**

- [ ] login riuscito con utente scaduto
- [ ] checkout session creata da Edge Function
- [ ] pagamento test Stripe
- [ ] webhook ricevuto
- [ ] stato aggiornato a `active`
- [ ] app sbloccata

**Scenario aggiuntivo**

- [ ] apertura Customer Portal
- [ ] `cancel_at_period_end`
- [ ] `customer.subscription.updated` -> accesso ancora valido
- [ ] `customer.subscription.deleted` -> account riportato a `expired`

**Output atteso**

- nessun passaggio manuale richiesto dopo il pagamento

**Dipendenza**

- Fase 1 -> Fase 10

---

### Fase 12 - Stabilizzazione operativa

**Obiettivo**
Rendere il sistema pronto all'uso reale.

**Da fare**

- [ ] preparare i messaggi WhatsApp di follow-up
- [ ] aggiornare onboarding commerciale
- [ ] creare tracker trial attivi
- [ ] raccogliere bug del primo giro di test
- [ ] decidere se automatizzare promemoria trial

**Output atteso**

- processo commerciale e tecnico allineati

---

## 5) Ordine pratico consigliato per i prossimi giorni

Stato attuale della roadmap in repo:

- Fase 1 tecnica completata lato app + database
- Fase 1 contenuti legali da finalizzare solo se cambia il testo definitivo
- Fase 2 completata
- Fase 3 completata
- Fase 4 completata
- Fase 9 completata nel repo, da validare operativamente con env reali e webhook Stripe

Per proseguire senza disperderti, da qui fai cosi:

1. considera questa roadmap chiusa come V1 tecnica, non come piano corrente finale
2. non investire altro tempo su flussi statici legacy e test E2E V1 come architettura definitiva
3. usa il runbook `docs/piani/pricing/2026-04-22-stripe-dashboard-runbook.md` come procedura attiva per setup e test operativi
4. usa `docs/superpowers/plans/2026-04-22-stripe-billing-server-driven-implementation.md` come piano tecnico di riferimento
5. rifai il test end-to-end completo solo sul flusso `Checkout Session + Customer Portal`

Nota di avanzamento:

- il gate legale e verificato su Supabase
- il prossimo step tecnico non e rifinire il flusso statico legacy, ma mantenere il billing server-driven
- il contratto webhook target resta basato su Checkout Session, Customer Portal e `public.user_subscriptions`
- il contratto target resta:
  - utente autenticato -> Edge Function checkout
  - Stripe Checkout / Customer Portal -> webhook
  - webhook -> update `public.user_subscriptions`

---

## 6) Criterio di completamento

Puoi considerare il progetto "chiuso" quando tutte queste condizioni sono vere:

- un utente nuovo entra in trial senza interventi manuali
- un utente scaduto vede sempre il paywall
- il piano si sceglie solo in app
- il pagamento aggiorna Supabase via webhook dopo `Checkout Session`
- l'app si sblocca automaticamente dopo il pagamento
- i casi di fallimento e cancellazione tornano a `expired`

---

## 7) Documenti di supporto

Questo file e storico V1 / archivio di implementazione.
Usa gli altri come riferimenti operativi per il flusso attivo server-driven:

- `docs/piani/pricing/2026-04-22-stripe-billing-server-driven-manual-checklist.md`
- `docs/piani/pricing/2026-04-22-stripe-dashboard-runbook.md`
- `docs/superpowers/plans/2026-04-22-stripe-billing-server-driven-implementation.md`
