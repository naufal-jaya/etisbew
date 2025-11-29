'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Linkedin, Mail } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Chairperson',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      linkedin: '#',
      email: 'john@ieee.ipb.ac.id',
    },
    {
      name: 'Jane Smith',
      role: 'Vice Chairperson',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      linkedin: '#',
      email: 'jane@ieee.ipb.ac.id',
    },
    {
      name: 'Michael Chen',
      role: 'Technical Lead',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      linkedin: '#',
      email: 'michael@ieee.ipb.ac.id',
    },
    {
      name: 'Sarah Johnson',
      role: 'Events Coordinator',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      linkedin: '#',
      email: 'sarah@ieee.ipb.ac.id',
    },
    {
      name: 'David Lee',
      role: 'Media & Communications',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      linkedin: '#',
      email: 'david@ieee.ipb.ac.id',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Treasurer',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      linkedin: '#',
      email: 'emily@ieee.ipb.ac.id',
    },
  ];

  return (
    <section id="team" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-700 mb-4">
            Our <span className="text-accent-cyan">Team</span>
          </h2>
          <div className="w-20 h-1 bg-accent-cyan mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated individuals who drive our mission forward and
            make IEEE Student Branch IPB a thriving community.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300">
                {/* Profile Image */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-500 to-accent-cyan rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="rounded-full border-4 border-white shadow-lg"
                  />
                </div>

                {/* Member Info */}
                <h3 className="text-xl font-bold text-navy-700 mb-2">
                  {member.name}
                </h3>
                <p className="text-accent-cyan font-medium mb-4">
                  {member.role}
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  <a
                    href={member.linkedin}
                    className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center text-navy-600 hover:bg-navy-500 hover:text-white transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center text-navy-600 hover:bg-navy-500 hover:text-white transition-colors duration-300"
                    aria-label="Email"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
