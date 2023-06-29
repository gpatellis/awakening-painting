import { CanActivateFn } from '@angular/router';
import { environment } from 'src/environments/environment';

export const paintingCheckoutGuard: CanActivateFn = (route, state) => {
  return environment.allowOnlineCheckout;
};
