'use client'

import { useState, useCallback } from 'react'
import Popup, { PopupType } from '@/components/Popup'
import ConfirmPopup from '@/components/ConfirmPopup'

interface PopupState {
  isOpen: boolean
  type: PopupType
  title: string
  message: string
  duration?: number
}

interface ConfirmPopupState {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void | Promise<void>
  confirmText?: string
  cancelText?: string
  type?: 'danger' | 'warning' | 'info'
  autoCloseOnSuccess?: boolean
}

export const usePopup = () => {
  const [popup, setPopup] = useState<PopupState>({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    duration: 0,
  })

  const [confirmPopup, setConfirmPopup] = useState<ConfirmPopupState>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    type: 'warning',
    autoCloseOnSuccess: true,
  })

  const showPopup = useCallback((type: PopupType, title: string, message: string, duration?: number) => {
    setPopup({
      isOpen: true,
      type,
      title,
      message,
      duration,
    })
  }, [])

  const closePopup = useCallback(() => {
    setPopup((prev) => ({ ...prev, isOpen: false }))
  }, [])

  const showSuccess = useCallback((title: string, message: string, duration?: number) => {
    showPopup('success', title, message, duration)
  }, [showPopup])

  const showError = useCallback((title: string, message: string, duration?: number) => {
    showPopup('error', title, message, duration)
  }, [showPopup])

  const showWarning = useCallback((title: string, message: string, duration?: number) => {
    showPopup('warning', title, message, duration)
  }, [showPopup])

  const showInfo = useCallback((title: string, message: string, duration?: number) => {
    showPopup('info', title, message, duration)
  }, [showPopup])

  const showConfirm = useCallback((
    title: string,
    message: string,
    onConfirm: () => void | Promise<void>,
    options?: {
      confirmText?: string
      cancelText?: string
      type?: 'danger' | 'warning' | 'info'
      autoCloseOnSuccess?: boolean
    }
  ) => {
    setConfirmPopup({
      isOpen: true,
      title,
      message,
      onConfirm,
      confirmText: options?.confirmText || 'Confirm',
      cancelText: options?.cancelText || 'Cancel',
      type: options?.type || 'warning',
      autoCloseOnSuccess: options?.autoCloseOnSuccess !== undefined ? options.autoCloseOnSuccess : true,
    })
  }, [])

  const closeConfirmPopup = useCallback(() => {
    setConfirmPopup((prev) => ({ ...prev, isOpen: false }))
  }, [])

  const PopupComponent = () => (
    <>
      <Popup
        isOpen={popup.isOpen}
        onClose={closePopup}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        duration={popup.duration}
      />
      <ConfirmPopup
        isOpen={confirmPopup.isOpen}
        onClose={closeConfirmPopup}
        onConfirm={confirmPopup.onConfirm}
        title={confirmPopup.title}
        message={confirmPopup.message}
        confirmText={confirmPopup.confirmText}
        cancelText={confirmPopup.cancelText}
        type={confirmPopup.type}
        autoCloseOnSuccess={confirmPopup.autoCloseOnSuccess}
      />
    </>
  )

  return {
    showPopup,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
    closePopup,
    PopupComponent,
  }
}

