'use client'

import { useState } from 'react'
import { subscribeToNewsletter } from '@/lib/newsletterClient'
import { MdOutlineLock } from 'react-icons/md'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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
    <section
      id="newsletter"
      className="relative z-10 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 py-32 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-golden-400 rounded-full filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-forest-400 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
          What If One Email Changed Your Day?
        </h2>

        <p className="text-xl text-white/80 mb-12">
          Subscribe for short punches of insight that wake you up, shift your thinking, and spark
          real movement.
        </p>

        {(isSuccess || errorMessage) && (
          <div
            className={`mb-8 max-w-2xl mx-auto p-4 rounded-xl ${
              isSuccess
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            {isSuccess ? '✓ Successfully subscribed to newsletter!' : `✗ ${errorMessage}`}
          </div>
        )}

        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-6 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl focus:outline-none focus:border-golden-400 focus:ring-2 focus:ring-golden-200 transition-all text-white placeholder-white/60"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative px-10 py-5 bg-gradient-to-r from-golden-500 via-golden-600 to-forest-600 text-white rounded-xl font-bold whitespace-nowrap shadow-2xl hover:shadow-golden-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/60">
              <MdOutlineLock className="w-4 h-4" />
              <p>Join 500+ readers. No spam, unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
