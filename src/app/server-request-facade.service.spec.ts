import { TestBed } from '@angular/core/testing';

import { ServerRequestFacadeService } from './server-request-facade.service';

describe('ServerRequestFacadeService', () => {
  let service: ServerRequestFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerRequestFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
