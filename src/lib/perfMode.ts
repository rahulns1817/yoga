// Deliberate performance-regression mode for testing LCP/TBT monitors,
// Lighthouse budgets, and RUM alerting thresholds.
//
// Enable:  visit any URL with ?slow=1  (persists via sessionStorage)
// Disable: visit any URL with ?slow=0
//
// When active, this module intentionally inflates:
//   • LCP  — the hero image on Landing waits ~5.5s before its src is set,
//            so the largest paint element cannot render until then.
//   • FCP  — a synchronous ~700ms CPU block runs at app boot to delay first
//            paint.
//   • TBT  — an additional ~500ms JSON parse of a large blob runs at boot.
//
// Nothing runs unless the flag is on. Off by default.

const FLAG_KEY = 'perf-slow-mode'

function readQueryFlag(): '1' | '0' | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const v = params.get('slow')
  if (v === '1') return '1'
  if (v === '0') return '0'
  return null
}

export function isSlowModeEnabled(): boolean {
  if (typeof window === 'undefined') return false
  const q = readQueryFlag()
  if (q === '1') {
    sessionStorage.setItem(FLAG_KEY, '1')
    return true
  }
  if (q === '0') {
    sessionStorage.removeItem(FLAG_KEY)
    return false
  }
  return sessionStorage.getItem(FLAG_KEY) === '1'
}

// Delay used for the hero image src assignment. Must exceed 4.5s to
// push LCP above the "Poor" Web Vitals threshold.
export const SLOW_HERO_DELAY_MS = 5500

// Called from main.tsx before render. Blocks the main thread for
// ~700ms and then does a heavy synchronous JSON parse to inflate TBT.
export function applyBootPenalty(): void {
  if (!isSlowModeEnabled()) return

  const start = performance.now()
  // Busy-loop for ~700ms — pure CPU block on the main thread.
  // eslint-disable-next-line no-empty
  while (performance.now() - start < 700) {}

  // Parse a large synthetic JSON blob to keep the thread busy a bit more.
  const rows: unknown[] = []
  for (let i = 0; i < 20000; i++) {
    rows.push({ i, text: `padding-${i}`.repeat(6), nested: { a: i * 13, b: i * 17 } })
  }
  const blob = JSON.stringify(rows)
  const parsed = JSON.parse(blob) as unknown[]
  // Prevent tree-shaking / dead-code elimination of the work above.
  ;(window as unknown as { __perfBlob?: unknown }).__perfBlob = parsed.length
}
