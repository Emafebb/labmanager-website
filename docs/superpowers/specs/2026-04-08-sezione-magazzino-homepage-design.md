# Design — Sezione Magazzino Homepage

**Data:** 2026-04-08  
**Stato:** Approvato  
**Progetto:** labmanager-website (pastrylabmanager.com)

---

## Obiettivo

Aggiungere una nuova sezione nella homepage di pastrylabmanager.com per annunciare il modulo Gestione Magazzino di LabManager, in coordinamento con l'invio dell'email di lancio (`email_annuncio_magazzino.html`).

---

## Posizione nella Home

Ordine componenti in `src/app/page.tsx`:

```
<Hero />
<Features />
<Warehouse />          ← NEW — inserito qui
<WhyLabManager />
<Platforms />
<ContactForm />
<FAQ />
```

---

## Design della Sezione

### Sfondo e Differenziazione Visiva

- Sfondo: `bg-surface` (grigio chiaro `#F8F9FA`) — si distingue da `<Features />` che usa `bg-white`
- Padding: `py-24` — coerente con le altre sezioni

### Header

| Elemento | Contenuto | Stile |
|----------|-----------|-------|
| Badge | "Nuovo modulo" + punto verde animato | Stesso pattern pill del Hero (`animate-ping`) |
| Titolo H2 | "Il magazzino adesso lavora con te" | `font-display`, `font-bold`, `text-foreground` |
| Sottotitolo | "Carichi, prelevi, correggi, trasferisci. Ogni movimento è tracciato. Ogni scadenza è sotto controllo." | `text-gray-600`, max-w-2xl, centrato |

### Layout Card — 2 livelli

#### Livello 1 — 2 Hero Cards (funzionalità principali)

Layout: 2 colonne desktop / 1 colonna mobile  
Stile: `bg-white`, `rounded-3xl`, `shadow-sm`, `border border-gray-100`, `p-8`  
Icona: grande (48px), sfondo `bg-primary/10`, colore `text-primary`  
Descrizione: ~2-3 righe

| Card | Icona lucide | Titolo | Descrizione |
|------|-------------|--------|-------------|
| 1 | `PackagePlus` | Ricevimento Merci | Registra ogni carico con fornitore, lotto, data di scadenza e sede di destinazione. Ogni ricevimento aggiorna automaticamente la disponibilità. |
| 2 | `LayoutDashboard` | Disponibilità in tempo reale | Monitora le giacenze di materie prime, prodotti finiti e commerciali in ogni sede. Soglie di riordino configurabili per non restare mai a secco. |

#### Livello 2 — 6 Feature Cards (funzionalità di supporto)

Layout: 4 colonne desktop / 2 colonne tablet / 1 colonna mobile  
Stile: `bg-white`, `rounded-2xl`, `border border-gray-100`, `shadow-sm`, `p-5`  
Icona: media (32px), sfondo `bg-primary/10`

| Card | Icona lucide | Titolo | Descrizione |
|------|-------------|--------|-------------|
| 1 | `PackageMinus` | Prelievo | Scarica ingredienti dal magazzino per la produzione, manualmente o tramite bridge automatico dalla ricetta. |
| 2 | `ArrowDownUp` | Scarico FIFO automatico | I lotti più vecchi vengono consumati per primi. Nessuna gestione manuale, nessun spreco nascosto. |
| 3 | `BellRing` | Alert scadenze | Notifiche configurabili per i prodotti in scadenza. Intervieni prima che il problema diventi perdita. |
| 4 | `Building2` | Anagrafica Fornitori | Gestisci fornitori con dati completi: IBAN, condizioni di pagamento, categorie merceologiche e scontistica. |
| 5 | `ArrowLeftRight` | Trasferimenti tra sedi | Sposta merce da un magazzino all'altro con tracciabilità completa del movimento. |
| 6 | `MapPin` | Gestione multi-sede | Ogni sede ha il suo magazzino con collocazioni indipendenti. Visione consolidata o per singola sede. |

---

## Implementazione Tecnica

### File da creare

- `src/components/Warehouse.tsx` — componente statico, no `"use client"`

### File da modificare

- `src/app/page.tsx` — aggiungere `import Warehouse` e `<Warehouse />` dopo `<Features />`

### Dipendenze

- Nessuna nuova — usa solo `lucide-react` già presente nel progetto

### Pattern di riferimento

- Badge animato: stesso pattern di `Hero.tsx` (punto verde `animate-ping`)
- Card style: stesso pattern di `Features.tsx` (`heroFeatures` per le grandi, `features` per le piccole)
- Token colori: CSS custom properties del sito (`--primary`, classi Tailwind `text-foreground`, `text-gray-*`, `border-gray-100`)

---

## Note

- Il copy del titolo e sottotitolo è ripreso direttamente dall'email `email_annuncio_magazzino.html` per coerenza con la comunicazione di lancio
- Il componente è completamente statico — nessuno stato, nessuna chiamata API
- La sezione è pensata come evergreen: descrive funzionalità esistenti, non una beta
