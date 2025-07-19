# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm start` - Start development server on port 4202
- `npm run build` - Build for production (includes copying proxy server)
- `npm run watch` - Build with watch mode for development
- `npm test` - Run unit tests via Karma
- `npm run format` - Format code with Prettier and fix ESLint issues

### Linting & Formatting
- `npm run format` - Run Prettier formatting and ESLint fixes
- ESLint configuration: `eslint.config.js` (flat config format)
- Prettier integration enabled with ESLint

### Deployment & Production
- `npm run front:restart` - Restart PM2 process for production
- `npm run serve:ssr:bahdashych-on-security-front` - Serve SSR build
- `npm run fetch:slugs:dev` - Fetch slugs for development
- `npm run fetch:slugs:prod` - Fetch slugs for production

## Architecture

### Project Structure
This is an Angular 17 application using a modular architecture with the following key modules:

- **PagesModule** - Contains all page components and routing configuration
- **ComponentsModule** - Umbrella module that exports three component categories:
  - `BasicComponentsModule` - Reusable UI components (button, input, textarea, etc.)
  - `LayoutComponentsModule` - Layout-specific components (header, footer, navigation, etc.)
  - `PagesComponentsModule` - Page-specific components
- **LayoutsModule** - Contains layout wrappers (DefaultLayout, HeroLayout)

### Path Aliases (tsconfig.json)
- `@app/*` - src/app/*
- `@components/*` - All component directories (basic, layout, pages)
- `@pages/*` - src/app/pages/*
- `@services/*` - src/app/services/*
- `@shared/*` - src/app/shared/*
- `@layouts/*` - src/app/layouts/*
- `@interface/*` - src/app/shared/interfaces/*
- `@assets/*` - src/assets/*

### Routing
All routes are defined in `src/app/pages/pages.module.ts` with the following key routes:
- `/` - Home page
- `/blog` - Blog listing
- `/blog/:slug` - Individual blog posts
- `/projects` - Projects listing
- `/projects/:slug` - Individual projects
- `/contact` - Contact page
- `/legal/*` - Legal pages (style-guide, licenses, changelog, instructions)
- `/**` - 404 Not Found

### Key Technologies
- Angular 17 with standalone application builder
- SCSS for styling
- Highlight.js for code highlighting
- PM2 for production deployment
- TypeScript with strict mode enabled

### Component Organization
Components are organized by purpose:
1. **Basic Components** - Generic, reusable UI elements
2. **Layout Components** - Page structure and navigation
3. **Page Components** - Specific to individual pages
4. **Layout Wrappers** - Different page layouts (default, hero)

### Development Notes
- Uses Angular CLI with SCSS preprocessing
- TypeScript strict mode is enabled with additional strict checks
- ESLint configured with TypeScript and Prettier integration
- Bundle size limits: 500kb warning, 1MB error for initial bundle
- Component styles limited to 2kb warning, 4kb error
- Server runs on port 4202 (not default 4200)