import { sanityFetch } from "@/sanity/lib/fetch";
import { allPostsQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import NewsCard from "@/components/news/NewsCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FilteredRecentPosts from "@/components/news/FilteredRecentPosts";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NewsPage() {
  const fetchedPosts = await sanityFetch<any[]>(allPostsQuery);

  const placeholderPosts = [
    {
      _id: "1",
      title: "IEEE SB IPB Wins Regional Award",
      slug: { current: "ieee-sb-ipb-wins-regional-award" },
      publishedAt: new Date().toISOString(),
      excerpt:
        "Our student branch has been recognized for outstanding performance in the region, taking home the Gold award for best activities.",
      categories: [{ title: "Achievement", slug: { current: "achievement" } }],
      coverImage: null,
    },
    {
      _id: "2",
      title: "Workshop on AI and Machine Learning",
      slug: { current: "workshop-ai-ml" },
      publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      excerpt:
        "Join us for an intensive workshop covering the basics of Neural Networks and Deep Learning with industry experts.",
      categories: [{ title: "Event", slug: { current: "event" } }],
      coverImage: null,
    },
    {
      _id: "3",
      title: "Tech Talk: The Future of IoT",
      slug: { current: "tech-talk-iot" },
      publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      excerpt:
        "Exploring how Internet of Things is reshaping smart cities and agriculture in Indonesia.",
      categories: [{ title: "Tech Talk", slug: { current: "tech-talk" } }],
      coverImage: null,
    },
    {
      _id: "4",
      title: "Open Recruitment 2025",
      slug: { current: "open-recruitment-2025" },
      publishedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      excerpt:
        "We are looking for passionate students to join our team. Check out the available divisions and apply now!",
      categories: [{ title: "Recruitment", slug: { current: "recruitment" } }],
      coverImage: null,
    },
  ];

  const posts = fetchedPosts.length > 0 ? fetchedPosts : placeholderPosts;
  const featuredPost = posts.find((p: any) => p.featured);
  const remainingPosts = posts.filter((p: any) => !p.featured);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="pt-32 pb-12 snap-start bg-deep-navy relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-10" />
        <Image
          src="/images/news/header.png"
          alt="dakara coffee"
          fill
          className="object-cover"
          quality={100}
        />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest News & Insights
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Stay informed about the latest events and technological insights
            from our community
          </p>
        </div>
      </section>

      <section className="py-10 container mx-auto  px-4">
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 flex items-center gap-2">
              <div className="w-6 h-8 bg-[radial-gradient(circle_at_100%_120%,#4594E8,transparent_60%),radial-gradient(circle_at_0%_0%,#728EB0,transparent_60%)] bg-navy-800" />
              Featured Post
            </h2>
            <NewsCard post={featuredPost} />
          </div>
        )}

        <hr className="border-slate-300 my-8" />

        <FilteredRecentPosts posts={remainingPosts} />
      </section>

      <Footer />
    </main>
  );
}
