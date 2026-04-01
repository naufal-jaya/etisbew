"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Users, Trophy, BookOpen, Lock } from "lucide-react";

// ─── Lock Unlock Heading ───────────────────────────────────────────────────────
const UnlockingPotential = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [phase, setPhase] = useState<
    "idle" | "unlocking" | "revealing" | "done"
  >("idle");

  useEffect(() => {
    if (!isInView || phase !== "idle") return;
    const t1 = setTimeout(() => setPhase("unlocking"), 400);
    return () => clearTimeout(t1);
  }, [isInView, phase]);

  useEffect(() => {
    if (phase !== "unlocking") return;
    const t2 = setTimeout(() => setPhase("revealing"), 650);
    return () => clearTimeout(t2);
  }, [phase]);

  useEffect(() => {
    if (phase !== "revealing") return;
    const t3 = setTimeout(() => setPhase("done"), 550);
    return () => clearTimeout(t3);
  }, [phase]);

  const isRevealing = phase === "revealing" || phase === "done";

  return (
    <div ref={ref} className="relative inline-flex items-baseline gap-3">
      {/* "Unlocking" plain text */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-950"
      >
        Unlocking{" "}
      </motion.span>

      {/* "Potential" word container */}
      <span className="relative inline-block">
        {/* Gradient text — always rendered underneath */}
        <span
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue select-none"
          aria-hidden="true"
        >
          Potential
        </span>

        {/* Single solid cover — fades + scales out on reveal */}
        {phase !== "done" && (
          <motion.span
            className="absolute inset-0 bg-gray-50 rounded-sm pointer-events-none z-10"
            aria-hidden="true"
            initial={{ opacity: 1, scale: 1 }}
            animate={
              isRevealing
                ? { opacity: 0, scale: 1.08 }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.45, ease: "easeOut" }}
          />
        )}

        {/* Lock icon — centered, unlocks then zooms out */}
        {phase !== "done" && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            aria-hidden="true"
            initial={{ opacity: 1, scale: 1 }}
            animate={
              isRevealing
                ? { opacity: 0, scale: 2.0 }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              style={{
                width: "clamp(20px, 3vw, 36px)",
                height: "auto",
                overflow: "visible",
                filter: "drop-shadow(0 0 8px rgba(34,211,238,0.9))",
              }}
            >
              {/* Lock body */}
              <rect
                x="3"
                y="11"
                width="18"
                height="11"
                rx="2"
                ry="2"
                stroke="currentColor"
                className="text-accent-cyan"
              />

              {/* Shackle — pivots open from the right anchor point */}
              <motion.path
                d="M7 11V5a5 5 0 0 1 10 0v1"
                stroke="currentColor"
                className="text-accent-cyan"
                style={{
                  transformOrigin: "17px 11px",
                }}
                initial={{ rotate: 0, y: 0 }}
                animate={
                  phase === "unlocking" || phase === "revealing"
                    ? { rotate: -0, y: -2.1 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              />
            </svg>
          </motion.span>
        )}

        {/* Screenreader text */}
        <span className="sr-only">Potential</span>
      </span>
    </div>
  );
};

const Potential = () => {
  const services = [
    {
      icon: Code,
      title: "Technical Workshops",
      description:
        "Hands-on workshops covering modern technologies, programming languages, and engineering tools.",
      color: "text-accent-cyan",
      bg: "bg-accent-cyan",
      textDark: "text-[#0a1f24]",
    },
    {
      icon: Users,
      title: "Networking Events",
      description:
        "Connect with industry professionals and peers through collaborative events.",
      color: "text-accent-blue",
      bg: "bg-accent-blue",
      textDark: "text-[#0a1a2e]",
    },
    {
      icon: Trophy,
      title: "Competitions",
      description:
        "Participate in hackathons, innovation challenges, and technical competitions to showcase your talents.",
      color: "text-accent-gold",
      bg: "bg-accent-gold",
      textDark: "text-[#2a2108]",
    },
    {
      icon: BookOpen,
      title: "Learning Resources",
      description:
        "Access exclusive learning materials, tutorials, and mentorship programs to accelerate your growth.",
      color: "text-pink-400",
      bg: "bg-pink-500",
      textDark: "text-[#2a0a1a]",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <section
      id="services"
      className="py-24 bg-gray-50 relative overflow-hidden  snap-start"
    >
      <div className="absolute inset-0 circuit-pattern opacity-5 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 flex justify-center"
        >
          <UnlockingPotential />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setPos({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                });
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`group w-fit justify-self-center ${
                index % 2 === 0
                  ? "md:justify-self-end"
                  : "md:justify-self-start"
              }`}
            >
              <Card className="h-full w-full max-w-[400px] bg-white border-transparent shadow-md hover:border-transparent hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div
                  className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500 mix-blend-soft-light"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    background: `radial-gradient(
                                250px circle at ${pos.x}px ${pos.y}px,
                                rgba(255, 255, 255, 1),
                                transparent 100%
                              )`,
                  }}
                />

                {/* ICON BACKGROUND */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <div
                    className={`
                      absolute bottom-[-150px] left-[-100px] 
                      w-60 h-60 ${service.bg} rounded-full blur-[60px] opacity-50
                      transition-all duration-700 ease-out
                      group-hover:scale-[3] group-hover:translate-x-20
                    `}
                  />
                  <div className="absolute bottom-0 left-0 h-full flex items-end">
                    <service.icon
                      className={`
                        h-[100px] w-auto ${service.color} ml-[10px] mb-[5px] opacity-20
                        transition-all duration-700 ease-out
                        group-hover:h-3/4 group-hover:opacity-30
                        group-hover:duration-200
                      `}
                    />
                  </div>
                </div>

                {/* CONTENT */}
                <CardHeader className="relative z-10 p-4">
                  <CardTitle
                    className={`text-xl ml-3 text-2xl font-bold text-navy-900 text-left ${service.textDark}`}
                  >
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10 pb-3">
                  <p
                    className={`text-lg font-normal ml-10 pt-1 leading-relaxed transition-colors ${service.textDark}`}
                  >
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Potential;
