import type { MetadataRoute } from 'next'
import { absoluteUrl, getSiteUrl } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  const site = getSiteUrl()
  return {
    name: 'Daily Better Journey',
    short_name: 'DBJ',
    description:
      'Personal growth, habits, mindset, and self-improvement — practical guidance for becoming better every day.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#15803d',
    lang: 'en',
    icons: [
      {
        src: absoluteUrl('/logo-new.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
