import { NET_WORTH_HISTORY, formatCurrency } from '../data/financialMetrics'

interface NetWorthChartProps {
  currentValue: number
  projectedValue: number
}

export function NetWorthChart({ currentValue, projectedValue }: NetWorthChartProps) {
  const history = [...NET_WORTH_HISTORY.slice(0, -1), { date: 'Jun 2026', value: currentValue }]
  const projectedPoint = { date: 'Dec 2026', value: projectedValue }

  const allPoints = [...history, projectedPoint]
  const values = allPoints.map((p) => p.value)
  const min = Math.min(...values) * 0.95
  const max = Math.max(...values) * 1.02

  const width = 560
  const height = 180
  const padX = 8
  const padY = 16
  const chartW = width - padX * 2
  const chartH = height - padY * 2

  const toX = (i: number) => padX + (i / (allPoints.length - 1)) * chartW
  const toY = (v: number) => padY + chartH - ((v - min) / (max - min)) * chartH

  const actualLine = history
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(p.value)}`)
    .join(' ')

  const projectedLine = `M ${toX(history.length - 1)} ${toY(currentValue)} L ${toX(allPoints.length - 1)} ${toY(projectedValue)}`

  const growth = currentValue - NET_WORTH_HISTORY[0].value
  const growthPct = ((growth / NET_WORTH_HISTORY[0].value) * 100).toFixed(1)

  return (
    <div>
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-2xl font-semibold text-jump-text">
            {formatCurrency(currentValue)}
          </p>
          <p className="text-sm text-jump-green mt-0.5">
            +{formatCurrency(growth)} ({growthPct}%) since Jan 2024
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-jump-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-jump-text rounded" />
            Actual
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 border-t-2 border-dashed border-jump-green" />
            Projected
          </span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        aria-label="Net worth over time chart"
      >
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
          const y = padY + chartH * (1 - pct)
          const val = min + (max - min) * pct
          return (
            <g key={pct}>
              <line
                x1={padX}
                y1={y}
                x2={width - padX}
                y2={y}
                stroke="#e8e8e8"
                strokeWidth="1"
              />
              <text x={0} y={y + 4} fontSize="10" fill="#8e8e8e">
                {formatCurrency(val, true)}
              </text>
            </g>
          )
        })}

        <path d={actualLine} fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d={projectedLine}
          fill="none"
          stroke="#00c875"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          strokeLinecap="round"
        />

        {history.map((p, i) => (
          <circle key={p.date} cx={toX(i)} cy={toY(p.value)} r="4" fill="#1a1a1a" />
        ))}
        <circle
          cx={toX(allPoints.length - 1)}
          cy={toY(projectedValue)}
          r="4"
          fill="#00c875"
        />
      </svg>

      <div className="flex justify-between mt-2 text-xs text-jump-muted px-1">
        {allPoints.map((p) => (
          <span key={p.date}>{p.date}</span>
        ))}
      </div>
    </div>
  )
}
