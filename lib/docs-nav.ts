import fs from 'fs'
import path from 'path'
import fg from 'fast-glob'
import matter from 'gray-matter'

// ── Types ────────────────────────────────────────────────────────────────────

export interface NavPage {
  slug: string
  title: string
}

export interface NavGroup {
  group: string
  pages: (NavPage | NavGroup)[]
}

export interface NavTab {
  tab: string
  groups: NavGroup[]
}

export interface DocsNavigation {
  tabs: NavTab[]
}

// ── Path to airlock-docs repo ────────────────────────────────────────────────

const DOCS_ROOT = path.resolve(process.cwd(), '..', 'repos', 'airlock-docs')

export function getDocsRoot() {
  return DOCS_ROOT
}

// ── Excluded files (internal / non-doc) ──────────────────────────────────────

const EXCLUDED_PATTERNS = [
  'CLAUDE.md',
  'AGENTS.md',
  'README.md',
  'research-prompt.md',
  '**/CLAUDE.md',
  '**/AGENTS.md',
  '**/README.md',
  'registry/**',
  'demo-shell/**',
  'node_modules/**',
  '.mintignore',
]

// ── Extract title from a file ────────────────────────────────────────────────

function getTitleFromFile(filePath: string, slug: string): string {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(content)
    if (data.title) return data.title as string

    // Fallback: first heading
    const headingMatch = content.match(/^#\s+(.+)/m)
    if (headingMatch) return headingMatch[1].replace(/[`*_~]/g, '').trim()
  } catch {
    // Fall through to slug-based title
  }

  // Fallback: humanize the slug
  const base = slug.split('/').pop() || slug
  return base
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

// ── Humanize directory name ──────────────────────────────────────────────────

function humanizeDir(dir: string): string {
  const special: Record<string, string> = {
    'ai-agent': 'AI Agent',
    'aiagent': 'AI Agent',
    crm: 'CRM',
    'contract-generator': 'Contract Generator',
    'contractgenerator': 'Contract Generator',
    'document-suite': 'Document Suite',
    'documentsuite': 'Document Suite',
    'batch-processing': 'Batch Processing',
    'batchprocessing': 'Batch Processing',
    'event-bus': 'Event Bus',
    'eventbus': 'Event Bus',
    'feature-control-plane': 'Feature Control Plane',
    'featurecontrolplane': 'Feature Control Plane',
    'meeting-intelligence': 'Meeting Intelligence',
    'meetingintelligence': 'Meeting Intelligence',
    'org-overview': 'Org Overview',
    'orgoverview': 'Org Overview',
    'patch-workflow': 'Patch Workflow',
    'patchworkflow': 'Patch Workflow',
    'real-time': 'Real-Time',
    'realtime': 'Real-Time',
    'record-inspector': 'Record Inspector',
    'task-system': 'Task System',
    'tasksystem': 'Task System',
    'tech-stack': 'Tech Stack',
    'techstack': 'Tech Stack',
    'vault-hierarchy': 'Vault Hierarchy',
    'vaulthierarchy': 'Vault Hierarchy',
    'workflow-engine': 'Workflow Engine',
    'workflowengine': 'Workflow Engine',
    'generative-ui': 'Generative UI',
    'notebooklm': 'NotebookLM',
    auth: 'Auth',
    shell: 'Shell',
    admin: 'Admin',
    security: 'Security',
    roles: 'Roles',
    search: 'Search',
    triage: 'Triage',
    calendar: 'Calendar',
    contracts: 'Contracts',
    dispatch: 'Dispatch',
    finance: 'Finance',
    messenger: 'Messenger',
    notifications: 'Notifications',
    onboarding: 'Onboarding',
    platform: 'Platform',
    tasks: 'Tasks',
  }

  const lower = dir.toLowerCase()
  if (special[lower]) return special[lower]

  // CamelCase → spaced
  return dir
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

// ── Discover all files and build navigation ──────────────────────────────────

interface DiscoveredFile {
  slug: string
  title: string
  filePath: string
  segments: string[] // path segments for grouping
}

function discoverAllFiles(): DiscoveredFile[] {
  const files = fg.sync('**/*.{md,mdx}', {
    cwd: DOCS_ROOT,
    ignore: EXCLUDED_PATTERNS,
  })

  return files
    .map((relPath) => {
      const slug = relPath.replace(/\.(mdx?|md)$/, '')
      const filePath = path.join(DOCS_ROOT, relPath)
      const title = getTitleFromFile(filePath, slug)
      const segments = slug.split('/')
      return { slug, title, filePath, segments }
    })
    .sort((a, b) => {
      // Sort by path depth then alphabetically
      if (a.segments.length !== b.segments.length) {
        return a.segments.length - b.segments.length
      }
      return a.slug.localeCompare(b.slug)
    })
}

// ── Build nav tree from discovered files ─────────────────────────────────────

// Tab assignment based on top-level directory
function getTabForFile(segments: string[]): string {
  // Root-level pages (introduction, why-airlock, etc.) → Overview
  if (segments.length === 1) return 'Overview'

  const topDir = segments[0].toLowerCase()

  // Narrative docs → Overview (the story-driven tab)
  if (topDir === 'narrative') return 'Overview'

  // Promote NotebookLM content to Overview (founder story, differentiators)
  if (topDir === 'notebooklm') return 'Overview'

  // Concepts → Overview
  if (topDir === 'concepts') return 'Overview'

  // "Specs" tab mapping to Platform / Documentation
  if (topDir === 'specs' || topDir === 'pub specs') {
    const specDir = segments[1]?.toLowerCase() || ''
    const platformDirs = [
      'ai-agent', 'workflow-engine', 'tech-stack', 'real-time',
      'event-bus', 'batch-processing', 'platform', 'security',
      'roles', 'notifications', 'search', 'onboarding',
      'generative-ui', 'feature-control-plane', 'admin',
      'org-overview',
    ]
    if (platformDirs.includes(specDir)) return 'Platform'
    return 'Technical'
  }

  if (topDir === 'features') return 'Features'

  return 'Reference'
}

function getGroupForFile(segments: string[]): string {
  if (segments.length === 1) return 'Get Started'

  const topDir = segments[0].toLowerCase()

  // Narrative docs get descriptive groups
  if (topDir === 'narrative') {
    return 'The Airlock Story'
  }

  // NotebookLM gets promoted to a research group
  if (topDir === 'notebooklm') return 'Research & Insights'

  if (topDir === 'specs' || topDir === 'pub specs' || topDir === 'features') {
    // Use second segment as group
    if (segments.length >= 2) {
      return humanizeDir(segments[1])
    }
    return 'General'
  }

  if (topDir === 'concepts') return 'Core Concepts'

  return humanizeDir(topDir)
}

export function getNavigation(): DocsNavigation {
  const allFiles = discoverAllFiles()

  // Build tab → group → pages structure
  const tabMap = new Map<string, Map<string, NavPage[]>>()

  for (const file of allFiles) {
    const tabName = getTabForFile(file.segments)
    const groupName = getGroupForFile(file.segments)

    if (!tabMap.has(tabName)) tabMap.set(tabName, new Map())
    const groupMap = tabMap.get(tabName)!
    if (!groupMap.has(groupName)) groupMap.set(groupName, [])
    groupMap.get(groupName)!.push({ slug: file.slug, title: file.title })
  }

  // Define tab order — narrative first, then platform, then depth
  const tabOrder = ['Overview', 'Platform', 'Features', 'Technical', 'Reference']

  const tabs: NavTab[] = []
  for (const tabName of tabOrder) {
    const groupMap = tabMap.get(tabName)
    if (!groupMap || groupMap.size === 0) continue

    const groups: NavGroup[] = []
    // Define preferred group ordering within tabs
    const groupPriority: Record<string, string[]> = {
      'Overview': ['Get Started', 'The Airlock Story', 'Core Concepts', 'Research & Insights'],
    }
    const priorityList = groupPriority[tabName] || []
    const sortedGroups = Array.from(groupMap.entries()).sort(([a], [b]) => {
      const aPriority = priorityList.indexOf(a)
      const bPriority = priorityList.indexOf(b)
      // If both have priority, sort by priority
      if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority
      // Priority items come first
      if (aPriority !== -1) return -1
      if (bPriority !== -1) return 1
      // Otherwise alphabetical
      return a.localeCompare(b)
    })

    for (const [groupName, pages] of sortedGroups) {
      groups.push({
        group: groupName,
        pages: pages.sort((a, b) => {
          // Put 'overview' pages first
          const aIsOverview = a.slug.endsWith('/overview') || a.slug.endsWith('/start')
          const bIsOverview = b.slug.endsWith('/overview') || b.slug.endsWith('/start')
          if (aIsOverview && !bIsOverview) return -1
          if (!aIsOverview && bIsOverview) return 1
          return a.title.localeCompare(b.title)
        }),
      })
    }

    tabs.push({ tab: tabName, groups })
  }

  return { tabs }
}

// ── Flatten all slugs ────────────────────────────────────────────────────────

function flattenPages(pages: (NavPage | NavGroup)[]): NavPage[] {
  const result: NavPage[] = []
  for (const p of pages) {
    if ('slug' in p) {
      result.push(p)
    } else {
      result.push(...flattenPages(p.pages))
    }
  }
  return result
}

export function getAllDocSlugs(): string[] {
  const nav = getNavigation()
  const slugs: string[] = []
  for (const tab of nav.tabs) {
    for (const group of tab.groups) {
      for (const page of flattenPages(group.pages)) {
        slugs.push(page.slug)
      }
    }
  }
  return slugs
}

export function getAllFlatPages(): NavPage[] {
  const nav = getNavigation()
  const pages: NavPage[] = []
  for (const tab of nav.tabs) {
    for (const group of tab.groups) {
      pages.push(...flattenPages(group.pages))
    }
  }
  return pages
}

// ── Search index data ────────────────────────────────────────────────────────

export interface SearchDoc {
  id: string
  slug: string
  title: string
  section: string
  content: string
}

export function getSearchIndex(): SearchDoc[] {
  const allFiles = discoverAllFiles()

  return allFiles.map((file) => {
    let content = ''
    try {
      const raw = fs.readFileSync(file.filePath, 'utf-8')
      const { content: mdContent } = matter(raw)
      // Strip markdown formatting for search, keep first 2000 chars
      content = mdContent
        .replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .replace(/[#*_`~\[\]()>|]/g, ' ') // Remove markdown chars
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 2000)
    } catch {
      // skip
    }

    const section = file.segments.length > 1
      ? humanizeDir(file.segments[0]) + ' / ' + humanizeDir(file.segments[1] || '')
      : 'Root'

    return {
      id: file.slug,
      slug: file.slug,
      title: file.title,
      section,
      content,
    }
  })
}
