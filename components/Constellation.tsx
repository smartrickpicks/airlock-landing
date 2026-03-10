'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  Blocks,
  BookOpen,
  Settings,
  Brain,
  Puzzle,
  GitFork,
  Layout,
  Users,
} from 'lucide-react'
import { viewportConfig } from '@/lib/animations'

const repos = [
  { name: 'airlock-app', desc: 'Core platform', icon: Blocks, color: 'var(--accent-primary)', x: 50, y: 50 },
  { name: 'airlock-docs', desc: 'Documentation', icon: BookOpen, color: 'var(--chamber-ship)', x: 20, y: 25 },
  { name: 'airlock-config', desc: 'Environment configs', icon: Settings, color: 'var(--text-muted)', x: 80, y: 25 },
  { name: 'airlock-persona', desc: 'PI personality engine', icon: Users, color: 'var(--accent-tertiary)', x: 15, y: 65 },
  { name: 'airlock-skills', desc: 'Agent skill library', icon: Puzzle, color: 'var(--chamber-build)', x: 85, y: 65 },
  { name: 'airlock-playbooks', desc: 'Workflow playbooks', icon: GitFork, color: 'var(--accent-secondary)', x: 30, y: 85 },
  { name: 'airlock-coordination', desc: 'Cross-repo orchestration', icon: Layout, color: 'var(--chamber-discover)', x: 70, y: 85 },
  { name: 'airlock-gen-ui', desc: 'Generative UI', icon: Brain, color: 'var(--chamber-review)', x: 50, y: 15 },
]

// Connections from airlock-app (center) to each satellite
const connections = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
  [3, 5], [4, 6], [1, 7], [2, 7],
]

function NetworkVisualization() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeConnection, setActiveConnection] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const timer = setInterval(() => setActiveConnection((p) => (p + 1) % connections.length), 1200)
    return () => clearInterval(timer)
  }, [isInView])

  return (
    <div ref={ref} className="relative w-full max-w-2xl mx-auto aspect-square hidden md:block">
      {/* SVG connections */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {connections.map(([from, to], i) => {
          const fromRepo = repos[from]
          const toRepo = repos[to]
          const isActive = activeConnection === i
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={fromRepo.x}
              y1={fromRepo.y}
              x2={toRepo.x}
              y2={toRepo.y}
              stroke={isActive ? 'rgba(0,209,255,0.4)' : 'rgba(26,31,46,0.6)'}
              strokeWidth={isActive ? 0.4 : 0.2}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: i * 0.08 }}
            />
          )
        })}
        {/* Traveling pulse on active connection */}
        {isInView && (
          <motion.circle
            r="0.6"
            fill="var(--accent-primary)"
            animate={{
              cx: [repos[connections[activeConnection][0]].x, repos[connections[activeConnection][1]].x],
              cy: [repos[connections[activeConnection][0]].y, repos[connections[activeConnection][1]].y],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 1.2, ease: 'linear' }}
            key={activeConnection}
          />
        )}
      </svg>

      {/* Repo nodes */}
      {repos.map((repo, i) => {
        const Icon = repo.icon
        const isCenter = i === 0
        return (
          <motion.div
            key={repo.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${repo.x}%`, top: `${repo.y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.08, type: 'spring' }}
          >
            <div
              className={`flex flex-col items-center gap-1 ${isCenter ? 'scale-125' : ''}`}
            >
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `color-mix(in srgb, ${repo.color} 10%, var(--bg-raised))`,
                  border: `1px solid color-mix(in srgb, ${repo.color} 25%, transparent)`,
                  boxShadow: isCenter ? `0 0 20px color-mix(in srgb, ${repo.color} 15%, transparent)` : 'none',
                }}
                whileHover={{ scale: 1.15, boxShadow: `0 0 25px color-mix(in srgb, ${repo.color} 25%, transparent)` }}
              >
                <Icon className="w-5 h-5" style={{ color: repo.color }} />
              </motion.div>
              <span className="text-[9px] font-mono text-[var(--text-primary)] text-center whitespace-nowrap">
                {repo.name}
              </span>
              <span className="text-[7px] text-[var(--text-muted)] text-center">
                {repo.desc}
              </span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ── Mobile fallback grid ─────────────────────────────────────────────────── */

function MobileGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:hidden">
      {repos.map((repo, i) => {
        const Icon = repo.icon
        return (
          <motion.div
            key={repo.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-xl p-4 text-center glow-card"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2"
              style={{
                backgroundColor: `color-mix(in srgb, ${repo.color} 10%, transparent)`,
                border: `1px solid color-mix(in srgb, ${repo.color} 20%, transparent)`,
              }}
            >
              <Icon className="w-5 h-5" style={{ color: repo.color }} />
            </div>
            <p className="text-xs font-mono text-[var(--text-primary)] mb-0.5">{repo.name}</p>
            <p className="text-[10px] text-[var(--text-muted)]">{repo.desc}</p>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Constellation() {
  return (
    <section className="py-24 px-6 md:py-32 md:px-8 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(99,102,241,0.04), transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-mono text-[var(--accent-secondary)] uppercase tracking-widest mb-4">
            Architecture
          </p>
          <h2
            className="font-bold text-[var(--text-primary)]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Built on <span className="gradient-text">Constellation.</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            8 interconnected repositories — not a monolith. Each repo owns a
            clear domain. Deploy together or independently.
          </p>
        </motion.div>

        {/* Network visualization (desktop) */}
        <NetworkVisualization />

        {/* Mobile grid fallback */}
        <MobileGrid />

        {/* Market context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: '$5.65B', label: 'CLM market by 2030', sub: '13% CAGR' },
            { value: '$50B+', label: 'AI agent market by 2030', sub: 'from $7.6B in 2025' },
            { value: '$29.6B', label: 'Global music industry', sub: '69% streaming revenue' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold gradient-text mb-1">{stat.value}</p>
              <p className="text-xs font-medium text-[var(--text-primary)]">{stat.label}</p>
              <p className="text-[10px] text-[var(--text-muted)]">{stat.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
