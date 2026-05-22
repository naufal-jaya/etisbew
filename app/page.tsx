import { sanityFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import Hero from "@/components/home/Hero";
import HomeDivisions from "@/components/home/__archive/HomeDivisions";
import Potential from "@/components/home/Potential";
import Impact from "@/components/home/Impact";
import NewsInsight from "@/components/home/NewsInsight";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Empowering from "@/components/home/FutureLeader";

import {
  allDivisionsQuery,
  latestPostsQuery,
  impactQuery,
  impactPartnersQuery,
  allPostsQuery,
} from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const divisions = await sanityFetch<any[]>(allDivisionsQuery);
  const posts = await sanityFetch<any[]>(allPostsQuery);
  const featuredPost = posts.find((p: any) => p.featured);
  const remainingPosts = posts.filter((p: any) => !p.featured);
  const impacts = await sanityFetch<any[]>(impactQuery);
  const partnersData = await sanityFetch<any[]>(impactPartnersQuery);
  const partner = (partnersData || []).map((p: any, i: number) => ({
    id: i + 1,
    src: p.logo ? urlFor(p.logo).url() : "",
    alt: p.name,
  }));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Empowering />
      <HomeDivisions divisions={divisions} />
      <Potential />
      <Impact impact={impacts} partner={partner} />
      <NewsInsight posts={posts} />
      <Footer />
    </main>
  );
}
