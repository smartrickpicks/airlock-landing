'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  DollarSign,
  Clock,
  CheckCircle2,
  Users,
  Zap,
  TrendingUp,
  ChevronDown,
  ArrowUpDown,
  Download,
} from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AnimatedCounter from '@/components/AnimatedCounter'
import ParetoChart from '@/components/ParetoChart'
import ModelCard from '@/components/ModelCard'
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/animations'

/* ── Model Tier Data (ConstellationBench, March 2026) ────────── */
const modelTiers = [
  { name: 'Opus 4.6', brand: 'The Heavyweight', score: 0.589, cost: 0.1714, latency: 28.2, json: 99.2, provider: 'Anthropic', rank: 1 },
  { name: 'Sonnet 4.6', brand: 'The Professional', score: 0.578, cost: 0.0298, latency: 12.6, json: 100, provider: 'Anthropic', rank: 2 },
  { name: 'Gemini 2.5 Pro', brand: 'The Essayist', score: 0.578, cost: 0.0741, latency: 22.8, json: 100, provider: 'Google', rank: 3 },
  { name: 'Gemini 2.5 Flash', brand: 'The Flash', score: 0.577, cost: 0.0036, latency: 3.4, json: 100, provider: 'Google', rank: 4 },
  { name: 'Kimi K2.5', brand: 'The Scholar', score: 0.575, cost: 0.0162, latency: 98.1, json: 99.2, provider: 'Moonshot', rank: 5 },
  { name: 'Haiku 4.5', brand: 'The Prodigy', score: 0.570, cost: 0.0074, latency: 6.5, json: 96.7, provider: 'Anthropic', rank: 6 },
  { name: 'Grok 4.1 Fast', brand: 'The Maverick', score: 0.569, cost: 0.0023, latency: 14.3, json: 100, provider: 'xAI', rank: 7 },
  { name: 'Mistral Large', brand: 'The Diplomat', score: 0.569, cost: 0.0023, latency: 6.4, json: 98.3, provider: 'Mistral', rank: 8 },
  { name: 'Nemotron 120B', brand: 'The Phantom', score: 0.566, cost: 0, latency: 51.3, json: 99.2, provider: 'NVIDIA', rank: 9 },
  { name: 'Grok 3 Mini', brand: 'The Scrapper', score: 0.565, cost: 0.0026, latency: 15.6, json: 100, provider: 'xAI', rank: 10 },
  { name: 'Qwen3 235B', brand: 'The Ghost', score: 0.558, cost: 0.0002, latency: 18.2, json: 97.5, provider: 'Alibaba', rank: 11 },
  { name: 'DeepSeek R1', brand: 'The Thinker', score: 0.552, cost: 0.0078, latency: 25.7, json: 100, provider: 'DeepSeek', rank: 12 },
  { name: 'DeepSeek V3', brand: 'The Intern', score: 0.543, cost: 0.0011, latency: 6.9, json: 100, provider: 'DeepSeek', rank: 13 },
  { name: 'GPT-4o', brand: 'The Speed Demon', score: 0.541, cost: 0.0095, latency: 2.7, json: 100, provider: 'OpenAI', rank: 14 },
]

const modelCardData = [
  { ...modelTiers[3], tagline: 'Fast and smart. The new default for production councils.', badge: 'BEST VALUE' },
  { ...modelTiers[1], tagline: 'Never fails. 100% JSON. Tight latency. The professional choice.', badge: 'MOST RELIABLE' },
  { ...modelTiers[0], tagline: 'When the decision matters most. Deepest deliberation quality.', badge: 'HIGHEST QUALITY' },
  { ...modelTiers[5], tagline: 'The previous champion. Still punches above its weight.', badge: undefined },
  { ...modelTiers[6], tagline: 'Wild perspectives. Genuine disagreement. Never boring.', badge: undefined },
  { ...modelTiers[7], tagline: 'Diplomatic and consistent. Strong structured output.', badge: undefined },
  { ...modelTiers[8], tagline: 'Zero cost. 120B params running free. The free-tier hero.', badge: 'FREE' },
  { ...modelTiers[9], tagline: 'Scrappy value play. Penny councils with attitude.', badge: undefined },
  { ...modelTiers[10], tagline: 'Nearly free. 235B params at $0.0002/council. Ghost mode.', badge: undefined },
  { ...modelTiers[4], tagline: 'Deep knowledge, slow delivery. The patient scholar.', badge: undefined },
  { ...modelTiers[11], tagline: 'Thinks hard but flat conviction. Poor persona differentiation.', badge: undefined },
  { ...modelTiers[12], tagline: 'Cheap and fast but shallow. Entry-level deliberation.', badge: undefined },
  { ...modelTiers[13], tagline: 'Fast responses, uniform opinions. All personas agree. Not ideal.', badge: 'FASTEST' },
  { ...modelTiers[2], tagline: 'Verbose and thorough. Writes essays where bullets would do.', badge: undefined },
]

const keyFindings = [
  {
    icon: TrendingUp,
    title: 'Quality is nearly flat across the price spectrum',
    body: 'The gap between the best model (0.589) and the 14th-ranked model (0.541) is just 8.1%. But cost spans 857x. You\'re paying exponentially more for marginal quality gains.',
  },
  {
    icon: DollarSign,
    title: '9 models run a council for under a penny',
    body: 'At $0.0002 to $0.0095 per council run, multi-agent deliberation is no longer a luxury feature. It\'s infrastructure-cheap — comparable to a database query, not a consulting engagement.',
  },
  {
    icon: Zap,
    title: 'Gemini Flash changed everything',
    body: 'Scoring 0.577 at $0.0036 and 3.4 seconds, it delivers 97.9% of the best model\'s quality at 2.1% of the cost. This single model makes free-tier multi-agent AI economically viable.',
  },
  {
    icon: Users,
    title: 'Not all models can roleplay',
    body: 'GPT-4o and DeepSeek V3 produce uniform conviction scores (all personas agree). Anthropic models and Grok produce the widest conviction ranges — genuine disagreement between personas. Multi-agent systems need models that differentiate, not just generate.',
  },
  {
    icon: CheckCircle2,
    title: '8 of 14 models hit 100% structured output',
    body: 'JSON compliance across 120 perspectives each. The structured output problem is effectively solved for the majority of frontier models. Multi-agent orchestration is reliable.',
  },
]

const methodology = [
  { label: 'Queries', value: 30, detail: '8 discover, 8 build, 7 ship, 7 audit — spanning enterprise data-ops scenarios' },
  { label: 'Models', value: 15, detail: 'From 8 providers: Anthropic, Google, OpenAI, xAI, DeepSeek, Mistral, Qwen, NVIDIA' },
  { label: 'Council size', value: 4, detail: 'Personas per council, each with distinct DECF behavioral profiles (Dominance, Extraversion, Patience, Formality)' },
  { label: 'Total perspectives', value: 1800, detail: 'Individual AI perspective responses scored across 4 dimensions' },
  { label: 'Scoring dimensions', value: 4, detail: 'Persona adherence (30%), deliberation diversity (25%), response quality (25%), JSON compliance (20%)' },
  { label: 'Total cost', value: 9.85, prefix: '$', decimals: 2, detail: 'For the entire 450-run benchmark suite' },
]

type SortKey = 'rank' | 'score' | 'cost' | 'latency' | 'json'

function ScoreBar({ score }: { score: number }) {
  const width = ((score - 0.5) / 0.1) * 100
  return (
    <div className="w-full bg-[var(--bg-base)] rounded-full h-2">
      <motion.div
        className="h-2 rounded-full bg-[var(--chamber-ship)]"
        initial={{ width: 0 }}
        whileInView={{ width: `${Math.min(Math.max(width, 5), 100)}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </div>
  )
}

function CostBar({ cost, maxCost }: { cost: number; maxCost: number }) {
  const width = cost === 0 ? 2 : Math.max((cost / maxCost) * 100, 2)
  return (
    <div className="w-full bg-[var(--bg-base)] rounded-full h-2">
      <motion.div
        className="h-2 rounded-full bg-[var(--chamber-discover)]"
        initial={{ width: 0 }}
        whileInView={{ width: `${width}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </div>
  )
}

export default function ResearchPage() {
  const [sortKey, setSortKey] = useState<SortKey>('rank')
  const [sortAsc, setSortAsc] = useState(true)
  const [showAllCards, setShowAllCards] = useState(false)
  const maxCost = Math.max(...modelTiers.map((m) => m.cost))

  const sortedTiers = [...modelTiers].sort((a, b) => {
    const dir = sortAsc ? 1 : -1
    if (sortKey === 'rank') return (a.rank - b.rank) * dir
    if (sortKey === 'score') return (b.score - a.score) * dir
    if (sortKey === 'cost') return (a.cost - b.cost) * dir
    if (sortKey === 'latency') return (a.latency - b.latency) * dir
    if (sortKey === 'json') return (b.json - a.json) * dir
    return 0
  })

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc)
    } else {
      setSortKey(key)
      setSortAsc(key === 'rank' || key === 'cost' || key === 'latency')
    }
  }

  const SortHeader = ({ label, colKey }: { label: string; colKey: SortKey }) => (
    <th
      className="text-left py-3 px-3 text-[var(--text-muted)] font-mono text-xs uppercase tracking-wider cursor-pointer hover:text-[var(--accent-primary)] transition-colors select-none"
      onClick={() => handleSort(colKey)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {sortKey === colKey && (
          <ArrowUpDown className="w-3 h-3 text-[var(--accent-primary)]" />
        )}
      </span>
    </th>
  )

  const visibleCards = showAllCards ? modelCardData : modelCardData.slice(0, 3)

  return (
    <main className="bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Nav />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--chamber-ship)]/5 via-transparent to-transparent" />
        <motion.div
          className="max-w-4xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm font-mono text-[var(--chamber-ship)] tracking-wider uppercase mb-4">
            ConstellationBench &middot; March 2026
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            We benchmarked 15 AI models
            <br />
            <span className="text-[var(--text-muted)]">
              in 450 multi-agent council runs.
            </span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed mb-10">
            ConstellationBench is our internal benchmark for multi-persona AI
            deliberation. Each council assembles 4 AI experts with distinct
            behavioral profiles to analyze enterprise decisions. We tested every
            model we could find.
          </p>
          <div className="flex flex-wrap gap-8">
            {[
              { target: 450, suffix: '', label: 'council runs' },
              { target: 1800, suffix: '', label: 'AI perspectives' },
              { target: 15, suffix: '', label: 'models tested' },
              { target: 9.85, prefix: '$', suffix: '', decimals: 2, label: 'total cost', accent: true },
            ].map((stat) => (
              <div key={stat.label}>
                <span className={`font-mono text-3xl font-bold ${stat.accent ? 'text-[var(--accent-primary)]' : 'text-[var(--text-primary)]'}`}>
                  <AnimatedCounter
                    target={stat.target}
                    prefix={stat.prefix || ''}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                    duration={1.2}
                  />
                </span>
                <p className="text-[var(--text-muted)] text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Pareto Chart ── */}
      <section className="py-20 px-6 border-t border-[var(--border-subtle)]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              The quality-cost tradeoff
            </h2>
            <p className="text-[var(--text-muted)] mb-8 max-w-xl">
              Each dot is a model. Y-axis is quality. X-axis is cost. Dot size is latency. Hover for details.
            </p>
          </motion.div>
          <ParetoChart models={modelTiers} />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center text-lg font-semibold text-[var(--text-secondary)] mt-8"
          >
            <span className="text-[var(--accent-primary)]">8%</span> quality spread.{' '}
            <span className="text-[var(--accent-primary)]">857x</span> cost spread.
          </motion.p>
        </div>
      </section>

      {/* ── Key Findings ── */}
      <section className="py-20 px-6 bg-[var(--bg-raised)]">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold mb-12 text-center"
          >
            Key findings
          </motion.h2>
          <motion.div
            className="space-y-6"
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            {keyFindings.map((finding) => {
              const Icon = finding.icon
              return (
                <motion.div
                  key={finding.title}
                  variants={staggerItem}
                  className="flex gap-4 p-6 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/20 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--accent-primary)]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[var(--accent-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{finding.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {finding.body}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Full Leaderboard (Sortable) ── */}
      <section className="py-20 px-6 border-t border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold mb-4"
          >
            The full leaderboard
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[var(--text-muted)] mb-10"
          >
            Click column headers to sort. All data from actual benchmark runs, not synthetic tests.
          </motion.p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-primary)]">
                  <SortHeader label="#" colKey="rank" />
                  <th className="text-left py-3 px-3 text-[var(--text-muted)] font-mono text-xs uppercase tracking-wider">
                    Model
                  </th>
                  <SortHeader label="Quality" colKey="score" />
                  <SortHeader label="Cost/Council" colKey="cost" />
                  <SortHeader label="Latency" colKey="latency" />
                  <SortHeader label="JSON" colKey="json" />
                  <th className="text-left py-3 px-3 text-[var(--text-muted)] font-mono text-xs uppercase tracking-wider">
                    Provider
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedTiers.map((tier) => {
                  const isFlash = tier.name === 'Gemini 2.5 Flash'
                  const isFree = tier.cost === 0
                  return (
                    <tr
                      key={tier.name}
                      className={`border-b transition-colors ${
                        isFlash
                          ? 'border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/[0.03]'
                          : 'border-[var(--border-subtle)] hover:bg-[var(--bg-overlay)]/50'
                      }`}
                    >
                      <td className="py-4 px-3 font-mono text-[var(--text-muted)]">
                        {tier.rank}
                      </td>
                      <td className="py-4 px-3">
                        <span className="font-semibold text-[var(--text-primary)]">
                          {tier.name}
                        </span>
                        <br />
                        <span className="text-xs text-[var(--accent-primary)]">
                          {tier.brand}
                          {isFlash && ' ⚡'}
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[var(--text-primary)] w-12">
                            {tier.score.toFixed(3)}
                          </span>
                          <div className="w-20 hidden md:block">
                            <ScoreBar score={tier.score} />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-2">
                          {isFree ? (
                            <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-[var(--chamber-ship)]/15 text-[var(--chamber-ship)] font-bold">
                              FREE
                            </span>
                          ) : (
                            <span className="font-mono text-[var(--accent-primary)] w-16">
                              ${tier.cost.toFixed(4)}
                            </span>
                          )}
                          <div className="w-20 hidden md:block">
                            <CostBar cost={tier.cost} maxCost={maxCost} />
                          </div>
                          {isFlash && (
                            <span className="text-[10px] font-mono text-[var(--accent-primary)] hidden lg:inline">
                              SWEET SPOT
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-3 font-mono text-[var(--text-secondary)]">
                        {tier.latency}s
                      </td>
                      <td className="py-4 px-3">
                        <span
                          className={`font-mono ${
                            tier.json === 100
                              ? 'text-[var(--chamber-ship)]'
                              : tier.json >= 98
                                ? 'text-[var(--text-secondary)]'
                                : 'text-[var(--chamber-build)]'
                          }`}
                        >
                          {tier.json}%
                        </span>
                      </td>
                      <td className="py-4 px-3 text-[var(--text-muted)] text-xs">
                        {tier.provider}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Model Personality Cards ── */}
      <section className="py-20 px-6 bg-[var(--bg-raised)]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold mb-4 text-center"
          >
            Choose your council
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[var(--text-muted)] text-center mb-12 max-w-xl mx-auto"
          >
            Each model has a personality. Pick the one that fits your use case.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCards.map((model, i) => (
              <ModelCard key={model.name} model={model} index={i} />
            ))}
          </div>
          {!showAllCards && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllCards(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[var(--border-primary)] text-[var(--text-secondary)] text-sm font-medium hover:border-[var(--accent-primary)]/50 hover:text-[var(--text-primary)] transition-colors"
              >
                Show all 14 models
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Methodology ── */}
      <section className="py-20 px-6 border-t border-[var(--border-subtle)]">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold mb-10"
          >
            Methodology
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            {methodology.map((item) => (
              <motion.div
                key={item.label}
                variants={staggerItem}
                className="p-5 rounded-xl bg-[var(--bg-overlay)] border border-[var(--border-subtle)]"
              >
                <p className="font-mono text-2xl font-bold text-[var(--accent-primary)] mb-1">
                  <AnimatedCounter
                    target={item.value}
                    prefix={item.prefix || ''}
                    decimals={item.decimals || 0}
                  />
                </p>
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                  {item.label}
                </p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-[var(--bg-raised)] border-t border-[var(--border-subtle)]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Try it yourself
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
              ConstellationBench is open. Run the same queries against any model
              on OpenRouter and compare your results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-base)] font-semibold text-sm hover:opacity-90 transition-opacity btn-shimmer"
              >
                Join the waitlist
              </a>
              <a
                href="/invest"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg border border-[var(--border-primary)] text-[var(--text-secondary)] font-semibold text-sm hover:border-[var(--accent-primary)]/50 hover:text-[var(--text-primary)] transition-colors"
              >
                Investor relations
              </a>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-8 max-w-md mx-auto">
              ConstellationBench data last updated March 12, 2026. All costs
              reflect OpenRouter API pricing at time of benchmark. Scores are
              composite measures of persona adherence, deliberation diversity,
              response quality, and JSON compliance.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
