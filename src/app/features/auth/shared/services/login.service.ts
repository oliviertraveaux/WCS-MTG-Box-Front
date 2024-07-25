import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { CollectionCardsStateService } from '../../../../shared/collection/services/collection-cards-state.service';
import { OfferService } from '../../../../shared/offer/services/offer.service';
import { UserInfoStatesService } from '../../../../shared/user/services/user-info-states.service';
import { HomeSearchResultsStatesService } from '../../../home/shared/services/home-search-results-states.service';
import { LoginRepository } from '../repositories/login.repository';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private userInfoStatesService = inject(UserInfoStatesService);
    private collectionCardState = inject(CollectionCardsStateService);
    private homeSearchResultsStateService = inject(HomeSearchResultsStatesService);
    private offerService = inject(OfferService);
    private authRepository = inject(LoginRepository);
    private router = inject(Router);

    login(credentials: { username: string; password: string }): Observable<any> {
        return this.authRepository.login(credentials);
    }

    isAuthenticated(): boolean {
        return !!this.userInfoStatesService.getUserInfo().id;
    }

    logout(): Subscription {
        return this.authRepository
            .logout()
            .pipe(
                tap(() => {
                    this.userInfoStatesService.reset();
                    this.collectionCardState.reset();
                    this.homeSearchResultsStateService.reset();
                    this.offerService.reset();
                    this.router.navigate(['/login']);
                })
            )
            .subscribe();
    }

    requestPasswordReset(email: string): Observable<any> {
        return this.authRepository.requestPasswordReset(email);
    }

    resetPassword(
        token: string,
        newPasswordData: { plainPassword: string; plainPasswordVerification: string }
    ) {
        return this.authRepository.resetPassword(token, newPasswordData);
    }
}
