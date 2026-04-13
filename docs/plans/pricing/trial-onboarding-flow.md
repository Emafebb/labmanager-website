# Trial Onboarding Flow — LabManager

> Flusso completo per gestire i prospect dal primo contatto alla conversione.
> Ultimo aggiornamento: 2026-04-13

---

## Modello

```
Prospect scrive → Tu mandi il link di download → Cliente scarica e crea profilo da solo → Trial 21 giorni parte in automatico → Follow-up WhatsApp → Paywall a scadenza
```

Tu controlli chi entra (mandi il link tu), ma non devi attivare niente a mano in Supabase.

## Principio Base

Il cliente tipo è in laboratorio alle 5 di mattina. Non ha tempo per esplorare software da solo. Il trial funziona solo se lo guidi tu — altrimenti apre l'app due volte e si dimentica.

**Obiettivo del trial:** far inserire almeno 3 ricette reali con costi nei primi 3 giorni. Chi arriva a quel punto converte quasi sempre.

---

## Durata: 21 giorni

| Durata | Problema |
|---|---|
| 14 giorni | Troppo poco — i primi giorni li perde a capire l'interfaccia |
| 30 giorni | Troppi — crea procrastinazione |
| **21 giorni** | Tempo reale + urgenza mantenuta ✓ |

---

## Timeline

```
GIORNO 0  — Richiesta ricevuta
GIORNO 1  — Attivazione + primo contatto
GIORNO 3  — Primo check-in
GIORNO 7  — Metà trial
GIORNO 14 — Urgenza soft
GIORNO 19 — Ultimo avviso
GIORNO 21 — Scadenza
```

---

## Giorno 0 — Richiesta Ricevuta

Rispondi **entro 2 ore** dalla richiesta (anche solo per confermare).

**Messaggio WhatsApp:**
> Ciao [Nome], grazie per l'interesse in LabManager!
> Che tipo di attività hai? Pasticceria, panificio, ristorante?

*Chiedere il tipo di attività qualifica il prospect e fa sentire la risposta personalizzata, non automatica.*

---

## Giorno 1 — Invio Link

Mandi il link di download. Il cliente scarica, crea il profilo da solo, e il trial parte in automatico dall'account creation.

**Messaggio WhatsApp:**
> Ciao [Nome]! Ecco il link per scaricare LabManager: [link]
>
> Crea il tuo profilo e hai 21 giorni gratis per provare tutto.
>
> Per iniziare nel modo più veloce, fai queste 3 cose oggi:
> 1. Aggiungi i tuoi ingredienti principali con i prezzi
> 2. Crea la tua prima ricetta
> 3. Guarda il food cost calcolato in automatico
>
> Se hai dubbi su qualsiasi passaggio, scrivimi qui — rispondo io direttamente.

---

## Giorno 3 — Primo Check-in

Non aspettare che scrivano loro.

**Messaggio WhatsApp:**
> Ciao [Nome], come stai andando con LabManager?
> Hai riuscito a inserire qualche ricetta?
>
> Se ti sei bloccato su qualcosa dimmi pure — in 5 minuti ti risolvo.

*Se non ha ancora inserito niente: offri una chiamata rapida di 15 minuti per guidarlo in diretta.*

---

## Giorno 7 — Metà Trial

Valuta se è un prospect caldo o freddo. Aggancia una funzione che non ha ancora visto.

**Messaggio WhatsApp:**
> Ciao [Nome], sei già a metà del periodo di prova!
>
> Come ti trovi finora? C'è qualche funzione che non hai ancora provato e vuoi esplorare?
>
> Se ti interessa, posso mostrarti come funziona il magazzino con la tracciabilità lotti — per molti clienti è la parte che fa più differenza.

---

## Giorno 14 — Urgenza Soft

**Messaggio WhatsApp:**
> Ciao [Nome], mancano 7 giorni alla scadenza del tuo trial.
>
> Se vuoi continuare senza interruzioni, puoi attivare il piano annuale a €400 (€488 con IVA) oppure mensile a €45 (€54,90 con IVA).
>
> Hai domande prima di decidere?

---

## Giorno 19 — Ultimo Avviso

**Messaggio WhatsApp:**
> Ciao [Nome], il tuo account LabManager scade tra 2 giorni.
>
> Se vuoi continuare, rispondimi e ti mando il link per attivare l'abbonamento.
> I tuoi dati (ricette, ingredienti, magazzino) rimangono tutti al loro posto.
>
> Se invece non fa per te, nessun problema — dimmi pure cosa non ti ha convinto, mi aiuta a migliorare.

---

## Giorno 21 — Scadenza

L'account passa a `expired`. L'app mostra il paywall.
I dati restano archiviati per 12 mesi.

---

## Classificare i Prospect

| Segnale | Significato | Azione |
|---|---|---|
| Ha inserito ricette nei primi 3 giorni | Prospect caldo | Segui con attenzione |
| Ti risponde ai messaggi | Coinvolto | Aumenta frequenza contatti |
| Non ha mai aperto l'app | Freddo | Un tentativo di recupero, poi lascia perdere |
| Fa domande su funzioni specifiche | Sta valutando seriamente | Rispondi veloce |
| Chiede del prezzo durante il trial | Pronto a comprare | Non aspettare il giorno 21 — proponi subito |

---

## Gestione Obiezioni

**"È un po' caro"**
> Capisco. Considera che se ti aiuta a recuperare anche €50 al mese di sprechi su ricette o ingredienti, si ripaga in meno di un mese. Vuoi che ti mostro come usare il food cost per trovare dove perdi margine?

**"Non ho tempo di impararlo"**
> Ci penso io — dammi 20 minuti in videochiamata e ti configuro tutto. Dopo non devi fare altro che inserire le ricette.

**"Lo uso già su carta / Excel"**
> Excel va bene finché hai 10 ricette. Quando cresci, o quando arriva un'ispezione ASL sulla tracciabilità, è un altro discorso.

---

## TODO

- [ ] Implementare flag stato abbonamento in Supabase: `active | trial | expired`
- [ ] Implementare campo data scadenza trial
- [ ] Costruire paywall in app per account `expired`
- [ ] Valutare se automatizzare i messaggi di follow-up (es. con un CRM semplice)
- [ ] Creare un foglio/tracker prospect per tenere traccia dei trial attivi
