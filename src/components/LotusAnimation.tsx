import { motion } from 'framer-motion'

interface Props {
  reduced?: boolean
  variant?: 'light' | 'dark'
}

const PETAL_COUNT = 8
const PETAL_PAIRS = [
  [0, 4],
  [2, 6],
  [1, 5],
  [3, 7],
]

const PALETTE = {
  light: {
    petalFill: '#C97B5A',
    petalStroke: '#7B8F73',
    center: '#7B8F73',
    pulse: 'bg-primary/15',
    pulseInner: 'bg-primary/20',
  },
  dark: {
    petalFill: '#E0A95B',
    petalStroke: '#F7F2EA',
    center: '#F7F2EA',
    pulse: 'bg-saffron/15',
    pulseInner: 'bg-saffron/25',
  },
}

export default function LotusAnimation({ reduced, variant = 'light' }: Props) {
  const p = PALETTE[variant]
  return (
    <div className="relative h-[220px] w-[220px]">
      <motion.span
        aria-hidden
        className={`absolute inset-0 rounded-full ${p.pulse}`}
        animate={reduced ? { opacity: 0.3 } : { scale: [1, 1.18, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={reduced ? { duration: 0 } : { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        aria-hidden
        className={`absolute inset-6 rounded-full ${p.pulseInner}`}
        animate={reduced ? { opacity: 0.4 } : { scale: [1, 1.12, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={reduced ? { duration: 0 } : { duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />
      <svg viewBox="-100 -100 200 200" className="absolute inset-0 h-full w-full">
        {Array.from({ length: PETAL_COUNT }).map((_, i) => {
          const angle = (360 / PETAL_COUNT) * i
          const pairIndex = PETAL_PAIRS.findIndex((pair) => pair.includes(i))
          const delay = reduced ? 0 : 0.2 + pairIndex * 0.18
          return (
            <motion.ellipse
              key={i}
              cx={0}
              cy={-34}
              rx={15}
              ry={40}
              fill={p.petalFill}
              fillOpacity={0.85}
              stroke={p.petalStroke}
              strokeOpacity={0.6}
              strokeWidth={1.2}
              style={{ transformOrigin: '0px 0px' }}
              initial={{ scale: 0, opacity: 0, rotate: angle }}
              animate={{ scale: 1, opacity: 1, rotate: angle }}
              transition={{ duration: reduced ? 0.4 : 0.7, delay, ease: 'easeOut' }}
            />
          )
        })}
        <motion.circle
          cx={0}
          cy={0}
          r={14}
          fill={p.center}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: reduced ? 0.4 : 0.5, delay: reduced ? 0 : 1.0, ease: 'easeOut' }}
        />
      </svg>
    </div>
  )
}
