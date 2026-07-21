"use client";

type VisionMissionProps = {
  vision: string;
  mission: string[];
};

export default function VisionMission({ vision, mission }: VisionMissionProps) {
  return (
    <section className="snap-start relative min-h-screen overflow-hidden bg-transparent px-4 py-48 sm:px-6 sm:py-12 lg:px-8 lg:py-48 flex items-center">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-14 sm:gap-16">
        <div className="w-full">
          <div className="relative mb-5 inline-block sm:mb-6">
            <span className="absolute inset-0 z-0 w-24 bg-gradient-to-r from-[#517CEB] via-[#7694F5]/50 via-[23%] to-transparent sm:w-32"></span>

            <h1 className="relative z-10 px-3 py-2 text-3xl font-extrabold text-white sm:px-4 sm:text-5xl lg:text-6xl">
              Vision
            </h1>
          </div>

          <p className="max-w-2xl text-left text-sm leading-relaxed text-gray-300 sm:ml-8 sm:text-base lg:ml-12 lg:text-lg">
            {vision}
          </p>
        </div>

        <div className="w-full">
          <div className="relative mb-5 inline-block sm:mb-6">
            <span className="absolute inset-0 z-0 w-24 bg-gradient-to-r from-[#517CEB] via-[#7694F5]/50 via-[23%] to-transparent sm:w-32"></span>

            <h1 className="relative z-10 px-3 py-2 text-3xl font-extrabold text-white sm:px-4 sm:text-5xl lg:text-6xl">
              Mission
            </h1>
          </div>

          <ul className="max-w-2xl space-y-3 text-left text-sm leading-relaxed text-gray-300 sm:ml-8 sm:text-base lg:ml-12 lg:text-lg">
            {mission.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7694F5]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
