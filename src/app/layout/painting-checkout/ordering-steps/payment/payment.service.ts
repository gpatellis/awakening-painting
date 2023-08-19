import { Injectable } from '@angular/core';
import { Subject, combineLatestWith } from 'rxjs';
import { CARRIER_RATE } from '../shipping/shipping.model';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  isAddressElementComplete$ = new Subject<boolean>();
  isCardInputElementComplete$ = new Subject<boolean>();
  carrierOptionSelected$ = new Subject<CARRIER_RATE>();

  constructor() {
   }

  isPaymentFormCompleted() {
    return this.isCardInputElementComplete$.pipe(
      combineLatestWith(this.isAddressElementComplete$, this.carrierOptionSelected$)
    )
  }
}
