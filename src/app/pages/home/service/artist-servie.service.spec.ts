import { TestBed } from '@angular/core/testing';

import { ArtistServieService } from './artist-servie.service';

describe('ArtistServieService', () => {
  let service: ArtistServieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistServieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
