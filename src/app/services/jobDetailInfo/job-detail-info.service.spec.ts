import { TestBed } from '@angular/core/testing';

import { JobDetailInfoService } from './job-detail-info.service';

describe('JobDetailInfoService', () => {
  let service: JobDetailInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobDetailInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
