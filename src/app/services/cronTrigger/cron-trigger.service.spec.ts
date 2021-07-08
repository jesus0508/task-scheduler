import { TestBed } from '@angular/core/testing';

import { CronTriggerService } from './cron-trigger.service';

describe('CronTriggerService', () => {
  let service: CronTriggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CronTriggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
