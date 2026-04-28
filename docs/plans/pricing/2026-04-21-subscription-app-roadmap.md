# Roadmap Operativa - Abbonamento Solo In App

> Data: 2026-04-21
> Scopo: avere una checklist unica, cronologica e pratica per portare LabManager da "trial su sito + app" a "trial e abbonamento gestiti correttamente dentro l'app".

---

## 1) Obiettivo finale

Arrivare a questo flusso completo:

```text
utente crea account
-> accetta termini e privacy
-> parte trial di 14 giorni
-> usa l'app normalmente
-> trial scade
-> paywall in app
-> utente sceglie mensile o annuale
-> Payment Link Stripe
-> webhook Stripe aggiorna Supabase
-> app vede stato active e si sblocca
```

---

## 2) Stato attuale

Gia completato:

- [x] pricing del sito riallineato a funnel informativo
- [x] checkout Stripe del sito archiviato come test tecnico interno
- [x] trial deciso a 14 giorni
- [x] tabella `public.user_subscriptions` creata in Supabase con RLS
- [x] prodotto e prezzi Stripe creati in test mode

Non ancora completato:

- [ ] gate legale in app
- [ ] connessione app -> `user_subscriptions`
- [ ] trial automatico al primo login
- [ ] `SubscriptionGuard`
- [ ] `PaywallPage`
- [ ] configurazione `Payment Links` per mensile e annuale
- [ ] edge function `stripe-webhook`
- [ ] test end-to-end completo

---

## 3) Regole bloccate

Queste decisioni non vanno piu rimesse in discussione mentre implementi:

- il sito non vende
- il piano si sceglie solo in app
- il trial dura 14 giorni
- il trial parte dopo il consenso legale
- `public.user_subscriptions` e la fonte di verita business
- Stripe Sync Engine non sostituisce la tua logica applicativa
- per partire veloce usiamo `Payment Links` Stripe, non checkout dinamico server-side

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

- [ ] finalizzare Termini e Privacy dell'app
- [ ] decidere il formato di versione documento, per esempio:
  - `terms_v1`
  - `privacy_v1`
- [ ] aggiungere campi o tabella per tracciare:
  - `terms_accepted_at`
  - `terms_version`
  - `privacy_accepted_at`
  - `privacy_version`
- [ ] mostrare schermata bloccante se le accettazioni mancano

**Output atteso**

- l'utente entra nel prodotto solo dopo il consenso legale

**Dipendenza**

- nessuna

---

### Fase 2 - Collegare l'app al record subscription

**Obiettivo**
Rendere `user_subscriptions` leggibile in modo reattivo dall'app.

**Da fare**

- [ ] aggiungere `user_subscriptions` allo schema PowerSync
- [ ] creare model `UserSubscription`
- [ ] creare `SubscriptionRepository`
- [ ] creare `subscriptionProvider`
- [ ] creare `subscriptionStatusProvider`
- [ ] creare `trialDaysRemainingProvider`

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

- [ ] intercettare il primo login riuscito
- [ ] controllare se esiste gia un record in `user_subscriptions`
- [ ] se non esiste:
  - creare record con `status = trial`
  - impostare `trial_start_date = now`
  - impostare `trial_end_date = now + 14 giorni`

**Nota**

Questa creazione deve avvenire solo dopo il consenso legale completato.

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

- [ ] creare `SubscriptionGuard`
- [ ] avvolgere il contenuto principale dell'app
- [ ] definire il comportamento:
  - `trial` -> accesso completo
  - `active` -> accesso completo
  - `expired` -> paywall

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

- [ ] creare `PaywallPage`
- [ ] mostrare:
  - stato trial scaduto
  - piano mensile
  - piano annuale
  - CTA `Abbonati`
  - CTA `Contattaci`
- [ ] aggiungere copy chiaro:
  - i dati non vengono cancellati
  - l'accesso si riattiva appena il pagamento va a buon fine
- [ ] prevedere apertura di un link esterno Stripe dal bottone piano

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

- [ ] creare un banner visibile solo in stato `trial`
- [ ] mostrare i giorni rimanenti
- [ ] scegliere dove renderlo:
  - home dashboard
  - header
  - area notifiche interna

**Output atteso**

- l'utente non arriva a scadenza senza preavviso

**Dipendenza**

- Fase 2

---

### Fase 7 - Preparare i Payment Links Stripe

**Obiettivo**
Preparare due link statici Stripe, uno mensile e uno annuale, da aprire dal paywall.

**Da fare**

- [ ] creare `Payment Link` mensile in Stripe Dashboard
- [ ] creare `Payment Link` annuale in Stripe Dashboard
- [ ] salvare i due URL in una configurazione chiara del progetto app
- [ ] definire i parametri da appendere runtime:
  - `prefilled_email`
  - `client_reference_id=<user_id>`

**Env richiesti**

- non obbligatori lato app, se i link sono statici
- opzionale avere config remota o env per:
  - `STRIPE_PAYMENT_LINK_MONTHLY`
  - `STRIPE_PAYMENT_LINK_ANNUAL`

**Output atteso**

- dal paywall puoi aprire il link del piano corretto senza creare sessioni dinamiche

**Dipendenza**

- Fase 5

---

### Fase 8 - Collegare il paywall ai Payment Links

**Obiettivo**
Far partire davvero Stripe quando l'utente tocca il piano.

**Da fare**

- [ ] collegare i bottoni del paywall ai due URL Stripe
- [ ] gestire loading
- [ ] aggiungere in apertura link:
  - `prefilled_email`
  - `client_reference_id`
- [ ] aprire il browser esterno / webview secondo il flusso deciso

**Output atteso**

- dal paywall si entra davvero nella pagina Stripe del piano selezionato

**Dipendenza**

- Fase 5
- Fase 7

---

### Fase 9 - Implementare il webhook Stripe

**Obiettivo**
Aggiornare Supabase in modo automatico quando Stripe cambia stato.

**Da fare**

- [ ] creare edge function `stripe-webhook`
- [ ] impostare `verify_jwt = false`
- [ ] verificare la firma con `STRIPE_WEBHOOK_SECRET`
- [ ] gestire almeno questi eventi:
  - `checkout.session.completed`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`
  - `customer.subscription.deleted`
- [ ] aggiornare `public.user_subscriptions`:
  - `active` su pagamento riuscito
  - `expired` su fallimento o cancellazione
- [ ] leggere `client_reference_id` dal checkout per associare il pagamento al `user_id`
- [ ] salvare:
  - `stripe_customer_id`
  - `stripe_subscription_id`
  - `subscription_plan`
  - `subscription_start_date`
  - `subscription_end_date`

**File atteso**

- `supabase/functions/stripe-webhook/index.ts`

**Env richiesti**

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

**Output atteso**

- Stripe aggiorna automaticamente lo stato business dell'utente

**Dipendenza**

- Fase 7

---

### Fase 10 - Configurare Stripe Dashboard

**Obiettivo**
Far puntare Stripe alle tue function e ai tuoi link corretti.

**Da fare**

- [ ] verificare che prodotto e prezzi test esistano davvero
- [ ] creare e nominare bene il `Payment Link` mensile
- [ ] creare e nominare bene il `Payment Link` annuale
- [ ] configurare endpoint webhook verso Supabase
- [ ] copiare `whsec_...`
- [ ] salvare `STRIPE_WEBHOOK_SECRET` nelle function
- [ ] verificare che gli env delle function siano completi

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

- [ ] utente nuovo
- [ ] login riuscito
- [ ] consenso legale
- [ ] creazione record `trial`
- [ ] accesso durante trial
- [ ] scadenza o simulazione scadenza
- [ ] comparsa paywall
- [ ] click piano mensile
- [ ] apertura Payment Link Stripe riuscita
- [ ] webhook ricevuto
- [ ] stato aggiornato a `active`
- [ ] app sbloccata

**Scenario aggiuntivo**

- [ ] pagamento fallito
- [ ] subscription cancellata
- [ ] account riportato a `expired`

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

Se vuoi seguire la roadmap senza disperderti, fai cosi:

1. Fase 1 - gate legale
2. Fase 2 - model/repository/provider
3. Fase 3 - trial automatico
4. Fase 4 - subscription guard
5. Fase 5 - paywall
6. Fase 6 - banner trial
7. Fase 7 - payment links
8. Fase 8 - collegamento paywall -> payment links
9. Fase 9 - webhook
10. Fase 10 - config Stripe
11. Fase 11 - test end-to-end
12. Fase 12 - stabilizzazione

---

## 6) Criterio di completamento

Puoi considerare il progetto "chiuso" quando tutte queste condizioni sono vere:

- un utente nuovo entra in trial senza interventi manuali
- un utente scaduto vede sempre il paywall
- il piano si sceglie solo in app
- il pagamento aggiorna Supabase via webhook
- l'app si sblocca automaticamente dopo il pagamento
- i casi di fallimento e cancellazione tornano a `expired`

---

## 7) Documenti di supporto

Usa questo file come roadmap principale.
Usa gli altri solo come supporto di dettaglio:

- `docs/plans/pricing/trial-timer-implementazione.md`
- `docs/plans/pricing/trial-onboarding-flow.md`
- `docs/plans/pricing/pricing-strategy.md`
- `docs/plans/pricing/2026-04-15-subscription-cutover-plan.md`
