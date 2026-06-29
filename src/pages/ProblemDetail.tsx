import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import AsanaCard from '../components/AsanaCard'
import PageFrame from '../components/PageFrame'
import { photoForCategory } from '../lib/images'
import { getProblem } from '../lib/lookups'
import { useReducedMotion } from '../lib/useReducedMotion'
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
  const reduced = useReducedMotion()

  if (!problem) return <NotFound />

  const photo = photoForCategory(problem.category)

  return (
    <PageFrame variant="floating-back" showBack>
      <section className="relative h-80 w-full overflow-hidden">
        <img src={photo} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: 'center 25%' }} />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" aria-hidden />
        <div
          className="absolute inset-x-0 bottom-0 px-5 pb-6 pt-28 text-white"
          style={{
            background:
              'linear-gradient(to top, rgba(20,32,25,0.97) 0%, rgba(20,32,25,0.90) 35%, rgba(20,32,25,0.50) 70%, transparent 100%)',
          }}
        >
          <p className="text-saffron text-[11px] uppercase tracking-[0.3em] font-medium">
            {CATEGORY_LABEL[problem.category] ?? problem.category}
          </p>
          <h1 className="font-display text-4xl mt-2 leading-tight drop-shadow">{problem.name}</h1>
          <p className="text-white/90 mt-2 text-sm max-w-[28ch] drop-shadow">{problem.shortDescription}</p>
        </div>
      </section>

      <section className="px-5 pt-6 pb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl">Recommended postures</h2>
          <span className="text-xs text-text-muted">{problem.asanas.length} poses</span>
        </div>
        <ul className="flex flex-col gap-3">
          {problem.asanas.map((asana, i) => (
            <motion.li
              key={asana.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.06 }}
            >
              <AsanaCard problem={problem} asana={asana} />
            </motion.li>
          ))}
        </ul>

        <div className="mt-8 rounded-card bg-saffron/10 border border-saffron/30 p-5">
          <p className="text-[11px] uppercase tracking-[0.25em] text-saffron-deep font-medium">Practice tip</p>
          <p className="text-text mt-2 text-sm leading-relaxed">
            Move through these gently. If a pose feels sharp or wrong, ease out. Breath leads, body follows.
          </p>
        </div>
      </section>
    </PageFrame>
  )
}
