import { Injectable } from '@angular/core';
import { PAYMENT_CONFRIMATION_DATA } from '../payment/payment.model';
import { ADDRESS } from '../shipping/shipping.model';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  
  constructor() { }

  getPaymentDataFromSessionStorage(): PAYMENT_CONFRIMATION_DATA {
    let paymentConfirmationDataString = sessionStorage.getItem('paymentConfirmationData');
    let paymentConfirmationData = JSON.parse(paymentConfirmationDataString as string);
    return paymentConfirmationData;
  }

  setPaymentDataInSessionStorage(paymentConfirmationData: PAYMENT_CONFRIMATION_DATA): void {
    sessionStorage.setItem('paymentConfirmationData', JSON.stringify(paymentConfirmationData));
  }

  deletePaymentDataFromSessionStorage(): void {
    sessionStorage.removeItem('paymentConfirmationData');
  }
}
