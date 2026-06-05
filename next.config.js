/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.dailybetterjourney.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  compress: true,
  generateEtags: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  async headers() {
    const cacheOneYear = 'public, max-age=31536000, immutable'

    return [
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: cacheOneYear }],
      },
      {
        source: '/logo-new.png',
        headers: [{ key: 'Cache-Control', value: cacheOneYear }],
      },
      {
        source: '/logo-2.png',
        headers: [{ key: 'Cache-Control', value: cacheOneYear }],
      },
      {
        source: '/ads.txt',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },

  async redirects() {
    return []
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  swcMinify: true,
  poweredByHeader: false,

  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons'],
  },
}

module.exports = nextConfig
