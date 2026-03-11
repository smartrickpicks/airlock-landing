'use client'

import Link from 'next/link'

interface BreadcrumbsProps {
  slug: string
  title: string
}

const segmentLabels: Record<string, string> = {
  specs: 'Specs',
  features: 'Features',
  narrative: 'Narrative',
  concepts: 'Concepts',
  notebooklm: 'Research',
  'pub specs': 'Public Specs',
  'ai-agent': 'AI Agent',
  crm: 'CRM',
  'workflow-engine': 'Workflow Engine',
  'tech-stack': 'Tech Stack',
  'real-time': 'Real-Time',
  security: 'Security',
  shell: 'Shell',
  admin: 'Admin',
  contracts: 'Contracts',
  calendar: 'Calendar',
  tasks: 'Tasks',
  dispatch: 'Dispatch',
  search: 'Search',
  platform: 'Platform',
  onboarding: 'Onboarding',
  messenger: 'Messenger',
  notifications: 'Notifications',
  finance: 'Finance',
  roles: 'Roles',
  triage: 'Triage',
  'generative-ui': 'Generative UI',
  'feature-control-plane': 'Feature Control Plane',
  'document-suite': 'Document Suite',
  'meeting-intelligence': 'Meeting Intelligence',
  'org-overview': 'Org Overview',
  'patch-workflow': 'Patch Workflow',
  'record-inspector': 'Record Inspector',
  'task-system': 'Task System',
  'vault-hierarchy': 'Vault Hierarchy',
  'event-bus': 'Event Bus',
  'batch-processing': 'Batch Processing',
}

function humanize(segment: string): string {
  if (segmentLabels[segment]) return segmentLabels[segment]
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function Breadcrumbs({ slug, title }: BreadcrumbsProps) {
  const segments = slug.split('/')

  // Don't show breadcrumbs for root-level pages
  if (segments.length <= 1) return null

  const crumbs = segments.slice(0, -1).map((seg, i) => ({
    label: humanize(seg),
    // We don't link intermediate crumbs since they may not be real pages
    path: null as string | null,
  }))

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-mono mb-4">
      <Link
        href="/docs"
        className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
      >
        Docs
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <svg className="w-3 h-3 text-[var(--text-muted)]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-[var(--text-muted)]">{crumb.label}</span>
        </span>
      ))}
      <span className="flex items-center gap-1.5">
        <svg className="w-3 h-3 text-[var(--text-muted)]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-[var(--text-secondary)]">{title}</span>
      </span>
    </nav>
  )
}
