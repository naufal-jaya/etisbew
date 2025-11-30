'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Interfaces matching Sanity data
interface Division {
  _id: string;
  name: string;
  description?: string;
}

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: any;
  division: {
    _id: string;
    name: string;
  };
  subdivision?: string;
}

interface DivisionsSectionProps {
  divisions: Division[];
  members: TeamMember[];
}

// Helper to group members by division
const groupMembersByDivision = (members: TeamMember[], divisionName: string) => {
  return members.filter(m => m.division?.name === divisionName);
};

// Subdivisions mapping based on instructions
const SUBDIVISIONS: Record<string, string[]> = {
  'Education': ['Academic', 'Project'],
  'Human Resource Development': ['RnR', 'Internal Development'],
  'Media & Information': ['Creative', 'Information'],
  'Relations': ['Marketing', 'Partnership'],
  'Executives': []
};

// Accent colors for divisions (Updated for Dark Theme)
const DIVISION_ACCENTS: Record<string, string> = {
  'Executives': 'border-blue-500 text-blue-400',
  'Education': 'border-cyan-500 text-cyan-400',
  'Human Resource Development': 'border-teal-500 text-teal-400',
  'Media & Information': 'border-purple-500 text-purple-400',
  'Relations': 'border-yellow-500 text-yellow-400',
};

const MemberCard = ({ member }: { member: TeamMember }) => {
  const accentClass = DIVISION_ACCENTS[member.division?.name] || 'border-gray-500 text-gray-400';
  const borderColor = accentClass.split(' ')[0];
  const textColor = accentClass.split(' ')[1];

  return (
    <div className="group relative min-w-[260px] h-[380px] rounded-xl overflow-hidden bg-navy-800 border border-white/10 hover:border-white/20 transition-all duration-300">
      {/* Image */}
      <div className="absolute inset-0">
        {member.image ? (
          <Image
            src={urlFor(member.image).url()}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-navy-900 text-white font-bold text-4xl">
            {member.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/60 to-transparent opacity-90" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className={`border-l-2 ${borderColor} pl-3`}>
          <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${textColor}`}>
            {member.role}
          </p>
          <h4 className="text-lg font-bold text-white leading-tight mb-2">
            {member.name}
          </h4>
          {member.subdivision && (
            <span className="inline-block text-[10px] px-2 py-0.5 bg-white/10 text-slate-300 rounded-full border border-white/10">
              {member.subdivision}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default function DivisionsSection({ divisions, members }: DivisionsSectionProps) {
  // Sort divisions to ensure Executives is first, or follow a specific order
  const orderedDivisions = [
    'Executives',
    'Education',
    'Human Resource Development',
    'Media & Information',
    'Relations'
  ];

  const sortedDivisions = divisions.sort((a, b) => {
    return orderedDivisions.indexOf(a.name) - orderedDivisions.indexOf(b.name);
  });

  return (
    <div className="bg-deep-navy pb-20">
      {sortedDivisions.map((division, index) => {
        const divisionMembers = groupMembersByDivision(members, division.name);
        const subdivisions = SUBDIVISIONS[division.name] || [];
        const accentColor = (DIVISION_ACCENTS[division.name] || 'text-blue-400').split(' ')[1];

        return (
          <section key={division._id} className="py-16 border-b border-white/5 last:border-0">
            <div className="container px-4 md:px-6">
              {/* Header */}
              <div className="mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="max-w-3xl"
                >
                  <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${accentColor}`}>
                    {division.name}
                  </h2>
                  <p className="text-slate-400 text-lg mb-6">
                    {division.description || `The ${division.name} division is an integral part of IEEE SB IPB, driving innovation and excellence in its specific domain.`}
                  </p>
                  
                  {/* Subdivisions */}
                  {subdivisions.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-8">
                      {subdivisions.map(sub => (
                        <span key={sub} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300">
                          {sub}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Members Carousel (Horizontal Scroll) */}
              <div className="relative">
                <div className="flex overflow-x-auto pb-8 gap-6 snap-x scrollbar-hide">
                  {divisionMembers.length > 0 ? (
                    divisionMembers.map((member) => (
                      <div key={member._id} className="snap-start">
                        <MemberCard member={member} />
                      </div>
                    ))
                  ) : (
                    <div className="w-full py-10 text-center border border-dashed border-white/10 rounded-xl text-slate-500">
                      No members found for this division.
                    </div>
                  )}
                </div>
                
                {/* Fade effect on right */}
                <div className="absolute right-0 top-0 bottom-8 w-24 bg-gradient-to-l from-deep-navy to-transparent pointer-events-none" />
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
