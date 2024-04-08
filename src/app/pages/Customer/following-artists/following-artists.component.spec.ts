import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingArtistsComponent } from './following-artists.component';

describe('FollowingArtistsComponent', () => {
  let component: FollowingArtistsComponent;
  let fixture: ComponentFixture<FollowingArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FollowingArtistsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FollowingArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
