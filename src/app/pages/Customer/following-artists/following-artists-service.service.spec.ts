import { TestBed } from '@angular/core/testing';

import { FollowingArtistsServiceService } from './following-artists-service.service';

describe('FollowingArtistsServiceService', () => {
  let service: FollowingArtistsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowingArtistsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
