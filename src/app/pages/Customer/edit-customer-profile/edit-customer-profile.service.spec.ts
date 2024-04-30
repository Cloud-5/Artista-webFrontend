import { TestBed } from '@angular/core/testing';

import { EditCustomerProfileService } from './edit-customer-profile.service';

describe('EditCustomerProfileService', () => {
  let service: EditCustomerProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditCustomerProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
