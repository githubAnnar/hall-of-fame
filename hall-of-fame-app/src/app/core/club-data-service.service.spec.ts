import { TestBed } from '@angular/core/testing';

import { ClubDataServiceService } from './club-data-service.service';

describe('ClubDataServiceService', () => {
  let service: ClubDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
