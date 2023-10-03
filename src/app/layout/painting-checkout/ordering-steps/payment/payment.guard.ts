import { CanActivateFn, Router } from '@angular/router';
import { ShippingService } from '../shipping/shipping.service';
import { inject } from '@angular/core';
import { PaintingCheckoutService } from '../../painting-checkout.service';

export const paymentGuard: CanActivateFn = (route, state) => {
  const shippingService = inject(ShippingService);
  const paintingCheckoutService = inject(PaintingCheckoutService)
  const router = inject(Router);
  if(shippingService.getShippingAddressFromSessionStorage() && !paintingCheckoutService.orderComplete) {
    return true;
  }
  else {
    return false;
  }
};

