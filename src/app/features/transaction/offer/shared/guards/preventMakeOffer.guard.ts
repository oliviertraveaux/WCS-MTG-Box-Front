import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { SnackbarStatus } from '../../../../../shared/enums/snackbar-status.enum';
import { AlertService } from '../../../../../shared/services/alert.service';
import { UserInfoStatesService } from '../../../../../shared/user/services/user-info-states.service';
import { CardAdService } from '../../../card-ad/shared/services/card-ad.service';

export const preventMakeOfferGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot
): Observable<boolean> => {
    const alertService = inject(AlertService);
    const cardAdService = inject(CardAdService);
    const router: Router = inject(Router);
    const id: number = parseInt(route.paramMap.get('id')!);
    const userId = inject(UserInfoStatesService).getUserInfo().id;

    return cardAdService.getCardAd(id).pipe(
        map((cardAd) => {
            if (cardAd.userCard.userId === userId) {
                alertService.openSnackBar(
                    'You cannot make an offer on your own card',
                    SnackbarStatus.error
                );
                setTimeout(() => {
                    router.navigate([`/card-ad/${id}`]);
                }, 2000);
                return false;
            } else {
                return true;
            }
        })
    );
};
