'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useGetPostsQuery, useGetCategoriesQuery } from '@/lib/api/blogApi'

export default function BlogPage() {
  const router = useRouter()
  const { data: postsData, isLoading } = useGetPostsQuery({})
  const posts = (postsData?.data || postsData || [])
    .filter((p: any) => p.status === 'published')

  const getTextPreview = (html: string, maxLength = 160) => {
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

  const { data: categoriesData } = useGetCategoriesQuery(undefined)
  const categories = (categoriesData?.data || categoriesData || [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-charcoal-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-golden-50 via-white to-forest-50 py-24 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-golden-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-forest-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 bg-golden-100 border border-golden-300 rounded-full mb-6"
            >
              <span className="text-golden-700 text-sm font-semibold uppercase tracking-wide">Explore The Blog
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-charcoal-900 mb-6"
            >
              A Space For Growth And Curiosity
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed"
            >
              Explore writing that encourages deeper clarity, softer moments, and small steps toward a better you.

            </motion.p>
          </header>

          {/* Blog Snippet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-charcoal-100 max-w-4xl mx-auto"
          >
            <blockquote className="text-center">
              <p className="text-2xl sm:text-3xl text-charcoal-800 italic leading-relaxed">
              The future depends on what you do today. Your decisions, your discipline, and the way you choose to show up are shaping the life you will experience tomorrow.   </p>
            </blockquote>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-12 relative z-10">

        {/* Ad Banner - Leaderboard 728×90 */}
        <AdBanner position="between-sections" />

        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Categories</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category: any, index: number) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => router.push(`/blog/category/${category.slug}`)}
                className="bg-white border-2 cursor-pointer border-charcoal-100 rounded-2xl p-6 hover:border-golden-200 hover:shadow-xl transition-all cursor-pointer group"
              >
                <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-golden-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-charcoal-600">
                  {category.description || '—'}
                </p>
                <Link href={`/blog/category/${category.slug}`} className="inline-flex items-center gap-2 text-golden-600 hover:text-golden-700 font-semibold group mt-4">
                  Explore
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        {/* In-Article Rectangle Ad - 300×250 */}
        <div className="my-12">
          <AdBanner position="in-article" />
        </div>

        {/* Articles Listing */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-charcoal-900">Latest Articles</h2>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-charcoal-200 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-golden-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <p className="text-charcoal-600 font-medium">Loading articles...</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((post: any, index: number) => (
                <motion.article
                  key={post.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  onClick={() => router.push(`/blog/${post.slug}`)}
                  
                  className="bg-white cursor-pointer border-2 border-charcoal-100 rounded-2xl overflow-hidden hover:border-golden-200 hover:shadow-xl transition-all group h-full flex flex-col"
                >
                  <div className="h-48 bg-gradient-to-br from-golden-200 to-forest-200 flex-shrink-0">
                    {post.featured_image ? (
                      <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-charcoal-900 mb-2 group-hover:text-golden-600 transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-charcoal-600 mb-4 line-clamp-3 flex-1">{post.excerpt ? getTextPreview(post.excerpt) : getTextPreview(post.content)}</p>
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-golden-600 hover:text-golden-700 font-semibold group mt-auto">
                      Read More
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>

        {/* Square Ad - 250×250 */}
        <div className="my-12">
          <AdBanner position="square" />
        </div>
        
        {/* Large Leaderboard - 970×90 */}
        <div className="my-12">
          <AdBanner position="before-footer" />
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-charcoal-700 mb-6 text-lg">More articles coming soon!</p>
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-2 border-2 border-charcoal-800 text-charcoal-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-charcoal-50 transition-all shadow-lg"
          >
            Back to Home
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
