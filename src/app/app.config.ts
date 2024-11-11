import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http'
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CustomReuseStrategy } from './custom-reuse-strategy';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
     provideClientHydration(),
     provideHttpClient(withFetch()),
     provideAnimationsAsync(),
     { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
    ]
};
