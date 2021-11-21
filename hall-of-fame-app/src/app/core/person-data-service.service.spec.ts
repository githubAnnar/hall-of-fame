import { TestBed } from '@angular/core/testing';

import { PersonDataService } from './person-data-service.service';

describe('PersonDataServiceService', () => {
  let service: PersonDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
