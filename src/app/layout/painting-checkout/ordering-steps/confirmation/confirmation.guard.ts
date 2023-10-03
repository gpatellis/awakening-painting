import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StripeService } from '../../stripe/stripe.service';
import { PaintingCheckoutService } from '../../painting-checkout.service';

export const confirmationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const stripeService = inject(StripeService);
  const paintingCheckoutService = inject(PaintingCheckoutService);
  if(stripeService.getPaymentDataFromSessionStorage() && !paintingCheckoutService.orderComplete) {
    return true;
  } else {
    return false;
  }
};
