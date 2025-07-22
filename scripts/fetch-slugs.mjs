import * as fs from 'fs';

(async () => {
  try {
    let postsData = [];
    let projectsData = [];

    if (!process.env.API_URL) {
      console.error('API_URL environment variable is not set');
      process.exit(1);
    }

    try {
      // Fetch from API
      const [postsResponse, projectsResponse] = await Promise.all([
        fetch(`${process.env.API_URL}/posts/slugs`),
        fetch(`${process.env.API_URL}/projects/slugs`)
      ]);

      if (!postsResponse.ok) {
        throw new Error(`Posts API responded with status: ${postsResponse.status}`);
      }
      if (!projectsResponse.ok) {
        throw new Error(`Projects API responded with status: ${projectsResponse.status}`);
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
    const staticRoutes = ['/', '/blog', '/projects', '/contact', '/about-me'];
    const blogRoutes = postsData.map(post => `/blog/${post.slug}`);
    const projectRoutes = projectsData.map(project => `/projects/${project.slug}`);
    
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

    fs.writeFileSync('src/assets/slugs-data.json', JSON.stringify(slugsData, null, 2));

    console.log(`Generated ${allRoutes.length} routes:`);
    console.log(`- ${staticRoutes.length} static routes`);
    console.log(`- ${blogRoutes.length} blog post routes`);
    console.log(`- ${projectRoutes.length} project routes`);

  } catch (error) {
    console.error('Error fetching slugs:', error);
    process.exit(1);
  }
})();
