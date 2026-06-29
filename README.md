# Sukha — Yoga for everyday wellness

A mobile-first web POC that maps everyday lifestyle problems (stress, headache, bloating, insomnia, fatigue, back pain, etc.) to recommended yoga asanas. Designed to read as a phone-shaped preview on any viewport so it can stand in for the eventual native mobile app.

Built with **React 18 + Vite + TypeScript**, styled with **Tailwind CSS**, animated with **Framer Motion**, routed with **React Router**, and tested with **Vitest**.

## Screens

- **Splash** — blooming-lotus SVG animation with the mantra *Loga Samastha Sukhino Bhavanthu* on a deep forest gradient.
- **Landing** — hero photo, glass-blur search, "Pose of the day" bento card, photo-bg category grid, auto-rotating wisdom carousel (85+ entries from the Yoga Sutras, Bhagavad Gita, modern teachers, and peer-reviewed research), Sanskrit quote break, micro-practices carousel, inspiration CTA.
- **Problem detail** — photo hero per problem, recommended asanas, practice tip.
- **Asana detail** — full-bleed pose photo, benefits, per-step photo thumbnails, "Begin practice" CTA.

## Local dev

```bash
npm install
npm run dev
```

Vite serves on `http://localhost:5173/` (or the next free port).

## Tests + lint + production build

```bash
npm test        # vitest — 14 tests covering the dataset and lookup helpers
npm run lint    # oxlint
npm run build   # tsc --build && vite build → dist/
npm run preview # serve dist/ locally
```

## Deploy (Netlify)

`netlify.toml` is committed at the repo root. Connect this repo at [app.netlify.com](https://app.netlify.com) → Add new site → Import an existing project → GitHub, and the build settings auto-detect from the toml:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 20
- SPA fallback: any unmatched path serves `index.html` so `/problem/:id` and `/asana/...` work on direct visit and refresh.

## Notable design choices

- **Phone-frame on every viewport** — content is capped at 440px wide and centered on desktop, so the POC reads as a mobile-app preview without rewriting layouts per breakpoint.
- **`prefers-reduced-motion` honored** across splash, page transitions, lotus stagger, inner-page animations, and the wisdom carousel autoplay.
- **Real photographs** — 26 practitioner photos bundled via Vite + `import.meta.glob`, served as content-hashed assets.
- **Curated dataset** — 10 problems × 3–5 asanas = 33 entries, each with Sanskrit + English name, duration, difficulty, illustrated steps, and problem-specific benefits. Lives in `src/data/problems.ts`. Lookup helpers in `src/lib/lookups.ts`.
- **Wisdom dataset** — 85+ entries in `src/data/facts.ts` tagged as `sutra | quote | research | tradition | fact`, each with source attribution (Patanjali sutra numbers, Bhagavad Gita verses, modern teacher names, full journal citations).

## Not medical advice

Sample content is "convincing demo" quality, not certified by a yoga therapist or medical professional. If you're injured or pregnant, talk to a teacher before practicing.
