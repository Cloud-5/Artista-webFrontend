import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadArtworksComponent } from './upload-artworks.component';

describe('UploadArtworksComponent', () => {
  let component: UploadArtworksComponent;
  let fixture: ComponentFixture<UploadArtworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadArtworksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadArtworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
