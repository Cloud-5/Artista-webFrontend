import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistFeedbackComponent } from './artist-feedback.component';

describe('ArtistFeedbackComponent', () => {
  let component: ArtistFeedbackComponent;
  let fixture: ComponentFixture<ArtistFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistFeedbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
