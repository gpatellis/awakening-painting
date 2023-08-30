import { CanActivateFn, Router } from '@angular/router';
import { ShippingService } from '../shipping/shipping.service';
import { inject } from '@angular/core';

export const paymentGuard: CanActivateFn = (route, state) => {
  const shippingService = inject(ShippingService);
  const router = inject(Router);
  if(shippingService.getShippingAddressFromSessionStorage()) {
    return true;
  }
  else {
    router.navigate(['/checkout','shipping']);
    return false;
  }
};

