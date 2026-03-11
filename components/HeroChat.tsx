'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useCallback, KeyboardEvent } from 'react'
import { RotateCcw, Download, ArrowDown, Send } from 'lucide-react'
import EmailCapture from './EmailCapture'

/* ── Types ───────────────────────────────────────────────────────────────── */

interface ChatMsg { role: 'user' | 'assistant'; content: string }

interface DagNode {
  id: number; label: string; chamber: 'discovery' | 'build' | 'verify' | 'ship'
  description: string; persona: string; is_gate: boolean
}

interface DagSpec {
  role: string; industry: string; team_insight: string; gap: string
  dag: { name: string; nodes: DagNode[] }
  otto_value: string; use_case_tags: string[]
}

type Phase = 'chat' | 'generating' | 'spec' | 'capture'

/* ── Constants ───────────────────────────────────────────────────────────── */

const CHAMBER_COLORS: Record<string, string> = {
  discovery: '#EF4444', build: '#EAB308', verify: '#A855F7', ship: '#22C55E',
}
const CHAMBER_LABELS: Record<string, string> = {
  discovery: 'Discovery', build: 'Build', verify: 'Verify', ship: 'Ship',
}

const SUGGESTION_PILLS = [
  // Broad / common
  'I manage a team',
  'I run a small business',
  'I work in sales',
  'I own a fashion label',
  // Niche / specific
  'I need a better sales pipeline',
  'I want to automate my hiring process',
  'I run a plumbing company',
  'I work in oil and gas procurement',
  'I want to streamline my restaurant operations',
  'I coordinate a remote team across 3 time zones',
  // Curiosity / lifestyle (future)
  'I want to launch a side project',
  'What can you actually do?',
]

/* ── Hooks ───────────────────────────────────────────────────────────────── */

function useTypewriter(text: string, speed = 14) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!text) { setDisplayed(''); setDone(false); return }
    setDisplayed(''); setDone(false)
    let i = 0
    const timer = setInterval(() => {
      i++; setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(timer); setDone(true) }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])
  return { displayed, done }
}

/* ── Otto Mark — constellation wireframe otter, abstract + bold ──────────── */

function OttoMark({ size = 'sm', flipping = false }: { size?: 'sm' | 'lg' | 'hero' | 'float'; flipping?: boolean }) {
  const dims = { sm: 'w-8 h-8', lg: 'w-10 h-10', hero: 'w-20 h-20', float: 'w-32 h-32' }
  const svgClass = dims[size]
  const isLarge = size === 'float' || size === 'hero'

  const flipVariants = {
    idle: { rotateY: 0 },
    flip: {
      rotateY: [0, 360],
      transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 },
    },
  }

  return (
    <motion.div
      className={`${svgClass} shrink-0 relative`}
      style={{ perspective: 600 }}
      variants={flipVariants}
      animate={flipping ? 'flip' : 'idle'}
    >
      <svg viewBox="0 0 160 160" className="w-full h-full" style={{ filter: `drop-shadow(0 0 ${isLarge ? 20 : 8}px rgba(124,92,252,0.3))` }} fill="none">
        {/* Head outline — wireframe circle */}
        <circle cx="80" cy="78" r="38" fill="rgba(124,92,252,0.06)" stroke="rgba(124,92,252,0.35)" strokeWidth={isLarge ? 1.5 : 1} />
        {/* Inner head */}
        <circle cx="80" cy="80" r="28" fill="rgba(11,14,20,0.6)" stroke="rgba(124,92,252,0.15)" strokeWidth="1" />

        {/* Ears — wireframe */}
        <circle cx="52" cy="50" r="11" fill="rgba(124,92,252,0.06)" stroke="rgba(124,92,252,0.3)" strokeWidth={isLarge ? 1.5 : 1} />
        <circle cx="52" cy="50" r="5.5" fill="rgba(124,92,252,0.04)" stroke="rgba(124,92,252,0.12)" strokeWidth="0.8" />
        <circle cx="108" cy="50" r="11" fill="rgba(124,92,252,0.06)" stroke="rgba(124,92,252,0.3)" strokeWidth={isLarge ? 1.5 : 1} />
        <circle cx="108" cy="50" r="5.5" fill="rgba(124,92,252,0.04)" stroke="rgba(124,92,252,0.12)" strokeWidth="0.8" />

        {/* Eyes — bright, THE identity */}
        <circle cx="68" cy="76" r="6.5" fill="#7C5CFC">
          <animate attributeName="ry" values="6.5;6.5;6.5;1;6.5;6.5;6.5" dur="4s" repeatCount="indefinite" keyTimes="0;0.46;0.48;0.5;0.52;0.54;1" />
        </circle>
        <circle cx="92" cy="76" r="6.5" fill="#7C5CFC">
          <animate attributeName="ry" values="6.5;6.5;6.5;1;6.5;6.5;6.5" dur="4s" repeatCount="indefinite" keyTimes="0;0.46;0.48;0.5;0.52;0.54;1" />
        </circle>
        {/* Eye highlights */}
        <circle cx="66" cy="74" r="2" fill="#fff" opacity="0.7" />
        <circle cx="90" cy="74" r="2" fill="#fff" opacity="0.7" />
        {/* Eye glow rings */}
        <circle cx="68" cy="76" r="11" fill="none" stroke="rgba(124,92,252,0.2)" strokeWidth="1">
          <animate attributeName="r" values="9;13;9" dur="3s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.15;0.05;0.15" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="92" cy="76" r="11" fill="none" stroke="rgba(124,92,252,0.2)" strokeWidth="1">
          <animate attributeName="r" values="9;13;9" dur="3s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.15;0.05;0.15" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Nose */}
        <ellipse cx="80" cy="88" rx="3.5" ry="2.5" fill="rgba(124,92,252,0.5)" />
        {/* Mouth */}
        <path d="M73 93q7 5 14 0" stroke="rgba(124,92,252,0.35)" strokeWidth="1.2" fill="none" strokeLinecap="round" />

        {/* Constellation edges — connecting face nodes */}
        <line x1="68" y1="76" x2="80" y2="60" stroke="rgba(124,92,252,0.2)" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="92" y1="76" x2="80" y2="60" stroke="rgba(124,92,252,0.2)" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="68" y1="76" x2="80" y2="100" stroke="rgba(124,92,252,0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="92" y1="76" x2="80" y2="100" stroke="rgba(124,92,252,0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="68" y1="76" x2="52" y2="50" stroke="rgba(124,92,252,0.12)" strokeWidth="0.6" strokeDasharray="3 3" />
        <line x1="92" y1="76" x2="108" y2="50" stroke="rgba(124,92,252,0.12)" strokeWidth="0.6" strokeDasharray="3 3" />
        <line x1="68" y1="76" x2="55" y2="90" stroke="rgba(124,92,252,0.1)" strokeWidth="0.6" strokeDasharray="3 3" />
        <line x1="92" y1="76" x2="105" y2="90" stroke="rgba(124,92,252,0.1)" strokeWidth="0.6" strokeDasharray="3 3" />

        {/* Constellation nodes — forehead, chin, jaw */}
        <circle cx="80" cy="60" r="2.5" fill="#7C5CFC" opacity="0.5" />
        <circle cx="80" cy="100" r="2.5" fill="#7C5CFC" opacity="0.4" />
        <circle cx="55" cy="90" r="2" fill="#7C5CFC" opacity="0.3" />
        <circle cx="105" cy="90" r="2" fill="#7C5CFC" opacity="0.3" />

        {/* Whiskers — wireframe style */}
        <line x1="60" y1="84" x2="42" y2="80" stroke="rgba(124,92,252,0.15)" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="60" y1="88" x2="40" y2="88" stroke="rgba(124,92,252,0.15)" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="60" y1="92" x2="42" y2="96" stroke="rgba(124,92,252,0.15)" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="100" y1="84" x2="118" y2="80" stroke="rgba(124,92,252,0.15)" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="100" y1="88" x2="120" y2="88" stroke="rgba(124,92,252,0.15)" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="100" y1="92" x2="118" y2="96" stroke="rgba(124,92,252,0.15)" strokeWidth="0.8" strokeLinecap="round" />

        {/* Chamber dots — four corners */}
        <circle cx="20" cy="20" r="4" fill="#EF4444" opacity="0.7">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="140" cy="20" r="4" fill="#EAB308" opacity="0.7">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" begin="0.75s" repeatCount="indefinite" />
        </circle>
        <circle cx="140" cy="140" r="4" fill="#A855F7" opacity="0.7">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" begin="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="20" cy="140" r="4" fill="#22C55E" opacity="0.7">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" begin="2.25s" repeatCount="indefinite" />
        </circle>

        {/* Chamber lines to eyes */}
        <line x1="20" y1="20" x2="68" y2="76" stroke="#EF4444" strokeWidth="0.4" opacity="0.15" strokeDasharray="4 4">
          <animate attributeName="stroke-opacity" values="0.1;0.25;0.1" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="140" y1="20" x2="92" y2="76" stroke="#EAB308" strokeWidth="0.4" opacity="0.15" strokeDasharray="4 4">
          <animate attributeName="stroke-opacity" values="0.1;0.25;0.1" dur="3s" begin="0.75s" repeatCount="indefinite" />
        </line>
        <line x1="140" y1="140" x2="92" y2="76" stroke="#A855F7" strokeWidth="0.4" opacity="0.15" strokeDasharray="4 4">
          <animate attributeName="stroke-opacity" values="0.1;0.25;0.1" dur="3s" begin="1.5s" repeatCount="indefinite" />
        </line>
        <line x1="20" y1="140" x2="68" y2="76" stroke="#22C55E" strokeWidth="0.4" opacity="0.15" strokeDasharray="4 4">
          <animate attributeName="stroke-opacity" values="0.1;0.25;0.1" dur="3s" begin="2.25s" repeatCount="indefinite" />
        </line>

        {/* Ambient outer glow */}
        <circle cx="80" cy="80" r="65" fill="none" stroke="rgba(124,92,252,0.06)" strokeWidth="1">
          <animate attributeName="r" values="60;70;60" dur="5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </motion.div>
  )
}

/* ── Free-floating Otto — lives outside the container, owns the space ───── */

function FloatingOtto({ flipping = false }: { flipping?: boolean }) {
  return (
    <motion.div
      className="relative"
      animate={flipping ? {} : { y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Ambient glow behind Otto */}
      <div className="absolute inset-[-30%] rounded-full" style={{
        background: 'radial-gradient(circle, rgba(124,92,252,0.15) 0%, rgba(0,209,255,0.05) 40%, transparent 70%)',
        filter: 'blur(24px)',
      }} />
      <OttoMark size="float" flipping={flipping} />
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-1 px-1">
      {[0, 1, 2].map((i) => (
        <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[#00D1FF]/60"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

/* ── Rich animated background ────────────────────────────────────────────── */

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep base gradient */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 120% 80% at 50% 30%, rgba(12,16,23,1) 0%, rgba(6,9,16,1) 100%)',
      }} />

      {/* Primary orb — cyan */}
      <motion.div
        className="absolute w-[800px] h-[800px] -top-[300px] left-1/2 -translate-x-1/2"
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(circle, rgba(0,209,255,0.1) 0%, transparent 60%)' }}
      />

      {/* Secondary orb — purple, drifting */}
      <motion.div
        className="absolute w-[600px] h-[600px] top-[20%] -right-[200px]"
        animate={{
          x: [0, 30, -10, 0], y: [0, -20, 15, 0],
          scale: [1, 1.05, 0.95, 1], opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(circle, rgba(124,92,252,0.1) 0%, transparent 60%)' }}
      />

      {/* Tertiary orb — indigo, opposite drift */}
      <motion.div
        className="absolute w-[500px] h-[500px] top-[40%] -left-[150px]"
        animate={{
          x: [0, -25, 10, 0], y: [0, 15, -20, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 60%)' }}
      />

      {/* Grid — enhanced */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => {
        const left = `${(i * 3.3 + 7) % 100}%`
        const top = `${(i * 7.1 + 13) % 100}%`
        const color = i % 4 === 0 ? 'rgba(0,209,255,0.5)' : i % 4 === 1 ? 'rgba(124,92,252,0.4)' : i % 4 === 2 ? 'rgba(168,85,247,0.35)' : 'rgba(99,102,241,0.3)'
        const size = i % 3 === 0 ? 2 : 1.5
        const dur = 5 + (i % 7)
        const delay = (i % 5) * 0.6
        return (
          <motion.div
            key={`p-${i}`}
            className="absolute rounded-full"
            style={{ left, top, width: size, height: size, backgroundColor: color }}
            animate={{
              y: [0, -(20 + (i % 3) * 15), 0],
              x: [0, (i % 2 === 0 ? 12 : -12), 0],
              opacity: [0.15, 0.6, 0.15],
              scale: [1, 1.4, 1],
            }}
            transition={{ duration: dur, repeat: Infinity, delay, ease: 'easeInOut' }}
          />
        )
      })}

      {/* Constellation grid lines — faint, animated */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
        {Array.from({ length: 8 }).map((_, i) => {
          const x1 = `${10 + i * 12}%`
          const y1 = `${5 + (i * 17) % 90}%`
          const x2 = `${20 + ((i + 3) * 11) % 70}%`
          const y2 = `${15 + ((i + 2) * 13) % 80}%`
          return (
            <line key={`cl-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00D1FF" strokeWidth="0.5">
              <animate attributeName="opacity" values="0;0.5;0" dur={`${4 + i}s`} repeatCount="indefinite" begin={`${i * 0.5}s`} />
            </line>
          )
        })}
      </svg>

      {/* Vignette edges for depth */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, rgba(6,9,16,0.6) 100%)',
      }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48"
        style={{ background: 'linear-gradient(to top, var(--bg-base), transparent)' }}
      />
    </div>
  )
}

/* ── Forge-style input ───────────────────────────────────────────────────── */

function ForgeInput({
  value, onChange, onSubmit, placeholder, disabled, inputRef,
}: {
  value: string; onChange: (v: string) => void; onSubmit: () => void
  placeholder: string; disabled: boolean; inputRef: React.RefObject<HTMLTextAreaElement>
}) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSubmit() }
  }
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = '0'
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px'
    }
  }, [value, inputRef])

  return (
    <div className="flex items-end gap-2 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-overlay)] px-3 py-2 transition-colors focus-within:border-[#00D1FF]/30">
      <textarea ref={inputRef} value={value} onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown} placeholder={placeholder} disabled={disabled} rows={1}
        className="flex-1 resize-none bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none disabled:opacity-40"
        style={{ minHeight: '24px', maxHeight: '120px' }} autoFocus
      />
      <button onClick={onSubmit} disabled={!value.trim() || disabled}
        className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-[#00D1FF]/15 text-[#00D1FF] hover:bg-[#00D1FF]/25 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  )
}

/* ── Message bubbles ─────────────────────────────────────────────────────── */

function UserBubble({ content }: { content: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="flex justify-end">
      <div className="bg-[#00D1FF]/10 text-[var(--text-primary)] rounded-xl rounded-tr-sm px-3.5 py-2.5 max-w-[80%]">
        <p className="text-sm leading-relaxed">{content}</p>
      </div>
    </motion.div>
  )
}

function OttoBubble({ content, isLatest }: { content: string; isLatest: boolean }) {
  const { displayed, done } = useTypewriter(isLatest ? content : '', 14)
  const text = isLatest ? displayed : content
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="flex gap-2.5 items-start">
      <OttoMark />
      <div className="bg-[var(--bg-overlay)] text-[var(--text-secondary)] rounded-xl rounded-tl-sm px-3.5 py-2.5 max-w-[80%]">
        <p className="text-sm leading-relaxed whitespace-pre-line">
          {text}
          {isLatest && !done && <span className="inline-block w-[2px] h-[14px] bg-[#00D1FF] ml-0.5 align-middle animate-pulse" />}
        </p>
      </div>
    </motion.div>
  )
}

/* ── Suggestion pills — randomized subset ────────────────────────────────── */

function SuggestionPills({ onSelect }: { onSelect: (text: string) => void }) {
  // Show 7 random pills on mount
  const [pills] = useState(() => {
    const shuffled = [...SUGGESTION_PILLS].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 7)
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="flex flex-wrap justify-center gap-2 mt-5"
    >
      {pills.map((pill) => (
        <button key={pill} onClick={() => onSelect(pill)}
          className="rounded-full border border-[var(--border-primary)] bg-[var(--bg-overlay)]/80 px-3.5 py-1.5 text-[11px] text-[var(--text-muted)] hover:border-[#00D1FF]/30 hover:text-[#00D1FF] hover:bg-[#00D1FF]/[0.04] transition-all duration-200"
        >
          {pill}
        </button>
      ))}
    </motion.div>
  )
}

/* ── Glass container ─────────────────────────────────────────────────────── */

function GlassContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-[rgba(30,35,48,0.6)] shadow-2xl shadow-black/40 backdrop-blur-xl ${className}`}
      style={{ background: 'rgba(21, 25, 35, 0.75)' }}
    >
      <div className="h-px w-full rounded-t-2xl" style={{ background: 'rgba(255, 255, 255, 0.05)' }} />
      {children}
    </div>
  )
}

/* ── DAG Spec Card ───────────────────────────────────────────────────────── */

function DagSpecCard({ spec, onContinue }: { spec: DagSpec; onContinue: () => void }) {
  const handleDownload = useCallback(async () => {
    const text = formatSpecAsText(spec)
    try { await navigator.clipboard.writeText(text) } catch {
      const blob = new Blob([text], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a'); a.href = url
      a.download = `otto-spec-${spec.industry?.toLowerCase().replace(/\s+/g, '-') || 'workflow'}.txt`
      a.click(); URL.revokeObjectURL(url)
    }
  }, [spec])

  return (
    <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="w-full"
    >
      <GlassContainer>
        <div className="px-5 pt-4 pb-3 border-b border-[rgba(30,35,48,0.5)]">
          <div className="flex items-center gap-3">
            <OttoMark size="lg" />
            <div>
              <p className="text-[10px] font-mono text-[#00D1FF] uppercase tracking-widest">Otto Workflow Spec</p>
              <h3 className="text-base font-bold text-[var(--text-primary)]">{spec.dag.name}</h3>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] rounded-full px-2.5 py-0.5">{spec.role}</span>
            <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] rounded-full px-2.5 py-0.5">{spec.industry}</span>
          </div>
        </div>
        <div className="px-5 py-2.5 bg-[#00D1FF]/[0.03] border-b border-[rgba(30,35,48,0.5)]">
          <p className="text-xs text-[var(--text-secondary)]"><span className="text-[#00D1FF] font-semibold">Insight:</span> {spec.team_insight}</p>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5"><span className="text-[#A855F7] font-semibold">Gap:</span> {spec.gap}</p>
        </div>
        <div className="px-5 py-4">
          <div className="space-y-0">
            {spec.dag.nodes.map((node, i) => (
              <motion.div key={node.id} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.3 }}>
                {i > 0 && (
                  <div className="flex items-center ml-[18px] py-0.5">
                    <div className="w-px h-3 bg-[var(--border-primary)]" />
                    <ArrowDown className="w-2.5 h-2.5 text-[var(--text-muted)] ml-[-5.5px]" />
                  </div>
                )}
                <div className={`flex items-start gap-3 rounded-lg px-2.5 py-2 ${node.is_gate ? 'bg-[#00D1FF]/[0.04] border border-[#00D1FF]/15' : 'hover:bg-[rgba(255,255,255,0.02)]'} transition-colors`}>
                  <div className="mt-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CHAMBER_COLORS[node.chamber] || '#7C5CFC', boxShadow: `0 0 6px ${CHAMBER_COLORS[node.chamber] || '#7C5CFC'}40` }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[13px] font-semibold text-[var(--text-primary)]">{node.is_gate ? '⬡ ' : ''}{node.label}</span>
                      <span className="text-[8px] font-mono uppercase tracking-wider px-1.5 py-px rounded" style={{ color: CHAMBER_COLORS[node.chamber], backgroundColor: `${CHAMBER_COLORS[node.chamber]}12` }}>{CHAMBER_LABELS[node.chamber]}</span>
                      {node.is_gate && <span className="text-[8px] font-mono text-[#00D1FF] bg-[#00D1FF]/10 px-1.5 py-px rounded uppercase tracking-wider">Gate</span>}
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-relaxed">{node.description}</p>
                    <p className="text-[9px] text-[#7C5CFC]/50 mt-0.5 font-mono">Otto → {node.persona}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="px-5 py-2.5 border-t border-[rgba(30,35,48,0.5)] bg-[var(--bg-sunken)]/50">
          <p className="text-[11px] text-[var(--text-secondary)] text-center italic">&quot;{spec.otto_value}&quot;</p>
        </div>
        <div className="px-5 py-2.5 border-t border-[rgba(30,35,48,0.5)] flex items-center justify-between">
          <span className="text-[8px] font-mono text-[var(--text-muted)] uppercase tracking-wider">Airlock &middot; Constellation Engine</span>
          <button onClick={handleDownload} className="flex items-center gap-1.5 text-[11px] font-medium text-[#00D1FF] hover:text-[#00D1FF]/80 transition-colors">
            <Download className="w-3 h-3" />Save
          </button>
        </div>
      </GlassContainer>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.5 }} className="mt-6 text-center">
        <button onClick={onContinue} className="bg-[#00D1FF] text-[#0B0E14] font-semibold rounded-xl h-11 px-8 hover:shadow-[0_0_16px_2px_rgba(0,209,255,0.25)] transition-all text-sm">
          Want Otto to run this for real?
        </button>
        <p className="text-[var(--text-muted)] text-[10px] mt-2 font-mono">Get early access to the Airlock platform</p>
      </motion.div>
    </motion.div>
  )
}

function formatSpecAsText(spec: DagSpec): string {
  let text = `OTTO WORKFLOW SPEC\n${'═'.repeat(40)}\n\n`
  text += `Playbook: ${spec.dag.name}\nRole: ${spec.role}\nIndustry: ${spec.industry}\n\n`
  text += `Team Insight: ${spec.team_insight}\nGap Otto Fills: ${spec.gap}\n\n`
  text += `WORKFLOW\n${'─'.repeat(40)}\n\n`
  spec.dag.nodes.forEach((node, i) => {
    const gate = node.is_gate ? ' [GATE]' : ''
    text += `${i + 1}. [${node.chamber.toUpperCase()}] ${node.label}${gate}\n   ${node.description}\n   Otto mode: ${node.persona}\n`
    if (i < spec.dag.nodes.length - 1) text += `   ↓\n`
  })
  text += `\n${'─'.repeat(40)}\n"${spec.otto_value}"\n\nGenerated by Otto · doyoulikedags.xyz\n`
  return text
}

/* ── Generating animation ────────────────────────────────────────────────── */

function GeneratingSpec() {
  const steps = ['Mapping behavioral drives...', 'Computing sovereign balance...', 'Routing personas...', 'Building your playbook...']
  const [step, setStep] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setStep((p) => Math.min(p + 1, steps.length - 1)), 900)
    return () => clearInterval(timer)
  }, [steps.length])

  return (
    <GlassContainer className="py-8 px-6">
      <div className="flex flex-col items-center gap-5">
        {/* Otto is flipping above — this just shows the progress steps */}
        <div className="flex items-center gap-3">
          {[0, 1, 2, 3].map((i) => (
            <motion.div key={i} className="w-3 h-3 rounded-full"
              style={{ backgroundColor: Object.values(CHAMBER_COLORS)[i] }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            />
          ))}
        </div>
        <div className="space-y-1">
          {steps.map((s, i) => (
            <motion.p key={s} initial={{ opacity: 0.3 }} animate={{ opacity: i <= step ? 1 : 0.3 }}
              className="text-[11px] font-mono text-center"
              style={{ color: i <= step ? '#00D1FF' : 'var(--text-muted)' }}
            >
              {i < step ? '\u2713' : i === step ? '\u203A' : '\u00B7'} {s}
            </motion.p>
          ))}
        </div>
      </div>
    </GlassContainer>
  )
}

/* ── Main Hero ───────────────────────────────────────────────────────────── */

export default function HeroChat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [phase, setPhase] = useState<Phase>('chat')
  const [loading, setLoading] = useState(false)
  const [spec, setSpec] = useState<DagSpec | null>(null)
  const [latestAssistantIdx, setLatestAssistantIdx] = useState(-1)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, loading])

  const doSend = useCallback(async (text?: string) => {
    const msg = (text || input).trim()
    if (!msg || loading) return
    const userMsg: ChatMsg = { role: 'user', content: msg }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages); setInput(''); setLoading(true)
    try {
      const res = await fetch('/api/otto-chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      const updated = [...newMessages, { role: 'assistant' as const, content: data.response }]
      setMessages(updated); setLatestAssistantIdx(updated.length - 1)
      if (data.ready) setTimeout(() => generateSpec(updated), 2000)
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Connection dropped. Try that again.' }])
    } finally { setLoading(false) }
  }, [input, messages, loading])

  const generateSpec = async (chatMessages: ChatMsg[]) => {
    setPhase('generating')
    try {
      const res = await fetch('/api/otto-chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatMessages, generateSpec: true }),
      })
      const data = await res.json()
      if (data.spec) setTimeout(() => { setSpec(data.spec); setPhase('spec') }, 3600)
      else setPhase('chat')
    } catch { setPhase('chat') }
  }

  const handleReset = () => {
    setMessages([]); setPhase('chat'); setSpec(null); setLoading(false); setLatestAssistantIdx(-1)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 pb-8">
      <HeroBackground />

      <div className="relative z-10 px-4 sm:px-6 py-8 md:py-16 w-full max-w-[680px] mx-auto">
        {/* Otto floats freely above everything */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 150 }}
          className="flex justify-center mb-2"
        >
          <FloatingOtto flipping={phase === 'generating'} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-center mb-6">
          <div className="flex items-center justify-center gap-1.5 mb-3">
            <span className="text-base font-bold text-[var(--text-primary)]">Otto</span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-[11px] text-[var(--text-muted)] font-mono">Online</span>
          </div>

          <h1 className="font-bold leading-[1.1] tracking-tight mb-2" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)' }}>
            <span className="gradient-text-white">Hi, I&apos;m Otto.</span>
            <br />
            <span className="text-[#7C5CFC]">The ultimate team player.</span>
          </h1>
          <p className="text-[var(--text-muted)] text-sm max-w-sm mx-auto">
            Tell me what you do — I&apos;ll show you how I&apos;d work on your team.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {phase === 'chat' && (
            <motion.div key="chat" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
              <GlassContainer className="flex flex-col">
                <div className="px-4 py-4 space-y-3 max-h-[45vh] overflow-y-auto scrollbar-thin">
                  {messages.length === 0 && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2.5 items-start">
                      <OttoMark />
                      <div className="bg-[var(--bg-overlay)] rounded-xl rounded-tl-sm px-3.5 py-2.5">
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          I map how teams think and fill the gaps nobody hired for. What do you do? I&apos;ll build you a workflow spec — no sign-up required.
                        </p>
                      </div>
                    </motion.div>
                  )}
                  {messages.map((msg, i) => (
                    msg.role === 'user'
                      ? <UserBubble key={i} content={msg.content} />
                      : <OttoBubble key={i} content={msg.content} isLatest={i === latestAssistantIdx} />
                  ))}
                  {loading && (
                    <div className="flex gap-2.5 items-start">
                      <OttoMark />
                      <div className="bg-[var(--bg-overlay)] rounded-xl rounded-tl-sm px-3.5 py-2"><TypingIndicator /></div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                <div className="px-4 pb-3 pt-1 border-t border-[rgba(30,35,48,0.5)]">
                  <ForgeInput value={input} onChange={setInput} onSubmit={() => doSend()}
                    placeholder={messages.length === 0 ? 'Tell Otto what you do...' : 'Reply...'} disabled={loading} inputRef={inputRef} />
                </div>
              </GlassContainer>
              {messages.length === 0 && <SuggestionPills onSelect={(t) => doSend(t)} />}
            </motion.div>
          )}

          {phase === 'generating' && (
            <motion.div key="generating" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.4 }}>
              <GeneratingSpec />
            </motion.div>
          )}

          {phase === 'spec' && spec && (
            <motion.div key="spec" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DagSpecCard spec={spec} onContinue={() => setPhase('capture')} />
            </motion.div>
          )}

          {phase === 'capture' && (
            <motion.div key="capture" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
              <GlassContainer className="px-6 py-8">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Your spec is ready.</h2>
                <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto mb-6">
                  That was a preview. The real Otto runs these workflows live — with your team, your data, and gates that keep humans in the loop.
                </p>
                <EmailCapture variant="hero" />
              </GlassContainer>
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                onClick={handleReset}
                className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[#00D1FF] transition-colors text-xs font-medium mx-auto mt-4"
              >
                <RotateCcw className="w-3 h-3" />Start over
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
