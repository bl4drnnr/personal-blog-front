import * as fs from 'fs';
import { PRERENDER_ROUTES } from '../src/prerender-routes.ts';

const angularJsonPath = 'angular.json';

try {
  // Read angular.json
  const angularJson = JSON.parse(fs.readFileSync(angularJsonPath, 'utf8'));

  // Update prerender routes
  const prerenderConfig =
    angularJson.projects['personal-blog-front'].architect.prerender;
  if (prerenderConfig) {
    prerenderConfig.options.routes = PRERENDER_ROUTES;

    // Write updated angular.json
    fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2));
    console.log(
      `Updated prerender configuration with ${PRERENDER_ROUTES.length} routes`
    );
  } else {
    console.error('Prerender configuration not found in angular.json');
  }
} catch (error) {
  console.error('Error updating angular.json:', error.message);
}
