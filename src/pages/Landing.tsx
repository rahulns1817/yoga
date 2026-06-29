import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'
import FactsCarousel from '../components/FactsCarousel'
import PageFrame from '../components/PageFrame'
import SearchBar from '../components/SearchBar'
import { HERO_PHOTOS, INSPIRATION_PHOTO, POSE_OF_DAY_PHOTO } from '../lib/images'
import { filterProblems, PROBLEMS } from '../lib/lookups'
import { useReducedMotion } from '../lib/useReducedMotion'

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
  const featuredAsana = useMemo(
    () => featuredProblem.asanas.find((a) => a.id === 'setu-bandhasana') ?? featuredProblem.asanas[0],
    [featuredProblem],
  )

  return (
    <PageFrame variant="bare">
      <Hero />

      <div className="px-5 mt-6">
        <div className="rounded-card glass shadow-lift p-2.5 border border-white/40">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search a feeling — stress, sleep, headache…"
          />
        </div>
      </div>

      <FeaturedPose
        problem={featuredProblem}
        asanaName={featuredAsana.englishName}
        photo={POSE_OF_DAY_PHOTO}
      />

      <section id="how-are-you-feeling" className="px-5 mt-14">
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

      <section className="mt-14 px-5">
        <SectionHeader eyebrow="Wisdom & research" title="Why this works" />
      </section>
      <div className="mt-6">
        <FactsCarousel />
      </div>

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
    <section className="relative h-[600px] w-full overflow-hidden">
      <img
        src={HERO_PHOTOS[0]}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: 'center 30%' }}
      />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            'linear-gradient(180deg, rgba(20,32,25,0.55) 0%, rgba(20,32,25,0.30) 30%, rgba(20,32,25,0.70) 70%, rgba(20,32,25,0.95) 100%)',
        }}
      />
      <div className="absolute inset-0 grain opacity-30 pointer-events-none" aria-hidden />

      <div className="relative h-full flex flex-col px-6 py-7 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full glass-dark border border-white/15 flex items-center justify-center font-display text-base">ॐ</div>
            <div>
              <p className="font-display text-base leading-none">Sukha</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">Daily wellness</p>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 px-3 py-1 rounded-full border border-white/25 glass-dark">
            Beta
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-end pb-4 max-w-[22rem]">
          <p className="text-saffron text-xs uppercase tracking-[0.3em] mb-3 font-medium drop-shadow">A pose for every feeling</p>
          <h1 className="font-display text-[46px] leading-[1.04] font-semibold drop-shadow-sm">
            Find your <span className="italic text-saffron">sukha</span>.
          </h1>
          <p className="text-white/90 mt-4 text-sm leading-relaxed max-w-[24ch] drop-shadow">
            Modern remedies, ancient postures. Built for stress, sleep, posture, and everything in between.
          </p>
          <a
            href="#how-are-you-feeling"
            className="inline-flex w-fit items-center gap-2 mt-6 rounded-pill bg-saffron text-forest-deep font-medium px-5 py-3 text-sm shadow-lift hover:bg-saffron-deep transition"
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
    <section className="px-5 mt-14">
      <SectionHeader eyebrow="Pose of the day" title="Open your day softly" />
      <Link
        to={`/problem/${problem.id}`}
        className="block mt-5 relative overflow-hidden rounded-card shadow-lift h-80"
      >
        <img src={photo} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: 'center 20%' }} />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent" aria-hidden />
        <div
          className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-24 text-white"
          style={{
            background:
              'linear-gradient(to top, rgba(20,32,25,0.97) 0%, rgba(20,32,25,0.88) 40%, rgba(20,32,25,0.45) 75%, transparent 100%)',
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-saffron font-medium">Featured</span>
            <span className="h-1 w-1 rounded-full bg-white/50" />
            <span className="text-xs text-white/75">Intermediate · 1 min hold</span>
          </div>
          <p className="text-saffron text-xs uppercase tracking-[0.25em] mt-3 font-medium">For {problem.name.toLowerCase()}</p>
          <h3 className="font-display text-2xl mt-1 leading-tight">{asanaName}</h3>
          <p className="text-white/85 text-sm mt-1.5">Counter slumped posture, expand the breath.</p>
          <div className="inline-flex items-center gap-2 mt-5 rounded-pill bg-white text-forest-deep font-medium px-4 py-2 text-sm hover:bg-saffron transition">
            Practice now
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
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
    <div>
      <p className={`text-[11px] uppercase tracking-[0.3em] font-medium ${colorEyebrow}`}>{eyebrow}</p>
      <h2 className={`font-display text-3xl mt-2 leading-tight ${colorTitle}`}>{title}</h2>
    </div>
  )
}

function QuoteBreak() {
  return (
    <section className="px-5 py-16 text-center">
      <svg viewBox="0 0 24 24" className="h-7 w-7 mx-auto text-accent/70" fill="currentColor" aria-hidden>
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
    <section className="mt-14 mx-5 relative h-80 rounded-card overflow-hidden shadow-lift">
      <img src={photo} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: 'center 30%' }} />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            'linear-gradient(180deg, rgba(20,32,25,0.40) 0%, rgba(20,32,25,0.65) 50%, rgba(20,32,25,0.92) 100%)',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-end text-center text-white px-6 pb-7">
        <p className="text-saffron text-xs uppercase tracking-[0.3em] drop-shadow">Start small</p>
        <h3 className="font-display text-3xl mt-3 leading-tight max-w-[14ch] drop-shadow">Begin where you are.</h3>
        <p className="text-white/90 text-sm mt-3 max-w-[28ch] drop-shadow">
          One pose. One breath. One minute. That’s enough to begin.
        </p>
        <a
          href="#how-are-you-feeling"
          className="inline-flex items-center gap-2 mt-5 rounded-pill bg-white text-forest-deep font-medium px-5 py-3 text-sm hover:bg-saffron transition"
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
