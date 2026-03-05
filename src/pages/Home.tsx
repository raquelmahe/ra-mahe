import { useState } from 'react'
import { Link } from 'react-router-dom'
import BpkCard from '@skyscanner/backpack-web/bpk-component-card'
import BpkPanel from '@skyscanner/backpack-web/bpk-component-panel'
import './Home.scss'

interface ProjectMeta {
  slug: string
  title: string
  description: string
  createdAt: string
}

const metaModules = import.meta.glob<ProjectMeta>('../projects/*/meta.json', { eager: true })

const projects = Object.values(metaModules).sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
)

interface CardThumbProps {
  slug: string
  title: string
}

function CardThumb({ slug, title }: CardThumbProps) {
  const [imgFailed, setImgFailed] = useState(false)
  const hues = [210, 220, 230, 200, 215, 225]
  const hue = hues[title.charCodeAt(0) % hues.length]
  const letter = title?.[0]?.toUpperCase() ?? '?'

  if (!imgFailed) {
    return (
      <div className="card-thumb">
        <img
          src={`/thumbs/${slug}.png`}
          alt={title}
          className="card-thumb-img"
          onError={() => setImgFailed(true)}
        />
      </div>
    )
  }

  return (
    <div
      className="card-thumb"
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 70% 20%) 0%, hsl(${hue} 60% 35%) 100%)`,
      }}
    >
      <span className="card-thumb-letter">{letter}</span>
    </div>
  )
}

function InstructionsPanel() {
  return (
    <BpkPanel padded={false} className="instructions-panel">
      <div className="instructions-header">
        <span className="instructions-icon">✦</span>
        <span className="instructions-label">Add a new idea</span>
      </div>

      <p className="instructions-body">
        Open Claude in this repo and run <code>/make</code>. Describe
        your idea in plain English — Claude will discover the right
        Backpack components, generate a self-contained prototype, and
        add it to this gallery automatically.
      </p>

      <div className="instructions-terminal">
        <div className="terminal-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="terminal-line">
          <span className="t-prompt">claude&nbsp;</span>
          <span className="t-cmd">/make</span>
        </div>
        <div className="terminal-line">
          <span className="t-out">  Describe your idea…</span>
        </div>
        <div className="terminal-line">
          <span className="t-muted">  e.g. "A hotel search results</span>
        </div>
        <div className="terminal-line">
          <span className="t-muted">  page with filters and map"</span>
        </div>
      </div>

      <div className="instructions-tips">
        <p className="tips-heading">Tips for great results</p>
        <ul className="tips-list">
          <li>Name the screen type <em>(homepage, results, checkout)</em></li>
          <li>Mention the vertical <em>(flights, hotels, cars)</em></li>
          <li>Describe the key interactions you want to show</li>
        </ul>
      </div>
    </BpkPanel>
  )
}

export default function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <div className="home-logo">
          <div className="home-logo-mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" fill="currentColor" />
            </svg>
          </div>
          <span className="home-logo-name">Skyscanner Make</span>
        </div>
        <div className="home-header-badge">
          <span className="badge-dot" />
          internal prototyping tool
        </div>
      </header>

      <main className="home-main">
        {projects.length === 0 ? (
          <div className="home-empty">
            <div className="empty-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" fill="currentColor" />
              </svg>
            </div>
            <h1 className="empty-heading">
              No prototypes yet.<br />
              <em>Start making.</em>
            </h1>
            <p className="empty-sub">
              Open Claude in this repo and run <code>/make</code> to build
              your first Backpack-powered prototype.
            </p>
            <div className="empty-terminal">
              <div className="terminal-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="terminal-line">
                <span className="t-prompt">claude&nbsp;</span>
                <span className="t-cmd">/make</span>
              </div>
              <div className="terminal-line">
                <span className="t-out">  Describe your idea…</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="ideas-layout">
            <div className="ideas-col">
              <div className="ideas-header">
                <h2 className="ideas-heading">Prototypes</h2>
                <span className="ideas-count">{projects.length}</span>
              </div>

              <div className="ideas-grid">
                {projects.map((p) => (
                  <Link key={p.slug} to={`/p/${p.slug}`} className="idea-card-link">
                    <BpkCard padded={false} atomic={false} className="idea-card">
                      <CardThumb slug={p.slug} title={p.title} />
                      <div className="idea-card-body">
                        <h3 className="idea-title">{p.title}</h3>
                        <p className="idea-desc">{p.description}</p>
                        <div className="idea-footer">
                          <span className="idea-date">
                            {new Date(p.createdAt).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                          <span className="idea-arrow">→</span>
                        </div>
                      </div>
                    </BpkCard>
                  </Link>
                ))}
              </div>
            </div>

            <InstructionsPanel />
          </div>
        )}
      </main>

      <footer className="home-footer">
        <span className="footer-logo">Skyscanner Make</span>
        <span className="footer-divider" />
        <span>Internal design prototyping</span>
        <span className="footer-end">{new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}
