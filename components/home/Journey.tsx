'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Users, Trophy, Lightbulb, BookOpen, Briefcase, ArrowUpRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Code,
      title: 'Technical Workshops',
      description:
        'Hands-on workshops covering modern technologies, programming languages, and engineering tools.',
      color: 'text-accent-cyan',
      bg: 'bg-accent-cyan/10',
    },
    {
      icon: Users,
      title: 'Networking Events',
      description:
        'Connect with industry professionals and peers through collaborative events.',
      color: 'text-accent-blue',
      bg: 'bg-accent-blue/10',
    },
    {
      icon: Trophy,
      title: 'Competitions',
      description:
        'Participate in hackathons, innovation challenges, and technical competitions to showcase your talents.',
      color: 'text-accent-gold',
      bg: 'bg-accent-gold/10',
    },
    {
      icon: BookOpen,
      title: 'Learning Resources',
      description:
        'Access exclusive learning materials, tutorials, and mentorship programs to accelerate your growth.',
      color: 'text-pink-400',
      bg: 'bg-pink-500/10',
    },
  ];

  return (
    <section id="services" className="py-24 bg-navy-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 circuit-pattern opacity-5 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-950 mb-6">
            Empowering Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue">Journey</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full bg-white border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500 relative overflow-hidden ">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white to-gray-50`} />
                
                <CardHeader className="relative z-10">
                  <div className="flex justify-center items-start mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      <service.icon className={`${service.color}`} size={28} />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-navy-900 text-center">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <p className="text-gray-500 text-center leading-relaxed group-hover:text-gray-600 transition-colors">
                    {service.description}
                  </p>
                </CardContent>
                
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-950 mb-6">
            Empowering Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue">Journey</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full bg-white border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500 relative overflow-hidden ">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white to-gray-50`} />
                
                <CardHeader className="relative z-10">
                  <div className="flex justify-center items-start mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      <service.icon className={`${service.color}`} size={28} />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-navy-900 text-center">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <p className="text-gray-500 text-center leading-relaxed group-hover:text-gray-600 transition-colors">
                    {service.description}
                  </p>
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
