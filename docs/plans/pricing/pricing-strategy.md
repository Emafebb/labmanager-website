# Pricing Strategy - LabManager

> Documento di lavoro: strategia di pricing, copy pagina prezzi e note di implementazione.
> Ultimo aggiornamento: 2026-04-21

---

## Decisioni Prese

| Decisione | Scelta |
|---|---|
| Struttura | Piano singolo, tutto incluso |
| Trial | Contatto diretto, invio link, registrazione autonoma |
| Modello | Mensile + Annuale |
| Attivazione abbonamento | Solo in app, dal paywall, non sul sito |
| Regime fiscale | Forfettario, non soggetto IVA |
| Dispositivi inclusi | 2 connessioni simultanee nel piano base |
| Dispositivi extra | Su richiesta diretta, attivazione manuale |

## Stato Operativo

- Pricing page del sito gia riallineata a funnel informativo + trial.
- Test di checkout Stripe sul sito archiviato come validazione tecnica interna.
- Prossimo blocco di lavoro: trial, paywall, checkout e webhook nel flusso app.

---

## Prezzi

| | Prezzo cliente |
|---|---|
| **Mensile** | **€44,99/mese** |
| **Annuale** | **€480/anno** |

- Annuale = **€40/mese equivalente**, risparmio di **€60** rispetto al mensile
- Nessun costo di attivazione
- Nessun vincolo contrattuale sul mensile
- Prezzo finale, nessuna IVA addebitata al cliente

---

## Messaggi Chiave

### Proposta di valore principale

> "Un solo piano. Tutto incluso. Nessuna sorpresa."

### ROI per il cliente

> "€1,32 al giorno, meno di un caffè al bar."
> "Se una ricetta sbagliata ti fa sprecare anche solo €50 al mese, LabManager si ripaga in tre giorni."

### Differenziatore trial

> "Scrivici, ti mandiamo il link per iniziare subito, gratis per 14 giorni."

### Regola di funnel

- Il sito mostra prezzi, trial e condizioni.
- La scelta del piano avviene solo dentro l'app.
- Il checkout Stripe non fa parte del funnel pubblico del sito.

---

## Copy Pagina Prezzi

### Hero

**Headline:**
Un solo piano. Tutto incluso. Nessuna sorpresa.

**Sottotitolo:**
LabManager ti dà accesso completo a tutte le funzionalità, ricette, costi, magazzino, etichette e team, senza moduli extra o versioni ridotte.

### Blocco Prezzo

**[ANNUALE - più scelto]**
```
€480 /anno

Equivale a €40 al mese, risparmi €60 rispetto al piano mensile

+ 2 sessioni private 1:1, setup iniziale e revisione dopo 6 mesi
+ Supporto prioritario

[Scelta piano dentro l'app]
```

**[MENSILE]**
```
€44,99 /mese

[Scelta piano dentro l'app]
```

**Testo sotto il prezzo:**
Nessun costo di attivazione. Nessun vincolo contrattuale sul mensile. Puoi disdire quando vuoi.

**Nota di orientamento:**
L'abbonamento non si attiva dal sito. Inizi la prova gratuita, usi LabManager e scegli il piano direttamente nell'app quando sei pronto.

### Vuoi provarlo prima?

Scrivici e ti mandiamo il link per scaricare l'app.
Crei il tuo profilo in autonomia e hai **14 giorni gratis** per provare tutto, nessuna carta di credito richiesta.

### Footer Pricing

Hai domande prima di iniziare?
`[Contattaci]` - rispondiamo entro poche ore.

---

## Note Implementazione Sito

- [x] 3 card affiancate: Prova 14 giorni, Mensile, Annuale
- [x] CTA "Inizia la prova gratis" -> WhatsApp con messaggio precompilato
- [x] Pricing page informativa, senza checkout self-serve sul sito
- [x] Prezzi finali senza IVA
- [x] Sezione "Cosa è incluso" con griglia 4 card feature
- [x] Blocco ROI presente
- [x] FAQ accordion con domande specifiche pricing
- [x] Copy esplicito: la scelta del piano avviene nell'app
- [ ] Aggiungere recensioni reali
- [ ] Decidere se spostare blocco ROI subito sotto le card

---

## TODO

- [ ] Scrivere copy email/messaggio risposta richieste trial
- [ ] Definire flusso onboarding trial
- [ ] Implementare in app: flag abbonamento (`active | trial | expired`) + paywall
- [ ] Implementare checkout Stripe nell'app con `user_id` nei metadata
- [ ] Aggiungere recensioni reali alla pagina
