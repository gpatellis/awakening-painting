import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreensizeListeningService {
  public isMobileView = new BehaviorSubject<boolean>(false);
  public isTabletView = new BehaviorSubject<boolean>(false);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.checkMobileView();
    this.checkTabletView();
   }

  checkMobileView() {
    this.breakpointObserver.observe([
      "(max-width: 576px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.isMobileView.next(true);
      } else {
        this.isMobileView.next(false)
      }
    });
  }

  checkTabletView() {
    this.breakpointObserver.observe([
      "(max-width: 768px)", "(min-width: 577px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.breakpoints["(max-width: 768px)"] && result.breakpoints["(min-width: 577px)"]) {
        this.isTabletView.next(true);
      } else {
        this.isTabletView.next(false)
      }
    });
  }
  
}
