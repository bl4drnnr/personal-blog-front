# Personal Blog Frontend

A high-performance Angular 17 blog application with Server-Side Rendering (SSR) and comprehensive SEO optimization. Built with Angular Universal for optimal search engine visibility and fast loading times.

> **Note**: This frontend requires the [personal-blog-api](../personal-blog-api) to be running for full functionality.

## 🚀 Features

- **Server-Side Rendering (SSR)** with Angular Universal
- **Static Pre-rendering** for all blog posts and project pages
- **Dynamic SEO optimization** with meta tags, Open Graph, and structured data
- **Automatic route generation** from API data
- **Mobile-first responsive design**
- **Modern Angular 17** with standalone application builder
- **TypeScript strict mode** enabled
- **Comprehensive build automation**

## 📁 Project Structure

```
src/
├── app/
│   ├── components/           # Reusable UI components
│   │   ├── basic-components/     # Generic UI elements
│   │   ├── layout-components/    # Header, footer, navigation
│   │   └── pages-components/     # Page-specific components
│   ├── layouts/             # Page layout wrappers
│   ├── pages/               # Route components
│   ├── services/            # Business logic services
│   │   ├── blog.service.ts      # Blog posts management
│   │   ├── projects.service.ts  # Projects management  
│   │   ├── seo.service.ts       # SEO meta tags & structured data
│   │   ├── math.service.ts      # LaTeX math rendering
│   │   └── scroll-animation.service.ts
│   └── shared/              # Shared utilities
│       ├── interfaces/          # TypeScript interfaces
│       └── animations/          # Angular animations
├── assets/                  # Static assets
├── environments/            # Environment configurations
└── main.ts / main.server.ts # App bootstrap files
scripts/                     # Build automation scripts
├── fetch-slugs.mjs         # API data fetching & route generation
└── update-angular-routes.mjs # Angular config updates
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+
- Angular CLI 17+
- **Backend API** running at `http://localhost:3000` (see [personal-blog-api setup](../personal-blog-api/README.md))

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd personal-blog-front

# Install dependencies
npm install

# Start development server (requires API to be running)
npm start
```

The application will be available at `http://localhost:4202`

### Backend Connection

The frontend connects to the API at:
- **Development**: `http://localhost:3000/api`
- **Production**: Configured via `API_URL` environment variable

Make sure your [personal-blog-api](../personal-blog-api) is running before starting the frontend.

### Development Commands

```bash
# Development server
npm start                    # Starts dev server on port 4202 (requires API)

# Code quality
npm run format              # Format code with Prettier & ESLint
npm test                    # Run unit tests

# Build variants
npm run build               # Client-side build only
npm run build:ssr           # SSR build (client + server)
npm run build:prerender     # Full pre-rendering build (requires API)

# SSR development
npm run serve:ssr           # Serve SSR in development mode
npm run fetch:slugs:dev     # Fetch routes from API for development
npm run fetch:slugs:prod    # Fetch routes from API for production
npm run update:routes       # Update Angular route configuration
```

### Important Notes

- **API Dependency**: Most commands require the backend API to be running
- **Build Process**: `npm run build:prerender` fetches content from API to generate static routes
- **Development Mode**: Works with graceful degradation if API is unavailable, but full functionality requires API connection

## 🏗️ Production Deployment

### Environment Configuration

Create environment files for production:

#### `src/environments/environment.prod.ts`
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api',
  siteUrl: 'https://your-domain.com'
};
```

#### Environment Variables
Set these in your deployment environment:
- `API_URL`: Your backend API base URL (e.g., `https://api.yourdomain.com/api`)
- `SITE_URL`: Your frontend domain URL (e.g., `https://yourdomain.com`)

**Example Production Environment:**
```bash
export API_URL="https://api.yourdomain.com/api"
export SITE_URL="https://yourdomain.com"
```

### API Requirements

Your backend API should provide these endpoints:

#### Site Configuration
```
GET /site/config
Response: {
  "siteName": "Your Site Name",
  "siteDescription": "Your site description",
  "siteAuthor": "Your Name",
  "siteUrl": "https://your-domain.com",
  "defaultImage": "https://your-domain.com/og-default.jpg",
  "keywords": "your, keywords, here",
  "socialMedia": {
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername"
  },
  "organization": {
    "name": "Your Organization",
    "url": "https://your-domain.com",
    "logo": "https://your-domain.com/logo.jpg"
  }
}
```

#### Blog Posts
```
GET /posts/slugs
Response: [
  {
    "slug": "post-slug",
    "title": "Post Title", 
    "description": "Post description",
    "publishDate": "2024-01-15",
    "tags": ["tag1", "tag2"]
  }
]

GET /posts/:slug
Response: {
  "slug": "post-slug",
  "title": "Post Title",
  "description": "Post description", 
  "content": "<html content>",
  "publishDate": "2024-01-15",
  "updatedDate": "2024-01-16",
  "tags": ["tag1", "tag2"],
  "featuredImage": "https://example.com/image.jpg",
  "author": "Author Name",
  "excerpt": "Post excerpt"
}
```

#### Projects  
```
GET /projects/slugs
Response: [
  {
    "slug": "project-slug",
    "title": "Project Title",
    "description": "Project description",
    "date": "2024-01-10", 
    "tags": ["tag1", "tag2"]
  }
]

GET /projects/:slug  
Response: {
  "slug": "project-slug",
  "title": "Project Title",
  "description": "Project description",
  "content": "<html content>",
  "date": "2024-01-10",
  "tags": ["tag1", "tag2"],
  "featuredImage": "https://example.com/image.jpg",
  "technologies": ["TypeScript", "Angular"],
  "githubUrl": "https://github.com/user/repo",
  "demoUrl": "https://demo.example.com"
}
```

### Build & Deploy Process

```bash
# 1. Ensure your backend API is running and accessible
# 2. Set environment variables
export API_URL="https://your-api-domain.com/api"
export SITE_URL="https://your-domain.com"

# 3. Build the application with pre-rendering
npm run build:prerender

# This command will:
# - Fetch all post/project slugs from your API
# - Generate static routes configuration  
# - Build client and server bundles
# - Pre-render all pages to static HTML
# - Output to dist/personal-blog-front/
```

**Important**: The build process requires your API to be accessible and returning data. If the API is not available, the build will fail.

### Production Build Output

```
dist/personal-blog-front/
├── browser/                 # Client-side files
│   ├── index.html              # Main HTML file
│   ├── *.js                    # JavaScript bundles
│   ├── *.css                   # Stylesheets
│   └── assets/                 # Static assets
└── server/                  # Server-side files
    └── server.mjs              # SSR server bundle
```

### Server Configuration

#### Option 1: Node.js Server (Recommended)
Deploy the server bundle directly:

```bash
# Copy dist/personal-blog-front to your server
# Install production dependencies
npm ci --production

# Start the server
node dist/personal-blog-front/server/server.mjs
```

#### Option 2: Static Hosting + Fallback
For static hosting with fallback support:

1. Upload `dist/personal-blog-front/browser/` to your static host
2. Configure fallback routing to serve `index.html` for unmatched routes  
3. Pre-rendered pages will be served as static HTML

### PM2 Configuration (if using PM2)

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'personal-blog-front',
    script: 'dist/personal-blog-front/server/server.mjs',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      API_URL: 'https://your-api-domain.com/api',
      SITE_URL: 'https://your-domain.com'
    }
  }]
};
```

```bash
# Deploy with PM2
pm2 start ecosystem.config.js
pm2 save
```

### GitHub Actions CI/CD

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build application  
      run: npm run build:prerender
      env:
        API_URL: ${{ secrets.API_URL }}
        SITE_URL: ${{ secrets.SITE_URL }}
        
    - name: Deploy to server
      # Add your deployment steps here
      run: echo "Deploy to production server"
```

## 🔧 SEO Configuration

### Meta Tags Management

The SEO service automatically handles:

- **Title tags**: Dynamic titles with site branding
- **Meta descriptions**: Unique descriptions per page
- **Open Graph tags**: Social media sharing optimization
- **Canonical URLs**: Prevents duplicate content issues
- **Structured data**: JSON-LD for rich snippets

### Dynamic Configuration

All SEO and site configuration data is now fetched dynamically from your backend API. The system will automatically use the configuration from the `/site/config` endpoint, including:

- Site name and description
- Author information  
- Default Open Graph images
- Keywords and SEO metadata
- Social media handles
- Organization/publisher information

### Benefits of Dynamic Configuration

- **No personal data in code**: All personal information stays in your backend
- **Easy updates**: Change site information without redeploying frontend
- **Environment flexibility**: Different configs for staging/production
- **SEO consistency**: Automatic SEO tag generation using your brand data

### Error Handling

If the site config API is unavailable or fails to load, the application will throw errors and fail to build/render. This ensures that configuration issues are immediately visible and must be addressed before deployment.

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Errors
```bash
# Clear Angular cache
rm -rf .angular/cache
ng cache clean

# Clear node modules  
rm -rf node_modules package-lock.json
npm install
```

#### 2. SSR Rendering Issues
- Check that all components are SSR-compatible
- Ensure `document` and `window` objects are properly checked
- Use Angular's `isPlatformBrowser()` for browser-specific code

#### 3. Pre-rendering Hangs
- Verify API endpoints are accessible during build
- Check that all routes resolve properly
- Reduce the number of routes for testing
- Ensure API returns valid JSON responses

#### 4. SEO Not Working
- Verify meta tags in browser developer tools
- Test with social media debuggers (Facebook, LinkedIn)
- Ensure API provides all required SEO data (title, description, featuredImage)

#### 5. API Connection Issues
```bash
# Check if API is running
curl http://localhost:3000/api/site/config

# Verify CORS settings in API
# Ensure API allows requests from http://localhost:4202

# Check environment configuration
echo $API_URL
```

### Performance Optimization

#### Bundle Size
Current bundle size limits are set generously for development. For production:

1. Update `angular.json` budget limits:
```json
{
  "type": "initial", 
  "maximumWarning": "500kb",
  "maximumError": "1mb"
}
```

2. Analyze bundle size:
```bash
npm run build -- --stats-json
npx webpack-bundle-analyzer dist/personal-blog-front/browser/stats.json
```

#### Lazy Loading
Most routes use lazy loading. Ensure new routes follow this pattern:

```typescript
const routes: Routes = [
  {
    path: 'new-route',
    loadComponent: () => import('./new-route/new-route.component').then(m => m.NewRouteComponent)
  }
];
```

## 📝 Development Notes

### Adding New Blog Posts/Projects

1. Content is automatically fetched from your API
2. Routes are generated automatically during build
3. SEO tags are applied automatically
4. No code changes needed for new content

### Modifying Route Generation

Edit `scripts/fetch-slugs.mjs` to modify:
- API endpoints
- Route patterns  
- Data transformation
- Static routes list

### Custom Components

Follow existing patterns:
- Use SCSS for styling
- Implement proper TypeScript interfaces
- Follow Angular style guide
- Add proper error handling

## 🤝 Contributing

1. Follow the existing code style
2. Run `npm run format` before committing
3. Ensure all tests pass
4. Update documentation for new features

## 📄 License

[Your license here]

## 🆘 Support

For issues and questions:
1. Check this documentation first
2. Review Angular Universal documentation
3. Create an issue in the repository

---

*This documentation covers the complete setup and deployment process. Keep it updated as the project evolves.*