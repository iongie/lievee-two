import { TestBed } from '@angular/core/testing';

import { GuardPageGuard } from './guard-page.guard';

describe('GuardPageGuard', () => {
  let guard: GuardPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
