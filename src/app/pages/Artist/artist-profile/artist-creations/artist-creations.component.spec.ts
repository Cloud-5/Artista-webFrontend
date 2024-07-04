import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCreationsComponent } from './artist-creations.component';

describe('ArtistCreationsComponent', () => {
  let component: ArtistCreationsComponent;
  let fixture: ComponentFixture<ArtistCreationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistCreationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistCreationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
