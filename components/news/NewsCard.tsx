'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  post: any;
  featured?: boolean;
}

const NewsCard = ({ post, featured = false }: NewsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300",
        featured ? "grid md:grid-cols-2 gap-8 p-0" : "flex flex-col h-full"
      )}
    >
      {/* Image Container */}
      <div className={cn(
        "relative overflow-hidden",
        featured ? "h-full min-h-[300px]" : "aspect-video"
      )}>
        {post.coverImage ? (
          <Image
            src={urlFor(post.coverImage).width(800).height(450).url()}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className={cn(
        "flex flex-col",
        featured ? "p-8 md:p-12 justify-center" : "p-6 flex-grow"
      )}>
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <Calendar className="w-4 h-4 text-blue-500" />
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
          {post.categories && post.categories.length > 0 && (
             <>
               <span className="w-1 h-1 rounded-full bg-slate-300" />
               <span className="text-blue-600 font-medium">{post.categories[0].title}</span>
             </>
          )}
        </div>

        <Link href={`/news/${post.slug.current}`} className="group-hover:text-blue-600 transition-colors">
          <h3 className={cn(
            "font-bold text-navy-900 mb-3 leading-tight",
            featured ? "text-3xl md:text-4xl" : "text-xl"
          )}>
            {post.title}
          </h3>
        </Link>

        <p className={cn(
          "text-slate-600 mb-6 line-clamp-3",
          featured ? "text-lg" : "text-base"
        )}>
          {post.excerpt}
        </p>

        <div className={cn("mt-auto", featured ? "pt-4" : "")}>
          <Button variant="link" className="p-0 h-auto text-blue-600 font-semibold group/btn">
            <Link href={`/news/${post.slug.current}`} className="flex items-center">
              Read Full Article
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
