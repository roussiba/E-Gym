import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntraineursComponent } from './entraineurs.component';

describe('EntraineursComponent', () => {
  let component: EntraineursComponent;
  let fixture: ComponentFixture<EntraineursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntraineursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntraineursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
