import { TestBed } from '@angular/core/testing';

import { CreationsService } from './creations.service';

describe('CreationsService', () => {
  let service: CreationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
