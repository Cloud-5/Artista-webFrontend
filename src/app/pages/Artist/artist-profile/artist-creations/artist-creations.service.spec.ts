import { TestBed } from '@angular/core/testing';

import { ArtistCreationsService } from './artist-creations.service';

describe('ArtistCreationsService', () => {
  let service: ArtistCreationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistCreationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
