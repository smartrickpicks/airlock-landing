'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import EmailCapture from './EmailCapture'

function TriptychMockup() {
  const moduleColors = [
    'var(--chamber-discover)',
    'var(--chamber-build)',
    'var(--chamber-review)',
    'var(--chamber-ship)',
    'var(--accent-primary)',
  ]

  return (
    <div className="animate-float">
      <div className="bg-[var(--glass-surface)] border border-[var(--glass-border)] rounded-2xl p-2 backdrop-blur-sm shadow-2xl max-w-4xl mx-auto">
        <div className="flex gap-1.5 overflow-hidden rounded-xl">
          {/* Module Bar */}
          <div className="w-12 shrink-0 bg-[var(--bg-sunken)] rounded-l-xl py-4 flex flex-col items-center gap-3">
            {moduleColors.map((color, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-md"
                style={{ backgroundColor: color, opacity: 0.7 }}
              />
            ))}
          </div>

          {/* Signal Panel */}
          <div className="w-1/4 bg-[var(--bg-raised)] rounded-lg p-3">
            <p className="text-xs text-[var(--text-muted)] mb-3 font-mono">Signal</p>
            <div className="space-y-2">
              <div className="h-2 bg-[var(--border-primary)] rounded-full w-full" />
              <div className="h-2 bg-[var(--border-primary)] rounded-full w-3/4" />
              <div className="h-2 bg-[var(--border-primary)] rounded-full w-5/6" />
              <div className="h-px bg-[var(--border-subtle)] my-3" />
              <div className="h-2 bg-[var(--border-primary)] rounded-full w-2/3" />
              <div className="h-2 bg-[var(--border-primary)] rounded-full w-4/5" />
              <div className="h-2 bg-[var(--border-primary)] rounded-full w-1/2" />
            </div>
          </div>

          {/* Orchestrate Panel */}
          <div className="w-1/2 bg-[var(--bg-raised)] rounded-lg p-3">
            <p className="text-xs text-[var(--text-muted)] mb-3 font-mono">Orchestrate</p>
            <div className="space-y-2">
              <div className="h-3 bg-[var(--border-primary)] rounded w-full" />
              <div className="h-3 bg-[var(--border-primary)] rounded w-11/12" />
              <div className="h-px bg-[var(--border-subtle)] my-3" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-8 bg-[var(--bg-overlay)] rounded border border-[var(--border-subtle)]" />
                <div className="h-8 bg-[var(--bg-overlay)] rounded border border-[var(--border-subtle)]" />
              </div>
              <div className="h-3 bg-[var(--border-primary)] rounded w-3/4 mt-2" />
              <div className="h-3 bg-[var(--border-primary)] rounded w-5/6" />
              <div className="h-3 bg-[var(--border-primary)] rounded w-2/3" />
            </div>
          </div>

          {/* Control Panel */}
          <div className="w-1/4 bg-[var(--bg-raised)] rounded-r-lg p-3">
            <p className="text-xs text-[var(--text-muted)] mb-3 font-mono">Control</p>
            <div className="space-y-2">
              <div className="h-2 bg-[var(--border-primary)] rounded-full w-full" />
              <div className="h-2 bg-[var(--border-primary)] rounded-full w-2/3" />
              <div className="h-px bg-[var(--border-subtle)] my-3" />
              <div className="h-6 bg-[var(--bg-overlay)] rounded border border-[var(--border-subtle)]" />
              <div className="h-2 bg-[var(--border-primary)] rounded-full w-4/5 mt-2" />
              <div className="h-2 bg-[var(--border-primary)] rounded-full w-3/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden pt-16">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,209,255,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 px-6 py-24 md:py-32 w-full max-w-[1200px] mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-sans font-bold text-[var(--text-primary)] max-w-4xl mx-auto leading-tight"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          The workspace that learns who you are and builds itself around your team.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
        >
          Enterprise data operations — contracts, teams, and intelligence converge
          in one workspace that adapts to how you work.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <EmailCapture variant="hero" />
          <p className="mt-4 text-sm text-[var(--text-muted)]">
            Join 500+ operators building the future of work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16"
        >
          <TriptychMockup />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="mt-12"
        >
          <a href="#features" aria-label="Scroll to features">
            <ChevronDown className="w-6 h-6 text-[var(--text-muted)] animate-bounce mx-auto" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
