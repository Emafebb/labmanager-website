# Trial Timer - Implementazione Tecnica

> Documento tecnico per il sistema di trial/abbonamento di LabManager.
> Ultimo aggiornamento: 2026-04-21

> Decisione corrente: il sito non gestisce il checkout. La scelta del piano e il pagamento avvengono solo dentro l'app, dal paywall.

## Stato Operativo

- [x] Pricing del sito riallineato a funnel informativo + trial
- [x] `public.user_subscriptions` creato in Supabase con RLS
- [x] Prodotto e prezzi Stripe creati in test mode
- [ ] Implementazione applicativa ancora da fare nel repo app

---

## Decisioni Architetturali

| Decisione | Scelta |
|---|---|
| Inizio trial | Al primo login, dopo il consenso legale |
| Durata trial | 14 giorni |
| Storage | PowerSync, locale + sync Supabase |
| Scadenza | Blocco totale, paywall immediato |
| Pagamento | Stripe con webhook automatico |
| Superficie checkout | Solo in app, dal paywall |

---

## Flusso Completo

```text
PRIMO LOGIN
    ->
Consenso legale completato
    ->
Nessun record subscription?
    -> crea record: status=trial, trial_end=oggi+14gg
    ->
App controlla status ad ogni avvio
    ->
    |- trial   (trial_end > oggi)   -> accesso completo
    |- active  (sub_end > oggi)     -> accesso completo
    `- expired                     -> paywall

PAGAMENTO (Stripe, da app)
    ->
create-checkout con user_id + plan
    ->
Stripe Checkout
    ->
Webhook
    -> aggiorna Supabase: status=active, subscription_end_date
    ->
PowerSync sincronizza
    -> app sblocca automaticamente
```

---

## 1. Schema Database Supabase

```sql
create table if not exists public.user_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,

  status text not null default 'trial'
    check (status in ('trial', 'active', 'expired')),

  trial_start_date timestamptz not null default now(),
  trial_end_date timestamptz not null default (now() + interval '14 days'),

  subscription_plan text
    check (subscription_plan in ('monthly', 'annual')),
  subscription_start_date timestamptz,
  subscription_end_date timestamptz,

  stripe_customer_id text,
  stripe_subscription_id text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (user_id)
);

alter table public.user_subscriptions enable row level security;

drop policy if exists "user_subscriptions_own" on public.user_subscriptions;
create policy "user_subscriptions_own"
on public.user_subscriptions
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists user_subscriptions_updated_at on public.user_subscriptions;
create trigger user_subscriptions_updated_at
before update on public.user_subscriptions
for each row
execute function public.update_updated_at();
```

Note:

- il trial e allineato a 14 giorni, non 21
- `public.user_subscriptions` resta la fonte di verita business
- eventuali tabelle syncate da Stripe non sostituiscono questa tabella
- eventuali sync automatici Stripe in Supabase non sostituiscono webhook e logica applicativa

---

## 2. PowerSync - Schema Locale

Aggiungere `user_subscriptions` allo schema PowerSync in `powersync_service.dart`:

```dart
const userSubscriptionsTable = Table("user_subscriptions", [
  Column.text("user_id"),
  Column.text("status"),
  Column.text("trial_start_date"),
  Column.text("trial_end_date"),
  Column.text("subscription_plan"),
  Column.text("subscription_start_date"),
  Column.text("subscription_end_date"),
  Column.text("stripe_customer_id"),
  Column.text("stripe_subscription_id"),
  Column.text("created_at"),
  Column.text("updated_at"),
]);
```

---

## 3. Modello Dart

**File:** `lib/models/user_subscription_model.dart`

```dart
enum SubscriptionStatus { trial, active, expired }

class UserSubscription {
  final String id;
  final String userId;
  final SubscriptionStatus status;
  final DateTime trialStartDate;
  final DateTime trialEndDate;
  final String? subscriptionPlan;
  final DateTime? subscriptionStartDate;
  final DateTime? subscriptionEndDate;
  final String? stripeCustomerId;
  final String? stripeSubscriptionId;

  const UserSubscription({
    required this.id,
    required this.userId,
    required this.status,
    required this.trialStartDate,
    required this.trialEndDate,
    this.subscriptionPlan,
    this.subscriptionStartDate,
    this.subscriptionEndDate,
    this.stripeCustomerId,
    this.stripeSubscriptionId,
  });

  SubscriptionStatus get effectiveStatus {
    final now = DateTime.now().toUtc();
    if (subscriptionEndDate != null && subscriptionEndDate!.isAfter(now)) {
      return SubscriptionStatus.active;
    }
    if (trialEndDate.isAfter(now)) {
      return SubscriptionStatus.trial;
    }
    return SubscriptionStatus.expired;
  }

  int get trialDaysRemaining {
    if (effectiveStatus != SubscriptionStatus.trial) return 0;
    return trialEndDate
        .difference(DateTime.now().toUtc())
        .inDays
        .clamp(0, 14);
  }

  bool get hasFullAccess =>
      effectiveStatus == SubscriptionStatus.trial ||
      effectiveStatus == SubscriptionStatus.active;

  factory UserSubscription.fromMap(Map<String, dynamic> map) {
    return UserSubscription(
      id: map["id"] as String,
      userId: map["user_id"] as String,
      status: SubscriptionStatus.values.firstWhere(
        (s) => s.name == map["status"],
        orElse: () => SubscriptionStatus.expired,
      ),
      trialStartDate: DateTime.parse(map["trial_start_date"] as String),
      trialEndDate: DateTime.parse(map["trial_end_date"] as String),
      subscriptionPlan: map["subscription_plan"] as String?,
      subscriptionStartDate: map["subscription_start_date"] != null
          ? DateTime.parse(map["subscription_start_date"] as String)
          : null,
      subscriptionEndDate: map["subscription_end_date"] != null
          ? DateTime.parse(map["subscription_end_date"] as String)
          : null,
      stripeCustomerId: map["stripe_customer_id"] as String?,
      stripeSubscriptionId: map["stripe_subscription_id"] as String?,
    );
  }
}
```

---

## 4. Repository

**File:** `lib/repository/subscription_repository.dart`

```dart
class SubscriptionRepository {
  PowerSyncDatabase get _db => PowerSyncService().database;

  Stream<UserSubscription?> watchSubscription(String userId) async* {
    await for (final results in _db.watch(
      "SELECT * FROM user_subscriptions WHERE user_id = ?",
      parameters: [userId],
    )) {
      if (results.isEmpty) {
        yield null;
      } else {
        yield UserSubscription.fromMap(results.first);
      }
    }
  }

  Future<UserSubscription?> getSubscription(String userId) async {
    final results = await _db.getAll(
      "SELECT * FROM user_subscriptions WHERE user_id = ?",
      [userId],
    );
    if (results.isEmpty) return null;
    return UserSubscription.fromMap(results.first);
  }
}
```

---

## 5. Provider

**File:** `lib/providers/subscription_provider.dart`

```dart
final subscriptionProvider = StreamProvider<UserSubscription?>((ref) {
  final authState = ref.watch(authStateProvider);

  return authState.maybeWhen(
    data: (user) {
      if (user == null) return Stream.value(null);
      return SubscriptionRepository().watchSubscription(user.id);
    },
    orElse: () => Stream.value(null),
  );
});

final subscriptionStatusProvider = Provider<SubscriptionStatus>((ref) {
  final subscription = ref.watch(subscriptionProvider).valueOrNull;
  if (subscription == null) return SubscriptionStatus.expired;
  return subscription.effectiveStatus;
});

final trialDaysRemainingProvider = Provider<int>((ref) {
  final subscription = ref.watch(subscriptionProvider).valueOrNull;
  return subscription?.trialDaysRemaining ?? 0;
});
```

---

## 6. Primo Login - Creazione Record Trial

Al primo login, se non esiste un record subscription, va creato.
Il posto giusto e il flusso di autenticazione esistente in `authentication_service.dart`.

```dart
Future<void> initializeSubscriptionIfNeeded(String userId) async {
  final existing = await SubscriptionRepository().getSubscription(userId);
  if (existing != null) return;

  await Supabase.instance.client.from("user_subscriptions").insert({
    "user_id": userId,
    "status": "trial",
    "trial_start_date": DateTime.now().toUtc().toIso8601String(),
    "trial_end_date": DateTime.now()
        .toUtc()
        .add(const Duration(days: 14))
        .toIso8601String(),
  });
}
```

---

## 7. SubscriptionGuard - Paywall

Widget wrapper che controlla l'accesso. Avvolge il contenuto principale dell'app.

**File:** `lib/widgets/common/subscription_guard.dart`

```dart
class SubscriptionGuard extends ConsumerWidget {
  final Widget child;

  const SubscriptionGuard({required this.child, super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final subscriptionAsync = ref.watch(subscriptionProvider);

    return subscriptionAsync.when(
      loading: () => const SplashScreen(),
      error: (_, __) => const PaywallPage(),
      data: (subscription) {
        if (subscription == null) return const SplashScreen();
        if (!subscription.hasFullAccess) return const PaywallPage();
        return child;
      },
    );
  }
}
```

---

## 8. PaywallPage

**File:** `lib/pages/paywall_page.dart`

Contenuto minimo:

- messaggio chiaro di trial scaduto
- piano mensile
- piano annuale
- CTA `Abbonati`
- CTA `Contattaci`
- copy rassicurante: i dati non vengono cancellati

I pulsanti "Abbonati" aprono Stripe Checkout dal paywall in app, non dal sito.

---

## 9. Banner Trial Attivo

Quando lo status e `trial`, mostrare un banner discreto nell'app con i giorni rimasti.

```dart
Consumer(
  builder: (context, ref, _) {
    final days = ref.watch(trialDaysRemainingProvider);
    final status = ref.watch(subscriptionStatusProvider);

    if (status != SubscriptionStatus.trial) {
      return const SizedBox.shrink();
    }

    return TrialBanner(daysRemaining: days);
  },
)
```

---

## 10. Stripe Webhook - Edge Function Supabase

**File:** `supabase/functions/stripe-webhook/index.ts`

Note operative:

- la function deve essere pubblica per Stripe, quindi `verify_jwt = false`
- la firma webhook va sempre verificata con `STRIPE_WEBHOOK_SECRET`
- questa function aggiorna `public.user_subscriptions`

```typescript
import Stripe from "npm:stripe@14";
import { createClient } from "npm:@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!);
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  const signature = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SECRET")!,
    );
  } catch {
    return new Response("Webhook signature invalid", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id;
      const plan = session.metadata?.plan;
      if (!userId || !plan) break;

      const endDate = plan === "annual"
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      await supabase.from("user_subscriptions").update({
        status: "active",
        subscription_plan: plan,
        subscription_start_date: new Date().toISOString(),
        subscription_end_date: endDate.toISOString(),
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
      }).eq("user_id", userId);
      break;
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = invoice.customer as string;

      const { data } = await supabase
        .from("user_subscriptions")
        .select("subscription_plan")
        .eq("stripe_customer_id", customerId)
        .single();

      if (!data) break;

      const endDate = data.subscription_plan === "annual"
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      await supabase.from("user_subscriptions").update({
        status: "active",
        subscription_end_date: endDate.toISOString(),
      }).eq("stripe_customer_id", customerId);
      break;
    }

    case "customer.subscription.deleted":
    case "invoice.payment_failed": {
      const obj = event.data.object as Stripe.Subscription | Stripe.Invoice;
      const customerId = (obj as Stripe.Subscription).customer as string ||
        (obj as Stripe.Invoice).customer as string;

      await supabase.from("user_subscriptions").update({
        status: "expired",
      }).eq("stripe_customer_id", customerId);
      break;
    }
  }

  return new Response("OK", { status: 200 });
});
```

---

## 11. Checkout Stripe - Edge Function per app

Genera il link di pagamento con `user_id` nei metadata.
Questa function va invocata dal paywall dell'app autenticata.

**File:** `supabase/functions/create-checkout/index.ts`

```typescript
import Stripe from "npm:stripe@14";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!);

Deno.serve(async (req) => {
  const { plan, userId } = await req.json();

  const priceId = plan === "annual"
    ? Deno.env.get("STRIPE_PRICE_ANNUAL")!
    : Deno.env.get("STRIPE_PRICE_MONTHLY")!;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { user_id: userId, plan },
    success_url: Deno.env.get("CHECKOUT_SUCCESS_URL")!,
    cancel_url: Deno.env.get("CHECKOUT_CANCEL_URL")!,
    locale: "it",
  });

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { "Content-Type": "application/json" },
  });
});
```

Note:

- usare URL di ritorno coerenti con il flusso app
- se necessario usare una pagina ponte web o deep link gestiti dall'app

---

## 12. Variabili d'Ambiente Supabase

Da configurare nelle Edge Functions settings:

```text
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_PRICE_MONTHLY
STRIPE_PRICE_ANNUAL
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
CHECKOUT_SUCCESS_URL
CHECKOUT_CANCEL_URL
```

---

## Ordine di Implementazione

- [x] **Step 1** - Creare tabella `user_subscriptions` in Supabase con RLS
- [ ] **Step 2** - Aggiungere tabella allo schema PowerSync
- [ ] **Step 3** - Creare `UserSubscription` model + repository
- [ ] **Step 4** - Creare `subscriptionProvider` e `subscriptionStatusProvider`
- [ ] **Step 5** - Aggiungere `initializeSubscriptionIfNeeded` al flusso di login
- [ ] **Step 6** - Creare `SubscriptionGuard` e avvolgere il contenuto principale
- [ ] **Step 7** - Creare `PaywallPage`
- [ ] **Step 8** - Aggiungere banner trial nell'app
- [x] **Step 9** - Creare prodotti e prezzi su Stripe in test mode
- [ ] **Step 10** - Deploy edge function `create-checkout`
- [ ] **Step 11** - Deploy edge function `stripe-webhook` + configurare webhook su Stripe Dashboard
- [ ] **Step 12** - Test end-to-end: login -> trial -> paywall -> pagamento -> sblocco
