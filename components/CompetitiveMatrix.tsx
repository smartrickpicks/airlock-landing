'use client'

import { motion } from 'framer-motion'
import { Check, X, Minus } from 'lucide-react'
import { viewportConfig } from '@/lib/animations'

const dimensions = [
  {
    label: 'Contract intelligence',
    clm: 'strong',
    workspace: 'none',
    airlock: 'strong',
  },
  {
    label: 'CRM built-in',
    clm: 'none',
    workspace: 'weak',
    airlock: 'native',
  },
  {
    label: 'Project management',
    clm: 'none',
    workspace: 'strong',
    airlock: 'native',
  },
  {
    label: 'Communication UX',
    clm: 'none',
    workspace: 'weak',
    airlock: 'core',
  },
  {
    label: 'AI agents',
    clm: 'emerging',
    workspace: 'emerging',
    airlock: 'native',
  },
  {
    label: 'Industry-specific',
    clm: 'generic',
    workspace: 'generic',
    airlock: 'vertical',
  },
]

function CellIcon({ value }: { value: string }) {
  if (value === 'strong' || value === 'native' || value === 'core' || value === 'vertical') {
    return <Check className="w-4 h-4 text-green-400" />
  }
  if (value === 'weak' || value === 'emerging' || value === 'generic') {
    return <Minus className="w-4 h-4 text-yellow-400" />
  }
  return <X className="w-4 h-4 text-red-400/60" />
}

function CellLabel({ value }: { value: string }) {
  const labels: Record<string, string> = {
    strong: 'Strong',
    native: 'Native',
    core: 'Core',
    vertical: 'Entertainment-first',
    weak: 'Bolted on',
    emerging: 'Emerging',
    generic: 'Generic',
    none: 'None',
  }
  return <span className="text-xs text-[var(--text-muted)]">{labels[value] || value}</span>
}

export default function CompetitiveMatrix() {
  return (
    <section className="py-24 px-6 md:py-32 md:px-8 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(168,85,247,0.03), transparent 70%)',
        }}
      />

      <div className="max-w-[900px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-mono text-[var(--accent-tertiary)] uppercase tracking-widest mb-4">
            Why Not Integrations
          </p>
          <h2
            className="font-bold text-[var(--text-primary)]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Integrations sync data. Airlock unifies context.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            {
              "Adding Zapier arrows between tools doesn't reduce complexity — it multiplies failure points."
            }
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-4 gap-0 border-b border-[var(--border-primary)]">
            <div className="p-4 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
              Dimension
            </div>
            <div className="p-4 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider text-center border-l border-[var(--border-subtle)]">
              CLM Tools
            </div>
            <div className="p-4 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider text-center border-l border-[var(--border-subtle)]">
              Workspace Tools
            </div>
            <div className="p-4 text-xs font-mono text-[var(--accent-primary)] uppercase tracking-wider text-center border-l border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5">
              Airlock
            </div>
          </div>

          {/* Rows */}
          {dimensions.map((dim, i) => (
            <div
              key={dim.label}
              className={`grid grid-cols-4 gap-0 ${
                i < dimensions.length - 1 ? 'border-b border-[var(--border-subtle)]' : ''
              }`}
            >
              <div className="p-4 text-sm text-[var(--text-primary)] font-medium">
                {dim.label}
              </div>
              <div className="p-4 flex flex-col items-center justify-center gap-1 border-l border-[var(--border-subtle)]">
                <CellIcon value={dim.clm} />
                <CellLabel value={dim.clm} />
              </div>
              <div className="p-4 flex flex-col items-center justify-center gap-1 border-l border-[var(--border-subtle)]">
                <CellIcon value={dim.workspace} />
                <CellLabel value={dim.workspace} />
              </div>
              <div className="p-4 flex flex-col items-center justify-center gap-1 border-l border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/[0.02]">
                <CellIcon value={dim.airlock} />
                <CellLabel value={dim.airlock} />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Source attribution */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-[10px] text-[var(--text-muted)]/50 mt-4"
        >
          Sources: WorldCC/IACCM, Gartner, Asana Anatomy of Work, Productiv
        </motion.p>
      </div>

      {/* Divider */}
      <div className="section-divider max-w-[800px] mx-auto mt-24" />
    </section>
  )
}
