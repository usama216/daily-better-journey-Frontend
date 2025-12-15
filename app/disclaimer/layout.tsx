import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for Daily Better Journey. Important information about the use of our website and content.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://dailybetterjourney.com/disclaimer',
  },
}

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

