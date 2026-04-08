"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  post: any;
}

const NewsCard = ({ post }: NewsCardProps) => {
  const isFeatured = post.featured;
  const href = `/news/${post.slug.current}`;

  const CardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group relative bg-white rounded-[60px] overflow-hidden border border-slate-100 shadow-[0_0_5px_rgba(0,0,0,0.08)] hover:shadow-lg transition-all duration-300",
        isFeatured
          ? "grid rounded-[40px] md:grid-cols-2"
          : "flex flex-col rounded-[40px] h-full",
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden",
          isFeatured ? "aspect-[16/9] md:h-full" : "aspect-video",
        )}
      >
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

        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            isFeatured
              ? "bg-gradient-to-l from-navy-900/60 to-transparent"
              : "bg-gradient-to-t from-navy-900/60 to-transparent",
          )}
        />
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex flex-col",
          isFeatured ? "p-8 md:p-12 justify-center" : "p-8 pt-4 flex-grow",
        )}
      >
        {post.categories?.length > 0 && (
          <span className="text-navy-500 mb-3 font-medium">
            {post.categories[0].title}
          </span>
        )}

        {/* Title */}
        {isFeatured ? (
          <h3 className="font-bold text-navy-900 mb-3 leading-tight text-3xl md:text-4xl">
            {post.title}
          </h3>
        ) : (
          <Link
            href={href}
            className="group-hover:text-blue-600 transition-colors"
          >
            <h3 className="font-bold text-navy-900 mb-3 leading-tight text-xl">
              {post.title}
            </h3>
          </Link>
        )}

        <div className="flex items-center gap-2 mb-3 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <User className="text-navy-500 w-4 h-4" />
            <span className="text-navy-500 font-medium">
              {post.author?.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-UK", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
        </div>

        <p
          className={cn(
            "text-slate-600 line-clamp-3",
            isFeatured ? "text-lg" : "text-base",
          )}
        >
          {post.excerpt}
        </p>

        {/* Read more (only non-featured) */}
        {isFeatured && (
          <div className="mt-auto">
            <Button
              variant="ghost"
              className="p-0 h-auto text-navy-500 font-semibold group/btn"
            >
              <Link
                href={href}
                className="flex items-center hover:text-navy-800 transition-smooth"
              >
                Read more
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );

  return !isFeatured ? (
    <Link href={href} className="block">
      {CardContent}
    </Link>
  ) : (
    CardContent
  );
};

export default NewsCard;
