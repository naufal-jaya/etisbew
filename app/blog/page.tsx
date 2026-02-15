import { client } from '@/sanity/lib/client';
import { allPostsQuery } from '@/sanity/lib/queries';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Blog | IEEE Student Branch IPB',
  description: 'Read the latest articles, insights, and news from IEEE Student Branch IPB',
};

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  coverImage: any;
  author: {
    name: string;
    image: any;
  };
  categories: Array<{
    title: string;
    slug: { current: string };
  }>;
}

async function getPosts(): Promise<Post[]> {
  const posts = await client.fetch(allPostsQuery);
  return posts;
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-700 to-navy-500 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our <span className="text-accent-cyan">Blog</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Insights, stories, and updates from the IEEE IPB community
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {posts.map((post) => (
              <article
                key={post._id}
                className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Cover Image */}
                {post.coverImage && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={urlFor(post.coverImage).width(600).height(400).url()}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Categories */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.map((category) => (
                        <span
                          key={category.slug.current}
                          className="text-xs bg-accent-cyan/10 text-accent-cyan px-3 py-1 rounded-full"
                        >
                          {category.title}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-xl font-bold text-navy-700 mb-3 line-clamp-2 group-hover:text-accent-cyan transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    {post.author && (
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>{post.author.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Read More Link */}
                  <Link href={`/blog/${post.slug.current}`}>
                    <Button variant="ghost" className="w-full group">
                      Read More
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                No blog posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
