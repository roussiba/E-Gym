import { TestBed } from '@angular/core/testing';

import { FileSendService } from './file-send.service';

describe('FileSendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileSendService = TestBed.get(FileSendService);
    expect(service).toBeTruthy();
  });
});
