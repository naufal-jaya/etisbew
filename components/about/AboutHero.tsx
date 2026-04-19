"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function AboutHero() {
  const maskRef = useRef(null);

  useEffect(() => {
    gsap.to(maskRef.current, {
      keyframes: [
        { WebkitMaskPosition: "20% 40%", maskPosition: "20% 40%" },
        { WebkitMaskPosition: "40% 60%", maskPosition: "40% 60%" },
        { WebkitMaskPosition: "50% 30%", maskPosition: "50% 30%" },
      ],
      duration: 2,
      delay: 0.75,
      ease: "power2.out",
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 ">
      <div
        ref={maskRef}
        className="absolute inset-0 mask-brush flex items-center justify-center"
        style={{ WebkitMaskPosition: "-20% 50%" }}
      >
        <Image
          src="/images/about/hero-bg.png"
          alt="hero-bg"
          fill
          className="object-contain scale-[1.3] lg:scale-100"
        />
      </div>

      <div className="relative z-10 max-w-3xl text-center text-white">
        <div className="flex justify-center mb-4">
          <Image
            src="/images/about/IEEE-White.png"
            alt="IEEE Logo"
            width={120}
            height={120}
            className="sm:w-48 lg:w-64"
          />
        </div>

        <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
          lorem ipsum sir dolor amet lorem ipsum sir dolor amet advancing{" "}
          <span className="italic lg:text-2xl sm:text-lg font-medium">
            technology for humanity
          </span>{" "}
          dolot amet lorem ipsum sir dolor amet lorem ipsum sir dolor amet lorem
          ipsum sir dolor amet lorem ipsum sir dolor amet lorem
        </p>
      </div>
    </section>
  );
}
