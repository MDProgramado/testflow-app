import { TestBed } from '@angular/core/testing';

import { AdicionarServiceService } from './adicionar-service.service';

describe('AdicionarServiceService', () => {
  let service: AdicionarServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdicionarServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
