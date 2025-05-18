import { TestBed } from '@angular/core/testing';

import { AttemptQcmService } from './attempt-qcm.service';

describe('AttemptQcmService', () => {
  let service: AttemptQcmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttemptQcmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
