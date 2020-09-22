import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntraineurComponent } from './entraineur.component';

describe('EntraineurComponent', () => {
  let component: EntraineurComponent;
  let fixture: ComponentFixture<EntraineurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntraineurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntraineurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
