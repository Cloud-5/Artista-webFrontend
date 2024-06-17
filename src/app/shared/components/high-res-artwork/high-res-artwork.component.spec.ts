import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighResArtworkComponent } from './high-res-artwork.component';

describe('HighResArtworkComponent', () => {
  let component: HighResArtworkComponent;
  let fixture: ComponentFixture<HighResArtworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighResArtworkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighResArtworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
