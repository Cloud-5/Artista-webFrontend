import { TestBed } from '@angular/core/testing';

import { PersonalizeService } from './personalize.service';

describe('PersonalizeService', () => {
  let service: PersonalizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
