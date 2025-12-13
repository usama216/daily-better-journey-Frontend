'use client'

import { NextSeo, ArticleJsonLd, BreadcrumbJsonLd } from 'next-seo'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  article?: {
    publishedTime?: string
    modifiedTime?: string
    authors?: string[]
    tags?: string[]
  }
  breadcrumbs?: Array<{
    position: number
    name: string
    item: string
  }>
}

export default function SEO({
  title = 'Daily Better Journey - Become Better Every Single Day',
  description = 'Join a journey of growth, habits, and self-awareness that leads to the best version of you. Weekly insights, stories, and growth tips.',
  canonical,
  ogImage = '/logo-new.png',
  ogType = 'website',
  article,
  breadcrumbs,
}: SEOProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical || siteUrl}
        openGraph={{
          type: ogType,
          locale: 'en_US',
          url: canonical || siteUrl,
          title,
          description,
          siteName: 'Daily Better Journey',
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }}
        twitter={{
          handle: '@dailybetterjourney',
          site: '@dailybetterjourney',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'personal growth, self improvement, habits, mindfulness, self awareness, daily better journey, motivation, productivity, wellness',
          },
          {
            name: 'author',
            content: 'Daily Better Journey',
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0',
          },
          {
            name: 'robots',
            content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
          {
            name: 'googlebot',
            content: 'index, follow',
          },
          {
            name: 'google-adsense-account',
            content: 'ca-pub-7003431121839753',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/logo-new.png',
          },
          {
            rel: 'apple-touch-icon',
            href: '/logo-new.png',
          },
        ]}
      />

      {/* Article Structured Data */}
      {article && ogType === 'article' && (
        <ArticleJsonLd
          type="BlogPosting"
          url={canonical || siteUrl}
          title={title}
          images={[ogImage]}
          datePublished={article.publishedTime || new Date().toISOString()}
          dateModified={article.modifiedTime || new Date().toISOString()}
          authorName={article.authors || ['Daily Better Journey']}
          description={description}
        />
      )}

      {/* Breadcrumb Structured Data */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <BreadcrumbJsonLd
          itemListElements={breadcrumbs.map((crumb) => ({
            position: crumb.position,
            name: crumb.name,
            item: crumb.item,
          }))}
        />
      )}

      {/* Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Daily Better Journey',
            url: siteUrl,
            logo: `${siteUrl}/logo-new.png`,
            sameAs: [
              // Add your social media URLs here
              'https://twitter.com/dailybetterjourney',
              'https://facebook.com/dailybetterjourney',
              'https://instagram.com/dailybetterjourney',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Service',
              availableLanguage: ['English'],
            },
          }),
        }}
      />

      {/* Website Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Daily Better Journey',
            url: siteUrl,
            description: description,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${siteUrl}/blog?search={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
    </>
  )
}

