'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Profile data (sourced from airlock-persona/profiles/*.yaml) ─────────── */

type Category = 'analytical' | 'social' | 'stabilizing' | 'persistent'

interface Profile {
  id: string
  name: string
  category: Category
  population: number
  drives: { D: number; E: number; C: number; F: number }
  bio: string
}

const PROFILES: Profile[] = [
  { id: 'scholar', name: 'Scholar', category: 'analytical', population: 4.0, drives: { D: 3, E: 2, C: 7, F: 8 }, bio: 'The knowledge-seeker who masters deep domains through disciplined study, valuing accuracy and intellectual rigor.' },
  { id: 'analyzer', name: 'Analyzer', category: 'analytical', population: 7.0, drives: { D: 3, E: 2, C: 8, F: 9 }, bio: 'The meticulous investigator who builds conclusions from evidence, not instinct.' },
  { id: 'strategist', name: 'Strategist', category: 'analytical', population: 4.0, drives: { D: 8, E: 3, C: 3, F: 5 }, bio: 'The big-picture thinker who sees around corners — driving innovation through analytical boldness.' },
  { id: 'specialist', name: 'Specialist', category: 'analytical', population: 3.0, drives: { D: 2, E: 2, C: 9, F: 10 }, bio: 'The deep expert who masters narrow domains through patience, precision, and relentless focus.' },
  { id: 'venturer', name: 'Venturer', category: 'analytical', population: 2.0, drives: { D: 10, E: 3, C: 1, F: 3 }, bio: 'The fiercely independent risk-taker who moves fast, works alone, and trusts gut over consensus.' },
  { id: 'captain', name: 'Captain', category: 'social', population: 3.38, drives: { D: 9, E: 8, C: 2, F: 2 }, bio: 'The natural-born leader with an articulate, authoritative voice.' },
  { id: 'maverick', name: 'Maverick', category: 'social', population: 2.5, drives: { D: 10, E: 8, C: 1, F: 1 }, bio: 'The rarest profile — an independent innovator who breaks every mold.' },
  { id: 'persuader', name: 'Persuader', category: 'social', population: 5.0, drives: { D: 8, E: 9, C: 3, F: 3 }, bio: 'A compelling communicator who drives outcomes through influence and narrative.' },
  { id: 'promoter', name: 'Promoter', category: 'social', population: 4.0, drives: { D: 7, E: 10, C: 2, F: 2 }, bio: 'The enthusiastic motivator who rallies people and builds infectious momentum.' },
  { id: 'collaborator', name: 'Collaborator', category: 'social', population: 7.02, drives: { D: 3, E: 8, C: 7, F: 3 }, bio: 'A team-oriented consensus builder who creates harmony and bridges divides.' },
  { id: 'altruist', name: 'Altruist', category: 'social', population: 6.23, drives: { D: 2, E: 9, C: 8, F: 2 }, bio: 'The empathetic team anchor who builds trust, sustains harmony, and puts people before process.' },
  { id: 'guardian', name: 'Guardian', category: 'stabilizing', population: 6.0, drives: { D: 3, E: 3, C: 9, F: 8 }, bio: 'The careful protector who reads every word and ensures nothing slips through.' },
  { id: 'operator', name: 'Operator', category: 'stabilizing', population: 5.0, drives: { D: 2, E: 3, C: 8, F: 6 }, bio: 'The reliable executor who keeps the machinery running through consistency and discipline.' },
  { id: 'adapter', name: 'Adapter', category: 'stabilizing', population: 12.07, drives: { D: 5, E: 5, C: 5, F: 5 }, bio: 'A flexible generalist who reads context and adjusts behavior to match the situation.' },
  { id: 'artisan', name: 'Artisan', category: 'stabilizing', population: 5.49, drives: { D: 5, E: 3, C: 7, F: 5 }, bio: 'A practical, hands-on worker who delivers tangible results through focused craftsmanship.' },
  { id: 'controller', name: 'Controller', category: 'persistent', population: 4.0, drives: { D: 9, E: 2, C: 3, F: 8 }, bio: 'The directive authority who drives results through structure and exacting standards.' },
  { id: 'individualist', name: 'Individualist', category: 'persistent', population: 4.88, drives: { D: 6, E: 2, C: 5, F: 6 }, bio: 'A self-reliant specialist who achieves results through deep focus and quiet persistence.' },
]

const CATEGORY_META: Record<Category, { label: string; color: string; bg: string; border: string }> = {
  analytical: { label: 'Analytical', color: '#7C5CFC', bg: 'rgba(124,92,252,0.08)', border: 'rgba(124,92,252,0.25)' },
  social: { label: 'Social', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)' },
  stabilizing: { label: 'Stabilizing', color: '#10B981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)' },
  persistent: { label: 'Persistent', color: '#EF4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)' },
}

const DRIVE_LABELS = ['D', 'E', 'C', 'F'] as const
const DRIVE_NAMES: Record<string, string> = { D: 'Dominance', E: 'Extraversion', C: 'Patience', F: 'Formality' }

/* ── DECF Bar ────────────────────────────────────────────────────────────── */

function DriveBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-mono text-[var(--text-muted)] w-14">{DRIVE_NAMES[label]}</span>
      <div className="flex-1 h-1.5 bg-[var(--bg-sunken)] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value * 10}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <span className="text-[10px] font-mono text-[var(--text-muted)] w-4 text-right">{value}</span>
    </div>
  )
}

/* ── Profile Card ────────────────────────────────────────────────────────── */

function ProfileCard({ profile, isSelected, onSelect }: { profile: Profile; isSelected: boolean; onSelect: () => void }) {
  const cat = CATEGORY_META[profile.category]

  return (
    <motion.button
      onClick={onSelect}
      className="text-left w-full rounded-xl p-4 transition-all cursor-pointer"
      style={{
        backgroundColor: isSelected ? cat.bg : 'var(--bg-raised)',
        border: `1px solid ${isSelected ? cat.border : 'var(--border-primary)'}`,
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-semibold text-[var(--text-primary)]">{profile.name}</span>
        <span
          className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full"
          style={{ color: cat.color, backgroundColor: cat.bg, border: `1px solid ${cat.border}` }}
        >
          {cat.label}
        </span>
      </div>
      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed line-clamp-2">{profile.bio}</p>

      {/* Mini drive bars */}
      <div className="mt-3 space-y-1">
        {DRIVE_LABELS.map((d) => (
          <DriveBar key={d} label={d} value={profile.drives[d]} color={cat.color} />
        ))}
      </div>

      <div className="mt-2 text-[9px] font-mono text-[var(--text-muted)]">
        {profile.population}% of population
      </div>
    </motion.button>
  )
}

/* ── Detail Panel ────────────────────────────────────────────────────────── */

function DetailPanel({ profile }: { profile: Profile }) {
  const cat = CATEGORY_META[profile.category]

  // Compute drive descriptors
  const driveDescriptors = DRIVE_LABELS.map((d) => {
    const v = profile.drives[d]
    const level = v >= 7 ? 'High' : v <= 3 ? 'Low' : 'Mid'
    return { label: DRIVE_NAMES[d], value: v, level }
  })

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-[var(--bg-raised)] border rounded-2xl p-6 md:p-8"
      style={{ borderColor: cat.border }}
    >
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-2xl font-bold text-[var(--text-primary)]">{profile.name}</h3>
        <span
          className="text-xs font-mono uppercase tracking-wider px-2 py-1 rounded-full"
          style={{ color: cat.color, backgroundColor: cat.bg, border: `1px solid ${cat.border}` }}
        >
          {cat.label}
        </span>
      </div>

      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">{profile.bio}</p>

      {/* Drive visualization */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {driveDescriptors.map((d) => (
          <div key={d.label} className="bg-[var(--bg-sunken)] rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono text-[var(--text-muted)]">{d.label}</span>
              <span
                className="text-xs font-mono font-bold"
                style={{ color: d.level === 'High' ? cat.color : d.level === 'Low' ? '#94A3B8' : 'var(--text-secondary)' }}
              >
                {d.level}
              </span>
            </div>
            <div className="h-2 bg-[var(--bg-raised)] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: cat.color }}
                initial={{ width: 0 }}
                animate={{ width: `${d.value * 10}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="flex gap-4 text-xs text-[var(--text-muted)] font-mono">
        <span>{profile.population}% of workforce</span>
        <span>|</span>
        <span>{profile.category} category</span>
      </div>
    </motion.div>
  )
}

/* ── Main Component ──────────────────────────────────────────────────────── */

const ALL_CATEGORIES: (Category | 'all')[] = ['all', 'analytical', 'social', 'stabilizing', 'persistent']

export default function ProfileExplorer() {
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const [selected, setSelected] = useState<Profile>(PROFILES[0])

  const filtered = filter === 'all' ? PROFILES : PROFILES.filter((p) => p.category === filter)

  return (
    <section className="py-24 px-6 md:py-32 md:px-8 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,92,252,0.06), transparent 60%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2
            className="font-bold text-[var(--text-primary)] mb-3"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          >
            17 Behavioral Profiles
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Built on 60 years of Predictive Index research. Each profile maps four behavioral drives
            — Dominance, Extraversion, Patience, Formality — that shape how people think, communicate, and work.
          </p>
        </motion.div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {ALL_CATEGORIES.map((cat) => {
            const isActive = filter === cat
            const meta = cat === 'all' ? null : CATEGORY_META[cat]
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full transition-all"
                style={{
                  color: isActive ? (meta?.color ?? '#7C5CFC') : 'var(--text-muted)',
                  backgroundColor: isActive ? (meta?.bg ?? 'rgba(124,92,252,0.08)') : 'transparent',
                  border: `1px solid ${isActive ? (meta?.border ?? 'rgba(124,92,252,0.25)') : 'var(--border-primary)'}`,
                }}
              >
                {cat === 'all' ? 'All 17' : meta?.label}
              </button>
            )
          })}
        </div>

        {/* Grid + Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          {/* Card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  isSelected={selected.id === profile.id}
                  onSelect={() => setSelected(profile)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Detail panel (sticky on desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <AnimatePresence mode="wait">
                <DetailPanel key={selected.id} profile={selected} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
