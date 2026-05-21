"use client";

import gsap from "gsap";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { useEffect, useRef } from "react";
import VisionMission from "./VisionMission";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
});

export default function AboutHero() {
  const shadowRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    gsap.to(bgRef.current, {
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

  useEffect(() => {
    gsap.to(shadowRef.current, {
      keyframes: [
        { WebkitMaskPosition: "100% 20%" },
        { WebkitMaskPosition: "60% 40%" },
      ],
      duration: 2,
      delay: 1.5,
      ease: "power2.out",
    });
  }, []);

  return (
    <section>
      <div className="snap-start relative min-h-[760px] sm:min-h-[840px] lg:min-h-screen overflow-visible flex justify-center px-4 sm:px-6 lg:px-12">
        <div
          ref={bgRef}
          className="absolute inset-0 mask-brush flex items-center justify-center z-10"
          style={{ WebkitMaskPosition: "-20% 50%" }}
        >
          <Image
            src="/images/about/hero-bg.png"
            alt="hero-bg"
            fill
            className="object-contain scale-[1.3] lg:scale-100"
          />
        </div>

        <div
          ref={shadowRef}
          className="absolute inset-0 overflow-visible mask-brush-shadow items-center justify-center z-0"
          style={{ WebkitMaskPosition: "120% 0%" }}
        >
          <Image
            src="/images/about/hero-shadow2.png"
            alt="hero-shadow"
            fill
            className="object-contain scale-[1.3] lg:scale-125"
          />
        </div>

        <div className="relative pt-80 lg:pt-72 z-10 max-w-3xl flex items-center flex-col text-center text-white">
          <div className="flex justify-center mb-4">
            <Image
              alt="IEEE Logo"
              src="images/layout/Logo_IEEE_IPB.svg"
              width={120}
              height={120}
              className="w-[300px] lg:w-[500px]"
            />
          </div>

          <p className="text-sm max-w-[450px] sm:text-base lg:text-lg leading-relaxed">
            We are a student-led community at IPB University {" "}
            <span
              className={`italic lg:text-2xl sm:text-lg font-medium`}
            >
              advancing technology for humanity
            </span>{" "}
            through innovation, collaboration, and meaningful engineering
            experiences.
          </p>
        </div>
      </div>
    </section>
  );
}
