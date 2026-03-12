# Investor Relations & Research Pages — Design Spec

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Two new pages (`/invest` and `/research`) that showcase ConstellationBench data with heavy visual emphasis — charts, animated counters, interactive tier cards.

**Routes:** `app/invest/page.tsx` and `app/research/page.tsx` (scaffolded — need visual polish)

**Design system:** Existing tokens from `globals.css`. Framer Motion animations from `lib/animations.ts`. No new dependencies except potentially `recharts` or CSS-only charts.

**Note:** Pricing is being finalized separately via console. Pages should reference tier names but not hardcode final prices.

---

## Shared Visual Language

### Color Assignments

| Element | Token | Hex |
|---|---|---|
| Primary accent (stats, CTAs) | `--accent-primary` | `#00D1FF` |
| Quality bars | `--chamber-ship` | `#22C55E` |
| Cost bars | `--chamber-discover` | `#EF4444` |
| Latency bars | `--chamber-build` | `#EAB308` |
| Free tier badge | `--chamber-ship` | `#22C55E` |
| Background cards | `--bg-overlay` | `#121822` |
| Glass surfaces | `--glass-surface` | `rgba(12,16,23,0.72)` |

### Typography

- Hero: `text-4xl md:text-6xl font-bold` (existing)
- Section titles: `text-2xl md:text-3xl font-bold`
- Stats/numbers: `font-mono font-bold` with `--accent-primary`
- Body: `text-[var(--text-secondary)]` with `leading-relaxed`
- Labels: `text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]`

### Animation Patterns

- Sections: `fadeInUp` on scroll via `whileInView`
- Grids: `staggerContainer` + `staggerItem` (0.15s delay)
- Numbers: Animated counter (count up from 0 on viewport enter)
- Charts: Bar/line segments animate width from 0% on viewport enter
- Cards: Subtle `hover:border-[var(--accent-primary)]/30` transition

---

## Page 1: `/invest` — Investor Relations

### Section 1: Hero

```
┌─────────────────────────────────────────────────────────────┐
│  [gradient glow: --accent-primary at 5% opacity, top-down] │
│                                                             │
│  INVESTOR RELATIONS  (mono, cyan, uppercase)                │
│                                                             │
│  We don't need your money.                                  │
│  But we might want your partnership.  (muted)               │
│                                                             │
│  [2 lines of body text, --text-secondary]                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Visual:** Subtle particle/constellation background animation (dots connected by faint lines, very slow drift). Matches the Constellation component on the main page.

---

### Section 2: The Anti-Pitch (text-heavy, intentional)

```
┌─────────────────────────────────────────────────────────────┐
│  A note on how we think about capital                       │
│                                                             │
│  [3 paragraphs — inline cyan highlights on key numbers]     │
│                                                             │
│  ┌─ border-left: 2px cyan/30 ──────────────────────────┐   │
│  │ "If your term sheet includes 2x liquidation..."      │   │
│  │ (italic, muted)                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Visual:** This section is deliberately text-forward. The blockquote border-left is the only visual flourish. Let the words do the work.

---

### Section 3: Proof Points (4-card grid with animated counters)

```
┌──────────────────────────────────────────────────────────────┐
│  The numbers speak for themselves                            │
│  ConstellationBench — 450 runs, 15 models, 8 providers      │
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ [icon]   │ │ [icon]   │ │ [icon]   │ │ [icon]   │       │
│  │          │ │          │ │          │ │          │       │
│  │  450     │ │  $9.85   │ │  8%      │ │  3.4s    │       │
│  │  ^^^^    │ │  ^^^^^   │ │  ^^      │ │  ^^^^    │       │
│  │ (count   │ │ (count   │ │ (count   │ │ (count   │       │
│  │  up anim)│ │  up anim)│ │  up anim)│ │  up anim)│       │
│  │          │ │          │ │          │ │          │       │
│  │ Council  │ │ Total    │ │ Quality  │ │ Fastest  │       │
│  │ runs     │ │ cost     │ │ spread   │ │ council  │       │
│  │ bench-   │ │          │ │          │ │          │       │
│  │ marked   │ │          │ │          │ │          │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Visual:**
- Each card: `bg-overlay` with `border-subtle`, `hover:border-accent/30`
- Numbers count up with easing (useInView trigger)
- Icon: Lucide, 20px, `--accent-primary`
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Background: `bg-raised`

**Animated counter spec:**
```tsx
// Count from 0 to target over 1.5s with easeOut
// Trigger: useInView with once=true
// Format: number with appropriate suffix ($, %, s)
```

---

### Section 4: Unit Economics (the money table)

```
┌─────────────────────────────────────────────────────────────┐
│  Unit economics that actually work                          │
│  Every number below comes from real ConstellationBench data │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Tier     Price    COGS/Council  Monthly   Margin    │    │
│  │ ─────────────────────────────────────────────────── │    │
│  │ Free     $0       $0.0036       $0.11     Subsidized│    │
│  │ Pro      TBD      $0.030        $0.90     ~91%      │    │
│  │ Const.   TBD      $0.171        $5.14     ~87%      │    │
│  │ BYOK     TBD      $0.00         $0.00     100%  ███ │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  [footnote: italic, muted, assumptions stated]              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Visual:**
- Table rows stagger-animate in
- Margin column: color-coded (100% = green/ship, >85% = cyan, Subsidized = muted)
- Hover: row background shifts to `bg-overlay/50`
- Prices marked as "TBD" or use placeholder ranges until finalized
- Add small bar visualization next to margin % showing fill

---

### Section 5: Why Now (2x2 grid)

```
┌──────────────────────────────────────────────────────────────┐
│              Why this moment matters                          │
│                                                              │
│  ┌─────────────────────────┐ ┌─────────────────────────┐    │
│  │ [Cpu icon]              │ │ [GitFork icon]           │    │
│  │                         │ │                          │    │
│  │ Model costs are         │ │ MCP is becoming          │    │
│  │ collapsing              │ │ standard                 │    │
│  │                         │ │                          │    │
│  │ [body text]             │ │ [body text]              │    │
│  └─────────────────────────┘ └─────────────────────────┘    │
│  ┌─────────────────────────┐ ┌─────────────────────────┐    │
│  │ [Brain icon]            │ │ [Users icon]             │    │
│  │                         │ │                          │    │
│  │ Single-agent AI is      │ │ Enterprise buyers want   │    │
│  │ hitting a ceiling       │ │ platforms, not plugins    │    │
│  │                         │ │                          │    │
│  │ [body text]             │ │ [body text]              │    │
│  └─────────────────────────┘ └─────────────────────────┘    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Visual:**
- Cards: `bg-base` on `bg-raised` background
- Icon + title + body
- Stagger animation
- Consider adding a subtle gradient border-top on each card matching the accent

---

### Section 6: The Product (3 stat cards)

```
┌─────────────────────────────────────────────────────────────┐
│  The product                                                │
│                                                             │
│  [paragraph]                                                │
│                                                             │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐     │
│  │ ARCHITECTURE  │ │ AI LAYER      │ │ MOAT          │     │
│  │ (cyan mono)   │ │ (cyan mono)   │ │ (cyan mono)   │     │
│  │               │ │               │ │               │     │
│  │ 8 repos       │ │ Multi-persona │ │ Orchestration │     │
│  │ 7 MCP servers │ │ councils with │ │ platform, not │     │
│  │ FastAPI +     │ │ DECF profiles │ │ API wrapper   │     │
│  │ Next.js 14    │ │               │ │               │     │
│  └───────────────┘ └───────────────┘ └───────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Visual enhancement:** Add an animated constellation diagram below the 3 cards — reuse or simplify the existing `Constellation.tsx` network visualization showing the 8 repos connected. This visually demonstrates the architecture claim.

---

### Section 7: The Founder

```
┌─────────────────────────────────────────────────────────────┐
│  The founder                                                │
│                                                             │
│  Zac Holwerda                                               │
│                                                             │
│  [bio paragraphs]                                           │
│                                                             │
│  [italic muted quote about opinionated platform]            │
│                                                             │
│  LinkedIn | Substack | GitHub  (cyan links)                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Visual:** Clean and simple. No photo needed (unless Zac wants to add one later). The links are the visual element. Consider adding a subtle timeline graphic showing the career arc: Military Intel → Investing → Community → Platform.

---

### Section 8: Use of Funds (stacked bars)

```
┌─────────────────────────────────────────────────────────────┐
│  If we raised, here's where it goes                         │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ ████████████████████████████████████████  40%        │   │
│  │ Enterprise sales & partnerships                      │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ █████████████████████████  25%                       │   │
│  │ Compliance & certifications                          │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ █████████████████████████  25%                       │   │
│  │ Platform engineering                                 │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ ██████████  10%                                      │   │
│  │ Operations & reserves                                │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Visual:** Horizontal stacked bars that animate width on viewport enter. Each bar is a different shade of the accent palette:
- 40% Sales: `--accent-primary` (#00D1FF)
- 25% Compliance: `--accent-secondary` (#6366F1)
- 25% Engineering: `--accent-tertiary` (#A855F7)
- 10% Reserves: `--text-muted` (#64748B)

Each row has icon + percentage + label + detail text. Bars animate from 0% to target width with staggered delay.

---

### Section 9: CTA

```
┌─────────────────────────────────────────────────────────────┐
│                     Interested?                              │
│                                                             │
│  [body text about what we're looking for]                   │
│                                                             │
│  ┌──────────────────────────────────────┐                   │
│  │   invest@brainbrigade.xyz    →       │                   │
│  └──────────────────────────────────────┘                   │
│  (redirects to Rick's inbox)                                │
│                                                             │
│  [legal disclaimer, xs muted]                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Email setup needed:** Configure `invest@brainbrigade.xyz` as a redirect/alias in Resend dashboard → Rick's inbox.

---

## Page 2: `/research` — ConstellationBench Report

### Section 1: Hero

```
┌─────────────────────────────────────────────────────────────┐
│  [gradient glow: --chamber-ship at 5% opacity, top-down]   │
│                                                             │
│  CONSTELLATIONBENCH · MARCH 2026  (mono, green, uppercase)  │
│                                                             │
│  We benchmarked 15 AI models                                │
│  in 450 multi-agent council runs.  (muted)                  │
│                                                             │
│  [body paragraph]                                           │
│                                                             │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐              │
│  │  450   │ │ 1,800  │ │   15   │ │ $9.85  │              │
│  │ runs   │ │ persp. │ │ models │ │ cost   │ (cyan)       │
│  └────────┘ └────────┘ └────────┘ └────────┘              │
│  (animated counters)                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Visual:** The hero stats should be large, mono, animated counters in a horizontal row.

---

### Section 2: The Pareto Chart (KEY VISUAL)

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  The quality-cost tradeoff                                   │
│                                                              │
│  Score │                                                     │
│  0.59  │  ●────────────────────────────  Opus ($0.17)        │
│  0.58  │  ●● ●  Sonnet/Gemini Pro/Flash                     │
│  0.57  │  ● ●●●  Haiku/Grok/Mistral                        │
│  0.56  │  ● ● ●  Nemotron/Grok Mini                        │
│  0.55  │  ●      DeepSeek R1                                │
│  0.54  │  ● ●    DeepSeek V3 / GPT-4o                      │
│        └──────────────────────────────────────               │
│        $0.00  $0.02  $0.04  $0.06  ...  $0.17               │
│                    Cost per council →                         │
│                                                              │
│  "8% quality spread. 857x cost spread."                      │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Visual:** This is THE chart. A scatter plot with:
- Y-axis: quality score (0.53-0.59 range, zoomed in)
- X-axis: cost per council (log scale or linear)
- Each dot = a model, colored by provider
- Dot size = latency (bigger = slower)
- Hover/tap shows model name + stats
- A horizontal band showing the "quality floor" (91.9% of best)
- The visual story: the dots cluster vertically (quality) but spread horizontally (cost)

**Implementation options:**
1. Recharts `ScatterChart` (best interactivity)
2. Pure CSS/SVG positioned dots (lighter, no dependency)
3. Framer Motion animated dots that fly to position on scroll

Recommend option 2 (CSS/SVG) with Framer Motion entrance animation for zero new dependencies.

---

### Section 3: Key Findings (icon + text cards)

Same layout as current scaffolding. 5 cards stacked vertically with icon left-aligned.

**Enhancement:** Add a small sparkline or micro-chart inside each finding card:
- Finding 1 (flat quality): tiny horizontal bar chart showing all 14 scores nearly equal
- Finding 2 (penny councils): cost comparison dots (9 green dots under $0.01 line)
- Finding 3 (Flash): before/after comparison (Haiku → Flash arrow)
- Finding 4 (roleplay): conviction range visualization (narrow bar for GPT-4o, wide for Opus)
- Finding 5 (JSON): checkmark grid (8 green ✓, 6 partial)

---

### Section 4: Full Leaderboard (interactive table)

```
┌──────────────────────────────────────────────────────────────┐
│  # │ Model          │ Quality      │ Cost         │ Speed   │
│ ───┼────────────────┼──────────────┼──────────────┼──────── │
│  1 │ Opus 4.6       │ 0.589 ██████ │ $0.1714 ████ │ 28.2s  │
│    │ The Heavyweight │              │              │         │
│ ───┼────────────────┼──────────────┼──────────────┼──────── │
│  2 │ Sonnet 4.6     │ 0.578 █████▌ │ $0.0298 █    │ 12.6s  │
│    │ The Professional│              │              │         │
│ ───┼────────────────┼──────────────┼──────────────┼──────── │
│  4 │ Gemini Flash   │ 0.577 █████▌ │ $0.0036 ▏    │  3.4s  │
│    │ ⚡ The Flash    │              │ ← SWEET SPOT │         │
│    │                │              │              │         │
│  ...                                                         │
└──────────────────────────────────────────────────────────────┘
```

**Visual enhancements over current scaffold:**
- Quality bars: green, scaled to 0.5-0.6 range (not 0-1, which would make them all look the same)
- Cost bars: red gradient, log-scale visualization
- "FREE" badge for Nemotron (green pill)
- "SWEET SPOT" callout on Gemini Flash row (highlighted border)
- Sort controls: click column header to re-sort (quality, cost, speed, JSON)
- Provider logos or colored dots by provider name

---

### Section 5: Model Personality Cards (NEW — the fun section)

```
┌──────────────────────────────────────────────────────────────┐
│  Choose your council                                         │
│                                                              │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐              │
│  │ ⚡          │ │ 🎯         │ │ 🏋️         │              │
│  │ THE FLASH  │ │ THE PRO    │ │ HEAVYWEIGHT │              │
│  │            │ │            │ │             │              │
│  │ Gemini     │ │ Sonnet 4.6 │ │ Opus 4.6   │              │
│  │ 2.5 Flash  │ │            │ │             │              │
│  │            │ │            │ │             │              │
│  │ Score:0.577│ │ Score:0.578│ │ Score:0.589 │              │
│  │ Cost: $0.00│ │ Cost: $0.03│ │ Cost: $0.17 │              │
│  │ Speed: 3.4s│ │ Speed: 13s │ │ Speed: 28s  │              │
│  │ JSON: 100% │ │ JSON: 100% │ │ JSON: 99%   │              │
│  │            │ │            │ │             │              │
│  │ "Fast +    │ │ "Never     │ │ "When the   │              │
│  │  smart.    │ │  fails.    │ │  decision   │              │
│  │  The new   │ │  100% JSON.│ │  matters    │              │
│  │  default." │ │  Tight     │ │  most."     │              │
│  │            │ │  latency." │ │             │              │
│  │            │ │            │ │             │              │
│  │ [BEST      │ │ [MOST      │ │ [HIGHEST    │              │
│  │  VALUE]    │ │  RELIABLE] │ │  QUALITY]   │              │
│  └────────────┘ └────────────┘ └────────────┘              │
│                                                              │
│  [+ 11 more models → expand]                                │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Visual:**
- Top 3 shown by default (Flash, Sonnet, Opus) — the recommended tiers
- "Show all 14 models" expand button
- Each card: glass surface, brand name large, tagline, 4 key stats with mini bars
- Badge at bottom: "BEST VALUE", "MOST RELIABLE", "HIGHEST QUALITY", "FREE", etc.
- Cards should feel like trading cards or character select screens

---

### Section 6: Methodology (6-card grid)

Current scaffolding is good. Keep as-is with animated counters on the values.

---

### Section 7: CTA

Waitlist + Investor Relations buttons. Add a third option: "Download raw data (JSON)" linking to the benchmark results file.

---

## Implementation Notes

### No New Dependencies Required

Everything can be built with:
- Framer Motion (already installed)
- Lucide icons (already installed)
- CSS custom properties (already defined)
- SVG for the scatter chart

### Animated Counter Component

```tsx
// Reusable across both pages
function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 1.5
}: {
  target: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  // useInView trigger
  // requestAnimationFrame count-up with easeOut
  // Format with toLocaleString for commas
}
```

### Scatter Chart Component

```tsx
// Pure SVG, no recharts needed
function ParetoChart({ models }: { models: ModelTier[] }) {
  // SVG viewBox scaled to data range
  // Circles positioned by score (y) and cost (x)
  // Framer Motion animatePresence for entrance
  // Tooltip on hover showing model details
}
```

### Responsive Breakpoints

- Mobile: Single column, stacked cards, table scrolls horizontally
- Tablet (md): 2-column grids, table fits
- Desktop (lg): 4-column proof points, full table, side-by-side charts

### Data Source

Both pages currently have hardcoded benchmark data. Future enhancement: fetch from an API endpoint that reads from `apps/api/src/benchmarks/results/` so the pages auto-update when new benchmarks run.

---

## File Structure

```
app/
  invest/
    page.tsx          ← Investor relations (scaffolded, needs visual polish)
  research/
    page.tsx          ← ConstellationBench report (scaffolded, needs visual polish)
components/
  AnimatedCounter.tsx ← NEW: reusable counter component
  ParetoChart.tsx     ← NEW: scatter plot for quality vs cost
  ModelCard.tsx       ← NEW: trading card style model personality
  Footer.tsx          ← MODIFIED: added Investors + Research links
```

---

## Pricing Note

Pricing tiers are being finalized via console. The invest page currently shows placeholder prices. Once finalized, update the `unitEconomics` array in `app/invest/page.tsx` with final prices. The research page doesn't show prices — only COGS per council run, which comes from benchmark data and won't change.
