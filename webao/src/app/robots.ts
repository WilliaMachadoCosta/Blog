import { Metadata, MetadataRoute } from "next";
import { userAgent } from "next/server";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/public/"],
        disallow: ["/admin"]

      }
    ],
    sitemap: "https://webao.info/sitemap.xml"
  }
}