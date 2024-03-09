import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProfileGalleryComponent } from './customer-profile-gallery.component';

describe('CustomerProfileGalleryComponent', () => {
  let component: CustomerProfileGalleryComponent;
  let fixture: ComponentFixture<CustomerProfileGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerProfileGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerProfileGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
