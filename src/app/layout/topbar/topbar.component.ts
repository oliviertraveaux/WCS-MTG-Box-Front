import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoginService } from '../../features/auth/shared/services/login.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        RouterLink,
        TranslateModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        FormsModule,
    ],
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
    selectedLanguage: string | null =
        localStorage.getItem('preferredLanguage') === 'en' ? 'en' : 'fr';
    languages = [
        localStorage.getItem('preferredLanguage') === 'en'
            ? { name: 'en', icon: '🇬🇧' }
            : { name: 'fr', icon: '🇫🇷' },
        localStorage.getItem('preferredLanguage') === 'en'
            ? { name: 'fr', icon: '🇫🇷' }
            : { name: 'en', icon: '🇬🇧' },
    ];

    constructor(
        protected authService: LoginService,
        private translate: TranslateService
    ) {}

    isLoggedIn(): boolean {
        return this.authService.isAuthenticated();
    }

    logout() {
        this.authService.logout();
    }

    switchLanguage(language: string) {
        this.translate.use(language);
        localStorage.setItem('preferredLanguage', language);
    }
}
