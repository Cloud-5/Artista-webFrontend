import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstForyouComponent } from './first-foryou.component';

describe('FirstForyouComponent', () => {
  let component: FirstForyouComponent;
  let fixture: ComponentFixture<FirstForyouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirstForyouComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirstForyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
