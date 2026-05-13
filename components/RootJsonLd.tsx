import JsonLd from '@/components/JsonLd'
import { absoluteUrl, getSiteUrl } from '@/lib/site'

export default function RootJsonLd() {
  const site = getSiteUrl()
  const logo = absoluteUrl('/logo-new.png')

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Daily Better Journey',
    url: site,
    logo,
    sameAs: [
      'https://twitter.com/dailybetterjourney',
      'https://www.instagram.com/dailybetterjourney',
      'https://www.linkedin.com/company/dailybetterjourney',
      'https://www.youtube.com/@dailybetterjourney',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@dailybetterjourney.com',
      contactType: 'Customer Service',
      availableLanguage: ['English'],
    },
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Daily Better Journey',
    url: site,
    description:
      'Personal growth, habits, mindset, and self-improvement — practical guidance for becoming better every day.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${site}/blog?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  const organizationWithId = { ...organization, '@id': `${site}#organization` }

  return <JsonLd data={[organizationWithId, website]} />
}
