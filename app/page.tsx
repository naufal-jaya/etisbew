import { client } from '@/sanity/lib/client';
import { allDivisionsQuery, latestPostsQuery } from '@/sanity/lib/queries';
import Hero from '@/components/sections/Hero';
import HomeAbout from '@/components/sections/HomeAbout';
import HomeDivisions from '@/components/sections/HomeDivisions';
import Services from '@/components/sections/Services';
import HomeStats from '@/components/sections/HomeStats';
import HomeNews from '@/components/sections/HomeNews';
import HomeCTA from '@/components/sections/HomeCTA';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const divisions = await client.fetch(allDivisionsQuery);
  const posts = await client.fetch(latestPostsQuery, { limit: 5 });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <HomeAbout />
      <HomeDivisions divisions={divisions} />
      <Services />
      <HomeStats />
      <HomeNews posts={posts} />
      <HomeCTA />
      <Footer />
    </main>
  );
}
