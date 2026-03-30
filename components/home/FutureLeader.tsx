"use client";

import { motion } from "framer-motion";
import { Target, Globe, Zap, Cpu } from "lucide-react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const Empowering = () => {
  return (
    <section className="pt-24 pb-0 bg-navy-950 relative overflow-hidden snap-start">
      {/* <div className="absolute inset-0 bg-gradient-to-b from-deep-navy from-[0%] to-[#020617] to-[5%]" /> */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[100px]" />
        <div className="absolute -top-30 -left-24 w-96 h-96 bg-accent-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-[550px] left-[0px] w-96 h-96 bg-accent-blue/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full relative z-10">
        <div className="flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-spa n-4 flex flex-col items-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight text-center">
              Empowering{" "}
              <span className={`${playfair.className} tracking-wide italic`}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue">
                  Future Leaders
                </span>
              </span>
            </h2>

            {/*Scribble Line */}
            <svg
              width="500"
              height="20"
              viewBox="0 0 500 20"
              fill="none"
              className="mt-2"
            >
              <motion.path
                d="M50 10 L450 10"
                stroke="white"
                strokeWidth="1"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
              />

              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="500" y2="0">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Right Cards Grid */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <div
                className="relative h-[170px] bg-white shadow-sm overflow-hidden
    [mask-image:linear-gradient(to_right,transparent,black_50%,black_50%,transparent)]
    [-webkit-mask-image:linear-gradient(to_right,transparent,black_50%,black_50%,transparent)]"
              >
                <Image
                  src="/images/home/home_technical.png"
                  alt="example"
                  fill
                  className="object-cover"
                  quality={100}
                />

                {/* overlay gelap */}
                <div
                  className="
        absolute inset-0 bg-black/60 z-0
        transition-opacity duration-500
        group-hover:opacity-0
      "
                />

                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <h2 className="text-white text-2xl sm:text-5xl md:text-5xl font-bold flex items-center gap-2 drop-shadow-lg text-center">
                    <Zap className="w-6 h-6 sm:w-8 sm:h-8 md:w-[3rem] md:h-[3rem] text-white" />
                    Technical Excellence
                  </h2>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group"
            >
              <div
                className="relative h-[170px] bg-white shadow-sm overflow-hidden
    [mask-image:linear-gradient(to_right,transparent,black_50%,black_50%,transparent)]
    [-webkit-mask-image:linear-gradient(to_right,transparent,black_50%,black_50%,transparent)]"
              >
                <Image
                  src="/images/home/home_global.png"
                  alt="emp global"
                  fill
                  className="object-cover"
                  quality={100}
                />

                {/* overlay */}
                <div
                  className="
        absolute inset-0 bg-black/60 z-0
        transition-opacity duration-500
        group-hover:opacity-0
      "
                />

                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <h2 className="text-white text-2xl sm:text-5xl md:text-5xl font-bold flex items-center gap-2 drop-shadow-lg text-center">
                    <Globe className="w-6 h-6 sm:w-8 sm:h-8 md:w-[3rem] md:h-[3rem] text-white" />
                    Global Network
                  </h2>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group"
            >
              <div
                className="relative h-[170px] bg-white shadow-sm overflow-hidden
    [mask-image:linear-gradient(to_right,transparent,black_50%,black_50%,transparent)]
    [-webkit-mask-image:linear-gradient(to_right,transparent,black_50%,black_50%,transparent)]"
              >
                <Image
                  src="/images/home/home_leadership.png"
                  alt="emp leadership"
                  fill
                  className="object-cover"
                  quality={100}
                />

                {/* overlay */}
                <div
                  className="
        absolute inset-0 bg-black/50 z-0
        transition-opacity duration-500
        group-hover:opacity-0
      "
                />

                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <h2 className="text-white text-2xl sm:text-5xl md:text-5xl font-bold flex items-center gap-2 drop-shadow-lg text-center">
                    <Target className="w-6 h-6 sm:w-8 sm:h-8 md:w-[3rem] md:h-[3rem] text-white" />
                    Leadership
                  </h2>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Empowering;
