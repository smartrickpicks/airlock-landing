'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { viewportConfig, staggerContainer, staggerItem } from '@/lib/animations'

const tiers = [
  {
    name: 'Orbit Free',
    price: '$0',
    period: 'forever',
    description: 'Otto\'s brain in your editor. Zero cost.',
    features: [
      '17 behavioral personas',
      'Constellation council command',
      'Skill invocation',
      'Local codebase context',
      '10 councils / day',
      '96.8% of platform quality',
    ],
    cta: 'Install Plugin',
    highlight: false,
  },
  {
    name: 'Orbit Pro',
    price: '$49.99',
    period: '/month',
    description: 'Full platform with governance, persistence, and all 15 branded models.',
    features: [
      'Everything in Free',
      'All 15 branded AI models',
      'Vault lifecycle (4 chambers)',
      'Chamber gates & enforcement',
      'Separation of duties',
      'Append-only audit trail',
      'CRM, calendar, task modules',
      'Team behavioral mapping',
      '14-day free trial',
    ],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Constellation Max',
    price: '$99',
    period: '/month',
    description: 'Unlimited Opus, BYOK, API access — the full Constellation.',
    features: [
      'Everything in Orbit Pro',
      'Unlimited Opus councils',
      'Bring your own API keys',
      'All 342 models via OpenRouter',
      'Constellation API access',
      'Unlimited vaults & workspaces',
      'Custom model routing',
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
