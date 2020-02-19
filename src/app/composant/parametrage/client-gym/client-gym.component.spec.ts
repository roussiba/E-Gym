import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGymComponent } from './client-gym.component';

describe('ClientGymComponent', () => {
  let component: ClientGymComponent;
  let fixture: ComponentFixture<ClientGymComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientGymComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
