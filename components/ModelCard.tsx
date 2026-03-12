'use client'

import { motion } from 'framer-motion'

type ModelCardData = {
  name: string
  brand: string
  score: number
  cost: number
  latency: number
  json: number
  provider: string
  tagline: string
  badge?: string
}

const badgeColors: Record<string, string> = {
  'BEST VALUE': 'var(--chamber-ship)',
  'MOST RELIABLE': 'var(--accent-primary)',
  'HIGHEST QUALITY': 'var(--accent-secondary)',
  FREE: 'var(--chamber-ship)',
  FASTEST: 'var(--chamber-build)',
}

function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.max((value / max) * 100, 3)
  return (
    <div className="w-full h-1.5 rounded-full bg-[var(--bg-base)]">
      <div
        className="h-1.5 rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  )
}

export default function ModelCard({ model, index }: { model: ModelCardData; index: number }) {
  const badgeColor = model.badge ? badgeColors[model.badge] || 'var(--accent-primary)' : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative p-6 rounded-2xl bg-[var(--glass-surface)] border border-[var(--border-subtle)] backdrop-blur-sm hover:border-[var(--accent-primary)]/30 transition-all duration-300 card-3d group"
    >
      {/* Badge */}
      {model.badge && (
        <div
          className="absolute -top-3 left-6 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider"
          style={{
            backgroundColor: badgeColor || undefined,
            color: 'var(--bg-base)',
          }}
        >
          {model.badge}
        </div>
      )}

      {/* Brand name */}
      <p className="text-lg font-bold text-[var(--text-primary)] mb-0.5 mt-1">
        {model.brand}
      </p>
      <p className="text-xs text-[var(--text-muted)] font-mono mb-4">
        {model.name} · {model.provider}
      </p>

      {/* Stats */}
      <div className="space-y-3 mb-4">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[var(--text-muted)]">Quality</span>
            <span className="font-mono text-[var(--chamber-ship)]">{model.score.toFixed(3)}</span>
          </div>
          <MiniBar value={(model.score - 0.5) * 10} max={1} color="var(--chamber-ship)" />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[var(--text-muted)]">Cost/Council</span>
            <span className="font-mono text-[var(--accent-primary)]">
              {model.cost === 0 ? 'FREE' : `$${model.cost.toFixed(4)}`}
            </span>
          </div>
          <MiniBar value={model.cost} max={0.18} color="var(--chamber-discover)" />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[var(--text-muted)]">Latency</span>
            <span className="font-mono text-[var(--chamber-build)]">{model.latency}s</span>
          </div>
          <MiniBar value={model.latency} max={100} color="var(--chamber-build)" />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[var(--text-muted)]">JSON</span>
            <span className={`font-mono ${model.json === 100 ? 'text-[var(--chamber-ship)]' : 'text-[var(--text-secondary)]'}`}>
              {model.json}%
            </span>
          </div>
          <MiniBar value={model.json} max={100} color={model.json === 100 ? 'var(--chamber-ship)' : 'var(--text-muted)'} />
        </div>
      </div>

      {/* Tagline */}
      <p className="text-xs text-[var(--text-secondary)] italic leading-relaxed border-t border-[var(--border-subtle)] pt-3">
        &ldquo;{model.tagline}&rdquo;
      </p>
    </motion.div>
  )
}
