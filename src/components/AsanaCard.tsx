import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Asana, Problem } from '../types'
import DifficultyChip from './DifficultyChip'
import PoseIllustration from './PoseIllustration'

interface Props {
  problem: Problem
  asana: Asana
}

export default function AsanaCard({ problem, asana }: Props) {
  return (
    <motion.div whileTap={{ scale: 0.98 }}>
      <Link
        to={`/asana/${problem.id}/${asana.id}`}
        className="flex items-center gap-4 rounded-card bg-surface border border-border p-4 hover:border-primary/60 transition"
      >
        <div className="h-16 w-20 flex-none rounded-xl bg-bg flex items-center justify-center">
          <PoseIllustration shape={asana.illustration} className="h-12 w-16" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg leading-tight truncate">{asana.sanskritName}</h3>
          <p className="text-text-muted text-sm truncate">{asana.englishName}</p>
          <div className="mt-2 flex items-center gap-2">
            <DifficultyChip level={asana.difficulty} />
            <span className="text-xs text-text-muted">Hold {formatDuration(asana.durationSec)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function formatDuration(sec: number): string {
  if (sec < 60) return `${sec}s`
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return s === 0 ? `${m} min` : `${m}m ${s}s`
}
