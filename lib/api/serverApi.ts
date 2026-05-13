// Server-side API utilities for Next.js server components
import { getSitemapRevalidateSeconds } from '@/lib/site'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.dailybetterjourney.com/api'

/** Same window as `app/sitemap.ts` so new posts hit the slug list / summaries together. */
const slugListRevalidate = getSitemapRevalidateSeconds()

async function parseJsonSafe(res: Response) {
  try {
    return await res.json()
  } catch {
    return null
  }
}

/** Paginated list (full rows). Use sparingly — prefer summaries/slugs. */
export async function fetchPosts(options?: { limit?: number; page?: number }) {
  try {
    const limit = options?.limit ?? 50
    const page = options?.page ?? 1
    const qs = new URLSearchParams({ limit: String(limit), page: String(page) })
    const response = await fetch(`${API_BASE_URL}/posts?${qs}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }

    const data = await parseJsonSafe(response)
    return data?.data || data || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

/**
 * All post slugs for sitemap / static params.
 * Prefers `/posts/slugs`; falls back to paginated `/posts` if API is older.
 */
export async function fetchPostSlugs(): Promise<
  Array<{ slug: string; status?: string; created_at?: string; updated_at?: string }>
> {
  try {
    const res = await fetch(`${API_BASE_URL}/posts/slugs`, {
      next: { revalidate: slugListRevalidate },
    })
    if (res.ok) {
      const data = await parseJsonSafe(res)
      const rows = data?.data || data || []
      if (Array.isArray(rows) && rows.length > 0) return rows
    }
  } catch {
    // fall through
  }

  const out: Array<{ slug: string; status?: string; created_at?: string; updated_at?: string }> = []
  let page = 1
  const limit = 80
  while (page < 500) {
    const res = await fetch(`${API_BASE_URL}/posts?limit=${limit}&page=${page}`, { cache: 'no-store' })
    if (!res.ok) break
    const data = await parseJsonSafe(res)
    const batch = data?.data || []
    if (!Array.isArray(batch) || batch.length === 0) break
    for (const p of batch) {
      if (p?.slug) {
        out.push({
          slug: p.slug,
          status: p.status,
          created_at: p.created_at,
          updated_at: p.updated_at,
        })
      }
    }
    if (batch.length < limit) break
    page += 1
  }
  return out
}

export async function fetchPublishedSummaries() {
  try {
    const res = await fetch(`${API_BASE_URL}/posts/summaries`, {
      next: { revalidate: slugListRevalidate },
    })
    if (res.ok) {
      const data = await parseJsonSafe(res)
      const rows = data?.data || data || []
      if (Array.isArray(rows) && rows.length > 0) return rows
    }
  } catch {
    // fall through
  }

  const posts = await fetchPosts({ limit: 200, page: 1 })
  return (posts as any[]).filter((p) => p.status === 'published')
}

export async function fetchPostBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/posts/slug/${encodeURIComponent(slug)}`, {
      next: { revalidate: 120 },
    })
    if (res.status === 404) return null
    if (res.ok) {
      const payload = await parseJsonSafe(res)
      const post = payload?.data ?? null
      return post
    }
  } catch {
    // fall through
  }

  try {
    const posts = await fetchPosts({ limit: 500, page: 1 })
    const post = (posts as any[]).find((p: any) => p.slug === slug && p.status === 'published')
    return post || null
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }

    const data = await parseJsonSafe(response)
    return data?.data || data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function fetchPostsByCategorySlug(slug: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${slug}/posts`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch posts by category')
    }

    const data = await parseJsonSafe(response)
    return {
      category: data?.category || null,
      posts: data?.data || data?.posts || [],
    }
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    return {
      category: null,
      posts: [],
    }
  }
}
