'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import { viewportConfig } from '@/lib/animations'

/* ── Constellation node data ─────────────────────────────────────────────── */

interface ConstellationNode {
  x: number
  y: number
  r: number
  type: 'eye' | 'node' | 'chamber'
  color?: string
}

const CONSTELLATION_NODES: ConstellationNode[] = [
  // Eyes (brightest)
  { x: 120, y: 130, r: 8, type: 'eye' },
  { x: 200, y: 130, r: 8, type: 'eye' },
  // Forehead
  { x: 160, y: 75, r: 4, type: 'node' },
  { x: 130, y: 85, r: 3, type: 'node' },
  { x: 190, y: 85, r: 3, type: 'node' },
  // Brow
  { x: 105, y: 110, r: 3, type: 'node' },
  { x: 215, y: 110, r: 3, type: 'node' },
  // Nose bridge
  { x: 160, y: 150, r: 4, type: 'node' },
  // Mouth
  { x: 140, y: 175, r: 3, type: 'node' },
  { x: 160, y: 180, r: 3, type: 'node' },
  { x: 180, y: 175, r: 3, type: 'node' },
  // Jaw
  { x: 110, y: 185, r: 2.5, type: 'node' },
  { x: 210, y: 185, r: 2.5, type: 'node' },
  // Chin
  { x: 160, y: 205, r: 3, type: 'node' },
  // Chamber corners
  { x: 55, y: 50, r: 5, type: 'chamber', color: 'var(--chamber-discover)' },
  { x: 265, y: 50, r: 5, type: 'chamber', color: 'var(--chamber-build)' },
  { x: 265, y: 260, r: 5, type: 'chamber', color: 'var(--chamber-review)' },
  { x: 55, y: 260, r: 5, type: 'chamber', color: 'var(--chamber-ship)' },
  // Outer
  { x: 80, y: 140, r: 2.5, type: 'node' },
  { x: 240, y: 140, r: 2.5, type: 'node' },
  { x: 100, y: 220, r: 2.5, type: 'node' },
  { x: 220, y: 220, r: 2.5, type: 'node' },
  { x: 160, y: 240, r: 3, type: 'node' },
]

const CONSTELLATION_EDGES: [number, number][] = [
  [0, 3], [0, 5], [0, 7], [1, 4], [1, 6], [1, 7],
  [2, 3], [2, 4], [3, 5], [4, 6],
  [7, 8], [7, 9], [7, 10], [8, 9], [9, 10],
  [5, 11], [6, 12], [8, 11], [10, 12], [11, 13], [12, 13], [9, 13],
  [3, 14], [5, 14], [4, 15], [6, 15],
  [12, 16], [21, 16], [11, 17], [20, 17],
  [5, 18], [0, 18], [6, 19], [1, 19],
  [11, 20], [18, 20], [12, 21], [19, 21],
  [13, 22], [20, 22], [21, 22],
  [14, 18], [15, 19], [16, 21], [17, 20],
]

/* ── Mode transforms ─────────────────────────────────────────────────────── */

type ConstellationMode = 'default' | 'analyst' | 'maverick' | 'guardian' | 'strategist'

function getNodePosition(node: ConstellationNode, index: number, mode: ConstellationMode) {
  const cx = 160, cy = 155
  switch (mode) {
    case 'analyst': {
      return { x: cx + (node.x - cx) * 0.7, y: cy + (node.y - cy) * 0.7 }
    }
    case 'maverick': {
      return { x: cx + (node.x - cx) * 1.25, y: cy + (node.y - cy) * 1.25 }
    }
    case 'guardian': {
      const dx = node.x - cx, dy = node.y - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist > 60) {
        const angle = Math.atan2(dy, dx)
        return { x: cx + Math.cos(angle) * 95, y: cy + Math.sin(angle) * 95 }
      }
      return { x: node.x, y: node.y }
    }
    case 'strategist': {
      if (index < 2) return { x: node.x, y: node.y }
      const angle = (index / CONSTELLATION_NODES.length) * Math.PI * 2
      const radius = 50 + (index % 3) * 35
      return { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius }
    }
    default:
      return { x: node.x, y: node.y }
  }
}

/* ── Constellation SVG ───────────────────────────────────────────────────── */

function ConstellationSVG({ mode }: { mode: ConstellationMode }) {
  const positions = CONSTELLATION_NODES.map((n, i) => ({
    ...getNodePosition(n, i, mode),
    r: n.r,
    type: n.type,
    color: n.color,
  }))

  return (
    <svg viewBox="0 0 320 320" className="w-full h-full">
      {/* Edges */}
      {CONSTELLATION_EDGES.map(([a, b], i) => {
        const pa = positions[a], pb = positions[b]
        return (
          <motion.line
            key={`e-${i}`}
            animate={{ x1: pa.x, y1: pa.y, x2: pb.x, y2: pb.y }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            stroke="rgba(124,92,252,0.2)"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity={0.6}
          >
            <animate
              attributeName="stroke-opacity"
              values="0.15;0.4;0.15"
              dur={`${3 + i * 0.1}s`}
              repeatCount="indefinite"
            />
          </motion.line>
        )
      })}

      {/* Nodes */}
      {positions.map((n, i) => (
        <g key={`n-${i}`}>
          {/* Glow for eyes */}
          {n.type === 'eye' && (
            <motion.circle
              animate={{ cx: n.x, cy: n.y }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              r="18"
              fill="none"
              stroke="rgba(124,92,252,0.15)"
              strokeWidth="1"
            >
              <animate attributeName="r" values="14;20;14" dur="3s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.15;0.05;0.15" dur="3s" repeatCount="indefinite" />
            </motion.circle>
          )}

          {/* Node circle */}
          <motion.circle
            animate={{ cx: n.x, cy: n.y }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            r={n.r}
            fill={n.color || '#7C5CFC'}
            opacity={n.type === 'chamber' ? 0.7 : n.type === 'eye' ? 1 : 0.6}
          >
            {n.type !== 'eye' && (
              <animate
                attributeName="r"
                values={`${n.r - 1};${n.r + 1};${n.r - 1}`}
                dur={`${3 + i * 0.15}s`}
                repeatCount="indefinite"
              />
            )}
          </motion.circle>

          {/* Eye highlight */}
          {n.type === 'eye' && (
            <motion.circle
              animate={{ cx: n.x - 2, cy: n.y - 2 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              r="2.5"
              fill="#fff"
              opacity={0.6}
            />
          )}
        </g>
      ))}
    </svg>
  )
}

/* ── Otter SVG ───────────────────────────────────────────────────────────── */

function OtterSVG() {
  return (
    <svg viewBox="0 0 280 320" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 30px rgba(124,92,252,0.12))' }}>
      {/* Body */}
      <g>
        {/* Tail */}
        <path
          d="M 140 250 Q 175 265 185 248 Q 190 238 180 232"
          stroke="rgba(124,92,252,0.3)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        >
          <animate
            attributeName="d"
            values="M 140 250 Q 175 265 185 248 Q 190 238 180 232;M 140 250 Q 180 260 188 244 Q 195 230 182 228;M 140 250 Q 175 265 185 248 Q 190 238 180 232"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>

        {/* Body outline */}
        <ellipse cx="140" cy="195" rx="60" ry="72" fill="rgba(124,92,252,0.06)" stroke="rgba(124,92,252,0.25)" strokeWidth="1.5" />

        {/* Wireframe lines */}
        <line x1="100" y1="155" x2="88" y2="200" stroke="rgba(124,92,252,0.08)" strokeWidth="1" />
        <line x1="140" y1="140" x2="140" y2="220" stroke="rgba(124,92,252,0.08)" strokeWidth="1" />
        <line x1="180" y1="155" x2="192" y2="200" stroke="rgba(124,92,252,0.08)" strokeWidth="1" />
        <line x1="85" y1="180" x2="195" y2="180" stroke="rgba(124,92,252,0.06)" strokeWidth="1" />
        <line x1="88" y1="200" x2="192" y2="200" stroke="rgba(124,92,252,0.06)" strokeWidth="1" />

        {/* Chamber dots */}
        <circle cx="125" cy="185" r="4" fill="var(--chamber-discover)" opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="140" cy="178" r="4" fill="var(--chamber-build)" opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="155" cy="185" r="4" fill="var(--chamber-review)" opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" begin="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="140" cy="195" r="4" fill="var(--chamber-ship)" opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" begin="1.5s" repeatCount="indefinite" />
        </circle>

        {/* Paws */}
        <ellipse cx="112" cy="232" rx="16" ry="11" fill="rgba(124,92,252,0.08)" stroke="rgba(124,92,252,0.2)" strokeWidth="1.5" />
        <ellipse cx="168" cy="232" rx="16" ry="11" fill="rgba(124,92,252,0.08)" stroke="rgba(124,92,252,0.2)" strokeWidth="1.5" />

        {/* Diamond playbook */}
        <polygon
          points="140,215 155,232 140,249 125,232"
          fill="rgba(0,209,255,0.08)"
          stroke="var(--accent-primary)"
          strokeWidth="1.5"
        >
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
        </polygon>
        <line x1="140" y1="220" x2="140" y2="244" stroke="rgba(0,209,255,0.2)" strokeWidth="0.5" />
        <line x1="130" y1="232" x2="150" y2="232" stroke="rgba(0,209,255,0.2)" strokeWidth="0.5" />

        {/* Feet */}
        <ellipse cx="115" cy="265" rx="18" ry="8" fill="rgba(124,92,252,0.06)" stroke="rgba(124,92,252,0.15)" strokeWidth="1" />
        <ellipse cx="165" cy="265" rx="18" ry="8" fill="rgba(124,92,252,0.06)" stroke="rgba(124,92,252,0.15)" strokeWidth="1" />
      </g>

      {/* Head */}
      <g>
        <circle cx="140" cy="95" r="52" fill="rgba(124,92,252,0.08)" stroke="rgba(124,92,252,0.3)" strokeWidth="1.5" />
        <circle cx="140" cy="98" r="38" fill="var(--bg-sunken)" stroke="rgba(124,92,252,0.15)" strokeWidth="1" />

        {/* Ears */}
        <circle cx="97" cy="58" r="14" fill="rgba(124,92,252,0.06)" stroke="rgba(124,92,252,0.2)" strokeWidth="1.5" />
        <circle cx="97" cy="58" r="7" fill="rgba(124,92,252,0.04)" stroke="rgba(124,92,252,0.1)" strokeWidth="1" />
        <circle cx="183" cy="58" r="14" fill="rgba(124,92,252,0.06)" stroke="rgba(124,92,252,0.2)" strokeWidth="1.5" />
        <circle cx="183" cy="58" r="7" fill="rgba(124,92,252,0.04)" stroke="rgba(124,92,252,0.1)" strokeWidth="1" />

        {/* Eyes */}
        <ellipse cx="122" cy="92" rx="8" ry="8" fill="#7C5CFC">
          <animate attributeName="ry" values="8;8;8;1;8;8;8" dur="4s" repeatCount="indefinite" keyTimes="0;0.46;0.48;0.5;0.52;0.54;1" />
        </ellipse>
        <circle cx="119" cy="89" r="2.5" fill="#fff" opacity="0.7" />
        <ellipse cx="158" cy="92" rx="8" ry="8" fill="#7C5CFC">
          <animate attributeName="ry" values="8;8;8;1;8;8;8" dur="4s" repeatCount="indefinite" keyTimes="0;0.46;0.48;0.5;0.52;0.54;1" />
        </ellipse>
        <circle cx="155" cy="89" r="2.5" fill="#fff" opacity="0.7" />

        {/* Eye glow */}
        <circle cx="122" cy="92" r="14" fill="none" stroke="rgba(124,92,252,0.15)" strokeWidth="1">
          <animate attributeName="r" values="12;16;12" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="158" cy="92" r="14" fill="none" stroke="rgba(124,92,252,0.15)" strokeWidth="1">
          <animate attributeName="r" values="12;16;12" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Nose */}
        <ellipse cx="140" cy="105" rx="5" ry="3.5" fill="rgba(124,92,252,0.5)" />

        {/* Mouth */}
        <path d="M 130 112 Q 140 118 150 112" stroke="rgba(124,92,252,0.35)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Whiskers */}
        <line x1="100" y1="100" x2="78" y2="95" stroke="rgba(124,92,252,0.15)" strokeWidth="1" strokeLinecap="round" />
        <line x1="100" y1="106" x2="76" y2="106" stroke="rgba(124,92,252,0.15)" strokeWidth="1" strokeLinecap="round" />
        <line x1="100" y1="112" x2="78" y2="117" stroke="rgba(124,92,252,0.15)" strokeWidth="1" strokeLinecap="round" />
        <line x1="180" y1="100" x2="202" y2="95" stroke="rgba(124,92,252,0.15)" strokeWidth="1" strokeLinecap="round" />
        <line x1="180" y1="106" x2="204" y2="106" stroke="rgba(124,92,252,0.15)" strokeWidth="1" strokeLinecap="round" />
        <line x1="180" y1="112" x2="202" y2="117" stroke="rgba(124,92,252,0.15)" strokeWidth="1" strokeLinecap="round" />
      </g>

      {/* Ambient glow */}
      <circle cx="140" cy="160" r="100" fill="none" stroke="rgba(124,92,252,0.06)" strokeWidth="1">
        <animate attributeName="r" values="90;110;90" dur="5s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

/* ── The Reveal ──────────────────────────────────────────────────────────── */

function OttoReveal() {
  const [revealed, setRevealed] = useState(false)
  const [constellationMode, setConstellationMode] = useState<ConstellationMode>('default')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-200px' })

  // Auto-reveal when scrolled into view
  useEffect(() => {
    if (isInView && !revealed) {
      const timer = setTimeout(() => setRevealed(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [isInView, revealed])

  const modes: { id: ConstellationMode; label: string; desc: string }[] = [
    { id: 'default', label: 'Default', desc: 'Balanced awareness' },
    { id: 'analyst', label: 'Analyst', desc: 'Tight precision' },
    { id: 'maverick', label: 'Maverick', desc: 'Explosive innovation' },
    { id: 'guardian', label: 'Guardian', desc: 'Defensive ring' },
    { id: 'strategist', label: 'Strategist', desc: 'Systems mapping' },
  ]

  return (
    <div ref={ref} className="relative">
      {/* Stage */}
      <div
        className="relative w-full max-w-lg mx-auto aspect-square rounded-3xl overflow-hidden border border-[var(--border-primary)]"
        style={{ background: 'var(--bg-sunken)' }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Otter form */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-8"
          animate={{
            opacity: revealed ? 0 : 1,
            scale: revealed ? 1.1 : 1,
            filter: revealed ? 'blur(8px)' : 'blur(0px)',
          }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          style={{ y: revealed ? 0 : undefined }}
        >
          <div className="w-[280px] h-[320px]" style={{ animation: 'float 4s ease-in-out infinite' }}>
            <OtterSVG />
          </div>
        </motion.div>

        {/* Constellation form */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-8"
          animate={{
            opacity: revealed ? 1 : 0,
            scale: revealed ? 1 : 0.85,
          }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="w-[320px] h-[320px]" style={{ animation: 'float 5s ease-in-out infinite' }}>
            <ConstellationSVG mode={constellationMode} />
          </div>
        </motion.div>

        {/* Particles during reveal */}
        <AnimatePresence>
          {revealed && (
            <>
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * Math.PI * 2
                const dist = 80 + Math.random() * 60
                return (
                  <motion.div
                    key={`p-${i}`}
                    className="absolute w-[3px] h-[3px] rounded-full"
                    style={{
                      backgroundColor: '#7C5CFC',
                      top: '50%',
                      left: '50%',
                    }}
                    initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    animate={{
                      opacity: 0,
                      x: Math.cos(angle) * dist,
                      y: Math.sin(angle) * dist,
                      scale: 0,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: i * 0.03 }}
                  />
                )
              })}
            </>
          )}
        </AnimatePresence>

        {/* Speech bubble */}
        <AnimatePresence mode="wait">
          <motion.div
            key={revealed ? 'constellation' : 'otter'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: revealed ? 0.8 : 0 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl text-[13px] text-[var(--text-secondary)] border border-[var(--border-primary)] whitespace-nowrap"
            style={{
              background: 'var(--bg-raised)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          >
            {revealed
              ? <span>...this is what I really am.</span>
              : <span>Hey. I&apos;m Otto. I carry a rock — it&apos;s your playbook.</span>
            }
          </motion.div>
        </AnimatePresence>

        {/* Click to toggle */}
        <button
          onClick={() => setRevealed(!revealed)}
          className="absolute top-4 right-4 text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest hover:text-[var(--accent-primary)] transition-colors"
        >
          {revealed ? 'show otter' : 'reveal'}
        </button>
      </div>

      {/* Mode pills (visible after reveal) */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2 mt-5"
          >
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => setConstellationMode(m.id)}
                className="px-4 py-1.5 rounded-lg text-[11px] font-semibold border transition-all"
                style={{
                  borderColor: constellationMode === m.id ? 'rgba(124,92,252,0.4)' : 'var(--border-primary)',
                  backgroundColor: constellationMode === m.id ? 'rgba(124,92,252,0.08)' : 'transparent',
                  color: constellationMode === m.id ? '#A855F7' : 'var(--text-muted)',
                }}
              >
                {m.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── "Not a Chatbot" comparison ──────────────────────────────────────────── */

function NotAChatbot() {
  const comparisons = [
    { chatbot: '"How can I help you today?"', otto: 'Computes your sovereign balance before you ask' },
    { chatbot: 'Generic advice for any team', otto: 'Advice calibrated to YOUR behavioral drives' },
    { chatbot: 'Agrees with everything you say', otto: 'Tells you when your plan has a gap' },
    { chatbot: 'Disappears between sessions', otto: 'Remembers your team, your playbook, your blind spots' },
    { chatbot: 'One personality, one mode', otto: '17 personas, 4 chambers, behavioral counterweight' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px rounded-2xl overflow-hidden border border-[var(--border-primary)]">
      {/* Headers */}
      <div className="bg-[var(--bg-overlay)] px-6 py-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">What chatbots do</span>
      </div>
      <div className="bg-[var(--bg-overlay)] px-6 py-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-primary)]">What Otto does</span>
      </div>

      {/* Rows */}
      {comparisons.map((row, i) => (
        <motion.div
          key={`chatbot-${i}`}
          className="contents"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.4, delay: i * 0.1 }}
        >
          <div className="bg-[var(--bg-sunken)] px-6 py-4 border-t border-[var(--border-subtle)]">
            <p className="text-[13px] text-[var(--text-muted)] leading-relaxed line-through decoration-[var(--chamber-discover)]/30">
              {row.chatbot}
            </p>
          </div>
          <div className="bg-[var(--bg-raised)] px-6 py-4 border-t border-[var(--border-subtle)]">
            <p className="text-[13px] text-[var(--text-primary)] leading-relaxed">
              {row.otto}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ── Otto's capabilities (condensed) ─────────────────────────────────────── */

function OttoCapabilities() {
  const caps = [
    {
      title: 'Behavioral Counterweight',
      desc: 'Otto reads your team\'s DECF drives and fills the gaps. All innovators, no quality checkers? Otto becomes the quality checker.',
      color: 'var(--accent-tertiary)',
    },
    {
      title: '17 Cognitive Modes',
      desc: 'Scholar for research. Maverick for innovation. Guardian for gates. The right brain for the right work — activated automatically.',
      color: 'var(--accent-primary)',
    },
    {
      title: 'Human-in-the-Loop Gates',
      desc: 'Otto enforces checkpoints because the research says the more reliable the automation, the worse humans get at catching its failures.',
      color: 'var(--chamber-ship)',
    },
    {
      title: 'Constellation Architecture',
      desc: 'Under the fur, Otto is a behavioral node graph. His topology reshapes with each cognitive mode. The otter is how he greets you. The constellation is how he thinks.',
      color: 'var(--accent-secondary)',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {caps.map((cap, i) => (
        <motion.div
          key={cap.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl p-6 glow-card card-3d"
        >
          <div
            className="w-2 h-2 rounded-full mb-4"
            style={{ backgroundColor: cap.color, boxShadow: `0 0 12px ${cap.color}` }}
          />
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">{cap.title}</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{cap.desc}</p>
        </motion.div>
      ))}
    </div>
  )
}

/* ── Main Section ────────────────────────────────────────────────────────── */

export default function MeetOtto() {
  return (
    <section id="meet-otto" className="py-24 px-6 md:py-32 md:px-8 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 60% at 50% 30%, rgba(124,92,252,0.06), transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 20% 70%, rgba(0,209,255,0.03), transparent 60%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[rgba(124,92,252,0.05)] border border-[rgba(124,92,252,0.2)] rounded-full px-5 py-2 text-sm mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C5CFC] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C5CFC]" />
            </span>
            <span className="text-[#A855F7] font-medium">Your AI Teammate</span>
          </div>
          <h2
            className="font-bold text-[var(--text-primary)] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            {'Meet '}
            <span className="gradient-text">Otto</span>
            {'. Your team\u2019s missing piece.'}
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-3xl mx-auto leading-relaxed">
            An AI teammate who maps your behavioral drives, fills your cognitive gaps, and
            refuses to let you sleepwalk through the hard decisions. Not an assistant. Not a chatbot.
            A behavioral counterweight.
          </p>
        </motion.div>

        {/* Two-column: Reveal + Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* The Reveal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.8 }}
          >
            <OttoReveal />
          </motion.div>

          {/* Otto's Pitch */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-[15px] text-[var(--text-secondary)] leading-relaxed">
              <p>
                I read your team&apos;s behavioral DNA. Four drives — Dominance, Extraversion, Patience,
                Formality — measured across 60 years of research and 30 million assessments.
              </p>
              <p>
                I compute your sovereign balance, find where you&apos;re strong and where you&apos;re blind,
                and then I fill the gaps.
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                Your team has three innovators and zero quality checkers? I become the quality checker.
                All process people and nobody pushing deadlines? I push the deadlines.
              </p>
              <p>
                I build playbooks — structured workflows with chambers, nodes, and gates that match how
                your team actually thinks. And I enforce checkpoints, because the math says this is where
                humans stop paying attention to automation.
              </p>
            </div>

            {/* Data points */}
            <div className="flex gap-4">
              {[
                { num: '17', label: 'Personas' },
                { num: '4', label: 'Chambers' },
                { num: '30M+', label: 'Assessments' },
                { num: '60', label: 'Years of PI Data' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-bold text-[var(--text-primary)]">{stat.num}</div>
                  <div className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <OttoCapabilities />
        </motion.div>

        {/* Not a Chatbot */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-[var(--text-primary)]">Otto is not a chatbot.</h3>
          </div>
          <NotAChatbot />
        </motion.div>

        {/* Tech strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <span className="inline-block font-mono text-sm text-[var(--text-muted)] bg-[var(--glass-surface)] border border-[var(--glass-border)] rounded-full px-6 py-3 backdrop-blur-sm">
            Predictive Index &middot; MAGS Engine &middot; 4 Chambers &middot; Human-in-the-Loop &middot; Provider-Agnostic
          </span>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="section-divider max-w-[800px] mx-auto mt-24" />
    </section>
  )
}
