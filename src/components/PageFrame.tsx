import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReducedMotion } from '../lib/useReducedMotion'

interface Props {
  title?: string
  showBack?: boolean
  variant?: 'default' | 'floating-back' | 'bare'
  children: ReactNode
}

export default function PageFrame({ title, showBack, variant = 'default', children }: Props) {
  const navigate = useNavigate()
  const reduced = useReducedMotion()

  const showHeader = variant === 'default' && (Boolean(title) || Boolean(showBack))
  const showFloatingBack = variant === 'floating-back' && showBack
  const padded = variant === 'default'

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="phone-frame flex flex-col relative"
    >
      {showHeader && (
        <header className="sticky top-0 z-20 flex items-center gap-2 bg-bg/85 backdrop-blur px-5 py-4 border-b border-border">
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

      {showFloatingBack && (
        <button
          type="button"
          aria-label="Back"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-30 h-11 w-11 flex items-center justify-center rounded-full glass-dark text-white hover:scale-105 active:scale-95 transition"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      <div className={padded ? 'flex-1 px-5 py-6' : 'flex-1'}>{children}</div>
    </motion.div>
  )
}
