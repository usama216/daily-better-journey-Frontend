'use client'

import AdminAuthGuard from '@/components/AdminAuthGuard'

export default function AdminRootClient({ children }: { children: React.ReactNode }) {
  return <AdminAuthGuard>{children}</AdminAuthGuard>
}
