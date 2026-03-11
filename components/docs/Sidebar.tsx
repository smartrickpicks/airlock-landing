'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { NavTab, NavGroup, NavPage } from '@/lib/docs-nav'

function isNavPage(item: NavPage | NavGroup): item is NavPage {
  return 'slug' in item
}

function PageLink({ page }: { page: NavPage }) {
  const pathname = usePathname()
  const href = `/docs/${page.slug}`
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`group flex items-center gap-2 py-1.5 px-3 rounded-lg text-sm transition-all ${
        isActive
          ? 'text-[var(--accent-primary)] bg-[var(--accent-primary)]/[0.08] font-medium'
          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-overlay)]'
      }`}
    >
      {/* Active indicator dot */}
      <span
        className={`w-1 h-1 rounded-full flex-shrink-0 transition-all ${
          isActive ? 'bg-[var(--accent-primary)]' : 'bg-transparent group-hover:bg-[var(--text-muted)]/30'
        }`}
      />
      <span className="truncate">{page.title}</span>
    </Link>
  )
}

function GroupSection({ group, depth = 0 }: { group: NavGroup; depth?: number }) {
  const [open, setOpen] = useState(true)

  return (
    <div className={depth > 0 ? 'ml-3 mt-1' : ''}>
      <button
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-2 w-full py-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors rounded-md hover:bg-[var(--bg-overlay)]/50"
      >
        <svg
          className={`w-3 h-3 transition-transform duration-200 text-[var(--text-muted)]/50 ${open ? 'rotate-90' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span>{group.group}</span>
        {/* Page count badge */}
        <span className="ml-auto text-[10px] font-mono text-[var(--text-muted)]/40 tabular-nums">
          {group.pages.length}
        </span>
      </button>
      {open && (
        <div className="space-y-0.5 mt-0.5">
          {group.pages.map((item, i) =>
            isNavPage(item) ? (
              <PageLink key={item.slug} page={item} />
            ) : (
              <GroupSection key={i} group={item} depth={depth + 1} />
            )
          )}
        </div>
      )}
    </div>
  )
}

interface SidebarProps {
  navigation: NavTab[]
  onClose?: () => void
}

export default function Sidebar({ navigation, onClose }: SidebarProps) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <aside className="h-full flex flex-col">
      {/* Tab switcher */}
      <div className="flex border-b border-[var(--border-primary)] px-1 gap-0.5 bg-[var(--bg-sunken)]/50">
        {navigation.map((tab, i) => (
          <button
            key={tab.tab}
            onClick={() => setActiveTab(i)}
            className={`relative flex-1 py-3 text-[11px] font-medium uppercase tracking-wider transition-colors rounded-t-md ${
              activeTab === i
                ? 'text-[var(--accent-primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            {tab.tab}
            {/* Active tab indicator */}
            {activeTab === i && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[var(--accent-primary)] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Navigation groups */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5 scrollbar-thin">
        {navigation[activeTab]?.groups.map((group, i) => (
          <GroupSection key={i} group={group} />
        ))}
      </nav>

      {/* Mobile close */}
      {onClose && (
        <button
          onClick={onClose}
          className="lg:hidden p-3 text-center text-sm text-[var(--text-muted)] border-t border-[var(--border-primary)] hover:bg-[var(--bg-overlay)] transition-colors"
        >
          Close menu
        </button>
      )}
    </aside>
  )
}
