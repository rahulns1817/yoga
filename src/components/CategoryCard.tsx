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
