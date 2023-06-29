import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { paintingCheckoutGuard } from './painting-checkout.guard';

describe('paintingCheckoutGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => paintingCheckoutGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
