import { CanActivateFn, Router } from '@angular/router';
import { ShippingService } from '../shipping/shipping.service';
import { inject } from '@angular/core';
import { PaintingDetailsModalService } from 'src/app/layout/gallery/painting-card/painting-details-modal/painting-details-modal.service';

export const paymentGuard: CanActivateFn = (route, state) => {
  const shippingService = inject(ShippingService);
  const paintingDetailsModalService = inject(PaintingDetailsModalService)
  const router = inject(Router);
  if(shippingService.getShippingAddressFromSessionStorage() && paintingDetailsModalService.getPaintingSelectedForPurchaseFromSessionStorage()) {
    return true;
  }
  else if (!paintingDetailsModalService.getPaintingSelectedForPurchaseFromSessionStorage()) {
    router.navigate(['/gallery']);
    return false;
  }
  else {
    router.navigate(['/checkout','shipping']);
    return false;
  }
};

