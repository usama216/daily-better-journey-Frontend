export type BlogPost = {
  id?: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  featured_image?: string
  is_featured?: boolean
  status?: string
  byline_author_name?: string
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.dailybetterjourney.com/api'

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_BASE}/posts`, {
      next: { revalidate: 300 },
    })

    if (!res.ok) return []

    const data = await res.json()
    const posts: BlogPost[] = data?.data || data || []

    return posts
      .filter((post) => post.status === 'published' && post.is_featured)
      .slice(0, 3)
  } catch {
    return []
  }
}
