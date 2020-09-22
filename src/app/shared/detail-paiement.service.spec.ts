import { TestBed } from '@angular/core/testing';

import { DetailPaiementService } from './detail-paiement.service';

describe('DetailPaiementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailPaiementService = TestBed.get(DetailPaiementService);
    expect(service).toBeTruthy();
  });
});
