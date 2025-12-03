import { client } from '@/sanity/lib/client';
import { aboutPageQuery, divisionsWithMembersQuery } from '@/sanity/lib/queries';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import AboutHero from '@/components/about/AboutHero';
import VisionMission from '@/components/about/VisionMission';
import RoadmapHistory from '@/components/about/RoadmapHistory';
import StatsOverview from '@/components/about/StatsOverview';
import DivisionsSection from '@/components/about/DivisionsSection';
import CTASection from '@/components/about/CTASection';

export const metadata: Metadata = {
  title: 'About Us | IEEE Student Branch IPB',
  description: 'Learn about IEEE Student Branch IPB - our mission, vision, divisions, and commitment to advancing technology for humanity.',
};

// Helper to convert Portable Text to string
function blocksToText(blocks: any[] = []) {
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      return block.children.map((child: any) => child.text).join('');
    })
    .join('\n\n');
}

export const revalidate = 60;

export default async function AboutPage() {
  // Fetch all data in parallel
  const [aboutData, fetchedDivisions] = await Promise.all([
    client.fetch(aboutPageQuery),
    client.fetch(divisionsWithMembersQuery)
  ]);

  // Placeholder divisions if Sanity is empty
  const placeholderDivisions = [
    {
      _id: 'exec',
      name: 'Executives',
      description: 'The core leadership team responsible for strategic direction, operations, and overall management of the student branch.',
      subdivisions: ['President', 'Vice President of External', 'Vice President of Internal', 'Treasurer', 'Secretary'],
      members: [
        { _id: 'm1', name: 'Sarah Johnson', role: 'President', subdivision: 'President', image: null },
        { _id: 'm2', name: 'Michael Chen', role: 'VP External', subdivision: 'Vice President of External', image: null },
        { _id: 'm2b', name: 'Emily Davis', role: 'VP Internal', subdivision: 'Vice President of Internal', image: null },
        { _id: 'm3', name: 'Jessica Pratama', role: 'Secretary', subdivision: 'Secretary', image: null },
        { _id: 'm4', name: 'David Kim', role: 'Treasurer', subdivision: 'Treasurer', image: null },
      ]
    },
    {
      _id: 'edu',
      name: 'Education',
      description: 'Dedicated to organizing workshops, seminars, and study groups to enhance technical skills and academic knowledge.',
      subdivisions: ['Project', 'Academic'],
      members: [
        { _id: 'm5', name: 'Alex Turner', role: 'Head of Project', subdivision: 'Project', image: null },
        { _id: 'm6', name: 'Emily White', role: 'Head of Academic', subdivision: 'Academic', image: null },
      ]
    },
    {
      _id: 'hrd',
      name: 'Human Resource Development',
      description: 'Focuses on member recruitment, retention, and professional development activities to build a strong community.',
      subdivisions: ['RnR', 'Internal Development'],
      members: [
        { _id: 'm8', name: 'Lisa Wong', role: 'Head of RnR', subdivision: 'RnR', image: null },
        { _id: 'm9', name: 'Tom Holland', role: 'Head of Internal Dev', subdivision: 'Internal Development', image: null },
      ]
    },
    {
      _id: 'media',
      name: 'Media & Information',
      description: 'Manages the branch\'s online presence, content creation, and communication channels.',
      subdivisions: ['Creative', 'Information'],
      members: [
        { _id: 'm10', name: 'Afdha', role: 'Officer', subdivision: 'Creative', image: '/team/Media & Information_Creative_Officer_Afdha.png' },
        { _id: 'm11', name: 'Scarlett Jo', role: 'Information Officer', subdivision: 'Information', image: null },
      ]
    },
    {
      _id: 'rel',
      name: 'Relations',
      description: 'Builds and maintains partnerships with other student branches, industry partners, and the university administration.',
      subdivisions: ['Marketing', 'Partnership'],
      members: [
        { _id: 'm13', name: 'Robert Downey', role: 'Head of Marketing', subdivision: 'Marketing', image: null },
        { _id: 'm14', name: 'Elizabeth Olsen', role: 'Head of Partnership', subdivision: 'Partnership', image: null },
      ]
    }
  ];

  const divisions = fetchedDivisions.length > 0 ? fetchedDivisions : placeholderDivisions;

  // Fallback data if Sanity is empty
  const heroTitle = aboutData?.title || 'IEEE Student Branch IPB University';
  const heroIntro = aboutData?.introText 
    ? blocksToText(aboutData.introText) 
    : 'IEEE Student Branch IPB University is a student-led organization dedicated to advancing technology for humanity. We foster innovation, technical excellence, and professional growth among students.';
  
  const vision = aboutData?.vision || 'To be the leading student organization in fostering technical innovation and professional excellence.';
  const mission = aboutData?.mission || [
    'Provide a platform for students to develop technical skills',
    'Foster a community of innovation and collaboration',
    'Connect students with industry professionals and opportunities'
  ];

  const timeline = aboutData?.timeline || [];
  const stats = aboutData?.stats || {
    activeMembers: 56,
    divisionsCount: 5,
    eventsHosted: 10,
    awardsWon: 3
  };

  return (
    <main className="min-h-screen bg-deep-navy">
      <Navbar />
      
      <AboutHero 
        title={heroTitle}
        description={heroIntro}
      />

      <VisionMission 
        vision={vision}
        mission={mission}
      />

      <RoadmapHistory timeline={timeline} />

      <StatsOverview stats={stats} />

      <DivisionsSection divisions={divisions} />

      <CTASection />

      <Footer />
    </main>
  );
}
