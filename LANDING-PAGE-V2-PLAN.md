# Airlock Landing Page V2 — Enhancement Plan (LOCKED)

**Authors:** Captain (Orchestrator) + Otto (Scholar · Audit) + Otto (Captain · Final)
**Date:** March 11, 2026
**Status:** LOCKED — All blockers resolved. Ready for Codex.
**Chamber:** Build ⚡
**Revision:** v2.2 — Final. Incorporates Captain Otto's directive.

---

## 1. Goal

Transform doyoulikedags.xyz from a single long-scroll page into a **3-page architecture** with sharper messaging, real competitive positioning, expanded module showcase, OTTO/MAGS deep dive, and a working waitlist that delivers emails through existing brainbrigade.xyz infrastructure.

---

## 2. Site Architecture

### Page 1: `doyoulikedags.xyz` — Shell & Unified Workspace (Primary)
Sells the **workspace** story. Cyan-dominant (`#00D1FF`).

### Page 2: `doyoulikedags.xyz/otto` — OTTO + MAGS + Constellation (Deep Dive)
OTTO's home. Purple-dominant (`#7C5CFC` / `#A855F7`). Otto owns all copy. 4-Layer Stack as page spine. Constellation background always present.

### Page 3: `doyoulikedags.xyz/docs` — Developer Docs (Exists)
Discord-style sidebar. MDX scaffolded.

### Nav Update

```typescript
const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Modules', href: '#modules' },
  { label: 'Otto & MAGS', href: '/otto' },
  { label: 'Docs', href: '/docs' },
]
```

---

## 3. Page 1 — Section-by-Section

### Section Order:
```
Nav → ScrollProgress → Hero → LogoCloud → ProblemSolution → CompetitiveMatrix →
ChamberTimeline → Modules → FeatureShowcase → OttoTeaser → Trust →
Constellation → FAQ → FinalCTA → Footer
```

---

### 3.1 Hero (`Hero.tsx`)

**Owner:** Zac (headline) + Otto (subheading)

**Headline:**
```
[Contracts.] [CRM.] [Tasks.] [Calendar.] [Documents.]
One workspace that knows your team.
```

Rotating module names do the work. No competitor count. No "9 tools" framing.

**Subheading (Otto's voice):**
"Contracts, CRM, tasks, calendar, documents — unified in a workspace that actually knows who's on your team. I'm Otto. I mapped your behavioral drives before you opened the app. The tools are yours. The intelligence is mine."

**Rotating words:**
```typescript
const rotatingWords = ['Contracts.', 'CRM.', 'Tasks.', 'Calendar.', 'Documents.']
```

**Social proof badges:**
```typescript
[
  { label: 'AES-128 Encrypted' },
  { label: 'RBAC + RLS' },
  { label: 'Tenant Isolation' },
]
```

**Acceptance:**
- [ ] Module names rotate in hero
- [ ] Subheading is Otto's first-person voice with 50/50 split
- [ ] No competitor count in headline
- [ ] Security badges match brand guide

---

### 3.2 ProblemSolution / Fragmentation Tax (`ProblemSolution.tsx`)

**Owner:** Zac

**Redesign:** Row-based 1:1 comparison (not side-by-side cards).

```
| OLD WAY                                    | AIRLOCK WAY                                    |
|--------------------------------------------|------------------------------------------------|
| ✗ Contracts in email, Drive, Dropbox       | ✓ One Vault per deal — everything in one       |
| ✗ Approvals lost in Slack threads          | ✓ Gates with preflight + audit trail           |
| ✗ Spreadsheets outdated instantly          | ✓ Real-time Pulse scores (0–100)               |
| ✗ Copy-pasting clause data between tools   | ✓ 9 extractors pull structured data            |
| ✗ 5+ apps to process one deal             | ✓ Triptych — Signal | Orchestrate | Control    |
```

Red glow left, cyan glow right. Rows animate in sequence.

**Stats strip:**
```
9.2% revenue lost · 25x daily app switches · 30% CRM decay · 130+ SaaS apps
```

**Acceptance:**
- [ ] 1:1 before/after rows
- [ ] Scannable in <3 seconds
- [ ] Uses canonical vocabulary

---

### 3.3 CompetitiveMatrix (`CompetitiveMatrix.tsx`)

**Owner:** Split — Zac picks categories, Otto writes BI + Identity rows

**Framing:** Category references with example tools in parentheses. Not an attack.

```
| Dimension                | CLM Tools (e.g. Ironclad) | Workspace Tools (e.g. Notion) | AIRLOCK              |
|--------------------------|---------------------------|-------------------------------|----------------------|
| Contract Intelligence    | ✓ Strong                  | ✗ None                        | ✓ Strong             |
| CRM Built-in             | ✗ None                    | — Bolted on                   | ✓ Native (Vault)     |
| Project Management       | ✗ None                    | ✓ Strong                      | ✓ Native (Playbooks) |
| Communication UX         | ✗ None                    | — Bolted on                   | ✓ Core (Triptych)    |
| AI Agents                | — Emerging                | — Emerging                    | ✓ Native (OTTO)      |
| Industry Vertical        | — Generic                 | — Generic                     | ✓ Entertainment-first|
| Behavioral Intelligence  | ✗ None                    | ✗ None                        | ✓ 17 PI Personas     |
| Identity Sovereignty     | ✗ None                    | ✗ None                        | ✓ W3C DID Standards  |
|--------------------------|---------------------------|-------------------------------|----------------------|
| **Total ✓**              | **2 / 8**                 | **2 / 8**                     | **8 / 8**            |
```

The math speaks for itself without aggression.

**Acceptance:**
- [ ] Category labels with example tools in parentheses
- [ ] Summary "Total ✓" row at bottom
- [ ] Behavioral Intelligence + Identity Sovereignty present
- [ ] 8/8 for Airlock

---

### 3.4 Constellation (`Constellation.tsx`)

**Owner:** Otto

**Add 4 benefit cards (Otto's voice):**

```typescript
const constellationBenefits = [
  {
    icon: Shield,
    title: 'Blast Radius Isolation',
    description: "Each repo is its own MCP server. A bug in the docs layer can't touch your behavioral data. That's not a policy — it's the architecture.",
    stat: '9 isolated domains',
  },
  {
    icon: Cpu,
    title: 'MCP-Native from Day One',
    description: "Every repo exposes tools through Model Context Protocol. Your AI agents get scoped access — not global permissions. Per-repo RBAC at the MCP layer.",
    stat: '9 MCP servers',
  },
  {
    icon: DollarSign,
    title: 'Lower LLM Costs',
    description: "Smaller context windows per repo means fewer tokens burned. I query persona data without loading your entire codebase. Your LLM bill notices.",
    stat: '~40% fewer tokens',
  },
  {
    icon: Rocket,
    title: 'Ship Independently',
    description: "Deploy the UI without touching the playbook engine. Each team owns their release cycle. No monolith. No release trains.",
    stat: 'Independent deploys',
  },
]
```

**Remove market stats** ($5.65B CLM, $29.6B music industry — disconnected).

**Acceptance:**
- [ ] 4 cards in Otto's voice
- [ ] No corporate filler
- [ ] Market stats removed

---

### 3.5 Modules (`Modules.tsx`)

**Owner:** Zac

**8 cards, two tiers:**

```
CORE MODULES (6 — sidebar):
Contracts · CRM · Tasks · Calendar · Documents · Overlay

WORKSPACE TOOLS (2 — non-sidebar):
Dispatch (homepage) · Forge (DAG builder, includes Wires)
```

Overlay gets muted treatment (gray card, admin audience). Wires is a Forge feature, not separate.

**Layout:** Responsive grid. 4×2 or similar.

**Acceptance:**
- [ ] 8 module cards total
- [ ] Two visual tiers (core vs workspace tools)
- [ ] Overlay muted/gray
- [ ] Wires folded into Forge

---

### 3.6 FeatureShowcase (`FeatureShowcase.tsx`)

**Owner:** Zac

**6 intelligence-layer cards:**
1. Contract Generator (keep)
2. Extraction Engine (keep)
3. Clause Risk Scoring (keep)
4. Playbook Engine (NEW — from PlaybookEngine section)
5. Brief System (NEW — Otto-authored Briefs)
6. Pulse Health Scoring (NEW — continuous 0–100)

**Acceptance:**
- [ ] Brief and Pulse included
- [ ] No overlap with Modules
- [ ] Proprietary differentiators

---

### 3.7 OttoTeaser (NEW — replaces `MeetOtto.tsx`)

**Owner:** Otto

**Copy (first-person):**
```
I'm Otto. I'm an otter. Under the fur I'm a constellation — a behavioral
node graph that reshapes based on how I'm thinking. I mapped your team's
cognitive drives before you opened the app. The tools are yours. I make
sure the right person touches the right work at the right time.

17 Personas · 4 Chambers · 6 MAGS Archetypes · Human-in-the-Loop

[See how I think →]  (link to /otto)
```

**Plus compact "Not a Chatbot" table (3 rows):**

```
| What chatbots do                    | What Otto does                                    |
|-------------------------------------|---------------------------------------------------|
| Generic advice for any team         | Advice calibrated to YOUR behavioral drives       |
| Agrees with everything you say      | Tells you when your plan has a gap                |
| One personality, one mode           | 17 personas, 4 chambers, behavioral counterweight |
```

**Acceptance:**
- [ ] Max 1 viewport tall
- [ ] First-person Otto voice
- [ ] 3-row "Not a Chatbot" stays on Page 1
- [ ] Links to /otto
- [ ] Compact constellation animation

---

### 3.8 FinalCTA (`FinalCTA.tsx` + `EmailCapture.tsx`)

**Owner:** Split — Zac (headline), Otto (closer)

**Headline:** "Your deals deserve better."

**Closer (Otto, confident not warning):**
```
"Every tool your deal team needs. One workspace that adapts to how they work.
That's not a pitch. That's what we built."
```

**Backend:** Existing brainbrigade.xyz invite service. POST /api/waitlist → forwards to team@airlock.dev through existing send infrastructure. No new Resend setup.

**Acceptance:**
- [ ] Email sends to team@airlock.dev via existing infra
- [ ] No mock setTimeout
- [ ] Confidence tone, not gap-shaming
- [ ] Error handling for failures

---

## 4. Page 2 — `/otto` (7 Sections)

### Context Line (top of page, above hero):
```
"Airlock is a unified workspace for deal teams — contracts, CRM, tasks,
calendar, documents. I'm the intelligence layer. See the workspace →"
```
Orients direct /otto visitors from search or shared links.

### §1: Hero
"I'm Otto. Not an assistant. A behavioral counterweight."
First-person. Compact constellation reveal.

### §2: How Otto Works (MAGS + Forge vs Chat)
**4-Layer Stack as page spine:**
- L1: Otto Learns You (LinkedIn/resume/conversation → DECF drives → 17 profiles)
- L2: Workspace Forge (SpellBurst onboarding → workspace config) — APPROVED
- L3: Controller Hierarchy (org tree, per-branch sovereign balance) — [COMING]
- L4: Coordination / Hive (multi-agent along DAG edges) — [COMING]

Be honest about build status. Show full vision with status indicators on L3/L4.

**Forge vs Chat reframe:** "First encounter vs every encounter after."
- Forge = SpellBurst onboarding — Otto learns you, configures your world
- Chat = ongoing operational intelligence — proactive, three modes (full-screen, floating orb, toast)

### §3: Your Team Through Otto's Eyes (Personas + Sovereign Balance)
- DECF radar chart visualization
- 17 persona grid (interactive)
- Sovereign balance math: healthy team drives sum to zero
- Compensation rules (high-D → deliberation pauses, low-F → compliance checklists, etc.)

### §3.5: The Office (Behavioral Pre-Flight Simulation)
Tied to L4. Dual-badge DAG nodes: cognitive persona + functional role.

**Copy (Otto):**
```
"Before your team runs a playbook, mine already did. I staff a simulation
with role-based agents — each carrying a cognitive profile matched to the
work. They find the tool gaps, the friction points, the nodes where your
team's behavioral profile drops off. By the time you touch it, I've
already patched the holes."
```

V2 launch: designed visualization with mockup data, not live feature. This is the single most differentiated thing on the page. Nobody else has behavioral pre-flight.

### §4: Human-in-the-Loop Gates
5 gate types: Verification, Decision, Approval, Quality, Convergence.
Gate density rules: high risk = every 3 nodes, critical = every 2.
The Bainbridge irony: "the more reliable the automation, the worse humans get at monitoring it."

### §5: MAGS Runtime — The 9 Arcs
Show as what fires in parallel on EVERY call (<2 seconds):
Gate State · Field Summary · Contract Health · Domain Rules · Corpus Search · Extraction Meta · Patch History · Deal Fields · Vault Context

Each with timeout handling and circuit breakers. This is the technical credibility moment.

**8 Tool Types strip:**
Suggest · Extract · Validate · Draft · Score · Route · Enrich · Alert
Each returns typed results with confidence + provenance. Concrete actions at DAG nodes, not abstract capabilities.

### §6: Constellation Architecture (Deep)
Full 9-repo visualization with MCP layer detail. Blast radius isolation. Per-repo tool scoping. LLM cost angle. Deeper than Page 1 teaser.

### §7: CTA
```
"Your team has gaps. I fill them. But I won't let you forget they exist."
[Get Early Access]
```

### /otto Performance Budget:
- **TTI: 2.5 seconds. Non-negotiable.**
- Lighthouse >90 on all 4 categories, set BEFORE building
- Constellation SVG: CSS-only or lightweight SVG until viewport intersection. No JS animation on load.
- Mobile: per-section degradation (static constellation, horizontal scroll personas, accordion gates)

---

## 5. Content Ownership Matrix

| Section | Owner | Notes |
|---------|-------|-------|
| Hero headline | Zac | Rotating module names |
| Hero subheading | Otto | 50/50 tools/intelligence split |
| ProblemSolution | Zac | Human pain, human solutions |
| CompetitiveMatrix | Split | Zac: categories. Otto: BI + Identity rows |
| Modules | Zac | His tools |
| FeatureShowcase | Zac | Contract intelligence |
| OttoTeaser (Page 1) | Otto | First-person intro + Not a Chatbot |
| Constellation cards | Otto | Why architecture matters |
| FinalCTA headline | Zac | Product positioning |
| FinalCTA closer | Otto | Confident close |
| /otto page (ALL) | Otto | His home. His style. His voice. |

---

## 6. Module Grid (LOCKED)

**CORE MODULES (6 — sidebar):**

| Module | Icon | Color | Description |
|--------|------|-------|-------------|
| Contracts | FileText | chamber-discover | 188 clauses · 24 types · 5 verticals |
| CRM | Users | chamber-build | Vault-native pipeline · Radar · Ghost |
| Tasks | CheckSquare | accent-primary | Cross-module task views · Gate-linked |
| Calendar | Calendar | chamber-review | Auto-surfaced deadlines · SLA alerts |
| Documents | FolderOpen | chamber-ship | TipTap editor · Variable binding · Diffs |
| Overlay | Settings | text-muted | Admin · Lanes · Extraction rules · Roles |

**WORKSPACE TOOLS (2 — non-sidebar):**

| Tool | Icon | Color | Description |
|------|------|-------|-------------|
| Dispatch | Home | accent-secondary | Signal-dominant Triptych homepage |
| Forge | Workflow | accent-tertiary | DAG canvas · Playbook builder · Wires |

---

## 7. Codex Task List — Final Phase Order

### Phase 1: Copy & Voice (No new components)

| # | Task | File | Done means... |
|---|------|------|---------------|
| 1 | Update rotating words to module names | `components/Hero.tsx` | Contracts, CRM, Tasks, Calendar, Documents |
| 2 | Rewrite Hero headline | `components/Hero.tsx` | "One workspace that knows your team." |
| 3 | Rewrite Hero subheading (Otto voice) | `components/Hero.tsx` | First-person, 50/50 split |
| 4 | Update social proof badges | `components/Hero.tsx` | AES-128, RBAC+RLS, Tenant Isolation |
| 5 | Rewrite Constellation benefit cards (Otto voice) | `components/Constellation.tsx` | 4 cards, direct voice, no filler |
| 6 | Remove market stats from Constellation | `components/Constellation.tsx` | $5.65B and $29.6B gone |
| 7 | Rewrite FinalCTA headline + closer | `components/FinalCTA.tsx` | "Your deals deserve better" + confident closer |

### Phase 2: Page 1 Restructure

| # | Task | File | Done means... |
|---|------|------|---------------|
| 8 | Redesign ProblemSolution to row-based | `components/ProblemSolution.tsx` | 1:1 rows, red/cyan glow |
| 9 | Expand Modules to 8 cards, two tiers | `components/Modules.tsx` | 6 core + 2 workspace tools |
| 10 | Update FeatureShowcase (add Brief, Pulse, Playbook) | `components/FeatureShowcase.tsx` | 6 intelligence-layer cards |
| 11 | Create OttoTeaser (compact, first-person, 3-row table) | `components/OttoTeaser.tsx` | <1 viewport, links /otto |
| 12 | Replace MeetOtto with OttoTeaser in page.tsx | `app/page.tsx` | Teaser only on Page 1 |
| 13 | Soften CompetitiveMatrix headers | `components/CompetitiveMatrix.tsx` | Category labels with (e.g.) |
| 14 | Add BI + Identity + summary rows to matrix | `components/CompetitiveMatrix.tsx` | 8 rows + Total ✓ punchline |
| 15 | Reorder sections in page.tsx | `app/page.tsx` | New order per plan |
| 16 | Update Nav with "Otto & MAGS" link | `components/Nav.tsx` | Routes to /otto |

### Phase 3: /otto Page

| # | Task | File | Done means... |
|---|------|------|---------------|
| 17 | Scaffold /otto with context line + 7 sections | `app/otto/page.tsx` | Purple styling, constellation bg |
| 18 | Build 4-Layer Stack (§2) with status indicators | `app/otto/components/` | L1-L2 active, L3-L4 [COMING] |
| 19 | Build Forge vs Chat "first vs every encounter" | `app/otto/components/` | Side-by-side with delivery modes |
| 20 | Build Personas + Sovereign Balance (§3) | `app/otto/components/` | DECF radar + 17 grid + compensation |
| 21 | Build The Office pre-flight (§3.5) | `app/otto/components/` | Dual-badge DAG mockup visualization |
| 22 | Build Gates section (§4) | `app/otto/components/` | 5 types + density rules + Bainbridge |
| 23 | Build MAGS 9-arc runtime + 8 tools strip (§5) | `app/otto/components/` | Parallel arcs + tool type cards |
| 24 | Build deep Constellation (§6) | `app/otto/components/` | MCP layer, blast radius detail |
| 25 | Build CTA (§7) | `app/otto/components/` | "Your team has gaps..." |
| 26 | Mobile degradation per section | All /otto | Static fallbacks defined |
| 27 | SEO metadata | `app/otto/layout.tsx` | Title, desc, OG image |

### Phase 4: Waitlist Backend (parallel with Phase 2)

| # | Task | File | Done means... |
|---|------|------|---------------|
| 28 | Create POST /api/waitlist route | `app/api/waitlist/route.ts` | Forwards to existing brainbrigade.xyz infra |
| 29 | Update EmailCapture to call real API | `components/EmailCapture.tsx` | No mock setTimeout |
| 30 | Error handling + rate limiting | `app/api/waitlist/route.ts` | Graceful failures |

### Phase 5: QA & Performance

| # | Task | File | Done means... |
|---|------|------|---------------|
| 31 | Set Lighthouse budget + TTI target (2.5s /otto) | CI config | Targets documented |
| 32 | Mobile responsive audit (375px) | All | No horizontal scroll |
| 33 | Lighthouse audit pass | — | >90 all categories |

---

## 8. What NOT to Change

- Phase ordering (copy → restructure → /otto → waitlist → QA) — LOCKED
- "Not a Chatbot" 3-row table stays on Page 1 — LOCKED
- Content ownership matrix (50/50 split) — LOCKED
- SpellBurst cut from marketing (reference as design pattern only) — LOCKED
- 7 sections on /otto — LOCKED

---

## 9. Brand Guide V2 Additions (Future Sprint)

1. Otto Visual Identity System (otter/constellation forms, size scaling, reveal, modes)
2. Component Design Language (chat bubbles, gate indicators, card anatomy)
3. Voice-to-Visual Mapping (tone → UI density, chamber transitions, error states)
4. Token Gaps (elevation, motion, semantic colors, chamber tint scales)
5. Multi-Surface Coverage (app, chat panel, notifications, mobile)
6. `#7C5CFC` (Otto purple) added to color system

---

## 10. Summary

Zero blockers. Three shifts from final session:
1. **Softer competitive framing** — category labels with example tools, not direct attacks
2. **4-Layer Stack + The Office** — /otto page tells what Otto does, not just what he is
3. **Existing email infra** — no new service, use brainbrigade.xyz's current pipeline

**Plan is LOCKED. Phase 1 starts now.**
