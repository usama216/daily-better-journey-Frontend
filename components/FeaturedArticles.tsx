'use client'

import { motion } from 'framer-motion'

interface Article {
  title: string
  description: string
}

const articles: Article[] = [
  {
    title: 'Morning Habits that Shape Your Day',
    description: 'Discover the powerful routines that successful people use to start their days with purpose and energy.',
  },
  {
    title: 'Learning Emotional Control',
    description: 'Master your emotions and respond to situations with clarity and wisdom instead of reacting impulsively.',
  },
  {
    title: 'Why Reflection Makes You Stronger',
    description: 'Learn how self-reflection can accelerate your personal growth and help you make better decisions.',
  },
]

const FeaturedArticles = () => {
  return (
    <section>
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-900 mb-12"
      >
        Featured Articles
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group cursor-pointer"
          >
            {/* Image Placeholder */}
            <div className="relative w-full h-64 mb-4 border-2 border-gray-200 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              {/* Diagonal lines */}
              <svg
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id={`diagonalHatching-${index}`} width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="10" stroke="#cbd5e0" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#diagonalHatching-${index})`} />
              </svg>
            </div>

            {/* Article Title */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
              {article.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-600">
              {article.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default FeaturedArticles

