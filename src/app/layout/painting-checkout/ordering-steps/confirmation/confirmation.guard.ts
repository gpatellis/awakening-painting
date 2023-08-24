import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PaymentService } from '../payment/payment.service';
import { ConfirmationService } from './confirmation.service';

export const confirmationGuard: CanActivateFn = (route, state) => {
  const paymentService = inject(PaymentService);
  const router = inject(Router);
  const confirmationService = inject(ConfirmationService)
  if(paymentService.isPaymentFormComplete || confirmationService.getPaymentDataFromSessionStorage()) {
    return true;
  } else {
    router.navigate(['/checkout','payment']);
    return false;
  }
};
