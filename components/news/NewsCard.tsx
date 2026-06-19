"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, User } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";

interface NewsCardProps {
  post: any;
  href: string;
}

const FeaturedCard = ({ post, href }: NewsCardProps) => (
  <motion.div
    viewport={{ once: true }}
    className="group relative w-full md:w-2/3 bg-white overflow-hidden border border-slate-100 shadow-[0_0_5px_rgba(0,0,0,0.08)] hover:shadow-lg rounded-[20px] grid md:grid-cols-[4fr_5fr] md:max-h-[264px]"
  >
    <div className="relative overflow-hidden aspect-[9/9] h-[264px] w-full">
      {post.coverImage ? (
        <Image
          src={urlFor(post.coverImage).width(800).height(450).url()}
          alt={post.title}
          fill
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
          No Image
        </div>
      )}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-l from-navy-900/60 to-transparent" />
    </div>

    <div className="flex flex-col p-8 md:p-8 justify-center">
      {post.categories?.length > 0 && (
        <span className="text-navy-500 mb-1 font-medium">
          {post.categories[0].title}
        </span>
      )}

      <h3 className="font-bold text-navy-900 mb-1 leading-tight text-2xl line-clamp-2">
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

      <p className="text-slate-600 line-clamp-2 text-md">{post.excerpt}</p>

      <div className="mt-auto pt-1">
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
            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  </motion.div>
);

export const NormalCard = ({ post, href }: NewsCardProps) => (
  <motion.div
    viewport={{ once: true }}
    className="group relative bg-white flex flex-col overflow-hidden border border-slate-100 shadow-[0_0_5px_rgba(0,0,0,0.08)] hover:shadow-lg transition-all duration-300 rounded-[20px] h-full"
  >
    <div className="relative overflow-hidden h-[180px] shrink-0 w-full">
      {post.coverImage ? (
        <Image
          src={urlFor(post.coverImage).width(800).height(450).url()}
          alt={post.title}
          fill
          className="object-cover"
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
        <span className="text-navy-500 font-medium">
          {post.categories[0].title}
        </span>
      )}

      <Link href={href}>
        <h3 className="font-bold text-navy-900 leading-tight text-xl line-clamp-2">
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

      <p className="text-slate-600 line-clamp-3 text-md">{post.excerpt}</p>
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
