import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchArtComponent } from './search-art.component';

describe('SearchArtComponent', () => {
  let component: SearchArtComponent;
  let fixture: ComponentFixture<SearchArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchArtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
