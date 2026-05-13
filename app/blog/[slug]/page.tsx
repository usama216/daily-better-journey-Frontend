import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { fetchPostBySlug, fetchPosts } from '@/lib/api/serverApi'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CommentSection from '@/components/CommentSection'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | Daily Better Journey',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dailybetterjourney.com'
  const postUrl = `${siteUrl}/blog/${slug}`
  const description = post.meta_description || post.excerpt || post.content?.replace(/<[^>]*>/g, '').substring(0, 160) || 'Read this article on Daily Better Journey'
  const ogImage = post.featured_image || `${siteUrl}/logo-new.png`

  return {
    title: `${post.title} | Daily Better Journey`,
    description,
    keywords: post.meta_keywords || 'personal growth, self improvement, daily habits, emotional intelligence, mindfulness, self awareness',
    authors: [{ name: 'Daily Better Journey' }],
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      locale: 'en_US',
      url: postUrl,
      siteName: 'Daily Better Journey',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [ogImage],
    },
    robots: {
      index: post.status === 'published',
      follow: true,
      googleBot: {
        index: post.status === 'published',
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: postUrl,
    },
  }
}

// Generate static params for better performance (optional, can be removed if you have too many posts)
export async function generateStaticParams() {
  try {
    const posts = await fetchPosts()
    return posts
      .filter((p: any) => p.status === 'published')
      .map((post: any) => ({
        slug: post.slug,
      }))
  } catch (error) {
    return []
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const post = await fetchPostBySlug(slug)

  if (!post || post.status !== 'published') {
    notFound()
  }

  // Fetch all posts for related posts and featured posts
  const allPosts = await fetchPosts()
  const publishedPosts = allPosts.filter((p: any) => p.status === 'published')
  
  const featured = publishedPosts
    .filter((p: any) => p.is_featured && p.slug !== post.slug)
    .slice(0, 5)

  const relatedPosts = post.category_id
    ? publishedPosts
        .filter((p: any) => 
          p.category_id === post.category_id && 
          p.slug !== post.slug
        )
        .slice(0, 3)
    : []

  // Structured Data for Article
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta_description || post.excerpt || post.content?.replace(/<[^>]*>/g, '').substring(0, 160) || '',
    image: post.featured_image || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://dailybetterjourney.com'}/logo-new.png`,
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: {
      '@type': 'Organization',
      name: 'Daily Better Journey',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dailybetterjourney.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Daily Better Journey',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://dailybetterjourney.com'}/logo-new.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://dailybetterjourney.com'}/blog/${slug}`,
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-charcoal-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      <div className="max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-10 md:py-14">
        <div
          className={
            featured.length > 0
              ? 'grid grid-cols-1 lg:grid-cols-[minmax(0,_1fr)_min(100%,_300px)] xl:grid-cols-[minmax(0,_1fr)_min(100%,_340px)] gap-10 lg:gap-12 xl:gap-16'
              : 'max-w-5xl xl:max-w-6xl mx-auto'
          }
        >
          <article className="bg-white rounded-2xl shadow border border-charcoal-200 overflow-hidden min-w-0">
            {post.featured_image ? (
              <div className="w-full h-72 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] bg-charcoal-100">
                <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            ) : null}
            <div className="p-6 sm:p-8 md:p-12 lg:p-14 xl:p-16">
              <h1 className="text-3xl sm:text-4xl md:text-[2.5rem] xl:text-5xl font-extrabold text-charcoal-900 mb-3 leading-tight tracking-tight">
                {post.title}
              </h1>
              <div className="text-sm md:text-base text-charcoal-500 mb-8 md:mb-10">
                {post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}
              </div>
              <div className="prose prose-lg max-w-none prose-headings:text-charcoal-900 prose-p:text-charcoal-800 prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 blog-content [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-24">
                <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
              </div>
            </div>
          </article>

          {featured.length > 0 ? (
            <aside className="lg:sticky lg:top-20 lg:self-start">
              <div className="bg-white rounded-xl shadow border border-charcoal-200 p-5 xl:p-6">
                <h3 className="text-base font-semibold text-charcoal-900 mb-3">Featured Posts</h3>
                <ul className="space-y-3">
                  {featured.map((fp: any) => (
                    <li key={fp.id}>
                      <a href={`/blog/${fp.slug}`} className="group block">
                        <div className="flex gap-3 items-center">
                          {fp.featured_image ? (
                            <img src={fp.featured_image} alt={fp.title} className="w-14 h-14 rounded object-cover border" />
                          ) : (
                            <div className="w-14 h-14 rounded bg-charcoal-100 border" />
                          )}
                          <div>
                            <p className="text-sm font-medium text-charcoal-900 group-hover:text-golden-700 line-clamp-2">{fp.title}</p>
                            <p className="text-xs text-charcoal-500">{fp.created_at ? new Date(fp.created_at).toLocaleDateString() : ''}</p>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          ) : null}
        </div>

        {/* Comment Section */}
        {post && (
          <div className="mt-16 lg:mt-20 max-w-5xl xl:max-w-6xl mx-auto px-0 sm:px-1">
            <CommentSection postId={post.id} postSlug={post.slug} />
          </div>
        )}

        {/* Related Posts from Same Category */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 lg:mt-20 mb-10 md:mb-14">
            <div className="mb-8 md:mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-2">Related Articles</h2>
              <p className="text-charcoal-600 text-lg">More from the same category</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {relatedPosts.map((relatedPost: any) => (
                <a
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-white rounded-xl shadow-md border border-charcoal-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {relatedPost.featured_image ? (
                    <div className="w-full h-48 bg-charcoal-100 overflow-hidden">
                      <img
                        src={relatedPost.featured_image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-golden-200 to-forest-200" />
                  )}
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-charcoal-900 mb-2 group-hover:text-golden-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-charcoal-600 mb-3 line-clamp-2">
                      {relatedPost.excerpt || relatedPost.content?.replace(/<[^>]*>/g, '').substring(0, 100) + '...'}
                    </p>
                    <div className="flex items-center justify-between text-xs text-charcoal-500">
                      <span>
                        {relatedPost.created_at ? new Date(relatedPost.created_at).toLocaleDateString() : ''}
                      </span>
                      <span className="text-golden-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Read More →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>

      <Footer />
    </main>
  )
}


