'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { AnalysisResult } from '@/lib/github-analyzer'

const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || ''

const SCAN_STEPS = [
  'Connecting to GitHub...',
  'Scanning your repositories...',
  'Reading commit messages...',
  'Analyzing PR patterns...',
  'Studying branch habits...',
  'Checking for conflicts...',
  'Matching behavioral profile...',
  'Generating your card...',
]

type Phase = 'landing' | 'scanning' | 'result' | 'error'

function roleColor(role: string) {
  switch (role) {
    case 'expander': return '#00FF88'
    case 'converter': return '#7B61FF'
    case 'stabilizer': return '#00B4D8'
    default: return '#00FF88'
  }
}

export default function CardPage() {
  const [phase, setPhase] = useState<Phase>('landing')
  const [scanStep, setScanStep] = useState(0)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const runAnalysis = useCallback(async (token: string) => {
    setPhase('scanning')
    setScanStep(0)

    // Animate scan steps
    const stepInterval = setInterval(() => {
      setScanStep(prev => {
        if (prev < SCAN_STEPS.length - 1) return prev + 1
        return prev
      })
    }, 1800)

    try {
      const res = await fetch('/api/github/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      clearInterval(stepInterval)

      if (!res.ok) {
        throw new Error('Analysis failed')
      }

      const data: AnalysisResult = await res.json()
      setScanStep(SCAN_STEPS.length - 1)

      // Brief pause to show "Generating your card..."
      setTimeout(() => {
        setResult(data)
        setPhase('result')
      }, 800)
    } catch {
      clearInterval(stepInterval)
      setError('Analysis failed. Please try again.')
      setPhase('error')
    }

    // Clean token from URL
    window.history.replaceState({}, '', '/card')
  }, [])

  // Check for OAuth callback token or error
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    const err = params.get('error')

    if (err) {
      setError(err === 'no_code' ? 'GitHub authorization was cancelled.' : `OAuth error: ${err}`)
      setPhase('error')
      window.history.replaceState({}, '', '/card')
    } else if (token) {
      runAnalysis(token)
    }
  }, [runAnalysis])

  const handleConnect = () => {
    const redirectUri = `${window.location.origin}/api/github/callback`
    const scope = 'read:user,public_repo'
    window.location.href =
      `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <AnimatePresence mode="wait">
        {phase === 'landing' && <LandingView onConnect={handleConnect} key="landing" />}
        {phase === 'scanning' && <ScanningView step={scanStep} key="scanning" />}
        {phase === 'result' && result && <ResultView result={result} key="result" />}
        {phase === 'error' && <ErrorView error={error} onRetry={() => setPhase('landing')} key="error" />}
      </AnimatePresence>
    </div>
  )
}

// ── Landing ──────────────────────────────────────────────────────────────────

function LandingView({ onConnect }: { onConnect: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center max-w-lg"
    >
      <h1 className="font-mono text-4xl font-bold text-[#00FF88] mb-3">
        Developer Card
      </h1>
      <p className="text-[var(--text-secondary)] text-lg mb-2">
        What kind of developer are you?
      </p>
      <p className="text-[var(--text-muted)] text-sm mb-10 max-w-md mx-auto">
        We&apos;ll scan your public GitHub activity — commits, PRs, branches —
        and map your behavioral profile across 17 developer types.
        Read-only access. Token discarded after analysis.
      </p>

      <button
        onClick={onConnect}
        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-mono font-bold text-sm tracking-wide
                   bg-[#00FF88] text-[#0a0a0f] hover:bg-[#00ff88dd] transition-all
                   hover:scale-[1.02] active:scale-[0.98]"
      >
        <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        Connect GitHub
      </button>

      <p className="text-[var(--text-muted)] text-xs mt-6">
        No account created. No data stored. Your token is discarded after analysis.
      </p>
    </motion.div>
  )
}

// ── Scanning ─────────────────────────────────────────────────────────────────

function ScanningView({ step }: { step: number }) {
  const progress = ((step + 1) / SCAN_STEPS.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center max-w-md"
    >
      <div className="w-16 h-16 mx-auto mb-8 relative">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#00FF88]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          style={{ borderTopColor: 'transparent' }}
        />
      </div>

      <motion.p
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-mono text-sm text-[#00FF88] mb-6"
      >
        {SCAN_STEPS[step]}
      </motion.p>

      <div className="w-64 h-1 bg-[var(--bg-overlay)] rounded-full mx-auto overflow-hidden">
        <motion.div
          className="h-full bg-[#00FF88] rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  )
}

// ── Result ───────────────────────────────────────────────────────────────────

function ResultView({ result }: { result: AnalysisResult }) {
  const { profile, stats, health } = result
  const accent = roleColor(profile.role)
  const hasHealthIssues = health.conflicts + health.staleBranches + health.unreviewedPRs > 0

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-xl"
    >
      {/* Developer Card */}
      <div
        className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #111118 0%, #0d0d14 100%)',
          border: `1px solid ${accent}22`,
        }}
      >
        {/* Glow */}
        <div
          className="absolute -top-20 -right-20 w-48 h-48 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accent}15 0%, transparent 70%)` }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-7">
          <div>
            <h2 className="font-mono text-3xl font-bold" style={{ color: accent }}>
              {profile.name}
            </h2>
            <p className="text-[var(--text-muted)] text-sm italic mt-1">{profile.tagline}</p>
          </div>
          <div className="text-right">
            <span
              className="font-mono text-[10px] font-bold tracking-widest px-2.5 py-1 rounded"
              style={{ color: accent, border: `1px solid ${accent}44`, background: `${accent}0a` }}
            >
              {profile.role.toUpperCase()}
            </span>
            <p className="font-mono text-[10px] text-[var(--text-muted)] mt-1">
              {profile.populationPct}% of devs
            </p>
          </div>
        </div>

        {/* Stats badge */}
        <p className="font-mono text-[10px] text-[var(--text-muted)] mb-5 tracking-wide">
          Based on {stats.totalCommits} commits across {stats.totalRepos} repos
          {stats.topLanguages.length > 0 && ` · ${stats.topLanguages.slice(0, 3).join(', ')}`}
        </p>

        {/* Drives */}
        <div className="mb-7">
          <p className="font-mono text-[10px] font-bold tracking-widest text-[var(--text-muted)] uppercase mb-3">
            Behavioral Drives
          </p>
          {[
            { label: 'Dominance', value: profile.drives.dominance },
            { label: 'Extraversion', value: profile.drives.extraversion },
            { label: 'Patience', value: profile.drives.patience },
            { label: 'Formality', value: profile.drives.formality },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-2.5 mb-2">
              <span className="font-mono text-[11px] text-[var(--text-secondary)] w-24 shrink-0">{label}</span>
              <div className="flex-1 h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: accent }}
                  initial={{ width: 0 }}
                  animate={{ width: `${value * 10}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
              <span className="font-mono text-[11px] font-bold w-6 text-right" style={{ color: accent }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Strengths */}
        <div className="mb-5">
          <p className="font-mono text-[10px] font-bold tracking-widest text-[var(--text-muted)] uppercase mb-2">
            Strengths
          </p>
          <div className="flex flex-wrap gap-1.5">
            {profile.strengths.map(s => (
              <span
                key={s}
                className="font-mono text-[10px] px-2.5 py-1 rounded"
                style={{ color: accent, background: `${accent}15`, border: `1px solid ${accent}30` }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Blind Spots */}
        <div className="mb-5">
          <p className="font-mono text-[10px] font-bold tracking-widest text-[var(--text-muted)] uppercase mb-2">
            Blind Spots
          </p>
          <div className="flex flex-wrap gap-1.5">
            {profile.blindSpots.map(b => (
              <span
                key={b}
                className="font-mono text-[10px] px-2.5 py-1 rounded
                           text-[var(--text-muted)] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Pair */}
        <div className="flex items-center gap-2 mb-6">
          <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wide uppercase">Best pair:</span>
          <span className="font-mono text-xs text-[var(--text-secondary)] font-semibold">{profile.pairWith}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-[rgba(255,255,255,0.06)]">
          <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wide">
            MAVERICK by{' '}
            <a href="https://airlocklabs.io" className="hover:text-[#00FF88] transition-colors" style={{ color: `${accent}88` }}>
              Airlock
            </a>
          </span>
          <span className="font-mono text-[9px] text-[rgba(255,255,255,0.15)]">
            {new Date().toISOString().split('T')[0]}
          </span>
        </div>
      </div>

      {/* Share buttons */}
      <div className="flex gap-3 mt-6 justify-center">
        <button
          onClick={() => {
            const text = `I'm a ${profile.name} — ${profile.populationPct}% of developers. ${profile.tagline}\n\nFind yours: https://airlocklabs.io/card`
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
          }}
          className="font-mono text-xs px-5 py-2.5 rounded-lg bg-[var(--bg-overlay)] text-[var(--text-secondary)]
                     hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-all border border-[var(--border-subtle)]"
        >
          Share on X
        </button>
        <button
          onClick={() => {
            const text = `I'm a ${profile.name} developer (${profile.populationPct}% of devs). ${profile.tagline} — airlocklabs.io/card`
            navigator.clipboard.writeText(text)
          }}
          className="font-mono text-xs px-5 py-2.5 rounded-lg bg-[var(--bg-overlay)] text-[var(--text-secondary)]
                     hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-all border border-[var(--border-subtle)]"
        >
          Copy Link
        </button>
      </div>

      {/* Get the MCP */}
      <div className="mt-6 text-center">
        <p className="font-mono text-[10px] text-[var(--text-muted)] mb-2">
          Want your AI agent to adapt to your profile?
        </p>
        <code className="font-mono text-xs text-[#00FF88] bg-[var(--bg-overlay)] px-4 py-2 rounded-lg border border-[var(--border-subtle)] inline-block">
          uvx maverick-mcp serve
        </code>
      </div>

      {/* Repo Health Report */}
      {hasHealthIssues && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 rounded-2xl p-8 border border-[rgba(239,68,68,0.2)]"
          style={{ background: 'linear-gradient(145deg, #111118 0%, #0d0d14 100%)' }}
        >
          <h3 className="font-mono text-sm font-bold text-[#EF4444] mb-4 tracking-wide">
            REPO HEALTH REPORT
          </h3>

          <div className="space-y-3 mb-6">
            {health.conflicts > 0 && (
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[var(--text-secondary)]">Merge conflicts detected</span>
                <span className="text-[#EF4444] font-bold">{health.conflicts}</span>
              </div>
            )}
            {health.staleBranches > 0 && (
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[var(--text-secondary)]">Stale branches</span>
                <span className="text-[#EAB308] font-bold">{health.staleBranches}</span>
              </div>
            )}
            {health.unreviewedPRs > 0 && (
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[var(--text-secondary)]">Unreviewed PRs</span>
                <span className="text-[#EAB308] font-bold">{health.unreviewedPRs}</span>
              </div>
            )}
            {health.issues.map((issue, i) => (
              <div key={i} className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-[var(--text-muted)]">{issue.repo}</span>
                <span className="text-[var(--text-muted)]">{issue.detail}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[rgba(255,255,255,0.06)] pt-5">
            <p className="font-mono text-xs text-[var(--text-muted)] mb-3">
              Fix conflicts with one command:
            </p>
            <code className="font-mono text-sm text-[#00FF88] font-bold">
              nc push → done.
            </code>
            <div className="mt-4">
              <a
                href="https://noconflict.dev"
                className="inline-block font-mono text-xs px-6 py-2.5 rounded-lg font-bold
                           bg-[#00FF88] text-[#0a0a0f] hover:bg-[#00ff88dd] transition-all"
              >
                Install NoConflict
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats detail */}
      <div className="mt-8 mb-16 text-center">
        <div className="flex flex-wrap justify-center gap-6 font-mono text-[10px] text-[var(--text-muted)]">
          <span>{stats.totalCommits} commits</span>
          <span>{stats.totalPRs} PRs</span>
          <span>{stats.commitPattern} commit pattern</span>
          <span>{stats.avgMergeTimeDays}d avg merge time</span>
          <span>{stats.avgCommitMessageLength} char avg commit msg</span>
        </div>
      </div>
    </motion.div>
  )
}

// ── Error ────────────────────────────────────────────────────────────────────

function ErrorView({ error, onRetry }: { error: string | null; onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center max-w-md"
    >
      <p className="font-mono text-sm text-[#EF4444] mb-4">{error || 'Something went wrong.'}</p>
      <button
        onClick={onRetry}
        className="font-mono text-xs px-6 py-2.5 rounded-lg bg-[var(--bg-overlay)] text-[var(--text-secondary)]
                   hover:text-[var(--text-primary)] transition-all border border-[var(--border-subtle)]"
      >
        Try Again
      </button>
    </motion.div>
  )
}
