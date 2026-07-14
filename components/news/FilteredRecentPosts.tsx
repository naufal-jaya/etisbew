"use client";

import { useState, useMemo } from "react";
import NewsCard from "@/components/news/NewsCard";
import { ListFilter } from "lucide-react";

export default function FilteredRecentPosts({ posts }: { posts: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const allCategories = new Set<string>();
    posts.forEach((post) => {
      if (post.categories) {
        post.categories.forEach((cat: any) => {
          if (cat.title) allCategories.add(cat.title);
        });
      }
    });
    return ["All", ...Array.from(allCategories)];
  }, [posts]);

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return posts;
    return posts.filter((post) =>
      post.categories?.some((cat: any) => cat.title === selectedCategory),
    );
  }, [posts, selectedCategory]);

  return (
    <div>
      <div className="md:items-center justify-between gap-4 mb-8">
        {/* Category Filters */}
        <div className="flex items-center gap-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide mb-8">
          <ListFilter
            strokeWidth={1.5}
            className="relative -top-1 h-6 w-6 flex-shrink-0 text-black"
          />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 whitespace-nowrap border-b-[3px] px-0 pb-[2px] text-lg font-normal leading-none transition-colors ${
                selectedCategory === category
                  ? "border-[#28588C]  text-black"
                  : "border-transparent text-black hover:text-[#28588C]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
          <div className="w-6 h-8 bg-[radial-gradient(circle_at_100%_120%,#4594E8,transparent_60%),radial-gradient(circle_at_0%_0%,#728EB0,transparent_60%)] bg-navy-800" />
          {selectedCategory === "All" ? "Recent" : selectedCategory} Posts
        </h2>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post: any) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-slate-500">No posts found for this category.</p>
        </div>
      )}
    </div>
  );
}
