import { useState } from 'react'
import { Link } from 'react-router-dom'
import BpkCard from '@skyscanner/backpack-web/bpk-component-card'
import BpkPanel from '@skyscanner/backpack-web/bpk-component-panel'
import BpkText, { TEXT_COLORS, TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text'
import './Home.scss'
import { BpkSpacing, BpkVStack } from '@skyscanner/backpack-web/bpk-component-layout'
import Terminal, { type TerminalLine } from '../components/Terminal'

const TERMINAL_LINES_SHORT: TerminalLine[] = [
  { type: 'prompt', text: 'claude', command: '/make' },
  { type: 'output', text: 'Describe your idea…' },
]

const TERMINAL_LINES_FULL: TerminalLine[] = [
  ...TERMINAL_LINES_SHORT,
  { type: 'muted', text: 'e.g. "A hotel search results' },
  { type: 'muted', text: 'page with filters and map"' },
]

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
      <BpkText tagName="span" textStyle={TEXT_STYLES.label1}>{letter}</BpkText>
    </div>
  )
}

function InstructionsPanel() {
  return (
    <BpkPanel padded={false} className="instructions-panel">
      <div className="instructions-header">
        <span className="instructions-icon">✦</span>
        <BpkText tagName="span" textStyle={TEXT_STYLES.label1} color={TEXT_COLORS.textOnDark}>Add a new idea</BpkText>
      </div>

      <BpkVStack padding={BpkSpacing.Base}>
        <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault}>
        Open Claude in this repo and run <code>/make</code>. Describe
        your idea in plain English — Claude will discover the right
        Backpack components, generate a self-contained prototype, and
        add it to this gallery automatically.
        </BpkText>
        
        <Terminal lines={TERMINAL_LINES_FULL} />
      </BpkVStack>
      
      <div className="instructions-tips">
        <BpkText tagName="p" textStyle={TEXT_STYLES.label2}>Tips for great results</BpkText>
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
          <BpkText tagName="span" textStyle={TEXT_STYLES.heading5} color="text-on-dark">Skyscanner Make</BpkText>
        </div>
        <div className="home-header-badge">
          <span className="badge-dot" />
          <BpkText tagName="span" textStyle={TEXT_STYLES.caption}>internal prototyping tool</BpkText>
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
            
            <BpkText tagName="h1" textStyle={TEXT_STYLES.heading1}>
              No prototypes yet.<br />
              <BpkText tagName="span" textStyle={TEXT_STYLES.heading1} color="text-hero">
                Start making.
              </BpkText>
            </BpkText>
            <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault}>
              Open Claude in this repo and run <code>/make</code> to build
              your first Backpack-powered prototype.
            </BpkText>
            <Terminal lines={TERMINAL_LINES_SHORT} />
          </div>
        ) : (
          <div className="ideas-layout">
            <div className="ideas-col">
              <div className="ideas-header">
                <BpkText tagName="h2" textStyle={TEXT_STYLES.heading3}>Prototypes</BpkText>
                <BpkText tagName="span" textStyle={TEXT_STYLES.caption}>{projects.length}</BpkText>
              </div>

              <div className="ideas-grid">
                {projects.map((p) => (
                  <Link key={p.slug} to={`/p/${p.slug}`} className="idea-card-link">
                    <BpkCard padded={false} atomic={false} className="idea-card">
                      <CardThumb slug={p.slug} title={p.title} />
                      <div className="idea-card-body">
                        <BpkText tagName="h3" textStyle={TEXT_STYLES.heading5}>{p.title}</BpkText>
                        <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault}>{p.description}</BpkText>
                        <div className="idea-footer">
                          <BpkText tagName="span" textStyle={TEXT_STYLES.caption}>
                            {new Date(p.createdAt).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </BpkText>
                          <BpkText tagName="span" textStyle={TEXT_STYLES.caption}>→</BpkText>
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
        <BpkText tagName="span" textStyle={TEXT_STYLES.label2}>Skyscanner Make</BpkText>
        <span className="footer-divider" />
        <BpkText tagName="span" textStyle={TEXT_STYLES.caption}>Internal design prototyping</BpkText>
        <BpkText tagName="span" textStyle={TEXT_STYLES.caption}>{new Date().getFullYear()}</BpkText>
      </footer>
    </div>
  )
}
