Create a full company-profile + blog website using Next.js (App Router) with TypeScript.  
The design should be minimalist, modern, clean, corporate, and tech-inspired with glassmorphism elements and a navy blue base palette inspired by IEEE IPB’s Instagram (@ieeesbipb).

TECH STACK:
- Next.js Latest Version with App Router + TypeScript
- Tailwind CSS (custom theme)
- shadcn-ui components
- Framer Motion for transitions and animations
- Sanity CMS v3 for content (including a Blog system)
- Integrate with next-sanity
- clsx for class helpers
- Deploy-ready for Vercel

DESIGN GUIDELINES:
- Fonts: Inter or Helvetica-like simple sans-serif
- Palette: Navy as primary + supporting accent colors derived from IEEE IPB palette (provide HEX in Tailwind config)
- Use glassmorphism on selective components (Hero card, navbar blur, section headers)
- Minimal line icons for services and contact
- Lots of whitespace and clean spacing
- Subtle gradients, nothing too flashy
- Smooth and minimal animations: fade, slide-up, scale

PAGES + SECTIONS TO BUILD (exclude testimonials):
1. HOME / COMPANY PROFILE
   - Hero: title, tagline, CTAs, glassmorphism panel, navy gradient background
   - About: mission, vision, values, company overview
   - Services: cards using shadcn Card with icons + mini descriptions
   - Team: grid of team members with circular photos and roles
   - Contact: contact form (POST API Route) + company contact info
   - Footer: minimal navy/corporate footer

2. BLOG (Full Sanity-powered)
   - Blog Index Page:
       • List all posts with title, excerpt, tags, date, thumbnail  
       • Use responsive grid cards  
       • Server-rendered using Sanity GROQ queries  
   - Blog Category Filtering (optional)
   - Blog Post Page:
       • Title, subtitle, published date  
       • Rich text body (render using @portabletext/react)  
       • Cover image  
       • Author name + photo  
       • Animated fade-in content  
       • Add table of contents (optional)  
   - Related posts section at bottom  
   - SEO-friendly metadata for all posts

SANITY CMS REQUIREMENTS:
Provide complete boilerplate including:
- `sanity.config.ts`
- Complete schema definitions:
    • post (title, slug, author, categories, publishedAt, coverImage, excerpt, body)
    • author (name, image, role)
    • category (title, slug)
    • siteSettings (title, description, socials)
    • service (title, description, icon)
    • teamMember (name, role, image)
    • about (mission, vision, description)
- GROQ queries for:
    • All posts  
    • Post by slug  
    • Latest posts  
    • Categories  
    • Services, Team, About, etc.
- `sanity/lib/client.ts` setup
- Optional prev


About Us Page
Create a dedicated /about page with the following structure and design requirements:

ABOUT PAGE STRUCTURE:
1. Introduction Section (IEEE SB IPB Overview)
   - Left: IEEE SB IPB logo (high resolution, responsive)
   - Right: A clean 2–3 paragraph description about IEEE SB IPB
   - Layout: 2-column responsive grid
   - Style: Slight glassmorphism card around the text or subtle navy gradient behind the section
   - Typography: clean, corporate, minimal

2. Vision & Mission Section
   - Subheading: “Vision” and “Mission”
   - Vision: 1 clear statement
   - Mission: 3–5 concise bullet points
   - Layout: vertical stacked section with subtle Framer Motion fade-in
   - Use shadcn Card or simple frosted container

3. Divisions Section
   - Title: “Our Divisions”
   - Divisions:
       • Education
       • Media & Information
       • Relations
       • Human Resource Development
       • Executives
   - Show as 5 cards or glassmorphism tiles in a grid (2x3 or responsive 3-column)
   - Each card includes:
       • Division name
       • 1–2 sentence description (Sanity-powered content)
       • Minimalist icon for each division
   - Add hover animation using Framer Motion (soft scale or translate)

SANITY CMS REQUIREMENTS FOR ABOUT PAGE:
- Create schemas:
    • aboutPage: introText, vision, mission[], divisions[]
    • division: name, description, icon (optional)
- Provide GROQ queries to fetch:
    • About introduction content
    • Vision + mission
    • Division list
- The /about page must be server-rendered using Sanity data

NEXT.JS BUILT PAGE:
- Route: `app/about/page.tsx`
- Import all content from Sanity via server component
- Use Tailwind for responsive grid
- Use shadcn components for cards & layout spacing
- Add Framer Motion entry animations (minimal, elegant)
