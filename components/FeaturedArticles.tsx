'use client'

import { motion } from 'framer-motion'

interface Article {
  title: string
  description: string
}

const articles: Article[] = [
  {
    title: 'Morning Habits That Shape Your Day',
    description: 'Learn the power of mindful mornings and small routines that set the tone for success.',
  },
  {
    title: 'Learning Emotional Control',
    description: 'Discover how to manage reactions, calm your mind, and build emotional strength.',
  },
  {
    title: 'Why Reflection Makes You Stronger',
    description: 'How journaling and self-awareness help you create balance and direction in life.',
  },
]

const FeaturedArticles = () => {
  const gradients = [
    'from-golden-500 via-golden-400 to-forest-500',
    'from-forest-500 via-forest-400 to-golden-500',
    'from-golden-400 via-forest-400 to-golden-600',
  ]

  return (
    <section className="relative z-10 bg-gradient-to-b from-white to-charcoal-50 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-2 bg-golden-100 border border-golden-300 rounded-full mb-4"
        >
          <span className="text-golden-700 text-sm font-semibold uppercase tracking-wide">Latest</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-charcoal-900 mb-4"
        >
          Featured Articles
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-charcoal-600 max-w-2xl mx-auto"
        >
          Discover insights that transform your daily routine
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
        {articles.map((article, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group cursor-pointer h-full"
          >
            {/* Card Container */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-charcoal-200 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
              {/* Image with Unsplash */}
              <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-golden-200 to-forest-200 flex-shrink-0">
                <img 
                  src={[
                    'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=600&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1459947727010-6267d2c1232f?w=600&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=300&fit=crop'
                  ][index]}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent"></div>
                {/* Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-bold text-charcoal-800 shadow-lg">
                  Article {index + 1}
                </div>
                {/* Category Badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-golden-500/90 backdrop-blur-sm rounded-full text-xs font-bold text-white shadow-lg">
                  Featured
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                {/* Article Title */}
                <h3 className="text-xl md:text-2xl font-bold text-charcoal-900 mb-3 group-hover:text-golden-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                {/* Description */}
                <p className="text-charcoal-600 mb-6 leading-relaxed text-base flex-1">
                  {article.description}
                </p>
                
                {/* Read More Link */}
                <a href="#" className="inline-flex items-center gap-2 text-golden-600 hover:text-golden-700 font-semibold group mt-auto">
                  Read More
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.article>
  ))}
</div>

      {/* CTA Button */}
      <div className="text-center mt-8 md:mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.a
            href="/blog"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 bg-charcoal-900 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            <span>Explore the Blog</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
      </div>
    </section>
  )
}

export default FeaturedArticles

