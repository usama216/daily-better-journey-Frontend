'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useGetContactsQuery, useUpdateContactStatusMutation, useDeleteContactMutation } from '@/lib/api/contactApi'
import { MdOutlineEmail, MdAccessTime, MdDelete, MdCheckCircle, MdArchive, MdVisibility, MdArrowBack, MdLogout } from 'react-icons/md'
import { FaEnvelope, FaEnvelopeOpen, FaCheckCircle, FaArchive } from 'react-icons/fa'
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

export default function AdminContactsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null)
  
  const { data, isLoading, error, refetch } = useGetContactsQuery({ status: statusFilter || undefined })
  const [updateStatus] = useUpdateContactStatusMutation()
  const [deleteContact] = useDeleteContactMutation()
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

  const handleDelete = async (id: string) => {
    showConfirm(
      'Delete Contact Submission',
      'Are you sure you want to delete this contact submission? This action cannot be undone.',
      async () => {
        try {
          await deleteContact(id).unwrap()
          refetch()
        } catch (error) {
          console.error('Failed to delete:', error)
          const errorMessage = getErrorMessage(error, 'Failed to delete contact submission. Please try again.')
          showError('Delete Failed', errorMessage)
        }
      },
      { type: 'danger', confirmText: 'Delete', cancelText: 'Cancel', autoCloseOnSuccess: true }
    )
  }

  const handleStatusUpdate = async (id: string, newStatus: 'new' | 'read' | 'replied' | 'archived') => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap()
      refetch()
    } catch (error) {
      console.error('Failed to update status:', error)
      const errorMessage = getErrorMessage(error, 'Failed to update status. Please try again.')
      showError('Update Failed', errorMessage)
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'read':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'replied':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'archived':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
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
    console.error('Contacts API Error:', error)
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
                <h1 className="text-3xl font-bold text-charcoal-900">Contact Submissions</h1>
              </div>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
            <p className="text-red-800 font-semibold mb-2">Error loading contact submissions</p>
            <p className="text-red-700 text-sm mb-2">
              Possible causes:
            </p>
            <ul className="text-red-700 text-sm list-disc list-inside mb-4 space-y-1">
              <li>Database table <code className="bg-red-100 px-1 rounded">contact_submissions</code> doesn't exist yet</li>
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

  const contacts = data?.data || []
  const total = data?.pagination?.total || contacts.length

  // Count contacts by status
  const statusCounts = {
    new: contacts.filter((c) => c.status === 'new').length,
    read: contacts.filter((c) => c.status === 'read').length,
    replied: contacts.filter((c) => c.status === 'replied').length,
    archived: contacts.filter((c) => c.status === 'archived').length,
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
                <h1 className="text-3xl font-bold text-charcoal-900">Contact Submissions</h1>
                <p className="text-sm text-charcoal-600 mt-1">
                  {currentUser ? `Welcome, ${currentUser.name}` : 'Manage and respond to contact form submissions'}
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-md border border-charcoal-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal-600">Total</p>
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
                <p className="text-sm text-charcoal-600">New</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{statusCounts.new}</p>
              </div>
              <FaEnvelope className="text-4xl text-blue-500 opacity-20" />
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
                <p className="text-sm text-charcoal-600">Replied</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{statusCounts.replied}</p>
              </div>
              <FaCheckCircle className="text-4xl text-green-500 opacity-20" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-md border border-charcoal-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal-600">Archived</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{statusCounts.archived}</p>
              </div>
              <FaArchive className="text-4xl text-yellow-500 opacity-20" />
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
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border-2 border-charcoal-200 rounded-lg focus:outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-200 transition-colors"
                >
                  <option value="">All ({total})</option>
                  <option value="new">New ({statusCounts.new})</option>
                  <option value="read">Read ({statusCounts.read})</option>
                  <option value="replied">Replied ({statusCounts.replied})</option>
                  <option value="archived">Archived ({statusCounts.archived})</option>
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

        {/* Contacts List */}
        <div className="space-y-4">
          {contacts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-sm border border-charcoal-200 p-12 text-center"
            >
              <MdOutlineEmail className="w-16 h-16 text-charcoal-300 mx-auto mb-4" />
              <p className="text-charcoal-600 text-lg font-semibold">No contact submissions found</p>
              <p className="text-charcoal-500 mt-2">New submissions will appear here</p>
            </motion.div>
          ) : (
            contacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md border border-charcoal-200 p-6 hover:shadow-lg transition-all hover:border-forest-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Contact Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-charcoal-900 mb-1">{contact.name}</h3>
                        <div className="flex items-center gap-2 text-charcoal-600 mb-2">
                          <MdOutlineEmail className="w-4 h-4" />
                          <a
                            href={`mailto:${contact.email}`}
                            className="hover:text-golden-600 transition-colors"
                          >
                            {contact.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-charcoal-500 text-sm">
                          <MdAccessTime className="w-4 h-4" />
                          <span>
                            {formatDate(contact.created_at)}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeColor(
                          contact.status
                        )}`}
                      >
                        {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                      </span>
                    </div>

                    {/* What brought you here */}
                    {contact.what_brought_you && (
                      <div className="mt-3">
                        <p className="text-xs font-semibold text-charcoal-600 uppercase tracking-wide mb-1">What brought you here?</p>
                        <p className="text-charcoal-800">{contact.what_brought_you}</p>
                      </div>
                    )}

                    {/* Challenge Description */}
                    {contact.challenge_description && (
                      <div className="mt-3">
                        <p className="text-xs font-semibold text-charcoal-600 uppercase tracking-wide mb-1">Challenge Description</p>
                        <div className="bg-gradient-to-r from-charcoal-50 to-charcoal-100 rounded-lg p-4 border border-charcoal-200">
                          <p className="text-charcoal-800 whitespace-pre-wrap leading-relaxed">{contact.challenge_description}</p>
                        </div>
                      </div>
                    )}

                    {/* Guidance Areas */}
                    {contact.guidance_areas && contact.guidance_areas.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-semibold text-charcoal-600 uppercase tracking-wide mb-2">Guidance Areas</p>
                        <div className="flex flex-wrap gap-2">
                          {contact.guidance_areas.map((area: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-golden-100 text-golden-800 rounded-full text-sm font-medium"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                        {contact.other_guidance_area && (
                          <div className="mt-2">
                            <span className="text-xs font-semibold text-charcoal-600">Other: </span>
                            <span className="text-charcoal-800">{contact.other_guidance_area}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Hope to achieve */}
                    {contact.hope_to_achieve && (
                      <div className="mt-3">
                        <p className="text-xs font-semibold text-charcoal-600 uppercase tracking-wide mb-1">Hope to achieve (30 days)</p>
                        <p className="text-charcoal-800 whitespace-pre-wrap">{contact.hope_to_achieve}</p>
                      </div>
                    )}

                    {/* Anything else */}
                    {contact.anything_else && (
                      <div className="mt-3">
                        <p className="text-xs font-semibold text-charcoal-600 uppercase tracking-wide mb-1">Additional Information</p>
                        <p className="text-charcoal-800 whitespace-pre-wrap">{contact.anything_else}</p>
                      </div>
                    )}

                    {/* Legacy message field (for backward compatibility) */}
                    {contact.message && (
                      <div className="bg-gradient-to-r from-charcoal-50 to-charcoal-100 rounded-lg p-5 mt-4 border border-charcoal-200">
                        <p className="text-xs font-semibold text-charcoal-600 uppercase tracking-wide mb-2">Message</p>
                        <p className="text-charcoal-800 whitespace-pre-wrap leading-relaxed">{contact.message}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row lg:flex-col gap-2 lg:min-w-[200px]">
                    <a
                      href={`mailto:${contact.email}?subject=Re: Contact Form Submission`}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-700 hover:to-forest-800 text-white rounded-lg transition-all font-semibold shadow-sm hover:shadow-md"
                    >
                      <MdOutlineEmail className="w-4 h-4" />
                      Reply
                    </a>
                    {contact.status !== 'read' && (
                      <button
                        onClick={() => handleStatusUpdate(contact.id, 'read')}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-semibold"
                      >
                        <MdVisibility className="w-4 h-4" />
                        Mark Read
                      </button>
                    )}
                    {contact.status !== 'replied' && (
                      <button
                        onClick={() => handleStatusUpdate(contact.id, 'replied')}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition-colors font-semibold"
                      >
                        <MdCheckCircle className="w-4 h-4" />
                        Mark Replied
                      </button>
                    )}
                    {contact.status !== 'archived' && (
                      <button
                        onClick={() => handleStatusUpdate(contact.id, 'archived')}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg transition-colors font-semibold"
                      >
                        <MdArchive className="w-4 h-4" />
                        Archive
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(contact.id)}
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

