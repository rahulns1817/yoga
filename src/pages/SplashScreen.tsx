import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LotusAnimation from '../components/LotusAnimation'
import { useReducedMotion } from '../lib/useReducedMotion'

const SPLASH_FLAG = 'splash-seen'

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
    }, reduced ? 1400 : 2600)
    return () => clearTimeout(t)
  }, [navigate, reduced])

  const skip = () => {
    sessionStorage.setItem(SPLASH_FLAG, '1')
    navigate('/home', { replace: true })
  }

  return (
    <div className="phone-frame relative flex flex-col items-center justify-center text-center px-6 py-12 min-h-screen">
      <LotusAnimation reduced={reduced} />
      <motion.p
        className="font-mantra italic text-2xl text-text mt-10 leading-snug"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: reduced ? 0.4 : 1.6, ease: 'easeOut' }}
      >
        Loga Samastha Sukhino Bhavanthu
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
