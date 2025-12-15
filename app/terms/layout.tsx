import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms & Conditions for Daily Better Journey. Read our terms of service and usage policies.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://dailybetterjourney.com/terms',
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

