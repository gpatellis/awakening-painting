import { Injectable } from '@angular/core';
import { StripeService } from './stripe/stripe.service';
import { ShippingService } from './ordering-steps/shipping/shipping.service';
import { PaintingDetailsModalService } from '../gallery/painting-card/painting-details-modal/painting-details-modal.service';

@Injectable({
  providedIn: 'root'
})
export class PaintingCheckoutService {

  constructor(private stripeService: StripeService,
    private shippingService: ShippingService,
    private paintingDetailsModalService: PaintingDetailsModalService) { }

  clearAllCheckoutData() {
    this.stripeService.stripeElements$.next(undefined);
    this.shippingService.deleteShippingAddressFromSessionStorage();
    this.stripeService.deletePaymentDataFromSessionStorage();
    this.stripeService.deletePaymentIntentFromSessionStorage();
    this.paintingDetailsModalService.deletePaintingSelectedForPurchaseFromSessionStorage();
  }
}
