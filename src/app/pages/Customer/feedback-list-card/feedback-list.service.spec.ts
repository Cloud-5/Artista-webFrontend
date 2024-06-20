import { TestBed } from '@angular/core/testing';

import { FeedbackListService } from './feedback-list.service';

describe('FeedbackListService', () => {
  let service: FeedbackListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
