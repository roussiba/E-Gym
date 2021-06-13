import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnementValideComponent } from './abonnement-valide.component';

describe('AbonnementValideComponent', () => {
  let component: AbonnementValideComponent;
  let fixture: ComponentFixture<AbonnementValideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonnementValideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonnementValideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
