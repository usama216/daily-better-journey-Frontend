'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { logout, getUser } from '@/lib/auth'
import { MdLogout, MdOutlineEmail, MdAccessTime, MdDelete, MdCheckCircle, MdArchive, MdVisibility, MdCancel } from 'react-icons/md'
import { 
  FaFileAlt, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaEyeSlash,
  FaImage,
  FaTag,
  FaFolder,
  FaChartLine,
  FaSave,
  FaEnvelope,
  FaCheckCircle,
  FaArchive
} from 'react-icons/fa'
import { useGetPostsQuery, useDeletePostMutation, useUpdatePostStatusMutation, useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from '@/lib/api/blogApi'
import { useGetContactsQuery, useUpdateContactStatusMutation, useDeleteContactMutation } from '@/lib/api/contactApi'
import { useGetNewsletterSubscribersQuery, useDeleteNewsletterSubscriberMutation } from '@/lib/api/newsletterApi'
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

function CategoriesTab({ 
  categories, 
  isLoading, 
  onCreateCategory, 
  onUpdateCategory, 
  onDeleteCategory 
}: { 
  categories: any[]
  isLoading: boolean
  onCreateCategory: (data: { name: string; slug?: string; description?: string }) => Promise<void>
  onUpdateCategory: (id: string, data: { name?: string; slug?: string; description?: string }) => Promise<void>
  onDeleteCategory: (id: string) => Promise<void>
}) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', description: '' })
  const [editForm, setEditForm] = useState({ name: '', slug: '', description: '' })

  const handleStartEdit = (cat: any) => {
    setEditingId(cat.id)
    setEditForm({ name: cat.name, slug: cat.slug, description: cat.description || '' })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditForm({ name: '', slug: '', description: '' })
  }

  const handleSaveEdit = async (id: string) => {
    await onUpdateCategory(id, editForm)
    handleCancelEdit()
  }

  const handleCreate = async () => {
    if (!newCategory.name.trim()) return
    await onCreateCategory(newCategory)
    setNewCategory({ name: '', slug: '', description: '' })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-charcoal-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-golden-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-charcoal-600 font-medium">Loading categories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Add New Category */}
      <div className="bg-charcoal-50 rounded-lg p-4 border border-charcoal-200">
        <h3 className="text-lg font-semibold text-charcoal-900 mb-4">Add New Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">Name *</label>
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) => {
                const name = e.target.value
                setNewCategory({
                  name,
                  slug: newCategory.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                  description: newCategory.description
                })
              }}
              placeholder="Category name"
              className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">Slug</label>
            <input
              type="text"
              value={newCategory.slug}
              onChange={(e) => setNewCategory(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="url-slug"
              className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">Description</label>
            <input
              type="text"
              value={newCategory.description}
              onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Optional description"
              className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500"
            />
          </div>
        </div>
        <button
          onClick={handleCreate}
          disabled={!newCategory.name.trim()}
          className="mt-4 px-6 py-2 bg-forest-600 text-white rounded-lg font-semibold hover:bg-forest-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaPlus className="inline mr-2" />
          Create Category
        </button>
      </div>

      {/* Categories List */}
      {categories.length === 0 ? (
        <div className="text-center py-12">
          <FaFolder className="text-6xl text-charcoal-300 mx-auto mb-4" />
          <p className="text-charcoal-600 text-lg mb-4">No categories yet</p>
          <p className="text-sm text-charcoal-500">Create your first category above</p>
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((category: any) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-4 border border-charcoal-200 rounded-lg hover:shadow-md transition-all"
            >
              {editingId === category.id ? (
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={editForm.slug}
                      onChange={(e) => setEditForm(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                      placeholder="Slug"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editForm.description}
                      onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                      placeholder="Description"
                    />
                    <button
                      onClick={() => handleSaveEdit(category.id)}
                      className="p-2 text-forest-600 hover:bg-forest-50 rounded transition-colors"
                      title="Save"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="p-2 text-charcoal-600 hover:bg-charcoal-100 rounded transition-colors"
                      title="Cancel"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <h3 className="font-semibold text-charcoal-900">{category.name}</h3>
                    <p className="text-sm text-charcoal-600 mt-1">
                      Slug: <code className="bg-charcoal-100 px-2 py-0.5 rounded">/{category.slug}</code>
                    </p>
                    {category.description && (
                      <p className="text-sm text-charcoal-500 mt-1">{category.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStartEdit(category)}
                      className="p-2 text-forest-600 hover:bg-forest-50 rounded transition-colors"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDeleteCategory(category.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ContactsTab({ showError, showConfirm }: { showError: any, showConfirm: any }) {
  const [statusFilter, setStatusFilter] = useState<string>('')
  const { data, isLoading, error, refetch } = useGetContactsQuery({ status: statusFilter || undefined })
  const [updateStatus] = useUpdateContactStatusMutation()
  const [deleteContact] = useDeleteContactMutation()

  const handleDelete = async (id: string) => {
    showConfirm(
      'Delete Contact Submission',
      'Are you sure you want to delete this contact submission? This action cannot be undone.',
      async () => {
        try {
          await deleteContact(id).unwrap()
          refetch()
        } catch (error) {
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
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-charcoal-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-golden-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-charcoal-600 font-medium">Loading contacts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <p className="text-red-800 font-semibold mb-2">Error loading contact submissions</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
          Try Again
        </button>
      </div>
    )
  }

  const contacts = data?.data || []
  const total = data?.pagination?.total || contacts.length

  const statusCounts = {
    new: contacts.filter((c) => c.status === 'new').length,
    read: contacts.filter((c) => c.status === 'read').length,
    replied: contacts.filter((c) => c.status === 'replied').length,
    archived: contacts.filter((c) => c.status === 'archived').length,
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-charcoal-50 rounded-lg p-4 border border-charcoal-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-charcoal-600">Total</p>
              <p className="text-2xl font-bold text-charcoal-900 mt-1">{total}</p>
            </div>
            <FaEnvelope className="text-3xl text-blue-500 opacity-20" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-50 rounded-lg p-4 border border-blue-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">New</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{statusCounts.new}</p>
            </div>
            <FaEnvelope className="text-3xl text-blue-500 opacity-20" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-green-50 rounded-lg p-4 border border-green-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Replied</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{statusCounts.replied}</p>
            </div>
            <FaCheckCircle className="text-3xl text-green-500 opacity-20" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-yellow-50 rounded-lg p-4 border border-yellow-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600">Archived</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{statusCounts.archived}</p>
            </div>
            <FaArchive className="text-3xl text-yellow-500 opacity-20" />
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-charcoal-50 rounded-lg p-4 border border-charcoal-200">
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
      </div>

      {/* Contacts List */}
      <div className="space-y-4">
        {contacts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-charcoal-200 p-12 text-center">
            <MdOutlineEmail className="w-16 h-16 text-charcoal-300 mx-auto mb-4" />
            <p className="text-charcoal-600 text-lg font-semibold">No contact submissions found</p>
          </div>
        ) : (
          contacts.map((contact: any, index: number) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-md border border-charcoal-200 p-6 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4 pb-3 border-b border-charcoal-200">
                    <div>
                      <h3 className="text-lg font-bold text-charcoal-900 mb-1">{contact.name}</h3>
                      <div className="flex items-center gap-2 text-charcoal-600 mb-2">
                        <MdOutlineEmail className="w-4 h-4" />
                        <a href={`mailto:${contact.email}`} className="hover:text-golden-600 transition-colors">
                          {contact.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-charcoal-500 text-sm">
                        <MdAccessTime className="w-4 h-4" />
                        <span>{formatDate(contact.created_at)}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeColor(contact.status)}`}>
                      {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                    </span>
                  </div>
                  {contact.message && (
                    <div className="bg-charcoal-50 rounded-lg p-4 border border-charcoal-200">
                      <p className="text-charcoal-800 whitespace-pre-wrap">{contact.message}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-row lg:flex-col gap-2 lg:min-w-[200px]">
                  <a
                    href={`mailto:${contact.email}?subject=Re: Contact Form Submission`}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-700 hover:to-forest-800 text-white rounded-lg transition-all font-semibold text-sm"
                  >
                    <MdOutlineEmail className="w-4 h-4" />
                    Reply
                  </a>
                  {contact.status !== 'read' && (
                    <button
                      onClick={() => handleStatusUpdate(contact.id, 'read')}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-semibold text-sm"
                    >
                      <MdVisibility className="w-4 h-4" />
                      Mark Read
                    </button>
                  )}
                  {contact.status !== 'replied' && (
                    <button
                      onClick={() => handleStatusUpdate(contact.id, 'replied')}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition-colors font-semibold text-sm"
                    >
                      <MdCheckCircle className="w-4 h-4" />
                      Mark Replied
                    </button>
                  )}
                  {contact.status !== 'archived' && (
                    <button
                      onClick={() => handleStatusUpdate(contact.id, 'archived')}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg transition-colors font-semibold text-sm"
                    >
                      <MdArchive className="w-4 h-4" />
                      Archive
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors font-semibold text-sm"
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
  )
}

function NewsletterTab({ showError, showConfirm }: { showError: any, showConfirm: any }) {
  const [activeFilter, setActiveFilter] = useState<string>('')
  const { data, isLoading, error, refetch } = useGetNewsletterSubscribersQuery({ 
    is_active: activeFilter || undefined 
  })
  const [deleteSubscriber] = useDeleteNewsletterSubscriberMutation()

  const handleDelete = async (id: string, email: string) => {
    showConfirm(
      'Delete Newsletter Subscriber',
      `Are you sure you want to delete ${email}? This action cannot be undone.`,
      async () => {
        try {
          await deleteSubscriber(id).unwrap()
          refetch()
        } catch (error) {
          const errorMessage = getErrorMessage(error, 'Failed to delete subscriber. Please try again.')
          showError('Delete Failed', errorMessage)
        }
      },
      { type: 'danger', confirmText: 'Delete', cancelText: 'Cancel', autoCloseOnSuccess: true }
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-charcoal-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-golden-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-charcoal-600 font-medium">Loading newsletter subscribers...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <p className="text-red-800 font-semibold mb-2">Error loading newsletter subscribers</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
          Try Again
        </button>
      </div>
    )
  }

  const subscribers = data?.data || []
  const total = data?.pagination?.total || subscribers.length

  const statusCounts = {
    active: subscribers.filter((s) => s.is_active).length,
    inactive: subscribers.filter((s) => !s.is_active).length,
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-charcoal-50 rounded-lg p-4 border border-charcoal-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-charcoal-600">Total Subscribers</p>
              <p className="text-2xl font-bold text-charcoal-900 mt-1">{total}</p>
            </div>
            <FaEnvelope className="text-3xl text-blue-500 opacity-20" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-50 rounded-lg p-4 border border-green-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Active</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{statusCounts.active}</p>
            </div>
            <MdCheckCircle className="text-3xl text-green-500 opacity-20" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-gray-600 mt-1">{statusCounts.inactive}</p>
            </div>
            <MdCancel className="text-3xl text-gray-500 opacity-20" />
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-charcoal-50 rounded-lg p-4 border border-charcoal-200">
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
      </div>

      {/* Subscribers List */}
      <div className="space-y-4">
        {subscribers.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-charcoal-200 p-12 text-center">
            <MdOutlineEmail className="w-16 h-16 text-charcoal-300 mx-auto mb-4" />
            <p className="text-charcoal-600 text-lg font-semibold">No newsletter subscribers found</p>
          </div>
        ) : (
          subscribers.map((subscriber: any, index: number) => (
            <motion.div
              key={subscriber.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-md border border-charcoal-200 p-6 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <MdOutlineEmail className="w-5 h-5 text-charcoal-600" />
                        <a
                          href={`mailto:${subscriber.email}`}
                          className="text-lg font-bold text-charcoal-900 hover:text-golden-600 transition-colors"
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
                <div className="flex flex-row lg:flex-col gap-2 lg:min-w-[150px]">
                  <a
                    href={`mailto:${subscriber.email}`}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-700 hover:to-forest-800 text-white rounded-lg transition-all font-semibold text-sm"
                  >
                    <MdOutlineEmail className="w-4 h-4" />
                    Email
                  </a>
                  <button
                    onClick={() => handleDelete(subscriber.id, subscriber.email)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors font-semibold text-sm"
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
  )
}

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'posts' | 'categories' | 'contacts' | 'newsletter'>('posts')
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null)
  
  const { data: postsData, isLoading, refetch } = useGetPostsQuery({})
  const [deletePost] = useDeletePostMutation()
  const [updateStatus] = useUpdatePostStatusMutation()
  const { showError, showConfirm, PopupComponent } = usePopup()

  const { data: categoriesData, isLoading: isLoadingCategories, refetch: refetchCategories } = useGetCategoriesQuery(undefined)
  const [createCategory] = useCreateCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()

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

  const posts = postsData?.data || []
  const categories = (categoriesData?.data || categoriesData || [])

  // Function to strip HTML tags and get plain text preview
  const getTextPreview = (html: string, maxLength: number = 150) => {
    if (!html) return ''
    // Remove HTML tags
    const text = html.replace(/<[^>]*>/g, '')
    // Decode HTML entities
    const decoded = text.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    // Trim and limit length
    const trimmed = decoded.trim()
    return trimmed.length > maxLength ? trimmed.substring(0, maxLength) + '...' : trimmed
  }

  const handleDelete = async (id: string) => {
    showConfirm(
      'Delete Post',
      'Are you sure you want to delete this post? This action cannot be undone.',
      async () => {
        try {
          await deletePost(id).unwrap()
          refetch()
          // Popup will auto-close on success
        } catch (error) {
          const errorMessage = getErrorMessage(error, 'Failed to delete post. Please try again.')
          showError('Delete Failed', errorMessage)
          // Popup stays open on error so user can see the error message
        }
      },
      { type: 'danger', confirmText: 'Delete', cancelText: 'Cancel', autoCloseOnSuccess: true }
    )
  }

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    try {
      await updateStatus({
        id,
        status: currentStatus === 'published' ? 'draft' : 'published'
      }).unwrap()
      refetch()
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to update post status. Please try again.')
      showError('Update Failed', errorMessage)
    }
  }

  const stats = {
    totalPosts: posts.length,
    publishedPosts: posts.filter((p: any) => p.status === 'published').length,
    draftPosts: posts.filter((p: any) => p.status === 'draft').length,
    totalViews: posts.reduce((sum: number, p: any) => sum + (p.views || 0), 0)
  }

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-charcoal-50 to-charcoal-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-charcoal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-charcoal-900">Admin Dashboard</h1>
              <p className="text-sm text-charcoal-600 mt-1">
                {currentUser ? `Welcome, ${currentUser.name}` : 'Manage your blog content'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-700 rounded-lg font-semibold transition-colors"
              >
                <MdLogout className="w-4 h-4" />
                Logout
              </button>
              <Link
                href="/admin/post/new"
                className="flex items-center gap-2 bg-gradient-to-r from-forest-600 to-forest-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <FaPlus /> New Post
              </Link>
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
                <p className="text-sm text-charcoal-600">Total Posts</p>
                <p className="text-3xl font-bold text-charcoal-900 mt-2">{stats.totalPosts}</p>
              </div>
              <FaFileAlt className="text-4xl text-forest-500 opacity-20" />
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
                <p className="text-sm text-charcoal-600">Published</p>
                <p className="text-3xl font-bold text-forest-600 mt-2">{stats.publishedPosts}</p>
              </div>
              <FaEye className="text-4xl text-forest-500 opacity-20" />
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
                <p className="text-sm text-charcoal-600">Drafts</p>
                <p className="text-3xl font-bold text-golden-600 mt-2">{stats.draftPosts}</p>
              </div>
              <FaEyeSlash className="text-4xl text-golden-500 opacity-20" />
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
                <p className="text-sm text-charcoal-600">Total Views</p>
                <p className="text-3xl font-bold text-charcoal-900 mt-2">{stats.totalViews}</p>
              </div>
              <FaChartLine className="text-4xl text-forest-500 opacity-20" />
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md border border-charcoal-200 mb-6">
          <div className="border-b border-charcoal-200">
            <nav className="flex -mb-px">
              <button
                key="posts"
                onClick={() => setActiveTab('posts')}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'posts'
                    ? 'border-forest-600 text-forest-600'
                    : 'border-transparent text-charcoal-600 hover:text-charcoal-900 hover:border-charcoal-300'
                }`}
              >
                <FaFileAlt />
                Posts
              </button>
              <button
                key="categories"
                onClick={() => setActiveTab('categories')}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'categories'
                    ? 'border-forest-600 text-forest-600'
                    : 'border-transparent text-charcoal-600 hover:text-charcoal-900 hover:border-charcoal-300'
                }`}
              >
                <FaFolder />
                Categories
              </button>
              <button
                key="contacts"
                onClick={() => setActiveTab('contacts')}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'contacts'
                    ? 'border-forest-600 text-forest-600'
                    : 'border-transparent text-charcoal-600 hover:text-charcoal-900 hover:border-charcoal-300'
                }`}
              >
                <FaEnvelope />
                Contacts
              </button>
              <button
                key="newsletter"
                onClick={() => setActiveTab('newsletter')}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'newsletter'
                    ? 'border-forest-600 text-forest-600'
                    : 'border-transparent text-charcoal-600 hover:text-charcoal-900 hover:border-charcoal-300'
                }`}
              >
                <FaEnvelope />
                Newsletter
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'posts' && (
              <div>
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative w-12 h-12">
                        <div className="absolute inset-0 border-4 border-charcoal-200 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-golden-600 rounded-full border-t-transparent animate-spin"></div>
                      </div>
                      <p className="text-charcoal-600 font-medium">Loading posts...</p>
                    </div>
                  </div>
                ) : posts.length === 0 ? (
                  <div className="text-center py-12">
                    <FaFileAlt className="text-6xl text-charcoal-300 mx-auto mb-4" />
                    <p className="text-charcoal-600 text-lg mb-4">No posts yet</p>
                    <Link
                      href="/admin/post/new"
                      className="inline-flex items-center gap-2 bg-forest-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest-700 transition-colors"
                    >
                      <FaPlus /> Create Your First Post
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post: any) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-4 border border-charcoal-200 rounded-lg hover:shadow-md transition-all"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-charcoal-900">{post.title}</h3>
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded ${
                                post.status === 'published'
                                  ? 'bg-forest-100 text-forest-700'
                                  : 'bg-golden-100 text-golden-700'
                              }`}
                            >
                              {post.status}
                            </span>
                          </div>
                          <p className="text-sm text-charcoal-600 mt-1 line-clamp-2">
                            {post.excerpt ? getTextPreview(post.excerpt) : getTextPreview(post.content || '')}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-charcoal-500">
                            <span>Views: {post.views || 0}</span>
                            <span>•</span>
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleStatus(post.id, post.status)}
                            className="p-2 text-charcoal-600 hover:bg-charcoal-100 rounded transition-colors"
                            title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                          >
                            {post.status === 'published' ? <FaEyeSlash /> : <FaEye />}
                          </button>
                          <Link
                            href={`/admin/post/edit/${post.id}`}
                            className="p-2 text-forest-600 hover:bg-forest-50 rounded transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'categories' && (
              <CategoriesTab 
                categories={categories}
                isLoading={isLoadingCategories}
                onCreateCategory={async (data) => {
                  try {
                    await createCategory(data).unwrap()
                    refetchCategories()
                  } catch (error) {
                    const errorMessage = getErrorMessage(error, 'Failed to create category. Please try again.')
                    showError('Create Failed', errorMessage)
                  }
                }}
                onUpdateCategory={async (id, data) => {
                  try {
                    await updateCategory({ id, ...data }).unwrap()
                    refetchCategories()
                  } catch (error) {
                    const errorMessage = getErrorMessage(error, 'Failed to update category. Please try again.')
                    showError('Update Failed', errorMessage)
                  }
                }}
                onDeleteCategory={async (id) => {
                  showConfirm(
                    'Delete Category',
                    'Are you sure you want to delete this category? This action cannot be undone.',
                    async () => {
                      try {
                        await deleteCategory(id).unwrap()
                        refetchCategories()
                      } catch (error) {
                        const errorMessage = getErrorMessage(error, 'Failed to delete category. Please try again.')
                        showError('Delete Failed', errorMessage)
                      }
                    },
                    { type: 'danger', confirmText: 'Delete', cancelText: 'Cancel', autoCloseOnSuccess: true }
                  )
                }}
              />
            )}

            {activeTab === 'contacts' && (
              <ContactsTab showError={showError} showConfirm={showConfirm} />
            )}

            {activeTab === 'newsletter' && (
              <NewsletterTab showError={showError} showConfirm={showConfirm} />
            )}
          </div>
        </div>
      </div>
    </div>
    <PopupComponent />
    </>
  )
}
