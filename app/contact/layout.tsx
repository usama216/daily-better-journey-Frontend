import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Daily Better Journey | Get in Touch',
  description: 'Get in touch with Daily Better Journey. Share your story, pitch an idea, or explore a partnership. We\'d love to hear from you.',
  keywords: 'contact, get in touch, collaboration, partnership, Daily Better Journey',
  openGraph: {
    title: 'Contact Us - Daily Better Journey',
    description: 'Get in touch with Daily Better Journey. Share your story, pitch an idea, or explore a partnership.',
    type: 'website',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

