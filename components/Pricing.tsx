'use client'

import { motion } from 'framer-motion'
import { Check, FlaskConical } from 'lucide-react'
import { viewportConfig, staggerContainer, staggerItem } from '@/lib/animations'

const tiers = [
  {
    name: 'Orbit Free',
    price: '$0',
    period: 'forever',
    description: 'AI workspace with 4 expert models. No credit card.',
    features: [
      '4 AI models (96.8% of premium quality)',
      '10 Constellation calls / day',
      '50 Otto messages / day',
      '5 vaults per seat',
      'Contracts, CRM, Triage, Calendar, Documents',
      'Real-time messenger',
      'Full-text search',
    ],
    cta: 'Get Started Free',
    highlight: false,
  },
  {
    name: 'Orbit Pro',
    price: '$49.99',
    period: '/month',
    description: 'All 15 AI models. 100 Constellation calls/day. Full governance.',
    features: [
      'Everything in Free',
      'All 15 branded AI models (incl. Opus)',
      '100 Constellation calls / day',
      '500 Otto messages / day',
      '50 vaults, 3 workspaces',
      'Vault lifecycle (4 chambers)',
      'Chamber gates & enforcement',
      'Extraction & preflight engines',
      'Audit trail & playbooks',
      'Team behavioral mapping',
      '3 custom persona slots',
      '14-day free trial',
    ],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Constellation Max',
    price: '$99',
    period: '/month',
    description: 'Unlimited everything. BYOK. API access. The full Constellation.',
    features: [
      'Everything in Orbit Pro',
      'Unlimited Constellation calls',
      'Unlimited Opus (uncapped)',
      'Bring your own API keys',
      'Constellation API access',
      'Unlimited vaults & workspaces',
      'Custom model routing',
      'Priority routing (<5s SLA)',
      'SSO & white-label',
      'Unlimited custom personas',
    ],
    cta: 'Join Waitlist',
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 md:py-32 md:px-8 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 40%, rgba(168,85,247,0.03), transparent 70%)',
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
          <p className="text-sm font-mono text-[var(--accent-tertiary)] uppercase tracking-widest mb-4">
            Pricing
          </p>
          <h2
            className="font-bold text-[var(--text-primary)] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Start free. Scale when you need governance.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
            The plugin is free forever — same AI quality, no credit card.
            Pay when you need lifecycle enforcement, audit trails, and team collaboration.
          </p>
        </motion.div>

        {/* Cost research callout */}
        <motion.a
          href="#benchmarks"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-3xl mx-auto mb-10 block group"
        >
          <div className="flex items-center gap-4 rounded-xl border border-[var(--accent-primary)]/15 bg-[var(--accent-primary)]/[0.03] px-5 py-3.5 transition-colors hover:border-[var(--accent-primary)]/30">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)]/10 flex items-center justify-center shrink-0">
              <FlaskConical className="w-4 h-4 text-[var(--accent-primary)]" />
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--accent-primary)]">ConstellationBench:</span>{' '}
              450 calls tested across 15 models — <span className="font-medium text-[var(--text-primary)]">92% quality retained at $0.004/call</span>.
              That&apos;s 47× cheaper than premium.{' '}
              <span className="text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors">See the research →</span>
            </p>
          </div>
        </motion.a>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={staggerItem}
              className={`bg-[var(--bg-raised)] border rounded-2xl p-6 relative overflow-hidden glow-card ${
                tier.highlight
                  ? 'border-[var(--accent-primary)]/30'
                  : 'border-[var(--border-primary)]'
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--accent-primary)]" />
              )}

              <div className="mb-6">
                <div className="flex items-baseline gap-1 mb-1">
                  {tier.highlight && (
                    <span className="text-[10px] font-mono bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] px-2 py-0.5 rounded-md uppercase tracking-wider mb-2 inline-block">
                      Recommended
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold text-[var(--text-primary)]">{tier.price}</span>
                  <span className="text-sm text-[var(--text-muted)]">{tier.period}</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">{tier.description}</p>
              </div>

              <ul className="space-y-2.5 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-[var(--accent-primary)]" />
                    </div>
                    <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={tier.name === 'Orbit Free' ? '/docs/plugin-install' : '#waitlist'}
                className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all text-center block ${
                  tier.highlight
                    ? 'bg-[var(--accent-primary)] text-black hover:brightness-110'
                    : 'bg-[var(--bg-overlay)] text-[var(--text-secondary)] border border-[var(--border-primary)] hover:border-[var(--accent-primary)]/30'
                }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
