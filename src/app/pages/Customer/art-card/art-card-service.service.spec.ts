import { TestBed } from '@angular/core/testing';

import { ArtCardServiceService } from './art-card-service.service';

describe('ArtCardServiceService', () => {
  let service: ArtCardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtCardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
