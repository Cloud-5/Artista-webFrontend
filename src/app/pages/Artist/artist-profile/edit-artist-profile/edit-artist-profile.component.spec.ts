import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArtistProfileComponent } from './edit-artist-profile.component';

describe('EditArtistProfileComponent', () => {
  let component: EditArtistProfileComponent;
  let fixture: ComponentFixture<EditArtistProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditArtistProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditArtistProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
