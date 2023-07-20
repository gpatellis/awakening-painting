import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ORDERING_STATUS } from '../painting-checkout.model';

@Injectable({
  providedIn: 'root'
})
export class OrderingStatusService {
  OrderingStatus$ = new BehaviorSubject<ORDERING_STATUS>(ORDERING_STATUS.shipping);

  constructor() { }
}
