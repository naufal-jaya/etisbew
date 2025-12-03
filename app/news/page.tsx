import { client } from '@/sanity/lib/client';
import { allPostsQuery } from '@/sanity/lib/queries';
import NewsCard from '@/components/news/NewsCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';

export const revalidate = 60;

export default async function NewsPage() {
  const fetchedPosts = await client.fetch(allPostsQuery);

  // Placeholder data for when Sanity is empty
  const placeholderPosts = [
    {
      _id: '1',
      title: 'IEEE SB IPB Wins Regional Award',
      slug: { current: 'ieee-sb-ipb-wins-regional-award' },
      publishedAt: new Date().toISOString(),
      excerpt: 'Our student branch has been recognized for outstanding performance in the region, taking home the Gold award for best activities.',
      categories: [{ title: 'Achievement', slug: { current: 'achievement' } }],
      coverImage: null 
    },
    {
      _id: '2',
      title: 'Workshop on AI and Machine Learning',
      slug: { current: 'workshop-ai-ml' },
      publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      excerpt: 'Join us for an intensive workshop covering the basics of Neural Networks and Deep Learning with industry experts.',
      categories: [{ title: 'Event', slug: { current: 'event' } }],
      coverImage: null
    },
    {
      _id: '3',
      title: 'Tech Talk: The Future of IoT',
      slug: { current: 'tech-talk-iot' },
      publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      excerpt: 'Exploring how Internet of Things is reshaping smart cities and agriculture in Indonesia.',
      categories: [{ title: 'Tech Talk', slug: { current: 'tech-talk' } }],
      coverImage: null
    },
    {
      _id: '4',
      title: 'Open Recruitment 2025',
      slug: { current: 'open-recruitment-2025' },
      publishedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      excerpt: 'We are looking for passionate students to join our team. Check out the available divisions and apply now!',
      categories: [{ title: 'Recruitment', slug: { current: 'recruitment' } }],
      coverImage: null
    }
  ];

  const posts = fetchedPosts.length > 0 ? fetchedPosts : placeholderPosts;
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar variant="light" />
      
      {/* Header */}
      <section className="pt-32 pb-12 bg-deep-navy relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest News & Updates
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Stay informed about our latest events, achievements, and technological insights from the IEEE SB IPB community.
          </p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-500 rounded-full" />
              Featured Story
            </h2>
            <NewsCard post={featuredPost} featured={true} />
          </div>
        )}

        {/* Recent Posts Grid */}
        <div>
          <h2 className="text-2xl font-bold text-navy-900 mb-8 flex items-center gap-2">
            <span className="w-2 h-8 bg-cyan-500 rounded-full" />
            Recent Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post: any) => (
              <NewsCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
