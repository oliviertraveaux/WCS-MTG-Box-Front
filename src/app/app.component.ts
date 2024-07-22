import { Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RefreshOffersService } from './features/auth/shared/services/refresh-offers.service';
import { FooterComponent } from './layout/footer/footer.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { BreakpointObserverService } from './shared/services/breakpoint-observer.service';
import { BreadcrumbComponent } from './shared/ui/dynamic-links/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        TopbarComponent,
        FooterComponent,
        FormsModule,
        HttpClientModule,
        TranslateModule,
        BreadcrumbComponent,
    ],
    providers: [TranslateService],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor() {
        const preferredLanguage = localStorage.getItem('preferredLanguage') || 'fr';
        this.translate.use(preferredLanguage);
    }
    private readonly translate = inject(TranslateService);
    private readonly _router = inject(Router);
    private readonly _breakpointObserverService = inject(BreakpointObserverService);
    private readonly _destroyRef = inject(DestroyRef);
    private readonly _refreshOffersService = inject(RefreshOffersService);

    protected readonly Breakpoints = Breakpoints;

    public currentBreakpoint$ = this._breakpointObserverService.currentBreakpoints;

    ngOnInit() {
        this.translate.addLangs(['en', 'fr']);
        this._breakpointObserverService.breakpoint$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this._breakpointObserverService.breakpointChanged());

        this._refreshOffersService.refreshData$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe();
    }

    disableBreadCrumb(): boolean {
        const paths = ['/home', '/login', '/register', '/forgotten-password'];
        return paths.some((path) => this._router.url.startsWith(path));
    }

    isCurrentRoute(route: string): boolean {
        return this._router.url.startsWith(`/${route}`);
    }
}
