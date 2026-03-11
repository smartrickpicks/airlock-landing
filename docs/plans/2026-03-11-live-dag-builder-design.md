# Live DAG Builder — Design Doc

**Date:** 2026-03-11
**Status:** Draft
**Author:** Otto (Maverick mode)

---

## Problem

The current generating phase is a loading screen with spinning dots. The visitor waits ~4 seconds, then a complete spec card appears. This wastes the most dramatic moment — the moment Otto is "thinking about you."

## Vision

Replace the loading screen with a **live DAG-building animation** where Otto's chain-of-thought is visible as nodes materialize on a spatial canvas. The visitor watches Otto reason about their workflow in real time. One node gets reconsidered and rebuilt for dramatic effect. The final DAG solidifies into the spec card.

**The loading screen becomes the product demo.**

---

## How It Works (Choreographed)

The spec JSON is fetched in the background (same API call as today). Once we have it, we **perform** the build in stages:

### Stage 1: Thinking Text (0-2s)
Otto's reasoning appears as typewriter text below the canvas:
- "Procurement team... counterparty risk is the bottleneck..."
- "Need a compliance gate before contract lock-in..."
- Generated from the spec's `role`, `industry`, `gap`, and node descriptions.

### Stage 2: Node Materialization (2-8s)
Each node appears one at a time on the spatial canvas:
- Node fades in at its position with a chamber-colored glow
- A connecting line draws from the previous node to this one
- Otto's thinking text updates per node: "Step 3: Verify — compliance review before execution"
- ~800ms between nodes (5-7 nodes = 4-5.6s total)

### Stage 3: The Reconsider (at node ~4 of 6)
One node shakes, glows red, and dissolves. Otto's text says something like:
- "Wait — compliance review needs to come before contract drafting, not after."
- A new node slides into the correct position. Lines redraw.
- **Always choreographed.** We pick the first `is_gate` node and "move" it one position earlier in the visual layout. The final spec data doesn't change — just the animation order.

### Stage 4: Solidify (8-10s)
- All nodes pulse once together
- Lines glow bright then settle
- Canvas morphs/transitions into the clean `DagSpecCard` component
- Otto's text: "Your playbook is ready."

### Stage 5: Spec Card + CTA
Same as current flow — spec card with download, then email capture.

---

## Layout: Two Canvases

### Desktop (>640px) — Horizontal Flow

```
[Discovery]───>[Build]───>[Verify]───>[Ship]
   node1         node2      node3       node5
                 node4(gate)            node6
```

- Nodes flow **left to right** across chambers
- Each chamber is a vertical lane (column)
- Chamber label at top of each column
- Canvas width: full container (~680px)
- Canvas height: ~300px
- Nodes positioned in a loose grid within their chamber column
- Lines draw horizontally between sequential nodes

### Mobile (<640px) — Vertical Flow

```
  [Discovery]
     node1
       |
  [Build]
     node2
       |
     node3
       |
  [Verify]
     node4 (gate)
       |
  [Ship]
     node5
       |
     node6
```

- Nodes flow **top to bottom**
- Chamber labels appear as horizontal dividers
- Canvas width: full screen minus padding
- Canvas height: dynamic (grows with nodes)
- Nodes centered on a vertical spine
- Lines draw downward between sequential nodes

### Node Positioning Algorithm

Given the spec JSON (5-7 nodes across 4 chambers):

**Desktop:**
```
x = chamberIndex * (canvasWidth / 4) + chamberWidth / 2
y = nodeIndexWithinChamber * 60 + 80
```

**Mobile:**
```
x = canvasWidth / 2
y = globalNodeIndex * 70 + 60
```

Chamber boundaries are drawn as faint vertical lines (desktop) or horizontal lines (mobile).

---

## Visual Design

### Node Appearance
- Circle: 24px diameter, chamber-colored fill at 15% opacity, chamber-colored border
- Label: 11px font, white, below the circle (desktop) or to the right (mobile)
- Persona tag: 9px mono, purple, below label
- Gate nodes: hexagonal shape instead of circle, cyan border, "GATE" badge

### Connecting Lines
- 1px, dashed, chamber-colored at 30% opacity
- Draw animation: `pathLength` from 0 to 1 over 400ms
- Arrow at destination end

### Thinking Text
- Positioned below the canvas in a glass-style strip
- Otto mark (sm) on the left
- Typewriter animation at 20ms/char
- Fades between thoughts (crossfade 200ms)
- Max 2 lines visible at a time

### The Reconsider Animation
- Target node: first `is_gate` node in the spec
- Node shakes (x oscillation ±4px, 3 cycles, 300ms)
- Node border turns red, opacity drops
- Node scales to 0 and fades out (300ms)
- Brief pause (400ms)
- New node materializes at a position one slot earlier
- Lines redraw to connect through the new position
- Otto's thinking text explains the change

### Solidify Transition
- All nodes pulse: scale 1 → 1.15 → 1, opacity 0.8 → 1 (400ms)
- Lines brighten: opacity 0.3 → 0.7 → 0.3 (400ms)
- Canvas fades out (300ms) as DagSpecCard fades in (500ms)
- Or: canvas morphs into the spec card layout (advanced — could be v2)

---

## Data Flow

```
[Discovery chat complete]
         |
         v
[API call: generateSpec = true] ──> runs in background
         |
         v
[Phase: 'building'] ──> canvas mounts, thinking text starts
         |
         v
[Spec JSON arrives] ──> choreography engine receives spec
         |
         v
[Generate thinking text from spec data]
[Compute node positions (desktop vs mobile)]
[Schedule node appearances at 800ms intervals]
[Insert reconsider event at node ~4]
         |
         v
[All nodes placed] ──> solidify animation
         |
         v
[Phase: 'spec'] ──> DagSpecCard mounts with spec data
```

### Thinking Text Generation (client-side, no extra API call)

From the spec JSON, we generate an array of thinking lines:

```typescript
function generateThoughts(spec: DagSpec): string[] {
  return [
    `${spec.industry}... ${spec.role.toLowerCase()}. Let me map this.`,
    `Team insight: ${spec.team_insight.toLowerCase()}`,
    `The gap: ${spec.gap.toLowerCase()}`,
    ...spec.dag.nodes.map((n, i) =>
      `${n.chamber} → ${n.label}. ${n.description.split('.')[0]}.`
    ),
    `Your playbook is ready.`,
  ]
}
```

### Timing Constants

```typescript
const TIMING = {
  INITIAL_THINK_DELAY: 500,     // ms before first thought
  THOUGHT_DURATION: 1500,        // ms per thinking line
  NODE_INTERVAL: 800,            // ms between node appearances
  RECONSIDER_SHAKE: 300,         // ms shake animation
  RECONSIDER_PAUSE: 400,         // ms pause after removal
  RECONSIDER_REBUILD: 600,       // ms for new node to appear
  SOLIDIFY_DURATION: 800,        // ms for final pulse
  TRANSITION_TO_CARD: 500,       // ms fade to spec card
}
// Total: ~10-12 seconds for 6 nodes (sweet spot for engagement)
```

---

## Phase Machine Update

Current phases: `chat | generating | spec | capture`

New phases: `chat | building | spec | capture`

The `generating` phase becomes `building`. The API call starts when entering `building`, and the choreography begins immediately with placeholder thinking text. Once the spec arrives, the choreography engine switches to spec-derived content.

**Edge case:** If spec takes longer than expected (>6s), the thinking text loops through generic lines ("Mapping behavioral drives...", "Computing sovereign balance...") until the spec arrives. This is the current behavior, just prettier.

---

## Component Structure

```
HeroChat (parent)
  └─ AnimatePresence
      ├─ ChatPhase (existing)
      ├─ DagBuilderPhase (NEW)
      │   ├─ SpatialCanvas (SVG)
      │   │   ├─ ChamberLanes
      │   │   ├─ DagNode[] (animated)
      │   │   └─ DagEdge[] (animated)
      │   ├─ ThinkingStrip
      │   │   ├─ OttoMark (sm)
      │   │   └─ TypewriterText
      │   └─ useChoreography(spec) hook
      ├─ DagSpecCard (existing)
      └─ CapturePhase (existing)
```

### `useChoreography` Hook

```typescript
function useChoreography(spec: DagSpec | null) {
  // Returns:
  // - visibleNodes: DagNode[] (nodes that should be visible right now)
  // - visibleEdges: [number, number][] (connections to draw)
  // - currentThought: string (what Otto is "thinking")
  // - reconsiderTarget: number | null (node ID being reconsidered)
  // - phase: 'thinking' | 'placing' | 'reconsidering' | 'solidifying' | 'done'
  // - progress: number (0-1, for optional progress bar)
}
```

---

## Responsive Breakpoint

```typescript
const isDesktop = typeof window !== 'undefined' && window.innerWidth > 640

// Canvas dimensions
const CANVAS = isDesktop
  ? { width: 680, height: 300, flow: 'horizontal' as const }
  : { width: 340, height: 500, flow: 'vertical' as const }
```

Use `useMediaQuery` or a simple `useState` + `useEffect` with `resize` listener. No SSR issues since this only renders client-side during the `building` phase.

---

## What We're NOT Building (v1)

- **Real streaming from LLM** — choreographed is more reliable, looks identical
- **Drag/zoom on the canvas** — static positions, no interactivity needed
- **Canvas-to-card morph** — fade transition is fine for v1
- **Custom node shapes per persona** — just circles and hexagons (gates)
- **Sound effects** — tempting but not v1

---

## Success Criteria

1. Visitor watches Otto build their workflow for ~10 seconds
2. At least one "reconsider" moment creates surprise/delight
3. Mobile and desktop both feel intentional, not cramped or stretched
4. No layout shift or jank during the building → spec card transition
5. Works on 320px screens (iPhone SE) through 2560px ultrawide
6. Total JS bundle impact: <15KB gzipped (Framer Motion already loaded)

---

## Open Questions

1. **Should the canvas persist behind the spec card?** (Faint ghost of the DAG visible behind the card — adds depth, but might be noisy)
2. **Otto's eyes during building** — should the floating avatar above look "focused" (eyes tracking the current node) or just do the normal float?
3. **Progress indicator** — subtle bar at the bottom of the canvas, or let the node count speak for itself?
