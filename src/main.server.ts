import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent }        from './app/app.component';
import { config }              from './app/app.config.server';
import { provideHttpClient }   from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

const bootstrap = () =>
  bootstrapApplication(AppComponent, {
    ...config,
    providers: [
      provideRouter(routes),
      provideHttpClient(),

      ...(config.providers ?? [])
    ]
  });

export default bootstrap;
