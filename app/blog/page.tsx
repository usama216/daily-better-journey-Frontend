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
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            The Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stories, methods, and mindsets for growth
          </p>
        </header>

        {/* Blog Snippet */}
        <blockquote className="bg-gray-50 p-8 rounded-lg text-center mb-16">
          <p className="text-2xl text-gray-800 italic leading-relaxed">
            "Discipline isn't punishment. It's freedom, the freedom to follow through, to trust yourself, to build a life you're proud of."
          </p>
        </blockquote>

        {/* Ad Banner */}
        <AdBanner position="between-sections" />

        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Categories</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {category.title}
                </h3>
                <p className="text-gray-600">
                  {category.description}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Featured Articles */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
          <div className="grid gap-8 md:grid-cols-3">
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
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-100" aria-label="Article image placeholder"></div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                    Read More →
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">More articles coming soon!</p>
          <a
            href="/"
            className="inline-block border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all"
          >
            Back to Home
          </a>
        </div>
      </div>

      <Footer />
    </main>
  )
}
