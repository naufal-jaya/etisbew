'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const HomeCTA = () => {
  return (
    <section className="py-24 bg-navy-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 circuit-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-accent-cyan text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Join the Innovation Movement</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Shape the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-blue-400 to-accent-blue">
              Future of Technology?
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
            Join our community of passionate students, researchers, and future leaders. Let's build something extraordinary together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-navy-950 hover:bg-gray-100 font-bold px-8 h-14 rounded-full text-base min-w-[180px] transition-all hover:scale-105">
                Get in Touch
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 font-medium px-8 h-14 rounded-full text-base min-w-[180px] backdrop-blur-sm transition-all hover:scale-105">
                Learn More <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeCTA;
