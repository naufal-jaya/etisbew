"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NormalCard } from "../news/NewsCard";
import { motion } from "framer-motion";

interface NewsInsightProps {
  posts: any;
}

const NewsInsight = ({ posts }: NewsInsightProps) => {
  const displayPosts =
    posts?.length > 0
      ? posts
      : [
          {
            _id: "1",
            title: "IEEE SB IPB Wins Regional Award",
            slug: { current: "#" },
            publishedAt: new Date().toISOString(),
            excerpt:
              "Our student branch has been recognized for outstanding performance in organizing technical workshops and community events.",
            coverImage: null,
            author: { name: "Admin", image: null },
          },
          {
            _id: "2",
            title: "Upcoming Workshop: AI & Machine Learning",
            slug: { current: "#" },
            publishedAt: new Date().toISOString(),
            excerpt:
              "Join us for a hands-on session exploring the fundamentals of Artificial Intelligence and its applications in modern engineering.",
            coverImage: null,
            author: { name: "Admin", image: null },
          },
          {
            _id: "3",
            title: "Tech Talk 2025: Future of Renewable Energy",
            slug: { current: "#" },
            publishedAt: new Date().toISOString(),
            excerpt:
              "Industry experts gather to discuss the latest trends and innovations in sustainable energy solutions.",
            coverImage: null,
            author: { name: "Admin", image: null },
          },
        ];

  return (
    <section className="py-32 bg-white relative overflow-hidden snap-start">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50 -skew-x-12 translate-x-1/3 z-0" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="relative min-h-[72px] w-full md:w-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-navy-950"
            >
              News &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-cyan">
                Insights
              </span>
            </motion.h2>
          </div>

          <Link
            href="/news"
            className="hidden md:flex items-center gap-2 text-navy-600 hover:text-accent-cyan transition-colors font-medium group"
          >
            View All News{" "}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...displayPosts]
            .sort((a, b) => Number(b.featured) - Number(a.featured))
            .slice(0, 3)
            .map((post) => (
              <div key={post._id}>
                <NormalCard post={post} href={`/news/${post.slug.current}`} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default NewsInsight;
