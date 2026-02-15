'use client';

import { motion } from 'framer-motion';
import { Users, Layers, Calendar, Award } from 'lucide-react';

const STATS = [
  {
    label: 'Total Divisions',
    value: '5',
    icon: Layers,
    suffix: ''
  },
  {
    label: 'Total Members',
    value: '56',
    icon: Users,
    suffix: '+'
  },
  {
    label: 'Years Active',
    value: '4',
    icon: Calendar,
    suffix: ' Years'
  },
  {
    label: 'Events Held',
    value: '10',
    icon: Award,
    suffix: '+'
  }
];

const StatsOverview = () => {
  return (
    <section className="py-20 bg-deep-navy text-white relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 circuit-pattern opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group p-6 rounded-2xl hover:bg-white/5 transition-colors"
            >
              <div className="w-14 h-14 mx-auto bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-blue-500/20">
                <stat.icon size={28} />
              </div>
              <div className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                {stat.value}<span className="text-blue-400 text-2xl md:text-3xl">{stat.suffix}</span>
              </div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsOverview;
