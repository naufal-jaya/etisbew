import { client } from '@/sanity/lib/client';
import { postBySlugQuery, relatedPostsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  coverImage: any;
  body: any;
  author: {
    name: string;
    image: any;
    role: string;
  };
  categories: Array<{
    title: string;
    slug: { current: string };
  }>;
}

async function getPost(slug: string): Promise<Post | null> {
  const post = await client.fetch(postBySlugQuery, { slug });
  return post;
}

async function getRelatedPosts(slug: string) {
  const posts = await client.fetch(relatedPostsQuery, { slug });
  return posts;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | IEEE Student Branch IPB Blog`,
    description: post.excerpt,
  };
}

// Portable Text Components
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt || 'Blog post image'}
          width={800}
          height={600}
          className="rounded-lg"
        />
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold text-navy-700 mt-12 mb-6">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-navy-700 mt-10 mb-5">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-navy-700 mt-8 mb-4">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold text-navy-700 mt-6 mb-3">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-accent-cyan pl-6 italic my-6 text-gray-700">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 leading-relaxed mb-6">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-cyan hover:text-accent-blue underline"
      >
        {children}
      </a>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-navy-700">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-6 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-6 space-y-2">{children}</ol>
    ),
  },
};

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(params.slug);

  return (
    <main className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <Link href="/blog">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft size={18} />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map((category) => (
                <span
                  key={category.slug.current}
                  className="text-sm bg-accent-cyan/10 text-accent-cyan px-4 py-1.5 rounded-full"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-700 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            {post.author && (
              <div className="flex items-center gap-3">
                {post.author.image && (
                  <Image
                    src={urlFor(post.author.image).width(40).height(40).url()}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-navy-700">{post.author.name}</p>
                  {post.author.role && (
                    <p className="text-sm text-gray-500">{post.author.role}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative h-96 mb-12 rounded-2xl overflow-hidden">
              <Image
                src={urlFor(post.coverImage).width(1200).height(600).url()}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-navy-700 mb-12 text-center">
              Related <span className="text-accent-cyan">Articles</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost: any) => (
                <Link
                  key={relatedPost._id}
                  href={`/blog/${relatedPost.slug.current}`}
                  className="glass-card rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {relatedPost.coverImage && (
                    <div className="relative h-40">
                      <Image
                        src={urlFor(relatedPost.coverImage).width(400).height(300).url()}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-navy-700 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    {relatedPost.excerpt && (
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
