import { MetadataRoute } from 'next'
import prisma from '../lib/prisma'
import { i18n } from '../i18n-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.numidex.com'

  // Fetch all products to generate dynamic routes
  const products = await prisma.product.findMany({
    select: {
      id: true,
      updatedAt: true,
    }
  })

  // Define static routes
  const staticRoutes = [
    '',
    '/about',
    '/process',
    '/products',
    '/contact'
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Generate entries for each locale and route
  i18n.locales.forEach((locale) => {
    // Static routes
    staticRoutes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    })

    // Dynamic product routes
    products.forEach((product) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/products/${product.id}`,
        lastModified: product.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })
  })

  // Also add the base url without locale redirecting to default locale
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  })

  return sitemapEntries
}
