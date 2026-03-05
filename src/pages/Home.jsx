import { Link } from 'react-router-dom'
import './Home.css'

const metaModules = import.meta.glob('../projects/*/meta.json', { eager: true })

const projects = Object.values(metaModules).sort(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
)

function CardPreview({ title }) {
  const letter = title?.[0]?.toUpperCase() ?? '?'
  const hues = [28, 200, 280, 160, 340, 60]
  const hue = hues[title.charCodeAt(0) % hues.length]
  return (
    <div
      className="card-preview"
      style={{ background: `hsl(${hue} 40% 12%)`, borderBottom: `1px solid hsl(${hue} 40% 22%)` }}
    >
      <span className="card-preview-letter" style={{ color: `hsl(${hue} 70% 65%)` }}>
        {letter}
      </span>
    </div>
  )
}

export default function Home() {
  return (
    <div className="home">
      <div className="home-grid-bg" />

      <header className="home-header">
        <div className="home-logo">
          <span className="home-logo-mark">⬡</span>
          <span className="home-logo-name">Skyscanner Make</span>
        </div>
        <div className="home-header-hint">
          <code>/make</code> to generate a new idea
        </div>
      </header>

      <main className="home-main">
        {projects.length === 0 ? (
          <div className="home-empty">
            <div className="home-empty-glyph">✦</div>
            <h1 className="home-empty-heading">
              No ideas yet.<br />
              <em>Start making.</em>
            </h1>
            <p className="home-empty-sub">
              Open Claude in this repo and run <code>/make</code> to prototype
              your first idea using the Backpack design system.
            </p>
            <div className="home-empty-terminal">
              <div className="terminal-dots">
                <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
              </div>
              <div className="terminal-line">
                <span className="prompt">claude&nbsp;</span>
                <span className="cmd">→ /make</span>
              </div>
              <div className="terminal-line">
                <span className="out">  Describe your idea…</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="ideas-header">
              <h2 className="ideas-heading">Ideas</h2>
              <span className="ideas-count">{projects.length}</span>
            </div>
            <div className="ideas-grid">
              {projects.map((p) => (
                <Link key={p.slug} to={`/p/${p.slug}`} className="idea-card">
                  <CardPreview title={p.title} />
                  <div className="idea-card-body">
                    <h3 className="idea-card-title">{p.title}</h3>
                    <p className="idea-card-desc">{p.description}</p>
                    <div className="idea-card-footer">
                      <span className="idea-card-date">
                        {new Date(p.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="idea-card-arrow">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="home-footer">
        <span>skyscanner-make</span>
        <span className="footer-dot" />
        <span>{new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}
