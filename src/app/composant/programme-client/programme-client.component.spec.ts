import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeClientComponent } from './programme-client.component';

describe('ProgrammeClientComponent', () => {
  let component: ProgrammeClientComponent;
  let fixture: ComponentFixture<ProgrammeClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgrammeClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
