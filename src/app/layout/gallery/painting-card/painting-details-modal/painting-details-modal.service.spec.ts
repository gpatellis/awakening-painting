import { TestBed } from '@angular/core/testing';

import { PaintingDetailsModalService } from './painting-details-modal.service';

describe('PaintingDetailsModalService', () => {
  let service: PaintingDetailsModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaintingDetailsModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
