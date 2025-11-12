'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Comment {
  id: string
  post_id: string
  author_name: string
  author_email: string
  comment_text: string
  created_at: string
  status: 'pending' | 'approved' | 'spam'
}

interface CommentSectionProps {
  postId: string | number
  postSlug: string
}

export default function CommentSection({ postId, postSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
  })

  const fetchComments = async () => {
    try {
      setIsLoading(true)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/comments/${postId}`)
      if (response.ok) {
        const data = await response.json()
        // Backend already filters approved comments
        setComments(data || [])
      }
    } catch (err) {
      console.error('Failed to fetch comments:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Load comments on mount
  useEffect(() => {
    fetchComments()
  }, [postId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.comment.trim()) {
      setError('All fields are required')
      setIsSubmitting(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      setIsSubmitting(false)
      return
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: postId,
          author_name: formData.name,
          author_email: formData.email,
          comment_text: formData.comment,
        }),
      })

      if (response.ok) {
        setShowSuccess(true)
        setFormData({ name: '', email: '', comment: '' })
        
        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000)
        
        // Refresh comments (in case auto-approved)
        fetchComments()
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to submit comment')
      }
    } catch (err) {
      setError('Failed to submit comment. Please try again.')
      console.error('Comment submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="mt-16 mb-10">
      {/* Comments Display */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-charcoal-900 mb-6">
          Comments ({comments.length})
        </h2>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-4 border-golden-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-charcoal-600">Loading comments...</p>
          </div>
        ) : comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-charcoal-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-golden-400 to-golden-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {comment.author_name.charAt(0).toUpperCase()}
                  </div>
                  
                  {/* Comment Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-charcoal-900">
                        {comment.author_name}
                      </h3>
                      <span className="text-sm text-charcoal-500">
                        {new Date(comment.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-charcoal-700 leading-relaxed whitespace-pre-wrap">
                      {comment.comment_text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <p className="text-charcoal-600 text-lg">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>

      {/* Comment Form */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-charcoal-200 p-8">
        <h3 className="text-2xl font-bold text-charcoal-900 mb-2">
          Leave a Comment
        </h3>
        <p className="text-charcoal-600 mb-6">
          Your email address will not be published. Share your thoughts below!
        </p>

        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
          >
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-800 font-medium">
              Thank you! Your comment has been submitted and will appear after approval.
            </p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
          >
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p className="text-red-800 font-medium">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-charcoal-900 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-charcoal-200 rounded-lg focus:border-golden-500 focus:ring-2 focus:ring-golden-200 outline-none transition-all"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-charcoal-900 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-charcoal-200 rounded-lg focus:border-golden-500 focus:ring-2 focus:ring-golden-200 outline-none transition-all"
                placeholder="your@email.com"
              />
              <p className="mt-1 text-xs text-charcoal-500">
                Your email will not be published or shared
              </p>
            </div>
          </div>

          {/* Comment Field */}
          <div>
            <label htmlFor="comment" className="block text-sm font-semibold text-charcoal-900 mb-2">
              Comment <span className="text-red-500">*</span>
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border-2 border-charcoal-200 rounded-lg focus:border-golden-500 focus:ring-2 focus:ring-golden-200 outline-none transition-all resize-vertical"
              placeholder="Share your thoughts..."
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-golden-500 to-golden-600 text-white font-semibold rounded-lg hover:from-golden-600 hover:to-golden-700 focus:ring-4 focus:ring-golden-200 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Post Comment'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

