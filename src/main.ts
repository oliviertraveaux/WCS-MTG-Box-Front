import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';



bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([]), withFetch()),
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom([MatSnackBarModule]),
  ],
}).catch((err) => console.error(err));
