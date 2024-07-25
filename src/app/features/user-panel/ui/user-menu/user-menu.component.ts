import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, filter, map, tap } from 'rxjs';
import { NotificationService } from '../../../../shared/services/notification.service';
import { UserRole } from '../../../../shared/user/enums/user-role.enum';
import { UserInfoStatesService } from '../../../../shared/user/services/user-info-states.service';

@Component({
    selector: 'app-user-menu',
    standalone: true,
    imports: [CommonModule, MatIconModule, RouterLink, TranslateModule, MatBadgeModule],
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
    private readonly _userInfoStatesService = inject(UserInfoStatesService);
    private readonly _notificationService = inject(NotificationService);
    private readonly _router = inject(Router);
    private readonly _destroyRef = inject(DestroyRef);
    currentPage?: string = this._router.url;
    mobileMenuInfo?: string;
    isUserAdmin!: boolean;
    offerMadeNotification$: Observable<boolean> =
        this._notificationService.getOfferMadeNotification();
    offerReceivedNotification$: Observable<boolean> =
        this._notificationService.getOfferReceivedNotification();

    ngOnInit() {
        this.isUserAdmin = this._userInfoStatesService.getUserInfo().role.type === UserRole.ADMIN;
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntilDestroyed(this._destroyRef),
                map(() => this._router.url),
                tap((url) => {
                    this.currentPage = url;
                    this.mobileMenuInfo = this.getPageTitle();
                })
            )
            .subscribe();

        this.mobileMenuInfo = this.getPageTitle();
    }

    showMenu: boolean = false;
    toggleNavbar() {
        this.showMenu = !this.showMenu;
    }
    closeNavbar() {
        this.showMenu = false;
    }

    getPageTitle(): string {
        const array = this._router.url.split('/');
        return array.length > 1 ? array[2] : 'profile';
    }
}
