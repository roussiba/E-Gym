import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAbonneeComponent } from './add-abonnee.component';

describe('AddAbonneeComponent', () => {
  let component: AddAbonneeComponent;
  let fixture: ComponentFixture<AddAbonneeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAbonneeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAbonneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
