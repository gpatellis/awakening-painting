import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { PaintingDetailsModalService } from 'src/app/layout/gallery/painting-card/painting-details-modal/painting-details-modal.service';

export const shippingGuard: CanActivateFn = (route, state) => {
  const paintingDetailsModalService = inject(PaintingDetailsModalService)
  return paintingDetailsModalService.getPaintingSelectedForPurchaseFromSessionStorage() ? true : false;
}
