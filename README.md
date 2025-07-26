# Personal Blog Frontend

![Angular](https://img.shields.io/badge/Angular-17.3.0-red?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4.2-blue?style=flat-square&logo=typescript)
![SSR](https://img.shields.io/badge/SSR-Enabled-green?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)

A modern, high-performance personal blog frontend built with Angular 17, featuring Server-Side Rendering (SSR), static prerendering, and comprehensive SEO optimization. This application integrates seamlessly with a NestJS backend API to deliver dynamic content through static generation for optimal performance and search engine visibility.

## 🚀 Key Features

- **Angular 17** with the latest features and performance optimizations
- **Server-Side Rendering (SSR)** for improved SEO and initial load performance
- **Static Prerendering** for all blog posts and project pages
- **Dynamic Route Generation** from backend API content
- **Comprehensive SEO** with meta tags, Open Graph, and structured data
- **Mathematical Content Support** with KaTeX for LaTeX rendering
- **Code Syntax Highlighting** with highlight.js
- **Three-Tier Component Architecture** for scalable development
- **Responsive Design** with modern SCSS styling
- **Progressive Enhancement** with graceful fallbacks

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Development](#-development)
- [Available Scripts](#-available-scripts)
- [Project Architecture](#-project-architecture)
- [Environment Configuration](#-environment-configuration)
- [Build & Deployment](#-build--deployment)
- [API Integration](#-api-integration)
- [SEO & Performance](#-seo--performance)
- [Testing](#-testing)
- [Code Quality](#-code-quality)
- [Contributing](#-contributing)

## 🔧 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (version 9 or higher)
- **Angular CLI** (version 17.3.4 or higher)
- **Backend API** running on port 4201 (required for development)

### Backend Dependency

This frontend application is designed to work in conjunction with the personal blog NestJS backend API. The backend must be running and accessible for:

- Dynamic content fetching during build process
- Development server API calls
- Route generation from blog posts and projects

## 🛠 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal-blog-front
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # For development (automatic with local backend)
   # API_URL=http://localhost:4201/api
   # SITE_URL=http://localhost:4202
   
   # For production
   export API_URL=https://your-api-domain.com/api
   export SITE_URL=https://your-domain.com
   ```

4. **Ensure backend is running**
   ```bash
   # In the backend directory
   npm run start:dev
   ```

## 🔥 Development

### Quick Start

```bash
# Start the development server
npm start
```

The application will be available at `http://localhost:4202`

### Full Development Workflow

```bash
# 1. Start backend API (in backend directory)
npm run start:dev

# 2. Fetch latest content from API
npm run fetch:slugs:dev

# 3. Update Angular routes
npm run update:routes

# 4. Start frontend development server
npm start
```

### Development Features

- **Hot Module Replacement** for instant code updates
- **Source Maps** for debugging
- **Automatic Route Generation** from backend content
- **Real-time API Integration** with development backend
- **Live Reload** on file changes

## 📜 Available Scripts

### Development Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `npm start` | Start development server on port 4202 | Development |
| `npm run watch` | Build with watch mode | Development |
| `npm run fetch:slugs:dev` | Fetch API data for development routes | Development |

### Build Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `npm run build` | Client-side build only | Development |
| `npm run build:ssr` | Full SSR build (client + server) | Development |
| `npm run build:prerender` | Complete prerendering build | Production |

### Data Management Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `npm run fetch:slugs:prod` | Fetch API data for production routes | Production |
| `npm run update:routes` | Update Angular route configuration | Both |

### Production Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `npm run serve:ssr:prod` | Serve SSR build in production mode | Production |
| `npm run front:restart` | Restart PM2 process | Production |

### Quality Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `npm test` | Run unit tests via Karma | Development |
| `npm run format` | Format with Prettier and ESLint fixes | Development |

## 🏗 Project Architecture

### Directory Structure

```
src/
├── app/
│   ├── components/           # Three-tier component architecture
│   │   ├── basic-components/     # Reusable UI primitives
│   │   ├── layout-components/    # Site structure components
│   │   └── pages-components/     # Page-specific components
│   ├── layouts/             # Page layout wrappers
│   ├── pages/               # Route components
│   ├── services/            # Business logic and API communication
│   └── shared/              # Shared utilities and interfaces
├── assets/                  # Static assets (images, icons, data)
├── environments/            # Environment configuration
└── styles.scss             # Global styles
```

### Component Architecture

#### 1. Basic Components (`src/app/components/basic-components/`)
Reusable UI primitives that form the foundation of the application:
- **Button & ButtonLink** - Styled action elements
- **Input & Textarea** - Form input components
- **PostCard & ProjectCard** - Content display cards
- **LoadingSpinner** - Loading state indicator
- **Pagination** - Content navigation
- **LinkBlock** - Styled link containers

#### 2. Layout Components (`src/app/components/layout-components/`)
Site structure and navigation components:
- **Header & Navigation** - Site navigation and branding
- **Footer** - Site footer with links and information
- **MarqueeCarousel** - Animated content carousels
- **FAQ** - Frequently asked questions component
- **ContactTiles** - Contact information display
- **SectionTitle** - Standardized section headings

#### 3. Page Components (`src/app/components/pages-components/`)
Specialized components for specific page functionality:
- **Certificates** - Professional certification display
- **ExperienceTimeline** - Career timeline visualization
- **WhysSection** - Feature highlights and benefits

### Service Architecture

#### Core Services (`src/app/services/`)

| Service | Purpose | Key Features |
|---------|---------|--------------|
| `blog.service.ts` | Blog content management | Post fetching, slug handling, pagination |
| `projects.service.ts` | Project portfolio management | Project data, filtering, detail views |
| `seo.service.ts` | SEO optimization | Meta tags, structured data, Open Graph |
| `site-config.service.ts` | Global configuration | Site settings, navigation, social links |
| `math.service.ts` | Mathematical content | LaTeX rendering with KaTeX |
| `about.service.ts` | About page content | Experience, certificates, personal info |
| `home.service.ts` | Homepage content | Featured content, hero sections |
| `loading.service.ts` | Loading state management | Global loading indicators |

#### Utility Services

| Service | Purpose |
|---------|---------|
| `scroll-animation.service.ts` | Scroll-based animations |
| `scroll-utilities.service.ts` | Scroll position utilities |
| `changelog.service.ts` | Platform changelog management |
| `license.service.ts` | Legal documentation management |
| `privacy.service.ts` | Privacy policy management |

### Data Flow Architecture

```
Backend API → Frontend Services → Components → Templates
     ↓              ↓              ↓         ↓
Database → REST Endpoints → Observable Streams → UI Updates
```

## ⚙️ Environment Configuration

### Development Environment (`src/environments/environment.ts`)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:4201/api',
  siteUrl: 'http://localhost:4202'
};
```

### Production Environment (`src/environments/environment.prod.ts`)
```typescript
export const environment = {
  production: true,
  apiUrl: process.env['API_URL'] || '',
  siteUrl: process.env['SITE_URL'] || 'https://your-domain.com'
};
```

### Required Environment Variables

| Variable | Description | Development | Production |
|----------|-------------|-------------|------------|
| `API_URL` | Backend API base URL | `http://localhost:4201/api` | Your API domain |
| `SITE_URL` | Frontend site URL | `http://localhost:4202` | Your site domain |

## 🚀 Build & Deployment

### Development Build

```bash
# Standard development build
npm run build

# SSR development build
npm run build:ssr
```

### Production Build

```bash
# Full production build with prerendering
npm run build:prerender
```

This command performs the following steps:
1. Fetches latest content from production API
2. Updates Angular route configuration
3. Builds client and server bundles
4. Pre-renders all routes to static HTML
5. Optimizes assets and generates service worker

### Build Output

```
dist/personal-blog-front/
├── browser/               # Client-side application
├── server/               # SSR server files
└── prerendered/          # Static HTML files
```

### Deployment Process

#### 1. Static Hosting (Recommended)
```bash
# Build for static hosting
npm run build:prerender

# Deploy the browser/ directory to your hosting provider
# Examples: Netlify, Vercel, AWS S3 + CloudFront
```

#### 2. SSR Hosting
```bash
# Build SSR version
npm run build:ssr

# Deploy and run server
npm run serve:ssr:prod
```

#### 3. PM2 Production Management
```bash
# Start with PM2
pm2 start ecosystem.config.js

# Restart application
npm run front:restart
```

## 🔌 API Integration

### Backend Requirements

The frontend requires a NestJS backend with the following endpoints:

#### Essential Endpoints
- `GET /site/config` - Global site configuration
- `GET /posts/slugs` - Blog post slugs for route generation
- `GET /posts/:slug` - Individual blog post content
- `GET /projects/slugs` - Project slugs for route generation
- `GET /projects/:slug` - Individual project content

#### Page-Specific Endpoints
- `GET /home` - Homepage content and featured items
- `GET /about` - About page content and experience data
- `GET /changelog` - Changelog entries and page content
- `GET /license` - License information and legal content
- `GET /privacy` - Privacy policy content

### API Response Format

All API endpoints return structured data with consistent formatting:

```typescript
interface ApiResponse<T> {
  pageContent: T;
  layoutData: LayoutData;
  seoData: SEOData;
  // Additional data specific to each endpoint
}
```

### Error Handling

The application implements comprehensive error handling:
- **Network Errors** - Graceful degradation with fallback content
- **API Unavailability** - Cached content and retry mechanisms
- **Build-time Failures** - Fallback to default routes and content
- **Runtime Errors** - Loading states and user feedback

## 🔍 SEO & Performance

### SEO Features

#### Meta Tag Management
- **Dynamic Meta Tags** - Title, description, keywords per page
- **Open Graph Tags** - Social media sharing optimization
- **Twitter Cards** - Enhanced Twitter sharing
- **Canonical URLs** - Duplicate content prevention

#### Structured Data
- **JSON-LD Schema** - Rich snippets for search engines
- **Article Schema** - Blog post structured data
- **Organization Schema** - Business/personal information
- **Breadcrumb Schema** - Navigation structure

#### Technical SEO
- **Server-Side Rendering** - Full HTML for search crawlers
- **Static Prerendering** - Instant page loads
- **Semantic HTML** - Proper heading hierarchy and landmarks
- **Image Optimization** - Alt text and responsive images

### Performance Optimizations

#### Build Optimizations
- **Tree Shaking** - Eliminate unused code
- **Code Splitting** - Lazy-loaded route modules
- **Bundle Analysis** - Optimize bundle sizes
- **Asset Optimization** - Compressed images and assets

#### Runtime Optimizations
- **OnPush Change Detection** - Improved performance
- **Lazy Loading** - Route-based code splitting
- **Service Worker** - Caching and offline support
- **Image Lazy Loading** - Improved page load times

#### Core Web Vitals
- **LCP (Largest Contentful Paint)** - Optimized with SSR
- **FID (First Input Delay)** - Minimized with efficient code
- **CLS (Cumulative Layout Shift)** - Prevented with proper sizing

## 🧪 Testing

### Unit Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm test -- --code-coverage

# Run tests in watch mode
npm test -- --watch
```

### Testing Framework
- **Karma** - Test runner
- **Jasmine** - Testing framework
- **Angular Testing Utilities** - Component testing

### Test Structure
```
src/app/
├── components/
│   └── **/*.spec.ts      # Component tests
├── services/
│   └── **/*.spec.ts      # Service tests
└── pages/
    └── **/*.spec.ts      # Page component tests
```

## 🔧 Code Quality

### Linting and Formatting

```bash
# Format code and fix linting issues
npm run format

# Run ESLint manually
npx eslint "src/**/*.ts" --fix

# Run Prettier manually
npx prettier --write "src/**/*.ts"
```

### Code Quality Tools
- **ESLint** - Code linting and style enforcement
- **Prettier** - Code formatting
- **TypeScript** - Type checking and compile-time error detection
- **Angular Style Guide** - Official Angular conventions

### Pre-commit Hooks
The project uses pre-commit hooks to ensure code quality:
- Automatic formatting with Prettier
- ESLint validation
- TypeScript compilation check
- Unit test execution

## 🔄 Development Workflow

### 1. Content Updates
```bash
# Fetch latest content from backend
npm run fetch:slugs:dev

# Update route configuration
npm run update:routes

# Restart development server
npm start
```

### 2. Feature Development
```bash
# Create feature branch
git checkout -b feature/new-feature

# Develop and test
npm start
npm test

# Format code
npm run format

# Commit changes
git commit -m "feat: add new feature"
```

### 3. Production Deployment
```bash
# Build production version
npm run build:prerender

# Test production build locally
npm run serve:ssr:prod

# Deploy to hosting provider
# (Specific deployment commands depend on hosting platform)
```

## 📦 Dependencies

### Core Dependencies
- **@angular/core** (^17.3.0) - Angular framework
- **@angular/platform-browser** (^17.3.0) - Browser platform
- **@angular/router** (^17.3.0) - Routing functionality
- **@angular/animations** (^17.3.0) - Animation system
- **@angular/ssr** (^17.3.17) - Server-side rendering

### Feature Dependencies
- **ng-katex** (^2.0.3) - LaTeX mathematical notation
- **highlight.js** (^11.11.1) - Code syntax highlighting
- **dayjs** (^1.11.13) - Date manipulation
- **katex** (^0.16.22) - Math typesetting

### Development Dependencies
- **@angular/cli** (^17.3.4) - Angular CLI tools
- **typescript** (~5.4.2) - TypeScript compiler
- **eslint** (^9.31.0) - Code linting
- **prettier** (^3.6.2) - Code formatting

## 📄 License

This project is part of a personal blog system. Please refer to the main repository for license information.

## 📞 Support

For questions, issues, or contributions:

1. **Documentation** - Check this README and inline code comments
2. **Issues** - Create an issue in the repository
3. **Discussions** - Use repository discussions for questions
4. **Code Review** - Submit pull requests for improvements

---

**Built with ❤️ using Angular 17 and modern web technologies**
