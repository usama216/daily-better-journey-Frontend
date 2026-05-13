import type { MetadataRoute } from 'next'
import { fetchPostSlugs, fetchCategories } from '@/lib/api/serverApi'
import { getSiteUrl, getSitemapRevalidateSeconds } from '@/lib/site'

export const revalidate = getSitemapRevalidateSeconds()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()
  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
    { url: `${siteUrl}/journey`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${siteUrl}/privacy`, lastModified: now, changeFrequency: 'weekly', priority: 0.35 },
    { url: `${siteUrl}/terms`, lastModified: now, changeFrequency: 'weekly', priority: 0.35 },
    { url: `${siteUrl}/disclaimer`, lastModified: now, changeFrequency: 'weekly', priority: 0.35 },
  ]

  let blogPosts: MetadataRoute.Sitemap = []
  try {
    const rows = await fetchPostSlugs()
    blogPosts = rows
      .filter((p: any) => p.status === 'published' && p.slug)
      .map((post: any) => ({
        url: `${siteUrl}/blog/${encodeURIComponent(post.slug)}`,
        lastModified: post.updated_at || post.created_at || now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error)
  }

  let categoryPages: MetadataRoute.Sitemap = []
  try {
    const categories = await fetchCategories()
    categoryPages = categories.map((category: any) => ({
      url: `${siteUrl}/blog/category/${encodeURIComponent(category.slug)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    }))
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error)
  }

  return [...staticPages, ...blogPosts, ...categoryPages]
}
