Create a full About Us page design for a Next.js website with the following detailed specifications. This page 
is specifically for “IEEE Student Branch IPB University”.

REFERENCE:
Use https://ayiic-website.vercel.app/about as a structural and animation reference, but adapt it to a more 
minimalist, navy-themed, professional, and tech-ish identity aligned with IEEE SB IPB branding.

GENERAL DESIGN STYLE:
- Minimalist, modern, clean, and professional
- Navy blue as the primary base color with light neutrals
- Each division has its own subtle accent color
- Clean white background throughout the entire page
- Typography similar to Helvetica or Inter
- Rounded corners on all cards, images, and sections
- Subtle geometric accents (thin-line tech patterns, grids, wave lines)
- Smooth animations (fade-in, slide-up, gentle transitions) suitable for Framer Motion
- Subtle glassmorphism used sparingly (e.g., card overlays)
- Responsive and mobile-friendly

GENERAL DEVELOPMENT GUIDELINES (for Next.js):
- Structure the page into clear, modular components (HeroSection, RoadmapHistory, DivisionsSection, etc.)
- Design must be simple to implement using Next.js + Tailwind CSS
- Animations must be replicable with Framer Motion
- Favor clean spacing and reusable design patterns

PAGE STRUCTURE:

1. <HeroSection />
   - Large headline introducing “IEEE Student Branch IPB University”
   - 2–3 sentence detailed description explaining what IEEE SB IPB is
   - Logo on the left, description on the right (cleanly aligned)
   - Subtle geometric background behind the hero section
   - Smooth fade-in animation

2. <VisionMission />
   - Two rounded cards: Vision and Mission
   - Subtle glassmorphism card style
   - Minimal icons for each
   - Clean two-column layout on desktop, stacked on mobile

3. <RoadmapHistory />
   - A vertical timeline showcasing the history of IEEE SB IPB University starting from 2020 → 2021 → 2022 → 2023 → 2024 → 2025
   - Each year includes:
     • A short milestone or explanation
     • A small representative image (rounded corners)
     • A clean “node” with a vertical connecting line
   - Alternating left/right content layout
   - Smooth scrolling/appearance animations

4. <StatsOverview />
   - Rounded stat cards with navy accent
   - Clean white background
   - Include stats such as:
     • Total Divisions: 5
     • Total Members: (placeholder number)
     • Years of Establishment: Since 2020
   - Minimal and modern layout

5. <DivisionsSection />
   Create a **full-width section for each division**, not just cards. Divisions include:
   - Executives
   - Education
   - Human Resource Development (HRD)
   - Media & Information
   - Relations

   Each division section consists of:
   a. Division Title
   b. Short descriptive paragraph
   c. List of subdivisions:
      • Education → Academic, Project
      • HRD → RnR, Internal Development
      • Media & Information → Creative, Information
      • Relations → Marketing, Partnership
      • Executives (no subdivisions)
   d. Members Carousel:
      - Horizontal carousel slider
      - Member cards include:
        • Rounded rectangular profile photo
        • Name
        • Division
        • Subdivision
      - Card style should include each division’s unique accent color
      - Smooth sliding animations (Framer Motion friendly)
      - Minimalistic layout, clean space between cards

   Additional styling:
   - Keep backgrounds fully white
   - Use subtle geometric accents behind section headers
   - Keep each division visually distinct but still consistent

6. <CTASection />
   - Clean final call-to-action
   - Rounded navy button
   - Minimal text encouraging users to continue or contact

ADDITIONAL REQUIREMENTS:
- Maintain consistent spacing, visual hierarchy, and alignment
- Ensure all elements translate cleanly into modular Next.js components
- Keep animations subtle and professional
- Preserve the minimalist but tech-influenced IEEE visual identity
- Ensure readability and clarity across all device sizes

Generate the complete About Us page design following these specifications.
