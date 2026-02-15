'use client';

import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

export type StatItem = {
  label: string;
  value: string;
  icon: LucideIcon;
  suffix?: string;
};

type StatsOverviewProps = {
  stats: StatItem[];
};

export default function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <section className="py-20 bg-deep-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group p-6 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <div className="w-14 h-14 mx-auto bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-blue-500/20">
                  <Icon size={28} />
                </div>

                <div className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                  {stat.value}
                  {stat.suffix ? (
                    <span className="text-blue-400 text-2xl md:text-3xl">
                      {stat.suffix}
                    </span>
                  ) : null}
                </div>

                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
