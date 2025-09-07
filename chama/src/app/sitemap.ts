import { getAllForSitemap } from "@/services/postServices";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://chamanozap.net';
  const currentDate = new Date();

  const posts = await getAllForSitemap();
  console.log(posts);
  // Rotas fixas
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categorias`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ferramentas`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // URLs de posts
  const postRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: new Date(post.modified || post.date),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Ferramentas manuais (adicione conforme novas forem criadas)
  const tools = [
    {
      slug: 'ferramentas/criar-post-twitter-card',
    },
    {
      slug: 'gerar-link-do-whatsapp-converse-facilmente',
    },
  ];

  const toolRoutes: MetadataRoute.Sitemap = tools.map(tool => ({
    url: `${baseUrl}/${tool.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes, ...toolRoutes];
}
