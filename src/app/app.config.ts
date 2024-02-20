import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {CookieService} from "ngx-cookie-service";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(),   CookieService ]
};
