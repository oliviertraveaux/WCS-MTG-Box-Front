import { Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from './layout/footer/footer.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { BreakpointObserverService } from './shared/services/breakpoint-observer.service';

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
    ],
    providers: [TranslateService],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private translate: TranslateService) {
        const preferredLanguage = localStorage.getItem('preferredLanguage') || 'fr';
        this.translate.use(preferredLanguage);
    }

    private _breakpointObserverService = inject(BreakpointObserverService);
    private _destroyRef = inject(DestroyRef);

    protected readonly Breakpoints = Breakpoints;

    public currentBreakpoint$ = this._breakpointObserverService.currentBreakpoints;

    ngOnInit() {
        this.translate.addLangs(['en', 'fr']);
        this._breakpointObserverService.breakpoint$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this._breakpointObserverService.breakpointChanged());
    }
}
