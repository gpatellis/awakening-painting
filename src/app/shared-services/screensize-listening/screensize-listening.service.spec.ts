import { TestBed } from '@angular/core/testing';

import { ScreensizeListeningService } from './screensize-listening.service';

describe('ScreensizeListeningService', () => {
  let service: ScreensizeListeningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreensizeListeningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
