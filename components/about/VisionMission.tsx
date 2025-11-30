'use client';

import { motion } from 'framer-motion';
import { Target, Lightbulb } from 'lucide-react';

export default function VisionMission() {
  return (
    <section className="py-20 bg-deep-navy relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card-premium p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent"
          >
            <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-slate-300 leading-relaxed">
              To be a premier student branch that fosters technological innovation and professional excellence, 
              empowering members to become global leaders in engineering and technology.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card-premium p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent"
          >
            <div className="h-12 w-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-6">
              <Lightbulb className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-2.5" />
                <span>Provide technical workshops and seminars to enhance practical skills.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-2.5" />
                <span>Facilitate networking opportunities with industry professionals.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-2.5" />
                <span>Encourage research and innovation among students.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
