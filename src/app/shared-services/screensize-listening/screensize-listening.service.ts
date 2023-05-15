import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreensizeListeningService {
  public isMobileView$ = new BehaviorSubject<boolean>(false);
  public isTabletView$ = new BehaviorSubject<boolean>(false);
  public isMobileOrTabletView$ = new BehaviorSubject<boolean>(false);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.checkMobileView();
    this.checkTabletView();
    this.checkTabletOrMobileView();
   }

  checkMobileView(): void {
    this.breakpointObserver.observe([
      "(max-width: 576px)"
    ]).subscribe((result: BreakpointState) => {
      (result.matches) ?  this.isMobileView$.next(true): this.isMobileView$.next(false);
    });
  }

  checkTabletView(): void {
    this.breakpointObserver.observe([
      "(max-width: 992px)", "(min-width: 577px)"
    ]).subscribe((result: BreakpointState) => {
      (result.breakpoints["(max-width: 992px)"] && result.breakpoints["(min-width: 577px)"]) ? this.isTabletView$.next(true): this.isTabletView$.next(false);
    });
  }

  checkTabletOrMobileView(): void {
    combineLatest([this.isMobileView$, this.isTabletView$]).subscribe(([isMobileViewValue, isTabletViewValue]) => {
      (isMobileViewValue || isTabletViewValue) ? this.isMobileOrTabletView$.next(true): this.isMobileOrTabletView$.next(false);
    })
  }
  
}
