'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import EmailCapture from './EmailCapture'

/* ── Animated orb background ──────────────────────────────────────────────── */

function OrbBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary cyan orb */}
      <div
        className="absolute w-[600px] h-[600px] -top-[200px] left-1/2 -translate-x-1/2 animate-glow-breathe"
        style={{
          background: 'radial-gradient(circle, rgba(0,209,255,0.15) 0%, transparent 70%)',
        }}
      />
      {/* Secondary purple orb */}
      <div
        className="absolute w-[400px] h-[400px] top-[20%] -right-[100px] animate-drift"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
        }}
      />
      {/* Tertiary indigo orb */}
      <div
        className="absolute w-[500px] h-[500px] top-[40%] -left-[150px] animate-drift"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
          animationDelay: '4s',
        }}
      />
      {/* Grid */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      {/* Fade mask */}
      <div
        className="absolute bottom-0 left-0 right-0 h-60"
        style={{ background: 'linear-gradient(to top, var(--bg-base), transparent)' }}
      />
    </div>
  )
}

/* ── Rotating headline words ──────────────────────────────────────────────── */

const rotatingWords = ['Every deal.', 'Every team.', 'Every workflow.', 'Every contract.']

function RotatingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="inline-block relative min-w-[280px] sm:min-w-[380px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[index]}
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="gradient-text inline-block"
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* ── Floating particles ───────────────────────────────────────────────────── */

function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => {
        const left = `${(i * 5 + 3) % 100}%`
        const top = `${(i * 7 + 11) % 100}%`
        const color =
          i % 3 === 0
            ? 'rgba(0,209,255,0.4)'
            : i % 3 === 1
              ? 'rgba(99,102,241,0.3)'
              : 'rgba(168,85,247,0.3)'
        const dur = 4 + (i % 5)
        const delay = (i % 4) * 0.8
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ left, top, backgroundColor: color }}
            animate={{
              y: [0, -30, 0],
              x: [0, (i % 2 === 0 ? 10 : -10), 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: dur,
              repeat: Infinity,
              delay,
              ease: 'easeInOut',
            }}
          />
        )
      })}
    </div>
  )
}

/* ── Live product mockup with activity ────────────────────────────────────── */

function ProductMockup() {
  const [activeSignal, setActiveSignal] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActiveSignal((p) => (p + 1) % 4), 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="animate-float">
      <div className="relative">
        {/* Glow behind mockup */}
        <div
          className="absolute -inset-12 rounded-3xl animate-pulse-glow"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0,209,255,0.1), rgba(99,102,241,0.05) 50%, transparent 70%)',
          }}
        />
        {/* Main container with gradient border */}
        <div className="relative gradient-border">
          <div className="bg-[var(--bg-raised)] rounded-2xl p-1.5 backdrop-blur-sm shadow-2xl shadow-cyan-500/10">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border-subtle)]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-[var(--bg-sunken)] rounded-md px-16 py-1 text-[10px] font-mono text-[var(--text-muted)]">
                  app.airlock.dev
                </div>
              </div>
              <div className="flex gap-1.5 items-center">
                <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)]/40 animate-pulse" />
                <span className="text-[8px] text-[var(--accent-primary)]/60 font-mono">LIVE</span>
              </div>
            </div>

            {/* App layout */}
            <div className="flex gap-0 overflow-hidden rounded-b-xl min-h-[220px]">
              {/* Module sidebar */}
              <div className="w-12 shrink-0 bg-[var(--bg-sunken)] py-4 flex flex-col items-center gap-3">
                {[
                  { color: 'var(--accent-primary)', active: true },
                  { color: 'var(--chamber-discover)', active: false },
                  { color: 'var(--chamber-build)', active: false },
                  { color: 'var(--chamber-review)', active: false },
                  { color: 'var(--chamber-ship)', active: false },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: item.active
                        ? `color-mix(in srgb, ${item.color} 15%, transparent)`
                        : 'transparent',
                      border: item.active
                        ? `1px solid color-mix(in srgb, ${item.color} 30%, transparent)`
                        : '1px solid transparent',
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: item.color, opacity: item.active ? 1 : 0.5 }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Signal panel — Dispatch */}
              <div className="w-[22%] bg-[var(--bg-overlay)]/50 border-r border-[var(--border-subtle)] p-3">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
                    Dispatch
                  </p>
                  <motion.div
                    className="w-4 h-4 rounded bg-[var(--accent-primary)]/10 flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 rounded-sm bg-[var(--accent-primary)]/60" />
                  </motion.div>
                </div>
                <div className="space-y-2">
                  {[
                    { w: 'w-full', color: 'var(--chamber-discover)' },
                    { w: 'w-3/4', color: 'var(--chamber-build)' },
                    { w: 'w-5/6', color: 'var(--chamber-review)' },
                    { w: 'w-2/3', color: 'var(--chamber-ship)' },
                  ].map((bar, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 rounded px-1 -mx-1"
                      animate={{
                        backgroundColor:
                          activeSignal === i ? 'rgba(0,209,255,0.05)' : 'rgba(0,0,0,0)',
                      }}
                    >
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: bar.color }}
                        animate={activeSignal === i ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className={`h-1.5 bg-[var(--border-primary)] rounded-full ${bar.w}`} />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Main content — Vault */}
              <div className="flex-1 bg-[var(--bg-raised)]/50 p-3">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                    Vault: Acme Corp Q1
                  </p>
                  <motion.div
                    className="px-2 py-0.5 rounded text-[8px] font-mono"
                    animate={{
                      backgroundColor: ['rgba(234,179,8,0.1)', 'rgba(234,179,8,0.2)', 'rgba(234,179,8,0.1)'],
                      color: ['rgba(234,179,8,0.8)', 'rgba(234,179,8,1)', 'rgba(234,179,8,0.8)'],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    BUILD
                  </motion.div>
                </div>
                <div className="space-y-2">
                  <div className="h-2.5 bg-[var(--border-primary)] rounded w-full" />
                  <div className="h-2.5 bg-[var(--border-primary)] rounded w-11/12" />
                  <div className="h-px bg-[var(--border-subtle)] my-2" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-14 bg-[var(--bg-overlay)] rounded-lg border border-[var(--border-subtle)] p-2">
                      <div className="h-1.5 bg-[var(--border-primary)] rounded w-3/4 mb-1.5" />
                      <div className="h-1.5 bg-[var(--border-primary)]/50 rounded w-1/2 mb-1.5" />
                      <div className="h-1 bg-[var(--chamber-build)]/20 rounded-full w-2/3" />
                    </div>
                    <div className="h-14 bg-[var(--bg-overlay)] rounded-lg border border-[var(--border-subtle)] p-2">
                      <div className="h-1.5 bg-[var(--border-primary)] rounded w-2/3 mb-1.5" />
                      <div className="h-1.5 bg-[var(--border-primary)]/50 rounded w-4/5 mb-1.5" />
                      <div className="h-1 bg-[var(--accent-primary)]/20 rounded-full w-1/2" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right panel — Otto */}
              <div className="w-[20%] bg-[var(--bg-overlay)]/30 border-l border-[var(--border-subtle)] p-3">
                <div className="flex items-center gap-1.5 mb-3">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[var(--accent-tertiary)]"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <p className="text-[10px] font-semibold text-[var(--accent-tertiary)] uppercase tracking-wider">
                    Otto
                  </p>
                </div>
                <div className="space-y-2">
                  <motion.div
                    className="bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/10 rounded-lg p-2"
                    animate={{
                      borderColor: [
                        'rgba(0,209,255,0.1)',
                        'rgba(0,209,255,0.25)',
                        'rgba(0,209,255,0.1)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="h-1.5 bg-[var(--accent-primary)]/20 rounded w-full mb-1" />
                    <div className="h-1.5 bg-[var(--accent-primary)]/15 rounded w-2/3" />
                  </motion.div>
                  <div className="h-1.5 bg-[var(--border-primary)]/60 rounded w-4/5" />
                  <div className="h-1.5 bg-[var(--border-primary)]/40 rounded w-3/5" />
                  <div className="h-px bg-[var(--border-subtle)] my-1" />
                  <motion.div
                    className="h-6 bg-[var(--bg-sunken)] rounded border border-[var(--border-subtle)] flex items-center px-2"
                    animate={{ borderColor: ['rgba(26,31,46,1)', 'rgba(0,209,255,0.2)', 'rgba(26,31,46,1)'] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  >
                    <div className="w-1 h-1 rounded-full bg-[var(--accent-primary)]/40 animate-pulse" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Social proof badges ──────────────────────────────────────────────────── */

function SocialProof() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="flex flex-wrap items-center justify-center gap-6 mt-8"
    >
      {[
        { label: 'AI-Native', icon: '~' },
        { label: 'Encrypted at Rest', icon: '>' },
        { label: 'Enterprise Architecture', icon: '#' },
      ].map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 text-[var(--text-muted)] text-xs font-mono"
        >
          <span className="text-[var(--accent-primary)]/60">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </motion.div>
  )
}

/* ── Hero ──────────────────────────────────────────────────────────────────── */

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden pt-16">
      <OrbBackground />
      <FloatingParticles />

      <div className="relative z-10 px-6 py-20 md:py-28 w-full max-w-[1200px] mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/20 rounded-full px-5 py-2 text-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-primary)]" />
            </span>
            <span className="text-[var(--accent-primary)] font-medium">Now accepting early access</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-sans font-bold max-w-4xl mx-auto leading-[1.08] tracking-tight"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          <span className="gradient-text-white">One workspace. </span>
          <br className="hidden sm:block" />
          <RotatingWord />
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed"
        >
          Airlock unifies contract lifecycle, CRM, and project management in a
          Discord-like workspace powered by AI agents — so your team stops
          context-switching and starts closing.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <EmailCapture variant="hero" />
          <SocialProof />
        </motion.div>

        {/* Product mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 md:mt-20 max-w-4xl mx-auto"
        >
          <ProductMockup />
        </motion.div>
      </div>
    </section>
  )
}
