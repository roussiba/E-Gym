import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCorpulenceComponent } from './report-corpulence.component';

describe('ReportCorpulenceComponent', () => {
  let component: ReportCorpulenceComponent;
  let fixture: ComponentFixture<ReportCorpulenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCorpulenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCorpulenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
