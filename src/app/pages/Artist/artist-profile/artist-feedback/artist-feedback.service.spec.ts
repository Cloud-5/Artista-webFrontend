import { TestBed } from '@angular/core/testing';

import { ArtistFeedbackService } from './artist-feedback.service';

describe('ArtistFeedbackService', () => {
  let service: ArtistFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
