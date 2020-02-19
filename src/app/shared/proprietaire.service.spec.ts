import { TestBed } from '@angular/core/testing';

import { ProprietaireService } from './proprietaire.service';

describe('ProprietaireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProprietaireService = TestBed.get(ProprietaireService);
    expect(service).toBeTruthy();
  });
});
