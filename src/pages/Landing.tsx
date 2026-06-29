import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import CategoryCard from '../components/CategoryCard'
import PageFrame from '../components/PageFrame'
import SearchBar from '../components/SearchBar'
import { filterProblems } from '../lib/lookups'
import { useReducedMotion } from '../lib/useReducedMotion'

export default function Landing() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const reduced = useReducedMotion()

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 150)
    return () => clearTimeout(t)
  }, [query])

  const results = useMemo(() => filterProblems(debouncedQuery), [debouncedQuery])

  return (
    <PageFrame>
      <header className="mb-6">
        <h1 className="font-display text-4xl">Sukha</h1>
        <p className="text-text-muted mt-1">Find a posture for how you feel.</p>
      </header>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search a feeling — stress, sleep, headache…"
      />

      <section className="mt-6">
        {results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted">No matches.</p>
            <p className="text-text-muted text-sm mt-1">Try "stress", "sleep", or "back pain".</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 gap-3">
            <AnimatePresence mode="popLayout">
              {results.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                >
                  <CategoryCard problem={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </PageFrame>
  )
}
