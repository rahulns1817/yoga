import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import AsanaCard from '../components/AsanaCard'
import PageFrame from '../components/PageFrame'
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
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.06 }}
          >
            <AsanaCard problem={problem} asana={asana} />
          </motion.li>
        ))}
      </ul>
    </PageFrame>
  )
}
