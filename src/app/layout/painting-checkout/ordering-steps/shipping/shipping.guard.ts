import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { PaintingCheckoutService } from '../../painting-checkout.service';

export const shippingGuard: CanActivateFn = (route, state) => {
  const paintingCheckoutService = inject(PaintingCheckoutService);
  return !paintingCheckoutService.orderComplete;
};
