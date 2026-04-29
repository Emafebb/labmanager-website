# Piano Test Reale - Stripe Billing Server-Driven

> Data: 2026-04-23
> Scopo: eseguire i test manuali reali del billing Stripe server-driven prima del passaggio live.
> Ambito: paywall, `create-checkout-session`, `create-customer-portal-session`, `stripe-webhook`, sincronizzazione `public.user_subscriptions`, UX app Windows e Android, ricevute Stripe, invoice/PDF, prova live controllata e verifiche SdI/regime forfettario.

---

## 1. Obiettivo del test

Questo piano serve a validare il flusso reale end-to-end:

- utente `expired` -> paywall -> Checkout Session Stripe
- pagamento test -> webhook -> `user_subscriptions = active`
- utente `active` -> Settings -> Customer Portal
- `cancel_at_period_end` -> accesso ancora valido
- chiusura definitiva subscription -> `user_subscriptions = expired`

Il go-live non va approvato finche i casi `P0` non risultano tutti `PASS`.

---

## 2. Regola di esecuzione

- usare solo ambiente Stripe `test mode`
- usare solo secrets `sk_test_...`, `price_...` e `whsec_...` di test
- usare un progetto Supabase di test o comunque un dataset che puoi sporcare senza impatto produzione
- registrare per ogni caso:
  - data e ora
  - utente test usato
  - piattaforma (`windows` o `android`)
  - evento Stripe osservato
  - screenshot o nota evidenza
  - esito `PASS | FAIL | BLOCCATO`

### 2.1 Modalita operativa consigliata per test assistiti

Per i test manuali guidati da AI, il flusso che ha funzionato meglio in questa sessione e stato:

1. eseguire un solo caso alla volta
2. prima di ogni caso, preparare:
   - obiettivo del test
   - setup esatto
   - passi operativi minimi
   - criterio `PASS | FAIL | BLOCCATO`
   - evidenze da restituire
3. far eseguire il test all'operatore senza mischiare casi diversi
4. raccogliere subito dopo:
   - screenshot
   - query SQL finale
   - eventuale evento Stripe osservato
   - eventuale log Supabase Edge Function
5. classificare il caso prima di passare al successivo
6. se emerge un blocco infrastrutturale, fermare la sequenza P0 e aprire un ramo investigativo dedicato

Regola pratica:

- non saltare al caso successivo finche il caso corrente non e `PASS` oppure esplicitamente parcheggiato come `BLOCCATO`
- in caso di blocco, chiedere solo il log minimo successivo utile, non una raccolta generica di screenshot

---

## 3. Gate pre-live

Prima del passaggio live devono essere veri tutti questi punti:

- tutti i casi `P0` sono `PASS`
- almeno un checkout `monthly` e uno `annual` sono stati verificati davvero
- almeno un test completo e stato eseguito su Windows
- almeno un test completo e stato eseguito su Android
- `checkout.session.completed`, `invoice.paid`, `customer.subscription.updated` e `customer.subscription.deleted` sono stati osservati almeno una volta in Workbench
- il Customer Portal si apre davvero dall'app
- `public.user_subscriptions` resta coerente con gli eventi Stripe
- non restano dubbi su redirect Windows, deep link Android e mapping dei secrets runtime

Se riusi lo stesso database per sandbox e live, il go-live e bloccato finche non hai deciso come gestire i `stripe_customer_id` e `stripe_subscription_id` di test gia salvati.

---

## 4. Dataset minimo consigliato

Prepara almeno questi utenti di test:

| ID | Stato iniziale | Uso |
| --- | --- | --- |
| `U1` | `expired`, nessun `stripe_customer_id` | checkout pulito da zero |
| `U2` | `active`, con `stripe_customer_id` e `stripe_subscription_id` | portal e lifecycle subscription |
| `U3` | `active`, `stripe_customer_id` vuoto o nullo | verifica CTA portal nascosta |
| `U4` | utente auth senza riga in `user_subscriptions` | verifica fallback e casi errore |

Se vuoi ridurre il numero account, puoi riusare `U1` dopo il primo acquisto come utente `active`, ma perdi isolamento tra i casi.

---

## 5. Query di verifica rapide

Compila `user_id` reale prima di eseguire.

```sql
select
  user_id,
  status,
  subscription_plan,
  stripe_customer_id,
  stripe_subscription_id,
  subscription_start_date,
  subscription_end_date,
  updated_at
from public.user_subscriptions
where user_id = '<USER_ID>';
```

Verifica per lookup Stripe:

```sql
select
  user_id,
  status,
  subscription_plan,
  stripe_customer_id,
  stripe_subscription_id,
  updated_at
from public.user_subscriptions
where stripe_customer_id = '<CUS_ID>'
   or stripe_subscription_id = '<SUB_ID>';
```

Verifica indici univoci:

```sql
select indexname
from pg_indexes
where schemaname = 'public'
  and tablename = 'user_subscriptions'
  and indexname in (
    'user_subscriptions_stripe_customer_id_key',
    'user_subscriptions_stripe_subscription_id_key'
  )
order by indexname;
```

Expected: `2 rows`.

---

## 6. Preflight obbligatorio

Segna tutto `OK` prima dei test runtime:

- [ ] `create-checkout-session`, `create-customer-portal-session` e `stripe-webhook` sono deployate
- [ ] `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID_MONTHLY`, `STRIPE_PRICE_ID_ANNUAL` sono coerenti con Stripe test mode
- [ ] `STRIPE_WEBHOOK_SECRET` corrisponde all'endpoint test attivo
- [ ] nel progetto Supabase non esistono secrets webhook duplicati o legacy senza owner chiaro, ad esempio `STRIPE_WEBHOOK_SECRET` e `WEBHOOK_SECRET`
- [ ] il signing secret dell'endpoint Stripe test attivo e stato verificato oggi in Workbench, non per memoria o da note precedenti
- [ ] `APP_BILLING_SUCCESS_URL_WINDOWS`, `APP_BILLING_CANCEL_URL_WINDOWS`, `APP_BILLING_RETURN_URL_WINDOWS` rispondono davvero via `https://`
- [ ] `APP_BILLING_SUCCESS_URL_ANDROID`, `APP_BILLING_CANCEL_URL_ANDROID`, `APP_BILLING_RETURN_URL_ANDROID` usano il deep link atteso
- [ ] Customer Portal default configurato oppure `STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID` valido
- [ ] `Customer emails > Successful payments` e abilitato in Stripe oppure esiste una decisione esplicita di inviare le ricevute fuori da Stripe
- [ ] query indici SQL restituisce `2 rows`
- [ ] l'utente `U1` arriva davvero al paywall
- [ ] l'utente `U2` entra davvero nella sezione impostazioni account

Baseline tecnica consigliata prima del test manuale:

```powershell
node --test supabase/functions/create-checkout-session/config.test.mjs supabase/functions/create-checkout-session/handler.test.mjs
node --test supabase/functions/create-customer-portal-session/config.test.mjs supabase/functions/create-customer-portal-session/handler.test.mjs
node --test supabase/functions/stripe-webhook/config.test.mjs supabase/functions/stripe-webhook/logic.test.mjs supabase/functions/stripe-webhook/handler.test.mjs
flutter test test/repository/subscription_billing_repository_test.dart test/pages/paywall_page_test.dart test/widgets/common/subscription_guard_test.dart test/unit/widgets/settings/account_subscription_management_card_test.dart
```

---

## 7. Casi P0 - Bloccanti go-live

### P0-01 - Guard `expired` mostra il paywall

**Stato:** `PASS` (`windows`, verificato il `23 aprile 2026`)

**Setup:** login con `U1`.

**Passi:**

1. apri l'app
2. attendi il caricamento stato subscription

**Atteso:**

- non entri nel contenuto protetto
- vedi `Abbonamento scaduto` oppure `Prova conclusa`
- sono visibili i piani `Mensile` e `Annuale`
- il piano `Annuale` e marcato `Consigliato`

### P0-02 - Checkout annuale Windows da utente senza customer Stripe

**Stato:** `PASS` (`windows`, verificato il `23 aprile 2026`)

**Setup:** `U1`, piattaforma `windows`, `stripe_customer_id` vuoto o nullo.

**Passi:**

1. dal paywall premi `Scegli il piano annuale`
2. completa il pagamento test in Stripe Checkout
3. attendi la consegna webhook
4. torna nell'app

**Atteso Stripe:**

- si apre una Checkout Session reale
- viene creato un customer Stripe nuovo
- vengono consegnati almeno `checkout.session.completed` e `invoice.paid`

**Atteso DB:**

- `status = active`
- `subscription_plan = annual`
- `stripe_customer_id` valorizzato
- `stripe_subscription_id` valorizzato
- `subscription_start_date` e `subscription_end_date` coerenti

**Atteso app:**

- il paywall scompare
- l'utente entra nel contenuto protetto

### P0-03 - Checkout mensile Windows

**Stato:** `PASS` (`windows`, verificato il `23 aprile 2026`)

**Setup:** utente `expired`, piattaforma `windows`.

**Passi:**

1. dal paywall premi `Preferisco il mensile`
2. completa il pagamento test
3. attendi il webhook

**Atteso:**

- `subscription_plan = monthly`
- accesso riattivato
- in Stripe la session usa il `price_...` mensile corretto

### P0-04 - Checkout annuale Android

**Stato:** `PASS` (`android`, verificato il `24 aprile 2026`)

**Setup:** utente `expired`, piattaforma `android`.

**Passi:**

1. dal paywall Android premi il piano annuale
2. completa il pagamento test
3. verifica il ritorno via deep link

**Atteso:**

- checkout aperto correttamente da Android
- redirect di successo compatibile con `labmanager://billing/success`
- row `user_subscriptions` aggiornata a `active`
- accesso riattivato in app

### P0-05 - Checkout cancel Windows

**Stato:** `PASS` (`windows`, verificato il `23 aprile 2026`)

**Setup:** utente `expired`, piattaforma `windows`.

**Passi:**

1. apri il checkout dal paywall
2. annulla prima del pagamento
3. torna all'app o alla return page prevista

**Atteso:**

- nessun pagamento completato
- nessun passaggio a `active`
- il paywall resta visibile
- nessun `stripe_subscription_id` nuovo associato al record

### P0-06 - Checkout cancel Android

**Stato:** `PASS` (`android`, verificato il `24 aprile 2026`)

**Setup:** utente `expired`, piattaforma `android`.

**Passi:**

1. apri checkout da Android
2. annulla
3. verifica il deep link di cancel

**Atteso:**

- ritorno corretto con `labmanager://billing/cancel`
- utente ancora bloccato dal paywall
- nessuna attivazione erronea nel DB

### P0-07 - Reuse del customer Stripe su secondo checkout

**Stato:** `PASS` (`windows`, verificato il `23 aprile 2026`)

**Setup:** utente con `stripe_customer_id` gia valorizzato.

**Passi:**

1. lancia un nuovo checkout dallo stesso account test
2. non completare il pagamento, basta aprire la sessione

**Atteso:**

- Stripe non crea un nuovo customer
- la Checkout Session usa lo stesso `cus_...` gia presente nel DB

### P0-08 - CTA `Gestisci abbonamento` visibile solo con customer Stripe valido

**Stato:** `PASS` (`windows`, verificato il `23 aprile 2026`)

**Setup:** confronta `U2` e `U3`.

**Passi:**

1. apri `Impostazioni > Account` con `U2`
2. ripeti con `U3`

**Atteso:**

- con `U2` il bottone `Gestisci abbonamento` e visibile
- con `U3` il bottone non e mostrato

**Nota emersa dal test:**

- il comportamento attuale e coerente con il contratto tecnico
- lato UX resta pero un gap: un utente ancora in trial senza `stripe_customer_id` non vede `Gestisci abbonamento`, ma non ha nemmeno una CTA alternativa per abbonarsi prima della fine prova
- da valutare un bottone `Abbonati` in `Impostazioni > Account` quando il portal non e apribile e l'utente puo ancora avviare un checkout

### P0-09 - Apertura Customer Portal Windows

**Stato:** `PASS` (`windows`, verificato il `23 aprile 2026`)

**Setup:** `U2`, piattaforma `windows`.

**Passi:**

1. apri `Impostazioni > Account`
2. premi `Gestisci abbonamento`

**Atteso:**

- il bottone passa a stato `Apertura...`
- si apre il Customer Portal reale
- il return URL usato e quello Windows

### P0-10 - Apertura Customer Portal Android

**Stato:** `PASS` (`android`, verificato il `24 aprile 2026`)

**Setup:** `U2`, piattaforma `android`.

**Passi:**

1. apri `Impostazioni > Account`
2. premi `Gestisci abbonamento`

**Atteso:**

- il portale si apre
- il return URL Android e coerente con il deep link previsto

### P0-11 - `cancel_at_period_end` mantiene accesso attivo

**Stato:** `PASS` (`windows`, verificato il `23 aprile 2026`)

**Setup:** `U2` attivo con subscription valida.

**Passi:**

1. apri il Customer Portal
2. imposta la cancellazione a fine periodo
3. attendi `customer.subscription.updated`
4. rientra in app

**Atteso Stripe:**

- `cancel_at_period_end = true`
- Workbench mostra `customer.subscription.updated`

**Atteso DB:**

- `status = active`
- `subscription_end_date` resta uguale alla fine periodo Stripe

**Atteso app:**

- nessun paywall immediato
- utente ancora dentro l'app

### P0-12 - Riattivazione prima della fine periodo

**Stato:** `PASS` (`windows`, verificato il `23 aprile 2026`)

**Setup:** usa la stessa subscription del caso precedente.

**Passi:**

1. dal Customer Portal annulla la cancellazione programmata
2. attendi un nuovo `customer.subscription.updated`

**Atteso:**

- accesso ancora `active`
- niente paywall
- record DB ancora coerente con la subscription corrente

### P0-13 - `customer.subscription.deleted` riporta l'account a `expired`

**Stato:** `PASS` (`windows`, verificato il `23 aprile 2026`)

**Setup:** subscription test che puo essere chiusa.

**Passi:**

1. elimina o termina la subscription in ambiente test
2. attendi `customer.subscription.deleted`
3. riapri l'app

**Atteso:**

- `status = expired`
- il paywall torna visibile
- `stripe_customer_id` e `stripe_subscription_id` restano tracciati

### P0-14 - `invoice.paid` rinnova il periodo corretto

**Stato:** `PASS` (`windows`, verificato il `23 aprile 2026` dopo correzione configurazione webhook Stripe test e replay evento)

**Setup:** subscription che puo generare un rinnovo reale o simulato in test.

**Passi:**

1. genera il rinnovo o usa il meccanismo test disponibile nel tenant Stripe
2. attendi `invoice.paid`

**Atteso:**

- il record resta `active`
- `subscription_start_date` e `subscription_end_date` vengono riallineate al nuovo periodo

---

## 8. Casi P1 - Negativi da eseguire in ambiente test dedicato

Questi casi non richiedono il go-live per essere approvati, ma vanno coperti prima della chiusura della fase billing.

### P1-01 - Utente senza riga `user_subscriptions`

**Setup:** `U4`.

**Atteso:**

- il guard blocca l'accesso
- non entri nell'app
- il comportamento resta controllato e non rompe la UI

### P1-02 - Sessione utente non valida

**Passi consigliati:**

1. invalida la sessione del device o usa logout remoto
2. prova ad aprire checkout o portal

**Atteso:**

- l'operazione fallisce senza crash
- lato utente appare messaggio di sessione non valida

### P1-03 - Portal con customer mancante nello stesso account Stripe

**Stato:** `PASS` (`windows`, verificato il `23 aprile 2026`)

**Setup:** forza nel DB un `stripe_customer_id` che non esiste nell'account test.

**Atteso:**

- il portal non si apre
- compare il messaggio:
  `Cliente Stripe non trovato. Verifica che il customer test appartenga allo stesso account della secret key.`

### P1-04 - Portal non configurato

**Setup:** tenant test senza default portal config oppure config dedicata rimossa.

**Atteso:**

- il portal non si apre
- compare il messaggio:
  `Customer Portal non configurato in Stripe Dashboard. Crea o abilita la configurazione di default.`

### P1-05 - Return URL non valida

**Setup:** modifica temporaneamente `APP_BILLING_RETURN_URL_WINDOWS` con valore non valido nel tenant di test.

**Atteso:**

- il portal non si apre
- compare il messaggio:
  `Return URL del portale non valida. Controlla APP_BILLING_RETURN_URL_WINDOWS.`

### P1-06 - Portal configuration ID non valido

**Setup:** imposta un `STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID` errato nel tenant di test.

**Atteso:**

- il portal non si apre
- compare il messaggio:
  `Configurazione Customer Portal non valida. Controlla STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID.`

### P1-07 - Stripe secret key errata

**Setup:** tenant di test con `STRIPE_SECRET_KEY` volutamente errata.

**Atteso:**

- il portal non si apre
- compare il messaggio:
  `STRIPE_SECRET_KEY non valida per questo ambiente. In sandbox usa una sk_test dello stesso account Stripe.`

### P1-08 - `invoice.payment_failed`

**Stato:** `PASS` (`windows`, verificato il `23 aprile 2026` con `pm_card_chargeCustomerFail`, test clock Stripe e ritorno al paywall in app)

**Setup:** subscription test con carta che forza il fallimento rinnovo oppure simulazione equivalente disponibile nel tenant.

**Atteso:**

- Workbench mostra `invoice.payment_failed`
- `status = expired`
- `subscription_end_date` viene clampata al momento evento
- il paywall torna visibile dopo refresh/sync app

### P1-09 - Email automatica ricevuta / paid invoice

**Stato:** `PASS` (`configurazione Stripe test verificata il 23 aprile 2026`)

**Setup:** `Customer emails > Successful payments` attivo in Stripe e customer con email valorizzata.

**Passi:**

1. completa un pagamento riuscito via Checkout oppure genera un rinnovo subscription riuscito
2. verifica in Stripe Dashboard il dettaglio del pagamento o della invoice
3. controlla se Stripe registra la receipt / email invoice come inviata al customer

**Atteso:**

- Stripe risulta configurato per inviare email su pagamenti riusciti
- per un pagamento live, il customer riceve automaticamente la receipt / paid invoice email da Stripe
- in sandbox, se l'email non appartiene a un utente verificato o con accesso al testing environment, il test puo essere limitato: in quel caso va almeno verificato che il toggle sia attivo e che il resend manuale sia disponibile dal Dashboard
- il toggle `Pagamenti riusciti` in `settings/emails` risulta `ON` nel tenant Stripe test
- in `Billing > Abbonamenti ed email` risultano attivi anche:
  - `Invia email per i rinnovi imminenti`
  - `Invia email per le carte in scadenza`
  - `Invia email quando i pagamenti tramite carta hanno esito negativo`
  - `Invia email quando i pagamenti tramite addebito bancario hanno esito negativo`
  - `Includi un link per la gestione dell'abbonamento da parte dei clienti`
  - `Collegamento al portale cliente di Stripe`

**Nota:**

- questa verifica non sostituisce il controllo fiscale sul documento da emettere lato Italia
- la receipt Stripe copre la comunicazione di pagamento, ma va comunque deciso se basta per il tuo processo amministrativo oppure se serve una fattura emessa con flusso separato
- i reminder configurati in `Billing > Abbonamenti ed email` coprono comunicazioni operative lato subscription, ma non sostituiscono la receipt inviata da `settings/emails > Pagamenti riusciti`

---

## 9. Casi P2 - Diagnostica avanzata consigliata

### P2-01 - Replay evento stale

**Stato:** `PASS` (`windows`, verificato il `24 aprile 2026`)

**Obiettivo:** verificare che un vecchio evento non riporti il record a uno stato precedente.

**Passi:**

1. porta il record a uno stato piu recente
2. riesegui dal Workbench un evento precedente

**Atteso:**

- il webhook risponde senza errore tecnico
- il record non torna indietro
- l'evento viene ignorato come `stale_event`

### P2-02 - Doppio tap sul paywall

**Stato:** `PASS` (`windows`, verificato il `24 aprile 2026`)

**Obiettivo:** verificare che un doppio click non apra due sessioni.

**Atteso:**

- il bottone passa a `Apertura...`
- viene aperta una sola sessione checkout

### P2-03 - Fallimento apertura browser esterno

**Stato:** copertura `checkout` `PASS` (`windows`, verificato il `24 aprile 2026` tramite widget test mirato); ramo `Customer Portal` non forzato manualmente.

**Obiettivo:** verificare il fallback UX se il sistema non riesce ad aprire l'URL.

**Atteso paywall:**

- messaggio `Impossibile aprire il checkout di ...`

**Atteso settings:**

- info bar `Portale non disponibile`

---

## 10. Evidenze minime da salvare

Per ogni caso `P0` salva almeno:

- screenshot UI iniziale
- screenshot o nota del passaggio Stripe
- ID evento Workbench osservato
- query SQL finale del record `user_subscriptions`
- esito finale `PASS | FAIL`
- per ricevute, invoice, email e live controllata, compilare anche il registro della sezione 12.3

---

## 11. Go / No-Go finale

Segna `GO` solo se:

- [ ] tutti i `P0` sono `PASS`
- [ ] nessun `P1` aperto e classificato come bloccante
- [ ] i redirect Windows e Android sono entrambi confermati
- [ ] portal e checkout usano davvero lo stesso ambiente Stripe di test
- [ ] non esistono riferimenti sandbox da trascinare in live senza piano di cutover

Segna `NO-GO` se capita uno di questi casi:

- checkout apre ma il webhook non aggiorna il DB
- portal apre solo su una piattaforma
- `cancel_at_period_end` espelle subito l'utente dall'app
- un replay stale sovrascrive uno stato piu nuovo
- non e chiaro come separare i dati Stripe test da quelli live
- persiste `invalid_signature` sul webhook test oppure non e chiaro quale `whsec_...` appartenga davvero all'endpoint Stripe attivo

---

## 12.1 Registro sessione 2026-04-23

Stato sintetico della sessione manuale eseguita il `23 aprile 2026`.

| Caso | Piattaforma | Esito | Nota |
| --- | --- | --- | --- |
| `P0-01` guard `expired` mostra il paywall | `windows` | `PASS` | paywall visibile con copy coerente, piani `Mensile` e `Annuale`, badge `Consigliato` presente |
| `P0-02` checkout annuale Windows | `windows` | `PASS` | blocco webhook risolto; replay `checkout.session.completed` consegnato `200`, DB riallineato `active/annual`, app sbloccata anche dopo logout/login |
| `P0-03` checkout mensile Windows | `windows` | `PASS` | checkout mensile completato, DB riallineato `active/monthly`, pagina `billing/success` corretta e app sbloccata |
| `P0-05` checkout cancel Windows | `windows` | `PASS` | ritorno corretto su `billing/cancel`, nessuna subscription creata, record non passato a `active`, paywall ancora visibile |
| `P0-07` reuse del customer Stripe su secondo checkout | `windows` | `PASS` | seconda Checkout Session aperta senza pagamento; Stripe riusa il `cus_...` gia presente nel DB |
| `P0-08` CTA `Gestisci abbonamento` visibile solo con customer Stripe valido | `windows` | `PASS` | con customer valido la CTA e visibile; senza `stripe_customer_id` resta nascosta. Emerso follow-up UX: mostrare `Abbonati` durante il trial |
| `P0-09` apertura Customer Portal Windows | `windows` | `PASS` | Customer Portal reale aperto dall'app con return URL Windows coerente |
| `P0-11` `cancel_at_period_end` mantiene accesso attivo | `windows` | `PASS` | cancellazione programmata a fine periodo dal portal; DB rimasto `active` con fine periodo invariata e nessun paywall immediato |
| `P0-12` riattivazione prima della fine periodo | `windows` | `PASS` | cancellazione programmata rimossa dal portal; subscription tornata in stato normale senza perdita accesso |
| `P0-13` `customer.subscription.deleted` riporta l'account a `expired` | `windows` | `PASS` | subscription terminata in Stripe, DB passato a `expired` con `subscription_end_date` clampata al momento evento e paywall di nuovo visibile |
| `P0-14` `invoice.paid` rinnova il periodo corretto | `windows` | `PASS` | primo tentativo `FAIL` per endpoint test configurato sugli eventi sbagliati; dopo fix config (`invoice.paid` + `customer.subscription.updated`) e replay CLI dell'evento, DB riallineato al nuovo periodo |
| `P1-03` portal con customer mancante nello stesso account Stripe | `windows` | `PASS` | forzato `stripe_customer_id` non esistente nel tenant test; il portal non si apre e l'app mostra `Portale non disponibile` con messaggio `Cliente Stripe non trovato...` |
| `P1-08` `invoice.payment_failed` | `windows` | `PASS` | impostato `pm_card_chargeCustomerFail` sulla subscription mensile attiva; avanzando il test clock Stripe compare `invoice.payment_failed`, il DB passa a `expired` e il paywall torna visibile |
| `P1-09` email automatica ricevuta / paid invoice | `stripe config` | `PASS` | `settings/emails > Pagamenti riusciti` verificato `ON`; attivati anche reminder subscription e link gestione abbonamento in `Billing > Abbonamenti ed email` |

Evidenze chiave raccolte:

- su `Windows`, il paywall applicativo si comporta correttamente
- su `Chrome`, Stripe Checkout ha mostrato skeleton infinito; su `Edge`, la pagina Checkout ha renderizzato correttamente
- il pagamento test annuale e arrivato fino alla pagina `https://pastrylabmanager.com/billing/success`
- in Stripe la subscription test risulta creata e attiva
- durante l'indagine il webhook `checkout.session.completed` ha risposto prima `500`, poi `400 invalid_signature` durante i replay manuali
- il replay finale del `23 aprile 2026` alle `10:52:47 CEST` e stato consegnato con `200` e body `{"received": true}`
- la riga `public.user_subscriptions` per `1ec05d22-b540-4aca-a2ce-7ceb9cf64ce8` e stata aggiornata a:
  - `status = active`
  - `subscription_plan = annual`
  - `stripe_customer_id = cus_UO3WzZzoqSam19`
  - `stripe_subscription_id = sub_1TPHdoQ5sgTMZ0uDqYqSvEHk`
  - `subscription_start_date = 2026-04-23 07:25:38+00`
  - `subscription_end_date = 2027-04-23 07:25:38+00`
- lato app Windows, alla ricezione dello stato aggiornato l'utente e passato direttamente alla home senza paywall; verifica confermata anche dopo logout/login
- il checkout mensile Windows e stato completato con ritorno corretto su `billing/success`, aggiornamento DB a `active/monthly` e accesso riattivato lato app
- il test di cancel Windows e tornato correttamente su `billing/cancel`; nessuna subscription e stata creata e il paywall e rimasto visibile
- un secondo checkout aperto sullo stesso account con `stripe_customer_id` gia presente ha riusato lo stesso customer Stripe
- in `Impostazioni > Account`, la CTA `Gestisci abbonamento` compare solo quando `stripe_customer_id` e valido; emerso gap UX da backlog: mostrare una CTA `Abbonati` per utenti in trial senza customer Stripe
- il Customer Portal Windows si e aperto correttamente dall'app e ha permesso la gestione reale della subscription
- la cancellazione `cancel_at_period_end` ha lasciato il record `active` con fine periodo invariata e senza paywall immediato
- la riattivazione dal Customer Portal ha rimosso correttamente la cancellazione programmata
- la chiusura definitiva della subscription ha prodotto `customer.subscription.deleted`, update DB a `expired` e ritorno del paywall in app
- il rinnovo simulato della subscription mensile ha prodotto `invoice.paid`; dopo replay sull'endpoint corretto il DB si e riallineato a:
  - `status = active`
  - `subscription_plan = monthly`
  - `stripe_customer_id = cus_UO5IcbhQnFHWp6`
  - `stripe_subscription_id = sub_1TPJtRQ5sgTMZ0uDPD2nMIpf`
  - `subscription_start_date = 2026-06-23 09:49:55+00`
  - `subscription_end_date = 2026-07-23 09:49:55+00`
- forzando nel DB uno `stripe_customer_id` non presente nello stesso account Stripe test, il Customer Portal Windows non si e aperto e l'app ha mostrato l'info bar `Portale non disponibile` con dettaglio `Cliente Stripe non trovato. Verifica che il customer test appartenga allo stesso account della secret key.`
- per la subscription mensile `sub_1TPJtRQ5sgTMZ0uDPD2nMIpf`, via Stripe CLI e stato attachato `pm_card_chargeCustomerFail` al customer `cus_UO5IcbhQnFHWp6` e impostato come `default_payment_method` della subscription
- avanzando il test clock `clock_1TPJz4Q5sgTMZ0uDk1jkWBHZ` fino al `23 luglio 2026 12:50:00` ora Italia, Stripe ha emesso `invoice.payment_failed` (`evt_1TPOJ3Q5sgTMZ0uDyGmpHZBq`) per l'invoice `in_1TPOFNQ5sgTMZ0uDAUoDIOs2`
- dopo `invoice.payment_failed`, la riga `public.user_subscriptions` per `1ec05d22-b540-4aca-a2ce-7ceb9cf64ce8` e passata a:
  - `status = expired`
  - `subscription_plan = monthly`
  - `stripe_customer_id = cus_UO5IcbhQnFHWp6`
  - `stripe_subscription_id = sub_1TPJtRQ5sgTMZ0uDPD2nMIpf`
  - `subscription_end_date = 2026-04-23 14:32:36+00`
  - `updated_at = 2026-04-23 14:32:39.806031+00`
- dopo refresh/riapertura dell'app Windows, il paywall e tornato visibile anche nel caso `P1-08`
- in Workbench sono stati osservati almeno una volta `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated` e `customer.subscription.deleted`
- in `settings/emails`, il toggle `Pagamenti riusciti` e stato verificato `ON` per l'invio automatico delle receipt / paid invoice email
- in `Billing > Abbonamenti ed email` sono stati attivati i reminder per rinnovi imminenti, carte in scadenza, pagamenti falliti e il link di gestione abbonamento verso il Customer Portal Stripe

Root cause e risoluzione del blocco:

- il problema non era nel paywall, non era nell'apertura del browser, non era nel pagamento Stripe
- il blocco era nel tratto `Stripe -> stripe-webhook -> Supabase DB`
- il secret dell'endpoint Stripe test attivo e stato verificato come coerente con `STRIPE_WEBHOOK_SECRET`
- il body ricevuto e la firma `Stripe-Signature` risultavano corretti; il mismatch non era dovuto al `whsec_...`
- root cause tecnica individuata nel runtime Edge: la funzione usava il path sincrono `stripe.webhooks.constructEvent(...)`
- con `stripe@18.5.0` in ambiente Edge/Web il path corretto e `await stripe.webhooks.constructEventAsync(...)`
- applicata fix minima nel webhook, verificata con test locali del modulo, deployata la sola `stripe-webhook`
- la diagnostica temporanea usata per isolare il problema e stata rimossa dopo la conferma del fix
- `WEBHOOK_SECRET` resta una configurazione legacy da chiarire/ripulire, ma non e stato il fattore bloccante del caso `P0-02`
- sul tenant Stripe test l'endpoint webhook era configurato con `invoice.payment_succeeded` invece di `invoice.paid` e senza `customer.subscription.updated`
- questo ha lasciato scoperti i casi di rinnovo e lifecycle subscription, pur con handler applicativo corretto lato repo
- corretta la destinazione webhook test selezionando: `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted`
- il replay CLI di `evt_1TPK45Q5sgTMZ0uDWdcYywxo` verso `we_1TOw1OQ5sgTMZ0uDeAVye5Op` ha confermato il riallineamento del DB sul rinnovo mensile

Decisione operativa:

- il blocco sul webhook signature/runtime e chiuso
- `P0-02` puo essere classificato `PASS`
- il gap di configurazione eventi sull'endpoint webhook test e stato identificato e corretto
- lato `windows`, risultano `PASS` i casi `P0-01`, `P0-02`, `P0-03`, `P0-05`, `P0-07`, `P0-08`, `P0-09`, `P0-11`, `P0-12`, `P0-13`, `P0-14`
- tra i negativi `windows`, risultano `PASS` anche `P1-03` e `P1-08`
- al `24 aprile 2026`, anche i casi `P0` Android `P0-04`, `P0-06` e `P0-10` risultano `PASS`
- tutti i casi `P0` del piano risultano coperti e `PASS`

## 12.2 Registro sessione 2026-04-24

Stato sintetico della sessione manuale eseguita il `24 aprile 2026`.

| Caso | Piattaforma | Esito | Nota |
| --- | --- | --- | --- |
| `P0-04` checkout annuale Android | `android` | `PASS` | paywall Android visibile, Checkout annuale aperto, pagamento completato, ritorno in app via deep link e DB aggiornato `active/annual` |
| `P0-06` checkout cancel Android | `android` | `PASS` | dopo annullamento Checkout Android torna al paywall; DB resta `expired`, senza `stripe_subscription_id`; Stripe customer creato ma nessuna subscription associata |
| `P0-10` apertura Customer Portal Android | `android` | `PASS` | da `Impostazioni > Account`, `Gestisci abbonamento` apre il Customer Portal reale su Android senza errore `Portale non disponibile` |
| `P2-01` replay evento stale | `windows` | `PASS` | replay CLI del vecchio `invoice.paid` `evt_1TPK45Q5sgTMZ0uDWdcYywxo`; il record e rimasto `expired` e non e tornato `active` |
| `P2-02` doppio tap sul paywall | `windows` | `PASS` | il bottone del piano passa a `Apertura...`, risulta disabilitato e si apre una sola pagina Stripe Checkout |
| `P2-03A` fallimento apertura browser esterno checkout | `windows` | `PASS` | verificato con widget test mirato: `flutter test test/pages/paywall_page_test.dart --plain-name "mostra un feedback se l apertura esterna del checkout fallisce"` restituisce `All tests passed`; coperto solo il ramo checkout |

Nota `P2-03`:

- il ramo `checkout` e coperto
- il ramo `Customer Portal` non e stato forzato manualmente per evitare modifiche invasive alle associazioni browser/default app di Windows
- nel codice il fallback portal previsto mostra info bar `Portale non disponibile`, ma non esiste al momento una injection pulita del launcher analoga al paywall per forzare il failure in test manuale

---

## 12.3 Test ricevute, fatture e live controllata

> Origine: `docs/piani/pricing/stripe/2026-04-24-piano-verifica-ricevute-fatture-stripe-regime-forfettario.md`.
> Questa sezione centralizza i test aggiunti nel piano forfettario. Il documento forfettario resta dedicato a implementazione, vincoli e runbook operativo.

### Piano test operativo ricevute/fatture e live

#### T0 - Decisione fiscale prima dei test live

Obiettivo: non generare pagamenti live senza sapere come fatturarli.

Passi:

1. confermare con commercialista che ogni `invoice.paid` Stripe deve generare una e-fattura SdI
2. confermare i dati minimi da raccogliere per ogni cliente
3. scegliere Opzione A, B o C dalla sezione 4
4. creare un registro evidenze condiviso

PASS:

- esiste una decisione scritta sul processo e-fattura
- e chiaro chi emette la fattura e quando

NO-GO:

- si conta solo sulla receipt Stripe come documento fiscale
- non e chiaro come ottenere codice fiscale / partita IVA / codice destinatario / PEC

#### T1 - Nuovo abbonamento in sandbox con email testabile

Setup:

- Stripe sandbox
- customer con email appartenente a team member Stripe o dominio verificato
- utente app `expired`

Passi:

1. completare Checkout Session annuale o mensile
2. osservare `checkout.session.completed`
3. osservare `invoice.paid`
4. aprire la invoice in Stripe Dashboard
5. verificare `hosted_invoice_url` e `invoice_pdf`
6. aprire Customer page e verificare email logs
7. se l'email non parte per limiti sandbox, usare resend manuale dal Dashboard e registrare la limitazione

PASS:

- invoice Stripe in stato `paid`
- receipt / paid invoice disponibile
- email log mostra receipt paid invoice oppure limitazione sandbox documentata
- DB `public.user_subscriptions` passa ad `active`

#### T2 - Rinnovo subscription in sandbox

Setup:

- subscription su test clock
- customer con email testabile
- `Successful payments` attivo

Passi:

1. avanzare test clock al rinnovo
2. osservare `invoice.paid`
3. verificare nuova invoice periodica
4. verificare email log receipt paid invoice
5. verificare PDF invoice e invoice receipt
6. verificare update DB del nuovo periodo

PASS:

- nuova invoice `paid`
- nuovo evento `invoice.paid`
- email/log receipt o limitazione sandbox documentata
- `subscription_start_date` e `subscription_end_date` aggiornate

#### T3 - Pagamento fallito e recovery email

Setup:

- subscription con payment method che fallisce
- failed payment emails attive

Passi:

1. forzare fallimento rinnovo
2. osservare `invoice.payment_failed`
3. verificare email log failed payment
4. verificare link Stripe-hosted o Customer Portal per aggiornare metodo pagamento
5. verificare app torna a paywall secondo comportamento gia definito

PASS:

- fallimento tracciato in Stripe
- email recovery tracciata o limitazione sandbox documentata
- DB coerente con policy applicativa

#### T4 - Customer Portal e storico documenti

Setup:

- utente attivo con `stripe_customer_id`

Passi:

1. aprire Customer Portal dall'app
2. verificare che il cliente possa vedere o raggiungere invoice/receipt disponibili
3. verificare che il link gestione abbonamento nelle email punti al portal corretto

PASS:

- portal coerente con customer giusto
- invoice/receipt accessibili al cliente

#### T5 - Prova Android residua

Integrare con i P0 Android gia aperti:

- `P0-04` checkout annuale Android
- `P0-06` checkout cancel Android
- `P0-10` apertura Customer Portal Android

In aggiunta, per `P0-04` verificare anche:

- invoice `paid`
- `invoice_pdf`
- email log receipt paid invoice
- eventuale limitazione sandbox

#### T6 - Prova live controllata

Da fare solo dopo T0.

Opzioni:

- usare un vero acquisto controllato al prezzo reale
- creare un prodotto/prezzo live temporaneo di importo basso, se accettato dal commercialista

Passi:

1. confermare T0: processo SdI scritto, responsabile emissione e-fattura e dati fiscali minimi disponibili
2. in Stripe live, verificare `Successful payments` ON e `Invia fatture finalizzate...` OFF se resta il requisito di non inviare fattura automatica
3. in Stripe live, creare/verificare prezzi mensile e annuale e creare il webhook copiando endpoint ed eventi dal webhook test gia verificato
4. in Supabase, impostare `STRIPE_BILLING_ENV=live` e i secrets `_LIVE`, lasciando invariati i secrets test senza suffisso
5. redeployare `create-checkout-session`, `create-customer-portal-session` e `stripe-webhook` per evitare cache di config/client precedenti
6. pulire l'utente `emanuele.lucania@gmail.com` solo se contiene ancora riferimenti Stripe sandbox `cus_...` o `sub_...`
7. accedere con `emanuele.lucania@gmail.com` e completare un pagamento live annuale controllato
8. inserire il codice promozionale live 99% nel Checkout, per esempio `TESTLIVE99`
9. verificare che il totale sia il 1% del prezzo annuale live e completare il pagamento con carta reale
10. non cliccare manualmente `Invia ricevuta` dalla Dashboard
11. verificare consegna email effettiva in casella Gmail, incluse spam/promozioni
12. verificare Stripe live: Checkout Session `complete`, Subscription `active`, Invoice `paid`, Charge `succeeded`, sconto 99%, importo pagato coerente, `receipt_email` corretto e `receipt_number` non-null
13. verificare webhook live consegnato `200 OK` e DB app aggiornato ad `active/annual` con nuovi `cus_...` e `sub_...` live
14. emettere e-fattura SdI secondo il processo scelto
15. registrare protocollo/esito SdI, conservazione ed evidenze nel registro
16. se il test non coincide con go-live definitivo, annullare/rimborsare se necessario e riportare `STRIPE_BILLING_ENV` a `test` o rimuoverlo, poi redeployare le funzioni

PASS:

- email Stripe ricevuta davvero
- invoice Stripe live e pagata
- app attiva l'abbonamento
- fattura elettronica SdI emessa e accettata

NO-GO:

- pagamento live riuscito ma nessun processo e-fattura completato
- email Stripe non consegnata e non c'e fallback
- dati fiscali cliente insufficienti

---

### Registro evidenze pagamenti e documenti

Per ogni pagamento riuscito:

| Campo | Valore |
| --- | --- |
| Data/ora pagamento |  |
| Ambiente | test / live |
| User ID app |  |
| Customer ID Stripe | `cus_...` |
| Subscription ID Stripe | `sub_...` |
| Invoice ID Stripe | `in_...` |
| PaymentIntent / Charge | `pi_...` / `ch_...` |
| Evento Stripe | `evt_...` |
| Invoice status | `paid` |
| Email customer |  |
| Email log Stripe | sent / sandbox-limited / manual resend |
| `hosted_invoice_url` presente | si / no |
| `invoice_pdf` presente | si / no |
| DB `user_subscriptions` coerente | si / no |
| Processo e-fattura | Agenzia / commercialista / provider / partner |
| Numero fattura fiscale |  |
| Esito SdI | accettata / scartata / non ancora inviata |
| Conservazione digitale | si / no / da fare |

---

### Criteri Go / No-Go ricevute e fattura elettronica

#### GO tecnico Stripe

- nuovo checkout genera invoice `paid`
- rinnovo genera nuova invoice `paid`
- `invoice.paid` aggiorna DB
- email receipt / paid invoice e attiva e verificata almeno con evidenza sandbox o live
- Customer Portal apre lo stesso customer associato all'utente app
- email di failed payment e renewal configurate

#### GO fiscale

- processo SdI scelto e scritto
- dati fiscali cliente disponibili o piano per raccoglierli
- diciture forfettario definite
- codice natura IVA `N2.2` definito
- bollo virtuale gestito quando applicabile
- conservazione digitale gestita
- almeno una fattura live controllata o una procedura manuale verificata end-to-end

#### NO-GO

- receipt Stripe trattata come sostitutiva della e-fattura SdI
- nessun responsabile del processo e-fattura
- codice fiscale / partita IVA / codice destinatario / PEC non raccolti quando necessari
- Customer emails disattivate in live
- webhook live non include `invoice.paid`
- live DB contiene ancora `cus_...` o `sub_...` sandbox senza piano di riallineamento

---

### Registro esecuzione ricevute/fatture 2026-04-24

> Prima parte dell'esecuzione Codex del 2026-04-24, ambiente Stripe test mode e Supabase project `ndlsifytatricfutjsvu`.
> Nessun pagamento live eseguito in questa fase.

#### 11.1 Verifiche automatizzate locali

| Verifica | Comando | Esito | Nota |
| --- | --- | --- | --- |
| Edge Functions billing | `node --test supabase/functions/create-checkout-session/config.test.mjs supabase/functions/create-checkout-session/handler.test.mjs supabase/functions/create-customer-portal-session/config.test.mjs supabase/functions/create-customer-portal-session/handler.test.mjs supabase/functions/stripe-webhook/config.test.mjs supabase/functions/stripe-webhook/logic.test.mjs supabase/functions/stripe-webhook/handler.test.mjs` | PASS | 71 test passati |
| Flutter billing mirato | `flutter test test/repository/subscription_billing_repository_test.dart test/utils/billing_client_platform_test.dart test/widgets/common/subscription_guard_test.dart test/pages/paywall_page_test.dart test/unit/widgets/settings/account_subscription_management_card_test.dart` | PASS | 33 test passati |
| Flutter completo | `flutter test` | FAIL non bloccante per questo piano | fallimenti preesistenti/non billing in test widget, etichette e file senza `main`; non usato come criterio Stripe |

#### 11.2 Verifiche Supabase/Stripe config

| Verifica | Esito | Evidenza |
| --- | --- | --- |
| Edge Functions deployate | PASS | `create-checkout-session` ACTIVE v8, `create-customer-portal-session` ACTIVE v13, `stripe-webhook` ACTIVE v19 |
| Secrets Supabase billing presenti | PASS | presenti digest per `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID_MONTHLY`, `STRIPE_PRICE_ID_ANNUAL`, `STRIPE_WEBHOOK_SECRET`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, URL billing Windows/Android e `STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID` |
| Webhook endpoint test | PASS | `we_1TOw1OQ5sgTMZ0uDeAVye5Op`, `enabled`, URL `https://ndlsifytatricfutjsvu.supabase.co/functions/v1/stripe-webhook` |
| Eventi webhook abilitati | PASS | `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted` |
| Supabase locale | BLOCCATO non rilevante | Docker locale non attivo; la verifica e stata fatta sul progetto remoto linkato |

#### 11.3 Evidenze sandbox raccolte

| Caso | Esito | Evidenza |
| --- | --- | --- |
| T0 decisione fiscale | BLOCCATO | nessuna decisione scritta fornita su processo SdI; T6 live resta NO-GO |
| T1 nuovo abbonamento sandbox | PASS tecnico, email-log Dashboard non verificato | `checkout.session.completed` `evt_1TPeOaQ5sgTMZ0uDaJjACtAX`, customer `cus_UO5IcbhQnFHWp6`, subscription `sub_1TPeOYQ5sgTMZ0uDoos8Gbad`, invoice `in_1TPeOWQ5sgTMZ0uDXYx56AAT` |
| T1 invoice/PDF | PASS | invoice `in_1TPeOWQ5sgTMZ0uDXYx56AAT` in stato `paid`, `hosted_invoice_url` presente, `invoice_pdf` presente, totale EUR 480,00 |
| T1 DB projection | PASS | `public.user_subscriptions` per `user_id=1ec05d22-b540-4aca-a2ce-7ceb9cf64ce8` risulta `active`, `annual`, customer `cus_UO5IcbhQnFHWp6`, subscription `sub_1TPeOYQ5sgTMZ0uDoos8Gbad`, periodo `2026-07-23 10:50:00+00` -> `2027-07-23 10:50:00+00` |
| T2 rinnovo sandbox | PASS tecnico storico | evento `invoice.paid` `evt_1TPK45Q5sgTMZ0uDWdcYywxo`, invoice `in_1TPK3vQ5sgTMZ0uDAnLCTo1c` in stato `paid`, `billing_reason=subscription_cycle`, `hosted_invoice_url` presente, `invoice_pdf` presente |
| T3 pagamento fallito | PASS tecnico storico | evento `invoice.payment_failed` `evt_1TPOJ3Q5sgTMZ0uDyGmpHZBq`, invoice `in_1TPOFNQ5sgTMZ0uDAUoDIOs2` in stato `open`, `amount_remaining=4499`, subscription `sub_1TPJtRQ5sgTMZ0uDPD2nMIpf` in stato Stripe `past_due` |
| T4 Customer Portal | PASS API, app UI non riaperta in questa esecuzione | creata sessione portal `bps_1TPeiGQ5sgTMZ0uDS3LQ2fTX` per `cus_UO5IcbhQnFHWp6`, configurazione `bpc_1TOvmvQ5sgTMZ0uDqmclayOB`, return URL `labmanager://billing/portal-return` |
| T5 Android residuo | PASS da evidenza corrente e piano precedente | il checkout Android annuale risulta gia completato con DB `active/annual`; nel piano del 2026-04-23 risultano `PASS` anche `P0-04`, `P0-06`, `P0-10` |
| T6 live controllata | BLOCCATO | non eseguita per mancanza T0 e per evitare pagamenti live senza processo e-fattura |

#### 11.4 Limiti e follow-up

- La verifica dei log email in Stripe Dashboard non e stata completata: lo strumento di navigazione headless disponibile non parte su Windows per errore `Cannot find server.ts`, quindi non e stato possibile navigare la Dashboard in headless.
- La CLI/API Stripe conferma invoice `paid`, `hosted_invoice_url` e `invoice_pdf`, ma non espone una prova equivalente al log email Dashboard.
- Il replay manuale dell'evento `invoice.paid` `evt_1TPeOaQ5sgTMZ0uDlIOLFXGm` verso `we_1TOw1OQ5sgTMZ0uDeAVye5Op` e stato eseguito una volta per verifica endpoint; il DB e rimasto coerente su `active/annual`.
- Prima del live servono ancora: decisione SdI scritta, dati fiscali minimi cliente, responsabile emissione e-fattura, conferma consegna email Stripe in live o fallback operativo.

#### 11.5 Decisione operativa provvisoria

Decisione utente del 2026-04-24:

- per il momento l'obiettivo operativo e che Stripe invii una ricevuta / paid invoice email quando si attiva l'abbonamento;
- la fattura elettronica italiana SdI verra definita successivamente con il commercialista;
- la receipt / paid invoice Stripe resta una comunicazione di pagamento e non viene trattata come sostitutiva della fattura elettronica SdI.

Implicazione:

- il prossimo test tecnico da chiudere e la verifica effettiva della consegna email Stripe su pagamento riuscito;
- il go-live fiscale resta da validare separatamente con commercialista o provider di fatturazione.

#### 11.6 Test sandbox ricevuta su `labmanager.info@gmail.com`

Test eseguito il 2026-04-24 in Stripe test mode.

| Campo | Valore |
| --- | --- |
| Email customer | `labmanager.info@gmail.com` |
| User ID app | `7c426106-dd64-4cec-9818-3def4777fe97` |
| Customer ID Stripe | `cus_UO5VgUANmxEdHX` |
| Checkout Session | `cs_test_a1dl3RZtDzmscAapBi33iidDRQDQBeM4Jh4tnTbrvu28Gwt5MfTsdUPAQR` |
| Evento `checkout.session.completed` | `evt_1TPeziQ5sgTMZ0uDk0k6OChm`, `pending_webhooks=0` |
| Subscription ID Stripe | `sub_1TPezgQ5sgTMZ0uDyQMHlZ85` |
| Invoice ID Stripe | `in_1TPezeQ5sgTMZ0uD80ih57YN` |
| Evento `invoice.paid` | `evt_1TPeziQ5sgTMZ0uD2ZGuCzy1`, `pending_webhooks=1` al controllo CLI |
| Invoice status | `paid` |
| Totale | EUR 44,99 |
| `hosted_invoice_url` presente | si |
| `invoice_pdf` presente | si |
| DB `user_subscriptions` coerente | si, `active/monthly`, periodo `2026-04-24 08:21:46+00` -> `2026-05-24 08:21:46+00` |

Esito:

- PASS per pagamento, subscription Stripe, invoice `paid`, PDF/hosted invoice e attivazione applicativa.
- DA VERIFICARE in inbox: ricezione effettiva della email Stripe su `labmanager.info@gmail.com`.
- PASS webhook LabManager `invoice.paid`: in Stripe Dashboard la consegna a `https://ndlsifytatricfutjsvu.supabase.co/functions/v1/stripe-webhook` risulta `200 OK` alle `2026-04-24 10:21:52 CEST`.
- NON BLOCCANTE per LabManager: Stripe Dashboard mostra anche una consegna fallita `404 ERR` verso `Connected Platform: TestAccount`, con errore `Invoice with id "in_1TPezeQ5sgTMZ0uD80ih57YN" not found in the database.` Questa delivery appartiene alla piattaforma connessa, non all'endpoint Supabase LabManager.

Diagnosi invio email/PDF:

- `charge.succeeded` e presente per `ch_3TPezeQ5sgTMZ0uD0VbVReYo` con `receipt_email=labmanager.info@gmail.com` e `receipt_url` valorizzato: Stripe ha generato la ricevuta di pagamento.
- `payment_intent.succeeded` e presente per `pi_3TPezeQ5sgTMZ0uD0AeQMynC` con `receipt_email=labmanager.info@gmail.com`.
- `invoice.finalized` e `invoice.paid` sono presenti per `in_1TPezeQ5sgTMZ0uD80ih57YN`, con `hosted_invoice_url` e `invoice_pdf` valorizzati.
- Non risulta un evento `invoice.sent` per `in_1TPezeQ5sgTMZ0uD80ih57YN`: il PDF esiste come link Stripe, ma non c'e prova CLI che sia stato spedito come email fattura o allegato PDF.
- Se l'email non arriva in inbox, il blocco probabile non e il webhook LabManager: va verificata in Stripe Dashboard la sezione email/log email della fattura/charge e le impostazioni Customer emails/Billing in test mode.

Verifica invio manuale:

- Alle `2026-04-24 10:45 CEST`, dopo click su `Invia ricevuta`, Stripe Dashboard mostra in attivita fattura: `La ricevuta della fattura e stata inviata a labmanager.info@gmail.com`.
- Dopo l'invio manuale la CLI mostra `receipt_number=2318-8335` sulla invoice `in_1TPezeQ5sgTMZ0uD80ih57YN`.
- Anche dopo l'invio manuale non risulta un evento API `invoice.sent` per questa invoice; per questo caso la prova di invio e il log attivita Dashboard, non l'evento `invoice.sent`.
- Alle `2026-04-24 10:51 CEST` l'email risulta arrivata in Gmail su `labmanager.info@gmail.com`, con riepilogo ricevuta Stripe e due allegati PDF: fattura `Invoice-CWB9RWNM-0011` e ricevuta `Receipt-2318-8335`.
- Esito invio manuale: PASS. Stripe e in grado di consegnare ricevuta e PDF a Gmail in test mode.
- Requisito operativo aggiornato: il cliente deve ricevere solo la ricevuta di pagamento, non la fattura Stripe/PDF fattura. Il codice `create-checkout-session` non abilita `invoice_creation`; la fattura nasce automaticamente da Stripe Billing perche la sessione e `mode=subscription`.
- Da verificare in Dashboard: mantenere attivo `Successful payments` per le ricevute, ma disabilitare dalle impostazioni Billing l'inclusione degli allegati PDF fattura nelle email automatiche. Percorsi Stripe da usare in test mode: `settings/emails` per Customer emails / Successful payments, `settings/billing/automatic` per Subscriptions and emails, `settings/billing/invoice` per Invoice settings/template. Se l'email Stripe continua a mostrare anche link/documento fattura, valutare invio email custom da webhook `invoice.paid` con solo `receipt_url`.

#### 11.7 Test app reale con utente `ayansh.shahid@allfreemail.net`

Test eseguito il 2026-04-24 da app, non da sessione CLI manuale.

| Campo | Valore |
| --- | --- |
| Email customer | `ayansh.shahid@allfreemail.net` |
| User ID app | `344678dd-585e-41eb-a5d6-a8e8805002b0` |
| Customer ID Stripe | `cus_UORTNUTEPXaG1K` |
| Checkout Session app | `cs_test_a1CLCWj0sLVTzUJ6iT4lvVOPXbvVWzhnOR2gN07y4aaGSk2WlyQPnqRge7` |
| Evento `checkout.session.completed` | `evt_1TPg1OQ5sgTMZ0uDZnEQDL76`, `pending_webhooks=0` |
| Subscription ID Stripe | `sub_1TPg1MQ5sgTMZ0uD9ATxY5sT` |
| Invoice ID Stripe | `in_1TPg1KQ5sgTMZ0uD8VPcdcgy` |
| Invoice number | `CWB9RWNM-0012` |
| Evento `invoice.paid` | `evt_1TPg1OQ5sgTMZ0uDS8D2fQke`, `pending_webhooks=1` al controllo CLI |
| Charge | `ch_3TPg1KQ5sgTMZ0uD2Rihnf7g` |
| Totale | EUR 44,99 |
| `receipt_email` | `ayansh.shahid@allfreemail.net` |
| `receipt_url` presente | si |
| `hosted_invoice_url` presente | si |
| `invoice_pdf` presente | si |
| `receipt_number` automatico | `null` dopo ricontrollo a circa 20 secondi |

Esito:

- PASS per flusso app -> Checkout -> pagamento -> subscription Stripe -> invoice `paid`.
- PASS per generazione tecnica ricevuta: il `charge.succeeded` contiene `receipt_email` e `receipt_url`.
- DA VERIFICARE in DB: record `user_subscriptions` atteso `active/monthly` con subscription `sub_1TPg1MQ5sgTMZ0uD9ATxY5sT`.
- NON DIMOSTRATO in sandbox per invio automatico ricevuta, allo stato del controllo CLI: `receipt_number=null`. L'assenza di `invoice.sent` non e un indicatore affidabile per le ricevute, perche anche l'invio manuale riuscito non ha generato `invoice.sent`.
- Interpretazione operativa aggiornata: le impostazioni live Billing per fatture sono coerenti con `Invia fatture finalizzate...` OFF, ma il test automatico in sandbox va ripetuto solo con email ammessa da Stripe per l'ambiente di test oppure va chiuso con una prova live controllata.

Problema aperto da portare nel prossimo test:

- Il flusso reale da app conferma che LabManager crea correttamente la Checkout Session e Stripe crea pagamento, abbonamento, invoice e `receipt_url`.
- Non e ancora dimostrato che Stripe invii automaticamente la ricevuta email alla prima attivazione abbonamento.
- Dopo il pagamento app, `receipt_number` resta `null`; nel test manuale precedente `receipt_number=2318-8335` e comparso solo dopo click manuale su `Invia ricevuta`.
- La voce Billing live `Invia fatture finalizzate e note di credito ai clienti` deve restare OFF per evitare invio fattura automatica.
- Prima del prossimo test va controllata/attivata la voce `Settings > Business > Customer emails > Successful payments` nell'ambiente usato dal test. Per sandbox usare una email di team member attivo Stripe o del dominio email verificato; non usare `allfreemail.net` come prova dell'invio automatico.
- Criterio di successo del prossimo test: dopo pagamento app, senza click manuale su `Invia ricevuta`, deve arrivare email Stripe con ricevuta e `receipt_number` deve diventare non-null su charge/invoice; verificare se contiene solo ricevuta o anche allegato fattura.
- Se Stripe continua a non inviare automaticamente o continua a includere la fattura, decisione tecnica consigliata: disattivare email automatiche Stripe per ricevute e implementare email custom da webhook `invoice.paid` usando `receipt_url`, cosi si controlla il contenuto e si invia solo la ricevuta.

#### 11.8 Diagnosi sistematica del mancato invio automatico

Diagnosi eseguita il 2026-04-24 con `superpowers:systematic-debugging`.

Fatti verificati:

- `create-checkout-session` crea una Checkout Session `mode=subscription` con `customer`, `line_items`, `success_url`, `cancel_url` e `client_reference_id`; non imposta `invoice_creation`, coerentemente con il fatto che le invoice nascono da Stripe Billing per le subscription.
- La sessione `cs_test_a1CLCWj0sLVTzUJ6iT4lvVOPXbvVWzhnOR2gN07y4aaGSk2WlyQPnqRge7` e `livemode=false`, ha `mode=subscription`, `invoice_creation=null`, `customer_email=null` sulla sessione ma `customer.email=ayansh.shahid@allfreemail.net`.
- Il `PaymentIntent` `pi_3TPg1KQ5sgTMZ0uD2jADmGsq` e `succeeded`, ha `receipt_email=ayansh.shahid@allfreemail.net` e `latest_charge=ch_3TPg1KQ5sgTMZ0uD2Rihnf7g`.
- La charge `ch_3TPg1KQ5sgTMZ0uD2Rihnf7g` e `paid=true`, ha `receipt_email=ayansh.shahid@allfreemail.net`, `receipt_url` valorizzato e `receipt_number=null`.
- L'invoice `in_1TPg1KQ5sgTMZ0uD8VPcdcgy` e `paid`, `billing_reason=subscription_create`, `collection_method=charge_automatically`, `customer_email=ayansh.shahid@allfreemail.net`, `hosted_invoice_url` e `invoice_pdf` valorizzati, `receipt_number=null`.
- Confronto manuale: dopo click Dashboard `Invia ricevuta` su `in_1TPezeQ5sgTMZ0uD80ih57YN`, Stripe ha valorizzato `receipt_number=2318-8335` sia su invoice sia su charge. Non e comparso un evento `invoice.sent`, quindi `invoice.sent` non va usato come criterio per la ricevuta.

Riferimenti ufficiali rilevanti:

- Stripe documenta che le ricevute automatiche richiedono `Successful payments` attivo in `Customer emails`: `https://docs.stripe.com/payments/advanced/receipts`.
- Stripe documenta che le ricevute per pagamenti con test API keys non vengono inviate automaticamente, salvo email appartenenti all'utente o a un altro utente verificato con accesso all'ambiente di test: `https://docs.stripe.com/receipts`.
- Stripe documenta che `receipt_number` resta `null` finche una ricevuta non e stata inviata: `https://docs.stripe.com/api/charges/object`.
- Stripe documenta che se sono attive le email per pagamenti riusciti e una invoice e `charge_automatically`, l'email ricevuta include PDF della invoice originale e della invoice receipt, salvo disattivazione nelle Invoice settings: `https://docs.stripe.com/invoicing/send-email`.
- Stripe documenta che i log email cliente sono visibili per gli ultimi 30 giorni ma aggiornati giornalmente, quindi non sono un criterio affidabile per verifiche immediate nello stesso giorno: `https://docs.stripe.com/billing/revenue-recovery/customer-emails`.

Causa radice piu probabile:

- Il test con `ayansh.shahid@allfreemail.net` e un falso negativo per l'invio automatico, perche e stato eseguito in sandbox (`livemode=false`) con un indirizzo che non risulta team member Stripe ne dominio email verificato. Il flusso LabManager non e il punto di rottura: Checkout, PaymentIntent, Charge, Subscription, Invoice e webhook risultano coerenti.

Ipotesi da testare, una variabile alla volta:

1. H1, sandbox recipient non ammesso: ripetere sandbox con email di team member Stripe attivo o dominio email verificato. Atteso: `receipt_number` diventa non-null senza click manuale e l'email arriva.
2. H2, setting Dashboard non attivo nel mode corretto: verificare `Successful payments` in `Settings > Business > Customer emails` per sandbox/test e live, poi ripetere con nuovo customer/subscription.
3. H3, comportamento live diverso da sandbox: se H1 non e conclusiva, fare prova live controllata solo dopo decisione T0 fiscale. Atteso: se `Successful payments` e ON e customer email e presente alla finalizzazione, Stripe invia la ricevuta automaticamente.
4. H4, requisito "solo ricevuta" incompatibile con default Stripe: se l'email automatica include anche PDF invoice, disabilitare l'allegato dalle Invoice settings; se non basta, passare a email custom da webhook `invoice.paid` usando `receipt_url`.

Regole per il prossimo test:

- Non usare piu `invoice.sent` come criterio di successo delle ricevute.
- Usare `receipt_number != null`, inbox reale e, se disponibile dal giorno dopo, Customer email log.
- Tenere `Invia fatture finalizzate e note di credito ai clienti` OFF: e una leva diversa dalle receipt di pagamento riuscito.
- Non concludere che LabManager non invia ricevute se il test resta in sandbox con email non ammessa.

#### 11.9 Ritest sandbox mensile con team member `labmanager.info@gmail.com`

Test eseguito il 2026-04-24 da app in Stripe sandbox, dopo conferma Dashboard che `labmanager.info@gmail.com` e membro attivo del team Stripe test.

| Campo | Valore |
| --- | --- |
| Email customer | `labmanager.info@gmail.com` |
| User ID app | `7c426106-dd64-4cec-9818-3def4777fe97` |
| Customer ID Stripe | `cus_UOTEepXMeN0dtL` |
| Checkout Session app | `cs_test_a1G9e7BtpdF65t9UOww2PFpPe8P9VNXkYCRGfRH2qHhSV0Dlqx3crH0Vip` |
| Evento `checkout.session.completed` | `evt_1TPgIpQ5sgTMZ0uDa1amkoQ7`, `pending_webhooks=0` |
| Subscription ID Stripe | `sub_1TPgInQ5sgTMZ0uDJU79iv72` |
| Subscription status | `active` |
| Invoice ID Stripe | `in_1TPgIlQ5sgTMZ0uDR9KIlfuQ` |
| Invoice number | `CWB9RWNM-0013` |
| Evento `invoice.paid` | `evt_1TPgIqQ5sgTMZ0uDkYONBL2L`, `pending_webhooks=0` |
| Charge | `ch_3TPgIlQ5sgTMZ0uD2HaAQJoe` |
| PaymentIntent | `pi_3TPgIlQ5sgTMZ0uD2VN58Cyv` |
| Totale | EUR 44,99 |
| `receipt_email` | `labmanager.info@gmail.com` |
| `receipt_url` presente | si |
| `hosted_invoice_url` presente | si |
| `invoice_pdf` presente | si |
| `receipt_number` automatico | `null` al controllo immediato e ancora `null` al ricontrollo delle `2026-04-24T11:48:00` |

Esito:

- PASS per flusso app -> Checkout -> pagamento -> subscription Stripe -> invoice `paid`.
- PASS per webhook LabManager lato Stripe: `pending_webhooks=0` su `checkout.session.completed` e `invoice.paid`.
- PASS per generazione tecnica ricevuta: la charge ha `receipt_email=labmanager.info@gmail.com` e `receipt_url` valorizzato.
- NON PASS per evidenza automatica ricevuta: `receipt_number` resta `null` dopo circa 60 secondi.

Interpretazione:

- La causa "email non ammessa in sandbox" non spiega piu questo ritest, perche `labmanager.info@gmail.com` e team member attivo.
- Restano due ipotesi principali da testare senza modifiche codice:
  1. `Customer emails > Successful payments` non e attivo nella sandbox/test mode corretta.
  2. Stripe non sta inviando automaticamente le receipt di questa invoice subscription nonostante `receipt_url`, e quindi serve fallback custom se il toggle risulta gia ON.

Prossima verifica obbligatoria:

- Aprire Stripe in sandbox e controllare `Settings > Business > Customer emails > Successful payments`.
- Se OFF: attivarlo e ripetere con un nuovo customer/subscription.
- Se ON: controllare inbox Gmail e, se non arriva nulla e `receipt_number` resta `null`, considerare fallita la strategia receipt automatica Stripe per questo flusso e passare alla decisione email custom da webhook `invoice.paid`.

#### 11.10 Chiusura diagnostica — causa radice confermata da documentazione ufficiale Stripe

Diagnosi completata il 2026-04-24 con `superpowers:systematic-debugging`, fase finale.

**Tentativo di verifica via CLI:**

Il comando `stripe charges send_receipt <charge_id>` non esiste nella CLI Stripe pubblica. Gli unici sottocomandi disponibili per `stripe charges` sono: `capture`, `create`, `list`, `retrieve`, `search`, `update`. Il tentativo via `stripe post /v1/charges/{id}/send_receipt` ha restituito `Unrecognized request URL` da Stripe.

**Verifica documentazione ufficiale:**

La documentazione Stripe all'URL `https://docs.stripe.com/receipts` riporta esplicitamente:

> "I pagamenti di test creati utilizzando le chiavi API di test non inviano automaticamente le ricevute."

L'endpoint `/v1/charges/{id}/send_receipt` non esiste nell'API pubblica Stripe. Il pulsante "Invia ricevuta" nel Dashboard usa un'API interna non esposta pubblicamente.

**Causa radice definitiva:**

Il mancato invio automatico di ricevute in test mode e comportamento documentato e atteso di Stripe, non un difetto del codice LabManager ne delle impostazioni Dashboard. `receipt_url` viene creato (la risorsa ricevuta esiste ed e accessibile), ma il dispatch automatico dell'email e soppresso da Stripe in test mode per design, indipendentemente da:

- `Customer emails > Successful payments` ON
- email di team member attivo
- flusso subscription o PaymentIntent diretto

La conferma definitiva e il test di isolamento della sezione seguente: anche un PaymentIntent API diretto con `receipt_email` esplicito su email di team member, con `Successful payments` ON, non ha prodotto `receipt_number` non-null. Il codice LabManager non e coinvolto.

**Tabella comportamento atteso:**

| Modalita | Invio automatico ricevuta |
| --- | --- |
| Test mode, qualsiasi email | NO — `receipt_url` presente, `receipt_number=null`, nessuna email automatica |
| Test mode, click "Invia ricevuta" Dashboard | SI — email arriva, `receipt_number` valorizzato |
| Live mode, `Successful payments` ON | SI — email automatica inviata dopo pagamento riuscito |

**Implicazione operativa:**

Nessun fix al codice necessario. Il test T6 live (sezione 6) e il passo obbligatorio per chiudere la verifica: in live mode con `Successful payments` ON, dopo un pagamento reale la ricevuta deve arrivare automaticamente senza click manuale. Se in live mode la ricevuta non arrivasse, si aprirebbe una seconda fase di diagnosi su `Billing > Subscriptions and emails > Payment confirmation`. Ma il test mode non e un indicatore attendibile per questo comportamento.

**Cosa fare operativamente adesso:**

1. partire dal codice pubblicato su `origin/master` fino al commit `485a9af0`
2. preparare Stripe live: prezzi mensile/annuale, Customer Portal, webhook live configurato come quello test e `Successful payments` ON
3. impostare in Supabase `STRIPE_BILLING_ENV=live` e i secrets Stripe `_LIVE`, senza sovrascrivere i secrets test senza suffisso
4. redeployare le tre Edge Functions billing dopo il cambio secrets
5. pulire solo l'utente di prova `emanuele.lucania@gmail.com` se ha ancora riferimenti Stripe sandbox
6. eseguire T6 con pagamento live controllato, senza click manuale su `Invia ricevuta`
7. salvare evidenze: email ricevuta, `receipt_number`, invoice `paid`, webhook `200 OK`, DB `active/annual`, sconto 99% e importo pagato
8. chiudere la parte fiscale con emissione e-fattura SdI o procedura amministrativa scelta
9. se il live era solo un test, annullare/rimborsare dove serve e riportare `STRIPE_BILLING_ENV` a `test` o rimuoverlo, poi redeployare

**Fallback opzionale per produzione:**

Se si vuole garantire l'invio della ricevuta in modo programmatico, indipendente dalle impostazioni Dashboard, l'unica opzione e implementare un invio email custom da webhook `invoice.paid` usando `receipt_url` dalla charge collegata e un provider email esterno (es. Resend). Questa opzione resta aperta ma non e bloccante per il go-live tecnico.

---

#### 11.11 Isolamento fuori da LabManager con PaymentIntent test diretto

Test eseguito il 2026-04-24 per separare il comportamento Stripe dal flusso subscription LabManager.

Premessa Dashboard:

- `Settings > Business > Customer emails > Successful payments` risulta attivo in sandbox.
- `labmanager.info@gmail.com` risulta team member attivo Stripe.

Comando:

```powershell
stripe payment_intents create -d amount=100 -d currency=eur -d "payment_method_types[0]=card" -d payment_method=pm_card_visa -d confirm=true -d receipt_email=labmanager.info@gmail.com -d description="LabManager test receipt automatic sandbox card"
```

Nota su avviso Stripe `return_url`:

- Prima di questo comando e stato eseguito un tentativo diagnostico PaymentIntent senza `return_url` e senza limitare `payment_method_types` a `card`.
- Stripe lo ha rifiutato perche, con metodi di pagamento dinamici gestiti da Dashboard, alcuni metodi possono richiedere redirect e la conferma server-side deve fornire `return_url`, oppure impostare `automatic_payment_methods[allow_redirects]=never`, oppure limitare esplicitamente `payment_method_types[]=card`.
- L'avviso email Stripe ricevuto dopo il test si riferisce a quel tentativo diagnostico diretto, non al flusso reale LabManager.
- Il flusso reale LabManager usa Checkout Session `mode=subscription` con `success_url` e `cancel_url`; secondo la guida Stripe, le integrazioni Checkout/Payment Links non richiedono la stessa modifica `return_url` dei PaymentIntent confermati direttamente.

Evidenza:

| Campo | Valore |
| --- | --- |
| PaymentIntent | `pi_3TPgPbQ5sgTMZ0uD1qmaAjxN` |
| Charge | `ch_3TPgPbQ5sgTMZ0uD1WOXwULi` |
| Importo | EUR 1,00 |
| Status | `succeeded` |
| `receipt_email` | `labmanager.info@gmail.com` |
| `receipt_url` presente | si |
| `receipt_number` | `null` al controllo immediato e ancora `null` alle `2026-04-24T11:53:22` |

Interpretazione:

- Il mancato invio automatico non e specifico del codice LabManager ne del flusso subscription Checkout.
- Anche un PaymentIntent API diretto, con `receipt_email` esplicito, non ha prodotto `receipt_number`.
- A parita di account sandbox, email team member e toggle `Successful payments` ON, Stripe genera il link ricevuta ma non mostra evidenza API di invio automatico.

Decisione tecnica consigliata se non arriva email in inbox:

- Non affidare il requisito operativo all'invio automatico Stripe in sandbox.
- Implementare o pianificare fallback email custom da webhook `invoice.paid`, usando `receipt_url` della charge collegata alla invoice.
- Tenere disattivato l'invio automatico fatture finalizzate se il requisito resta "solo ricevuta, niente fattura Stripe automatica".

---

#### 11.12 Test sandbox dopo aggiunta dati fatturazione elettronica

Test eseguito il 2026-04-25 da app Android/Checkout hosted Stripe in sandbox, dopo aggiunta dei campi per dati di fatturazione elettronica. Dettaglio implementativo e decisioni: `docs/piani/pricing/stripe/2026-04-25-piano-checkout-stripe-dati-fatturazione-elettronica.md`.

Test automatici eseguiti prima del test UI:

```powershell
node --test supabase/functions/create-checkout-session/config.test.mjs supabase/functions/create-checkout-session/handler.test.mjs
node --test supabase/functions/create-customer-portal-session/config.test.mjs supabase/functions/create-customer-portal-session/handler.test.mjs
node --test supabase/functions/stripe-webhook/config.test.mjs supabase/functions/stripe-webhook/logic.test.mjs supabase/functions/stripe-webhook/handler.test.mjs
flutter test test/repository/subscription_billing_repository_test.dart test/pages/paywall_page_test.dart test/widgets/common/subscription_guard_test.dart test/unit/widgets/settings/account_subscription_management_card_test.dart
```

Esito test automatici:

- `create-checkout-session`: `27` PASS.
- `create-customer-portal-session`: `29` PASS.
- `stripe-webhook`: `29` PASS.
- Flutter billing UI/repository: `31` PASS.

Setup runtime del test:

- `STRIPE_BILLING_ENV=test`.
- `create-checkout-session` redeployata in sandbox, versione `18`.
- secrets test presenti: `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID_MONTHLY`, `STRIPE_PRICE_ID_ANNUAL`, `STRIPE_WEBHOOK_SECRET`.

Test UI Checkout:

- visualizzati i campi `Codice fiscale` e `Codice SDI o PEC`.
- `Codice fiscale` accetta valore di 16 caratteri.
- dopo selezione carta e indirizzo Italia, visualizzata la spunta `Sto acquistando come attivita`.
- con spunta business attiva, visualizzati ragione sociale e P.IVA/Tax ID.
- pagamento mensile sandbox completato con carta test.

Evidenze Stripe/Supabase:

| Campo | Valore |
| --- | --- |
| Email customer | `ayansh.shahid@allfreemail.net` |
| User ID app | `344678dd-585e-41eb-a5d6-a8e8805002b0` |
| Customer ID Stripe | `cus_UORTNUTEPXaG1K` |
| Checkout Session | `cs_test_b1IxaPzvWUZ9ZlbHdgXULnL8Wx5zgN8rg3xwTyr53sa1ckvQwJpeKi0xCF` |
| Subscription ID Stripe | `sub_1TQ84WQ5sgTMZ0uDU9gteiJg` |
| Invoice ID Stripe | `in_1TQ84UQ5sgTMZ0uDlIggVJ2y` |
| Checkout Session status | `complete` |
| Checkout payment status | `paid` |
| Subscription status | `active` |
| Invoice status | `paid` |
| Totale | EUR `44,99` |
| Ambiente | sandbox, `livemode=false` |
| `billing_address_collection` | `required` |
| `tax_id_collection.enabled` | `true` |
| Custom field `codicefiscale` | valorizzato |
| Custom field `sdipec` | valorizzato |
| Business name | presente |
| Tax ID customer | presente, `eu_vat`, verificato in Stripe test |
| Customer address | paese `IT`, indirizzo valorizzato |
| Webhook LabManager | `invoice.paid` consegnato `200 OK` a Supabase |
| DB `status` | `active` |
| DB `subscription_plan` | `monthly` |
| DB `subscription_start_date` | `2026-04-25 15:24:42+00` |
| DB `subscription_end_date` | `2026-05-25 15:24:42+00` |

Esito:

- PASS test UI raccolta dati fatturazione.
- PASS pagamento sandbox mensile.
- PASS persistenza dati raccolti in Stripe.
- PASS aggiornamento `public.user_subscriptions` ad `active/monthly`.
- PASS webhook Supabase LabManager (`200 OK`).
- Nota non bloccante: Stripe Dashboard mostrava anche una delivery `404` verso `Connected Platform: TestAccount`; non riguarda l'endpoint Supabase LabManager.

---

### Runbook prova live controllata

Prerequisito non tecnico: T0 fiscale chiuso. Prima di incassare un pagamento live deve essere chiaro chi emette la e-fattura SdI, entro quando e con quali dati.

Passi:

1. Usare l'utente `emanuele.lucania@gmail.com`.
2. Pulire il record utente solo se contiene riferimenti sandbox `cus_...` o `sub_...` non piu coerenti.
3. Aprire l'app e completare un pagamento live annuale controllato.
4. Inserire nel Checkout il codice promozionale live 99% creato per il test, per esempio `TESTLIVE99`.
5. Verificare prima del pagamento che il totale sia il 1% del prezzo annuale live.
6. Completare il pagamento con carta reale.
7. Non cliccare manualmente `Invia ricevuta` in Stripe.
8. Verificare in Stripe live:
   - Checkout Session `complete`
   - Subscription `active`
   - Invoice `paid`
   - Charge `succeeded`
   - `receipt_email=emanuele.lucania@gmail.com`
   - `receipt_number` valorizzato
   - sconto 99% presente sulla Checkout Session / invoice
   - importo pagato coerente con il 1% del prezzo annuale
9. Verificare webhook live:
   - `checkout.session.completed` consegnato `200`
   - `invoice.paid` consegnato `200`
10. Verificare Supabase DB:
   - `public.user_subscriptions` aggiornato ad `active`
   - piano `annual`
   - nuovi `stripe_customer_id` e `stripe_subscription_id` live
11. Verificare Gmail:
   - ricevuta Stripe arrivata senza invio manuale
   - controllare inbox, spam e promozioni
12. Emettere e-fattura SdI secondo il processo fiscale scelto.
13. Compilare il registro evidenze pagamenti e documenti di questa sezione.

#### Coupon live per test annuale

Decisione operativa: per evitare di pagare il 100% del prezzo annuale durante il test, usare un coupon live al 99% con pagamento reale del residuo 1%.

Configurazione consigliata in Stripe live:

- nome coupon: `Sconto test live 99`
- tipo: percentuale
- percentuale: `99`
- durata: `Una sola volta`
- codice cliente: `TESTLIVE99`
- limite riscatti totali: `1`
- scadenza: oggi o domani

Motivo: un coupon al 99% mantiene un pagamento live reale, quindi consente di verificare incasso, ricevuta, `invoice.paid`, webhook live e aggiornamento DB. Evitare coupon al 100% per questo test, perche riduce o annulla la prova di incasso reale e puo non essere rappresentativo della ricevuta di pagamento.

Nota: il codice promozionale funziona nel Checkout LabManager solo dopo deploy di `create-checkout-session` v16, perche la funzione ora passa `allow_promotion_codes: true` a Stripe.

---

### Stato DB prima del pagamento live annuale

Verifica eseguita il 2026-04-24 alle 16:30 CEST su Supabase project `ndlsifytatricfutjsvu`.

Account scelto per il pagamento live annuale:

| Campo | Valore |
| --- | --- |
| Email | `emanuele.lucania@gmail.com` |
| User ID | `cac0fa53-0d2f-467e-87c9-f1894288c90e` |
| Stato prima pulizia | `active/annual` |
| Stripe customer precedente | `cus_UOPhDDppatSzBq` |
| Stripe subscription precedente | `sub_1TPctlQ5sgTMZ0uDnnwejnVT` |
| Stato dopo pulizia | `expired` |
| `subscription_plan` dopo pulizia | `null` |
| `subscription_start_date` dopo pulizia | `null` |
| `stripe_customer_id` dopo pulizia | `null` |
| `stripe_subscription_id` dopo pulizia | `null` |

Nota operativa: durante l'interruzione del comando precedente e stata completata anche la pulizia di `labmanager.info@gmail.com`. Stato verificato dopo l'interruzione: `expired`, `subscription_plan=null`, `stripe_customer_id=null`, `stripe_subscription_id=null`.

### Esito pagamento live annuale controllato

Test eseguito il 2026-04-24 in Stripe live mode, da app/Checkout ospitato Stripe, con utente `emanuele.lucania@gmail.com`.

Nota preliminare: una prima Checkout Session live (`cs_live_b1YTPUqIxa4dsYDsXzYsWtVhW5C2zsRvHgl0xBh83du4WUpskvjSecIT8S`) e rimasta `open/unpaid` dopo errore di rendering browser "Something went wrong". La sessione successiva e stata caricata correttamente ed e quella pagata.

| Campo | Valore |
| --- | --- |
| Data/ora pagamento | `2026-04-24 16:51:35 CEST` (`2026-04-24 14:51:35 UTC`) |
| Ambiente | live |
| Email customer | `emanuele.lucania@gmail.com` |
| User ID app | `cac0fa53-0d2f-467e-87c9-f1894288c90e` |
| Customer ID Stripe | `cus_UOY1Lg3ZzDkxlH` |
| Checkout Session | `cs_live_b1eF8v34KEcsUODW7ylmCxuaRUZuiEPfKlRTus3LxgvJXpXbkDEtJMB8wl` |
| Subscription ID Stripe | `sub_1TPl4wQ5sgTMZ0uDqozqMSdO` |
| Invoice ID Stripe | `in_1TPl4tQ5sgTMZ0uDCa2dSnZq` |
| Invoice number | `CWB9RWNM-0001` |
| PaymentIntent | `pi_3TPl4uQ5sgTMZ0uD0KpVmZ1b` |
| Charge | `ch_3TPl4uQ5sgTMZ0uD0LF7goIg` |
| Evento `checkout.session.completed` | `evt_1TPl4yQ5sgTMZ0uDhFrPVFpq`, `pending_webhooks=0` |
| Evento `invoice.paid` | `evt_1TPl4yQ5sgTMZ0uDXKmpLRWd`, `pending_webhooks=0` |
| Evento `invoice.payment_succeeded` | `evt_1TPl4yQ5sgTMZ0uDAYkkpHII`, `pending_webhooks=0` |
| Evento `invoice_payment.paid` | `evt_1TPl5oQ5sgTMZ0uDd8JueKHX`, `pending_webhooks=0` |
| Checkout Session status | `complete` |
| Checkout payment status | `paid` |
| Subscription status | `active` |
| Invoice status | `paid` |
| Charge status | `succeeded` |
| Prezzo annuale live | EUR `480,00` |
| Sconto applicato | EUR `475,20` |
| Importo pagato | EUR `4,80` |
| Percentuale coupon | `99%` |
| Codice promozionale effettivamente applicato | `99` (`promo_1TPl3FQ5sgTMZ0uD29A9ANT7`) |
| Coupon Stripe | `7Rni2GO3`, `percent_off=99`, `duration=once`, `max_redemptions=1`, `times_redeemed=1`, `valid=false` dopo il riscatto |
| `receipt_email` | `emanuele.lucania@gmail.com` |
| `receipt_number` | `2299-6056` |
| `receipt_url` presente | si |
| `hosted_invoice_url` presente | si |
| `invoice_pdf` presente | si |
| Email Gmail | ricevuta Stripe arrivata senza click manuale su `Invia ricevuta` |

Verifica Supabase DB dopo pagamento:

| Campo DB | Valore |
| --- | --- |
| `status` | `active` |
| `subscription_plan` | `annual` |
| `subscription_start_date` | `2026-04-24 14:51:35+00` |
| `subscription_end_date` | `2027-04-24 14:51:35+00` |
| `stripe_customer_id` | `cus_UOY1Lg3ZzDkxlH` |
| `stripe_subscription_id` | `sub_1TPl4wQ5sgTMZ0uDqozqMSdO` |

Verifica webhook live:

- endpoint live Stripe: `we_1TOdm0Q5sgTMZ0uDYF0YtPKa`
- URL endpoint: `https://ndlsifytatricfutjsvu.supabase.co/functions/v1/stripe-webhook`
- eventi abilitati: `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted`
- `checkout.session.completed` e `invoice.paid` risultano con `pending_webhooks=0`; il DB Supabase e stato aggiornato a `active/annual`, quindi la consegna al webhook applicativo e la proiezione DB sono riuscite.
- Limite della verifica CLI: Stripe CLI/API non espone il codice HTTP puntuale della singola delivery webhook; per archiviare letteralmente `200 OK` serve controllo visivo in Stripe Dashboard nella pagina evento/delivery.

Esito:

- PASS pagamento live annuale controllato.
- PASS ricevuta Stripe automatica live: Gmail ricevuta senza invio manuale e `receipt_number` valorizzato.
- PASS Stripe Billing: Checkout `complete`, Subscription `active`, Invoice `paid`, Charge `succeeded`.
- PASS DB applicativo: `public.user_subscriptions` aggiornato a `active/annual` con riferimenti Stripe live.
- PASS importo: EUR `4,80`, coerente con sconto `99%` su EUR `480,00`.
- DA CHIUDERE fuori da questa verifica tecnica: processo e-fattura SdI secondo decisione commercialista/provider.

---

## 13. Nota finale per il passaggio live

Il test reale in sandbox non basta da solo a fare il cutover.

Prima del live devi ancora confermare:

- sostituzione di `sk_test_...` con `sk_live_...`
- sostituzione di tutti i `price_...` con quelli live
- sostituzione di `whsec_...` con il secret live
- eventuale nuovo `bpc_...` live
- decisione esplicita su come trattare eventuali `cus_...` e `sub_...` sandbox gia salvati nel database
- conferma se la receipt / paid invoice email verra inviata da Stripe (`Customer emails > Successful payments`) oppure da un sistema esterno
- se scegli Stripe, eseguire almeno un controllo live controllato di effettiva consegna email, perche la sandbox puo non inviare automaticamente receipt a indirizzi non verificati
inoltre gaurda docs\piani\pricing\stripe\2026-04-22-stripe-billing-server-driven-manual-checklist.md
