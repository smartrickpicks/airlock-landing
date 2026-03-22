/**
 * GitHub Analyzer — scans repos and maps behavior to DECF drives.
 *
 * Reads public repo data via GitHub API, extracts behavioral signals,
 * and scores across four drives: Dominance, Extraversion, Patience, Formality.
 * Also detects repo health issues (conflicts, stale branches, unreviewed PRs).
 *
 * Token is used server-side only and discarded after analysis.
 */

// ── Types ──────────────────────────────────────────────────────────────────

export interface Drives {
  dominance: number
  extraversion: number
  patience: number
  formality: number
}

export interface ProfileMatch {
  id: string
  name: string
  role: 'expander' | 'converter' | 'stabilizer'
  style: string
  tagline: string
  populationPct: number
  drives: Drives
  strengths: string[]
  blindSpots: string[]
  pairWith: string
}

export interface RepoHealthIssue {
  repo: string
  type: 'conflict' | 'stale_branch' | 'unreviewed_pr' | 'failing_ci'
  detail: string
}

export interface AnalysisResult {
  profile: ProfileMatch
  drives: Drives
  stats: {
    totalCommits: number
    totalRepos: number
    totalPRs: number
    avgCommitMessageLength: number
    avgPRSize: number
    topLanguages: string[]
    commitPattern: 'burst' | 'steady' | 'sporadic'
    avgMergeTimeDays: number
  }
  health: {
    conflicts: number
    staleBranches: number
    unreviewedPRs: number
    issues: RepoHealthIssue[]
  }
  generatedAt: string
}

// ── Profile Registry (mirrors MCP) ─────────────────────────────────────────

interface ProfileDef {
  id: string
  name: string
  drives: Drives
  role: 'expander' | 'converter' | 'stabilizer'
  populationPct: number
  style: string
  tagline: string
  strengths: string[]
  blindSpots: string[]
  pairWith: string
}

const PROFILES: ProfileDef[] = [
  { id: 'maverick', name: 'Maverick', drives: { dominance: 10, extraversion: 8, patience: 1, formality: 1 }, role: 'expander', populationPct: 2.5, style: 'Fast, bold, breaks molds — the rarest profile', tagline: 'Move fast. Break molds.', strengths: ['Speed to ship', 'Gut-driven decisions', 'Fearless experimentation', 'Bias to action'], blindSpots: ['May skip planning', 'Can overlook details', 'Impatient with process'], pairWith: 'Guardian' },
  { id: 'captain', name: 'Captain', drives: { dominance: 9, extraversion: 8, patience: 2, formality: 2 }, role: 'expander', populationPct: 3.38, style: 'Commanding, decisive, rallies teams', tagline: 'Lead from the front.', strengths: ['Team rallying', 'Clear direction', 'Fast decisions', 'Executive presence'], blindSpots: ['Can steamroll quieter voices', 'May oversimplify', 'Moves before consensus'], pairWith: 'Collaborator' },
  { id: 'guardian', name: 'Guardian', drives: { dominance: 3, extraversion: 3, patience: 9, formality: 8 }, role: 'stabilizer', populationPct: 6.0, style: 'Thorough, protective, catches everything', tagline: 'Nothing ships dirty.', strengths: ['Risk detection', 'Quality assurance', 'Thorough review', 'Process design'], blindSpots: ['Can block progress', 'Over-engineers safety', 'Slow to start'], pairWith: 'Maverick' },
  { id: 'adapter', name: 'Adapter', drives: { dominance: 5, extraversion: 5, patience: 5, formality: 5 }, role: 'converter', populationPct: 8.0, style: 'Balanced, flexible, reads the room', tagline: 'Read the room. Match the energy.', strengths: ['Flexibility', 'Team harmony', 'Situational awareness', 'Bridge building'], blindSpots: ['Can lack strong opinion', 'May defer too much', 'Identity shifts under pressure'], pairWith: 'Strategist' },
  { id: 'strategist', name: 'Strategist', drives: { dominance: 8, extraversion: 3, patience: 3, formality: 5 }, role: 'expander', populationPct: 4.0, style: 'Analytical, big-picture, sees around corners', tagline: 'See around corners.', strengths: ['Systems thinking', 'Long-range planning', 'Pattern recognition', 'Strategic clarity'], blindSpots: ['Can over-analyze', 'Slow to execute', 'May miss tactical details'], pairWith: 'Promoter' },
  { id: 'venturer', name: 'Venturer', drives: { dominance: 10, extraversion: 3, patience: 1, formality: 3 }, role: 'expander', populationPct: 2.0, style: 'Fiercely independent, trusts gut, moves alone', tagline: 'Trust the gut. Go alone.', strengths: ['Independence', 'Bold bets', 'Fast iteration', 'Self-reliance'], blindSpots: ['Resists collaboration', 'Can isolate', 'Skips documentation'], pairWith: 'Collaborator' },
  { id: 'persuader', name: 'Persuader', drives: { dominance: 8, extraversion: 9, patience: 3, formality: 3 }, role: 'expander', populationPct: 4.0, style: 'Energetic, narrative-driven, wins buy-in', tagline: 'Win hearts. Ship features.', strengths: ['Stakeholder buy-in', 'Narrative framing', 'Energy', 'Cross-team influence'], blindSpots: ['Can oversell', 'May prioritize story over substance', 'Moves before verifying'], pairWith: 'Analyzer' },
  { id: 'collaborator', name: 'Collaborator', drives: { dominance: 3, extraversion: 8, patience: 7, formality: 3 }, role: 'converter', populationPct: 6.0, style: 'Team-oriented, builds consensus, connects people', tagline: 'Together is the only way.', strengths: ['Consensus building', 'Team cohesion', 'Empathetic leadership', 'Inclusive process'], blindSpots: ['Slow decisions', 'Avoids conflict', 'Can over-consult'], pairWith: 'Venturer' },
  { id: 'analyzer', name: 'Analyzer', drives: { dominance: 3, extraversion: 2, patience: 8, formality: 9 }, role: 'stabilizer', populationPct: 7.0, style: 'Methodical, data-driven, builds from evidence', tagline: 'Data first. Always.', strengths: ['Evidence-based decisions', 'Deep research', 'Rigorous testing', 'Pattern detection'], blindSpots: ['Analysis paralysis', 'Can miss the forest', 'Slow to commit'], pairWith: 'Persuader' },
  { id: 'specialist', name: 'Specialist', drives: { dominance: 2, extraversion: 2, patience: 9, formality: 10 }, role: 'stabilizer', populationPct: 3.0, style: 'Deep expertise, highest standards, narrow focus', tagline: 'Deep, not wide.', strengths: ['Domain mastery', 'Highest standards', 'Precision', 'Catches everything'], blindSpots: ['Narrow focus', 'Can bottleneck team', 'Reluctant to generalize'], pairWith: 'Promoter' },
  { id: 'scholar', name: 'Scholar', drives: { dominance: 3, extraversion: 2, patience: 7, formality: 8 }, role: 'stabilizer', populationPct: 4.0, style: 'Knowledge-seeking, rigorous, masters domains', tagline: 'Know it. Then build it.', strengths: ['Knowledge depth', 'Rigorous verification', 'Domain learning', 'Documentation'], blindSpots: ['Can over-research', 'Slow to prototype', 'Prefers theory to practice'], pairWith: 'Captain' },
  { id: 'controller', name: 'Controller', drives: { dominance: 9, extraversion: 2, patience: 3, formality: 8 }, role: 'expander', populationPct: 4.0, style: 'Structured expansion, demands precision', tagline: 'Precision at speed.', strengths: ['Structured execution', 'Scope control', 'Deadline delivery', 'Clear ownership'], blindSpots: ['Can micromanage', 'Inflexible to change', 'May miss creative solutions'], pairWith: 'Adapter' },
  { id: 'promoter', name: 'Promoter', drives: { dominance: 7, extraversion: 10, patience: 2, formality: 2 }, role: 'expander', populationPct: 4.0, style: 'Highest social energy, broadcast expansion', tagline: 'Make it visible. Make it matter.', strengths: ['Visibility', 'Enthusiasm', 'Cross-pollination', 'Launch energy'], blindSpots: ['Can overpromise', 'May lack follow-through', 'Prioritizes sizzle'], pairWith: 'Specialist' },
  { id: 'individualist', name: 'Individualist', drives: { dominance: 6, extraversion: 2, patience: 5, formality: 6 }, role: 'converter', populationPct: 4.88, style: 'Self-reliant, focused, quiet persistence', tagline: 'Heads down. Ships done.', strengths: ['Self-direction', 'Quiet persistence', 'Focused execution', 'Low maintenance'], blindSpots: ['Can under-communicate', 'Resists process', 'Invisible contributions'], pairWith: 'Collaborator' },
  { id: 'operator', name: 'Operator', drives: { dominance: 2, extraversion: 3, patience: 8, formality: 6 }, role: 'stabilizer', populationPct: 7.0, style: 'Reliable, steady, keeps the machine running', tagline: 'Keep the machine running.', strengths: ['Reliability', 'Consistent output', 'Steady execution', 'Operational excellence'], blindSpots: ['Resists change', 'Can miss big picture', 'Under-recognized'], pairWith: 'Strategist' },
  { id: 'artisan', name: 'Artisan', drives: { dominance: 5, extraversion: 3, patience: 7, formality: 5 }, role: 'stabilizer', populationPct: 5.0, style: 'Craftsmanship, tangible results, steady hand', tagline: 'Craft it right.', strengths: ['Quality craftsmanship', 'Tangible results', 'Steady hand', 'Pride in work'], blindSpots: ['Can over-polish', 'Slow to ship', 'Perfectionism'], pairWith: 'Captain' },
  { id: 'altruist', name: 'Altruist', drives: { dominance: 2, extraversion: 9, patience: 8, formality: 2 }, role: 'stabilizer', populationPct: 5.0, style: 'Warm, caring, stabilizes through people', tagline: 'Build for people, not metrics.', strengths: ['Empathy', 'Team care', 'User advocacy', 'Conflict resolution'], blindSpots: ['Can avoid hard decisions', 'Over-accommodates', 'Deprioritizes self'], pairWith: 'Controller' },
]

function matchProfile(drives: Drives): ProfileDef {
  let best = PROFILES[0]
  let bestDist = Infinity
  for (const p of PROFILES) {
    const dist = Math.sqrt(
      (drives.dominance - p.drives.dominance) ** 2 +
      (drives.extraversion - p.drives.extraversion) ** 2 +
      (drives.patience - p.drives.patience) ** 2 +
      (drives.formality - p.drives.formality) ** 2
    )
    if (dist < bestDist) {
      bestDist = dist
      best = p
    }
  }
  return best
}

// ── GitHub API helpers ─────────────────────────────────────────────────────

const GH_API = 'https://api.github.com'

async function ghFetch(path: string, token: string) {
  const res = await fetch(`${GH_API}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${path}`)
  return res.json()
}

// ── Main analyzer ──────────────────────────────────────────────────────────

export async function analyzeGitHub(token: string): Promise<AnalysisResult> {
  // 1. Fetch user + repos
  const [user, repos] = await Promise.all([
    ghFetch('/user', token),
    ghFetch('/user/repos?sort=pushed&per_page=20&type=owner', token),
  ])

  // 2. Fetch commits and PRs from top repos
  const repoNames: string[] = repos
    .filter((r: any) => !r.fork && !r.archived)
    .slice(0, 10)
    .map((r: any) => r.full_name)

  const commitResults = await Promise.all(
    repoNames.map((name: string) =>
      ghFetch(`/repos/${name}/commits?per_page=30&author=${user.login}`, token)
        .catch(() => [])
    )
  )

  const prResults = await Promise.all(
    repoNames.map((name: string) =>
      ghFetch(`/repos/${name}/pulls?state=all&per_page=20&sort=updated`, token)
        .catch(() => [])
    )
  )

  const branchResults = await Promise.all(
    repoNames.map((name: string) =>
      ghFetch(`/repos/${name}/branches?per_page=50`, token)
        .catch(() => [])
    )
  )

  // 3. Flatten and analyze
  const allCommits = commitResults.flat()
  const allPRs = prResults.flat().filter((pr: any) => pr.user?.login === user.login)
  const allBranches = branchResults.flat()

  // ── Extract signals ────────────────────────────────────────────────────

  // Commit message analysis
  const commitMessages = allCommits
    .map((c: any) => c.commit?.message || '')
    .filter((m: string) => m.length > 0)
  const avgMessageLen = commitMessages.length > 0
    ? commitMessages.reduce((sum: number, m: string) => sum + m.length, 0) / commitMessages.length
    : 30

  // Commit frequency pattern
  const commitDates = allCommits
    .map((c: any) => new Date(c.commit?.author?.date || 0).getTime())
    .filter((t: number) => t > 0)
    .sort((a: number, b: number) => a - b)

  let commitPattern: 'burst' | 'steady' | 'sporadic' = 'sporadic'
  if (commitDates.length > 5) {
    const gaps: number[] = []
    for (let i = 1; i < commitDates.length; i++) {
      gaps.push((commitDates[i] - commitDates[i - 1]) / (1000 * 60 * 60)) // hours
    }
    const avgGap = gaps.reduce((s, g) => s + g, 0) / gaps.length
    const variance = gaps.reduce((s, g) => s + (g - avgGap) ** 2, 0) / gaps.length
    const stdDev = Math.sqrt(variance)

    if (stdDev < avgGap * 0.5) commitPattern = 'steady'
    else if (stdDev > avgGap * 1.5) commitPattern = 'burst'
    else commitPattern = 'sporadic'
  }

  // PR analysis
  const prSizes = allPRs.map((pr: any) => (pr.additions || 0) + (pr.deletions || 0))
  const avgPRSize = prSizes.length > 0
    ? prSizes.reduce((s: number, v: number) => s + v, 0) / prSizes.length
    : 100

  // Merge time (PRs that were merged)
  const mergedPRs = allPRs.filter((pr: any) => pr.merged_at)
  const mergeTimes = mergedPRs.map((pr: any) => {
    const created = new Date(pr.created_at).getTime()
    const merged = new Date(pr.merged_at).getTime()
    return (merged - created) / (1000 * 60 * 60 * 24) // days
  })
  const avgMergeTime = mergeTimes.length > 0
    ? mergeTimes.reduce((s, t) => s + t, 0) / mergeTimes.length
    : 2

  // Languages
  const langCounts: Record<string, number> = {}
  repos.forEach((r: any) => {
    if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1
  })
  const topLanguages = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang]) => lang)

  // Fork ratio
  const ownRepos = repos.filter((r: any) => !r.fork).length
  const forkRepos = repos.filter((r: any) => r.fork).length
  const ownRatio = repos.length > 0 ? ownRepos / repos.length : 0.5

  // Has CI/tests/linters
  const hasCI = repos.some((r: any) =>
    r.topics?.some((t: string) => ['ci', 'testing', 'github-actions'].includes(t))
  )

  // README quality (description length as proxy)
  const avgDescLen = repos
    .map((r: any) => (r.description || '').length)
    .reduce((s: number, v: number) => s + v, 0) / Math.max(repos.length, 1)

  // ── Score drives ───────────────────────────────────────────────────────

  let D = 5, E = 5, C = 5, F = 5

  // Dominance signals
  if (avgPRSize > 300) D += 2
  else if (avgPRSize > 150) D += 1
  else if (avgPRSize < 50) D -= 1
  if (ownRatio > 0.7) D += 1.5
  else if (ownRatio < 0.3) D -= 1
  if (commitPattern === 'burst') D += 1

  // Extraversion signals
  const prCommentCount = allPRs.reduce((s: number, pr: any) => s + (pr.comments || 0), 0)
  if (prCommentCount > 50) E += 2
  else if (prCommentCount > 20) E += 1
  else if (prCommentCount < 5) E -= 1.5
  if (repos.length > 15) E += 1
  else if (repos.length < 5) E -= 1
  if (avgDescLen > 60) E += 0.5

  // Patience signals
  if (commitPattern === 'steady') C += 2
  else if (commitPattern === 'burst') C -= 2
  if (avgMergeTime > 3) C += 1.5
  else if (avgMergeTime < 0.5) C -= 1.5
  if (topLanguages.length <= 2) C += 0.5

  // Formality signals
  if (avgMessageLen > 60) F += 2
  else if (avgMessageLen > 40) F += 1
  else if (avgMessageLen < 15) F -= 2
  else if (avgMessageLen < 25) F -= 1
  if (hasCI) F += 1
  if (avgDescLen > 80) F += 0.5

  // Clamp
  const clamp = (v: number) => Math.max(1, Math.min(10, Math.round(v)))
  const drives: Drives = {
    dominance: clamp(D),
    extraversion: clamp(E),
    patience: clamp(C),
    formality: clamp(F),
  }

  // ── Match profile ─────────────────────────────────────────────────────

  const profileDef = matchProfile(drives)
  const profile: ProfileMatch = {
    id: profileDef.id,
    name: profileDef.name,
    role: profileDef.role,
    style: profileDef.style,
    tagline: profileDef.tagline,
    populationPct: profileDef.populationPct,
    drives,
    strengths: profileDef.strengths,
    blindSpots: profileDef.blindSpots,
    pairWith: profileDef.pairWith,
  }

  // ── Repo health ───────────────────────────────────────────────────────

  const healthIssues: RepoHealthIssue[] = []

  // Stale branches (branches not updated in 30+ days)
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
  let staleBranchCount = 0
  branchResults.forEach((branches: any[], idx: number) => {
    const repoName = repoNames[idx] || 'unknown'
    const stale = branches.filter((b: any) =>
      b.name !== 'main' && b.name !== 'master'
    )
    // We can't easily get branch last commit date from branches endpoint
    // so count non-default branches as a proxy
    if (stale.length > 10) {
      staleBranchCount += stale.length - 5
      healthIssues.push({
        repo: repoName.split('/')[1] || repoName,
        type: 'stale_branch',
        detail: `${stale.length} branches (potential cleanup needed)`,
      })
    }
  })

  // Unreviewed PRs (open PRs with 0 reviews)
  let unreviewedCount = 0
  prResults.forEach((prs: any[], idx: number) => {
    const repoName = repoNames[idx] || 'unknown'
    const openUnreviewed = prs.filter(
      (pr: any) => pr.state === 'open' && (pr.requested_reviewers?.length === 0)
    )
    if (openUnreviewed.length > 0) {
      unreviewedCount += openUnreviewed.length
      healthIssues.push({
        repo: repoName.split('/')[1] || repoName,
        type: 'unreviewed_pr',
        detail: `${openUnreviewed.length} open PR(s) with no reviewers`,
      })
    }
  })

  // Conflict detection (check for conflict markers in recent commit messages)
  const conflictCommits = allCommits.filter((c: any) => {
    const msg = (c.commit?.message || '').toLowerCase()
    return msg.includes('merge conflict') || msg.includes('resolve conflict')
  })

  return {
    profile,
    drives,
    stats: {
      totalCommits: allCommits.length,
      totalRepos: repos.length,
      totalPRs: allPRs.length,
      avgCommitMessageLength: Math.round(avgMessageLen),
      avgPRSize: Math.round(avgPRSize),
      topLanguages,
      commitPattern,
      avgMergeTimeDays: Math.round(avgMergeTime * 10) / 10,
    },
    health: {
      conflicts: conflictCommits.length,
      staleBranches: staleBranchCount,
      unreviewedPRs: unreviewedCount,
      issues: healthIssues,
    },
    generatedAt: new Date().toISOString(),
  }
}
