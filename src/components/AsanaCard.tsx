import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { photoForAsana } from '../lib/images'
import { formatDuration } from '../lib/format'
import { useReducedMotion } from '../lib/useReducedMotion'
import type { Asana, Problem } from '../types'
import DifficultyChip from './DifficultyChip'

interface Props {
  problem: Problem
  asana: Asana
}

export default function AsanaCard({ problem, asana }: Props) {
  const reduced = useReducedMotion()
  const photo = photoForAsana(asana.id, asana.illustration)

  return (
    <motion.div whileTap={reduced ? undefined : { scale: 0.98 }}>
      <Link
        to={`/asana/${problem.id}/${asana.id}`}
        className="flex items-center gap-4 rounded-card bg-surface border border-border/60 p-3 shadow-soft hover:shadow-lift hover:border-primary/50 transition"
      >
        <div className="h-20 w-20 flex-none rounded-2xl overflow-hidden bg-bg relative">
          <img src={photo} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg leading-tight truncate">{asana.sanskritName}</h3>
          <p className="text-text-muted text-sm truncate">{asana.englishName}</p>
          <div className="mt-2 flex items-center gap-2">
            <DifficultyChip level={asana.difficulty} />
            <span className="text-xs text-text-muted">· Hold {formatDuration(asana.durationSec)}</span>
          </div>
        </div>
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-text-muted flex-none" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </Link>
    </motion.div>
  )
}
