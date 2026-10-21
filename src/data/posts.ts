export interface PostItem {
  id: string;
  title: string;
  type: string;
  author: string;
  image: string;
  slug: string;
}

export const featuredPosts: PostItem[] = [
  {
    id: "f-1",
    title: "Precision Agriculture: Using Autonomous Drones for High-Yield Crop Monitoring",
    type: "Tech Insight",
    author: "Naufal Farkova",
    image: "https://picsum.photos/seed/drone-tech/1024/600",
    slug: "precision-agriculture-drones",
  },
  {
    id: "f-2",
    title: "How the Activated Sludge Process Powers Modern Urban Wastewater Treatment",
    type: "Tech Insight",
    author: "Naufal Farkova",
    image: "https://picsum.photos/seed/sludge-water/1024/600",
    slug: "activated-sludge-wastewater",
  },
  {
    id: "f-3",
    title: "Biomimetic Sensors: Harnessing Botanical Mechanisms for Next-Gen Robotics",
    type: "Tech Insight",
    author: "Naufal Farkova",
    image: "https://picsum.photos/seed/bio-botany/1024/600",
    slug: "biomimetic-sensors-robotics",
  },
];

export const recentPosts: PostItem[] = [
  {
    id: "r-1",
    title: "How the Activated Sludge Process Powers Modern Urban...",
    type: "Tech Insight",
    author: "Naufal Farkova",
    image: "https://picsum.photos/seed/urban-infra/600/340",
    slug: "urban-wastewater-infra",
  },
  {
    id: "r-2",
    title: "How the Activated Sludge Process Powers Modern Urban...",
    type: "Tech Insight",
    author: "Naufal Farkova",
    image: "https://picsum.photos/seed/smart-terrace/600/340",
    slug: "iot-smart-farming-terrace",
  },
  {
    id: "r-3",
    title: "How the Activated Sludge Process Powers Modern Urban...",
    type: "Tech Insight",
    author: "Naufal Farkova",
    image: "https://picsum.photos/seed/solar-sunset/600/340",
    slug: "renewable-energy-monitoring",
  },
  {
    id: "r-4",
    title: "How the Activated Sludge Process Powers Modern Urban...",
    type: "Tech Insight",
    author: "Naufal Farkova",
    image: "https://picsum.photos/seed/effluent-lab/600/340",
    slug: "biological-effluent-analysis",
  },
];

// Re-export Sanity backend types for convenience
export type {
  NewsCategory,
  NewsItem,
  NewsInlineImage,
  NewsBlockContent,
} from '../sanity/types';
