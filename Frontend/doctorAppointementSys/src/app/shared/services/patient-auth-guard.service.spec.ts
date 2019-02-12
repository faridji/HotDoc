import { TestBed, inject } from '@angular/core/testing';

import { PatientAuthGuard } from './patient-auth-guard.service';

describe('PatientAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientAuthGuard]
    });
  });

  it('should be created', inject([PatientAuthGuard], (service: PatientAuthGuard) => {
    expect(service).toBeTruthy();
  }));
});
