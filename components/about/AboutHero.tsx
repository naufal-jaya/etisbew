"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type AboutHeroProps = {
  title: string;
  description: string;
};

export default function AboutHero({ title, description }: AboutHeroProps) {
  return (
    <section className="relative snap-start min-h-[60vh] flex items-center justify-center overflow-hidden bg-deep-navy pt-20">
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
            className="flex items-center justify-center"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
              <div className="absolute inset-10 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative z-10 text-center">
                <Image
                  src="/images/layout/Logo IEEE IPB.png"
                  alt="example"
                  quality={100}
                  width={300}
                  height={200}
                />
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
              {title}
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
