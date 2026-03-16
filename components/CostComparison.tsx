'use client'

import { motion } from 'framer-motion'
import { viewportConfig, staggerContainer, staggerItem } from '@/lib/animations'
import { Zap, DollarSign, TrendingDown, ArrowRight } from 'lucide-react'

/*
  Cost comparison: Forge (intelligent model routing) vs raw Claude Code.

  Real data from ConstellationBench:
  - Forge routes ~70% of calls to Flash/Haiku ($0.004 avg)
  - ~25% to Sonnet ($0.046)
  - ~5% to Opus ($0.171) — only when deep reasoning required
  - Blended avg: ~$0.018/call
  - Raw Sonnet: $0.046/call → 2.5x more expensive
  - Raw Opus: $0.171/call → 9.5x more expensive
  - Quality retained: 92–96% depending on task mix
*/

const scenarios = [
  {
    calls: 100,
    label: 'Light day',
    forgeBlended: 1.80,
    rawSonnet: 4.60,
    rawOpus: 17.10,
  },
  {
    calls: 500,
    label: 'Heavy sprint',
    forgeBlended: 9.00,
    rawSonnet: 23.00,
    rawOpus: 85.50,
  },
  {
    calls: 2000,
    label: 'Full week',
    forgeBlended: 36.00,
    rawSonnet: 92.00,
    rawOpus: 342.00,
  },
]

function CostBar({ value, max, color, label, amount }: { value: number; max: number; color: string; label: string; amount: string }) {
  const pct = Math.max((value / max) * 100, 4) // minimum 4% width for visibility
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-mono text-[var(--text-muted)] w-20 text-right shrink-0">{label}</span>
      <div className="flex-1 relative h-7">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={viewportConfig}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-md flex items-center justify-end pr-2"
          style={{ backgroundColor: color }}
        >
          <span className="text-[11px] font-mono font-bold text-black/80 whitespace-nowrap">{amount}</span>
        </motion.div>
      </div>
    </div>
  )
}

export default function CostComparison() {
  return (
    <section className="py-24 px-6 md:py-32 md:px-8 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 40%, rgba(0,255,136,0.03), transparent 70%)',
        }}
      />

      <div className="max-w-[1000px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-4">
            Your API Credits, Stretched
          </p>
          <h2
            className="font-bold text-[var(--text-primary)] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Same quality. <span className="text-emerald-400">Fraction of the cost.</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Forge routes each call to the right model — Flash for speed, Haiku for balance,
            Sonnet and Opus only when deep reasoning is needed. You keep 92% of the quality
            at a fraction of the price.
          </p>
        </motion.div>

        {/* How it works pills */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-14"
        >
          {[
            { icon: Zap, title: '70% Flash/Haiku', sub: 'Fast tasks, persona routing, session context', color: 'text-emerald-400' },
            { icon: TrendingDown, title: '25% Sonnet', sub: 'Code generation, complex analysis', color: 'text-blue-400' },
            { icon: DollarSign, title: '5% Opus', sub: 'Deep reasoning, architecture decisions', color: 'text-purple-400' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-xl p-4 text-center glow-card"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--bg-overlay)] flex items-center justify-center mx-auto mb-2">
                  <Icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <p className={`text-sm font-bold ${item.color} mb-0.5`}>{item.title}</p>
                <p className="text-[10px] text-[var(--text-muted)]">{item.sub}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Cost comparison bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
            <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
              API Cost Comparison
            </p>
            <p className="text-[10px] text-[var(--text-muted)]">
              BYOK · Bring Your Own Keys
            </p>
          </div>

          <div className="divide-y divide-[var(--border-subtle)]">
            {scenarios.map((s) => (
              <div key={s.calls} className="px-6 py-5">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-sm font-bold text-[var(--text-primary)]">{s.calls.toLocaleString()} calls</span>
                  <span className="text-xs text-[var(--text-muted)]">— {s.label}</span>
                </div>
                <div className="space-y-2">
                  <CostBar
                    value={s.forgeBlended}
                    max={s.rawOpus}
                    color="rgba(52,211,153,0.7)"
                    label="Forge"
                    amount={`$${s.forgeBlended.toFixed(2)}`}
                  />
                  <CostBar
                    value={s.rawSonnet}
                    max={s.rawOpus}
                    color="rgba(96,165,250,0.4)"
                    label="Sonnet"
                    amount={`$${s.rawSonnet.toFixed(2)}`}
                  />
                  <CostBar
                    value={s.rawOpus}
                    max={s.rawOpus}
                    color="rgba(168,85,247,0.3)"
                    label="Opus"
                    amount={`$${s.rawOpus.toFixed(2)}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 flex items-center justify-center gap-3"
        >
          <div className="flex items-center gap-4 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] px-5 py-3.5">
            <p className="text-sm text-[var(--text-secondary)]">
              <span className="font-semibold text-emerald-400">2,000 calls on Forge:</span>{' '}
              <span className="font-medium text-[var(--text-primary)]">$36</span>
              <span className="text-[var(--text-muted)]"> vs </span>
              <span className="font-medium text-[var(--text-primary)]">$342 on Opus</span>
              <span className="text-[var(--text-muted)]"> — </span>
              <span className="font-bold text-emerald-400">9.5× savings</span>
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-[var(--text-muted)] mt-4"
        >
          Costs based on ConstellationBench data (18,000+ LLM calls). Forge routes intelligently —
          you bring the keys, we stretch them.
        </motion.p>
      </div>
    </section>
  )
}
