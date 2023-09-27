import { Component, OnDestroy } from '@angular/core';
import { StripeService } from '../../stripe/stripe.service';
import { ShippingService } from '../shipping/shipping.service';
import { ADDRESS } from '../shipping/shipping.model';
import { PAYMENT_CONFRIMATION_DATA } from '../payment/payment.model';
import { ConfirmationService } from './confirmation.service';
import { STRIPE_PAYMENT_CONFIRMATION_RESPONSE } from './confirmation.model';

@Component({
  selector: 'ap-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnDestroy {
  
  paymentConfirmationData: PAYMENT_CONFRIMATION_DATA = this.stripeService.getPaymentDataFromSessionStorage();
  shippingData: ADDRESS | undefined = this.shippingService.matchedAddress ? this.shippingService.matchedAddress : this.shippingService.getShippingAddressFromSessionStorage();

  constructor(private stripeService: StripeService,
    private shippingService: ShippingService,
    private confirmationService: ConfirmationService){}

  processOrder() {
    this.stripeService.submitPayment(this.paymentConfirmationData.paymentIntent.client_secret, this.paymentConfirmationData.paymentMethodDetails.id).then((result: STRIPE_PAYMENT_CONFIRMATION_RESPONSE) => {
      if (result.error) {
        this.confirmationService.processStripePaymentConfirmationError(result.error);
      } else {
        this.confirmationService.processOrder(result);
      }
    });
 }

  ngOnDestroy(): void {
    this.stripeService.deletePaymentDataFromSessionStorage();
  }
}
