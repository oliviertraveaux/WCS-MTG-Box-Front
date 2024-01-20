import {inject, Injectable, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {BehaviorSubject, distinctUntilChanged, Observable, ReplaySubject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BreakpointObserverService {
  private breakpointObserver = inject(BreakpointObserver)

  public Breakpoints = Breakpoints;
  public currentBreakpoint: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([Breakpoints.XSmall]);

  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .pipe(
      tap(value => console.log(value.breakpoints)),
      distinctUntilChanged()
    );

  public breakpointChanged() {
    if(this.breakpointObserver.isMatched(Breakpoints.XLarge)) {
      this.currentBreakpoint.next([Breakpoints.XLarge, Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall]);
    } else if(this.breakpointObserver.isMatched(Breakpoints.Large)) {
      this.currentBreakpoint.next([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall]);
    } else if(this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.currentBreakpoint.next([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall]);
    } else if(this.breakpointObserver.isMatched(Breakpoints.Small)) {
      this.currentBreakpoint.next([Breakpoints.Small, Breakpoints.XSmall]);
    } else if(this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
      this.currentBreakpoint.next([Breakpoints.XSmall]);
    }
  }
}
