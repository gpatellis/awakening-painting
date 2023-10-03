import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { shippingGuard } from './shipping.guard';

describe('shippingGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => shippingGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
