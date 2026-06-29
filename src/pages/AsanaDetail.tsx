import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import DifficultyChip from '../components/DifficultyChip'
import PageFrame from '../components/PageFrame'
import { formatDuration } from '../lib/format'
import { ALL_PHOTOS, photoForAsana } from '../lib/images'
import { getAsana, getProblem } from '../lib/lookups'
import { useReducedMotion } from '../lib/useReducedMotion'
import NotFound from './NotFound'

export default function AsanaDetail() {
  const { problemId, asanaId } = useParams()
  const problem = problemId ? getProblem(problemId) : undefined
  const asana = problemId && asanaId ? getAsana(problemId, asanaId) : undefined
  const [toast, setToast] = useState(false)
  const reduced = useReducedMotion()
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current) }, [])

  const stepPhotos = useMemo(() => {
    if (!asana) return [] as string[]
    let hash = 0
    for (let i = 0; i < asana.id.length; i++) hash = (hash * 31 + asana.id.charCodeAt(i)) >>> 0
    return asana.steps.map((_, i) => ALL_PHOTOS[(hash + i * 7) % ALL_PHOTOS.length])
  }, [asana])

  if (!problem || !asana) return <NotFound />

  const heroPhoto = photoForAsana(asana.id, asana.illustration)

  const showToast = () => {
    setToast(true)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(false), 2200)
  }

  return (
    <PageFrame variant="floating-back" showBack>
      <section className="relative h-[420px] w-full overflow-hidden">
        <img
          src={heroPhoto}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: 'center 25%' }}
        />
        <div className="absolute inset-0 bg-overlay-full" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="text-saffron text-[11px] uppercase tracking-[0.3em] font-medium">
            For {problem.name.toLowerCase()}
          </p>
          <h1 className="font-display text-4xl mt-2 leading-tight">{asana.sanskritName}</h1>
          <p className="text-white/85 text-base mt-1">{asana.englishName}</p>
          <div className="mt-4 flex items-center gap-2">
            <DifficultyChip level={asana.difficulty} />
            <span className="inline-flex items-center gap-1 rounded-pill glass-dark text-white px-3 py-1 text-xs font-medium">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15 14" />
              </svg>
              Hold {formatDuration(asana.durationSec)}
            </span>
          </div>
        </div>
      </section>

      <section className="px-5 pt-6">
        <BenefitsSection benefits={asana.benefits} reduced={reduced} />
      </section>

      <section className="px-5 pt-10">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-primary font-medium">Practice</p>
            <h2 className="font-display text-2xl mt-1">Step by step</h2>
          </div>
          <span className="text-xs text-text-muted">{asana.steps.length} steps</span>
        </div>

        <ol className="mt-5 flex flex-col gap-4">
          {asana.steps.map((step, i) => (
            <motion.li
              key={i}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 + i * 0.07 }}
              className="flex gap-3"
            >
              <div className="h-24 w-24 flex-none rounded-2xl overflow-hidden bg-bg relative shadow-soft">
                <img src={stepPhotos[i]} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute top-1.5 left-1.5 h-6 w-6 rounded-full bg-forest-deep text-white font-display text-xs flex items-center justify-center">
                  {i + 1}
                </div>
              </div>
              <p className="flex-1 text-text leading-relaxed self-center text-[15px]">{step}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      <section className="px-5 pt-10">
        <div
          className="relative overflow-hidden rounded-card p-6"
          style={{
            backgroundImage: 'linear-gradient(135deg, #1F3329 0%, #142019 100%)',
          }}
        >
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-saffron/15 blur-2xl pointer-events-none" aria-hidden />
          <div className="relative">
            <p className="text-saffron text-[11px] uppercase tracking-[0.25em]">Ready when you are</p>
            <h3 className="text-white font-display text-2xl mt-2">Begin the practice</h3>
            <p className="text-white/70 text-sm mt-2 leading-relaxed">
              Set a timer for {formatDuration(asana.durationSec)}. Breathe through your nose. Let the pose meet you.
            </p>
            <button
              type="button"
              onClick={showToast}
              className={`mt-5 inline-flex items-center gap-2 rounded-pill bg-saffron text-forest-deep font-medium px-5 py-3 text-sm hover:bg-white transition${reduced ? '' : ' active:scale-[0.98]'}`}
            >
              Begin practice
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="px-5 pt-8 pb-12">
        <div className="rounded-card bg-surface border border-border/60 p-5">
          <p className="text-[11px] uppercase tracking-[0.25em] text-text-muted font-medium">A gentle reminder</p>
          <p className="text-text mt-2 text-sm leading-relaxed">
            This isn’t medical advice. If you’re injured or pregnant, talk to a teacher first. Always listen to your body.
          </p>
        </div>
      </section>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-forest-deep text-white text-sm px-5 py-3 rounded-pill shadow-lift z-50"
            role="status"
          >
            Guided sessions coming soon.
          </motion.div>
        )}
      </AnimatePresence>
    </PageFrame>
  )
}

function BenefitsSection({ benefits, reduced }: { benefits: string[]; reduced: boolean }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.3em] text-primary font-medium">Why this works</p>
      <h2 className="font-display text-2xl mt-1">Benefits</h2>
      <div className="mt-4 grid gap-3">
        {benefits.map((b, i) => (
          <motion.div
            key={i}
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: -6 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.06 }}
            className="flex gap-3 rounded-card bg-saffron/10 border border-saffron/25 p-4"
          >
            <div className="h-8 w-8 flex-none rounded-full bg-saffron/25 flex items-center justify-center text-saffron-deep">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-text text-sm leading-relaxed self-center">{b}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
