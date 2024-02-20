import {HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import {TranslateModule, TranslateLoader, } from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";






export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([]), withFetch()),
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom([MatSnackBarModule]),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),


    ])
  ],
}).catch((err) => console.error(err));
