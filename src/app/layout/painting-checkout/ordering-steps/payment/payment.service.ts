import { Injectable } from '@angular/core';
import { Observable, Subject, combineLatestWith, map } from 'rxjs';
import { CARRIER_RATE } from '../shipping/shipping.model';
import { StripeShippingAddressElementChangeEvent } from '@stripe/stripe-js';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  isAddressElementComplete$ = new Subject<boolean>();
  isCardInputElementComplete$ = new Subject<boolean>();
  carrierRateSelected$ = new Subject<CARRIER_RATE>();
  isPaymentFormComplete: boolean;

  constructor() {
   }

  isPaymentFormCompleted(): Observable<boolean> {
    return this.isCardInputElementComplete$.pipe(
      combineLatestWith(this.isAddressElementComplete$, this.carrierRateSelected$),
      map(([isCardInputElementComplete, isAddressElementComplete, carrierOptionSelected]) => {
        this.isPaymentFormComplete = (isCardInputElementComplete && isAddressElementComplete && (carrierOptionSelected !== undefined));
        return this.isPaymentFormComplete;
      })
    )
  }

  storeBillingAddressInSessionStorage(addressEvent: StripeShippingAddressElementChangeEvent): void {
    sessionStorage.setItem('billingAddress', JSON.stringify(addressEvent));
  }

  getBillingAddressFromSessionStorage(): StripeShippingAddressElementChangeEvent | undefined {
    let billingAddressString = sessionStorage.getItem('billingAddress');
    if(billingAddressString?.length) {
      let billingAddress = JSON.parse(billingAddressString as string);
      return billingAddress as StripeShippingAddressElementChangeEvent;
    }
    return;
  }

  deleteBillingAddressFromSessionStorage(): void {
    sessionStorage.removeItem('billingAddress');
  }
}
