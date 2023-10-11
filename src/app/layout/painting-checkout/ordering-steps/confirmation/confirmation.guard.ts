import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StripeService } from '../../stripe/stripe.service';
import { PaintingDetailsModalService } from 'src/app/layout/gallery/painting-card/painting-details-modal/painting-details-modal.service';

export const confirmationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const stripeService = inject(StripeService);
  const paintingDetailsModalService = inject(PaintingDetailsModalService);
  if(stripeService.getPaymentDataFromSessionStorage() && paintingDetailsModalService.getPaintingSelectedForPurchaseFromSessionStorage()) {
    return true;
  } else if (!paintingDetailsModalService.getPaintingSelectedForPurchaseFromSessionStorage()){
    router.navigate(['/gallery']);
    return false;
  } else {
    router.navigate(['/checkout','payment']);
    return false;
  }
};
