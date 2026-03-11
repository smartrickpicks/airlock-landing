'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, FormEvent, useCallback, KeyboardEvent } from 'react'
import { ArrowRight, RotateCcw, Download, ArrowDown, Send } from 'lucide-react'
import EmailCapture from './EmailCapture'

/* ── Types ───────────────────────────────────────────────────────────────── */

interface ChatMsg {
  role: 'user' | 'assistant'
  content: string
}

interface DagNode {
  id: number
  label: string
  chamber: 'discovery' | 'build' | 'verify' | 'ship'
  description: string
  persona: string
  is_gate: boolean
}

interface DagSpec {
  role: string
  industry: string
  team_insight: string
  gap: string
  dag: {
    name: string
    nodes: DagNode[]
  }
  otto_value: string
  use_case_tags: string[]
}

type Phase = 'chat' | 'generating' | 'spec' | 'capture'

/* ── Constants ───────────────────────────────────────────────────────────── */

const CHAMBER_COLORS: Record<string, string> = {
  discovery: '#EF4444',
  build: '#EAB308',
  verify: '#A855F7',
  ship: '#22C55E',
}

const CHAMBER_LABELS: Record<string, string> = {
  discovery: 'Discovery',
  build: 'Build',
  verify: 'Verify',
  ship: 'Ship',
}

const SUGGESTION_PILLS = [
  'I raise capital for oil and gas',
  'I run a fashion label',
  'I manage a sales team',
  'I\'m scaling a startup',
  'I run procurement',
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
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(timer); setDone(true) }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])
  return { displayed, done }
}

/* ── Sub-components ──────────────────────────────────────────────────────── */

function OttoAvatar({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const dim = size === 'lg' ? 'w-10 h-10' : 'w-8 h-8'
  return (
    <div className={`${dim} rounded-full bg-[#7C5CFC]/10 border border-[#7C5CFC]/30 flex items-center justify-center shrink-0`}>
      <svg viewBox="0 0 24 24" className={size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}>
        <circle cx="9" cy="11" r="2.5" fill="#7C5CFC" />
        <circle cx="15" cy="11" r="2.5" fill="#7C5CFC" />
        <circle cx="8" cy="10" r="0.8" fill="#fff" opacity="0.7" />
        <circle cx="14" cy="10" r="0.8" fill="#fff" opacity="0.7" />
        <line x1="9" y1="11" x2="12" y2="7" stroke="#7C5CFC" strokeWidth="0.5" opacity="0.4" />
        <line x1="15" y1="11" x2="12" y2="7" stroke="#7C5CFC" strokeWidth="0.5" opacity="0.4" />
        <circle cx="12" cy="7" r="1.5" fill="#7C5CFC" opacity="0.5" />
        <circle cx="5" cy="5" r="1" fill="#EF4444" opacity="0.6" />
        <circle cx="19" cy="5" r="1" fill="#EAB308" opacity="0.6" />
        <circle cx="19" cy="19" r="1" fill="#A855F7" opacity="0.6" />
        <circle cx="5" cy="19" r="1" fill="#22C55E" opacity="0.6" />
      </svg>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-1 px-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#00D1FF]/60"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

/* ── Forge-style auto-expanding textarea input ───────────────────────────── */

function ForgeInput({
  value,
  onChange,
  onSubmit,
  placeholder,
  disabled,
  inputRef,
}: {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  placeholder: string
  disabled: boolean
  inputRef: React.RefObject<HTMLTextAreaElement>
}) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  // Auto-resize
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = '0'
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px'
    }
  }, [value, inputRef])

  return (
    <div className="flex items-end gap-2 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-overlay)] px-3 py-2 transition-colors focus-within:border-[#00D1FF]/30">
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none disabled:opacity-40"
        style={{ minHeight: '24px', maxHeight: '120px' }}
        autoFocus
      />
      <button
        onClick={onSubmit}
        disabled={!value.trim() || disabled}
        className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-[#00D1FF]/15 text-[#00D1FF] hover:bg-[#00D1FF]/25 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  )
}

/* ── Forge-style message bubbles ─────────────────────────────────────────── */

function UserBubble({ content }: { content: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex justify-end"
    >
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
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex gap-2.5 items-start"
    >
      <OttoAvatar />
      <div className="bg-[var(--bg-overlay)] text-[var(--text-secondary)] rounded-xl rounded-tl-sm px-3.5 py-2.5 max-w-[80%]">
        <p className="text-sm leading-relaxed whitespace-pre-line">
          {text}
          {isLatest && !done && (
            <span className="inline-block w-[2px] h-[14px] bg-[#00D1FF] ml-0.5 align-middle animate-pulse" />
          )}
        </p>
      </div>
    </motion.div>
  )
}

/* ── Suggestion pills ────────────────────────────────────────────────────── */

function SuggestionPills({ onSelect }: { onSelect: (text: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="flex flex-wrap justify-center gap-2 mt-4"
    >
      {SUGGESTION_PILLS.map((pill) => (
        <button
          key={pill}
          onClick={() => onSelect(pill)}
          className="rounded-full border border-[var(--border-primary)] bg-[var(--bg-overlay)] px-3 py-1.5 text-[11px] text-[var(--text-muted)] hover:border-[#00D1FF]/30 hover:text-[#00D1FF] transition-colors"
        >
          {pill}
        </button>
      ))}
    </motion.div>
  )
}

/* ── Glass container (Forge-style) ───────────────────────────────────────── */

function GlassContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-[rgba(30,35,48,0.5)] shadow-2xl backdrop-blur-xl ${className}`}
      style={{ background: 'rgba(21, 25, 35, 0.72)' }}
    >
      {/* Glass edge highlight */}
      <div className="h-px w-full rounded-t-2xl" style={{ background: 'rgba(255, 255, 255, 0.04)' }} />
      {children}
    </div>
  )
}

/* ── DAG Spec Card (Forge glass style) ───────────────────────────────────── */

function DagSpecCard({ spec, onContinue }: { spec: DagSpec; onContinue: () => void }) {
  const handleDownload = useCallback(async () => {
    const text = formatSpecAsText(spec)
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const blob = new Blob([text], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `otto-spec-${spec.industry?.toLowerCase().replace(/\s+/g, '-') || 'workflow'}.txt`
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [spec])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <GlassContainer>
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-[rgba(30,35,48,0.5)]">
          <div className="flex items-center gap-3">
            <OttoAvatar size="lg" />
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

        {/* Insight bar */}
        <div className="px-5 py-2.5 bg-[#00D1FF]/[0.03] border-b border-[rgba(30,35,48,0.5)]">
          <p className="text-xs text-[var(--text-secondary)]">
            <span className="text-[#00D1FF] font-semibold">Insight:</span> {spec.team_insight}
          </p>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            <span className="text-[#A855F7] font-semibold">Gap:</span> {spec.gap}
          </p>
        </div>

        {/* DAG nodes */}
        <div className="px-5 py-4">
          <div className="space-y-0">
            {spec.dag.nodes.map((node, i) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.3 }}
              >
                {i > 0 && (
                  <div className="flex items-center ml-[18px] py-0.5">
                    <div className="w-px h-3 bg-[var(--border-primary)]" />
                    <ArrowDown className="w-2.5 h-2.5 text-[var(--text-muted)] ml-[-5.5px]" />
                  </div>
                )}
                <div
                  className={`flex items-start gap-3 rounded-lg px-2.5 py-2 ${
                    node.is_gate
                      ? 'bg-[#00D1FF]/[0.04] border border-[#00D1FF]/15'
                      : 'hover:bg-[rgba(255,255,255,0.02)]'
                  } transition-colors`}
                >
                  <div className="mt-1.5 shrink-0">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor: CHAMBER_COLORS[node.chamber] || '#7C5CFC',
                        boxShadow: `0 0 6px ${CHAMBER_COLORS[node.chamber] || '#7C5CFC'}40`,
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[13px] font-semibold text-[var(--text-primary)]">
                        {node.is_gate ? '⬡ ' : ''}{node.label}
                      </span>
                      <span
                        className="text-[8px] font-mono uppercase tracking-wider px-1.5 py-px rounded"
                        style={{
                          color: CHAMBER_COLORS[node.chamber],
                          backgroundColor: `${CHAMBER_COLORS[node.chamber]}12`,
                        }}
                      >
                        {CHAMBER_LABELS[node.chamber]}
                      </span>
                      {node.is_gate && (
                        <span className="text-[8px] font-mono text-[#00D1FF] bg-[#00D1FF]/10 px-1.5 py-px rounded uppercase tracking-wider">
                          Gate
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-relaxed">{node.description}</p>
                    <p className="text-[9px] text-[#7C5CFC]/50 mt-0.5 font-mono">Otto → {node.persona}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Value line */}
        <div className="px-5 py-2.5 border-t border-[rgba(30,35,48,0.5)] bg-[var(--bg-sunken)]/50">
          <p className="text-[11px] text-[var(--text-secondary)] text-center italic">&quot;{spec.otto_value}&quot;</p>
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-[rgba(30,35,48,0.5)] flex items-center justify-between">
          <span className="text-[8px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
            Airlock &middot; Constellation Engine
          </span>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 text-[11px] font-medium text-[#00D1FF] hover:text-[#00D1FF]/80 transition-colors"
          >
            <Download className="w-3 h-3" />
            Save
          </button>
        </div>
      </GlassContainer>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mt-6 text-center"
      >
        <button
          onClick={onContinue}
          className="bg-[#00D1FF] text-[#0B0E14] font-semibold rounded-xl h-11 px-8 hover:shadow-[0_0_16px_2px_rgba(0,209,255,0.25)] transition-all text-sm"
        >
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
    text += `${i + 1}. [${node.chamber.toUpperCase()}] ${node.label}${gate}\n`
    text += `   ${node.description}\n`
    text += `   Otto mode: ${node.persona}\n`
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
        {/* Orbiting constellation */}
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute inset-0 rounded-full border border-[#00D1FF]/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <OttoAvatar size="lg" />
          </div>
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{ backgroundColor: Object.values(CHAMBER_COLORS)[i], top: '50%', left: '50%' }}
              animate={{
                x: [Math.cos((i / 4) * Math.PI * 2) * 28, Math.cos((i / 4) * Math.PI * 2 + Math.PI) * 28, Math.cos((i / 4) * Math.PI * 2) * 28],
                y: [Math.sin((i / 4) * Math.PI * 2) * 28, Math.sin((i / 4) * Math.PI * 2 + Math.PI) * 28, Math.sin((i / 4) * Math.PI * 2) * 28],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
            />
          ))}
        </div>
        <div className="space-y-1">
          {steps.map((s, i) => (
            <motion.p
              key={s}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: i <= step ? 1 : 0.3 }}
              className="text-[11px] font-mono text-center"
              style={{ color: i <= step ? '#00D1FF' : 'var(--text-muted)' }}
            >
              {i < step ? '✓' : i === step ? '›' : '·'} {s}
            </motion.p>
          ))}
        </div>
      </div>
    </GlassContainer>
  )
}

/* ── Background ──────────────────────────────────────────────────────────── */

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-[700px] h-[700px] -top-[200px] left-1/2 -translate-x-1/2 animate-glow-breathe"
        style={{ background: 'radial-gradient(circle, rgba(0,209,255,0.08) 0%, rgba(124,92,252,0.06) 40%, transparent 70%)' }}
      />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: 'linear-gradient(to top, var(--bg-base), transparent)' }}
      />
    </div>
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
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/otto-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      const assistantMsg: ChatMsg = { role: 'assistant', content: data.response }
      const updated = [...newMessages, assistantMsg]
      setMessages(updated)
      setLatestAssistantIdx(updated.length - 1)

      if (data.ready) {
        setTimeout(() => generateSpec(updated), 2000)
      }
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Connection dropped. Try that again.' }])
    } finally {
      setLoading(false)
    }
  }, [input, messages, loading])

  const generateSpec = async (chatMessages: ChatMsg[]) => {
    setPhase('generating')
    try {
      const res = await fetch('/api/otto-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatMessages, generateSpec: true }),
      })
      const data = await res.json()
      if (data.spec) {
        setTimeout(() => { setSpec(data.spec); setPhase('spec') }, 3600)
      } else {
        setPhase('chat')
      }
    } catch {
      setPhase('chat')
    }
  }

  const handleReset = () => {
    setMessages([]); setPhase('chat'); setSpec(null); setLoading(false); setLatestAssistantIdx(-1)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handlePillSelect = (text: string) => {
    doSend(text)
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 pb-8">
      <HeroBackground />

      <div className="relative z-10 px-4 sm:px-6 py-8 md:py-16 w-full max-w-[680px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <OttoAvatar size="lg" />
            <div className="text-left">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Otto</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-[10px] text-[var(--text-muted)] font-mono">Online</span>
              </div>
            </div>
          </div>

          <h1
            className="font-bold leading-[1.1] tracking-tight mb-2"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)' }}
          >
            <span className="gradient-text-white">Tell me what you do.</span>
          </h1>
          <p className="text-[var(--text-muted)] text-sm">
            I&apos;ll build you a workflow spec — on the house.
          </p>
        </motion.div>

        {/* ── Phase: Chat ─────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {phase === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <GlassContainer className="flex flex-col">
                {/* Messages */}
                <div className="px-4 py-4 space-y-3 max-h-[45vh] overflow-y-auto scrollbar-thin">
                  {messages.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-2.5 items-start"
                    >
                      <OttoAvatar />
                      <div className="bg-[var(--bg-overlay)] rounded-xl rounded-tl-sm px-3.5 py-2.5">
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Hey. I&apos;m Otto. Tell me what you do and I&apos;ll show you how I&apos;d work on your team. No sign-up, no catch.
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
                      <OttoAvatar />
                      <div className="bg-[var(--bg-overlay)] rounded-xl rounded-tl-sm px-3.5 py-2">
                        <TypingIndicator />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className="px-4 pb-3 pt-1 border-t border-[rgba(30,35,48,0.5)]">
                  <ForgeInput
                    value={input}
                    onChange={setInput}
                    onSubmit={() => doSend()}
                    placeholder={messages.length === 0 ? 'Tell Otto what you do...' : 'Reply...'}
                    disabled={loading}
                    inputRef={inputRef}
                  />
                </div>
              </GlassContainer>

              {/* Suggestion pills — only before first message */}
              {messages.length === 0 && (
                <SuggestionPills onSelect={handlePillSelect} />
              )}
            </motion.div>
          )}

          {/* ── Phase: Generating ─────────────────────────────────── */}
          {phase === 'generating' && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <GeneratingSpec />
            </motion.div>
          )}

          {/* ── Phase: Spec ───────────────────────────────────────── */}
          {phase === 'spec' && spec && (
            <motion.div
              key="spec"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DagSpecCard spec={spec} onContinue={() => setPhase('capture')} />
            </motion.div>
          )}

          {/* ── Phase: Capture ────────────────────────────────────── */}
          {phase === 'capture' && (
            <motion.div
              key="capture"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <GlassContainer className="px-6 py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/20 flex items-center justify-center"
                >
                  <OttoAvatar size="lg" />
                </motion.div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                  Your spec is ready.
                </h2>
                <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto mb-6">
                  That was a preview. The real Otto runs these workflows live — with your team, your data, and gates that keep humans in the loop.
                </p>
                <EmailCapture variant="hero" />
              </GlassContainer>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={handleReset}
                className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[#00D1FF] transition-colors text-xs font-medium mx-auto mt-4"
              >
                <RotateCcw className="w-3 h-3" />
                Start over
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
