import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/public/"],
        disallow: ["/wp-admin/", "/wp-login.php"],
      },
    ],
    sitemap: "https://chamanozap.net/sitemap.xml",
  };
}
