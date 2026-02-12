# Caius Personal Page - Product Requirements Document

> **Version**: 1.0.0  
> **Last Updated**: 2026-02-12  
> **Author**: Caius

---

## 1. Project Overview

### 1.1 Project Positioning
A modern personal portfolio website that combines **location-based attractions discovery** with a **technical blog**. The site showcases nearby scenic spots based on the visitor's geolocation while providing a platform for sharing technical insights and personal notes.

### 1.2 Target Users
- **General Visitors**: Discover nearby attractions through an intuitive card-based interface
- **Potential Employers/Collaborators**: Learn about technical skills and project experience
- **Tech Enthusiasts**: Read technical blog posts and development insights

### 1.3 Core Value Proposition
| Feature | Value |
|---------|-------|
| Location-aware | Personalized attraction recommendations based on user location |
| Visual-first | Beautiful photo cards powered by Unsplash |
| Developer Blog | Share technical knowledge and learning notes |
| Modern Stack | Built with Next.js 16, React 19, ready for Vercel deployment |

---

## 2. Feature Specifications

### 2.1 Homepage - Nearby Attractions

#### User Flow
```
┌─────────────────────────────────────────────────────────────┐
│                    User visits homepage                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Request browser geolocation                     │
│              (navigator.geolocation API)                     │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
         [Allowed]                       [Denied/Error]
              │                               │
              ▼                               ▼
┌──────────────────────┐        ┌──────────────────────────────┐
│  Use browser coords  │        │  Fallback: IP geolocation    │
│  (lat, lng)          │        │  (ipapi.co/json)             │
└──────────────────────┘        └──────────────────────────────┘
              │                               │
              │               ┌───────────────┴───────────────┐
              │               │                               │
              │          [Success]                       [Failed]
              │               │                               │
              │               ▼                               ▼
              │    ┌──────────────────┐        ┌──────────────────────┐
              │    │  Use IP coords   │        │  Use default coords  │
              │    └──────────────────┘        │  (Beijing: 39.9, 116.4)│
              │               │               └──────────────────────┘
              └───────────────┼───────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Call Amap POI API                          │
│         GET /place/around?location={lng},{lat}              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│               Fetch photos from Unsplash                     │
│         GET /search/photos?query={attraction_name}          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Render attraction cards grid                    │
└─────────────────────────────────────────────────────────────┘
```

#### Card Display Elements
- **Photo**: High-quality image from Unsplash (lazy loaded)
- **Name**: Attraction name from Amap
- **Distance**: Calculated distance from user location
- **Rating**: Star rating if available
- **Tags**: Category tags (scenic, park, museum, etc.)
- **Action**: Click to view details or get directions

#### Technical Requirements
- Loading skeleton while fetching data
- Error state with retry button
- Empty state when no attractions found
- Responsive grid: 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop)

---

### 2.2 Explore Page - Search Attractions

#### Features
| Feature | Description |
|---------|-------------|
| **Search Bar** | Text input with debounce (300ms) |
| **Category Filter** | Dropdown: All, Scenic, Museum, Park, Temple, etc. |
| **Distance Filter** | Range: 1km, 5km, 10km, 50km |
| **Sort Options** | Distance, Rating, Name |
| **Results Grid** | Same card component as homepage |
| **Pagination** | Infinite scroll with "Load More" fallback |

#### Search Flow
```
User Input → Debounce (300ms) → API Call → Update Results
```

#### API Endpoint
```
GET /api/attractions?q={query}&category={cat}&radius={km}&sort={field}&page={n}
```

---

### 2.3 Blog Module

#### Content Management
- **Location**: `/content/blog/` directory
- **Format**: Markdown (.md) with YAML frontmatter
- **Support**: MDX for interactive components (optional)

#### Frontmatter Schema
```yaml
---
title: "Post Title"
date: "2026-02-12"
description: "Brief description for SEO and previews"
tags: ["nextjs", "react", "typescript"]
category: "development"
published: true
cover: "/images/blog/post-cover.jpg"  # optional
---
```

#### Blog Features
| Feature | Description |
|---------|-------------|
| **List Page** | Card grid with title, date, description, tags |
| **Detail Page** | Full article with TOC, reading time |
| **Tag Filter** | Filter posts by tag |
| **Category Filter** | Filter posts by category |
| **RSS Feed** | Auto-generated RSS at `/blog/rss.xml` |
| **Search** | Full-text search within blog posts |

#### URL Structure
- `/blog` - Blog list page
- `/blog/{slug}` - Individual post
- `/blog/tag/{tag}` - Posts filtered by tag

---

### 2.4 About Page

#### Content Sections
1. **Hero Section**: Profile photo, name, tagline
2. **Introduction**: Personal bio and background
3. **Skills**: Tech stack with proficiency indicators
4. **Timeline**: Career/education milestones (optional)
5. **Contact**: Email, GitHub, LinkedIn, other social links

---

## 3. Technical Architecture

### 3.1 Directory Structure
```
caius-paged/
├── app/
│   ├── (main)/                    # Route group with shared layout
│   │   ├── layout.tsx             # Header + Footer + Navigation
│   │   ├── page.tsx               # Homepage (nearby attractions)
│   │   ├── explore/
│   │   │   └── page.tsx           # Search attractions
│   │   ├── blog/
│   │   │   ├── page.tsx           # Blog list
│   │   │   └── [slug]/page.tsx    # Blog detail
│   │   └── about/
│   │       └── page.tsx           # About page
│   ├── api/
│   │   ├── attractions/
│   │   │   ├── route.ts           # Search attractions
│   │   │   └── nearby/route.ts    # Nearby attractions
│   │   └── blog/
│   │       └── route.ts           # Blog API
│   ├── config/                    # Configuration modules
│   │   ├── api/                   # API-specific configs
│   │   ├── index.ts
│   │   ├── constants.ts
│   │   ├── env.config.ts
│   │   ├── site.config.ts
│   │   ├── routes.config.ts
│   │   └── cache.config.ts
│   ├── layout.tsx                 # Root layout
│   └── globals.css
├── components/
│   ├── ui/                        # Base components (Button, Card, Input)
│   ├── layout/                    # Header, Footer, Navigation
│   └── features/
│       ├── attractions/           # AttractionCard, AttractionGrid
│       └── blog/                  # BlogCard, BlogList, TOC
├── lib/
│   ├── api/                       # API client functions
│   │   ├── unsplash.ts
│   │   ├── amap.ts
│   │   └── geolocation.ts
│   ├── utils/                     # Utility functions
│   │   ├── format.ts              # Date, distance formatting
│   │   └── cn.ts                  # className helper
│   ├── hooks/                     # Custom hooks
│   │   ├── useGeolocation.ts
│   │   └── useDebounce.ts
│   └── markdown/                  # MDX/Markdown processing
│       ├── parser.ts
│       └── components.tsx
├── content/
│   └── blog/                      # Markdown blog posts
│       └── .gitkeep
├── public/
│   └── images/
├── types/                         # TypeScript type definitions
│   ├── attraction.ts
│   └── blog.ts
├── PRD.md
├── .env.local
├── .env.example
└── package.json
```

### 3.2 State Management
- **Server Components**: Default for data fetching (RSC)
- **Client State**: React hooks for UI state (search, filters)
- **URL State**: Search params for shareable filter states
- **No external state library** needed for this scope

### 3.3 Data Flow
```
┌─────────────────────────────────────────────────────────────┐
│                      Client (Browser)                        │
│  ┌─────────────────┐    ┌─────────────────┐                 │
│  │  Server Comps   │    │  Client Comps   │                 │
│  │  (fetch data)   │    │  (interactivity)│                 │
│  └────────┬────────┘    └────────┬────────┘                 │
└───────────┼──────────────────────┼──────────────────────────┘
            │                      │
            ▼                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js API Routes                        │
│         /api/attractions/*    /api/blog/*                   │
└───────────┬─────────────────────────────────────────────────┘
            │
            ▼
┌───────────────────────┐    ┌───────────────────────┐
│      Amap API         │    │    Unsplash API       │
│   (POI, Geocoding)    │    │   (Photo Search)      │
└───────────────────────┘    └───────────────────────┘
```

---

## 4. API Integration

### 4.1 Amap API (Gaode Maps)

#### Endpoints Used
| Endpoint | Purpose |
|----------|---------|
| `/place/around` | Search POIs around a location |
| `/place/text` | Text-based POI search |
| `/geocode/geo` | Address to coordinates |

#### Example Request
```http
GET https://restapi.amap.com/v3/place/around
  ?key={AMAP_API_KEY}
  &location=116.397428,39.90923
  &radius=5000
  &types=110000|110100|110200
```

#### Rate Limits
- Free tier: 5,000 requests/day
- Consider caching for production

---

### 4.2 Unsplash API

#### Endpoints Used
| Endpoint | Purpose |
|----------|---------|
| `/search/photos` | Search photos by keyword |
| `/photos/random` | Get random photos |

#### Example Request
```http
GET https://api.unsplash.com/search/photos
  ?query=beijing+forbidden+city
  &per_page=10
Authorization: Client-ID {UNSPLASH_ACCESS_KEY}
```

#### Rate Limits
- Demo: 50 requests/hour
- Production: 5,000 requests/hour

---

### 4.3 IP Geolocation (Fallback)

#### Service: ipapi.co
```http
GET https://ipapi.co/json/
```

#### Response Example
```json
{
  "ip": "xxx.xxx.xxx.xxx",
  "city": "Beijing",
  "region": "Beijing",
  "country": "CN",
  "latitude": 39.9042,
  "longitude": 116.4074
}
```

---

## 5. Caching Strategy

| Resource | TTL | Strategy |
|----------|-----|----------|
| Attractions list | 5 min | `revalidate: 300` |
| Attraction detail | 30 min | `revalidate: 1800` |
| Blog list | 1 hour | `revalidate: 3600` |
| Blog post | 24 hours | `revalidate: 86400` |
| Unsplash photos | 1 hour | Response cache |

---

## 6. Deployment & Environment

### 6.1 Vercel Configuration
```json
// vercel.json (if needed)
{
  "regions": ["hkg1", "sin1"],
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 10
    }
  }
}
```

### 6.2 Environment Variables

#### Required for Production
```bash
# Site
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# APIs
UNSPLASH_ACCESS_KEY=your_unsplash_key
AMAP_API_KEY=your_amap_key

# Optional
ANALYTICS_ID=your_analytics_id
```

#### Development Defaults
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_LAT=39.9042
NEXT_PUBLIC_DEFAULT_LNG=116.4074
```

### 6.3 Build Optimization
- Image optimization via `next/image`
- Font optimization via `next/font`
- Static generation for blog posts
- Edge runtime for API routes (optional)

---

## 7. Non-Functional Requirements

### 7.1 Performance
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### 7.2 Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader friendly
- Color contrast ratios met

### 7.3 SEO
- Dynamic meta tags per page
- Open Graph tags for social sharing
- Structured data (JSON-LD) for blog posts
- Sitemap generation

### 7.4 Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 8. Milestones

| Phase | Deliverables | Priority |
|-------|--------------|----------|
| **Phase 1** | Config refactoring, Project structure | High |
| **Phase 2** | Homepage with geolocation + attractions | High |
| **Phase 3** | Explore page with search | Medium |
| **Phase 4** | Blog module with markdown | Medium |
| **Phase 5** | About page, polish, deploy | Low |

---

## Appendix

### A. Type Definitions

```typescript
// types/attraction.ts
interface Attraction {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  distance?: number;
  rating?: number;
  category: string;
  tags: string[];
  photos: Photo[];
}

interface Photo {
  id: string;
  url: string;
  thumbUrl: string;
  alt: string;
  credit: {
    name: string;
    link: string;
  };
}

// types/blog.ts
interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  tags: string[];
  category: string;
  published: boolean;
  cover?: string;
  readingTime: number;
}
```

### B. Component Hierarchy
```
App
├── RootLayout
│   └── (main)/Layout
│       ├── Header
│       │   ├── Logo
│       │   ├── Navigation
│       │   └── ThemeToggle
│       ├── Main Content
│       │   ├── HomePage
│       │   │   ├── LocationBanner
│       │   │   └── AttractionGrid
│       │   │       └── AttractionCard[]
│       │   ├── ExplorePage
│       │   │   ├── SearchBar
│       │   │   ├── FilterBar
│       │   │   └── AttractionGrid
│       │   ├── BlogPage
│       │   │   ├── BlogFilter
│       │   │   └── BlogList
│       │   │       └── BlogCard[]
│       │   ├── BlogDetailPage
│       │   │   ├── ArticleHeader
│       │   │   ├── TableOfContents
│       │   │   └── ArticleContent
│       │   └── AboutPage
│       └── Footer
```
