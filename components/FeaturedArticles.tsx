'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useGetPostsQuery } from '@/lib/api/blogApi'
import type { BlogPost } from '@/lib/posts'

function getTextPreview(html: string, maxLength = 140) {
  if (!html) return ''
  const text = html.replace(/<[^>]*>/g, '')
  const decoded = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
  const trimmed = decoded.trim()
  return trimmed.length > maxLength ? trimmed.substring(0, maxLength) + '...' : trimmed
}

type FeaturedArticlesProps = {
  initialPosts?: BlogPost[]
}

const FeaturedArticles = ({ initialPosts = [] }: FeaturedArticlesProps) => {
  const hasInitialPosts = initialPosts.length > 0
  const { data: postsData } = useGetPostsQuery({}, { skip: hasInitialPosts })

  const posts = hasInitialPosts
    ? initialPosts
    : (postsData?.data || postsData || [])
        .filter((p: BlogPost) => p.status === 'published' && p.is_featured)
        .slice(0, 3)

  return (
    <section className="relative z-10 bg-gradient-to-b from-white to-charcoal-50 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-4 py-2 bg-golden-100 border border-golden-300 rounded-full mb-4">
            <span className="text-golden-700 text-sm font-semibold uppercase tracking-wide">
              Latest Articles
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-charcoal-900 mb-4">
            Fresh Stories To Lift Your Day
          </h2>

          <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
            Step into new ideas that spark curiosity, fuel motivation, and offer simple shifts you
            can use right now.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {posts.map((post: BlogPost, index: number) => (
            <Link
              key={post.slug || index}
              href={`/blog/${post.slug}`}
              className="block h-full no-underline text-inherit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golden-500"
            >
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer h-full"
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-charcoal-200 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-golden-200 to-forest-200 flex-shrink-0">
                    {post.featured_image ? (
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent" />
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-bold text-charcoal-800 shadow-lg">
                      Latest
                    </div>
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-golden-500/90 backdrop-blur-sm rounded-full text-xs font-bold text-white shadow-lg">
                      Featured
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-charcoal-900 mb-3 group-hover:text-golden-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {(post.byline_author_name || '').trim() ? (
                      <p className="text-xs text-charcoal-500 mb-2">
                        By {(post.byline_author_name || '').trim()}
                      </p>
                    ) : null}

                    <p className="text-charcoal-600 mb-6 leading-relaxed text-base flex-1">
                      {post.excerpt
                        ? getTextPreview(post.excerpt)
                        : getTextPreview(post.content || '')}
                    </p>

                    <span className="inline-flex items-center gap-2 text-golden-600 hover:text-golden-700 font-semibold group mt-auto">
                      Read More
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-3 bg-charcoal-900 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            <span>Explore the Blog</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedArticles
