'use client'

import { motion } from 'framer-motion'
import { viewportConfig, staggerContainer, staggerItem } from '@/lib/animations'
import { Beaker, TrendingDown, Zap, Brain } from 'lucide-react'

const highlights = [
  {
    icon: Beaker,
    value: '450',
    label: 'Council runs',
    sub: '15 models benchmarked end-to-end',
  },
  {
    icon: TrendingDown,
    value: '$0.0036',
    label: 'Per council',
    sub: 'Standard tier (Gemini Flash)',
  },
  {
    icon: Brain,
    value: '1,800',
    label: 'AI perspectives',
    sub: '4 experts per council deliberation',
  },
  {
    icon: Zap,
    value: '92%',
    label: 'Quality retained',
    sub: 'vs premium tier at 47x the cost',
  },
]

const tiers = [
  { name: 'The Flash', model: 'Gemini 2.0 Flash', cost: '$0.0036', quality: '92%', badge: 'Best Value' },
  { name: 'The Prodigy', model: 'Haiku 4.5', cost: '$0.007', quality: '96.8%', badge: 'Balanced' },
  { name: 'The Professional', model: 'Sonnet 4.5', cost: '$0.046', quality: '100%', badge: 'Premium' },
  { name: 'The Heavyweight', model: 'Opus 4.5', cost: '$0.171', quality: '100%', badge: 'Deep Analysis' },
]

export default function BenchProof() {
  return (
    <section id="benchmarks" className="py-24 px-6 md:py-32 md:px-8 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,209,255,0.03), transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-[var(--accent-primary)] uppercase tracking-widest mb-4">
            ConstellationBench
          </p>
          <h2
            className="font-bold text-[var(--text-primary)] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Four AI experts deliberate.
            <br />
            <span className="gradient-text">Cost: less than a penny.</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            We benchmarked 15 models across 450 council runs and 1,800 AI perspectives.
            The quality curve is nearly flat — but the cost curve isn&apos;t.
          </p>
        </motion.div>

        {/* Stat highlights */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16"
        >
          {highlights.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-xl p-5 text-center glow-card"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-4 h-4 text-[var(--accent-primary)]" />
                </div>
                <p className="text-2xl font-bold text-[var(--accent-primary)] mb-1">{stat.value}</p>
                <p className="text-xs font-medium text-[var(--text-primary)]">{stat.label}</p>
                <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{stat.sub}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Tier comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-4 gap-4 px-6 py-3 border-b border-[var(--border-subtle)] text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
              <span>Model</span>
              <span className="text-center">Cost / Council</span>
              <span className="text-center">Quality</span>
              <span className="text-right">Tier</span>
            </div>

            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                className={`grid grid-cols-4 gap-4 px-6 py-4 items-center ${
                  i < tiers.length - 1 ? 'border-b border-[var(--border-subtle)]' : ''
                } ${i === 0 ? 'bg-[var(--accent-primary)]/[0.03]' : ''}`}
              >
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{tier.name}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">{tier.model}</p>
                </div>
                <p className={`text-sm font-mono text-center ${i === 0 ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'}`}>
                  {tier.cost}
                </p>
                <p className="text-sm font-mono text-center text-[var(--text-secondary)]">
                  {tier.quality}
                </p>
                <div className="flex justify-end">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      i === 0
                        ? 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]'
                        : 'bg-[var(--bg-overlay)] text-[var(--text-muted)]'
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-[10px] text-[var(--text-muted)] text-center mt-4">
            ConstellationBench v1 — 450 councils, 1,800 perspectives, 15 models — March 2026.
            Quality measured relative to Sonnet 4.5 baseline.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
