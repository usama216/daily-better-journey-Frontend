'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useGetNewsletterSubscribersQuery, useDeleteNewsletterSubscriberMutation } from '@/lib/api/newsletterApi'
import { MdOutlineEmail, MdAccessTime, MdDelete, MdArrowBack, MdLogout, MdCheckCircle, MdCancel } from 'react-icons/md'
import { FaEnvelope } from 'react-icons/fa'
import { logout, getUser } from '@/lib/auth'
import { usePopup } from '@/hooks/usePopup'
import { getErrorMessage } from '@/lib/utils/errorHandler'

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default function AdminNewsletterPage() {
  const [activeFilter, setActiveFilter] = useState<string>('')
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null)
  
  const { data, isLoading, error, refetch } = useGetNewsletterSubscribersQuery({ 
    is_active: activeFilter || undefined 
  })
  const [deleteSubscriber] = useDeleteNewsletterSubscriberMutation()
  const { showError, showConfirm, PopupComponent } = usePopup()

  useEffect(() => {
    const user = getUser()
    if (user) {
      setCurrentUser(user)
    }
  }, [])

  const handleLogout = () => {
    showConfirm(
      'Confirm Logout',
      'Are you sure you want to logout?',
      () => logout(),
      { type: 'warning', confirmText: 'Logout', cancelText: 'Cancel' }
    )
  }

  const handleDelete = async (id: string, email: string) => {
    showConfirm(
      'Delete Newsletter Subscriber',
      `Are you sure you want to delete ${email}? This action cannot be undone.`,
      async () => {
        try {
          await deleteSubscriber(id).unwrap()
          refetch()
        } catch (error) {
          console.error('Failed to delete:', error)
          const errorMessage = getErrorMessage(error, 'Failed to delete subscriber. Please try again.')
          showError('Delete Failed', errorMessage)
        }
      },
      { type: 'danger', confirmText: 'Delete', cancelText: 'Cancel', autoCloseOnSuccess: true }
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-white rounded w-1/4"></div>
            <div className="h-64 bg-white rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    console.error('Newsletter Subscribers API Error:', error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-charcoal-50 to-charcoal-100">
        <header className="bg-white shadow-sm border-b border-charcoal-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="p-2 hover:bg-charcoal-100 rounded-lg transition-colors"
                title="Back to Dashboard"
              >
                <MdArrowBack className="w-6 h-6 text-charcoal-600" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-charcoal-900">Newsletter Subscribers</h1>
              </div>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
            <p className="text-red-800 font-semibold mb-2">Error loading newsletter subscribers</p>
            <p className="text-red-700 text-sm mb-2">
              Possible causes:
            </p>
            <ul className="text-red-700 text-sm list-disc list-inside mb-4 space-y-1">
              <li>Database table <code className="bg-red-100 px-1 rounded">newsletter_subscribers</code> doesn't exist yet</li>
              <li>Backend hasn't been rebuilt with new endpoints</li>
              <li>API connection issue</li>
            </ul>
            <p className="text-red-600 text-xs mb-4">
              Error: {error && 'status' in error ? `${error.status}` : 'Unknown error'}
              {error && 'data' in error && error.data && typeof error.data === 'object' 
                ? ` - ${JSON.stringify(error.data)}` 
                : ''}
            </p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  const subscribers = data?.data || []
  const total = data?.pagination?.total || subscribers.length

  // Count subscribers by status
  const statusCounts = {
    active: subscribers.filter((s) => s.is_active).length,
    inactive: subscribers.filter((s) => !s.is_active).length,
  }

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-charcoal-50 to-charcoal-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-charcoal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="p-2 hover:bg-charcoal-100 rounded-lg transition-colors"
                title="Back to Dashboard"
              >
                <MdArrowBack className="w-6 h-6 text-charcoal-600" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-charcoal-900">Newsletter Subscribers</h1>
                <p className="text-sm text-charcoal-600 mt-1">
                  {currentUser ? `Welcome, ${currentUser.name}` : 'Manage newsletter email subscriptions'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-700 rounded-lg font-semibold transition-colors"
              >
                <MdLogout className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-md border border-charcoal-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal-600">Total Subscribers</p>
                <p className="text-3xl font-bold text-charcoal-900 mt-2">{total}</p>
              </div>
              <FaEnvelope className="text-4xl text-blue-500 opacity-20" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-md border border-charcoal-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal-600">Active</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{statusCounts.active}</p>
              </div>
              <MdCheckCircle className="text-4xl text-green-500 opacity-20" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-md border border-charcoal-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal-600">Inactive</p>
                <p className="text-3xl font-bold text-gray-600 mt-2">{statusCounts.inactive}</p>
              </div>
              <MdCancel className="text-4xl text-gray-500 opacity-20" />
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md border border-charcoal-200 p-6 mb-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <label className="font-semibold text-charcoal-900">Filter by Status:</label>
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="px-4 py-2 border-2 border-charcoal-200 rounded-lg focus:outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-200 transition-colors"
              >
                <option value="">All ({total})</option>
                <option value="true">Active ({statusCounts.active})</option>
                <option value="false">Inactive ({statusCounts.inactive})</option>
              </select>
            </div>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-700 rounded-lg font-semibold transition-colors"
            >
              Refresh
            </button>
          </div>
        </motion.div>

        {/* Subscribers List */}
        <div className="space-y-4">
          {subscribers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-sm border border-charcoal-200 p-12 text-center"
            >
              <MdOutlineEmail className="w-16 h-16 text-charcoal-300 mx-auto mb-4" />
              <p className="text-charcoal-600 text-lg font-semibold">No newsletter subscribers found</p>
              <p className="text-charcoal-500 mt-2">New subscriptions will appear here</p>
            </motion.div>
          ) : (
            subscribers.map((subscriber, index) => (
              <motion.div
                key={subscriber.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md border border-charcoal-200 p-6 hover:shadow-lg transition-all hover:border-forest-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Subscriber Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <MdOutlineEmail className="w-5 h-5 text-charcoal-600" />
                          <a
                            href={`mailto:${subscriber.email}`}
                            className="text-xl font-bold text-charcoal-900 hover:text-golden-600 transition-colors"
                          >
                            {subscriber.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-charcoal-500">
                          <div className="flex items-center gap-1">
                            <MdAccessTime className="w-4 h-4" />
                            <span>Subscribed: {formatDate(subscriber.subscribed_at)}</span>
                          </div>
                          {subscriber.unsubscribed_at && (
                            <div className="flex items-center gap-1">
                              <MdCancel className="w-4 h-4" />
                              <span>Unsubscribed: {formatDate(subscriber.unsubscribed_at)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          subscriber.is_active
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : 'bg-gray-100 text-gray-800 border-gray-200'
                        }`}
                      >
                        {subscriber.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row lg:flex-col gap-2 lg:min-w-[150px]">
                    <a
                      href={`mailto:${subscriber.email}`}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-700 hover:to-forest-800 text-white rounded-lg transition-all font-semibold shadow-sm hover:shadow-md"
                    >
                      <MdOutlineEmail className="w-4 h-4" />
                      Email
                    </a>
                    <button
                      onClick={() => handleDelete(subscriber.id, subscriber.email)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors font-semibold"
                    >
                      <MdDelete className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
    <PopupComponent />
    </>
  )
}

