# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**LabManager Website** is a Next.js landing page for LabManager, a pastry management application. The site showcases features, enables app downloads, and provides a contact form for inquiries. The site is Italian-localized and deployed on Vercel.

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5
- **UI Framework**: React 19
- **Styling**: Tailwind CSS 4 with custom design tokens
- **Icons**: Lucide React
- **Email Service**: Resend
- **Backend Service**: Supabase (integrated but minimally used currently)
- **Linting**: ESLint 9 with Next.js config
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata and fonts
│   ├── page.tsx            # Home page composing all sections
│   ├── globals.css         # Global styles, animations, CSS custom properties
│   └── api/
│       └── contact/
│           └── route.ts    # POST endpoint for contact form email handling
├── components/
│   ├── Navbar.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section with main CTA
│   ├── Features.tsx        # Feature showcase section
│   ├── Platforms.tsx       # Platform/compatibility information
│   ├── Download.tsx        # App download section
│   ├── ContactForm.tsx     # Contact form with state management
│   └── Footer.tsx          # Footer section
public/                     # Static assets (images, screenshots)
docs/plans/                 # Planning and design documents
```

## Key Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## Important Architecture Patterns

### Landing Page Composition
The home page (`src/app/page.tsx`) is built by composing independent section components. Each component is a self-contained module handling its own styling, layout, and interactivity. This makes it easy to reorder, remove, or add sections.

### Design System
- **Color tokens** defined in `globals.css` as CSS custom properties (`:root`)
- **Primary colors**: `--primary` (#4403af), `--primary-light`, `--primary-dark`
- **Fonts**: Inter (body) and Playfair Display (heading/display) from Google Fonts
- **Custom animations**: `fadeInUp`, `fadeIn`, `scaleIn` for entrance effects
- **Responsive design** using Tailwind's responsive prefixes (sm, lg, etc.)

### Contact Form Flow
1. **Client-side** (`ContactForm.tsx`): React state management for form inputs, loading states
2. **API endpoint** (`api/contact/route.ts`):
   - Receives JSON with `name`, `email`, `message`
   - Validates required fields (400 if missing)
   - Escapes HTML to prevent injection attacks
   - Sends HTML email via Resend
   - Returns success/error JSON
3. **Email styling**: HTML email generated server-side with basic formatting

### Security Considerations
- HTML escaping in contact form email handler to prevent injection
- Required field validation on API endpoint
- Resend API key stored in environment variables (`RESEND_API_KEY`)
- Email addresses from environment (`RESEND_FROM_EMAIL`, `CONTACT_EMAIL`)

## Configuration

### Environment Variables
Create `.env.local` with:
```
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=LabManager <onboarding@resend.dev>  # Optional, has default
CONTACT_EMAIL=your-email@example.com                   # Optional, has default
```

### TypeScript Configuration
- Strict mode enabled
- Path alias `@/*` maps to `src/*`
- Target: ES2017

## Styling Approach

- **Utility-first CSS**: Tailwind classes for component styling
- **CSS custom properties**: For theme colors in `globals.css`
- **Gradient text**: Use `.gradient-text` class for styled text
- **Animations**: Use `.animate-fade-in-up`, `.animate-fade-in`, `.animate-scale-in` classes
- **Responsive**: Mobile-first with `sm:`, `lg:` prefixes

### Common Tailwind Patterns
- `rounded-3xl` for large border radius (12px)
- `shadow-xl` for emphasis shadows
- `bg-gradient-to-br` for gradient backgrounds
- Spacing uses standard Tailwind scale (px, 4, 8, 12, 16, 32, etc.)

## Component Development Guidelines

### Creating New Components
1. Use TypeScript (.tsx) files
2. Export default function component
3. Use "use client" directive for interactivity
4. Leverage shared design tokens from `globals.css`
5. Keep components focused and composable

### Icons
- Import from `lucide-react` (e.g., `import { Mail, Send } from "lucide-react"`)
- Use `size` prop for sizing
- Wrap in colored divs for emphasis (see ContactForm pattern)

## Deployment

The project is set up for **Vercel deployment**:
- `.vercel/` directory contains deployment metadata
- Build command: `next build`
- Start command: `next start`
- Environment variables are configured in Vercel project settings

## Common Tasks

### Adding a New Section
1. Create component in `src/components/YourSection.tsx`
2. Import in `src/app/page.tsx`
3. Add to JSX composition in Home component
4. Use existing color tokens and animation utilities

### Modifying Contact Form
- Form UI: Edit `ContactForm.tsx` component
- Email template: Edit HTML in `api/contact/route.ts`
- Validation: Update both client (form.tsx) and server (route.ts) validation

### Changing Colors
Update CSS custom properties in `src/app/globals.css` root section. All components use these variables, so changes propagate globally.

### Adding Analytics or Tracking
Consider integrating with Vercel Analytics or a third-party service. Ensure compliance with privacy regulations given the Italian localization.