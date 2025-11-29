import { client } from '@/sanity/lib/client';
import { aboutPageQuery, divisionsQuery } from '@/sanity/lib/queries';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import AboutContent from '@/components/sections/AboutContent';

export const metadata: Metadata = {
  title: 'About Us | IEEE Student Branch IPB',
  description: 'Learn about IEEE Student Branch IPB - our mission, vision, divisions, and commitment to advancing technology for humanity.',
};

interface AboutPageData {
  title: string;
  logo?: any;
  introText: any;
  vision: string;
  mission: string[];
}

interface Division {
  _id: string;
  name: string;
  description: string;
  icon?: string;
  order: number;
}

async function getAboutData(): Promise<AboutPageData | null> {
  const data = await client.fetch(aboutPageQuery);
  return data;
}

async function getDivisions(): Promise<Division[]> {
  const data = await client.fetch(divisionsQuery);
  return data;
}

export default async function AboutPage() {
  const aboutData = await getAboutData();
  const divisions = await getDivisions();

  // Fallback data if Sanity is not configured yet
  const defaultAboutData: AboutPageData = {
    title: 'About IEEE SB IPB',
    introText: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'IEEE Student Branch IPB is a vibrant community of engineering and technology enthusiasts at Institut Pertanian Bogor. As part of the world\'s largest technical professional organization, we are committed to advancing innovation for the benefit of humanity.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Through workshops, competitions, seminars, and collaborative projects, we provide our members with opportunities to enhance their technical skills, build professional networks, and contribute to meaningful projects that make a difference in society.',
          },
        ],
      },
    ],
    vision: 'To be a leading student organization that cultivates future technology leaders and innovators who contribute to global technological advancement and social progress.',
    mission: [
      'Foster technological innovation through hands-on projects and research initiatives',
      'Advance professional development through workshops, seminars, and mentorship programs',
      'Build a collaborative community that bridges academia and industry',
      'Promote technical excellence and ethical practices in engineering',
      'Contribute to sustainable development and social impact through technology',
    ],
  };

  const defaultDivisions: Division[] = [
    {
      _id: '1',
      name: 'Education',
      description: 'Organizing workshops, seminars, and training programs to enhance technical knowledge and skills of our members.',
      icon: 'BookOpen',
      order: 1,
    },
    {
      _id: '2',
      name: 'Media & Information',
      description: 'Managing communications, social media, publications, and branding to showcase our activities and achievements.',
      icon: 'Users',
      order: 2,
    },
    {
      _id: '3',
      name: 'Relations',
      description: 'Building partnerships with industry, academia, and other organizations to create opportunities for collaboration.',
      icon: 'Briefcase',
      order: 3,
    },
    {
      _id: '4',
      name: 'Human Resource Development',
      description: 'Supporting member growth through leadership programs, team building, and personal development initiatives.',
      icon: 'Heart',
      order: 4,
    },
    {
      _id: '5',
      name: 'Executives',
      description: 'Providing strategic direction, governance, and coordination across all divisions to achieve our organizational goals.',
      icon: 'Zap',
      order: 5,
    },
  ];

  return (
    <>
      <Navbar />
      <AboutContent
        aboutData={aboutData || defaultAboutData}
        divisions={divisions.length > 0 ? divisions : defaultDivisions}
      />
      <Footer />
    </>
  );
}
