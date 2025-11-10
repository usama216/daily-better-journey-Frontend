/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://dailybetterjourney.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/admin', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*'],
      },
      {
        userAgent: 'Mediapartners-Google', // AdSense crawler
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://dailybetterjourney.com/sitemap.xml',
    ],
  },
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // Custom priority for different pages
    let priority = 0.7
    let changefreq = 'daily'

    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (path.startsWith('/blog')) {
      priority = 0.9
      changefreq = 'weekly'
    } else if (path.startsWith('/journey')) {
      priority = 0.8
      changefreq = 'weekly'
    } else if (path.startsWith('/contact')) {
      priority = 0.6
      changefreq = 'monthly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
}

