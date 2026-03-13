'use client'

import { motion } from 'framer-motion'

type BenchmarkStats = {
  ottoTau: number
  personaFidelity: number
  sessionRecall: number
  coldRead: number
  voiceDrift: number
  benchCore: number
}

export type HeroModelData = {
  name: string
  brand: string
  role: string // "All-Rounder" | "Budget Hero" | "Tank" | "Specialist" | "Glass Cannon" | "Support"
  provider: string
  costPerTask: number
  tasksPerDollar: number
  stats: BenchmarkStats
  wins: string[] // benchmark names this model won
  tagline: string
  badge?: string
  tier: 'budget' | 'mid' | 'frontier' | 'free'
}

const roleColors: Record<string, string> = {
  'All-Rounder': 'var(--chamber-ship)',
  'Budget Hero': 'var(--accent-primary)',
  Tank: 'var(--chamber-review)',
  Specialist: 'var(--chamber-build)',
  'Glass Cannon': 'var(--chamber-discover)',
  Support: 'var(--accent-secondary)',
  'Free Agent': 'var(--chamber-ship)',
}

const tierLabels: Record<string, { label: string; color: string }> = {
  budget: { label: 'BUDGET', color: 'var(--chamber-ship)' },
  mid: { label: 'MID-TIER', color: 'var(--accent-primary)' },
  frontier: { label: 'FRONTIER', color: 'var(--chamber-discover)' },
  free: { label: 'FREE', color: 'var(--chamber-ship)' },
}

/* ── Radar Chart (SVG) ───────────────────────────────────────────── */
function RadarChart({ stats }: { stats: BenchmarkStats }) {
  const labels = ['OttoTau', 'Persona', 'Session', 'ColdRead', 'Voice', 'Bench']
  const values = [
    stats.ottoTau,
    stats.personaFidelity,
    stats.sessionRecall,
    stats.coldRead,
    stats.voiceDrift,
    stats.benchCore,
  ]

  const cx = 60
  const cy = 60
  const r = 45
  const n = values.length

  // Generate polygon points for a given set of values (0-1 scale)
  const toPoints = (vals: number[]) =>
    vals
      .map((v, i) => {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2
        const dist = v * r
        return `${cx + dist * Math.cos(angle)},${cy + dist * Math.sin(angle)}`
      })
      .join(' ')

  // Grid lines at 25%, 50%, 75%, 100%
  const gridLevels = [0.25, 0.5, 0.75, 1.0]

  // Label positions
  const labelPositions = labels.map((label, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2
    const dist = r + 12
    return {
      x: cx + dist * Math.cos(angle),
      y: cy + dist * Math.sin(angle),
      label,
    }
  })

  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      {/* Grid */}
      {gridLevels.map((level) => (
        <polygon
          key={level}
          points={toPoints(Array(n).fill(level))}
          fill="none"
          stroke="var(--border-subtle)"
          strokeWidth="0.5"
          opacity={0.5}
        />
      ))}

      {/* Axes */}
      {Array.from({ length: n }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + r * Math.cos(angle)}
            y2={cy + r * Math.sin(angle)}
            stroke="var(--border-subtle)"
            strokeWidth="0.3"
            opacity={0.4}
          />
        )
      })}

      {/* Data polygon */}
      <polygon
        points={toPoints(values)}
        fill="var(--accent-primary)"
        fillOpacity={0.15}
        stroke="var(--accent-primary)"
        strokeWidth="1.5"
      />

      {/* Data points */}
      {values.map((v, i) => {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2
        const dist = v * r
        return (
          <circle
            key={i}
            cx={cx + dist * Math.cos(angle)}
            cy={cy + dist * Math.sin(angle)}
            r="2"
            fill="var(--accent-primary)"
          />
        )
      })}

      {/* Labels */}
      {labelPositions.map((lp) => (
        <text
          key={lp.label}
          x={lp.x}
          y={lp.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-[var(--text-muted)]"
          fontSize="4.5"
          fontFamily="monospace"
        >
          {lp.label}
        </text>
      ))}
    </svg>
  )
}

/* ── Hero Model Card ─────────────────────────────────────────────── */
export default function HeroModelCard({
  model,
  index,
}: {
  model: HeroModelData
  index: number
}) {
  const roleColor = roleColors[model.role] || 'var(--accent-primary)'
  const tierInfo = tierLabels[model.tier] || tierLabels.mid

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="relative p-6 rounded-2xl bg-[var(--glass-surface)] border border-[var(--border-subtle)] backdrop-blur-sm hover:border-[var(--accent-primary)]/40 transition-all duration-300 group overflow-hidden"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

      {/* Top row: badge + tier */}
      <div className="relative flex items-start justify-between mb-3">
        <div>
          {model.badge && (
            <span
              className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider mb-2"
              style={{ backgroundColor: roleColor, color: 'var(--bg-base)' }}
            >
              {model.badge}
            </span>
          )}
          <h3 className="text-xl font-bold text-[var(--text-primary)] leading-tight">
            {model.brand}
          </h3>
          <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
            {model.name} · {model.provider}
          </p>
        </div>
        <span
          className="text-[9px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 mt-1"
          style={{ borderColor: tierInfo.color, color: tierInfo.color }}
        >
          {tierInfo.label}
        </span>
      </div>

      {/* Role tag */}
      <div className="relative flex items-center gap-2 mb-4">
        <span
          className="text-[10px] font-mono font-bold uppercase tracking-wider"
          style={{ color: roleColor }}
        >
          {model.role}
        </span>
        <span className="text-[var(--text-muted)] text-[10px]">·</span>
        <span className="text-[10px] text-[var(--text-muted)] font-mono">
          {model.costPerTask === 0
            ? 'FREE'
            : model.costPerTask < 0.001
              ? `$${model.costPerTask.toFixed(5)}/task`
              : `$${model.costPerTask.toFixed(4)}/task`}
        </span>
        <span className="text-[var(--text-muted)] text-[10px]">·</span>
        <span className="text-[10px] font-mono text-[var(--accent-primary)]">
          {model.tasksPerDollar >= 10000
            ? `${(model.tasksPerDollar / 1000).toFixed(0)}K`
            : model.tasksPerDollar.toLocaleString()}{' '}
          tasks/$1
        </span>
      </div>

      {/* Radar chart */}
      <div className="relative w-full aspect-square max-w-[180px] mx-auto mb-4">
        <RadarChart stats={model.stats} />
      </div>

      {/* Win badges */}
      {model.wins.length > 0 && (
        <div className="relative flex flex-wrap gap-1.5 mb-3">
          {model.wins.map((win) => (
            <span
              key={win}
              className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20"
            >
              {win}
            </span>
          ))}
        </div>
      )}

      {/* Tagline */}
      <p className="relative text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] pt-3 italic">
        &ldquo;{model.tagline}&rdquo;
      </p>
    </motion.div>
  )
}
