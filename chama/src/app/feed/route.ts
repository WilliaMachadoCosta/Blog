import { getAllForSitemap } from "@/services/postServices";

export async function GET() {
  const baseUrl = "https://chamanozap.net";
  const posts = await getAllForSitemap();

  // se quiser limitar só os últimos 20, descomente:
  // const latestPosts = posts.slice(0, 20);

  const items = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/${post.slug}</link>
      <guid>${baseUrl}/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt || ""}]]></description>
    </item>
  `).join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Chama no ZAP</title>
      <link>${baseUrl}</link>
      <description>Feed RSS do Chama no ZAP</description>
      <language>pt-BR</language>
      ${items}
    </channel>
  </rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
