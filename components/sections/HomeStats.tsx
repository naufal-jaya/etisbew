'use client';

import { motion } from 'framer-motion';
import { Users, Calendar, Layers, Trophy } from 'lucide-react';

const stats = [
  {
    label: 'Active Members',
    value: '56',
    suffix: '+',
    icon: Users,
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
    border: 'border-accent-cyan/20'
  },
  {
    label: 'Divisions',
    value: '5',
    suffix: '',
    icon: Layers,
    color: 'text-accent-gold',
    bg: 'bg-accent-gold/10',
    border: 'border-accent-gold/20'
  },
  {
    label: 'Events Hosted',
    value: '10',
    suffix: '+',
    icon: Calendar,
    color: 'text-accent-blue',
    bg: 'bg-accent-blue/10',
    border: 'border-accent-blue/20'
  },
  {
    label: 'Awards Won',
    value: '3',
    suffix: '',
    icon: Trophy,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20'
  },
];

const HomeStats = () => {
  return (
    <section className="py-24 bg-navy-950 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 circuit-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-blue/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
          >
            Making a Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue">Impact</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Our numbers reflect the growing community of young innovators and the tangible change we're driving across the campus and beyond.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative group"
            >
              <div className={`h-full p-8 rounded-2xl bg-white/5 backdrop-blur-sm border ${stat.border} hover:bg-white/10 transition-all duration-300 hover:-translate-y-1`}>
                <div className={`w-14 h-14 rounded-xl ${stat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className={`text-2xl font-bold ${stat.color}`}>
                    {stat.suffix}
                  </span>
                </div>
                
                <div className="text-gray-400 font-medium text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
