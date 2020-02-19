import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonneeComponent } from './abonnee.component';

describe('AbonneeComponent', () => {
  let component: AbonneeComponent;
  let fixture: ComponentFixture<AbonneeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonneeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
