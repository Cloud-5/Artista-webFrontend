import { TestBed } from '@angular/core/testing';

import { EditArtistProfileService } from './edit-artist-profile.service';

describe('EditArtistProfileService', () => {
  let service: EditArtistProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditArtistProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
