import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreensizeListeningService {
  public isMobileView = new BehaviorSubject<boolean>(false);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.checkMobileView();
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
  
}
