import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Daily Better Journey. Learn how we collect, use, protect, and disclose your information.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://dailybetterjourney.com/privacy',
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

