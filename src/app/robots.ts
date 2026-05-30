import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/login"],
        disallow: ["/dashboard", "/users", "/analytics", "/settings"],
      },
    ],
    sitemap: "https://template-youtube.vercel.app/sitemap.xml",
  };
}
