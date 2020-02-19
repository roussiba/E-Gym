import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAbonnementSalleComponent } from './new-abonnement-salle.component';

describe('NewAbonnementSalleComponent', () => {
  let component: NewAbonnementSalleComponent;
  let fixture: ComponentFixture<NewAbonnementSalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAbonnementSalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAbonnementSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
