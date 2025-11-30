'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { format } from 'date-fns';
import { ArrowRight, Calendar, User } from 'lucide-react';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  coverImage: any;
  author: { name: string; image: any };
}

interface HomeNewsProps {
  posts: Post[];
}

const HomeNews = ({ posts }: HomeNewsProps) => {
  // Fallback data for development/preview if no posts exist
  const displayPosts = posts?.length > 0 ? posts : [
    {
      _id: '1',
      title: 'IEEE SB IPB Wins Regional Award',
      slug: { current: '#' },
      publishedAt: new Date().toISOString(),
      excerpt: 'Our student branch has been recognized for outstanding performance in organizing technical workshops and community events.',
      coverImage: null,
      author: { name: 'Admin', image: null }
    },
    {
      _id: '2',
      title: 'Upcoming Workshop: AI & Machine Learning',
      slug: { current: '#' },
      publishedAt: new Date().toISOString(),
      excerpt: 'Join us for a hands-on session exploring the fundamentals of Artificial Intelligence and its applications in modern engineering.',
      coverImage: null,
      author: { name: 'Admin', image: null }
    },
    {
      _id: '3',
      title: 'Tech Talk 2025: Future of Renewable Energy',
      slug: { current: '#' },
      publishedAt: new Date().toISOString(),
      excerpt: 'Industry experts gather to discuss the latest trends and innovations in sustainable energy solutions.',
      coverImage: null,
      author: { name: 'Admin', image: null }
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50 -skew-x-12 translate-x-1/3 z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-accent-blue" />
              <span className="text-accent-blue font-bold tracking-widest uppercase text-xs">
                Latest Updates
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-950">
              News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-cyan">Insights</span>
            </h2>
          </div>
          
          <Link 
            href="/blog" 
            className="hidden md:flex items-center gap-2 text-navy-600 hover:text-accent-cyan transition-colors font-medium group"
          >
            View All News <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group h-full"
            >
              <Link href={post.slug.current !== '#' ? `/blog/${post.slug.current}` : '#'} className="block h-full">
                <article className="h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden bg-navy-50">
                    {post.coverImage ? (
                      <Image
                        src={urlFor(post.coverImage).url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center flex-col gap-3 group-hover:bg-navy-100 transition-colors">
                        <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl">
                           📰
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-navy-700 shadow-sm">
                      News
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{post.author?.name || 'Admin'}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-accent-blue transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center text-accent-blue text-sm font-semibold group-hover:translate-x-2 transition-transform mt-auto">
                      Read Article <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-navy-600 hover:text-accent-cyan transition-colors font-medium"
          >
            View All News <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeNews;