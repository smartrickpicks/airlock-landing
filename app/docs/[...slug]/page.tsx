import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import { getDocBySlug, getTableOfContents, getPrevNext } from '@/lib/docs'
import { getAllDocSlugs } from '@/lib/docs-nav'
import { mdxComponents } from '@/components/docs/MDXComponents'
import TableOfContents from '@/components/docs/TableOfContents'
import PrevNextNav from '@/components/docs/PrevNextNav'

export function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({
    slug: slug.split('/'),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const doc = getDocBySlug(slug)
  if (!doc) return { title: 'Not Found' }
  return {
    title: doc.title,
    description: doc.description,
  }
}

// Safe MDX renderer that falls back to plain markdown on compilation errors
async function SafeMDXContent({ source, isMdx }: { source: string; isMdx: boolean }) {
  try {
    return (
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            format: isMdx ? 'mdx' : 'md',
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            ],
          },
        }}
      />
    )
  } catch {
    // If MDX compilation fails, try as plain markdown
    try {
      return (
        <MDXRemote
          source={source}
          components={mdxComponents}
          options={{
            mdxOptions: {
              format: 'md',
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: 'wrap' }],
              ],
            },
          }}
        />
      )
    } catch {
      // Last resort: render as pre-formatted text
      return (
        <div className="prose prose-invert max-w-none">
          <pre className="whitespace-pre-wrap text-sm text-[var(--text-secondary)] font-sans leading-7">
            {source}
          </pre>
        </div>
      )
    }
  }
}

export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const doc = getDocBySlug(slug)
  if (!doc) notFound()

  const toc = getTableOfContents(doc.content)
  const prevNext = getPrevNext(doc.slug)

  return (
    <div className="flex">
      {/* Content */}
      <article className="flex-1 min-w-0 px-6 lg:px-12 py-10 max-w-3xl">
        {/* Title */}
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
          {doc.title}
        </h1>
        {doc.description && (
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            {doc.description}
          </p>
        )}

        {/* MDX content */}
        <div className="docs-content">
          <SafeMDXContent source={doc.content} isMdx={doc.isMdx} />
        </div>

        <PrevNextNav {...prevNext} />
      </article>

      {/* Table of contents */}
      <aside className="hidden xl:block w-56 flex-shrink-0 py-10 pr-6">
        <div className="sticky top-24">
          <TableOfContents items={toc} />
        </div>
      </aside>
    </div>
  )
}
