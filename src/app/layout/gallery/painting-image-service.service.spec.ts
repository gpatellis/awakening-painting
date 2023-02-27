import { TestBed } from '@angular/core/testing';

import { PaintingImageServiceService } from './painting-image-service.service';

describe('PaintingImageServiceService', () => {
  let service: PaintingImageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaintingImageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
