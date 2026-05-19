'use client'

import { useEffect, useState } from 'react'
import PostAuthorByline, { getPostAuthorFields } from '@/components/PostAuthorByline'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.dailybetterjourney.com/api'

export interface BlogPostAuthorSectionProps {
  slug: string
  initialName?: string
  initialBio?: string
  initialImageUrl?: string
  variant?: 'compact' | 'full'
  className?: string
}

/**
 * Client-side author block for article pages — hydrates from API so byline
 * stays in sync after admin edits (and avoids stale ISR HTML).
 */
export default function BlogPostAuthorSection({
  slug,
  initialName = '',
  initialBio = '',
  initialImageUrl = '',
  variant = 'full',
  className = '',
}: BlogPostAuthorSectionProps) {
  const [author, setAuthor] = useState({
    name: initialName.trim(),
    bio: initialBio.trim(),
    imageUrl: initialImageUrl.trim(),
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(`${API_BASE}/posts/slug/${encodeURIComponent(slug)}`, {
          cache: 'no-store',
        })
        if (!res.ok) return
        const payload = await res.json()
        const post = payload?.data
        if (!post || cancelled) return
        const fields = getPostAuthorFields(post)
        setAuthor(fields)
      } catch {
        // keep SSR initial values
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [slug])

  return (
    <PostAuthorByline
      name={author.name}
      bio={author.bio}
      imageUrl={author.imageUrl}
      variant={variant}
      className={className}
    />
  )
}
