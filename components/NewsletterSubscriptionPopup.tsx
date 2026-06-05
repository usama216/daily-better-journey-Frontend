'use client'

import { useState, useEffect } from 'react'
import { subscribeToNewsletter } from '@/lib/newsletterClient'
import { FaTimes, FaCheckCircle, FaEnvelope } from 'react-icons/fa'
import { MdOutlineLock } from 'react-icons/md'

export interface NewsletterSubscriptionPopupProps {
  isOpen: boolean
  onClose: () => void
}

const NewsletterSubscriptionPopup = ({ isOpen, onClose }: NewsletterSubscriptionPopupProps) => {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setEmail('')
      setErrorMessage('')
      setIsSuccess(false)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (!isSuccess) return
    const timer = window.setTimeout(onClose, 2000)
    return () => window.clearTimeout(timer)
  }, [isSuccess, onClose])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setIsLoading(true)
    try {
      await subscribeToNewsletter(email)
      setEmail('')
      setIsSuccess(true)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to subscribe. Please try again.'
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        aria-hidden
      />

      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-popup-title"
      >
        <div className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 rounded-2xl shadow-2xl border-2 border-golden-500/30 max-w-lg w-full overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-golden-400 rounded-full filter blur-3xl opacity-20" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-forest-400 rounded-full filter blur-3xl opacity-20" />
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:2rem_2rem]" />

          <div className="relative p-8">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-golden-500 to-forest-600 rounded-full mb-4">
                <FaEnvelope className="w-8 h-8 text-white" />
              </div>
              <h2 id="newsletter-popup-title" className="text-3xl font-extrabold text-white mb-2">
                Join the Journey
              </h2>
              <p className="text-white/80 text-sm">
                Subscribe for short punches of insight that wake you up, shift your thinking, and
                spark real movement.
              </p>
            </div>

            {isSuccess ? (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-400/50 rounded-xl flex items-center gap-3">
                <FaCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-green-100 font-semibold">
                  Successfully subscribed! Welcome to the journey.
                </p>
              </div>
            ) : null}

            {errorMessage ? (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-400/50 rounded-xl">
                <p className="text-red-100 font-semibold">{errorMessage}</p>
              </div>
            ) : null}

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-golden-500 via-golden-600 to-forest-600 text-white rounded-xl font-bold shadow-2xl hover:shadow-golden-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe Now'}
                </button>
              </form>
            ) : null}

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/60">
              <MdOutlineLock className="w-4 h-4" />
              <p>Join 500+ readers. No spam, unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewsletterSubscriptionPopup
