import { motion } from 'framer-motion'

interface Props {
  reduced?: boolean
}

const PETAL_COUNT = 8
const PETAL_PAIRS = [
  [0, 4],
  [2, 6],
  [1, 5],
  [3, 7],
]

export default function LotusAnimation({ reduced }: Props) {
  return (
    <div className="relative h-[200px] w-[200px]">
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full bg-primary/15"
        animate={reduced ? { opacity: 0.3 } : { scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={reduced ? { duration: 0 } : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        aria-hidden
        className="absolute inset-6 rounded-full bg-primary/20"
        animate={reduced ? { opacity: 0.4 } : { scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={reduced ? { duration: 0 } : { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
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
              cy={-32}
              rx={14}
              ry={36}
              fill="#C97B5A"
              fillOpacity={0.75}
              stroke="#7B8F73"
              strokeWidth={1.5}
              style={{ transformOrigin: '0px 0px' }}
              initial={{ scale: 0, opacity: 0, rotate: angle }}
              animate={{ scale: 1, opacity: 1, rotate: angle }}
              transition={{ duration: reduced ? 0.4 : 0.6, delay, ease: 'easeOut' }}
            />
          )
        })}
        <motion.circle
          cx={0}
          cy={0}
          r={14}
          fill="#7B8F73"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: reduced ? 0.4 : 0.5, delay: reduced ? 0 : 1.0, ease: 'easeOut' }}
        />
      </svg>
    </div>
  )
}
