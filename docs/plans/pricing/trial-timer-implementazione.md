# Trial Timer - Archivio Implementazione Tecnica

> Documento storico sul sistema trial/abbonamento di LabManager.
> Ultimo aggiornamento: 2026-04-22

> Documento conservato solo per background e riferimento storico.
> Non deve essere aggiornato come guida operativa dell'implementazione attiva.

Riferimenti attivi:

- `docs/superpowers/plans/2026-04-22-stripe-billing-server-driven-implementation.md` - piano di implementazione attivo
- `docs/piani/pricing/2026-04-22-stripe-billing-server-driven-manual-checklist.md` - checklist manuale operativa
- `docs/piani/pricing/2026-04-22-stripe-dashboard-runbook.md` - runbook Stripe/Supabase e verifiche

---

## Quadro Storico

Questo documento riassume solo il percorso storico del trial/abbonamento:

- attivazione trial al primo login dopo il consenso legale
- salvataggio dello stato subscription in `public.user_subscriptions`
- blocco accesso con paywall alla scadenza del trial
- sincronizzazione dello stato app tramite PowerSync

---

## Flusso Storico Di Riferimento

```text
Primo login
    ->
Consenso legale completato
    ->
Creazione record trial
    ->
Controllo stato all'avvio app
    ->
trial / active / expired
```

Questo schema resta valido solo come panoramica del dominio e non descrive l'implementazione attiva.

---

## Note Di Archiviazione

Le sezioni operative che in passato descrivevano configurazioni Stripe, identificativi dei vecchi link di checkout e contract webhook precedenti sono state ritirate da questo documento.

Questo file non deve essere aggiornato per riflettere il flusso corrente: per l'esecuzione attiva usa esclusivamente i documenti elencati sopra.
