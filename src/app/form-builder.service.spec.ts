import { TestBed } from '@angular/core/testing';

import { BuildFormService } from './build-form.service';

describe('FormBuilderService', () => {
  let service: BuildFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
