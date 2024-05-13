import { TestBed } from '@angular/core/testing';

import { EncrypServiceService } from './encryp-service.service';

describe('EncrypServiceService', () => {
  let service: EncrypServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncrypServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
