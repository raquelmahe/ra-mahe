import { Component, type ReactNode } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { BpkProvider } from '@skyscanner/backpack-web/bpk-component-layout'
import Home from './pages/Home'
import ProjectView from './pages/ProjectView'

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null }
  static getDerivedStateFromError(error: Error) { return { error } }
  render() {
    if (this.state.error) {
      return <pre style={{ padding: 24, color: 'red', whiteSpace: 'pre-wrap' }}>{String(this.state.error)}</pre>
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <BpkProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/p/:slug" element={<ProjectView />} />
          </Routes>
        </HashRouter>
      </BpkProvider>
    </ErrorBoundary>
  )
}
