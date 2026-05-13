import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { fetchPostsByCategorySlug, fetchCategories } from '@/lib/api/serverApi'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { absoluteUrl, getSiteUrl } from '@/lib/site'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 120

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { category } = await fetchPostsByCategorySlug(slug)

  if (!category) {
    return {
      title: 'Category Not Found | Daily Better Journey',
      robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    }
  }

  const description =
    category.description || `Explore articles in the ${category.name} category on Daily Better Journey`

  return {
    title: `${category.name} - Blog Category | Daily Better Journey`,
    description,
    keywords: `personal growth, self improvement, ${String(category.name).toLowerCase()}, daily habits, emotional intelligence, mindfulness`,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    alternates: {
      canonical: `/blog/category/${slug}`,
    },
    openGraph: {
      title: `${category.name} - Daily Better Journey`,
      description,
      type: 'website',
      url: `/blog/category/${slug}`,
      siteName: 'Daily Better Journey',
      locale: 'en_US',
      images: [{ url: '/logo-new.png', width: 1200, height: 630, alt: `${category.name} | Daily Better Journey` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} - Daily Better Journey`,
      description,
      images: ['/logo-new.png'],
    },
  }
}

export async function generateStaticParams() {
  try {
    const categories = await fetchCategories()
    return categories.map((category: any) => ({
      slug: category.slug,
    }))
  } catch {
    return []
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const { category, posts } = await fetchPostsByCategorySlug(slug)

  if (!category) {
    notFound()
  }

  const site = getSiteUrl()
  const publishedPosts = posts.filter((p: any) => p.status === 'published')
  const categoryUrl = absoluteUrl(`/blog/category/${slug}`)

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site}/blog` },
      { '@type': 'ListItem', position: 3, name: category.name, item: categoryUrl },
    ],
  }

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${category.name} articles`,
    description: category.description || `Articles in ${category.name}`,
    numberOfItems: publishedPosts.length,
    itemListElement: publishedPosts.slice(0, 30).map((p: any, i: number) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      url: absoluteUrl(`/blog/${p.slug}`),
    })),
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-charcoal-50">
      <JsonLd data={[breadcrumb, itemList]} />
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-charcoal-900">{category.name}</h1>
          {category.description && <p className="text-charcoal-600 mt-2">{category.description}</p>}
        </div>

        {publishedPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-charcoal-600 text-lg mb-4">No posts yet in this category.</p>
            <Link href="/blog" className="text-golden-700 hover:text-golden-800 font-semibold underline">
              Browse all articles
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {publishedPosts.map((post: any) => (
              <article
                key={post.id}
                className="bg-white border-2 border-charcoal-100 rounded-2xl overflow-hidden hover:border-golden-200 hover:shadow-xl transition-all group h-full flex flex-col"
              >
                <Link href={`/blog/${post.slug}`} className="h-48 bg-charcoal-100 flex-shrink-0 block">
                  {post.featured_image ? (
                    <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
                  ) : null}
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-bold text-charcoal-900 mb-2 group-hover:text-golden-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-charcoal-600 line-clamp-3 mb-4">
                    {(post.excerpt || '').replace(/<[^>]*>/g, '')}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-auto inline-flex items-center gap-2 text-golden-600 hover:text-golden-700 font-semibold"
                  >
                    Read More
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
