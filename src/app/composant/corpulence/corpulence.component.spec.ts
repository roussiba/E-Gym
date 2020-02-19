import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpulenceComponent } from './corpulence.component';

describe('CorpulenceComponent', () => {
  let component: CorpulenceComponent;
  let fixture: ComponentFixture<CorpulenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpulenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpulenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
