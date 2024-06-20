import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseImgCardComponent } from './purchase-img-card.component';

describe('PurchaseImgCardComponent', () => {
  let component: PurchaseImgCardComponent;
  let fixture: ComponentFixture<PurchaseImgCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseImgCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseImgCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
