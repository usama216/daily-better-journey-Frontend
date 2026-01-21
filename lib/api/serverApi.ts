// Server-side API utilities for Next.js server components
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.dailybetterjourney.com/api'

export async function fetchPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }
    
    const data = await response.json()
    return data?.data || data || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function fetchPostBySlug(slug: string) {
  try {
    const posts = await fetchPosts()
    const post = posts.find((p: any) => p.slug === slug && p.status === 'published')
    return post || null
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    
    const data = await response.json()
    return data?.data || data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function fetchPostsByCategorySlug(slug: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${slug}/posts`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts by category')
    }
    
    const data = await response.json()
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
