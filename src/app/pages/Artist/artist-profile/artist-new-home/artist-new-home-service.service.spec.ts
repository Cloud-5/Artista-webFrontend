import { TestBed } from '@angular/core/testing';

import { ArtistNewHomeServiceService } from './artist-new-home-service.service';

describe('ArtistNewHomeServiceService', () => {
  let service: ArtistNewHomeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistNewHomeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
