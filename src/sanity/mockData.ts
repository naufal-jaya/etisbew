export interface PartnerItem {
  name: string;
  logo: any;
}

export interface MilestoneItem {
  year: string;
  description: string;
  floatingImages?: any[];
}

export const fallbackPartners: PartnerItem[] = [
  // Row 1
  { name: 'Caffeine Singapore', logo: '/partners/caffeine.svg' },
  { name: 'IEEE UB Student Branch', logo: '/partners/ieee-ub.svg' },
  { name: 'idBattery', logo: '/partners/idbattery.svg' },
  { name: 'Saga University', logo: '/partners/saga-university.svg' },
  { name: 'CTSS', logo: '/partners/ctss.svg' },
  { name: 'INFIEN', logo: '/partners/infien.svg' },
  { name: 'Green Welfare .id', logo: '/partners/green-welfare.svg' },

  // Row 2
  { name: 'CTSS', logo: '/partners/ctss.svg' },
  { name: 'Green Welfare .id', logo: '/partners/green-welfare.svg' },
  { name: 'INFIEN', logo: '/partners/infien.svg' },
  { name: 'Caffeine Singapore', logo: '/partners/caffeine.svg' },
  { name: 'IEEE UB Student Branch', logo: '/partners/ieee-ub.svg' },
  { name: 'idBattery', logo: '/partners/idbattery.svg' },
  { name: 'Saga University', logo: '/partners/saga-university.svg' },
];

export const fallbackMilestones: MilestoneItem[] = [
  {
    year: '2024',
    description:
      'Inisiasi pembentukan IEEE SB IPB dengan berbagai kolaborasi awal, workshop teknologi perdana, serta peletakan fondasi komunitas riset dan inovasi mahasiswa.',
    floatingImages: [
      { url: '/history-bg-1.png', alt: 'IEEE Workshop 2024' },
      { url: '/history-bg-2.png', alt: 'Peresmian Komunitas' },
    ],
  },
  {
    year: '2025',
    description:
      'Ekspansi kemitraan strategis internasional dan penyelenggaraan hackathon skala nasional dengan ratusan inovator muda dari berbagai universitas terkemuka.',
    floatingImages: [
      { url: '/history-bg-3.png', alt: 'IEEE Event 2025 group photo' },
      { url: '/history-bg-4.png', alt: 'Community Workshop' },
    ],
  },
  {
    year: '2026',
    description:
      'IEEE SB IPB beli cilor di warung mang ujang dengan kebanggaan yang tak terhingga, bahkan rektor pun turut memberi apresiasi atas pencapaian ini luar biasa ini',
    floatingImages: [
      { url: '/history-bg-1.png', alt: 'IEEE SB IPB celebration' },
      { url: '/history-bg-2.png', alt: 'Award ceremony' },
      { url: '/history-bg-3.png', alt: 'Campus activity' },
      { url: '/history-bg-4.png', alt: 'Campus activity 2' },
      { url: '/history-bg-1.png', alt: 'Campus activity 3' },
    ],
  },
];
