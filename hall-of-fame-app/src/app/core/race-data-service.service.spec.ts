import { TestBed } from '@angular/core/testing';

import { RaceDataService } from './race-data-service.service';

describe('Race.DataService', () => {
  let service: RaceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
