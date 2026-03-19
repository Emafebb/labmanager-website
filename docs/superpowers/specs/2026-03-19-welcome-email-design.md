# Welcome Email — Design Spec

**Data:** 2026-03-19
**Progetto:** pastrylabmanager.com (labmanager-website)
**Contesto:** Email di benvenuto inviata automaticamente dopo iscrizione alla newsletter via popup

---

## Obiettivo

Creare un'email di benvenuto che presenti LabManager ai nuovi iscritti in modo professionale e sobrio, mostrando le funzionalità principali e invitando al download e al contatto diretto con il fondatore.

## Principi guida

- **Tono:** Professionale senza essere sbruffone. Competenza dimostrata con i fatti, non con le parole.
- **Lunghezza:** Compatta — 6 feature in 1-2 righe ciascuna, nessuno screenshot.
- **Stile visivo:** Editoriale, coerente con le email esistenti (Playfair Display + DM Sans, palette verde/crema).
- **Regola:** Mai menzionare leggi, norme o riferimenti normativi (es. EU 1169/2011).

## Struttura email

### Subject
`Benvenuto in LabManager!`

### Preheader (testo nascosto)
`Grazie per esserti iscritto! Ecco cosa puoi fare con LabManager.`

---

### 1. Hero

- **Sfondo:** `#12201a` (verde scuro)
- **Badge:** `BENVENUTO` — bordo `#2a5c3a`, testo `#6ee7a0`, DM Sans 10px uppercase
- **Titolo:** `Ciao ${nome}!` — Playfair Display 36px, bianco
- **Sottotitolo:** DM Sans 15px, `#6a8c78`
  > Grazie per esserti iscritto. Da oggi riceverai in anteprima aggiornamenti, nuove funzionalita e novita pensate per chi lavora in laboratorio.

---

### 2. Feature (6 blocchi)

- **Sfondo:** `#faf7f2` (crema)
- **Eyebrow:** `COSA PUOI FARE` — DM Sans 9px, `#2d6a44`, uppercase
- **Titolo sezione:** `Tutto in un'unica app` — Playfair Display 26px, `#1e1b18`
- **Divider tra feature:** `#e8e3db`
- **Titolo feature:** Playfair Display 16px, `#1e1b18`
- **Descrizione feature:** DM Sans 13px, `#6a6258`, max 1-2 righe

**Feature 1 — Etichette pronte per la stampa**
> Genera etichette con allergeni evidenziati, tabella nutrizionale, barcode, lotto e scadenza. Scegli il formato e stampa in PDF.

**Feature 2 — Calcolo costi e margini**
> Sai esattamente quanto costa ogni ricetta e quanto margine hai su ogni prodotto venduto.

**Feature 3 — Archivio ricette**
> Tutte le tue preparazioni organizzate per categoria. Cerca, filtra e scala le quantita in automatico.

**Feature 4 — Dashboard produzione**
> Registra produzioni con codice lotto, monitora vendite per canale e tieni sotto controllo le scadenze.

**Feature 5 — Offline e sincronizzato**
> Funziona senza connessione. Modifichi una ricetta in ufficio, in laboratorio la ricevono aggiornata in tempo reale.

**Feature 6 — Bilanciamento ricette**
> Confronta zuccheri, grassi, acqua, PAC e POD con i valori di riferimento. Feedback visivo immediato per ogni categoria.

---

### 3. CTA

- **Sfondo:** `#faf7f2` (continua dalla sezione feature)
- **Separazione:** spacing, non divider

**Pulsante primario:**
- Testo: `SCARICA LABMANAGER`
- Stile: sfondo `#1e1b18`, testo bianco, DM Sans 12px uppercase, padding 16px 32px
- Link: `https://pastrylabmanager.com/download`
- Sotto-testo: `Disponibile per Android e Windows` — DM Sans 11px, `#b0a898`

**Link secondario:**
- Testo: `SCOPRIAMOLO INSIEME &rarr;`
- Stile: DM Sans 12px, `#2d6a44`, uppercase
- Sotto-testo: `Prenota una videocall gratuita — ti mostro LabManager dal vivo` — DM Sans 11px, `#b0a898`
- Link: `https://cal.com/labmanager-software-gestionale/scoprire-labmanager`

---

### 4. Da Emanuele

- **Sfondo:** `#faf7f2`
- **Separazione:** divider `#e8e3db`, 1px, full-width, margin 40px sopra
- **Eyebrow:** `DA EMANUELE` — DM Sans 9px, `#2d6a44`, uppercase

**Titolo (Playfair Display 20px, `#1e1b18`):**
> LabManager nasce in laboratorio.

**Testo (DM Sans 14px, `#8a8278`, max-width 460px):**
> L'ho creato partendo dai problemi che incontravo ogni giorno: ricette sparse, costi stimati a occhio, etichette fatte a mano. Se hai domande o vuoi raccontarmi come lavori nel tuo laboratorio, rispondimi a questa email. Mi fa piacere.

---

### 5. Teaser "Prossimamente"

- **Sfondo:** `#eae6de` (crema piu scuro)
- **Eyebrow:** `PROSSIMAMENTE` — DM Sans 9px, `#2d6a44`, uppercase

**Testo (Playfair Display 17px, `#3a3530`):**
> Nelle prossime email: nuove funzionalita in arrivo, consigli pratici per il laboratorio e aggiornamenti riservati agli iscritti.

---

### 6. Footer

- **Sfondo:** `#f3efe8`
- **Separazione:** linea singola `#1e1b18` 1px sopra; bottom-rule 3px `#1e1b18` (come reference email)
- **Logo:** `LabManager` — Playfair Display 20px
- **Tagline:** `IL GESTIONALE PER PASTICCERI PROFESSIONISTI` — DM Sans 10px, `#a09880`, uppercase
- **Link riga 1:** Sito Web (`pastrylabmanager.com`) · Download (`pastrylabmanager.com/download`) · Contatti (`mailto:labmanager.info@gmail.com`)
- **Link riga 2:** Privacy Policy (`iubenda.com/privacy-policy/79608415`)
- **Copyright:** `© 2026 LabManager. Tutti i diritti riservati.`
- **Nota:** `Hai ricevuto questa email perche ti sei iscritto alla newsletter di LabManager.`

---

## Note tecniche

- L'email sostituisce la funzione `buildWelcomeEmail()` in `src/app/api/newsletter/route.ts:104-249`
- Parametro: `name` (stringa, gia sanitizzata con `escapeHtml`)
- Template HTML inline con table layout per compatibilita email client
- **Font loading:** includere `<link>` Google Fonts nel `<head>` (come reference email). Inline styles usano `'Playfair Display', Georgia, serif` e `'DM Sans', -apple-system, Arial, sans-serif` con fallback per client che strippano `<head>`.
- **Responsive:** media query `max-width: 600px` — applicare classe `mobile-padding` (`padding-left: 28px; padding-right: 28px`) a tutti i `<td>` con padding 52px
- **MSO/Outlook:** replicare i conditional blocks dalla reference email: `xmlns:v` e `xmlns:o` su `<html>`, blocco `<style>` MSO nel `<head>`, wrapper `<!--[if mso]>` table da 620px, VML `<v:roundrect>` per il pulsante CTA primario
- **Meta tags:** includere `<meta name="x-apple-disable-message-reformatting">` e `<meta http-equiv="X-UA-Compatible" content="IE=edge">`
- **Top rule:** double-rule editoriale (3px + 1px gap + 1px) come reference email
- **Ultimo feature block:** senza border-bottom (come pattern esistente)
- **Pulsante CTA:** bordi squadrati (no border-radius), coerente con reference email (`arcsize="0%"`)
- **Nessun link di disiscrizione:** la welcome email e' transazionale one-time inviata via `resend.emails.send()`. Il link unsubscribe sara' presente nelle future broadcast email inviate tramite Resend Audience.
- **Rimozione riferimenti normativi:** la welcome email attuale contiene "EU 1169/2011" e "a norma di legge" — devono essere rimossi.

## Riferimenti stilistici

- Reference email principale: `C:\Users\emanu\Desktop\GitProjects\Labmanager\landing_pages\email_aggiornamento_android.html` — struttura hero, footer, MSO blocks, sezione "Da Emanuele"
- Reference email secondaria: `C:\Users\emanu\Desktop\GitProjects\Labmanager\landing_pages\email_annuncio_etichette_contaminazioni_prezzo_barcode_riciclo.html` — eyebrow, feature list compatta
- Welcome email attuale da sostituire: `src/app/api/newsletter/route.ts:104-249`
