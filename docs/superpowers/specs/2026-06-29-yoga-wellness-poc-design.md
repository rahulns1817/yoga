# Yoga Wellness POC — Design

**Date:** 2026-06-29
**Status:** Approved (pending spec review)

## 1. Purpose

A mobile-first web POC that helps users find yoga asanas for everyday lifestyle problems (stress, headache, bloating, insomnia, etc.). It serves as a visual + interaction prototype for a future native mobile app, so the desktop view should still read as a phone-shaped preview.

## 2. Stack

- **React 18** + **Vite** + **TypeScript**
- **Tailwind CSS** — utility-first mobile-first styling
- **Framer Motion** — splash animation, page transitions, micro-interactions
- **React Router v6** — `/`, `/home`, `/problem/:id`, `/asana/:problemId/:asanaId`
- **Google Fonts** — Fraunces (display), Inter (body), Cormorant Garamond (mantra)

No backend. No persistence beyond a `sessionStorage` flag for the splash.

## 3. User Flow

```
Splash (/)
  ↓ auto-advance 2.5s (or tap to skip)
Landing (/home)
  • search bar (filters categories live)
  • category grid (~10 problem cards)
  ↓ tap card
Problem Detail (/problem/:id)
  • header: problem name + 1-line description
  • list of 3–5 recommended asana cards
  ↓ tap asana card
Asana Detail (/asana/:problemId/:asanaId)
  • Sanskrit + English name
  • duration + difficulty chip
  • SVG illustration
  • problem-specific benefits
  • numbered steps (4–6)
  • "Begin practice" CTA (visual-only for POC)
```

Splash only shows once per session (`sessionStorage` flag). Back navigation everywhere via in-app back button + browser back.

## 4. File Layout

```
src/
├─ App.tsx                       — router shell + global frame
├─ main.tsx                      — Vite entry, mounts <App />
├─ pages/
│   ├─ SplashScreen.tsx          — lotus animation + mantra
│   ├─ Landing.tsx               — search + category grid
│   ├─ ProblemDetail.tsx         — asana list for selected problem
│   └─ AsanaDetail.tsx           — full pose detail
├─ components/
│   ├─ LotusAnimation.tsx        — SVG lotus + breath pulse
│   ├─ CategoryCard.tsx          — problem tile (icon + name + short desc)
│   ├─ AsanaCard.tsx             — pose summary tile
│   ├─ SearchBar.tsx             — debounced search input
│   ├─ DifficultyChip.tsx        — beginner/intermediate/advanced pill
│   └─ PageFrame.tsx             — shared phone-frame, header, back button, page transition
├─ data/
│   └─ problems.ts               — curated dataset
├─ types/
│   └─ index.ts                  — Problem, Asana, Difficulty, Category
└─ styles/
    └─ index.css                 — Tailwind layers + custom keyframes
```

Each file should stay under ~150 lines. If it grows past that, factor out.

## 5. Data Model

```ts
type Difficulty = 'beginner' | 'intermediate' | 'advanced'

type Category =
  | 'mental'         // stress, anxiety, mild depression
  | 'digestive'      // bloating, indigestion
  | 'musculoskeletal' // back pain, neck tension
  | 'sleep'          // insomnia
  | 'energy'         // fatigue
  | 'respiratory'    // (reserved — not in initial dataset)

interface Asana {
  id: string                 // kebab-case, unique per problem entry
  sanskritName: string       // "Balasana"
  englishName: string        // "Child's Pose"
  durationSec: number        // suggested hold (e.g., 60)
  difficulty: Difficulty
  illustration: string       // key into a small SVG component map
  steps: string[]            // 4–6 numbered instructions, plain strings
  benefits: string[]         // 2–3 bullets, written for THIS problem context
}

interface Problem {
  id: string                 // "stress"
  name: string               // "Stress"
  shortDescription: string   // "Calm the nervous system, soften tension"
  icon: string               // emoji fallback or SVG component key
  category: Category
  keywords: string[]         // for search: ["anxious", "tense", "overwhelmed"]
  asanas: Asana[]            // 3–5 entries
}
```

Asanas are **embedded** per problem (not normalized). Same pose may appear under multiple problems with problem-specific `benefits` text. Total dataset ~10 problems × 3–5 asanas ≈ 40 asana entries — duplication is acceptable for a POC and keeps lookups trivial. Future mobile app can normalize.

### Initial problems (10)

1. Stress (mental)
2. Anxiety (mental)
3. Mild Depression (mental)
4. Headache (musculoskeletal)
5. Insomnia (sleep)
6. Fatigue (energy)
7. Bloating (digestive)
8. Indigestion (digestive)
9. Lower Back Pain (musculoskeletal)
10. Neck & Shoulder Tension (musculoskeletal)

Each gets 3–5 traditional asanas with realistic Sanskrit names, durations, difficulty, steps, and benefits. Content quality target: "convincing demo," not "certified by a registered yoga therapist."

## 6. Visual System

### Palette (sage + cream + terracotta)

| Token            | Hex       | Use                                  |
|------------------|-----------|--------------------------------------|
| `--bg`           | `#F7F2EA` | Warm cream page background           |
| `--surface`      | `#FFFFFF` | Cards on cream                       |
| `--primary`      | `#7B8F73` | Sage — primary brand, headings emphasis |
| `--primary-hover`| `#6B7F63` | Sage hover/pressed                   |
| `--accent`       | `#C97B5A` | Terracotta — CTAs, active states     |
| `--text`         | `#2D3A2E` | Body / heading text                  |
| `--text-muted`   | `#6B746A` | Secondary text, captions             |
| `--border`       | `#E8DFD2` | Card borders, hairlines              |

### Typography

- **Display** (page titles, problem names): `Fraunces`, weights 400/600
- **Body** (UI text, steps, descriptions): `Inter`, weights 400/500/600
- **Mantra** (splash only): `Cormorant Garamond`, 500 italic

### Spacing & sizing

- Mobile-first content max-width **440px**, centered on larger screens with a soft sage-tinted gradient background visible around it
- Standard padding: 16px (content), 24px (page edges on phone, more breathing room on desktop frame)
- Touch targets: min 44×44px
- Card radius: 16px; chip radius: 999px (pill); button radius: 12px

### Motion

| Element              | Motion                                                       |
|----------------------|--------------------------------------------------------------|
| Lotus splash         | Petals stagger-in (~120ms each), breath-pulse circles loop   |
| Page transitions     | Slide-up + fade, 280ms ease-out                              |
| Card press           | Scale 0.97 spring 100ms                                      |
| Asana steps reveal   | Stagger fade-in on mount                                     |
| Search results       | Layout animation as categories filter                        |

Honor `prefers-reduced-motion`: skip lotus stagger and page transitions, fade-only.

## 7. Splash Screen Detail

- **SVG lotus** ~180px diameter, 8 petals + center
- Petals start `scale: 0, opacity: 0`, animate to `scale: 1, opacity: 1` in mirrored pairs across the center over ~1.2s
- **Breath-pulse** behind lotus: 2 concentric circles, `scale 1 → 1.15 → 1` looping ~3s, low opacity
- **Mantra**: "Loga Samastha Sukhino Bhavanthu" fades up below the lotus after petal animation completes
- Background: subtle radial sage→cream gradient
- Tap anywhere → skip to landing
- Auto-advance: ~2.5s total before fade to landing
- Only shown when `sessionStorage.getItem('splash-seen')` is null; sets it after dismissal

Reduced-motion fallback: render the lotus + mantra fully formed with a 400ms fade-in, hold, then advance.

## 8. Landing Page Detail

- Sticky header: app name ("Sukha" or similar — TBD in implementation, kept short) + tagline
- **Search bar** below header: placeholder "Search a feeling — stress, sleep, headache…"
  - Debounced 150ms
  - Matches problem `name` (case-insensitive substring) OR any `keywords` entry
  - Live-filters the grid below with layout animation
- **Category grid**: 2 columns on phone, problem cards 1:1 aspect
  - Card shows icon (top-left), name (bold), short description (muted, 1 line)
  - Tap → navigate to `/problem/:id`
- Empty state when no matches: muted illustration + "Try 'stress', 'sleep', or 'back pain'"

## 9. Problem Detail Page

- Header with back button, problem name (display font), short description (muted)
- Subtle category chip (e.g., "Mental wellness")
- List of **AsanaCard** entries, vertically stacked:
  - Left: small SVG illustration or icon
  - Right: Sanskrit name (bold), English name (muted), duration + difficulty chip
- Tap card → `/asana/:problemId/:asanaId`

## 10. Asana Detail Page

- Header with back button + breadcrumb hint ("For stress")
- **Hero**: large SVG illustration centered, ~200px tall
- Sanskrit name (display font, large), English name (muted, below)
- Row: duration pill (e.g., "Hold 1 min") + difficulty chip
- **Benefits** section: section label + 2–3 bullet items (problem-specific copy)
- **Steps** section: section label + numbered list (1, 2, 3…) — staggered fade on mount
- **"Begin practice"** CTA at bottom (terracotta), visual-only — clicking shows a soft "Coming soon" toast for POC

## 11. Error & Edge Cases

- Unknown `:problemId` or `:asanaId` → render "Couldn't find that one" page with Home link
- Search with no matches → soft empty state
- `prefers-reduced-motion: reduce` → static splash, no page-transition motion
- No JS / hydration delay → minimal pre-render acceptable (Vite SPA); not a concern for POC

## 12. Out of Scope

- Real photographs of poses (SVG line illustrations + emoji icons only)
- Audio-guided sessions, timers, breath cues
- User accounts, favorites, history, progress tracking
- Backend, API, server-side persistence
- Content review by a certified yoga practitioner — sample data is demo-quality, not medical advice
- Internationalization (English + Sanskrit transliteration only)
- Dark mode
- Analytics

## 13. Success Criteria

- Splash → Landing → Problem → Asana flow works on iPhone Safari and modern Chrome
- All 10 problems and ~40 asana entries populated with curated content
- Mobile (≤480px) layout renders without horizontal scroll
- Desktop (≥1024px) shows centered phone-shaped frame on a tinted background
- Lotus splash animation runs at 60fps on a 2020-era iPhone
- Reduced-motion preference respected
- Lighthouse mobile performance ≥ 85
- TypeScript compiles with no errors; no ESLint warnings beyond style preferences

## 14. Open Questions

- App name on landing header — placeholder is "Sukha" (Sanskrit for "ease/joy"); confirm during implementation or pick alternative
- Exact SVG illustrations per asana — implementer to use a small consistent set (~10–15 unique line illustrations), reused across asanas where appropriate; emoji fallback for unmapped poses
