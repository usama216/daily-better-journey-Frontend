'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'

interface AdminAuthGuardProps {
  children: React.ReactNode
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Don't check on login page
    if (pathname === '/admin/login') {
      setIsChecking(false)
      return
    }

    // Check authentication for admin routes
    if (pathname?.startsWith('/admin')) {
      if (!isAuthenticated()) {
        router.push('/admin/login')
        return
      }
    }

    setIsChecking(false)
  }, [pathname, router])

  // Show loading while checking
  if (isChecking) {
    return (
      <div className="min-h-screen bg-charcoal-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-charcoal-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-forest-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-charcoal-600 font-medium">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

