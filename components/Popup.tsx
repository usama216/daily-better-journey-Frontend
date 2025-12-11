'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa'

export type PopupType = 'success' | 'error' | 'warning' | 'info'

export interface PopupProps {
  isOpen: boolean
  onClose: () => void
  type?: PopupType
  title: string
  message: string
  duration?: number // Auto-close duration in milliseconds (0 = no auto-close)
}

const Popup = ({ isOpen, onClose, type = 'info', title, message, duration = 0 }: PopupProps) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, duration])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="w-6 h-6 text-forest-600" />
      case 'error':
        return <FaTimesCircle className="w-6 h-6 text-red-600" />
      case 'warning':
        return <FaExclamationCircle className="w-6 h-6 text-golden-600" />
      case 'info':
        return <FaInfoCircle className="w-6 h-6 text-blue-600" />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-forest-50 border-forest-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-golden-50 border-golden-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
    }
  }

  const getButtonColor = () => {
    switch (type) {
      case 'success':
        return 'bg-forest-600 hover:bg-forest-700'
      case 'error':
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
            <div className={`relative bg-white rounded-xl shadow-2xl border-2 max-w-md w-full ${getBgColor()}`}>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-charcoal-900 mb-2">{title}</h3>
                    <p className="text-charcoal-700 leading-relaxed">{message}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="flex-shrink-0 text-charcoal-400 hover:text-charcoal-600 transition-colors"
                    aria-label="Close"
                  >
                    <FaTimesCircle className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={onClose}
                    className={`px-6 py-2 text-white rounded-lg font-semibold transition-colors ${getButtonColor()}`}
                  >
                    OK
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

export default Popup

