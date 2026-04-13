# Pricing Strategy — LabManager

> Documento di lavoro: strategia di pricing, copy pagina prezzi e note di implementazione.
> Ultimo aggiornamento: 2026-04-13

---

## Decisioni Prese

| Decisione | Scelta |
|---|---|
| Struttura | Piano singolo — tutto incluso |
| Trial | Contatto diretto → tu mandi il link → cliente scarica e si registra in autonomia |
| Modello | Mensile + Annuale |
| IVA | 22% — da mostrare separata sul sito |

---

## Prezzi

| | Netto | IVA 22% | Totale cliente |
|---|---|---|---|
| **Mensile** | €45/mese | + €9,90 | **€54,90/mese** |
| **Annuale** | €400/anno | + €88 | **€488/anno** |

- Annuale = **€33/mese equivalente** — risparmio di €145 vs mensile (26% sconto, ~3 mesi gratis)
- Nessun costo di attivazione
- Nessun vincolo contrattuale sul mensile

---

## Analisi Competitiva

| Competitor | Prezzo/anno (netto) | Funzionalità vs LabManager |
|---|---|---|
| Novicrea Classic | ~€239 | Meno (no magazzino, no etichette, no offline) |
| Novicrea PRO | ~€360 | Meno (no FIFO, no lotti, no offline) |
| PastrySkill | €410 primo anno / €330 rinnovo | Meno (no FIFO, no lotti, no offline) |
| Ricette in Cloud | ~€690 + €120 attivazione | Comparabile ma più costoso |

**Posizionamento:** LabManager è il miglior rapporto qualità/prezzo della categoria — funzionalità premium al prezzo dei competitor meno completi.

---

## Messaggi Chiave

### Proposta di valore principale
> "Un solo piano. Tutto incluso. Nessuna sorpresa."

### ROI per il cliente
> "€1,10 al giorno — meno di un caffè al bar."
> "Se una ricetta sbagliata ti fa sprecare anche solo €50 al mese, LabManager si ripaga in tre giorni."

### Differenziatore trial
> "Niente bot. Parli direttamente con noi."
> "Scrivici — ti mandiamo il link per iniziare subito, gratis per 21 giorni."

### Da evitare nel copy
- Elenchi tecnici di feature senza contesto ("FIFO", "tracciabilità lotti")
- Linguaggio da software enterprise
- Confronto diretto con competitor per nome

---

## Copy Pagina Prezzi

### Hero

**Headline:**
Un solo piano. Tutto incluso. Nessuna sorpresa.

**Sottotitolo:**
LabManager ti dà accesso completo a tutte le funzionalità — ricette, costi, magazzino, etichette, tracciabilità lotti — senza scegliere tra versioni ridotte o pagare extra per ciò che ti serve davvero.

---

### Blocco Prezzo

Toggle mensile / annuale — **annuale selezionato di default**

**[ANNUALE — più scelto]**
```
€400 /anno
IVA 22% esclusa — €488 totali

Equivale a €33 al mese — risparmi €145 rispetto al piano mensile

[Inizia ora — piano annuale]
```

**[MENSILE]**
```
€45 /mese
IVA 22% esclusa — €54,90 al mese

[Inizia ora — piano mensile]
```

**Testo sotto il prezzo:**
Nessun costo di attivazione. Nessun vincolo contrattuale sul mensile. Puoi disdire quando vuoi.

---

### Cosa è incluso

**Titolo sezione:**
Tutto quello che ti serve, dal primo giorno

**Ricette e Produzione**
- Ricette illimitate con costi aggiornati in automatico
- Calcolo food cost preciso al grammo
- Analisi nutrizionale e bilanciamento degli impasti
- Calcolatori specializzati per gelato, pasticceria, pane e lievito madre
- Pianificazione della produzione giornaliera

**Magazzino e Tracciabilità**
- Magazzino multi-sede con alert scadenze
- Tracciabilità lotti e scarico FIFO
- Scanner barcode per entrata merce e DDT
- Storico movimenti sempre disponibile

**Etichette e Conformità**
- Etichette alimentari conformi alla normativa
- Allergeni in evidenza automatica
- Export PDF per DDT, distinte di produzione, report

**Team e Dispositivi**
- Accesso da Android e Windows
- Funziona offline — sincronizzazione automatica
- Gestione utenti con ruoli e permessi
- I tuoi dati sempre al sicuro nel cloud

---

### Blocco ROI

```
€1,10 al giorno.
Meno di un caffè al bar.
Se una ricetta sbagliata ti fa sprecare anche solo €50 al mese di materie prime,
LabManager si ripaga in tre giorni.
```

---

### Vuoi provarlo prima?

Scrivici e ti mandiamo il link per scaricare l'app.
Crei il tuo profilo in autonomia e hai **21 giorni gratis** per provare tutto — nessuna carta di credito richiesta.

Se hai domande durante il trial, rispondiamo noi direttamente.

**Niente bot. Parli direttamente con noi.**

`[Scrivici per il link di prova]`

---

### FAQ

**Posso cambiare da mensile ad annuale?**
Sì, in qualsiasi momento. La differenza viene scalata dal periodo già pagato.

**Cosa succede se smetto di pagare?**
I tuoi dati rimangono archiviati per 12 mesi. Se torni, ritrovi tutto esattamente com'era.

**È adatto anche a ristoranti e pizzerie?**
Sì. Le funzionalità di food cost, ricette e gestione ingredienti funzionano per qualsiasi tipo di laboratorio alimentare.

**Posso usarlo senza connessione internet?**
Sì. LabManager funziona completamente offline su Android e Windows. I dati si sincronizzano in automatico quando torni online.

**Quanti utenti posso aggiungere?**
Il piano include accesso per il tuo team. Puoi configurare ruoli e permessi per ogni membro.

**C'è un contratto da firmare?**
No. Il piano mensile non ha vincoli — lo attivi e lo disdici quando vuoi. Il piano annuale è un pagamento unico anticipato.

---

### Footer Pricing

Hai domande prima di iniziare?
`[Contattaci]` — rispondiamo entro poche ore.

---

## Note Implementazione Sito

- [ ] Toggle mensile/annuale con **annuale selezionato di default**
- [ ] Blocco ROI ("€1,10 al giorno") subito sotto il prezzo, non in fondo
- [ ] CTA demo nello sticky header della pagina prezzi
- [ ] Inserire 2-3 recensioni reali tra blocco prezzo e "Cosa è incluso"
- [ ] Mostrare IVA 22% separata in modo chiaro (come da normativa italiana)
- [ ] Link CTA demo → WhatsApp o form contatto

---

## TODO

- [ ] Scrivere copy email/messaggio risposta richieste demo
- [ ] Definire flusso onboarding trial (cosa mostrare, quanti giorni, follow-up)
- [ ] Implementare in app: flag abbonamento (`active | trial | expired`) + paywall
- [ ] Aggiungere recensioni reali alla pagina
- [ ] Definire metodo di pagamento (Stripe, bonifico, altro)
