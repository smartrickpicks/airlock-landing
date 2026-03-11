import type { Metadata } from 'next'
import DocsLayoutClient from './DocsLayoutClient'
import { getNavigation, getAllFlatPages, getSearchIndex } from '@/lib/docs-nav'

export const metadata: Metadata = {
  title: {
    template: '%s — Airlock Docs',
    default: 'Airlock Docs',
  },
  description: 'Airlock documentation — contracts, teams, and intelligence in one workspace.',
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const navigation = getNavigation()
  const allPages = getAllFlatPages().map((p) => ({ slug: p.slug, title: p.title }))
  const searchDocs = getSearchIndex()

  return (
    <DocsLayoutClient navigation={navigation} allPages={allPages} searchDocs={searchDocs}>
      {children}
    </DocsLayoutClient>
  )
}
