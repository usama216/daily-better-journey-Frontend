/** Canonical site origin (no trailing slash). Use NEXT_PUBLIC_SITE_URL in all environments. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'https://dailybetterjourney.com'
  return raw.replace(/\/+$/, '')
}

/**
 * How long Next.js may cache the post slug list / summaries used by the sitemap (ISR).
 * New published posts appear in `/sitemap.xml` after at most this many seconds (plus your host/CDN).
 * Override with `NEXT_PUBLIC_SITEMAP_REVALIDATE_SECONDS` (60–86400). Default 3600 = 1 hour (always within 1 day).
 */
export function getSitemapRevalidateSeconds(): number {
  const raw = process.env.NEXT_PUBLIC_SITEMAP_REVALIDATE_SECONDS
  const parsed = raw ? parseInt(raw, 10) : NaN
  if (Number.isFinite(parsed) && parsed >= 60 && parsed <= 86400) {
    return parsed
  }
  return 3600
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl()
  if (!path || path === '/') return base
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function defaultOgImageUrl(): string {
  return absoluteUrl('/logo-new.png')
}
