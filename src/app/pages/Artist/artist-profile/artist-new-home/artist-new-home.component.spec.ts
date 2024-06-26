import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistNewHomeComponent } from './artist-new-home.component';

describe('ArtistNewHomeComponent', () => {
  let component: ArtistNewHomeComponent;
  let fixture: ComponentFixture<ArtistNewHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistNewHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistNewHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
