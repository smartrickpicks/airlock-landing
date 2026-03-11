'use client'

import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { viewportConfig } from '@/lib/animations'

const comparisonRows = [
  {
    old: 'Contracts in email, Drive, Dropbox',
    new: 'One Vault per deal — everything in one',
  },
  {
    old: 'Approvals lost in Slack threads',
    new: 'Gates with preflight + audit trail',
  },
  {
    old: 'Spreadsheets outdated instantly',
    new: 'Real-time Pulse scores (0\u2013100)',
  },
  {
    old: 'Copy-pasting clause data between tools',
    new: '9 extractors pull structured data',
  },
  {
    old: '5+ apps to process one deal',
    new: 'Triptych \u2014 Signal | Orchestrate | Control',
  },
]

export default function ProblemSolution() {
  return (
    <section id="features" className="py-24 px-6 md:py-32 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-[var(--accent-primary)] uppercase tracking-widest mb-4">
            The Problem
          </p>
          <h2
            className="font-bold text-[var(--text-primary)]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            The Fragmentation Tax
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            Your team uses an average of 8 tools to manage a single deal lifecycle.
            That costs more than you think.
          </p>
        </motion.div>

        {/* Industry Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
        >
          {[
            { value: '9.2%', label: 'Revenue lost', sub: 'to poor contract management' },
            { value: '25x', label: 'App switches', sub: 'daily per knowledge worker' },
            { value: '30%', label: 'CRM decay', sub: 'per year without maintenance' },
            { value: '130+', label: 'SaaS apps', sub: 'in average enterprise stack' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-xl p-4 text-center"
            >
              <p className="text-2xl font-bold text-red-400 mb-1">{stat.value}</p>
              <p className="text-xs font-medium text-[var(--text-primary)]">{stat.label}</p>
              <p className="text-[10px] text-[var(--text-muted)]">{stat.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Row-based comparison */}
        <div className="max-w-4xl mx-auto space-y-3">
          {/* Header row */}
          <div className="grid grid-cols-2 gap-4 px-4 mb-2">
            <p className="text-xs font-mono text-red-400/80 uppercase tracking-wider">Old Way</p>
            <p className="text-xs font-mono text-[var(--accent-primary)]/80 uppercase tracking-wider">Airlock Way</p>
          </div>

          {comparisonRows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 rounded-xl overflow-hidden"
            >
              {/* Old way */}
              <div className="flex items-center gap-3 bg-[var(--bg-raised)] border border-red-500/10 rounded-t-xl md:rounded-l-xl md:rounded-tr-none p-4 relative">
                <div
                  className="absolute inset-0 pointer-events-none rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                  style={{
                    background: 'linear-gradient(90deg, rgba(239,68,68,0.04), transparent 60%)',
                  }}
                />
                <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 relative z-10">
                  <X className="w-3 h-3 text-red-400" />
                </div>
                <span className="text-sm text-[var(--text-secondary)] relative z-10">{row.old}</span>
              </div>

              {/* Airlock way */}
              <div className="flex items-center gap-3 bg-[var(--bg-raised)] border border-[var(--accent-primary)]/10 rounded-b-xl md:rounded-r-xl md:rounded-bl-none p-4 relative">
                <div
                  className="absolute inset-0 pointer-events-none rounded-b-xl md:rounded-r-xl md:rounded-bl-none"
                  style={{
                    background: 'linear-gradient(90deg, rgba(0,209,255,0.04), transparent 60%)',
                  }}
                />
                <div className="w-5 h-5 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center shrink-0 relative z-10">
                  <Check className="w-3 h-3 text-[var(--accent-primary)]" />
                </div>
                <span className="text-sm text-[var(--text-secondary)] relative z-10">{row.new}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
