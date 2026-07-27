import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { applyBootPenalty } from './lib/perfMode'
import './styles/index.css'

applyBootPenalty()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
