import { Component, OnDestroy } from '@angular/core';
import { StripeService } from '../../stripe/stripe.service';
import { ShippingService } from '../shipping/shipping.service';
import { ADDRESS } from '../shipping/shipping.model';
import { PAYMENT_CONFRIMATION_DATA } from '../payment/payment.model';
import { ConfirmationService } from './confirmation.service';

@Component({
  selector: 'ap-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnDestroy {
  
  paymentConfirmationData: PAYMENT_CONFRIMATION_DATA = this.confirmationService.getPaymentDataFromSessionStorage();
  shippingData: ADDRESS | undefined = this.shippingService.matchedAddress ? this.shippingService.matchedAddress : this.shippingService.getShippingAddressFromSessionStorage();

  constructor(private stripeSerivce: StripeService,
    public shippingService: ShippingService,
    public confirmationService: ConfirmationService){}

  submitPayment() {
    if(this.paymentConfirmationData.paymentIntent?.client_secret)
      this.stripeSerivce.submitPayment(this.paymentConfirmationData?.paymentIntent?.client_secret, this.paymentConfirmationData?.paymentMethodDetails.id);
  }

  ngOnDestroy(): void {
    this.confirmationService.deletePaymentDataFromSessionStorage();
  }
}
