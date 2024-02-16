import { Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserverService } from '@shared';
import { FooterComponent } from './layout/footer/footer.component';
import { TopbarComponent } from './layout/topbar/topbar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, TopbarComponent, FooterComponent, FormsModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    private _breakpointObserverService = inject(BreakpointObserverService);
    private _destroyRef = inject(DestroyRef);

    protected readonly Breakpoints = Breakpoints;

    public currentBreakpoint$ = this._breakpointObserverService.currentBreakpoint;

    ngOnInit() {
        this._breakpointObserverService.breakpoint$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this._breakpointObserverService.breakpointChanged());
    }
}
