import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'
import PageFrame from '../components/PageFrame'
import SearchBar from '../components/SearchBar'
import { HERO_PHOTOS, INSPIRATION_PHOTO, POSE_OF_DAY_PHOTO } from '../lib/images'
import { filterProblems, PROBLEMS } from '../lib/lookups'
import { useReducedMotion } from '../lib/useReducedMotion'

const DID_YOU_KNOW = [
  {
    stat: '5,000+',
    label: 'years of practice',
    body: 'Yoga’s roots stretch back to the Indus-Saraswati civilization, refined over millennia.',
  },
  {
    stat: '20 min',
    label: 'a day, real shift',
    body: 'Even a short daily practice measurably lowers cortisol and improves sleep onset.',
  },
  {
    stat: '8 weeks',
    label: 'to rewire stress',
    body: 'Consistent practice for two months reshapes how your nervous system handles tension.',
  },
]

const DAILY_TIPS = [
  { emoji: '🌅', title: 'Wake gently', body: 'Three breaths before checking your phone.' },
  { emoji: '👀', title: 'Soften the gaze', body: 'Drop shoulders, unclench jaw, blink slow.' },
  { emoji: '🌿', title: 'Walk barefoot', body: 'Two minutes on grass to ground your nerves.' },
  { emoji: '🌙', title: 'Wind down', body: 'Forward fold for 1 min to invite sleep.' },
]

export default function Landing() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const reduced = useReducedMotion()

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 150)
    return () => clearTimeout(t)
  }, [query])

  const results = useMemo(() => filterProblems(debouncedQuery), [debouncedQuery])

  const featuredProblem = useMemo(() => PROBLEMS.find((p) => p.id === 'stress') ?? PROBLEMS[0], [])
  const featuredAsana = featuredProblem.asanas[0]

  return (
    <PageFrame variant="bare">
      <Hero />

      <div className="relative -mt-10 px-5 z-10">
        <div className="rounded-card glass shadow-lift p-3">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search a feeling — stress, sleep, headache…"
          />
        </div>
      </div>

      <FeaturedPose problem={featuredProblem} asanaName={featuredAsana.englishName} photo={POSE_OF_DAY_PHOTO} />

      <section className="px-5 mt-12">
        <SectionHeader eyebrow="Categories" title="How are you feeling?" />
        {results.length === 0 ? (
          <div className="rounded-card border border-border bg-surface/60 p-8 text-center mt-6">
            <p className="text-text-muted">No matches.</p>
            <p className="text-text-muted text-sm mt-1">
              Try "stress", "sleep", or "back pain".
            </p>
          </div>
        ) : (
          <motion.div layout className="mt-6 grid grid-cols-2 gap-3">
            <AnimatePresence mode="popLayout">
              {results.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <CategoryCard problem={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <DidYouKnowSection />

      <QuoteBreak />

      <DailyTipsCarousel />

      <InspirationCta photo={INSPIRATION_PHOTO} />

      <footer className="px-5 pt-10 pb-12 text-center text-text-muted text-xs">
        <p className="font-mantra italic text-base text-text/80">Sukha</p>
        <p className="mt-1">Yoga remedies for everyday wellness.</p>
        <p className="mt-3 text-[10px] tracking-widest uppercase">A POC · Not medical advice</p>
      </footer>
    </PageFrame>
  )
}

function Hero() {
  return (
    <section className="relative h-[520px] w-full overflow-hidden">
      <img
        src={HERO_PHOTOS[0]}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: 'center 30%' }}
      />
      <div className="absolute inset-0 bg-overlay-full" aria-hidden />
      <div className="absolute inset-0 grain opacity-30 pointer-events-none" aria-hidden />

      <div className="relative h-full flex flex-col justify-between px-6 py-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full glass-dark flex items-center justify-center font-display text-base">ॐ</div>
            <div>
              <p className="font-display text-base leading-none">Sukha</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">Daily wellness</p>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 px-3 py-1 rounded-full border border-white/20">
            Beta
          </span>
        </div>

        <div className="max-w-[18rem]">
          <p className="text-saffron text-xs uppercase tracking-[0.25em] mb-3">A pose for every feeling</p>
          <h1 className="font-display text-[44px] leading-[1.05] font-semibold">
            Find your <span className="italic text-saffron/95">sukha</span>.
          </h1>
          <p className="text-white/80 mt-3 text-sm leading-relaxed">
            Modern remedies, ancient postures. Built for stress, sleep, posture, and everything in between.
          </p>
          <a
            href="#how-are-you-feeling"
            className="inline-flex items-center gap-2 mt-6 rounded-pill bg-saffron text-forest-deep font-medium px-5 py-3 text-sm shadow-lift hover:bg-saffron-deep transition"
          >
            Find a remedy
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

function FeaturedPose({
  problem,
  asanaName,
  photo,
}: {
  problem: { id: string; name: string }
  asanaName: string
  photo: string
}) {
  return (
    <section className="px-5 mt-12">
      <SectionHeader eyebrow="Pose of the day" title="Open your day softly" />
      <Link
        to={`/problem/${problem.id}`}
        className="block mt-5 relative overflow-hidden rounded-card shadow-lift h-72"
      >
        <img src={photo} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-overlay-bottom" aria-hidden />
        <div className="relative h-full flex flex-col justify-between p-5 text-white">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-saffron">Featured</span>
            <span className="h-1 w-1 rounded-full bg-white/40" />
            <span className="text-xs text-white/70">Beginner · 1 min hold</span>
          </div>
          <div>
            <p className="text-saffron text-xs uppercase tracking-[0.25em]">For {problem.name.toLowerCase()}</p>
            <h3 className="font-display text-2xl mt-1 leading-tight">{asanaName}</h3>
            <p className="text-white/75 text-sm mt-1">Counter slumped posture, expand the breath.</p>
            <div className="inline-flex items-center gap-2 mt-4 rounded-pill bg-white text-forest-deep font-medium px-4 py-2 text-sm">
              Practice now
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </section>
  )
}

function SectionHeader({ eyebrow, title, dark }: { eyebrow: string; title: string; dark?: boolean }) {
  const colorEyebrow = dark ? 'text-saffron' : 'text-primary'
  const colorTitle = dark ? 'text-white' : 'text-text'
  return (
    <div id={title === 'How are you feeling?' ? 'how-are-you-feeling' : undefined}>
      <p className={`text-[11px] uppercase tracking-[0.3em] font-medium ${colorEyebrow}`}>{eyebrow}</p>
      <h2 className={`font-display text-3xl mt-2 leading-tight ${colorTitle}`}>{title}</h2>
    </div>
  )
}

function DidYouKnowSection() {
  return (
    <section
      className="mt-14 px-5 py-12 relative overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(180deg, #1F3329 0%, #142019 100%)',
      }}
    >
      <div className="absolute inset-0 grain opacity-40 pointer-events-none" aria-hidden />
      <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-saffron/15 blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" aria-hidden />

      <div className="relative">
        <SectionHeader eyebrow="Did you know" title="Why this works" dark />
        <div className="mt-6 flex flex-col gap-3">
          {DID_YOU_KNOW.map((item, i) => (
            <div
              key={i}
              className="rounded-card glass-dark border border-white/10 p-5"
            >
              <div className="flex items-baseline gap-2">
                <p className="font-display text-3xl text-saffron font-semibold">{item.stat}</p>
                <p className="text-white/60 text-xs uppercase tracking-widest">{item.label}</p>
              </div>
              <p className="text-white/80 text-sm mt-2 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function QuoteBreak() {
  return (
    <section className="px-5 py-14 text-center">
      <svg viewBox="0 0 24 24" className="h-6 w-6 mx-auto text-accent/70" fill="currentColor" aria-hidden>
        <path d="M7 7h4v4H7a3 3 0 0 1 0-6V3a5 5 0 0 0 0 10h4V7H7zm10 0h4v4h-4a3 3 0 0 1 0-6V3a5 5 0 0 0 0 10h4V7h-4z" />
      </svg>
      <p className="font-mantra italic text-3xl text-text mt-4 leading-snug">
        योगः कर्मसु कौशलम्
      </p>
      <p className="text-text-muted text-sm mt-2">Yoga is skill in action.</p>
      <p className="text-text-muted text-xs mt-1">— Bhagavad Gita, 2.50</p>
    </section>
  )
}

function DailyTipsCarousel() {
  return (
    <section className="mt-2 pl-5">
      <div className="pr-5">
        <SectionHeader eyebrow="Micro practices" title="Tiny habits, big shifts" />
      </div>
      <div className="mt-5 flex gap-3 overflow-x-auto scroll-hide pb-2 pr-5">
        {DAILY_TIPS.map((tip) => (
          <div
            key={tip.title}
            className="flex-none w-56 rounded-card bg-surface border border-border/60 p-5 shadow-soft"
          >
            <div className="h-10 w-10 rounded-2xl bg-bg flex items-center justify-center text-xl" aria-hidden>
              {tip.emoji}
            </div>
            <h3 className="font-display text-lg mt-3 leading-tight">{tip.title}</h3>
            <p className="text-text-muted text-sm mt-1 leading-snug">{tip.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function InspirationCta({ photo }: { photo: string }) {
  return (
    <section className="mt-12 mx-5 relative h-72 rounded-card overflow-hidden shadow-lift">
      <img src={photo} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: 'center 30%' }} />
      <div className="absolute inset-0 bg-overlay-full" aria-hidden />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
        <p className="text-saffron text-xs uppercase tracking-[0.3em]">Start small</p>
        <h3 className="font-display text-3xl mt-3 leading-tight max-w-[14ch]">Begin where you are.</h3>
        <p className="text-white/75 text-sm mt-3 max-w-[26ch]">
          One pose. One breath. One minute. That’s enough to begin.
        </p>
        <a
          href="#how-are-you-feeling"
          className="inline-flex items-center gap-2 mt-5 rounded-pill bg-white text-forest-deep font-medium px-5 py-3 text-sm hover:bg-saffron hover:text-forest-deep transition"
        >
          Explore poses
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </section>
  )
}
