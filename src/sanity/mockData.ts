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
    year: '2025',
    description: '',
    floatingImages: [
      { url: '/hero-rafid.png', alt: 'IEEE Event 2025 group photo' },
      { url: '/post-cover-dummy.png', alt: 'Community Workshop' },
    ],
  },
  {
    year: '2026',
    description:
      'IEEE SB IPB beli cilor di warung mang ujang dengan kebanggaan yang tak terhingga, bahkan rektor pun turut memberi apresiasi atas pencapaian ini luar biasa ini',
    floatingImages: [
      { url: '/hero-rafid.png', alt: 'IEEE SB IPB celebration' },
      { url: '/post-cover-dummy.png', alt: 'Award ceremony' },
      { url: '/hero-rafid.png', alt: 'Campus activity' },
    ],
  },
];
