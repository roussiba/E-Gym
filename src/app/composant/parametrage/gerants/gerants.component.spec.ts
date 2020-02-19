import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerantsComponent } from './gerants.component';

describe('GerantsComponent', () => {
  let component: GerantsComponent;
  let fixture: ComponentFixture<GerantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
