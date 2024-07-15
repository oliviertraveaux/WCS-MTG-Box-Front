import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, of, tap } from 'rxjs';
import { LoginService } from '../../features/auth/shared/services/login.service';
import { NotificationService } from '../../shared/services/notification.service';
import { UserInfoStatesService } from '../../shared/user/services/user-info-states.service';

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
        MatMenuModule,
        MatBadgeModule,
    ],
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
    private _userInfoStatesService = inject(UserInfoStatesService);
    private _authService = inject(LoginService);
    private _translate = inject(TranslateService);
    private _notificationService = inject(NotificationService);
    private _destroyRef = inject(DestroyRef);

    offerNotification$: Observable<boolean> = of(false);
    name!: string;
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

    ngOnInit(): void {
        this._userInfoStatesService.getUserInfo$().subscribe((userInfo: any) => {
            this.name = userInfo.username;
        });

        this.offerNotification$ = this._notificationService.offerNotification$;

        this._notificationService.hasOfferReceivedLengthChanged
            .pipe(
                tap((value) => console.log('from topbar hasOfferReceivedLengthChanged', value)),
                takeUntilDestroyed(this._destroyRef),
                tap(() => this._notificationService.setOfferReceivedNotification(true))
            )
            .subscribe();

        this._notificationService.hasOffersMadeStatusChanged
            .pipe(
                tap((value) => console.log('from topbar hasOffersMadeStatusChanged', value)),
                takeUntilDestroyed(this._destroyRef),
                tap(() => this._notificationService.setOfferMadeNotification(true))
            )
            .subscribe();
    }

    isLoggedIn(): boolean {
        return this._authService.isAuthenticated();
    }

    logout() {
        this._authService.logout();
    }

    switchLanguage(language: string) {
        this._translate.use(language);
        localStorage.setItem('preferredLanguage', language);
    }
}
