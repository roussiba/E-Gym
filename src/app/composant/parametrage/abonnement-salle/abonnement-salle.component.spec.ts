import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnementSalleComponent } from './abonnement-salle.component';

describe('AbonnementSalleComponent', () => {
  let component: AbonnementSalleComponent;
  let fixture: ComponentFixture<AbonnementSalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonnementSalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonnementSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
