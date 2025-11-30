import { client } from '@/sanity/lib/client';
import { aboutPageQuery, divisionsQuery, allTeamMembersQuery } from '@/sanity/lib/queries';
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

export default async function AboutPage() {
  // Fetch all data in parallel
  const [aboutData, divisions, members] = await Promise.all([
    client.fetch(aboutPageQuery),
    client.fetch(divisionsQuery),
    client.fetch(allTeamMembersQuery)
  ]);

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

  // Placeholder data for Divisions if Sanity is empty
  const placeholderDivisions = [
    { _id: '1', name: 'Executives', description: 'Leading the strategic direction and overall management of the student branch.', order: 1 },
    { _id: '2', name: 'Education', description: 'Fostering academic growth and technical skills through workshops and projects.', order: 2 },
    { _id: '3', name: 'Human Resource Development', description: 'Nurturing talent and building a strong, cohesive community within the branch.', order: 3 },
    { _id: '4', name: 'Media & Information', description: 'Managing the brand identity and disseminating information creatively.', order: 4 },
    { _id: '5', name: 'Relations', description: 'Building bridges with external partners, sponsors, and the global IEEE network.', order: 5 },
  ];

  // Placeholder data for Members if Sanity is empty
  const placeholderMembers = [
    { _id: 'm1', name: 'John Doe', role: 'Chairperson', division: { _id: '1', name: 'Executives' }, subdivision: '' },
    { _id: 'm2', name: 'Jane Smith', role: 'Head of Education', division: { _id: '2', name: 'Education' }, subdivision: 'Academic' },
    { _id: 'm3', name: 'Mike Johnson', role: 'Project Lead', division: { _id: '2', name: 'Education' }, subdivision: 'Project' },
    { _id: 'm4', name: 'Sarah Williams', role: 'HR Director', division: { _id: '3', name: 'Human Resource Development' }, subdivision: 'Internal Development' },
    { _id: 'm5', name: 'David Brown', role: 'Creative Lead', division: { _id: '4', name: 'Media & Information' }, subdivision: 'Creative' },
    { _id: 'm6', name: 'Emily Davis', role: 'Partnership Manager', division: { _id: '5', name: 'Relations' }, subdivision: 'Partnership' },
  ];

  const displayDivisions = (divisions && divisions.length > 0) ? divisions : placeholderDivisions;
  const displayMembers = (members && members.length > 0) ? members : placeholderMembers;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <AboutHero 
        title={heroTitle}
        introText={heroIntro}
        logo={aboutData?.logo}
      />
      
      <VisionMission 
        vision={vision}
        mission={mission}
      />
      
      <RoadmapHistory />
      
      <StatsOverview />
      
      <DivisionsSection 
        divisions={displayDivisions}
        members={displayMembers}
      />
      
      <CTASection />
      
      <Footer />
    </main>
  );
}
