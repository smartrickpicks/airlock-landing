'use client'

import { motion } from 'framer-motion'
import {
  TrendingUp,
  Shield,
  Zap,
  DollarSign,
  BarChart3,
  Users,
  ArrowRight,
  Brain,
  Cpu,
  GitFork,
  Lock,
} from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AnimatedCounter from '@/components/AnimatedCounter'
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/animations'

/* ── Benchmark Data (ConstellationBench, March 2026) ────────── */
const proofPoints = [
  {
    icon: BarChart3,
    target: 18000,
    prefix: '',
    suffix: '+',
    label: 'LLM calls benchmarked',
    detail: '17 personas across 3 adversarial stress layers and 15 models',
  },
  {
    icon: DollarSign,
    target: 49.95,
    prefix: '$',
    suffix: '',
    decimals: 2,
    label: 'Total benchmark cost',
    detail: '18,000 evaluations for less than dinner — budget models won',
  },
  {
    icon: TrendingUp,
    target: 8,
    prefix: '',
    suffix: '%',
    label: 'Quality spread across tiers',
    detail: 'While cost spans 857x. The cheapest model hits 92% of premium quality.',
  },
  {
    icon: Zap,
    target: 3.4,
    prefix: '',
    suffix: 's',
    decimals: 1,
    label: 'Fastest council deliberation',
    detail: '4 AI experts assemble, debate, and return structured analysis',
  },
]

const unitEconomics = [
  {
    tier: 'Free',
    price: '$0',
    model: 'Gemini 2.5 Flash',
    costPerCouncil: '$0.0036',
    monthlyCogsAt30: '$0.11',
    margin: 'Subsidized',
    marginPct: 0,
    note: 'Acquisition cost lower than a Google Ad click',
  },
  {
    tier: 'Pro',
    price: '$9.99/mo',
    model: 'Sonnet 4.6',
    costPerCouncil: '$0.030',
    monthlyCogsAt30: '$0.90',
    margin: '91.0%',
    marginPct: 91,
    note: '335 councils/mo before break-even',
  },
  {
    tier: 'Constellation',
    price: '$39.99/mo',
    model: 'Opus 4.6',
    costPerCouncil: '$0.171',
    monthlyCogsAt30: '$5.14',
    margin: '87.1%',
    marginPct: 87.1,
    note: 'Premium tier, deepest analysis',
  },
  {
    tier: 'BYOK',
    price: '$29.99/mo',
    model: 'Customer keys',
    costPerCouncil: '$0.00',
    monthlyCogsAt30: '$0.00',
    margin: '100%',
    marginPct: 100,
    note: 'Pure platform revenue',
  },
]

const whyNow = [
  {
    icon: Cpu,
    title: 'Model costs are collapsing',
    body: 'In March 2026 we found 9 models under $0.01/council run. A year ago the cheapest viable option was $0.15. The cost curve makes multi-agent AI economically inevitable.',
  },
  {
    icon: GitFork,
    title: 'MCP is becoming standard',
    body: 'Model Context Protocol connects AI to enterprise tools. Airlock already orchestrates 7 MCP servers. As MCP adoption grows, our multi-repo architecture becomes a competitive moat.',
  },
  {
    icon: Brain,
    title: 'Single-agent AI is hitting a ceiling',
    body: 'One model, one perspective, one blind spot. Multi-persona councils with quantified behavioral profiles (DECF drives) produce more robust analysis. The market is shifting from chatbots to deliberation systems.',
  },
  {
    icon: Users,
    title: 'Enterprise buyers want platforms, not plugins',
    body: 'Contract lifecycle management, CRM, project management, and AI orchestration — currently 4+ separate vendors. Airlock collapses the stack into one unified interface.',
  },
]

const useOfFunds = [
  {
    icon: Users,
    pct: 40,
    label: 'Enterprise sales & partnerships',
    detail: 'Dedicated sales team for contract lifecycle management buyers. Channel partnerships with legal tech and CLM vendors.',
    color: 'var(--accent-primary)',
  },
  {
    icon: Shield,
    pct: 25,
    label: 'Compliance & certifications',
    detail: 'SOC 2 Type II, FedRAMP, HIPAA — the table-stakes certifications that unlock regulated industries.',
    color: 'var(--accent-secondary)',
  },
  {
    icon: Cpu,
    pct: 25,
    label: 'Platform engineering',
    detail: 'Dedicated team to harden the orchestration layer, expand MCP integrations, and ship the BYOK marketplace.',
    color: 'var(--accent-tertiary)',
  },
  {
    icon: Lock,
    pct: 10,
    label: 'Operations & reserves',
    detail: "18-month runway buffer. We don't burn capital on growth-at-all-costs experiments.",
    color: 'var(--text-muted)',
  },
]

export default function InvestPage() {
  return (
    <main className="bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Nav />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-primary)]/5 via-transparent to-transparent" />
        <motion.div
          className="max-w-4xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm font-mono text-[var(--accent-primary)] tracking-wider uppercase mb-4">
            Investor Relations
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            We don&apos;t need your money.
            <br />
            <span className="text-[var(--text-muted)]">
              But we might want your partnership.
            </span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Airlock is bootstrapped, profitable-by-design, and building the
            operating system for enterprise data operations. We&apos;re not
            raising out of desperation. We&apos;re looking for partners who
            understand what we&apos;re building and want to accelerate it.
          </p>
        </motion.div>
      </section>

      {/* ── The Anti-Pitch ── */}
      <section className="py-20 px-6 border-t border-[var(--border-subtle)]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            <motion.h2
              variants={staggerItem}
              className="text-2xl md:text-3xl font-bold mb-8"
            >
              A note on how we think about capital
            </motion.h2>
            <motion.div
              variants={staggerItem}
              className="space-y-6 text-[var(--text-secondary)] leading-relaxed"
            >
              <p>
                Most AI startups burn venture capital to subsidize inference
                costs, pray for scale, and figure out unit economics later. Our
                unit economics already work. We ran 18,000+ LLM calls across 17
                personas and 15 models and found that enterprise-grade multi-agent
                deliberation costs{' '}
                <span className="text-[var(--accent-primary)] font-semibold">
                  $0.0036 per run
                </span>
                . Our Pro tier has{' '}
                <span className="text-[var(--accent-primary)] font-semibold">
                  91% gross margin
                </span>
                . Our BYOK tier is{' '}
                <span className="text-[var(--accent-primary)] font-semibold">
                  100% margin
                </span>
                .
              </p>
              <p>
                We&apos;re not looking for money to keep the lights on. We&apos;re
                looking for capital that accelerates distribution — enterprise
                sales, compliance certifications (SOC 2, FedRAMP), and ecosystem
                partnerships.
              </p>
              <p className="text-[var(--text-muted)] italic border-l-2 border-[var(--accent-primary)]/30 pl-4">
                If your term sheet includes 2x liquidation preferences,
                full-ratchet anti-dilution, or board seats that outnumber
                founders — thanks, but we&apos;re good. We&apos;d rather grow
                slower and own what we build.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Proof Points (Animated Counters) ── */}
      <section className="py-20 px-6 bg-[var(--bg-raised)]">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold mb-4 text-center"
          >
            The numbers speak for themselves
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[var(--text-muted)] text-center mb-12 max-w-xl mx-auto"
          >
            ConstellationBench + Sovereign Triads — 18,000+ LLM calls across
            17 personas, 15 models, and 3 adversarial stress layers.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            {proofPoints.map((point) => {
              const Icon = point.icon
              return (
                <motion.div
                  key={point.label}
                  variants={staggerItem}
                  className="p-6 rounded-xl bg-[var(--bg-overlay)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/30 transition-colors"
                >
                  <Icon className="w-5 h-5 text-[var(--accent-primary)] mb-3" />
                  <p className="text-3xl font-bold font-mono text-[var(--accent-primary)] mb-1">
                    <AnimatedCounter
                      target={point.target}
                      prefix={point.prefix}
                      suffix={point.suffix}
                      decimals={point.decimals || 0}
                    />
                  </p>
                  <p className="text-sm font-semibold text-[var(--text-secondary)] mb-2">
                    {point.label}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {point.detail}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Unit Economics ── */}
      <section className="py-20 px-6 border-t border-[var(--border-subtle)]">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold mb-4"
          >
            Unit economics that actually work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[var(--text-muted)] mb-10 max-w-2xl"
          >
            Every number below comes from real ConstellationBench data. No
            projections. No &ldquo;at scale&rdquo; hand-waving.
          </motion.p>

          <motion.div
            className="overflow-x-auto"
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-primary)]">
                  <th className="text-left py-3 px-4 text-[var(--text-muted)] font-mono text-xs uppercase tracking-wider">
                    Tier
                  </th>
                  <th className="text-left py-3 px-4 text-[var(--text-muted)] font-mono text-xs uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 text-[var(--text-muted)] font-mono text-xs uppercase tracking-wider">
                    COGS / Council
                  </th>
                  <th className="text-left py-3 px-4 text-[var(--text-muted)] font-mono text-xs uppercase tracking-wider">
                    Monthly COGS
                  </th>
                  <th className="text-left py-3 px-4 text-[var(--text-muted)] font-mono text-xs uppercase tracking-wider">
                    Gross Margin
                  </th>
                </tr>
              </thead>
              <tbody>
                {unitEconomics.map((row) => (
                  <motion.tr
                    key={row.tier}
                    variants={staggerItem}
                    className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-overlay)]/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <span className="font-semibold text-[var(--text-primary)]">
                        {row.tier}
                      </span>
                      <br />
                      <span className="text-xs text-[var(--text-muted)]">
                        {row.model}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono text-[var(--text-primary)]">
                      {row.price}
                    </td>
                    <td className="py-4 px-4 font-mono text-[var(--accent-primary)]">
                      {row.costPerCouncil}
                    </td>
                    <td className="py-4 px-4 font-mono text-[var(--text-secondary)]">
                      {row.monthlyCogsAt30}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono font-bold w-20 ${
                            row.margin === '100%'
                              ? 'text-[var(--chamber-ship)]'
                              : row.margin === 'Subsidized'
                                ? 'text-[var(--text-muted)]'
                                : 'text-[var(--accent-primary)]'
                          }`}
                        >
                          {row.margin}
                        </span>
                        {row.marginPct > 0 && (
                          <div className="w-20 h-2 rounded-full bg-[var(--bg-base)] hidden md:block">
                            <motion.div
                              className="h-2 rounded-full"
                              style={{
                                backgroundColor:
                                  row.marginPct === 100
                                    ? 'var(--chamber-ship)'
                                    : 'var(--accent-primary)',
                              }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${row.marginPct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.3 }}
                            />
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-[var(--text-muted)]">
                        {row.note}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xs text-[var(--text-muted)] mt-6 italic"
          >
            Monthly COGS assumes 30 council runs/month per user. Actual usage
            varies. All costs from OpenRouter API pricing as of March 2026.
          </motion.p>
        </div>
      </section>

      {/* ── Why Now ── */}
      <section className="py-20 px-6 bg-[var(--bg-raised)]">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold mb-12 text-center"
          >
            Why this moment matters
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            {whyNow.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  variants={staggerItem}
                  className="p-6 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent-primary)]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[var(--accent-primary)]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.body}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── What We're Building ── */}
      <section className="py-20 px-6 border-t border-[var(--border-subtle)]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            <motion.h2
              variants={staggerItem}
              className="text-2xl md:text-3xl font-bold mb-8"
            >
              The product
            </motion.h2>
            <motion.div
              variants={staggerItem}
              className="space-y-6 text-[var(--text-secondary)] leading-relaxed"
            >
              <p>
                Airlock is an enterprise data operations platform with a
                unified interface. Contracts, CRM, project management,
                calendar, and documents — unified in one workspace with AI
                councils that deliberate on business decisions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                {[
                  {
                    label: 'Architecture',
                    value: '8 repos, 7 MCP servers, FastAPI + Next.js 14',
                  },
                  {
                    label: 'AI Layer',
                    value: 'Multi-persona councils with DECF behavioral profiles',
                  },
                  {
                    label: 'Moat',
                    value: 'Orchestration platform, not an API wrapper. BYOK = pure margin.',
                  },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="p-4 rounded-lg bg-[var(--bg-overlay)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/20 transition-colors"
                  >
                    <p className="text-xs font-mono text-[var(--accent-primary)] uppercase tracking-wider mb-1">
                      {card.label}
                    </p>
                    <p className="text-sm text-[var(--text-primary)]">
                      {card.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── The Founder ── */}
      <section className="py-20 px-6 bg-[var(--bg-raised)]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            <motion.h2
              variants={staggerItem}
              className="text-2xl md:text-3xl font-bold mb-8"
            >
              The founder
            </motion.h2>
            <motion.div
              variants={staggerItem}
              className="flex flex-col md:flex-row gap-8"
            >
              <div className="flex-1 space-y-4 text-[var(--text-secondary)] leading-relaxed">
                <p className="text-lg text-[var(--text-primary)] font-semibold">
                  Zac Holwerda
                </p>
                {/* Career arc */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {['Military Intel', 'Investing', 'Community', 'Platform'].map(
                    (phase, i) => (
                      <span key={phase} className="flex items-center gap-1.5">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--accent-primary)]">
                          {phase}
                        </span>
                        {i < 3 && (
                          <span className="text-[var(--text-muted)] text-xs">→</span>
                        )}
                      </span>
                    ),
                  )}
                </div>
                <p>
                  Military Intelligence Analyst turned investment researcher
                  turned community builder turned platform founder. The
                  through-line: due diligence and data lifecycle integrity.
                </p>
                <p>
                  Built and led the Brain Brigade community (Discord, 2020+).
                  Published investment DD research on Substack. Wrote about
                  ethical community design on Medium. Now applying that same
                  obsession with structured analysis to enterprise operations.
                </p>
                <p className="text-[var(--text-muted)] text-sm italic border-l-2 border-[var(--accent-primary)]/30 pl-4">
                  Every feature in Airlock exists because Zac needed it and
                  couldn&apos;t find it. The platform is opinionated because the
                  founder is opinionated. That&apos;s not a bug.
                </p>
                <div className="flex gap-3 pt-2">
                  {[
                    { label: 'LinkedIn', href: 'https://linkedin.com/in/zacthebuilder' },
                    { label: 'Substack', href: 'https://smartrickpicks.substack.com' },
                    { label: 'GitHub', href: 'https://github.com/smartrickpicks' },
                  ].map((link, i) => (
                    <span key={link.label} className="flex items-center gap-2">
                      {i > 0 && <span className="text-[var(--border-primary)]">|</span>}
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-[var(--accent-primary)] hover:underline"
                      >
                        {link.label}
                      </a>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Use of Funds (Animated Bars) ── */}
      <section className="py-20 px-6 border-t border-[var(--border-subtle)]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            <motion.h2
              variants={staggerItem}
              className="text-2xl md:text-3xl font-bold mb-8"
            >
              If we raised, here&apos;s where it goes
            </motion.h2>
            <motion.div variants={staggerItem} className="space-y-5">
              {useOfFunds.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.label}
                    variants={staggerItem}
                    className="p-5 rounded-xl bg-[var(--bg-overlay)] border border-[var(--border-subtle)]"
                  >
                    <div className="flex gap-4 items-start mb-3">
                      <div
                        className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg"
                        style={{ backgroundColor: `color-mix(in srgb, ${item.color} 15%, transparent)` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-mono font-bold text-lg" style={{ color: item.color }}>
                            {item.pct}%
                          </span>
                          <span className="font-semibold text-[var(--text-primary)]">
                            {item.label}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--text-muted)]">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                    {/* Animated bar */}
                    <div className="w-full h-2 rounded-full bg-[var(--bg-base)]">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.pct}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: 0.2 + i * 0.15,
                          ease: 'easeOut',
                        }}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-[var(--bg-raised)] border-t border-[var(--border-subtle)]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Interested?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-lg mx-auto leading-relaxed">
              We&apos;re open to conversations with investors who bring more
              than capital — industry expertise, enterprise distribution, or
              technical depth in AI infrastructure. No pitch deck on request. We
              prefer real conversations.
            </p>
            <a
              href="mailto:invest@brainbrigade.xyz"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-base)] font-semibold text-sm hover:opacity-90 transition-opacity btn-shimmer"
            >
              invest@brainbrigade.xyz
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-xs text-[var(--text-muted)] mt-6 max-w-md mx-auto">
              Brain Brigade Inc. &middot; This page is informational only and
              does not constitute an offer to sell securities. All financial data
              reflects actual benchmark results and current pricing, not
              projections.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
