'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useSubscribeToNewsletterMutation } from '@/lib/api/newsletterApi'
import { MdOutlineLock } from 'react-icons/md'

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
    <section className="relative z-10 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 py-32 overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-golden-400 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-forest-400 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-golden-300 rounded-full filter blur-3xl opacity-10"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    
        
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

        {/* Newsletter Form - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-6 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl focus:outline-none focus:border-golden-400 focus:ring-2 focus:ring-golden-200 transition-all text-white placeholder-white/60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-golden-400/10 to-forest-400/10 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
              
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
                className="group relative px-10 py-5 bg-gradient-to-r from-golden-500 via-golden-600 to-forest-600 text-white rounded-xl font-bold whitespace-nowrap shadow-2xl hover:shadow-golden-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-golden-400 to-forest-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </motion.form>
            
            {/* Trust Message */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/60">
              <MdOutlineLock className="w-4 h-4" />
              <p>Join 500+ readers. No spam, unsubscribe anytime.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter

