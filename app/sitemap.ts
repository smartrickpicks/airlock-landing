import { getAllDocSlugs } from '@/lib/docs-nav'
import type { MetadataRoute } from 'next'

const BASE_URL = 'https://doyoulikedags.xyz'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/otto`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/docs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ]

  let docPages: MetadataRoute.Sitemap = []
  try {
    const slugs = getAllDocSlugs()
    docPages = slugs.map((slug) => ({
      url: `${BASE_URL}/docs/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    // Docs may not be available in all environments
  }

  return [...staticPages, ...docPages]
}
