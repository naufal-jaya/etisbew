'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { BookOpen, Users, Briefcase, Heart, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AboutPageProps {
  aboutData: {
    title: string;
    logo?: any;
    introText: any;
    vision: string;
    mission: string[];
  };
  divisions: Array<{
    _id: string;
    name: string;
    description: string;
    icon?: string;
    order: number;
  }>;
}

const iconMap: { [key: string]: any } = {
  BookOpen,
  Users,
  Briefcase,
  Heart,
  Zap,
};

const AboutContent = ({ aboutData, divisions }: AboutPageProps) => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-navy-900 via-navy-700 to-navy-500 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              About <span className="text-accent-cyan">Us</span>
            </h1>
            <div className="w-20 h-1 bg-accent-cyan mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Logo */}
              <div className="flex justify-center lg:justify-start">
                {aboutData.logo ? (
                  <div className="relative w-64 h-64 md:w-80 md:h-80">
                    <Image
                      src={urlFor(aboutData.logo).width(400).height(400).url()}
                      alt="IEEE SB IPB Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-navy-500 to-accent-cyan rounded-3xl flex items-center justify-center">
                    <span className="text-6xl font-bold text-white">IEEE</span>
                  </div>
                )}
              </div>

              {/* Introduction Text */}
              <div className="glass-card rounded-2xl p-8 md:p-10">
                <h2 className="text-3xl font-bold text-navy-700 mb-6">
                  {aboutData.title || 'About IEEE SB IPB'}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <PortableText value={aboutData.introText} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-card border-none shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-navy-500 to-accent-cyan rounded-lg flex items-center justify-center">
                      <Zap className="text-white" size={24} />
                    </div>
                    <CardTitle className="text-3xl text-navy-700">Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-gray-700 leading-relaxed italic">
                    "{aboutData.vision}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-card border-none shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-navy-500 to-accent-cyan rounded-lg flex items-center justify-center">
                      <Heart className="text-white" size={24} />
                    </div>
                    <CardTitle className="text-3xl text-navy-700">Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {aboutData.mission.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-6 h-6 bg-accent-cyan rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm font-bold">{index + 1}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{item}</p>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divisions Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-700 mb-4">
              Our <span className="text-accent-cyan">Divisions</span>
            </h2>
            <div className="w-20 h-1 bg-accent-cyan mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our organizational structure is built on specialized divisions, each contributing to our mission of excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {divisions.map((division, index) => {
              const IconComponent = division.icon ? iconMap[division.icon] || Users : Users;
              
              return (
                <motion.div
                  key={division._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="cursor-pointer"
                >
                  <Card className="glass-card h-full border-none shadow-lg hover:shadow-2xl transition-all duration-300 group">
                    <CardHeader>
                      <div className="w-16 h-16 bg-gradient-to-br from-navy-500 to-accent-cyan rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="text-white" size={32} />
                      </div>
                      <CardTitle className="text-2xl text-navy-700 group-hover:text-accent-cyan transition-colors">
                        {division.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">
                        {division.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutContent;
