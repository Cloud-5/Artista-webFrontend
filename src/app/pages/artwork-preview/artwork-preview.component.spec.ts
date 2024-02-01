import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkPreviewComponent } from './artwork-preview.component';

describe('ArtworkPreviewComponent', () => {
  let component: ArtworkPreviewComponent;
  let fixture: ComponentFixture<ArtworkPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtworkPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtworkPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
