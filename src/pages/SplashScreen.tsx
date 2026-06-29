import { motion } from 'framer-motion'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import LotusAnimation from '../components/LotusAnimation'
import { useReducedMotion } from '../lib/useReducedMotion'

const SPLASH_FLAG = 'splash-seen'
const PARTICLE_COUNT = 14

export default function SplashScreen() {
  const navigate = useNavigate()
  const reduced = useReducedMotion()

  useEffect(() => {
    if (sessionStorage.getItem(SPLASH_FLAG)) {
      navigate('/home', { replace: true })
      return
    }
    const t = setTimeout(() => {
      sessionStorage.setItem(SPLASH_FLAG, '1')
      navigate('/home', { replace: true })
    }, reduced ? 1400 : 2800)
    return () => clearTimeout(t)
  }, [navigate, reduced])

  const skip = () => {
    sessionStorage.setItem(SPLASH_FLAG, '1')
    navigate('/home', { replace: true })
  }

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
      id: i,
      x: ((i * 53) % 100),
      y: ((i * 91) % 100),
      size: ((i * 17) % 5) + 2,
      delay: (i * 0.17) % 3,
      duration: 5 + ((i * 7) % 4),
    }))
  }, [])

  return (
    <div
      className="phone-frame relative flex flex-col items-center justify-center text-center px-6 py-12 min-h-screen text-white overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(120% 80% at 50% 0%, #2B4435 0%, #1F3329 45%, #142019 100%)',
      }}
    >
      <div className="absolute inset-0 grain opacity-50 pointer-events-none" aria-hidden />

      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-saffron"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              filter: 'blur(1px)',
            }}
            initial={{ opacity: 0 }}
            animate={
              reduced
                ? { opacity: 0.3 }
                : { opacity: [0, 0.7, 0], y: [0, -16, -32], scale: [0.5, 1, 0.5] }
            }
            transition={
              reduced
                ? { duration: 0 }
                : { duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }
            }
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-saffron/80 text-[10px] uppercase tracking-[0.4em] mb-10 font-medium"
      >
        ॐ · Sukha · Wellness
      </motion.div>

      <LotusAnimation reduced={reduced} variant="dark" />

      <motion.p
        className="font-mantra italic text-3xl text-white/95 mt-12 leading-snug max-w-[18ch]"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: reduced ? 0.4 : 1.6, ease: 'easeOut' }}
      >
        Loga Samastha Sukhino Bhavanthu
      </motion.p>

      <motion.p
        className="text-white/55 text-xs mt-4 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: reduced ? 0.6 : 2.0 }}
      >
        May all beings, everywhere, be happy and free.
      </motion.p>

      <button
        type="button"
        onClick={skip}
        aria-label="Skip splash"
        className="absolute inset-0 cursor-default focus:outline-none"
      />
    </div>
  )
}
