import type { Metadata } from 'next'
import AdminRootClient from '@/components/AdminRootClient'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s | Admin | Daily Better Journey' },
  description: 'Administration area for Daily Better Journey.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <AdminRootClient>{children}</AdminRootClient>
    </Providers>
  )
}
