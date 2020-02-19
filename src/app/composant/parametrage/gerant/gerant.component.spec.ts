import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerantComponent } from './gerant.component';

describe('GerantComponent', () => {
  let component: GerantComponent;
  let fixture: ComponentFixture<GerantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
