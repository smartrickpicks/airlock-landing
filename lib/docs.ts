import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getDocsRoot, getAllFlatPages } from './docs-nav'

// ── Get doc by slug ──────────────────────────────────────────────────────────

export interface DocData {
  slug: string
  title: string
  description?: string
  content: string
  frontmatter: Record<string, unknown>
  isMdx: boolean
}

export function getDocBySlug(slugParts: string[]): DocData | null {
  const slug = slugParts.join('/')
  const docsRoot = getDocsRoot()

  // Try .mdx first, then .md
  const mdxPath = path.join(docsRoot, `${slug}.mdx`)
  const mdPath = path.join(docsRoot, `${slug}.md`)

  let filePath = ''
  let isMdx = false
  if (fs.existsSync(mdxPath)) { filePath = mdxPath; isMdx = true }
  else if (fs.existsSync(mdPath)) { filePath = mdPath; isMdx = false }
  else return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: (data.title as string) || slug.split('/').pop()?.replace(/-/g, ' ') || slug,
    description: data.description as string | undefined,
    content,
    frontmatter: data,
    isMdx,
  }
}

// ── Table of contents ────────────────────────────────────────────────────────

export interface TOCItem {
  id: string
  text: string
  level: number
}

export function getTableOfContents(content: string): TOCItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm
  const items: TOCItem[] = []
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].replace(/[`*_~]/g, '').trim()
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
    items.push({ id, text, level })
  }

  return items
}

// ── Prev / Next ──────────────────────────────────────────────────────────────

export interface PrevNext {
  prev: { slug: string; title: string } | null
  next: { slug: string; title: string } | null
}

export function getPrevNext(currentSlug: string): PrevNext {
  const allPages = getAllFlatPages()
  const idx = allPages.findIndex((p) => p.slug === currentSlug)

  return {
    prev: idx > 0 ? { slug: allPages[idx - 1].slug, title: allPages[idx - 1].title } : null,
    next:
      idx < allPages.length - 1
        ? { slug: allPages[idx + 1].slug, title: allPages[idx + 1].title }
        : null,
  }
}
