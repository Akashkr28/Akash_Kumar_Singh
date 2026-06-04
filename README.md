# Akash Kumar Singh — Portfolio

> Personal developer portfolio built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, and GSAP. Features a light/dark theme switcher, cinematic loading screen, custom cursor, smooth scroll, and an interactive journey timeline.

**Live site → [akash-kumar-singh-ttdf.vercel.app](https://akash-kumar-singh-ttdf.vercel.app)**

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Pages & Components](#pages--components)
- [Design System](#design-system)
- [Animations](#animations)
- [Dark Mode](#dark-mode)
- [Deployment](#deployment)
- [Customisation](#customisation)

---

## Features

| Feature | Details |
|---|---|
| ⚡ Next.js 16 + Turbopack | App Router, static pages, instant HMR |
| 🌗 Dark / Light theme | Class-based via `next-themes`, no flash on load |
| 🎬 Loading screen | Branded AKS splash, plays once per session via `sessionStorage` |
| 🖱️ Custom cursor | Dot + lagging ring with spring physics, hidden on touch devices |
| 🌊 Smooth scroll | Lenis v1 with configurable easing and multipliers |
| 🎞️ Page transitions | Framer Motion fade + slide via `app/template.tsx` |
| 🗺️ Journey timeline | Alternating glass cards, spotlight-reveal animation, GSAP scroll-drawn spine |
| 📜 Infinite marquee | Project cards scroll left indefinitely, pause on hover |
| 🃏 3D tilt cards | Perspective tilt + specular glare on Hero photo and Project cards |
| 🔬 Skills bento grid | Category glass cards with icon hover glow |
| 📬 Contact form | EmailJS integration with send / success / error states |
| 📱 Fully responsive | Mobile-first, custom cursor disabled on touch devices |

---

## Tech Stack

### Core

| Package | Version | Purpose |
|---|---|---|
| `next` | ^16.2.7 | Framework (App Router) |
| `react` / `react-dom` | ^19.2.6 | UI library |
| `typescript` | ~6.0.2 | Type safety |
| `tailwindcss` | ^4.3.0 | Utility-first CSS |
| `@tailwindcss/postcss` | ^4.3.0 | Tailwind v4 PostCSS integration |

### Animation

| Package | Version | Purpose |
|---|---|---|
| `framer-motion` | ^12.40.0 | Component animations, spring physics |
| `gsap` | ^3.15.0 | ScrollTrigger for timeline spine line |
| `lenis` | ^1.3.23 | Smooth wheel scroll |

### UI & Icons

| Package | Version | Purpose |
|---|---|---|
| `lucide-react` | ^1.16.0 | General icon set |
| `react-icons` | ^5.6.0 | Tech stack icons (Simple Icons) |
| `next-themes` | ^0.4.6 | Dark / light theme provider |
| `@emailjs/browser` | ^4.4.1 | Contact form email delivery |

### 3D

| Package | Version | Purpose |
|---|---|---|
| `three` | ^0.184.0 | WebGL renderer |
| `@react-three/fiber` | ^9.6.1 | React bindings for Three.js |
| `@react-three/drei` | ^10.7.7 | Three.js helpers (OrbitControls etc.) |

---

## Project Structure

```
.
├── public/
│   ├── photo-card.jpg          # Hero profile photo
│   ├── resume.pdf              # Downloadable résumé
│   └── previews/               # Project demo videos
│       ├── pulseboard.mp4
│       └── 1m-checkboxes.mp4
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Tailwind base + CSS variables + keyframes
│   │   ├── layout.tsx          # Root layout (blobs, Navbar, Footer, Providers)
│   │   ├── page.tsx            # Home page (Hero → About → Projects → Skills → Contact)
│   │   ├── template.tsx        # Page transition wrapper (Framer Motion)
│   │   └── journey/
│   │       └── page.tsx        # /journey route (SSR disabled — GSAP needs browser APIs)
│   │
│   └── components/
│       ├── About.tsx           # Bio, tech terminal card, video résumé slot
│       ├── BrandIcons.tsx      # GitHub / LinkedIn SVG icon components
│       ├── Contact.tsx         # EmailJS form + contact info links
│       ├── CustomCursor.tsx    # Dot + ring cursor with interactive hover states
│       ├── Footer.tsx          # Site footer
│       ├── Hero.tsx            # Headline, typewriter, 3D photo card, social links
│       ├── Journey.tsx         # Full-page timeline with spotlight reveal animation
│       ├── LoadingScreen.tsx   # Branded splash screen (sessionStorage-gated)
│       ├── Navbar.tsx          # Fixed nav with scroll glass effect + ThemeToggle
│       ├── ParticleField.tsx   # Three.js particle background (loaded client-only)
│       ├── Projects.tsx        # Infinite marquee of 3D-tilt project cards
│       ├── Providers.tsx       # Lenis smooth scroll + next-themes ThemeProvider
│       ├── Skills.tsx          # Bento grid of tech category cards
│       └── ThemeToggle.tsx     # Animated Sun / Moon toggle button
│
├── next.config.ts              # Next.js config (YouTube image remote pattern)
├── vercel.json                 # Framework preset override (Next.js, not Vite)
├── postcss.config.mjs          # Tailwind v4 PostCSS plugin
└── tsconfig.json               # TypeScript config (path alias: @/* → src/*)
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- npm ≥ 10

### Installation

```bash
# 1. Clone
git clone https://github.com/Akashkr28/Akash_Kumar_Singh.git
cd Akash_Kumar_Singh

# 2. Install dependencies
npm install

# 3. Start dev server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build   # Optimised build → .next/
npm run start   # Serve the production build locally
```

---

## Environment Variables

The contact form uses [EmailJS](https://www.emailjs.com/). No `.env` file is required — these are public client-side keys. Replace the three constants at the top of `src/components/Contact.tsx`:

```ts
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'   // EmailJS → Email Services
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'  // EmailJS → Email Templates
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'   // EmailJS → Account → Public Key
```

EmailJS validates allowed origins server-side, so exposure in the bundle is safe.

---

## Pages & Components

### `/` — Home

| Section | Component | Description |
|---|---|---|
| Hero | `Hero.tsx` | Typewriter role animator, 3D photo card with perspective tilt + glare, social links |
| About | `About.tsx` | Bio paragraphs, detail pills (education / location / status), dark terminal JSON card |
| Projects | `Projects.tsx` | Infinite left-scrolling marquee of glass project cards with browser chrome mockups |
| Skills | `Skills.tsx` | Bento grid grouped by Frontend / Backend / Database / AI–ML / Mobile / DevOps |
| Contact | `Contact.tsx` | Two-column: contact info links (glass cards) + EmailJS message form |

### `/journey` — My Journey

Full-page vertical timeline covering Akash's decade-long path from commerce to tech. Each milestone card features:

- Per-type colour theming — `education` indigo · `work` amber · `pivot` violet · `tech` emerald · `current` sky
- **Spotlight Reveal** animation — cards un-blur as they enter the viewport
- Pulsing glow ring animation on the connecting timeline dot
- Year stamps floating on the opposite side from each card
- Gradient spine line drawn top-to-bottom by GSAP `ScrollTrigger`

---

## Design System

### Colour Palette

| Role | Light | Dark |
|---|---|---|
| Page background | `#eff3ff` | `#080d1a` |
| Glass surface | `rgba(255,255,255,0.62)` | `rgba(15,23,42,0.72)` |
| Glass border | `rgba(255,255,255,0.82)` | `rgba(255,255,255,0.10)` |
| Primary accent | `#6366f1` (indigo-500) | same |
| Secondary accent | `#0ea5e9` (sky-500) | same |
| Tertiary accent | `#a78bfa` (violet-400) | same |

### Shared CSS Utilities

```css
/* Glass panel — auto-adapts to theme via CSS variables */
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(22px);
  border: 1px solid var(--glass-border);
}

/* Gradient text (indigo → sky → violet) */
.gradient-text {
  background: linear-gradient(135deg, #6366f1, #0ea5e9, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## Animations

### Loading screen
- Gated with `sessionStorage` — shows once per browser session
- AKS logo fades in, progress bar fills over 2 s, entire screen fades out at 2.4 s

### Custom cursor
- **Dot** — 8 px, `bg-indigo-500`, `mix-blend-difference`, no transition
- **Ring** — 40 px border ring, follows with `0.13` lerp spring via `requestAnimationFrame`
- Expands to 48 px and changes colour on hover over `a`, `button`, `[data-cursor]` elements
- Disabled on touch devices via `@media (pointer: coarse)`

### 3D tilt effect
- `perspective(900px) rotateX/Y` tracks cursor normalised to `−0.5 … +0.5`
- Dynamic `boxShadow` shifts with tilt direction
- Specular glare overlay using `mixBlendMode: overlay` tracks cursor independently

### Journey timeline
- **Spotlight Reveal** — `initial: { opacity:0, filter:blur(16px), scale:0.88 }` → resolves to sharp via `whileInView`
- **Spine line** — GSAP `ScrollTrigger` drives `scaleY(0 → 1)` as the section scrolls through the viewport
- **Dot ping** — Framer Motion scale + opacity pulse repeats on card reveal

### Page transitions
- Enter: `opacity: 0 → 1`, `y: 12 → 0` over 0.45 s
- Exit: `y: 0 → −8` over 0.45 s
- Powered by Next.js `app/template.tsx` which remounts on every route change

---

## Dark Mode

Implementation layers:

1. **`next-themes`** (`Providers.tsx`) — toggles `class="dark"` on `<html>` with `attribute="class"`
2. **Tailwind v4 custom variant** (`globals.css`):
   ```css
   @variant dark (&:where(.dark, .dark *));
   ```
3. **CSS variables** for body background and glass (can't use Tailwind classes directly):
   ```css
   :root { --bg-base: #eff3ff; --glass-bg: rgba(255,255,255,0.62); }
   .dark  { --bg-base: #080d1a; --glass-bg: rgba(15,23,42,0.72);   }
   ```
4. **`dark:` utility classes** on all text, border, and surface colour tokens across components

`<html suppressHydrationWarning>` is set in `layout.tsx` to suppress the inevitable class mismatch between server render and client theme injection.

---

## Deployment

The site auto-deploys to Vercel on every push to `main`.

### Manual deploy

```bash
npm i -g vercel
vercel --prod
```

### `vercel.json` explanation

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install"
}
```

This file is **required**. The repo was originally a Vite project, so Vercel cached the Vite preset (which looks for a `dist/` output). The `vercel.json` overrides that to use the Next.js preset, which correctly handles the `.next/` output and SSR routing.

---

## Customisation

### Personal info

| What to change | Where |
|---|---|
| Name, tagline, intro text | `src/components/Hero.tsx` — JSX text nodes |
| Bio paragraphs | `src/components/About.tsx` — `<p>` blocks |
| Detail pills (education / location / status) | `src/components/About.tsx` — `details` array |
| Social links (GitHub / LinkedIn / Email) | `src/components/Hero.tsx` — link array |
| Profile photo | Replace `public/photo-card.jpg` |
| Résumé PDF | Replace `public/resume.pdf` |
| Video résumé | Set `VIDEO_RESUME_YT_ID` in `src/components/About.tsx` |

### Add a project

Append to the `projects` array in `src/components/Projects.tsx`:

```ts
{
  title: 'My New Project',
  shortDesc: 'One or two sentences about what it does.',
  tech: ['React', 'Node.js'],                   // must match keys in techIcons
  liveUrl: 'https://my-project.vercel.app',
  githubUrl: 'https://github.com/me/project',
  icon: <Code size={28} />,
  highlight: 'indigo',                           // indigo | sky | violet | emerald | rose | amber
  badge: 'Live',
  media: { type: 'video', src: '/previews/demo.mp4' },
  // or: { type: 'youtube', videoId: 'abc123' }
  // or: { type: 'image',   src: '/previews/screenshot.png' }
  // or: omit `media` for the animated gradient placeholder
}
```

### Add a journey milestone

Append to the `milestones` array in `src/components/Journey.tsx`:

```ts
{
  period: '2026',
  title: 'New Chapter',
  place: 'Company or Institution',
  desc: 'Short description of this milestone.',
  bullets: ['Key achievement', 'Key responsibility'],   // optional
  note: 'An italic footnote or aside.',                 // optional
  type: 'tech',   // 'education' | 'work' | 'pivot' | 'tech' | 'current'
}
```

### Add a tech skill

Find the relevant category in the `categories` array in `src/components/Skills.tsx` and add to its `techs` list:

```ts
{ name: 'MyTech', Icon: SiMytechIcon, color: '#FF5722' }
```

Import the icon from `react-icons/si` — the full list is at [react-icons.github.io](https://react-icons.github.io/react-icons/icons/si/).

---

<p align="center">
  Built by <a href="https://github.com/Akashkr28">Akash Kumar Singh</a> · MCA (AI & ML) · Amity University Online
</p>
