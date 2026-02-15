'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-deep-navy pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 circuit-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-navy/50 to-deep-navy" />
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left: Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-start"
          >
             <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                {/* Placeholder for Logo */}
                <div className="relative z-10 text-center">
                  <div className="text-6xl font-bold text-white tracking-tighter border-4 border-white p-4 inline-block">IEEE</div>
                  <div className="text-xl text-blue-400 mt-2 font-medium tracking-widest">SB IPB</div>
                </div>
             </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              IEEE Student Branch <br />
              <span className="text-gradient">IPB University</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We are a dynamic community of innovators, engineers, and future leaders dedicated to advancing technology for humanity. 
              Through technical excellence and professional development, we bridge the gap between academic learning and industry innovation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
