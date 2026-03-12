'use client'

import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

type ModelPoint = {
  name: string
  brand: string
  score: number
  cost: number
  latency: number
  provider: string
}

const providerColors: Record<string, string> = {
  Anthropic: '#D97706',
  Google: '#22C55E',
  OpenAI: '#10B981',
  xAI: '#EF4444',
  DeepSeek: '#6366F1',
  Mistral: '#F97316',
  Moonshot: '#EC4899',
  Alibaba: '#A855F7',
  NVIDIA: '#84CC16',
}

export default function ParetoChart({ models }: { models: ModelPoint[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState<string | null>(null)

  // Chart dimensions
  const width = 700
  const height = 400
  const padding = { top: 30, right: 30, bottom: 50, left: 60 }
  const chartW = width - padding.left - padding.right
  const chartH = height - padding.top - padding.bottom

  // Data ranges — zoomed in on quality (0.53-0.60)
  const minScore = 0.53
  const maxScore = 0.60
  const maxCost = Math.max(...models.map((m) => m.cost)) * 1.1

  // Scale functions
  const xScale = (cost: number) => padding.left + (cost / maxCost) * chartW
  const yScale = (score: number) =>
    padding.top + chartH - ((score - minScore) / (maxScore - minScore)) * chartH

  // Latency → radius (3-12px)
  const maxLatency = Math.max(...models.map((m) => m.latency))
  const radiusScale = (latency: number) => 4 + (latency / maxLatency) * 8

  // Y-axis ticks
  const yTicks = [0.54, 0.55, 0.56, 0.57, 0.58, 0.59]
  // X-axis ticks
  const xTicks = [0, 0.02, 0.04, 0.06, 0.08, 0.10, 0.12, 0.14, 0.17]
    .filter((v) => v <= maxCost)

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-[700px] mx-auto"
        style={{ minWidth: 500 }}
      >
        {/* Grid lines */}
        {yTicks.map((tick) => (
          <line
            key={`y-${tick}`}
            x1={padding.left}
            x2={width - padding.right}
            y1={yScale(tick)}
            y2={yScale(tick)}
            stroke="var(--border-subtle)"
            strokeDasharray="4 4"
          />
        ))}

        {/* Y-axis labels */}
        {yTicks.map((tick) => (
          <text
            key={`yl-${tick}`}
            x={padding.left - 8}
            y={yScale(tick) + 4}
            textAnchor="end"
            fill="var(--text-muted)"
            fontSize={11}
            fontFamily="monospace"
          >
            {tick.toFixed(2)}
          </text>
        ))}

        {/* X-axis labels */}
        {xTicks.map((tick) => (
          <text
            key={`xl-${tick}`}
            x={xScale(tick)}
            y={height - 10}
            textAnchor="middle"
            fill="var(--text-muted)"
            fontSize={11}
            fontFamily="monospace"
          >
            ${tick.toFixed(2)}
          </text>
        ))}

        {/* Axis labels */}
        <text
          x={width / 2}
          y={height - 0}
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize={11}
        >
          Cost per council →
        </text>
        <text
          x={14}
          y={height / 2}
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize={11}
          transform={`rotate(-90, 14, ${height / 2})`}
        >
          Quality score
        </text>

        {/* Quality floor band */}
        <rect
          x={padding.left}
          y={yScale(0.577)}
          width={chartW}
          height={yScale(0.54) - yScale(0.577)}
          fill="var(--chamber-ship)"
          opacity={0.04}
        />

        {/* Data points */}
        {models.map((model, i) => {
          const cx = xScale(model.cost)
          const cy = yScale(model.score)
          const r = radiusScale(model.latency)
          const color = providerColors[model.provider] || 'var(--accent-primary)'
          const isHovered = hovered === model.name

          return (
            <g key={model.name}>
              <motion.circle
                cx={cx}
                cy={cy}
                r={isHovered ? r + 2 : r}
                fill={color}
                fillOpacity={isHovered ? 0.9 : 0.7}
                stroke={isHovered ? '#fff' : 'none'}
                strokeWidth={isHovered ? 1.5 : 0}
                initial={{ r: 0, opacity: 0 }}
                animate={
                  isInView
                    ? { r: isHovered ? r + 2 : r, opacity: 1 }
                    : { r: 0, opacity: 0 }
                }
                transition={{ delay: i * 0.06, duration: 0.4, ease: 'easeOut' }}
                onMouseEnter={() => setHovered(model.name)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
              />
              {/* Label on hover */}
              {isHovered && (
                <g>
                  <rect
                    x={cx + r + 6}
                    y={cy - 32}
                    width={150}
                    height={52}
                    rx={6}
                    fill="var(--bg-overlay)"
                    stroke="var(--border-primary)"
                  />
                  <text
                    x={cx + r + 14}
                    y={cy - 14}
                    fill="var(--text-primary)"
                    fontSize={12}
                    fontWeight={600}
                  >
                    {model.name}
                  </text>
                  <text
                    x={cx + r + 14}
                    y={cy + 2}
                    fill="var(--text-muted)"
                    fontSize={10}
                    fontFamily="monospace"
                  >
                    {model.score.toFixed(3)} · ${model.cost.toFixed(4)} · {model.latency}s
                  </text>
                  <text
                    x={cx + r + 14}
                    y={cy + 14}
                    fill={color}
                    fontSize={10}
                  >
                    {model.brand}
                  </text>
                </g>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
