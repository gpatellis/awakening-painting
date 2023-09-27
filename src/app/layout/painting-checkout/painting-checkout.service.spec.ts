import { TestBed } from '@angular/core/testing';

import { PaintingCheckoutService } from './painting-checkout.service';

describe('PaintingCheckoutService', () => {
  let service: PaintingCheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaintingCheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
