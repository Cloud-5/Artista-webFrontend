import { ComponentFixture, TestBed } from '@angular/core/testing';

import { St1Component } from './st1.component';

describe('St1Component', () => {
  let component: St1Component;
  let fixture: ComponentFixture<St1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [St1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(St1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
