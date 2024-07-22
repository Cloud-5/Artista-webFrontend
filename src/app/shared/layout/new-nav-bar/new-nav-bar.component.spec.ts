import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNavBarComponent } from './new-nav-bar.component';

describe('NewNavBarComponent', () => {
  let component: NewNavBarComponent;
  let fixture: ComponentFixture<NewNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewNavBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
