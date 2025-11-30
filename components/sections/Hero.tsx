'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Globe, Cpu, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-deep-navy"
    >
      {/* Background Circuit Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 circuit-pattern" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      {/* Animated Circuit Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M0 100 H 200 V 300 H 500"
          fill="none"
          stroke="url(#gradient-line)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 3, ease: "easeInOut" }}
        />
        <motion.path
          d="M1000 800 V 600 H 800 V 400"
          fill="none"
          stroke="url(#gradient-line)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "loop", repeatDelay: 2, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00A9E0" stopOpacity="0" />
            <stop offset="50%" stopColor="#00A9E0" />
            <stop offset="100%" stopColor="#00A9E0" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-cyan-400 text-sm font-medium mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              IEEE Student Branch IPB University
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-8">
              Advancing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-cyan">
                Technology
              </span> <br />
              for Humanity.
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl leading-relaxed">
              We are a global community of student innovators, engineers, and researchers dedicated to shaping a sustainable and ethical technological future.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-white text-deep-navy hover:bg-gray-100 font-bold px-8 h-14 rounded-full text-base transition-all hover:scale-105"
              >
                Explore Our Mission
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10 font-medium px-8 h-14 rounded-full text-base backdrop-blur-sm transition-all hover:scale-105"
              >
                Join Community
              </Button>
            </div>
          </motion.div>
          
          {/* Right Content - 3D/Abstract Visual */}
          <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1 }}
             className="relative hidden lg:block"
          >
             <div className="relative w-full aspect-square max-w-[600px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative z-10 w-full h-full border border-white/10 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center">
                   <div className="w-3/4 h-3/4 border border-white/20 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                      <div className="w-1/2 h-1/2 border border-white/30 rounded-full flex items-center justify-center">
                         <Globe className="w-16 h-16 text-cyan-400" />
                      </div>
                   </div>
                   {/* Orbiting Elements */}
                   
                   {/* Outer Orbit - Cpu (0 deg start) */}
                   <motion.div 
                      className="absolute inset-0 z-20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                   >
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <motion.div 
                            animate={{ rotate: -360 }} 
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="bg-deep-navy p-3 rounded-xl border border-white/10 shadow-xl"
                          >
                              <Cpu className="w-8 h-8 text-blue-400" />
                          </motion.div>
                       </div>
                   </motion.div>

                   {/* Middle Orbit - Zap (120 deg start, Counter-Clockwise) */}
                   <motion.div 
                      className="absolute inset-0 z-20"
                      initial={{ rotate: 120 }}
                      animate={{ rotate: -240 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   >
                       <div className="absolute top-[12.5%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <motion.div 
                            initial={{ rotate: -120 }}
                            animate={{ rotate: 240 }} 
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="bg-deep-navy p-3 rounded-xl border border-white/10 shadow-xl"
                          >
                              <Zap className="w-8 h-8 text-yellow-400" />
                          </motion.div>
                       </div>
                   </motion.div>

                   {/* Inner Orbit - Sparkles (240 deg start, Clockwise) */}
                   <motion.div 
                      className="absolute inset-0 z-20"
                      initial={{ rotate: 240 }}
                      animate={{ rotate: 600 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                   >
                       <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <motion.div 
                            initial={{ rotate: -240 }}
                            animate={{ rotate: -600 }} 
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="bg-deep-navy p-3 rounded-xl border border-white/10 shadow-xl"
                          >
                              <Sparkles className="w-8 h-8 text-purple-400" />
                          </motion.div>
                       </div>
                   </motion.div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
