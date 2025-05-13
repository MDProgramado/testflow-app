import { TestBed } from '@angular/core/testing';

import { AutentificarLoginService } from './autentificar-login.service';

describe('AutentificarLoginService', () => {
  let service: AutentificarLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutentificarLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
