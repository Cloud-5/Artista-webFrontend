import { TestBed } from '@angular/core/testing';

import { ArtistFollowersService } from './artist-followers.service';

describe('ArtistFollowersService', () => {
  let service: ArtistFollowersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistFollowersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
