import type { IllustrationKey } from '../types'

interface Props {
  shape: IllustrationKey
  className?: string
}

const BASE = 'stroke-primary fill-none'

export default function PoseIllustration({ shape, className }: Props) {
  return (
    <svg viewBox="0 0 120 80" className={`${className ?? ''}`} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <g className={BASE}>{render(shape)}</g>
    </svg>
  )
}

function render(shape: IllustrationKey) {
  switch (shape) {
    case 'child':
      // Folded over, head down
      return (
        <>
          <path d="M20 60 Q50 70 90 60" />
          <circle cx={95} cy={58} r={6} />
          <path d="M20 60 L20 50" />
        </>
      )
    case 'forward-fold':
      return (
        <>
          <path d="M40 70 L40 30 Q60 10 80 30" />
          <circle cx={82} cy={32} r={5} />
          <path d="M40 70 L70 70" />
        </>
      )
    case 'seated-twist':
      return (
        <>
          <path d="M30 70 Q60 40 80 50" />
          <circle cx={84} cy={48} r={5} />
          <path d="M30 70 L80 70" />
          <path d="M55 50 L70 60" />
        </>
      )
    case 'reclining-bound':
      return (
        <>
          <path d="M20 55 L100 55" />
          <circle cx={105} cy={53} r={5} />
          <path d="M55 55 Q60 35 70 55" />
        </>
      )
    case 'cat-cow':
      return (
        <>
          <path d="M25 55 Q60 30 90 55" />
          <circle cx={94} cy={52} r={5} />
          <path d="M30 55 L30 70" />
          <path d="M85 55 L85 70" />
        </>
      )
    case 'legs-up-wall':
      return (
        <>
          <path d="M20 70 L80 70" />
          <path d="M80 70 L80 20" />
          <path d="M75 70 L75 25" />
          <circle cx={25} cy={65} r={5} />
        </>
      )
    case 'seated-meditation':
    default:
      return (
        <>
          <path d="M40 70 Q60 50 80 70" />
          <path d="M55 55 L55 35" />
          <circle cx={55} cy={28} r={6} />
          <path d="M50 50 L40 60" />
          <path d="M60 50 L70 60" />
        </>
      )
  }
}
