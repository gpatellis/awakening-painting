import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {
  isLoadingIndicatorShowing$ = new Subject<boolean>();

  constructor() { }

  show() {
    this.isLoadingIndicatorShowing$.next(true);
  }

  hide() {
    this.isLoadingIndicatorShowing$.next(false);
  }
}
