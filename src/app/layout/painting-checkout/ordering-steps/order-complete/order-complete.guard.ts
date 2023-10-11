import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ConfirmationService } from '../confirmation/confirmation.service';
import { PaintingDetailsModalService } from 'src/app/layout/gallery/painting-card/painting-details-modal/painting-details-modal.service';

export const orderCompleteGuard: CanActivateFn = (route, state) => {
  const confirmationService = inject(ConfirmationService);
  const paintingDetailsModalSerivce = inject(PaintingDetailsModalService);
  const router = inject(Router)
  if (confirmationService.orderComplete && paintingDetailsModalSerivce.getPaintingSelectedForPurchaseFromSessionStorage()) {
    return true;
  } else {
    router.navigate(['/gallery']);
    return false;
  }
};
