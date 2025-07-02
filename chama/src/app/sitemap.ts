import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://chamanozap.net'
  
  // URLs estáticas principais
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/categorias`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  try {
    // Buscar posts do WordPress via API
    const response = await fetch(`${process.env.WORDPRESS_API_URL || 'https://api.chamanozap.net'}/wp-json/wp/v2/posts?per_page=100&_embed`)
    const posts = await response.json()

    const postUrls = posts.map((post: any) => ({
      url: `${baseUrl}/${post.slug}`,
      lastModified: new Date(post.modified),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    return [...staticPages, ...postUrls]
  } catch (error) {
    console.error('Erro ao gerar sitemap:', error)
    return staticPages
  }
} 