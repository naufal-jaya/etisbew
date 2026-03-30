'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';
import { LucideIcon, ArrowUpRight } from 'lucide-react';

interface Division {
  _id: string;
  name: string;
  description: string;
  icon: string;
}

interface HomeDivisionsProps {
  divisions: Division[];
}

const HomeDivisions = ({ divisions }: HomeDivisionsProps) => {
  const getIcon = (iconName: string): LucideIcon => {
    // @ts-ignore
    return LucideIcons[iconName] || LucideIcons.Circle;
  };

  if (!divisions || divisions.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-navy-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 circuit-pattern opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-64 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-navy-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-accent-cyan" />
              <span className="text-accent-cyan font-bold tracking-widest uppercase text-xs">
                Our Structure
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-950 leading-tight">
              Specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-600 to-accent-blue">Divisions</span>
            </h2>
          </div>
          <p className="text-gray-500 max-w-md text-right hidden md:block">
            Each division focuses on specific areas of technology and development to foster holistic growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((division, index) => {
            const Icon = getIcon(division.icon);
            return (
              <motion.div
                key={division._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-full bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-900 to-navy-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="p-4 bg-navy-50 rounded-2xl group-hover:bg-white/10 transition-colors duration-500">
                        <Icon className="w-8 h-8 text-navy-700 group-hover:text-accent-cyan transition-colors duration-500" />
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-4 group-hover:translate-x-0">
                        <ArrowUpRight className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-navy-900 mb-4 group-hover:text-white transition-colors duration-500">
                      {division.name}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                      {division.description}
                    </p>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent-cyan/10 rounded-full blur-2xl group-hover:bg-accent-cyan/20 transition-colors duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeDivisions;
