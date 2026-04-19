"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, User } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  post: any;
  href: string;
}

const FeaturedCard = ({ post, href }: NewsCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative bg-white overflow-hidden border border-slate-100 shadow-[0_0_5px_rgba(0,0,0,0.08)] hover:shadow-lg transition-all duration-300 rounded-[40px] grid md:grid-cols-2"
  >
    <div className="relative overflow-hidden aspect-[16/9] md:h-full">
      {post.coverImage ? (
        <Image
          src={urlFor(post.coverImage).width(800).height(450).url()}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
          No Image
        </div>
      )}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-l from-navy-900/60 to-transparent" />
    </div>

    <div className="flex flex-col p-8 md:p-12 justify-center">
      {post.categories?.length > 0 && (
        <span className="text-navy-500 mb-3 font-medium">
          {post.categories[0].title}
        </span>
      )}

      <h3 className="font-bold text-navy-900 mb-3 leading-tight text-3xl md:text-4xl">
        {post.title}
      </h3>

      <div className="flex items-center gap-2 mb-3 text-sm text-slate-500">
        <User className="text-navy-500 w-4 h-4" />
        <span className="text-navy-500 font-medium">{post.author?.name}</span>
        <time dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString("en-UK", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </time>
      </div>

      <p className="text-slate-600 line-clamp-3 text-lg">{post.excerpt}</p>

      <div className="mt-auto pt-6">
        <Button
          variant="ghost"
          className="p-0 h-auto text-navy-500 font-semibold group/btn"
          asChild
        >
          <Link
            href={href}
            className="flex items-center hover:text-navy-800 transition-colors"
          >
            Read more
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  </motion.div>
);

export const NormalCard = ({ post, href }: NewsCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative bg-white overflow-hidden border border-slate-100 shadow-[0_0_5px_rgba(0,0,0,0.08)] hover:shadow-lg transition-all duration-300 rounded-[40px] flex flex-col h-full"
  >
    <div className="relative overflow-hidden aspect-video">
      {post.coverImage ? (
        <Image
          src={urlFor(post.coverImage).width(800).height(450).url()}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
          No Image
        </div>
      )}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-navy-900/60 to-transparent" />
    </div>

    <div className="flex flex-col p-8 pt-4 flex-grow">
      {post.categories?.length > 0 && (
        <span className="text-navy-500 mb-3 font-medium">
          {post.categories[0].title}
        </span>
      )}

      <Link href={href}>
        <h3 className="font-bold text-navy-900 mb-3 leading-tight text-xl group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
      </Link>

      <div className="flex items-center gap-2 mb-3 text-sm text-slate-500">
        <User className="text-navy-500 w-4 h-4" />
        <span className="text-navy-500 font-medium">{post.author?.name}</span>
        <time dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString("en-UK", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </time>
      </div>

      <p className="text-slate-600 line-clamp-3 text-base">{post.excerpt}</p>
    </div>

    <Link href={href} className="absolute inset-0" aria-label={post.title} />
  </motion.div>
);

const NewsCard = ({ post }: { post: any }) => {
  const href = `/news/${post.slug.current}`;

  if (post.featured) {
    return <FeaturedCard post={post} href={href} />;
  }

  return <NormalCard post={post} href={href} />;
};

export default NewsCard;
