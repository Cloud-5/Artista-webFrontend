import { TestBed } from '@angular/core/testing';

import { CreationPreviewService } from './creation-preview.service';

describe('CreationPreviewService', () => {
  let service: CreationPreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreationPreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
