# Piano: Allineamento Landing Page allo Stile App Flutter LabManager

## Contesto
La landing page attuale ha un'estetica "AI slop" con gradienti aggressivi, blob decorativi, effetti glow eccessivi. L'app Flutter reale ha uno stile **pulito, professionale, minimale**: sfondo bianco, card con bordi sottili arrotondati, icone indaco (#5C6BC0), tipografia bold semplice su bianco. Il redesign deve allineare il sito all'app.

## Strategia Landing Page
- **Obiettivo principale**: Vetrina prodotto + raccolta contatti (NON spingere download)
- **Download**: Pagina separata `/download` non linkata dalla nav (accessibile solo via URL diretto)
- **CTA principale**: "Richiedi Info" nella navbar → porta a #contatti
- **Tono**: Informativo e professionale, non aggressivo
- **Pricing**: Gratuito per ora, piani a pagamento in futuro

## Riferimenti Estetici dall'App Flutter
- **Card**: bianche, `border-radius: 12px`, bordo `#80CBC4` con alpha 40, ombra subtile `blur 4-12px`
- **Icone**: colore `#5C6BC0` (indaco), NO gradienti sulle icone
- **Sfondo**: bianco puro, niente blob/gradient su background
- **Testo**: `#333333`, font weight 600 per bold, sistema sans-serif
- **Primary**: `#4403af` usato come accent, NON come colore dominante
- **Bordi card**: `#80CBC4` (teal chiaro) con bassa opacità
- **Animazioni**: 200ms, `ease-out-cubic`, molto sottili

## Screenshot Disponibili
- `public/images/screen smartphone.jpg` - Dashboard home smartphone
- `public/images/Screenshot tablet.jpg` - Dashboard home tablet
- `public/images/Screenshot DESKTOP.png` - Dashboard home desktop con sidebar
- `public/images/Screen Bilanciamento.png` - Tabella bilanciamento ricetta con % nutrizionali
- `public/images/logo.png` - Logo LabManager

---

## PARTE A: CONTENUTI DEFINITIVI (TUTTE LE DECISIONI PRESE)

### 1. Navbar ✅ DECISO
**Struttura**: Logo | Funzionalità | Piattaforme | FAQ | Contatti | **[Richiedi Info]**
- Rimosso "Download" dalla nav
- CTA: "Richiedi Info" → link a `#contatti`
- Aggiunto "FAQ"

### 2. Hero ✅ DECISO
- **Titolo**: "La tua pasticceria, sempre con te" (confermato)
- **Sottotitolo**: "LabManager è l'app completa per gestire ricette, costi e produzione della tua pasticceria."
- **CTA primario**: "Scopri Funzionalità" → scrolla a `#funzionalita`
- **CTA secondario**: "Contattaci" → scrolla a `#contatti`
- **Trust indicators**: Android + Windows | Funziona Offline | Dati sicuri su Cloud
- **Screenshot**: smartphone + desktop + tablet con screenshot reali dell'app
- **Layout desktop (lg+)**: testo a sinistra, 3 device affiancati a destra. Mobile: impilato (testo sopra, device sotto)
- **Rimosso badge "ORA DISPONIBILE"**: l'app non è ancora pubblica

### 3. Features ✅ DECISO (Mix funzionalità app + vantaggi tecnici)

**8 funzionalità dall'app:**
1. **Ricette** - Crea, modifica e organizza tutte le ricette con ingredienti, procedimenti e rese
2. **Bilanciamento** - Analizza la composizione della ricetta (zuccheri, grassi, proteine, lattosio, solidi, acqua) con categorie di riferimento personalizzabili e range target
3. **Ingredienti & Semilavorati** - Gestisci inventario ingredienti con costi al kg, valori nutrizionali e semilavorati riutilizzabili
4. **Assemblaggi** - Combina più ricette e semilavorati per creare il prodotto finito (es. torta = pan di spagna + crema + glassa)
5. **Tools** - Calcolatori specifici per pasticceria: bagne, calcolo W, gelato, impasto, rinfresco lievito madre, stampi, tempistiche
6. **Tabella Nutrizionale** - Calcola automaticamente i valori nutrizionali completi per ogni prodotto
7. **Etichette EU 1169/2011** - Genera etichette alimentari conformi alla normativa europea con allergeni e valori nutrizionali
8. **Dashboard** - Monitora produzione, vendite, margini e performance con grafici e statistiche

**4 vantaggi tecnici (sezione separata sotto le features o come banner):**
- Funziona Offline (PowerSync, sincronizzazione automatica)
- Calcolo Costi Automatico (materie prime, manodopera, strutturali)
- Stampa & Esporta PDF (ricette, etichette, report)
- Dati Sicuri su Cloud (Supabase, backup automatici, crittografia)

### 4. Platforms ✅ DECISO (Focus esperienza utente, NO termini tecnici)
- **Smartphone**: "Sempre in tasca" - Porta LabManager sempre con te. Perfetto per consultare ricette e registrare vendite in movimento.
- **Tablet**: "Lo schermo grande per il laboratorio" - Visione completa delle ricette e dashboard, ideale per la postazione in laboratorio.
- **Desktop Windows**: "Gestione completa dall'ufficio" - La versione completa per gestire ricette, costi, etichette e report dalla postazione fissa.
- NO "Material Design" / "Fluent UI" (troppo tecnico per l'utente)
- **NO screenshot** (già presenti nell'Hero, sarebbe ridondante)
- **NO liste features per piattaforma** (le funzionalità sono identiche su tutti i dispositivi)
- Card compatte: solo icona centrata, nome, sottotitolo, descrizione

### 5. Download → PAGINA SEPARATA `/download` ✅ DECISO
- Route dedicata `src/app/download/page.tsx`
- NON linkata dalla nav principale
- Accessibile solo via URL diretto: `pastrylabmanager.com/download`
- Contenuto: card essenziali Android APK + Windows EXE (icona, nome, sottotitolo, bottone)
- NO badge "CONSIGLIATO", NO liste funzionalità, NO benefit strip, NO versione/data aggiornamento
- Da rendere pubblica in futuro quando si vorrà spingere il download

### 6. ContactForm ✅ DECISO
- **CTA principale del sito** (la nav porta qui)
- **Motivi di contatto aggiornati**:
  - Richiedi una demo
  - Informazioni generali sull'app
  - Segnala un problema tecnico
  - Suggerisci una funzionalità
- Form: nome, email, messaggio (invariato)

### 7. FAQ ✅ DECISO + AMPLIATO (9 domande)
**Domande definitive:**
1. **"Come posso provare l'app?"** → Contattaci tramite il form per richiedere accesso. L'app è attualmente in fase di lancio e stiamo selezionando i primi utenti.
2. **"Quanto costa LabManager?"** → LabManager è attualmente gratuito durante la fase di lancio. In futuro saranno disponibili piani a pagamento con funzionalità avanzate.
3. **"Funziona senza internet?"** → Sì, LabManager è progettato per funzionare offline: ricette, ingredienti, costi, etichette e tutti gli strumenti sono sempre disponibili anche senza connessione. La connessione è richiesta solo per la registrazione, il login e la sincronizzazione dei dati tra dispositivi. Quando torni online, tutto si aggiorna automaticamente.
4. **"Su quanti dispositivi posso usarlo?"** → Di base puoi usare LabManager contemporaneamente su 2 dispositivi. I dati si sincronizzano in tempo reale tra i dispositivi. Se hai bisogno di più postazioni, contattaci e troveremo la soluzione adatta a te.
5. **"Posso esportare ricette e documenti?"** → Sì, puoi esportare ricette in PDF ed Excel, incluse tabelle nutrizionali, etichette e report. I documenti sono pronti per la stampa.
6. **"L'app genera etichette alimentari?"** → Sì, LabManager genera etichette alimentari con lista ingredienti, allergeni evidenziati e tabella nutrizionale. Le etichette sono pensate come supporto al tuo lavoro: verifica sempre la correttezza dei dati prima dell'utilizzo, in quanto non ci assumiamo responsabilità per eventuali errori. (NO riferimenti a leggi/regolamenti)
7. **"Posso usarlo con il mio team?"** → Sì, puoi aggiungere i tuoi dipendenti con accesso tramite PIN e ruoli diversi (pasticcere, commessa, ecc.). Le ricette e gli assemblaggi possono essere condivisi tra gli utenti del team.
8. **"Sarà disponibile per iPhone/iPad?"** → Attualmente LabManager è disponibile per Android e Windows. Il supporto iOS è in fase di valutazione per il futuro.
9. **"I miei dati sono al sicuro?"** → Assolutamente sì. I tuoi dati sono protetti con crittografia e salvati su server cloud sicuri. Ogni account è isolato: nessun altro utente può vedere le tue ricette o i tuoi dati. Anche senza connessione internet, tutto resta salvato sul tuo dispositivo e si sincronizza automaticamente appena torni online. (NO termini tecnici come Supabase, RLS, SSL — linguaggio comprensibile per il target)

### 8. Footer ✅ DECISO
- Layout minimale: Brand + link sezioni + copyright
- **Aggiunta email**: `labmanager.info@gmail.com`
- Niente social per ora

---

## PARTE B: REDESIGN ESTETICO

### 1. globals.css ✅ FATTO
- Aggiornate CSS variables con colori reali app (`--icon-color`, `--card-border`, `--surface`)
- Rimossi: float, shimmer, glassmorphism, scrollbar custom
- Animazioni più sottili (20px, 400ms)
- Aggiunta classe `.app-card` riutilizzabile

### 2. layout.tsx ✅ FATTO
**File**: `src/app/layout.tsx`
- Sostituito Playfair Display con **DM Sans** (variable `--font-dm-sans`)
- Font coerente con lo stile pulito e moderno dell'app

### 3. Navbar ✅ FATTO
**File**: `src/components/Navbar.tsx`
- Rimosso glassmorphism → `bg-white border-b border-gray-200` quando scrolled
- Logo: rimosso glow/rotate, scale subtile (105)
- CTA: "Richiedi Info" → #contatti, solid bg-primary, rounded-lg, no gradient
- Nav links: Funzionalità | Piattaforme | FAQ | Contatti
- Menu mobile: sfondo bianco solido, stessi link + CTA

### 4. Hero ✅ FATTO (aggiornato post-review)
**File**: `src/components/Hero.tsx`
- Rimossi blob animati, dots, scroll indicator, SVG underline
- Background: `#F8F9FA` pulito
- Screenshot reali (smartphone + desktop + tablet) in device frames semplici (bg-gray-900)
- **Rimosso badge "ORA DISPONIBILE"** (app non ancora pubblica)
- CTA: "Scopri Funzionalità" + "Contattaci", solid, no gradient
- Trust indicators: dots indaco statici + testo
- **Layout desktop (lg+)**: `flex-row` — testo a sinistra (`flex-1`), device a destra (`flex-1`)
- **Layout mobile**: impilato — testo sopra, device sotto
- Font titolo: `lg:text-5xl xl:text-6xl` + `whitespace-nowrap` su "sempre con te"
- Server component (no "use client")

### 5. Features ✅ FATTO (aggiornato post-review)
**File**: `src/components/Features.tsx`
- Card `.app-card`: bianche, bordo card-border-light, rounded-xl, shadow-sm
- Icone colore `#5C6BC0` (text-icon) flat in bg-icon/10
- Hover via .app-card class (lift -2px + shadow-md)
- Rimossi: glow effects, floating dots, bottom CTA box, hoveredIndex state
- **8 funzionalità app** aggiornate (Ricette, Bilanciamento, Ingredienti, Assemblaggi, Tools, Tab. Nutrizionale, Etichette, Dashboard)
- **4 vantaggi tecnici** in strip bg-surface sotto la griglia
- Server component (no "use client")
- **Section id corretto**: `#funzionalita` (era `#features`, causava mismatch con nav links)

### 6. Platforms ✅ FATTO (aggiornato post-review)
**File**: `src/components/Platforms.tsx`
- **Rimossi screenshot** (già nell'Hero, ridondanti)
- **Rimosse features list** (funzionalità identiche su tutti i dispositivi)
- Card compatte: icona centrata, nome, sottotitolo colorato (`text-icon`), descrizione
- Card stile app, bordo card-border-light, shadow-sm, text-center
- Rimossi: glow, corner decorativi, badge animati, hoveredIndex, import Image/CheckCircle2
- Server component (no "use client")

### 7. Download → Pagina separata ✅ FATTO
**File NUOVO**: `src/app/download/page.tsx`
- Importa e usa componente `Download.tsx` ripulito
- Navbar minimale (solo logo + "Torna al sito" con ArrowLeft)
- Metadata SEO dedicata
- Stile coerente col resto del sito
- `Download.tsx` ripulito: rimossi gradient viola, blob animati, glow effects, decorative corners
- Card essenziali: icona centrata, nome piattaforma, sottotitolo, bottone download
- Rimossi: badge "CONSIGLIATO", liste funzionalità, benefit strip ("Gratuito", "Nessuna Registrazione"), riga versione/ultimo aggiornamento
- Solo link "Hai bisogno di aiuto?" in fondo

### 8. ContactForm ✅ FATTO
**File**: `src/components/ContactForm.tsx`
- Rimossi blob, gradienti, shadow aggressive, hover:-translate-y-1
- Card info con bordo card-border/25 teal, icone bg-icon/10 text-icon flat
- Motivi contatto aggiornati: demo, info generali, problema tecnico, suggerisci funzionalità
- Form: focus ring indaco (focus:border-icon focus:ring-icon/10), submit button solid bg-primary
- Success state: white card, green icon bg-green-100, solid button
- Badge: bg-icon/10 text-icon border-icon/20
- Sezione bg-surface solido

### 9. FAQ (NUOVO) ✅ FATTO
**File NUOVO**: `src/components/FAQ.tsx`
- Accordion nativo con useState, un solo item aperto alla volta
- Card bianche, bordo card-border/25, rounded-xl, shadow-sm
- ChevronDown text-icon con rotate-180 animato (duration-200)
- 3 domande iniziali (come provare, offline, dispositivi)
- Badge bg-icon/10 text-icon, sezione bg-white

### 10. Footer ✅ FATTO
**File**: `src/components/Footer.tsx`
- Background: bg-gray-900 solido, rimossi gradient e blob decorativi
- Rimossi: glow logo, gradient-text, hover rotate, bottom gradient line, animate-pulse
- Logo pulito come Navbar (bg-primary rounded-xl, hover:scale-105)
- Link aggiornati: Funzionalità, Piattaforme, FAQ, Contatti (rimosso Download)
- Niente email (il form contatti è la CTA principale)
- Server component

### 11. page.tsx
**File**: `src/app/page.tsx`
- Rimuovere `<Download />` dalla homepage
- Aggiungere `<FAQ />` tra ContactForm e Footer
- Ordine: Navbar → Hero → Features → Platforms → ContactForm → FAQ → Footer

---

## STRATEGIA DI IMPLEMENTAZIONE - Agent/Plugin per ogni step

### Step 1: Base (sequenziale) ✅ COMPLETATO

| File | Cosa fare | Agent/Plugin | Note |
|------|-----------|-------------|------|
| ✅ `globals.css` | Design system | Fatto manualmente | Già completato |
| ✅ `layout.tsx` | Cambiare font | Fatto manualmente | Playfair → DM Sans completato |
| ✅ `page.tsx` | Aggiornare imports | Fatto manualmente | Rimosso Download, aggiunto FAQ |

### Step 2: Componenti principali (parallelizzabili) ✅ COMPLETATO

| File | Cosa fare | Agent/Plugin | Note |
|------|-----------|-------------|------|
| ✅ `Navbar.tsx` | Semplificare + nuovi link | `frontend-design` skill | Rimosso glass, aggiornati nav links e CTA "Richiedi Info" |
| ✅ `Hero.tsx` | Screenshot reali + nuovi CTA | `frontend-design` skill | Device frames, screenshot reali, server component |
| ✅ `Features.tsx` | Card stile app + nuovi contenuti | `frontend-design` skill | 8 feature cards + 4 vantaggi tecnici, server component |
| ✅ `Platforms.tsx` | Screenshot + testi UX | `frontend-design` skill | 3 card piattaforma con device frames, server component |

### Step 3: Componenti secondari (parallelizzabili) ✅ COMPLETATO

| File | Cosa fare | Agent/Plugin | Note |
|------|-----------|-------------|------|
| ✅ `ContactForm.tsx` | Motivi aggiornati + stile | `frontend-design` skill | Rimossi gradienti/blob, icone indaco flat, motivi aggiornati |
| ✅ `FAQ.tsx` | NUOVO: accordion FAQ | `frontend-design` skill | Accordion nativo, 3 domande, stile card teal |
| ✅ `Footer.tsx` | Semplificare | `frontend-design` skill | Rimossi gradienti/blob/glow, link aggiornati, no email |

### Step 4: Pagina Download separata ✅ COMPLETATO

| File | Cosa fare | Agent/Plugin | Note |
|------|-----------|-------------|------|
| ✅ `Download.tsx` | Ripulire estetica | `frontend-design` skill | Rimossi gradient viola, blob, glow, allineato stile app |
| ✅ `download/page.tsx` | NUOVO: route separata | `frontend-design` skill | Navbar minimale (logo + "Torna al sito"), importa Download.tsx |

### Step 5: Quality check (dopo ogni step 2-4) ✅ COMPLETATO

| Azione | Agent/Plugin | Note |
|--------|-------------|------|
| ✅ Semplifica codice | `code-simplifier` agent | Completato: rimossi font inutilizzati, "use client" non necessari, commenti ovvi, estratti array statici a module scope, deduplicate card con .map() |
| ✅ Review codice | `code-review:code-review` skill | **Nessun issue critico (score ≥80).** 5 agent paralleli hanno verificato: CLAUDE.md compliance, bug scan, git history, code comments, security. 8 issue candidati tutti sotto soglia. Note: (1) Navbar logo `href="#"` senza `preventDefault()` (score 75, minor UX), (2) Font DM_Sans diverge da CLAUDE.md ma è intenzionale per allineamento Flutter, (3) Conflitto staged/unstaged in layout.tsx da risolvere prima del commit |
| ✅ Check responsive | `application-performance:frontend-developer` agent | **Completato.** Audit responsive + accessibilità WCAG 2.1 AA su tutti i componenti. 6 fix critici (skip nav, `<main>`, ARIA navbar/FAQ, `prefers-reduced-motion`, overflow 320px), 12 fix importanti (contrasto `foreground/60→gray-600`, `aria-labelledby` sezioni, `aria-hidden` icone decorative, `role="alert"`/`role="status"` form, `aria-busy` submit), 3 fix minori (Escape chiude menu, FAQ `max-h-[600px]`, footer tap targets). Build OK post-fix. |

### Step 5b: Compliance legale (aggiunto post-review) ✅ COMPLETATO

| Azione | Note |
|--------|------|
| ✅ Privacy Policy + Cookie Policy | Integrazione Iubenda: link nel Footer (sezione "Legale") con `target="_blank"` |
| ✅ Checkbox consenso privacy | Aggiunto nel ContactForm: checkbox obbligatorio con link a Privacy Policy, `privacyAccepted` state, submit disabilitato senza consenso |
| ✅ Env var `NEXT_PUBLIC_IUBENDA_POLICY_ID` | Usata per generare URL dinamici Iubenda |

### Step 6: Verifica e Deploy ✅ COMPLETATO

| Azione | Strumento | Note |
|--------|-----------|------|
| ✅ Dev server | `Bash`: `npm run dev` | Verificato: `/` → 200, `/download` → 200, `/api/contact` → validazione OK |
| ✅ Build | `Bash`: `npm run build` | Build OK senza errori |
| ✅ Deploy | `vercel:deploy` skill | Deploy produzione OK → https://pastrylabmanager.com |

---

## Ordine di esecuzione dettagliato

```
STEP 1 - Base (sequenziale, manuale) ✅ COMPLETATO
  ├── globals.css ✅
  ├── layout.tsx ✅
  └── page.tsx ✅

STEP 2 - Componenti principali (parallelo con frontend-design) ✅ COMPLETATO
  ├── Navbar.tsx ✅
  ├── Hero.tsx ✅
  ├── Features.tsx ✅
  └── Platforms.tsx ✅

STEP 3 - Componenti secondari (parallelo con frontend-design) ✅ COMPLETATO
  ├── ContactForm.tsx ✅
  ├── FAQ.tsx (NUOVO) ✅
  └── Footer.tsx ✅

STEP 4 - Download separata ✅ COMPLETATO
  ├── Download.tsx ✅ (ripulito)
  └── download/page.tsx ✅ (NUOVO)

STEP 5 - Quality check ✅ COMPLETATO
  ├── code-simplifier ✅ (rimossi font unused, "use client" inutili, commenti ovvi, deduplicate card)
  ├── code-review ✅ (0 issue critici su 8 candidati, tutti sotto soglia 80)
  └── frontend-developer ✅ (6 critici + 12 importanti + 3 minori fix applicati, build OK)

STEP 5b - Compliance legale ✅ COMPLETATO
  ├── Privacy/Cookie Policy links nel Footer ✅
  └── Checkbox consenso privacy nel ContactForm ✅

STEP 6 - Verifica e Deploy ✅ COMPLETATO
  ├── npm run dev ✅ (tutte le route OK: /, /download, /api/contact)
  ├── npm run build ✅ (build OK)
  └── vercel:deploy ✅ (produzione → pastrylabmanager.com)
```

---

## File da Modificare (in ordine)
1. ✅ `src/app/globals.css` - FATTO
2. ✅ `src/app/layout.tsx` - Font DM Sans → **FATTO**
3. ✅ `src/app/page.tsx` - Rimuovere Download, aggiungere FAQ → **FATTO**
4. ✅ `src/components/Navbar.tsx` - Semplificare + nuovi link → **FATTO**
5. ✅ `src/components/Hero.tsx` - Screenshot reali + nuovi CTA → **FATTO**
6. ✅ `src/components/Features.tsx` - Card stile app + contenuti aggiornati → **FATTO**
7. ✅ `src/components/Platforms.tsx` - Screenshot + testi esperienza utente → **FATTO**
8. ✅ `src/components/ContactForm.tsx` - Motivi aggiornati + stile → **FATTO**
9. ✅ `src/components/FAQ.tsx` - NUOVO: sezione FAQ → **FATTO**
10. ✅ `src/components/Footer.tsx` - Semplificato, no email → **FATTO**
11. ✅ `src/components/Download.tsx` - Ripulire estetica → **FATTO**
12. ✅ `src/app/download/page.tsx` - NUOVO: pagina download separata → **FATTO**

## Verifica Finale
1. ✅ `npm run dev` - tutte le route rispondono 200 OK
2. Confronto visivo con screenshot app Flutter - da fare (manuale)
3. ✅ Test responsive: audit completato con `frontend-developer` agent, fix applicati
4. ✅ Form contatti funzionante (POST /api/contact) - validazione privacy checkbox OK
5. ✅ `/download` accessibile via URL diretto - confermato (HTTP 200)
6. ✅ `/download` NON linkato dalla homepage/nav - confermato
7. ✅ `npm run build` - build OK senza errori
8. ✅ Deploy su Vercel via `vercel:deploy` - produzione live su https://pastrylabmanager.com
