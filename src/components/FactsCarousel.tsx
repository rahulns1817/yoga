import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FACTS, type FactKind } from '../data/facts'
import { useReducedMotion } from '../lib/useReducedMotion'

const AUTOPLAY_MS = 6500

const KIND_LABEL: Record<FactKind, string> = {
  sutra: 'Classical text',
  quote: 'Teacher wisdom',
  research: 'Research finding',
  tradition: 'Tradition',
  fact: 'Did you know',
}

const KIND_ICON: Record<FactKind, string> = {
  sutra: '𑖌',
  quote: '“',
  research: '⚗',
  tradition: '☉',
  fact: '✦',
}

export default function FactsCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (paused || reduced) return
    const t = setTimeout(() => setIndex((i) => (i + 1) % FACTS.length), AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [index, paused, reduced])

  const fact = FACTS[index]
  const next = () => setIndex((i) => (i + 1) % FACTS.length)
  const prev = () => setIndex((i) => (i - 1 + FACTS.length) % FACTS.length)

  return (
    <section
      className="mt-2 mx-5 relative overflow-hidden rounded-card p-7 text-white"
      style={{
        backgroundImage: 'linear-gradient(180deg, #1F3329 0%, #142019 100%)',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="absolute inset-0 grain opacity-40 pointer-events-none" aria-hidden />
      <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-saffron/15 blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" aria-hidden />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-full glass-dark border border-white/15 flex items-center justify-center text-saffron text-base">
              {KIND_ICON[fact.kind]}
            </span>
            <div>
              <p className="text-saffron text-[10px] uppercase tracking-[0.3em] font-medium">{KIND_LABEL[fact.kind]}</p>
              <p className="text-white/45 text-[10px] tracking-widest">{(index + 1).toString().padStart(2, '0')} / {FACTS.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <ArrowBtn onClick={prev} label="Previous fact" dir="left" />
            <ArrowBtn onClick={next} label="Next fact" dir="right" />
          </div>
        </div>

        <div className="mt-6 min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <p className="font-mantra italic text-2xl leading-snug text-white/95">
                “{fact.text}”
              </p>
              {fact.detail && (
                <p className="text-white/65 text-sm mt-3 leading-relaxed">{fact.detail}</p>
              )}
              <footer className="mt-5 flex items-center gap-2">
                <span className="h-px w-6 bg-saffron/60" aria-hidden />
                <cite className="text-saffron not-italic text-xs uppercase tracking-[0.25em] font-medium">
                  {fact.source}
                </cite>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5">
          {[-2, -1, 0, 1, 2].map((offset) => {
            const i = (index + offset + FACTS.length) % FACTS.length
            const active = offset === 0
            return (
              <button
                key={offset}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Jump to fact ${i + 1}`}
                className={`h-1 rounded-full transition-all ${active ? 'w-8 bg-saffron' : 'w-1.5 bg-white/25 hover:bg-white/50'}`}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ArrowBtn({ onClick, label, dir }: { onClick: () => void; label: string; dir: 'left' | 'right' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="h-9 w-9 rounded-full glass-dark border border-white/15 flex items-center justify-center text-white/80 hover:text-saffron hover:scale-105 active:scale-95 transition"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {dir === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  )
}
