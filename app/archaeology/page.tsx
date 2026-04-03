'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Types ──────────────────────────────────────────────────────── */

interface CAProfile {
  domain: number
  normative: number
  situational: number
  topographic: number
  historical: number
}

interface InflectionPoint {
  commit_sha: string
  timestamp: string
  type: string
  description: string
  magnitude: number
  files_involved: string[]
}

interface Phase {
  start: string
  end: string
  commits: number
  label: string
  dominant_knowledge_source: string
  summary: string
  inflection_points: InflectionPoint[]
}

interface Dig {
  repo: string
  total_commits: number
  lifespan_days: number
  phases: Phase[]
  inflection_points: InflectionPoint[]
  ca_profile: CAProfile
  field_manual: string | null
  benchmark_specs: unknown[]
}

interface RepoSummary {
  slug: string
  repo: string
  total_commits: number
  lifespan_days: number
  phases: number
  inflection_points: number
  dominant_ks: string
  ca_profile: CAProfile
  material_tier: string
}

interface KnowledgeGraph {
  repo_count: number
  last_updated: string
  repos: RepoSummary[]
  ca_distribution_avg: CAProfile
  phase_label_frequency: Record<string, number>
  inflection_type_frequency: Record<string, number>
  ks_dominant_frequency: Record<string, number>
  learnings: string[]
}

/* ── Constants ──────────────────────────────────────────────────── */

const KS_COLORS: Record<string, string> = {
  domain: '#4A90D9',
  normative: '#7C5CFC',
  situational: '#E8A838',
  topographic: '#50C878',
  historical: '#DC143C',
}

const KS_LABELS: Record<string, string> = {
  domain: 'Domain',
  normative: 'Normative',
  situational: 'Situational',
  topographic: 'Topographic',
  historical: 'Historical',
}

const KS_SUBTITLES: Record<string, string> = {
  domain: 'Feature work, API design, system modeling',
  normative: 'Governance, CI/CD, testing, policy',
  situational: 'Bug fixes, incident response, hotfixes',
  topographic: 'Exploration, prototyping, spikes',
  historical: 'Rewrites, migrations, refactoring',
}

const TIER_LABELS: Record<string, string> = {
  luxury: 'Luxury',
  premium: 'Premium',
  standard: 'Standard',
  free: 'Free',
}

const TIER_ORDER: Record<string, number> = { luxury: 0, premium: 1, standard: 2, free: 3 }

const KS_ORDER = ['domain', 'normative', 'situational', 'topographic', 'historical'] as const

const PASSWORD = 'culture'

/* ── Password Gate ──────────────────────────────────────────────── */

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const submit = () => {
    if (value.toLowerCase().trim() === PASSWORD) {
      sessionStorage.setItem('archaeology-auth', '1')
      onUnlock()
    } else {
      setError(true)
      setValue('')
      setTimeout(() => setError(false), 1500)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="text-center"
      >
        <div
          className="text-xs font-bold tracking-[3px] uppercase mb-6"
          style={{ color: 'var(--text-muted)' }}
        >
          Software Archaeology
        </div>

        <h1
          className="text-4xl font-black tracking-tight mb-2"
          style={{
            background: 'linear-gradient(135deg, var(--text-primary), #7C5CFC)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Restricted Access
        </h1>

        <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
          Cultural Algorithm analysis of open-source repositories
        </p>

        <div className="flex gap-3 items-center justify-center">
          <input
            ref={inputRef}
            type="password"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="Password"
            className="font-mono text-sm px-4 py-3 rounded-lg outline-none transition-all duration-200"
            style={{
              background: 'var(--bg-sunken)',
              border: `1px solid ${error ? '#EF4444' : 'var(--border-primary)'}`,
              color: 'var(--text-primary)',
              width: 220,
            }}
          />
          <button
            onClick={submit}
            className="px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: '#7C5CFC' }}
          >
            Enter
          </button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs mt-4"
              style={{ color: '#EF4444' }}
            >
              Incorrect password
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className="font-mono text-[10px] mt-12"
          style={{ color: 'var(--text-muted)' }}
        >
          Airlock Technologies &middot; Reynolds, 1994
        </div>
      </motion.div>
    </div>
  )
}

/* ── Mini CA Bar (stacked segments) ─────────────────────────────── */

function MiniCA({ profile }: { profile: CAProfile }) {
  const total = Object.values(profile).reduce((s, v) => s + v, 0) || 1
  return (
    <div className="flex gap-[3px] h-[6px] rounded-[3px] overflow-hidden">
      {KS_ORDER.map(ks => {
        const w = (profile[ks] / total) * 100
        if (w < 0.5) return null
        return (
          <motion.div
            key={ks}
            initial={{ width: 0 }}
            animate={{ width: `${w}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="rounded-[3px]"
            style={{ background: KS_COLORS[ks] }}
          />
        )
      })}
    </div>
  )
}

/* ── Repo Card ──────────────────────────────────────────────────── */

function RepoCard({ repo, onClick }: { repo: RepoSummary; onClick: () => void }) {
  const parts = repo.repo.replace('https://github.com/', '').split('/')
  const org = parts[0] || ''
  const name = parts[1] || repo.slug
  const tier = repo.material_tier || 'standard'
  const dominant = Object.entries(repo.ca_profile).sort((a, b) => b[1] - a[1])[0]
  const domKs = dominant?.[0] || 'domain'
  const domPct = dominant ? (dominant[1] * 100).toFixed(0) : '0'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(124, 92, 252, 0.15)' }}
      onClick={onClick}
      className="p-5 rounded-xl cursor-pointer transition-colors duration-200"
      style={{
        background: 'var(--bg-raised)',
        border: '1px solid var(--border-primary)',
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{name}</div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{org}</div>
        </div>
        <span
          className="font-mono text-[9px] font-bold tracking-[1.5px] uppercase px-2.5 py-1 rounded-full"
          style={{
            color: tier === 'luxury' ? '#7C5CFC' : tier === 'premium' ? '#00D1FF' : tier === 'standard' ? '#94A3B8' : '#64748B',
            border: '1px solid',
            borderColor: tier === 'luxury' ? '#7C5CFC' : tier === 'premium' ? '#00D1FF' : tier === 'standard' ? '#94A3B8' : '#64748B',
            background: tier === 'luxury' ? 'rgba(124,92,252,0.1)' : tier === 'premium' ? 'rgba(0,209,255,0.1)' : 'rgba(148,163,184,0.1)',
          }}
        >
          {TIER_LABELS[tier] || tier}
        </span>
      </div>

      <div className="font-mono text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
        <span className="mr-3">{repo.total_commits} commits</span>
        <span className="mr-3">{repo.phases} phases</span>
        <span>{repo.inflection_points} inflections</span>
      </div>

      <MiniCA profile={repo.ca_profile} />

      <div className="text-xs font-semibold mt-3" style={{ color: KS_COLORS[domKs] }}>
        {KS_LABELS[domKs]}-dominant &middot; {domPct}%
      </div>
    </motion.div>
  )
}

/* ── Detail Overlay ─────────────────────────────────────────────── */

function DetailOverlay({
  dig,
  slug,
  onClose,
}: {
  dig: Dig
  slug: string
  onClose: () => void
}) {
  const parts = dig.repo.replace('https://github.com/', '').split('/')
  const name = parts[1] || slug
  const org = parts[0] || ''

  const sortedCA = Object.entries(dig.ca_profile).sort((a, b) => b[1] - a[1])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      className="fixed inset-0 z-50 flex items-start justify-center p-10 overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-full max-w-[900px] rounded-2xl p-8 relative"
        style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-primary)' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-base transition-colors"
          style={{
            background: 'var(--bg-overlay)',
            border: '1px solid var(--border-primary)',
            color: 'var(--text-secondary)',
          }}
        >
          &times;
        </button>

        <h2 className="text-2xl font-extrabold tracking-tight">{name}</h2>
        <div className="font-mono text-[13px] mb-6" style={{ color: 'var(--text-muted)' }}>
          {org} &middot; {dig.total_commits} commits &middot; {dig.lifespan_days} days &middot;{' '}
          {dig.phases.length} phases &middot; {dig.inflection_points.length} inflection points &middot;{' '}
          <a
            href={dig.repo}
            target="_blank"
            rel="noopener"
            className="no-underline hover:underline"
            style={{ color: 'var(--accent-primary)' }}
          >
            GitHub &rarr;
          </a>
        </div>

        {/* CA Profile */}
        <SectionTitle>Cultural Algorithm Profile</SectionTitle>
        <div className="mb-7">
          {sortedCA.map(([ks, weight]) => {
            const pct = (weight * 100).toFixed(1)
            return (
              <div key={ks} className="flex items-center gap-3 mb-2">
                <div className="w-[180px] text-right text-[13px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {KS_LABELS[ks] || ks}
                </div>
                <div className="flex-1 h-6 rounded overflow-hidden" style={{ background: 'var(--bg-sunken)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                    className="h-full rounded"
                    style={{ background: KS_COLORS[ks] }}
                  />
                </div>
                <div className="w-12 font-mono text-[13px]" style={{ color: 'var(--text-muted)' }}>
                  {pct}%
                </div>
              </div>
            )
          })}
        </div>

        {/* Phase Timeline */}
        <SectionTitle>Growth Timeline</SectionTitle>
        <div className="relative pl-6" style={{ borderLeft: '2px solid var(--border-primary)' }}>
          {dig.phases.map((p, i) => {
            const color = KS_COLORS[p.dominant_knowledge_source] || '#888'
            const label = p.label.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
            const ipCount = p.inflection_points.length

            return (
              <div key={i} className="relative py-3 pl-5">
                <div
                  className="absolute -left-[29px] top-[18px] w-3 h-3 rounded-full"
                  style={{ border: '2px solid var(--border-primary)', background: 'var(--bg-base)' }}
                />
                <div className="text-sm font-semibold" style={{ color }}>
                  Phase {i + 1}: {label}
                </div>
                <div className="font-mono text-[11px] mb-1" style={{ color: 'var(--text-muted)' }}>
                  {p.commits} commits &middot; {KS_LABELS[p.dominant_knowledge_source]}-dominant
                  {ipCount > 0 && ` · ${ipCount} inflection${ipCount > 1 ? 's' : ''}`}
                </div>
                <div className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {p.summary.slice(0, 200)}
                </div>
                {p.inflection_points.map((ip, j) => (
                  <span
                    key={j}
                    className="inline-block font-mono text-[10px] font-semibold px-2 py-0.5 rounded mt-1.5 mr-1"
                    style={{ background: 'rgba(220,20,60,0.15)', color: '#DC143C' }}
                  >
                    {ip.type} &middot; magnitude {ip.magnitude.toFixed(2)}
                  </span>
                ))}
              </div>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Helpers ─────────────────────────────────────────────────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[11px] font-bold tracking-[2px] uppercase mb-5 pb-2"
      style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-primary)' }}
    >
      {children}
    </div>
  )
}

/* ── Main Dashboard ─────────────────────────────────────────────── */

function Dashboard() {
  const [graph, setGraph] = useState<KnowledgeGraph | null>(null)
  const [digs, setDigs] = useState<Record<string, Dig>>({})
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/archaeology-data.json')
      .then(r => r.json())
      .then(data => {
        setGraph(data.graph)
        setDigs(data.digs)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const repos = graph?.repos || []
  const sorted = [...repos].sort((a, b) => {
    const ta = TIER_ORDER[a.material_tier] ?? 2
    const tb = TIER_ORDER[b.material_tier] ?? 2
    if (ta !== tb) return ta - tb
    return (b.total_commits || 0) - (a.total_commits || 0)
  })

  const totalCommits = repos.reduce((s, d) => s + (d.total_commits || 0), 0)
  const totalPhases = repos.reduce((s, d) => s + (d.phases || 0), 0)
  const totalInflections = repos.reduce((s, d) => s + (d.inflection_points || 0), 0)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
        <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading excavation data&hellip;</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Hero */}
      <div className="relative text-center pt-16 pb-10 px-10 overflow-hidden">
        <div
          className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none opacity-50"
          style={{ background: 'radial-gradient(ellipse, rgba(124,92,252,0.3) 0%, transparent 70%)' }}
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black tracking-[-2px] mb-2 relative"
          style={{
            background: 'linear-gradient(135deg, var(--text-primary), #7C5CFC)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Software Archaeology
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base relative"
          style={{ color: 'var(--text-secondary)' }}
        >
          Cultural Algorithm analysis of open-source repositories &mdash;{' '}
          <span style={{ color: 'var(--accent-primary)' }}>Reynolds, 1994</span>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-10 px-10 pb-4">
        {[
          { value: graph?.repo_count || repos.length, label: 'Repositories' },
          { value: totalCommits.toLocaleString(), label: 'Commits Analyzed' },
          { value: totalPhases, label: 'Growth Phases' },
          { value: totalInflections, label: 'Inflection Points' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="text-center"
          >
            <div className="font-mono text-4xl font-bold" style={{ color: 'var(--accent-primary)' }}>
              {s.value}
            </div>
            <div className="text-[11px] font-bold tracking-[2px] uppercase mt-1.5" style={{ color: 'var(--text-muted)' }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Citation */}
      <div className="text-center py-6 px-10">
        <p className="text-[15px] italic leading-relaxed max-w-[700px] mx-auto" style={{ color: 'var(--text-secondary)' }}>
          &ldquo;A Cultural Algorithm maintains a <strong className="not-italic" style={{ color: 'var(--text-primary)' }}>belief space</strong> that
          evolves alongside its <strong className="not-italic" style={{ color: 'var(--text-primary)' }}>population space</strong>, using five knowledge
          sources to guide collective intelligence.&rdquo;
        </p>
      </div>

      {/* CA Distribution */}
      {graph?.ca_distribution_avg && (
        <div className="max-w-[1200px] mx-auto px-10 py-10">
          <SectionTitle>Cross-Repository Knowledge Source Distribution</SectionTitle>
          <div className="grid grid-cols-5 gap-3 max-md:grid-cols-1">
            {KS_ORDER.map(ks => {
              const pct = (graph.ca_distribution_avg[ks] || 0) * 100
              return (
                <motion.div
                  key={ks}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                  className="relative overflow-hidden rounded-lg p-4 transition-colors"
                  style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-primary)' }}
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-b-[7px] opacity-15"
                    style={{ background: KS_COLORS[ks], height: `${pct}%` }}
                  />
                  <div className="relative text-[13px] font-semibold mb-1" style={{ color: KS_COLORS[ks] }}>
                    {KS_LABELS[ks]}
                  </div>
                  <div className="relative text-[11px] leading-snug" style={{ color: 'var(--text-muted)' }}>
                    {KS_SUBTITLES[ks]}
                  </div>
                  <div className="relative font-mono text-3xl font-bold mt-3" style={{ color: KS_COLORS[ks] }}>
                    {pct.toFixed(0)}%
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Repo Grid */}
      <div className="max-w-[1200px] mx-auto px-10 py-10">
        <SectionTitle>Excavation Archive</SectionTitle>
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
          {sorted.map((repo, i) => (
            <motion.div key={repo.slug} transition={{ delay: i * 0.05 }}>
              <RepoCard repo={repo} onClick={() => setSelectedSlug(repo.slug)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Learnings */}
      {graph?.learnings && graph.learnings.length > 0 && (
        <div className="max-w-[1200px] mx-auto px-10 py-10">
          <SectionTitle>Emergent Patterns</SectionTitle>
          <ul className="space-y-2">
            {graph.learnings.map((l, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm leading-relaxed py-3 px-4 pl-9 rounded-lg relative"
                style={{
                  background: 'var(--bg-raised)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-secondary)',
                }}
              >
                <span
                  className="absolute left-4 top-[17px] w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--accent-primary)' }}
                />
                {l}
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer */}
      <div
        className="text-center py-8 px-10 font-mono text-[10px] max-w-[1200px] mx-auto mt-10"
        style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border-primary)' }}
      >
        Software Archaeology Engine &middot; Cultural Algorithm framework (Reynolds, 1994) &middot;{' '}
        <span style={{ color: '#7C5CFC' }}>built by otto</span> &middot;{' '}
        {new Date().toISOString().slice(0, 10)}
      </div>

      {/* Detail overlay */}
      <AnimatePresence>
        {selectedSlug && digs[selectedSlug] && (
          <DetailOverlay
            dig={digs[selectedSlug]}
            slug={selectedSlug}
            onClose={() => setSelectedSlug(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Page Export ─────────────────────────────────────────────────── */

export default function ArchaeologyPage() {
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('archaeology-auth') === '1') {
      setAuthed(true)
    }
  }, [])

  // ESC to close detail
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // handled by overlay click
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  if (!authed) {
    return <PasswordGate onUnlock={() => setAuthed(true)} />
  }

  return <Dashboard />
}
