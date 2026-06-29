import { describe, expect, it } from 'vitest'
import { PROBLEMS } from './problems'
import { filterProblems, getAsana, getProblem } from '../lib/lookups'

describe('PROBLEMS dataset', () => {
  it('contains exactly 10 problems', () => {
    expect(PROBLEMS).toHaveLength(10)
  })

  it('each problem has 3 to 5 asanas', () => {
    for (const p of PROBLEMS) {
      expect(p.asanas.length).toBeGreaterThanOrEqual(3)
      expect(p.asanas.length).toBeLessThanOrEqual(5)
    }
  })

  it('problem ids are unique', () => {
    const ids = PROBLEMS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('asana ids are unique within each problem', () => {
    for (const p of PROBLEMS) {
      const ids = p.asanas.map((a) => a.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('every asana has 4 to 6 steps and 2 to 3 benefits', () => {
    for (const p of PROBLEMS) {
      for (const a of p.asanas) {
        expect(a.steps.length).toBeGreaterThanOrEqual(4)
        expect(a.steps.length).toBeLessThanOrEqual(6)
        expect(a.benefits.length).toBeGreaterThanOrEqual(2)
        expect(a.benefits.length).toBeLessThanOrEqual(3)
      }
    }
  })
})

describe('getProblem', () => {
  it('returns a problem by id', () => {
    expect(getProblem('stress')?.name).toBe('Stress')
  })

  it('returns undefined for unknown id', () => {
    expect(getProblem('does-not-exist')).toBeUndefined()
  })
})

describe('getAsana', () => {
  it('returns an asana when problemId and asanaId both exist', () => {
    const stress = getProblem('stress')!
    const firstId = stress.asanas[0].id
    expect(getAsana('stress', firstId)?.id).toBe(firstId)
  })

  it('returns undefined for unknown problemId', () => {
    expect(getAsana('nope', 'whatever')).toBeUndefined()
  })

  it('returns undefined for unknown asanaId', () => {
    expect(getAsana('stress', 'not-a-real-asana')).toBeUndefined()
  })
})

describe('filterProblems', () => {
  it('returns all problems for an empty query', () => {
    expect(filterProblems('')).toHaveLength(10)
  })

  it('matches a problem name case-insensitively', () => {
    const results = filterProblems('STRESS')
    expect(results.some((p) => p.id === 'stress')).toBe(true)
  })

  it('matches via keywords', () => {
    const results = filterProblems('overwhelmed')
    expect(results.some((p) => p.id === 'stress')).toBe(true)
  })

  it('returns empty array when nothing matches', () => {
    expect(filterProblems('zxqwerty')).toEqual([])
  })
})
