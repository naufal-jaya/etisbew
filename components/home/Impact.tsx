"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Users,
  UserPlus,
  CalendarCheck,
  Calendar,
  Trophy,
  Award,
  FileText,
  BookOpen,
  Cpu,
  Layers,
} from "lucide-react";
import Image from "next/image";

type ImpactItem = {
  label: string;
  value: string;
  suffix?: string;
  icon:
    | "users"
    | "userPlus"
    | "calendarCheck"
    | "calendar"
    | "trophy"
    | "award"
    | "fileText"
    | "bookOpen"
    | "cpu"
    | "layers";
};

type Partner = {
  id: number;
  src: string;
  alt: string;
};

const fallbackImpact: ImpactItem[] = [
  {
    label: "Events Hosted",
    value: "10",
    suffix: "+",
    icon: "calendarCheck",
  },
  {
    label: "Articles Posted",
    value: "100",
    suffix: "",
    icon: "fileText",
  },
  {
    label: "Active Members",
    value: "56",
    suffix: "+",
    icon: "users",
  },
];

const iconMap = {
  users: Users,
  userPlus: UserPlus,
  calendarCheck: CalendarCheck,
  calendar: Calendar,
  trophy: Trophy,
  award: Award,
  fileText: FileText,
  bookOpen: BookOpen,
  cpu: Cpu,
  layers: Layers,
};

const fallbackPartners: Partner[] = [
  { id: 1, src: "/team/images/home/imp_ibeka.png", alt: "IBEKA" },
  { id: 2, src: "/team/images/home/imp_infien.png", alt: "INFIEN" },
  { id: 3, src: "/team/images/home/imp_ibeka.png", alt: "IBEKA" },
  { id: 4, src: "/team/images/home/imp_infien.png", alt: "INFIEN" },
  { id: 5, src: "/team/images/home/imp_ibeka.png", alt: "IBEKA" },
  { id: 6, src: "/team/images/home/imp_infien.png", alt: "INFIEN" },
  { id: 7, src: "/team/images/home/imp_ibeka.png", alt: "IBEKA" },
  { id: 8, src: "/team/images/home/imp_infien.png", alt: "INFIEN" },
  { id: 8, src: "/team/images/home/imp_infien.png", alt: "INFIEN" },
  { id: 8, src: "/team/images/home/imp_infien.png", alt: "INFIEN" },
  { id: 8, src: "/team/images/home/imp_infien.png", alt: "INFIEN" },
  { id: 8, src: "/team/images/home/imp_infien.png", alt: "INFIEN" },
  { id: 8, src: "/team/images/home/imp_infien.png", alt: "INFIEN" },
  { id: 8, src: "/team/images/home/imp_infien.png", alt: "INFIEN" },
  { id: 8, src: "/team/images/home/imp_infien.png", alt: "INFIEN" },
  { id: 8, src: "/team/images/home/imp_infien.png", alt: "INFIEN" },
  { id: 8, src: "/team/images/home/imp_infien.png", alt: "INFIEN" },
  { id: 8, src: "/team/images/home/imp_infien.png", alt: "INFIEN" },
];

const Impact = ({
  impact = [],
  partner = [],
}: {
  impact?: ImpactItem[];
  partner?: Partner[];
}) => {
  const impactList = impact.length > 0 ? impact : fallbackImpact;
  const partnerList = partner.length > 0 ? partner : fallbackPartners;

  const TOTAL = partnerList.length;
  // Orbit radii — wide horizontal, shallow vertical (perspective oval)
  const RX = 600; // horizontal semi-axis (px)
  const RY = 60; // vertical semi-axis (px, gives depth illusion)

  function getAngleForIndex(index: number, offset: number) {
    return (index / TOTAL) * 2 * Math.PI + offset;
  }

  function getProps(angle: number) {
    // x: -RX..RX, y: -RY..RY
    const x = Math.sin(angle) * RX;
    const y = Math.cos(angle) * RY;

    // depth: 0 (back) → 1 (front). cos(angle) maps nicely:
    // angle=0 → front (cos=1), angle=π → back (cos=-1)
    const depth = (Math.cos(angle) + 1) / 2; // 0..1

    // Scale: front items bigger (1.5), back items smaller (0.35)
    const scale = 0.35 + depth * 1.15;

    // Opacity: front = 1, back = 0.2
    const opacity = 0.2 + depth * 0.8;

    // Blur: front = 0, back = 6px
    const blur = (1 - depth) * 6;

    // Glow intensity
    const glowAlpha = 0.3 + depth * 0.7;

    return { x, y, scale, opacity, blur, glowAlpha, depth };
  }

  const [offset, setOffset] = useState(0);
  const animRef = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);
  // Speed: front items move left → positive offset increment
  const SPEED = 0.004; // rad/sec equivalent per frame @ 60fps → rad/frame

  useEffect(() => {
    const animate = (ts: number) => {
      if (lastTime.current === null) lastTime.current = ts;
      const dt = ts - lastTime.current;
      lastTime.current = ts;
      // ~0.25 rad/sec
      setOffset((prev) => prev + (SPEED * dt) / 16.67);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Sort by depth so front items render on top
  const items = partnerList.map((partner, i) => {
    const angle = getAngleForIndex(i, offset);
    const props = getProps(angle);
    return { ...partner, angle, ...props, originalIndex: i };
  });

  items.sort((a, b) => a.depth - b.depth);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <section className="py-24 bg-navy-950 relative overflow-hidden  snap-start">
      {/* Background Accents */}
      <div className="absolute inset-0 circuit-pattern opacity-10 pointer-events-none" />

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[100px]" />
        <div className="absolute -top-12 -left-24 w-96 h-96 bg-accent-blue/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
          >
            Making a Real{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue">
              Impact
            </span>
          </motion.h2>
        </div>

        <div className="grid mb-[60px] grid-cols-1 md:grid-cols-3 gap-6">
          {impactList.map((item, index) => {
            const Icon = iconMap[item.icon] || Users;

            return (
              <motion.div
                key={item.label}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setPos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  });
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative group"
              >
                <div
                  className={`h-full p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300`}
                >
                  <div
                    className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500 mix-blend-soft-light"
                    style={{
                      opacity: activeIndex === index ? 1 : 0,
                      filter: "blur(40px)",
                      background: `radial-gradient(
                                  250px circle at ${pos.x}px ${pos.y}px,
                                  rgba(255, 255, 255, 0.06),
                                  transparent 100%
                                )`,
                    }}
                  />
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white">{item.icon}</Icon>
                  </div>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                      {item.value}
                    </span>
                    {item.suffix && (
                      <span className="text-2xl font-bold text-accent-cyan">
                        {item.suffix}
                      </span>
                    )}
                  </div>

                  <div className="text-gray-400 font-medium text-sm uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-accent-cyan/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-accent-blue/8 blur-[80px]" />
      </div>

      {/* Title */}
      <div className="text-center mb-0 relative z-10">
        <p className="font-bold mx-[10px] text-xl md:text-3xl lg:text-4xl font-normal text-white">
          Partners Throughout The Years
        </p>
      </div>

      {/* Orbit stage */}
      <div
        className="relative mx-auto"
        style={{ width: "100%", height: "320px" }}
      >
        {/* Ellipse guide — subtle */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: RX * 2,
            height: RY * 2 + 20,
            borderRadius: "50%",
            border: "1px solid rgba(100,220,255,0.08)",
            boxShadow: "0 0 40px 0 rgba(100,220,255,0.04) inset",
          }}
        />

        {/* OVERLAY partners*/}
        <div
          className="hidden md:block absolute top-0 pointer-events-none z-[999]"
          style={{
            width: "40%",
            height: "100%",
            background: "linear-gradient(to right, #050C16, transparent)",
          }}
        />

        <div
          className="hidden md:block absolute top-0 right-[0] pointer-events-none z-[999]"
          style={{
            width: "40%",
            height: "100%",
            background: "linear-gradient(to left, #050C16, transparent)",
          }}
        />

        {items.map((item) => {
          const cx = "50%";
          const CIRCUMFERENCE = 2 * Math.PI * RX; // keliling ellipse approx (pakai RX aja biar simpel)
          const SPACING_FACTOR = 0.7; // makin kecil = makin renggang

          const baseSize = Math.min(
            80,
            (CIRCUMFERENCE / TOTAL) * SPACING_FACTOR,
          );

          return (
            <div
              key={`${item.id}-${item.originalIndex}`}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                width: baseSize,
                height: baseSize,
                transform: `translate(calc(-50% + ${item.x}px), calc(-50% + ${item.y}px)) scale(${item.scale})`,
                opacity: item.opacity,
                filter: `blur(${item.blur}px)`,
                zIndex: Math.round(item.depth * 100),
                transition: "none",
                willChange: "transform, opacity, filter",
              }}
            >
              {/* Inner frosted disc */}
              <div className="absolute inset-2 rounded-full flex items-center justify-center">
                {/* Glow background */}
                <div className="absolute inset-0 rounded-full bg-[#A6D8E9] blur-[25px] opacity-100" />

                {/* Logo */}
                <div className="relative w-32 h-20 flex items-center justify-center z-10">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="240px"
                    className="object-contain"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Impact;
