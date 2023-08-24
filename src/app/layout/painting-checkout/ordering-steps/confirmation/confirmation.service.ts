import { Injectable } from '@angular/core';
import { PAYMENT_CONFRIMATION_DATA } from '../payment/payment.model';
import { ADDRESS } from '../shipping/shipping.model';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  
  constructor() { }

  getPaymentDataFromSessionStorage() {
    let paymentConfirmationDataString = sessionStorage.getItem('paymentConfirmationData');
    let paymentConfirmationData = JSON.parse(paymentConfirmationDataString as string);
    return paymentConfirmationData;
  }

  setPaymentDataInSessionStorage(paymentConfirmationData: PAYMENT_CONFRIMATION_DATA) {
    sessionStorage.setItem('paymentConfirmationData', JSON.stringify(paymentConfirmationData));
  }
}
