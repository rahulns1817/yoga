import type { Difficulty } from '../types'

const STYLES: Record<Difficulty, string> = {
  beginner: 'bg-primary/15 text-primary',
  intermediate: 'bg-accent/15 text-accent',
  advanced: 'bg-text/15 text-text',
}

const LABELS: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

interface Props {
  level: Difficulty
}

export default function DifficultyChip({ level }: Props) {
  return (
    <span className={`inline-flex items-center rounded-pill px-3 py-1 text-xs font-medium ${STYLES[level]}`}>
      {LABELS[level]}
    </span>
  )
}
