import { client } from "@/sanity/lib/client";
import { allDivisionsQuery, latestPostsQuery } from "@/sanity/lib/queries";
import Hero from "@/components/home/Hero";
import HomeAbout from "@/components/home/HomeAbout";
import HomeDivisions from "@/components/home/HomeDivisions";
import Journey from "@/components/home/Potential";
import HomeStats from "@/components/home/HomeStats";
import HomeNews from "@/components/home/HomeNews";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import Empowering from "@/components/home/FutureLeader";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const divisions = await client.fetch(allDivisionsQuery);
  const posts = await client.fetch(latestPostsQuery, { limit: 5 });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Empowering />
      <HomeDivisions divisions={divisions} />
      <Journey />
      <HomeStats />
      <HomeNews posts={posts} />
      <Footer />
    </main>
  );
}
