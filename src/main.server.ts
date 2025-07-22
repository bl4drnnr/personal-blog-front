import { platformServer } from '@angular/platform-server';
import { AppServerModule } from './app/app.server.module';

const bootstrap = () => platformServer().bootstrapModule(AppServerModule);

export default bootstrap;
