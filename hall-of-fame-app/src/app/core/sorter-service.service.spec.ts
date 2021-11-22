import { TestBed } from '@angular/core/testing';

import { SorterServiceService } from './sorter-service.service';

describe('SorterServiceService', () => {
  let service: SorterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SorterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
