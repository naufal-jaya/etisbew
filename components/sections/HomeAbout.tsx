'use client';

import { motion } from 'framer-motion';
import { Target, Globe, Zap, ArrowRight, Cpu } from 'lucide-react';
import { Card } from '@/components/ui/card';

const HomeAbout = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Tech Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 skew-x-12 translate-x-20 z-0" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-cyan/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-navy-50 rounded-lg border border-navy-100">
                <Cpu className="text-navy-700 w-5 h-5" />
              </div>
              <span className="text-accent-cyan font-bold tracking-widest uppercase text-xs">
                Our Core Pillars
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-navy-950 mb-6 leading-tight">
              Empowering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-cyan">
                Future Leaders
              </span>
            </h2>
            
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              We build our foundation on three key principles that guide every initiative, research project, and community event we organize.
            </p>

            <div className="hidden lg:block">
               <div className="h-1 w-20 bg-gradient-to-r from-accent-cyan to-transparent rounded-full" />
            </div>
          </motion.div>

          {/* Right Cards Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <div className="relative h-full bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-cyan to-transparent" />
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-accent-cyan/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
                
                <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center mb-6 text-accent-cyan group-hover:bg-accent-cyan group-hover:text-white transition-colors">
                  <Zap className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-bold text-navy-900 mb-3">Technical Excellence</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Mastering cutting-edge technologies through hands-on workshops and resources.
                </p>
                
                <div className="flex items-center text-accent-cyan text-sm font-semibold group-hover:translate-x-2 transition-transform">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group"
            >
              <div className="relative h-full bg-navy-900 p-8 rounded-2xl border border-navy-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue to-transparent" />
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-accent-blue/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 text-white group-hover:bg-accent-blue transition-colors">
                  <Globe className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">Global Network</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Connecting students with industry leaders, alumni, and peers worldwide.
                </p>
                
                <div className="flex items-center text-accent-blue text-sm font-semibold group-hover:translate-x-2 transition-transform">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group"
            >
              <div className="relative h-full bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-gold to-transparent" />
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-accent-gold/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
                
                <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center mb-6 text-accent-gold group-hover:bg-accent-gold group-hover:text-white transition-colors">
                  <Target className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-bold text-navy-900 mb-3">Leadership</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Cultivating future leaders through project management and organizational experience.
                </p>
                
                <div className="flex items-center text-accent-gold text-sm font-semibold group-hover:translate-x-2 transition-transform">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
