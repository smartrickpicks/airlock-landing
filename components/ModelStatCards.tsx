'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { viewportConfig, staggerContainer, staggerItem } from '@/lib/animations'

interface ModelStat {
  name: string
  archetype: string
  class: string
  model: string
  cost: string
  color: string
  stats: { atk: number; def: number; spd: number; int: number; eco: number }
  tagline: string
}

const models: ModelStat[] = [
  {
    name: 'The Flash',
    archetype: 'Speed Demon',
    class: 'Assassin',
    model: 'Gemini 2.0 Flash',
    cost: '$0.0036',
    color: '#FBBF24',
    stats: { atk: 7, def: 5, spd: 10, int: 7, eco: 10 },
    tagline: 'Fastest council in the west. 92% quality at 2% cost.',
  },
  {
    name: 'The Prodigy',
    archetype: 'Wunderkind',
    class: 'Ranger',
    model: 'Haiku 4.5',
    cost: '$0.007',
    color: '#A78BFA',
    stats: { atk: 8, def: 6, spd: 9, int: 8, eco: 9 },
    tagline: 'Near-premium quality. Pocket-friendly pricing.',
  },
  {
    name: 'The Essayist',
    archetype: 'Scholar',
    class: 'Mage',
    model: 'Gemini 2.5 Pro',
    cost: '$0.090',
    color: '#34D399',
    stats: { atk: 8, def: 7, spd: 6, int: 9, eco: 5 },
    tagline: 'Deep reasoning meets verbose brilliance.',
  },
  {
    name: 'The Professional',
    archetype: 'Veteran',
    class: 'Paladin',
    model: 'Sonnet 4.5',
    cost: '$0.046',
    color: '#60A5FA',
    stats: { atk: 9, def: 8, spd: 7, int: 9, eco: 6 },
    tagline: 'The benchmark baseline. Reliable, balanced, proven.',
  },
  {
    name: 'The Heavyweight',
    archetype: 'Titan',
    class: 'Guardian',
    model: 'Opus 4.5',
    cost: '$0.171',
    color: '#F472B6',
    stats: { atk: 10, def: 9, spd: 4, int: 10, eco: 2 },
    tagline: 'Maximum reasoning depth. When you need the absolute best.',
  },
  {
    name: 'The Speed Demon',
    archetype: 'Blitz',
    class: 'Monk',
    model: 'GPT-4o',
    cost: '$0.012',
    color: '#FB923C',
    stats: { atk: 7, def: 6, spd: 9, int: 7, eco: 8 },
    tagline: 'OpenAI\'s fastest. Consistent and cost-effective.',
  },
]

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-mono text-[var(--text-muted)] w-6 uppercase">{label}</span>
      <div className="flex-1 h-1.5 bg-[var(--bg-overlay)] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value * 10}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>
      <span className="text-[10px] font-mono text-[var(--text-muted)] w-4 text-right">{value}</span>
    </div>
  )
}

function ModelCard({ model }: { model: ModelStat }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      variants={staggerItem}
      className="relative cursor-pointer group"
      style={{ perspective: '1000px' }}
      role="button"
      tabIndex={0}
      aria-label={`${model.name} — ${model.archetype}. Click to ${flipped ? 'see stats' : 'see details'}`}
      onClick={() => setFlipped(!flipped)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped(!flipped) } }}
    >
      <AnimatePresence mode="wait">
        {!flipped ? (
          <motion.div
            key="front"
            initial={{ rotateY: 90 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: -90 }}
            transition={{ duration: 0.3 }}
            className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl p-5 glow-card relative overflow-hidden"
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: model.color }} />

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-base font-bold text-[var(--text-primary)]">{model.name}</p>
                <p className="text-[10px] text-[var(--text-muted)] font-mono">{model.model}</p>
              </div>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-md uppercase tracking-wider"
                style={{
                  backgroundColor: `${model.color}15`,
                  color: model.color,
                }}
              >
                {model.class}
              </span>
            </div>

            {/* Stats */}
            <div className="space-y-1.5 mb-4">
              <StatBar label="ATK" value={model.stats.atk} color={model.color} />
              <StatBar label="DEF" value={model.stats.def} color={model.color} />
              <StatBar label="SPD" value={model.stats.spd} color={model.color} />
              <StatBar label="INT" value={model.stats.int} color={model.color} />
              <StatBar label="ECO" value={model.stats.eco} color={model.color} />
            </div>

            {/* Cost */}
            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
              <span className="text-[10px] text-[var(--text-muted)]">Cost per council</span>
              <span className="text-sm font-mono font-bold" style={{ color: model.color }}>
                {model.cost}
              </span>
            </div>

            <p className="text-[10px] text-[var(--text-muted)] mt-2 text-center">Click to flip</p>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 90 }}
            transition={{ duration: 0.3 }}
            className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl p-5 glow-card relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: model.color }} />

            <p className="text-sm font-bold text-[var(--text-primary)] mb-1">{model.name}</p>
            <p className="text-[10px] font-mono uppercase tracking-wider mb-3" style={{ color: model.color }}>
              {model.archetype}
            </p>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              {model.tagline}
            </p>

            <div className="space-y-2 text-xs text-[var(--text-muted)]">
              <div className="flex justify-between">
                <span>Model</span>
                <span className="text-[var(--text-secondary)]">{model.model}</span>
              </div>
              <div className="flex justify-between">
                <span>Cost</span>
                <span style={{ color: model.color }}>{model.cost}</span>
              </div>
              <div className="flex justify-between">
                <span>Class</span>
                <span className="text-[var(--text-secondary)]">{model.class}</span>
              </div>
            </div>

            <p className="text-[10px] text-[var(--text-muted)] mt-4 text-center">Click to flip</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ModelStatCards() {
  return (
    <section className="py-24 px-6 md:py-32 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-[var(--accent-tertiary)] uppercase tracking-widest mb-4">
            Choose Your Council
          </p>
          <h2
            className="font-bold text-[var(--text-primary)] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Every model has a personality.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            We benchmarked 15 models and branded the best. Each one gets an archetype, a class, and RPG-style
            stat cards. Pick your council — or let Otto choose for you.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {models.map((model) => (
            <ModelCard key={model.name} model={model} />
          ))}
        </motion.div>

        {/* CTA — connect to live Otto demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <p className="text-[var(--text-secondary)] text-sm mb-5">
            Every AI gives you one voice. Airlock gives you a council.
          </p>
          <Link
            href="/otto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))',
              color: 'var(--bg-primary)',
            }}
          >
            See them in action
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
