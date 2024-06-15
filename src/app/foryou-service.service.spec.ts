import { TestBed } from '@angular/core/testing';

import { ForyouServiceService } from './foryou-service.service';

describe('ForyouServiceService', () => {
  let service: ForyouServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForyouServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
