'use client'

import { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useGetPostsQuery } from '@/lib/api/blogApi'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import CommentSection from '@/components/CommentSection'

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

  const relatedPosts = useMemo(() => {
    if (!post?.category_id) return []
    return posts
      .filter((p: any) => 
        p.status === 'published' && 
        p.category_id === post.category_id && 
        p.slug !== post.slug
      )
      .slice(0, 3)
  }, [posts, post])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-charcoal-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-charcoal-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-golden-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-charcoal-600 font-medium">Loading article...</p>
          </div>
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
            <div className="sticky top-20">
              <AdBanner position="left-rail" />
            </div>
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
              <div className="prose prose-lg max-w-none prose-headings:text-charcoal-900 prose-p:text-charcoal-800 prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 blog-content">
                <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
              </div>
              
              {/* In-Article Ad - 300×250 Rectangle (Native Feel) */}
              <div className="my-8">
                <AdBanner position="in-article" />
              </div>
              
              {/* Mobile Anchor Ad - Bottom Sticky for Mobile */}
              <div className="md:hidden my-6">
                <AdBanner position="mobile-anchor" />
              </div>
            </div>
          </article>

          {/* Right Ad (xl+) */}
          <aside className="hidden xl:block">
            <div className="sticky top-20 space-y-6">
              {/* Medium Rectangle 300×250 - BEST PERFORMER */}
              <AdBanner position="right-rail" />
              
              {/* Large Rectangle 336×280 - High Visibility */}
              <AdBanner position="sidebar-rectangle" />
              
              {/* Half Page 300×600 - High Revenue */}
              <AdBanner position="half-page" />
              
              {/* Featured Posts */}
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
              
              {/* Square Ad 250×250 */}
              <AdBanner position="square" />
            </div>
          </aside>
        </div>

        {/* Bottom Ad - Leaderboard */}
        <div className="mt-10">
          <AdBanner position="between-sections" />
        </div>

        {/* Comment Section */}
        {post && (
          <div className="mt-16 max-w-4xl mx-auto">
            <CommentSection postId={post.id} postSlug={post.slug} />
          </div>
        )}

        {/* Related Posts from Same Category */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 mb-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-charcoal-900 mb-2">Related Articles</h2>
              <p className="text-charcoal-600">More from the same category</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost: any) => (
                <a
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-white rounded-xl shadow-md border border-charcoal-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {relatedPost.featured_image ? (
                    <div className="w-full h-48 bg-charcoal-100 overflow-hidden">
                      <img
                        src={relatedPost.featured_image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-golden-200 to-forest-200" />
                  )}
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-charcoal-900 mb-2 group-hover:text-golden-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-charcoal-600 mb-3 line-clamp-2">
                      {relatedPost.excerpt || relatedPost.content?.replace(/<[^>]*>/g, '').substring(0, 100) + '...'}
                    </p>
                    <div className="flex items-center justify-between text-xs text-charcoal-500">
                      <span>
                        {relatedPost.created_at ? new Date(relatedPost.created_at).toLocaleDateString() : ''}
                      </span>
                      <span className="text-golden-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Read More →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
        
        {/* Large Leaderboard before Footer - 970×90 */}
        <div className="mt-16">
          <AdBanner position="before-footer" />
        </div>
      </div>

      <Footer />
    </main>
  )
}


