import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BpkProvider } from '@skyscanner/backpack-web/bpk-component-layout'
import Home from './pages/Home'
import ProjectView from './pages/ProjectView'

export default function App() {
  return (
    <BpkProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/p/:slug" element={<ProjectView />} />
        </Routes>
      </BrowserRouter>
    </BpkProvider>
  )
}
