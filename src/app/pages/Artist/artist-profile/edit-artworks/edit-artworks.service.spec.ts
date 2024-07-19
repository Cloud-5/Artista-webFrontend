import { TestBed } from '@angular/core/testing';

import { EditArtworksService } from './edit-artworks.service';

describe('EditArtworksService', () => {
  let service: EditArtworksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditArtworksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
