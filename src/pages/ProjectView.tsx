import { Suspense, lazy, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import './ProjectView.scss'

interface ProjectMeta {
  slug: string
  title: string
  description: string
  createdAt: string
}

const projectModules = import.meta.glob<{ default: React.ComponentType }>('../projects/*/index.tsx')
const metaModules = import.meta.glob<ProjectMeta>('../projects/*/meta.json', { eager: true })

export default function ProjectView() {
  const { slug } = useParams()

  const moduleKey = `../projects/${slug}/index.tsx`
  const metaKey = `../projects/${slug}/meta.json`

  const meta = metaModules[metaKey]
  const loader = projectModules[moduleKey]

  const Component = useMemo(
    () => (loader ? lazy(loader) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [moduleKey]
  )

  if (!Component) {
    return (
      <div className="pv-not-found">
        <Link to="/" className="pv-back">← Ideas</Link>
        <p>No project found for <code>{slug}</code>.</p>
      </div>
    )
  }

  return (
    <div className="pv-shell">
      <nav className="pv-nav">
        <Link to="/" className="pv-back">← Ideas</Link>
        {meta && <span className="pv-nav-title">{meta.title}</span>}
        {meta && (
          <span className="pv-nav-slug">
            /p/{meta.slug}
          </span>
        )}
      </nav>
      <div className="pv-content">
        <Suspense fallback={<div className="pv-loading">Loading…</div>}>
          <Component />
        </Suspense>
      </div>
    </div>
  )
}
