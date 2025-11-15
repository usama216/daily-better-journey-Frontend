import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Daily Better Journey - Become Better Every Single Day',
    template: '%s | Daily Better Journey',
  },
  description: 'Join a journey of growth, habits, and self-awareness that leads to the best version of you. Weekly insights, stories, and growth tips.',
  keywords: [
    'personal growth',
    'self improvement',
    'habits',
    'mindfulness',
    'self awareness',
    'daily better journey',
    'motivation',
    'productivity',
    'wellness',
    'mental health',
    'life coaching',
    'personal development',
  ],
  authors: [{ name: 'Daily Better Journey' }],
  creator: 'Daily Better Journey',
  publisher: 'Daily Better Journey',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dailybetterjourney.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Daily Better Journey - Become Better Every Single Day',
    description: 'Join a journey of growth, habits, and self-awareness that leads to the best version of you.',
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Daily Better Journey',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Daily Better Journey Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Better Journey - Become Better Every Single Day',
    description: 'Join a journey of growth, habits, and self-awareness that leads to the best version of you.',
    creator: '@dailybetterjourney',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'google-adsense-account': 'ca-pub-7003431121839753',
  },
  icons: {
    icon: [
      { url: '/logo.png', sizes: 'any' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Script (plain script to avoid data-nscript attribute) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7003431121839753"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

