export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type Category =
  | 'mental'
  | 'digestive'
  | 'musculoskeletal'
  | 'sleep'
  | 'energy'

export type IllustrationKey =
  | 'child'
  | 'forward-fold'
  | 'seated-twist'
  | 'reclining-bound'
  | 'cat-cow'
  | 'legs-up-wall'
  | 'seated-meditation'

export interface Asana {
  id: string
  sanskritName: string
  englishName: string
  durationSec: number
  difficulty: Difficulty
  illustration: IllustrationKey
  steps: string[]
  benefits: string[]
}

export interface Problem {
  id: string
  name: string
  shortDescription: string
  icon: string
  category: Category
  keywords: string[]
  asanas: Asana[]
}
