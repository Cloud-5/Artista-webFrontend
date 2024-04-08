import { TestBed } from '@angular/core/testing';

import { ArtworkPreviewService } from './artwork-preview.service';

describe('ArtworkPreviewService', () => {
  let service: ArtworkPreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtworkPreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});