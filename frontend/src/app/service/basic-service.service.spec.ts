import { TestBed } from '@angular/core/testing';

import { BasicServiceService } from './basic-service.service';

describe('BasicServiceService', () => {
  let service: BasicServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
