import { TestBed } from '@angular/core/testing';

import { SallegymService } from './sallegym.service';

describe('SallegymService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SallegymService = TestBed.get(SallegymService);
    expect(service).toBeTruthy();
  });
});
