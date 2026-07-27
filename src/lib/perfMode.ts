// Deliberate performance-regression mode for testing LCP/FCP/TBT/CLS/INP
// monitors, Lighthouse budgets, and RUM alerting thresholds.
//
// Enable:  visit any URL with ?slow=1  (persists via sessionStorage)
// Disable: visit any URL with ?slow=0
//
// When active, this module intentionally inflates every Core Web Vital:
//   • LCP + FCP — React mount is deferred ~5s, so no contentful element
//     (image, heading, card) can paint before then. Both metrics land
//     well above the "Poor" thresholds.
//   • TBT       — synchronous ~800ms CPU block + heavy JSON parse before
//                 render. Total Blocking Time balloons.
//   • CLS       — a delayed banner is injected after mount and later
//                 removed, forcing two layout shifts of the content
//                 below. Cumulative Layout Shift > 0.25.
//   • INP       — global click and keypress handlers run ~400ms of
//                 synchronous work on every interaction. First Input
//                 Delay + Interaction to Next Paint both spike.
//   • Bundle    — a large inline padding string is anchored to window
//                 so tree-shaking can't drop it, inflating JS transfer
//                 size and parse time.
//   • Scroll    — a scroll listener does ~50ms of synchronous work per
//                 scroll event, adding jank and Long Tasks.
//
// Nothing runs unless the flag is on. Off by default.

const FLAG_KEY = 'perf-slow-mode'

// How long we hold the DOM empty before mounting React. Must exceed 4.5s
// so LCP consistently lands in the "Poor" bucket even on fast machines.
export const SLOW_MOUNT_DELAY_MS = 5000

// Deprecated: kept for API compatibility with the earlier hero-only delay.
// The mount delay above now handles LCP for us.
export const SLOW_HERO_DELAY_MS = 0

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

// -------- Boot-time penalties (TBT / bundle) --------

// A 200 KB padding string anchored to window so bundlers can't drop it.
// Inflates JS transfer + parse. Only referenced in slow mode, but Vite
// still ships it in the bundle; that's the point.
const BLOAT = 'sukha-perf-bloat-padding-'.repeat(8000)

export function applyBootPenalty(): void {
  if (!isSlowModeEnabled()) return

  // 1. Anchor the bloat string so tree-shaking preserves it.
  ;(window as unknown as { __perfBloat?: string }).__perfBloat = BLOAT

  // 2. Synchronous CPU block — pure busy-loop on the main thread.
  const start = performance.now()
  // eslint-disable-next-line no-empty
  while (performance.now() - start < 800) {}

  // 3. Heavy JSON parse to keep the thread busy after the block.
  const rows: unknown[] = []
  for (let i = 0; i < 30000; i++) {
    rows.push({
      i,
      text: `padding-${i}-${BLOAT.substring(0, 40)}`.repeat(3),
      nested: { a: i * 13, b: i * 17, c: [i, i + 1, i + 2, i + 3] },
    })
  }
  const blob = JSON.stringify(rows)
  const parsed = JSON.parse(blob) as unknown[]
  ;(window as unknown as { __perfBlob?: number }).__perfBlob = parsed.length

  // 4. Forced synchronous layout reads in a tight loop (layout thrashing).
  const scratch = document.createElement('div')
  scratch.style.cssText = 'position:absolute;left:-9999px;top:-9999px;'
  document.body.appendChild(scratch)
  for (let i = 0; i < 200; i++) {
    scratch.style.width = `${(i % 100) + 100}px`
    // reading offsetHeight forces reflow
    void scratch.offsetHeight
  }
  document.body.removeChild(scratch)
}

// -------- Post-mount penalties (CLS / INP / scroll) --------

// Attach global slow interaction handlers + a delayed layout-shift banner.
// Call once from Landing (or any top-level page component) after mount.
export function installRuntimePenalties(): void {
  if (!isSlowModeEnabled()) return
  installSlowInteractions()
  installLayoutShifter()
  installScrollJank()
}

function busyWait(ms: number): void {
  const start = performance.now()
  // eslint-disable-next-line no-empty
  while (performance.now() - start < ms) {}
}

const INSTALLED_KEY = '__perfHandlersInstalled'

function installSlowInteractions(): void {
  const w = window as unknown as Record<string, unknown>
  if (w[INSTALLED_KEY]) return
  w[INSTALLED_KEY] = true

  // 400ms of synchronous work on every click / keypress destroys INP.
  const jank = () => busyWait(400)
  window.addEventListener('click', jank, { capture: true })
  window.addEventListener('keydown', jank, { capture: true })
}

function installLayoutShifter(): void {
  // Insert a big banner ~800ms after mount that pushes all content down
  // by ~140px, then remove it ~1.4s later. Two layout shifts → CLS spike.
  setTimeout(() => {
    const shifter = document.createElement('div')
    shifter.id = '__perf-shifter'
    shifter.style.cssText =
      'height:140px;width:100%;background:linear-gradient(90deg,#C97B5A,#E0A95B);color:#142019;display:flex;align-items:center;justify-content:center;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;font-size:11px;'
    shifter.textContent = 'Perf test banner — inducing layout shift'
    document.body.insertBefore(shifter, document.body.firstChild)

    setTimeout(() => {
      const el = document.getElementById('__perf-shifter')
      if (el) el.remove()
    }, 1400)
  }, 800)

  // Also nudge the root font-size slightly a moment later — cheap way to
  // cause a full-page reflow and CLS contribution.
  setTimeout(() => {
    document.documentElement.style.fontSize = '17px'
    setTimeout(() => {
      document.documentElement.style.fontSize = ''
    }, 900)
  }, 2600)
}

function installScrollJank(): void {
  // 50ms synchronous work per scroll event → Long Task on every scroll.
  const onScroll = () => busyWait(50)
  window.addEventListener('scroll', onScroll, { passive: true })
}
