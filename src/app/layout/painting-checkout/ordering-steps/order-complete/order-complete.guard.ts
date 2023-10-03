import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PaintingCheckoutService } from '../../painting-checkout.service';

export const orderCompleteGuard: CanActivateFn = (route, state) => {
  const paintingCheckoutService = inject(PaintingCheckoutService);
  const router = inject(Router)
  if (paintingCheckoutService.orderComplete) {
    return true;
  } else {
    router.navigate(['/gallery']);
    return false;
  }
};
