import type { Category, IllustrationKey } from '../types'

import vajrasana from '../images/26bc8a5a-888d-4381-8e94-8f1fd39189db.jpg'
import tadasana from '../images/35c720e4-294b-4892-8e7c-902a66d14c5a.jpg'
import downwardDog from '../images/2b3cb3c4-2d9a-44f9-9092-97a30b99390b.jpg'
import plank from '../images/3faf7dba-ef8a-46fc-b4d0-ff035ca2441e.jpg'
import sukhasana from '../images/4c96a1e4-c2b0-4a58-bf08-1786aa644001.jpg'
import standingBackbend from '../images/382d7349-1152-452d-873f-500dbfdbdbb1.jpg'
import outdoorForwardFold from '../images/345d3cd1-5177-41e5-8ec0-683413657add.jpg'
import outdoorHeadstand from '../images/7284985e-407c-4254-bb2f-cd84de5dfaa9.jpg'
import stageHeadstand from '../images/2afae3c2-92b5-48c3-b0d2-6bc64b1ef7c8.jpg'

const extraStudioModules = import.meta.glob<{ default: string }>(
  '../images/*.jpg',
  { eager: true },
)
export const ALL_PHOTOS: string[] = Object.values(extraStudioModules).map((m) => m.default)

export const PHOTO = {
  vajrasana,
  tadasana,
  downwardDog,
  plank,
  sukhasana,
  standingBackbend,
  outdoorForwardFold,
  outdoorHeadstand,
  stageHeadstand,
}

const ILLUSTRATION_TO_PHOTO: Record<IllustrationKey, string> = {
  child: vajrasana,
  'forward-fold': outdoorForwardFold,
  'seated-twist': sukhasana,
  'reclining-bound': vajrasana,
  'cat-cow': plank,
  'legs-up-wall': downwardDog,
  'seated-meditation': sukhasana,
}

const CATEGORY_TO_PHOTO: Record<Category, string> = {
  mental: vajrasana,
  digestive: sukhasana,
  musculoskeletal: downwardDog,
  sleep: vajrasana,
  energy: standingBackbend,
}

export function photoForIllustration(key: IllustrationKey, fallbackIndex = 0): string {
  return ILLUSTRATION_TO_PHOTO[key] ?? ALL_PHOTOS[fallbackIndex % ALL_PHOTOS.length]
}

export function photoForCategory(category: Category): string {
  return CATEGORY_TO_PHOTO[category]
}

export function photoForAsana(asanaId: string, illustration: IllustrationKey): string {
  let hash = 0
  for (let i = 0; i < asanaId.length; i++) hash = (hash * 31 + asanaId.charCodeAt(i)) >>> 0
  if (ILLUSTRATION_TO_PHOTO[illustration]) return ILLUSTRATION_TO_PHOTO[illustration]
  return ALL_PHOTOS[hash % ALL_PHOTOS.length]
}

export const HERO_PHOTOS = [outdoorForwardFold, outdoorHeadstand, stageHeadstand]
export const INSPIRATION_PHOTO = stageHeadstand
export const POSE_OF_DAY_PHOTO = standingBackbend
