import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Problem } from '../types'
import { useReducedMotion } from '../lib/useReducedMotion'

interface Props {
  problem: Problem
}

export default function CategoryCard({ problem }: Props) {
  const reduced = useReducedMotion()

  return (
    <motion.div whileTap={reduced ? undefined : { scale: 0.97 }}>
      <Link
        to={`/problem/${problem.id}`}
        className="aspect-square rounded-card bg-surface border border-border p-4 flex flex-col justify-between hover:border-primary/60 transition"
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
