import { Component, OnDestroy } from '@angular/core';
import { StripeService } from '../../stripe/stripe.service';
import { ShippingService } from '../shipping/shipping.service';
import { ADDRESS } from '../shipping/shipping.model';
import { PAYMENT_CONFRIMATION_DATA } from '../payment/payment.model';
import { ConfirmationService } from './confirmation.service';
import { STRIPE_PAYMENT_CONFIRMATION_RESPONSE, UPDATE_SOLD_PAINTING_RESPONSE } from './confirmation.model';
import { UPDATE_SOLD_PAINTING, UPDATE_SOLD_PAINTING_CONSOLE_ERROR, UPDATE_SOLD_PAINTING_RESPONSES } from './confirmation.constants';
import { PAINTING_ALREADY_SOLD, PAYMENT_ERROR } from 'src/app/api-error-messages.constants';
import { ErrorDialogService } from 'src/app/shared-services/error-dialog/error-dialog.service';
import { LoadingIndicatorService } from 'src/app/shared-services/loading-indicator/loading-indicator.service';

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
    private confirmationService: ConfirmationService,
    private errorDialogService: ErrorDialogService,
    private loadingIndicatorService: LoadingIndicatorService) {}

  processOrder(): void {
    this.loadingIndicatorService.show();
    this.confirmationService.updateSoldPainting(UPDATE_SOLD_PAINTING.sold).subscribe((response: UPDATE_SOLD_PAINTING_RESPONSE) => {
      if(response.update == UPDATE_SOLD_PAINTING_RESPONSES.successfull) {
        this.submitPaymentToStripe();
      } else if (response.update == UPDATE_SOLD_PAINTING_RESPONSES.paintingAlreadySold) {
        this.loadingIndicatorService.hide();
        this.errorDialogService.open(PAINTING_ALREADY_SOLD);
      } else {
        this.loadingIndicatorService.hide();
        this.errorDialogService.open(PAYMENT_ERROR, UPDATE_SOLD_PAINTING_CONSOLE_ERROR);
      }
    });
  }

 submitPaymentToStripe(): void {
  this.stripeService.submitPayment(this.paymentConfirmationData.paymentIntent.client_secret, this.paymentConfirmationData.paymentMethodDetails.id).then((result: STRIPE_PAYMENT_CONFIRMATION_RESPONSE) => {
    if (result.error) {
      this.loadingIndicatorService.hide();
      this.confirmationService.processStripePaymentConfirmationError(result.error);
    } else {
      this.confirmationService.checkStripePaymentResponse(result);
    }
  });
 }

  ngOnDestroy(): void {
    this.stripeService.deletePaymentDataFromSessionStorage();
  }
}
