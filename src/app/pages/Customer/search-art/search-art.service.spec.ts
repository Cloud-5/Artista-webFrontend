import { TestBed } from '@angular/core/testing';

import { SearchArtService } from './search-art.service';

describe('SearchArtService', () => {
  let service: SearchArtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchArtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
