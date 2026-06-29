# Yoga Wellness POC — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a mobile-first React POC that maps everyday lifestyle problems (stress, headache, bloating, etc.) to recommended yoga asanas, with a blooming-lotus splash and a sage/cream/terracotta palette.

**Architecture:** SPA built with Vite + React + TypeScript. Four routes: splash, landing (search + category grid), problem detail (asana list), asana detail (full pose). Tailwind for styling, Framer Motion for the splash and transitions, React Router for navigation. No backend; data lives in a typed `problems.ts` module. Desktop renders the same phone-width content centered on a tinted background so the POC reads as a mobile-app preview at any viewport.

**Tech Stack:** React 18, Vite 5, TypeScript 5, Tailwind CSS 3, Framer Motion 11, React Router 6, Vitest (pure-logic tests only).

## Global Constraints

- Project root: `/Users/rahulns/Desktop/Training/yoga/`. All `npm`, `npx`, and dev commands run from there.
- Content max-width: **440px**, centered on viewports ≥ 480px.
- Palette (CSS variables on `:root`): `--bg #F7F2EA`, `--surface #FFFFFF`, `--primary #7B8F73`, `--primary-hover #6B7F63`, `--accent #C97B5A`, `--text #2D3A2E`, `--text-muted #6B746A`, `--border #E8DFD2`.
- Typography: Fraunces (display), Inter (body), Cormorant Garamond (mantra only) — all via Google Fonts `<link>` in `index.html`.
- Mantra text (verbatim, splash only): `Loga Samastha Sukhino Bhavanthu`.
- Touch targets ≥ 44×44px.
- Card radius 16px, chip radius 999px (pill), button radius 12px.
- Honor `prefers-reduced-motion: reduce` for splash and page transitions (fade-only, no scale/stagger).
- Tests: Vitest for pure logic (search filter, data lookups). Visual/UI: manual browser verification — no RTL render tests for the POC.
- No backend, no analytics, no auth, no dark mode.

---

## File Structure

```
yoga/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.tsx                 — Vite entry, mounts <App />
│   ├── App.tsx                  — Router shell, route definitions
│   ├── pages/
│   │   ├── SplashScreen.tsx     — Lotus + mantra, auto-advance
│   │   ├── Landing.tsx          — Search + category grid
│   │   ├── ProblemDetail.tsx    — Asana list for a problem
│   │   ├── AsanaDetail.tsx      — Full pose detail
│   │   └── NotFound.tsx         — Unknown problem/asana id
│   ├── components/
│   │   ├── PageFrame.tsx        — Phone-width frame, header, back button, page transition
│   │   ├── LotusAnimation.tsx   — SVG lotus + breath pulse
│   │   ├── SearchBar.tsx        — Debounced input
│   │   ├── CategoryCard.tsx     — Problem tile
│   │   ├── AsanaCard.tsx        — Asana row in problem detail
│   │   ├── DifficultyChip.tsx   — Beginner/intermediate/advanced pill
│   │   └── PoseIllustration.tsx — Inline SVG line illustration by key
│   ├── data/
│   │   ├── problems.ts          — Curated dataset
│   │   └── problems.test.ts     — Lookup + filter unit tests
│   ├── lib/
│   │   ├── lookups.ts           — getProblem(id), getAsana(problemId, asanaId), filterProblems(query)
│   │   └── useReducedMotion.ts  — Hook returning prefers-reduced-motion boolean
│   ├── types/
│   │   └── index.ts             — Problem, Asana, Difficulty, Category types
│   └── styles/
│       └── index.css            — Tailwind layers + CSS variables + base
└── docs/superpowers/specs/2026-06-29-yoga-wellness-poc-design.md
```

Each source file should stay under ~150 lines. The dataset file is the only allowed exception.

---

## Task 1: Scaffold Vite + React + TS, install deps, configure Tailwind, drop in palette & fonts

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles/index.css`, `.gitignore`
- Test: (none — verify dev server boots)

**Interfaces:**
- Consumes: nothing
- Produces: a runnable dev server at `http://localhost:5173` showing a placeholder `App` with the cream background and Fraunces heading rendering correctly.

- [ ] **Step 1: Scaffold the Vite project in-place**

Run from `/Users/rahulns/Desktop/Training/yoga/`:

```bash
npm create vite@latest . -- --template react-ts
```

When prompted "Current directory is not empty… Ignore files and continue", answer **Yes** (the only file is `docs/`, which we want to keep).

- [ ] **Step 2: Install runtime + dev dependencies**

```bash
npm install
npm install react-router-dom@^6.26.0 framer-motion@^11.5.0
npm install -D tailwindcss@^3.4.10 postcss@^8.4.45 autoprefixer@^10.4.20 vitest@^2.1.0 @types/node@^22.5.0
```

- [ ] **Step 3: Initialize Tailwind config**

```bash
npx tailwindcss init -p
```

This creates `tailwind.config.js` and `postcss.config.js`.

- [ ] **Step 4: Configure Tailwind content + theme**

Overwrite `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F7F2EA',
        surface: '#FFFFFF',
        primary: { DEFAULT: '#7B8F73', hover: '#6B7F63' },
        accent: '#C97B5A',
        text: { DEFAULT: '#2D3A2E', muted: '#6B746A' },
        border: '#E8DFD2',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mantra: ['"Cormorant Garamond"', 'serif'],
      },
      borderRadius: {
        card: '16px',
        pill: '9999px',
        btn: '12px',
      },
      maxWidth: {
        phone: '440px',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 5: Add fonts + base styles in `src/styles/index.css`**

Overwrite `src/styles/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500&family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    color-scheme: light;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    @apply bg-bg text-text font-body antialiased;
    background-image: radial-gradient(120% 80% at 50% 0%, #EFE7D6 0%, #F7F2EA 60%);
    background-attachment: fixed;
  }

  h1, h2, h3 {
    @apply font-display text-text;
  }
}

@layer utilities {
  .phone-frame {
    @apply mx-auto w-full max-w-phone min-h-full bg-bg;
    box-shadow: 0 12px 40px -12px rgba(45, 58, 46, 0.15);
  }
}
```

- [ ] **Step 6: Replace default Vite scaffold files**

Overwrite `src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Overwrite `src/App.tsx`:

```tsx
export default function App() {
  return (
    <main className="phone-frame px-6 py-12">
      <h1 className="text-4xl font-display">Yoga POC</h1>
      <p className="text-text-muted mt-2">Scaffold ready.</p>
    </main>
  )
}
```

Delete the Vite-generated `src/App.css`, `src/index.css` (if present at root of `src/` — we use `src/styles/index.css`), and `src/assets/` folder.

```bash
rm -rf src/App.css src/index.css src/assets
```

- [ ] **Step 7: Update `index.html` title**

In `index.html`, replace the `<title>` element with:

```html
<title>Sukha — Yoga for everyday wellness</title>
```

- [ ] **Step 8: Verify dev server**

```bash
npm run dev
```

Expected: Vite prints `Local: http://localhost:5173/`. Open in browser. You should see:
- Warm cream background with a subtle radial gradient
- "Yoga POC" rendered in Fraunces serif
- "Scaffold ready." in Inter muted color
- Content centered, max-width 440px

Stop the dev server with Ctrl+C before continuing.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite+React+TS with Tailwind and palette"
```

---

## Task 2: Types, dataset, and lookup helpers (with tests)

**Files:**
- Create: `src/types/index.ts`, `src/data/problems.ts`, `src/lib/lookups.ts`, `src/data/problems.test.ts`
- Modify: `package.json` (add `test` script)

**Interfaces:**
- Consumes: nothing
- Produces:
  - `types`: `Problem`, `Asana`, `Difficulty`, `Category`, `IllustrationKey`
  - `lookups`:
    - `getProblem(id: string): Problem | undefined`
    - `getAsana(problemId: string, asanaId: string): Asana | undefined`
    - `filterProblems(query: string): Problem[]` — case-insensitive substring match on `name` OR any `keywords` entry; empty query returns all.
  - `PROBLEMS: Problem[]` — full curated dataset, 10 entries.

- [ ] **Step 1: Add `test` script to `package.json`**

In `package.json`, under `"scripts"`, add:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 2: Create `src/types/index.ts`**

```ts
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type Category =
  | 'mental'
  | 'digestive'
  | 'musculoskeletal'
  | 'sleep'
  | 'energy'

export type IllustrationKey =
  | 'child'
  | 'forward-fold'
  | 'seated-twist'
  | 'reclining-bound'
  | 'cat-cow'
  | 'legs-up-wall'
  | 'seated-meditation'

export interface Asana {
  id: string
  sanskritName: string
  englishName: string
  durationSec: number
  difficulty: Difficulty
  illustration: IllustrationKey
  steps: string[]
  benefits: string[]
}

export interface Problem {
  id: string
  name: string
  shortDescription: string
  icon: string
  category: Category
  keywords: string[]
  asanas: Asana[]
}
```

- [ ] **Step 3: Write the failing tests for lookups + filter**

Create `src/data/problems.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { PROBLEMS } from './problems'
import { filterProblems, getAsana, getProblem } from '../lib/lookups'

describe('PROBLEMS dataset', () => {
  it('contains exactly 10 problems', () => {
    expect(PROBLEMS).toHaveLength(10)
  })

  it('each problem has 3 to 5 asanas', () => {
    for (const p of PROBLEMS) {
      expect(p.asanas.length).toBeGreaterThanOrEqual(3)
      expect(p.asanas.length).toBeLessThanOrEqual(5)
    }
  })

  it('problem ids are unique', () => {
    const ids = PROBLEMS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('asana ids are unique within each problem', () => {
    for (const p of PROBLEMS) {
      const ids = p.asanas.map((a) => a.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('every asana has 4 to 6 steps and 2 to 3 benefits', () => {
    for (const p of PROBLEMS) {
      for (const a of p.asanas) {
        expect(a.steps.length).toBeGreaterThanOrEqual(4)
        expect(a.steps.length).toBeLessThanOrEqual(6)
        expect(a.benefits.length).toBeGreaterThanOrEqual(2)
        expect(a.benefits.length).toBeLessThanOrEqual(3)
      }
    }
  })
})

describe('getProblem', () => {
  it('returns a problem by id', () => {
    expect(getProblem('stress')?.name).toBe('Stress')
  })

  it('returns undefined for unknown id', () => {
    expect(getProblem('does-not-exist')).toBeUndefined()
  })
})

describe('getAsana', () => {
  it('returns an asana when problemId and asanaId both exist', () => {
    const stress = getProblem('stress')!
    const firstId = stress.asanas[0].id
    expect(getAsana('stress', firstId)?.id).toBe(firstId)
  })

  it('returns undefined for unknown problemId', () => {
    expect(getAsana('nope', 'whatever')).toBeUndefined()
  })

  it('returns undefined for unknown asanaId', () => {
    expect(getAsana('stress', 'not-a-real-asana')).toBeUndefined()
  })
})

describe('filterProblems', () => {
  it('returns all problems for an empty query', () => {
    expect(filterProblems('')).toHaveLength(10)
  })

  it('matches a problem name case-insensitively', () => {
    const results = filterProblems('STRESS')
    expect(results.some((p) => p.id === 'stress')).toBe(true)
  })

  it('matches via keywords', () => {
    const results = filterProblems('overwhelmed')
    expect(results.some((p) => p.id === 'stress')).toBe(true)
  })

  it('returns empty array when nothing matches', () => {
    expect(filterProblems('zxqwerty')).toEqual([])
  })
})
```

- [ ] **Step 4: Run tests and verify they fail**

```bash
npm test
```

Expected: All tests fail because `problems.ts` and `lookups.ts` do not exist yet.

- [ ] **Step 5: Create `src/lib/lookups.ts`**

```ts
import { PROBLEMS } from '../data/problems'
import type { Asana, Problem } from '../types'

export function getProblem(id: string): Problem | undefined {
  return PROBLEMS.find((p) => p.id === id)
}

export function getAsana(problemId: string, asanaId: string): Asana | undefined {
  return getProblem(problemId)?.asanas.find((a) => a.id === asanaId)
}

export function filterProblems(query: string): Problem[] {
  const q = query.trim().toLowerCase()
  if (!q) return PROBLEMS
  return PROBLEMS.filter((p) => {
    if (p.name.toLowerCase().includes(q)) return true
    return p.keywords.some((k) => k.toLowerCase().includes(q))
  })
}
```

- [ ] **Step 6: Create `src/data/problems.ts` with the full dataset**

Create `src/data/problems.ts`. The full file is long (~600 lines); below are three canonical entries (Stress, Headache, Insomnia) to anchor tone and structure. The remaining 7 problems must follow the exact same shape with realistic Sanskrit names, English translations, durations (30–120s), difficulty, and problem-specific benefits.

**Required IDs and order** (must match the test expectation of 10 problems and these specific ids):

1. `stress` — Stress (mental)
2. `anxiety` — Anxiety (mental)
3. `mild-depression` — Mild Depression (mental)
4. `headache` — Headache (musculoskeletal)
5. `insomnia` — Insomnia (sleep)
6. `fatigue` — Fatigue (energy)
7. `bloating` — Bloating (digestive)
8. `indigestion` — Indigestion (digestive)
9. `lower-back-pain` — Lower Back Pain (musculoskeletal)
10. `neck-shoulder-tension` — Neck & Shoulder Tension (musculoskeletal)

**Authoring rules (apply to every problem):**
- `shortDescription`: 4–8 words, calming tone (e.g., "Calm the nervous system, soften tension")
- `icon`: a single emoji that evokes the problem (🌧️ stress, 🌀 anxiety, 🌙 insomnia, 🌅 fatigue, 💨 bloating, 🍃 indigestion, 🪷 mild-depression, 🤕 headache, 🌿 lower-back-pain, 🪨 neck-shoulder-tension)
- `keywords`: 3–5 synonyms or felt-sense terms (e.g., for stress: `["overwhelmed","tense","wound up","frazzled"]`)
- 3–5 asanas per problem, each with **exactly** 4–6 steps and 2–3 benefits
- Asana `illustration` must be one of the `IllustrationKey` values defined in `src/types/index.ts`
- Sanskrit names: use commonly accepted transliteration (e.g., "Balasana", "Sukhasana", "Viparita Karani", "Setu Bandhasana")

**Canonical entries to copy verbatim:**

```ts
import type { Problem } from '../types'

export const PROBLEMS: Problem[] = [
  {
    id: 'stress',
    name: 'Stress',
    shortDescription: 'Calm the nervous system, soften tension',
    icon: '🌧️',
    category: 'mental',
    keywords: ['overwhelmed', 'tense', 'wound up', 'frazzled'],
    asanas: [
      {
        id: 'balasana',
        sanskritName: 'Balasana',
        englishName: "Child's Pose",
        durationSec: 60,
        difficulty: 'beginner',
        illustration: 'child',
        steps: [
          'Kneel on the floor and sit back onto your heels.',
          'Bring your big toes together and widen your knees hip-width.',
          'Fold forward, resting your torso between your thighs.',
          'Lengthen your arms forward, palms down, forehead to the mat.',
          'Breathe slowly into your back body for the full duration.',
        ],
        benefits: [
          'Soothes the parasympathetic nervous system',
          'Releases held tension in the lower back and hips',
          'Quiets racing thoughts through gentle inversion',
        ],
      },
      {
        id: 'viparita-karani',
        sanskritName: 'Viparita Karani',
        englishName: 'Legs-Up-The-Wall Pose',
        durationSec: 120,
        difficulty: 'beginner',
        illustration: 'legs-up-wall',
        steps: [
          'Sit with one hip against a wall.',
          'Swing your legs up the wall as you lie back on the floor.',
          'Scoot your sit bones as close to the wall as comfortable.',
          'Let your arms rest by your sides, palms facing up.',
          'Soften your jaw and breathe naturally for the full duration.',
        ],
        benefits: [
          'Activates the rest-and-digest response',
          'Reverses pooled tension from a long day standing or sitting',
          'Eases mild headaches that accompany stress',
        ],
      },
      {
        id: 'sukhasana-fold',
        sanskritName: 'Adho Mukha Sukhasana',
        englishName: 'Easy Seated Forward Fold',
        durationSec: 60,
        difficulty: 'beginner',
        illustration: 'forward-fold',
        steps: [
          'Sit cross-legged on a folded blanket so hips are above knees.',
          'Inhale to lengthen the spine upward.',
          'Exhale and hinge forward from the hips, walking hands out.',
          'Rest forehead on stacked fists, a block, or the floor.',
          'Stay here, breathing into the back ribs.',
        ],
        benefits: [
          'Folds the body inward, signaling safety',
          'Lengthens the spine and releases shoulder tension',
        ],
      },
      {
        id: 'setu-bandhasana',
        sanskritName: 'Setu Bandhasana',
        englishName: 'Supported Bridge Pose',
        durationSec: 60,
        difficulty: 'intermediate',
        illustration: 'reclining-bound',
        steps: [
          'Lie on your back, knees bent, feet hip-width and parallel.',
          'Press into your feet and lift your hips toward the sky.',
          'Slide a block under your sacrum at its lowest height.',
          'Relax your arms by your sides, palms up.',
          'Let the block fully support you and breathe slowly.',
          'To exit, press into feet, lift hips, remove block, lower slowly.',
        ],
        benefits: [
          'Opens the chest, counters slumped posture from stress',
          'Calms the mind through gentle inversion',
        ],
      },
    ],
  },
  {
    id: 'headache',
    name: 'Headache',
    shortDescription: 'Release tension in head, neck, and jaw',
    icon: '🤕',
    category: 'musculoskeletal',
    keywords: ['migraine', 'tension head', 'head pressure', 'temple ache'],
    asanas: [
      {
        id: 'balasana-headache',
        sanskritName: 'Balasana',
        englishName: "Child's Pose",
        durationSec: 90,
        difficulty: 'beginner',
        illustration: 'child',
        steps: [
          'Kneel and sit back onto your heels.',
          'Widen the knees, big toes together.',
          'Fold forward, resting your forehead on the mat or a block.',
          'Place hands palms-up beside your hips.',
          'Let the weight of your head be fully supported.',
        ],
        benefits: [
          'Gentle pressure on the forehead can ease tension headaches',
          'Quiets the visual cortex by closing off external stimuli',
        ],
      },
      {
        id: 'viparita-karani-headache',
        sanskritName: 'Viparita Karani',
        englishName: 'Legs-Up-The-Wall Pose',
        durationSec: 120,
        difficulty: 'beginner',
        illustration: 'legs-up-wall',
        steps: [
          'Sit beside a wall, then swing your legs up as you lie back.',
          'Scoot close enough that your sit bones touch the wall.',
          'Rest arms at your sides, palms up.',
          'Close your eyes or cover them with a soft cloth.',
          'Breathe slowly through the nose for the full duration.',
        ],
        benefits: [
          'Improves venous return, reducing head pressure',
          'Relaxes the muscles around the eyes and temples',
        ],
      },
      {
        id: 'seated-neck-release',
        sanskritName: 'Sukhasana Griva Mukti',
        englishName: 'Easy Pose Neck Release',
        durationSec: 60,
        difficulty: 'beginner',
        illustration: 'seated-meditation',
        steps: [
          'Sit cross-legged with a tall spine.',
          'Drop your right ear toward your right shoulder.',
          'Rest your right hand lightly on the side of your head.',
          'Hold for 30 seconds, breathing into the left neck.',
          'Switch sides and repeat for 30 seconds.',
        ],
        benefits: [
          'Releases the upper trapezius, a common headache trigger',
          'Eases the suboccipital muscles at the base of the skull',
        ],
      },
    ],
  },
  {
    id: 'insomnia',
    name: 'Insomnia',
    shortDescription: 'Wind down body and mind for sleep',
    icon: '🌙',
    category: 'sleep',
    keywords: ['cant sleep', 'restless', 'wakeful', 'tossing'],
    asanas: [
      {
        id: 'viparita-karani-sleep',
        sanskritName: 'Viparita Karani',
        englishName: 'Legs-Up-The-Wall Pose',
        durationSec: 120,
        difficulty: 'beginner',
        illustration: 'legs-up-wall',
        steps: [
          'Set up beside a wall and swing your legs up as you lie back.',
          'Dim the lights or use an eye pillow.',
          'Let your arms rest open by your sides.',
          'Breathe slowly: inhale 4 counts, exhale 6 counts.',
          'Stay for the full duration; come out slowly.',
        ],
        benefits: [
          'Triggers the parasympathetic shift needed for sleep',
          'Quiets the busy mind by reducing sensory input',
        ],
      },
      {
        id: 'supta-baddha-konasana',
        sanskritName: 'Supta Baddha Konasana',
        englishName: 'Reclining Bound Angle Pose',
        durationSec: 120,
        difficulty: 'beginner',
        illustration: 'reclining-bound',
        steps: [
          'Lie on your back, knees bent.',
          'Bring the soles of your feet together and let knees fall open.',
          'Support each knee with a pillow or block.',
          'Rest hands on belly or out by your sides.',
          'Breathe slowly and let gravity do the opening.',
        ],
        benefits: [
          'Opens the hips and pelvis, releasing held tension',
          'Soothes the nervous system through grounded support',
        ],
      },
      {
        id: 'balasana-sleep',
        sanskritName: 'Balasana',
        englishName: "Child's Pose",
        durationSec: 60,
        difficulty: 'beginner',
        illustration: 'child',
        steps: [
          'Kneel on a soft surface — bed or carpet.',
          'Sit back onto your heels and fold forward.',
          'Stack your fists under your forehead.',
          'Let the weight of your head rest fully.',
          'Breathe long and slow into the back body.',
        ],
        benefits: [
          'Fold inward signals safety and sleep readiness',
          'Releases lower-back tension that disrupts sleep',
        ],
      },
    ],
  },
  // TODO_IMPLEMENTER: Add the remaining 7 problems in this exact order:
  // anxiety, mild-depression, fatigue, bloating, indigestion,
  // lower-back-pain, neck-shoulder-tension.
  // Each MUST have 3–5 asanas, each asana 4–6 steps and 2–3 benefits.
  // Use only IllustrationKey values: 'child' | 'forward-fold' | 'seated-twist'
  // | 'reclining-bound' | 'cat-cow' | 'legs-up-wall' | 'seated-meditation'.
]
```

> **Implementer note:** The `TODO_IMPLEMENTER` block above is the only place in this plan where the engineer authors content. The remaining 7 entries are creative-content work, not code-correctness work. Follow the canonical pattern exactly. Suggested asanas per remaining problem (use these for `illustration` keys at minimum):
> - **anxiety**: balasana (child), supta-baddha-konasana (reclining-bound), seated-neck-release (seated-meditation)
> - **mild-depression**: setu-bandhasana (reclining-bound), gentle-cat-cow (cat-cow), seated-meditation (seated-meditation)
> - **fatigue**: gentle-cat-cow (cat-cow), seated-twist (seated-twist), legs-up-wall (legs-up-wall)
> - **bloating**: supine-twist (seated-twist), wind-relieving (reclining-bound), seated-forward-fold (forward-fold)
> - **indigestion**: seated-twist (seated-twist), cat-cow (cat-cow), child (child)
> - **lower-back-pain**: cat-cow (cat-cow), child (child), supine-twist (seated-twist), bridge (reclining-bound)
> - **neck-shoulder-tension**: child (child), seated-neck-release (seated-meditation), cat-cow (cat-cow), forward-fold (forward-fold)
>
> Delete the `TODO_IMPLEMENTER` comment when finished.

- [ ] **Step 7: Run tests and verify they all pass**

```bash
npm test
```

Expected: All tests pass. If the count assertions fail, you have not yet authored all 10 problems with the required asana counts.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: typed problem dataset and lookup helpers"
```

---

## Task 3: Router shell, PageFrame, NotFound, route placeholders

**Files:**
- Modify: `src/App.tsx`
- Create: `src/components/PageFrame.tsx`, `src/pages/SplashScreen.tsx`, `src/pages/Landing.tsx`, `src/pages/ProblemDetail.tsx`, `src/pages/AsanaDetail.tsx`, `src/pages/NotFound.tsx`

**Interfaces:**
- Consumes: `BrowserRouter`, `Routes`, `Route`, `useParams`, `useNavigate` from `react-router-dom`
- Produces:
  - Route map (must match exactly — Task 4–7 link to these paths):
    - `/` → `<SplashScreen />`
    - `/home` → `<Landing />`
    - `/problem/:problemId` → `<ProblemDetail />`
    - `/asana/:problemId/:asanaId` → `<AsanaDetail />`
    - `*` → `<NotFound />`
  - `<PageFrame title?: string showBack?: boolean children: ReactNode />` — renders the phone-shaped frame with optional sticky header and back button. `showBack=true` calls `navigate(-1)` on click.

- [ ] **Step 1: Create `src/components/PageFrame.tsx`**

```tsx
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  title?: string
  showBack?: boolean
  children: ReactNode
}

export default function PageFrame({ title, showBack, children }: Props) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="phone-frame flex flex-col"
    >
      {(title || showBack) && (
        <header className="sticky top-0 z-10 flex items-center gap-2 bg-bg/85 backdrop-blur px-5 py-4 border-b border-border">
          {showBack && (
            <button
              type="button"
              aria-label="Back"
              onClick={() => navigate(-1)}
              className="h-11 w-11 -ml-2 flex items-center justify-center rounded-full hover:bg-border/60 active:scale-95 transition"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-text fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
          {title && <h1 className="font-display text-xl">{title}</h1>}
        </header>
      )}
      <div className="flex-1 px-5 py-6">{children}</div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Create placeholder page files**

Create `src/pages/SplashScreen.tsx`:

```tsx
export default function SplashScreen() {
  return <div className="p-6">Splash (placeholder)</div>
}
```

Create `src/pages/Landing.tsx`:

```tsx
import PageFrame from '../components/PageFrame'

export default function Landing() {
  return (
    <PageFrame>
      <h1 className="font-display text-4xl">Sukha</h1>
      <p className="text-text-muted mt-2">Find ease in your body.</p>
    </PageFrame>
  )
}
```

Create `src/pages/ProblemDetail.tsx`:

```tsx
import { useParams } from 'react-router-dom'
import PageFrame from '../components/PageFrame'

export default function ProblemDetail() {
  const { problemId } = useParams()
  return (
    <PageFrame showBack title="Problem">
      <p className="text-text-muted">Problem id: {problemId}</p>
    </PageFrame>
  )
}
```

Create `src/pages/AsanaDetail.tsx`:

```tsx
import { useParams } from 'react-router-dom'
import PageFrame from '../components/PageFrame'

export default function AsanaDetail() {
  const { problemId, asanaId } = useParams()
  return (
    <PageFrame showBack title="Asana">
      <p className="text-text-muted">{problemId} / {asanaId}</p>
    </PageFrame>
  )
}
```

Create `src/pages/NotFound.tsx`:

```tsx
import { Link } from 'react-router-dom'
import PageFrame from '../components/PageFrame'

export default function NotFound() {
  return (
    <PageFrame showBack title="Not found">
      <p className="text-text-muted mb-6">Couldn't find that one.</p>
      <Link
        to="/home"
        className="inline-block rounded-btn bg-primary text-white px-5 py-3 font-medium hover:bg-primary-hover transition"
      >
        Back to home
      </Link>
    </PageFrame>
  )
}
```

- [ ] **Step 3: Wire the router in `src/App.tsx`**

Overwrite `src/App.tsx`:

```tsx
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import AsanaDetail from './pages/AsanaDetail'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'
import ProblemDetail from './pages/ProblemDetail'
import SplashScreen from './pages/SplashScreen'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/problem/:problemId" element={<ProblemDetail />} />
        <Route path="/asana/:problemId/:asanaId" element={<AsanaDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
```

- [ ] **Step 4: Verify the router in the browser**

```bash
npm run dev
```

Visit each route and confirm:
- `/` shows "Splash (placeholder)"
- `/home` shows "Sukha" in Fraunces
- `/problem/stress` shows "Problem id: stress" with a back button
- `/asana/stress/balasana` shows "stress / balasana"
- `/does-not-exist` shows the NotFound page

Click the back button on any inner page and confirm browser back works.

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: react-router shell with PageFrame and placeholders"
```

---

## Task 4: Lotus animation + SplashScreen with session gating and reduced-motion

**Files:**
- Create: `src/components/LotusAnimation.tsx`, `src/lib/useReducedMotion.ts`
- Modify: `src/pages/SplashScreen.tsx`

**Interfaces:**
- Consumes: `useReducedMotion()` from `src/lib/useReducedMotion.ts` returning `boolean`
- Produces:
  - `<LotusAnimation reduced?: boolean />` — renders the SVG lotus and behind-it pulse rings; when `reduced` is true, renders petals fully-opened with a simple fade (no stagger, no rotation).
  - `SplashScreen` reads `sessionStorage.getItem('splash-seen')` on mount: if set, immediately replaces with `/home`. Otherwise plays the animation, sets the flag, then navigates to `/home` after ~2500ms. Tap anywhere skips.

- [ ] **Step 1: Create `src/lib/useReducedMotion.ts`**

```ts
import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}
```

- [ ] **Step 2: Create `src/components/LotusAnimation.tsx`**

```tsx
import { motion } from 'framer-motion'

interface Props {
  reduced?: boolean
}

const PETAL_COUNT = 8
const PETAL_PAIRS = [
  [0, 4],
  [2, 6],
  [1, 5],
  [3, 7],
]

export default function LotusAnimation({ reduced }: Props) {
  return (
    <div className="relative h-[200px] w-[200px]">
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full bg-primary/15"
        animate={reduced ? { opacity: 0.3 } : { scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={reduced ? { duration: 0 } : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        aria-hidden
        className="absolute inset-6 rounded-full bg-primary/20"
        animate={reduced ? { opacity: 0.4 } : { scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={reduced ? { duration: 0 } : { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />
      <svg viewBox="-100 -100 200 200" className="absolute inset-0 h-full w-full">
        {Array.from({ length: PETAL_COUNT }).map((_, i) => {
          const angle = (360 / PETAL_COUNT) * i
          const pairIndex = PETAL_PAIRS.findIndex((pair) => pair.includes(i))
          const delay = reduced ? 0 : 0.2 + pairIndex * 0.18
          return (
            <motion.ellipse
              key={i}
              cx={0}
              cy={-32}
              rx={14}
              ry={36}
              fill="#C97B5A"
              fillOpacity={0.75}
              stroke="#7B8F73"
              strokeWidth={1.5}
              style={{ transformOrigin: '0px 0px' }}
              initial={{ scale: 0, opacity: 0, rotate: angle }}
              animate={{ scale: 1, opacity: 1, rotate: angle }}
              transition={{ duration: reduced ? 0.4 : 0.6, delay, ease: 'easeOut' }}
            />
          )
        })}
        <motion.circle
          cx={0}
          cy={0}
          r={14}
          fill="#7B8F73"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: reduced ? 0.4 : 0.5, delay: reduced ? 0 : 1.0, ease: 'easeOut' }}
        />
      </svg>
    </div>
  )
}
```

- [ ] **Step 3: Implement `src/pages/SplashScreen.tsx`**

Overwrite `src/pages/SplashScreen.tsx`:

```tsx
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LotusAnimation from '../components/LotusAnimation'
import { useReducedMotion } from '../lib/useReducedMotion'

const SPLASH_FLAG = 'splash-seen'

export default function SplashScreen() {
  const navigate = useNavigate()
  const reduced = useReducedMotion()

  useEffect(() => {
    if (sessionStorage.getItem(SPLASH_FLAG)) {
      navigate('/home', { replace: true })
      return
    }
    const t = setTimeout(() => {
      sessionStorage.setItem(SPLASH_FLAG, '1')
      navigate('/home', { replace: true })
    }, reduced ? 1400 : 2600)
    return () => clearTimeout(t)
  }, [navigate, reduced])

  const skip = () => {
    sessionStorage.setItem(SPLASH_FLAG, '1')
    navigate('/home', { replace: true })
  }

  return (
    <button
      type="button"
      onClick={skip}
      aria-label="Skip splash"
      className="phone-frame flex flex-col items-center justify-center text-center px-6 py-12 min-h-screen"
    >
      <LotusAnimation reduced={reduced} />
      <motion.p
        className="font-mantra italic text-2xl text-text mt-10 leading-snug"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: reduced ? 0.4 : 1.6, ease: 'easeOut' }}
      >
        Loga Samastha Sukhino Bhavanthu
      </motion.p>
    </button>
  )
}
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```

Open an incognito window to `http://localhost:5173/`. Confirm:
- Petals appear in pairs, staggered
- Pulse rings breathe behind the lotus
- Mantra fades in below after ~1.6s
- After ~2.6s total, you land on `/home`
- Refresh the page within the same tab → splash is **skipped**, lands directly on `/home`
- Tap anywhere on the splash → immediately advances to `/home`

Test reduced motion:
- macOS: System Settings → Accessibility → Display → Reduce motion → ON
- Refresh in a new incognito tab → petals fade in together (no rotation/stagger), pulse rings still + low opacity, advance after ~1.4s
- Turn the OS preference back off

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: lotus splash with mantra, session gating, reduced motion"
```

---

## Task 5: SearchBar + CategoryCard + Landing page with live filtering

**Files:**
- Create: `src/components/SearchBar.tsx`, `src/components/CategoryCard.tsx`
- Modify: `src/pages/Landing.tsx`

**Interfaces:**
- Consumes: `filterProblems` from `src/lib/lookups.ts`
- Produces:
  - `<SearchBar value: string onChange: (v: string) => void placeholder?: string />`
  - `<CategoryCard problem: Problem />` — links to `/problem/:id`
  - Landing page with header, search input, filtered category grid, empty state.

- [ ] **Step 1: Create `src/components/SearchBar.tsx`**

```tsx
interface Props {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <label className="relative block">
      <span className="sr-only">Search</span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 stroke-text-muted fill-none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={11} cy={11} r={7} />
        <line x1={20} y1={20} x2={16.65} y2={16.65} />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 rounded-pill bg-surface border border-border pl-11 pr-4 text-base placeholder:text-text-muted focus:outline-none focus:border-primary transition"
      />
    </label>
  )
}
```

- [ ] **Step 2: Create `src/components/CategoryCard.tsx`**

```tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Problem } from '../types'

interface Props {
  problem: Problem
}

export default function CategoryCard({ problem }: Props) {
  return (
    <motion.div whileTap={{ scale: 0.97 }}>
      <Link
        to={`/problem/${problem.id}`}
        className="block aspect-square rounded-card bg-surface border border-border p-4 flex flex-col justify-between hover:border-primary/60 transition"
      >
        <span className="text-3xl" aria-hidden>{problem.icon}</span>
        <div>
          <h2 className="font-display text-lg leading-tight">{problem.name}</h2>
          <p className="text-text-muted text-sm mt-1 line-clamp-2">{problem.shortDescription}</p>
        </div>
      </Link>
    </motion.div>
  )
}
```

> **Note:** `line-clamp-2` requires Tailwind v3.4+ which is already installed (no plugin needed).

- [ ] **Step 3: Implement the Landing page**

Overwrite `src/pages/Landing.tsx`:

```tsx
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import CategoryCard from '../components/CategoryCard'
import PageFrame from '../components/PageFrame'
import SearchBar from '../components/SearchBar'
import { filterProblems } from '../lib/lookups'

export default function Landing() {
  const [query, setQuery] = useState('')
  const results = useMemo(() => filterProblems(query), [query])

  return (
    <PageFrame>
      <header className="mb-6">
        <h1 className="font-display text-4xl">Sukha</h1>
        <p className="text-text-muted mt-1">Find a posture for how you feel.</p>
      </header>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search a feeling — stress, sleep, headache…"
      />

      <section className="mt-6">
        {results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted">No matches.</p>
            <p className="text-text-muted text-sm mt-1">Try "stress", "sleep", or "back pain".</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 gap-3">
            <AnimatePresence mode="popLayout">
              {results.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                >
                  <CategoryCard problem={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </PageFrame>
  )
}
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```

Go to `http://localhost:5173/home`. Confirm:
- "Sukha" header in Fraunces, tagline in Inter muted
- Search input with magnifying glass icon
- 2-column grid of 10 category cards, each square with emoji + name + short description
- Typing "stress" filters to the stress card (animated)
- Typing "overwhelmed" still matches stress (keyword match)
- Typing "zzz" shows the empty state with hint text
- Tap a card → navigates to `/problem/<id>`
- Card has a tap-press scale-down feel

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: landing page with search and category grid"
```

---

## Task 6: DifficultyChip + AsanaCard + ProblemDetail page

**Files:**
- Create: `src/components/DifficultyChip.tsx`, `src/components/AsanaCard.tsx`, `src/components/PoseIllustration.tsx`
- Modify: `src/pages/ProblemDetail.tsx`

**Interfaces:**
- Consumes: `getProblem` from `src/lib/lookups.ts`
- Produces:
  - `<DifficultyChip level: Difficulty />` — pill with subtle color tint per level
  - `<PoseIllustration shape: IllustrationKey className?: string />` — inline SVG line illustration. Renders one of the 7 keys; falls back to `seated-meditation` for unknown values.
  - `<AsanaCard problem: Problem asana: Asana />` — links to `/asana/:problemId/:asanaId`
  - ProblemDetail page renders header (problem name + description) and a vertical list of AsanaCards. Unknown `:problemId` → `<NotFound />`.

- [ ] **Step 1: Create `src/components/DifficultyChip.tsx`**

```tsx
import type { Difficulty } from '../types'

const STYLES: Record<Difficulty, string> = {
  beginner: 'bg-primary/15 text-primary',
  intermediate: 'bg-accent/15 text-accent',
  advanced: 'bg-text/15 text-text',
}

const LABELS: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

interface Props {
  level: Difficulty
}

export default function DifficultyChip({ level }: Props) {
  return (
    <span className={`inline-flex items-center rounded-pill px-3 py-1 text-xs font-medium ${STYLES[level]}`}>
      {LABELS[level]}
    </span>
  )
}
```

- [ ] **Step 2: Create `src/components/PoseIllustration.tsx`**

```tsx
import type { IllustrationKey } from '../types'

interface Props {
  shape: IllustrationKey
  className?: string
}

const BASE = 'stroke-primary fill-none'

export default function PoseIllustration({ shape, className }: Props) {
  return (
    <svg viewBox="0 0 120 80" className={`${className ?? ''}`} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <g className={BASE}>{render(shape)}</g>
    </svg>
  )
}

function render(shape: IllustrationKey) {
  switch (shape) {
    case 'child':
      // Folded over, head down
      return (
        <>
          <path d="M20 60 Q50 70 90 60" />
          <circle cx={95} cy={58} r={6} />
          <path d="M20 60 L20 50" />
        </>
      )
    case 'forward-fold':
      return (
        <>
          <path d="M40 70 L40 30 Q60 10 80 30" />
          <circle cx={82} cy={32} r={5} />
          <path d="M40 70 L70 70" />
        </>
      )
    case 'seated-twist':
      return (
        <>
          <path d="M30 70 Q60 40 80 50" />
          <circle cx={84} cy={48} r={5} />
          <path d="M30 70 L80 70" />
          <path d="M55 50 L70 60" />
        </>
      )
    case 'reclining-bound':
      return (
        <>
          <path d="M20 55 L100 55" />
          <circle cx={105} cy={53} r={5} />
          <path d="M55 55 Q60 35 70 55" />
        </>
      )
    case 'cat-cow':
      return (
        <>
          <path d="M25 55 Q60 30 90 55" />
          <circle cx={94} cy={52} r={5} />
          <path d="M30 55 L30 70" />
          <path d="M85 55 L85 70" />
        </>
      )
    case 'legs-up-wall':
      return (
        <>
          <path d="M20 70 L80 70" />
          <path d="M80 70 L80 20" />
          <path d="M75 70 L75 25" />
          <circle cx={25} cy={65} r={5} />
        </>
      )
    case 'seated-meditation':
    default:
      return (
        <>
          <path d="M40 70 Q60 50 80 70" />
          <path d="M55 55 L55 35" />
          <circle cx={55} cy={28} r={6} />
          <path d="M50 50 L40 60" />
          <path d="M60 50 L70 60" />
        </>
      )
  }
}
```

- [ ] **Step 3: Create `src/components/AsanaCard.tsx`**

```tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Asana, Problem } from '../types'
import DifficultyChip from './DifficultyChip'
import PoseIllustration from './PoseIllustration'

interface Props {
  problem: Problem
  asana: Asana
}

export default function AsanaCard({ problem, asana }: Props) {
  return (
    <motion.div whileTap={{ scale: 0.98 }}>
      <Link
        to={`/asana/${problem.id}/${asana.id}`}
        className="flex items-center gap-4 rounded-card bg-surface border border-border p-4 hover:border-primary/60 transition"
      >
        <div className="h-16 w-20 flex-none rounded-xl bg-bg flex items-center justify-center">
          <PoseIllustration shape={asana.illustration} className="h-12 w-16" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg leading-tight truncate">{asana.sanskritName}</h3>
          <p className="text-text-muted text-sm truncate">{asana.englishName}</p>
          <div className="mt-2 flex items-center gap-2">
            <DifficultyChip level={asana.difficulty} />
            <span className="text-xs text-text-muted">Hold {formatDuration(asana.durationSec)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function formatDuration(sec: number): string {
  if (sec < 60) return `${sec}s`
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return s === 0 ? `${m} min` : `${m}m ${s}s`
}
```

- [ ] **Step 4: Implement ProblemDetail**

Overwrite `src/pages/ProblemDetail.tsx`:

```tsx
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import AsanaCard from '../components/AsanaCard'
import PageFrame from '../components/PageFrame'
import { getProblem } from '../lib/lookups'
import NotFound from './NotFound'

const CATEGORY_LABEL: Record<string, string> = {
  mental: 'Mental wellness',
  digestive: 'Digestive',
  musculoskeletal: 'Body & posture',
  sleep: 'Sleep',
  energy: 'Energy',
}

export default function ProblemDetail() {
  const { problemId } = useParams()
  const problem = problemId ? getProblem(problemId) : undefined

  if (!problem) return <NotFound />

  return (
    <PageFrame showBack>
      <div className="mb-6">
        <span className="inline-block text-xs uppercase tracking-wider text-primary font-medium">
          {CATEGORY_LABEL[problem.category] ?? problem.category}
        </span>
        <h1 className="font-display text-3xl mt-2">{problem.name}</h1>
        <p className="text-text-muted mt-1">{problem.shortDescription}</p>
      </div>

      <ul className="flex flex-col gap-3">
        {problem.asanas.map((asana, i) => (
          <motion.li
            key={asana.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.06 }}
          >
            <AsanaCard problem={problem} asana={asana} />
          </motion.li>
        ))}
      </ul>
    </PageFrame>
  )
}
```

- [ ] **Step 5: Verify in browser**

```bash
npm run dev
```

Confirm:
- `/problem/stress` shows: category tag "Mental wellness", "Stress" heading, short description, and 4 asana cards stacked vertically with illustration + Sanskrit/English names + difficulty + duration
- Cards stagger-fade in on entry
- Tap an asana card → navigates to `/asana/stress/balasana` (placeholder still)
- `/problem/not-real` shows the NotFound page
- Back button returns to landing

Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: problem detail with asana list, chips, and illustrations"
```

---

## Task 7: AsanaDetail page

**Files:**
- Modify: `src/pages/AsanaDetail.tsx`

**Interfaces:**
- Consumes: `getProblem`, `getAsana` from `src/lib/lookups.ts`; `DifficultyChip`, `PoseIllustration`
- Produces: full asana detail view with toast on "Begin practice"

- [ ] **Step 1: Implement AsanaDetail**

Overwrite `src/pages/AsanaDetail.tsx`:

```tsx
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import DifficultyChip from '../components/DifficultyChip'
import PageFrame from '../components/PageFrame'
import PoseIllustration from '../components/PoseIllustration'
import { getAsana, getProblem } from '../lib/lookups'
import NotFound from './NotFound'

function formatDuration(sec: number): string {
  if (sec < 60) return `${sec}s`
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return s === 0 ? `${m} min` : `${m}m ${s}s`
}

export default function AsanaDetail() {
  const { problemId, asanaId } = useParams()
  const problem = problemId ? getProblem(problemId) : undefined
  const asana = problemId && asanaId ? getAsana(problemId, asanaId) : undefined
  const [toast, setToast] = useState(false)

  if (!problem || !asana) return <NotFound />

  const showToast = () => {
    setToast(true)
    setTimeout(() => setToast(false), 2200)
  }

  return (
    <PageFrame showBack>
      <p className="text-xs uppercase tracking-wider text-primary font-medium">
        For {problem.name.toLowerCase()}
      </p>

      <div className="mt-4 rounded-card bg-surface border border-border p-6 flex items-center justify-center">
        <PoseIllustration shape={asana.illustration} className="h-44 w-full" />
      </div>

      <div className="mt-5">
        <h1 className="font-display text-3xl leading-tight">{asana.sanskritName}</h1>
        <p className="text-text-muted">{asana.englishName}</p>
        <div className="mt-3 flex items-center gap-2">
          <DifficultyChip level={asana.difficulty} />
          <span className="inline-flex items-center rounded-pill bg-border/60 px-3 py-1 text-xs font-medium text-text">
            Hold {formatDuration(asana.durationSec)}
          </span>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="font-display text-xl mb-3">Benefits</h2>
        <ul className="flex flex-col gap-2">
          {asana.benefits.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.22, delay: i * 0.06 }}
              className="flex gap-3 text-text"
            >
              <span aria-hidden className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-none" />
              <span>{b}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl mb-3">How to practice</h2>
        <ol className="flex flex-col gap-3">
          {asana.steps.map((s, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 + i * 0.07 }}
              className="flex gap-3"
            >
              <span className="font-display text-primary font-semibold w-6 flex-none">{i + 1}.</span>
              <span>{s}</span>
            </motion.li>
          ))}
        </ol>
      </section>

      <button
        type="button"
        onClick={showToast}
        className="mt-10 w-full rounded-btn bg-accent text-white font-medium py-3.5 hover:opacity-90 active:scale-[0.99] transition"
      >
        Begin practice
      </button>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-text text-white text-sm px-4 py-2 rounded-pill shadow-lg"
            role="status"
          >
            Guided sessions coming soon.
          </motion.div>
        )}
      </AnimatePresence>
    </PageFrame>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Visit `/asana/stress/balasana`. Confirm:
- "For stress" tag at top
- Illustration in a soft card
- Sanskrit name large, English name muted below
- Beginner chip + "Hold 1 min" pill
- "Benefits" section with bullet-style dots, items fade-in
- "How to practice" section with numbered steps in sage color
- "Begin practice" terracotta button at the bottom
- Tap the button → small dark toast at the bottom: "Guided sessions coming soon." — auto-dismisses
- `/asana/stress/not-a-real-asana` → NotFound
- `/asana/not-a-real/anything` → NotFound

Stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: asana detail with benefits, steps, and coming-soon toast"
```

---

## Task 8: Final polish — mobile/desktop verification, dataset completion check, lighthouse pass

**Files:**
- Modify (only if needed during this task): any file requiring fixes uncovered by verification

**Interfaces:**
- Consumes: nothing new
- Produces: confidence the POC meets all success criteria in the spec.

- [ ] **Step 1: Confirm the dataset is complete**

If you skipped some of the 7 remaining problems in Task 2, finish them now. Then:

```bash
npm test
```

Expected: all tests pass, including the "contains exactly 10 problems" and per-problem counts.

- [ ] **Step 2: TypeScript + production build check**

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors. If there are errors, fix them and rebuild.

- [ ] **Step 3: Mobile-viewport visual check**

```bash
npm run dev
```

Open Chrome DevTools, toggle device toolbar, choose **iPhone 14 Pro**. Walk through the full flow:
1. Hard refresh — splash plays
2. Lotus animation is smooth (no jank)
3. Mantra renders in Cormorant italic
4. Land on `/home` — no horizontal scroll
5. Search "stress" → grid filters with motion
6. Tap Stress → ProblemDetail loads, asana cards fit screen width
7. Tap an asana → AsanaDetail renders cleanly; tap "Begin practice" → toast appears at bottom
8. Back arrow returns to ProblemDetail; back again to Landing
9. Search "back pain" → matches Lower Back Pain via keyword
10. Search "zzz" → empty state appears

Fix any layout breakage before continuing.

- [ ] **Step 4: Desktop visual check**

In a 1440px-wide window, confirm:
- Content is centered, max-width 440px
- Soft sage-tinted radial gradient is visible around the phone-shaped column
- Same flow works mouse-driven (hover states active on category and asana cards)

- [ ] **Step 5: Reduced motion check**

Toggle macOS Reduce Motion ON. Reload `/`. Confirm:
- Lotus petals fade in together (no rotation/stagger)
- Pulse rings are static-but-tinted
- Page transitions still fade but don't slide

Turn Reduce Motion back off.

- [ ] **Step 6: Lighthouse mobile audit**

Open Chrome DevTools → Lighthouse → Mobile → Performance. Run on `/home`.

Expected: Performance score ≥ 85. If lower:
- Check for unused Tailwind classes (purge is automatic via `content` config, but verify the build output is reasonable)
- Confirm fonts use `&display=swap`
- Confirm no oversized images (we have none, but verify)

- [ ] **Step 7: Final commit**

If any fixes were applied in steps 1–6:

```bash
git add -A
git commit -m "polish: dataset completion and final mobile/desktop pass"
```

If no changes were needed, skip the commit.

- [ ] **Step 8: Confirm done**

The POC should now satisfy every section of the spec. The repo state:
- `npm run dev` boots the app
- `npm test` passes (all dataset and lookup tests)
- `npm run build` produces a clean production bundle in `dist/`

---

## Done

The POC is now ready. To run it later:

```bash
cd /Users/rahulns/Desktop/Training/yoga
npm run dev
```

To build a static bundle for hosting:

```bash
npm run build
npm run preview
```
