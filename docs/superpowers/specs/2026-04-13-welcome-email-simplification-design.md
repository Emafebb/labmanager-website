# Design: Semplificazione email di benvenuto newsletter

**Data:** 2026-04-13
**File coinvolto:** `src/app/api/newsletter/route.ts`

## Obiettivo

Sostituire l'email di benvenuto attuale (complessa, multi-sezione, con layout HTML a tabelle) con una email minimal che sembra scritta a mano da una persona.

## Decisioni di design

- **Stile:** HTML minimal che imita plain text — nessuna tabella decorativa, nessun colore di sfondo, nessun pulsante, nessun logo grafico
- **Contenuto:** Solo messaggio di accoglienza breve, nessuna lista di funzionalità, nessun CTA con link
- **Font:** System stack (`-apple-system, Arial, sans-serif`), 15px, colore `#1e1b18`
- **Layout:** Sfondo bianco `#ffffff`, max-width 560px centrato, padding laterale 24px
- **Footer:** Testo semplice con link disiscrizione underline, nessun elemento grafico

## Contenuto dell'email

**Oggetto:** `Benvenuto in LabManager!`

**Body:**

```
Ciao [Nome],

grazie per esserti iscritto a LabManager.

Ti scriverò quando ci sarà qualcosa di nuovo — aggiornamenti,
nuove funzionalità, o qualcosa che vale la pena condividere.
Niente spam.

A presto,
Emanuele

---
Hai ricevuto questa email perché ti sei iscritto a LabManager.
[Cancella iscrizione]
```

## Cosa cambia rispetto all'attuale

| Prima | Dopo |
|---|---|
| Layout a tabelle HTML con sfondi colorati | HTML semplice, sfondo bianco |
| 6 sezioni (hero, features, CTA, Da Emanuele, Prossimamente, footer) | 1 sezione: messaggio + footer |
| Lista di 6 funzionalità | Nessuna |
| 2 CTA (download + videocall) | Nessuna |
| ~260 righe di HTML | ~30 righe di HTML |

## Cosa rimane invariato

- Logica di invio (Resend, token disiscrizione, gestione errori non bloccante)
- Oggetto email
- Indirizzo mittente (`RESEND_FROM_EMAIL`)
- Firma "Emanuele"
