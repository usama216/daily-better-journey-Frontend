'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useSubscribeToNewsletterMutation } from '@/lib/api/newsletterApi'
import { FaTimes, FaCheckCircle, FaEnvelope } from 'react-icons/fa'
import { MdOutlineLock } from 'react-icons/md'

export interface NewsletterSubscriptionPopupProps {
  isOpen: boolean
  onClose: () => void
}

const NewsletterSubscriptionPopup = ({ isOpen, onClose }: NewsletterSubscriptionPopupProps) => {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [subscribe, { isLoading, isSuccess, isError }] = useSubscribeToNewsletterMutation()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Reset form when popup opens
      setEmail('')
      setErrorMessage('')
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Auto-close on success after 2 seconds
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        onClose()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isSuccess, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    try {
      await subscribe({ email }).unwrap()
      setEmail('')
    } catch (error: any) {
      console.error('Failed to subscribe:', error)
      // Extract error message from response
      const message = error?.data?.message || error?.message || 'Failed to subscribe. Please try again.'
      setErrorMessage(message)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 rounded-2xl shadow-2xl border-2 border-golden-500/30 max-w-lg w-full overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-64 h-64 bg-golden-400 rounded-full filter blur-3xl opacity-20"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-forest-400 rounded-full filter blur-3xl opacity-20"></div>
              </div>

              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>

              <div className="relative p-8">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
                  aria-label="Close"
                >
                  <FaTimes className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-golden-500 to-forest-600 rounded-full mb-4"
                  >
                    <FaEnvelope className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-extrabold text-white mb-2">
                    Join the Journey
                  </h2>
                  <p className="text-white/80 text-sm">
                  Subscribe for short punches of insight that wake you up, shift your thinking, and spark real movement. </p>
                </div>

                {/* Success Message */}
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-500/20 border border-green-400/50 rounded-xl flex items-center gap-3"
                  >
                    <FaCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <p className="text-green-100 font-semibold">
                      Successfully subscribed! Welcome to the journey.
                    </p>
                  </motion.div>
                )}

                {/* Error Message */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-500/20 border border-red-400/50 rounded-xl"
                  >
                    <p className="text-red-100 font-semibold">
                      {errorMessage}
                    </p>
                  </motion.div>
                )}

                {/* Form */}
                {!isSuccess && (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        disabled={isLoading}
                        className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl focus:outline-none focus:border-golden-400 focus:ring-2 focus:ring-golden-200 transition-all text-white placeholder-white/60 disabled:opacity-50"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-golden-400/10 to-forest-400/10 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                      className="w-full px-6 py-4 bg-gradient-to-r from-golden-500 via-golden-600 to-forest-600 text-white rounded-xl font-bold shadow-2xl hover:shadow-golden-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
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
                            Subscribe Now
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-golden-400 to-forest-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.button>
                  </motion.form>
                )}

                {/* Trust Message */}
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/60">
                  <MdOutlineLock className="w-4 h-4" />
                  <p>Join 500+ readers. No spam, unsubscribe anytime.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default NewsletterSubscriptionPopup

