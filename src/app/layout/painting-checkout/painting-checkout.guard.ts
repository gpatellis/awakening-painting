import { CanActivateFn, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PaintingDetailsModalService } from '../gallery/painting-card/painting-details-modal/painting-details-modal.service';
import { inject } from '@angular/core';

export const paintingCheckoutGuard: CanActivateFn = (route, state) => {
  const paintingDetailsModalService = inject(PaintingDetailsModalService);
  const router = inject(Router);
  if (paintingDetailsModalService.getPaintingSelectedForPurchaseFromSessionStorage() && environment.allowOnlineCheckout) {
    return true;
  } else {
    router.navigate(['/gallery']);
    return false;
  }
};
