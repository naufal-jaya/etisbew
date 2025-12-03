import { client } from '@/sanity/lib/client';
import { postBySlugQuery } from '@/sanity/lib/queries';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { urlFor } from '@/sanity/lib/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const revalidate = 60;

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function SingleNewsPage({ params }: PageProps) {
  let post = await client.fetch(postBySlugQuery, { slug: params.slug });

  if (!post) {
    // Placeholder data for when Sanity is empty
    const placeholderPosts = [
      {
        _id: '1',
        title: 'IEEE SB IPB Wins Regional Award',
        slug: { current: 'ieee-sb-ipb-wins-regional-award' },
        publishedAt: new Date().toISOString(),
        excerpt: 'Our student branch has been recognized for outstanding performance in the region, taking home the Gold award for best activities.',
        categories: [{ title: 'Achievement', slug: { current: 'achievement' } }],
        coverImage: null,
        author: { name: 'Admin', role: 'Administrator' },
        body: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'We are absolutely thrilled to announce that the IEEE Student Branch of IPB University has been honored with the prestigious Regional Exemplary Student Branch Award for 2024! This recognition stands as a monumental testament to the relentless dedication, creativity, and hard work exhibited by every single one of our members, volunteers, and executive committee.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h3',
            children: [{ _type: 'span', text: 'A Journey of Excellence' }],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Over the past year, our branch has organized over 20 impactful events, ranging from technical workshops and international webinars to community outreach programs. Our focus has always been on bridging the gap between academic theory and practical industry application. This award specifically highlights our "Tech for Good" initiative, where we deployed simple IoT solutions to assist local farmers in monitoring soil moisture levels.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'The judges were particularly impressed by our member retention rates and the diversity of our technical chapters. We have successfully launched two new chapters this year: the Computer Society and the Power & Energy Society, both of which have already started contributing significantly to our campus technical ecosystem.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h3',
            children: [{ _type: 'span', text: 'Looking Ahead' }],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'While we celebrate this victory, we understand that this is just a milestone in our ongoing journey. We are already planning our flagship event for next year, the "IPB Future Tech Summit," which aims to bring together students from across Southeast Asia.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'We want to extend our heartfelt gratitude to our counselors, alumni, and the regional IEEE committee for their unwavering support. This award belongs to the entire IPB community.',
              },
            ],
          },
        ],
      },
      {
        _id: '2',
        title: 'Workshop on AI and Machine Learning',
        slug: { current: 'workshop-ai-ml' },
        publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        excerpt: 'Join us for an intensive workshop covering the basics of Neural Networks and Deep Learning with industry experts.',
        categories: [{ title: 'Event', slug: { current: 'event' } }],
        coverImage: null,
        author: { name: 'Education Team', role: 'Organizer' },
        body: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Artificial Intelligence is no longer just a buzzword; it is the driving force behind the Fourth Industrial Revolution. To help students stay ahead of the curve, IEEE SB IPB is proud to present a comprehensive "Introduction to AI & Machine Learning" workshop.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h3',
            children: [{ _type: 'span', text: 'What You Will Learn' }],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'This two-day intensive bootcamp is designed for beginners with some programming experience. We will cover the fundamental concepts of Machine Learning, starting from linear regression and moving all the way to deep neural networks using PyTorch.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'blockquote',
            children: [
              {
                _type: 'span',
                text: '"The best way to learn AI is to build AI. That is why this workshop is 80% hands-on coding." - Dr. Budi Santoso, Keynote Speaker',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h3',
            children: [{ _type: 'span', text: 'Workshop Curriculum' }],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Day 1: Python for Data Science, Pandas, Scikit-Learn, and Supervised Learning algorithms.\nDay 2: Introduction to Neural Networks, Computer Vision basics, and a capstone project where you will build a digit recognizer.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Seats are limited to 50 participants to ensure personal attention from our mentors. Don\'t miss this opportunity to upgrade your skills!',
              },
            ],
          },
        ],
      },
      {
        _id: '3',
        title: 'Tech Talk: The Future of IoT',
        slug: { current: 'tech-talk-iot' },
        publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        excerpt: 'Exploring how Internet of Things is reshaping smart cities and agriculture in Indonesia.',
        categories: [{ title: 'Tech Talk', slug: { current: 'tech-talk' } }],
        coverImage: null,
        author: { name: 'Research Div', role: 'Researcher' },
        body: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'The Internet of Things (IoT) is rapidly transforming how we interact with our environment. In our latest Tech Talk, we invited industry leaders to discuss the specific impact of IoT in the Indonesian context, focusing on Smart Cities and Precision Agriculture.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h3',
            children: [{ _type: 'span', text: 'Smart Cities: Beyond Traffic Lights' }],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'The discussion opened with a look at Jakarta\'s Smart City initiative. It\'s not just about adaptive traffic lights anymore. We learned about integrated flood monitoring systems that use thousands of low-cost sensors to predict water levels in real-time, allowing for faster emergency responses.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h3',
            children: [{ _type: 'span', text: 'Agriculture 4.0' }],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Given IPB\'s agricultural roots, the segment on Precision Agriculture was particularly engaging. Speakers demonstrated how IoT devices are being used to monitor soil pH, humidity, and crop health. One case study showed a 30% increase in yield for chili farmers using a simple automated irrigation system controlled via smartphone.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'The future is connected, and it is clear that IoT will play a pivotal role in solving some of our nation\'s most pressing challenges.',
              },
            ],
          },
        ],
      },
      {
        _id: '4',
        title: 'Open Recruitment 2025',
        slug: { current: 'open-recruitment-2025' },
        publishedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
        excerpt: 'We are looking for passionate students to join our team. Check out the available divisions and apply now!',
        categories: [{ title: 'Recruitment', slug: { current: 'recruitment' } }],
        coverImage: null,
        author: { name: 'HRD', role: 'Recruiter' },
        body: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Are you ready to take your university experience to the next level? IEEE SB IPB is officially opening recruitment for the 2025 term! We are looking for passionate, driven, and creative individuals to join our family.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h3',
            children: [{ _type: 'span', text: 'Why Join IEEE?' }],
          },
          {
            _type: 'block',
            style: 'ul',
            children: [
              {
                _type: 'span',
                text: '• Global Networking: Connect with over 400,000 members worldwide.\n• Professional Development: Gain skills in leadership, project management, and teamwork.\n• Technical Access: Get access to the latest research and technical journals.\n• Fun & Community: Be part of a supportive and vibrant community.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h3',
            children: [{ _type: 'span', text: 'Available Divisions' }],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'We are recruiting for the following divisions:\n1. Technical Division (Web Dev, IoT, AI)\n2. Creative & Media (Design, Video Editing, Social Media)\n3. Public Relations (Partnerships, Sponsorships)\n4. Event Management (Workshop & Seminar Organizers)',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Registration is open until January 30th. Visit our bio link to apply!',
              },
            ],
          },
        ],
      }
    ];

    post = placeholderPosts.find(p => p.slug.current === params.slug);

    if (!post) {
      notFound();
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar variant="light" />
      
      {/* Header Section */}
      <div className="pt-32 pb-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb / Back */}
          <div className="mb-8">
            <Link href="/news" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Link>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-3 mb-6">
            {post.categories && post.categories.map((cat: any) => (
              <span key={cat.slug.current} className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold tracking-wide uppercase">
                {cat.title}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-8 mb-8">
            <div className="flex items-center gap-6">
              {post.author && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-900">{post.author.name}</p>
                    <p className="text-xs text-slate-500">{post.author.role}</p>
                  </div>
                </div>
              )}
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <p className="text-sm font-medium text-slate-500">Published on</p>
                <time dateTime={post.publishedAt} className="text-sm font-bold text-navy-900">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container mx-auto px-4 max-w-5xl mb-16">
        <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-lg">
          {post.coverImage ? (
            <Image
              src={urlFor(post.coverImage).width(1200).height(600).url()}
              alt={post.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
              <span className="text-lg font-medium">No Cover Image</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Layout */}
      <div className="container mx-auto px-4 max-w-6xl flex flex-col lg:flex-row-reverse gap-12 pb-24">
        {/* Main Content */}
        <article className="lg:w-2/3">
          <div className="prose prose-lg prose-slate max-w-none prose-headings:text-navy-900 prose-headings:font-bold prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-img:rounded-xl text-slate-600">
            {post.body && post.body.length > 0 ? (
              <PortableText 
                value={post.body} 
                components={{
                  block: {
                    normal: ({children}) => <p className="mb-4 text-slate-600">{children}</p>,
                    h1: ({children}) => <h1 className="text-3xl font-bold text-navy-900 mb-4">{children}</h1>,
                    h2: ({children}) => <h2 className="text-2xl font-bold text-navy-900 mb-4">{children}</h2>,
                    h3: ({children}) => <h3 className="text-xl font-bold text-navy-900 mb-4">{children}</h3>,
                    blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-700 my-4">{children}</blockquote>,
                  },
                  list: {
                    bullet: ({children}) => <ul className="list-disc pl-5 mb-4 text-slate-600">{children}</ul>,
                    number: ({children}) => <ol className="list-decimal pl-5 mb-4 text-slate-600">{children}</ol>,
                  },
                  types: {
                    image: ({ value }: any) => (
                      <div className="relative w-full h-96 my-8 rounded-xl overflow-hidden">
                        <Image
                          src={urlFor(value).width(800).url()}
                          alt={value.alt || 'Post image'}
                          fill
                          sizes="(max-width: 768px) 100vw, 800px"
                          className="object-cover"
                        />
                      </div>
                    ),
                  }
                }}
              />
            ) : (
              <p className="text-slate-500 italic">No content available.</p>
            )}
          </div>
        </article>        {/* Sidebar / Table of Contents */}
        <aside className="lg:w-1/3">
          <div className="sticky top-32 space-y-8">
            {/* Table of Contents (Mockup for now, ideally generated from headings) */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <h3 className="font-bold text-navy-900 mb-4 text-lg">Table of Contents</h3>
              <nav className="space-y-2">
                <a href="#" className="block text-sm text-slate-600 hover:text-blue-600 transition-colors">Introduction</a>
                <a href="#" className="block text-sm text-slate-600 hover:text-blue-600 transition-colors">Key Highlights</a>
                <a href="#" className="block text-sm text-slate-600 hover:text-blue-600 transition-colors">Impact on Community</a>
                <a href="#" className="block text-sm text-slate-600 hover:text-blue-600 transition-colors">Future Plans</a>
              </nav>
            </div>

            {/* Share / Tags */}
            <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-navy-900 mb-4 text-sm uppercase tracking-wider">Share this article</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="w-full">Twitter</Button>
                <Button variant="outline" size="sm" className="w-full">LinkedIn</Button>
                <Button variant="outline" size="sm" className="w-full">Facebook</Button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Posts (if any) */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="bg-slate-50 py-24 border-t border-slate-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-navy-900">More Like This</h2>
              <Link href="/news" className="text-blue-600 font-medium hover:underline">View All News</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Reuse NewsCard or simple links */}
               {post.relatedPosts.map((related: any) => (
                 <Link key={related._id} href={`/news/${related.slug.current}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-56">
                      {related.coverImage ? (
                        <Image
                          src={urlFor(related.coverImage).width(600).height(400).url()}
                          alt={related.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">No Image</div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <Calendar className="w-3 h-3" />
                        <time>{new Date(related.publishedAt).toLocaleDateString()}</time>
                      </div>
                      <h3 className="font-bold text-xl text-navy-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                        {related.title}
                      </h3>
                    </div>
                 </Link>
               ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
