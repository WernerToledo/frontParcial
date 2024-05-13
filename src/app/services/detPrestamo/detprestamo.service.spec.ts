import { TestBed } from '@angular/core/testing';

import { DetprestamoService } from './detprestamo.service';

describe('DetprestamoService', () => {
  let service: DetprestamoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetprestamoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
