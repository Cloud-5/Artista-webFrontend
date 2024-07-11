import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationPreviewComponent } from './creation-preview.component';

describe('CreationPreviewComponent', () => {
  let component: CreationPreviewComponent;
  let fixture: ComponentFixture<CreationPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreationPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
