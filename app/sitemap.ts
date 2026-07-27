import { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";

export const revalidate = 3600;

const sitemapPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
    publishedAt
  }
`;

interface PostSitemapData {
  slug: string;
  publishedAt: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ieee-orm.ipb.ac.id";

  let posts: PostSitemapData[] = [];
  try {
    posts = await sanityFetch<PostSitemapData[]>(sitemapPostsQuery, {}, { revalidate: 3600 });
  } catch (error) {
    console.error("Failed to fetch posts for sitemap:", error);
  }

  // Static routes
  const staticRoutes = ["", "/about", "/blog", "/news"];
  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic routes (blog and news urls)
  const dynamicEntries = posts.flatMap((post) => {
    const lastMod = post.publishedAt ? new Date(post.publishedAt) : new Date();
    return [
      {
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: lastMod,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      },
      {
        url: `${siteUrl}/news/${post.slug}`,
        lastModified: lastMod,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      },
    ];
  });

  return [...staticEntries, ...dynamicEntries];
}
