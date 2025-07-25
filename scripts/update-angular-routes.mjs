import * as fs from 'fs';

const prerenderRoutesPath = 'src/prerender-routes.ts';
const angularJsonPath = 'angular.json';

try {
  // Read the prerender routes
  const routesContent = fs.readFileSync(prerenderRoutesPath, 'utf8');
  const routesMatch = routesContent.match(
    /export const PRERENDER_ROUTES = (\[[\s\S]*?\]);/
  );

  if (!routesMatch) {
    throw new Error('Could not parse PRERENDER_ROUTES from file');
  }

  const routes = JSON.parse(routesMatch[1]);

  // Read angular.json
  const angularJson = JSON.parse(fs.readFileSync(angularJsonPath, 'utf8'));

  // Update prerender routes
  const prerenderConfig =
    angularJson.projects['personal-blog-front'].architect.prerender;
  if (prerenderConfig) {
    prerenderConfig.options.routes = routes;

    // Write updated angular.json
    fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2));
    console.log(`Updated prerender configuration with ${routes.length} routes`);
  } else {
    console.error('Prerender configuration not found in angular.json');
  }
} catch (error) {
  console.error('Error updating angular.json:', error.message);
}
