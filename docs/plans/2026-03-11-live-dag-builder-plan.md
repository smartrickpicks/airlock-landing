# Live DAG Builder — Implementation Plan

**Design doc:** `2026-03-11-live-dag-builder-design.md`
**Approved:** 2026-03-11

---

## Build Order

### Step 1: `useChoreography` Hook
- Input: `DagSpec | null`
- Manages all timing/sequencing state
- Returns: `visibleNodes`, `visibleEdges`, `currentThought`, `reconsiderTarget`, `choreographyPhase`, `ottoMood`
- Generates thinking text from spec data
- Schedules node appearances, reconsider event, solidify
- Falls back to generic thoughts if spec hasn't arrived yet

### Step 2: `SpatialCanvas` Component
- SVG-based, responsive (horizontal desktop, vertical mobile)
- `useMediaQuery` hook for breakpoint detection
- Chamber lanes (columns desktop, rows mobile)
- Animated `DagNode` circles with chamber colors, labels, persona tags
- Animated `DagEdge` lines with pathLength draw animation
- Gate nodes rendered as hexagons
- Reconsider animation: shake, red glow, dissolve, rebuild

### Step 3: `ThinkingStrip` Component
- Glass strip below canvas
- OttoMark (sm) on left
- Typewriter text that crossfades between thoughts
- Shows current thought from `useChoreography`

### Step 4: Wire into HeroChat
- New phase: `building` (replaces `generating`)
- `DagBuilderPhase` wraps SpatialCanvas + ThinkingStrip
- API call starts immediately on phase enter
- Choreography starts with generic thoughts, switches to spec-derived on arrival
- On choreography complete, transition to `spec` phase with DagSpecCard

### Step 5: Otto Emotional Cues
- FloatingOtto receives `mood` prop from choreography
- Moods: `idle`, `focused`, `surprised`, `satisfied`
- `focused`: eyes glow brighter, slight lean forward
- `surprised`: quick scale pulse, eyes widen
- `satisfied`: gentle nod animation, warm glow

### Step 6: Build & Push
- `next build` to verify
- Push to Vercel
- Test on mobile and desktop
