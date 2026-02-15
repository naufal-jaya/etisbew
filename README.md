# IEEE Student Branch IPB Website

## Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Headless CMS**: Sanity v3 for content management with rich text editing
- **Full Blog System**: Blog with categories, tags, and related posts
- **Responsive Design**: Mobile-first, fully responsive layout
- **Glassmorphism UI**: Modern semi-transparent design elements with blur effects
- **Smooth Animations**: Framer Motion for elegant transitions
- **SEO Optimized**: Meta tags, semantic HTML, and optimized images
- **Component Library**: shadcn-ui components with custom styling

## Prerequisites

Before you begin, ensure you have installed:
- Node.js 18.x or higher
- npm, yarn, or pnpm package manager
- Git

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <directory-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Update the following environment variables:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_API_TOKEN=your_token_here
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

## Sanity CMS Setup

1. **Create a Sanity account**
   - Go to [sanity.io](https://www.sanity.io/)
   - Sign up or log in

2. **Create a new project**
   ```bash
   npm create sanity@latest
   ```
   
   Or use the Sanity dashboard to create a new project

3. **Get your Project ID**
   - Find it in your Sanity dashboard
   - Add it to your `.env.local` file

4. **Create an API token**
   - Go to your Sanity project settings
   - Navigate to API → Tokens
   - Create a new token with "Editor" permissions
   - Add it to your `.env.local` file

5. **Access Sanity Studio**
   - Run the development server
   - Navigate to `http://localhost:3000/studio`
   - Log in with your Sanity credentials

## Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

Access Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio).

## Project Structure

```
Web IEEE/
├── app/                      # Next.js App Router pages
│   ├── blog/                # Blog pages
│   │   ├── [slug]/         # Dynamic blog post pages
│   │   └── page.tsx        # Blog listing page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/              # React components
│   ├── layout/             # Layout components (Navbar)
│   ├── sections/           # Page sections (Hero, About, Services, etc.)
│   └── ui/                 # UI components (Button, Card, Input, etc.)
├── lib/                     # Utility functions
│   └── utils.ts            # Helper functions
├── sanity/                  # Sanity CMS configuration
│   ├── lib/                # Sanity client and utilities
│   │   ├── client.ts       # Sanity client setup
│   │   ├── image.ts        # Image URL builder
│   │   └── queries.ts      # GROQ queries
│   └── schemas/            # Content schemas
│       ├── about.ts        # About schema
│       ├── author.ts       # Author schema
│       ├── blockContent.ts # Rich text schema
│       ├── category.ts     # Category schema
│       ├── post.ts         # Blog post schema
│       ├── service.ts      # Service schema
│       ├── siteSettings.ts # Site settings schema
│       └── teamMember.ts   # Team member schema
├── .env.example            # Environment variables template
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies
├── postcss.config.js       # PostCSS configuration
├── sanity.config.ts        # Sanity Studio configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Design System

### Color Palette

Based on IEEE IPB's branding:

- **Navy Blue (Primary)**: `#003C7D` - Main brand color
- **Accent Colors**:
  - Cyan: `#00A9E0`
  - Blue: `#00629B`
  - Teal: `#0097A9`
  - Gold: `#FFB81C`

### Typography

- **Font Family**: Inter (fallback: Helvetica, Arial, sans-serif)
- **Font Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Glassmorphism

Three utility classes for glassmorphism effects:
- `.glass` - Light glass effect
- `.glass-card` - Card glass effect with more opacity
- `.glass-dark` - Dark glass effect for hero sections

---

**IEEE Student Branch IPB** - Advancing Technology for Humanity
