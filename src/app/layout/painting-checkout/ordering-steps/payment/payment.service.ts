import { Injectable } from '@angular/core';
import { Observable, Subject, combineLatestWith, map } from 'rxjs';
import { CARRIER_RATE } from '../shipping/shipping.model';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  isAddressElementComplete$ = new Subject<boolean>();
  isCardInputElementComplete$ = new Subject<boolean>();
  carrierOptionSelected$ = new Subject<CARRIER_RATE>();
  isPaymentFormComplete: boolean;

  constructor() {
   }

  isPaymentFormCompleted(): Observable<boolean> {
    return this.isCardInputElementComplete$.pipe(
      combineLatestWith(this.isAddressElementComplete$, this.carrierOptionSelected$),
      map(([isCardInputElementComplete, isAddressElementComplete, carrierOptionSelected]) => {
        this.isPaymentFormComplete = (isCardInputElementComplete && isAddressElementComplete && (carrierOptionSelected !== undefined));
        return this.isPaymentFormComplete;
      })
    )
  }
}
