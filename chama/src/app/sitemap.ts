import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  return [
    {
      url: `https://chamanozap.net/sobre`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1
    }
  ]
}