import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpaiementComponent } from './detailpaiement.component';

describe('DetailpaiementComponent', () => {
  let component: DetailpaiementComponent;
  let fixture: ComponentFixture<DetailpaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailpaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailpaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
