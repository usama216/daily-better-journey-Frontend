'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function JourneyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-charcoal-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-golden-50 via-white to-forest-50 py-24 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-golden-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-forest-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 bg-golden-100 border border-golden-300 rounded-full mb-6"
            >
              <span className="text-golden-700 text-sm font-semibold uppercase tracking-wide">Our Story</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-charcoal-900 mb-6"
            >
              The Journey to a Better You Starts Here
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed"
            >
              Every person is on a journey, not of competition, but of progress.
            </motion.p>
          </header>
        </div>
      </section>
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="prose prose-lg max-w-none mb-16"
        >
          <p className="text-charcoal-700 leading-relaxed mb-6 text-lg">
            Daily Better Journey was created to remind you that growth isn't an overnight event. It's a daily practice, made of small choices, quiet reflections, and steady habits.
          </p>
          <p className="text-charcoal-700 leading-relaxed mb-12 text-lg">
            This platform exists to share stories, methods, and mindsets that help you evolve, one step at a time.
          </p>
        </motion.div>

        {/* What You'll Find */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-charcoal-900 mb-8">What You'll Find Here:</h2>
          <ul className="space-y-6">
            {[
              'Science-backed self-improvement tips',
              'Practical habit-building methods',
              'Personal reflections on discipline and emotional intelligence',
              'Guided journaling exercises for awareness and focus'
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-3 h-3 bg-golden-500 rounded-full mt-3"></div>
                <p className="text-charcoal-700 text-lg">{item}</p>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* Founder's Note */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="bg-white p-8 rounded-2xl shadow-xl border-2 border-charcoal-100 mb-12"
        >
          <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Founder's Note:</h2>
          <blockquote className="text-charcoal-700 italic leading-relaxed mb-4 border-l-4 border-golden-500 pl-4 text-lg">
            "I started this blog to share what I've learned about growth, not from grand achievements, but from small, consistent changes. If even one article helps you move closer to your best self, then this journey is worth it."
          </blockquote>
          <p className="text-charcoal-900 font-bold">— R. Khan</p>
        </motion.section>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <motion.a
            href="/blog"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-charcoal-900 to-charcoal-800 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
            aria-label="Start reading articles on our blog"
          >
            <span className="relative z-10">Start Reading</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-golden-600 to-forest-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </motion.a>
        </motion.div>
      </article>

      <Footer />
    </main>
  )
}
