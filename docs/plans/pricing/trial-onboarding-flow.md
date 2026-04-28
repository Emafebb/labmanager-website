# Trial Onboarding Flow - LabManager

> Flusso operativo per gestire i prospect dal primo contatto alla conversione.
> Ultimo aggiornamento: 2026-04-21

---

## Modello

```text
Prospect scrive -> Tu mandi il link di download -> Cliente crea il profilo -> Trial 14 giorni parte in automatico -> Follow-up WhatsApp -> Trial scade -> Paywall -> Scelta piano direttamente in app
```

Tu controlli chi entra nel trial, ma non devi attivare manualmente account o abbonamenti in Supabase.

## Principio Base

Il cliente tipo e in laboratorio alle 5 del mattino. Non ha tempo per esplorare software da solo.
Il trial funziona se lo accompagni nei primi giorni, altrimenti apre l'app due volte e poi si ferma.

**Obiettivo del trial:** far inserire almeno 3 ricette reali con costi nei primi 3 giorni.
Chi arriva a quel punto converte molto piu facilmente.

---

## Durata: 14 giorni

| Durata | Problema |
|---|---|
| 7 giorni | Troppo poco, rischia di non arrivare a inserire ricette reali |
| **14 giorni** | Tempo sufficiente per testare il flusso e decidere senza rimandare |
| 21 giorni | Da evitare: rallenta la decisione e abbassa l'urgenza |

---

## Timeline

```text
GIORNO 0  - Richiesta ricevuta
GIORNO 1  - Invio link + primo contatto
GIORNO 3  - Primo check-in
GIORNO 7  - Meta trial
GIORNO 10 - Urgenza soft
GIORNO 12 - Ultimo avviso
GIORNO 14 - Scadenza e paywall
```

---

## Giorno 0 - Richiesta ricevuta

Rispondi entro 2 ore dalla richiesta, anche solo per confermare.

**Messaggio WhatsApp:**
> Ciao [Nome], grazie per l'interesse in LabManager.
> Che tipo di attivita hai? Pasticceria, panificio o ristorante?

Questo ti aiuta a qualificare il prospect e rende la risposta percepita come personale.

---

## Giorno 1 - Invio link

Mandi il link di download. Il cliente scarica l'app, crea il profilo e il trial parte in automatico.

**Messaggio WhatsApp:**
> Ciao [Nome], ecco il link per scaricare LabManager: [link]
>
> Crea il tuo profilo e hai 14 giorni gratis per provare tutto.
>
> Per iniziare velocemente oggi fai queste 3 cose:
> 1. aggiungi i tuoi ingredienti principali con i prezzi
> 2. crea la tua prima ricetta
> 3. controlla il food cost calcolato in automatico
>
> Se hai dubbi su qualsiasi passaggio, scrivimi qui.

---

## Giorno 3 - Primo check-in

Non aspettare che scrivano loro.

**Messaggio WhatsApp:**
> Ciao [Nome], come sta andando con LabManager?
> Sei riuscito a inserire qualche ricetta?
>
> Se ti sei bloccato su qualcosa dimmi pure, in 5 minuti ti aiuto.

Se non ha ancora inserito niente, proponi una chiamata rapida di 15 minuti.

---

## Giorno 7 - Meta trial

Capisci se il prospect e caldo o freddo. Aggancia una funzione che non ha ancora provato.

**Messaggio WhatsApp:**
> Ciao [Nome], sei gia a meta del periodo di prova.
>
> Come ti trovi finora? C'e qualche funzione che non hai ancora provato e vuoi vedere meglio?
>
> Se ti interessa, posso mostrarti come usare magazzino e tracciabilita lotti.

---

## Giorno 10 - Urgenza soft

**Messaggio WhatsApp:**
> Ciao [Nome], mancano 4 giorni alla scadenza del tuo trial.
>
> Se vuoi continuare senza interruzioni, puoi attivare direttamente in app il piano annuale a EUR 480 oppure mensile a EUR 44,99.
>
> Se vuoi, ti aiuto io a capire quale dei due ha piu senso per il tuo laboratorio.

---

## Giorno 12 - Ultimo avviso

**Messaggio WhatsApp:**
> Ciao [Nome], il tuo account LabManager scade tra 2 giorni.
>
> Se vuoi continuare, apri l'app e attiva il piano dal paywall. I tuoi dati restano al loro posto.
>
> Se invece non fa per te, nessun problema: dimmi pure cosa non ti ha convinto.

---

## Giorno 14 - Scadenza

L'account passa a `expired`.
L'app mostra il paywall e il cliente puo scegliere il piano direttamente li.
I dati restano archiviati.

---

## Classificare i prospect

| Segnale | Significato | Azione |
|---|---|---|
| Ha inserito ricette nei primi 3 giorni | Prospect caldo | Seguilo con attenzione |
| Ti risponde ai messaggi | Coinvolto | Aumenta la frequenza dei contatti |
| Non ha mai aperto l'app | Freddo | Un tentativo di recupero, poi lascia perdere |
| Fa domande su funzioni specifiche | Sta valutando seriamente | Rispondi veloce |
| Chiede del prezzo durante il trial | Pronto a comprare | Anticipa la conversazione sul piano |

---

## Gestione obiezioni

**"E un po caro"**
> Capisco. Se ti aiuta a recuperare anche solo EUR 50 al mese di sprechi su ricette o ingredienti, si ripaga in meno di un mese.

**"Non ho tempo di impararlo"**
> Ci penso io. Dammi 20 minuti in videochiamata e ti porto sulle prime ricette.

**"Lo uso gia su carta o Excel"**
> Excel va bene finche hai poche ricette. Quando cresci o devi gestire tracciabilita e costi in modo continuo, non basta piu.

---

## Stato operativo

- [x] Trial deciso a 14 giorni
- [x] Tabella `public.user_subscriptions` creata in Supabase
- [ ] Paywall ancora da implementare nell'app
- [ ] Checkout Stripe in app ancora da collegare

## TODO

- [ ] Collegare l'app al record `user_subscriptions`
- [ ] Costruire paywall in app per account `expired`
- [ ] Collegare checkout Stripe e webhook
- [ ] Valutare se automatizzare i messaggi di follow-up
- [ ] Creare un tracker prospect per i trial attivi
