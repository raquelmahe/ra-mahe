import './Terminal.scss'

export interface TerminalLine {
  type: 'prompt' | 'output' | 'muted'
  text: string
  command?: string
}

export default function Terminal({ lines }: { lines: TerminalLine[] }) {
  return (
    <div className="terminal">
      <div className="terminal-dots">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
      </div>
      {lines.map((line, i) => (
        <div key={i} className="terminal-line">
          {line.type === 'prompt' && (
            <>
              <span className="t-prompt">{line.text}&nbsp;</span>
              {line.command && <span className="t-cmd">{line.command}</span>}
            </>
          )}
          {line.type === 'output' && <span className="t-out">  {line.text}</span>}
          {line.type === 'muted' && <span className="t-muted">  {line.text}</span>}
        </div>
      ))}
    </div>
  )
}
