'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import { motion } from 'framer-motion'

export default function BlogPage() {
  const categories = [
    {
      title: 'Habits & Discipline',
      description: 'Learn how to build structure, stay consistent, and keep your promises to yourself.'
    },
    {
      title: 'Mindset & Growth',
      description: 'Shift your thinking to overcome fear, comparison, and doubt.'
    },
    {
      title: 'Emotional Intelligence',
      description: 'Develop calmness, empathy, and awareness — even in stressful moments.'
    },
    {
      title: 'Productivity & Focus',
      description: 'Simplify your days and focus on what truly matters.'
    },
    {
      title: 'Reflections & Life Lessons',
      description: 'Personal essays and stories about growth, setbacks, and rediscovery.'
    }
  ]

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
              <span className="text-golden-700 text-sm font-semibold uppercase tracking-wide">Articles</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-charcoal-900 mb-6"
            >
              The Blog
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed"
            >
              Stories, methods, and mindsets for growth
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
                &ldquo;Discipline isn&apos;t punishment. It&apos;s freedom, the freedom to follow through, to trust yourself, to build a life you&apos;re proud of.&rdquo;
              </p>
            </blockquote>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-12 relative z-10">

        {/* Ad Banner */}
        <AdBanner position="between-sections" />

        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Categories</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white border-2 border-charcoal-100 rounded-2xl p-6 hover:border-golden-200 hover:shadow-xl transition-all cursor-pointer group"
              >
                <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-golden-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-charcoal-600">
                  {category.description}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Featured Articles */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Featured Articles</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'Morning Habits That Shape Your Day', excerpt: 'Learn the power of mindful mornings and small routines...' },
              { title: 'Learning Emotional Control', excerpt: 'Discover how to manage reactions and build emotional strength...' },
              { title: 'Why Reflection Makes You Stronger', excerpt: 'How journaling helps you create balance and direction...' }
            ].map((article, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white border-2 border-charcoal-100 rounded-2xl overflow-hidden hover:border-golden-200 hover:shadow-xl transition-all group"
              >
                <div className="h-48 bg-gradient-to-br from-golden-200 to-forest-200" aria-label="Article image placeholder"></div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-charcoal-900 mb-2 group-hover:text-golden-600 transition-colors">{article.title}</h3>
                  <p className="text-charcoal-600 mb-4">{article.excerpt}</p>
                  <a href="#" className="inline-flex items-center gap-2 text-golden-600 hover:text-golden-700 font-semibold group">
                    Read More
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

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
