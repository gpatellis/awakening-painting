import { TestBed } from '@angular/core/testing';

import { OrderingStatusService } from './ordering-status.service';

describe('OrderingStatusService', () => {
  let service: OrderingStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderingStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
