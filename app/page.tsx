import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Hero from "@/components/home/Hero";
import HomeAbout from "@/components/home/HomeAbout";
import HomeDivisions from "@/components/home/HomeDivisions";
import Journey from "@/components/home/Potential";
import Impact from "@/components/home/Impact";
import HomeNews from "@/components/home/HomeNews";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import Empowering from "@/components/home/FutureLeader";

import {
  allDivisionsQuery,
  latestPostsQuery,
  impactQuery,
  impactPartnersQuery,
} from "@/sanity/lib/queries";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const divisions = await client.fetch(allDivisionsQuery);
  const posts = await client.fetch(latestPostsQuery, { limit: 5 });
  const impacts = await client.fetch(impactQuery);
  const partnersData = await client.fetch(impactPartnersQuery);
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
      <Journey />
      <Impact impact={impacts} partner={partner} />
      <HomeNews posts={posts} />
      <Footer />
    </main>
  );
}
