# Stripe Billing Server-Driven - Checklist Manuale Blocco A

> Data: 2026-04-22
> Scopo: completare i passaggi manuali dei `Task 1`, `Task 3` e `Task 4` del Blocco A senza mettere segreti o ID Stripe nel repo.

---

## 1. Valori reali gia confermati nel repo

| Voce | Valore |
| --- | --- |
| Supabase project ref | `ndlsifytatricfutjsvu` |
| Supabase URL | `https://ndlsifytatricfutjsvu.supabase.co` |
| Endpoint atteso checkout | `https://ndlsifytatricfutjsvu.supabase.co/functions/v1/create-checkout-session` |
| Endpoint atteso portal | `https://ndlsifytatricfutjsvu.supabase.co/functions/v1/create-customer-portal-session` |
| Android checkout success URL | `labmanager://billing/success` |
| Android checkout cancel URL | `labmanager://billing/cancel` |
| Android portal return URL | `labmanager://billing/portal-return` |
| Prezzo mensile UI | `EUR 44,99 / mese` |
| Prezzo annuale UI | `EUR 480 / anno` |
| Dominio web disponibile per Windows | `https://pastrylabmanager.com` |

Nota pratica:

- l'`AndroidManifest.xml` del repo accetta gia il scheme `labmanager://`, quindi i ritorni Android possono usare questi URI
- nel repo non risulta ancora una pagina web Windows gia pubblicata per billing, quindi gli URL Windows vanno scelti e verificati prima di salvarli nei secrets

---

## 2. Valori da raccogliere manualmente fuori repo

| Voce | Formato atteso | Dove serve |
| --- | --- | --- |
| Stripe secret key | `sk_test_...` in sandbox, `sk_live_...` in live | checkout + portal |
| Stripe price ID mensile | `price_...` coerente con l'ambiente attivo | checkout |
| Stripe price ID annuale | `price_...` coerente con l'ambiente attivo | checkout |
| Customer Portal configuration ID | `bpc_...` coerente con l'ambiente attivo | portal, opzionale |
| Windows checkout success URL | `https://...` | checkout |
| Windows checkout cancel URL | `https://...` | checkout |
| Windows portal return URL | `https://...` | portal |

Vincoli importanti:

- non committare `sk_test_...`, `price_...` o `bpc_...` nel repo
- `APP_BILLING_RETURN_URL_WINDOWS` deve essere `https://...`
- `APP_BILLING_RETURN_URL_ANDROID` accetta solo `https://...` oppure `labmanager://...`
- se non usi una configurazione dedicata del Customer Portal, lascia `STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID` non impostato
- test e live hanno risorse separate: key, `price_...`, `bpc_...`, webhook secret e customer creati in sandbox non valgono in live

---

## 3. Fase manuale 1 - SQL Editor Supabase

Esegui prima il check pre-migration:

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

Expected:

- `0 rows`, oppure al massimo uno solo dei due indici

Poi applica la migration:

```sql
create unique index if not exists user_subscriptions_stripe_customer_id_key
on public.user_subscriptions (stripe_customer_id)
where stripe_customer_id is not null;

create unique index if not exists user_subscriptions_stripe_subscription_id_key
on public.user_subscriptions (stripe_subscription_id)
where stripe_subscription_id is not null;
```

Riesegui infine il check:

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

Expected finale:

- `2 rows`

---

## 4. Fase manuale 2 - Stripe Dashboard

Per il checkout:

1. apri Stripe in test mode
2. verifica che esistano gia i due prezzi coerenti con il repo:
   - mensile `EUR 44,99 / mese`
   - annuale `EUR 480 / anno`
3. copia i due ID reali:
   - `STRIPE_PRICE_ID_MONTHLY=price_...`
   - `STRIPE_PRICE_ID_ANNUAL=price_...`

Per il Customer Portal:

1. apri la configurazione Customer Portal in Stripe Dashboard
2. se usi la configurazione di default, non serve nessun ID aggiuntivo
3. se crei una configurazione dedicata, copia `STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID=bpc_...`

Per Windows:

1. scegli o pubblica le pagine HTTPS di ritorno sul dominio `https://pastrylabmanager.com`
2. non salvare URL Windows finche la pagina non risponde davvero in browser

URL consigliati, ma da usare solo se realmente pubblicati:

- `APP_BILLING_SUCCESS_URL_WINDOWS=https://pastrylabmanager.com/billing/success`
- `APP_BILLING_CANCEL_URL_WINDOWS=https://pastrylabmanager.com/billing/cancel`
- `APP_BILLING_RETURN_URL_WINDOWS=https://pastrylabmanager.com/account/billing`

---

## 5. Fase manuale 3 - Supabase secrets

Per il progetto `ndlsifytatricfutjsvu` devi avere questi secrets runtime per il checkout:

```text
STRIPE_SECRET_KEY
STRIPE_PRICE_ID_MONTHLY
STRIPE_PRICE_ID_ANNUAL
APP_BILLING_SUCCESS_URL_WINDOWS
APP_BILLING_CANCEL_URL_WINDOWS
APP_BILLING_SUCCESS_URL_ANDROID
APP_BILLING_CANCEL_URL_ANDROID
```

Per il portal:

```text
STRIPE_SECRET_KEY
APP_BILLING_RETURN_URL_WINDOWS
APP_BILLING_RETURN_URL_ANDROID
STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID
```

Valori gia pronti da inserire:

```text
APP_BILLING_SUCCESS_URL_ANDROID=labmanager://billing/success
APP_BILLING_CANCEL_URL_ANDROID=labmanager://billing/cancel
APP_BILLING_RETURN_URL_ANDROID=labmanager://billing/portal-return
```

Nota sul runtime Supabase hosted:

- `SUPABASE_URL`, `SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY` fanno parte dell'ambiente runtime atteso dalle function
- se il tuo progetto hosted li espone gia nel runtime, non duplicarli nei secrets manuali
- se il runtime che stai usando non li inietta, allora vanno aggiunti esplicitamente

Esempio CLI con i valori noti gia compilati:

```powershell
supabase secrets set `
  STRIPE_SECRET_KEY=sk_test_... `
  STRIPE_PRICE_ID_MONTHLY=price_... `
  STRIPE_PRICE_ID_ANNUAL=price_... `
  APP_BILLING_SUCCESS_URL_WINDOWS=https://pastrylabmanager.com/billing/success `
  APP_BILLING_CANCEL_URL_WINDOWS=https://pastrylabmanager.com/billing/cancel `
  APP_BILLING_SUCCESS_URL_ANDROID=labmanager://billing/success `
  APP_BILLING_CANCEL_URL_ANDROID=labmanager://billing/cancel `
  APP_BILLING_RETURN_URL_WINDOWS=https://pastrylabmanager.com/account/billing `
  APP_BILLING_RETURN_URL_ANDROID=labmanager://billing/portal-return `
  STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID=bpc_... `
  --project-ref ndlsifytatricfutjsvu
```

Se non usi una config dedicata del portal:

- ometti completamente `STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID`

---

## 6. Passaggio da sandbox a live

Risposta breve:

- non sovrascrivere i secrets Stripe senza suffisso: restano dedicati a sandbox/test
- per live imposta `STRIPE_BILLING_ENV=live` e usa i secrets Stripe con suffisso `_LIVE`

Valori live da creare separatamente:

- `STRIPE_BILLING_ENV=live`: switch runtime esplicito per usare i secrets live
- `STRIPE_SECRET_KEY_LIVE`: chiave `sk_live_...` dello stesso account Stripe live
- `STRIPE_PRICE_ID_MONTHLY_LIVE`: nuovo `price_...` live del piano mensile
- `STRIPE_PRICE_ID_ANNUAL_LIVE`: nuovo `price_...` live del piano annuale
- `STRIPE_WEBHOOK_SECRET_LIVE`: secret `whsec_...` dell'endpoint webhook live

Valori live da creare solo se li hai fissati esplicitamente:

- `STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID_LIVE`: il `bpc_...` sandbox non vale in live; se usi una config dedicata devi inserire il `bpc_...` live

Valori che in genere non cambiano:

- secrets Stripe senza suffisso, che restano sandbox/test:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_PRICE_ID_MONTHLY`
  - `STRIPE_PRICE_ID_ANNUAL`
  - `STRIPE_WEBHOOK_SECRET`
  - `STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID`, se presente
- `APP_BILLING_SUCCESS_URL_WINDOWS`
- `APP_BILLING_CANCEL_URL_WINDOWS`
- `APP_BILLING_RETURN_URL_WINDOWS`
- `APP_BILLING_SUCCESS_URL_ANDROID`
- `APP_BILLING_CANCEL_URL_ANDROID`
- `APP_BILLING_RETURN_URL_ANDROID`

Nota operativa:

- i customer, le subscription e le invoice creati in sandbox non sono riutilizzabili in live
- il `stripe_customer_id` usato per i test va trattato come dato di prova; in live il customer corretto verra creato o collegato dal checkout live
- nell'architettura attuale server-driven non usiamo una Stripe publishable key nel client, quindi non c'e nessuna `pk_test_...` o `pk_live_...` da ruotare nell'app Flutter finche il client non integra direttamente Stripe SDK

Impatto sul database applicativo:

- se riusi lo stesso progetto Supabase tra sandbox e live, i campi gia persistiti come `stripe_customer_id` e `stripe_subscription_id` resteranno riferiti alla sandbox e non saranno validi con `sk_live_...`
- questo significa che un utente test gia collegato potrebbe vedere errori portal o webhook dopo il passaggio a live se il record non viene riallineato
- approccio raccomandato: ambiente Supabase separato per staging/test e per produzione
- se scegli di riusare lo stesso database, prima del go-live devi considerare i riferimenti Stripe salvati come dati ambiente-specifici e prevedere una riallocazione controllata dei customer live

Checklist minima go-live:

1. impostare `STRIPE_BILLING_ENV=live`
2. creare `STRIPE_SECRET_KEY_LIVE` con una `sk_live_...` dello stesso account Stripe live
3. creare `STRIPE_PRICE_ID_MONTHLY_LIVE` e `STRIPE_PRICE_ID_ANNUAL_LIVE` con i `price_...` live
4. creare `STRIPE_WEBHOOK_SECRET_LIVE` con il secret dell'endpoint live
5. se usi una configurazione Customer Portal dedicata, creare `STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID_LIVE` con il `bpc_...` live; altrimenti ometterlo
6. verificare che Customer Portal e prodotti/prezzi siano configurati anche in modalita live
7. verificare come trattare nel database eventuali `stripe_customer_id` e `stripe_subscription_id` creati in sandbox
8. eseguire un checkout live controllato e verificare che webhook e portal usino nuovi `cus_...` e `sub_...` live

### 6.1 Test live minimo con `labmanager.info@gmail.com`

Obiettivo: verificare con un pagamento reale controllato che Stripe invii automaticamente la ricevuta email in live mode.

Decisione ambiente/secrets:

- i secrets Stripe attuali senza suffisso restano dedicati a sandbox/test:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_PRICE_ID_MONTHLY`
  - `STRIPE_PRICE_ID_ANNUAL`
  - `STRIPE_WEBHOOK_SECRET`
  - `STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID`, se presente
- per live creare nuovi secrets separati con suffisso `_LIVE`:
  - `STRIPE_SECRET_KEY_LIVE`
  - `STRIPE_PRICE_ID_MONTHLY_LIVE`
  - `STRIPE_PRICE_ID_ANNUAL_LIVE`
  - `STRIPE_WEBHOOK_SECRET_LIVE`
  - `STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID_LIVE`, solo se serve una configurazione portal live dedicata
- non usare `WEBHOOK_SECRET` per Stripe: in questo progetto puo indicare altro
- questa scelta evita di sovrascrivere ogni volta i valori test quando si prepara il live
- `STRIPE_BILLING_ENV=live` e lo switch runtime esplicito per il test live; assente, vuoto o `test` mantiene l'uso dei secrets sandbox/test senza suffisso
- nota tecnica: il codice runtime legge esplicitamente i secrets `_LIVE` solo quando `STRIPE_BILLING_ENV=live`

Utente da usare:

- email: `labmanager.info@gmail.com`
- piano: mensile
- importo atteso: prezzo live mensile configurato in Stripe
- non cliccare manualmente `Invia ricevuta` durante il test

Preflight Stripe live:

1. uscire dalla sandbox e lavorare in modalita live
2. creare/verificare prodotto e prezzo live mensile coerente con l'app
3. creare/verificare prodotto e prezzo live annuale, anche se il test usa solo mensile
4. copiare i `price_...` live, non quelli test
5. verificare `Settings > Business > Customer emails > Successful payments` ON in live
6. lasciare OFF `Invia fatture finalizzate e note di credito ai clienti`, se il requisito resta evitare invio automatico fattura
7. verificare Branding e Public details live: nome, email supporto, sito, logo
8. verificare Customer Portal live attivo
9. creare/verificare webhook live verso `https://ndlsifytatricfutjsvu.supabase.co/functions/v1/stripe-webhook`
10. copiare il nuovo `whsec_...` live

Preflight Supabase secrets live:

```powershell
supabase secrets set `
  STRIPE_BILLING_ENV=live `
  STRIPE_SECRET_KEY_LIVE=sk_live_... `
  STRIPE_PRICE_ID_MONTHLY_LIVE=price_live_mensile... `
  STRIPE_PRICE_ID_ANNUAL_LIVE=price_live_annuale... `
  STRIPE_WEBHOOK_SECRET_LIVE=whsec_live... `
  APP_BILLING_SUCCESS_URL_WINDOWS=https://pastrylabmanager.com/billing/success `
  APP_BILLING_CANCEL_URL_WINDOWS=https://pastrylabmanager.com/billing/cancel `
  APP_BILLING_SUCCESS_URL_ANDROID=labmanager://billing/success `
  APP_BILLING_CANCEL_URL_ANDROID=labmanager://billing/cancel `
  APP_BILLING_RETURN_URL_WINDOWS=https://pastrylabmanager.com/account/billing `
  APP_BILLING_RETURN_URL_ANDROID=labmanager://billing/portal-return `
  --project-ref ndlsifytatricfutjsvu
```

Se usi una configurazione Customer Portal dedicata live, aggiungi anche:

```powershell
STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID_LIVE=bpc_live...
```

Verifica secrets dopo inserimento:

```powershell
supabase secrets list --project-ref ndlsifytatricfutjsvu
```

Expected:

- presenti sia i secrets test senza suffisso sia i secrets live con suffisso `_LIVE`
- presente `STRIPE_BILLING_ENV=live` come switch runtime del test live
- presenti almeno `STRIPE_SECRET_KEY_LIVE`, `STRIPE_PRICE_ID_MONTHLY_LIVE`, `STRIPE_PRICE_ID_ANNUAL_LIVE`, `STRIPE_WEBHOOK_SECRET_LIVE`
- presente `STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID_LIVE` solo se serve una configurazione Customer Portal live dedicata
- i valori test non sono stati sostituiti da valori live
- non e stato creato o riusato `WEBHOOK_SECRET` per Stripe

Utente pulito nel DB:

1. controllare prima lo stato dell'utente:

```sql
select
  u.id as user_id,
  u.email,
  s.status,
  s.subscription_plan,
  s.subscription_start_date,
  s.subscription_end_date,
  s.stripe_customer_id,
  s.stripe_subscription_id
from auth.users u
left join public.user_subscriptions s on s.user_id = u.id
where lower(u.email) = 'labmanager.info@gmail.com';
```

2. se l'utente contiene ancora riferimenti sandbox `cus_...` o `sub_...`, azzerare solo i riferimenti Stripe e riportarlo a stato pagabile:

```sql
update public.user_subscriptions s
set
  status = 'expired',
  subscription_plan = null,
  subscription_start_date = null,
  subscription_end_date = now(),
  stripe_customer_id = null,
  stripe_subscription_id = null,
  updated_at = now()
from auth.users u
where s.user_id = u.id
  and lower(u.email) = 'labmanager.info@gmail.com';
```

3. rieseguire la select del punto 1 e verificare:

- `stripe_customer_id` e `stripe_subscription_id` sono `null`
- `status` e `expired`
- l'app mostra il paywall o consente checkout

Esecuzione test:

1. accedere all'app con `labmanager.info@gmail.com`
2. avviare checkout mensile
3. completare pagamento reale live
4. non premere `Invia ricevuta` dalla Dashboard
5. attendere alcuni minuti
6. controllare inbox Gmail, inclusa spam/promozioni
7. controllare Stripe live:
   - Checkout Session `complete`
   - Subscription `active`
   - Invoice `paid`
   - Charge `succeeded`
   - `receipt_email=labmanager.info@gmail.com`
   - `receipt_number` non-null
8. controllare Supabase:
   - `status=active`
   - `subscription_plan=monthly`
   - `stripe_customer_id` live valorizzato
   - `stripe_subscription_id` live valorizzato

PASS:

- email Stripe ricevuta automaticamente senza invio manuale
- `receipt_number` valorizzato su charge o invoice
- email contiene ricevuta coerente con il pagamento
- app/DB risultano attivi sul nuovo `sub_...` live

FAIL:

- pagamento live riuscito ma nessuna email ricevuta dopo attesa ragionevole
- `receipt_number` resta `null`
- email contiene allegati o contenuti non accettabili per il requisito operativo
- webhook live non aggiorna `user_subscriptions`

Rollback dopo test, se necessario:

- cancellare o annullare la subscription live dal Dashboard Stripe
- rimborsare il pagamento live se serve
- riportare l'utente a `expired` solo se non deve restare attivo
- non riusare nel test successivo lo stesso customer live se vuoi una prova completamente pulita

---

## 7. Verifica finale minima del Blocco A

Checklist:

- query SQL post-migration con `2 rows`
- `create-checkout-session` configurata con due `price_...` reali
- `create-customer-portal-session` configurata con return URL reali
- URL Android inseriti esattamente come sopra
- URL Windows verificati in browser prima di salvarli
- nessun segreto Stripe committato nel repo

Verifica locale repo gia disponibile:

```powershell
node --test supabase/functions/create-checkout-session/config.test.mjs supabase/functions/create-checkout-session/handler.test.mjs
node --test supabase/functions/create-customer-portal-session/config.test.mjs supabase/functions/create-customer-portal-session/handler.test.mjs
```

Expected:

- entrambe le suite PASS
