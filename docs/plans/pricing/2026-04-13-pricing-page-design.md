# Design Spec — Pagina Pricing LabManager

> Data: 2026-04-13
> Stato: Approvato — pronto per implementazione

---

## Obiettivo

Creare una pagina `/pricing` separata, puramente informativa, che mostri prezzi, valore incluso e FAQ dedicati. Nessun CTA d'acquisto diretto — la conversione avviene tramite i canali esistenti (form contatto, WhatsApp flottante).

---

## Decisioni di design

| Decisione | Scelta | Motivazione |
|---|---|---|
| Tipo pagina | Route separata `/pricing` | URL condivisibile, SEO dedicato, spazio per tutte le sezioni |
| CTA d'acquisto | Nessuno | Il modello trial prevede contatto diretto, non self-service |
| Layout blocco prezzo | Due card affiancate (mensile + annuale) | Confronto immediato, l'annuale risalta con badge e bordo viola |
| Trial | Riga sotto le card ("Prova gratuita 21 giorni") | Informativo senza sezione dedicata |
| Recensioni | Spazio placeholder per 2-3 recensioni | Contenuto da aggiungere in seguito |
| FAQ | 6 FAQ dedicate al pricing | Rispondono alle obiezioni della fase decisionale |
| Navbar | Link "Prezzi" dopo "Funzionalità" | Primo link relativo al costo, posizione naturale nel funnel |

---

## Struttura pagina (dall'alto in basso)

### 1. Hero Pricing

- **Headline:** "Un solo piano. Tutto incluso. Nessuna sorpresa."
- **Sottotitolo:** "LabManager ti dà accesso completo a tutte le funzionalità — ricette, costi, magazzino, etichette, tracciabilità lotti — senza scegliere tra versioni ridotte o pagare extra per ciò che ti serve davvero."
- Layout: centrato, coerente con gli header delle altre sezioni del sito
- Pattern: badge uppercase + h1 + paragrafo descrittivo

### 2. Blocco Prezzo — Due card affiancate

**Card Mensile** (a sinistra):
- Bordo grigio chiaro (`border-light`), sfondo bianco
- Label: "Mensile"
- Prezzo: **€44.99/mese**
- Nota: "Nessun vincolo contrattuale"

**Card Annuale** (a destra, leggermente più grande):
- Bordo viola (`primary`), sfondo bianco
- Badge in alto: "Più scelto" (sfondo `primary`, testo bianco, `border-radius` pill)
- Label: "Annuale"
- Prezzo: **€480/anno**
- Risparmio: "€40/mese — risparmi €60" (testo `primary`, bold)

**Riga sotto le card (centrata):**
- "Prova gratuita di 14 giorni · Nessun costo di attivazione"
- Testo secondario, font size ridotto

**Responsive:** su mobile le card si impilano verticalmente, annuale prima (è la scelta raccomandata).

### 3. Recensioni (placeholder)

- Griglia orizzontale per 2-3 card recensione
- Ogni card: testo citazione, nome, ruolo/attività
- Per ora la sezione **non viene renderizzata** — verrà attivata quando saranno disponibili recensioni reali. Il codice prevede la struttura ma la sezione è commentata o nascosta tramite condizione
- Su mobile: stack verticale

### 4. Cosa è incluso

**Titolo sezione:** "Tutto quello che ti serve, dal primo giorno"

Griglia 2x2 su desktop, impilata su mobile. Ogni blocco ha: icona (lucide-react), titolo, lista di bullet.

**Ricette e Produzione:**
- Ricette illimitate con costi aggiornati in automatico
- Calcolo food cost preciso al grammo
- Analisi nutrizionale e bilanciamento degli impasti
- Calcolatori specializzati per gelato, pasticceria, pane e lievito madre
- Pianificazione della produzione giornaliera

**Magazzino e Tracciabilità:**
- Magazzino multi-sede con alert scadenze
- Tracciabilità lotti e scarico FIFO
- Scanner barcode per entrata merce e DDT
- Storico movimenti sempre disponibile

**Etichette e Conformità:**
- Etichette alimentari conformi alla normativa
- Allergeni in evidenza automatica
- Export PDF per DDT, distinte di produzione, report

**Team e Dispositivi:**
- Accesso da Android e Windows
- Funziona offline — sincronizzazione automatica
- Gestione utenti con ruoli e permessi
- I tuoi dati sempre al sicuro nel cloud

### 5. Blocco ROI

- Card evidenziata con sfondo `primary-muted` o `primary-subtle`
- Testo principale: **"€1,10 al giorno. Meno di un caffè al bar."**
- Testo secondario: "Se una ricetta sbagliata ti fa sprecare anche solo €50 al mese di materie prime, LabManager si ripaga in tre giorni."
- Layout centrato, font size più grande per l'importo giornaliero

### 6. FAQ Pricing

Accordion identico al componente FAQ della home page. 6 domande:

1. **Posso cambiare da mensile ad annuale?** — Sì, in qualsiasi momento. La differenza viene scalata dal periodo già pagato.
2. **Cosa succede se smetto di pagare?** — I tuoi dati rimangono archiviati per 12 mesi. Se torni, ritrovi tutto esattamente com'era.
3. **È adatto anche a ristoranti e pizzerie?** — Sì. Le funzionalità di food cost, ricette e gestione ingredienti funzionano per qualsiasi tipo di laboratorio alimentare.
4. **Posso usarlo senza connessione internet?** — Sì. LabManager funziona completamente offline su Android e Windows. I dati si sincronizzano in automatico quando torni online.
5. **Quanti utenti posso aggiungere?** — Il piano include accesso per il tuo team. Puoi configurare ruoli e permessi per ogni membro.
6. **C'è un contratto da firmare?** — No. Il piano mensile non ha vincoli — lo attivi e lo disdici quando vuoi. Il piano annuale è un pagamento unico anticipato.

---

## Modifiche alla Navbar

Ordine aggiornato dei link:

```
Funzionalità | Prezzi | Perché LabManager | Piattaforme | FAQ | Contatti | [Richiedi Info]
```

- "Prezzi" linka a `/pricing`
- Gli altri link restano ancoraggi alla home (`/#funzionalita`, ecc.)

---

## Pattern tecnici

- **Route:** `src/app/pricing/page.tsx` — Server Component (nessuna interattività client-side necessaria)
- **Componente:** `src/components/Pricing.tsx` non necessario — il contenuto è specifico della pagina, non riutilizzabile
- **Stile:** Tailwind classes + design tokens da `globals.css` (colori, font, animazioni)
- **Icone:** lucide-react per i blocchi feature
- **FAQ:** riutilizzare la logica accordion del componente FAQ esistente (estrarre se necessario, oppure duplicare — dipende dalla complessità)
- **Responsive:** mobile-first, card impilate su mobile, griglia su desktop
- **Animazioni:** `animate-fade-in-up` per le sezioni, con delay incrementali
- **SEO:** metadata dedicati per la pagina pricing (title, description)

---

## Nota sui prezzi

I prezzi indicati in questa spec (€45/mese, €400/anno) sono provvisori e potrebbero cambiare. L'implementazione deve definire tutti i valori di prezzo (netto, IVA, totale, risparmio, equivalente mensile, costo giornaliero ROI) come **costanti in un unico oggetto di configurazione** in cima al file della pagina, in modo che una modifica ai prezzi richieda un solo punto di intervento.

---

## Fuori scope

- Sistema di pagamento (Stripe, bonifico, ecc.)
- Logica trial/abbonamento nell'app
- Contenuto reale delle recensioni (solo placeholder)
- Analytics specifici della pagina pricing
