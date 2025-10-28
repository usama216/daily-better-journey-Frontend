import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Daily Better Journey | Self-Improvement Articles',
  description: 'Explore our blog on habits, discipline, mindset, emotional intelligence, productivity, and personal growth. Learn practical tips for becoming better every day.',
  keywords: 'self improvement blog, personal growth, habits, discipline, emotional intelligence, productivity, mindset articles',
  openGraph: {
    title: 'Blog - Daily Better Journey',
    description: 'Explore self-improvement articles on habits, mindset, emotional intelligence, and more.',
    type: 'website',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

