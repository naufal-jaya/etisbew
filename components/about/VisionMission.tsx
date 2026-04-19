"use client";

import { motion } from "framer-motion";
import { Target, Lightbulb } from "lucide-react";

type VisionMissionProps = {
  vision: string;
  mission: string[];
};

export default function VisionMission() {
  return (
    <section className="py-32 bg-deep-navy relative overflow-hidden">
      <div className="w-full mt-12">
        <h1 className="text-center text-3xl sm:text-5xl lg:text-6xl font-semibold mb-6">
          Vision
        </h1>
        <p className="text-center text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed text-gray-300">
          lorem ipsum sir dolor amet lorem ipsum sir dolor amet dolot amet lorem
          ipsum sir dolor amet lorem ipsum sir dolor amet lorem ipsum sir dolot
          amet lorem
        </p>
      </div>

      <div className="mt-12 w-full">
        <h1 className="text-center text-3xl sm:text-5xl lg:text-6xl font-semibold mb-6">
          Mission
        </h1>

        <ul className="text-center space-y-2 text-sm sm:text-base lg:text-lg text-gray-300">
          <li>• haihaihai</li>
          <li>• haihiahiahai</li>
          <li>• haihiahiah</li>
        </ul>
      </div>
    </section>
  );
}
