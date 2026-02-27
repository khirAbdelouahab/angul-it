import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StateService } from '../shared/service/state-service';

export const resultGuardGuard: CanActivateFn = (route, state) => {
  const stateService = inject(StateService);
  const level = stateService.loadState('selectedLevel');
  const router = inject(Router);
  if (level) {
    if (level.selectedLevel == 3) {
      return true;
    }
  }
  router.navigate([''])
  return false;
};
