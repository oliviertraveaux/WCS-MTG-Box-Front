import {
    HttpClient,
    HttpClientModule,
    provideHttpClient,
    withFetch,
    withInterceptors,
} from '@angular/common/http';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { initializeAppFactory } from './app-initializer';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(withInterceptors([]), withFetch()),
        {
            provide: APP_INITIALIZER,
            useFactory: initializeAppFactory,
            multi: true,
            deps: [HttpClient],
        },
        provideAnimations(),
        provideRouter(routes),
        importProvidersFrom([MatSnackBarModule]),
        importProvidersFrom(HttpClientModule),
        importProvidersFrom([
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient],
                },
            }),
        ]),
    ],
}).catch((err) => console.error(err));
