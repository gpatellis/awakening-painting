import { Component, Input } from '@angular/core';
import { PAYMENT_CONFRIMATION_DATA } from '../../payment/payment.model';
import { ADDRESS } from '../../shipping/shipping.model';
import { ShippingService } from '../../shipping/shipping.service';

@Component({
  selector: 'ap-shipping-summary',
  templateUrl: './shipping-summary.component.html',
  styleUrls: ['./shipping-summary.component.scss']
})
export class ShippingSummaryComponent {

  @Input() paymentConfirmationData: PAYMENT_CONFRIMATION_DATA;
  @Input() shippingData: ADDRESS | undefined;

}
