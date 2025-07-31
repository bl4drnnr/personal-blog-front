import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  try {
    let postsData = [];
    let projectsData = [];

    // Determine which environment to use
    const isDevelopment = process.env.NODE_ENV !== 'production';

    let API_URL;

    if (isDevelopment) {
      // Read from development environment file
      const envFile = 'environment.ts';
      const envPath = join(__dirname, '..', 'src', 'environments', envFile);
      const envContent = fs.readFileSync(envPath, 'utf-8');
      const apiUrlMatch = envContent.match(/apiUrl:\s*['"`]([^'"`]+)['"`]/);
      API_URL = apiUrlMatch ? apiUrlMatch[1] : null;
    } else {
      // Load production environment variables from .env.production first
      const envPath = join(__dirname, '..', '.env.production');
      config({ path: envPath });

      // Then read from production environment file
      const envFile = 'environment.prod.ts';
      const prodEnvPath = join(__dirname, '..', 'src', 'environments', envFile);
      const envContent = fs.readFileSync(prodEnvPath, 'utf-8');
      const apiUrlMatch = envContent.match(
        /apiUrl:\s*process\.env\[['"`]([^'"`]+)['"`]\]/
      );

      if (apiUrlMatch) {
        const envVarName = apiUrlMatch[1];
        API_URL = process.env[envVarName];
      }
    }

    if (!API_URL) {
      console.error(
        'API_URL could not be determined from environment configuration'
      );
      process.exit(1);
    }

    console.log(`Using API URL: ${API_URL}`);

    try {
      // Fetch from API
      const [postsResponse, projectsResponse] = await Promise.all([
        fetch(`${API_URL}/articles/posts/slugs`),
        fetch(`${API_URL}/projects/projects/slugs`)
      ]);

      if (!postsResponse.ok) {
        throw new Error(
          `Posts API responded with status: ${postsResponse.status}`
        );
      }
      if (!projectsResponse.ok) {
        throw new Error(
          `Projects API responded with status: ${projectsResponse.status}`
        );
      }

      postsData = await postsResponse.json();
      projectsData = await projectsResponse.json();

      console.log(`Fetched ${postsData.length} blog posts from API`);
      console.log(`Fetched ${projectsData.length} projects from API`);
    } catch (apiError) {
      console.error('Failed to fetch data from API:', apiError.message);
      process.exit(1);
    }

    // Generate routes for Angular prerendering
    const staticRoutes = [
      '/',
      '/blog',
      '/projects',
      '/contact',
      '/about-me',
      '/changelog',
      '/licenses',
      '/privacy',
      '/menu',
      '/subscribe'
    ];
    const blogRoutes = postsData.map((post) => `/blog/${post.slug}`);
    const projectRoutes = projectsData.map(
      (project) => `/projects/${project.slug}`
    );

    const allRoutes = [...staticRoutes, ...blogRoutes, ...projectRoutes];

    // Write routes file for Angular prerendering
    const routesContent = `export const PRERENDER_ROUTES = ${JSON.stringify(allRoutes, null, 2)};`;
    fs.writeFileSync('src/prerender-routes.ts', routesContent);

    // Write slugs data files for the Angular app
    const slugsData = {
      posts: postsData,
      projects: projectsData,
      routes: allRoutes,
      generated: new Date().toISOString()
    };

    fs.writeFileSync(
      'src/assets/slugs-data.json',
      JSON.stringify(slugsData, null, 2)
    );

    console.log(`Generated ${allRoutes.length} routes:`);
    console.log(`- ${staticRoutes.length} static routes`);
    console.log(`- ${blogRoutes.length} blog post routes`);
    console.log(`- ${projectRoutes.length} project routes`);
  } catch (error) {
    console.error('Error fetching slugs:', error);
    process.exit(1);
  }
})();
