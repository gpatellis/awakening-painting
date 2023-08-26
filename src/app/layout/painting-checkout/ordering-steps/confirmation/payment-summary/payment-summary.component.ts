import { Component, Input } from '@angular/core';
import { PAYMENT_CONFRIMATION_DATA } from '../../payment/payment.model';

@Component({
  selector: 'ap-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss']
})
export class PaymentSummaryComponent {
  
  @Input() paymentConfirmationData: PAYMENT_CONFRIMATION_DATA;

  getExpirationDateMonth(month: number): number | string {
    if(month < 10) {
      return month.toString().padStart(2, '0');
    }
    return month;
  }
}
