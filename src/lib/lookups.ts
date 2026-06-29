import { PROBLEMS } from '../data/problems'
import type { Asana, Problem } from '../types'

export function getProblem(id: string): Problem | undefined {
  return PROBLEMS.find((p) => p.id === id)
}

export function getAsana(problemId: string, asanaId: string): Asana | undefined {
  return getProblem(problemId)?.asanas.find((a) => a.id === asanaId)
}

export function filterProblems(query: string): Problem[] {
  const q = query.trim().toLowerCase()
  if (!q) return PROBLEMS
  return PROBLEMS.filter((p) => {
    if (p.name.toLowerCase().includes(q)) return true
    return p.keywords.some((k) => k.toLowerCase().includes(q))
  })
}
