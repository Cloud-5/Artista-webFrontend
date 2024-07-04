import { TestBed } from '@angular/core/testing';

import { UploadArtworksService } from './upload-artworks.service';

describe('UploadArtworksService', () => {
  let service: UploadArtworksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadArtworksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
