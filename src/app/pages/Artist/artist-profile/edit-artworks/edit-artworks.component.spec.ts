import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArtworksComponent } from './edit-artworks.component';

describe('EditArtworksComponent', () => {
  let component: EditArtworksComponent;
  let fixture: ComponentFixture<EditArtworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditArtworksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditArtworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
