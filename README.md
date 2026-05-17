# IEEE Student Branch IPB Website

Official website for IEEE Student Branch IPB, built with Next.js, Tailwind CSS, and Sanity CMS.

## Features

- **Modern Tech Stack**: Next.js 15 with App Router, React, TypeScript, and Tailwind CSS
- **Headless CMS**: Sanity v4 with embedded Studio at `/studio`
- **Content Pages**: Home, About, News, Blog, and dynamic detail pages
- **Responsive Design**: Mobile-first layout for desktop, tablet, and mobile screens
- **Animations**: Framer Motion and GSAP for interactive page transitions and effects
- **SEO Ready**: Metadata, semantic page structure, and optimized image handling
- **Reusable Components**: Shared layout, UI, home, about, and news components

## Prerequisites

Before you begin, make sure you have installed:

- Node.js 18.x or higher
- npm
- Git

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file:

   ```bash
   cp .env.example .env.local
   ```

3. Fill in the required Sanity values in `.env.local`:

   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

   Other values may exist in `.env.example`, but they are not required for the current README setup flow.

## Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

Sanity Studio is available at [http://localhost:3000/studio](http://localhost:3000/studio).

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Routes

- `/` - Home page
- `/about` - About page
- `/news` - News listing page
- `/news/[slug]` - News detail page
- `/blog` - Blog listing page
- `/blog/[slug]` - Blog detail page
- `/studio` - Sanity Studio

## Project Structure

```text
ieeesbipb/
|-- app/                    # Next.js App Router pages
|   |-- about/              # About page
|   |-- blog/               # Blog listing and detail pages
|   |-- news/               # News listing and detail pages
|   |-- studio/             # Embedded Sanity Studio route
|   |-- globals.css         # Global styles and utility classes
|   |-- layout.tsx          # Root layout and metadata
|   `-- page.tsx            # Home page
|-- components/             # React components
|   |-- about/              # About page sections
|   |-- home/               # Home page sections
|   |-- layout/             # Navbar and Footer
|   |-- news/               # News-specific components
|   `-- ui/                 # Shared UI primitives
|-- lib/                    # Shared utilities
|-- public/                 # Static assets
|-- sanity/                 # Sanity client, schemas, structure, and config
|-- types/                  # Shared TypeScript types
|-- .env.example            # Environment variable template
|-- next.config.mjs         # Next.js configuration
|-- package.json            # Scripts and dependencies
|-- postcss.config.mjs      # PostCSS configuration
|-- sanity.config.ts        # Sanity Studio configuration
|-- tailwind.config.ts      # Tailwind CSS configuration
`-- tsconfig.json           # TypeScript configuration
```

## Sanity CMS

The project already includes Sanity configuration and schemas. To connect the site to a Sanity project:

1. Create or open a Sanity project from the Sanity dashboard.
2. Copy the project ID into `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. Set `NEXT_PUBLIC_SANITY_DATASET`, usually `production`.
4. Run the development server and open `/studio`.

The Sanity API version defaults to `2026-01-15` in `sanity/env.ts` when `NEXT_PUBLIC_SANITY_API_VERSION` is not provided.

## Design Notes

- Primary brand color: `#003C7D`
- Accent colors include cyan `#00A9E0`, blue `#00629B`, teal `#0097A9`, and gold `#FFB81C`
- Main font: Inter
- Decorative display font: Playfair Display
- Global glass utilities are defined in `app/globals.css`

---

**IEEE Student Branch IPB** - Advancing Technology for Humanity
