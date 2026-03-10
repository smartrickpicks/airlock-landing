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
      className={`block py-1.5 px-3 rounded-md text-sm transition-colors ${
        isActive
          ? 'text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 font-medium'
          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-overlay)]'
      }`}
    >
      {page.title}
    </Link>
  )
}

function GroupSection({ group, depth = 0 }: { group: NavGroup; depth?: number }) {
  const [open, setOpen] = useState(true)

  return (
    <div className={depth > 0 ? 'ml-3 mt-1' : ''}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 w-full py-1.5 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
      >
        <svg
          className={`w-3 h-3 transition-transform ${open ? 'rotate-90' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        {group.group}
      </button>
      {open && (
        <div className="space-y-0.5">
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
      <div className="flex border-b border-[var(--border-primary)] px-2">
        {navigation.map((tab, i) => (
          <button
            key={tab.tab}
            onClick={() => setActiveTab(i)}
            className={`flex-1 py-3 text-xs font-medium uppercase tracking-wider transition-colors ${
              activeTab === i
                ? 'text-[var(--accent-primary)] border-b-2 border-[var(--accent-primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            {tab.tab}
          </button>
        ))}
      </div>

      {/* Navigation groups */}
      <nav className="flex-1 overflow-y-auto py-4 px-1 space-y-4">
        {navigation[activeTab]?.groups.map((group, i) => (
          <GroupSection key={i} group={group} />
        ))}
      </nav>

      {/* Mobile close */}
      {onClose && (
        <button
          onClick={onClose}
          className="lg:hidden p-3 text-center text-sm text-[var(--text-muted)] border-t border-[var(--border-primary)]"
        >
          Close menu
        </button>
      )}
    </aside>
  )
}
