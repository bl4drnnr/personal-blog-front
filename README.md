# Personal Blog Frontend

A production-ready Angular 17 personal blog application with comprehensive support for three rendering strategies: Single Page Application (SPA), Server-Side Rendering (SSR), and Static Site Generation (SSG). Built with TypeScript, featuring advanced SEO optimization, mathematical content rendering, and modular component architecture.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Rendering Strategies](#rendering-strategies)
- [Getting Started](#getting-started)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Configuration](#configuration)
- [Scripts Reference](#scripts-reference)
- [Testing](#testing)
- [Common Issues](#common-issues)
- [Performance](#performance)
- [Contributing](#contributing)

## Overview

This Angular 17 application serves as a comprehensive personal blog platform with backend API integration. It implements a hybrid architecture that supports multiple rendering strategies without code changes, making it adaptable to various deployment scenarios and performance requirements.

**Key Capabilities:**
- Three rendering modes from single codebase
- Dynamic content management via NestJS backend integration
- Advanced SEO with structured data and social media optimization
- LaTeX mathematical formula rendering
- Automatic code syntax highlighting
- Responsive, mobile-first design
- TypeScript strict mode for type safety
- Modular component architecture
- Comprehensive guard system for security

## Technology Stack

**Core Framework:**
- Angular 17.3.0 (Ivy renderer, standalone components support)
- TypeScript 5.4.2 (strict mode enabled)
- RxJS 7.8.0 for reactive programming
- Zone.js 0.14.3 for change detection

**Server-Side Rendering:**
- Angular Universal with Express.js 5.1.0
- CommonEngine for SSR rendering
- Platform-server for server-side execution

**Content Processing:**
- KaTeX 0.16.22 for LaTeX math rendering
- Highlight.js 11.11.1 for code syntax highlighting
- ng-katex 2.0.3 (Angular wrapper)

**Development Tools:**
- Angular CLI 17.3.4
- ESLint 9.31.0 for code linting
- Prettier 3.6.2 for code formatting
- Karma 6.4.0 for unit testing

**Utilities:**
- Day.js 1.11.13 for date formatting
- dotenv 17.2.1 for environment variables

## Architecture

### Three-Tier Component System

The application follows a hierarchical component architecture:

**1. Basic Components** (`src/app/components/basic-components/`)

Reusable UI primitives:
- PostCardComponent - Blog post preview cards
- ProjectCardComponent - Project showcase cards
- ButtonComponent/ButtonLinkComponent - Interactive buttons
- InputComponent/TextareaComponent - Form controls
- PaginationComponent - Page navigation
- LoadingSpinnerComponent - Loading states

**2. Layout Components** (`src/app/components/layout-components/`)

Structural elements:
- HeaderComponent/FooterComponent - Site structure
- NavigationComponent - Main navigation with mobile support
- FaqComponent - FAQ sections
- MarqueeCarouselComponent - Scrolling content
- ContactTilesComponent - Contact information display

**3. Pages Components** (`src/app/components/pages-components/`)

Specialized page elements:
- WhysSectionComponent - Feature highlights
- ExperienceTimelineComponent - Professional timeline
- CertificatesComponent - Certification display

### Service-Based Data Architecture

Each domain has dedicated services for separation of concerns:

**Core Services:**
- SiteConfigService - Global configuration management
- SEOService - Meta tags, Open Graph, structured data
- MathService - LaTeX rendering and image processing

**Content Services:**
- BlogService - Blog post management
- ProjectsService - Project portfolio management
- HomeService, AboutService, ContactService - Page-specific data

**Utility Services:**
- LoadingService - Global loading state
- ScrollAnimationService - Scroll progress tracking
- ScrollUtilitiesService - Table of contents, scroll utilities
- MaintenanceService - Maintenance mode management
- PasswordProtectionService - Site password protection

### Guard System

Three-layer security implementation:

1. **PasswordProtectionGuard** - Site-wide password protection
2. **MaintenanceGuard** - Maintenance mode enforcement
3. **MaintenancePageGuard** - Maintenance page access control

Guards execute in order, with special routes bypassing specific guards.

### Dynamic Route Generation

Routes are automatically generated from backend content:

```
Backend API -> fetch-slugs.mjs -> prerender-routes.ts -> update-angular-routes.mjs -> angular.json
```

This ensures all dynamic content (blog posts, projects) is discoverable for pre-rendering.

## Rendering Strategies

### 1. SPA (Single Page Application)

**Description:**
Client-side rendering with dynamic routing. The entire application runs in the browser, with content loaded via API calls.

**How It Works:**
1. Browser downloads HTML, CSS, and JavaScript bundles
2. Angular application initializes in browser
3. Client-side routing handles navigation
4. Content loaded dynamically via HTTP requests
5. DOM updates without page reloads

**Advantages:**
- Smooth user experience with instant navigation
- Rich interactive features
- Reduced server load
- Offline capabilities with service workers
- Easy deployment to static hosting

**Disadvantages:**
- Poor initial load performance (large JavaScript bundles)
- SEO challenges (JavaScript-dependent content)
- Requires JavaScript enabled
- Slower performance on low-end devices
- Limited social media preview generation

**Use Cases:**
- Interactive dashboards and admin panels
- Progressive Web Apps (PWAs)
- Internal tools where SEO is not critical
- Applications prioritizing user experience over discoverability

### 2. SSR (Server-Side Rendering)

**Description:**
Server generates complete HTML for each request. Node.js server runs Angular application, fetches data, and sends fully rendered HTML to browser. JavaScript then hydrates the page for interactivity.

**How It Works:**
1. Browser requests page from server
2. Node.js server executes Angular application
3. Server fetches data from API/database
4. Complete HTML with content generated on server
5. Fully rendered HTML sent to browser
6. JavaScript loads and hydrates page

**Advantages:**
- Excellent SEO (search engines receive complete HTML)
- Fast first contentful paint
- Perfect social media previews
- Works with JavaScript disabled (basic functionality)
- Better performance on low-end devices
- Always serves fresh content

**Disadvantages:**
- Requires Node.js server infrastructure
- Higher server costs (computation per request)
- More complex deployment
- Slower navigation (server round-trips)
- Complex caching strategies

**Use Cases:**
- E-commerce websites with dynamic pricing
- News websites requiring fresh content
- Marketing pages with critical SEO requirements
- Social platforms with frequent content sharing

### 3. SSG (Static Site Generation)

**Description:**
Pre-renders all pages at build time into static HTML files. Each route becomes a separate HTML file with content embedded. No server processing at runtime.

**How It Works:**
1. Build process runs during deployment
2. All content fetched from CMS/API during build
3. All routes identified (static + dynamic)
4. Each route pre-rendered to static HTML
5. Assets optimized and bundled
6. Static files deployed to CDN

**Advantages:**
- Maximum performance (instant loading)
- Perfect SEO (complete pre-rendered HTML)
- Global CDN distribution
- Zero server costs (static hosting)
- Maximum security (no runtime vulnerabilities)
- Excellent Core Web Vitals scores
- High reliability (no servers to fail)

**Disadvantages:**
- Content changes require rebuild
- No real-time content updates
- Build time increases with site size
- Limited dynamic features
- Publishing delay (build + deployment time)

**Use Cases:**
- Personal blogs and portfolios
- Documentation websites
- Marketing and landing pages
- Event websites with static information
- Content that changes infrequently

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Backend API running (NestJS application on port 4201)

### Installation

```bash
# Clone repository
git clone <repository-url>
cd personal-blog-front

# Install dependencies
npm install

# Configure environment
cp .env.development.example .env.development
cp .env.production.example .env.production
```

### Environment Configuration

Create `.env.development`:
```env
API_URL=http://localhost:4201/api
SITE_URL=http://localhost:4202
```

Create `.env.production`:
```env
API_URL=https://api.yourdomain.com/api
SITE_URL=https://yourdomain.com
```

### Running the Application

**Start Backend API:**
```bash
# In backend directory
cd ../personal-blog-api
npm run start:dev
```

**Start Frontend Development Server:**
```bash
npm start
# Application available at http://localhost:4202
```

## Development

### Development Server

```bash
# SPA development mode
npm start                    # Port 4202

# SSR development mode
npm run start:ssr           # Server-side rendering development
```

### Content Management

Fetch latest content from backend API:

```bash
# Development environment
npm run fetch:content:dev

# Production environment
npm run fetch:content:prod
```

**What This Does:**
- Downloads all blog post and project slugs from backend
- Generates route configuration in `src/prerender-routes.ts`
- Updates Angular configuration for pre-rendering
- Creates `src/assets/slugs-data.json` for reference

### Code Quality

```bash
# Format code with Prettier and ESLint
npm run format

# Run unit tests
npm test
```

### Development Workflow

**Daily Development:**
1. Start backend API (required for content)
2. Start frontend development server
3. When backend content changes, run `npm run fetch:content:dev`
4. Restart development server to pick up new routes

**Adding New Features:**
1. Create components in appropriate tier (basic/layout/pages)
2. Create service for business logic
3. Add interfaces in `src/app/shared/interfaces/`
4. Update module exports
5. Format code before committing

## Building for Production

### SPA Build

```bash
# Production build
npm run build:spa

# Development build with source maps
npm run build:spa:dev
```

**Output:** `dist/personal-blog-front/browser/`
- Optimized JavaScript bundles
- CSS files with cache-busting hashes
- Compressed assets
- Single `index.html` entry point

### SSR Build

```bash
# Production build
npm run build:ssr

# Development build
npm run build:ssr:dev
```

**Output:**
- `dist/personal-blog-front/browser/` - Client-side application
- `dist/personal-blog-front/server/` - Node.js server bundle

### SSG Build

```bash
# Production build
npm run build:ssg

# Development build
npm run build:ssg:dev
```

**Output:** `dist/personal-blog-front/browser/`
- Individual HTML file for each route
- Optimized assets
- Complete static website ready for CDN deployment

### Testing Builds Locally

**Test SPA:**
```bash
npm run serve:spa           # Production build
npm run serve:spa:dev       # Development build
# Available at http://localhost:8080
```

**Test SSR:**
```bash
npm run serve:ssr           # Production build
npm run serve:ssr:dev       # Development build
# Available at http://localhost:4000
```

**Test SSG:**
```bash
npm run serve:ssg           # Production build
npm run serve:ssg:dev       # Development build
# Available at http://localhost:8080
```

## Deployment

### SPA Deployment

**Supported Platforms:**
- Netlify, Vercel, AWS S3, GitHub Pages, Firebase Hosting

**Build Command:**
```bash
npm run build:spa
```

**Publish Directory:**
```
dist/personal-blog-front/browser/
```

**Configuration (Netlify/Vercel):**
```toml
[build]
  command = "npm run build:spa"
  publish = "dist/personal-blog-front/browser"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Important:** Configure SPA fallback routing to serve `index.html` for all routes.

### SSR Deployment

**Supported Platforms:**
- Heroku, Railway, DigitalOcean App Platform, AWS Elastic Beanstalk

**Build Command:**
```bash
npm run build:ssr
```

**Start Command:**
```bash
node dist/personal-blog-front/server/main.js
```

**Environment Variables Required:**
- `API_URL` - Backend API endpoint
- `SITE_URL` - Frontend domain
- `PORT` - Server port (default: 4000)

**Heroku Configuration:**
```json
{
  "scripts": {
    "start": "node dist/personal-blog-front/server/main.js",
    "build": "npm run build:ssr"
  },
  "engines": {
    "node": "18.x",
    "npm": "9.x"
  }
}
```

### SSG Deployment

**Supported Platforms:**
- Netlify, Vercel, GitHub Pages, Cloudflare Pages, AWS S3 + CloudFront

**Build Command:**
```bash
npm run build:ssg
```

**Publish Directory:**
```
dist/personal-blog-front/browser/
```

**Configuration (Netlify):**
```toml
[build]
  command = "npm run build:ssg"
  publish = "dist/personal-blog-front/browser"
```

**Advantages:**
- No server configuration needed
- Can be hosted on free tiers
- Automatic CDN distribution
- Maximum performance

## Project Structure

```
personal-blog-front/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── basic-components/       # Reusable UI primitives
│   │   │   │   ├── post-card/          # Blog post card
│   │   │   │   ├── project-card/       # Project card
│   │   │   │   ├── button/             # Button component
│   │   │   │   ├── pagination/         # Pagination controls
│   │   │   │   └── ...
│   │   │   ├── layout-components/      # Site structure
│   │   │   │   ├── header/             # Site header
│   │   │   │   ├── footer/             # Site footer
│   │   │   │   ├── navigation/         # Main navigation
│   │   │   │   └── ...
│   │   │   └── pages-components/       # Page-specific components
│   │   │       ├── whys-section/       # Feature highlights
│   │   │       ├── experience-timeline/# Timeline component
│   │   │       └── certificates/       # Certifications display
│   │   ├── pages/                      # Route components
│   │   │   ├── home/                   # Home page
│   │   │   ├── blog/                   # Blog listing
│   │   │   ├── blog-detail/            # Blog post detail
│   │   │   ├── projects/               # Projects listing
│   │   │   ├── project-detail/         # Project detail
│   │   │   ├── about-me/               # About page
│   │   │   ├── contact/                # Contact page
│   │   │   ├── maintenance/            # Maintenance mode page
│   │   │   ├── password-protection/    # Password entry page
│   │   │   ├── not-found/              # 404 page
│   │   │   └── ...
│   │   ├── services/                   # Business logic
│   │   │   ├── site-config.service.ts  # Global configuration
│   │   │   ├── seo.service.ts          # SEO management
│   │   │   ├── math.service.ts         # LaTeX rendering
│   │   │   ├── blog.service.ts         # Blog data
│   │   │   ├── projects.service.ts     # Project data
│   │   │   └── ...
│   │   ├── guards/                     # Route guards
│   │   │   ├── maintenance.guard.ts    # Maintenance mode
│   │   │   ├── maintenance-page.guard.ts
│   │   │   └── password-protection.guard.ts
│   │   ├── layouts/                    # Page layouts
│   │   │   ├── default-layout/         # Standard layout
│   │   │   └── hero-layout/            # Hero section layout
│   │   ├── shared/                     # Shared utilities
│   │   │   ├── interfaces/             # TypeScript interfaces
│   │   │   ├── enums/                  # Enumerations
│   │   │   └── animations/             # Animation definitions
│   │   ├── app.component.ts            # Root component
│   │   ├── app.config.ts               # Application configuration
│   │   └── app.routes.ts               # Main routing configuration
│   ├── assets/                         # Static assets
│   │   ├── images/                     # Images and icons
│   │   ├── fonts/                      # Web fonts
│   │   ├── styles.css                  # Global styles
│   │   ├── webflow.css                 # Design system styles
│   │   └── slugs-data.json             # Generated route data
│   ├── environments/                   # Environment configs
│   │   ├── environment.ts              # Development
│   │   └── environment.production.ts         # Production
│   ├── index.html                      # HTML entry point
│   ├── main.ts                         # Application bootstrap
│   ├── main.server.ts                  # SSR entry point
│   └── prerender-routes.ts             # Generated route list
├── scripts/                            # Build automation
│   ├── fetch-slugs.mjs                 # Fetch content from API
│   ├── update-angular-routes.mjs       # Update route config
│   └── prerender.mjs                   # Static site generator
├── server.ts                           # Express SSR server
├── angular.json                        # Angular configuration
├── tsconfig.json                       # TypeScript config
├── package.json                        # Dependencies and scripts
├── .env.development                    # Dev environment variables
├── .env.production                     # Prod environment variables
├── .prettierrc                         # Prettier configuration
├── .editorconfig                       # Editor configuration
├── eslint.config.js                    # ESLint configuration
└── README.md                           # Documentation
```

## Key Features

### LaTeX Mathematical Content Rendering

Powered by KaTeX for high-quality mathematical formula rendering.

**Inline Formulas:**
```markdown
The equation $E = mc^2$ demonstrates mass-energy equivalence.
```

**Display Formulas:**
```markdown
$$
\int_0^\infty f(x)dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i) \Delta x
$$
```

**Implementation:**
- MathService processes content after rendering
- Automatic detection of formula delimiters
- Error handling for invalid LaTeX
- SSR-compatible rendering

### Code Syntax Highlighting

Automatic syntax highlighting with highlight.js.

**Features:**
- Automatic language detection
- 100+ language support
- Multiple theme options
- Line number support
- Copy to clipboard functionality

**Implementation:**
- Applied in `ngAfterViewChecked` lifecycle hook
- Works with dynamically loaded content
- SSR-compatible

### Dynamic Content Processing Pipeline

Multi-stage content enhancement:

1. Content fetched from API
2. MathService processes images (lazy loading, responsive attributes)
3. Content inserted via `[innerHTML]` binding
4. Post-processing in lifecycle hooks:
   - Image wrapper and caption generation
   - LaTeX formula rendering
   - Code syntax highlighting
   - Table of contents generation

### SEO Optimization

Comprehensive SEO implementation for all rendering modes.

**Meta Tags:**
- Dynamic title: `{siteName} | {pageName}`
- Meta description
- Meta keywords
- Canonical URLs

**Social Media Tags:**
- Open Graph (og:title, og:description, og:image, og:url, og:type)
- Twitter Card metadata (twitter:card, twitter:title, twitter:description, twitter:image)
- Facebook sharing optimization

**Structured Data (JSON-LD):**
Automatically generated for:
- Blog posts (BlogPosting schema)
- Projects (CreativeWork schema)
- Organization data
- Author information

**Example Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Article Title",
  "description": "Article description",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "datePublished": "2024-01-01T00:00:00Z",
  "image": "https://example.com/image.jpg",
  "url": "https://example.com/blog/article-slug"
}
```

### Animation System

Sophisticated animation framework using Angular animations API.

**Available Animations:**
- fadeInUpStaggerAnimation - Text elements with stagger effect
- changelogStaggerAnimation - Changelog entries
- menuTileAnimation - Menu tiles
- blogPostAnimation - Blog post cards
- projectAnimation - Project cards
- navMenuSlideAnimation - Navigation menu slide
- burgerMenuAnimation - Mobile menu icon rotation

**Features:**
- State-based transitions
- Stagger effects for sequential animations
- Optional queries for graceful degradation
- Performance-optimized

### Image Optimization

Advanced image handling with Angular's NgOptimizedImage directive.

**Features:**
- Automatic lazy loading
- Responsive sizing (max-width: 100%)
- Caption generation from title attributes
- Image wrapper with proper styling
- SSR-compatible

**Processing Example:**
```html
<!-- Input -->
<img src="image.jpg" title="Image caption" loading="lazy">

<!-- Processed Output -->
<div class="image-wrapper">
  <img src="image.jpg" loading="lazy" class="blog-image">
  <p class="image-caption">Image caption</p>
</div>
```

### Scroll Utilities

Comprehensive scroll management services.

**ScrollAnimationService:**
- Tracks scroll progress (0-100%)
- Reactive scroll position via Observable
- Used for progress bars and scroll effects

**ScrollUtilitiesService:**
- Table of contents generation from H2-H6 headings
- Smooth scroll to section
- Footer reach detection
- Scroll-based UI updates

**Table of Contents Structure:**
```typescript
interface TocItem {
  id: string;
  text: string;
  level: number;  // 2-6 (h2-h6)
}
```

### Security Features

Multi-layered security implementation.

**Password Protection:**
- Site-wide password protection capability
- Password verification via backend API
- Session-based authentication
- Guard-based access control
- Dedicated password entry page

**Maintenance Mode:**
- Graceful degradation during maintenance
- Dedicated maintenance page
- Guard prevents normal access during maintenance
- API-controlled activation

**Content Security:**
- Sanitized HTML content
- Trusted content pipeline for innerHTML
- No script injection in dynamic content
- KaTeX runs in safe mode

## Configuration

### Environment Files

**Development** (`src/environments/environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:4201/api',
  siteUrl: 'http://localhost:4202'
};
```

**Production** (`src/environments/environment.production.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: process.env['API_URL'] || 'https://api.yourdomain.com/api',
  siteUrl: process.env['SITE_URL'] || 'https://yourdomain.com'
};
```

### TypeScript Path Aliases

Configured in `tsconfig.json` for clean imports:

```typescript
import { PostService } from '@services/blog.service';
import { PostCard } from '@components/basic-components/post-card';
import { Post } from '@interface/post.interface';
```

**Available Aliases:**
- `@app/*` -> `src/app/*`
- `@components/*` -> `src/app/components/**`
- `@pages/*` -> `src/app/pages/*`
- `@services/*` -> `src/app/services/*`
- `@shared/*` -> `src/app/shared/*`
- `@assets/*` -> `src/assets/*`
- `@environments/*` -> `src/environments/*`
- `@interface/*` -> `src/app/shared/interfaces/*`
- `@guards/*` -> `src/app/guards/*`
- `@enums/*` -> `src/app/shared/enums/*`
- `@layouts/*` -> `src/app/layouts/*`
- `@animations/*` -> `src/app/shared/animations/*`

### Angular Configuration

**Build Optimization (`angular.json`):**
- AOT compilation enabled
- Build optimizer enabled
- Source maps (development only)
- Budget limits:
  - Initial bundle: 2MB warning, 3MB error
  - Component styles: 6KB warning, 8KB error

**Development Server:**
- Port: 4202
- Live reload enabled
- SSL: Configurable

## Scripts Reference

### Development Scripts

| Script | Purpose |
|--------|---------|
| `npm start` | Start SPA development server (port 4202) |
| `npm run start:ssr` | Start SSR development server |

### Content Management Scripts

| Script | Purpose |
|--------|---------|
| `npm run fetch:content:dev` | Fetch content from development API |
| `npm run fetch:content:prod` | Fetch content from production API |
| `npm run update:routes` | Update Angular route configuration |

### Build Scripts

| Script | Purpose |
|--------|---------|
| `npm run build` | Client-side build only |
| `npm run build:spa` | Production SPA build |
| `npm run build:spa:dev` | Development SPA build |
| `npm run build:ssr` | Production SSR build (client + server) |
| `npm run build:ssr:dev` | Development SSR build |
| `npm run build:ssg` | Production SSG build (pre-rendered) |
| `npm run build:ssg:dev` | Development SSG build |

### Serve Scripts (Testing Builds Locally)

| Script | Purpose |
|--------|---------|
| `npm run serve:spa` | Test production SPA build (port 8080) |
| `npm run serve:spa:dev` | Test development SPA build |
| `npm run serve:ssr` | Test production SSR build |
| `npm run serve:ssr:dev` | Test development SSR build |
| `npm run serve:ssg` | Test production SSG build (port 8080) |
| `npm run serve:ssg:dev` | Test development SSG build |

### Code Quality Scripts

| Script | Purpose |
|--------|---------|
| `npm run format` | Format code with Prettier and ESLint |
| `npm test` | Run unit tests with Karma |
| `npm run watch` | Build with watch mode for development |

## Testing

### Unit Testing

**Framework:** Karma + Jasmine

**Run Tests:**
```bash
npm test
```

**Test Structure:**
- Component tests in `*.component.spec.ts`
- Service tests in `*.service.spec.ts`
- Guard tests in `*.guard.spec.ts`

**Coverage Reports:**
```bash
npm run test -- --code-coverage
```

### E2E Testing

Not currently configured. Architecture supports integration of:
- Cypress
- Playwright
- Protractor (deprecated)

## Common Issues

### Issue: SPA routing errors (ENAMETOOLONG)

**Solution:** Use `--spa` flag with http-server instead of `-P` proxy flag.

```bash
# Correct
npx http-server dist/personal-blog-front/browser --spa

# Incorrect
npx http-server dist/personal-blog-front/browser -P http://localhost:4201
```

### Issue: SPA static routes return 404 (e.g., /about-me)

**Cause:** Static routes depend on backend API for content.

**Solution:** Start backend API first before testing SPA locally.

```bash
# Terminal 1: Backend
cd ../personal-blog-api
npm run start:dev

# Terminal 2: Frontend
npm run serve:spa:dev
```

### Issue: SPA 404 on refresh or direct navigation

**Cause:** Server doesn't know to serve index.html for all routes.

**Solution:** Configure server fallback routing.

**Netlify/Vercel:**
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Issue: Content not updating

**Solution:** Run content fetch script before building.

```bash
npm run fetch:content:prod
npm run build:ssg
```

### Issue: Build taking too long

**Cause:** Large number of routes to pre-render.

**Solutions:**
1. Reduce number of pre-rendered routes
2. Increase Node.js memory: `NODE_OPTIONS="--max-old-space-size=4096" npm run build:ssg`
3. Consider incremental builds or SSR instead of SSG

### Issue: Memory issues during build

**Solution:** Increase Node.js heap size.

```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build:ssg
```

### Issue: Routes not working in production SPA

**Cause:** Hosting platform doesn't support SPA fallback routing.

**Solution:** Configure hosting platform to serve index.html for all routes (see "SPA 404 on refresh" above).

### Issue: SSR server errors

**Causes:**
- Incorrect Node.js version
- Missing dependencies
- Environment variables not set

**Solutions:**
1. Verify Node.js version: `node --version` (should be 18.x or higher)
2. Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`
3. Check environment variables: `API_URL`, `SITE_URL`
4. Review server logs for specific errors

## Performance

### Build Output Sizes

**SPA Build:**
- Initial bundle: ~1.5-2MB (before gzip)
- After gzip: ~400-600KB
- Lazy-loaded chunks: Minimal

**SSR Build:**
- Browser bundle: ~1.5-2MB
- Server bundle: ~500KB-1MB
- Total: ~2-3MB

**SSG Build:**
- Browser bundle: ~1.5-2MB
- HTML files: ~5-20KB per page
- Total scales with content volume

### Loading Performance Metrics

**SPA:**
- First Contentful Paint: 2-4s
- Time to Interactive: 3-5s
- Subsequent navigation: <100ms

**SSR:**
- First Contentful Paint: 500ms-1s
- Time to Interactive: 2-3s
- Subsequent navigation: 500ms-1s (server round-trip)

**SSG:**
- First Contentful Paint: 200-500ms
- Time to Interactive: 1-2s
- Subsequent navigation: <100ms

### SEO Performance

**SPA:**
- Google: Moderate (JavaScript crawling required)
- Other engines: Poor (limited JavaScript support)

**SSR:**
- All search engines: Excellent (complete HTML on first load)

**SSG:**
- All search engines: Excellent (pre-rendered HTML)

### Optimization Recommendations

1. **Bundle Size Reduction:**
   - Enable differential loading for modern browsers
   - Implement lazy loading for routes
   - Remove unused dependencies
   - Use bundle analyzer to identify large modules

2. **Runtime Performance:**
   - Implement virtual scrolling for long lists
   - Use OnPush change detection strategy
   - Optimize image formats (WebP with fallbacks)
   - Add service worker for offline support

3. **Build Performance:**
   - Enable build cache
   - Use incremental builds
   - Parallelize prerendering
   - Consider partial prerendering (critical pages only)

## Contributing

### Code Style

- **TypeScript:** Strict mode enabled, no implicit any
- **Formatting:** Prettier with single quotes, no trailing commas
- **Linting:** ESLint with Angular style guide rules
- **Naming Conventions:**
  - Components: PascalCase with 'Component' suffix
  - Services: PascalCase with 'Service' suffix
  - Interfaces: PascalCase (no 'I' prefix)
  - Files: kebab-case

### Git Workflow

1. Create feature branch from `master` or `development`
2. Make changes following code style guidelines
3. Run `npm run format` before committing
4. Write descriptive commit messages
5. Test all three rendering modes
6. Create pull request with clear description

### Adding New Features

**Adding a Page:**
1. Create page component in `src/app/pages/`
2. Create dedicated service if needed
3. Add route to `src/app/pages/pages.module.ts`
4. Add to static routes in `scripts/fetch-slugs.mjs`
5. Update SEO configuration in component
6. Test all rendering modes

**Adding a Component:**
1. Create in appropriate tier (basic/layout/pages)
2. Create component, template, styles, spec files
3. Export from module
4. Document props and usage
5. Add to Storybook (if available)

**Adding a Service:**
1. Create in `src/app/services/`
2. Implement interface in `src/app/shared/interfaces/`
3. Add to providers in `app.config.ts` if needed
4. Write unit tests
5. Document public API

### Testing Requirements

- Unit tests for all services
- Component tests for complex components
- Guard tests for security logic
- E2E tests for critical user flows (when available)
- Test coverage > 80% (goal)

### Documentation

- Update README.md for architectural changes
- Update CLAUDE.md for developer workflows
- Document environment variables
- Add inline comments for complex logic
- Update API documentation

## License

This project is licensed under the terms specified in the LICENSE file.

## Support

For issues, questions, or contributions:
- Create an issue in the repository
- Contact the development team
- Review existing documentation and common issues

---

Built with Angular 17 - Supporting SPA, SSR, and SSG rendering strategies
