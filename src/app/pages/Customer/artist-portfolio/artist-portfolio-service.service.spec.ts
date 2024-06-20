import { TestBed } from '@angular/core/testing';

import { ArtistPortfolioService } from './artist-portfolio-service.service';

describe('ArtistPortfolioServiceService', () => {
  let service: ArtistPortfolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistPortfolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
