import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { applyBootPenalty, isSlowModeEnabled, SLOW_MOUNT_DELAY_MS } from './lib/perfMode'
import './styles/index.css'

applyBootPenalty()

function boot() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

if (isSlowModeEnabled()) {
  // Defer the entire app mount so no contentful element can paint before
  // the deadline. LCP + FCP both land in the "Poor" bucket.
  setTimeout(boot, SLOW_MOUNT_DELAY_MS)
} else {
  boot()
}
