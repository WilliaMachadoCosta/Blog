// // app/sitemap.xml/route.ts

// export async function GET() {
//   const baseUrl = 'https://chamanozap.net'

//   const staticPages = [
//     {
//       url: baseUrl,
//       lastModified: new Date(),
//       changeFrequency: 'daily',
//       priority: 1.0,
//     },
//     {
//       url: `${baseUrl}/blog`,
//       lastModified: new Date(),
//       changeFrequency: 'daily',
//       priority: 0.9,
//     },
//     {
//       url: `${baseUrl}/sobre`,
//       lastModified: new Date(),
//       changeFrequency: 'monthly',
//       priority: 0.7,
//     },
//     {
//       url: `${baseUrl}/categorias`,
//       lastModified: new Date(),
//       changeFrequency: 'weekly',
//       priority: 0.8,
//     },
//   ]

//   let posts: any[] = []

//   try {
//     const res = await fetch(`${process.env.WORDPRESS_API_URL || 'https://api.chamanozap.net'}/wp-json/wp/v2/posts?per_page=100&_embed`)
//     posts = await res.json()
//   } catch (e) {
//     console.error('Erro ao buscar posts:', e)
//   }

//   const allUrls = [
//     ...staticPages,
//     ...posts.map((post: any) => ({
//       url: `${baseUrl}/${post.slug}`,
//       lastModified: new Date(post.modified),
//       changeFrequency: 'weekly',
//       priority: 0.6,
//     })),
//   ]

//   const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
//   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//     ${allUrls
//       .map((page) => {
//         return `
//       <url>
//         <loc>${page.url}</loc>
//         <lastmod>${new Date(page.lastModified).toISOString()}</lastmod>
//         <changefreq>${page.changeFrequency}</changefreq>
//         <priority>${page.priority}</priority>
//       </url>`
//       })
//       .join('')}
//   </urlset>`

//   return new Response(sitemap, {
//     status: 200,
//     headers: {
//       'Content-Type': 'application/xml; charset=utf-8',
//       'Cache-Control': 's-maxage=0, stale-while-revalidate=0',
//     },
//   });

// }
