import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import DifficultyChip from '../components/DifficultyChip'
import PageFrame from '../components/PageFrame'
import PoseIllustration from '../components/PoseIllustration'
import { formatDuration } from '../lib/format'
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

  if (!problem || !asana) return <NotFound />

  const showToast = () => {
    setToast(true)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(false), 2200)
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
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: -6 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
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
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
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
        className={`mt-10 w-full rounded-btn bg-accent text-white font-medium py-3.5 hover:opacity-90 transition${reduced ? '' : ' active:scale-[0.99]'}`}
      >
        Begin practice
      </button>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
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
