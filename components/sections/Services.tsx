'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Users, Trophy, Lightbulb, BookOpen, Briefcase } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Code,
      title: 'Technical Workshops',
      description:
        'Hands-on workshops covering cutting-edge technologies, programming languages, and engineering tools to enhance practical skills.',
    },
    {
      icon: Users,
      title: 'Networking Events',
      description:
        'Connect with industry professionals, alumni, and peers through meetups, conferences, and collaborative sessions.',
    },
    {
      icon: Trophy,
      title: 'Competitions',
      description:
        'Participate in hackathons, innovation challenges, and technical competitions to showcase your talents and win recognition.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation Projects',
      description:
        'Join research and development projects that solve real-world problems and contribute to technological advancement.',
    },
    {
      icon: BookOpen,
      title: 'Learning Resources',
      description:
        'Access exclusive learning materials, tutorials, and mentorship programs to accelerate your technical growth.',
    },
    {
      icon: Briefcase,
      title: 'Career Development',
      description:
        'Professional development programs, resume workshops, and career guidance to prepare you for the tech industry.',
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-700 mb-4">
            Our <span className="text-accent-cyan">Services</span>
          </h2>
          <div className="w-20 h-1 bg-accent-cyan mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the wide range of opportunities and services we offer to
            help you grow as a technology professional.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-accent-cyan group">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-navy-500 to-accent-cyan rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="text-white" size={28} />
                  </div>
                  <CardTitle className="text-xl text-navy-700">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
