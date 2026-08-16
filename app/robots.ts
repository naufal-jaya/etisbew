import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ieee-orm.ipb.ac.id";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
