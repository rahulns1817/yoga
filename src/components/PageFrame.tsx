import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReducedMotion } from '../lib/useReducedMotion'

interface Props {
  title?: string
  showBack?: boolean
  children: ReactNode
}

export default function PageFrame({ title, showBack, children }: Props) {
  const navigate = useNavigate()
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="phone-frame flex flex-col"
    >
      {(title || showBack) && (
        <header className="sticky top-0 z-10 flex items-center gap-2 bg-bg/85 backdrop-blur px-5 py-4 border-b border-border">
          {showBack && (
            <button
              type="button"
              aria-label="Back"
              onClick={() => navigate(-1)}
              className="h-11 w-11 -ml-2 flex items-center justify-center rounded-full hover:bg-border/60 active:scale-95 transition"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-text fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
          {title && <h1 className="font-display text-xl">{title}</h1>}
        </header>
      )}
      <div className="flex-1 px-5 py-6">{children}</div>
    </motion.div>
  )
}
