'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaExclamationTriangle, FaTimes, FaSpinner } from 'react-icons/fa'

export interface ConfirmPopupProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void | Promise<void>
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'danger' | 'warning' | 'info'
  autoCloseOnSuccess?: boolean
}

const ConfirmPopup = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning',
  autoCloseOnSuccess = true
}: ConfirmPopupProps) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setIsLoading(false) // Reset loading state when popup opens
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await Promise.resolve(onConfirm())
      if (autoCloseOnSuccess) {
        onClose()
      }
    } catch (error) {
      // Don't close on error, let the error handler show error popup
      console.error('Confirm action error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getIconColor = () => {
    switch (type) {
      case 'danger':
        return 'text-red-600'
      case 'warning':
        return 'text-golden-600'
      case 'info':
        return 'text-blue-600'
    }
  }

  const getButtonColor = () => {
    switch (type) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700'
      case 'warning':
        return 'bg-golden-600 hover:bg-golden-700'
      case 'info':
        return 'bg-blue-600 hover:bg-blue-700'
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
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
            <div className="relative bg-white rounded-xl shadow-2xl border-2 border-charcoal-200 max-w-md w-full">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 mt-1 ${getIconColor()}`}>
                    <FaExclamationTriangle className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-charcoal-900 mb-2">{title}</h3>
                    <p className="text-charcoal-700 leading-relaxed">{message}</p>
                  </div>
                  {!isLoading && (
                    <button
                      onClick={onClose}
                      className="flex-shrink-0 text-charcoal-400 hover:text-charcoal-600 transition-colors"
                      aria-label="Close"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  )}
                </div>
                {isLoading && (
                  <div className="mt-4 flex items-center gap-2 text-charcoal-600">
                    <FaSpinner className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Processing...</span>
                  </div>
                )}
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="px-6 py-2 bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-700 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {cancelText}
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={isLoading}
                    className={`px-6 py-2 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 ${getButtonColor()} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoading && <FaSpinner className="w-4 h-4 animate-spin" />}
                    {confirmText}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ConfirmPopup

