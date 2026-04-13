# Trial Timer — Implementazione Tecnica

> Documento tecnico per il sistema di trial/abbonamento di LabManager.
> Ultimo aggiornamento: 2026-04-13

---

## Decisioni Architetturali

| Decisione | Scelta |
|---|---|
| Inizio trial | Al primo login (creazione profilo) |
| Storage | PowerSync — locale + sync Supabase |
| Scadenza | Blocco totale — paywall immediato |
| Pagamento | Stripe con webhook automatico |

---

## Flusso Completo

```
PRIMO LOGIN
    ↓
Nessun record subscription? → Crea record: status=trial, trial_end=oggi+21gg
    ↓
App controlla status ad ogni avvio
    ↓
    ├── trial  (trial_end > oggi)     → accesso completo
    ├── active (sub_end > oggi)       → accesso completo
    └── expired                       → paywall

PAGAMENTO (Stripe)
    ↓
Webhook → aggiorna Supabase: status=active, subscription_end_date
    ↓
PowerSync sincronizza → app sblocca automaticamente
```

---

## 1. Schema Database Supabase

```sql
CREATE TABLE user_subscriptions (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Stato (calcolato e scritto da edge function / webhook)
  status                TEXT NOT NULL DEFAULT 'trial'
                        CHECK (status IN ('trial', 'active', 'expired')),

  -- Trial
  trial_start_date      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  trial_end_date        TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '21 days'),

  -- Abbonamento pagato
  subscription_plan     TEXT CHECK (subscription_plan IN ('monthly', 'annual')),
  subscription_start_date TIMESTAMPTZ,
  subscription_end_date   TIMESTAMPTZ,

  -- Stripe
  stripe_customer_id    TEXT,
  stripe_subscription_id TEXT,

  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id)
);

-- RLS: ogni utente vede solo il proprio record
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_subscriptions_own" ON user_subscriptions
  FOR ALL USING (auth.uid() = user_id);

-- Aggiorna updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_subscriptions_updated_at
  BEFORE UPDATE ON user_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

## 2. PowerSync — Schema Locale

Aggiungere `user_subscriptions` allo schema PowerSync in `powersync_service.dart`:

```dart
const userSubscriptionsTable = Table('user_subscriptions', [
  Column.text('user_id'),
  Column.text('status'),
  Column.text('trial_start_date'),
  Column.text('trial_end_date'),
  Column.text('subscription_plan'),
  Column.text('subscription_start_date'),
  Column.text('subscription_end_date'),
  Column.text('stripe_customer_id'),
  Column.text('stripe_subscription_id'),
  Column.text('created_at'),
  Column.text('updated_at'),
]);

// Aggiungere alla lista delle tabelle esistenti nello schema PowerSync
```

---

## 3. Modello Dart

**File:** `lib/models/user_subscription_model.dart`

```dart
/// UserSubscription — Stato abbonamento utente
/// Patterns: Freezed, fromMap/toMap
/// Dependencies: powersync_service.dart
/// Created: 2026-04-13

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

  /// Calcola lo stato effettivo dai campi data (fonte di verità)
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

  /// Giorni rimasti nel trial (0 se scaduto o abbonamento attivo)
  int get trialDaysRemaining {
    if (effectiveStatus != SubscriptionStatus.trial) return 0;
    return trialEndDate.difference(DateTime.now().toUtc()).inDays.clamp(0, 21);
  }

  bool get hasFullAccess =>
    effectiveStatus == SubscriptionStatus.trial ||
    effectiveStatus == SubscriptionStatus.active;

  factory UserSubscription.fromMap(Map<String, dynamic> map) {
    return UserSubscription(
      id: map['id'] as String,
      userId: map['user_id'] as String,
      status: SubscriptionStatus.values.firstWhere(
        (s) => s.name == map['status'],
        orElse: () => SubscriptionStatus.expired,
      ),
      trialStartDate: DateTime.parse(map['trial_start_date'] as String),
      trialEndDate: DateTime.parse(map['trial_end_date'] as String),
      subscriptionPlan: map['subscription_plan'] as String?,
      subscriptionStartDate: map['subscription_start_date'] != null
          ? DateTime.parse(map['subscription_start_date'] as String)
          : null,
      subscriptionEndDate: map['subscription_end_date'] != null
          ? DateTime.parse(map['subscription_end_date'] as String)
          : null,
      stripeCustomerId: map['stripe_customer_id'] as String?,
      stripeSubscriptionId: map['stripe_subscription_id'] as String?,
    );
  }
}
```

---

## 4. Repository

**File:** `lib/repository/subscription_repository.dart`

```dart
/// SubscriptionRepository — Accesso dati abbonamento
/// Patterns: Repository, PowerSync watch()
/// Dependencies: powersync_service.dart, user_subscription_model.dart
/// Created: 2026-04-13

class SubscriptionRepository {
  PowerSyncDatabase get _db => PowerSyncService().database;

  /// Stream reattivo — si aggiorna automaticamente quando Stripe/webhook
  /// aggiorna il record su Supabase e PowerSync sincronizza
  Stream<UserSubscription?> watchSubscription(String userId) async* {
    await for (final results in _db.watch(
      'SELECT * FROM user_subscriptions WHERE user_id = ?',
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
      'SELECT * FROM user_subscriptions WHERE user_id = ?',
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
/// subscriptionProvider — Stato abbonamento reattivo
/// Patterns: StreamProvider, autoDispose
/// Dependencies: subscription_repository.dart, auth_provider.dart
/// Created: 2026-04-13

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

/// Provider di convenienza per lo stato effettivo
final subscriptionStatusProvider = Provider<SubscriptionStatus>((ref) {
  final subscription = ref.watch(subscriptionProvider).valueOrNull;
  if (subscription == null) return SubscriptionStatus.expired;
  return subscription.effectiveStatus;
});

/// Giorni rimasti nel trial
final trialDaysRemainingProvider = Provider<int>((ref) {
  final subscription = ref.watch(subscriptionProvider).valueOrNull;
  return subscription?.trialDaysRemaining ?? 0;
});
```

---

## 6. Primo Login — Creazione Record Trial

Al primo login, se non esiste un record subscription, va creato.
Il posto giusto è il flusso di autenticazione esistente in `authentication_service.dart`.

```dart
/// Da chiamare subito dopo il login andato a buon fine
Future<void> initializeSubscriptionIfNeeded(String userId) async {
  final existing = await SubscriptionRepository().getSubscription(userId);
  if (existing != null) return; // già esiste, niente da fare

  // Crea via Supabase (non PowerSync — è una scrittura, non lettura)
  await Supabase.instance.client.from('user_subscriptions').insert({
    'user_id': userId,
    'status': 'trial',
    'trial_start_date': DateTime.now().toUtc().toIso8601String(),
    'trial_end_date': DateTime.now().toUtc()
        .add(const Duration(days: 21))
        .toIso8601String(),
  });
  // PowerSync sincronizza automaticamente il nuovo record
}
```

---

## 7. SubscriptionGuard — Paywall

Widget wrapper che controlla l'accesso. Avvolge il contenuto principale dell'app.

**File:** `lib/widgets/common/subscription_guard.dart`

```dart
/// SubscriptionGuard — Blocco accesso se abbonamento scaduto
/// Patterns: ConsumerWidget, subscriptionProvider
/// Dependencies: subscription_provider.dart
/// Created: 2026-04-13

class SubscriptionGuard extends ConsumerWidget {
  final Widget child;

  const SubscriptionGuard({required this.child, super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final subscriptionAsync = ref.watch(subscriptionProvider);

    return subscriptionAsync.when(
      loading: () => const SplashScreen(), // o loading indicator
      error: (_, __) => const PaywallPage(),
      data: (subscription) {
        if (subscription == null) return const SplashScreen();
        if (!subscription.hasFullAccess) return const PaywallPage();
        return child;
      },
    );
  }
}

// Utilizzo in main.dart o nel router principale:
// SubscriptionGuard(child: MainAppContent())
```

---

## 8. PaywallPage

**File:** `lib/pages/paywall_page.dart`

Contenuto minimo della pagina di blocco:

```
┌─────────────────────────────────────┐
│                                     │
│   Il tuo periodo di prova           │
│   è terminato.                      │
│                                     │
│   Per continuare ad usare           │
│   LabManager scegli un piano:       │
│                                     │
│   ┌──────────┐    ┌──────────┐     │
│   │ Mensile  │    │ Annuale  │     │
│   │ €45/mese │    │ €400/anno│     │
│   │          │    │          │     │
│   │[Abbonati]│    │[Abbonati]│     │
│   └──────────┘    └──────────┘     │
│                                     │
│   I tuoi dati sono al sicuro.       │
│   Abbonati per accedere.            │
│                                     │
│          [Contattaci]               │
│                                     │
└─────────────────────────────────────┘
```

- I pulsanti "Abbonati" aprono Stripe Checkout (link generato lato Supabase Edge Function)
- "Contattaci" apre WhatsApp con messaggio pre-compilato
- I dati NON vengono cancellati — il cliente li ritrova tutti appena paga

---

## 9. Banner Trial Attivo

Quando lo status è `trial`, mostrare un banner discreto nell'app con i giorni rimasti.

```dart
// Da inserire nel layout principale, visibile solo in stato trial
Consumer(
  builder: (context, ref, _) {
    final days = ref.watch(trialDaysRemainingProvider);
    final status = ref.watch(subscriptionStatusProvider);

    if (status != SubscriptionStatus.trial) return const SizedBox.shrink();

    return TrialBanner(daysRemaining: days); // "Prova gratuita: 14 giorni rimasti"
  },
)
```

---

## 10. Stripe Webhook — Edge Function Supabase

**File Supabase Edge Function:** `supabase/functions/stripe-webhook/index.ts`

```typescript
import Stripe from 'npm:stripe@14';
import { createClient } from 'npm:@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

Deno.serve(async (req) => {
  const signature = req.headers.get('stripe-signature')!;
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!
    );
  } catch {
    return new Response('Webhook signature invalid', { status: 400 });
  }

  switch (event.type) {

    // Pagamento completato — attiva abbonamento
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id;
      const plan = session.metadata?.plan; // 'monthly' | 'annual'
      if (!userId) break;

      const endDate = plan === 'annual'
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      await supabase.from('user_subscriptions').update({
        status: 'active',
        subscription_plan: plan,
        subscription_start_date: new Date().toISOString(),
        subscription_end_date: endDate.toISOString(),
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
      }).eq('user_id', userId);
      break;
    }

    // Rinnovo automatico riuscito
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = invoice.customer as string;

      const { data } = await supabase
        .from('user_subscriptions')
        .select('subscription_plan')
        .eq('stripe_customer_id', customerId)
        .single();

      if (!data) break;

      const endDate = data.subscription_plan === 'annual'
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      await supabase.from('user_subscriptions').update({
        status: 'active',
        subscription_end_date: endDate.toISOString(),
      }).eq('stripe_customer_id', customerId);
      break;
    }

    // Abbonamento cancellato o pagamento fallito
    case 'customer.subscription.deleted':
    case 'invoice.payment_failed': {
      const obj = event.data.object as Stripe.Subscription | Stripe.Invoice;
      const customerId = (obj as Stripe.Subscription).customer as string
        || (obj as Stripe.Invoice).customer as string;

      await supabase.from('user_subscriptions').update({
        status: 'expired',
      }).eq('stripe_customer_id', customerId);
      break;
    }
  }

  return new Response('OK', { status: 200 });
});
```

---

## 11. Checkout Stripe — Edge Function

Genera il link di pagamento con `user_id` nei metadata (necessario per il webhook).

**File:** `supabase/functions/create-checkout/index.ts`

```typescript
import Stripe from 'npm:stripe@14';
import { createClient } from 'npm:@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);

Deno.serve(async (req) => {
  const { plan, userId } = await req.json(); // 'monthly' | 'annual'

  const priceId = plan === 'annual'
    ? Deno.env.get('STRIPE_PRICE_ANNUAL')!   // €400/anno
    : Deno.env.get('STRIPE_PRICE_MONTHLY')!; // €45/mese

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { user_id: userId, plan },
    success_url: 'https://pastrylabmanager.com/payment-success',
    cancel_url: 'https://pastrylabmanager.com/abbonamenti',
    locale: 'it',
  });

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
```

---

## 12. Variabili d'Ambiente Supabase

Da configurare nelle Edge Functions settings:

```
STRIPE_SECRET_KEY          → sk_live_...
STRIPE_WEBHOOK_SECRET      → whsec_...
STRIPE_PRICE_MONTHLY       → price_... (€45/mese)
STRIPE_PRICE_ANNUAL        → price_... (€400/anno)
SUPABASE_URL               → https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY  → service_role key
```

---

## Ordine di Implementazione

- [ ] **Step 1** — Creare tabella `user_subscriptions` in Supabase con RLS
- [ ] **Step 2** — Aggiungere tabella allo schema PowerSync
- [ ] **Step 3** — Creare `UserSubscription` model + repository
- [ ] **Step 4** — Creare `subscriptionProvider` e `subscriptionStatusProvider`
- [ ] **Step 5** — Aggiungere `initializeSubscriptionIfNeeded` al flusso di login
- [ ] **Step 6** — Creare `SubscriptionGuard` e avvolgere il contenuto principale
- [ ] **Step 7** — Creare `PaywallPage` (prima versione minimal)
- [ ] **Step 8** — Aggiungere banner trial nell'app
- [ ] **Step 9** — Creare prodotti e prezzi su Stripe (€45/mese, €400/anno)
- [ ] **Step 10** — Deploy edge function `create-checkout`
- [ ] **Step 11** — Deploy edge function `stripe-webhook` + configurare webhook su Stripe Dashboard
- [ ] **Step 12** — Test end-to-end: login → trial → paywall → pagamento → sblocco
