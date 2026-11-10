import type { ScoredExpectation } from '../types'

const COLORS: Record<string, string> = {
  'QUICK WINS': '#0e5c4c',
  'MAJOR PROJECTS': '#8a6a2a',
  'BACK LOG FILLER WORK': '#3d4a52',
  PARK: '#9c3b2c',
}

export function MatrixPlot({ items }: { items: ScoredExpectation[] }) {
  const w = 420
  const h = 420
  const padL = 44
  const padB = 40
  const padT = 16
  const padR = 16
  const plotW = w - padL - padR
  const plotH = h - padT - padB
  const x = (effort: number) => padL + (effort / 9) * plotW
  const y = (value: number) => padT + (1 - value / 9) * plotH
  const midX = x(4.5)
  const midY = y(4.5)

  return (
    <div className="matrix-wrap">
      <svg
        className="matrix"
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-label="Business value versus implementation effort, 0 to 9, with four quadrants"
      >
        <rect x={padL} y={padT} width={plotW / 2} height={plotH / 2} fill="#0e5c4c" opacity="0.12" />
        <rect x={midX} y={padT} width={plotW / 2} height={plotH / 2} fill="#8a6a2a" opacity="0.12" />
        <rect x={padL} y={midY} width={plotW / 2} height={plotH / 2} fill="#cfc6b4" opacity="0.35" />
        <rect x={midX} y={midY} width={plotW / 2} height={plotH / 2} fill="#9c3b2c" opacity="0.12" />
        <text x={padL + 8} y={padT + 18} fontSize="11" fill="#0a4338" fontFamily="IBM Plex Sans, sans-serif">
          QUICK WINS
        </text>
        <text x={midX + 8} y={padT + 18} fontSize="11" fill="#8a6a2a" fontFamily="IBM Plex Sans, sans-serif">
          MAJOR PROJECTS
        </text>
        <text x={padL + 8} y={h - padB - 12} fontSize="11" fill="#3d4a52" fontFamily="IBM Plex Sans, sans-serif">
          BACK LOG FILLER
        </text>
        <text x={midX + 8} y={h - padB - 12} fontSize="11" fill="#9c3b2c" fontFamily="IBM Plex Sans, sans-serif">
          PARK
        </text>
        <line x1={midX} y1={padT} x2={midX} y2={padT + plotH} stroke="#1b2429" strokeWidth="1" />
        <line x1={padL} y1={midY} x2={padL + plotW} y2={midY} stroke="#1b2429" strokeWidth="1" />
        <rect x={padL} y={padT} width={plotW} height={plotH} fill="none" stroke="#1b2429" strokeWidth="1.5" />
        {items.map((item, i) => {
          const cx = x(item.effortAdj)
          const cy = y(item.valueAdj)
          return (
            <g key={item.expectation.id}>
              <circle cx={cx} cy={cy} r="8" fill={COLORS[item.quadrant]} />
              <text
                x={cx}
                y={cy + 3.5}
                textAnchor="middle"
                fontSize="10"
                fill="#fffdf8"
                fontFamily="IBM Plex Mono, monospace"
              >
                {i + 1}
              </text>
            </g>
          )
        })}
        <text
          x={padL + plotW / 2}
          y={h - 10}
          textAnchor="middle"
          fontSize="12"
          fill="#1b2429"
          fontFamily="IBM Plex Sans, sans-serif"
        >
          Implementation Effort (0–9)
        </text>
        <text
          x={16}
          y={padT + plotH / 2}
          textAnchor="middle"
          fontSize="12"
          fill="#1b2429"
          fontFamily="IBM Plex Sans, sans-serif"
          transform={`rotate(-90 16 ${padT + plotH / 2})`}
        >
          Business Value (0–9)
        </text>
      </svg>
    </div>
  )
}
