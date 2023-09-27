import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StripeService } from '../../stripe/stripe.service';

export const confirmationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const stripeService = inject(StripeService)
  if(stripeService.getPaymentDataFromSessionStorage()) {
    return true;
  } else {
    router.navigate(['/checkout','payment']);
    return false;
  }
};
