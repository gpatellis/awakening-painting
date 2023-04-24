import { TestBed } from '@angular/core/testing';

import { PaintingImageService } from './painting-image.service';

describe('PaintingImageServiceService', () => {
  let service: PaintingImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaintingImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
