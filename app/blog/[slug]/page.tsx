'use client'

import { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useGetPostsQuery } from '@/lib/api/blogApi'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const { data: postsData, isLoading } = useGetPostsQuery({})
  const posts = (postsData?.data || postsData || [])

  const post = useMemo(() => {
    const slug = params?.slug
    if (!slug) return null
    return posts.find((p: any) => p.slug === slug)
  }, [params, posts])

  const featured = useMemo(() => {
    return posts.filter((p: any) => p.status === 'published' && p.is_featured && p.slug !== post?.slug).slice(0, 5)
  }, [posts, post])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-charcoal-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-charcoal-600">Loading...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-charcoal-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-charcoal-600">Post not found.</p>
          <button onClick={() => router.push('/blog')} className="mt-4 text-golden-700 underline">Back to Blog</button>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-charcoal-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_minmax(0,_800px)_1fr] gap-6">
          {/* Left Ad (xl+) */}
          <aside className="hidden xl:block">
            <AdBanner position="left-rail" />
          </aside>

          {/* Content */}
          <article className="bg-white rounded-2xl shadow border border-charcoal-200 overflow-hidden">
            {post.featured_image ? (
              <div className="w-full h-72 md:h-96 bg-charcoal-100">
                <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            ) : null}
            <div className="p-6 md:p-10">
              <h1 className="text-3xl md:text-4xl font-extrabold text-charcoal-900 mb-3">{post.title}</h1>
              <div className="text-sm text-charcoal-500 mb-8">
                {post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}
              </div>
              <div className="prose prose-lg max-w-none prose-headings:text-charcoal-900 prose-p:text-charcoal-800 prose-a:text-golden-700 prose-a:no-underline hover:prose-a:underline">
                <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
              </div>
            </div>
          </article>

          {/* Right Ad (xl+) */}
          <aside className="hidden xl:block space-y-6">
            <AdBanner position="right-rail" />
            <div className="bg-white rounded-xl shadow border border-charcoal-200 p-4">
              <h3 className="text-base font-semibold text-charcoal-900 mb-3">Featured Posts</h3>
              <ul className="space-y-3">
                {featured.map((fp: any) => (
                  <li key={fp.id}>
                    <a href={`/blog/${fp.slug}`} className="group block">
                      <div className="flex gap-3 items-center">
                        {fp.featured_image ? (
                          <img src={fp.featured_image} alt={fp.title} className="w-14 h-14 rounded object-cover border" />
                        ) : (
                          <div className="w-14 h-14 rounded bg-charcoal-100 border" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-charcoal-900 group-hover:text-golden-700 line-clamp-2">{fp.title}</p>
                          <p className="text-xs text-charcoal-500">{fp.created_at ? new Date(fp.created_at).toLocaleDateString() : ''}</p>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Bottom Ad */}
        <div className="mt-10">
          <AdBanner position="between-sections" />
        </div>
      </div>

      <Footer />
    </main>
  )
}


