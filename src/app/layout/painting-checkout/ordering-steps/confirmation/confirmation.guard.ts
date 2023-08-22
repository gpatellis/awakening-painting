import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PaymentService } from '../payment/payment.service';

export const confirmationGuard: CanActivateFn = (route, state) => {
  const paymentService = inject(PaymentService);
  const router = inject(Router);
  if(paymentService.isPaymentFormComplete) {
    return true;
  } else {
    router.navigate(['/checkout','payment']);
    return false;
  }
};
