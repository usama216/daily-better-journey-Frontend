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
    <section>
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-900 mb-4"
      >
        Join the Journey
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-gray-600 mb-8 text-lg"
      >
        Get weekly insights, stories, and growth tips straight to your inbox.
      </motion.p>

      {(isSuccess || isError) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-lg ${
            isSuccess 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {isSuccess ? '✓ Successfully subscribed to newsletter!' : '✗ Failed to subscribe. Please try again.'}
        </motion.div>
      )}

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 max-w-2xl"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-200 transition-all"
        />
        
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className="bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold whitespace-nowrap shadow-md hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Subscribing...' : 'Subscribe to Growth Journal'}
        </motion.button>
      </motion.form>
    </section>
  )
}

export default Newsletter

