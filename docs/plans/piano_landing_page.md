# Piano Landing Page LabManager

## Contesto
Landing page per l'app LabManager Pasticceria, focalizzata sul lancio Android (smartphone/tablet), con download APK da Supabase Storage, form contatti via Resend, e deploy gratuito su Vercel con dominio personalizzato.

---

## ✅ COMPLETATO

### 1. Progetto Next.js creato
- **Percorso:** `C:\Users\emanu\Desktop\GitProjects\labmanager-website`
- Next.js 16 + TypeScript + Tailwind CSS v4
- Dipendenze: `resend`, `@supabase/supabase-js`, `lucide-react`

### 2. Landing Page - Componenti Creati (Design Moderno)
Tutti i componenti sono stati completamente ridisegnati con lo stile dell'app Flutter LabManager:

#### **Navbar** (`src/components/Navbar.tsx`)
- ✨ Effetto glassmorphism con backdrop blur
- 🎨 Logo animato con hover effects (scale + rotate)
- 📱 Menu mobile con animazioni staggered
- 💜 Transizione smooth tra stato scrolled/non-scrolled
- 🔘 CTA button con gradiente viola

#### **Hero** (`src/components/Hero.tsx`)
- 🎯 Layout 2 colonne (contenuto + mockup dispositivi)
- ⭐ Background animato con blob fluttuanti
- 📱 Mockup smartphone + tablet con animazioni hover
- 🏷️ Badge "ORA DISPONIBILE SU ANDROID" con sparkles
- ✍️ Titolo display con underline SVG animato
- ✅ Trust indicators con dot pulsanti
- 📊 Scroll indicator elegante

#### **Features** (`src/components/Features.tsx`)
- 🎨 Grid 4 colonne responsive con 8 feature cards
- 🌈 Ogni card ha il suo gradiente colorato unico
- 🎭 Icone con background gradient + animazioni hover
- ✨ Glow effect dinamico on hover
- 🎁 CTA finale con sfondo gradient

#### **Platforms** (`src/components/Platforms.tsx`)
- 📱 3 card per Android Smartphone, Tablet e Windows
- 🏷️ Badge "NUOVO" e "DISPONIBILE" con gradienti
- ✅ Liste feature con checkmark colorati
- 🎨 Hover effects con glow e scale
- 🎭 Corner decorativo animato

#### **Download** (`src/components/Download.tsx`)
- 💜 Background gradient viola animato con blob
- 🏷️ Benefits badges (Gratuito, Nessuna Registrazione, etc.)
- 📦 2 card download eleganti per Android e Windows
- 🎨 Ogni card ha icona gradient, features list e CTA
- ⭐ Badge "CONSIGLIATO" per Android
- ✨ Hover effects con glow e translate

#### **Contact Form** (`src/components/ContactForm.tsx`)
- 📋 Layout 2 colonne: info + form
- 💡 Info column con card "Perché contattarci"
- 🎨 Form con icone per ogni campo
- ✅ Stati success/error con animazioni
- 💜 Input fields con focus ring viola
- 🚀 Submit button con gradiente e animazioni

#### **Footer** (`src/components/Footer.tsx`)
- 🎨 Background gradient scuro con decorazioni
- 🏷️ Logo brand + descrizione + newsletter
- 📚 3 colonne link (Prodotto, Supporto, Azienda)
- ❤️ Bottom bar con copyright + "Fatto con ❤️"
- 🔗 Social links placeholder
- 💜 Gradient line finale

### 3. Design System Implementato

#### **Tipografia** (`src/app/globals.css` + `src/app/layout.tsx`)
- ✅ Font **Inter** per il corpo (400, 500, 600, 700, 800)
- ✅ Font **Playfair Display** per titoli display (600, 700, 800)
- ✅ Caricati tramite `next/font/google` per ottimizzazione automatica
- ✅ Font smoothing antialiased
- ✅ Feature settings per varianti alternative

#### **Palette Colori** (da `AppColors.dart`)
```css
--primary: #4403af          /* Viola principale */
--primary-light: #5a1ec9    /* Viola chiaro */
--primary-dark: #3a0390     /* Viola scuro */
--success: #107C10          /* Verde successo */
--warning: #E6A700          /* Arancione warning */
--error: #E81123            /* Rosso errore */
```

#### **Animazioni Custom**
- ✨ `fadeInUp` - Entrata con slide dal basso
- 🎭 `fadeIn` - Fade in semplice
- 📏 `scaleIn` - Scale up con fade
- 🎈 `float` - Movimento fluttuante infinito
- ✨ `shimmer` - Effetto luccichio

#### **Effetti Speciali**
- 🔮 **Glassmorphism**: backdrop blur per navbar
- 🌈 **Gradient text**: testo con gradiente viola
- 📜 **Custom scrollbar**: scrollbar viola personalizzata
- 🎯 **Selection**: selezione testo viola
- ✨ **Glow effects**: alone luminoso su hover

### 4. API Resend integrata
- `src/app/api/contact/route.ts` - Endpoint POST per invio email tramite Resend
- Validazione campi, HTML email, reply-to automatico

### 5. Supabase Storage configurato
- Bucket **`releases_apk`** creato (pubblico, max 100MB)
- Policy: download pubblico, upload/delete solo autenticati
- URL: `https://ndlsifytatricfutjsvu.supabase.co/storage/v1/object/public/releases_apk/`
- (bucket `releases` esistente NON toccato)

### 6. GitHub Repository
- Repo: **https://github.com/Emafebb/labmanager-website**

### 7. Deploy su Vercel
- Sito live su **https://pastrylabmanager.com**
- URL Vercel: `labmanager-website.vercel.app`
- Dominio collegato con record A su AWS Route 53 (`216.198.79.1`)
- SSL attivo

### 8. Environment Variables su Vercel
- `RESEND_API_KEY` - configurata
- `RESEND_FROM_EMAIL` - `LabManager <noreply@pastrylabmanager.com>`
- `CONTACT_EMAIL` - configurata
- `NEXT_PUBLIC_APK_URL` - URL bucket releases_apk
- `NEXT_PUBLIC_WINDOWS_URL` - URL bucket releases

### 9. APK caricato su Supabase Storage
- File `labmanager.apk` nel bucket `releases_apk`

### 10. Resend configurato
- Dominio `pastrylabmanager.com` verificato su Resend
- Form contatti funzionante e testato

---

## 🎨 REDESIGN COMPLETATO (Febbraio 2026)

### Design Direction: "Professionale Pasticceria Moderna"
- 💜 Colore primary viola (#4403af) mantenuto dall'app Flutter
- ✍️ Tipografia elegante (Playfair Display per titoli, Inter per corpo)
- ✨ Animazioni fluide e moderne (non eccessive)
- 🔮 Gradienti e glassmorphism per un look contemporaneo
- 🎯 Attenzione ai dettagli (shadows, borders, hover states)
- 🎨 Palette coerente con l'app (success green, error red, etc.)

### Caratteristiche Distintive
- 🎭 Ogni sezione ha una propria identità visiva
- 🌈 Gradienti colorati per feature cards
- ✨ Animazioni on-scroll con stagger delay
- 🎨 Hover effects elaborati (glow, scale, translate)
- 💜 Uso consistente del colore viola come accent
- 🔮 Effetti glassmorphism per navbar
- 📱 Mockup dispositivi con animazioni interattive
- 🎪 Background decorativi con blob animati

---

## 📋 TODO OPZIONALE

### 1. Sostituire mockup con screenshot reali
- Fare screenshot dell'app Android (smartphone + tablet)
- Sostituire i placeholder nel componente `src/components/Hero.tsx`
- Push su GitHub → Vercel ri-deploya automaticamente

### 2. Aggiungere screenshot nelle altre sezioni
- Sezione Features: screenshot feature specifiche
- Sezione Platforms: screenshot interfacce native
- Sezione Download: preview dell'app in azione

### 3. Ottimizzazioni SEO avanzate
- Meta tags Open Graph completi
- Twitter Cards
- Schema.org JSON-LD per rich snippets
- Sitemap.xml automatico

---

## 📚 Riferimenti rapidi

| Risorsa | URL |
|---|---|
| Sito live | https://pastrylabmanager.com |
| Dev server locale | http://localhost:3000 |
| Vercel dashboard | https://vercel.com/emanueles-projects-7c263101/labmanager-website |
| GitHub repo | https://github.com/Emafebb/labmanager-website |
| Supabase Storage | Dashboard > Storage > bucket `releases_apk` |
| Resend | https://resend.com |

## 💰 Costi: 0 EUR

| Servizio | Piano | Costo |
|---|---|---|
| Vercel | Hobby | Gratis |
| Supabase Storage | Free (1GB) | Gratis |
| Resend | Free (100 email/giorno) | Gratis |
| Dominio | pastrylabmanager.com | Già pagato |

## 🚀 Come sviluppare in locale

### Avviare il server di sviluppo
```bash
cd C:\Users\emanu\Desktop\GitProjects\labmanager-website
npm run dev
```
Server disponibile su: http://localhost:3000

### Testare modifiche
1. Modifica i file in `src/`
2. Il browser si aggiorna automaticamente (Hot Module Replacement)
3. Controlla errori nella console del terminale e del browser

### Build di produzione (test locale)
```bash
npm run build
npm run start
```

## 📤 Come deployare su Vercel

### Deploy automatico (consigliato)
```bash
git add .
git commit -m "Descrizione modifiche"
git push origin master
```
→ Vercel deploya automaticamente in 1-2 minuti

### Verificare deploy
1. Vai su https://vercel.com/emanueles-projects-7c263101/labmanager-website
2. Controlla lo stato del deploy nella sezione "Deployments"
3. Testa il sito live su https://pastrylabmanager.com

### Plugin Vercel per Claude Code
Il progetto è collegato al plugin Vercel di Claude Code. Puoi usare questi comandi direttamente in chat:
- `/vercel:deploy` - Deploy dell'app su Vercel
- `/vercel:logs` - Visualizza i log dei deployment
- `/vercel:setup` - Configura CLI e progetto Vercel

Inoltre la CLI Vercel è autenticata e linkata al progetto, quindi puoi usare anche:
```bash
vercel              # Deploy preview
vercel --prod       # Deploy in produzione
vercel env ls       # Lista variabili d'ambiente
vercel logs         # Visualizza log
```

## 🎨 Struttura File Design System

```
labmanager-website/
├── src/
│   ├── app/
│   │   ├── globals.css         # Stili globali + animazioni + palette
│   │   ├── layout.tsx          # Layout root con font Inter + Playfair
│   │   └── page.tsx            # Home page (assembla componenti)
│   ├── components/
│   │   ├── Navbar.tsx          # Navbar glassmorphism
│   │   ├── Hero.tsx            # Hero con mockup animati
│   │   ├── Features.tsx        # 8 feature cards gradienti
│   │   ├── Platforms.tsx       # 3 piattaforme
│   │   ├── Download.tsx        # Download section gradient viola
│   │   ├── ContactForm.tsx     # Form contatti 2 colonne
│   │   └── Footer.tsx          # Footer elegante
│   └── api/
│       └── contact/
│           └── route.ts        # API Resend per form
└── public/
    └── images/
        └── logo.png            # Logo LabManager
```

## 🐛 Troubleshooting Comuni

### Errore: "Port 3000 is in use"
```bash
# Windows: chiudi tutti i processi Node.js
taskkill //F //IM node.exe

# Riavvia il server
npm run dev
```

### Errore: CSS non si carica
1. Ferma il server (CTRL+C)
2. Cancella cache: `rm -rf .next`
3. Riavvia: `npm run dev`

### Font non si caricano
- I font sono gestiti da Next.js tramite `next/font/google`
- Se vedi font di fallback, controlla la console per errori
- Verifica che `src/app/layout.tsx` includa le classi font

### Vercel deploy failed
1. Controlla logs su Vercel dashboard
2. Verifica environment variables
3. Controlla che tutti i file siano committati su Git
4. Prova rebuild manuale da dashboard Vercel

---

## 📝 Changelog

### 2026-02-10 - Redesign Completo
- ✨ Ridisegnati tutti i componenti con stile app Flutter
- 🎨 Implementato design system completo
- ✍️ Aggiunti font Inter + Playfair Display
- 🎭 Aggiunte animazioni custom (fadeInUp, scaleIn, float)
- 🔮 Implementato glassmorphism per navbar
- 🌈 Aggiunti gradienti colorati per feature cards
- 💜 Palette colori coerente con app (#4403af viola)
- ✨ Hover effects elaborati per tutte le sezioni
- 📱 Mockup dispositivi animati e interattivi

### 2026-01-XX - Lancio Iniziale
- 🚀 Creazione landing page base
- 📤 Deploy su Vercel
- 🔗 Collegamento dominio pastrylabmanager.com
- 📧 Integrazione Resend per form contatti
- 📦 Setup Supabase Storage per APK

---

**Ultima modifica:** 2026-02-10
**Versione:** 2.0 - Redesign Completo
**Status:** ✅ Produzione (https://pastrylabmanager.com)
