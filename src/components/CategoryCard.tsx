import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { photoForCategory } from '../lib/images'
import { useReducedMotion } from '../lib/useReducedMotion'
import type { Problem } from '../types'

interface Props {
  problem: Problem
}

export default function CategoryCard({ problem }: Props) {
  const reduced = useReducedMotion()
  const photo = photoForCategory(problem.category)

  return (
    <motion.div whileTap={reduced ? undefined : { scale: 0.97 }} className="h-full">
      <Link
        to={`/problem/${problem.id}`}
        className="group relative block h-full aspect-[4/5] rounded-card overflow-hidden shadow-soft hover:shadow-lift transition-shadow"
      >
        <img
          src={photo}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: 'center 25%' }}
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" aria-hidden />
        <div className="absolute top-3 left-3 h-9 w-9 rounded-full glass-dark border border-white/15 flex items-center justify-center text-base">
          <span aria-hidden>{problem.icon}</span>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-20 text-white"
          style={{
            background:
              'linear-gradient(to top, rgba(20,32,25,0.96) 0%, rgba(20,32,25,0.88) 40%, rgba(20,32,25,0.55) 75%, transparent 100%)',
          }}
        >
          <h2 className="font-display text-xl leading-tight drop-shadow-sm">{problem.name}</h2>
          <p className="text-white/85 text-xs mt-1 line-clamp-2 leading-snug">{problem.shortDescription}</p>
        </div>
      </Link>
    </motion.div>
  )
}
