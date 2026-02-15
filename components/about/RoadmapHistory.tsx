'use client';

import { motion } from 'framer-motion';

const history = [
  {
    year: '2020',
    title: 'Establishment',
    description: 'IEEE SB IPB University was officially founded, marking the beginning of a new era for technology enthusiasts at IPB.',
  },
  {
    year: '2021',
    title: 'First Major Event',
    description: 'Hosted our first international webinar series, connecting students with global industry leaders.',
  },
  {
    year: '2022',
    title: 'Expansion',
    description: 'Expanded our divisions to include Media & Information, growing our member base by 200%.',
  },
  {
    year: '2023',
    title: 'National Recognition',
    description: 'Awarded "Best Student Branch" at the IEEE Indonesia Section gathering.',
  },
  {
    year: '2024',
    title: 'Innovation Hub',
    description: 'Launched the Student Innovation Hub to foster startup ideas and technical projects.',
  },
  {
    year: '2025',
    title: 'Future Vision',
    description: 'Aiming to become a leading technological community in Southeast Asia.',
  },
];

export default function RoadmapHistory() {
  return (
    <section className="py-20 bg-deep-navy relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Journey</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500/20 via-blue-500/50 to-blue-500/20" />

          <div className="space-y-12">
            {history.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center justify-between ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="w-full md:w-5/12 pl-12 md:pl-0">
                  <div className="glass-card-premium p-6 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors bg-navy-800/50">
                    <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2 block">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                </div>

                {/* Node */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-deep-navy border-2 border-blue-500 rounded-full z-10 mt-6 md:mt-0">
                  <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20" />
                </div>

                {/* Empty Space for alignment */}
                <div className="hidden md:block w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
