"use client";

import { motion } from "framer-motion";
import { Target, Lightbulb } from "lucide-react";

type VisionMissionProps = {
  vision: string;
  mission: string[];
};

export default function VisionMission({ vision, mission }: VisionMissionProps) {
  return (
    <section className="py-32 bg-transparent relative overflow-hidden ">
      <div className="w-full max-w-[540px] mx-auto  mt-12">
        <div className="relative justify-left inline-block mb-6">
          <span className="absolute inset-0 bg-gradient-to-r from-[#517CEB] via-[#7694F5]/50 via-[23%] to-transparent w-[120px] z-0"></span>

          <h1 className="relative z-10 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white px-4 py-2">
            Vision
          </h1>
        </div>

        <p className="text-left ml-12 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed text-gray-300">
          {vision}
        </p>
      </div>

      <div className="w-full max-w-[540px] mx-auto mt-12">
        <div className="relative justify-left inline-block mb-6">
          <span className="absolute inset-0 bg-gradient-to-r from-[#517CEB] via-[#7694F5]/50 via-[23%] to-transparent w-[120px]  z-0 "></span>
          <h1 className="relative z-10 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white px-4 py-2">
            Mission
          </h1>
        </div>

        <ul className="text-left ml-12 space-y-2 text-sm sm:text-base lg:text-lg text-gray-300">
          {mission.map((item, index) => (
            <li key={index} className="flex gap-1">
              <span>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
