'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Mission',
      description:
        'To foster technological innovation and advance the professional development of our members through collaboration, education, and hands-on experience.',
    },
    {
      icon: Eye,
      title: 'Vision',
      description:
        'To be a leading student organization that cultivates future technology leaders and innovators who contribute to global technological advancement.',
    },
    {
      icon: Heart,
      title: 'Values',
      description:
        'Excellence, Integrity, Innovation, Collaboration, and Continuous Learning drive everything we do as we work to advance technology for humanity.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
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
            About <span className="text-accent-cyan">Us</span>
          </h2>
          <div className="w-20 h-1 bg-accent-cyan mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            IEEE Student Branch IPB is a vibrant community of engineering and
            technology enthusiasts committed to advancing innovation and
            professional excellence.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-card rounded-2xl p-8 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-navy-500 to-accent-cyan rounded-xl flex items-center justify-center mb-6">
                <value.icon className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-navy-700 mb-4">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Company Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto text-center"
        >
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-navy-700 mb-6">
              Who We Are
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              As the world's largest technical professional organization, IEEE
              Student Branch IPB brings together passionate students from
              diverse engineering disciplines. We provide a platform for members
              to enhance their technical skills, build professional networks, and
              contribute to meaningful projects that make a difference.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Through workshops, competitions, seminars, and collaborative
              projects, we empower our members to become tomorrow's technology
              leaders and innovators.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
