import { TestBed } from '@angular/core/testing';

import { ShowElementsService } from './show-elements.service';

describe('ShowElementsService', () => {
  let service: ShowElementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowElementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
