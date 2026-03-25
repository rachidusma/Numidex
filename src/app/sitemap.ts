import { MetadataRoute } from 'next'
import prisma from '../lib/prisma'
import { i18n } from '../i18n-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.numidex.com'

  // Fetch all products and categories to generate dynamic routes
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      select: {
        id: true,
        updatedAt: true,
      }
    }),
    prisma.category.findMany({
      select: {
        id: true,
        updatedAt: true,
      }
    })
  ])

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
      const path = `/products/${product.id}`
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: product.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })

    // Dynamic category routes
    categories.forEach((category) => {
      const path = `/products?category=${category.id}`
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: category.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    })
  })

  // Root URL entry
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  })

  return sitemapEntries
}


