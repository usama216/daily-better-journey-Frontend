import { MetadataRoute } from 'next'
import { fetchPosts, fetchCategories } from '@/lib/api/serverApi'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dailybetterjourney.com'
  const currentDate = new Date().toISOString()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/journey`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/disclaimer`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Fetch blog posts
  let blogPosts: MetadataRoute.Sitemap = []
  try {
    const posts = await fetchPosts()
    const publishedPosts = posts.filter((p: any) => p.status === 'published')
    
    blogPosts = publishedPosts.map((post: any) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updated_at || post.created_at || currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error)
  }

  // Fetch categories
  let categoryPages: MetadataRoute.Sitemap = []
  try {
    const categories = await fetchCategories()
    
    categoryPages = categories.map((category: any) => ({
      url: `${siteUrl}/blog/category/${category.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error)
  }

  return [...staticPages, ...blogPosts, ...categoryPages]
}
