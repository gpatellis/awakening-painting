import { Component, OnInit } from '@angular/core';
import { StripeService } from '../../stripe/stripe.service';
import { Router } from '@angular/router';
import { ShippingService } from '../shipping/shipping.service';
import { ADDRESS } from '../shipping/shipping.model';
import { PAYMENT_CONFRIMATION_DATA } from '../payment/payment.model';

@Component({
  selector: 'ap-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  
  paymentConfirmationData: PAYMENT_CONFRIMATION_DATA = this.stripeSerivce.getPaymentConfirmationData();
  shippingData: ADDRESS | undefined = this.shippingService.matchedAddress ? this.shippingService.matchedAddress : this.shippingService.getShippingAddressFromSessionStorage();

  constructor(private stripeSerivce: StripeService,
    private router: Router,
    public shippingService: ShippingService){}

  submitPayment() {
    this.stripeSerivce.submitPayment();
  }

}
