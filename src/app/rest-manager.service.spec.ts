import { TestBed } from '@angular/core/testing';

import { RestManagerService } from './rest-manager.service';

describe('RestManagerService', () => {
  let service: RestManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
