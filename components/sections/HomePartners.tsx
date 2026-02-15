'use client';

import { motion } from 'framer-motion';

// Placeholder logos - in a real app, these would be actual partner logos
const partners = [
  'IEEE Region 10',
  'IPB University',
  'Computer Society',
  'Power & Energy',
  'ComSoc',
  'Robotics',
  'IEEE Indonesia Section',
  'Ministry of Education',
];

const HomePartners = () => {
  return (
    <section className="py-12 bg-white border-b border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <span className="text-gray-400 font-bold tracking-widest uppercase text-xs">
            Trusted By Leading Organizations
          </span>
        </div>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        
        <motion.div
          className="flex gap-16 items-center whitespace-nowrap py-4"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner}-${index}`}
              className="text-xl md:text-2xl font-bold text-gray-300 hover:text-navy-900 transition-colors cursor-default"
            >
              {partner}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomePartners;
