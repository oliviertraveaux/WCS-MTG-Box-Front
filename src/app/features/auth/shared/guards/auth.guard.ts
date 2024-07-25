import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserInfoStatesService } from '../../../../shared/user/services/user-info-states.service';

export const AuthGuard: CanActivateFn = (): boolean => {
    const router: Router = inject(Router);
    const userInfo = inject(UserInfoStatesService).getUserInfo();

    if (userInfo.id) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
};
