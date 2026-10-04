export interface DivisionMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

export interface DivisionDetail {
  id: string;
  name: string;
  nameLines: [string, string] | [string];
  shortName: string;
  category: string;
  description: string;
  groupPhoto: string;
  groupCaption: string;
  coverPhotos?: string[];
  isPixel?: boolean;
  members: DivisionMember[];
}

export const divisionsData: Record<string, DivisionDetail> = {
  hr: {
    id: "hr",
    name: "Human Resources",
    nameLines: ["Human", "Resources"],
    shortName: "Human Resources",
    category: "People & Organization",
    description:
      "Pengen ditaruh fungsi divisinya tapi kek ga perlu ga sih, kosong juga gapapa si. Mengelola pengembangan anggota, retensi talenta, serta membangun kultur organisasi yang suportif dan inklusif.",
    groupPhoto: "/foto-hr.jpeg",
    groupCaption: "Human Resources Team 2024/2025",
    members: [
      {
        name: "Aqila Syazana",
        role: "Director of Human Resources",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Puan Maharani",
        role: "Manager of Internal Human Resources",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Muhammad Revandi Aridya Pohan",
        role: "Manager of Member Development",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Anjani Febyta",
        role: "Officer of Recruitment and Retention",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Ferrel Hazza",
        role: "Officer of Recruitment and Retention",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Nadhira Putri",
        role: "Staff of People Operations",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Dimas Arya",
        role: "Staff of Internal Bonding",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Zahra Alifa",
        role: "Staff of Talent Development",
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
    ],
  },
  cnm: {
    id: "cnm",
    name: "Creative & Marketing",
    nameLines: ["Creative &", "Marketing"],
    shortName: "Creative & Marketing",
    category: "Media & Branding",
    description:
      "Consist the best of the best illustrators and graphic designers. Not to mention the various talent pool for content making, branding, and digital visual storytelling.",
    groupPhoto: "/foto-CnM.jpeg",
    groupCaption: "Creative & Marketing Team 2024/2025",
    members: [
      {
        name: "Daffa Pratama",
        role: "Director of Creative & Marketing",
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Raisa Amanda",
        role: "Manager of Creative Design",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Kevin Jonathan",
        role: "Manager of Digital Marketing",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Salsa Bila",
        role: "Officer of Social Media Management",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Raditya Putra",
        role: "Officer of Visual & Illustration",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Maya Anggraini",
        role: "Motion Graphic Designer",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Farhan Rizky",
        role: "Content Specialist",
        image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Tiara Salsabila",
        role: "UI/UX & Brand Designer",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
    ],
  },
  external: {
    id: "external",
    name: "External Relations",
    nameLines: ["External", "Relations"],
    shortName: "External Relations",
    category: "Partnership & Outreach",
    description:
      "Through the Partnership and Business Development subdivisions, this division forges meaningful collaborations and creates opportunities that extend IEEE SB IPB's reach beyond the organization.",
    groupPhoto: "/foto-external.jpeg",
    groupCaption: "External Relations Team 2024/2025",
    members: [
      {
        name: "Bintang Ramadhan",
        role: "Director of External Relations",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Cynthia Laura",
        role: "Manager of Partnership & Sponsorship",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Ahmad Fauzi",
        role: "Manager of Public Relations",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Alisha Zahra",
        role: "Officer of Institutional Outreach",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Galih Prakoso",
        role: "Officer of Media Partnership",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Rania Dewi",
        role: "Staff of External Communications",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Bagas Setiawan",
        role: "Staff of Sponsorship Liaison",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
    ],
  },
  executives: {
    id: "executives",
    name: "Executive Board",
    nameLines: ["Executive", "Board"],
    shortName: "Executives",
    category: "Leadership & Governance",
    description:
      "Leads overall strategic roadmap, administrative governance, financial sustainability, and fosters cross-divisional synergy to achieve IEEE SB IPB's highest milestones.",
    groupPhoto: "/foto-bph.jpeg",
    groupCaption: "Executive Board (BPH) 2024/2025",
    members: [
      {
        name: "Rafid Rabbani",
        role: "Chair of IEEE SB IPB",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Sarah Nadira",
        role: "Vice Chair of IEEE SB IPB",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Bryan Christopher",
        role: "Secretary General",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Amanda Clarissa",
        role: "Treasurer",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Fajar Maulana",
        role: "Vice Secretary",
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Jasmine Nurul",
        role: "Vice Treasurer",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
    ],
  },
  infor: {
    id: "infor",
    name: "Tech & Information",
    nameLines: ["Tech &", "Information"],
    shortName: "Tech & Information",
    category: "Engineering & Innovation",
    description:
      "Responsible for developing and maintaining IEEE SB IPB's digital ecosystem, web platforms, and engineering technical capabilities through hands-on development.",
    groupPhoto: "/foto-infor.jpeg",
    groupCaption: "Technology & Information Team 2024/2025",
    members: [
      {
        name: "Aditya Wicaksono",
        role: "Director of Tech & Information",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Rizky Maulana",
        role: "Manager of Web Development",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Nadia Safitri",
        role: "Manager of IT Infrastructure",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Daniel Steven",
        role: "Full-Stack Engineer",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Putri Handayani",
        role: "Frontend Developer",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Hendra Wijaya",
        role: "Backend & Systems Engineer",
        image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Syifa Azzahra",
        role: "DevOps & Cloud Specialist",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
    ],
  },
  edu: {
    id: "edu",
    name: "Education",
    nameLines: ["Education", "Division"],
    shortName: "Education",
    category: "Academic & Skill Building",
    description:
      "Consisting of the Academic and the Project & Competition subdivisions, this division is one of IEEE SB IPB's main drivers for technical workshops, study jams, and competitions.",
    groupPhoto: "/foto-edu.jpeg",
    groupCaption: "Education Team 2024/2025",
    members: [
      {
        name: "Faris Al-Ghifari",
        role: "Director of Education",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Melati Kusuma",
        role: "Manager of Academic Programs",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Ilham Saputra",
        role: "Manager of Project & Competition",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Dina Safira",
        role: "Officer of Workshop & Bootcamps",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Zaki Rahman",
        role: "Officer of Mentorship Program",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Alya Rahma",
        role: "Staff of Academic Curriculum",
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
      {
        name: "Fauzan Akbar",
        role: "Technical Mentor & Instructor",
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&h=800&q=80",
        linkedin: "https://www.linkedin.com",
      },
    ],
  },
};
