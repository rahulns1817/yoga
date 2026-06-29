import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import AsanaDetail from './pages/AsanaDetail'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'
import ProblemDetail from './pages/ProblemDetail'
import SplashScreen from './pages/SplashScreen'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/problem/:problemId" element={<ProblemDetail />} />
        <Route path="/asana/:problemId/:asanaId" element={<AsanaDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
