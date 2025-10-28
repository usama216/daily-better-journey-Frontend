'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useSubscribeToNewsletterMutation } from '@/lib/api/newsletterApi'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [subscribe, { isLoading, isSuccess, isError }] = useSubscribeToNewsletterMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await subscribe({ email }).unwrap()
      setEmail('')
    } catch (error) {
      console.error('Failed to subscribe:', error)
    }
  }

  return (
    <section className="relative z-10 bg-charcoal-900 py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-golden-400 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-forest-400 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-2 bg-golden-500/20 border border-golden-500/30 rounded-full mb-6"
        >
          <span className="text-golden-400 text-sm font-semibold uppercase tracking-wide">Stay Connected</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-white mb-6"
        >
          Join the Journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-white/80 mb-12"
        >
          Get weekly insights, stories, and growth tips straight to your inbox.
        </motion.p>

        {/* Success/Error Messages */}
        {(isSuccess || isError) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 max-w-2xl mx-auto p-4 rounded-xl ${
              isSuccess 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            {isSuccess ? '✓ Successfully subscribed to newsletter!' : '✗ Failed to subscribe. Please try again.'}
          </motion.div>
        )}

        {/* Newsletter Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
        >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-6 py-5 bg-white border-2 border-charcoal-300 rounded-xl focus:outline-none focus:border-golden-500 focus:ring-2 focus:ring-golden-200 transition-all text-charcoal-900 placeholder-charcoal-400"
        />
        
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.05 }}
          whileTap={{ scale: isLoading ? 1 : 0.95 }}
          className="group relative px-10 py-5 bg-gradient-to-r from-golden-500 to-forest-600 text-white rounded-xl font-semibold whitespace-nowrap shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            {isLoading ? 'Subscribing...' : 'Subscribe to Growth Journal'}
            {!isLoading && (
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-golden-600 to-forest-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </motion.button>
        </motion.form>
      </div>
    </section>
  )
}

export default Newsletter

