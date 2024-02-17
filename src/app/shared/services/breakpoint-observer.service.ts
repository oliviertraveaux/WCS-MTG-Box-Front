import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, map, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BreakpointObserverService {
    private _breakpointObserver = inject(BreakpointObserver);

    Breakpoints = Breakpoints;
    currentBreakpoints: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([
        Breakpoints.XSmall,
    ]);

    mobileBreakpoints = [Breakpoints.XSmall];
    tabletBreakpoints = [Breakpoints.Small, Breakpoints.XSmall];
    mediumBreakpoints = [Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Medium];
    desktopBreakpoints = [
        Breakpoints.Small,
        Breakpoints.XSmall,
        Breakpoints.Medium,
        Breakpoints.Large,
    ];
    largeDesktopBreakpoints = [
        Breakpoints.Small,
        Breakpoints.XSmall,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
    ];

    isMobile: Observable<boolean> = this.currentBreakpoints.pipe(
        map((value) => value.includes(Breakpoints.XSmall))
    );
    isTablet: Observable<boolean> = this.currentBreakpoints.pipe(
        map((value) => value.includes(Breakpoints.Small))
    );
    isDesktop: Observable<boolean> = this.currentBreakpoints.pipe(
        map((value) => value.includes(Breakpoints.Large))
    );

    readonly breakpoint$ = this._breakpointObserver
        .observe([
            Breakpoints.XSmall,
            Breakpoints.Small,
            Breakpoints.Medium,
            Breakpoints.Large,
            Breakpoints.XLarge,
        ])
        .pipe(
            tap((value) => console.log(value.breakpoints)),
            distinctUntilChanged()
        );

    public breakpointChanged() {
        if (this._breakpointObserver.isMatched(Breakpoints.XLarge)) {
            this.currentBreakpoints.next(this.largeDesktopBreakpoints);
        } else if (this._breakpointObserver.isMatched(Breakpoints.Large)) {
            this.currentBreakpoints.next(this.desktopBreakpoints);
        } else if (this._breakpointObserver.isMatched(Breakpoints.Medium)) {
            this.currentBreakpoints.next(this.mediumBreakpoints);
        } else if (this._breakpointObserver.isMatched(Breakpoints.Small)) {
            this.currentBreakpoints.next(this.tabletBreakpoints);
        } else if (this._breakpointObserver.isMatched(Breakpoints.XSmall)) {
            this.currentBreakpoints.next(this.mobileBreakpoints);
        }
    }
}
