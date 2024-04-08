import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackListCardComponent } from './feedback-list-card.component';

describe('FeedbackListCardComponent', () => {
  let component: FeedbackListCardComponent;
  let fixture: ComponentFixture<FeedbackListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbackListCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
