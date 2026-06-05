import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Providers from '@/components/Providers'
import AdSenseScript from '@/components/AdSenseScript'
import RootJsonLd from '@/components/RootJsonLd'
import { getSiteUrl } from '@/lib/site'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-7003431121839753'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-TNVXVF69'

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

export const viewport: Viewport = {
  themeColor: '#15803d',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'Daily Better Journey - Become Better Every Single Day',
    template: '%s | Daily Better Journey',
  },
  applicationName: 'Daily Better Journey',
  description:
    'Join a journey of growth, habits, and self-awareness that leads to the best version of you. Weekly insights, stories, and growth tips.',
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
  alternates: {
    canonical: '/',
  },
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
  openGraph: {
    title: 'Daily Better Journey - Become Better Every Single Day',
    description:
      'Join a journey of growth, habits, and self-awareness that leads to the best version of you.',
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Daily Better Journey',
    images: [
      {
        url: '/logo-new.png',
        width: 1200,
        height: 630,
        alt: 'Daily Better Journey Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Better Journey - Become Better Every Single Day',
    description:
      'Join a journey of growth, habits, and self-awareness that leads to the best version of you.',
    creator: '@dailybetterjourney',
    images: ['/logo-new.png'],
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
    'google-adsense-account': ADSENSE_CLIENT,
  },
  icons: {
    icon: [
      { url: '/logo-new.png', sizes: 'any' },
      { url: '/logo-new.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo-new.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/logo-new.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/logo-new.png',
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
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <RootJsonLd />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <AdSenseScript />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
