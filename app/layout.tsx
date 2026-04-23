import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Providers from '@/components/Providers'
import AdSenseScript from '@/components/AdSenseScript'

const inter = Inter({ subsets: ['latin'] })
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-4Q5DHY7MMS'
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-TNVXVF69'

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
    description: 'Join a journey of growth, habits, and self-awareness that leads to the best version of you.',
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
    'google-adsense-account': 'ca-pub-7003431121839753',
  },
  icons: {
    icon: [
      { url: '/logo-new.png', sizes: 'any' },
      { url: '/logo-new.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo-new.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/logo-new.png', sizes: '180x180', type: 'image/png' },
    ],
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
        <Script id="google-tag-manager" strategy="beforeInteractive">
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
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <AdSenseScript />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

